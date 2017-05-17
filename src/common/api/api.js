'use strict';
import {baseURL, headers} from '../config/config';
import store from '../../store/store';
import * as types from '../../store/types';
import axios from 'axios';
import Toast from '@/components/common/toast/toast';
//   import OSS from 'ali-oss';
// import fs from 'fs';
axios.defaults.baseURL = '/api';

const API = {
  // 用户模块API
  user: {
    reg: '/front/user/reg', // 注册
    login: '/front/user/login', // 登录
    checkPhone: '/front/user/checkPhone', // 检查手机号码是否存在
    changeMobile: '/user/changeMobile', // 修改手机号码
    updateUser: '/user/updateUser', // 修改用户信息
    restPasswd: '/user/restPasswd', // 修改密码
    checkPasswd: '/user/checkPasswd', // 校验密码
    changeSMSCode: '/user/changeSMSCode', // 获取修改手机短信
    getVerifyCode: '/front/user/getVerifyCode', // 获取图片验证码
    getFindSMSCode: '/front/user/getFindSMSCode', // 获取找回短信
    getRegSMSCode: '/front/user/getRegSMSCode', // 获取注册短信
    getUserInfo: '/user/getUserInfo', // 获取用户最新信息
    getMsgSetting: '/msg/getMsgSetting', // 获取短信设置
    setMsg: '/msg/setMsg' // 设置短信开关
  },
  // 首页
  home: {
    listHomeBanners: '/homeBanner/listHomeBanners', // 首页banner
    findNewCompanyByIndex: '/company/findNewCompanyByIndex' // 获取最新入驻厂家列表
  },
  // 搜索
  search: {
    search: '/product/search' // 文本搜索
  },
  // 供应求购
  buy: {
    listProductBuys: '/productBuy/listHomeProductBuys', // 获取求购列表
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
    listCompanySupplys: '/companySupply/listHomeCompanySupplys', // 获取供应列表
    listBuyTask: '/buyTask/listBuyTask', // 获取接单列表
    myProductBuys: '/productBuy/myProductBuys', // 获取我的求购列表
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
  product: {
    // POST
    listProducts: '/product/listProducts', // 获取花型列表
    addProduct: '/product/addProduct', // 新增花型
    updateProduct: '/product/updateProduct', // 修改花型
    shelveProduct: '/product/shelveProduct', // 花型上下架
    deleteProduct: '/product/deleteProduct', // 删除花型
    getProduct: '/product/getProduct' // 修改成分
  },
  // 成分
  ingredient: {
    addIngredient: '/ingredient/addIngredient', // 自定义成分
    deleteIngredient: '/ingredient/deleteIngredient', // 删除成分
    listIngredients: '/ingredient/listIngredients', // 获取成分列表
    updateIngredient: '/ingredient/updateIngredient' // 修改成分
  },
  // 供应
  companySupply: {
    closeCompanySupply: '/companySupply/closeCompanySupply', // 关闭供应
    releaseCompanySupply: '/companySupply/releaseCompanySupply', // 发布供应
    listMyCompanySupplys: '/companySupply/listMyCompanySupplys', // 我的供应列表
    getCompanySupply: '/companySupply/getCompanySupply', // 供应详情
    getSupplyByFavList: '/companySupply/getSupplyByFavList' // 获取供应收藏人列表
  },
  // 素材库
  albumPic: {
    listAlbumPics: '/albumPic/listAlbumPics', // 获取素材库图片列表
    deleteAlbumPic: '/albumPic/deleteAlbumPic' // 删除素材库图片,
  },
  // 花型分类
  productCategory: {
    listSystemProductCategory: '/productCategory/listSystemProductCategory', // 系统定义花型分类列表
    deleteProductCategory: '/productCategory/deleteProductCategory', // 删除花型分类
    listUserProductCategory: '/productCategory/listUserProductCategory', // 自定义花型分类列表
    addProductCategory: '/productCategory/addProductCategory', // 新增花型分类
    updateProductCategory: '/productCategory/updateProductCategory', // 修改花型分类
    sortProductCategory: '/productCategory/sortProductCategory', // 花型分类排序
    listBindingProduct: '/productCategoryBanding/listBindingProduct', // 获取分类绑定的花型列表
    bindingProduct: '/productCategoryBanding/bindingProduct', // 花型分类绑定解绑
    sortBindingProduct: '/productCategoryBanding/sortBindingProduct' // 分类中的花型排序
  },
  // 公司
  company: {
    getCompanyInfo: '/company/getCompanyInfo', // 获取档口OR工厂信息
    updateCompany: '/company/updateCompany', // 修改工厂或档口信息
    getCompanyAptitude: '/companyAptitude/getCompanyAptitude', // 查询公司资质信息
    saveCompanyAptitude: '/companyAptitude/saveCompanyAptitude', // 修改公司资质信息
    updateCompanyExtend: '/company/updateCompanyExtend' // 修改工厂或档口详细信息
  },
  // 数据字典
  dicTree: {
    byTypeKey: '/front/dicTree/byTypeKey'
  },
  // 地理区域
  area: {
    byLevel: '/front/area/byLevel',
    byParent: '/front/area/byParent'
  },
  enquiry: {
    getEnquiryList: '/enquiry/list', // 询价列表
    enquiryEskUser: '/enquiry/askUser', // 询价人详情
    getAskListByProductId: '/enquiry/getAskListByProductId' // 根据产品ID获取询价记录
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
  //  console.log('请求data', data);
  if (!data) {
    //      console.log('请求data为空', data);
    return '';
  }
  let _data = Object.assign({}, data);
  if (method === METHODS.get) {
    //      console.log('get请求data', _data);
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
  // console.info('api-ajaxToken', store.state.ajaxToken);
  let _headers = Object.assign({
    'x-token': store.state.ajaxToken || ''
  }, headers);
  if (url === API.user.login) {
    // 如果是登录的请求则删除掉请求头中的x-token
    try {
      //    delete _headers['x-token'];
    } catch (e) {}
  }
  let param;
  if (method === METHODS.get) {
    param = {
      method: method,
      url: baseURL + url,
      headers: _headers,
      params: _formatData(method, data)
    };
  }
  if (method === METHODS.post) {
    param = {
      method: method,
      url: baseURL + url,
      headers: _headers,
      data: _formatData(method, data)
    };
  }
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
      if (res.data.message) {
        Toast({
          type: !res.data.code
            ? 'success'
            : 'error',
          message: res.data.message
        });
      }
      if (res.data.code === 210018) {
        store.commit(types.LOGOUT);
      }
      //			if (res.data.code !== 0 && res.data.message) {
      // if (res.data.message) {
      // store.commit(types.MODEL_SHOW, true);
      // store.commit(types.MODEL_OPTION, {
      //   type: 2,
      //   title: '提示',
      //   content: res.data.message
      // });
      // }
      resolve(res);
    }).catch((res) => {
      Toast.error('请检查网络');
      reject(res);
    });
  });
}

