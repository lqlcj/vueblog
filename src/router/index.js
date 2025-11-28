import { createRouter, createWebHistory } from "vue-router";
import Welcome from "@/views/Welcome/index.vue";

// 路由懒加载引入
const Home = () => import("@/views/Home/index.vue");
const Blog = () => import("@/views/Blog/index.vue");
const About = () => import("@/views/About/index.vue");
// 【新增】引入文章详情页组件
const PostDetail = () => import("@/views/Blog/PostDetail.vue");

const routes = [
  {
    path: "/",
    name: "Welcome",
    component: Welcome, // 使用静态导入的组件
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
  {
    path: "/blog",
    name: "Blog",
    component: Blog,
  },
  // 【新增】配置文章详情页路由
  // 当访问 /post?path=xxx 时，显示这个页面
  {
    path: "/post",
    name: "PostDetail",
    component: PostDetail,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 每次跳转都回到顶部
    return { top: 0 };
  },
});

export default router;
