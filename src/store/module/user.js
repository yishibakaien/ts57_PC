const state = {
  // 用户信息
  userInfo: {}
};

const mutations = {
  GET_USERINFO(state, userInfo) {
    state.userInfo = userInfo;
  }
};
const getters = {
  userInfo: (state) => state.userInfo
};
export default {
  state,
  getters,
  mutations
};
