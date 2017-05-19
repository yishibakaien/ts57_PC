'use strict';

import * as types from './types';

import Vuex from 'vuex';

import Vue from 'vue';
// module
// ======
import shopManagement from './module/shopManagement';
import dict from './module/dict';
// ======
import {searchMtd} from '../common/api/api';

Vue.use(Vuex);

// 搜索模块的一些格式化方法，由于字段中存在 0、‘’ 等 特殊字段，所以本地缓存中只保存
// 汉子文字，提取时进行转码
function _formateCategory(str) {
  if (str === '面料') {
    return 100010;
  } else if (str === '大边') {
    return 100011;
  } else if (str === '小边') {
    return 100012;
  } else if (str === '睫毛') {
    return 100013;
  } else if (str === '全部') {
    return '';
  }
};

function _formateStockType(str) {
  if (str === '有库存') {
    return 2;
  } else if (str === '需要开机') {
    return 0;
  } else if (str === '全部') {
    return '';
  }
};

export default new Vuex.Store({
  modules: {
    shopManagement,
    dict
  },
  state: {
    userName: '',
    ajaxToken: '', // 发起ajax请求时的携带的token 始终存在
    accessToken: '', // 当用户登录之后，才存入缓存中(退出时清除) 保持与ajaxToken 一致
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
    doSearch({
      commit
    }, data) {
      // let defaultData = {
      //     keywords: '',
      //     category: localStorage.category || '',
      //     stockType: localStorage.stockType || 0,
      //     pageSize: 15,  // 每页数量 默认10
      //     searchType: 2  // 搜索类型 1:店铺搜索 2:全局搜索
      // }

      let _data = Object.assin({}, data);
      for (let key in _data) {
        if (key === 'category') {
          // 搜索类型
          _data[key] = _formateCategory(_data[key]);
        }
        if (key === 'stockType') {
          // 库存类型
          _data[key] = _formateStockType(_data[key]);
        }
        if (key === 'pageNO') {
          // 页码
          _data[key] = _data[key] || 1;
        }
        if (key === 'pageSize') {
          // 每页显示数量
          _data[key] = _data[key] || 10;
        }
        if (key === 'searchType') {
          // 搜索类型 1:店铺搜索 2:全局搜索
          _data[key] = _data[key] || 2;
        }
      }
      // 搜索花
      searchMtd(_data).then(res => {
        console.log('vuex action 的搜索返回值', res);
        let __data = res.data;
        __data.searchText = data.keywords;
        __data.category = data.category;
        __data.stockType = data.stockType;
        commit(types.SEARCH_RESULT, __data);
      });
    }
  }
});
