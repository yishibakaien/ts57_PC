import Vue from 'vue';
import Router from 'vue-router';
import {
    homePage,
    findPage,
    threeDDressPage,
    personalCenterPage,
    shopManagePage,
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
    { path: '/personalCenterPage', component: personalCenterPage },
    { path: '/shopManagePage', component: shopManagePage },

    { path: '/loginPage', component: loginPage },
    { path: '/registerPage', component: registerPage },
    { path: '/forgotPasswordPage', component: forgotPasswordPage }
];

export default new Router({
    linkActiveClass: 'active',
    routes
});
