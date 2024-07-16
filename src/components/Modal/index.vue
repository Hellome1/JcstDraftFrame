<script>
import { mapState } from "vuex";
export default {
  props: {},
  data() {
    return {};
  },
  created() {
    
  },
  mounted() {},
  computed: {
    ...mapState(["modal","layout"]),
    dialogVisible() {
      return this.modal.dialogVisible;
    },
    title() {
      return this.modal.title;
    },
    width() {
      return this.modal.width;
    }
  },
  render: function (h) {
    const showLiveSetting = this.layout.showLiveSetting;
    const style = {};
    if (showLiveSetting) {
      style.width = '66.7%';
      style.right = 'auto';
    }
    return h("div", {}, [
      h(
        "el-dialog",
        {
          props: {
            visible: this.dialogVisible,
            title: this.title,
            modal: false,
            "before-close": () => (this.modal.dialogVisible = false),
          },
          attrs: {
            width: this.width,
          },
          style: style
        },
        [
          h(
            require('@/components/Modal/main.vue').default,
            {},
            ''
          ),
          // h(
          //   'span',
          //   {
          //     slot: 'footer',
          //     class: {
          //       'dialog-footer': true
          //     }
          //   },
          //   [
          //     h(require('@/components/Modal/footer.vue').default, {})
          //   ],
          // ),
        ]
      ),
    ]);
  },
};
</script>