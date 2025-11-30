<template>
  <div class="greeting-container">
    <div class="divider-line"></div>
    <p class="greeting-text">{{ greetingText }}</p>
    <div class="divider-line"></div>
  </div>
</template>

<script setup>
  import { computed } from 'vue'

  // 根据当前时间获取问候语
  const getGreeting = () => {
    const hour = new Date().getHours()

    if (hour >= 6 && hour < 11) {
      return 'Good morning, Traveler.'
    } else if (hour >= 11 && hour < 18) {
      return 'Good afternoon, Traveler.'
    } else {
      // 18:00-6:00
      return 'Good evening, Traveler.'
    }
  }

  const greetingText = computed(() => getGreeting())
</script>

<style scoped>
  .greeting-container {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px 0;
    gap: 24px;
    animation: fadeInUp 0.6s ease 0.5s both;
  }

  .divider-line {
    flex: 1;
    height: 1px;
    background: linear-gradient(to right, transparent, #d4c5b0, transparent);
    max-width: 200px;
  }

  .greeting-text {
    font-size: 3rem;
    font-weight: 400;
    color: #2c3e50;
    margin: 0;
    letter-spacing: 2px;
    font-family: 'Caveat', 'Conv_FuturaStd-Book', cursive;
    line-height: 1.4;
    text-align: center;
    white-space: nowrap;
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }

    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* 响应式设计 */
  @media (max-width: 768px) {
    .greeting-container {
      padding: 15px 0;
      gap: 16px;
    }

    .greeting-text {
      font-size: 2.2rem;
      letter-spacing: 1px;
    }

    .divider-line {
      max-width: 100px;
    }
  }

  /* 可访问性优化 */
  @media (prefers-reduced-motion: reduce) {
    .greeting-container {
      animation: none;
    }
  }
</style>
