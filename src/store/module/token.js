import {cookie} from '@/common/js/utils.js';
import {COOKIE_DOMAIN} from '@/common/dict/const';
const state = {
  // token
  token: ''
};
let cookieDomain = process.env.NODE_ENV === 'production'
  ? COOKIE_DOMAIN
  : '';
const mutations = {
  LOGIN_OUT(state) {
    state.token = '';
    cookie.del('x-token', '/', cookieDomain);
  },
  LOGIN(state, data) {
    state.token = data;
    cookie.set('x-token', data, 7, '/', cookieDomain);
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
