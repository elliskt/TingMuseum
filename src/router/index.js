import Vue from "vue";
import VueRouter from "vue-router";
import VueMeta from "vue-meta";

Vue.use(VueMeta);
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Welcome",
    component: () =>
      import(/*webpackChunkName:"welcome"*/ "../views/welcome.vue"),
    meta: {
      title: "Ting Museum - Welcome",
      keepAlive: false,
    },
  },
  {
    path: "/gift_register",
    name: "GiftRegister",
    component: () =>
      import(/*webpackChunkName:"gift"*/ "../views/GiftRegister.vue"),
    meta: {
      title: "Ting Museum - Gift Register",
      keepAlive: true,
    },
  },
  {
    path: "/upload_notmint",
    name: "Upload",
    component: () =>
      import(/*webpackChunkName:"upload"*/ "../views/uploadImages.vue"),
    meta: {
      title: "Ting Museum - UploadNotMintCollection",
      keepAlive: false,
    },
  },
  {
    path: "/museum_Introduction",
    name: "MuseumIntroduction",
    component: () =>
      import(
        /*webpackChunkName:"museumIntro"*/ "../views/MuseumIntroduction.vue"
      ),
    meta: {
      title: "Ting Museum - Museum",
      keepAlive: false,
    },
  },
  {
    path: "/already_built",
    name: "AlreadyBuilt",
    component: () =>
      import(/*webpackChunkName:"already_built"*/ "../views/AlreadyBuilt.vue"),
    meta: {
      title: "Ting Museum - Popular Museum",
      keepAlive: true,
    },
  },
  {
    path: "/user_info",
    name: "UserInfo",
    component: () =>
      import(/*webpackChunkName:"user_info"*/ "../views/UserInfo.vue"),
    meta: {
      title: "Ting Museum - Users",
      keepAlive: true,
    },
  },
  {
    path: "/home",
    name: "Home",
    component: () => import(/*webpackChunkName:"home1"*/ "../views/Home.vue"),
    meta: {
      title: "Ting Museum - Home",
      keepAlive: true,
    },
  },
  {
    path: "/setUp",
    name: "SetUp",
    component: () => import(/*webpackChunkName:"setup"*/ "../views/setUp.vue"),
    meta: {
      title: "Ting Museum - New",
      keepAlive: false,
    },
  },
  {
    path: "/peony-dream-reve",
    name: "Reve",
    component: () => import(/*webpackChunkName:"reve"*/ "../views/reve.vue"),
    meta: {
      title: "Ting Museum - Peony Dream Rêve",
      keepAlive: true,
    },
  },
  {
    path: "/personal",
    name: "Personal",
    component: () =>
      import(/*webpackChunkName:"personal"*/ "../views/personal.vue"),
    meta: {
      title: "Ting Museum - Personal",
      keepAlive: true,
    },
  },
  {
    path: "/createYours",
    name: "CreateYours",
    component: () =>
      import(/*webpackChunkName:"createYours"*/ "../views/createYours.vue"),
    meta: {
      title: "Ting Museum - Connect Wallet",
      keepAlive: false,
    },
  },
  {
    path: "/browsing",
    name: "Browsing",
    component: () =>
      import(/*webpackChunkName:"browsing"*/ "../views/browsing.vue"),
    meta: {
      title: "Ting Museum - Browsing",
      keepAlive: false,
    },
  },
  {
    path: "/profileEdit",
    name: "ProfileEdit",
    component: () =>
      import(/*webpackChunkName:"profile"*/ "../views/profileEdit.vue"),
    meta: {
      title: "Ting Museum - Profile Edit",
      keepAlive: false,
    },
  },
  {
    path: "/collection",
    name: "Collection",
    component: () =>
      import(/*webpackChunkName:"collection"*/ "../views/collectionShow.vue"),
    meta: {
      title: "Ting Museum - Collection Detail",
      keepAlive: false,
    },
  },
  {
    path: "/faq",
    name: "Faq",
    component: () => import(/*webpackChunkName:"faq"*/ "../views/FaQ.vue"),
    meta: {
      title: "Ting Museum - FAQ",
      keepAlive: false,
    },
  },
  {
    path: "/show",
    name: "Show",
    component: () => import(/*webpackChunkName:"show"*/ "../views/Show.vue"),
    meta: {
      title: "Ting Museum - Show",
      keepAlive: false,
    },
  },
  {
    path: "/windymuse",
    name: "windymuse",
    component: () => import(/*webpackChunkName:"windy"*/ "../views/Game1.vue"),
    meta: {
      title: "Ting Museum - WindyMuse",
      keepAlive: false,
    },
  },
  {
    path: "/AILanguage",
    name: "ALLanguage",
    component: () =>
      import(/*webpackChunkName:"AILanguage"*/ "../views/AIlanguage.vue"),
    meta: {
      title: "Ting Museum - ALLanguage",
      keepAlive: false,
    },
  },
  {
    path: "/AIRomance",
    name: "AIRomance",
    component: () =>
      import(/*webpackChunkName:"AIRomance"*/ "../views/AIRomance.vue"),
    meta: {
      title: "Ting Museum - AIRomance",
      keepAlive: false,
    },
  },
  {
    path: "/moon",
    name: "Moon",
    component: () => import(/*webpackChunkName:"moon"*/ "../views/Moon.vue"),
    meta: {
      title: "Ting Museum - Moon",
      keepAlive: false,
    },
  },
  {
    path: "/peony_reve",
    name: "Peony",
    component: () =>
      import(/*webpackChunkName:"peony_reve"*/ "../views/PeonyReve.vue"),
    meta: {
      title: "Ting Museum - PeonyReve",
      keepAlive: false,
    },
  },
  {
    path: "/shell",
    name: "shell",
    component: () => import(/*webpackChunkName:"shell"*/ "../views/Shell.vue"),
    meta: {
      title: "Ting Museum - Shell",
      keepAlive: false,
    },
  },
  {
    path: "/event_login_test",
    name: "EventLogin",
    component: () =>
      import(/*webpackChunkName:"eventLogin"*/ "../views/EventLogin.vue"),
    meta: {
      title: "Ting Museum - TestMint",
      keepAlive: true,
    },
  },
  {
    path: "/event_login",
    name: "EventLogin",
    component: () =>
      import(/*webpackChunkName:"eventLogin"*/ "../views/EventLogin.vue"),
    meta: {
      title: "Ting Museum - Mint",
      keepAlive: true,
    },
  },
];

const router = new VueRouter({
  routes,
  mode: "history",
  // base: '/Ting.Museum/',
});
router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

export default router;
