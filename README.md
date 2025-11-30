# Vue Blog - 个人博客系统

一个基于 Vue 3 构建的现代化个人博客系统，采用 Composition API、Pinia 状态管理和 Vite 构建工具，支持 Markdown 文章、友链管理和 Giscus 留言系统。

## ✨ 特性

- 🎨 **现代化设计**：采用玻璃态（Glassmorphism）设计风格，优雅的 UI 界面
- 📝 **Markdown 支持**：支持 Markdown 格式文章，自动解析 front-matter
- 🎯 **响应式布局**：完美适配桌面端和移动端
- 🚀 **性能优化**：代码分割、懒加载、异步组件加载
- 💬 **留言系统**：集成 Giscus 评论系统
- 🔗 **友链管理**：支持友链申请和管理
- 🎭 **动画效果**：使用 GSAP 和 CSS 动画，流畅的交互体验
- ⚡ **快速构建**：基于 Vite 的快速开发体验

## 🛠️ 技术栈

### 核心框架
- **Vue 3.4+** - 渐进式 JavaScript 框架
- **Vue Router 4** - 官方路由管理器
- **Pinia** - Vue 官方状态管理库

### 构建工具
- **Vite 7.2+** - 下一代前端构建工具
- **@vitejs/plugin-vue** - Vue 单文件组件支持

### 功能库
- **markdown-it** - Markdown 解析器
- **front-matter** - Front matter 解析
- **github-markdown-css** - GitHub 风格 Markdown 样式
- **gsap** - 高性能动画库
- **canvas-confetti** - 彩带动画效果

### 开发工具
- **unplugin-auto-import** - 自动导入 API
- **unplugin-vue-components** - 自动导入组件
- **rollup-plugin-visualizer** - 打包分析工具

## 📁 项目结构

```
vueblog/
├── public/                 # 静态资源
│   ├── images/            # 公共图片
│   └── fonts/             # 字体文件
├── src/
│   ├── assets/            # 资源文件
│   │   ├── images/        # 图片资源
│   │   └── styles/        # 全局样式
│   ├── components/        # 公共组件
│   │   ├── BackToTop/     # 返回顶部组件
│   │   ├── Comments/      # 留言组件（Giscus）
│   │   ├── ErrorBoundary/ # 错误边界
│   │   ├── Friends/       # 友链组件
│   │   └── HeaderBar/     # 页面头部
│   ├── composables/       # 组合式函数
│   │   └── useConfetti.js # 彩带效果
│   ├── config/            # 配置文件
│   │   ├── giscus.js      # Giscus 配置
│   │   └── layout.js      # 布局配置
│   ├── data/              # 数据文件
│   │   └── friends.json   # 友链数据
│   ├── layout/            # 布局组件
│   │   ├── Header.vue     # 头部导航
│   │   └── Footer.vue     # 页脚
│   ├── posts/             # Markdown 文章
│   │   ├── 01.md
│   │   ├── 02.md
│   │   └── ...
│   ├── router/            # 路由配置
│   │   └── index.js
│   ├── stores/            # Pinia 状态管理
│   │   └── notesStore.js  # 文章数据仓库
│   ├── utils/             # 工具函数
│   │   └── githubApi.js   # GitHub API
│   ├── views/             # 页面组件
│   │   ├── About/         # 关于页面
│   │   ├── Friends/       # 友链页面
│   │   ├── Home/          # 主页
│   │   │   └── components/ # 主页子组件
│   │   │       ├── Greeting.vue        # 问候语组件
│   │   │       ├── HomeBanner.vue      # 横幅组件
│   │   │       ├── HomeProfile.vue     # 个人信息卡片
│   │   │       ├── ImpressionCarousel.vue # 轮播图
│   │   │       └── InfoCards.vue       # 信息卡片
│   │   ├── Notes/         # 文章页面
│   │   │   ├── index.vue  # 文章列表
│   │   │   └── PostDetail.vue # 文章详情
│   │   └── Welcome/       # 欢迎页
│   ├── App.vue            # 根组件
│   └── main.js            # 入口文件
├── index.html             # HTML 模板
├── vite.config.js        # Vite 配置
├── package.json           # 项目配置
└── README.md              # 项目文档
```

## 🚀 快速开始

### 环境要求

- Node.js >= 16.0.0
- npm >= 7.0.0 或 yarn >= 1.22.0

### 安装依赖

```bash
npm install
# 或
yarn install
```

### 开发模式

```bash
npm run dev
# 或
yarn dev
```

访问 http://localhost:5173

### 构建生产版本

```bash
npm run build
# 或
yarn build
```

构建产物将输出到 `dist` 目录。

### 预览生产构建

```bash
npm run serve
# 或
yarn serve
```

## 📄 页面说明

### 1. 欢迎页（Welcome）

- 路径：`/`
- 功能：网站入口，展示欢迎信息
- 特性：滚动动画、交互式按钮

### 2. 主页（Home）

