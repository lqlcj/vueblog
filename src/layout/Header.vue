<template>
  <header class="header">
    <div class="logo">
      <router-link to="/Home">
        <img alt="logo" src="../assets/images/logo.webp" />
      </router-link>
    </div>

    <nav class="menu">
      <router-link to="/Home" class="nav-link" active-class="select">
        Home
      </router-link>
      <router-link to="/notes" class="nav-link" active-class="select">
        Notes
      </router-link>

      <router-link to="/friends" class="nav-link" :class="{ select: isFriendsGroupActive }">
        Friends
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

  const isFriendsGroupActive = computed(() => route.path.startsWith('/friends'))
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
      /* 1. 固定在底部 */
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      /* 2. 宽度重置：手机上必须占满 */
      min-width: 100%;
      max-width: 100%;
      /* 3. 高度自适应 */
      height: auto;
      min-height: 60px;
      /* 4. 保持横向布局：Logo在左，菜单在右 */
      flex-direction: row;
      margin: 0;
      padding: 15px 15px;
      /* 5. 添加背景和阴影，让底部导航更明显 */
      background-color: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
      box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
      /* 确保内容垂直居中 */
      align-items: center;
    }

    .header .logo {
      /* 移动端隐藏LOGO */
      display: none;
    }

    .header .menu {
      /* 清除 PC 端的右内边距 */
      padding-right: 0;
      /* 菜单居中均匀分布 */
      justify-content: space-around;
      width: 100%;
      flex: 1;
      /* 恢复 gap 控制间距 */
      gap: 0;
      /* 确保菜单项垂直居中 */
      align-items: center;
      height: 100%;
    }

    .header .menu a {
      /* 手机上字号稍微改小一点 */
      font-size: 0.9rem;
      margin: 0;
      /* 确保文字垂直居中 */
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
    }

  }

</style>