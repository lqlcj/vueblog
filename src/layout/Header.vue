<template>
  <header class="header">
    <div class="logo">
      <router-link to="/Home">
        <img alt="logo" src="../assets/images/logo.png" />
      </router-link>
    </div>

    <nav class="menu">
      <router-link to="/Home" class="nav-link" active-class="select">
        Home
      </router-link>
      <router-link to="/blog" class="nav-link" active-class="select">
        Blog
      </router-link>

      <!-- Market 多级菜单入口 -->
      <div class="nav-item-dropdown" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
        <router-link v-if="!isMobile" to="/market" class="nav-link" :class="{ select: isMarketGroupActive }">
          {{ marketLabel }}
        </router-link>
        <span v-else class="nav-link" :class="{ select: isMarketGroupActive }" @click.stop="toggleMarketMenu">
          {{ marketLabel }}
        </span>
        <transition name="fade">
          <div v-if="showMarketMenu" class="dropdown-menu" @click.stop @mouseenter="handleDropdownEnter"
            @mouseleave="handleDropdownLeave">
            <router-link to="/market" class="dropdown-item" @click="closeMarketMenu">
              Market
            </router-link>
            <router-link to="/market/tools" class="dropdown-item" @click="closeMarketMenu">
              Tools
            </router-link>
            <router-link to="/market/collect" class="dropdown-item" @click="closeMarketMenu">
              Collect
            </router-link>
          </div>
        </transition>
      </div>

      <router-link to="/about" class="nav-link" active-class="select">
        About
      </router-link>
    </nav>

  </header>
</template>

<script setup>
  import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
  import { useRoute } from 'vue-router'

  // 控制 Market 下拉菜单显示
  const showMarketMenu = ref(false)
  const isMobile = ref(false)
  let closeTimer = null

  const route = useRoute()

  // 检测是否为移动端
  const checkMobile = () => {
    isMobile.value = window.innerWidth <= 768
  }

  // PC 端鼠标悬停处理
  const handleMouseEnter = () => {
    if (!isMobile.value) {
      // 清除关闭定时器
      if (closeTimer) {
        clearTimeout(closeTimer)
        closeTimer = null
      }
      showMarketMenu.value = true
    }
  }

  const handleMouseLeave = () => {
    if (!isMobile.value) {
      // 延迟关闭，给鼠标移动到下拉菜单的时间
      closeTimer = setTimeout(() => {
        showMarketMenu.value = false
        closeTimer = null
      }, 150)
    }
  }

  // 下拉菜单鼠标进入，保持打开
  const handleDropdownEnter = () => {
    if (!isMobile.value) {
      // 清除关闭定时器
      if (closeTimer) {
        clearTimeout(closeTimer)
        closeTimer = null
      }
      showMarketMenu.value = true
    }
  }

  // 下拉菜单鼠标离开，关闭菜单
  const handleDropdownLeave = () => {
    if (!isMobile.value) {
      showMarketMenu.value = false
    }
  }

  // 移动端点击切换菜单
  const toggleMarketMenu = () => {
    if (isMobile.value) {
      showMarketMenu.value = !showMarketMenu.value
    }
  }

  // 关闭菜单
  const closeMarketMenu = () => {
    showMarketMenu.value = false
  }

  // 点击外部区域关闭菜单
  const handleClickOutside = (event) => {
    if (isMobile.value && showMarketMenu.value) {
      const dropdown = event.target.closest('.nav-item-dropdown')
      if (!dropdown) {
        showMarketMenu.value = false
      }
    }
  }

  // 根据当前路由动态显示 Market 文案
  const marketLabel = computed(() => {
    if (route.name === 'Tools') return 'Tools'
    if (route.name === 'Collect') return 'Collect'
    return 'Market'
  })

  // 只要在 /market 相关路由下，顶部 Market 分组高亮
  const isMarketGroupActive = computed(() => route.path.startsWith('/market'))

  onMounted(() => {
    checkMobile()
    window.addEventListener('resize', checkMobile)
    document.addEventListener('click', handleClickOutside)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('resize', checkMobile)
    document.removeEventListener('click', handleClickOutside)
    // 清理定时器
    if (closeTimer) {
      clearTimeout(closeTimer)
      closeTimer = null
    }
  })
</script>

