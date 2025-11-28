<template>
  <div class="comments-container">
    <div class="comments-header">
      <h3 class="comments-title">💬 留言板</h3>
      <p class="comments-subtitle">分享你的想法，让我们一起交流</p>
    </div>

    <!-- 加载中 -->
    <div v-if="isLoading && !hasError" class="loading-state">
      <div class="loading-spinner"></div>
      <p>正在加载留言系统...</p>
    </div>

    <!-- Giscus 容器 -->
    <div v-show="!hasError" ref="giscusContainer" class="giscus-wrapper"></div>

    <!-- 错误提示（无法访问时显示） -->
    <div v-if="hasError" class="error-fallback">
      <div class="error-icon">⚠️</div>
      <h4 class="error-title">Oops!!!!可能是网络问题导致无法连接到留言服务。</h4>
      <p class="error-message">
        请检查你的网络连接，或稍后重试。
      </p>
      <div class="fallback-options">
        <button @click="retryLoad" class="retry-btn">
          <span>🔄</span>
          <span>重试加载</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted, watch, onBeforeUnmount } from 'vue'
  import { useRoute } from 'vue-router'

  const props = defineProps({
    // Giscus 配置参数
    repo: {
      type: String,
      required: true,
      // 格式: "username/repo-name"
      // 例如: "lcj/vueblog"
    },
    repoId: {
      type: String,
      required: true,
      // 从 https://github.com/apps/giscus 获取
    },
    category: {
      type: String,
      default: 'Announcements',
      // Discussions 分类名称
    },
    categoryId: {
      type: String,
      required: true,
      // 从 https://github.com/apps/giscus 获取
    },
    // 可选配置
    mapping: {
      type: String,
      default: 'pathname',
      // pathname | url | title | og:title
    },
    reactionsEnabled: {
      type: Boolean,
      default: true,
    },
    emitMetadata: {
      type: Boolean,
      default: false,
    },
    inputPosition: {
      type: String,
      default: 'bottom',
      // top | bottom
    },
    theme: {
      type: String,
      default: 'light',
      // light | dark | dark_dimmed | transparent_dark | preferred_color_scheme
    },
    lang: {
      type: String,
      default: 'zh-CN',
    },
  })

  const route = useRoute()
  const giscusContainer = ref(null)
  const isLoading = ref(true)
  const hasError = ref(false)
  let giscusScript = null
  let loadTimeout = null
  let checkInterval = null

  // 检测 Giscus 是否成功加载
  const checkGiscusLoaded = () => {
    if (!giscusContainer.value) return false

    // 检查是否有 iframe 元素
    const iframe = giscusContainer.value.querySelector('iframe.giscus-frame')
    if (iframe) {
      // 检查 iframe 是否已加载内容
      try {
        // 如果 iframe 存在且高度大于 0，认为加载成功
        if (iframe.offsetHeight > 0) {
          return true
        }
      } catch (e) {
        // 跨域限制，无法访问 iframe 内容
        // 但 iframe 存在说明 script 已加载
        return true
      }
    }
    return false
  }

  // 加载 Giscus
  const loadGiscus = () => {
    // 重置状态
    isLoading.value = true
    hasError.value = false

    // 如果已经加载过，先移除旧的
    if (giscusScript) {
      giscusScript.remove()
      giscusScript = null
    }

    // 清除之前的定时器
    if (loadTimeout) {
      clearTimeout(loadTimeout)
      loadTimeout = null
    }
    if (checkInterval) {
      clearInterval(checkInterval)
      checkInterval = null
    }

    // 清空容器
    if (giscusContainer.value) {
      giscusContainer.value.innerHTML = ''
    }

    // 创建 script 标签
    giscusScript = document.createElement('script')
    giscusScript.src = 'https://giscus.app/client.js'
    giscusScript.setAttribute('data-repo', props.repo)
    giscusScript.setAttribute('data-repo-id', props.repoId)
    giscusScript.setAttribute('data-category', props.category)
    giscusScript.setAttribute('data-category-id', props.categoryId)
    giscusScript.setAttribute('data-mapping', props.mapping)
    giscusScript.setAttribute('data-reactions-enabled', props.reactionsEnabled ? '1' : '0')
    giscusScript.setAttribute('data-emit-metadata', props.emitMetadata ? '1' : '0')
    giscusScript.setAttribute('data-input-position', props.inputPosition)
    giscusScript.setAttribute('data-theme', props.theme)
    giscusScript.setAttribute('data-lang', props.lang)
    giscusScript.setAttribute('data-strict', '0')
    giscusScript.setAttribute('data-loading', 'lazy')
    giscusScript.crossOrigin = 'anonymous'
    giscusScript.async = true

    // 监听 script 加载成功
    giscusScript.onload = () => {
      // Script 加载成功，开始检测 iframe
      checkInterval = setInterval(() => {
        if (checkGiscusLoaded()) {
          isLoading.value = false
          hasError.value = false
          if (checkInterval) {
            clearInterval(checkInterval)
            checkInterval = null
          }
          if (loadTimeout) {
            clearTimeout(loadTimeout)
            loadTimeout = null
          }
        }
      }, 500) // 每 500ms 检查一次

      // 10 秒后如果还没加载成功，认为失败
      loadTimeout = setTimeout(() => {
        if (isLoading.value) {
          isLoading.value = false
          hasError.value = true
          if (checkInterval) {
            clearInterval(checkInterval)
            checkInterval = null
          }
        }
      }, 10000)
    }

    // 监听 script 加载失败
    giscusScript.onerror = () => {
      isLoading.value = false
      hasError.value = true
      if (loadTimeout) {
        clearTimeout(loadTimeout)
        loadTimeout = null
      }
      if (checkInterval) {
        clearInterval(checkInterval)
        checkInterval = null
      }
    }

    // 添加到容器
    if (giscusContainer.value) {
      giscusContainer.value.appendChild(giscusScript)
    }

    // 备用超时检测（15 秒）
    setTimeout(() => {
      if (isLoading.value && !checkGiscusLoaded()) {
        isLoading.value = false
        hasError.value = true
        if (checkInterval) {
          clearInterval(checkInterval)
          checkInterval = null
        }
      }
    }, 15000)
  }

  // 重试加载
  const retryLoad = () => {
    loadGiscus()
  }

  // 监听路由变化，重新加载（用于 SPA 路由切换）
  watch(
    () => route.fullPath,
    () => {
      // 延迟加载，确保 DOM 已更新
      setTimeout(() => {
        loadGiscus()
      }, 100)
    }
  )

  onMounted(() => {
    loadGiscus()
  })

  onBeforeUnmount(() => {
    if (giscusScript) {
      giscusScript.remove()
      giscusScript = null
    }
    if (loadTimeout) {
      clearTimeout(loadTimeout)
      loadTimeout = null
    }
    if (checkInterval) {
      clearInterval(checkInterval)
      checkInterval = null
    }
  })
