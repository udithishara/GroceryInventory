import Vue from 'vue'
import App from './App.vue'
import router from './router/index'

import '@/assets/styles/tailwind.css'

Vue.config.productionTip = false
Vue.config.ignoredElements = ['Item']

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
