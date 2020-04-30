import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
//按需加载
// Vue.config.productionTip = false;
// import { Button } from 'ant-design-vue';
//Vue.use(Button);
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.less";
Vue.use(Antd);
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
