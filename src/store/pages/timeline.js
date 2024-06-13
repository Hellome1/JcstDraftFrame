let state = setting['timeline'];
let mutations = {};
for (let k in state) {
  mutations['header_' + k] = (state, payload) => {
    state[k] = payload;
  }
}

export default {
  state,
  mutations
}