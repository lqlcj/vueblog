import { defineStore } from "pinia";
import fm from "front-matter";

// 定义一个仓库，名字叫 'blog'
export const useBlogStore = defineStore("blog", {
  // 1. state: 相当于组件里的 data
  state: () => ({
    allPosts: [], // 存放解析好的所有文章
    isLoaded: false, // 标记是否已经加载过（防止反复读取文件）
  }),

  // 2. actions: 相当于组件里的 methods，用来修改数据
  actions: {
    // 核心动作：初始化加载文章
    initPosts() {
      // 如果已经加载过，就直接返回，别浪费性能再去读文件了
      if (this.isLoaded) return;

      console.log("Pinia: 正在从文件系统读取 Markdown...");

      // 这里的逻辑和你之前组件里的一模一样
      const mdFiles = import.meta.glob("/src/posts/*.md", {
        query: "?raw",
        import: "default",
        eager: true,
      });

      const posts = [];
      let index = 0;

      for (const path in mdFiles) {
        const content = mdFiles[path];
        try {
          const parsed = fm(content);
          const attr = parsed.attributes;
          posts.push({
            id: index++,
            title: attr.title || "无标题",
            img: attr.cover || "https://picsum.photos/400/300",
            aspectRatio: attr.ratio || 0.75,
            user: attr.user || "博主",
            avatar:
              attr.avatar ||
              "https://api.dicebear.com/7.x/miniavs/svg?seed=admin",
            likes: attr.likes || 0,
            date: attr.date || "2025-01-01",
            isLiked: false,
            filePath: path,
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
    },

    // 动作：读取本地点赞缓存
    loadLikesFromStorage() {
      try {
        const stored = JSON.parse(
          localStorage.getItem("xhs_likes_pinia") || "{}"
        );
        this.allPosts.forEach((item) => {
          if (stored[item.id]) item.isLiked = true;
        });
      } catch (e) {}
    },

    // 动作：处理点赞
    toggleLike(id) {
      // 在数组里找到这篇文章
      const post = this.allPosts.find((p) => p.id === id);
      if (!post) return;

      post.isLiked = !post.isLiked;
      post.isLiked ? post.likes++ : post.likes--;

      // 更新本地缓存
      try {
        const stored = JSON.parse(
          localStorage.getItem("xhs_likes_pinia") || "{}"
        );
        if (post.isLiked) stored[post.id] = true;
        else delete stored[post.id];
        localStorage.setItem("xhs_likes_pinia", JSON.stringify(stored));
      } catch (e) {}
    },
  },
});
