import {searchGetResult, searchEncoded, searchPolling} from '@/common/api/api';
//
const state = {
  // 搜索-BASE64文本
  search: {
    id: '',
    list: [],
    progress: 0,
    handleStatus: false,
    setInterval: null
  }
};

const mutations = {
  GET_SEARCH_LIST(state, info) {
    state.search.list = state.search.list.concat(info);
  },
  SET_SEARCH_EMPTY(state) {
    state.search.list = [];
  },
  GET_SEARCH_ID(state, id) {
    state.search.id = id;
  },
  SET_HANDLE_STATUS(state, status) {
    state.search.handleStatus = status;
  },
  // 进度条控制
  SET_PROGRESS(state, progress) {
    state.search.progress = progress;
  },
  CLEAR_INTERVAL(state) {
    clearInterval(state.search.setInterval);
  }
};
const actions = {
  async getSearchEncoded({
    commit,
    state
  }, params) {
    // 1.获取搜索的key
    try {
      let searchKey = (await searchEncoded(params)).data.data.searchKey;
      state.search.setInterval = setInterval(async() => {
        let result = (await searchPolling(searchKey)).data.data;
        if (result !== -1) {
          clearInterval(state.search.setInterval);
          await commit('GET_SEARCH_ID', result);
        }
      }, 3000);
    } catch (e) {
      return e;
    }
  },
  async searchGetResult({
    commit
  }, param) {
    let data = (await searchGetResult(param)).data.data.list;
    commit('GET_SEARCH_LIST', data);
  }
};
const getters = {
  search: (state) => state.search
};
export default {
  state,
  actions,
  getters,
  mutations
};
