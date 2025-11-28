<template>
  <div class="dashboard-page">
    <div class="bg-shape shape-1"></div>
    <div class="bg-shape shape-2"></div>

    <HomeBanner />

    <div class="main-container">
      <HomeProfile />
      <HomeSkills />
    </div>

    <!-- 留言系统 -->
    <div class="comments-section">
      <Giscus v-bind="giscusConfig" />
    </div>
  </div>

</template>

<script setup>
  // 🚀 性能优化：子组件改为异步导入，实现代码分割
  import { defineAsyncComponent } from 'vue'
  import Giscus from '@/components/liuyanban/Giscus.vue'
  import { giscusConfig } from '@/config/giscus'

  const HomeBanner = defineAsyncComponent(() => import('@/components/Home/HomeBanner.vue'))
  const HomeProfile = defineAsyncComponent(() => import('@/components/Home/HomeProfile.vue'))
  const HomeSkills = defineAsyncComponent(() => import('@/components/Home/HomeSkills.vue'))

</script>

<style scoped>

  /* --- 页面容器 --- */
  .dashboard-page {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    /* 电脑端默认间距 */
    padding-top: 60px;
    padding-bottom: 60px;
    gap: 60px;

    position: relative;
    overflow-x: hidden;
    background-color: transparent;
  }

  /* --- 背景光斑 --- */
  .bg-shape {
    position: absolute;
    filter: blur(100px);
    z-index: 0;
    opacity: 0.7;
    animation: float 10s infinite ease-in-out;
    border-radius: 50%;
    will-change: transform;
    /* 🚀 性能优化：提示浏览器优化动画 */
    /* 🚀 性能优化：使用 transform 代替 position，GPU 加速 */
    transform: translateZ(0);
  }

  .shape-1 {
    width: 300px;
    height: 300px;
    background: linear-gradient(135deg, #ffdde1 0%, #ee9ca7 100%);
    top: 15%;
    left: 10%;
  }

  .shape-2 {
    width: 400px;
    height: 400px;
    background: linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%);
    bottom: 10%;
    right: 10%;
    animation-delay: -5s;
  }

  @keyframes float {

    0%,
    100% {
      transform: translate3d(0, 0, 0);
      /* 🚀 使用 translate3d 启用 GPU 加速 */
    }

    50% {
      transform: translate3d(30px, -30px, 0);
    }
  }

  /* --- 核心 Grid 布局 --- */
  .main-container {
    display: grid;
    grid-template-columns: 0.9fr 1fr;
    gap: 40px;
    max-width: 1000px;
    width: 100%;
    z-index: 10;
    position: relative;
    padding: 0 20px;
  }

  /* --- 留言系统区域 --- */
  .comments-section {
    max-width: 1000px;
    width: 100%;
    padding: 0 20px;
    z-index: 10;
    position: relative;
  }

  /* --- 📱 手机端适配调整 --- */
  @media (max-width: 768px) {
    .dashboard-page {
      gap: 30px;
      padding-top: 30px;
    }

    .main-container {
      grid-template-columns: 1fr;
      gap: 30px;
    }

    /* 调整光斑位置，防止手机上挡住重要内容 */
    .shape-1 {
      top: 10%;
      left: -20%;
      opacity: 0.5;
      width: 200px;
      /* 🚀 优化：移动端减小光斑大小 */
      height: 200px;
    }

    .shape-2 {
      bottom: 5%;
      right: -20%;
      opacity: 0.5;
      width: 250px;
      /* 🚀 优化：移动端减小光斑大小 */
      height: 250px;
    }
  }

  /* 🚀 可访问性优化：支持减少动画偏好 */
  @media (prefers-reduced-motion: reduce) {
    .bg-shape {
      animation: none;
    }
  }
</style>