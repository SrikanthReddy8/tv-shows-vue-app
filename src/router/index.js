import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/Home.vue";
import ShowDetails from "@/views/ShowDetails.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/show/:id",
      name: "show-details",
      component: ShowDetails,
    },
  ],
});

export default router;
