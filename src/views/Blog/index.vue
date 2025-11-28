<!-- 博客列表 -->

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
  // 1. 引入仓库
  import { useBlogStore } from '@/stores/blogStore';

  const router = useRouter();
  // 2. 初始化仓库
  const blogStore = useBlogStore();

  // ==========================================
  // 1. 数据来源：直接从仓库拿
  // ==========================================

  // 组件挂载时，通知仓库去进货
  onMounted(() => {
    blogStore.initPosts();

    // 启动容器尺寸监听 (UI逻辑保留在组件内)
    if (containerRef.value) {
      resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          containerWidth.value = entry.contentRect.width;
        }
      });
      resizeObserver.observe(containerRef.value);
    }
  });

  // 使用 computed 获取仓库里的数据，保持响应式
  const allData = computed(() => blogStore.allPosts);

  // ==========================================
  // 2. UI 逻辑 (分页、列数计算、容器侦测)
  //    这些属于纯界面展示逻辑，保留在组件里
  // ==========================================
  const PAGE_SIZE = 12;
  const containerRef = ref(null);
  const containerWidth = ref(1000);
  const currentPage = ref(1);

  // 【核心设置】电脑端优先展示 3 列
  const columnCount = computed(() => {
    const w = containerWidth.value;
    // 手机端 (< 600px)：2列
    if (w < 600) return 2;
    // 平板/电脑 (< 1200px)：3列 
    if (w < 1200) return 3;
    return 4;
  });

  const gapSize = computed(() => containerWidth.value < 600 ? 10 : 15);
  let resizeObserver = null;

  onUnmounted(() => {
    if (resizeObserver) resizeObserver.disconnect();
  });

  const currentDisplayData = computed(() => {
    const start = (currentPage.value - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    // 注意：这里使用的是 computed 出来的 allData
    return allData.value.slice(start, end);
  });


  // 瀑布流分发算法
  const columns = computed(() => {
    const cols = Array.from({ length: columnCount.value }, () => []);
    currentDisplayData.value.forEach((item, index) => {
      cols[index % columnCount.value].push(item);
    });
    return cols;
  });

  const totalPages = computed(() => Math.ceil(allData.value.length / PAGE_SIZE));

  // ==========================================
  // 3. 交互逻辑
  // ==========================================

  // 点赞：现在只需要通知仓库 "把id为xxx的文章点个赞"
  const toggleLike = (item) => {
    blogStore.toggleLike(item.id);
  };

  const changePage = (page) => {
    if (page < 1 || page > totalPages.value) return;
    currentPage.value = page;
    if (containerRef.value) containerRef.value.scrollIntoView({ behavior: 'smooth' });
  };

  const handleClick = (item) => {
    router.push({
      path: '/post',
      query: { path: item.filePath }
    });
  };
</script>

<style scoped>

  /* 容器 */
  .xhs-container {
    /* 1. 宽度占满父容器，但在大屏上不要超过 1200px (和导航栏保持一致) */
    width: 100%;
    max-width: 1100px;

    /* 2. 【核心】上下间距0，左右自动(auto) -> 这就是居中的魔法 */
    margin: 0 auto;

    /* 3. 防止内容贴边 */
    box-sizing: border-box;
    padding: 20px 10px;
    /* 上下给点空隙，左右留点白，更透气 */
  }

  /* 瀑布流盒子 */
  .waterfall-box {
    display: flex;
    justify-content: flex-start;
    /* 靠左排列 */
    align-items: flex-start;
    /* 顶部对齐 */
  }

  /* 每一列 */
  .column {
    flex: 1;
    /* 均分宽度 */
    display: flex;
    flex-direction: column;
    /* 列内垂直排列 */
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