import { defineStore } from "pinia";
import { ref } from "vue";

// 全局路由级 Loading 状态
export const useLoadingStore = defineStore("loading", () => {
  // 初始为 true：首次进入（Welcome 页）也显示 Loading 遮罩
  const globalLoading = ref(true);
  let timer = null;

  const show = () => {
    // 防抖：避免极快的路由切换也闪一下
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      globalLoading.value = true;
    }, 150);
  };

  const hide = () => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    globalLoading.value = false;
  };

  return {
    globalLoading,
    show,
    hide,
  };
});


