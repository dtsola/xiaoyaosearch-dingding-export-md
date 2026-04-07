/**
 * 钉钉知识库 API
 * 用于获取知识库结构和文档列表
 */
import { DingTalkAPI } from './DingTalkAPI.js';
import { NodeType, type WikiNode } from '../types/wiki.js';

/**
 * 钉钉知识库 API
 */
export class DingTalkWikiAPI extends DingTalkAPI {
  /**
   * 获取知识库节点列表
   * @param wikiId 知识库 ID
   * @param parentNodeId 父节点 ID（可选，用于获取子节点）
   */
  async getWikiNodes(wikiId: string, parentNodeId?: string): Promise<WikiNode[]> {
    await this.ensureAuthenticated();

    // 调用知识库 API
    const url = parentNodeId
      ? `/api/wiki/nodes?wikiId=${wikiId}&parentId=${parentNodeId}`
      : `/api/wiki/nodes?wikiId=${wikiId}`;

    const response = await this.http.get(url);

    // 解析响应
    const data = response.data;
    return this.parseWikiNodes(data);
  }

  /**
   * 递归获取知识库树结构
   * @param wikiId 知识库 ID
   * @param maxDepth 最大递归深度
   */
  async getWikiTree(wikiId: string, maxDepth: number = 10): Promise<WikiNode[]> {
    const rootNodes = await this.getWikiNodes(wikiId);

    const buildTree = async (nodes: WikiNode[], currentDepth: number): Promise<WikiNode[]> => {
      if (currentDepth >= maxDepth) {
        return nodes;
      }

      for (const node of nodes) {
        if (node.type === NodeType.FOLDER) {
          const children = await this.getWikiNodes(wikiId, node.id);
          node.children = await buildTree(children, currentDepth + 1);
        }
      }

      return nodes;
    };

    return buildTree(rootNodes, 0);
  }

  /**
   * 解析知识库节点数据
   */
  private parseWikiNodes(data: any): WikiNode[] {
    const nodes: WikiNode[] = [];

    // 处理不同的响应格式
    const items = data?.items || data?.nodes || data?.data || [];

    if (Array.isArray(items)) {
      for (const item of items) {
        const node = this.parseWikiNode(item);
        if (node) {
          nodes.push(node);
        }
      }
    }

    return nodes;
  }

  /**
   * 解析单个知识库节点
   */
  private parseWikiNode(item: any): WikiNode | null {
    if (!item || typeof item !== 'object') {
      return null;
    }

    // 判断节点类型
    let type: (typeof NodeType)[keyof typeof NodeType] = NodeType.DOCUMENT;
    if (item.type === 'folder' || item.nodeType === 'folder') {
      type = NodeType.FOLDER;
    } else if (item.type === 'root' || item.nodeType === 'root') {
      type = NodeType.ROOT;
    }

    return {
      id: item.id || item.nodeId || item.itemId || '',
      name: item.name || item.title || '未命名',
      type,
      parentId: item.parentId || item.parentId || undefined,
      docId: item.docId || item.documentId || undefined,
      updatedAt: item.updatedAt || item.updateTime || undefined,
    };
  }

  /**
   * 将知识库节点转换为文档 ID 列表（用于批量导出）
   */
  extractDocIds(nodes: WikiNode[]): string[] {
    const docIds: string[] = [];

    const extract = (node: WikiNode) => {
      if (node.type === NodeType.DOCUMENT && node.docId) {
        docIds.push(node.docId);
      }

      if (node.children) {
        for (const child of node.children) {
          extract(child);
        }
      }
    };

    for (const node of nodes) {
      extract(node);
    }

    return docIds;
  }

  /**
   * 创建目录结构映射（用于保持知识库目录结构）
   */
  createPathMapping(nodes: WikiNode[], basePath: string = ''): Map<string, string> {
    const mapping = new Map<string, string>();

    const buildPath = (node: WikiNode, currentPath: string) => {
      const nodePath = currentPath ? `${currentPath}/${node.name}` : node.name;

      if (node.type === NodeType.DOCUMENT && node.docId) {
        // 映射文档 ID 到输出路径
        mapping.set(node.docId, nodePath);
      }

      if (node.children) {
        for (const child of node.children) {
          buildPath(child, nodePath);
        }
      }
    };

    for (const node of nodes) {
      buildPath(node, basePath);
    }

    return mapping;
  }
}
