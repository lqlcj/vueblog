<template>
  <div class="dashboard-page" @mousemove="handleMouseMove">
    <div class="bg-shape shape-1"></div>
    <div class="bg-shape shape-2"></div>

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
  import { ref, onMounted, computed } from 'vue'

  // --- 打字机 & 3D视差逻辑 (直接复用之前的代码) ---
  const fullText = "Building for the Web."
  const typedText = ref('')
  let charIndex = 0
  const typeWriter = () => { if (charIndex < fullText.length) { typedText.value += fullText.charAt(charIndex); charIndex++; setTimeout(typeWriter, 100); } }
  onMounted(() => { typeWriter() })

  const mouseX = ref(0); const mouseY = ref(0);
  const handleMouseMove = (e) => {
    const w = window.innerWidth; const h = window.innerHeight;
    mouseX.value = (e.clientX - w / 2) / (w / 2); mouseY.value = (e.clientY - h / 2) / (h / 2);
  }
  const cardStyle = computed(() => { return { transform: `perspective(1000px) rotateX(${mouseY.value * -15}deg) rotateY(${mouseX.value * 15}deg)` } })
  const resetCard = () => { mouseX.value = 0; mouseY.value = 0; }
</script>

<style scoped>

  /* --- 复用之前的 Glassmorphism CSS --- */
  .dashboard-page {
    min-height: 90vh;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
    padding: 20px;
  }

  .bg-shape {
    position: absolute;
    filter: blur(80px);
    /* 🔴 修改这里：从 -1 改成 0 */
    /* 让它浮在 App 背景图上面，但不要沉底 */
    z-index: 0;
    opacity: 0.6;
    animation: float 10s infinite ease-in-out;
  }

  .shape-1 {
    width: 300px;
    height: 300px;
    background: #ff9a9e;
    top: 10%;
    left: 10%;
  }

  .shape-2 {
    width: 400px;
    height: 400px;
    background: #a18cd1;
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

  .main-container {
    display: grid;
    grid-template-columns: 1.2fr 1fr;
    gap: 40px;
    max-width: 1000px;
    width: 100%;
    /* 🔴 修改这里：确保内容层比光斑高 */
    /* 之前是 1，改成 10 更保险，防止被光斑挡住 */
    z-index: 10;
    position: relative;
    /* 确保 z-index 生效 */
  }

  .glass-panel {
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.8);
    border-radius: 24px;
    box-shadow: 0 8px 32px rgba(31, 38, 135, 0.05);
  }

  .profile-card {
    padding: 60px 40px;
    transition: transform 0.1s ease-out;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .avatar-placeholder {
    font-size: 4rem;
    margin-bottom: 20px;
  }

  .name {
    font-size: 3.5rem;
    font-weight: 900;
    margin: 0;
    color: #2c3e50;
    line-height: 1.1;
    letter-spacing: -2px;
  }

  .role-text {
    font-size: 1.5rem;
    color: #666;
    margin: 10px 0 30px;
    font-family: monospace;
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

  .bio {
    font-size: 1.1rem;
    color: #888;
    line-height: 1.6;
    margin-bottom: 40px;
  }

  .btn-primary {
    background: #2c3e50;
    color: white;
    border: none;
    padding: 12px 30px;
    border-radius: 12px;
    font-size: 1rem;
    cursor: pointer;
    margin-right: 15px;
    transition: all 0.3s;
  }

  .btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }

  .btn-ghost {
    background: transparent;
    border: 2px solid #2c3e50;
    color: #2c3e50;
    padding: 10px 30px;
    border-radius: 12px;
    font-size: 1rem;
    cursor: pointer;
  }

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
  }
</style>