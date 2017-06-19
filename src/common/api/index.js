import axios from 'axios';
import store from '@/store/store';
import Toast from '@/components/common/toast/toast';
import {cookie} from '@/common/js/utils.js';
// x-client
axios.defaults.headers['x-client'] = 1;
// https://api.ts57.cn
// http://192.168.2.11:8080
axios.defaults.baseURL = process.env.NODE_ENV === 'production'
  ? 'https://api.ts57.cn'
  : 'http://192.168.2.11:8080';
// x-token
axios.defaults.headers['x-token'] = cookie.get('x-token') || '';
store.commit('LOGIN', axios.defaults.headers['x-token'] || '');
// ==============
axios.interceptors.request.use(config => {
  axios.defaults.headers['x-token'] = cookie.get('x-token') || '';
  return config;
}, err => {
  return Promise.reject(err);
});
// ==============
// http response 拦截器
axios.interceptors.response.use(response => {
  if (response.data.code === 210018) {
    store.commit('LOGIN_OUT');
    return;
  }
  if (response.status === 200) {
    if (response.data.message && !response.data.code) {
      Toast({type: 'success', message: response.data.message});
    }
    return response;
  } else {
    Toast({type: 'error', message: response.statusText});
    return Promise.reject(response.statusText);
  }
});