<style scoped>
  .nav-link {
    /* override default link underline */
    text-decoration: none;
  }

  .header {
    margin: 25px auto;
    /* PC端保持原样 */
    min-width: 975px;
    max-width: 55%;
    height: 100px;
    /* 使用 flex 布局来对齐 */
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .header .logo {
    display: flex;
    align-items: center;
    margin-left: 47px;
    margin-top: 0;
  }

  .header .logo span {
    padding-left: 5px;
    font-size: 22pt;
    font-family: 'Conv_FuturaStd-Heavy', Arial;
    color: #68525B;
  }

  .header .logo img {
    vertical-align: text-bottom;
    /* 建议加个高度限制，防止图片过大撑破布局，PC端不影响 */
    height: auto;
    max-height: 60px;
  }

  .header .menu {
    display: flex;
    align-items: center;
    padding-right: 37px;
    position: relative;
    padding-top: 0;
    gap: 35px;
    /* 使用 gap 控制间距，避免 margin 在结构变化时影响布局 */
  }

  .header .menu a,
  .header .menu .nav-link {
    font-size: 14pt;
    font-family: 'Conv_FuturaStd-Medium', Arial;
    color: #68525B;
    /* 增加一点过渡效果，体验更好 */
    transition: color 0.3s;
    cursor: pointer;
    /* 防止文本变化导致布局抖动 */
    white-space: nowrap;
  }

  /* 菜单高亮 */
  .menu a.select,
  .menu .nav-link.select {
    color: #E45462;
    text-decoration: none;
  }

  /* Market 下拉菜单（PC 端） */
  .nav-item-dropdown {
    position: relative;
    display: inline-flex;
    align-items: center;
    /* 确保下拉菜单容器不影响其他导航项的布局 */
    flex-shrink: 0;
    justify-content: center;
  }

  .dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    margin-top: 10px;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.8);
    border-radius: 12px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
    min-width: 160px;
    max-width: 200px;
    padding: 8px 0;
    z-index: 1000;
    /* 确保下拉菜单不影响父容器布局 */
    pointer-events: auto;
    /* 防止抖动：使用 will-change 和 transform3d 优化 */
    will-change: transform, opacity;
    transform: translateZ(0);
    /* 确保下拉菜单完全脱离文档流，不影响布局 */
    isolation: isolate;
  }

  .dropdown-item {
    display: block;
    padding: 10px 20px;
    font-size: 14pt;
    font-family: 'Conv_FuturaStd-Medium', Arial;
    color: #68525B;
    text-decoration: none;
    transition: all 0.2s ease;
    white-space: nowrap;
    /* 防止文本换行影响布局 */
    box-sizing: border-box;
  }

  .dropdown-item:hover {
    background: rgba(224, 195, 252, 0.1);
    color: #E45462;
  }

  .dropdown-item.router-link-active {
    color: #E45462;
    background: rgba(224, 195, 252, 0.15);
  }

  /* 下拉菜单动画 */
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.2s ease, transform 0.2s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
    transform: translate3d(0, -10px, 0);
  }

  .fade-enter-to,
  .fade-leave-from {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }

  /* --- 📱 核心修改：手机端适配 --- */
  /* 当屏幕宽度小于 768px (手机/平板竖屏) 时，覆盖上面的样式 */
  @media (max-width: 768px) {
    .header {
      /* 1. 宽度重置：手机上必须占满，不能是 min-width: 975px */
      min-width: 100%;
      max-width: 100%;
      /* 2. 高度自适应：内容变两行了，高度要自动 */
      height: auto;
      /* 3. 布局改为垂直排列：Logo在上，菜单在下 */
      flex-direction: column;
      margin: 10px 0;
      /* 减小外边距 */
      padding: 10px 0;
    }

    .header .logo {
      /* 清除 PC 端的左边距，改为居中 */
      margin-left: 0;
      margin-bottom: 15px;
      /* Logo 和菜单之间的间距 */
      justify-content: center;
    }

    .header .logo img {
      /* 手机上 Logo稍微小一点点更协调 */
      max-height: 40px;
    }

    .header .menu {
      /* 清除 PC 端的右内边距 */
      padding-right: 0;
      /* 菜单居中 */
      justify-content: center;
      width: 100%;
      /* 防止链接太多换行时太乱 */
      flex-wrap: wrap;
      /* 恢复为移动端原来的紧凑排列方式，不使用 PC 端的 gap */
      gap: 0;
    }

    .header .menu a {
      /* 手机上字号稍微改小一点，防止换行太厉害 */
      font-size: 1rem;
      /* 左右间距改小且均匀 */
      margin: 0 10px;
    }

    /* 移动端下拉菜单：不改变导航高度，仅作为弹出层显示 */
    .nav-item-dropdown {
      margin: 0 10px;
    }

    .dropdown-menu {
      left: 50%;
      transform: translate3d(-50%, 0, 0);
      margin-top: 6px;
      min-width: 140px;
      /* 移动端下拉菜单宽度更窄一点 */
      padding: 6px 0;
    }

    /* 移动端动画优化 */
    .fade-enter-from,
    .fade-leave-to {
      transform: translate3d(-50%, -10px, 0);
    }

    .fade-enter-to,
    .fade-leave-from {
      transform: translate3d(-50%, 0, 0);
    }
  }

</style>