<template>
  <div class="greeting-container">
    <div class="divider-line"></div>
    <p class="greeting-text">{{ greetingText }}</p>
    <div class="divider-line"></div>
  </div>
</template>

<script setup>
  import { ref, onMounted, onBeforeUnmount } from 'vue'

  // 问候语文本
  const greetingText = ref('Good evening, Traveler.')

  // 获取中国时区（UTC+8）的当前小时
  const getChinaHour = () => {
    const now = new Date()
    // 获取UTC时间
    const utcTime = now.getTime() + (now.getTimezoneOffset() * 60000)
    // 转换为中国时区（UTC+8）
    const chinaTime = new Date(utcTime + (8 * 3600000))
    return chinaTime.getHours()
  }

  // 根据当前时间获取问候语
  const getGreeting = () => {
    const hour = getChinaHour()

    // 6:00-11:00 早上
    if (hour >= 6 && hour < 11) {
      return 'Good morning, Traveler.'
    }
    // 11:00-18:00 下午
    else if (hour >= 11 && hour < 18) {
      return 'Good afternoon, Traveler.'
    }
    // 18:00-6:00 晚上/夜里
    else {
      return 'Good evening, Traveler.'
    }
  }

  // 更新问候语
  const updateGreeting = () => {
    const newGreeting = getGreeting()
    if (greetingText.value !== newGreeting) {
      greetingText.value = newGreeting
    }
  }

  // 定时器
  let timeUpdateTimer = null

  onMounted(() => {
    // 立即更新一次
    updateGreeting()

    // 每5秒检查一次时间（确保跨小时时能及时更新）
    timeUpdateTimer = setInterval(() => {
      updateGreeting()
    }, 5000) // 5秒检查一次
  })

  onBeforeUnmount(() => {
    if (timeUpdateTimer) {
      clearInterval(timeUpdateTimer)
      timeUpdateTimer = null
    }
  })
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
