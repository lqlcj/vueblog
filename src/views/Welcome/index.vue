<!-- 欢迎页 -->

<template>
  <div class="ghibli-container">
    <div class="sky-background">
      <div class="cloud cloud-1"></div>
      <div class="cloud cloud-2"></div>
      <div class="cloud cloud-3"></div>
    </div>

    <div class="content-scroll">

      <section class="section hero-section scroll-item">
        <div class="hero-content text-center">
          <h1 class="main-title">
            <span class="handwritten">Welcome to my</span><br>
            Digital Garden.
          </h1>
          <p class="intro-text">
            这里没有复杂的代码，只有一些关于创造的故事。<br>
            回归最纯粹的记录，一个安静记录想法的地方。
          </p>
          <div class="scroll-indicator">
            <span>↓ 向下探索旅程</span>
          </div>
        </div>
      </section>

      <section class="section about-section">
        <div class="container split-layout">
          <div class="text-box scroll-item">
            <h2 class="section-title handwritten">The Story.</h2>
            <p>
              就像宫崎骏电影里那些独自出发的主角一样，我也是一名在数字世界探索的旅人。
            </p>
            <p>
              我不追求最酷炫的技术，我更在意技术如何给人带来温暖的体验。我喜欢 Vue 的简洁，喜欢 Markdown 的纯粹，就像喜欢雨后的森林。
            </p>
          </div>
          <div class="illustration-box scroll-item delay-200">
            <div class="placeholder-art art-forest">
              🌲🌳🌿
              <span>(Welcome)</span>
            </div>
          </div>
        </div>
      </section>

      <section class="section skills-section">
        <div class="container text-center mb-5 scroll-item">
          <h2 class="section-title handwritten">The Magic.</h2>
          <p>就像魔女基奇的扫把和收音机，这些是我创造魔法的道具。</p>
        </div>

        <div class="skills-grid container">
          <div class="skill-card scroll-item">
            <div class="card-icon" style="background: #e3f2fd;">🎐</div>
            <h3>Vue & Vite</h3>
            <p>轻盈、快速，像风一样构建界面。</p>
          </div>
          <div class="skill-card scroll-item delay-100">
            <div class="card-icon" style="background: #f1f8e9;">🍃</div>
            <h3>CSS & Design</h3>
            <p>用色彩和布局绘制网页的风景。</p>
          </div>
          <div class="skill-card scroll-item delay-200">
            <div class="card-icon" style="background: #fff3e0;">📜</div>
            <h3>Markdown</h3>
            <p>最纯粹的记录方式，回归书写本质。</p>
          </div>
        </div>
      </section>

      <section class="section footer-section text-center scroll-item">
        <h2 class="handwritten end-title">Ready to enter?</h2>

        <button class="soft-btn" @click="enterHome">进入主页 / Enter Home ➞</button>
      </section>

    </div>
  </div>
</template>

<script setup>
  import { onMounted, onUnmounted } from 'vue'
  import { useRouter } from 'vue-router'

  const router = useRouter()

  const enterHome = () => {
    router.push('/home')
  }

  // --- 滚动监听动画逻辑 ---
  let observer = null

  onMounted(() => {
    const scrollItems = document.querySelectorAll('.scroll-item')

    const options = {
      root: null,
      // 阈值设小一点，让元素更早开始准备动画
      threshold: 0.1,
      // rootMargin 向下扩大一点，让元素在还没完全进入屏幕时就开始渲染，减少视觉突兀感
      rootMargin: "0px 0px -50px 0px"
    }

    const observerCallback = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          observer.unobserve(entry.target)
        }
      })
    }

    observer = new IntersectionObserver(observerCallback, options)
    scrollItems.forEach(item => {
      observer.observe(item)
    })
  })

  onUnmounted(() => {
    if (observer) observer.disconnect()
  })
</script>

