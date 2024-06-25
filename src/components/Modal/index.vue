<script>
import { mapState } from "vuex";
export default {
  props: {},
  data() {
    return {};
  },
  created() {
    console.log(1);
  },
  mounted() {},
  computed: {
    ...mapState(["modal"]),
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
    return h("div", {}, [
      h(
        "el-dialog",
        {
          props: {
            visible: this.dialogVisible,
            title: this.title,
            "before-close": () => (this.modal.dialogVisible = false),
          },
          attrs: {
            width: this.width,
          },
        },
        [
          h(
            require('@/components/Modal/main.vue').default,
            {},
            ''
          ),
          h(
            'span',
            {
              slot: 'footer',
              class: {
                'dialog-footer': true
              }
            },
            [
              h(require('@/components/Modal/footer.vue').default, {})
            ],
          ),
        ]
      ),
    ]);
  },
};
</script>