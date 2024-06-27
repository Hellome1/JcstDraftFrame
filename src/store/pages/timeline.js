let state = jcst_setting['timeline'];
let mutations = {};
for (let k in state) {
  mutations['timeline_' + k] = (state, payload) => {
    state[k] = payload;
  }
}

export default {
  state,
  mutations
}