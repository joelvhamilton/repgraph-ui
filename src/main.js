import Vue from 'vue'
import App from './App.vue'
import { store } from './store/index.js'
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'element-ui/lib/theme-chalk/index.css';
import VModal from 'vue-js-modal'

Vue.config.productionTip = false
Vue.use(VModal)
new Vue({
  render: h => h(App),
  store,
}).$mount('#app')
