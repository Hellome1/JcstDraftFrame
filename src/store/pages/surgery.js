let state = jcst_setting['surgery'];
let mutations = {};
for (let k in state) {
  mutations['surgery_' + k] = (state, payload) => {
    state[k] = payload;
  }
}

export default {
  state,
  mutations
}