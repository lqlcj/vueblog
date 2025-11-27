import { createRouter, createWebHistory } from "vue-router";

const Home = () => import("@/pages/Home.vue");
const Blog = () => import("@/pages/Blog.vue");
const About = () => import("@/pages/About.vue");

const routes = [
  {
    path: "/",
    redirect: "/Home",
  },
  {
    path: "/Home",
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
