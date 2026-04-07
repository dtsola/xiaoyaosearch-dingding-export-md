/**
 * API 响应基础接口
 */
export interface ApiResponse<T = any> {
  isSuccess: boolean;
  data: T;
  errorMessage?: string;
}

/**
 * 文档条目（API 返回格式）
 */
export interface ApiDentryItem {
  dentryUuid: string;
  dentryName: string;
  dentryType: string;
  parentUuid: string;
  isDeleted: boolean;
  docKey?: string;
  dentryKey?: string;
  contentType?: string;
  size?: number;
  creator?: {
    nick: string;
    userId: string;
  };
  updateTime?: number;
  children?: ApiDentryItem[];
}

/**
 * 文档列表响应
 */
export interface DocListResponse {
  children: ApiDentryItem[];
  hasMore: boolean;
  loadMoreId?: string;
}

/**
 * 文档数据响应
 */
export interface DocumentDataResponse {
  fileMetaInfo: {
    creator: { nick: string };
    corpId: string;
    securityPolicyControl: {
      watermarkEnable: boolean;
      watermarkText?: {
        rowOne: string;
        rowTwo: string;
      };
    };
  };
  documentContent: {
    checkpoint: {
      content: string;
      baseVersion: string;
    };
  };
  userInfo: {
    orgs: Array<{
      corpId: string;
      name: string;
    }>;
  };
}

/**
 * 上传信息响应
 */
export interface UploadInfoResponse {
  uploadUrl: string;
  storagePath: string;
  resourceId: string;
}

/**
 * 导出任务响应
 */
export interface ExportJobResponse {
  jobId: string;
  url?: string;
  done?: boolean;
  status?: 'pending' | 'processing' | 'success' | 'failed';
  ossUrl?: string;
}

/**
 * 导出进度回调
 */
export type ExportProgressCallback = (progress: number, status: string) => void;

/**
 * 下载文件信息
 */
export interface DownloadInfo {
  url: string;
  filename: string;
  mimeType: string;
}
