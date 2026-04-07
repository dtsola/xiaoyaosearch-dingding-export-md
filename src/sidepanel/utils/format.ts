/**
 * 钉钉文档 → Markdown 转换器
 * 参考：olds/ding-doc-downloader/src/script/component/adoc2md.js
 */

/**
 * 工作空间类，用于存储转换过程中的上下文信息
 */
class WorkSpace {
  values: Record<string, any> = {};
  parent?: WorkSpace;

  constructor(parent?: WorkSpace) {
    if (parent) {
      this.parent = parent;
    }
  }

  get(k: string): any {
    let v = this.values[k];
    if (v === undefined || v === null) {
      if (this.parent) {
        return this.parent.get(k);
      }
    }
    return v;
  }

  set(k: string, v: any, root = false): void {
    if (root && this.parent) {
      this.parent.set(k, v, root);
      return;
    }
    this.values[k] = v;
  }
}

/**
 * 帧类型接口
 * 钉钉文档内容是以帧数组的形式存储的：
 * [tagName, options, ...children]
 */
type Frame = [string, Record<string, any>, ...any[]];

/**
 * 帧处理器基类
 */
abstract class BaseFrame {
  abstract getBefore(
    tagName: string,
    tagOption: Record<string, any>,
    alreadyMD: string,
    workSpace: WorkSpace
  ): string;

  abstract getAfter(
    tagName: string,
    tagOption: Record<string, any>,
    content: string,
    workSpace: WorkSpace
  ): string;

  getMarkdown(frame: Frame, alreadyMD = '', workSpace = new WorkSpace()): string {
    const tagName = frame[0];
    const tagOption = frame[1];
    const content = frame.slice(2);

    const before = this.getBefore(tagName, tagOption, alreadyMD, workSpace);

    let ctx = '';
    if (content.length === 1 && typeof content[0] === 'string') {
      ctx = content[0].replace(/\r/g, '');
    } else {
      for (const item of content) {
        const frameHandler = getFrame(item[0]);
        if (!frameHandler) {
          console.warn('不支持的节点:', item[0]);
          continue;
        }
        ctx += frameHandler.getMarkdown(item, ctx, new WorkSpace(workSpace));
      }
    }

    const after = this.getAfter(tagName, tagOption, ctx, workSpace);

    // 空内容处理
    if (ctx.trim().length === 0 && !workSpace.get('allowEmptyContent')) {
      return '';
    }

    let md = [before, ctx, after].join('');

    if (md.trim().length === 0) {
      return '';
    }

    return md;
  }
}

/**
 * 根节点帧处理器
 */
class RootFrame extends BaseFrame {
  getBefore() {
    return '';
  }
  getAfter() {
    return '';
  }
}

/**
 * 标题帧处理器 (h1-h6)
 */
class HeaderFrame extends BaseFrame {
  constructor(private level: number) {
    super();
  }

  getBefore() {
    return '#'.repeat(this.level) + ' ';
  }

  getAfter() {
    return '\n\n';
  }
}

/**
 * 段落帧处理器
 */
class BlockFrame extends BaseFrame {
  constructor(private pre = '', private after = '') {
    super();
  }

  getBefore(_tagName: string, tagOption: Record<string, any>, alreadyMD: string) {
    let p = alreadyMD.endsWith('\n\n') ? '' : '\n';

    // 列表处理
    if (tagOption.list) {
      if (tagOption.list.isOrdered) {
        const listK = `listIndex_${tagOption.list.listId}_${tagOption.list.level}`;
        let listIndex = workSpace.get(listK) || 0;
        const currentIndex = listIndex + 1;
        workSpace.set(listK, currentIndex, true);

        let intent = '';
        if (tagOption.list.level > 0) {
          intent = '    '.repeat(tagOption.list.level);
        }

        p += `${intent}${currentIndex}. `;
      } else {
        let intent = '';
        if (tagOption.list && tagOption.list.level > 0) {
          intent = '    '.repeat(tagOption.list.level);
        }
        p += `${intent}* `;
      }
    }

    if (this.pre) {
      p += `${this.pre}\n`;
    }

    // 在表格里面的数据，每个单元格的数据不能换行
    const inTable = workSpace.get('intable');
    if (inTable) {
      p = p.trim();
    }

    return p;
  }

  getAfter(_tagName: string, _tagOption: Record<string, any>, _content: string, workSpace: WorkSpace) {
    let af = this.after || '\n\n';

    const inTable = workSpace.get('intable');
    if (inTable) {
      af = af.trim();
    }

    return af;
  }
}

