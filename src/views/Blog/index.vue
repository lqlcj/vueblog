<template>
  <div class="blog-bg-layer"></div>

  <div class="xhs-container" ref="containerRef">

    <div class="blog-header fade-in-up">
      <h2 class="handwritten">My Stories</h2>
      <p class="subtitle">记录生活，探索代码</p>
    </div>

    <div class="waterfall-box" :style="{ gap: gapSize + 'px' }">
      <div v-for="(col, colIndex) in columns" :key="colIndex" class="column" :style="{ gap: gapSize + 'px' }">

        <div v-for="(item, index) in col" :key="item.id" class="card glass-card pop-in"
          :style="{ animationDelay: `${(index * 0.1) + (colIndex * 0.05)}s` }" @click="handleClick(item)">
          <div class="card-img" :style="{ aspectRatio: item.aspectRatio }">
            <img :src="item.img" loading="lazy" :alt="item.title" />

            <div class="img-overlay">
              <div class="read-btn">
                <span>READ NOW</span>
                <span class="arrow">→</span>
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
    </div>

    <div v-if="totalPages > 1" class="pagination fade-in-up">
      <button class="page-btn glass-btn" :disabled="currentPage === 1" @click="changePage(currentPage - 1)">
        ← Prev
      </button>
      <span class="page-info">{{ currentPage }} / {{ totalPages }}</span>
      <button class="page-btn glass-btn" :disabled="currentPage === totalPages" @click="changePage(currentPage + 1)">
        Next →
      </button>
    </div>

    <div v-if="allData.length === 0" class="empty-tip glass-card">
      🍃 还没有文章，快去 src/posts/ 下新建一个 md 文件吧！
    </div>

  </div>
</template>

<script setup>
  import { ref, computed, onMounted, onUnmounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { useBlogStore } from '@/stores/blogStore';

  const router = useRouter();
  const blogStore = useBlogStore();

  onMounted(() => {
    blogStore.initPosts();
    if (containerRef.value) {
      resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          containerWidth.value = entry.contentRect.width;
        }
      });
      resizeObserver.observe(containerRef.value);
    }
  });

  const allData = computed(() => blogStore.allPosts);

  const PAGE_SIZE = 12;
  const containerRef = ref(null);
  const containerWidth = ref(1000);
  const currentPage = ref(1);

  const columnCount = computed(() => {
    const w = containerWidth.value;
    if (w < 600) return 2;
    // 调整了断点，让它更容易变成 3 列，避免卡片太大
    if (w < 900) return 2;
    return 3;
  });

  const gapSize = computed(() => containerWidth.value < 600 ? 12 : 20);
  let resizeObserver = null;

  onUnmounted(() => {
    if (resizeObserver) resizeObserver.disconnect();
  });

  const currentDisplayData = computed(() => {
    const start = (currentPage.value - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    return allData.value.slice(start, end);
  });

  const columns = computed(() => {
    const cols = Array.from({ length: columnCount.value }, () => []);
    currentDisplayData.value.forEach((item, index) => {
      cols[index % columnCount.value].push(item);
    });
    return cols;
  });

  const totalPages = computed(() => Math.ceil(allData.value.length / PAGE_SIZE));

  const changePage = (page) => {
    if (page < 1 || page > totalPages.value) return;
    currentPage.value = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClick = (item) => {
    router.push({
      path: '/post',
      query: { path: item.filePath }
    });
  };
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@700&display=swap');

  /* --- 1. 背景层 --- */
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

  /* --- 2. 容器 (控制卡片整体大小的核心) --- */
  .xhs-container {
    width: 100%;

    /* 🔴 修改点：控制这里！ */
    /* 之前是 1200px，改成了 960px。 */
    /* 如果觉得还大，改成 800px；如果觉得太小，改成 1100px */
    max-width: 960px;

    margin: 0 auto;
    padding: 40px 20px 80px;
    box-sizing: border-box;
  }

  /* 顶部标题 */
  .blog-header {
    text-align: center;
    margin-bottom: 40px;
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
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
  }

  .column {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-width: 0;
  }

  /* --- 3. 玻璃态卡片 --- */
  .glass-card {
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.8);
    border-radius: 12px;
    /* 圆角稍微改小一点点，更精致 */
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  }

  .glass-card:hover {
    transform: translateY(-5px);
    /* 上浮高度减小，不那么夸张 */
    background: rgba(255, 255, 255, 0.95);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
    z-index: 10;
  }

  /* 封面图 */
  .card-img {
    width: 100%;
    background-color: #f0f0f0;
    position: relative;
    overflow: hidden;
  }

  .card-img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.5s ease;
  }

  .glass-card:hover .card-img img {
    transform: scale(1.05);
  }

  /* --- 🔴 修改点：美化后的 READ 按钮 --- */
  .img-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.1);
    /* 遮罩颜色变淡 */
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
    background: rgba(255, 255, 255, 0.25);
    backdrop-filter: blur(4px);
    border: 1px solid rgba(255, 255, 255, 0.8);
    padding: 8px 20px;
    border-radius: 30px;
    color: #fff;
    font-weight: bold;
    font-size: 0.9rem;
    letter-spacing: 1px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    gap: 8px;
    transform: translateY(10px);
    transition: all 0.3s;
  }

  .glass-card:hover .read-btn {
    transform: translateY(0);
  }

  .read-btn:hover {
    background: #fff;
    color: #6c5ce7;
  }

  /* 悬停变紫色 */

  /* 内容区 */
  .card-content {
    padding: 12px 15px;
  }

  /* 减小内边距 */
  .title {
    font-size: 1rem;
    color: #333;
    line-height: 1.5;
    margin-bottom: 10px;
    font-weight: bold;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.8rem;
    color: #888;
  }

  .user {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .avatar {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    object-fit: cover;
    border: 1px solid #fff;
  }

  .username {
    max-width: 10em;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  /* --- 4. 动画 --- */
  .pop-in {
    opacity: 0;
    transform: translateY(30px);
    animation: slideUpFade 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  .fade-in-up {
    opacity: 0;
    animation: slideUpFade 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  @keyframes slideUpFade {
    from {
      opacity: 0;
      transform: translateY(40px);
    }

    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* --- 5. 分页器 --- */
  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    margin-top: 40px;
    animation-delay: 0.5s;
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
    font-family: inherit;
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
    font-family: 'Courier New', monospace;
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

  /* --- 📱 6. 移动端字体适配 --- */
  @media (max-width: 768px) {

    /* 🔴 修改点：移动端标题字号改小 */
    .handwritten {
      font-size: 2.2rem;
    }

    .xhs-container {
      padding: 30px 15px;
    }

    .title {
      font-size: 0.95rem;
    }

    /* 卡片标题也稍微小一点 */
  }
</style>