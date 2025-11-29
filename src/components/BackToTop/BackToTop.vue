<template>
  <transition name="fade-slide">
    <div v-if="visible" class="back-to-top" @click="scrollToTop" title="回到顶部">
      <span class="icon">↑</span>
    </div>
  </transition>
</template>

<script setup>
  import { ref, onMounted, onUnmounted } from 'vue'

  const visible = ref(false)

  // 1. 监听滚动事件
  const handleScroll = () => {
    // 当向下滚动超过 300px 时显示按钮
    visible.value = window.scrollY > 300
  }

  // 2. 核心功能：平滑滚动到顶部
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // 关键：平滑滚动
    })
  }

  onMounted(() => {
    window.addEventListener('scroll', handleScroll)
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })
</script>

<style scoped>
  .back-to-top {
    position: fixed;
    bottom: 40px;
    right: 40px;
    width: 50px;
    height: 50px;
    /* QQ音乐风格渐变 */
    background: linear-gradient(135deg, #ffdde1 0%, #ee9ca7 100%);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 999;
    /* 层级高一点，但不挡住 Header (1000) */
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
    transition: all 0.3s ease;

    /* 玻璃态边框感 */
    border: 2px solid rgba(255, 255, 255, 0.5);
  }

  .back-to-top:hover {
    transform: translateY(-5px) scale(1.1);
    /* 悬浮时上浮变大 */
    box-shadow: 0 8px 25px rgba(255, 154, 158, 0.4);
  }

  .icon {
    font-size: 1.5rem;
    color: #fff;
    font-weight: bold;
    line-height: 1;
  }

  /* --- 进出场动画 --- */
  .fade-slide-enter-active,
  .fade-slide-leave-active {
    transition: opacity 0.3s, transform 0.3s;
  }

  .fade-slide-enter-from,
  .fade-slide-leave-to {
    opacity: 0;
    transform: translateY(20px);
    /* 从下方滑入/滑出 */
  }

  /* 📱 手机端适配：位置稍微靠里一点，防止误触 */
  @media (max-width: 768px) {
    .back-to-top {
      bottom: 30px;
      right: 20px;
      width: 45px;
      height: 45px;
    }
  }
</style>
