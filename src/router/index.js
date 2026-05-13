import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/views/Home.vue"),
    },
    {
      path: "/show/:id",
      name: "show-details",
      component: () => import("@/views/ShowDetails.vue"),
    },
    {
      path: "/my-list",
      name: "my-list",
      component: () => import("@/views/MyList.vue"),
    },
    {
      path: "/top-rated",
      name: "top-rated",
      component: () => import("@/views/TopRated.vue"),
    },
    {
      path: "/trending",
      name: "trending",
      component: () => import("@/views/Trending.vue"),
    },
  ],
});

export default router;