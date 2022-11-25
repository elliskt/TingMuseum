import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { ethers } from "ethers";
// import ElementUI from "element-ui";
import {
  Button,
  Drawer,
  Breadcrumb,
  BreadcrumbItem,
  Dialog,
  Pagination,
  Input,
  Skeleton,
  SkeletonItem,
  Popover,
  Empty,
  Tooltip,
  Badge,
  Upload,
  Tabs,
  TabPane,
  Loading,
  Message,
  Notification,
  Popconfirm,
} from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import axios from "axios";
import VueClipboard from "vue-clipboard2";
import "../src/assets/fontOfDiscover/font.less";
import "../public/url.js";
import url from "./utils/url";
import "../public/visual_logic.js";
import i18n from "../src/lang/index.js";
import VueAwesomeSwiper from "vue-awesome-swiper";
import "swiper/swiper-bundle.css";
import VueViewer from "v-viewer";
import shell from "vue-shell";
import VueTyperPlugin from "vue-typer";
import { DAppClient } from "@airgap/beacon-sdk";
import $ from "jquery";
window.$ = $;
window.jquery = $;
const dAppClient = new DAppClient({ name: "Beacon Docs" });
window.dAppClient = dAppClient;
Vue.use(Button);
Vue.use(Drawer);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Dialog);
Vue.use(Pagination);
Vue.use(Input);
Vue.use(Skeleton);
Vue.use(SkeletonItem);
Vue.use(Popover);
Vue.use(Empty);
Vue.use(Tooltip);
Vue.use(Badge);
Vue.use(Upload);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Popconfirm);
Vue.use(Loading);
Vue.use(VueTyperPlugin);
Vue.use(shell);
Vue.use(VueViewer);
Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;
Vue.prototype.$ethers = ethers;
Vue.use(VueAwesomeSwiper);
// Vue.use(ElementUI);
Vue.use(VueClipboard);
Vue.use(url);
new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount("#app");

// 防止localStorage被修改
window.addEventListener("storage", function(e) {
  // 为特定的localStorage中的key指定不能被修改
  if (e.key == "getSessionStorage") {
    localStorage.setItem(e.key, e.oldValue);
  }
});
// 防止sessionStorage被修改
window.addEventListener("storage", function(e) {
  this.sessionStorage.setItem(e.key, e.oldValue);
});
