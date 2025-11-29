<template>
  <div class="post-page-bg">
    <div class="post-container">
      <div class="nav-bar">
        <button @click="goBack" class="back-btn">← 返回列表</button>
      </div>

      <div v-if="post" class="article-wrapper glass-card">

        <div class="article-content">
          <div v-if="coverSrc" class="cover-img">
            <img :src="coverSrc" alt="cover" />
          </div>

          <h1 class="main-title">{{ post.attributes.title }}</h1>

          <div class="meta-info">
            <span>{{ post.attributes.date }}</span>
            <span v-if="post.attributes.user"> · {{ post.attributes.user }}</span>
          </div>

          <hr class="separator" />

          <div class="markdown-body" v-html="htmlContent"></div>
        </div>

      </div>

      <div v-else class="loading">
        <div class="spinner"></div>
        <p>文章加载中...</p>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted, computed } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { useNotesStore } from '@/stores/notesStore';
  import defaultCover from '@/assets/images/loading.jpg';
  // 保持依赖动态导入，解决 820KB bloat 问题
  import { default as MarkdownIt } from 'markdown-it';

  const route = useRoute();
  const router = useRouter();
  const notesStore = useNotesStore();

  const post = ref(null);
  const htmlContent = ref('');
  const coverSrc = computed(() => post.value?.attributes.cover || defaultCover);

  onMounted(async () => {
    try {
      // 确保 store 已初始化（只加载元数据，不加载完整内容）
      if (!notesStore.isLoaded) {
        notesStore.initPosts();
      }

      const filePath = route.query.path; // e.g., /src/posts/01.md

      if (filePath) {
        // 🚀 性能优化：懒加载文章内容
        // getPostByPath 现在是异步的，会按需加载文章内容
        // 文章内容被分离到独立的 chunk 中，减少首屏加载时间
        const parsed = await notesStore.getPostByPath(filePath);

        if (!parsed) {
          console.error("文章未找到:", filePath);
          router.push('/notes');
          return;
        }

        // 初始化解析器
        const md = new MarkdownIt({
          html: true,
          linkify: true,
          typographer: true
        });

        // 解析和渲染
        post.value = parsed;
        htmlContent.value = md.render(parsed.body);

      } else {
        router.push('/notes');
      }
    } catch (e) {
      console.error("Post loading error:", e);
      // 遇到错误，直接跳回列表
      router.push('/notes');
    }
  });

  const goBack = () => {
    router.back();
  };
</script>

<style scoped>
  /* 样式保持不变 */
  @import 'github-markdown-css';

  .post-page-bg {
    background: linear-gradient(135deg, #FFDDE1 0%, #E0C3FC 100%);
    padding: 40px 20px;
    min-height: 100vh;
    display: flex;
    justify-content: center;
  }

  .post-container {
    max-width: 800px;
    width: 100%;
    margin: 0 auto;
    min-height: 80vh;
  }

  .nav-bar {
    margin-bottom: 20px;
  }

  .back-btn {
    border: none;
    background: none;
    font-size: 16px;
    cursor: pointer;
    color: #666;
    padding: 0;
    transition: color 0.2s;
  }

  .back-btn:hover {
    color: #6c5ce7;
  }

  .article-wrapper {
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(15px);
    border: 1px solid rgba(255, 255, 255, 0.8);
    border-radius: 12px;
    box-shadow: 0 5px 25px rgba(0, 0, 0, 0.08);
    padding: 40px;
  }

  .article-content {
    opacity: 1;
    transition: opacity 0.5s;
  }

  .cover-img img {
    width: 100%;
    border-radius: 8px;
    margin-bottom: 30px;
    max-height: 400px;
    object-fit: cover;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }

  .main-title {
    font-size: 2rem;
    margin-bottom: 10px;
    color: #333;
    line-height: 1.3;
  }

  .meta-info {
    color: #999;
    font-size: 0.9rem;
    margin-bottom: 20px;
  }

  .separator {
    border: 0;
    border-top: 1px solid rgba(0, 0, 0, 0.05);
    margin: 20px 0;
  }

  .markdown-body {
    box-sizing: border-box;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    line-height: 1.7;
  }

  .loading {
    text-align: center;
    padding: 80px;
    color: #6c5ce7;
  }

  .spinner {
    border: 4px solid rgba(108, 92, 231, 0.1);
    border-top: 4px solid #6c5ce7;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
    margin: 0 auto 15px;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }

  @media (max-width: 767px) {
    .post-page-bg {
      padding: 15px 10px;
    }

    .article-wrapper {
      padding: 25px 20px;
    }

    .main-title {
      font-size: 1.6rem;
    }

    .markdown-body {
      font-size: 0.95rem;
    }
  }
</style>