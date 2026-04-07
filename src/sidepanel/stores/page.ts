import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { PageInfo, DentryItem } from '@/shared/types';

/**
 * 页面状态管理
 */
export const usePageStore = defineStore('page', () => {
  // 当前页面信息
  const currentPage = ref<PageInfo | null>(null);

  // 当前文档树
  const docTree = ref<DentryItem[]>([]);

  // 是否正在加载
  const loading = ref(false);

  // 错误信息
  const error = ref<string | null>(null);

  /**
   * 设置当前页面信息
   */
  function setCurrentPage(pageInfo: PageInfo) {
    currentPage.value = pageInfo;
    error.value = null;
  }

  /**
   * 设置文档树
   */
  function setDocTree(tree: DentryItem[]) {
    docTree.value = tree;
  }

  /**
   * 设置加载状态
   */
  function setLoading(isLoading: boolean) {
    loading.value = isLoading;
  }

  /**
   * 设置错误信息
   */
  function setError(err: string | null) {
    error.value = err;
  }

  /**
   * 清空状态
   */
  function clear() {
    currentPage.value = null;
    docTree.value = [];
    loading.value = false;
    error.value = null;
  }

  return {
    currentPage,
    docTree,
    loading,
    error,
    setCurrentPage,
    setDocTree,
    setLoading,
    setError,
    clear,
  };
});
