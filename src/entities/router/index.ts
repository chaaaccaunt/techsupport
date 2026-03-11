import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Dashboard",
    meta: { auth: false, layout: "main" },
    component: () => import(/* webpackChunkName: "Dashboard" */ "@/views/Dashboard.vue")
  },
  {
    path: "/equipment",
    name: "Equipment",
    meta: { auth: false, layout: "main" },
    component: () => import(/* webpackChunkName: "Equipment" */ "@/views/Equipment.vue")
  },
  {
    path: "/maintenance",
    name: "Maintenance",
    meta: { auth: false, layout: "main" },
    component: () => import(/* webpackChunkName: "Maintenance" */ "@/views/Maintenance.vue")
  },
  {
    path: "/tickets",
    name: "Tickets",
    meta: { auth: false, layout: "main" },
    component: () => import(/* webpackChunkName: "Tickets" */ "@/views/Tickets.vue")
  },
  {
    path: "/chat",
    name: "Chat",
    meta: { auth: false, layout: "main" },
    component: () => import(/* webpackChunkName: "Chat" */ "@/views/Chat.vue")
  },
  {
    path: "/users",
    name: "Users",
    meta: { auth: false, layout: "main" },
    component: () => import(/* webpackChunkName: "Users" */ "@/views/Users.vue")
  },
  {
    path: "/notifications",
    name: "Notifications",
    meta: { auth: false, layout: "main" },
    component: () => import(/* webpackChunkName: "Notifications" */ "@/views/Notifications.vue")
  },
  {
    path: "/locations",
    name: "Locations",
    meta: { auth: false, layout: "main" },
    component: () => import(/* webpackChunkName: "Locations" */ "@/views/Locations.vue")
  },
  {
    path: "/reports",
    name: "Reports",
    meta: { auth: false, layout: "main" },
    component: () => import(/* webpackChunkName: "Reports" */ "@/views/Reports.vue")
  },
  {
    path: "/departments",
    name: "Departments",
    meta: { auth: false, layout: "main" },
    component: () => import(/* webpackChunkName: "Departments" */ "@/views/Departments.vue")
  },
  {
    path: "/profile",
    name: "Profile",
    meta: { auth: false, layout: "main" },
    component: () => import(/* webpackChunkName: "Profile" */ "@/views/profile/Profile.vue")
  },
  {
    path: "/settings",
    name: "Settings",
    meta: { auth: false, layout: "main" },
    component: () => import(/* webpackChunkName: "Settings" */ "@/views/Settings.vue")
  },
  {
    path: "/home",
    name: "Home",
    meta: { auth: false, layout: "main" },
    component: () => import(/* webpackChunkName: "Home" */ "@/views/Home.vue")
  },
  {
    path: "/select",
    name: "Select",
    meta: { auth: false, layout: "auth" },
    component: () => import(/* webpackChunkName: "Select" */ "@/views/login/Select.vue")
  },
  {
    path: "/login",
    name: "Login",
    meta: { auth: false, layout: "auth" },
    component: () => import(/* webpackChunkName: "Login" */ "@/views/login/Login.vue")
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    meta: { auth: false, layout: "auth" },
    component: () => import(/* webpackChunkName: "NotFound" */ "@/views/NotFound.vue")
  },
];

export const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});


router.beforeEach((to, from, next) => {
  fetch(`${process.env.VUE_APP_BASE_URL}/v1/gateway/authorization/state`, { method: 'GET', credentials: 'include' })
    .then(response => {
      const isAuthenticated = response.status === 200;
      if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
      else next()
    })
    .catch(() => {
      const isAuthenticated = false;
      if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
      else next()
    })
})