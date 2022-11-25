<template>
  <div :class="
    time === 'night'
      ? 'Browsing nightBgc nightColor'
      : 'Browsing morningBgc morningColor'
  ">
    <div id="simple-preloader-background">
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
    <div class="arrowOfBrowsingHeaderShowOrNot">
      <div class="svgContainer">
        <svg @click="showHeader" t="1647946747554" class="icon" viewBox="0 0 2560 1024" version="1.1"
          xmlns="http://www.w3.org/2000/svg" p-id="2202" width="22" height="22">
          <path d="M0 0 301.1072 0 1186.2528 762.5984 2071.424 0 2372.5056 0 1186.2528 1022.0032Z" p-id="2203"
            fill="#ffffff"></path>
        </svg>
      </div>
    </div>
    <div class="browsingHeader">
      <div class="scroll-container">
        <div class="scroll-text">
          <span>&emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp;
            &emsp; &emsp; &emsp; WELCOME TO TING'S MUSEUM ! &emsp; &emsp; &emsp;
            &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp;
          </span>
          <span>PLAY THE ARCADE GAME AT THE END OF HALLWAY FOR A CHANCE OF FREE
            MINT</span>
        </div>
      </div>
      <div class="browsingHeader__items">
        <div class="gbtn" @click="back">← Go Home</div>
        <div class="twitterAndRedeem">
          <img src="../assets/home/Twitter.svg" class="redeemCode" @click="openTwitter" alt="" />
          <img src="../assets/header/redeemCode.jpg" alt="" class="redeemCode" @click="openRedeemDialog" />
        </div>
      </div>
    </div>
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
      <V3DApp :showHowToUseMuseum="showHowToUseMuseum" @changeIframeFlag="updateIframeFlag"
        @changeIframeFlagTwo="updateIframeFlagTwo" class="v3dapp" ref="myIframe" />
      <div class="buttomShadow"></div>
    </div>
    <!-- 在展馆中分享到推特的弹窗 -->
    <el-dialog :append-to-body="true" :visible.sync="shareInTwitterDialog" :show-close="false"
      :close-on-click-modal="false" :close-on-press-escape="false" custom-class="shareInTwitter">
      <div class="twitterDialog">
        <h2>Share Ting Museum in Twitter?</h2>
        <div class="twoBtns">
          <div class="confirm" @click="goToTwitter">Confirm</div>
          <div class="cancel" @click="closeShareInTwitterDialog">Cancel</div>
        </div>
      </div>
    </el-dialog>
    <!-- 操作说明的弹窗 -->
    <el-dialog :append-to-body="false" :modal-append-to-body="false" :visible.sync="controlInstructionDialog"
      :show-close="false" :close-on-click-modal="true" :close-on-press-escape="true" custom-class="controlInstruction">
      <div class="controlDialog__container">
        <div class="esc">
          <div class="text">
          <span class="spanPart1">Press</span> <img src="../assets/v3dMuseum/esc.png" alt="" /> <span
            class="spanPart2">to display
            the mouse cursor</span>
        </div>
        </div>
        <div class="control">
          <div class="wasd">
            <div class="wasd__info">
              <p>Use your keyboard to move</p>
              <img src="../assets/v3dMuseum/keyboard.png" alt="" />
            </div>
          </div>
          <div class="drag">
            <div class="drag__info">
              <p>Use your mouse to rotate</p>
              <img src="../assets/v3dMuseum/mousemove.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
    <!-- 点击Redeem Code的弹窗 -->
    <el-dialog :visible.sync="redeemShown" :close-on-click-modal="true" :close-on-press-escape="false"
      :show-close="false" @close="closeRedeemDialog" custom-class="redeemCodeDialog" :modal-append-to-body="false">
      <div slot="title" class="headerOfRedeem">
        <div class="svgContainer" @click="closeRedeemDialog">
          <svg t="1640932429674" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
            p-id="2796" width="32" height="32">
            <path
              d="M343.104 319.008l-24.128 24.128 168.896 168.896-168.096 168.096 24.128 24.128 168.096-168.096 168.096 168.096 24.128-24.128-168.096-168.096 168.896-168.896-24.128-24.128-168.896 168.896z"
              p-id="2797"></path>
          </svg>
        </div>
      </div>
      <div class="centerOfRedeemOfFreeMuseum" v-show="showRedeemFreeMuseum">
        <div class="RedeemFreeMuseum">
          <div class="RedeemFreeMuseum__titlePart">
            <h1>Redeem Your Free Trial Museum</h1>
            <h3>You can redeem one free museum for address</h3>
            <p>{{ useForRedeemAddress }}</p>
          </div>
          <div class="RedeemFreeMuseum__centerPart">
            <div class="RedeemFreeMuseum__centerPart__top">
              <div class="RedeemFreeMuseum__centerPart__top__first">
                <div class="codeInputPart">
                  <div class="code">Code</div>
                  <div class="inputPanel">
                    <input type="text" autofocus ref="code" />
                    <p v-if="ifCodeUserByAnotherAddress">Redeem Failure.</p>
                  </div>
                </div>
              </div>
              <div class="RedeemFreeMuseum__centerPart__top__second">
                <div class="RedeemBtn" @click="redeem">Redeem</div>
                <div class="CancelBtn" @click="cancel">Cancel</div>
              </div>
            </div>
            <div class="RedeemFreeMuseum__centerPart__bottom">
              <h2>How to get a redeem code?</h2>
              <div class="option1">
                <p class="p1">
                  <span class="span1">Option1:</span> Ask your friends who own a
                  TingMuseum venue.
                </p>
              </div>
              <div class="option2">
                <p class="p2">
                  <span class="span2">Option2:</span> If you have qualified NFT
                  assets and would like to help us promote TingMuseum.Please
                  fill in the form and the team will contact you with the code.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="centerOfRedeemedSuccess" v-show="showRedeemedSuccess">
        <div class="RedeemedSuccess">
          <div class="RedeemedSuccess__title">
            <h1>You've Redeemed the Code</h1>
          </div>
          <div class="RedeemedSuccess__create">
            <div class="RedeemedSuccess__createBtn" @click="goToCreate">
              Create Museum
            </div>
          </div>
          <h2>Refer three friends to join the community!</h2>
          <div class="threeCodesContainer">
            <div class="threeCodesContainer__center">
              <div class="code1" v-for="(item, index) in threeCodesList" :key="index">
                <div class="codeInfoContainer">
                  <span class="Code1Span">Code{{ index + 1 }}: </span>
                  <span class="code1Content">{{ item._id }}</span>
                </div>
                <div class="code1__copy" v-if="item.redeemed_by == null">
                  <svg t="1640945303958" class="icon" viewBox="0 0 1024 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" p-id="7907" width="32" height="32" @click="doCopy(item._id)">
                    <path
                      d="M829.568 53.12H960V1024H194.432v-121.344H64V284.48L361.92 0h467.648v53.12z m0 80.896v768.64H279.488v40.448h595.456V134.016h-45.44zM149.056 317.952v503.808h595.456V80.896H397.248L149.12 317.952z"
                      fill="#2c2c2c" p-id="7908"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="centerOfRedeemedFailure" v-show="showRedeemedFailure">
        <div class="RedeemedFailure">
          <div class="RedeemedFailure__title">
            <h1>You've Redeemed the Code</h1>
          </div>
          <div class="RedeemedFailure__create">
            <div class="RedeemedFailure__createBtn" @click="goToCreate">
              Create Museum
            </div>
          </div>
          <h2>Refer three friends to join the community!</h2>
          <div class="threeCodesContainer">
            <div class="threeCodesContainer__center">
              <div class="code1" v-for="(item, index) in threeCodesList" :key="index">
                <div class="code1__left">
                  <span class="Code1Span">Code{{ index + 1 }}: </span>
                  <span class="code1Content" :style="{
                    color: item.redeemed_by !== null ? 'red' : 'green',
                  }">{{ item._id }}</span>
                  <div class="code1RedeemedBy" v-if="item.redeemed_by !== null">
                    <span>Redeemed by:</span>
                    <span>{{
                        item.redeemed_by == null ? "" : item.redeemed_by
                    }}</span>
                  </div>
                </div>
                <div class="code1__right" v-if="item.redeemed_by !== null">
                  <el-tooltip content="Used!" placement="top-start" popper-class="codeError">
                    <svg t="1640939770385" class="icon" viewBox="0 0 1024 1024" version="1.1"
                      xmlns="http://www.w3.org/2000/svg" p-id="3606" width="32" height="32">
                      <path
                        d="M522.656 676.064a32 32 0 1 1 0 64 32 32 0 0 1 0-64z m-32-256a32 32 0 1 1 64 0v160a32 32 0 1 1-64 0v-160z m418.528 363.584L566.528 187.712c-10.112-17.6-26.112-27.712-43.872-27.712s-33.728 10.08-43.872 27.712L136.16 783.616c-10.112 17.6-10.816 36.512-1.92 51.84 8.864 15.36 25.568 24.16 45.76 24.16h685.344c20.224 0 36.896-8.768 45.76-24.128 8.928-15.36 8.224-34.272-1.92-51.84z"
                        p-id="3607" fill="#d81e06"></path>
                    </svg>
                  </el-tooltip>
                </div>
                <div class="code1__copy" v-if="item.redeemed_by == null">
                  <svg t="1640945303958" class="icon" viewBox="0 0 1024 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" p-id="7907" width="32" height="32" @click="doCopy(item._id)"
                    slot="reference">
                    <path
                      d="M829.568 53.12H960V1024H194.432v-121.344H64V284.48L361.92 0h467.648v53.12z m0 80.896v768.64H279.488v40.448h595.456V134.016h-45.44zM149.056 317.952v503.808h595.456V80.896H397.248L149.12 317.952z"
                      fill="#2c2c2c" p-id="7908"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div slot="footer" class="footerOfRedeem" v-if="showRedeemFreeMuseum">
        <a href="https://forms.gle/2DhRNRPcGsmxy4Yn9" target="_blank">Apply Code</a>
      </div>
    </el-dialog>
    <!-- <Footer></Footer> -->
  </div>
