import {getCompanyInfo, getIngredientsList} from '@/common/api/api.js';

const state = {
  // 成分列表
  ingredientList: {},
  companyInfo: {}
};

const mutations = {
  // 成分列表
  GET_INGREDIENTS_LIST(state, ingredientList) {
    state.ingredientList = ingredientList.data;
  },
  // 工厂信息
  GET_COMPANY_INFO(state, info) {
    state.companyInfo = info;
  }
};
const actions = {
  // 获取档口OR工厂信息
  async getCompanyInfo({
    commit
  }, params) {
    let data = await getCompanyInfo(params);
    commit('GET_COMPANY_INFO', data.data);
  },
  // 获取成分列表
  async getIngredientsList({commit}) {
    let data = await getIngredientsList();
    commit('GET_INGREDIENTS_LIST', data.data);
  }
};
const getters = {
  companyInfo: (state) => state.companyInfo,
  ingredientList: (state) => state.ingredientList
};
export default {
  state,
  getters,
  actions,
  mutations
};
