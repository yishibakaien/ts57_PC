import axios from 'axios';
import store from '@/store/store';
import Toast from '@/components/common/toast/toast';
// x-client
axios.defaults.headers['x-client'] = 1;
// http://api.tswq.wang
axios.defaults.baseURL = 'http://192.168.2.11';
// x-token
axios.defaults.headers['x-token'] = localStorage.getItem('x-token') || '';
store.commit('LOGIN', axios.defaults.headers['x-token'] || '');
axios.interceptors.request.use(config => {
  axios.defaults.headers['x-token'] = localStorage.getItem('x-token') || '';
  return config;
}, err => {
  return Promise.reject(err);
});
// http response 拦截器
axios.interceptors.response.use(response => {
  if (response.data.code === 210018) {
    store.commit('LOGIN_OUT');
    return;
  }
  if (response.status === 200) {
    if (response.data.message && response.data.code !== 0) {
      Toast({
        type: !response.data.code
          ? 'success'
          : 'error',
        message: response.data.message
      });
    }
    return response;
  } else {
    Toast({type: 'error', message: response.statusText});
    return Promise.reject(response.statusText);
  }
});
