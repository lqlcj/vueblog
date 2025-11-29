// todo: 有两个随机链接需要修正

import { defineStore } from "pinia";
import fm from "front-matter";
import defaultCover from "@/assets/images/loading.jpg";
import defaultAvatar from "@/assets/images/home/avatar.jpg";

// Notes 数据仓库
export const useNotesStore = defineStore("notes", {
  // 1. state: 相当于组件里的 data
  state: () => ({
    allPosts: [], // 存放解析好的所有文章（只包含元数据）
    postContentMap: {}, // 存储文件路径到原始内容的映射（懒加载，用于 PostDetail 页面）
    contentLoaders: null, // 存储懒加载函数映射
    isLoaded: false, // 标记是否已经加载过元数据
  }),

  // 2. getters: 计算属性，用于按需获取文章内容
  getters: {
    // 根据文件路径获取文章内容（懒加载）
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
    },
  },

  // 3. actions: 相当于组件里的 methods，用来修改数据
  actions: {
    // 核心动作：初始化加载文章元数据（不加载完整内容，提升性能）
    initPosts() {
      // 如果已经加载过，就直接返回，别浪费性能再去读文件了
      if (this.isLoaded) return;

      console.log("Pinia: 正在加载文章元数据...");

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
          // 只解析 front-matter，提取元数据
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
