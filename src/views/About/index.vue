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
              欢迎来到我的后花园。这是一个思维碎片的暂存区。这里的每一行代码都由 <strong>Vue 3 + Vite</strong> 驱动，每一篇文章都由 <strong>Obsidian</strong> 撰写。
            </p>
          </section>

          <section>
            <h3>⚡ Powered By</h3>
            <p>这是一个基于 Vue 3 构建的纯静态个人博客系统，采用 Composition API、Pinia 状态管理和 Vite 构建工具，支持 Markdown 文章、友链管理和 Giscus 留言系统。</p>
            <p>现已在github开源。</p>

            <h4 style="margin-top: 30px; margin-bottom: 15px; font-size: 1.2rem; color: #2c3e50;">✨ 特性</h4>
            <ul class="feature-list">
              <li><strong>📝 Markdown 支持</strong>：支持 Markdown 格式文章，自动解析 front-matter</li>
              <li><strong>🎯 响应式布局</strong>：完美适配桌面端和移动端</li>
              <li><strong>🚀 性能优化</strong>：代码分割、懒加载、异步组件加载</li>
              <li><strong>💬 留言系统</strong>：集成 Giscus 评论系统</li>
              <li><strong>🔗 友链管理</strong>：支持友链申请和管理</li>
              <li><strong>🎭 动画效果</strong>：使用 GSAP 和 CSS 动画，流畅的交互体验</li>
              <li><strong>⚡ 快速构建</strong>：基于 Vite 的快速开发体验</li>
            </ul>

            <h4 style="margin-top: 30px; margin-bottom: 15px; font-size: 1.2rem; color: #2c3e50;">核心框架</h4>
            <ul class="feature-list">
              <li><strong>Vue 3.4+</strong> - 渐进式 JavaScript 框架</li>
              <li><strong>Vue Router 4</strong> - 官方路由管理器</li>
              <li><strong>Pinia</strong> - Vue 官方状态管理库</li>
            </ul>

            <h4 style="margin-top: 30px; margin-bottom: 15px; font-size: 1.2rem; color: #2c3e50;">构建工具</h4>
            <ul class="feature-list">
              <li><strong>Vite 7.2+</strong> - 前端构建工具</li>
              <li><strong>@vitejs/plugin-vue</strong> - Vue 单文件组件支持</li>
            </ul>

            <h4 style="margin-top: 30px; margin-bottom: 15px; font-size: 1.2rem; color: #2c3e50;">功能库</h4>
            <ul class="feature-list">
              <li><strong>markdown-it</strong> - Markdown 解析器</li>
              <li><strong>front-matter</strong> - Front matter 解析</li>
              <li><strong>github-markdown-css</strong> - GitHub 风格 Markdown 样式</li>
              <li><strong>gsap</strong> - 动画库</li>
              <li><strong>canvas-confetti</strong> - 彩带动画效果</li>
            </ul>

            <h4 style="margin-top: 30px; margin-bottom: 15px; font-size: 1.2rem; color: #2c3e50;">开发工具</h4>
            <ul class="feature-list">
              <li><strong>unplugin-auto-import</strong> - 自动导入 API</li>
              <li><strong>unplugin-vue-components</strong> - 自动导入组件</li>
              <li><strong>rollup-plugin-visualizer</strong> - 打包分析工具</li>
            </ul>
          </section>

          <section>
            <h3>👤 作者</h3>
            <p>&nbsp;&nbsp;元宵 (LCJ)</p>
          </section>

          <section>
            <h3>🙏 致谢</h3>
            <ul class="feature-list">
              <li>Vue.js 团队</li>
              <li>Vite 团队</li>
              <li>所有开源贡献者</li>
            </ul>
          </section>

          <section>
            <h3>📮 Contact</h3>
            <p>如果你发现了 Bug，或者只是想聊聊技术与设计，欢迎通过以下方式找到我。</p>

            <div class="contact-box">

              <div class="interaction-wrapper">
                <transition name="smooth-switch" mode="out-in">

                  <button v-if="!emailState.revealed" class="btn-pill outline pointer"
                    @click="emailState.revealed = true" key="email-btn" aria-label="显示邮箱地址">
                    Email Me ➞
                  </button>

                  <div v-else class="email-display-box" key="email-show">
                    <span class="email-text" aria-label="邮箱地址">{{ emailAddress }}</span>
                    <button class="icon-btn" @click="copyEmail" :title="emailState.copied ? '已复制' : '点击复制'"
                      :aria-label="emailState.copied ? '已复制到剪贴板' : '复制邮箱地址'">
                      <transition name="icon-pop" mode="out-in">
                        <span v-if="emailState.copied" key="check" aria-hidden="true">✅</span>
                        <span v-else key="copy" aria-hidden="true">📋</span>
                      </transition>
                    </button>
                  </div>

                </transition>
              </div>

              <div class="interaction-wrapper">
                <transition name="smooth-switch" mode="out-in">

                  <button v-if="!githubState.confirming" class="btn-pill outline pointer"
                    @click="githubState.confirming = true" key="github-btn" aria-label="打开 Github">
                    Github ➞
                  </button>

                  <div v-else class="confirm-box" key="github-confirm" role="dialog" aria-label="确认跳转">
                    <span class="confirm-text">Go to Github?</span>
                    <button class="btn-mini go" @click="goToGithub" aria-label="确认跳转到 Github">
                      Yes 🚀
                    </button>
                    <button class="btn-mini cancel" @click="githubState.confirming = false" aria-label="取消跳转">
                      Wait ✋
                    </button>
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
  import { reactive, onBeforeUnmount } from 'vue'

  const emailAddress = "cli20220909@gmail.com"

  // 🚀 优化：邮箱状态管理
  const emailState = reactive({
    revealed: false,
    copied: false
  })

  // 🚀 优化：Github 状态管理
  const githubState = reactive({
    confirming: false
  })

  // 🚀 优化：定时器管理，避免内存泄漏
  let copyTimer = null

  // 🚀 优化：复制邮箱逻辑，改进错误处理和用户反馈
  const copyEmail = async () => {
    try {
      // 检查 Clipboard API 是否可用
      if (!navigator.clipboard) {
        // 降级方案：使用传统方法
        const textArea = document.createElement('textarea')
        textArea.value = emailAddress
        textArea.style.position = 'fixed'
        textArea.style.opacity = '0'
        document.body.appendChild(textArea)
        textArea.select()
        document.execCommand('copy')
        document.body.removeChild(textArea)
        emailState.copied = true
      } else {
        await navigator.clipboard.writeText(emailAddress)
        emailState.copied = true
      }

      // 🚀 优化：清理之前的定时器
      if (copyTimer) {
        clearTimeout(copyTimer)
      }

      // 2秒后恢复图标
      copyTimer = setTimeout(() => {
        emailState.copied = false
        copyTimer = null
      }, 2000)
    } catch (err) {
      console.error('Failed to copy', err)
      // 🚀 优化：可以添加用户提示
    }
  }

  // 🚀 优化：跳转 Github，添加安全检查
  const goToGithub = () => {
    try {
      window.open('https://github.com/lqlcj/vueblog', '_blank', 'noopener,noreferrer')
      githubState.confirming = false
    } catch (err) {
      console.error('Failed to open Github', err)
    }
  }

  // 🚀 优化：清理定时器，避免内存泄漏
  onBeforeUnmount(() => {
    if (copyTimer) {
      clearTimeout(copyTimer)
      copyTimer = null
    }
  })
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
    will-change: transform, opacity;
    /* 🚀 性能优化 */
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translate3d(0, 30px, 0);
      /* 🚀 使用 translate3d 启用 GPU 加速 */
    }

    to {
      opacity: 1;
      transform: translate3d(0, 0, 0);
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

  .policy-list li,
  .feature-list li {
    background: rgba(255, 255, 255, 0.5);
    padding: 8px 15px;
    margin-bottom: 5px;
    border-radius: 8px;
    font-size: 1rem;
    line-height: 1.6;
    color: #666;
    list-style: none;
  }

  .policy-list strong,
  .feature-list strong {
    color: #d84315;
  }

  .feature-list {
    padding-left: 0;
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
    transition: transform 0.2s ease;
    will-change: transform;
    /* 🚀 性能优化 */
  }

  .tag:hover {
    transform: translate3d(0, -2px, 0);
    /* 🚀 使用 translate3d */
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
    transform: translate3d(0, -2px, 0);
    /* 🚀 使用 translate3d */
    box-shadow: 0 5px 15px rgba(108, 92, 231, 0.2);
  }

  /* 🚀 可访问性优化：按钮焦点样式 */
  .btn-pill:focus-visible,
  .icon-btn:focus-visible,
  .btn-mini:focus-visible {
    outline: 2px solid #6c5ce7;
    outline-offset: 2px;
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
    will-change: transform, opacity;
    /* 🚀 性能优化 */
  }

  .smooth-switch-enter-from,
  .smooth-switch-leave-to {
    opacity: 0;
    transform: translate3d(0, 10px, 0);
    /* 🚀 使用 translate3d */
  }

  /* 图标弹跳动画 */
  .icon-pop-enter-active {
    animation: popIn 0.3s;
  }

  @keyframes popIn {
    0% {
      transform: scale3d(0, 0, 1);
      /* 🚀 使用 scale3d */
    }

    50% {
      transform: scale3d(1.4, 1.4, 1);
    }

    100% {
      transform: scale3d(1, 1, 1);
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
    .about-page {
      padding: 30px 5px;
    }

    .glass-card {
      padding: 30px 20px;
    }

    .handwritten {
      font-size: 2.5rem;
    }

    .content-body h3 {
      font-size: 1.3rem;
    }

    .content-body p {
      font-size: 1rem;
    }

    .contact-box {
      flex-direction: column;
      gap: 20px;
      align-items: flex-start;
    }

    .interaction-wrapper {
      width: 100%;
    }
  }

  /* 🚀 可访问性优化：支持减少动画偏好 */
  @media (prefers-reduced-motion: reduce) {
    .fade-in {
      animation: none;
      opacity: 1;
      transform: none;
    }

    .smooth-switch-enter-active,
    .smooth-switch-leave-active {
      transition: none;
    }

    .smooth-switch-enter-from,
    .smooth-switch-leave-to {
      opacity: 1;
      transform: none;
    }

    .icon-pop-enter-active {
      animation: none;
    }

    .tag:hover {
      transform: none;
    }

    .outline:hover {
      transform: none;
    }
  }
</style>