<script>
import { mapState } from 'vuex';
import { ajax } from '@/server/api.js';

export default {
  props: {},
  data() {
    return {
      loading: false
    }
  },
  created() {
    this.ajax();
  },
  mounted() {},
  watch: {
    action() {
      this.ajax();
    },
    dialogVisible() {
      let table = jcst.table;
      if (!this.dialogVisible) {
        table.tableData = [];
        table.post.action = '';
      }
    }
  },
  computed: {
    ...mapState(['modal', 'table']),
    dialogVisible() {
      return this.modal.dialogVisible;
    },
    tableData() {
      return this.table.tableData;
    },
    columns() {
      let table = this.cp(this.table);
      return table.column;
    },
    action() {
      return this.table.post.action;
    },
    from() {
      return this.table.post.from;
    },
    handleClick() {
      return this.table.handleClick;
    }
  },
  render: function (h) {
    return h(
      'el-table',
      {
        props: {
          height: '500',
          data: this.tableData,
          'row-style': rowO => jcst.rules.$2(rowO.row, this.columns),
          'cell-style': O => jcst.rules.$3(O, this.columns)
        },
        on: {
          'row-click': this.handleRowClick
        },
        style: {
          width: '100%'
        },
        directives: [
          {
            name: 'loading',
            value: this.loading
          }
        ]
      },
      this.columns.map(attrs => h(
        'el-table-column', 
        { attrs: attrs, scopedSlots: attrs.rule ? { default: props => { return jcst.rules.$1(h, props.row, attrs.rule) } } : {} }
      ))
    );
  },
  methods: {
    ajax() {
      if (!this.action) return;
      this.loading = true;
      ajax({ action: this.action, query: { from: this.from } }).then(res => {
        ajax_data(res);
        this.loading = false;
      }).catch(e => { this.loading = false; throw e; });
    },
    handleRowClick(row, column, event) {
      let handleClick = this.handleClick;
      let eventName = handleClick.split('.')[1];
      if (eventName && eventName in presetEventFn) {
        presetEventFn[eventName](row, column, event);
      }
    }
  }
};
</script>