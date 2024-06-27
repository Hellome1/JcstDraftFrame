let state = window['jcst_layout'];
let mutations = {};
for (let k in state) {
  mutations['layout_' + k] = (state, payload) => {
    state[k] = payload;
  }
}

export default {
  state,
  mutations
}