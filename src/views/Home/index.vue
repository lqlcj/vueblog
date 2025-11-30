<template>
  <div class="dashboard-page">
    <div class="bg-shape shape-1"></div>
    <div class="bg-shape shape-2"></div>

    <HomeBanner />

    <!-- 印象派轮播图 -->
    <div class="carousel-section">
      <ImpressionCarousel />
    </div>

    <div class="main-container">
      <HomeProfile @scroll-to-comments="scrollToComments" />
    </div>

    <!-- 信息卡片组件 -->
    <div class="info-cards-section">
      <InfoCards />
    </div>

    <!-- 分隔线 -->
    <div class="divider-section">
      <div class="divider-line"></div>
    </div>

    <!-- 留言系统 -->
    <div class="comments-section" ref="commentsSectionRef" id="comments">
      <div class="comments-wrapper">
        <div class="comments-header-box" @click="toggleComments" :class="{ 'expanded': commentsExpanded }">
          <div class="comments-header-content">
            <h3 class="comments-header-title">💬 留言板</h3>
            <p class="comments-header-subtitle">分享你的想法，让我们一起交流</p>
          </div>
          <div class="comments-header-icon">
            <span class="icon-text" v-if="!commentsExpanded">点击展开留言</span>
            <span class="icon-arrow" :class="{ 'rotated': commentsExpanded }">▼</span>
          </div>
        </div>

        <transition name="comments-slide">
          <div v-if="commentsExpanded" class="comments-content">
            <Giscus v-bind="giscusConfig" />
          </div>
        </transition>
      </div>
    </div>
  </div>

</template>

