import Vue from 'vue'
import VueRouter from 'vue-router'
import DashboardView from '../views/DashboardView'
import TimeentryView from "@/views/TimeentryView";
import AdminManagement from "@/views/AdminManagement";
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
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