</template>

<script>
// @ is an alias to /src
// import $ from "jquery";
import V3DApp from "@/components/V3DAppB.vue";
// import Bottom from "../components/Bottom.vue";
import Footer from "@/components/footer.vue";
export default {
  props: ["time"],
  name: "Browsing",
  components: {
    V3DApp,
    // Bottom,
    Footer,
  },
  data() {
    return {
      result: {},
      url: window.urls,
      productInfo: "",
      museumName: "",
      addr: this.$store.state.mainAccount,
      redeemShown: false,
      controlInstructionDialog: true,
      showRedeemFreeMuseum: true,
      showRedeemedSuccess: false,
      showRedeemedFailure: false,
      ifCodeUserByAnotherAddress: false,
      showCode1Warning: false,
      showCode2Warning: false,
      showCode3Warning: false,
      threeCodesList: "",
      showHowToUseMuseum: true,
      iframeShowFlag: false,
      iframeShowFlagTwo: false, // 用于除了windy外的另外一个iframe
      shareInTwitterDialog: false,
    };
  },
  methods: {
    showHeader(e) {
      $(".svgContainer").toggleClass("active");
      if ($(".svgContainer").hasClass("active")) {
        var screenDirection = window.matchMedia("(orientation: portrait)");
        if (screenDirection.matches) {
          $(".browsingHeader").slideToggle();
        }
        var screenDirection1 = window.matchMedia("(orientation: landscape)");
        if (screenDirection1.matches) {
          $(".browsingHeader").slideToggle();
        }
      } else {
        $(".browsingHeader").slideToggle();
      }
    },
    goToTwitter() {
      var url2 = encodeURIComponent(this.result.name);
      var url3 = encodeURIComponent(window.location.href);
      var url =
        "https://twitter.com/intent/tweet?text=I%20am%20exploring%20" +
        url2 +
        "%20in%20TingMuseum!%0A%0ACome%20join%20me%20at:%0A" +
        url3 +
        "%0A%0A%23TingDAO%20%23TingMuseum";
      window.open(url, "_blank");
      this.shareInTwitterDialog = false;
    },
    closeShareInTwitterDialog() {
      this.shareInTwitterDialog = false;
    },
    openTwitter() {
      this.shareInTwitterDialog = true;
    },
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
    updateIframeFlag(event) {
      this.iframeShowFlag = event;
    },
    updateIframeFlagTwo(event) {
      this.iframeShowFlagTwo = event;
    },
    goToCreate() {
      this.$router.push({
        path: "/setUp",
      });
    },
    doCopy(id) {
      var that = this;
      this.$copyText(id).then(
        function (e) {
          that.$notify({
            title: "Copied!",
            type: "success",
            customClass: "attention",
          });
        },
        function (e) { }
      );
    },
    async redeem() {
      var formData = new FormData();
      formData.append("user_address", this.useForRedeemcodeWhenOpenDialog);
      formData.append("code", this.$refs.code.value);
      this.$axios
        .post(this.url + "redeem_code", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          this.$notify({
            title: "Redeem Succeed",
            type: "success",
            customClass: "attention",
          });
          this.ifCodeUserByAnotherAddress = false;
          // 这里是已经redeem_code成功了，接下来就要进入另外的两个页面了,先判断下redeem_status，由此判断显示正确的还是失败的
          var formData2 = new FormData();
          formData2.append("user_address", this.useForRedeemcodeWhenOpenDialog);
          this.$axios
            .post(this.url + "redeem_status", formData2, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            })
            .then((res) => {
              var index = this.$refs.code.value;
              this.threeCodesList = res.data[index];
              var list = res.data[index];
              var flag = false;
              for (let i in list) {
                if (list[i].redeemed_by == null) {
                  flag = true;
                } else if (list[i].redeemed_by !== null) {
                  // 要是redeemed_by有一个不为空，直接跳出循环，然后显示failure页面
                  flag = false;
                  break;
                }
              }
              if (flag) {
                this.redeemShown = true;
                this.showRedeemedSuccess = true;
                this.showRedeemedFailure = false;
                this.showRedeemFreeMuseum = false;
              } else {
                this.redeemShown = true;
                this.showRedeemedSuccess = false;
                this.showRedeemedFailure = true;
                this.showRedeemFreeMuseum = false;
              }
            });
        })
        .catch((error) => {
          this.ifCodeUserByAnotherAddress = true;
        });
    },
    cancel() {
      this.redeemShown = false;
      this.ifCodeUserByAnotherAddress = false;
      this.$refs.code.value = "";
    },
    async openRedeemDialog() {
      const address = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (address.length == 0) {
        this.$notify({
          title: "Please connect your wallet first",
          type: "warning",
        });
        this.$router.push({
          path: "/createYours",
        });
      } else {
        var formData = new FormData();
        formData.append("user_address", this.useForRedeemcodeWhenOpenDialog);
        this.$axios
          .post(this.url + "redeem_status", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            if (JSON.stringify(res.data) == "{}") {
              this.redeemShown = true;
              this.showRedeemedSuccess = false;
              this.showRedeemedFailure = false;
              this.showRedeemFreeMuseum = true;
            } else {
              var index = Object.keys(res.data)[0];
              this.threeCodesList = res.data[index];
              var list = res.data[index];
              var flag = false;
              for (let i in list) {
                if (list[i].redeemed_by == null) {
                  flag = true;
                } else if (list[i].redeemed_by !== null) {
                  // 要是redeemed_by有一个不为空，直接跳出循环，然后显示failure页面
                  flag = false;
                  break;
                }
              }
              if (flag) {
                this.redeemShown = true;
                this.showRedeemedSuccess = true;
                this.showRedeemedFailure = false;
                this.showRedeemFreeMuseum = false;
              } else {
                this.redeemShown = true;
                this.showRedeemedSuccess = false;
                this.showRedeemedFailure = true;
                this.showRedeemFreeMuseum = false;
              }
            }
          });
      }
    },
    closeRedeemDialog() {
      this.redeemShown = false;
      this.ifCodeUserByAnotherAddress = false;
      this.$refs.code.value = "";
    },
    closeMsgBox() {
      v3d.puzzles.procedures.closeMsgBox();
    },
    back() {
      this.$router.push("/home");
    },
    closeBox() {
      if ($("#videoBox").attr("src")) {
        $("#videoBox").trigger("pause");
      }
      this.asset = true;
      v3d.puzzles.procedures.closeBox();
    },
    goCollectionDetailPage() { },
    museumNameChange(event) {
      this.museumName = event;
    },
  },
  computed: {
    museumId() {
      return window.localStorage.getItem("museumId");
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
    useToShowMuseum: {
      get() {
        return this.$store.state.useToShowMuseum;
      },
      set() { },
    },
    mainAccount: {
      get() {
        return this.$store.state.mainAccount;
      },
      set() { },
    },
    useForRedeemcodeWhenOpenDialog: {
      get() {
        return this.addr;
      },
    },
    useForRedeemAddress: {
      get() {
        return this.addr;
      },
    },
  },
  mounted() {
    var isCyberPunk = window.location.search.substr(7, 5) != "EH003";
    if (isCyberPunk) {
      $(".scroll-container").css("visibility", "hidden");
    }
    this.$notify.close();
    if (document.body.clientWidth <= 600) {
      var screenDirection = window.matchMedia("(orientation: portrait)");
      if (screenDirection.matches) {
        $(".browsingHeader").hide();
      }
      var screenDirection1 = window.matchMedia("(orientation: landscape)");
      if (screenDirection1.matches) {
        $(".browsingHeader").hide();
      }
    }
    window.addEventListener("resize", function () {
      if (document.body.clientWidth > 600) {
        $(".browsingHeader").show();
      } else {
        $(".browsingHeader").hide();
      }
    });
  },
  beforeDestroy() {
    window.removeEventListener("resize", function () {
      if (document.body.clientWidth > 600) {
        $(".browsingHeader").show();
      } else {
        $(".browsingHeader").hide();
      }
    });
  },
};
</script>

