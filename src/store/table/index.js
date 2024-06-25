let state = window['table'];
let mutations = {};
for (let k in state) {
  mutations['table_' + k] = (state, payload) => {
    state[k] = payload;
  }
}

export default {
  state: state,
  mutations: mutations
}