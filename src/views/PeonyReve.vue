<template>
  <div class="peonyReve">
    <Header />
    <div class="peonyReve__container">
      <div class="content">
        <video
          class="peonyReveVideo"
          src="https://tinigmuseum-bucket.s3.ap-east-1.amazonaws.com/model-source/Reve4.m4v"
          loop
          controls
        ></video>
        <div class="title">
          <vue-typer
            :text="'《牡丹亭Rêve》'"
            :repeat="infinite"
            :typeDelay="100"
            :eraseDelay="100"
            erase-style="clear"
            caret-animation="smooth"
          ></vue-typer>
        </div>
      </div>
    </div>
    <div class="foot">
      <Footer />
    </div>
  </div>
</template>

<script>
import Header from "../components/header.vue";
import Footer from "../components/footer.vue";
export default {
  data() {
    return {};
  },
  components: {
    Header,
    Footer,
  },
  methods: {},
};
</script>

<style lang="less" scoped>
.peonyReve {
  width: 100%;
  height: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  background-color: #141416;
  & .peonyReve__container {
    width: 50rem;
    height: 40rem;
    min-height: 40rem;
    margin: 0 auto;
    overflow: hidden;
    margin-bottom: 5rem;
    margin-top: 2rem;
    & .content {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      position: relative;
      & .peonyReveVideo {
        width: 100%;
        height: 80%;
        object-fit: cover;
        border-radius: 20px 20px 0 0;
        background-color: rgba(79, 75, 75, 0.8);
      }

      & .title {
        width: 100%;
        height: 20%;
        background-color: #000;
        border-radius: 0 0 20px 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2rem;
        font-family: "mobileFont";
        color: white;
        text-shadow: 0 0 5px white, 0 0 10px magenta, 0 0 50px magenta;
        overflow: hidden;
        white-space: nowrap;
        @font-face {
          font-family: "mobileFont";
          src: url("../assets/fontSelf/MobileFont.woff") format("woff"),
            /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
              url("../assets/fontSelf/MobileFont.ttf") format("truetype"); /* Chrome 4+, Firefox 3.5, Opera 10+, Safari 3—5 */
          font-weight: normal;
          font-style: normal;
        }
      }
    }
  }
  @media screen and (max-width: 840px) {
    .peonyReve__container {
      width: 45rem;
    }
  }
  @media screen and (max-width: 750px) {
    .peonyReve__container {
      width: 40rem;
    }
  }
  @media screen and (max-width: 660px) {
    .peonyReve__container {
      width: 35rem;
      height: 33rem;
    }
  }
  @media screen and (max-width: 578px) {
    .peonyReve__container {
      width: 30rem;
    }
  }
  @media screen and (max-width: 515px) {
    .peonyReve__container {
      width: 28rem;
    }
  }
  @media screen and (max-width: 430px) {
    .peonyReve__container {
      width: 25rem;
    }
  }
}
</style>
