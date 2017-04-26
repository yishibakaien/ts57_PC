'use strict';

import { baseURL, headers } from '../config/config';
import store from '../../store/store';
import * as types from '../../store/types';
import axios from 'axios';

axios.defaults.baseURL = '/api';

const API = {
	// 用户模块API
	user: {
		reg: '/front/user/reg', // 注册
		login: '/front/user/login', // 登录
		checkPhone: '/front/user/checkPhone', // 检查手机号码
		changeMobile: '/user/changeMobile', // 修改手机号码
		updateUser: '/user/updateUser', // 修改用户信息
		restPasswd: '/user/restPasswd', // 修改密码
		checkPasswd: '/user/checkPasswd', // 校验密码
		changeSMSCode: '/user/changeSMSCode', // 获取修改手机短信
		getVerifyCode: '/front/user/getVerifyCode', // 获取图片验证码
		getFindSMSCode: '/front/user/getFindSMSCode', // 获取找回短信
		getRegSMSCode: '/front/user/getRegSMSCode', // 获取注册短信
		getUserInfo: '/user/getUserInfo' // 获取用户最新信息
	},
  // 首页
  home: {
    listHomeBanners: '/homeBanner/listHomeBanners' // 首页banner
  }
};

const X_TOKEN = 'x-token';
const METHODS = {
	get: 'GET',
	post: 'POST'
};

/**
 * 将data 中的 x-token 删去，并根据 请求类型，格式化data，
 * 根据目前的接口 调试情况，接口的 POST 方法 不能直接在ajax 中传递一个data对象，需要将data
 * 对象 JSON.stringify 之后再进行 POST 传递
 * @param  {string} method            请求方法 GET || POST
 * @param  {object} data              请求的数据，其中包含了 x-token
 * @return {object || string}         格式化后的data
 */
function _formatData(method, data) {
	let _data = Object.assign({}, data);
	try {
		delete _data[X_TOKEN];
	} catch (e) {}
	if (method === METHODS.get) {
		return _data;
	} else if (method === METHODS.post) {
		return JSON.stringify(_data);
	}
}

/**
 * 请求时，可直接将 x-token 放在data 中，这里会判断 x-token 并存入header
 * @param  {string} method  请求方法 GET || POST
 * @param  {object} data    请求参数 data
 * @param  {string} url     api 地址
 * @return {promise}        Promise 对象
 */
function _fetch(method = METHODS.get, data, url) {
	// alert('开始获取数据');
  let _headers = Object.assign({'x-token': store.state.token || ''}, headers);

	let param = {
		method: method,
		url: baseURL + url,
		headers: _headers,
		data: _formatData(method, data)
	};
	// console.log(param);
	return new Promise((resolve, reject) => {
		axios(param).then((res) => {
      console.log('api', res);
      if (res.headers['x-token']) {
        store.commit(types.LOGOUT);
      }
			resolve(res);
		}).catch((res) => {
			console.log('进入了catch');
			reject(res);
		});
	});
}

/**
 * 具体请求方法
 * @param  {object} data  请求参数， 将 x-token 放入data中即可
 * @return {promise}      Promise 对象
 */

// 登录
export function login(data) {
	// alert('调用fetch');
	return _fetch(METHODS.post, data, API.user.login);
};

// 注册
export function register(data) {
	return _fetch(METHODS.post, data, API.user.register);
};

// 校验密码
export function checkPasswd(data) {
	return _fetch(METHODS.post, data, API.user.checkPasswd);
};

// 修改个人信息
export function updateUser(data) {
	return _fetch(METHODS.post, data, API.user.updateUser);
};

// 获取首页banner
export function listHomeBanners(data) {
  return _fetch(METHODS.get, data, API.home.listHomeBanners);
}

// 获取修改手机短信
export function changeSMSCode(data) {
  return _fetch(METHODS.get, data, API.user.changeSMSCode);
}
