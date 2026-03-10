import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  { path: "/", name: "Dashboard", meta: { auth: false, layout: "main" }, component: () => import("@/views/Dashboard.vue") },
  { path: "/equipment", name: "Equipment", meta: { auth: false, layout: "main" }, component: () => import("@/views/Equipment.vue") },
  { path: "/maintenance", name: "Maintenance", meta: { auth: false, layout: "main" }, component: () => import("@/views/Maintenance.vue") },
  { path: "/tickets", name: "Tickets", meta: { auth: false, layout: "main" }, component: () => import("@/views/Tickets.vue") },
  { path: "/chat", name: "Chat", meta: { auth: false, layout: "main" }, component: () => import("@/views/Chat.vue") },
  { path: "/users", name: "Users", meta: { auth: false, layout: "main" }, component: () => import("@/views/Users.vue") },
  { path: "/locations", name: "Locations", meta: { auth: false, layout: "main" }, component: () => import("@/views/Locations.vue") },
  { path: "/reports", name: "Reports", meta: { auth: false, layout: "main" }, component: () => import("@/views/Reports.vue") },
  { path: "/departments", name: "Departments", meta: { auth: false, layout: "main" }, component: () => import("@/views/Departments.vue") },
  { path: "/profile", name: "Profile", meta: { auth: false, layout: "main" }, component: () => import("@/views/profile/Profile.vue") },
  { path: "/settings", name: "Settings", meta: { auth: false, layout: "main" }, component: () => import("@/views/Settings.vue") },
  { path: "/home", name: "Home", meta: { auth: false, layout: "main" }, component: () => import("@/views/Home.vue") },
  { path: "/select", name: "Select", meta: { auth: false, layout: "auth" }, component: () => import("@/views/login/Select.vue") },
  { path: "/login", name: "Login", meta: { auth: false, layout: "auth" }, component: () => import("@/views/login/Login.vue") },
  { path: "/:pathMatch(.*)*", name: "NotFound", meta: { auth: false, layout: "auth" }, component: () => import("@/views/NotFound.vue") },
];

export const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
