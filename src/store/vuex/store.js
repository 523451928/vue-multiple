import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store=new Vuex.Store({
  state: {
    goodsArr: [0, 1, 2]
  },
  mutations: {
    setGoods(state, arr){
      state.goodsArr = arr
    }
  }
})
export default store