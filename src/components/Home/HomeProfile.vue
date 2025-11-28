<!-- 
  个人信息和功能卡片合并组件
  功能：
  1. 个人信息展示（头像、名字、简介、按钮）
  2. 功能卡片网格（文章、关于、留言等）
  3. 年度进度条显示
-->

<template>
  <div class="profile-container">
    <!-- ========== 个人信息卡片 ========== -->
    <!-- 功能：展示个人基本信息，包含3D视差效果和打字机动画 -->
    <div class="profile-card glass-panel" ref="cardRef" :style="cardStyle" @mouseleave="resetCard"
      @mousemove="handleMouseMove">
      <div class="card-content">
        <!-- 头像占位符 -->
        <div class="avatar-placeholder">👨‍💻</div>

        <!-- 名字标题 -->
        <h1 class="name">Creator.</h1>

        <!-- 打字机效果：动态显示 "Building for the Web." -->
        <p class="role-text">I am <span class="typing-cursor">{{ typedText }}</span></p>

        <!-- 个人简介 -->
        <p class="bio">热衷于构建极致体验的 Web 应用。<br>设计与代码的混合体。</p>

        <!-- 操作按钮 -->
        <div class="action-buttons">
          <button class="btn-primary" @click="$router.push('/blog')">阅读博客</button>
          <button class="btn-ghost" @click="$router.push('/about')">关于我</button>
        </div>
      </div>
    </div>

    <!-- ========== 功能卡片网格 ========== -->
    <!-- 功能：展示网站主要功能入口，包含动画效果和交互 -->
    <div class="dashboard-grid">
      <!-- 文章卡片 -->
      <div class="grid-card glass-panel pointer delay-1" @click="router.push('/blog')">
        <div class="icon-wrapper">
          <div class="icon-box">📝</div>
        </div>
        <div class="card-info">
          <h3>文章</h3>
          <p class="sub-text">写的一些东西</p>
        </div>
        <div class="hover-arrow">↗</div>
      </div>

      <!-- 关于卡片 -->
      <div class="grid-card glass-panel pointer delay-2" @click="router.push('/about')">
        <div class="icon-wrapper">
          <div class="icon-box">🙋</div>
        </div>
        <div class="card-info">
          <h3>关于</h3>
          <p class="sub-text">关于这个网站</p>
        </div>
        <div class="hover-arrow">↗</div>
      </div>

      <!-- 留言卡片 -->
      <div class="grid-card glass-panel pointer delay-3" @click="router.push('/home#comments')">
        <div class="icon-wrapper">
          <div class="icon-box">💬</div>
        </div>
        <div class="card-info">
          <h3>留言</h3>
          <p class="sub-text">说点什么吧</p>
        </div>
        <div class="hover-arrow">↗</div>
      </div>

      <!-- 年度进度条卡片 -->
      <!-- 功能：显示当前年份的进度百分比，包含动画效果 -->
      <div class="stat-card glass-panel delay-4">
        <div class="stat-header">
          <span class="stat-title">今年进度</span>
          <span class="stat-value">{{ displayProgress }}%</span>
        </div>
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: barWidth + '%' }"></div>
        </div>
        <p class="stat-quote">时间过得真快</p>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted, computed } from 'vue'
  import { useRouter } from 'vue-router'

  const router = useRouter()

  // ========== 打字机效果逻辑 ==========
  // 功能：逐字显示文本，营造动态效果
  const fullText = "Building for the Web."
  const typedText = ref('')
  let charIndex = 0
  let typeTimer = null

  const typeWriter = () => {
    if (charIndex < fullText.length) {
      typedText.value += fullText.charAt(charIndex)
      charIndex++
      typeTimer = setTimeout(typeWriter, 100)
    }
  }

  onMounted(() => {
    typeWriter()
  })

  // ========== 3D 视差效果逻辑 ==========
  // 功能：根据鼠标位置实现卡片3D倾斜效果
  const mouseX = ref(0)
  const mouseY = ref(0)
  const cardRef = ref(null)

  const handleMouseMove = (e) => {
    if (!cardRef.value) return
    const rect = cardRef.value.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    mouseX.value = (x - rect.width / 2) / (rect.width / 2)
    mouseY.value = (y - rect.height / 2) / (rect.height / 2)
  }

  const cardStyle = computed(() => ({
    transform: `perspective(1000px) rotateX(${mouseY.value * -15}deg) rotateY(${mouseX.value * 15}deg)`,
    willChange: 'transform'
  }))

  const resetCard = () => {
    mouseX.value = 0
    mouseY.value = 0
  }

  // ========== 年度进度条逻辑 ==========
  // 功能：计算并显示当前年份的进度百分比，包含动画效果
  const displayProgress = ref('0.0')
  const barWidth = ref(0)

  onMounted(() => {
    const now = new Date()
    const start = new Date(now.getFullYear(), 0, 0)
    const diff = now - start
    const oneDay = 1000 * 60 * 60 * 24
    const day = Math.floor(diff / oneDay)
    const isLeap = (year) => new Date(year, 1, 29).getMonth() === 1
    const daysInYear = isLeap(now.getFullYear()) ? 366 : 365
    const targetVal = (day / daysInYear) * 100

    setTimeout(() => {
      barWidth.value = targetVal
    }, 500)

    let startVal = 0
    const duration = 1500
    const startTime = performance.now()

    const animateNumber = (currentTime) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const ease = 1 - Math.pow(1 - progress, 4)
      const currentNum = startVal + (targetVal - startVal) * ease
      displayProgress.value = currentNum.toFixed(1)

      if (progress < 1) {
        requestAnimationFrame(animateNumber)
      }
    }

    setTimeout(() => {
      requestAnimationFrame(animateNumber)
    }, 500)
  })
