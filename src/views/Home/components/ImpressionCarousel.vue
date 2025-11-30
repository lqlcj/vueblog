<template>
  <div class="carousel-container" v-if="images.length > 0">
    <div class="carousel-wrapper" @mouseenter="pauseAutoPlay" @mouseleave="resumeAutoPlay">
      <!-- 轮播图片容器 -->
      <div class="carousel-track" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
        <div v-for="(image, index) in images" :key="index" class="carousel-slide"
          :class="{ 'active': index === currentIndex }">
          <div class="image-wrapper">
            <img :src="image" :alt="`Slide ${index + 1}`" class="carousel-image" />
            <!-- 印象派模糊层 -->
            <div class="impression-overlay"></div>
          </div>
        </div>
      </div>

      <!-- 左右切换按钮 -->
      <button class="carousel-btn prev-btn" @click="prevSlide" aria-label="Previous slide">
        <span>‹</span>
      </button>
      <button class="carousel-btn next-btn" @click="nextSlide" aria-label="Next slide">
        <span>›</span>
      </button>

      <!-- 指示器 -->
      <div class="carousel-indicators">
        <button v-for="(image, index) in images" :key="index" class="indicator"
          :class="{ 'active': index === currentIndex }" @click="goToSlide(index)"
          :aria-label="`Go to slide ${index + 1}`"></button>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted, onUnmounted, computed } from 'vue'

  // 使用 Vite 的 import.meta.glob 动态导入轮播图文件夹中的所有图片
  // 支持 jpg, jpeg, png, webp 等格式
  const imageModules = import.meta.glob('@/assets/images/carousel/*.{jpg,jpeg,png,webp,gif}', {
    eager: true,
    import: 'default'
  })

  // 将导入的图片模块转换为数组，并按文件名排序
  const images = computed(() => {
    return Object.values(imageModules).sort((a, b) => {
      // 按文件名排序，确保顺序一致
      const aName = a.split('/').pop()
      const bName = b.split('/').pop()
      return aName.localeCompare(bName)
    })
  })

  const currentIndex = ref(0)
  let autoPlayTimer = null
  const autoPlayInterval = 4000 // 4秒切换一次

  // 下一张
  const nextSlide = () => {
    currentIndex.value = (currentIndex.value + 1) % images.value.length
  }

  // 上一张
  const prevSlide = () => {
    currentIndex.value = (currentIndex.value - 1 + images.value.length) % images.value.length
  }

  // 跳转到指定幻灯片
  const goToSlide = (index) => {
    currentIndex.value = index
  }

  // 暂停自动播放
  const pauseAutoPlay = () => {
    if (autoPlayTimer) {
      clearInterval(autoPlayTimer)
      autoPlayTimer = null
    }
  }

  // 恢复自动播放
  const resumeAutoPlay = () => {
    startAutoPlay()
  }

  // 开始自动播放
  const startAutoPlay = () => {
    pauseAutoPlay()
    autoPlayTimer = setInterval(() => {
      nextSlide()
    }, autoPlayInterval)
  }

  onMounted(() => {
    startAutoPlay()
  })

  onUnmounted(() => {
    pauseAutoPlay()
  })
</script>

<style scoped>
  .carousel-container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
    position: relative;
    z-index: 10;
  }

  .carousel-wrapper {
    position: relative;
    width: 100%;
    height: 500px;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
    /* 印象派风格：柔和的阴影 */
  }

  .carousel-track {
    display: flex;
    width: 100%;
    height: 100%;
    transition: transform 1.2s cubic-bezier(0.4, 0, 0.2, 1);
    /* 印象派风格：柔和的过渡动画 */
  }

  .carousel-slide {
    min-width: 100%;
    height: 100%;
    position: relative;
  }

  .image-wrapper {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
  }

  .carousel-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: blur(0.5px) brightness(1.05) saturate(1.1);
    /* 印象派风格：轻微模糊和色彩增强 */
    transition: filter 1.2s ease;
  }

  .carousel-slide.active .carousel-image {
    filter: blur(0.3px) brightness(1.08) saturate(1.15);
  }

  /* 印象派模糊层 - 营造柔和的视觉效果 */
  .impression-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg,
        rgba(255, 255, 255, 0.1) 0%,
        rgba(255, 240, 245, 0.15) 25%,
        rgba(230, 230, 250, 0.15) 50%,
        rgba(240, 248, 255, 0.1) 75%,
        rgba(255, 255, 255, 0.1) 100%);
    /* 印象派风格：柔和的渐变叠加 */
    pointer-events: none;
    mix-blend-mode: soft-light;
  }

  /* 切换按钮 */
  .carousel-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 50px;
    height: 50px;
    border: none;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(10px);
    /* 印象派风格：毛玻璃效果 */
    color: #2c3e50;
    font-size: 28px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    z-index: 20;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }

  .carousel-btn:hover {
    background: rgba(255, 255, 255, 0.95);
    transform: translateY(-50%) scale(1.1);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  }

  .carousel-btn:active {
    transform: translateY(-50%) scale(0.95);
  }

  .prev-btn {
    left: 20px;
  }

  .next-btn {
    right: 20px;
  }

  .carousel-btn span {
    line-height: 1;
    font-weight: 300;
  }

  /* 指示器 */
  .carousel-indicators {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 10px;
    z-index: 20;
  }

  .indicator {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    border: 2px solid rgba(255, 255, 255, 0.8);
    background: transparent;
    cursor: pointer;
    transition: all 0.3s ease;
    padding: 0;
  }

  .indicator:hover {
    background: rgba(255, 255, 255, 0.5);
    transform: scale(1.2);
  }

  .indicator.active {
    background: rgba(255, 255, 255, 0.9);
    width: 30px;
    border-radius: 5px;
    /* 印象派风格：柔和的激活状态 */
  }

  /* 响应式设计 */
  @media (max-width: 768px) {
    .carousel-wrapper {
      height: 350px;
      border-radius: 15px;
    }

    .carousel-btn {
      width: 40px;
      height: 40px;
      font-size: 24px;
    }

    .prev-btn {
      left: 10px;
    }

    .next-btn {
      right: 10px;
    }

    .carousel-indicators {
      bottom: 15px;
      gap: 8px;
    }

    .indicator {
      width: 8px;
      height: 8px;
    }

    .indicator.active {
      width: 24px;
    }
  }

  /* 可访问性优化 */
  @media (prefers-reduced-motion: reduce) {
    .carousel-track {
      transition: transform 0.3s ease;
    }

    .carousel-image {
      transition: filter 0.3s ease;
    }
  }

  /* 印象派风格：添加柔和的边框光晕 */
  .carousel-wrapper::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(135deg,
        rgba(255, 182, 193, 0.3),
        rgba(221, 160, 221, 0.3),
        rgba(176, 224, 230, 0.3),
        rgba(255, 182, 193, 0.3));
    border-radius: 22px;
    z-index: -1;
    opacity: 0.6;
    filter: blur(8px);
    /* 印象派风格：柔和的边框光晕 */
  }
</style>
