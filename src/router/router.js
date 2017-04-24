import Vue from 'vue';
import Router from 'vue-router';
import * as types from '../store/types';
import store from '../store/store';

import {
    homePage,
    findPage,
    threeDDressPage,
    stallsManagerPage,
    personalCenterPage,
    loginPage,
    registerPage,
    forgotPasswordPage
} from '../pages';

Vue.use(Router);

const routes = [
    { path: '/', redirect: '/homePage' },
    { path: '/homePage', component: homePage },
    { path: '/findPage', component: findPage },
    { path: '/threeDDressPage', component: threeDDressPage },
    {
        path: '/stallsManagerPage',
        component: stallsManagerPage,
        meta: {
            needAuth: true
        }
    },
    {
        path: '/personalCenterPage',
        component: personalCenterPage,
        meta: {
            needAuth: true
        }
    },

    { path: '/loginPage', component: loginPage },
    { path: '/registerPage', component: registerPage },
    { path: '/forgotPasswordPage', component: forgotPasswordPage }
];

// 进入页面，赋值token
if (window.localStorage.getItem('token')) {
    store.commit(types.LOGIN, window.localStorage.getItem('token'));
}

const router = new Router({
    linkActiveClass: 'active',
    routes
});

// 路由钩子，判断进入的页面是否需要登录 (needAuth)
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.needAuth)) {
        if (store.state.token) {
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
