import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import { auth } from './firebase'

import '@/assets/styles/tailwind.css'
import './registerServiceWorker'

Vue.config.productionTip = false

let app
auth.onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      render: h => h(App)
    }).$mount('#app')
  }
})
