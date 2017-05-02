'use strict';
import { baseURL, headers } from '../config/config';
import store from '../../store/store';
import * as types from '../../store/types';
import axios from 'axios';
//   import OSS from 'ali-oss';
// import fs from 'fs';
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
	},
	// 供应求购
	buy: {
		listProductBuys: '/productBuy/listProductBuys', // 获取求购列表
		getCompanySupply: '/companySupply/getCompanySupply', // 供应详情
		closeProductBuy: '/productBuy/closeProductBuy', // 关闭求购
		deleteCompanySupply: '/companySupply/deleteCompanySupply', // 删除供应
		deleteBuyTask: '/buyTask/deleteBuyTask', // 删除接单
		deleteProductBuy: '/productBuy/deleteProductBuy', // 删除求购
		releaseCompanySupply: '/companySupply/releaseCompanySupply', // 发布供应
		releaseProductBuy: '/productBuy/releaseProductBuy', // 发布求购
		cancelBuyTask: '/buyTask/cancelBuyTask', // 取消接单
		finishProductBuy: '/productBuy/finishProductBuy', // 完成接单
		orderBuyTask: '/buyTask/orderBuyTask', // 接单
		getBuyTask: '/buyTask/getBuyTask', // 接单详情
		getProductBuy: '/productBuy/getProductBuy', // 求购详情
		listCompanySupplys: '/companySupply/listCompanySupplys', // 获取供应列表
		listBuyTask: '/buyTask/listBuyTask', // 获取接单列表
		listBuyTaskByBuyId: '/buyTask/listBuyTaskByBuyId' // 获取求购单接单列表
	},
	// 收藏管理
	collection: {
		batchCancel: '/favorite/batchCancel', // 批量取消收藏
		favoriteBus: '/favorite/favoriteBus', // 收藏或取消
		listSupply: 'favorite/listSupply', // 获取收藏供应列表
		listCompany: '/favorite/listCompany', // 获取收藏厂家列表
		listProduct: '/favorite/listProduct' // 获取收藏花型列表
	},
	oss: {
		token: '/file/token' // OSS_token
	}
};

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
    if (!data) {
        return '';
    }
    let _data = Object.assign({}, data);
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
	console.info('api-ajaxToken', store.state.ajaxToken);
	let _headers = Object.assign({ 'x-token': store.state.ajaxToken || '' }, headers);
	if (url === API.user.login) {
		// 如果是登录的请求则删除掉请求头中的x-token
		try {
			delete _headers['x-token'];
		} catch (e) {}
	}
	let param = {
		method: method,
		url: baseURL + url,
		headers: _headers,
		data: _formatData(method, data),
		timeout: 1500
	};
	return new Promise((resolve, reject) => {
		axios(param).then((res) => {
			let token = res.headers['x-token'];
			if (token) {
				store.commit(types.AJAX, token);
				// 让ajaxToken 和 accessToken 保持一致
				if (store.state.accessToken) {
					store.commit(types.LOGIN, token);
				}
			}
			if (res.data.code !== 0 && res.data.message) {
				store.commit(types.MODEL_SHOW, true);
				store.commit(types.MODEL_OPTION, {type: 2, title: '提示', content: res.data.message});
			}
			resolve(res);
		}).catch((res) => {
			store.commit(types.MODEL_OPTION, {type: 1, title: '提示', content: '请检查网络'});
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

// 获取用户信息
export function getUserInfo(data) {
	return _fetch(METHODS.post, data, API.user.getUserInfo);
}

// 获取首页banner
export function listHomeBanners(data) {
	return _fetch(METHODS.get, data, API.home.listHomeBanners);
}

// 获取修改手机短信
export function changeSMSCode(data) {
	return _fetch(METHODS.post, data, API.user.changeSMSCode);
}

// 修改手机号
export function changeMobile(data) {
	return _fetch(METHODS.post, data, API.user.changeMobile);
}

// 修改密码
export function restPasswd(data) {
	return _fetch(METHODS.post, data, API.user.restPasswd);
}

// 获取求购列表
export function listProductBuys(data) {
	return _fetch(METHODS.get, data, API.buy.listProductBuys);
}

// 获取接单列表
export function listBuyTask(data) {
	return _fetch(METHODS.post, data, API.buy.listBuyTask);
}

// 获取收藏花型列表
export function listProduct(data) {
	return _fetch(METHODS.post, data, API.collection.listProduct);
}

// 关闭求购
export function closeProductBuy(data) {
	return _fetch(METHODS.post, data, API.buy.closeProductBuy);
}

// 获取oss_token
export function token() {
	return _fetch(METHODS.post, { fileType: 1 }, API.oss.token);
}
