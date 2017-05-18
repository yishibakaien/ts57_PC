import {getDicTree} from '@/common/api/api';

const state = {
  // 数据字典
  dicTree: []
};

const mutations = {
  // 获取数据字典
  GET_DICTREE(state, tree) {
    let result = tree.reduce(function(prev, item) {
      prev[item.typeKey]
        ? prev[item.typeKey].push(item)
        : prev[item.typeKey] = [item];
      return prev;
    }, {});
    // 对大货类型做筛选
    result.PRODUCT_SHAPE = result.PRODUCT_SHAPE.filter(item => ['胚布', '成品'].indexOf(item.name) > -1);
    state.dicTree = result;
  }
};
const actions = {
  // 根据typeKey获取字典列表
  async getDicTree({
    commit
  }, params) {
    let data = await getDicTree(params);
    commit('GET_DICTREE', data.data.data);
  }
};
const getters = {
  dicTree: (state) => state.dicTree
};
export default {
  state,
  getters,
  actions,
  mutations
};
