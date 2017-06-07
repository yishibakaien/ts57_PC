import axios from 'axios';
const API = {
  // 用户模块API
  user: {
    reg: '/front/user/reg', // 注册
    login: '/front/user/login', // 登录
    checkPhone: '/front/user/checkPhone', // 检查手机号码是否存在
    changeMobile: '/user/changeMobile', // 修改手机号码
    updateUser: '/user/updateUser', // 修改用户信息
    restPasswd: '/user/restPasswd', // 修改密码
    getUserSimpleInfo: '/user/getUserSimpleInfo', // 修改密码
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
    findNewCompanyByIndex: '/company/findNewCompanyByIndex', // 获取最新入驻厂家列表
    qualityCompanyList: '/company/qualityCompanyList' // 优质厂家列表
  },
  // 搜索
  search: {
    search: '/product/search', // 文本搜索
    encoded: '/search/encoded',
    polling: '/search/polling', // 搜索结果检查
    companySearch: '/company/search', // 文本搜索--公司搜索
    getResult: '/search/getResult', // 文本搜索
    history: '/search/history' // 搜索记录列表(大家都在找)
  },
  // 索样
  sample: {
    askFor: '/sample/askFor'
  },
  // 供应求购
  buy: {
    listProductBuys: '/productBuy/listHomeProductBuys', // 获取求购列表
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
    listBuyTaskByBuyId: '/buyTask/listBuyTaskByBuyId', // 获取求购单接单列表
    listBuyTaskUserByBuyId: '/buyTask/listBuyTaskUserByBuyId', // 获取求购单接单人列表
    listUserProductBuys: '/productBuy/listUserProductBuys' // 获取用户求购列表
  },
  // 收藏管理
  collection: {
    batchCancel: '/favorite/batchCancel', // 批量取消收藏
    isFavorite: '/favorite/isFavorite', // 判断是否已收藏
    favoriteBus: '/favorite/favoriteBus', // 收藏或取消
    listSupply: 'favorite/listSupply', // 获取收藏供应列表
    listCompany: '/favorite/listCompany', // 获取收藏厂家列表
    listProduct: '/favorite/listProduct', // 获取收藏花型列表
    countProduct: '/favorite/countProduct', // 统计收藏花型各分类数量
    countSupply: '/favorite/countSupply' // 统计收藏供应各分类数量
  },
  product: {
    // POST
    listProducts: '/product/listProducts', // 获取花型列表
    addProduct: '/product/addProduct', // 新增花型
    updateProduct: '/product/updateProduct', // 修改花型
    shelveProduct: '/product/shelveProduct', // 花型上下架
    deleteProduct: '/product/deleteProduct', // 删除花型
    getCompanyNewProductlist: '/product/listCompanyNewProduct', // 厂家上新
    burstHotSearch: '/search/burstHot', // 爆款热搜列表
    listVistitCompanyProducts: '/product/listVistitCompanyProducts', // 获取店铺花型列表
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
    countByStatus: '/companySupply/countByStatus', // 统计不同供应状态的数量
    releaseCompanySupply: '/companySupply/releaseCompanySupply', // 发布供应
    listMyCompanySupplys: '/companySupply/listMyCompanySupplys', // 我的供应列表
    getCompanySupply: '/companySupply/getCompanySupply', // 供应详情
    listVisitCompanySupplys: '/companySupply/listVisitCompanySupplys', // 店铺供应列表
    getSupplyByFavList: '/companySupply/getSupplyByFavList', // 获取供应收藏人列表
    listUserCompanySupplys: '/companySupply/listUserCompanySupplys' // 获取用户供应列表
  },
  // 素材库
  albumPic: {
    listAlbumPics: '/albumPic/listAlbumPics', // 获取素材库图片列表
    addAlbumPic: '/albumPic/addAlbumPic', // 素材库上传图片
    getAlbum: '/album/getAlbum', // 查询素材库id
    deleteAlbumPic: '/albumPic/deleteAlbumPic' // 删除素材库图片,
  },
  // 花型分类
  productCategory: {
    listSystemProductCategory: '/productCategory/listSystemProductCategory', // 系统定义花型分类列表
    listVisitSystemProductCategory: '/productCategory/listVisitSystemProductCategory', // 店铺系统定义花型分类列表
    deleteProductCategory: '/productCategory/deleteProductCategory', // 删除花型分类
    listUserProductCategory: '/productCategory/listUserProductCategory', // 自定义花型分类列表
    listVisitUserProductCategory: '/productCategory/listVisitUserProductCategory', // 店铺自定义花型分类列表
    addProductCategory: '/productCategory/addProductCategory', // 新增花型分类
    updateProductCategory: '/productCategory/updateProductCategory', // 修改花型分类
    sortProductCategory: '/productCategory/sortProductCategory', // 花型分类排序
    listProductCategory: '/productCategory/listProductCategory', // 店铺花型分类
    listBindingProduct: '/productCategoryBanding/listBindingProduct', // 获取分类绑定的花型列表
    listCompanyBindingProduct: '/productCategoryBanding/listCompanyBindingProduct', // 店铺分类绑定的花型列表
    bindingProduct: '/productCategoryBanding/bindingProduct', // 花型分类绑定解绑
    sortBindingProduct: '/productCategoryBanding/sortBindingProduct' // 分类中的花型排序
  },
  // 公司
  company: {
    getCompanyBestList: '/companyBest/getCompanyBestList', // 优质厂家
    getCompanyQRcode: '/company/getCompanyQRcode', // 获取公司二维码图片
    getCompanyInfo: '/company/getCompanyInfo', // 获取档口OR工厂信息
    updateCompany: '/company/updateCompany', // 修改工厂或档口信息
    getCompanyAptitude: '/companyAptitude/getCompanyAptitude', // 查询公司资质信息
    saveCompanyAptitude: '/companyAptitude/saveCompanyAptitude', // 修改公司资质信息
    updateCompanyExtend: '/company/updateCompanyExtend', // 修改工厂或档口详细信息
    getCompanyInfoByUserId: '/company/getCompanyInfoByUserId', // 获取用户的店铺信息
    getCompanySimpleInfo: '/company/getCompanySimpleInfo', // 获取简单店铺或工厂信息
    findNewCompanys: '/company/findNewCompanys' // 查询最新入驻厂家
  },
  // 微官网
  website: {
    template: '/website/template'
  },
  // 数据字典
  dicTree: {
    byTypeKey: '/front/dicTree/byTypeKey'
  },
  // 合作厂家
  collaborateCompany: {
    listCollaborateCompanys: '/collaborateCompany/listCollaborateCompanys', // 获取合作厂家列表
    updateCollaborateCompany: '/collaborateCompany/updateCollaborateCompany', // 修改合作厂家
    getCollaborateCompany: '/collaborateCompany/getCollaborateCompany', // 合作厂家详情
    addCollaborateCompany: '/collaborateCompany/addCollaborateCompany', // 新增合作厂家
    deleteCollaborateCompany: '/collaborateCompany/deleteCollaborateCompany' // 删除合作厂家
  },
  // 地理区域
  area: {
    byLevel: '/front/area/byLevel',
    byParent: '/front/area/byParent'
  },
  enquiry: {
    getEnquiryList: '/enquiry/list', //
    askPrice: '/enquiry/askPrice', // 询价
    enquiryEskUser: '/enquiry/askUser', // 询价人详情
    getAskListByProductId: '/enquiry/getAskListByProductId' // 根据产品ID获取询价记录
  },
  oss: {
    token: '/file/token' // OSS_token
  }
};
/**
 * 用户部分
 */