- 路径：`/home`
- 功能：个人主页，展示个人信息和功能入口
- 组件：
  - **HomeBanner**：顶部横幅 Logo
  - **ImpressionCarousel**：印象派风格轮播图（无缝循环）
  - **HomeProfile**：个人信息卡片（3D 视差效果、打字机动画）
  - **InfoCards**：信息卡片展示
  - **Greeting**：时间问候语（根据中国时区自动切换）
  - **Giscus**：留言评论系统

### 3. 文章列表（Notes）

- 路径：`/notes`
- 功能：展示所有文章列表
- 特性：
  - 自动解析 `src/posts/` 目录下的 Markdown 文件
  - 支持 front-matter 元数据（title, date, cover, ratio）
  - 按日期降序排序
  - 懒加载优化

### 4. 文章详情（PostDetail）

- 路径：`/post?path=xxx`
- 功能：展示单篇文章详情
- 特性：
  - Markdown 渲染
  - GitHub 风格代码高亮
  - 响应式图片
  - 文章导航

### 5. 友链页面（Friends）

- 路径：`/friends`
- 功能：展示友链列表和申请表单
- 特性：
  - 友链卡片展示
  - 友链申请表单
  - 数据存储在 `src/data/friends.json`

### 6. 关于页面（About）

- 路径：`/about`
- 功能：个人介绍和联系方式
- 特性：交互式信息展示

## 📝 文章管理

### 添加新文章

1. 在 `src/posts/` 目录下创建新的 `.md` 文件
2. 文件命名格式：`序号.md`（如 `09.md`）
3. 在文件开头添加 front-matter：

```markdown
---
title: "文章标题"
date: "2025-01-01"
cover: "/images/01.jpg"
ratio: 0.75
---

文章内容...
```

### Front-matter 字段说明

- `title`：文章标题（必填）
- `date`：发布日期（格式：YYYY-MM-DD，可选）
- `cover`：封面图片路径（可选）
- `ratio`：封面图片宽高比（可选，默认 0.75）

### 文章排序

文章按以下规则排序：
1. 按日期降序（最新在前）
2. 日期相同时，按文件 ID 降序
3. 无日期的文章排在最后

## ⚙️ 配置说明

### Giscus 留言系统配置

编辑 `src/config/giscus.js`：

```javascript
export const giscusConfig = {
  repo: "your-username/your-repo",  // GitHub 仓库
  repoId: "your-repo-id",            // 仓库 ID
  category: "Announcements",         // 分类
  categoryId: "your-category-id",    // 分类 ID
  mapping: "pathname",               // 映射方式
  theme: "light",                    // 主题
  lang: "zh-CN",                     // 语言
};
```

### 布局配置

编辑 `src/config/layout.js`：

```javascript
export const layoutConfig = {
  contentMaxWidth: '1000px',      // 内容最大宽度
  contentPadding: '20px',         // 内容内边距
  contentPaddingMobile: '10px',   // 移动端内边距
}
```

### 友链数据

编辑 `src/data/friends.json`：

```json
[
  {
    "name": "友链名称",
    "url": "https://example.com",
    "avatar": "https://example.com/avatar.jpg",
    "description": "友链描述"
  }
]
```

## 🎨 主要功能特性

### 1. 轮播图无缝循环

- 使用克隆节点技术实现无缝循环
- 支持自动播放和手动切换
- 平滑的过渡动画

### 2. 3D 视差效果

- 个人信息卡片支持鼠标跟随的 3D 倾斜效果
- 使用 CSS transform 和 perspective

### 3. 打字机动画

- 动态文字显示效果
- 可配置打字速度

### 4. 时间问候语

- 根据中国时区（UTC+8）自动切换问候语
- 6:00-11:00：Good morning
- 11:00-18:00：Good afternoon
- 18:00-6:00：Good evening

### 5. 年度进度条

- 显示当前年份的进度百分比
- 数字跳动动画
- 进度条动画

### 6. 错误处理

- 全局错误处理器
- ErrorBoundary 组件
- 友好的错误提示

## 🚀 性能优化

### 代码分割

- 路由懒加载
- 组件异步加载
- Markdown 库独立打包

### 资源优化

- 图片懒加载
- 字体文件优化
- CSS 压缩

### 构建优化

- Vite 快速构建
- ESBuild 压缩
- 打包分析工具

## 📱 响应式设计

- 移动端适配
- 平板适配
- 桌面端优化
- 触摸交互支持

## 🔧 开发规范

### 代码风格

- 使用 Composition API
- 单文件组件（SFC）
- TypeScript 支持（可选）

### 命名规范

- 组件：PascalCase（如 `HomeProfile.vue`）
- 文件：kebab-case（如 `home-profile.vue`）
- 变量：camelCase
- 常量：UPPER_SNAKE_CASE

### 注释规范

- 关键功能添加注释
- 复杂逻辑说明
- API 文档注释

## 🐛 已知问题

- 暂无

## 📄 许可证

MIT License

## 👤 作者

元宵 (LCJ)

## 🙏 致谢

- Vue.js 团队
- Vite 团队
- 所有开源贡献者

---

**注意**：本项目仅供学习和参考使用。


