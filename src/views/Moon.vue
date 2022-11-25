<template>
  <div class="moon">
    <Header />
    <div class="starsRainContainer">
      <iframe src="static/stars.html" frameborder="0"></iframe>
    </div>
    <div class="moon__container">
      <div class="title">
        Ethereum Blocks:&nbsp;&nbsp;
        <vue-typer
          :text="ethBlocksResult"
          :repeat="0"
          :typeDelay="100"
          :eraseDelay="100"
          erase-style="backspace"
          caret-animation="smooth"
        ></vue-typer>
        <br />
      </div>
      <div class="moons">
        <div class="moon_0">
          <Transition
            enter-active-class="animate__animated animate__fadeIn"
            leave-active-class="animate__animated animate__fadeOut"
          >
            <img :src="moonURL0" alt="" v-show="showMoon0" rel="preload" />
          </Transition>
        </div>
        <div class="moon_1">
          <Transition
            enter-active-class="animate__animated animate__fadeIn"
            leave-active-class="animate__animated animate__fadeOut"
          >
            <img :src="moonURL1" alt="" v-show="showMoon1" rel="preload" />
          </Transition>
        </div>
        <div class="moon_2">
          <Transition
            enter-active-class="animate__animated animate__fadeIn"
            leave-active-class="animate__animated animate__fadeOut"
          >
            <img :src="moonURL2" alt="" v-show="showMoon2" rel="preload" />
          </Transition>
        </div>
        <div class="moon_3">
          <Transition
            enter-active-class="animate__animated animate__fadeIn"
            leave-active-class="animate__animated animate__fadeOut"
          >
            <img :src="moonURL3" alt="" v-show="showMoon3" rel="preload" />
          </Transition>
        </div>
        <div class="moon_4">
          <Transition
            enter-active-class="animate__animated animate__fadeIn"
            leave-active-class="animate__animated animate__fadeOut"
          >
            <img :src="moonURL4" alt="" v-show="showMoon4" rel="preload" />
          </Transition>
        </div>
        <div class="moon_5">
          <Transition
            enter-active-class="animate__animated animate__fadeIn"
            leave-active-class="animate__animated animate__fadeOut"
          >
            <img :src="moonURL5" alt="" v-show="showMoon5" rel="preload" />
          </Transition>
        </div>
        <div class="moon_6">
          <Transition
            enter-active-class="animate__animated animate__fadeIn"
            leave-active-class="animate__animated animate__fadeOut"
          >
            <img :src="moonURL6" alt="" v-show="showMoon6" rel="preload" />
          </Transition>
        </div>
        <div class="moon_7">
          <Transition
            enter-active-class="animate__animated animate__fadeIn"
            leave-active-class="animate__animated animate__fadeOut"
          >
            <img :src="moonURL7" alt="" v-show="showMoon7" rel="preload" />
          </Transition>
        </div>
        <div class="moon_8">
          <Transition
            enter-active-class="animate__animated animate__fadeIn"
            leave-active-class="animate__animated animate__fadeOut"
          >
            <img :src="moonURL8" alt="" v-show="showMoon8" rel="preload" />
          </Transition>
        </div>
        <div class="moon_9">
          <Transition
            enter-active-class="animate__animated animate__fadeIn"
            leave-active-class="animate__animated animate__fadeOut"
          >
            <img :src="moonURL9" alt="" v-show="showMoon9" rel="preload" />
          </Transition>
        </div>
        <div class="moon_10">
          <Transition
            enter-active-class="animate__animated animate__fadeIn"
            leave-active-class="animate__animated animate__fadeOut"
          >
            <img :src="moonURL10" alt="" v-show="showMoon10" rel="preload" />
          </Transition>
        </div>
        <div class="moon_11">
          <Transition
            enter-active-class="animate__animated animate__fadeIn"
            leave-active-class="animate__animated animate__fadeOut"
          >
            <img :src="moonURL11" alt="" v-show="showMoon11" rel="preload" />
          </Transition>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from "../components/header.vue";
