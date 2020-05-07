<template>
  <div :class="[`nav-theme-${navTheme}`, `nav-layout-${navLayout}`]">
    <a-layout id="components-layout-demo-side" style="min-height: 100vh;">
      <a-layout-sider
        v-if="navLayout === 'left'"
        :theme="navTheme"
        :trigger="null"
        v-model="collapsed"
        collapsible
        width="256px"
      >
        <div class="logocontainer">
          <div class="logo"></div><div :class="{ 'logotitle':true, 'titledisplay': collapsed}">Vue Design pro</div>
        </div>
        <SiderMenu :theme="navTheme"></SiderMenu>
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="background: #fff; padding: 0;">
          <a-icon
            v-auth="['admin']"
            class="trigger"
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="() => (collapsed = !collapsed)"
          />
          <Header></Header>
        </a-layout-header>
        <a-layout-content style="margin: 0 16px;">
          <router-view></router-view>
        </a-layout-content>
        <a-layout-footer style="text-align: center;">
          <Footer></Footer>
        </a-layout-footer>
      </a-layout>
    </a-layout>
    <!-- 只有管理员可以设置样式和布局利用全局组件 -->
    <Authorized :authority="['admin']">
      <SettingDrawer />
    </Authorized>
  </div>
</template>

<script>
import Header from "./Header";
import Footer from "./Footer";
import SiderMenu from "./SiderMenu";
import SettingDrawer from "@/components/SettingDrawer";
export default {
  data() {
    return {
      collapsed: false,
    };
  },
  computed: {
    navTheme() {
      return this.$route.query.navTheme || "dark";
    },
    navLayout() {
      return this.$route.query.navLayout || "left";
    },
  },
  components: { Header, Footer, SiderMenu, SettingDrawer },
};
</script>
<style scoped>
.trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}
.trigger:hover {
  color: #1890ff;
}

#components-layout-demo-side .logo {
  height: 54px;
  width: 54px;
  background-image: url("../assets/logo.png") ;
  background-size:100% 100%;
  text-align: center;
}
.nav-theme-light >>> .logotitle {
  margin-left:10px ;
  font-size: 20px;
  line-height: 30px;
  font-weight: bold;
  background: #ffff;
  color: #000;
}
.nav-theme-dark >>> .logotitle {
  color: #ddd;
  font-size: 20px;
  font-weight: bold;
  margin-left:10px ;
}
.logocontainer{
  height: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.titledisplay{
  display: none;
}
</style>
