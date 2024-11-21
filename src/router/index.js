// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import AtpPlayerList from "../views/AtpPlayerList.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/players", name: "AtpPlayerList", component: AtpPlayerList },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
