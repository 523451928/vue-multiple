import Vue from 'vue'
import goods from './goods'
import store from 'src/store/vuex/store'
import Lib from "assets/js/Lib"

new Vue({
  // render: h => h(goods),
  render: (h) => {
    console.log(h)
    return h(goods)
  },
  store
}).$mount('#app')