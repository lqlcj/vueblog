<!-- 个人信息卡 -->

<template>
  <div class="profile-card glass-panel" ref="cardRef" :style="cardStyle" @mouseleave="resetCard"
    @mousemove="handleMouseMove">
    <div class="card-content">
      <div class="avatar-placeholder">👨‍💻</div>
      <h1 class="name">Creator.</h1>
      <p class="role-text">I am <span class="typing-cursor">{{ typedText }}</span></p>
      <p class="bio">热衷于构建极致体验的 Web 应用。<br>设计与代码的混合体。</p>
      <div class="action-buttons">
        <button class="btn-primary" @click="$router.push('/blog')">阅读博客</button>
        <button class="btn-ghost" @click="$router.push('/about')">关于我</button>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
  import { useRouter } from 'vue-router'

  const router = useRouter()

  // 🚀 优化：打字机逻辑，使用更清晰的代码格式
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

  // 🚀 优化：清理定时器，避免内存泄漏
  onBeforeUnmount(() => {
    if (typeTimer) {
      clearTimeout(typeTimer)
      typeTimer = null
    }
  })

  // 🚀 优化：3D 视差逻辑，代码格式优化
  const mouseX = ref(0)
  const mouseY = ref(0)
  const cardRef = ref(null)

  const handleMouseMove = (e) => {
    if (!cardRef.value) return

    // 获取卡片自身的宽高，而不是整个窗口，这样更精准
    const rect = cardRef.value.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    mouseX.value = (x - rect.width / 2) / (rect.width / 2)
    mouseY.value = (y - rect.height / 2) / (rect.height / 2)
  }

  const cardStyle = computed(() => ({
    transform: `perspective(1000px) rotateX(${mouseY.value * -15}deg) rotateY(${mouseX.value * 15}deg)`,
    willChange: 'transform' // 🚀 性能优化：提示浏览器优化 3D 变换
  }))

  const resetCard = () => {
    mouseX.value = 0
    mouseY.value = 0
  }
</script>

<style scoped>

  /* 玻璃态基础样式，为了组件独立性，这里再写一遍，或者提取到全局 */
  .glass-panel {
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.8);
    border-radius: 24px;
    box-shadow: 0 8px 32px rgba(31, 38, 135, 0.05);
  }

  .profile-card {
    padding: 40px 30px;
    transition: transform 0.1s ease-out;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    transform-style: preserve-3d;
    /* 🚀 优化：保持 3D 变换 */
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

  .btn-primary:focus-visible,
  .btn-ghost:focus-visible {
    /* 🚀 可访问性优化：键盘导航焦点样式 */
    outline: 2px solid #2c3e50;
    outline-offset: 2px;
  }

  .btn-ghost {
    background: transparent;
    border: 2px solid #2c3e50;
    color: #2c3e50;
    padding: 8px 25px;
    border-radius: 10px;
    font-size: 0.95rem;
    cursor: pointer;
  }
</style>