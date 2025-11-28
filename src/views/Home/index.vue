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
  // 引入拆分好的组件
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
    padding-top: 60px;
    padding-bottom: 60px;
    position: relative;
    overflow-x: hidden;
    gap: 60px;
    /* 🔴 修改 1: 改成透明，只留光斑 */
    background-color: transparent;
  }

  /* --- 背景光斑 (保留 QQ 音乐风格) --- */
  .bg-shape {
    position: absolute;
    filter: blur(100px);
    z-index: 0;
    opacity: 0.7;
    animation: float 10s infinite ease-in-out;
    border-radius: 50%;
    /* 保持圆润 */
  }

  .shape-1 {
    width: 300px;
    height: 300px;
    background: linear-gradient(135deg, #ffdde1 0%, #ee9ca7 100%);
    /* 🔴 修改 2: 往下挪 (从 10% 改为 20%)，避开导航栏 */
    top: 12%;
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

  /* --- 核心 Grid 布局 (控制左右分栏) --- */
  .main-container {
    display: grid;
    grid-template-columns: 0.9fr 1fr;
    /* 左窄右宽 */
    gap: 40px;
    max-width: 1000px;
    width: 100%;
    z-index: 10;
    position: relative;
    padding: 0 20px;
  }

  @media (max-width: 768px) {
    .main-container {
      grid-template-columns: 1fr;
    }
  }
</style>