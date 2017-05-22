import Vue from 'vue';
import Router from 'vue-router';
import * as types from '../store/types';
import store from '../store/store';

import {
  homePage,
  textSearchResultPage,
  threeDDressPage,
  personalCenterPage,
  loginPage,
  registerPage,
  forgotPasswordPage,
  purchaseListPage,
  purchaseDetailPage,

  //	releaseSupplyPage,
  supplyListPage,
  //	entryListPage,
  supplyDetailPage
} from '../pages';

Vue.use(Router);
// created By HZC
// =============
// 发现模块
const find = r => require.ensure([], () => r(require('@/pages/find/')), 'find');
const findIndex = r => require.ensure([], () => r(require('@/pages/find/children/find')), 'findIndex');
const findEveryLooking = r => require.ensure([], () => r(require('@/pages/find/children/everyLooking')), 'findEveryLooking');
const findFactoryUpdate = r => require.ensure([], () => r(require('@/pages/find/children/factoryUpdate')), 'factoryUpdate');
const findTopSearch = r => require.ensure([], () => r(require('@/pages/find/children/topSearch')), 'findHotSearch');
// =========
// 店铺管理
const shopManager = r => require.ensure([], () => r(require('@/pages/shopManager/')), 'shopManager');
const shopManagerMaterial = r => require.ensure([], () => r(require('@/pages/shopManager/children/material')), 'shopManagerMaterial');
const shopManagerWareHouse = r => require.ensure([], () => r(require('@/pages/shopManager/children/warehouse')), 'shopManagerWareHouse');
const wareHouseAdd = r => require.ensure([], () => r(require('@/pages/shopManager/children/warehouse/add')), 'shopManagerWareHouse');
const shopManagerSupply = r => require.ensure([], () => r(require('@/pages/shopManager/children/supply')), 'shopManagerSupply');
const supplyAdd = r => require.ensure([], () => r(require('@/pages/shopManager/children/supply/add')), 'shopManagerSupply');
const shopManagerEnquiry = r => require.ensure([], () => r(require('@/pages/shopManager/children/enquiry')), 'shopManagerEnquiry');
const shopManagerSetting = r => require.ensure([], () => r(require('@/pages/shopManager/children/setting')), 'shopManagerSetting');
const shopManagerCooperation = r => require.ensure([], () => r(require('@/pages/shopManager/children/cooperation')), 'shopManagerCooperation');
const shopManagerClassification = r => require.ensure([], () => r(require('@/pages/shopManager/children/classification')), 'shopManagerClassification');
const shopManagerAptitude = r => require.ensure([], () => r(require('@/pages/shopManager/children/aptitude')), 'shopManagerAptitude');
const releasePurchasePage = r => require.ensure([], () => r(require('@/pages/homePage/releasePurchasePage/releasePurchasePage')), 'releasePurchasePage');
const releaseSupplyPage = r => require.ensure([], () => r(require('@/pages/homePage/releaseSupplyPage/releaseSupplyPage')), 'releaseSupplyPage');
const entryListPage = r => require.ensure([], () => r(require('@/pages/homePage/entryListPage/entryListPage')), 'entryListPage');
// ========
// totalPage
const promptDown = r => require.ensure([], () => r(require('@/pages/totalPages/promptDown')), 'promptDown');

const routes = [
  {
    path: '/',
    redirect: '/homePage'
  }, {
    path: '/homePage',
    component: homePage
  }, {
    path: '/textSearchResultPage',
    component: textSearchResultPage
  }, {
    path: '/find',
    redirect: '/find/index',
    component: find,
    children: [
      {
        path: 'index',
        component: findIndex,
        meta: {
          needAuth: true
        },
        name: '发现'
      }, {
        path: 'everyLooking',
        component: findEveryLooking,
        meta: {
          needAuth: true
        },
        name: '大家在找'
      }, {
        path: 'factoryupdate',
        component: findFactoryUpdate,
        meta: {
          needAuth: true
        },
        name: '厂家上新'
      }, {
        path: 'topSearch',
        component: findTopSearch,
        meta: {
          needAuth: true
        },
        name: '爆款热搜'
      }
    ]
  }, {
    path: '/threeDDressPage',
    component: threeDDressPage
  }, {
    path: '/personalCenterPage',
    component: personalCenterPage,
    meta: {
      //          needAuth: true
    }
  }, {
    path: '/releasePurchasePage', // 发布求购
    component: releasePurchasePage,
    meta: {
      needAuth: true
    }
  }, {
    path: '/purchaseListPage', // 求购列表
    component: purchaseListPage
  }, {
    path: '/purchaseDetailPage', // 求购详情
    component: purchaseDetailPage
  }, {
    path: '/releaseSupplyPage', // 发布供应
    component: releaseSupplyPage,
    meta: {
      needAuth: true
    }
  }, {
    path: '/supplyListPage', // 供应列表
    component: supplyListPage
  }, {
    path: '/supplyDetailPage', // 供应详情
    component: supplyDetailPage
  }, {
    path: '/entryListPage', // 厂家列表
    component: entryListPage
  }, {
    path: '/loginPage',
    component: loginPage
  }, {
    path: '/registerPage',
    component: registerPage
  }, {
    path: '/forgotPasswordPage',
    component: forgotPasswordPage
  }, {
    path: '/promptDown',
    component: promptDown
  }, {
    path: '/shopManagePage',
    redirect: '/shopManagePage/warehouse',
    component: shopManager,
    meta: {
      needAuth: true
    },
    children: [
      {
        path: 'material',
        component: shopManagerMaterial,
        name: '素材库',
        meta: {
          needAuth: true
        }
      }, {
        path: 'warehouse',
        meta: {
          needAuth: true
        },
        component: shopManagerWareHouse,
        name: '仓库管理'
      }, {
        path: 'addwarehouse',
        meta: {
          needAuth: true
        },
        component: wareHouseAdd,
        name: '新增花型'
      }, {
        path: 'supply',
        meta: {
          needAuth: true
        },
        component: shopManagerSupply,
        name: '厂家供应'
      }, {
        path: 'supplyAdd',
        meta: {
          needAuth: true
        },
        component: supplyAdd,
        name: '发布供应'
      }, {
        path: 'enquiry',
        meta: {
          needAuth: true
        },
        component: shopManagerEnquiry,
        name: '询价列表'
      }, {
        path: 'setting',
        meta: {
          needAuth: true
        },
        component: shopManagerSetting,
        name: '店铺设置'
      }, {
        path: 'cooperation',
        meta: {
          needAuth: true
        },
        component: shopManagerCooperation,
        name: '合作厂家'
      }, {
        path: 'classification',
        meta: {
          needAuth: true
        },
        component: shopManagerClassification,
        name: '分类管理'
      }, {
        path: 'aptitude',
        meta: {
          needAuth: true
        },
        component: shopManagerAptitude,
        name: '企业资质'
      }
    ]
  }
];

// 进入页面，判断、赋值token userInfo
if (localStorage.accessToken) {
  store.commit(types.LOGIN, localStorage.accessToken);
  store.commit(types.AJAX, localStorage.ajaxToken);
  // store.commit(types.USER_NAME, localStorage.userName);
  store.dispatch('getDicTree');
}

const router = new Router({mode: 'history', linkActiveClass: 'active', routes});

// 路由钩子，判断进入的页面是否需要登录 (needAuth)
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.needAuth)) {
    if (store.state.accessToken) {
      next();
    } else {
      next({
        path: '/loginPage',
        query: {
          redirect: to.fullPath
        }
      });
    }
  } else {
    next();
  }
});
export default router;