/**
 * 具体请求方法
 * @param  {object} data  请求参数， 将 x-token 放入data中即可
 * @return {promise}      Promise 对象
 */
/**
 * 用户部分
 */
// 登录
export function login(data) {
  // alert('调用fetch');
  return _fetch(METHODS.post, data, API.user.login);
};

// 注册
export function reg(data) {
  return _fetch(METHODS.post, data, API.user.reg);
};

// 找回密码
export function findPassWd(data) {
  return _fetch(METHODS.post, data, API.user.findPassWd);
};

// 获取找回密码短信验证码
export function getFindSMSCode(data) {
  return _fetch(METHODS.post, data, API.user.getFindSMSCode);
};

// 校验密码
export function checkPasswd(data) {
  return _fetch(METHODS.post, data, API.user.checkPasswd);
};

// 获取图形验证码
export function getVerifyCode(data) {
  return _fetch(METHODS.post, data, API.user.getVerifyCode);
};

// 修改个人信息
export function updateUser(data) {
  return _fetch(METHODS.post, data, API.user.updateUser);
};

// 获取用户信息
export function getUserInfo(data) {
  return _fetch(METHODS.post, data, API.user.getUserInfo);
};

// 检验手机号码是否存在
export function checkPhone(data) {
  return _fetch(METHODS.get, data, API.user.checkPhone);
};

