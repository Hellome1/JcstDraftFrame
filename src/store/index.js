import Vue from 'vue';
import Vuex from 'vuex';

import layoutRight from './layoutRight/index.js';

import layout from './layout/index.js';
import modal from './modal/index.js';
import table from './table/index.js';
import tipbox from './tipbox/index.js';

import header from './pages/header.js';
import timeline from './pages/timeline.js';
import surgery from './pages/surgery.js';
import vitalsigns from './pages/vitalsigns.js';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    
  },
  mutations: {
    
  },
  actions: {},
  modules: {
    layoutRight,
    layout,
    modal,
    table,
    tipbox,
    header,
    timeline,
    surgery,
    vitalsigns
  }
});
