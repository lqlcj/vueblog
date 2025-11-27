import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

//
// Vite configuration for the MP3jam Vue project.
//
// This configuration enables the Vue plugin and sets up a path alias
// so that "@" resolves to the `src` directory. It also enables Less
// support by allowing inline JavaScript in Less files.
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
});