// 登录
export const login = param => axios.post(API.user.login, param);

// 注册
export const reg = param => axios.post(API.user.reg, param);

// 找回密码
export const findPassWd = param => axios.post(API.user.findPassWd, param);

// 获取找回密码短信验证码
export const getFindSMSCode = param => axios.post(API.user.getFindSMSCode, param);

// 校验密码
export const checkPasswd = param => axios.post(API.user.checkPasswd, param);

// 获取图形验证码
export const getVerifyCode = param => axios.post(API.user.getVerifyCode, param);

// 修改个人信息
export const updateUser = param => axios.post(API.user.updateUser, param);

// 获取用户信息
export const getUserInfo = param => axios.post(API.user.getUserInfo, param);

// 获取简单用户信息
export const getUserSimpleInfo = param => axios.post(API.user.getUserSimpleInfo, param);

// 检验手机号码是否存在
export const checkPhone = param => axios.get(API.user.checkPhone, {params: param});

// 获取注册短信验证码
export const getRegSMSCode = param => axios.post(API.user.getRegSMSCode, {params: param});

/**
 * 首页部分
 */
// 获取首页banner
export const listHomeBanners = param => axios.get(API.home.listHomeBanners, {params: param});

// 获取求购列表
export const listProductBuys = param => axios.get(API.buy.listProductBuys, {params: param});

