import VueRouter from 'vue-router'
import DashboardView from '../views/DashboardView'
import TimeentryView from "@/views/TimeentryView";
import AdminManagement from "@/views/AdminManagement";
import LoginView from "@/views/LoginView";
import {useUserStore} from "@/stores/user";

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: DashboardView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/timeentry',
    name: 'timeentry',
    component: TimeentryView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/admin/panel',
    name: 'AdminManagementPanel',
    component: AdminManagement,
    meta: {
      requiresAuth: true,
      adminPage: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  if(to.matched.some(record => record.meta.requiresAuth)){
    if(!userStore.isLoggedIn){
      next({name: "Login"})
    } else {
      next()
    }
  } else {
    next()
  }
  if(to.matched.some(record => record.meta.adminPage)){
    if(!userStore.isAdmin){
      next({name: "Login"})
    } else{
      next()
    }
  } else {
    next()
  }
})

export default router
