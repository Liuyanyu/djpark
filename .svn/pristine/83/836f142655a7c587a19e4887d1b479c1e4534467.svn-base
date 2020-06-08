import Vue from 'vue'
import App from './App.vue'
import echarts from 'echarts'
Vue.prototype.$echarts = echarts
import iView from 'iview';
import 'iview/dist/styles/iview.css';

import router from './router'

import VueVideoPlayer from 'vue-video-player'
Vue.use(VueVideoPlayer)

Vue.use(iView);
import remConfig from './config/rem'
remConfig()

Vue.config.productionTip = false

import axios from 'axios';
Vue.prototype.$axios = axios;
import QS from 'qs'
Vue.prototype.qs = QS;

//import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import "lib-flexible/flexible.js"
//import './utils/utils'
new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
