import Vue from 'vue'
import App from './App.vue'
import store from "./store/index.js";
import axios from 'axios';
import VModal from 'vue-js-modal'


axios.defaults.baseURL = process.env.VUE_APP_API_ENDPOINT
Vue.prototype.$http = axios
const token = localStorage.getItem('token');
if(token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token;
}

Vue.use(VModal, { componentName: 'VModal' })


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store,
}).$mount('#app')
