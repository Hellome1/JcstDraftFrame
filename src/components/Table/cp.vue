<script>
import { mapState } from "vuex";
export default {
  props: {},
  created() {
    console.log(this.table);
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
    console.log('tableData', this.cp(this.tableData));
    console.log('column', this.cp(this.column));
    
    return h(
      "el-table",
      {
        props: {
          data: this.tableData,
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