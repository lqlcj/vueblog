<template>
  <div class="xhs-container" ref="containerRef">

    <div class="waterfall-box" :style="{ gap: gapSize + 'px' }">
      <div v-for="(col, index) in columns" :key="index" class="column" :style="{ gap: gapSize + 'px' }">
        <div v-for="item in col" :key="item.id" class="card" @click="handleClick(item)">
          <div class="card-img" :style="{ aspectRatio: item.aspectRatio }">
            <img :src="item.img" loading="lazy" :alt="item.title" />
          </div>

          <div class="card-content">
            <div class="title">{{ item.title }}</div>
            <div class="footer">
              <div class="user">
                <img :src="item.avatar" class="avatar" />
                <span class="username">{{ item.user }}</span>
              </div>
              <div class="like-wrapper" @click.stop="toggleLike(item)">
                <svg viewBox="0 0 24 24" class="like-icon" :class="{ active: item.isLiked }">
                  <path
                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
                <span class="like-count" :class="{ active: item.isLiked }">
                  {{ item.likes }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="totalPages > 1" class="pagination">
      <button class="page-btn" :disabled="currentPage === 1" @click="changePage(currentPage - 1)">上一页</button>
      <span class="page-info">{{ currentPage }} / {{ totalPages }}</span>
      <button class="page-btn" :disabled="currentPage === totalPages" @click="changePage(currentPage + 1)">下一页</button>
    </div>

    <div v-if="allData.length === 0" class="empty-tip">
      还没有文章，快去 src/posts/ 下新建一个 md 文件吧！
    </div>

  </div>
</template>

<script setup>
  import { ref, computed, onMounted, onUnmounted } from 'vue';
  import { useRouter } from 'vue-router';
  import fm from 'front-matter'; // 引入 Markdown 解析库

  const router = useRouter();

  // ==========================================
  // 1. 配置
  // ==========================================
  const PAGE_SIZE = 12;
  const STORAGE_KEY = 'xhs_likes_md';

  // ==========================================
  // 2. 自动读取 Markdown (核心逻辑修复)
  // ==========================================

  // 【修复点】：使用新的 Vite 语法读取文件
  const mdFiles = import.meta.glob('/src/posts/*.md', {
    query: '?raw',      //以此查询参数导入
    import: 'default',  // 只导入默认导出（即文件内容字符串）
    eager: true         // 立即读取，不懒加载
  });

  const loadPosts = () => {
    const posts = [];
    let index = 0;

    for (const path in mdFiles) {
      const content = mdFiles[path];
      try {
        const parsed = fm(content); // 解析 Frontmatter
        const attr = parsed.attributes;

        posts.push({
          id: index++,
          title: attr.title || '无标题',
          // 如果 md 里没写 cover，给个默认图
          img: attr.cover || 'https://picsum.photos/400/300',
          // 如果没写 ratio，默认 0.75 (3:4)
          aspectRatio: attr.ratio || 0.75,
          user: attr.user || '博主',
          avatar: attr.avatar || 'https://api.dicebear.com/7.x/miniavs/svg?seed=admin',
          likes: attr.likes || 0,
          date: attr.date || '2025-01-01',
          isLiked: false,
          filePath: path // 记录文件路径
        });
      } catch (e) {
        console.error('解析 Markdown 失败:', path, e);
      }
    }

    // 按日期倒序（最新的在前面）
    return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
  };

  // 数据源
  const allData = ref(loadPosts());

  // ==========================================
  // 3. 智能容器侦测 (ResizeObserver)
  // ==========================================
  const containerRef = ref(null);
  const containerWidth = ref(1000);
  const currentPage = ref(1);

  const columnCount = computed(() => {
    const w = containerWidth.value;
    if (w < 500) return 2;
    if (w < 800) return 3;
    if (w < 1200) return 4;
    return 5;
  });

  const gapSize = computed(() => containerWidth.value < 500 ? 8 : 12);

  let resizeObserver = null;

  onMounted(() => {
    loadLikesFromStorage();

    if (containerRef.value) {
      resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          containerWidth.value = entry.contentRect.width;
        }
      });
      resizeObserver.observe(containerRef.value);
    }
  });

  onUnmounted(() => {
    if (resizeObserver) resizeObserver.disconnect();
  });

  // ==========================================
  // 4. 分页与数据处理
  // ==========================================
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

  // ==========================================
  // 5. 交互
  // ==========================================
  const loadLikesFromStorage = () => {
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
      allData.value.forEach(item => { if (stored[item.id]) item.isLiked = true; });
    } catch (e) { }
  };

  const toggleLike = (item) => {
    item.isLiked = !item.isLiked;
    item.isLiked ? item.likes++ : item.likes--;
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
      if (item.isLiked) stored[item.id] = true;
      else delete stored[item.id];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
    } catch (e) { }
  };

  const changePage = (page) => {
    if (page < 1 || page > totalPages.value) return;
    currentPage.value = page;
    if (containerRef.value) containerRef.value.scrollIntoView({ behavior: 'smooth' });
  };

  const handleClick = (item) => {
    // 使用 router.push 跳转
    // path: 对应我们在 router/index.js 里配置的 path
    // query: 传递参数，这里我们把文件的路径传过去
    router.push({
      path: '/post',
      query: { path: item.filePath }
    });
  };
</script>

<style scoped>

  /* 容器 */
  .xhs-container {
    width: 100%;
    box-sizing: border-box;
    padding: 0;
  }

  /* 瀑布流 */
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

  /* 卡片 */
  .card {
    background: #fff;
    border-radius: 8px;
    /* 紧凑圆角 */
    overflow: hidden;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
    cursor: pointer;
    transition: transform 0.2s;
    border: 1px solid rgba(0, 0, 0, 0.03);
  }

  .card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
  }

  .card-img {
    width: 100%;
    background-color: #f8f8f8;
    position: relative;
  }

  .card-img img {
    width: 100%;
    display: block;
    object-fit: cover;
  }

  .card-content {
    padding: 8px 10px;
    /* 紧凑边距 */
  }

  .title {
    font-size: 14px;
    /* 精致小字体 */
    color: #333;
    line-height: 1.4;
    margin-bottom: 6px;
    font-weight: 500;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 11px;
    color: #888;
  }

  .user {
    display: flex;
    align-items: center;
    gap: 6px;
    flex: 1;
    min-width: 0;
  }

  .avatar {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    object-fit: cover;
  }

  .username {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 7em;
  }

  .like-wrapper {
    display: flex;
    align-items: center;
    gap: 3px;
    padding: 2px;
  }

  .like-icon {
    width: 14px;
    height: 14px;
    fill: none;
    stroke: #666;
    stroke-width: 1.5;
  }

  .like-icon.active {
    fill: #ff2442;
    stroke: #ff2442;
  }

  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 15px;
    padding: 20px 0;
  }

  .page-btn {
    padding: 5px 14px;
    border: 1px solid #eee;
    background: #fff;
    border-radius: 4px;
    cursor: pointer;
    font-size: 12px;
    color: #666;
  }

  .page-btn:hover:not(:disabled) {
    color: #ff2442;
    border-color: #ff2442;
  }

  .page-btn:disabled {
    color: #ccc;
    background: #f9f9f9;
    cursor: not-allowed;
  }

  .empty-tip {
    text-align: center;
    padding: 60px;
    color: #999;
    font-size: 14px;
  }
</style>