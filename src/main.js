import Vue from 'vue';

import setVue from '@/common/index.js';
setVue(Vue);
import getData from '@/server/api.js';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import JsonViewer from 'vue-json-viewer';

import App from './App.vue';
import store from './store';

import '@/assets/css/index.scss';
import '@/assets/font/font-awesome-4.7.0/css/font-awesome.min.css';

Vue.config.productionTip = false;
Vue.config.devtools = true;
Vue.use(ElementUI);
Vue.use(JsonViewer);

window.bus = new Vue()
VUEX_STORE.setStore(store);

getData();

new Vue({
  store,
  render: h => h(App)
}).$mount('#app');