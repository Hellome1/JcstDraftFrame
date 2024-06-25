// let state = setting['table'];
// let mutations = {};
// for (let k in state) {
//   mutations['table_' + k] = (state, payload) => {
//     state[k] = payload;
//   }
// }

export default {
  state: {
    
    tableData: [{
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
    column: [
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
    ]
  },
  // mutations: mutations
}