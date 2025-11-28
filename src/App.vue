<template>
  <div class="app-container">
    <Header />

    <div class="main-content">
      <router-view v-slot="{ Component }">
        <keep-alive include="Blog">
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </div>

    <Footer />

    <BackToTop />
  </div>
</template>

<script setup>
  import Header from '@/layout/Header.vue';
  import Footer from '@/layout/Footer.vue';
  import BackToTop from '@/components/BackToTop/BackToTop.vue'
</script>

<style scoped>
  .app-container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    /* 🔴 恢复原样：完全保留你原本的背景写法，不做任何缩放或固定 */
    background-image: url("@/assets/images/background-body.png");
  }

  /* 新增布局样式：只负责撑开高度，不涉及颜色或图片 */
  .main-content {
    flex: 1;
    /* 让内容区占据剩余空间，把 Footer 挤到最下面 */
    width: 100%;
  }
</style>