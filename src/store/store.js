'use strict';

import * as types from './types';

import Vuex from 'vuex';

import Vue from 'vue';
// module
// ======
import shopManagement from './module/shopManagement';
// ======
Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
      shopManagement
    },
    state: {
        userName: '',
        ajaxToken: '',    // 发起ajax请求时的携带的token 始终存在
        accessToken: '',   // 当用户登录之后，才存入缓存中(退出时清除) 保持与ajaxToken 一致
        showLoading: false,
        showLoginMask: false,
        modelShow: false,
        modelOption: {}
    },
    mutations: {
        [types.AJAX]: (state, data) => {
            localStorage.ajaxToken = data;
            state.ajaxToken = data;
        },
        [types.LOGIN]: (state, data) => {
            localStorage.accessToken = data;
            state.accessToken = data;
        },
        [types.LOGOUT]: (state) => {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('userName');
            localStorage.removeItem('ajaxToken');
            state.userName = null;
            state.ajaxToken = null;
            state.accessToken = null;
        },
        [types.LOADING]: (state, data) => {
            state.showLoading = data;
        },
        [types.LOGIN_MASK]: (state, data) => {
            state.showLoginMask = data;
        },
        [types.USER_NAME]: (state, data) => {
            state.userName = data;
            localStorage.userName = data;
        },
        [types.MODEL_SHOW]: (state, data) => {
            state.modelShow = data;
        },
        [types.MODEL_OPTION]: (state, data) => {
            state.modelOption = data;
        }
    },
    getters: {
        getUserName: state => {
            return state.userName;
        },
        getModelShow: state => {
            return state.modelShow;
        },
        getModelOption: state => {
            return state.modelOption;
        }
    }
});