// 获取注册短信验证码
export function getRegSMSCode(data) {
  return _fetch(METHODS.post, data, API.user.getRegSMSCode);
};
/**
 * 首页部分
 */
// 获取首页banner
export function listHomeBanners(data) {
  return _fetch(METHODS.get, data, API.home.listHomeBanners);
};

// 获取求购列表
export function listProductBuys(data) {
  return _fetch(METHODS.get, data, API.buy.listProductBuys);
}

// 获取供应列表
export function listCompanySupplys(data) {
  return _fetch(METHODS.get, data, API.buy.listCompanySupplys);
}

export function findNewCompanyByIndex(data) {
  return _fetch(METHODS.post, data, API.home.findNewCompanyByIndex);
}

// 优质厂家
export function qualityCompanyList1(data) {
  return _fetch(METHODS.get, data, API.home.qualityCompanyList);
}

/**
 * 搜索部分
 */
// 文本搜索
export function searchMtd(data) {
  return _fetch(METHODS.post, data, API.search.search);
}

/**
 * 个人中心部分
 */
// 获取修改手机短信
export function changeSMSCode(data) {
  return _fetch(METHODS.post, data, API.user.changeSMSCode);
};

// 设置短信
export function setMsg(data) {
  return _fetch(METHODS.post, data, API.user.setMsg);
};

// 获取短信设置
export function getMsgSetting(data) {
  return _fetch(METHODS.get, data, API.user.getMsgSetting);
};

// 修改手机号
export function changeMobile(data) {
  return _fetch(METHODS.post, data, API.user.changeMobile);
};

// 修改密码
export function restPasswd(data) {
  return _fetch(METHODS.post, data, API.user.restPasswd);
};

// 获取接单列表
export function listBuyTask(data) {
  return _fetch(METHODS.post, data, API.buy.listBuyTask);
};

// 获取我的求购列表
export function myProductBuys(data) {
  return _fetch(METHODS.post, data, API.buy.myProductBuys);
};

// 获取收藏花型列表
export function listProduct(data) {
  return _fetch(METHODS.post, data, API.collection.listProduct);
};

// 获取收藏厂家列表
export function listCompany(data) {
  return _fetch(METHODS.post, data, API.collection.listCompany);
};

// 获取收藏供应列表
export function listSupply(data) {
  return _fetch(METHODS.post, data, API.collection.listSupply);
};

// 获取收藏供应各分类统计
export function countSupply(data) {
  return _fetch(METHODS.get, data, API.collection.countSupply);
};

// 获取收藏花型各分类统计
export function countProduct(data) {
  return _fetch(METHODS.get, data, API.collection.countProduct);
};

// 收藏或取消
export function favoriteBus(data) {
  return _fetch(METHODS.post, data, API.collection.favoriteBus);
};

// 关闭求购
export function closeProductBuy(data) {
  return _fetch(METHODS.post, data, API.buy.closeProductBuy);
}

