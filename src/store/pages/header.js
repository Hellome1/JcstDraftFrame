let state = setting['header'];
let mutations = {};
for (let k in state) {
  mutations['header_' + k] = (state, payload) => {
    state[k] = payload;
  }
}

// console.log('state', state);
// console.log('mutations', mutations);
export default {
  state: state,
  mutations: mutations
}