// 获取供应列表
export const listCompanySupplys = param => axios.get(API.buy.listCompanySupplys, {params: param});

export const findNewCompanyByIndex = param => axios.post(API.home.findNewCompanyByIndex, param);

// 优质厂家
export const qualityCompanyList1 = param => axios.get(API.home.qualityCompanyList, {params: param});

// 获取最新入驻厂家列表
export const findNewCompanys = param => axios.post(API.company.findNewCompanys, param);

// 索样
export const sampleAskFor = param => axios.post(API.sample.askFor, param);
/**
 * 搜索部分
 */
// 文本搜索
export const searchMtd = param => axios.post(API.search.search, param);
// 公司搜索
export const searchCompany = param => axios.post(API.search.companySearch, param);
// 搜索-BASE64文本
export const searchEncoded = param => axios.post(API.search.encoded, param);
// 搜索结果检查
export const searchPolling = searchKey => axios.get(`${API.search.polling}/${searchKey}`);
// 搜索记录列表(大家都在找)
export const searchHistory = param => axios.get(API.search.history, {params: param});
// 查看单条搜索记录
export const searchGetResult = param => axios.get(API.search.getResult, {params: param});
/**
 * 个人中心部分
 */
// 获取修改手机短信
export const changeSMSCode = param => axios.post(API.user.changeSMSCode, param);

// 设置短信
export const setMsg = param => axios.post(API.user.setMsg, param);

// 获取短信设置
export const getMsgSetting = param => axios.get(API.user.getMsgSetting, {params: param});

// 修改手机号
export const changeMobile = param => axios.post(API.user.changeMobile, param);

// 修改密码
export const restPasswd = param => axios.post(API.user.restPasswd, param);

// 获取接单列表
export const listBuyTask = param => axios.post(API.buy.listBuyTask, param);

// 获取我的求购列表
export const myProductBuys = param => axios.post(API.buy.myProductBuys, param);

// 获取用户求购列表
export const listUserProductBuys = param => axios.get(API.buy.listUserProductBuys, {params: param});

// 获取用户求购列表
export const listUserCompanySupplys = param => axios.get(API.companySupply.listUserCompanySupplys, {params: param});

// 删除求购
export const deleteProductBuy = param => axios.post(API.buy.deleteProductBuy, param);

// 获取收藏花型列表
export const listProduct = param => axios.post(API.collection.listProduct, param);

// 获取收藏厂家列表
export const listCompany = param => axios.post(API.collection.listCompany, param);

// 获取收藏供应列表
export const listSupply = param => axios.post(API.collection.listSupply, param);

// 获取收藏供应各分类统计
export const countSupply = param => axios.get(API.collection.countSupply, {params: param});

// 获取收藏花型各分类统计
export const countProduct = param => axios.get(API.collection.countProduct, {params: param});

// 收藏或取消
export const favoriteBus = param => axios.post(API.collection.favoriteBus, param);
// 批量取消收藏
export const favoriteBatchCancel = param => axios.post(API.collection.batchCancel, param);
// 判断是否已收藏
export const favoriteIsFavorite = param => axios.get(API.collection.isFavorite, {params: param});
// 关闭求购
export const closeProductBuy = param => axios.post(API.buy.closeProductBuy, param);

