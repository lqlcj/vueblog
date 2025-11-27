<template>
  <div class="dashboard-page" @mousemove="handleMouseMove">
    <div class="bg-shape shape-1"></div>
    <div class="bg-shape shape-2"></div>

    <div class="note-wrapper">
      <section class="intro-banner">
        <div class="tape-left"></div>
        <div class="tape-right"></div>
        <div class="banner-content">
          <h2 class="handwritten">Good Morning, Traveler.</h2>
          <p>欢迎回到小屋。外面风大，进来喝杯茶吧。</p>
        </div>
      </section>
    </div>

    <div class="main-container">

      <div class="profile-card glass-panel" ref="cardRef" :style="cardStyle" @mouseleave="resetCard">
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

      <div class="skills-grid">
        <div class="skill-card glass-panel">
          <div class="icon-box">⚡</div>
          <h3>Tech Stack</h3>
          <div class="tags"><span class="tag">Vue 3</span><span class="tag">Vite</span></div>
        </div>
        <div class="skill-card glass-panel">
          <div class="icon-box">🧠</div>
          <h3>Workflow</h3>
          <div class="tags"><span class="tag">Obsidian</span><span class="tag">Notion</span></div>
        </div>
        <div class="skill-card glass-panel">
          <div class="icon-box">🎨</div>
          <h3>Design</h3>
          <div class="tags"><span class="tag">Affinity</span><span class="tag">Figma</span></div>
        </div>
        <div class="stat-card glass-panel">
          <div class="stat-number">99+</div>
          <div class="stat-label">Ideas Pending</div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
  // JS 部分保持不变
  import { ref, onMounted, computed } from 'vue'

  // --- 打字机逻辑 ---
  const fullText = "Building for the Web."
  const typedText = ref('')
  let charIndex = 0
  const typeWriter = () => { if (charIndex < fullText.length) { typedText.value += fullText.charAt(charIndex); charIndex++; setTimeout(typeWriter, 100); } }
  onMounted(() => { typeWriter() })

  // --- 3D 视差逻辑 ---
  const mouseX = ref(0); const mouseY = ref(0);
  const handleMouseMove = (e) => {
    const w = window.innerWidth; const h = window.innerHeight;
    mouseX.value = (e.clientX - w / 2) / (w / 2); mouseY.value = (e.clientY - h / 2) / (h / 2);
  }
  const cardStyle = computed(() => { return { transform: `perspective(1000px) rotateX(${mouseY.value * -15}deg) rotateY(${mouseX.value * 15}deg)` } })
  const resetCard = () => { mouseX.value = 0; mouseY.value = 0; }
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@700&display=swap');

  /* --- 布局容器 --- */
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
    /* 如果希望整个页面背景也有一个淡淡的底色，可以加上这行，不加也行，靠光斑撑起氛围 */
    /* background: linear-gradient(to bottom right, #fdfbfb, #ebedee); */
  }

  /* --- 背景光斑 (形状不变，只改颜色) --- */
  .bg-shape {
    position: absolute;
    filter: blur(80px);
    z-index: 0;
    opacity: 0.6;
    animation: float 10s infinite ease-in-out;
  }

  .shape-1 {
    width: 300px;
    height: 300px;
    /* background: #ff9a9e; <-- 旧颜色 */
    /* 🔴 新颜色：左上角用暖粉色渐变，模拟QQ音乐的暖调 */
    background: linear-gradient(135deg, #ffdde1 0%, #ee9ca7 100%);
    top: 10%;
    left: 10%;
  }

  .shape-2 {
    width: 400px;
    height: 400px;
    /* background: #a18cd1; <-- 旧颜色 */
    /* 🔴 新颜色：右下角用柔和的紫/蓝渐变，增加层次感 */
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

  /* --- 黄色便签 (加大 & 居中版) --- */
  .note-wrapper {
    z-index: 20;
    width: 100%;
    display: flex;
    justify-content: center;
    animation: dropDown 0.8s ease-out;
  }

  @keyframes dropDown {
    from {
      transform: translateY(-50px);
      opacity: 0;
    }

    to {
      transform: translateY(0);
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
    transition: transform 0.3s;
    max-width: 900px;
    width: 90%;
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

  /* --- 3D 玻璃主容器 --- */
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

  /* 玻璃态通用 */
  .glass-panel {
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.8);
    border-radius: 24px;
    box-shadow: 0 8px 32px rgba(31, 38, 135, 0.05);
  }

  /* --- 左侧卡片 (Creator) - 调小 --- */
  .profile-card {
    padding: 40px 30px;
    transition: transform 0.1s ease-out;
    display: flex;
    flex-direction: column;
    justify-content: center;
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
  }

  /* --- 右侧网格 (技能卡) --- */
  .skills-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }

  .skill-card {
    padding: 25px;
    transition: all 0.3s ease;
  }

  .skill-card:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.9);
  }

  .icon-box {
    font-size: 2rem;
    margin-bottom: 10px;
  }

  .skill-card h3 {
    margin: 0 0 15px 0;
    font-size: 1.1rem;
    color: #333;
  }

  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .tag {
    font-size: 0.8rem;
    background: rgba(0, 0, 0, 0.05);
    padding: 4px 10px;
    border-radius: 6px;
    color: #555;
  }

  .stat-card {
    grid-column: span 2;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 30px;
    background: linear-gradient(135deg, #fff 0%, #f3f4f6 100%);
  }

  .stat-number {
    font-size: 2.5rem;
    font-weight: 800;
    color: #ff7e5f;
  }

  .stat-label {
    font-size: 1.1rem;
    color: #888;
    font-weight: 600;
  }

  @media (max-width: 768px) {
    .main-container {
      grid-template-columns: 1fr;
    }

    .intro-banner {
      margin-bottom: 20px;
      width: 90%;
      padding: 20px;
    }

    .banner-content h2 {
      font-size: 2.2rem;
    }
  }
</style>