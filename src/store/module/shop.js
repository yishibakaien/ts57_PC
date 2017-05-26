import {getCompanyInfo, getIngredientsList, getCompanyAptitude} from '@/common/api/api.js';

const state = {
  // 成分列表
  ingredientList: {},
  // 企业信息 => 用于店铺管理
  companyInfo: {},
  // 企业资质
  aptitude: {}
  // 店铺简单信息 => 用于店铺访问
  // companySimpleInfo: {},
  // 用户店铺信息=>不能与companySimpleInfo合并
  // CompanyInfoByUserId: {}
};

const mutations = {
  // 成分列表
  GET_INGREDIENTS_LIST(state, ingredientList) {
    state.ingredientList = ingredientList.data;
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
  // GET_COMPANY_SIMPLE_INFO(state, info) {
  //   state.companySimpleInfo = info;
  // },
  // GET_COMPANY_INFO_USER(state, usrInfo) {
  //   for (let i in usrInfo) {
  //     if (!usrInfo[i]) {
  //       usrInfo[i] = '无';
  //     }
  //     if (['lat', 'lng', 'presence'].indexOf(i) >= 0) {
  //       usrInfo[i] = '';
  //     }
  //   }
  //   state.CompanyInfoByUserId = usrInfo;
  // }
};
const actions = {
  // 获取档口OR工厂信息
  async getCompanyInfo({
    commit
  }, params) {
    let data = await getCompanyInfo(params);
    commit('GET_COMPANY_INFO', data.data.data);
  },
  // // 获取简单店铺或工厂信息
  // async getCompanySimpleInfo({
  //   commit
  // }, params) {
  //   let data = await getCompanySimpleInfo({id: params});
  //   commit('GET_COMPANY_SIMPLE_INFO', data.data.data);
  // },
  // // 获取用户的店铺信息
  // async getCompanyInfoByUserId({
  //   commit
  // }, params) {
  //   let data = await getCompanyInfoByUserId({userId: params});
  //   commit('GET_COMPANY_INFO_USER', data.data.data);
  // },
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
  aptitude: (state) => state.aptitude
  // companySimpleInfo: (state) => state.companySimpleInfo,
  // CompanyInfoByUserId: (state) => state.CompanyInfoByUserId
};
export default {
  state,
  getters,
  actions,
  mutations
};