// 取消接单
export const cancelBuyTask = id => axios.post(`${API.buy.cancelBuyTask}/${id}`);

// 完成接单
export const finishProductBuy = param => axios.post(API.buy.finishProductBuy, param);

// 求购详情
export const getProductBuy = id => axios.get(`${API.buy.getProductBuy}/${id}`);

// 获取求购单接单人列表
export const listBuyTaskUserByBuyId = param => axios.get(API.buy.listBuyTaskUserByBuyId, {params: param});

// 删除接单
export const deleteBuyTask = (param) => axios.post(API.buy.deleteBuyTask, param);
// 获取oss_token
export const token = () => axios.post(API.oss.token, {fileType: 1});
// 获取数据字典
export const getDicTree = param => axios.get(API.dicTree.byTypeKey, {params: param});
// 根据级别获取信息
export const getAreabyLevel = param => axios.get(API.area.byLevel, {params: param});
// 根据父级编码获取信息
export const getAreabyParent = param => axios.get(API.area.byParent, {params: param});
// =====
// 微官网
// =====
// 更新模板
export const updateWebsiteTemplate = param => axios.post(API.website.template, param);
// 获取已设置的模板
export const getWebsiteTemplate = param => axios.get(API.website.template, {params: param});
// 优质厂家
export const getCompanyBestList = param => axios.get(API.company.getCompanyBestList, {params: param});

