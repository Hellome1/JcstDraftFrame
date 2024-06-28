<template>
  <div>
    <p v-for="shape in shapes" :key="shape.left + shape.top" :style="shape"></p>
  </div>
</template>

<script>
import { inject } from '@/common/vuePrototypeMethods.js';
function getDomAbsPosition(node) {
  let x = node.offsetLeft, y = node.offsetTop;
  while (node.offsetParent) {
    node = node.offsetParent;
    x += node.offsetLeft;
    y += node.offsetTop;
  }
  return { left: x, top: y };
};
const getShape = (dom) => {
  let {left, top} = getDomAbsPosition(dom);
  let width = dom.offsetWidth,
    height = dom.offsetHeight;
  return {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 0, 0.3)',
    zIndex: 99,
    left: left + 'px',
    top: top + 'px',
    width: width + 'px',
    height: height + 'px'
  }
}
const map = (tar, cb) => {
  let r = [];
  for (let i = 0; i < tar.length; i++) {
    r.push(cb(tar[i]));
  }
  return r;
}
export default {
  name: 'highLightBox',
  computed: {
    ...inject('layoutRight', 'layout'),
    shapes() {
      let shapes = [];
      let shape = this.shape;
      if (!shape) return [];
      let sshapes = shape.split(',');
      sshapes.forEach(itm => {
        let doms = document.querySelectorAll(`[shape=${itm}]`);
        let rs = map(doms, dom => getShape(dom));
        shapes = [...shapes, ...rs];
        let valuekeys = itm.split('-').map(t => this[t]);
        console.log('valuekeys', valuekeys);
      })
      // console.log('doms', doms);
      // console.log('shapes', shapes);
      return shapes;
    }
  }
}
</script>

<style>

</style>