import Footer from "../components/footer.vue";
import "animate.css";
export default {
  data() {
    return {
      showMoon0: false,
      showMoon1: false,
      showMoon2: false,
      showMoon3: true,
      showMoon4: false,
      showMoon5: false,
      showMoon6: false,
      showMoon7: false,
      showMoon8: false,
      showMoon9: false,
      showMoon10: false,
      showMoon11: false,
      moonURL0: require("../assets/moon/1.png"),
      moonURL1: require("../assets/moon/2.png"),
      moonURL2: require("../assets/moon/3.png"),
      moonURL3: require("../assets/moon/4.png"),
      moonURL4: require("../assets/moon/5.png"),
      moonURL5: require("../assets/moon/6.png"),
      moonURL6: require("../assets/moon/7.png"),
      moonURL7: require("../assets/moon/8.png"),
      moonURL8: require("../assets/moon/9.png"),
      moonURL9: require("../assets/moon/10.png"),
      moonURL10: require("../assets/moon/11.png"),
      moonURL11: require("../assets/moon/12.png"),
      timer: null,
      ethBlocksResult: "Wait a second...",
      arr: ["Hello", "From", "Vue Writer"],
      url: window.urls,
      starsURL: "../../src/stars.html",
    };
  },
  components: {
    Header,
    Footer,
  },
  methods: {
    change() {
      this.ethBlocksResult = this.ethBlocksResult + 1;
    },
    changeMoon0() {
      this.showMoon0 = true;
      this.showMoon1 = false;
      this.showMoon2 = false;
      this.showMoon3 = false;
      this.showMoon4 = false;
      this.showMoon5 = false;
      this.showMoon6 = false;
      this.showMoon7 = false;
      this.showMoon8 = false;
      this.showMoon9 = false;
      this.showMoon10 = false;
      this.showMoon11 = false;
      this.showMoon12 = false;
    },
    changeMoon1() {
      this.showMoon0 = false;
      this.showMoon1 = true;
      this.showMoon2 = false;
      this.showMoon3 = false;
      this.showMoon4 = false;
      this.showMoon5 = false;
      this.showMoon6 = false;
      this.showMoon7 = false;
      this.showMoon8 = false;
      this.showMoon9 = false;
      this.showMoon10 = false;
      this.showMoon11 = false;
      this.showMoon12 = false;
    },
    changeMoon2() {
      this.showMoon0 = false;
      this.showMoon1 = false;
      this.showMoon2 = true;
      this.showMoon3 = false;
      this.showMoon4 = false;
      this.showMoon5 = false;
      this.showMoon6 = false;
      this.showMoon7 = false;
      this.showMoon8 = false;
      this.showMoon9 = false;
      this.showMoon10 = false;
      this.showMoon11 = false;
      this.showMoon12 = false;
    },
    changeMoon3() {
      this.showMoon0 = false;
      this.showMoon1 = false;
      this.showMoon2 = false;
      this.showMoon3 = true;
      this.showMoon4 = false;
      this.showMoon5 = false;
      this.showMoon6 = false;
      this.showMoon7 = false;
      this.showMoon8 = false;
      this.showMoon9 = false;
      this.showMoon10 = false;
      this.showMoon11 = false;
      this.showMoon12 = false;
    },
    changeMoon4() {
      this.showMoon0 = false;
      this.showMoon1 = false;
      this.showMoon2 = false;
      this.showMoon3 = false;
      this.showMoon4 = true;
      this.showMoon5 = false;
      this.showMoon6 = false;
      this.showMoon7 = false;
      this.showMoon8 = false;
      this.showMoon9 = false;
      this.showMoon10 = false;
      this.showMoon11 = false;
      this.showMoon12 = false;
    },
    changeMoon5() {
      this.showMoon0 = false;
      this.showMoon1 = false;
      this.showMoon2 = false;
      this.showMoon3 = false;
      this.showMoon4 = false;
      this.showMoon5 = true;
      this.showMoon6 = false;
      this.showMoon7 = false;
      this.showMoon8 = false;
      this.showMoon9 = false;
      this.showMoon10 = false;
      this.showMoon11 = false;
      this.showMoon12 = false;
    },
    changeMoon6() {
      this.showMoon0 = false;
      this.showMoon1 = false;
      this.showMoon2 = false;
      this.showMoon3 = false;
      this.showMoon4 = false;
      this.showMoon5 = false;
      this.showMoon6 = true;
      this.showMoon7 = false;
      this.showMoon8 = false;
      this.showMoon9 = false;
      this.showMoon10 = false;
      this.showMoon11 = false;
      this.showMoon12 = false;
    },
    changeMoon7() {
      this.showMoon0 = false;
      this.showMoon1 = false;
      this.showMoon2 = false;
      this.showMoon3 = false;
      this.showMoon4 = false;
      this.showMoon5 = false;
      this.showMoon6 = false;
      this.showMoon7 = true;
      this.showMoon8 = false;
      this.showMoon9 = false;
      this.showMoon10 = false;
      this.showMoon11 = false;
      this.showMoon12 = false;
    },
    changeMoon8() {
      this.showMoon0 = false;
      this.showMoon1 = false;
      this.showMoon2 = false;
      this.showMoon3 = false;
      this.showMoon4 = false;
      this.showMoon5 = false;
      this.showMoon6 = false;
      this.showMoon7 = false;
      this.showMoon8 = true;
      this.showMoon9 = false;
      this.showMoon10 = false;
      this.showMoon11 = false;
      this.showMoon12 = false;
    },
    changeMoon9() {
      this.showMoon0 = false;
      this.showMoon1 = false;
      this.showMoon2 = false;
      this.showMoon3 = false;
      this.showMoon4 = false;
      this.showMoon5 = false;
      this.showMoon6 = false;
      this.showMoon7 = false;
      this.showMoon8 = false;
      this.showMoon9 = true;
      this.showMoon10 = false;
      this.showMoon11 = false;
      this.showMoon12 = false;
    },
    changeMoon10() {
      this.showMoon0 = false;
      this.showMoon1 = false;
      this.showMoon2 = false;
      this.showMoon3 = false;
      this.showMoon4 = false;
      this.showMoon5 = false;
      this.showMoon6 = false;
      this.showMoon7 = false;
      this.showMoon8 = false;
      this.showMoon9 = false;
      this.showMoon10 = true;
      this.showMoon11 = false;
      this.showMoon12 = false;
    },
    changeMoon11() {
      this.showMoon0 = false;
      this.showMoon1 = false;
      this.showMoon2 = false;
      this.showMoon3 = false;
      this.showMoon4 = false;
      this.showMoon5 = false;
      this.showMoon6 = false;
      this.showMoon7 = false;
      this.showMoon8 = false;
      this.showMoon9 = false;
      this.showMoon10 = false;
      this.showMoon11 = true;
      this.showMoon12 = false;
    },
  },
  async mounted() {
    let img0 = new Image();
    let img1 = new Image();
    let img2 = new Image();
    let img3 = new Image();
    let img4 = new Image();
    let img5 = new Image();
    let img6 = new Image();
    let img7 = new Image();
    let img8 = new Image();
    let img9 = new Image();
    let img10 = new Image();
    let img11 = new Image();
    img0.onload = () => {
      this.moonURL0 = img0.src;
    };
    img1.onload = () => {
      this.moonURL1 = img1.src;
    };
    img2.onload = () => {
      this.moonURL2 = img2.src;
    };
    img3.onload = () => {
      this.moonURL3 = img3.src;
    };
    img4.onload = () => {
      this.moonURL4 = img4.src;
    };
    img5.onload = () => {
      this.moonURL5 = img5.src;
    };
    img6.onload = () => {
      this.moonURL6 = img6.src;
    };
    img7.onload = () => {
      this.moonURL7 = img7.src;
    };
    img8.onload = () => {
      this.moonURL8 = img8.src;
    };
    img9.onload = () => {
      this.moonURL9 = img9.src;
    };
    img10.onload = () => {
      this.moonURL10 = img10.src;
    };
    img11.onload = () => {
      this.moonURL11 = img11.src;
    };
    img0.src = "../assets/moon/1.png";
    img1.src = "../assets/moon/2.png";
    img2.src = "../assets/moon/3.png";
    img3.src = "../assets/moon/4.png";
    img4.src = "../assets/moon/5.png";
    img5.src = "../assets/moon/6.png";
    img6.src = "../assets/moon/7.png";
    img7.src = "../assets/moon/8.png";
    img8.src = "../assets/moon/9.png";
    img9.src = "../assets/moon/10.png";
    img10.src = "../assets/moon/11.png";
    img11.src = "../assets/moon/12.png";

    this.timer = setInterval(async () => {
      await this.$axios
        .post(this.url + "eth_blocks")
        .then((res) => {
          this.ethBlocksResult = res.data.blocks.toString();
          if (res.data.blocks % 12 == 0) {
            this.changeMoon0();
          } else if (res.data.blocks % 12 == 1) {
            this.changeMoon1();
          } else if (res.data.blocks % 12 == 2) {
            this.changeMoon2();
          } else if (res.data.blocks % 12 == 3) {
            this.changeMoon3();
          } else if (res.data.blocks % 12 == 4) {
            this.changeMoon4();
          } else if (res.data.blocks % 12 == 5) {
            this.changeMoon5();
          } else if (res.data.blocks % 12 == 6) {
            this.changeMoon6();
          } else if (res.data.blocks % 12 == 7) {
            this.changeMoon7();
          } else if (res.data.blocks % 12 == 8) {
            this.changeMoon8();
          } else if (res.data.blocks % 12 == 9) {
            this.changeMoon9();
          } else if (res.data.blocks % 12 == 10) {
            this.changeMoon10();
          } else if (res.data.blocks % 12 == 11) {
            this.changeMoon11();
          }
        })
        .catch((error) => {
          this.ethBlocksResult = "";
          this.$notify({
            title: "Unknown Ethereum Blocks!",
            type: "error",
          });
        });
    }, 5000);
  },
  destroyed() {
    clearInterval(this.timer);
  },
};
</script>

