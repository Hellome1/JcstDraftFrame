<script>
import { mapState } from "vuex";
export default {
  props: {},
  created() {
  },
  mounted() {},
  computed: {
    // ...mapState(["table"]),
    // tableData() {
    //   return this.table.tableData;
    // },
    // column() {
    //   return this.cp(this.table.column);
    // }
  },
  render: function (h) {
    return h(
      "el-table",
      {
        props: {
          data: [{
      date: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄'
    }, {
      date: '2016-05-04',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1517 弄'
    }, {
      date: '2016-05-01',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1519 弄'
    }, {
      date: '2016-05-03',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1516 弄'
    }],
        },
        style: {
          width: "100%",
        },
      },
      [
      {
        prop: "date",
        label: "日期",
        width: "180",
      },
      {
        prop: "name",
        label: "姓名",
        width: "180",
      },
      {
        prop: "address",
        label: "地址",
      },
    ].map(attrs => h('el-table-column', { attrs }))
    );
  },
};
</script>