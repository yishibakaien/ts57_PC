'use strict';

import * as types from './types';

import Vuex from 'vuex';

import Vue from 'vue';

// import {search} from '../../common/api/api';
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        userName: '',
        ajaxToken: '',    // 发起ajax请求时的携带的token 始终存在
        accessToken: '',   // 当用户登录之后，才存入缓存中(退出时清除) 保持与ajaxToken 一致
        showLoading: false,
        showLoginMask: false,
        modelShow: false,
        modelOption: {},
        searchResult: {
            data: {
                list: []
            }
        }
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
        [types.SEARCH_RESULT]: (state, data) => {
            state.searchResult = data;
            localStorage.searchText = data.searchText;
            localStorage.category = data.category || '';
            localStorage.stockType = data.stockType || 0;
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
    },
    action: {
        // doSearch({commit}, data) {
        //     search(data).then(res => {
        //         console.log('vuex action 的搜索返回值', res);
        //         commit(types.SEARCH_RESULT, res.data);
        //     });
        // }
    }
});
