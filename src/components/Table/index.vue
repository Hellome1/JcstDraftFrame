<script>
import { mapState } from "vuex";
export default {
  props: {},
  created() {
  },
  mounted() {},
  computed: {
    ...mapState(["table"]),
    tableData() {
      return this.table.tableData;
    },
    column() {
      return this.cp(this.table.column);
    }
  },
  render: function (h) {
    return h(
      "el-table",
      {
        props: {
          data: this.tableData
        },
        style: {
          width: "100%",
        },
      },
      this.column.map(attrs => h('el-table-column', { attrs }))
    );
  },
};
</script>