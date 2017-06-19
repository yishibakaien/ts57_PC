'use strict';
// 发布求购页
import releaseSupplyPage from './homePage/releaseSupplyPage/releaseSupplyPage';
// 求购列表页面
import purchaseListPage from './homePage/purchaseListPage/purchaseListPage';
// 求购详情页
import purchaseDetailPage from './homePage/purchaseListPage/purchaseDetailPage/purchaseDetailPage';

// 发布供应页
import releasePurchasePage from './homePage/releasePurchasePage/releasePurchasePage';
// 供应列表页
import supplyListPage from './homePage/supplyListPage/supplyListPage';
// 供应详情页
import supplyDetailPage from './homePage/supplyListPage/supplyDetailPage/supplyDetailPage';

// 更多优质厂家
import entryListPage from './homePage/entryListPage/entryListPage.vue';
// 新增热搜
import hotListpage from './homePage/addHotListpage/hotListpage.vue';

// 注册、登录、修改密码等表单页面
import loginPage from './formPages/loginPage/loginPage';
import registerPage from './formPages/registerPage/registerPage';
import forgotPasswordPage from './formPages/forgotPasswordPage/forgotPasswordPage';

// 提示下载页
import promptDown from './totalPages/promptDown';

export {
  loginPage,
  registerPage,
  forgotPasswordPage,
  entryListPage,
  releasePurchasePage,
  purchaseListPage,
  purchaseDetailPage,
  releaseSupplyPage,
  supplyListPage,
  supplyDetailPage,
  hotListpage,
  promptDown
};
