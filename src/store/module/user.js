import {getUserInfo} from '@/common/api/api';
const state = {
  // 用户信息
  userInfo: {}
};

const mutations = {
  GET_USERINFO(state, userInfo) {
    state.userInfo = userInfo;
  }
};
const actions = {
  // 获取企业资质信息
  async getUserInfo({commit}) {
    let data = await getUserInfo();
    commit('GET_USERINFO', data.data.data);
  }
};
const getters = {
  userInfo: (state) => state.userInfo
};
export default {
  state,
  actions,
  getters,
  mutations
};
