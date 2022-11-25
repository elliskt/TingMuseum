<template>
  <div class="welcome-container">
    <div class="tingTitle">
      <p class="par animate__animated animate__fadeIn">
        <img src="../assets/TT/切图/2x/资源 1.svg" alt="" />
      </p>
      <div class="loading" v-if="loadingVal">
        <div class="loading-text">
          <span class="loading-text-words">L</span>
          <span class="loading-text-words">O</span>
          <span class="loading-text-words">A</span>
          <span class="loading-text-words">D</span>
          <span class="loading-text-words">I</span>
          <span class="loading-text-words">N</span>
          <span class="loading-text-words">G</span>
        </div>
      </div>
      <a href="javascript:void" @click="goToHome" class="animate__animated animate__fadeIn">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        Enter
      </a>
    </div>
    <div class="modelContainer animate__animated animate__fadeIn">
      <model-viewer class="model_viewer" loading="eager" reveal="auto" autoplay ref="model" camera-controls
        auto-rotate="true" src="https://tinigmuseum-bucket.s3.ap-east-1.amazonaws.com/model-source/Reve.glb">
      </model-viewer>
    </div>
  </div>
</template>

<script>
import * as model from "@google/model-viewer";
import "animate.css";
export default {
  data() {
    return {
      loading: true,
      timerOfLoading: null,
    };
  },
  computed: {
    loadingVal: {
      get() {
        return this.loading;
      },
    },
  },
  methods: {
    goToHome() {
      this.$router.push({
        path: "/home",
      });
    },
    createSetIntervalOfLoading() {
      this.stopSetIntervalOfLoading();
      const _this = this;
      _this.checkModelIsLoaded();
      this.timerOfLoading = setInterval(() => {
        _this.checkModelIsLoaded();
      }, 200);
    },
    // 关闭轮询
    stopSetIntervalOfLoading() {
      if (this.timerOfLoading) {
        clearInterval(this.timerOfLoading);
        this.timerOfLoading = null;
      }
    },
    checkModelIsLoaded() {
      if (this.$refs.model.loaded) {
        console.log("load success:", this.$refs.model.loaded);
        this.stopSetIntervalOfLoading();
        this.loading = false;
        return true;
      } else {
        console.log("load failure:", this.$refs.model.loaded);
        this.loading = true;
        return false;
      }
    },
  },
  mounted() {
    this.createSetIntervalOfLoading();
  },
};
</script>

<style lang="scss">
.welcome-container {
  width: 100%;
  height: 100%;
  overflow: auto;
  color: white;
  background-color: black;
  position: relative;
  z-index: 10;

  & .tingTitle {
    width: 50%;
    height: 314px;
    display: flex;
    align-items: center;
    flex-direction: column;
    margin: 0 auto;
    margin-top: 8vh;
    position: relative;
    z-index: 999999;

    & .par {
      font-size: 5rem;
      font-family: "Courgette";
      position: relative;
      z-index: inherit;
      & img {
        width: 300px;
        height: 200px;
      }
    }

    @mixin position-center($text-align: center) {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
      text-align: $text-align;
    }

    .loading {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: #000;
      z-index: 999;
    }

    .loading-text {
      @include position-center;
      width: 100%;
      height: 100px;
      line-height: 100px;
      font-size: 2rem;

      span {
        display: inline-block;
        margin: 0 5px;
        color: #fff;
        font-family: "HelveticaNeue";
        user-select: none;

        @for $i from 0 through 6 {
          &:nth-child(#{$i + 1}) {
            filter: blur(0px);
            animation: blur-text 1.5s (#{$i/5})+s infinite linear alternate;
          }
        }
      }
    }

    @keyframes blur-text {
      0% {
        filter: blur(0px);
      }

      100% {
        filter: blur(5px);
      }
    }

    & a {
      position: relative;
      z-index: 999;
      display: inline-block;
      padding: 15px 30px;
      color: #93fc3c;
      text-transform: uppercase;
      letter-spacing: 4px;
      text-decoration: none;
      font-size: 24px;
      overflow: hidden;
      transition: 0.2s;
      box-sizing: border-box;
      font-family: "MyriadConcept";
      font-size: 1.5rem;

      &:hover {
        color: #255784;
        background-color: #93fc3c;
        box-shadow: 0 0 10px #93fc3c, 0 0 40px #93fc3c, 0 0 80px #93fc3c;
        transition-delay: 1s;
      }

      & span {
        position: absolute;
        display: block;
      }

      & span:nth-child(1) {
        top: 0;
        left: -100%;
        width: 100%;
        height: 2px;
        background: linear-gradient(90deg, transparent, #93fc3c);
      }

      &:hover span:nth-child(1) {
        left: 100%;
        transition: 1s;
      }

      & span:nth-child(3) {
        bottom: 0;
        right: -100%;
        width: 100%;
        height: 2px;
        background: linear-gradient(270deg, transparent, #93fc3c);
      }

      &:hover span:nth-child(3) {
        right: 100%;
        transition: 1s;
        transition-delay: 0.5s;
      }

      & span:nth-child(2) {
        top: -100%;
        right: 0;
        width: 2px;
        height: 100%;
        background: linear-gradient(180deg, transparent, #93fc3c);
      }

      &:hover span:nth-child(2) {
        top: 100%;
        transition: 1s;
        transition-delay: 0.25s;
      }

      & span:nth-child(4) {
        bottom: -100%;
        left: 0;
        width: 2px;
        height: 100%;
        background: linear-gradient(360deg, transparent, #93fc3c);
      }

      &:hover span:nth-child(4) {
        bottom: 100%;
        transition: 1s;
        transition-delay: 0.75s;
      }
    }
  }

  & #indexLizi {
    position: absolute;
    height: 100%;
    top: 0;
    width: 100%;

    & div {
      position: absolute !important;
      top: 0 !important;
      height: 100% !important;
      width: 100%;
      z-index: 100;
    }
  }
}

.modelContainer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  .model_viewer {
    width: 100%;
    height: 100%;
    --poster-color: #000;
  }
}
</style>
