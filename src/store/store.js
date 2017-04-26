'use strict';

import * as types from './types';

import Vuex from 'vuex';

import Vue from 'vue';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        userName: '',
        ajaxToken: '',    // 发起ajax请求时的携带的token 始终存在
        accessToken: '',   // 当用户登录之后，才存入缓存中(退出时清除) 保持与ajaxToken 一致
        showLoading: false,
        showLoginMask: false
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
            localStorage.removeItem('userInfo');
            localStorage.removeItem('ajaxToken');
            state.userInfo = null;
            state.ajaxToken = null;
            state.accessToken = null;
        },
        [types.LOADING]: (state, data) => {
            state.showLoading = data;
        },
        [types.LOGIN_MASK]: (state, data) => {
            state.showLoginMask = data;
        },
        [types.USER_INFO]: (state, data) => {
            // userInfo state 与 localStorage 中统一存为string
            let _data = data;
            if (typeof data === 'object') {
                _data = JSON.stringify(data);
            }
            localStorage.userInfo = _data;
            state.userInfo = _data;
        }
    }
});