// 全局 workSpace 用于列表索引
const globalWorkSpace = new WorkSpace();

/**
 * 内联元素帧处理器
 */
class InlineFrame extends BaseFrame {
  constructor(private pre = '', private after = '') {
    super();
  }

  getBefore(_tagName: string, tagOption: Record<string, any>) {
    let be = '';

    if (tagOption.bold) {
      be += '**';
    }

    if (tagOption.strike) {
      be += '~~';
    }

    if (tagOption.italic) {
      be += tagOption.bold ? '_' : '*';
    }

    be += this.pre;
    return be;
  }

  getAfter(_tagName: string, tagOption: Record<string, any>) {
    let af = '';

    if (tagOption.italic) {
      af += tagOption.bold ? '_' : '*';
    }

    if (tagOption.strike) {
      af += '~~';
    }

    if (tagOption.bold) {
      af += '**';
    }

    af = `${this.after}${af}`;
    return af;
  }
}

/**
 * 链接帧处理器
 */
class AFrame extends BaseFrame {
  getBefore() {
    return '[';
  }
  getAfter(_tagName: string, tagOption: Record<string, any>) {
    return `](${tagOption.href || ''})`;
  }
}

/**
 * 图片帧处理器
 */
class ImgFrame extends BaseFrame {
  getBefore(_tagName: string, tagOption: Record<string, any>) {
    return `![${tagOption.name || tagOption.alt || ''}](`;
  }

  getMarkdown(frame: Frame, _alreadyMD = '', _workSpace = new WorkSpace()): string {
    return this.getBefore(frame[0], frame[1], '', new WorkSpace()) + frame[1].src + this.getAfter(frame[0], frame[1], '', new WorkSpace());
  }

  getAfter() {
    return ')';
  }
}

/**
 * 代码块帧处理器
 */
class CodeFrame extends BaseFrame {
  getBefore(_tagName: string, tagOption: Record<string, any>) {
    let newLine = '\n';
    const syntax = tagOption.syntax || '';
    let b = `${newLine}\`\`\`${syntax}\n`;

    if (tagOption.title) {
      const cmt = getCommentMark(syntax);
      b += `${cmt} ${tagOption.title}`;
      if (cmt.startsWith('<!--')) {
        b += ' -->';
      } else if (cmt.startsWith('/*')) {
        b += ' */';
      }
      b += '\n\n';
    }

    return b;
  }

  getAfter() {
    return '\n```\n\n';
  }
}

/**
 * 表格单元格帧处理器
 */
class TcFrame extends InlineFrame {
  constructor() {
    super('', '');
  }
}

/**
 * 表格帧处理器
 */
class TableFrame extends BaseFrame {
  getMarkdown(frame: Frame, _alreadyMD = '', workSpace = new WorkSpace()): string {
    let ctx = '';
    workSpace.set('intable', true);

    for (let i = 2; i < frame.length; i++) {
      const trFrame = frame[i];
      const trValues: string[] = [];

      for (let j = 2; j < trFrame.length; j++) {
        const tcFrame = trFrame[j];
        const f = getFrame(tcFrame[0]);
        if (!f) {
          console.warn('不支持的节点:', tcFrame[0]);
          trValues.push('');
          continue;
        }

        trValues.push(f.getMarkdown(tcFrame, '', new WorkSpace(workSpace)).trim());
      }

      ctx += `| ${trValues.join(' | ')} |\n`;

      // 表头分隔符（只添加一次）
      const tableHadHeaderKey = frame[1].uuid + '_hadheader';
      if (!workSpace.get(tableHadHeaderKey)) {
        ctx += '|' + trValues.map(() => ' --- ').join('|') + ' |\n';
        workSpace.set(tableHadHeaderKey, true, true);
      }
    }

    return ctx + '\n';
  }

  getBefore() {
    return '';
  }
  getAfter() {
    return '';
  }
}

/**
 * 分割线帧处理器
 */
class HrFrame extends BaseFrame {
  getBefore() {
    return '\n---\n';
  }
  getAfter() {
    return '\n';
  }

  getMarkdown(frame: Frame, alreadyMD = '', workSpace = new WorkSpace()): string {
    workSpace.set('allowEmptyContent', true);
    return super.getMarkdown(frame, alreadyMD, workSpace);
  }
}

/**
 * 换行帧处理器
 */
class BrFrame extends BaseFrame {
  getBefore() {
    return '';
  }
  getAfter() {
    return '<br>';
  }

