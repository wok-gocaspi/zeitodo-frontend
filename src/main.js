import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import axios from 'axios'

Vue.config.productionTip = false

axios.defaults.baseURL = process.env.VUE_APP_BASE_URL

export const bus = new Vue()

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
