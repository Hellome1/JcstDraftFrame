let state = setting['vitalsigns'];
let mutations = {};
for (let k in state) {
  mutations['vitalsigns_' + k] = (state, payload) => {
    state[k] = payload;
  }
}

export default {
  state,
  mutations
}