// 获取oss_token
export function token() {
  return _fetch(METHODS.post, {
    fileType: 1
  }, API.oss.token);
};
// 获取数据字典
export const getDicTree = param => _fetch(METHODS.get, param, API.dicTree.byTypeKey);
// 根据级别获取信息
export const getAreabyLevel = param => _fetch(METHODS.get, param, API.area.byLevel);
// 根据父级编码获取信息
export const getAreabyParent = param => _fetch(METHODS.get, param, API.area.byParent);
// =======
// 店铺管理
// =======
// 询价列表
export const getEnquiryList = param => _fetch(METHODS.post, param, API.enquiry.getEnquiryList);
// 询价人详情
export const enquiryEskUser = param => _fetch(METHODS.get, param, API.enquiry.enquiryEskUser);
// 根据产品ID获取询价记录
export const getAskListByProductId = param => _fetch(METHODS.get, param, API.enquiry.getAskListByProductId);
// 查询公司资质信息
export const getCompanyAptitude = param => _fetch(METHODS.get, param, API.company.getCompanyAptitude);
// 修改公司资质信息
export const saveCompanyAptitude = param => _fetch(METHODS.post, param, API.company.saveCompanyAptitude);
// 修改工厂或档口详细信息
export const updateCompanyExtend = param => _fetch(METHODS.post, param, API.company.updateCompanyExtend);
// 获取花型列表
export const getProductList = param => _fetch(METHODS.post, param, API.product.listProducts);
// 获取花型详情
export const getProduct = id => _fetch(METHODS.get, null, `${API.product.getProduct}/${id}`);
// 新增花型
export const addProducts = param => _fetch(METHODS.post, param, API.product.addProduct);
// 修改花型
export const updateProduct = param => _fetch(METHODS.post, param, API.product.updateProduct);
// 花型上下架
export const shelveProduct = param => _fetch(METHODS.post, param, API.product.shelveProduct);
// 删除花型
export const deleteProduct = param => _fetch(METHODS.post, param, API.product.deleteProduct);
// 获取成分列表
export const getIngredientsList = param => _fetch(METHODS.get, param, API.ingredient.listIngredients);
// 自定义成分
export const addIngredient = param => _fetch(METHODS.post, param, API.ingredient.addIngredient);
// 修改成分
export const updateIngredient = param => _fetch(METHODS.post, param, API.ingredient.updateIngredient);
// 删除成分
export const deleteIngredient = param => _fetch(METHODS.post, param, API.ingredient.deleteIngredient);
// 我的供应列表
export const getCompanySupplylist = param => _fetch(METHODS.get, param, API.companySupply.listMyCompanySupplys);
// 获取供应收藏人列表
export const getSupplyByFavList = param => _fetch(METHODS.get, param, API.companySupply.getSupplyByFavList);
// 关闭供应
export const closeCompanySupply = param => _fetch(METHODS.post, param, API.companySupply.closeCompanySupply);
// 获取供应详情
export const getCompanySupply = id => _fetch(METHODS.get, null, `${API.companySupply.getCompanySupply}/${id}`);
// 发布供应
export const releaseCompanySupply = param => _fetch(METHODS.post, param, API.companySupply.releaseCompanySupply);
// 获取素材库图片列表
export const getAlbumPicsList = param => _fetch(METHODS.post, param, API.albumPic.listAlbumPics);
// 删除素材库图片
export const deleteAlbumPic = param => _fetch(METHODS.post, param, API.albumPic.deleteAlbumPic);
// 获取档口OR工厂信息
export const getCompanyInfo = param => _fetch(METHODS.get, param, API.company.getCompanyInfo);
// 修改工厂或档口信息
export const updateCompany = param => _fetch(METHODS.post, param, API.company.updateCompany);
// 获取系统定义花型分类列表
export const listSystemProductCategory = param => _fetch(METHODS.get, param, API.productCategory.listSystemProductCategory);
// 获取自定义花型分类列表
export const listUserProductCategory = param => _fetch(METHODS.post, param, API.productCategory.listUserProductCategory);
// 获取分类绑定的花型列表
export const getBindingProductlist = param => _fetch(METHODS.get, param, API.productCategory.listBindingProduct);
// 新增花型分类
export const addProductCategory = param => _fetch(METHODS.post, param, API.productCategory.addProductCategory);
// 修改花型分类
export const updateProductCategory = param => _fetch(METHODS.post, param, API.productCategory.updateProductCategory);
// 花型分类绑定解绑
export const bindingProduct = param => _fetch(METHODS.get, param, API.productCategory.bindingProduct);
// 花型分类排序
export const sortProductCategory = param => _fetch(METHODS.get, param, API.productCategory.sortProductCategory);
// 分类中的花型排序
export const sortBindingProduct = param => _fetch(METHODS.get, param, API.productCategory.sortBindingProduct);
// 删除花型分类
export const deleteProductCategory = param => _fetch(METHODS.post, param, API.productCategory.deleteProductCategory);
