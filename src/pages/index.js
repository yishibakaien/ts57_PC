'use strict';
// 主页
import homePage from './homePage/homePage';
// 文本搜索结果页
import textSearchResultPage from './homePage/searchResultPage/textSearchResultPage';

// 发布求购页
import releaseSupplyPage from './homePage/releaseSupplyPage/releaseSupplyPage';
// 求购列表页面
import purchaseListPage from './homePage/purchaseListPage/purchaseListPage';
// 求购详情页
import purchaseDetailPage from './homePage/purchaseListPage/purchaseDetailPage';

// 发布供应页
import releasePurchasePage from './homePage/releasePurchasePage/releasePurchasePage';
// 供应列表页
import supplyListPage from './homePage/supplyListPage/supplyListPage';
// 供应详情页
import supplyDetailPage from './homePage/supplyListPage/supplyDetailPage';

import findPage from './findPage/findPage';
import threeDDressPage from './threeDDressPage/threeDDressPage';
import personalCenterPage from './personalCenterPage/personalCenterPage';

// 注册、登录、修改密码等表单页面
import loginPage from './formPages/loginPage/loginPage';
import registerPage from './formPages/registerPage/registerPage';
import forgotPasswordPage from './formPages/forgotPasswordPage/forgotPasswordPage';

export {
  homePage,
  textSearchResultPage,
  findPage,
  threeDDressPage,
  personalCenterPage,
  loginPage,
  registerPage,
  forgotPasswordPage,

  releasePurchasePage,
  purchaseListPage,
  purchaseDetailPage,

  releaseSupplyPage,
  supplyListPage,
  supplyDetailPage
};
