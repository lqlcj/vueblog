<!-- 博客文章页 -->

<template>
  <div class="post-container">
    <div class="nav-bar">
      <button @click="goBack" class="back-btn">← 返回列表</button>
    </div>

    <div v-if="post" class="article-content">
      <div v-if="post.attributes.cover" class="cover-img">
        <img :src="post.attributes.cover" alt="cover" />
      </div>

      <h1 class="main-title">{{ post.attributes.title }}</h1>

      <div class="meta-info">
        <span>{{ post.attributes.date }}</span>
        <span v-if="post.attributes.user"> · {{ post.attributes.user }}</span>
      </div>

      <hr />

      <div class="markdown-body" v-html="htmlContent"></div>
    </div>

    <div v-else class="loading">
      加载中...
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import fm from 'front-matter';
  import MarkdownIt from 'markdown-it';
  import 'github-markdown-css'; // 引入 GitHub 的文章样式

  const route = useRoute();
  const router = useRouter();
  const md = new MarkdownIt(); // 初始化解析器

  const post = ref(null);
  const htmlContent = ref('');

  // 重新读取所有文章（为了找到当前这一篇）
  // 注意：这里路径要和你瀑布流里写的一模一样！
  const mdFiles = import.meta.glob('/src/posts/*.md', {
    query: '?raw',
    import: 'default',
    eager: true
  });

  onMounted(() => {
    // 1. 从路由参数里拿到文件路径 (比如 /src/posts/01.md)
    const filePath = route.query.path;

    if (filePath && mdFiles[filePath]) {
      // 2. 读取文件内容
      const rawContent = mdFiles[filePath];

      // 3. 解析 Frontmatter 和 正文
      const parsed = fm(rawContent);
      post.value = parsed;

      // 4. 把正文转换成 HTML
      htmlContent.value = md.render(parsed.body);
    } else {
      alert('文章找不到了！');
      goBack();
    }
  });

  const goBack = () => {
    router.back();
  };
</script>

<style scoped>

  /* 容器样式 */
  .post-container {
    max-width: 800px;
    /* 文章页不用太宽，800px阅读体验最好 */
    margin: 0 auto;
    padding: 20px;
    background: #fff;
    min-height: 100vh;
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
  }

  .back-btn:hover {
    color: #ff2442;
  }

  .cover-img img {
    width: 100%;
    border-radius: 8px;
    margin-bottom: 20px;
    max-height: 400px;
    object-fit: cover;
  }

  .main-title {
    font-size: 28px;
    margin-bottom: 10px;
    color: #333;
  }

  .meta-info {
    color: #999;
    font-size: 14px;
    margin-bottom: 20px;
  }

  /* markdown-body 也就是正文区域的一些微调 */
  .markdown-body {
    box-sizing: border-box;
    min-width: 200px;
    max-width: 980px;
    margin: 0 auto;
    padding: 15px 0;
  }

  @media (max-width: 767px) {
    .markdown-body {
      padding: 15px;
    }
  }
</style>