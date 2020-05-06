import Vue from "vue";
import VueRouter from "vue-router";
import findLast from 'lodash/findLast';
import {check,isLogin} from '@/utils/auth';
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import {notification} from 'ant-design-vue';
import NotFound from "../views/404.vue";
import Forbidden from "../views/403.vue";

const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}

Vue.use(VueRouter);

const routes = [
  {
    path: "/user",
    hideInMenu: true,
    component: () =>
      import(/* webpackChunkName: "layout" */ "../layout/UserLayout"),
    children: [
      {
        path: "/user",
        redirect: "/user/login",
      },
      {
        path: "/user/login",
        name: "login",
        component: () =>
          import(/* webpackChunkName: "user" */ "../views/User/Login"),
      },
      {
        path: "/user/register",
        name: "register",
        component: () =>
          import(/* webpackChunkName: "user" */ "../views/User/Register"),
      },
    ],
  },
  {
    path: "/",
    meta:{authority:['user','admin']},
    component: () =>
      import(/* webpackChunkName: "layout" */ "../layout/BasicLayout"),
    children: [
      {
        path: "/",
        redirect: "/dashboard/analysis",
      },
      {
        path: "/dashboard",
        name: "dashboard",
        meta: { icon: "dashboard", title: "仪表盘" },
        component: { render: (h) => h("router-view") },
        children: [
          {
            path: "/dashboard/analysis",
            name: "analysis",
            meta: { title: "分析页" },
            component: () =>
              import(
                /* webpackChunkName: "dashboard" */ "../views/Dashboard/Analysis"
              ),
          },
        ],
      },
      // forms
      {
        path: "/form",
        name: "form",
        component: { render: (h) => h("router-view") },
        meta: { icon: "form", title: "表单",authority:['admin'] },
        children: [
          {
            path: "/form/basic-form",
            name: "basicform",
            meta: { title: "基础表单" },
            component: () => import("@/views/Forms/BasicForm"),
          },
          {
            path: "/form/step-form",
            name: "StepForm",
            meta: { title: "分布表单" },
            hideChildrenMenu: true, //子路由渲染
            component: () => import("@/views/Forms/StepForm"),
            children: [
              {
                path: "/form/step-form",
                redirect: "/form/step-form/info",
              },
              {
                path: "/form/step-form/info",
                name: "info",
                component: () => import("@/views/Forms/StepForm/Step1"),
              },
              {
                path: "/form/step-form/confirm",
                name: "confirm",
                component: () => import("@/views/Forms/StepForm/Step2"),
              },
              {
                path: "/form/step-form/result",
                name: "result",
                component: () => import("@/views/Forms/StepForm/Step3"),
              },
            ],
          },
        ],
      },
    ],
  },

  {
    path: "/403",
    name: "403",
    hideInMenu: true,
    component: Forbidden,
  },
  {
    path: "*",
    name: "404",
    hideInMenu: true,
    component: NotFound,
  },
];
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});
router.beforeEach((to, from, next) => {
  if (to.path !== from.path) {
    NProgress.start();
  }
  //路由守卫判断权限,寻找去的当前路由最近的meta权限配置
  const record=findLast(to.matched,record=>record.meta.authority);
  if(record && !check(record.meta.authority)){
    //如果没有权限，
    if(!isLogin() && to.path!=="/user/login"){
      //如果没登陆了跳转登录页
      next({
        path:'/user/login'
      })
    }else if(to.path!=="/403"){
      notification.error({
        message: '403',
        description:
          '您没有权限访问，请联系管理员咨询',
      });
      next({
        path:'/403'
      })
    }
    NProgress.done();//暂停掉
  }
  next();
});
router.afterEach(() => {
  NProgress.done();
});
export default router;
