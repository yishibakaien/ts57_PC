'use strict';

import { baseURL, headers } from '../config/config';
import axios from 'axios';

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
    }
};

const X_TOKEN = 'x-token';
const METHODS = {
    get: 'GET',
    post: 'POST'
};

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

function fetch(method = METHODS.get, data, url) {
    return new Promise((resolve, reject) => {
        axios({
            method: method,
            url: baseURL + url,
            headers: Object.assign({ 'x-token': data[X_TOKEN] || '' }, headers),
            data: _formatData(method, data)
        }).then(res => {
            resolve(res);
        }).catch(res => {
            reject(res);
        });
    });
}

export function login(data) {
    return fetch(METHODS.post, data, API.user.login);
};

export function regiter(data) {
    return fetch(METHODS.post, data, API.user.login);
};
