import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import './plugins/vant.js'
import {post,fetch} from './plugins/http'
import api from "./plugins/api";
import qs from 'qs';
Vue.config.productionTip = false;
//定义全局变量
Vue.prototype.$post=post;
Vue.prototype.$fetch=fetch;
Vue.prototype.$api=api;
Vue.prototype.$qs=qs;
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
