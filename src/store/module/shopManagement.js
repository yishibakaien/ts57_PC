import {getProductList, getIngredientsList} from '@/common/api/api.js';

const state = {
  // 花型列表
  productList: [],
  // 成分列表
  ingredientList: []
};

const mutations = {
  // 花型列表
  GET_PRODUCT_LIST(state, list) {
    state.productList = list;
  },
  // 成分列表
  GET_INGREDIENTS_LIST(state, ingredientList) {
    state.ingredientList = ingredientList.data;
  }
};
const actions = {
  // 获取花型列表
  async getProductList({
    commit
  }, params) {
    let data = await getProductList(params);
    commit('GET_PRODUCT_LIST', data.data);
  },
  // 获取成分列表
  async getIngredientsList({commit}) {
    let data = await getIngredientsList();
    commit('GET_INGREDIENTS_LIST', data.data);
  }
};
const getters = {
  productList: (state) => state.productList,
  ingredientList: (state) => state.ingredientList
};
export default {
  state,
  getters,
  actions,
  mutations
};
