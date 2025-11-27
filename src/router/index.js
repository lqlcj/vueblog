import { createRouter, createWebHistory } from "vue-router";

const Home = () => import("@/views/Home/index.vue");
const Blog = () => import("@/views/Blog/index.vue");
const About = () => import("@/views/about/index.vue");

const routes = [
  {
    path: "/",
    redirect: "/home",
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
  {
    path: "/about",
    name: "About",
    component: About,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
