import Vue from 'vue'
import VueRouter from 'vue-router'
import DashboardView from '../views/DashboardView'
import TimeentryView from "@/views/TimeentryView";
import AdminManagement from "@/views/AdminManagement";
import LoginView from "@/views/LoginView";
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: DashboardView
  },
  {
    path: '/timeentry',
    name: 'timeentry',
    component: TimeentryView
  },
  {
    path: '/admin/panel',
    name: 'AdminManagementPanel',
    component: AdminManagement
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

export default router
