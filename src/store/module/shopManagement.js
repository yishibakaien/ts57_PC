import {listProducts} from '@/common/api/api.js';

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
    let data = await listProducts(params);
    commit('GET_PRODUCT_LIST', data.lists);
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
