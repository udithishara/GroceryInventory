import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import { auth } from './firebase'

import '@/assets/styles/tailwind.css'

Vue.config.productionTip = false
Vue.config.ignoredElements = ['Item']

let app
auth.onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      render: h => h(App)
    }).$mount('#app')
  }
})
