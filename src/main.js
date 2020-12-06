import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'bootstrap'
import $ from 'jquery'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import VeeValidate from 'vee-validate'
import zhTW from 'vee-validate/dist/locale/zh_TW'
import VueI18n from 'vue-i18n'

import App from './App.vue'
import router from './router'
import './bus'
import filterCurrency from './filter'

axios.defaults.withCredentials = true

Vue.component('Loading', Loading)

window.$ = $

Vue.config.productionTip = false
Vue.use(VueAxios, axios)
Vue.filter('filterCurrency', filterCurrency)

Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: 'zhTW'
})
Vue.use(VeeValidate, {
  i18n,
  dictionary: {
    zhTW
  }
})

new Vue({
  render: h => h(App),
  router,
  i18n
}).$mount('#app')

router.beforeEach((to, from, next) => {
  console.log('to', to, 'from', from, 'next', next)
  if (to.meta.requiresAuth) {
    const api = `${process.env.VUE_APP_API}/api/user/check`
    axios.post(api).then((response) => {
      console.log(response.data)
      if (response.data.success) {
        next()
      } else {
        next({
          path: '/login'
        })
      }
    })
  } else {
    next()
  }
})
