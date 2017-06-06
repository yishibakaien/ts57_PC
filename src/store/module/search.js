import {searchGetResult, searchEncoded, searchPolling} from '@/common/api/api';
//
const state = {
  // 搜索-BASE64文本
  search: {
    id: '',
    list: ''
  }
};

const mutations = {
  GET_SEARCH_LIST(state, info) {
    state.search.list = info;
  },
  GET_SEARCH_ID(state, id) {
    state.search.id = id;
  }
};
const actions = {
  async getSearchEncoded({
    commit
  }, params) {
    // 1.获取搜索的key
    let searchKey = (await searchEncoded(params)).data.data.searchKey;
    let setInterValFind = setInterval(async() => {
      let result = (await searchPolling(searchKey)).data.data;
      if (result !== -1) {
        let param = {
          id: result,
          pageNo: 1,
          pageSize: 10
        };
        actions.searchGetResult(param);
        clearInterval(setInterValFind);
        commit('GET_SEARCH_ID', result);
      }
    }, 3000);
  },
  async searchGetResult({
    commit
  }, param) {
    let data = (await searchGetResult(param)).data.data;
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
