'use strict';
import Vue from 'vue';
import Vuex from 'vuex';
import * as types from './types';
// module
// ======
import shop from './module/shop';
import dict from './module/dict';
import user from './module/user';
import token from './module/token';
import search from './module/search';
// ======
Vue.use(Vuex);
export default new Vuex.Store({
  modules: {
    shop,
    token,
    dict,
    search,
    user
  },
  state: {
    userName: '',
    showLoading: false,
    showLoginMask: false,
    modelShow: false,
    modelOption: {},
    currentPerson: ''
  },
  mutations: {
    [types.LOADING]: (state, data) => {
      state.showLoading = data;
    },
    [types.LOGIN_MASK]: (state, data) => {
      state.showLoginMask = data;
    },
    [types.MODEL_SHOW]: (state, data) => {
      state.modelShow = data;
    },
    [types.MODEL_OPTION]: (state, data) => {
      state.modelOption = data;
    },
    [types.CURRENT_PERSONAL]: (state, data) => {
      state.currentPerson = data;
    }
  },
  getters: {
    getModelShow: state => {
      return state.modelShow;
    },
    getModelOption: state => {
      return state.modelOption;
    }
  }
});
