import {getProductList, getIngredientsList, getCompanySupplylist, getAlbumPicsList} from '@/common/api/api.js';

const state = {
  // 花型列表
  productList: {},
  // 成分列表
  ingredientList: {},
  // 获取供应列表
  companySupplyList: {},
  // 获取素材库图片列表
  albumPicsList: {}
};

const mutations = {
  // 花型列表
  GET_PRODUCT_LIST(state, list) {
    state.productList = list;
  },
  // 成分列表
  GET_INGREDIENTS_LIST(state, ingredientList) {
    state.ingredientList = ingredientList.data;
  },
  // 获取供应列表
  GET_COMPANY_SUPPLY_LIST(state, list) {
    state.companySupplyList = list;
  },
  // 获取素材库图片列表
  GET_ALBUM_PICS_LIST(state, list) {
    state.albumPicsList = list;
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
  },
  // 获取供应列表
  async getCompanySupplylist({
    commit
  }, params) {
    let data = await getCompanySupplylist(params);
    commit('GET_COMPANY_SUPPLY_LIST', data.data);
  },
  // 获取素材库图片列表
  async getAlbumPicsList({
    commit
  }, params) {
    let data = await getAlbumPicsList(params);
    commit('GET_ALBUM_PICS_LIST', data.data);
  }
};
const getters = {
  productList: (state) => state.productList,
  ingredientList: (state) => state.ingredientList,
  companySupplyList: (state) => state.companySupplyList,
  albumPicsList: (state) => state.albumPicsList
};
export default {
  state,
  getters,
  actions,
  mutations
};
