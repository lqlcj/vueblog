<template>
  <div class="market-page">
    <div class="market-container">
      <h1 class="market-title">Market</h1>
      <p class="market-description">这里是 Market 页面，占位内容。</p>
    </div>
  </div>
</template>

<script setup>
  // Market 页面占位组件
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
    text-align: center;
    box-sizing: border-box;
  }

  .market-title {
    font-size: 3rem;
    color: #333;
    margin: 0 0 20px 0;
    font-weight: 700;
  }

  .market-description {
    font-size: 1.2rem;
    color: #666;
    margin: 0;
  }

  @media (max-width: 768px) {
    .market-container {
      padding: 40px 20px;
    }

    .market-title {
      font-size: 2rem;
    }

    .market-description {
      font-size: 1rem;
    }
  }
</style>

