<template>
  <!-- Ghibli-style welcome component with gradient background -->
  <div class="ghibli-container">
    <!-- Static sky gradient: removed heavy blurred clouds to improve performance -->
    <div class="sky-background"></div>
    <div class="content-scroll">
      <!-- Hero section -->
      <section class="section hero-section scroll-item">
        <div class="hero-content text-center">
          <h1 class="main-title">
            <span class="handwritten">Welcome to my</span><br />
            Digital Garden.
          </h1>
          <p class="intro-text">
            这里没有复杂的代码，只有一些关于创造的故事。<br />
            回归最纯粹的记录，一个安静记录想法的地方。
          </p>
          <div class="scroll-indicator">
            <span>↓ 向下探索旅程</span>
          </div>
        </div>
      </section>
      <!-- About and Skills sections removed to improve performance -->
      <!-- Footer / CTA section -->
      <section class="section footer-section text-center scroll-item">
        <h2 class="handwritten end-title">Ready to enter?</h2>
        <button class="soft-btn" @click="goHome">进入主页 / Enter Home ➞</button>
      </section>
    </div>
  </div>
</template>

<script setup>
  import { onMounted, onBeforeUnmount } from 'vue'
  import { useRouter } from 'vue-router'

  // Router for navigation to the home page
  const router = useRouter()
  const goHome = () => {
    router.push('/home')
  }

  // IntersectionObserver instance used to reveal scroll items when they enter the viewport
  let observer = null

  onMounted(() => {
    const items = document.querySelectorAll('.scroll-item')
    const options = {
      root: null,
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    }
    const callback = (entries, observerInstance) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          observerInstance.unobserve(entry.target)
        }
      })
    }
    observer = new IntersectionObserver(callback, options)
    items.forEach((item) => observer.observe(item))
  })

  onBeforeUnmount(() => {
    // Clean up to avoid memory leaks
    if (observer) observer.disconnect()
  })
</script>

<style scoped>

  /* Root colour palette (matches original design) */
  :root {
    --ghibli-blue: #a7d0e8;
    --ghibli-cream: #fef9e7;
    --ghibli-green: #c5e1a5;
    --text-dark: #5d6d7e;
    --text-soft: #8a9a9b;
  }

  /* Container that holds all sections; huge height for extended scroll effect */
  .ghibli-container {
    min-height: 300vh;
    background-color: var(--ghibli-cream);
    color: var(--text-dark);
    font-family: KaiTi SC, STKaiti, KaiTi, 楷体, FangSong, SimSun, serif;
    overflow-x: hidden;
    position: relative;
  }

  /* Handwritten style used in titles */
  .handwritten {
    font-family: Caveat, cursive;
    color: #34495e;
  }

  /* Center text utility */
  .text-center {
    text-align: center;
  }

  /* Layout container */
  .container {
    max-width: 1000px;
    margin: 0 auto;
    padding: 0 20px;
  }

  /* Fixed gradient sky background; removed blurred clouds for performance */
  .sky-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: linear-gradient(to bottom, #d4eaff, #fef9e7 80%);
    z-index: 0;
    overflow: hidden;
  }

  /* Wrapper for content sections */
  .content-scroll {
    position: relative;
    z-index: 1;
  }

  /* Generic section styling */
  .section {
    min-height: 80vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 100px 0;
  }

  /* Section titles */
  .section-title {
    font-size: 3rem;
    margin-bottom: 30px;
  }

  /* Main hero title */
  .main-title {
    font-size: 4.5rem;
    line-height: 1.2;
    margin-bottom: 30px;
    color: #2c3e50;
  }

  /* Colourful handwritten subheading inside main title */
  .main-title .handwritten {
    font-size: 3.5rem;
    color: #3498db;
  }

  /* Intro text under hero title */
  .intro-text {
    font-size: 1.3rem;
    color: var(--text-dark);
    max-width: 600px;
    margin: 0 auto 60px;
    line-height: 1.8;
  }

  /* Scroll indicator with bounce animation */
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


  /* CTA section title */
  .end-title {
    font-size: 4rem;
    margin-bottom: 20px;
  }

  /* Soft button styling */
  .soft-btn {
    margin-top: 30px;
    padding: 15px 40px;
    background: #a7d0e8;
    color: #fff;
    border: none;
    border-radius: 50px;
    font-size: 1.2rem;
    cursor: pointer;
    box-shadow: 0 10px 20px -5px #a7d0e880;
    transition: all 0.3s ease;
  }

  .soft-btn:hover {
    background: #8dc3e3;
    transform: translateY(-3px);
    box-shadow: 0 15px 25px -5px #a7d0e899;
  }

  /* Scroll item animation states */
  .scroll-item {
    opacity: 0;
    transform: translateY(40px);
    transition: opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .scroll-item.visible {
    opacity: 1;
    transform: translateY(0);
  }

  /* Delay utilities for staggered animations */
  .delay-100 {
    transition-delay: 0.1s;
  }

  .delay-200 {
    transition-delay: 0.2s;
  }

  /* Responsive tweaks for small screens */
  @media (max-width: 768px) {
    .main-title {
      font-size: 3rem;
    }

    .main-title .handwritten {
      font-size: 2.5rem;
    }

    /* Removed rules for split-layout, skills grid, and placeholder art to reflect deleted sections */
    .soft-btn {
      padding: 12px 30px;
      font-size: 1rem;
    }
  }
</style>