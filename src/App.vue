<template>
  <div class="app-container">
    <Header />

    <div class="main-content">
      <!-- 
        使用错误边界组件包裹路由视图
        作用：捕获路由组件中的未处理错误，防止整个应用崩溃
        如果某个页面组件出错，会显示友好的错误提示界面
      -->
      <ErrorBoundary>
        <router-view v-slot="{ Component }">
          <keep-alive include="Notes">
            <component :is="Component" />
          </keep-alive>
        </router-view>
      </ErrorBoundary>
    </div>

    <Footer />

    <BackToTop />

    <!-- 全局路由 Loading 遮罩 -->
    <PageLoading />
  </div>
</template>

<script setup>
  /**
   * App.vue - 应用根组件
   * 
   * 功能：
   * 1. 全局布局：Header + Content + Footer
   * 2. 路由视图：使用 router-view 显示不同页面
   * 3. 错误处理：使用 ErrorBoundary 捕获组件错误
   * 4. 组件缓存：使用 keep-alive 缓存 Notes 页面
   * 
   * 全局错误处理说明：
   * - ErrorBoundary 组件：捕获子组件中的渲染错误
   * - main.js 中的 errorHandler：捕获全局未处理的错误（如异步错误）
   * - 两者配合使用，提供完整的错误处理机制
   */

  import Header from '@/layout/Header.vue';
  import Footer from '@/layout/Footer.vue';
  import BackToTop from '@/components/BackToTop/BackToTop.vue';
  // 导入错误边界组件
  import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary.vue';
  import PageLoading from '@/components/Common/PageLoading.vue';
</script>

<style scoped>
  .app-container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    /* 🔴 恢复原样：完全保留你原本的背景写法，不做任何缩放或固定 */
    background-image: url("@/assets/images/background-body.webp");
  }

  /* 新增布局样式：只负责撑开高度，不涉及颜色或图片 */
  .main-content {
    flex: 1;
    /* 让内容区占据剩余空间，把 Footer 挤到最下面 */
    width: 100%;
  }

  /* 移动端：为底部固定导航栏留出空间 */
  @media (max-width: 768px) {
    .main-content {
      padding-bottom: 70px;
      /* 为底部导航栏留出空间 */
    }
  }
</style>