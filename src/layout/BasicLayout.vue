<template>
  <div :class="[`nav-theme-${navTheme}`,`nav-layout-${navLayout}`]">
    <a-layout id="components-layout-demo-side" style="min-height: 100vh;">
      <a-layout-sider
        v-if="navLayout=== 'left'"
        :theme="navTheme"
        :trigger="null"
        v-model="collapsed"
        collapsible
      >
        <div class="logo">Ant design Vue</div>
        <SiderMenu></SiderMenu>
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="background: #fff; padding: 0;">
          <a-icon
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
    <SettingDrawer />
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
  height: 64px;
  font-weight: bold;
  font-size:20px;
  line-height: 64px;
  text-align: center;

}
.nav-theme-light >>> .logo{
    background: #ffff;
    color: #000;
}
.nav-theme-dark{
  color: #ddd;
}
</style>
