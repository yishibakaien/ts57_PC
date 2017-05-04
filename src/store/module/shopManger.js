import {getProductList} from '@/common/api/api';

const state = {
  // 花型列表
  listProducts: []
};

const mutations = {
  // 获取花型列表
  GET_PRODUCT_LIST(state, listProducts) {
    state.listProducts = listProducts;
  }
};
const actions = {
    // 获取花型列表
  async getProductList({
    commit
  }, params) {
    let data = await getProductList(params);
    commit('GET_PRODUCTLIST', data.records);
  }
};
const getters = {
  productList: (state) => state.productList
};
export default {
  state,
  getters,
  actions,
  mutations
};
