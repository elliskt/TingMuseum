<template>
  <div :class="
    time === 'night'
      ? 'Building nightBgc nightColor'
      : 'Building morningBgc morningColor'
  ">
    <div id="simple-preloader-background" ref="preLoader">
      <div id="simple-preloader-background">
        <div class="background-content">
          <div class="imgBoxc">
            <img src="../assets/images/load_rotate.png" />
            <img src="../assets/images/load_mask.png" />
          </div>
          <p class="background-text">loading...</p>
        </div>
      </div>
    </div>
    <!-- <div class="howToUseMuseum__container" v-if="showHowToUseMuseum">
      <div class="howToUseMuseum">
        <div class="topBanner">
          <img :src="url+museumList.image_banner" alt="" class="bannerImg">
        </div>
        <div class="museumInfo">
          {{museumList.name}}
          {{pageLoaded}}
          <button @click="enter">enter</button>

        </div>
      </div>
    </div> -->
    <Header />
    <div class="contentBox">
      <div v-if="iframShowOrNot" class="iframeContainer">
        <div class="closebtn" @click="closeIframe">
          <svg t="1646121603099" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
            p-id="5001" width="32" height="32">
            <path
              d="M830.2 193.8c-175.74-175.74-460.66-175.74-636.4 0-175.73 175.73-175.74 460.66 0 636.4s460.67 175.73 636.4 0c175.74-175.74 175.74-460.66 0-636.4zM595.38 674.93L512 591.55l-83.38 83.38c-21.96 21.96-57.58 21.97-79.55 0-21.96-21.96-21.96-57.59 0-79.55L432.45 512l-83.38-83.38c-21.96-21.96-21.96-57.59 0-79.55 21.97-21.97 57.59-21.96 79.55 0L512 432.45l83.38-83.38c21.97-21.97 57.59-21.96 79.55 0 21.97 21.97 21.97 57.58 0 79.55L591.55 512l83.38 83.38c21.97 21.97 21.97 57.58 0 79.55-21.96 21.96-57.58 21.97-79.55 0z"
              p-id="5002" fill="#ffffff"></path>
          </svg>
        </div>
        <iframe :src="'https://www.tingmuseum.art/windymuse#' + museumId" frameborder="0"
          class="windyMuseIframe"></iframe>
      </div>
      <div v-if="iframShowOrNotTwo" class="iframeContainer">
        <div class="closebtn" @click="closeIframeTwo">
          <svg t="1646121603099" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
            p-id="5001" width="32" height="32">
            <path
              d="M830.2 193.8c-175.74-175.74-460.66-175.74-636.4 0-175.73 175.73-175.74 460.66 0 636.4s460.67 175.73 636.4 0c175.74-175.74 175.74-460.66 0-636.4zM595.38 674.93L512 591.55l-83.38 83.38c-21.96 21.96-57.58 21.97-79.55 0-21.96-21.96-21.96-57.59 0-79.55L432.45 512l-83.38-83.38c-21.96-21.96-21.96-57.59 0-79.55 21.97-21.97 57.59-21.96 79.55 0L512 432.45l83.38-83.38c21.97-21.97 57.59-21.96 79.55 0 21.97 21.97 21.97 57.58 0 79.55L591.55 512l83.38 83.38c21.97 21.97 21.97 57.58 0 79.55-21.96 21.96-57.58 21.97-79.55 0z"
              p-id="5002" fill="#ffffff"></path>
          </svg>
        </div>
        <iframe src="https://place.linke.network/" frameborder="0" class="windyMuseIframe"></iframe>
      </div>
      <div class="topShadow"></div>
      <V3DApp :showHowToUseMuseum="showHowToUseMuseum" @changeIframeFlag="updateIframeFlag"
        @changeIframeFlagTwo="updateIframeFlagTwo" class="v3dapp" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

import V3DApp from "@/components/V3DApp.vue";
import Footer from "@/components/footer.vue";
import Header from "@/components/header.vue";
// import $ from "jquery";
export default {
  props: ["time"],
  data() {
    return {
      museumList: this.$store.state.museumList,
      url: window.urls,
      showHowToUseMuseum: true,
      isMounted: false,
      pageLoaded: false,
      iframeShowFlag: false,
      iframeShowFlagTwo: false, // 用于除了windy外的另外一个iframe

    };
  },
  watch: {
    windyMuseShowFlag(newV, oldV) {
      return newV;
    },
  },
  computed: {
    museumId() {
      return window.localStorage.getItem("museumId");
    },
    pageIsLoad() {
      this.getThisPageLoaded();
    },
    iframShowOrNot: {
      get() {
        if (this.iframeShowFlag) {
          $(".v3dapp").css({
            filter: "blur(14px)",
          });
        }
        return this.iframeShowFlag;
      },
      set(newValue) {
        return newValue;
      },
    },
    iframShowOrNotTwo: {
      get() {
        if (this.iframeShowFlagTwo) {
          $(".v3dapp").css({
            filter: "blur(14px)",
          });
        }
        return this.iframeShowFlagTwo;
      },
      set(newValue) {
        return newValue;
      },
    },
  },
  methods: {
    closeIframe() {
      this.iframeShowFlag = false;
      $(".v3dapp").css({
        filter: "blur(0px)",
      });
    },
    closeIframeTwo() {
      this.iframeShowFlagTwo = false;
      $(".v3dapp").css({
        filter: "blur(0px)",
      });
    },
    getThisPageLoaded() {
      if (
        document.getElementById("simple-preloader-background") !== undefined
      ) {
        this.pageLoaded = ok;
        return;
      } else {
        this.getThisPageLoaded();
      }
    },
    updateIframeFlag(event) {
      this.iframeShowFlag = event;
    },
    updateIframeFlagTwo(event) {
      this.iframeShowFlagTwo = event;
    },
    enter() { },
  },
  name: "Show",
  components: {
    V3DApp,
    Footer,
    Header,
  },
  mounted() { },
};
</script>

<style lang="less" scoped>
@import "~@/assets/stylesheet/Show.less";
</style>
