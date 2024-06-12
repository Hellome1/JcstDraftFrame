import Vue from 'vue';

import Txt from '@/components/Txt/index.vue';
Vue.component('Txt', Txt);
import Modal from '@/components/Modal/index.vue';
Vue.component('Modal', Modal);
import Table from '@/components/Table/index.vue';
Vue.component('Table', Table);
import getData from '@/server/api.js';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/font/font-awesome-4.7.0/css/font-awesome.min.css';

import App from './App.vue';
import store from './store';

import '@/assets/css/index.scss';
import '@/assets/font/font-awesome-4.7.0/css/font-awesome.min.css';

import '@/vuePrototypeMethods/index.js'; // 用于绑定Vue原型上的公共方法

Vue.config.productionTip = false;
Vue.config.devtools = true;
Vue.use(ElementUI);

window.bus = new Vue()
VUEX_STORE.setStore(store);

getData();

new Vue({
  store,
  render: h => h(App)
}).$mount('#app');