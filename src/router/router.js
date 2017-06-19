import Vue from 'vue';
import Router from 'vue-router';
import store from '../store/store';

import {
  loginPage,
  registerPage,
  forgotPasswordPage,
  purchaseListPage,
  purchaseDetailPage,
  supplyListPage,
  hotListpage,
  supplyDetailPage
} from '../pages';

Vue.use(Router);
// created By HZC
// =============
const homePage = r => require.ensure([], () => r(require('@/pages/homePage/homePage.vue')), 'homePage');
const autoLogin = r => require.ensure([], () => r(require('@/pages/formPages/loginPage/autoLogin.vue')), 'autoLogin');
// =============
const personalCenterPage = r => require.ensure([], () => r(require('@/pages/personalCenterPage/personalCenterPage')), 'personalCenterPage');
// =============
const productAdd = r => require.ensure([], () => r(require('@/pages/homePage/addProductPage/addProduct.vue')), 'productAdd');
const flowerDetail = r => require.ensure([], () => r(require('@/pages/homePage/flowerDetailPage/flowerDetailPage.vue')), 'flowerDetail');
const search = r => require.ensure([], () => r(require('@/pages/homePage/searchResultPage/index.vue')), 'search');
const textSearch = r => require.ensure([], () => r(require('@/pages/homePage/searchResultPage/children/textSearch.vue')), 'search');
const imgSearch = r => require.ensure([], () => r(require('@/pages/homePage/searchResultPage/children/imgSearch.vue')), 'search');
// =============
// 3D
const clause = r => require.ensure([], () => r(require('@/pages/clause/')), 'clause');
const threeDDress = r => require.ensure([], () => r(require('@/pages/3DDress/')), 'threeDDress');
// 店铺访问
const shopVisiting = r => require.ensure([], () => r(require('@/pages/shopVisiting/')), 'shopVisiting');
const shopAllMeterials = r => require.ensure([], () => r(require('@/pages/shopVisiting/children/allmeterial')), 'shopAllMeterials');
const shopCompanyIntro = r => require.ensure([], () => r(require('@/pages/shopVisiting/children/companyintro')), 'shopCompanyIntro');
const shopModels = r => require.ensure([], () => r(require('@/pages/shopVisiting/children/models')), 'shopModels');
const shopProductIndex = r => require.ensure([], () => r(require('@/pages/shopVisiting/children/productindex')), 'shopProductIndex');
const shopSupplies = r => require.ensure([], () => r(require('@/pages/shopVisiting/children/supplies')), 'shopSupplies');
const shopCatagoryProduct = r => require.ensure([], () => r(require('@/pages/shopVisiting/children/catagoryProduct')), 'shopCatagoryProduct');
// =============
// 发现模块
const find = r => require.ensure([], () => r(require('@/pages/find/')), 'find');
const findIndex = r => require.ensure([], () => r(require('@/pages/find/children/find')), 'find');
const findEveryLooking = r => require.ensure([], () => r(require('@/pages/find/children/everyLooking')), 'find');
const findFactoryUpdate = r => require.ensure([], () => r(require('@/pages/find/children/factoryUpdate')), 'find');
const findTopSearch = r => require.ensure([], () => r(require('@/pages/find/children/topSearch')), 'find');
const findUpdateResult = r => require.ensure([], () => r(require('@/pages/find/children/updateResult')), 'find');
const findLookingResult = r => require.ensure([], () => r(require('@/pages/find/children/lookingResult')), 'find');
// =========
// 店铺管理
const shopManager = r => require.ensure([], () => r(require('@/pages/shopManager/')), 'shopManager');
const shopMirco = r => require.ensure([], () => r(require('@/pages/shopManager/children/mircoSite')), 'shopManager');
const shopManagerMaterial = r => require.ensure([], () => r(require('@/pages/shopManager/children/material')), 'shopManager');
const shopManagerWareHouse = r => require.ensure([], () => r(require('@/pages/shopManager/children/warehouse')), 'shopManager');
const wareHouseAdd = r => require.ensure([], () => r(require('@/pages/shopManager/children/warehouse/add')), 'shopManager');
const shopManagerSupply = r => require.ensure([], () => r(require('@/pages/shopManager/children/supply')), 'shopManager');
const supplyAdd = r => require.ensure([], () => r(require('@/pages/shopManager/children/supply/add')), 'shopManager');
const shopManagerEnquiry = r => require.ensure([], () => r(require('@/pages/shopManager/children/enquiry')), 'shopManager');
const shopManagerSetting = r => require.ensure([], () => r(require('@/pages/shopManager/children/setting')), 'shopManager');
const shopManagerCooperation = r => require.ensure([], () => r(require('@/pages/shopManager/children/cooperation')), 'shopManager');
const shopManagerClassification = r => require.ensure([], () => r(require('@/pages/shopManager/children/classification')), 'shopManager');
const shopManagerAptitude = r => require.ensure([], () => r(require('@/pages/shopManager/children/aptitude')), 'shopManager');
const releasePurchasePage = r => require.ensure([], () => r(require('@/pages/homePage/releasePurchasePage/releasePurchasePage')), 'shopManager');
const releaseSupplyPage = r => require.ensure([], () => r(require('@/pages/homePage/releaseSupplyPage/releaseSupplyPage')), 'shopManager');
const entryListPage = r => require.ensure([], () => r(require('@/pages/homePage/entryListPage/entryListPage')), 'shopManager');
// ========
// totalPage
const promptDown = r => require.ensure([], () => r(require('@/pages/totalPages/promptDown')), 'promptDown');

