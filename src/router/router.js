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
    shopManagePage,
    loginPage,
    registerPage,
    forgotPasswordPage
} from '../pages';

Vue.use(Router);
// created By HZC
const shopManager = r => require.ensure([], () => r(require('@/pages/shopManager/')), 'shopManager');
const shopManagerMaterial = r => require.ensure([], () => r(require('@/pages/shopManager/children/material')), 'shopManagerMaterial');
const shopManagerWareHouse = r => require.ensure([], () => r(require('@/pages/shopManager/children/warehouse')), 'shopManagerWareHouse');
const WareHouseAdd = r => require.ensure([], () => r(require('@/pages/shopManager/children/warehouse/add')), 'shopManagerWareHouse');
const shopManagerSupply = r => require.ensure([], () => r(require('@/pages/shopManager/children/supply')), 'shopManagerSupply');
const shopManagerEnquiry = r => require.ensure([], () => r(require('@/pages/shopManager/children/enquiry')), 'shopManagerEnquiry');
const shopManagerSetting = r => require.ensure([], () => r(require('@/pages/shopManager/children/setting')), 'shopManagerSetting');
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
        path: '/shopManagePage',
        component: shopManagePage,
        meta: {
//          needAuth: true
        }
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
      path: '/shopManager',
      redirect: '/shopManager/warehouse',
      component: shopManager,
      children: [{
        path: 'material',
        component: shopManagerMaterial,
        name: '素材库'
      }, {
        path: 'warehouse',
        component: shopManagerWareHouse,
        name: '仓库管理'
      }, {
        path: 'addwarehouse',
        component: WareHouseAdd,
        name: '新增花型'
      }, {
        path: 'supply',
        component: shopManagerSupply,
        name: '厂家供应'
      }, {
        path: 'enquiry',
        component: shopManagerEnquiry,
        name: '询价列表'
      }, {
        path: 'setting',
        component: shopManagerSetting,
        name: '店铺设置'
      }]
    }
];

// 进入页面，判断、赋值token userInfo
if (localStorage.accessToken) {
    store.commit(types.LOGIN, localStorage.accessToken);
    store.commit(types.AJAX, localStorage.ajaxToken);
    store.commit(types.USER_NAME, localStorage.userName);
}

const router = new Router({
	mode: 'history',
    linkActiveClass: 'active',
    routes
});

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
