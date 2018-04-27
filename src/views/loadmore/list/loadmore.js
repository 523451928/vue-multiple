import Vue from 'vue'
import Vuerouter from 'vue-router'

import JkLoadmore from './JkLoadmore'
import NativeLoadmore from './NativeLoadmore'
Vue.use(Vuerouter)
const routes = [
  { path: '/', redirect: 'nativeLoadmore' },
  { path: '/nativeloadmore', component: NativeLoadmore, meta: {title: 'native-Loadmore'}},
  { path: '/loadmore', component: JkLoadmore, meta: {title: 'vue-Loadmore'}}
]

const router = new Vuerouter({
  routes
})
router.afterEach(to => {
  document.title = to.meta.title 
})
new Vue({
  router
}).$mount('#app')