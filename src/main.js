import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import router from "./router";

import "./assets/styles/styles.css";

const app = createApp(App);

/**
 * 全局错误处理器
 * 
 * 作用：
 * 1. 捕获应用中所有未处理的错误（包括异步错误、Promise 拒绝等）
 * 2. 记录错误信息，便于调试和监控
 * 3. 防止错误导致应用崩溃
 * 
 * 注意：
 * - 这个处理器主要捕获异步错误和全局错误
 * - 组件渲染错误由 ErrorBoundary 组件处理
 * - 两者配合使用，提供完整的错误处理机制
 * 
 * 使用场景：
 * - API 请求失败
 * - 异步操作错误
 * - Promise 未捕获的拒绝
 * - 全局事件监听器错误
 */
app.config.errorHandler = (err, instance, info) => {
  // 记录错误信息到控制台（开发环境）
  console.error('=== 全局错误捕获 ===');
  console.error('错误对象:', err);
  console.error('组件实例:', instance);
  console.error('错误信息:', info);
  console.error('错误堆栈:', err.stack);
  console.error('时间:', new Date().toLocaleString());
  console.error('==================');

  // 生产环境可以在这里：
  // 1. 发送错误到监控服务（如 Sentry、LogRocket 等）
  // 2. 记录错误日志
  // 3. 显示用户友好的错误提示
  
  // 示例：发送到监控服务（需要配置）
  // if (import.meta.env.PROD) {
  //   // 发送错误到监控服务
  //   // errorTrackingService.captureException(err, { instance, info });
  // }
};

/**
 * 全局警告处理器（可选）
 * 
 * 作用：捕获 Vue 的警告信息
 * 注意：警告不会导致应用崩溃，但可以帮助发现潜在问题
 */
app.config.warnHandler = (msg, instance, trace) => {
  // 开发环境显示警告
  if (import.meta.env.DEV) {
    console.warn('Vue 警告:', msg);
    console.warn('组件实例:', instance);
    console.warn('追踪信息:', trace);
  }
  
  // 生产环境可以忽略或记录警告
};

app.use(createPinia()); //  (一定要在 app.use(router) 之前或者之后都行，挂上就行)
app.use(router);
app.mount("#app");