</script>

<style scoped>

  /* ========== 容器布局 ========== */
  .profile-container {
    display: grid;
    grid-template-columns: 0.9fr 1fr;
    gap: 40px;
    width: 100%;
  }

  /* ========== 玻璃态基础样式 ========== */
  .glass-panel {
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.8);
    border-radius: 24px;
    box-shadow: 0 8px 32px rgba(31, 38, 135, 0.05);
  }

  /* ========== 个人信息卡片样式 ========== */
  .profile-card {
    padding: 40px 30px;
    transition: transform 0.1s ease-out;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    transform-style: preserve-3d;
  }

  .avatar-placeholder {
    font-size: 3rem;
    margin-bottom: 15px;
  }

  .name {
    font-size: 2.5rem;
    font-weight: 900;
    margin: 0;
    color: #2c3e50;
    line-height: 1.1;
    letter-spacing: -1px;
  }

  .role-text {
    font-size: 1.2rem;
    color: #666;
    margin: 10px 0 20px;
    font-family: monospace;
  }

  .bio {
    font-size: 1rem;
    color: #888;
    line-height: 1.6;
    margin-bottom: 30px;
  }

  .typing-cursor::after {
    content: '|';
    animation: blink 1s infinite;
  }

  @keyframes blink {
    50% {
      opacity: 0;
    }
  }

  .action-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

  .btn-primary {
    background: #2c3e50;
    color: white;
    border: none;
    padding: 10px 25px;
    border-radius: 10px;
    font-size: 0.95rem;
    cursor: pointer;
    transition: all 0.3s;
    margin: 0;
  }

  .btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }

  .btn-ghost {
    background: transparent;
    border: 2px solid #2c3e50;
    color: #2c3e50;
    padding: 8px 25px;
    border-radius: 10px;
    font-size: 0.95rem;
    cursor: pointer;
    transition: all 0.3s;
  }

  .btn-ghost:hover {
    background: rgba(44, 62, 80, 0.1);
    transform: translateY(-2px);
  }

  /* ========== 功能卡片网格样式 ========== */
  .dashboard-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }

  .grid-card {
    padding: 24px;
    position: relative;
    transition: all 0.3s ease;
    cursor: pointer;
    overflow: hidden;
  }

  .grid-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 40px rgba(31, 38, 135, 0.1);
  }

  .pointer {
    cursor: pointer;
  }

  .icon-wrapper {
    margin-bottom: 12px;
  }

  .icon-box {
    font-size: 2.5rem;
    display: inline-block;
    transition: transform 0.3s ease;
  }

  .grid-card:hover .icon-box {
    transform: scale(1.1) rotate(5deg);
  }

  .card-info h3 {
    font-size: 1.3rem;
    font-weight: 700;
    color: #2c3e50;
    margin: 0 0 6px 0;
  }

  .sub-text {
    font-size: 0.85rem;
    color: #888;
    margin: 0;
  }

  .hover-arrow {
    position: absolute;
    top: 20px;
    right: 20px;
    font-size: 1.2rem;
    opacity: 0;
    transition: opacity 0.3s ease;
    color: #2c3e50;
  }

  .grid-card:hover .hover-arrow {
    opacity: 1;
  }

  /* ========== 年度进度条卡片样式 ========== */
  .stat-card {
    grid-column: 1 / -1;
    padding: 24px;
  }

  .stat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
  }

  .stat-title {
    font-size: 1rem;
    color: #666;
    font-weight: 500;
  }

  .stat-value {
    font-size: 1.5rem;
    font-weight: 700;
    color: #2c3e50;
  }

  .progress-bar {
    width: 100%;
    height: 8px;
    background: rgba(44, 62, 80, 0.1);
    border-radius: 4px;
    overflow: hidden;
    margin-bottom: 12px;
  }

  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #6c5ce7 0%, #a29bfe 100%);
    border-radius: 4px;
    transition: width 1.5s ease;
  }

  .stat-quote {
    font-size: 0.85rem;
    color: #999;
    margin: 0;
    font-style: italic;
  }

  /* ========== 进场动画 ========== */
  .delay-1 {
    animation: fadeInUp 0.6s ease 0.1s both;
  }

  .delay-2 {
    animation: fadeInUp 0.6s ease 0.2s both;
  }

  .delay-3 {
    animation: fadeInUp 0.6s ease 0.3s both;
  }

  .delay-4 {
    animation: fadeInUp 0.6s ease 0.4s both;
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

  /* ========== 响应式设计 ========== */
  @media (max-width: 768px) {
    .profile-container {
      grid-template-columns: 1fr;
      gap: 30px;
    }

    .dashboard-grid {
      grid-template-columns: 1fr;
    }

    .stat-card {
      grid-column: 1;
    }

    .profile-card {
      padding: 30px 20px;
    }

    .name {
      font-size: 2rem;
    }

    .avatar-placeholder {
      font-size: 2.5rem;
    }
  }
</style>
