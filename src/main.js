import Vue from 'vue'
import Layout from '@components/layout'
import router from '@/router'
import axios from 'axios'
Vue.prototype.$http = axios


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    Layout
  },
  template: '<Layout/>'
})
