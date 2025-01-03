import Vue from 'vue';
import Vuex from 'vuex';

import pageSize from './pageSize/index.js';
import moduleTimeInfo from './moduleTimeInfo/index.js';
import layoutRight from './layoutRight/index.js';

import layout from './layout/index.js';
import modal from './modal/index.js';
import modalTwo from './modalTwo/index.js';
import table from './table/index.js';
import tipbox from './tipbox/index.js';
import iframe from './iframe/index.js';

import header from './pages/header.js';
import timeline from './pages/timeline.js';
import surgery from './pages/surgery.js';
import vitalsigns from './pages/vitalsigns.js';
import nursing from './pages/nursing.js';
import medicalOrder from './pages/medicalOrder.js';
import pacs from './pages/pacs.js';
import lis from './pages/lis.js';
import consult from './pages/consult.js';
import EMR from './pages/EMR.js';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    
  },
  mutations: {
    
  },
  actions: {},
  modules: {
    pageSize,
    moduleTimeInfo,
    layoutRight,
    layout,
    modal,
    modalTwo,
    table,
    tipbox,
    iframe,
    header,
    timeline,
    surgery,
    vitalsigns,
    nursing,
    medicalOrder,
    pacs,
    lis,
    consult,
    EMR
  }
});
