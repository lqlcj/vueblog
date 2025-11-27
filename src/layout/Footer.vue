<template>
  <footer class="footer-container">
    <div class="footer-content">

      <div class="left-section">
        <p class="welcome-text">
          欢迎 <a href="https://www.mp3jam.org/dmca.html" target="_blank" class="highlight-link">Report Copyrighted</a>
        </p>

        <div class="links-row">
          <a href="#" target="_blank">Privacy policy</a>
          <a href="#" target="_blank">Refund policy</a>
          <a href="#" target="_blank">Contact</a>
          <a href="#" target="_blank">etc</a>
        </div>
      </div>

      <div class="right-section">
        <div class="social-row">
          <a href="#" target="_blank" class="social-btn facebook">FACEBOOK</a>
          <a href="#" target="_blank" class="social-btn twitter">TWITTER</a>
        </div>

        <span class="copyright">LCJ.ORG.2019</span>
      </div>

    </div>
  </footer>
</template>

<script>
  export default {
    name: 'Footer',
  };
</script>

<style scoped>

  /* --- 容器基础设置 --- */
  .footer-container {
    width: 100%;
    padding: 45px 20px 60px;
    /* 上 左右 下 */
    background-color: transparent;
    /* 如果有背景色可以在这里加 */
  }

  /* 限制最大宽度的内容框，居中显示 */
  .footer-content {
    max-width: 1100px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    /* 左右两端对齐 */
    align-items: flex-end;
    /* 底部对齐 */
    flex-wrap: wrap;
    /* 允许换行，防止挤压 */
    gap: 40px;
    /* 左右两块之间的间距 */
  }

  /* --- 左侧区域 --- */
  .left-section {
    display: flex;
    flex-direction: column;
    gap: 15px;
    /* 文字和链接行之间的间距 */
    text-align: left;
  }

  .welcome-text {
    font-family: 'Conv_FuturaStd-Medium', Arial, sans-serif;
    font-size: 14px;
    /* 10pt ≈ 13-14px */
    line-height: 1.6;
    color: #68525B;
    margin: 0;
  }

  .highlight-link {
    color: #68525B;
    text-decoration: underline;
  }

  .links-row {
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
    /* 替代原来的 style="margin-left: 30px" */
  }

  .links-row a {
    font-family: 'Conv_FuturaStd-Medium', Arial, sans-serif;
    font-size: 14px;
    color: #68525B;
    text-decoration: none;
    transition: color 0.3s;
  }

  .links-row a:hover {
    color: #D94851;
    /* 增加一点交互反馈 */
  }

  /* --- 右侧区域 --- */
  .right-section {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    /* 靠右对齐 */
    gap: 15px;
  }

  /* 社交媒体行 */
  .social-row {
    display: flex;
    gap: 10px;
  }

  .social-btn {
    display: inline-block;
    height: 27px;
    line-height: 27px;
    /* 垂直居中 */
    background-color: #4FBBCC;
    color: #FFFFFF;
    font-family: 'Conv_FuturaStd-Book', Arial, sans-serif;
    font-size: 13px;
    padding: 0 10px;
    letter-spacing: 2px;
    text-decoration: none;
    transition: background-color 0.3s;
  }

  .social-btn:hover {
    background-color: #D94851;
  }

  /* 版权号 */
  .copyright {
    font-family: 'Conv_FuturaStd-Medium', Arial, sans-serif;
    font-size: 14px;
    color: #68525B;
    letter-spacing: 2px;
  }

  /* --- 📱 手机端适配 (Media Query) --- */
  @media (max-width: 768px) {
    .footer-content {
      flex-direction: column;
      /* 改为垂直排列 */
      align-items: center;
      /* 整体居中 */
      text-align: center;
      gap: 30px;
    }

    .left-section {
      align-items: center;
      /* 左侧文字居中 */
      text-align: center;
    }

    .links-row {
      justify-content: center;
      /* 链接居中 */
      gap: 20px;
      /* 手机上间距稍微小一点 */
    }

    .right-section {
      align-items: center;
      /* 右侧内容也居中 */
    }
  }
</style>