<style scoped lang="less">
@import "../3dpart/model.css";

/* .Footer {
  position: absolute;
  bottom: 0;
} */
.i3 {
  overflow-y: auto;
  height: 80%;
  display: inline-block;
  white-space: break-spaces;
  position: relative;
  top: 17px;
}

.i1 {
  font-size: 1.6rem;
}

.mmsgBox {
  font-family: "tingMuseum";
}

.msgBox {
  font-family: "tingMuseum" !important;
  width: 23%;
  height: 15%;
  position: absolute;
  bottom: 4.1875rem;
  left: 50%;
  transform: translateX(-25%);
  background-color: #fcfcfd;
  border-radius: 10px;
  overflow: hidden;
  display: none;

  #msg2 {
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .contentPart {
    height: 75%;
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

  .msgBoxupsidePart {
    background-color: #000;
    height: 23%;

    .textBox {
      position: absolute;
      top: -1.2%;
      left: 50%;
      transform: translateX(-50%);
      pointer-events: none;
    }

    .axClose {
      font-family: none !important;
      border: 1px solid #fcfcfd;
      border-radius: 12px;
      height: 16px;
      width: 16px;
      position: absolute;
      right: 2%;
      top: 6.2%;
      text-align: center;
      line-height: 17px;
      color: #fcfcfd;
      cursor: pointer;
    }
  }
}

.Browsing {
  width: 100%;
  height: 100%;
  transition: all 0.5s;
  overflow: hidden;
  position: relative;
  z-index: 5;
  @media screen and (orientation: landscape){
    width:100vw;
    height: 100vh;
  }
}

.contentBox {
  height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;

  & .iframeContainer {
    position: absolute;
    width: 100%;
    height: 100%;
    // filter: blur(12px);
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all ease 0.3s;

    & .closebtn {
      position: absolute;
      top: 20px;
      right: 20px;
      transition: all ease 0.3s;

      & svg {
        width: 40px;
        height: 40px;
        cursor: pointer;
        transition: all ease 0.3s;

        &:hover {
          transition: all ease 0.3s;

          & path {
            transition: all ease 0.3s;

            fill: rgb(185, 185, 194);
          }
        }
      }
    }

    & .windyMuseIframe {
      width: calc(100% - 320px);
      height: calc(100% - 120px);
    }
  }
}

.buttomShadow {
  padding: 110px 0;
  background: linear-gradient(to top,
      rgba(37, 37, 37, 1) 0%,
      rgba(37, 37, 37, 0.4) 30%,
      rgba(37, 37, 37, 0.3) 40%,
      rgba(37, 37, 37, 0) 100%);
  position: absolute;
  bottom: 0;
  width: 100%;
  pointer-events: none;
}

.arrowOfBrowsingHeaderShowOrNot {
  width: 100%;
  height: 3rem;
  position: absolute;
  z-index: 100;
  display: none;
  text-align: left;
  padding: 0.5rem 0 0 0.5rem;

  & .svgContainer {
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all ease 0.3s;

    & svg {
      cursor: pointer;
    }

    &.active {
      transition: all ease 0.3s;
      transform: rotate(-180deg);
    }
  }
}

.browsingHeader {
  position: absolute;
  width: 100%;
  padding: 1.0625rem 0;
  z-index: 99;
  /*  border:1px solid red; */
  background: linear-gradient(180deg, black, transparent);
  // display: flex;
  justify-content: space-between;

  & .scroll-container {
    font-size: 30px;
    font-family: "mobileFont";
    text-align: center;
    background: transparent;
    color: white;
    text-shadow: 0 0 5px white, 0 0 10px magenta, 0 0 50px magenta;
    overflow: hidden;
    white-space: nowrap;
    margin-top: 10px;
    margin-bottom: 10px;
    height: 30px;
    opacity: 0.88;
  }

  & .scroll-text>* {
    display: inline-block;
    margin-right: 69%;
    animation: scroll 42s linear infinite;
  }

  @font-face {
    font-family: "mobileFont";
    src: url("../assets/fontSelf/MobileFont.woff") format("woff"),
      /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
      url("../assets/fontSelf/MobileFont.ttf") format("truetype");
    /* Chrome 4+, Firefox 3.5, Opera 10+, Safari 3—5 */
    font-weight: normal;
    font-style: normal;
  }

  @keyframes scroll {
    from {
      transform: translateX(100%);
    }

    to {
      transform: translateX(-333%);
    }
  }

  & .browsingHeader__items {
    width: calc(100% - 303px);
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0;

    & .gbtn {
      font-family: "HelveticaNeue";
      width: 123px;
      height: 40px;
      border: 2px solid #adbef2;
      opacity: 1;
      border-radius: 90px;
      line-height: 40px;
      color: #fcfcfd;
      text-align: center;
      z-index: 99;
      cursor: pointer;
    }

    & .twitterAndRedeem {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 7rem;

      .redeemCode {
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 99;
        cursor: pointer;
      }
    }
  }
}

@media screen and (max-width: 1250px) {
  .browsingHeader {
    width: 100%;

    & .browsingHeader__items {
      width: calc(100% - 150px);
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 20px;

      & .gbtn {
        font-family: "HelveticaNeue";
        width: 123px;
        height: 40px;
        border: 2px solid #adbef2;
        opacity: 1;
        border-radius: 90px;
        line-height: 40px;
        color: #fcfcfd;
        text-align: center;
        z-index: 99;
        cursor: pointer;
      }

      & .twitterAndRedeem {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 7rem;

        .redeemCode {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 999;
          cursor: pointer;
        }
      }
    }
  }
}

@media screen and (max-width: 800px) {
  .browsingHeader {
    width: 100%;

    & .browsingHeader__items {
      width: calc(100% - 100px);
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 20px;

      & .gbtn {
        font-family: "HelveticaNeue";
        width: 123px;
        height: 40px;
        border: 2px solid #adbef2;
        opacity: 1;
        border-radius: 90px;
        line-height: 40px;
        color: #fcfcfd;
        text-align: center;
        z-index: 99;
        cursor: pointer;
      }

      & .twitterAndRedeem {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 7rem;

        .redeemCode {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 999;
          cursor: pointer;
        }
      }
    }
  }
}

@media screen and (max-width: 600px) {
  .arrowOfBrowsingHeaderShowOrNot {
    width: 100%;
    height: 3rem;
    position: absolute;
    display: block;
    z-index: 100;

    & .svgContainer {
      & svg {}
    }
  }

  .browsingHeader {
    width: 100%;

    & .browsingHeader__items {
      width: calc(100% - 40px) !important;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 20px;
    }
  }
}

@media all and (max-width: 800px) and (orientation: landscape) {
  .arrowOfBrowsingHeaderShowOrNot {
    width: 100%;
    height: 3rem;
    position: absolute;
    display: block;
    z-index: 100;

    & .svgContainer {
      & svg {}
    }
  }

  .browsingHeader {
    & .browsingHeader__items {
      width: 100%;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0;

      & .gbtn {
        font-family: "HelveticaNeue";
        width: 123px;
        height: 40px;
        border: 2px solid #adbef2;
        opacity: 1;
        border-radius: 90px;
        line-height: 40px;
        color: #fcfcfd;
        text-align: center;
        z-index: 99;
        cursor: pointer;
      }

      & .twitterAndRedeem {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 7rem;

        .redeemCode {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 99;
          cursor: pointer;
        }
      }
    }
  }
}

@media all and (max-width: 600px) and (orientation: portrait) {
  .browsingHeader {
    width: 100%;

    & .browsingHeader__items {
      width: 100%;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 20px;

      & .gbtn {
        font-family: "HelveticaNeue";
        width: 123px;
        height: 40px;
        border: 2px solid #adbef2;
        opacity: 1;
        border-radius: 90px;
        line-height: 40px;
        color: #fcfcfd;
        text-align: center;
        z-index: 99;
        cursor: pointer;
      }

      & .twitterAndRedeem {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 7rem;

        .redeemCode {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 999;
          cursor: pointer;
        }
      }
    }
  }
}

.minpart {
  z-index: 99;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 65px;
  /*   border: 1px solid red; */
}

.mintext {
  font-size: 32px;
  font-family: Helvetica;
  font-weight: bold;
  text-align: center;
  color: #fcfcfd;
}
</style>
