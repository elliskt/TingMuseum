<template>
  <div :id="containerId">
    <!-- 画布参数 -->
    <!-- <div id="msgBox" class="msgBox" @click="openBox">
      <div><span>作品信息</span></div>
      <div class="content">
        <p @click="choseMsg('Imgmsg1')">
          <span id="msg1" class="msgnum"></span>
        </p>
        <p @click="choseMsg('Imgmsg2')">
          <span id="msg2" class="msgnum"></span>
        </p>
        <p @click="choseMsg('Imgmsg3')">
          <span id="msg3"></span>
        </p>
      </div>
    </div> -->
    <div id="msgBox" class="msgBoxInV3dApp">
      <div class="msgBoxupsidePartInV3dApp">
        <div class="textBoxInV3dApp">{{ $t("collectionInfo.info") }}</div>
        <!-- <div class="axCloseInV3dApp">X</div> -->
        <svg @click="closeMsgBox" t="1648024951056" class="icon axCloseInV3dApp" viewBox="0 0 1025 1024" version="1.1"
          xmlns="http://www.w3.org/2000/svg" p-id="2214" width="22" height="22">
          <path
            d="M982.668821 313.74918c-25.810101-60.752236-62.714-115.373446-109.685763-162.346233-46.972787-46.971763-101.593997-83.875662-162.346233-109.685763C647.666853 14.966132 580.925912 1.401699 512.268258 1.401699S376.868639 14.966132 313.898667 41.717184c-60.752236 25.810101-115.373446 62.714-162.346233 109.685763-46.971763 46.972787-83.875662 101.593997-109.685763 162.346233C15.115619 376.719151 1.551186 443.460092 1.551186 512.118771S15.115619 647.517366 41.866671 710.487337c25.810101 60.75326 62.714 115.37447 109.685763 162.346233 46.971763 46.972787 101.592974 83.876686 162.346233 109.685763 62.969971 26.752076 129.710912 40.316509 198.369591 40.316509s135.398595-13.564433 198.368567-40.316509c60.75326-25.809077 115.37447-62.712976 162.346233-109.685763 46.972787-46.971763 83.876686-101.592974 109.685763-162.346233 26.752076-62.969971 40.316509-129.710912 40.316509-198.368567S1009.419873 376.719151 982.668821 313.74918zM937.435615 691.271058c-23.333323 54.923257-56.71096 104.317532-99.204249 146.811845-42.494313 42.493289-91.888588 75.870926-146.811845 99.204249-56.8584 24.155503-117.133505 36.403219-179.152287 36.403219-62.018782 0-122.293887-12.247716-179.152287-36.403219-54.923257-23.333323-104.317532-56.71096-146.810821-99.204249-42.493289-42.494313-75.870926-91.888588-99.204249-146.811845C62.944374 634.412658 50.697682 574.136529 50.697682 512.118771c0-62.018782 12.247716-122.293887 36.403219-179.152287 23.333323-54.923257 56.709936-104.317532 99.204249-146.810821s91.888588-75.870926 146.810821-99.204249c56.8584-24.155503 117.133505-36.403219 179.152287-36.403219 62.017758 0 122.292863 12.247716 179.152287 36.403219 54.923257 23.333323 104.317532 56.709936 146.810821 99.204249 42.494313 42.493289 75.870926 91.888588 99.205273 146.810821 24.155503 56.8584 36.403219 117.134529 36.403219 179.152287S961.591118 634.412658 937.435615 691.271058z"
            p-id="2215" fill="#ffffff"></path>
          <path
            d="M704.62457 319.769626c-9.997216-9.996192-26.203273-9.996192-36.199466 0L512.382933 475.810773 356.341786 319.769626c-9.996192-9.996192-26.204297-9.996192-36.199466 0-9.996192 9.996192-9.996192 26.203273 0 36.199466l156.041147 156.041147L320.14232 668.05241c-9.996192 9.997216-9.996192 26.204297 0 36.199466 4.997584 4.998608 11.549426 7.496888 18.100245 7.496888s13.101637-2.49828 18.100245-7.496888l156.041147-156.041147L668.424081 704.251876c4.998608 4.998608 11.548403 7.496888 18.100245 7.496888s13.101637-2.49828 18.100245-7.496888c9.996192-9.996192 9.996192-26.203273 0-36.199466L548.583423 512.011263l156.041147-156.041147C714.620762 345.973923 714.620762 329.765818 704.62457 319.769626z"
            p-id="2216" fill="#ffffff"></path>
        </svg>
      </div>
      <div class="contentPartInV3dApp" @click="goCollectionDetailPage()" ref="info">
        <p id="msg1" class="msgnum"></p>
        <p id="msg2" class="msgnum"></p>
      </div>
    </div>
  </div>
