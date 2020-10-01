import Vue from 'vue'
import App from './App.vue'
import { store } from './store/index.js'
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store,
}).$mount('#app')
