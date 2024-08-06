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
    ...mapState(["modalTwo","layout"]),
    dialogVisible() {
      return this.modalTwo.dialogVisible;
    },
    title() {
      return this.modalTwo.title;
    },
    width() {
      return this.modalTwo.width;
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
            // modal: false,
            "before-close": () => (this.modalTwo.dialogVisible = false),
          },
          attrs: {
            width: this.width,
          },
          style: style
        },
        [
          h(
            require('@/components/ModalTwo/main.vue').default,
            {},
            ''
          )
        ]
      ),
    ]);
  },
};
</script>