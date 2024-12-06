import Vue from 'vue';
import store from '@/store';

Vue.prototype.getDomAbsPosition = function getDomAbsPosition(node) {
  let x = node.offsetLeft, y = node.offsetTop;
  let offsetHeight = node.offsetHeight || jcst.default.tipboxDefaultOffset;
  while (node.offsetParent) {
    node = node.offsetParent;
    x += node.offsetLeft;
    y += node.offsetTop;
    if (node.scrollTop && node.className != 'tipbox-scroll-ignore') {
    // if (node.scrollTop) {
      y -= node.scrollTop;
    }
  }
  return { left: x, top: y + offsetHeight, offsetHeight };
};
Vue.prototype.$t = translate.$t;
Vue.prototype.weekContract = translate.weekContract;

Vue.prototype.log = (...args) => {
  const nargs = args.map(arg => 'object' === typeof arg ? JSON.parse(JSON.stringify(arg)) : arg );
  console.log('[from main.js 38]', ...nargs);
}
Vue.prototype.cp = (obj) => {
  if ('object' === typeof obj) {
    return JSON.parse(JSON.stringify(obj));
  } else {
    return obj;
  }
}
Vue.prototype.txt = (payload) => {
  return payload && payload.text || '';
}
Vue.prototype.stl = (payload) => {
  return payload && payload.style || {};
}

Vue.prototype.crouter = (key) => {
  let show = store.state.layoutRight.show;
  for (let k in show) {
    show[k] = false;
  }
  show[key] = true;
}

export function inject(...keys) {
  let obj = {};
  keys.forEach(key => {
    let tar = store.state[key];
    for (let k in tar) {
      obj[k] = () => tar[k];
    }
  })
  return obj;
}