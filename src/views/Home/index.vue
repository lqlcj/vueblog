<template>
  <div class="dashboard-page">
    <div class="bg-shape shape-1"></div>
    <div class="bg-shape shape-2"></div>

    <HomeBanner />

    <div class="main-container">
      <HomeProfile />
      <HomeSkills />
    </div>
  </div>
</template>

<script setup>
  import HomeBanner from '@/components/Home/HomeBanner.vue'
  import HomeProfile from '@/components/Home/HomeProfile.vue'
  import HomeSkills from '@/components/Home/HomeSkills.vue'
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
      transform: translate(0, 0);
    }

    50% {
      transform: translate(30px, -30px);
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

  /* --- 📱 手机端适配调整 --- */
  @media (max-width: 768px) {
    .dashboard-page {
      gap: 30px;
      /* 顶部留白也减小，防止第一屏太空 */
      padding-top: 30px;
    }

    .main-container {
      grid-template-columns: 1fr;
      /* 模块之间的间距也稍微收一点 */
      gap: 30px;
    }

    /* 调整一下光斑位置，防止手机上挡住重要内容 */
    .shape-1 {
      top: 10%;
      left: -20%;
      opacity: 0.5;
    }

    .shape-2 {
      bottom: 5%;
      right: -20%;
      opacity: 0.5;
    }
  }
</style>