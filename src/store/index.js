import Vue from 'vue';
import Vuex from 'vuex';

import modal from './modal/index.js';
import table from './table/index.js';

import header from './pages/header.js';
import timeline from './pages/timeline.js';
import surgery from './pages/surgery.js';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    showModules: localStorage.getItem('showDisplayModules') ? JSON.parse(localStorage.getItem('showDisplayModules')) : setting.displayModules
  },
  mutations: {
    set_showModules(state, modules) {
      state.showModules = modules;
    }
  },
  actions: {},
  modules: {
    modal,
    table,
    header,
    timeline,
    surgery
  }
});
