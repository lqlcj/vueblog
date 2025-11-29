<template>
  <div class="market-page">
    <div class="market-container">
      <!-- 使用可复用的页面标题组件 -->
      <PageHeader title="Market" subtitle="发现好物，分享生活" />
    </div>
  </div>
</template>

<script setup>
  // 导入可复用的页面标题组件
  import PageHeader from '@/components/HeaderBar/PageHeader.vue';
</script>

<style scoped>
  .market-page {
    min-height: 100vh;
    padding: 40px 10px 80px;
  }

  .market-container {
    width: 100%;
    max-width: 960px;
    margin: 0 auto;
    box-sizing: border-box;
  }

  /* 标题样式已移至 PageHeader 组件中，此处不再需要 */

  @media (max-width: 768px) {
    .market-container {
      padding: 40px 20px;
    }

    /* 标题样式已移至 PageHeader 组件中 */
  }
</style>
