<template>
  <div class="dashboard-grid">

    <div class="grid-card glass-panel pointer delay-1" @click="router.push('/blog?tag=tech')">
      <div class="icon-wrapper">
        <div class="icon-box">💻</div>
      </div>
      <div class="card-info">
        <h3>Coding</h3>
        <p class="sub-text">技术笔记 & 教程</p>
      </div>
      <div class="hover-arrow">↗</div>
    </div>

    <div class="grid-card glass-panel pointer delay-2" @click="router.push('/blog?tag=life')">
      <div class="icon-wrapper">
        <div class="icon-box">☕</div>
      </div>
      <div class="card-info">
        <h3>Lifestyle</h3>
        <p class="sub-text">碎碎念 & 摄影</p>
      </div>
      <div class="hover-arrow">↗</div>
    </div>

    <div class="grid-card glass-panel pointer delay-3" @click="router.push('/about')">
      <div class="icon-wrapper">
        <div class="icon-box">🧪</div>
      </div>
      <div class="card-info">
        <h3>Labs</h3>
        <p class="sub-text">好玩的实验</p>
      </div>
      <div class="hover-arrow">↗</div>
    </div>

    <div class="stat-card glass-panel delay-4">
      <div class="stat-header">
        <span class="stat-title">Year Progress (2025)</span>
        <span class="stat-value">{{ displayProgress }}%</span>
      </div>
      <div class="progress-bar">
        <div class="progress-fill" :style="{ width: barWidth + '%' }"></div>
      </div>
      <p class="stat-quote">Time flies, keep coding.</p>
    </div>

  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import { useRouter } from 'vue-router'

  const router = useRouter()
  // displayProgress 用于显示数字（会跳动），barWidth 用于进度条长度（丝滑）
  const displayProgress = ref('0.0')
  const barWidth = ref(0)

  onMounted(() => {
    // 1. 计算目标百分比
    const now = new Date()
    const start = new Date(now.getFullYear(), 0, 0)
    const diff = now - start
    const oneDay = 1000 * 60 * 60 * 24
    const day = Math.floor(diff / oneDay)
    const isLeap = (year) => new Date(year, 1, 29).getMonth() === 1
    const daysInYear = isLeap(now.getFullYear()) ? 366 : 365
    const targetVal = (day / daysInYear) * 100

    // 2. 启动进度条动画 (延迟一点点，让卡片先出来)
    setTimeout(() => {
      barWidth.value = targetVal
    }, 500)

    // 3. 启动数字滚动动画 (从0涨到目标值)
    let startVal = 0
    const duration = 1500 // 动画持续1.5秒
    const startTime = performance.now()

    const animateNumber = (currentTime) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)

      // 使用 easeOutQuart 缓动函数，让数字停下来的感觉更自然
      const ease = 1 - Math.pow(1 - progress, 4)

      const currentNum = startVal + (targetVal - startVal) * ease
      displayProgress.value = currentNum.toFixed(1)

      if (progress < 1) {
        requestAnimationFrame(animateNumber)
      }
    }

    // 延迟启动数字动画，配合进度条
    setTimeout(() => {
      requestAnimationFrame(animateNumber)
    }, 500)
  })
</script>

<style scoped>

  /* 保持原有的玻璃态 */
  .glass-panel {
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.8);
    border-radius: 24px;
    box-shadow: 0 8px 32px rgba(31, 38, 135, 0.05);
  }

  .dashboard-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }

  .pointer {
    cursor: pointer;
  }

  /* --- 卡片通用样式 --- */
  .grid-card {
    padding: 25px;
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    /* 更有弹性的过渡 */
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    overflow: hidden;

    /* 初始状态：用于进场动画 */
    opacity: 0;
    animation: slideUpFade 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
  }

  /* 进场动画关键帧 */
  @keyframes slideUpFade {
    from {
      opacity: 0;
      transform: translateY(30px);
    }

    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* 依次延迟进场，制造层次感 */
  .delay-1 {
    animation-delay: 0.1s;
  }

  .delay-2 {
    animation-delay: 0.2s;
  }

  .delay-3 {
    animation-delay: 0.3s;
  }

  .delay-4 {
    grid-column: span 2;
    animation-delay: 0.4s;
    /* 下面是 stat-card 的原有样式 */
    padding: 25px 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    /* stat-card 也是玻璃态，这里继承 .glass-panel 的样式 */
    opacity: 0;
    /* 也要初始隐藏 */
    animation: slideUpFade 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards 0.4s;
  }

  /* 悬停整体上浮 */
  .grid-card:hover {
    transform: translateY(-5px) scale(1.02);
    /* 微微放大 */
    background: rgba(255, 255, 255, 0.9);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  }

  /* 图标容器 (用于做果冻动画) */
  .icon-wrapper {
    width: fit-content;
    transition: transform 0.3s;
  }

  .icon-box {
    font-size: 2rem;
    margin-bottom: 15px;
  }

  /* 悬停时图标 Q 弹一下 */
  .grid-card:hover .icon-wrapper {
    animation: jelly 0.6s;
  }

  @keyframes jelly {

    0%,
    100% {
      transform: scale(1, 1);
    }

    25% {
      transform: scale(0.9, 1.1);
    }

    50% {
      transform: scale(1.1, 0.9);
    }

    75% {
      transform: scale(0.95, 1.05);
    }
  }

  .card-info h3 {
    margin: 0 0 5px 0;
    font-size: 1.1rem;
    color: #333;
    font-weight: 700;
  }

  .sub-text {
    font-size: 0.85rem;
    color: #888;
    margin: 0;
  }

  /* 箭头动效 */
  .hover-arrow {
    position: absolute;
    top: 20px;
    right: 20px;
    opacity: 0;
    transform: translate(-10px, 10px);
    transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
    /* 带弹性的飞入 */
    color: #6c5ce7;
    font-size: 1.2rem;
    font-weight: bold;
  }

  .grid-card:hover .hover-arrow {
    opacity: 1;
    transform: translate(0, 0);
  }

  /* --- 进度条卡片样式 --- */
  .stat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }

  .stat-title {
    font-size: 1rem;
    font-weight: 700;
    color: #555;
  }

  .stat-value {
    font-size: 1.2rem;
    font-weight: 800;
    color: #6c5ce7;
    font-variant-numeric: tabular-nums;
    /* 防止数字跳动时宽度抖动 */
  }

  .progress-bar {
    width: 100%;
    height: 10px;
    background: rgba(0, 0, 0, 0.05);
    border-radius: 10px;
    overflow: hidden;
    margin-bottom: 8px;
  }

  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #a8edea 0%, #fed6e3 100%);
    border-radius: 10px;
    /* 宽度变化动画 */
    transition: width 1.5s cubic-bezier(0.22, 1, 0.36, 1);
    width: 0;
    /* 初始为 0 */
  }

  .stat-quote {
    font-size: 0.8rem;
    color: #999;
    text-align: right;
    margin: 0;
    font-style: italic;
  }
</style>