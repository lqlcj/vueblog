<template>

  <footer class="footer">
    <div class="text">
      <p>
        欢迎
        <a href="https://www.mp3jam.org/dmca.html" target="_blank">Report Copyrighted</a>
      </p>

      <!-- 友情链接 -->
      <div class="link">
        <a href="#" target="_blank">Privacy policy</a>
        <a style="margin-left: 30px;" href="#" target="_blank">Refund policy</a>
        <a style="margin-left: 30px;" href="#" target="_blank">Contact</a>
        <a style="margin-left: 30px;" href="#" target="_blank">etc</a>
      </div>
    </div>

    <!-- 社交媒体 -->
    <div class="social">
      <div class="facebook">
        <a href="#" target="_blank">FACEBOOK</a>
      </div>
      <!-- Remove inline float on twitter button; layout is handled via flex in the global stylesheet -->
      <div class="twitter">
        <a href="#" target="_blank">TWITTER</a>
      </div>
    </div>

    <!-- 酷酷 -->
    <span class="url">LCJ.ORG.2019</span>
  </footer>
</template>

<script>
  export default {
    name: 'Footer',
  };
</script>

<style scoped>

  .footer {
    /*border: 1px solid red;*/
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: flex-start;
    width: 79%;
    margin-right: 100px;
    margin-left: 100px;
    margin-top: 45px;
    height: auto;
    position: relative;
  }

  /* 欢迎 */
  .footer .text {
    /*border: 1px solid green;*/
    text-align: left;
    flex: 1 1 auto;
    /* relative positioning so that .link can remain absolutely positioned inside */
    position: relative;
    padding-left: 5px;
    font-family: 'Conv_FuturaStd-Medium', Arial;
    font-size: 10pt;
    line-height: 16pt;
    color: #68525B;
  }

  /* 欢迎后面跟的a */
  .footer .text a {
    color: #68525B;
  }

  /* 友情链接 */
  .footer .text .link {
    position: absolute;
    left: 4px;
    bottom: -24px;
  }

  /* 社交媒体 */
  .footer .social {
    /*border: 1px solid blue;*/
    display: flex;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
    position: static;
  }

  .footer .social div {
    height: 27px;
    /*border: 1px solid orange;*/
    background-color: #4FBBCC;
    text-align: right;
    /* reset margin since flex handles spacing */
    margin-top: 0;
  }

  .footer .social a {
    font-family: 'Conv_FuturaStd-Book', Arial;
    font-size: 10pt;
    color: #FFFFFF;
    padding-right: 5px;
    padding-left: 5px;
    padding-top: 5px;
    padding-bottom: 5px;
    letter-spacing: 2px;
    text-decoration: none;
  }

  /* 社交媒体悬停 */
  .footer .social div:hover {
    background-color: #D94851;
  }

  /* 最后酷酷 */
  .footer .url {
    align-self: flex-end;
    margin-top: 10px;
    font-family: 'Conv_FuturaStd-Medium', Arial;
    font-size: 10pt;
    color: #68525B;
    letter-spacing: 2px;
  }

</style>