<script setup>
  // 🚀 性能优化：留言板异步加载，其他组件直接导入
  import { defineAsyncComponent, onMounted, nextTick, ref } from 'vue'
  import HomeBanner from './components/HomeBanner.vue'
  import HomeProfile from './components/HomeProfile.vue'
  import InfoCards from './components/InfoCards.vue'
  import ImpressionCarousel from './components/ImpressionCarousel.vue'
  import { giscusConfig } from '@/config/giscus'
  import { layoutConfig } from '@/config/layout'
  import { useConfetti } from '@/composables/useConfetti'

  // 留言板异步加载，确保在其他组件加载完成后再加载
  const Giscus = defineAsyncComponent(() => import('@/components/Comments/Giscus.vue'))

  const { birthday } = useConfetti()

  // 等待所有组件加载完成后触发生日效果
  const commentsSectionRef = ref(null)
  const commentsExpanded = ref(false)

  const scrollToComments = () => {
    if (commentsSectionRef.value) {
      commentsSectionRef.value.scrollIntoView({ behavior: 'smooth', block: 'start' })
      // 如果留言板未展开，则展开它
      if (!commentsExpanded.value) {
        setTimeout(() => {
          commentsExpanded.value = true
        }, 300)
      }
    }
  }

  const toggleComments = () => {
    commentsExpanded.value = !commentsExpanded.value
    // 展开后滚动到留言板位置
    if (commentsExpanded.value) {
      nextTick(() => {
        if (commentsSectionRef.value) {
          commentsSectionRef.value.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      })
    }
  }

  onMounted(async () => {
    // 等待所有异步组件加载完成
    await nextTick()
    // 再延迟一段时间，确保所有组件完全渲染和动画完成
    setTimeout(() => {
      birthday()
    }, 800)
  })

</script>

<style scoped>

  /* --- 页面容器 --- */
  .dashboard-page {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    /* 电脑端默认间距 */
    /* padding-top: 20px; */
    padding-bottom: 60px;
    gap: 60px;

    position: relative;
    overflow-x: hidden;
    background-color: transparent;
  }

  /* --- 背景光斑 --- */
  .bg-shape {
    position: absolute;
    filter: blur(100px);
    z-index: 0;
    opacity: 0.7;
    animation: float 10s infinite ease-in-out;
    border-radius: 50%;
    will-change: transform;
    /* 🚀 性能优化：提示浏览器优化动画 */
    /* 🚀 性能优化：使用 transform 代替 position，GPU 加速 */
    transform: translateZ(0);
  }

  .shape-1 {
    width: 300px;
    height: 300px;
    background: linear-gradient(135deg, #ffdde1 0%, #ee9ca7 100%);
    top: 15%;
    left: 10%;
  }

  .shape-2 {
    width: 400px;
    height: 400px;
    background: linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%);
    bottom: 10%;
    right: 10%;
    animation-delay: -5s;
  }

  @keyframes float {

    0%,
    100% {
      transform: translate3d(0, 0, 0);
      /* 🚀 使用 translate3d 启用 GPU 加速 */
    }

    50% {
      transform: translate3d(30px, -30px, 0);
    }
  }

  /* --- 轮播图区域 --- */
  .carousel-section {
    max-width: v-bind('layoutConfig.contentMaxWidth');
    width: 100%;
    z-index: 10;
    position: relative;
    padding: 0 v-bind('layoutConfig.contentPadding');
  }

  /* --- 信息卡片区域 --- */
  .info-cards-section {
    max-width: v-bind('layoutConfig.contentMaxWidth');
    width: 100%;
    z-index: 10;
    position: relative;
    padding: 0 v-bind('layoutConfig.contentPadding');
  }

  /* --- 核心容器布局 --- */
  .main-container {
    max-width: v-bind('layoutConfig.contentMaxWidth');
    width: 100%;
    z-index: 10;
    position: relative;
    padding: 0 v-bind('layoutConfig.contentPadding');
  }

  /* --- 分隔线区域 --- */
  .divider-section {
    max-width: v-bind('layoutConfig.contentMaxWidth');
    width: 100%;
    padding: 0 v-bind('layoutConfig.contentPadding');
    z-index: 10;
    position: relative;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .divider-line {
    width: 100%;
    max-width: 600px;
    height: 1px;
    background: linear-gradient(to right, transparent, #d4c5b0, transparent);
  }

  /* --- 留言系统区域 --- */
  .comments-section {
    max-width: v-bind('layoutConfig.contentMaxWidth');
    width: 100%;
    padding: 0 v-bind('layoutConfig.contentPadding');
    z-index: 10;
    position: relative;
  }

  .comments-wrapper {
    width: 100%;
    max-width: 940px;
    margin: 0 auto;
  }

  .comments-header-box {
    background: #faf9f6;
    border: 1px solid #d4c5b0;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    padding: 12px 20px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 12px;
    position: relative;
    overflow: hidden;
    transition: all 0.3s ease;
    cursor: pointer;
    user-select: none;
    width: 100%;
    box-sizing: border-box;
  }

  .comments-header-box::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg,
        rgba(255, 221, 225, 0.6) 0%,
        rgba(224, 195, 252, 0.6) 50%,
        rgba(142, 197, 252, 0.6) 100%);
    border-radius: 8px 8px 0 0;
  }

  .comments-header-box:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
    border-color: #c4b5a0;
  }

  .comments-header-content {
    flex: 1;
  }

  .comments-header-title {
    font-family: 'Caveat', cursive;
    font-size: 1.5rem;
    margin: 0 0 3px 0;
    color: #6c5ce7;
    font-weight: 500;
    background: linear-gradient(135deg, #a29bfe 0%, #6c5ce7 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .comments-header-subtitle {
    font-size: 0.85rem;
    color: #999;
    margin: 0;
    letter-spacing: 0.3px;
  }

  .comments-header-icon {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 5px;
  }

  .icon-text {
    font-size: 0.85rem;
    color: #999;
    white-space: nowrap;
  }

  .icon-arrow {
    font-size: 1.2rem;
    color: #6c5ce7;
    transition: transform 0.3s ease;
    display: inline-block;
  }

  .icon-arrow.rotated {
    transform: rotate(180deg);
  }

  .comments-content {
    margin-top: 0;
    overflow: hidden;
  }

  /* 隐藏Giscus组件内部的标题，因为我们已经在外层显示了 */
  .comments-content :deep(.comments-header) {
    display: none;
  }

  /* 留言板展开动画 */
  .comments-slide-enter-active {
    transition: all 0.4s ease;
  }

  .comments-slide-leave-active {
    transition: all 0.4s ease;
  }

  .comments-slide-enter-from {
    opacity: 0;
    max-height: 0;
    transform: translateY(-20px);
  }

  .comments-slide-enter-to {
    opacity: 1;
    max-height: 2000px;
    transform: translateY(0);
  }

  .comments-slide-leave-from {
    opacity: 1;
    max-height: 2000px;
    transform: translateY(0);
  }

  .comments-slide-leave-to {
    opacity: 0;
    max-height: 0;
    transform: translateY(-20px);
  }


  /* --- 📱 手机端适配调整 --- */
  @media (max-width: 768px) {
    .dashboard-page {
      gap: 30px;
      padding-bottom: 30px;
      /* padding-top: 30px; */
    }

    .carousel-section {
      padding: 0 v-bind('layoutConfig.contentPaddingMobile');
    }

    .info-cards-section {
      padding: 0 v-bind('layoutConfig.contentPaddingMobile');
    }

    .main-container {
      gap: 20px;
      padding: 0 v-bind('layoutConfig.contentPaddingMobile');
    }

    .divider-section {
      padding: 0 v-bind('layoutConfig.contentPaddingMobile');
      margin: 0 0 -15px 0;
    }

    .comments-section {
      padding: 0 v-bind('layoutConfig.contentPaddingMobile');
    }

    .comments-wrapper {
      max-width: 93%;
    }

    .comments-header-box {
      flex-direction: row;
      gap: 12px;
      padding: 10px 16px;
    }

    .comments-header-icon {
      margin-top: 5px;
    }

    /* 调整光斑位置，防止手机上挡住重要内容 */
    .shape-1 {
      top: 10%;
      left: -20%;
      opacity: 0.5;
      width: 200px;
      /* 🚀 优化：移动端减小光斑大小 */
      height: 200px;
    }

    .shape-2 {
      bottom: 5%;
      right: -20%;
      opacity: 0.5;
      width: 250px;
      /* 🚀 优化：移动端减小光斑大小 */
      height: 250px;
    }
  }

  /* 🚀 可访问性优化：支持减少动画偏好 */
  @media (prefers-reduced-motion: reduce) {
    .bg-shape {
      animation: none;
    }

    .comments-slide-enter-active,
    .comments-slide-leave-active {
      transition: none;
    }

    .comments-slide-enter-from,
    .comments-slide-enter-to,
    .comments-slide-leave-from,
    .comments-slide-leave-to {
      opacity: 1;
      max-height: none;
      transform: none;
    }
  }
</style>