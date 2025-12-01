import { createRouter, createWebHistory } from "vue-router";
import { useLoadingStore } from "@/stores/loadingStore";

// Welcome 页面直接导入，确保打开网页时第一时间加载
import Welcome from "@/views/Welcome/index.vue";

// 🚀 性能优化：其他路由使用懒加载
const Home = () => import("@/views/Home/index.vue");
const Notes = () => import("@/views/Notes/index.vue");
const Friends = () => import("@/views/Friends/index.vue");
const About = () => import("@/views/About/index.vue");
const PostDetail = () => import("@/views/Notes/PostDetail.vue");

const routes = [
  {
    path: "/",
    name: "Welcome",
    component: Welcome, // 直接导入，确保第一时间加载欢迎页
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
  {
    path: "/notes",
    name: "Notes",
    component: Notes,
  },
  {
    path: "/friends",
    name: "Friends",
    component: Friends,
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

// 全局路由级 Loading：在路由切换时显示遮罩，完成后隐藏
router.beforeEach((to, from, next) => {
  const loadingStore = useLoadingStore();
  loadingStore.show();
  next();
});

router.afterEach(() => {
  const loadingStore = useLoadingStore();
  // 稍微延迟一下，确保页面完成首屏渲染再关闭
  setTimeout(() => {
    loadingStore.hide();
  }, 200);
});

export default router;
