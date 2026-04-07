/**
 * Toast 提示管理 Composable
 */
import { ref } from 'vue';

export interface ToastOptions {
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  closable?: boolean;
}

interface ToastItem extends Required<Omit<ToastOptions, 'message'>> {
  id: string;
  message: string;
}

let idCounter = 0;

function generateId(): string {
  return `toast-${Date.now()}-${idCounter++}`;
}

/**
 * Toast API
 */
export function useToast() {
  const toasts = ref<ToastItem[]>([]);

  /**
   * 添加 Toast
   */
  function add(options: ToastOptions): string {
    const id = generateId();
    const toast: ToastItem = {
      id,
      message: options.message,
      type: options.type || 'info',
      duration: options.duration ?? 3000,
      closable: options.closable ?? true,
    };

    toasts.value.push(toast);
    return id;
  }

  /**
   * 移除 Toast
   */
  function remove(id: string): void {
    const index = toasts.value.findIndex((t) => t.id === id);
    if (index !== -1) {
      toasts.value.splice(index, 1);
    }
  }

  /**
   * 清空所有 Toast
   */
  function clear(): void {
    toasts.value = [];
  }

  const success = (message: string, options?: Omit<ToastOptions, 'message' | 'type'>) => {
    return add({ message, type: 'success', ...options });
  };

  const error = (message: string, options?: Omit<ToastOptions, 'message' | 'type'>) => {
    return add({ message, type: 'error', ...options });
  };

  const warning = (message: string, options?: Omit<ToastOptions, 'message' | 'type'>) => {
    return add({ message, type: 'warning', ...options });
  };

  const info = (message: string, options?: Omit<ToastOptions, 'message' | 'type'>) => {
    return add({ message, type: 'info', ...options });
  };

  return {
    toasts,
    add,
    remove,
    clear,
    success,
    error,
    warning,
    info,
  };
}
