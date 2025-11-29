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
      <router-link to="/notes" class="nav-link" active-class="select">
        Notes
      </router-link>

      <router-link to="/market" class="nav-link" :class="{ select: isMarketGroupActive }">
        Market
      </router-link>

      <router-link to="/about" class="nav-link" active-class="select">
        About
      </router-link>
    </nav>

  </header>
</template>

<script setup>
  import { computed } from 'vue'
  import { useRoute } from 'vue-router'

  const route = useRoute()

  const isMarketGroupActive = computed(() => route.path.startsWith('/market'))
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

  }

</style>