</template>
<script>
import * as v3dAppAPI from "../3dpart/model.js";
import { pinitFirst, setScreen } from "../3dpart/model.js";
// import $ from "jquery";
export default {
  name: "V3DApp",
  data() {
    return {
      containerId: v3dAppAPI.CONTAINER_ID,
      dialogVisible: false,
      dialogVisible1: true,
      dialogVisible2: false,
      disabled: false,
      asset: true,
      status: 1,
      statusa: 0,
      imgMsg: null,
      productInfo: "",
      url: window.urls,
      result: {},
      setting: {
        title: "Ting Museum - NFT Collections Platform",
        image:
          "https://www.tingmuseum.art/api/ting_museum_database/cover_page/twitter.png",
        description:
          "Ting Museum, an immersive NFT art metaverse experience venue. Ting Museum is dedicated to providing users with a new combination of science fiction visual, auditory and gaming experience, presenting the most avant-garde, interesting and high-end immersive meta-universe.",
      },
    };
  },
  app: null,
  metaInfo() {
    return {
      meta: [
        {
          name: "image",
          content: this.setting.keywords,
        },
        {
          name: "title",
          content: this.setting.title,
        },
        {
          name: "description",
          content: this.setting.description,
        },
      ],
    };
  },
  created() {
    this.getshowdatabase();
    window.localStorage.setItem("fromV3dApp", true);
  },
  mounted() {
    window.localStorage.setItem("museumId", this.$route.query.museumId);
    this.getWidth();
    window.addEventListener(
      "message",
      function (event) {
        if (event.origin === "http://localhost:8082/") {
          const { key } = event.data;
          const value = localStorage.getItem(key);
          event.source.postMessage(
            {
              value,
            },
            event.origin
          );
        }
      },
      false
    );
    /*
      创建屏幕对象按照modle.js中函数对应用法，传入适当的参数
      */
    this.setScreen();
    const _that = this;

    v3dAppAPI
      .createApp(function () {
        // 参数一：对应物体名称
        // 参数二：点击物体后对应操作响应
        v3dAppAPI.objRegistClickFun("Screen-5", function () {
          // 弹窗的逻辑
          _that.$emit("changeIframeFlag", true);
        });
        v3dAppAPI.objRegistClickFun("Screen-3", function () {
          // 弹窗的逻辑
          _that.$emit("changeIframeFlagTwo", true);
        });
        // 修改街机封面
        /**
         * @param {*} nodeName gameScreen1~11
         * @param {*} materialName gameScreenTexture1~11
         * @param {*} texture 填写图片的路径
         */
        v3dAppAPI.replaceScreen(
          "gameScreen1",
          "gameScreentexture1",
          "/comingsoon.jpeg"
        );
        v3dAppAPI.replaceScreen(
          "gameScreen2",
          "gameScreentexture2",
          "/comingsoon.jpeg"
        );
        v3dAppAPI.replaceScreen(
          "gameScreen3",
          "gameScreentexture3",
          "IMG_5866.PNG"
        );
        v3dAppAPI.replaceScreen(
          "gameScreen4",
          "gameScreentexture4",
          "/comingsoon.jpeg"
        );
        v3dAppAPI.replaceScreen(
          "gameScreen5",
          "gameScreentexture5",
          "/windy.png"
        );
        v3dAppAPI.replaceScreen(
          "gameScreen6",
          "gameScreentexture6",
          "/comingsoon.jpeg"

        );
        v3dAppAPI.replaceScreen(
          "gameScreen7",
          "gameScreentexture7",
          "/comingsoon.jpeg"
        );
        v3dAppAPI.replaceScreen(
          "gameScreen8",
          "gameScreentexture8",
          "/comingsoon.jpeg"
        );
        v3dAppAPI.replaceScreen(
          "gameScreen9",
          "gameScreentexture9",
          "/comingsoon.jpeg"
        );
        v3dAppAPI.replaceScreen(
          "gameScreen10",
          "gameScreentexture10",
          "/comingsoon.jpeg"
        );
        v3dAppAPI.replaceScreen(
          "gameScreen11",
          "gameScreentexture11",
          "/comingsoon.jpeg"
        );
      })
      .then((app) => {
        this.$options.app = app;
      });
  },
  methods: {
    getWidth() {
      if (document.body.clientWidth <= 1350) {
        this.$router.push({
          path: "/browsing",
          query: {
            model: this.$route.query.model,
            museumId: this.$route.query.museumId,
          },
        });
      }
    },
    setScreen() {
      document.addEventListener("makeit", function (e) {
        console.log("???:", e);
        v3dAppAPI.setScreen(
          "windyMuse",
          "http://ting.windymuse.cn/",
          1050,
          800,
          0.01
        );
      });
    },
    async getshowdatabase() {
      var formData = new FormData();
      formData.append("museum_id", this.$route.query.museumId);
      await this.$axios
        .post(this.url + "enter_museum", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          this.result = res.data;
          this.$emit("museumNameChanged", res.data.name);
          localStorage.setItem("firstData", JSON.stringify(res.data));
          // document.querySelector('meta[name="twitter:title"]').setAttribute("content", res.data.name);
          // document.querySelector('meta[name="twitter:description"]').setAttribute("content", res.data
          //   .description);
          // document.querySelector('meta[name="twitter:image"]').setAttribute("content", this.url + res.data
          //   .image_banner);
          this.setting.title = res.data.name;
          this.setting.image = this.url + res.data.image_banner;
          this.setting.description = res.data.description;
          // pinitFirst(res.data);
          // setTimeout(() => {
          //   v3d.puzzles.procedures.pinitFirst(res.data, window.urls);
          // }, 5000);
        });
    },
    goCollectionDetailPage() {
      this.productInfo = v3d.puzzles.procedures.getNowproduct();
      var res = this.result;
      for (let i in Object.keys(res)) {
        if (Object.keys(res)[i] == this.productInfo) {
          let route = this.$router.resolve({
            path: "/collection",
            query: {
              label: Object.values(res)[i].label.toLowerCase(),
              token_id: Object.values(res)[i].token_id,
            },
          });
          window.open(route.href, "_blank");
          return;
        }
      }
    },
    closeMsgBox() {
      v3d.puzzles.procedures.closeMsgBox();
    },
    choseMsg(msg) {
      $(".mmsgBox >p").css("display", "none");
      $(".mmsgBox >#" + msg).css("display", "block");
    },
    openBox() {
      if ($("#videoBox").attr("src")) {
        $("#videoBox").trigger("play");
      }
      this.asset = false;
      v3d.puzzles.procedures.openBox();
    },
    closeBox() {
      if ($("#videoBox").attr("src")) {
        $("#videoBox").trigger("pause");
      }
      this.asset = true;
      v3d.puzzles.procedures.closeBox();
    },
    ChangeImg(obj) {
      v3d.puzzles.procedures.ChangeImg(obj);
    },
    toAssets() {
      this.dialogVisible2 = false;
      this.asset = true;
    },
    but(e) {
      this.status = e;
    },
    dsic() {
      window.open("Discover.html");
    },
    back() {
      this.$router.push({
        name: "Home",
      });
    },

    personla() {
      window.open("personal.html");
    },
    Discover() {
      window.open("Discover.html");
    },
    chonese() {
      window.open("choose.html");
    },
    handleRemove(file) { },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleDownload(file) { },
  },
  beforeDestroy() {
    if (this.$options.app) {
      this.$options.app.dispose();
      this.$options.app = null;
    }
  },
};
</script>
<style>
@import "../3dpart/model.css";
/* @import "../assets/css/guanwang.css"; */
/* @import "../assets/css/index.css"; */
</style>
<style lang="less">
#imgBox .mmsgBox {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  font-family: "tingMuseum" !important;

  #msg1 {
    font-size: 2.1rem;
  }
}

