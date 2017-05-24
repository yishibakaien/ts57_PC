import {getCompanyInfo, getIngredientsList, getCompanyAptitude, getCompanySimpleInfo, getCompanyInfoByUserId} from '@/common/api/api.js';

const state = {
  // 成分列表
  ingredientList: {},
  // 企业信息 => 用于店铺管理
  companyInfo: {},
  // 企业资质
  aptitude: {},
  // 店铺简单信息 => 用于店铺访问
  companySimpleInfo: {}
};

const mutations = {
  // 成分列表
  GET_INGREDIENTS_LIST(state, ingredientList) {
    state.ingredientList = ingredientList.data;
  },
  // 工厂信息
  GET_COMPANY_INFO(state, info) {
    state.companyInfo = info;
  },
  // 资质信息
  GET_APTITUDE(state, aptitude) {
    state.aptitude = aptitude;
  },
  GET_COMPANY_SIMPLE_INFO(state, info) {
    state.companySimpleInfo = info;
  },
  GET_COMPANY_INFO_USER(state, usrInfo) {
    state.companySimpleInfo = Object.assign({}, state.companySimpleInfo, usrInfo);
    for (let i in state.companySimpleInfo) {
      if (!state.companySimpleInfo[i]) {
        state.companySimpleInfo[i] = '无';
      }
      if (['lat', 'lng', 'presence'].indexOf(i) >= 0) {
        state.companySimpleInfo[i] = '';
      }
    }
  }
};
const actions = {
  // 获取档口OR工厂信息
  async getCompanyInfo({
    commit
  }, params) {
    let data = await getCompanyInfo(params);
    commit('GET_COMPANY_INFO', data.data.data);
  },
  // 获取简单店铺或工厂信息
  async getCompanySimpleInfo({
    commit
  }, params) {
    let data = await getCompanySimpleInfo({id: params});
    commit('GET_COMPANY_SIMPLE_INFO', data.data.data);
  },
  // 获取用户的店铺信息
  async getCompanyInfoByUserId({
    commit
  }, params) {
    let data = await getCompanyInfoByUserId({userId: params});
    commit('GET_COMPANY_INFO_USER', data.data.data);
  },
  // 获取成分列表
  async getIngredientsList({commit}) {
    let data = await getIngredientsList();
    commit('GET_INGREDIENTS_LIST', data.data);
  },
  // 获取成分列表
  async getCompanyAptitude({commit}) {
    let data = await getCompanyAptitude();
    commit('GET_APTITUDE', data.data.data);
  }
};
const getters = {
  companyInfo: (state) => state.companyInfo,
  ingredientList: (state) => state.ingredientList,
  aptitude: (state) => state.aptitude,
  companySimpleInfo: (state) => state.companySimpleInfo
};
export default {
  state,
  getters,
  actions,
  mutations
};
