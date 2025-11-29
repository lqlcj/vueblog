# Notes 页面架构详解

## 一、三个核心组件的关系图

```
┌─────────────────────────────────────────────────────────────┐
│                    notesStore (Pinia)                       │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ State:                                                │  │
│  │  - allPosts: []          (文章元数据列表)            │  │
│  │  - postContentMap: {}     (文章内容缓存)              │  │
│  │  - contentLoaders: null   (懒加载函数映射)            │  │
│  │  - isLoaded: false       (加载状态标记)               │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ Actions:                                               │  │
│  │  - initPosts()          (初始化文章元数据)            │  │
│  │  - loadLikesFromStorage() (加载点赞状态)            │  │
│  │  - toggleLike(id)        (切换点赞状态)               │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ Getters:                                               │  │
│  │  - getPostByPath(filePath) (懒加载文章内容)            │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
         ▲                              ▲
         │                              │
         │ 读取 allPosts                │ 调用 getPostByPath
         │                              │
┌────────┴────────┐          ┌────────┴────────┐
│  index.vue      │          │ PostDetail.vue  │
│  (列表页)        │          │  (详情页)        │
│                 │          │                 │
│ 职责:            │          │ 职责:            │
│ - 展示文章列表   │          │ - 展示单篇文章   │
│ - 分页逻辑       │          │ - Markdown渲染   │
│ - 瀑布流布局     │          │ - 懒加载内容     │
│ - 点击跳转      │          │ - 返回导航       │
└─────────────────┘          └─────────────────┘
         │                              │
         │ router.push('/post?path=xxx')│
         └──────────────────────────────┘
```

## 二、组件职责划分

### 1. notesStore.js - 数据管理层

**文件位置：** `src/stores/notesStore.js`

**核心 State：**

```javascript
state: () => ({
  allPosts: [],           // 存放解析好的所有文章（只包含元数据）
  postContentMap: {},      // 存储文件路径到原始内容的映射（懒加载，用于 PostDetail 页面）
  contentLoaders: null,    // 存储懒加载函数映射
  isLoaded: false,        // 标记是否已经加载过元数据
})
```

**职责：**
- ✅ **数据存储**：文章元数据、内容缓存
- ✅ **数据加载**：初始化文章列表、懒加载文章内容
- ✅ **状态管理**：加载状态、点赞状态
- ✅ **持久化**：localStorage 点赞状态

**核心方法：**

#### initPosts() - 初始化文章元数据

```javascript
initPosts() {
  // 如果已经加载过，就直接返回，别浪费性能再去读文件了
  if (this.isLoaded) return;

  // 🚀 性能优化方案：
  // 1. 使用 eager: true 加载文件用于提取元数据（必须，因为需要 front-matter）
  // 2. 但只解析 front-matter，不存储完整内容到 postContentMap
  // 3. 使用 eager: false 创建懒加载映射，将完整内容分离到独立 chunk
  // 这样初始 bundle 只包含元数据，完整内容按需加载

  // 用于提取元数据（只解析 front-matter，不存储完整内容）
  const mdFilesForMeta = import.meta.glob("/src/posts/*.md", {
    query: "?raw",
    import: "default",
    eager: true, // 必须 eager，用于提取元数据
  });

  // 用于懒加载完整内容（分离到独立 chunk）
  this.contentLoaders = import.meta.glob("/src/posts/*.md", {
    query: "?raw",
    import: "default",
    eager: false, // 懒加载，代码分割
  });

  const posts = [];
  let index = 0;

  // 只解析 front-matter，提取元数据，不存储完整内容
  for (const path in mdFilesForMeta) {
    const content = mdFilesForMeta[path];
    try {
      const parsed = fm(content);
      const attr = parsed.attributes;

      // ⚠️ 关键：不存储完整内容，只存储元数据
      // 完整内容通过 contentLoaders 懒加载

      posts.push({
        id: index++,
        title: attr.title || "无标题",
        img: attr.cover || defaultCover,
        aspectRatio: attr.ratio || 0.75,
        user: attr.user || "lcj",
        avatar: attr.avatar || defaultAvatar,
        likes: attr.likes || 0,
        date: attr.date || "2025-01-01",
        isLiked: false,
        filePath: path, // 存储原始路径，用于懒加载内容
      });
    } catch (e) {
      console.error("解析失败", path);
    }
  }

  // 按日期排序并存入 state
  this.allPosts = posts.sort((a, b) => new Date(b.date) - new Date(a.date));

  // 读取本地缓存的点赞状态
  this.loadLikesFromStorage();

  // 标记为已加载
  this.isLoaded = true;
}
```

**性能优化策略：**
- ✅ **双重加载策略**：eager 加载用于提取元数据，lazy 加载用于完整内容
- ✅ **代码分割**：文章内容分离到独立 chunk
- ✅ **缓存机制**：已加载的内容存入 `postContentMap`

#### getPostByPath() - 懒加载文章内容

