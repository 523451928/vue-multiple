import Vue from 'vue'
import Vuerouter from 'vue-router'

import JkSwiper from './JkSwiper'
import NativeSwiper from './NativeSwiper'
Vue.use(Vuerouter)
const routes = [
  { path: '/', redirect: 'nativeswiper' },
  { path: '/nativeswiper', component: NativeSwiper, meta: {title: 'native-swiper'}},
  { path: '/swiper', component: JkSwiper, meta: {title: 'vue-swiper'}}
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