</script>

<style scoped>
  .comments-container {
    margin-top: 40px;
    padding: 0;
    background: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(15px);
    border: 1px solid rgba(224, 195, 252, 0.3);
    border-radius: 16px;
    box-shadow:
      0 4px 20px rgba(224, 195, 252, 0.15),
      0 1px 4px rgba(0, 0, 0, 0.05);
    position: relative;
    overflow: hidden;
    transition: all 0.3s ease;
    max-width: 900px;
    margin-left: auto;
    margin-right: auto;
  }

  .comments-container:hover {
    transform: translateY(-1px);
    box-shadow:
      0 6px 25px rgba(224, 195, 252, 0.2),
      0 2px 6px rgba(0, 0, 0, 0.08);
    border-color: rgba(224, 195, 252, 0.4);
  }

  /* 顶部渐变装饰条 - 更柔和 */
  .comments-container::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg,
        rgba(255, 221, 225, 0.6) 0%,
        rgba(224, 195, 252, 0.6) 50%,
        rgba(142, 197, 252, 0.6) 100%);
    border-radius: 16px 16px 0 0;
    z-index: 1;
  }

  /* 标题区域 - 更紧凑 */
  .comments-header {
    padding: 20px 24px 16px;
    text-align: center;
    border-bottom: 1px solid rgba(224, 195, 252, 0.2);
    background: linear-gradient(135deg,
        rgba(255, 221, 225, 0.05) 0%,
        rgba(224, 195, 252, 0.05) 100%);
    position: relative;
    z-index: 1;
  }

  .comments-title {
    font-family: 'Caveat', cursive;
    font-size: 1.6rem;
    margin: 0 0 4px 0;
    color: #6c5ce7;
    font-weight: 500;
    background: linear-gradient(135deg, #a29bfe 0%, #6c5ce7 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .comments-subtitle {
    font-size: 0.85rem;
    color: #999;
    margin: 0;
    letter-spacing: 0.3px;
  }

  .giscus-wrapper {
    width: 100%;
    position: relative;
    z-index: 1;
    padding: 16px 24px 24px;
    background: transparent;
  }

  /* 自定义 Giscus 样式 - 更紧凑 */
  :deep(.giscus) {
    margin-top: 0;
    font-size: 0.9rem;
  }

  /* 覆盖 Giscus iframe 样式 */
  :deep(.giscus-frame) {
    border-radius: 12px;
    overflow: hidden;
    border: none;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
  }

  /* 自定义滚动条样式 - 更柔和的颜色 */
  :deep(.giscus) ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  :deep(.giscus) ::-webkit-scrollbar-track {
    background: rgba(224, 195, 252, 0.1);
    border-radius: 8px;
  }

  :deep(.giscus) ::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, rgba(162, 155, 254, 0.6) 0%, rgba(108, 92, 231, 0.6) 100%);
    border-radius: 8px;
    border: 1px solid transparent;
    background-clip: padding-box;
  }

  :deep(.giscus) ::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(135deg, rgba(162, 155, 254, 0.8) 0%, rgba(108, 92, 231, 0.8) 100%);
    background-clip: padding-box;
  }

  /* 加载状态 */
  .loading-state {
    padding: 40px 24px;
    text-align: center;
    color: #999;
  }

  .loading-spinner {
    width: 32px;
    height: 32px;
    margin: 0 auto 16px;
    border: 3px solid rgba(162, 155, 254, 0.2);
    border-top-color: #6c5ce7;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  .loading-state p {
    margin: 0;
    font-size: 0.9rem;
  }

  /* 错误降级方案 */
  .error-fallback {
    padding: 32px 24px;
    text-align: center;
  }

  .error-icon {
    font-size: 3rem;
    margin-bottom: 12px;
  }

  .error-title {
    font-size: 1.2rem;
    color: #6c5ce7;
    margin: 0 0 12px 0;
    font-weight: 600;
  }

  .error-message {
    font-size: 0.9rem;
    color: #666;
    margin: 0 0 24px 0;
    line-height: 1.6;
  }

  .fallback-options {
    display: flex;
    flex-direction: column;
    gap: 12px;
    align-items: center;
  }

  .retry-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 10px 20px;
    background: rgba(162, 155, 254, 0.1);
    color: #6c5ce7;
    border: 1px solid rgba(162, 155, 254, 0.3);
    border-radius: 12px;
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .retry-btn:hover {
    background: rgba(162, 155, 254, 0.2);
    border-color: rgba(162, 155, 254, 0.5);
  }

  .retry-btn span:first-child {
    font-size: 1.1rem;
  }

  /* 响应式调整 */
  @media (max-width: 767px) {
    .comments-container {
      margin-top: 30px;
      border-radius: 14px;
      max-width: 100%;
    }

    .comments-header {
      padding: 16px 20px 12px;
    }

    .comments-title {
      font-size: 1.4rem;
    }

    .comments-subtitle {
      font-size: 0.8rem;
    }

    .giscus-wrapper {
      padding: 12px 16px 20px;
    }

    .error-fallback {
      padding: 24px 20px;
    }
  }
</style>