  getMarkdown(frame: Frame, alreadyMD = '', workSpace = new WorkSpace()): string {
    workSpace.set('allowEmptyContent', true);
    return super.getMarkdown(frame, alreadyMD, workSpace);
  }
}

/**
 * 卡片帧处理器（不支持的内容）
 */
class CardFrame extends BaseFrame {
  getBefore(_tagName: string, _tagOption: Record<string, any>, _alreadyMD: string, workSpace: WorkSpace) {
    return '\n[不支持的内容，请到钉钉文档查看](' + workSpace.get('getDocUrl')('卡片') + ')\n';
  }
  getAfter() {
    return '\n';
  }
}

/**
 * 容器帧处理器
 */
class ContainerFrame extends BlockFrame {
  constructor() {
    super(':::', ':::');
  }
}

/**
 * 内联代码帧处理器
 */
class InlineCodeFrame extends InlineFrame {
  constructor() {
    super('`', '`');
  }
}

// 帧处理器注册表
const frameHandlers = new Map<string, BaseFrame>();

function registFrame(tagname: string, frame: BaseFrame) {
  frameHandlers.set(tagname, frame);
}

function getFrame(tagname: string): BaseFrame | undefined {
  return frameHandlers.get(tagname);
}

// 注册所有帧处理器
registFrame('root', new RootFrame());
registFrame('h1', new HeaderFrame(1));
registFrame('h2', new HeaderFrame(2));
registFrame('h3', new HeaderFrame(3));
registFrame('h4', new HeaderFrame(4));
registFrame('h5', new HeaderFrame(5));
registFrame('h6', new HeaderFrame(6));
registFrame('p', new BlockFrame('', ''));
registFrame('span', new InlineFrame('', ''));
registFrame('a', new AFrame());
registFrame('img', new ImgFrame());
registFrame('code', new CodeFrame());
registFrame('tc', new TcFrame());
registFrame('table', new TableFrame());
registFrame('hr', new HrFrame());
registFrame('br', new BrFrame());
registFrame('card', new CardFrame());
registFrame('container', new ContainerFrame());
registFrame('cangjie-textinline', new InlineFrame('', ''));
registFrame('inlineCode', new InlineCodeFrame());

/**
 * 获取各语言的单行注释语法前缀
 */
function getCommentMark(lang: string): string {
  const singleLineComments: Record<string, string> = {
    c: '// ',
    cpp: '// ',
    javascript: '// ',
    java: '// ',
    js: '// ',
    ts: '// ',
    typescript: '// ',
    csharp: '// ',
    go: '// ',
    rust: '// ',
    python: '# ',
    ruby: '# ',
    perl: '# ',
    bash: '# ',
    shell: '# ',
    powershell: '# ',
    html: '<!-- ',
    xml: '<!-- ',
    css: '/* ',
    sql: '-- ',
  };

  return singleLineComments[lang] || '// ';
}

/**
 * 将钉钉文档转换为 Markdown
 * @param docContent 钉钉文档内容（JSON 字符串或对象）
 * @param docName 文档名称
 * @returns Markdown 文本
 */
export function convertAdocToMarkdown(docContent: string, docName: string): string {
  let content: any;

  if (typeof docContent === 'string') {
    content = JSON.parse(docContent);
  } else {
    content = docContent;
  }

  // 查找文档主体
  const wordPart = Object.values(content.parts).find(
    (p: any) => p.type === 'application/x-alidocs-word'
  );

  if (!wordPart) {
    throw new Error('未找到文档内容');
  }

  const docBody = (wordPart as any).data.body;

  // 获取根节点处理器
  const rootFrame = getFrame(docBody[0]);
  if (!rootFrame) {
    throw new Error(`不支持的根节点: ${docBody[0]}`);
  }

  // 创建工作空间
  const workSpace = new WorkSpace();
  const warns: string[] = [];
  workSpace.set('getDocUrl', (reason: string) => {
    warns.push(`发现不支持的内容[${reason}]。`);
    return '#';
  });

  // 转换文档
  let markdown = rootFrame.getMarkdown(docBody, '', workSpace);

  // 添加文档标题
  markdown = `# ${docName}\n\n${markdown}`;

  return markdown;
}

/**
 * 清理 Markdown 文本
 */
export function cleanMarkdown(markdown: string): string {
  // 移除多余的空行
  markdown = markdown.replace(/\n{3,}/g, '\n\n');

  // 移除行尾空格
  markdown = markdown.replace(/ +\n/g, '\n');

  return markdown.trim();
}
