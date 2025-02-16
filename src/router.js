import { createRouter, createWebHistory } from "vue-router";

import Dashboard from "./views/Dashboard.vue";
import Todo from "./components/Todo.vue";

const routes = [
  { path: "/", component: Dashboard },
  { path: "/todo", component: Todo },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
