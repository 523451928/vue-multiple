
import Vue from 'vue'
import App from './listApp'
import ElDatePicker from 'element-datepicker'
Vue.use(ElDatePicker)

new Vue({
  render: h => h(App)
}).$mount('#app')