.content {
  p {
    color: #000;
  }
}

.mmsgBox {
  p {
    color: #000;
  }

  span {
    color: #000;
  }
}

.msgBoxInV3dApp {
  font-family: "MyriadConcept" !important;
  width: 25rem;
  height: 8.8rem;
  margin: 0 auto;
  background-color: #fcfcfd;
  border-radius: 10px;
  overflow: hidden;
  display: none;
  margin-top: 80vh;

  #msg2 {
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .contentPartInV3dApp {
    height: 77%;
    width: 100%;
    position: relative;
    bottom: 0;
    display: flex;
    flex-direction: column;

    justify-content: space-around;

    .msgnum {
      display: inline-block;
      color: #000 !important;
      width: 95%;
    }
  }

  .msgBoxupsidePartInV3dApp {
    background-color: #000;
    height: 23%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-content: center;
    position: relative;

    & .textBoxInV3dApp {
      pointer-events: none;
      height: 100%;
      display: flex;
      align-items: center;
    }

    & .axCloseInV3dApp {
      // font-family: none !important;
      // border: 1px solid #fcfcfd;
      // border-radius: 12px;
      // height: 16px;
      // width: 16px;
      position: absolute;
      top: 20%;
      right: 2%;
      cursor: pointer;
      // text-align: center;
      // line-height: 21px;
      // color: #fcfcfd;
      // cursor: pointer;
    }
  }
}

@media screen and(max-width: 500px) {
  .msgBoxInV3dApp {
    width: 23rem;
    height: 8.8rem;
    margin-top: 15vh;
  }
}

.msgnum {
  font-weight: 600;
}

#msg3 {
  display: none;
}
</style>
