let state = window['tipbox'];
let mutations = {};
for (let k in state) {
  mutations['tipbox_' + k] = (state, payload) => {
    state[k] = payload;
  }
}

export default {
  state,
  mutations
}