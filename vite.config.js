import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [
    vue(),
    // ... 确保这段代码在 plugins 数组里
    visualizer({
      open: true,
      filename: "stats.html",
      gzipSize: true,
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  build: {
    // 🚀 性能优化：代码分割配置
    rollupOptions: {
      output: {
        // 手动分割代码，将文章内容分离到独立 chunk
        manualChunks: {
          // 将 markdown-it 和 front-matter 分离到独立 chunk
          "markdown-libs": ["markdown-it", "front-matter"],
        },
        // 优化 chunk 命名
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",
        assetFileNames: "assets/[ext]/[name]-[hash].[ext]",
      },
    },
    // 启用压缩（使用 esbuild，Vite 默认，更快）
    minify: "esbuild",
    // 优化 chunk 大小警告阈值
    chunkSizeWarningLimit: 1000,
  },
});
