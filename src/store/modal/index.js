let state = setting['modal'];
let mutations = {};
state.main = function (h) {
  return h(
    'span',
    {},
    [
      h(
        require('@/' + this.path).default,
        {}
      )
    ]
  )
}
state.footer = function(h) {
  return h(
    'span',
    {},
    [
      h(
        'el-button',
        {
          on: {
            click: () => (this.modal.dialogVisible = false)
          }
        },
        '取消'
      ),
      h(
        'el-button',
        {
          props: {
            type: 'primary'
          },
          on: {
            click: () => (this.modal.dialogVisible = false)
          }
        },
        '确定'
      )
    ]
  )
}
for (let k in state) {
  mutations['modal_' + k] = (state, payload) => {
    state[k] = payload;
  }
}

export default {
  state: state,
  mutations: mutations
}