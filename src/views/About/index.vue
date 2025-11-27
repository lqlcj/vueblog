<template>
  <div class="privacy-container">
    <div class="wrapper">

      <div class="page-title">
        <h1 class="text-page-title">Privacy Statement</h1>
      </div>

      <div class="text-page">
        <h2 class="section-title">MP3jam Privacy Policy</h2>
        <p>
          This Privacy Policy covers the MP3jam software and the MP3jam website (<a href="/">www.mp3jam.org</a>).
          We respect your privacy and want to explain what type of information we collect and how we manage it. If you
          use the software and/or the website, you consent to the Privacy Policy.
        </p>

        <h2 class="section-title">Collected Information</h2>
        <p>
          The software and the website do not collect ANY personal information that helps to identify you as an
          individual such as: name, sex, age, address, email address, contact phone number, logins, and passwords.
          When you send feedback via email, you shall provide us your email address for the communication purpose.
          In order to improve the software and the website, we collect non-personal information such as IP addresses. IP
          address collection helps us to improve our website and the software because it indicates the time spent on our
          website and a geo region.
          We use “cookies” on the website. Cookies are stored on your computer and help us to improve our website as
          they remember your website preferences and adjustments. For example, cookies show previously visited pages on
          the website and help to load them faster; cookies also may show your selected language preferences, so you get
          an appropriate language version of the website quicker.
          We never merge IP addresses with any personal identifying information. Cookies on our website do not collect
          or transmit any personal information.
          You can always configure your browser to turn off cookies access. Usually cookies settings are located at
          “Options” or “Privacy” tabs of a browser. Thus, you are eligible to use the software and the website
          anonymously.
        </p>

        <h2 class="section-title">Information Use</h2>
        <p>
          The software and the website do not collect, sell, transfer, rent, lease, publish, disclose and distribute
          any personal Information without your consent to third parties.
          Non-personally information about our users may be share with our partners and advertisers.
        </p>

        <h2 class="section-title">Links to other Websites</h2>
        <p>
          This site and the software may contain links to other sites such as our advertisers and partners. Please check
          their privacy statements since their privacy practices may be different from ours. This Privacy Policy is
          solely for the MP3jam software and the MP3jam website (<a href="/">www.mp3jam.org</a>).
        </p>

        <h2 class="section-title">Underage</h2>
        <p>
          MP3jam software and the MP3jam website (<a href="/">www.mp3jam.org</a>) are not made to attract anyone under
          13. Visitors younger than 13 years old shall not use the software and the website.
        </p>

        <h2 class="section-title">Changes</h2>
        <p>
          The Privacy Policy may change. The changes will be posted on the website.
        </p>

        <h2 class="section-title">Contact</h2>
        <p>
          If you have any comments or about the Privacy Policy, please contact us at <a
            href="mailto:contact@mp3jam.org">contact@mp3jam.org</a>.
        </p>
      </div>
    </div>

    <div class="AboutFooter"></div>
  </div>
</template>

<script setup>
</script>

<style scoped>
  /* 使用 scoped 防止样式污染全局 */

  .privacy-container {
    width: 100%;
    min-height: 100vh;
    /* 确保背景图路径正确，如果找不到图可以暂时删掉这一行 */
    background-image: url('../assets/images/About/figure_06.png');
    background-size: cover;
    /* 让背景图自适应 */
    background-position: center top;
    overflow-x: hidden;
    /* 禁止横向溢出 */
  }

  .wrapper {
    width: 100%;
    /* 限制最大宽度，但允许比这个小 */
    max-width: 900px;
    margin: 0 auto;
    padding: 20px;
  }

  /* --- 标题样式 --- */
  .text-page-title {
    color: #7d1951;
    /* 字体设置：优先用自定义字体，没有则用系统字体 */
    font-family: 'PFBold', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-weight: bold;
    font-size: 56px;
    text-align: center;
    margin: 40px 0 30px;
    letter-spacing: 0.012em;
    line-height: 1.2;

    /* 关键修复：允许换行，而不是 nowrap */
    white-space: normal;
    word-wrap: break-word;
  }

  /* --- 小标题样式 (原代码里用的 class="title") --- */
  .section-title {
    color: #7d1951;
    /* 和正文颜色稍作区分，或者保持一致 */
    font-family: 'PFRegular', sans-serif;
    font-weight: bold;
    font-size: 20px;
    margin-top: 30px;
    margin-bottom: 10px;
  }

  /* --- 正文段落样式 --- */
  .text-page p {
    color: #762d52;
    font-family: 'PFRegular', sans-serif;
    font-size: 16px;
    line-height: 1.6em;
    margin-bottom: 20px;

    /* 关键修复：宽度不再是固定的 816px */
    width: 100%;
    max-width: 816px;
    /* 在大屏幕上限制最宽只能这么宽 */
    margin-left: auto;
    margin-right: auto;
  }

  /* --- 链接样式 --- */
  a {
    font-family: 'PFRegular', sans-serif;
    color: #a89b00;
    text-decoration: underline;
    word-break: break-all;
    /* 防止长链接撑破手机屏幕 */
  }

  a:hover {
    text-decoration: none;
  }

  /* --- 底部图片 --- */
  .AboutFooter {
    width: 100%;
    height: 150px;
    background-image: url('../assets/images/About/footer-bg.png');
    background-size: cover;
    /* 让图片填满容器 */
    background-position: center;
    margin-top: 40px;
    border-radius: 16px 16px 0 0;
  }

  /* --- 📱 手机端适配 (Media Query) --- */
  /* 当屏幕宽度小于 768px (iPad/手机) 时，应用下面的样式 */
  @media (max-width: 768px) {

    .text-page-title {
      font-size: 32px;
      /* 手机上字号改小 */
      margin: 20px 0;
    }

    .wrapper {
      padding: 15px;
      /* 减少两侧留白 */
    }

    .text-page p {
      font-size: 15px;
      /* 正文字号微调 */
      text-align: justify;
      /* 手机上两端对齐更好看 */
    }

    .AboutFooter {
      height: 100px;
      /* 手机上底部图片高度减小 */
      border-radius: 0;
    }
  }
</style>