<style scoped>

  :root {
    --ghibli-blue: #a7d0e8;
    --ghibli-cream: #fef9e7;
    --ghibli-green: #c5e1a5;
    --text-dark: #5d6d7e;
    --text-soft: #8a9a9b;
  }

  .ghibli-container {
    min-height: 300vh;
    background-color: var(--ghibli-cream);
    color: var(--text-dark);
    /* 使用你之前确定的楷体方案 */
    font-family: "KaiTi SC", "STKaiti", "KaiTi", "楷体", "FangSong", "SimSun", serif;
    overflow-x: hidden;
    position: relative;
  }

  .handwritten {
    /* 使用你下载好的本地 Caveat */
    font-family: 'Caveat', cursive;
    color: #34495e;
  }

  .text-center {
    text-align: center;
  }

  .container {
    max-width: 1000px;
    margin: 0 auto;
    padding: 0 20px;
  }

  /* --- 动态天空背景 (性能优化版) --- */
  .sky-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: linear-gradient(to bottom, #d4eaff 0%, #fef9e7 80%);
    z-index: 0;
    overflow: hidden;
    /* 强制 GPU 渲染整个背景层 */
    transform: translateZ(0);
  }

  .cloud {
    position: absolute;
    border-radius: 50%;
    filter: blur(60px);
    opacity: 0.6;
    animation: floatCloud 60s infinite linear;
    /* 🚀 性能关键：开启 GPU 加速，防止背景卡顿 */
    will-change: transform;
    transform: translateZ(0);
  }

  .cloud-1 {
    width: 600px;
    height: 600px;
    background: #fff;
    top: -200px;
    left: -10%;
    animation-duration: 80s;
  }

  .cloud-2 {
    width: 800px;
    height: 800px;
    background: #e3f2fd;
    bottom: -300px;
    right: -20%;
    animation-duration: 100s;
    animation-delay: -20s;
  }

  .cloud-3 {
    width: 400px;
    height: 400px;
    background: #ffffff;
    top: 30%;
    left: 40%;
    opacity: 0.4;
    animation-duration: 120s;
    animation-delay: -10s;
  }

  @keyframes floatCloud {
    0% {
      transform: translate3d(0, 0, 0) scale(1);
    }

    /* 使用 3d 强制 GPU */
    50% {
      transform: translate3d(100px, 50px, 0) scale(1.1);
    }

    100% {
      transform: translate3d(0, 0, 0) scale(1);
    }
  }

  .content-scroll {
    position: relative;
    z-index: 1;
  }

  .section {
    min-height: 80vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 100px 0;
  }

  .section-title {
    font-size: 3rem;
    margin-bottom: 30px;
  }

  /* Hero */
  .main-title {
    font-size: 4.5rem;
    line-height: 1.2;
    margin-bottom: 30px;
    color: #2c3e50;
  }

  .main-title .handwritten {
    font-size: 3.5rem;
    color: #3498db;
  }

  .intro-text {
    font-size: 1.3rem;
    color: var(--text-dark);
    max-width: 600px;
    margin: 0 auto 60px;
    line-height: 1.8;
  }

  .scroll-indicator {
    font-size: 1rem;
    color: var(--text-soft);
    animation: bounce 2s infinite;
  }

  @keyframes bounce {

    0%,
    20%,
    50%,
    80%,
    100% {
      transform: translateY(0);
    }

    40% {
      transform: translateY(-10px);
    }

    60% {
      transform: translateY(-5px);
    }
  }

  /* About */
  .split-layout {
    display: flex;
    align-items: center;
    gap: 60px;
  }

  .text-box {
    flex: 1;
  }

  .text-box p {
    font-size: 1.2rem;
    line-height: 1.8;
    margin-bottom: 20px;
    color: var(--text-dark);
  }

  .illustration-box {
    flex: 1;
  }

  .placeholder-art {
    height: 400px;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 5rem;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.05);
    border: 4px solid white;
  }

  .art-forest {
    background: linear-gradient(to top, var(--ghibli-green), #e8f5e9);
    color: #2e7d32;
  }

  .placeholder-art span {
    font-size: 1.2rem;
    margin-top: 20px;
    opacity: 0.7;
  }

  /* Skills */
  .skills-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
  }

  .skill-card {
    background: rgba(255, 255, 255, 0.8);
    /* 毛玻璃效果很吃性能，如果手机卡，可以注释掉下面这行 backdrop-filter */
    backdrop-filter: blur(10px);
    padding: 40px;
    border-radius: 24px;
    text-align: center;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
    border: 2px solid white;
    transition: transform 0.3s ease;
    will-change: transform;
    /* 性能优化 */
  }

  .skill-card:hover {
    transform: translateY(-10px);
  }

  .card-icon {
    width: 80px;
    height: 80px;
    line-height: 80px;
    font-size: 3rem;
    border-radius: 50%;
    margin: 0 auto 25px;
  }

  .skill-card h3 {
    margin-bottom: 15px;
    font-size: 1.4rem;
  }

  .skill-card p {
    color: var(--text-soft);
    line-height: 1.6;
  }

  /* Footer */
  .end-title {
    font-size: 4rem;
    margin-bottom: 20px;
  }

  .soft-btn {
    margin-top: 30px;
    padding: 15px 40px;
    background: #a7d0e8;
    color: white;
    border: none;
    border-radius: 50px;
    font-size: 1.2rem;
    cursor: pointer;
    box-shadow: 0 10px 20px -5px rgba(167, 208, 232, 0.5);
    transition: all 0.3s ease;
  }

  .soft-btn:hover {
    background: #8dc3e3;
    transform: translateY(-3px);
    box-shadow: 0 15px 25px -5px rgba(167, 208, 232, 0.6);
  }

  /* --- 🚀 核心：超丝滑滚动动画 --- */
  .scroll-item {
    opacity: 0;
    transform: translateY(40px);
    /* 移动距离减小，让动画更紧凑 */

    /* 🚀 关键修改：更高级的贝塞尔曲线 */
    /* 这叫 Ease Out Expo，效果是：快起步 -> 极其平滑的减速停车 */
    transition: opacity 1s cubic-bezier(0.16, 1, 0.3, 1),
      transform 1s cubic-bezier(0.16, 1, 0.3, 1);

    will-change: opacity, transform;
    /* 告诉浏览器提前准备显卡 */
  }

  .scroll-item.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .delay-100 {
    transition-delay: 0.1s;
  }

  .delay-200 {
    transition-delay: 0.2s;
  }

  /* --- 手机端 --- */
  @media (max-width: 768px) {
    .main-title {
      font-size: 3rem;
    }

    .main-title .handwritten {
      font-size: 2.5rem;
    }

    .split-layout {
      flex-direction: column;
      gap: 30px;
    }

    .skills-grid {
      grid-template-columns: 1fr;
    }

    .placeholder-art {
      height: 250px;
    }

    .soft-btn {
      padding: 12px 30px;
      font-size: 1rem;
    }

    /* 手机端禁用 backdrop-filter 以提升滚动帧率 */
    .skill-card {
      backdrop-filter: none;
      background: rgba(255, 255, 255, 0.95);
    }
  }
</style>