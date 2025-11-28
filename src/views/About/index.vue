<template>
  <div class="about-page">
    <div class="bg-gradient"></div>

    <div class="container">
      <div class="glass-card fade-in">

        <header class="about-header">
          <h1 class="handwritten">About This Garden</h1>
          <span class="update-badge">Last Updated: 2023.11</span>
        </header>

        <div class="divider"></div>

        <article class="content-body">

          <section>
            <h3>👋 Hello, Traveler.</h3>
            <p>
              欢迎来到我的数字后花园。这不仅仅是一个展示代码的博客，更是我思维碎片的暂存区。
              这里的每一行代码都由 <strong>Vue 3 + Vite</strong> 驱动，每一篇文章都由 <strong>Obsidian</strong> 撰写。
              我是一名热衷于构建极致体验的开发者，也是一名像素工匠。
            </p>
          </section>

          <section>
            <h3>🛡️ Privacy Policy</h3>
            <p>既然你看到了这里，为了让你放心，我也写个“隐私声明”，但我的版本只有三句话：</p>
            <ul class="policy-list">
              <li><strong>1. 纯静态，无后台：</strong> 本站是一个纯静态网站。我没有数据库，没有登录系统。</li>
              <li><strong>2. 关于 Cookies：</strong> 我只用 LocalStorage 记住你的偏好，没有追踪代码。</li>
              <li><strong>3. 你的数据归你：</strong> 我不收集你的任何信息，所以你是自由的。</li>
            </ul>
          </section>

          <section>
            <h3>⚡ Powered By</h3>
            <p>为了构建这个网站，我使用了以下技术栈：</p>
            <div class="tech-tags">
              <span class="tag">Vue3</span>
              <span class="tag">Vite</span>
              <span class="tag">Pinia</span>
              <span class="tag">JavaScript</span>
              <span class="tag">CSS3</span>
            </div>
          </section>

          <section>
            <h3>📮 Contact</h3>
            <p>如果你发现了 Bug，或者只是想聊聊技术与设计，欢迎通过以下方式找到我。</p>

            <div class="contact-box">

              <div class="interaction-wrapper">
                <transition name="smooth-switch" mode="out-in">

                  <div v-if="!emailState.revealed" class="btn-pill outline pointer" @click="emailState.revealed = true"
                    key="email-btn">
                    Email Me ➞
                  </div>

                  <div v-else class="email-display-box" key="email-show">
                    <span class="email-text">{{ emailAddress }}</span>
                    <button class="icon-btn" @click="copyEmail" :title="emailState.copied ? '已复制' : '点击复制'">
                      <transition name="icon-pop" mode="out-in">
                        <span v-if="emailState.copied" key="check">✅</span>
                        <span v-else key="copy">📋</span>
                      </transition>
                    </button>
                  </div>

                </transition>
              </div>

              <div class="interaction-wrapper">
                <transition name="smooth-switch" mode="out-in">

                  <div v-if="!githubState.confirming" class="btn-pill outline pointer"
                    @click="githubState.confirming = true" key="github-btn">
                    Github ➞
                  </div>

                  <div v-else class="confirm-box" key="github-confirm">
                    <span class="confirm-text">Go to Github?</span>
                    <button class="btn-mini go" @click="goToGithub">Yes 🚀</button>
                    <button class="btn-mini cancel" @click="githubState.confirming = false">Wait ✋</button>
                  </div>

                </transition>
              </div>

            </div>
          </section>

        </article>

        <footer class="about-footer">
          <p class="handwritten sign">Made with ❤️ by Creator.</p>
        </footer>

      </div>
    </div>
  </div>
</template>

<script setup>
  import { reactive } from 'vue'

  const emailAddress = "cli20220909@gmail.com"

  // 邮箱状态管理
  const emailState = reactive({
    revealed: false,
    copied: false
  })

  // Github 状态管理
  const githubState = reactive({
    confirming: false
  })

  // 复制邮箱逻辑
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(emailAddress)
      emailState.copied = true
      // 2秒后恢复图标
      setTimeout(() => {
        emailState.copied = false
      }, 2000)
    } catch (err) {
      console.error('Failed to copy', err)
    }
  }

  // 跳转 Github
  const goToGithub = () => {
    window.open('https://github.com', '_blank')
    githubState.confirming = false // 重置状态
  }

</script>

