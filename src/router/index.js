import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/user",
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
        component: { render: (h) => h("router-view") },
        children: [
          {
            path: "/dashboard/analysis",
            name: "analysis",
            component: () =>
              import(
                /* webpackChunkName: "dashboard" */ "../views/Dashboard/Analysis"
              ),
          },
        ],
      },
    ],
  },
  // forms
  {
    path: "/form",
    redirect: "/form/base-form",
    component: { render: (h) => h("router-view") },
    children: [
      {
        path: "/form/base-form",
        name: "BaseForm",
        component: () => import("@/views/form/BasicForm"),
      },
      {
        path: "/form/step-form",
        name: "StepForm",
        component: () => import("@/views/form/stepForm/StepForm"),
        children: [],
      },
      {
        path: "/form/advanced-form",
        name: "AdvanceForm",
        component: () => import("@/views/form/advancedForm/AdvancedForm"),
        meta: { title: "高级表单", keepAlive: true, permission: ["form"] },
      },
    ],
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
