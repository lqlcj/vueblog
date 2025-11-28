<template>
  <div class="blog-bg-layer"></div>

  <div class="xhs-container" ref="containerRef">

    <div class="blog-header fade-in-up">
      <h2 class="handwritten">My Stories</h2>
      <p class="subtitle">记录生活，探索代码</p>
    </div>

    <div class="waterfall-box">
      <div v-for="(item, index) in currentDisplayData" :key="item.id" class="card glass-card pop-in"
        :style="{ animationDelay: `${index * 0.05}s` }" @click="handleClick(item)">
        <div class="card-img-wrapper" :style="{ paddingBottom: (1 / item.visualRatio * 100) + '%' }">
          <img :src="item.img" loading="lazy" :alt="item.title" />
          <div class="img-overlay">
            <div class="read-btn">
              <span>READ</span>
            </div>
          </div>
        </div>

        <div class="card-content">
          <div class="title">{{ item.title }}</div>
          <div class="footer">
            <div class="user">
              <img :src="item.avatar" class="avatar" />
              <span class="username">{{ item.user }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="totalPages > 1" class="pagination fade-in-up">
      <button class="page-btn glass-btn" :disabled="currentPage === 1" @click="changePage(currentPage - 1)">←
        Prev</button>
      <span class="page-info">{{ currentPage }} / {{ totalPages }}</span>
      <button class="page-btn glass-btn" :disabled="currentPage === totalPages"
        @click="changePage(currentPage + 1)">Next →</button>
    </div>

    <div v-if="allData.length === 0" class="empty-tip glass-card">
      🍃 还没有文章，快去 src/posts/ 下新建一个 md 文件吧！
    </div>

  </div>
</template>

<script setup>
  import { ref, computed, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { useBlogStore } from '@/stores/blogStore';

  const router = useRouter();
  const blogStore = useBlogStore();

  const containerRef = ref(null);
  const currentPage = ref(1);
  const PAGE_SIZE = 12;

  onMounted(() => {
    blogStore.initPosts();
  });

  const allData = computed(() => blogStore.allPosts);

  // 🔴 视觉逻辑：定义比例模式，制造瀑布流的错落感
  const ratioPattern = [0.75, 1.0, 0.75, 1.33, 0.6, 0.75, 1.0];

  const currentDisplayData = computed(() => {
    const start = (currentPage.value - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    const pageData = allData.value.slice(start, end);

    return pageData.map((item, index) => {
      // 注入 visualRatio (如果数据源里没有，就按顺序派发一个)
      const visualRatio = item.aspectRatio || ratioPattern[index % ratioPattern.length];
      return { ...item, visualRatio };
    });
  });

  const totalPages = computed(() => Math.ceil(allData.value.length / PAGE_SIZE));

  const changePage = (page) => {
    if (page < 1 || page > totalPages.value) return;
    currentPage.value = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClick = (item) => {
    // 确保传递了文件路径
    router.push({
      path: '/post',
      query: { path: item.filePath }
    });
  };
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@700&display=swap');

  .blog-bg-layer {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    background: linear-gradient(135deg, #FFDDE1 0%, #E0C3FC 100%);
    opacity: 0.6;
  }

  .xhs-container {
    width: 100%;
    max-width: 960px;
    margin: 0 auto;
    padding: 40px 10px 80px;
    box-sizing: border-box;
  }

  .blog-header {
    text-align: center;
    margin-bottom: 30px;
    color: #5d4037;
  }

  .handwritten {
    font-family: 'Caveat', cursive;
    font-size: 3rem;
    margin: 0;
  }

  .subtitle {
    font-size: 1rem;
    color: #888;
    margin-top: 5px;
    letter-spacing: 2px;
  }

  /* 瀑布流布局 */
  .waterfall-box {
    column-count: 3;
    column-gap: 15px;
  }

  .card {
    break-inside: avoid;
    margin-bottom: 15px;
    background: #fff;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
    cursor: pointer;
    transition: all 0.3s ease;
    border: 1px solid rgba(0, 0, 0, 0.02);
    -webkit-mask-image: -webkit-radial-gradient(white, black);
  }

  .glass-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
    z-index: 10;
  }

  /* 图片容器 */
  .card-img-wrapper {
    width: 100%;
    position: relative;
    background-color: #f5f5f5;
    overflow: hidden;
  }

  .card-img-wrapper img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }

  .glass-card:hover .card-img-wrapper img {
    transform: scale(1.08);
  }

  .img-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s;
  }

  .glass-card:hover .img-overlay {
    opacity: 1;
  }

  .read-btn {
    background: rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(4px);
    border: 1px solid rgba(255, 255, 255, 0.9);
    padding: 6px 18px;
    border-radius: 20px;
    color: #fff;
    font-weight: 800;
    font-size: 0.8rem;
    letter-spacing: 1px;
  }

  .card-content {
    padding: 10px 12px;
  }

  .title {
    font-size: 0.95rem;
    color: #333;
    line-height: 1.4;
    margin-bottom: 8px;
    font-weight: 500;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .footer {
    display: flex;
    align-items: center;
    font-size: 0.75rem;
    color: #999;
  }

  .user {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .avatar {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    object-fit: cover;
    border: 1px solid #f0f0f0;
  }

  .username {
    max-width: 8em;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  /* 动画和分页 */
  .pop-in {
    opacity: 0;
    animation: slideUpFade 0.6s ease-out forwards;
  }

  .fade-in-up {
    opacity: 0;
    animation: slideUpFade 0.8s ease-out forwards;
  }

  @keyframes slideUpFade {
    from {
      opacity: 0;
      transform: translateY(20px);
    }

    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    margin-top: 40px;
  }

  .glass-btn {
    padding: 8px 20px;
    border: 1px solid rgba(255, 255, 255, 0.6);
    background: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(5px);
    border-radius: 50px;
    cursor: pointer;
    color: #555;
    transition: all 0.3s;
  }

  .glass-btn:hover:not(:disabled) {
    background: #fff;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
    color: #6c5ce7;
  }

  .glass-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .page-info {
    font-family: monospace;
    color: #666;
    font-weight: bold;
  }

  .empty-tip {
    text-align: center;
    padding: 60px;
    color: #888;
    font-size: 1rem;
    margin-top: 20px;
  }

  @media (max-width: 768px) {
    .waterfall-box {
      column-count: 2;
      column-gap: 10px;
    }

    .handwritten {
      font-size: 2.2rem;
    }

    .xhs-container {
      padding: 20px 5px;
    }
  }
</style>