const routes = [
  {
    path: '/',
    redirect: '/homePage'
  }, {
    path: '/clause',
    component: clause,
    name: '条款'
  }, {
    path: '/product',
    component: productAdd,
    children: [
      {
        path: 'add',
        meta: {
          needAuth: true
        },
        component: wareHouseAdd
      }
    ]
  }, {
    path: '/homePage',
    component: homePage
  }, {
    path: '/search',
    component: search,
    children: [
      {
        path: 'text',
        component: textSearch
      }, {
        path: 'image',
        component: imgSearch
      }
    ]
  }, {
    path: '/find',
    redirect: '/find/index',
    component: find,
    children: [
      {
        path: 'index',
        component: findIndex,
        name: '发现'
      }, {
        path: '/catagory/:id', // 查找结果
        meta: {
          needAuth: true
        },
        component: findLookingResult,
        name: 'findLookingResult'
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
        path: 'rank/:id',
        component: findUpdateResult,
        meta: {
          needAuth: true
        },
        name: 'updateResult'
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
    component: threeDDress,
    name: '3D试衣'
  }, {
    path: '/personalCenterPage',
    component: personalCenterPage,
    meta: {
      needAuth: true
    }
  }, {
    path: '/releasePurchasePage', // 发布求购
    component: releasePurchasePage,
    meta: {
      needAuth: true
    }
  }, {
    path: '/purchaseListPage', // 求购列表
    meta: {
      needAuth: true
    },
    component: purchaseListPage
  }, {
    path: '/purchaseDetailPage', // 求购详情
    component: purchaseDetailPage,
    meta: {
      needAuth: true
    }
  }, {
    path: '/product/:id', // 花型详情
    meta: {
      needAuth: true
    },
    component: flowerDetail,
    name: 'flowerDetail'
  }, {
    path: '/releaseSupplyPage', // 发布供应
    component: releaseSupplyPage,
    meta: {
      needAuth: true
    }
  }, {
    path: '/supplyListPage', // 供应列表
    component: supplyListPage,
    meta: {
      needAuth: true
    }
  }, {
    path: '/supplyDetailPage', // 供应详情
    component: supplyDetailPage,
    meta: {
      needAuth: true
    }
  }, {
    path: '/hotListpage', // 供应详情
    component: hotListpage,
    meta: {
      needAuth: true
    }
  }, {
    path: '/entryListPage', // 厂家列表
    meta: {
      needAuth: true
    },
    component: entryListPage
  }, {
    path: '/loginPage',
    component: loginPage
  }, {
    path: '/autologin',
    component: autoLogin
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
    path: '/shop/:id',
    name: 'shop',
    meta: {
      needAuth: true
    },
    redirect: '/shop/:id/index',
    component: shopVisiting,
    children: [
      {
        path: 'index',
        meta: {
          needAuth: true
        },
        component: shopProductIndex,
        name: '店铺首页'
      }, {
        path: 'allProducts',
        meta: {
          needAuth: true
        },
        component: shopAllMeterials,
        name: '所有花型'
      }, {
        path: 'searchtext',
        meta: {
          needAuth: true
        },
        component: textSearch
      }, {
        path: 'searchimage',
        meta: {
          needAuth: true
        },
        component: imgSearch
      }, {
        path: 'supplies',
        meta: {
          needAuth: true
        },
        component: shopSupplies,
        name: '店铺-厂家供应'
      }, {
        path: 'models',
        meta: {
          needAuth: true
        },
        component: shopModels,
        name: '模特试衣'
      }, {
        path: 'intro',
        meta: {
          needAuth: true
        },
        component: shopCompanyIntro,
        name: '公司介绍'
      }, {
        path: 'catagory',
        meta: {
          needAuth: true
        },
        component: shopCatagoryProduct,
        name: '产品'
      }
    ]
  }, {
    path: '/shopManagePage',
    redirect: '/shopManagePage/warehouse',
    component: shopManager,
    meta: {
      needAuth: true
    },
    children: [
      {
        path: 'mircoSetting',
        component: shopMirco,
        meta: {
          needAuth: true
        },
        name: '微官网设置'
      }, {
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

const router = new Router({
  mode: 'history', // 后端未配置
  // 每进去一个新页面翻到顶部
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return {x: 0, y: 0};
    }
  },
  linkActiveClass: 'active',
  routes
});

// 路由钩子，判断进入的页面是否需要登录 (needAuth)
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.needAuth)) { // 判断该路由是否需要登录权限
    if (store.state.token.token) {
      next();
    } else {
      next({
        path: '/loginPage',
        query: {
          redirect: to.fullPath
        } // 将跳转的路由path作为参数，登录成功后跳转到该路由
      });
    }
  } else {
    store.state.token.token && to.path === '/loginPage'
      ? next('/')
      : next();
  }
});
export default router;