```javascript
getPostByPath: (state) => {
  return async (filePath) => {
    // 如果已经加载过，直接从缓存获取
    if (state.postContentMap[filePath]) {
      try {
        return fm(state.postContentMap[filePath]);
      } catch (e) {
        console.error("解析文章内容失败", filePath, e);
        return null;
      }
    }

    // 懒加载：从独立的 chunk 中加载文章内容
    if (state.contentLoaders && state.contentLoaders[filePath]) {
      try {
        const content = await state.contentLoaders[filePath]();
        state.postContentMap[filePath] = content.default || content;
        return fm(state.postContentMap[filePath]);
      } catch (e) {
        console.error("加载文章内容失败", filePath, e);
        return null;
      }
    }

    return null;
  };
}
```

### 2. index.vue - 列表展示层

**文件位置：** `src/views/Notes/index.vue`

**核心逻辑：**

```javascript
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useNotesStore } from '@/stores/notesStore';

const router = useRouter();
const notesStore = useNotesStore();

const containerRef = ref(null);
const currentPage = ref(1);
const PAGE_SIZE = 12;

onMounted(() => {
  notesStore.initPosts();
});

const allData = computed(() => notesStore.allPosts);

// 🔴 视觉逻辑：定义比例模式，制造瀑布流的错落感
const ratioPattern = [0.75, 1.0, 0.75, 1.33, 0.6, 0.75, 1.0];

const currentDisplayData = computed(() => {
  const start = (currentPage.value - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  const pageData = allData.value.slice(start, end);

  return pageData.map((item, index) => {
    // 注入 visualRatio (如果数据源里没有，就按顺序派发一个)
    const visualRatio = item.aspectRatio || ratioPattern[index % ratioPattern.length];
    const avatar = item.avatar || defaultAvatar;
    const img = item.img || defaultCover;
    return { ...item, visualRatio, avatar, img };
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
```

**职责：**
- ✅ **UI 展示**：瀑布流布局、卡片展示
- ✅ **分页逻辑**：当前页、总页数、翻页
- ✅ **数据增强**：添加视觉比例、默认图片
- ✅ **路由跳转**：点击卡片跳转到详情页

**数据流：**
```
notesStore.allPosts (元数据)
    ↓
allData (computed)
    ↓
currentDisplayData (分页 + 数据增强)
    ↓
模板渲染
```

### 3. PostDetail.vue - 详情展示层

**文件位置：** `src/views/Notes/PostDetail.vue`

**核心逻辑：**

```javascript
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useNotesStore } from '@/stores/notesStore';
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
```

**职责：**
- ✅ **内容展示**：Markdown 渲染、文章元信息
- ✅ **懒加载**：按需加载文章完整内容
- ✅ **错误处理**：文章不存在时跳转回列表
- ✅ **导航**：返回列表功能

**数据流：**
```
路由参数 (route.query.path)
    ↓
notesStore.getPostByPath(filePath) (懒加载)
    ↓
parsed (front-matter + body)
    ↓
MarkdownIt 渲染
    ↓
htmlContent
    ↓
模板渲染
```

## 三、数据流向详解

### 场景 1：用户访问列表页 (`/notes`)

```
1. 用户访问 /notes
   ↓
2. index.vue 组件挂载
   ↓
3. onMounted() 触发
   ↓
4. notesStore.initPosts() 执行
   ├─ 检查 isLoaded，如果已加载则跳过
   ├─ 使用 eager: true 加载所有 .md 文件（提取元数据）
   ├─ 使用 eager: false 创建懒加载映射（代码分割）
   ├─ 解析 front-matter，提取元数据
   ├─ 存入 allPosts（只存元数据，不存完整内容）
   ├─ 按日期排序
   └─ 标记 isLoaded = true
   ↓
5. allData = computed(() => notesStore.allPosts)
   ↓
6. currentDisplayData 计算（分页 + 数据增强）
   ↓
7. 模板渲染瀑布流卡片
```

### 场景 2：用户点击卡片跳转到详情页

```
1. 用户点击卡片
   ↓
2. handleClick(item) 执行
   ↓
3. router.push({ path: '/post', query: { path: item.filePath } })
   ↓
4. 路由跳转到 PostDetail.vue
   ↓
5. PostDetail.vue 组件挂载
   ↓
6. onMounted() 触发
   ├─ 检查 notesStore.isLoaded
   ├─ 如果未加载，调用 initPosts()（只加载元数据）
   └─ 从 route.query.path 获取文件路径
   ↓
7. notesStore.getPostByPath(filePath) 执行
   ├─ 检查 postContentMap[filePath]（缓存）
   ├─ 如果有缓存，直接返回
   ├─ 如果没有，使用 contentLoaders[filePath]() 懒加载
   ├─ 加载完成后存入 postContentMap（缓存）
   └─ 返回解析后的内容
   ↓
8. MarkdownIt 渲染文章内容
   ↓
9. 模板渲染文章详情
```

## 四、性能优化策略

### 1. 代码分割（Code Splitting）

**实现方式：**

