const state = {
  // token
  token: ''
};

const mutations = {
  LOGIN_OUT(state) {
    state.token = '';
    localStorage.removeItem('x-token');
  },
  LOGIN(state, data) {
    state.token = data;
    localStorage.setItem('x-token', data);
  }
};
const getters = {
  token: (state) => state.token
};
export default {
  state,
  getters,
  mutations
};
