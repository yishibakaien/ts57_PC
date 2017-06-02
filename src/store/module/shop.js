import {getCompanyInfo, getIngredientsList, getCompanyAptitude, getProduct} from '@/common/api/api.js';

const state = {
  // 成分列表
  ingredientList: {},
  // 企业信息 => 用于店铺管理
  companyInfo: {},
  // 企业资质
  aptitude: {},
  // 花型详情
  productDetail: {}
  // 用户店铺信息=>不能与companySimpleInfo合并
  // CompanyInfoByUserId: {}
};

const mutations = {
  // 成分列表
  GET_INGREDIENTS_LIST(state, ingredientList) {
    state.ingredientList = ingredientList.data;
  },
  // 成分列表
  GET_PRODUCT(state, detail) {
    state.productDetail = detail;
  },
  // 工厂信息
  GET_COMPANY_INFO(state, info) {
    for (let i in info) {
      if (info[i] === '') {
        info[i] = '无';
      }
      if (['lat', 'lng'].indexOf(i) >= 0) {
        info[i] = '';
      }
      state.companyInfo = info;
    }
  },
  // 资质信息
  GET_APTITUDE(state, aptitude) {
    state.aptitude = aptitude;
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
  // 获取成分列表
  async getIngredientsList({commit}) {
    let data = await getIngredientsList();
    commit('GET_INGREDIENTS_LIST', data.data);
  },
  // 获取企业资质信息
  async getCompanyAptitude({commit}) {
    let data = await getCompanyAptitude();
    commit('GET_APTITUDE', data.data.data);
  },
  // 花型详情
  async getProduct({
    commit
  }, params) {
    let data = await getProduct(params);
    commit('GET_PRODUCT', data.data.data);
  }
};
const getters = {
  companyInfo: (state) => state.companyInfo,
  ingredientList: (state) => state.ingredientList,
  aptitude: (state) => state.aptitude,
  productDetail: (state) => state.productDetail
};
export default {
  state,
  getters,
  actions,
  mutations
};
