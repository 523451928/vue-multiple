
import Vue from 'vue'
import App from './JukeComponent'
import collapseTransition from 'assets/js/juekTransition'
console.log(collapseTransition)
Vue.component(collapseTransition.name, collapseTransition)

new Vue({
  render: h => h(App)
}).$mount('#app')