import About from "@/pages/About.vue";
import Main from "@/pages/Main.vue";
import Post from "@/pages/PostIdPage.vue";
import PostPage from "@/pages/PostPage.vue";
import PostPageCompositionAPI from "@/pages/PostPageCompositionAPI.vue";
import PostPageWithStore from "@/pages/PostPageWithStore.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: Main,
  },
  {
    path: "/posts",
    component: PostPage,
  },
  {
    path: "/about",
    component: About,
  },
  {
    path: "/posts/:id",
    component: Post,
  },
  {
    path: "/store",
    component: PostPageWithStore,
  },
  {
    path: "/composition",
    component: PostPageCompositionAPI,
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

export default router;
