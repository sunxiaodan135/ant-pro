import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Authorized from './components/Authorized'
//按需加载
// Vue.config.productionTip = false;
// import { Button } from 'ant-design-vue';
//Vue.use(Button);
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.less";
Vue.use(Antd);
Vue.component('Authorized',Authorized);
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
