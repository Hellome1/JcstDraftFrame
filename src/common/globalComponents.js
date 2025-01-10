import Txt from '@/components/Txt/index.vue';
import Modal from '@/components/Modal/index.vue';
import ModalTwo from '@/components/ModalTwo/index.vue';
import Table from '@/components/Table/index.vue';
import TipBox from '@/components/TipBox/use.vue';
import Wrapper from '@/components/Wrapper/wrapper.vue';

export default function (Vue) {
  Vue.component('Txt', Txt);
  Vue.component('Modal', Modal);
  Vue.component('ModalTwo', ModalTwo);
  Vue.component('Table', Table);
  Vue.component('TipBox', TipBox);
  Vue.component('Wrapper', Wrapper);

  Vue.directive('highlight', {
    bind: (el, binding) => {
      let { value } = binding;
      el.onmouseenter = () => {
        console.log('enter');
        jcst_config.shape = value;
      }
      el.onmouseleave = () => {
        console.log('leave');
        jcst_config.shape = '';
      }
    }
  })
}