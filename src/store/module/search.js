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
    try {
      let searchKey = (await searchEncoded(params)).data.data.searchKey;
      let setInterValFind = setInterval(async() => {
        let result = (await searchPolling(searchKey)).data.data;
        if (result !== -1) {
          let param = {
            id: result = 110,
            pageNo: 1,
            pageSize: 10
          };
          clearInterval(setInterValFind);
          await commit('GET_SEARCH_ID', result);
          await actions.searchGetResult(state, param);
        }
      }, 3000);
    } catch (e) {
      console.log(e);
    }
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
