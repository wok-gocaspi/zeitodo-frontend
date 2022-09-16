import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Router from 'vue-router'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import { createPinia, PiniaVuePlugin } from 'pinia'

Vue.config.productionTip = false

axios.defaults.baseURL = process.env.VUE_APP_BASE_URL
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("token")}`

Vue.use(PiniaVuePlugin)
const pinia = createPinia()

Vue.use(Router)

new Vue({
  pinia,
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')

