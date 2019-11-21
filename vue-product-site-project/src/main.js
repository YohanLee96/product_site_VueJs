import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import 'bootstrap'; 
import 'bootstrap/dist/css/bootstrap.min.css'; //부트스트랩
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
