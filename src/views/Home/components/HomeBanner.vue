<!-- 黄色便签 -->

<template>
  <div class="note-wrapper">
    <section class="intro-banner">
      <div class="tape-left"></div>
      <div class="tape-right"></div>
      <div class="banner-content">
        <h2 class="handwritten">{{ greeting }}</h2>
        <p>欢迎回到小屋。进来喝杯咖啡吧。</p>
      </div>
    </section>
  </div>
</template>

<script setup>
  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning, Traveler.'
    if (hour < 18) return 'Good afternoon, Traveler.'
    return 'Good evening, Traveler.'
  }

  const greeting = getGreeting()
</script>

<style scoped>

  /* 只需要保留和 Banner 相关的 CSS */
  .note-wrapper {
    z-index: 20;
    width: 100%;
    display: flex;
    justify-content: center;
    animation: dropDown 0.8s ease-out;
    will-change: transform, opacity;
    /* 🚀 性能优化 */
  }

  @keyframes dropDown {
    from {
      transform: translate3d(0, -50px, 0);
      /* 🚀 使用 translate3d 启用 GPU 加速 */
      opacity: 0;
    }

    to {
      transform: translate3d(0, 0, 0);
      opacity: 1;
    }
  }

  .intro-banner {
    background-color: #fff9c4;
    padding: 30px 80px;
    position: relative;
    text-align: center;
    transform: rotate(-2deg);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
    max-width: 900px;
    width: 90%;
    will-change: transform;
    /* 🚀 性能优化 */
  }

  .intro-banner:hover {
    transform: rotate(0deg) scale(1.02);
  }

  .tape-left,
  .tape-right {
    position: absolute;
    top: -15px;
    width: 120px;
    height: 35px;
    background-color: rgba(220, 200, 150, 0.6);
    backdrop-filter: blur(2px);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  .tape-left {
    left: 20px;
    transform: rotate(-3deg);
  }

  .tape-right {
    right: 20px;
    transform: rotate(4deg);
  }

  .banner-content h2 {
    font-family: 'Caveat', cursive;
    font-size: 3rem;
    margin: 0 0 10px 0;
    color: #5d4037;
  }

  .banner-content p {
    font-family: sans-serif;
    margin: 0;
    color: #795548;
    font-size: 1.2rem;
  }

  @media (max-width: 768px) {
    .intro-banner {
      margin-bottom: 20px;
      width: 90%;
      padding: 20px;
    }

    .banner-content h2 {
      font-size: 2.2rem;
    }
  }

  /* 🚀 可访问性优化：支持减少动画偏好 */
  @media (prefers-reduced-motion: reduce) {
    .note-wrapper {
      animation: none;
    }

    .intro-banner {
      transform: none;
    }

    .intro-banner:hover {
      transform: scale(1.02);
    }
  }
</style>


