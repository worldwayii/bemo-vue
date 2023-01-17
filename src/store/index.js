import Vue from 'vue';
import Vuex from 'vuex';

import rootMutations from "./mutations.js";
import rootActions from "./actions.js";
import rootGetters from "./getters.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state() {
    return {
      columns: {},
      cards: {},
    };
  },
  mutations: rootMutations,
  actions: rootActions,
  getters: rootGetters,
});