// =======
// 店铺访问
// =======
// 获取店铺花型列表
export const getVistitCompanyProductsList = param => axios.post(API.product.listVistitCompanyProducts, param);
// 店铺供应列表
export const getVisitCompanySupplyList = param => axios.get(API.companySupply.listVisitCompanySupplys, {params: param});
// 获取用户的店铺信息
export const getCompanyInfoByUserId = param => axios.get(API.company.getCompanyInfoByUserId, {params: param});
// 获取公司二维码图片
export const getCompanyQRcode = param => axios.get(API.company.getCompanyQRcode, {params: param});
// 获取简单店铺或工厂信息
export const getCompanySimpleInfo = param => axios.post(API.company.getCompanySimpleInfo, param);
// 店铺花型分类
export const getProductCategoryList = param => axios.get(API.productCategory.listProductCategory, {params: param});
// 店铺自定义花型分类列表
export const getVisitUserProductCategoryList = param => axios.post(API.productCategory.listVisitUserProductCategory, param);
// 店铺系统定义花型分类列表
export const getVisitSystemProductCategoryList = param => axios.get(API.productCategory.listVisitSystemProductCategory, {params: param});
// 店铺分类绑定的花型列表
export const getCompanyBindingProductList = param => axios.get(API.productCategory.listCompanyBindingProduct, {params: param});
// =======
// 店铺管理
// =======
// 询价
export const enquiryAskPrice = param => axios.post(API.enquiry.askPrice, param);
// 询价列表
export const getEnquiryList = param => axios.post(API.enquiry.getEnquiryList, param);
// 询价人详情
export const enquiryEskUser = param => axios.get(API.enquiry.enquiryEskUser, {params: param});
// 根据产品ID获取询价记录
export const getAskListByProductId = param => axios.get(API.enquiry.getAskListByProductId, {params: param});
// 查询公司资质信息
export const getCompanyAptitude = param => axios.get(API.company.getCompanyAptitude, {params: param});
// 修改公司资质信息
export const saveCompanyAptitude = param => axios.post(API.company.saveCompanyAptitude, param);
// 修改工厂或档口详细信息
export const updateCompanyExtend = param => axios.post(API.company.updateCompanyExtend, param);
// 获取花型列表
export const getProductList = param => axios.post(API.product.listProducts, param);
// 获取花型详情
export const getProduct = id => axios.get(`${API.product.getProduct}/${id}`);
// 新增花型
export const addProducts = param => axios.post(API.product.addProduct, param);
// 修改花型
export const updateProduct = param => axios.post(API.product.updateProduct, param);
// 花型上下架
export const shelveProduct = param => axios.post(API.product.shelveProduct, param);
// 删除花型
export const deleteProduct = param => axios.post(API.product.deleteProduct, param);
// 厂家上新
export const getCompanyNewProductList = param => axios.get(API.product.getCompanyNewProductlist, {params: param});
// 爆款热搜列表
export const burstHotSearch = param => axios.get(API.product.burstHotSearch, {params: param});
// 获取成分列表
export const getIngredientsList = param => axios.get(API.ingredient.listIngredients, {params: param});
// 自定义成分
export const addIngredient = param => axios.post(API.ingredient.addIngredient, param);
// 修改成分
export const updateIngredient = param => axios.post(API.ingredient.updateIngredient, param);
// 删除成分
export const deleteIngredient = param => axios.post.get(API.ingredient.deleteIngredient, param);
// 我的供应列表
export const getCompanySupplylist = param => axios.get(API.companySupply.listMyCompanySupplys, {params: param});
// 获取供应收藏人列表
export const getSupplyByFavList = param => axios.get(API.companySupply.getSupplyByFavList, {params: param});
// 统计不同供应状态的数量
export const companySupplyCountByStatus = param => axios.get(API.companySupply.countByStatus, {params: param});
// 关闭供应
export const closeCompanySupply = param => axios.post(API.companySupply.closeCompanySupply, param);
// 获取供应详情
export const getCompanySupply = id => axios.get(`${API.companySupply.getCompanySupply}/${id}`);
// 发布供应
export const releaseCompanySupply = param => axios.post(API.companySupply.releaseCompanySupply, param);
// 发布求购
export const releaseProductBuy = param => axios.post(API.buy.releaseProductBuy, param);
// 获取素材库图片列表
export const getAlbumPicsList = param => axios.post(API.albumPic.listAlbumPics, param);
// 查询素材库id
export const getAlbum = param => axios.get(API.albumPic.getAlbum, {params: param});
// 删除素材库图片
export const deleteAlbumPic = param => axios.post(API.albumPic.deleteAlbumPic, param);
// 素材库上传图片
export const addAlbumPic = param => axios.post(API.albumPic.addAlbumPic, param);
// 获取档口OR工厂信息
export const getCompanyInfo = param => axios.get(API.company.getCompanyInfo, {params: param});
// 修改工厂或档口信息
export const updateCompany = param => axios.post(API.company.updateCompany, param);
// 获取系统定义花型分类列表
export const listSystemProductCategory = param => axios.get(API.productCategory.listSystemProductCategory, {params: param});
// 获取自定义花型分类列表
export const listUserProductCategory = param => axios.post(API.productCategory.listUserProductCategory, param);
// 获取分类绑定的花型列表
export const getBindingProductlist = param => axios.get(API.productCategory.listBindingProduct, {params: param});
// 新增花型分类
export const addProductCategory = param => axios.post(API.productCategory.addProductCategory, param);
// 修改花型分类
export const updateProductCategory = param => axios.post(API.productCategory.updateProductCategory, param);
// 花型分类绑定解绑
export const bindingProduct = param => axios.get(API.productCategory.bindingProduct, {params: param});
// 花型分类排序
export const sortProductCategory = param => axios.get(API.productCategory.sortProductCategory, {params: param});
// 分类中的花型排序
export const sortBindingProduct = param => axios.get(API.productCategory.sortBindingProduct, {params: param});
// 删除花型分类
export const deleteProductCategory = param => axios.post(API.productCategory.deleteProductCategory, param);
// 获取合作厂家详情
export const getCollaborateCompany = id => axios.get(`${API.collaborateCompany.getCollaborateCompany}/${id}`);
// 修改合作厂家
export const updateCollaborateCompany = param => axios.post(API.collaborateCompany.updateCollaborateCompany, {params: param});
// 新增合作厂家
export const addCollaborateCompany = param => axios.post(API.collaborateCompany.addCollaborateCompany, param);
// 获取合作厂家列表
export const getCollaborateCompanysList = param => axios.get(API.collaborateCompany.listCollaborateCompanys, {params: param});
// 删除合作厂家
export const deleteCollaborateCompany = param => axios.get(API.collaborateCompany.deleteCollaborateCompany, {params: param});
