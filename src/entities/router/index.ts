import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Dashboard',
    meta: { auth: true, layout: "main" },
    component: () => import(/* webpackChunkName: "Dashboard" */ '@/views/Dashboard.vue')
  },
  {
    path: '/equipment',
    name: 'Equipment',
    meta: { auth: true, layout: "main" },
    component: () => import(/* webpackChunkName: "Equipment" */ '@/views/Equipment.vue')
  },
  {
    path: '/maintenance',
    name: 'Maintenance',
    meta: { auth: true, layout: "main" },
    component: () => import(/* webpackChunkName: "Maintenance" */ '@/views/Maintenance.vue')
  },
  {
    path: '/tickets',
    name: 'Tickets',
    meta: { auth: true, layout: "main" },
    component: () => import(/* webpackChunkName: "Tickets" */ '@/views/Tickets.vue')
  },
  {
    path: '/users',
    name: 'Users',
    meta: { auth: true, layout: "main" },
    component: () => import(/* webpackChunkName: "Users" */ '@/views/Users.vue')
  },
  {
    path: '/locations',
    name: 'Locations',
    meta: { auth: true, layout: "main" },
    component: () => import(/* webpackChunkName: "Locations" */ '@/views/Locations.vue')
  },
  {
    path: '/reports',
    name: 'Reports',
    meta: { auth: true, layout: "main" },
    component: () => import(/* webpackChunkName: "Reports" */ '@/views/Reports.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    meta: { auth: true, layout: "main" },
    component: () => import(/* webpackChunkName: "Profile" */ '@/views/profile/Profile.vue')
  },
  {
    path: '/select',
    name: 'Select',
    meta: { auth: true, layout: "auth" },
    component: () => import(/* webpackChunkName: "Login" */ '@/views/login/Select.vue')
  },
  {
    path: '/login',
    name: 'Login',
    meta: { auth: false, layout: "auth" },
    component: () => import(/* webpackChunkName: "Login" */ '@/views/login/Login.vue')
  }
]

export const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


router.beforeEach(async (to, from, next) => {
  const auth = await fetch(`${process.env.VUE_APP_BASE_URL}/v1/gateway/authorization/state`, { credentials: "include", })

  if (auth.status !== 200 && to.meta.auth) {
    next({ name: "Login" })
  } else if (auth.status === 200 && to.name === "Login") {
    next({ name: "Dashboard" })
  } else {
    next()
  }
})