<style scoped>
  /* @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@700&display=swap'); */

  /* --- 基础布局 --- */
  .about-page {
    min-height: 100vh;
    position: relative;
    display: flex;
    justify-content: center;
    padding: 50px 5px;
    color: #333;
  }

  .bg-gradient {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    background: linear-gradient(135deg, #FFDDE1 0%, #E0C3FC 100%);
  }

  .container {
    width: 100%;
    max-width: 800px;
    z-index: 1;
  }

  .glass-card {
    background: rgba(255, 255, 255, 0.65);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.8);
    border-radius: 24px;
    padding: 60px;
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.05);
  }

  .fade-in {
    animation: fadeInUp 0.8s ease-out;
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }

    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* --- 排版 --- */
  .about-header {
    text-align: center;
    margin-bottom: 40px;
  }

  .handwritten {
    font-family: 'Caveat', cursive;
    font-size: 3.5rem;
    margin: 0 0 10px 0;
    color: #5d4037;
  }

  .subtitle {
    font-size: 1.1rem;
    color: #666;
    margin-bottom: 15px;
  }

  .update-badge {
    font-size: 0.8rem;
    background: rgba(0, 0, 0, 0.05);
    padding: 4px 10px;
    border-radius: 20px;
    color: #888;
  }

  .divider {
    height: 1px;
    background: rgba(0, 0, 0, 0.05);
    margin-bottom: 40px;
  }

  .content-body h3 {
    font-size: 1.5rem;
    margin-bottom: 20px;
    color: #2c3e50;
    border-left: 4px solid #ff9a9e;
    padding-left: 15px;
  }

  .content-body section {
    margin-bottom: 50px;
  }

  .content-body p {
    font-size: 1.05rem;
    line-height: 1.8;
    color: #555;
    margin-bottom: 15px;
    text-align: justify;
  }

  .policy-list li {
    background: rgba(255, 255, 255, 0.5);
    padding: 15px;
    margin-bottom: 10px;
    border-radius: 8px;
    font-size: 1rem;
    line-height: 1.6;
    color: #666;
  }

  .policy-list strong {
    color: #d84315;
  }

  .tech-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

  .tag {
    background: #fff;
    padding: 6px 14px;
    border-radius: 6px;
    font-size: 0.9rem;
    color: #555;
    border: 1px solid rgba(0, 0, 0, 0.05);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.02);
    transition: transform 0.2s;
  }

  .tag:hover {
    transform: translateY(-2px);
    color: #ff9a9e;
  }

  /* =========================================
   交互核心样式
========================================= */
  .contact-box {
    margin-top: 25px;
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
  }

  .interaction-wrapper {
    min-width: 140px;
    /* 占位，防止切换时抖动太厉害 */
  }

  /* 通用胶囊按钮样式 */
  .btn-pill {
    padding: 8px 20px;
    border-radius: 50px;
    font-weight: bold;
    font-size: 1rem;
    transition: all 0.3s;
    display: inline-block;
  }

  .pointer {
    cursor: pointer;
  }

  .outline {
    border: 2px solid #6c5ce7;
    color: #6c5ce7;
    background: transparent;
  }

  .outline:hover {
    background: #6c5ce7;
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(108, 92, 231, 0.2);
  }

  /* Email 显示框 */
  .email-display-box {
    display: flex;
    align-items: center;
    background: #fff;
    padding: 5px 10px 5px 20px;
    border-radius: 50px;
    border: 1px solid #ddd;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  }

  .email-text {
    font-family: monospace;
    color: #d84315;
    margin-right: 10px;
    font-size: 0.95rem;
  }

  .icon-btn {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.2rem;
    padding: 5px;
    border-radius: 50%;
    transition: background 0.2s;
  }

  .icon-btn:hover {
    background: #f0f0f0;
  }

  /* Github 确认框 */
  .confirm-box {
    display: flex;
    align-items: center;
    gap: 10px;
    background: #fff;
    padding: 5px 10px 5px 20px;
    border-radius: 50px;
    border: 1px solid #ddd;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  }

  .confirm-text {
    font-size: 0.9rem;
    color: #555;
    font-weight: bold;
  }

  .btn-mini {
    border: none;
    padding: 5px 12px;
    border-radius: 20px;
    font-size: 0.8rem;
    cursor: pointer;
    font-weight: bold;
    transition: opacity 0.2s;
  }

  .btn-mini:hover {
    opacity: 0.8;
  }

  .go {
    background: #6c5ce7;
    color: white;
  }

  .cancel {
    background: #e0e0e0;
    color: #666;
  }

  /* --- 丝滑切换动画 (核心) --- */
  .smooth-switch-enter-active,
  .smooth-switch-leave-active {
    transition: all 0.3s ease;
  }

  .smooth-switch-enter-from,
  .smooth-switch-leave-to {
    opacity: 0;
    transform: translateY(10px);
  }

  /* 图标弹跳动画 */
  .icon-pop-enter-active {
    animation: popIn 0.3s;
  }

  @keyframes popIn {
    0% {
      transform: scale(0);
    }

    50% {
      transform: scale(1.4);
    }

    100% {
      transform: scale(1);
    }
  }

  .about-footer {
    text-align: center;
    margin-top: 60px;
    opacity: 0.6;
  }

  .sign {
    font-size: 1.5rem;
    color: #888;
  }

  @media (max-width: 768px) {
    .glass-card {
      padding: 30px 20px;
    }

    .handwritten {
      font-size: 2.5rem;
    }

    .contact-box {
      flex-direction: column;
      gap: 20px;
      align-items: flex-start;
    }
  }
</style>