<style lang="less" scoped>
.moon {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  background-color: transparent;
  & .starsRainContainer {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    & iframe {
      width: 100%;
      height: 100%;
      object-fit: cover;
      z-index: 99;
    }
  }
  & .moon__container {
    width: 50rem;
    height: 40rem;
    min-height: 40rem;
    margin: 0 auto;
    overflow: hidden;
    margin-bottom: 10vh;
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    @font-face {
      font-family: "mobileFont";
      src: url("../assets/fontSelf/MobileFont.woff") format("woff"),
        /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
          url("../assets/fontSelf/MobileFont.ttf") format("truetype"); /* Chrome 4+, Firefox 3.5, Opera 10+, Safari 3—5 */
      font-weight: normal;
      font-style: normal;
    }
    & .title {
      width: 100%;
      font-family: "mobileFont";
      height: 10%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2rem;
      position: relative;
    }
    & .moons {
      width: 100%;
      height: 90%;
      position: relative;
      & .moon_0,
      .moon_1,
      .moon_2,
      .moon_3,
      .moon_4,
      .moon_5,
      .moon_6,
      .moon_7,
      .moon_8,
      .moon_9,
      .moon_10,
      .moon_11 {
        width: 100%;
        height: 100%;

        text-align: center;
        & img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          padding: 0;
          margin: 0;
          position: absolute;
          top: 0;
          left: 33px;
        }
      }
    }
  }
  @media screen and (max-height: 840px) {
    .starsRainContainer {
      height: 120%;
    }
  }
  @media screen and (max-height: 700px) {
    .starsRainContainer {
      height: 150%;
    }
  }
  @media screen and (max-height: 550px) {
    .starsRainContainer {
      height: 180%;
    }
  }
  @media screen and (max-height: 440px) {
    .starsRainContainer {
      height: 210%;
    }
  }
  @media screen and (max-width: 820px) {
    .moon__container {
      width: 40rem;
    }
  }
  @media screen and (max-width: 650px) {
    .moon__container {
      width: 35rem;
      & .moons img {
        width: 88% !important;
        height: 79% !important;
        left: 60px !important;
      }
    }
  }
  @media screen and (max-width: 570px) {
    .moon__container {
      width: 30rem;
      & .title {
        font-size: 1.5rem;
      }
      & .moons img {
        width: 88% !important;
        height: 70% !important;
        left: 60px !important;
      }
    }
  }
  @media screen and (max-width: 500px) {
    .moon__container {
      width: 26rem;
      & .title {
        font-size: 1.5rem;
      }
      & .moons img {
        width: 88% !important;
        height: 62% !important;
        left: 48px !important;
      }
    }
  }
  @media screen and (max-width: 420px) {
    .moon__container {
      width: 26rem;
      & .title {
        font-size: 1.2rem;
      }
      & .moons img {
        width: 88% !important;
        height: 62% !important;
        left: 50px !important;
      }
    }
  }
  @media screen and (max-width: 390px) {
    .moon__container {
      width: 26rem;
      & .title {
        font-size: 1.2rem;
      }
      & .moons img {
        width: 88% !important;
        height: 62% !important;
        left: 35px !important;
      }
    }
  }
}
</style>
