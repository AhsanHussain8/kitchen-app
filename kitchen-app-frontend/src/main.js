import Vue from 'vue'
import App from './App.vue'
import store from './store'
import Donut from 'vue-css-donut-chart';

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
