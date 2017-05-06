import Vue from 'vue';
import Router from 'vue-router';
import * as types from '../store/types';
import store from '../store/store';

import {
  homePage,
  textSearchResultPage,
  findPage,
  threeDDressPage,
  personalCenterPage,
  loginPage,
  registerPage,
  forgotPasswordPage,
  releaseSupplyPage,
  releasePurchasePage
} from '../pages';

Vue.use(Router);
// created By HZC
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
const routes = [
  {
    path: '/',
    redirect: '/homePage'
  },
  {
    path: '/homePage',
    component: homePage
  },
  {
    path: '/textSearchResultPage',
    component: textSearchResultPage
  },
  {
    path: '/findPage',
    component: findPage,
    meta: {
      needAuth: true
    }
  },
  {
    path: '/threeDDressPage',
    component: threeDDressPage
  },
  {
    path: '/personalCenterPage',
    component: personalCenterPage,
    meta: {
      //          needAuth: true
    }
  },
  {
    path: '/releaseSupplyPage',
    name: 'releaseSupplyPage',
    component: releaseSupplyPage
  },
  {
    path: '/releasePurchasePage',
    component: releasePurchasePage
  },
  {
    path: '/loginPage',
    component: loginPage
  },
  {
    path: '/registerPage',
    component: registerPage
  },
  {
    path: '/forgotPasswordPage',
    component: forgotPasswordPage
  },
  {
    path: '/shopManagePage',
    redirect: '/shopManagePage/warehouse',
    component: shopManager,
    children: [
      {
        path: 'material',
        component: shopManagerMaterial,
        name: '素材库'
      }, {
        path: 'warehouse',
        component: shopManagerWareHouse,
        name: '仓库管理'
      }, {
        path: 'addwarehouse',
        component: wareHouseAdd,
        name: '新增花型'
      }, {
        path: 'supply',
        component: shopManagerSupply,
        name: '厂家供应'
      }, {
        path: 'supplyAdd',
        component: supplyAdd,
        name: '发布供应'
      }, {
        path: 'enquiry',
        component: shopManagerEnquiry,
        name: '询价列表'
      }, {
        path: 'setting',
        component: shopManagerSetting,
        name: '店铺设置'
      }, {
        path: 'cooperation',
        component: shopManagerCooperation,
        name: '合作厂家'
      }, {
        path: 'classification',
        component: shopManagerClassification,
        name: '分类管理'
      }, {
        path: 'aptitude',
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
  store.commit(types.USER_NAME, localStorage.userName);
}

const router = new Router({linkActiveClass: 'active', routes});

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
