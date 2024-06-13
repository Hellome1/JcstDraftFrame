import setVue from './globalComponents.js';
import './vuePrototypeMethods.js'; // 用于绑定Vue原型上的公共方法
import './methodToWindow';

export default function (Vue) {
  setVue(Vue);
}