```javascript
// 用于提取元数据（只解析 front-matter，不存储完整内容）
const mdFilesForMeta = import.meta.glob("/src/posts/*.md", {
  query: "?raw",
  import: "default",
  eager: true, // 必须 eager，用于提取元数据
});

// 用于懒加载完整内容（分离到独立 chunk）
this.contentLoaders = import.meta.glob("/src/posts/*.md", {
  query: "?raw",
  import: "default",
  eager: false, // 懒加载，代码分割
});
```

**效果：**
- ✅ 初始 bundle 只包含元数据（小）
- ✅ 文章内容按需加载（独立 chunk）
- ✅ 减少首屏加载时间

### 2. 缓存机制

**实现方式：**

```javascript
getPostByPath: (state) => {
  return async (filePath) => {
    // 如果已经加载过，直接从缓存获取
    if (state.postContentMap[filePath]) {
      try {
        return fm(state.postContentMap[filePath]);
      } catch (e) {
        console.error("解析文章内容失败", filePath, e);
        return null;
      }
    }

    // 懒加载：从独立的 chunk 中加载文章内容
    if (state.contentLoaders && state.contentLoaders[filePath]) {
      try {
        const content = await state.contentLoaders[filePath]();
        state.postContentMap[filePath] = content.default || content;
        return fm(state.postContentMap[filePath]);
      } catch (e) {
        console.error("加载文章内容失败", filePath, e);
        return null;
      }
    }

    return null;
  };
}
```

**效果：**
- ✅ 首次访问：懒加载
- ✅ 再次访问：从缓存读取
- ✅ 减少重复加载

### 3. 双重加载策略

| 加载方式 | 用途 | 时机 | 数据量 |
|---------|------|------|--------|
| `eager: true` | 提取元数据 | 初始化时 | 小（只解析 front-matter） |
| `eager: false` | 完整内容 | 按需加载 | 大（完整 Markdown） |

## 五、架构设计模式

### 1. 单一数据源（Single Source of Truth）

```
所有文章数据 → notesStore.allPosts
所有文章内容 → notesStore.postContentMap
```

### 2. 关注点分离（Separation of Concerns）

| 层级 | 职责 | 组件 |
|------|------|------|
| **数据层** | 数据管理、持久化 | `notesStore` |
| **展示层** | UI 渲染、交互 | `index.vue`, `PostDetail.vue` |
| **路由层** | 页面导航 | `router` |

### 3. 懒加载模式（Lazy Loading）

```
列表页：只加载元数据（轻量）
详情页：按需加载完整内容（重量）
```

## 六、组件间通信

### 1. 列表页 → 详情页

**通信方式：** 路由参数（query）

```javascript
const handleClick = (item) => {
  // 确保传递了文件路径
  router.push({
    path: '/post',
    query: { path: item.filePath }
  });
};
```

### 2. 详情页 → Store

**通信方式：** Store 方法调用

```javascript
onMounted(async () => {
  try {
    // 确保 store 已初始化（只加载元数据，不加载完整内容）
    if (!notesStore.isLoaded) {
      notesStore.initPosts();
    }

    const filePath = route.query.path; // e.g., /src/posts/01.md

    if (filePath) {
      // 🚀 性能优化：懒加载文章内容
      const parsed = await notesStore.getPostByPath(filePath);
      // ...
    }
  } catch (e) {
    console.error("Post loading error:", e);
    router.push('/notes');
  }
});
```

## 七、路由配置

**文件位置：** `src/router/index.js`

```javascript
const Notes = () => import("@/views/Notes/index.vue");
const PostDetail = () => import("@/views/Notes/PostDetail.vue");

const routes = [
  {
    path: "/notes",
    name: "Notes",
    component: Notes,
  },
  {
    path: "/post",
    name: "PostDetail",
    component: PostDetail,
  },
];
```

**特点：**
- ✅ 路由懒加载：减少初始 bundle 大小
- ✅ 独立路由：列表页和详情页分离
- ✅ 参数传递：通过 query 传递文件路径

## 八、总结

### 架构特点

1. ✅ **数据集中管理**：Pinia store 作为单一数据源
2. ✅ **职责清晰**：数据层、展示层分离
3. ✅ **性能优化**：代码分割、懒加载、缓存
4. ✅ **可维护性**：组件职责单一，易于扩展

### 完整数据流

```
Markdown 文件
    ↓
notesStore.initPosts() (提取元数据)
    ↓
notesStore.allPosts (元数据列表)
    ↓
index.vue (列表展示)
    ↓
用户点击
    ↓
router.push (路由跳转)
    ↓
PostDetail.vue (详情页)
    ↓
notesStore.getPostByPath() (懒加载内容)
    ↓
Markdown 渲染
```

### 设计优势

1. **性能优化**
   - 初始加载只包含元数据（轻量）
   - 文章内容按需懒加载（独立 chunk）
   - 缓存机制减少重复加载

2. **代码组织**
   - 单一数据源，易于维护
   - 职责分离，逻辑清晰
   - 组件独立，易于测试

3. **用户体验**
   - 列表页快速加载
   - 详情页按需加载
   - 返回列表时无需重新加载

该架构遵循 Vue 3 和 Pinia 的最佳实践，在性能和可维护性之间取得了良好的平衡。

