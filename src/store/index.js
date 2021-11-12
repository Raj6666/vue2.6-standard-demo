import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoading: false, // 是否加载中
  },
  mutations: {
    updateLoadingStatus(state, payload) {
      state.isLoading = payload.isLoading;
    },
  },
  actions: {},
  modules: {},
});
