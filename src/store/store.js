'use strict';

import * as types from './types';

import Vuex from 'vuex';

import Vue from 'vue';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        userInfo: {},
        token: null,
        showLoading: false,
        showLoginMask: false
    },
    mutations: {
        [types.LOGIN]: (state, data) => {
            localStorage.token = data;
            state.token = data;
        },
        [types.LOGOUT]: (state) => {
            localStorage.removeItem('token');
            state.token = null;
        },
        [types.LOADING]: (state, data) => {
            state.showLoading = data;
        },
        [types.LOGIN_MASK]: (state, data) => {
            state.showLoginMask = data;
        },
        [types.USER_INFO]: (state, data) => {
            state.userInfo = data;
        }
    }
});
