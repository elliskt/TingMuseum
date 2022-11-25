<template>
  <div :class="
    time === 'night'
      ? 'app nightBgc nightColor'
      : 'app morningBgc morningColor'
  ">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
import Header from "./components/header.vue";
import global_ from "../src/components/global.vue";
export default {
  name: "App",
  components: {
    Header,
  },
  data() {
    return {
      queryId: "",
      data: {},
      url: window.urls,
      language: window.localStorage.getItem("languageStorage") || "en",
    };
  },
  computed: {
    pathNa() {
      return this.$route.path;
    },
    time: {
      get() {
        return this.$store.state.time;
      },
      set() { },
    },
  },
  watch: {
    time() {
      this.statuses = this.$store.state.statuses;
    },
  },
  created() {
    // 在页面加载时读取sessionStorage
    if (sessionStorage.getItem("store")) {
      this.$store.replaceState(
        Object.assign(
          {},
          this.$store.state,
          JSON.parse(sessionStorage.getItem("store"))
        )
      );
    }
    window.sessionStorage.setItem("store", JSON.stringify(this.$store.state));
    // 在页面刷新时将store保存到sessionStorage里
    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem("store", JSON.stringify(this.$store.state));
    });
    window.addEventListener("onunload", () => {
      sessionStorage.setItem("store", JSON.stringify(this.$store.state));
    });
    window.addEventListener("onload", () => {
      sessionStorage.setItem("store", JSON.stringify(this.$store.state));
    });
  },
  async mounted() {
    console.log(`████████╗██╗███╗   ██╗ ██████╗    ███╗   ███╗██╗   ██╗███████╗███████╗██╗   ██╗███╗   ███╗
╚══██╔══╝██║████╗  ██║██╔════╝    ████╗ ████║██║   ██║██╔════╝██╔════╝██║   ██║████╗ ████║
   ██║   ██║██╔██╗ ██║██║  ███╗   ██╔████╔██║██║   ██║███████╗█████╗  ██║   ██║██╔████╔██║
   ██║   ██║██║╚██╗██║██║   ██║   ██║╚██╔╝██║██║   ██║╚════██║██╔══╝  ██║   ██║██║╚██╔╝██║
   ██║   ██║██║ ╚████║╚██████╔╝██╗██║ ╚═╝ ██║╚██████╔╝███████║███████╗╚██████╔╝██║ ╚═╝ ██║
   ╚═╝   ╚═╝╚═╝  ╚═══╝ ╚═════╝ ╚═╝╚═╝     ╚═╝ ╚═════╝ ╚══════╝╚══════╝ ╚═════╝ ╚═╝     ╚═╝
                                                                                          `);
    global_.Connected = 1;
    window.sessionStorage.setItem("followStatus", this.$t("personal.follow"));
    // console.log('window.localStorage.connected == 1?', window.localStorage.connected == 1)
    // 这里的代码是为了登录状态能够保持，检测connected的状态，然后去修改store，保持了登录的状态
    // if (window.sessionStorage.connected == 1) {

    // 先判断下是否已经登录，若已经登录，让global_.Connected为1，否则为0
    const addres = await window.ethereum.request({
      method: "eth_accounts",
    });
    if (addres.length !== 0) {
      global_.Connected = 1;
      // 如果当前已经登录了就去获取用户的头像
      var formData = new FormData();
      formData.append("user_address", addres);
      this.$axios
        .post(this.url + "get_personal_avatars", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          var temp = Object.keys(res.data)[0];
          this.$store.commit("updateImage_avatar", res.data[temp]);
        });
    } else if (addres.length == 0) {
      global_.Connected = 0;
    }

    if (global_.Connected == 1) {
      const addr = await window.ethereum.request({
        method: "eth_accounts",
      });
      this.$store.commit("updateSwitchLang", false);
      this.$store.commit("updateShowAddress", true);
      this.$store.commit("updateConnectStatus", true);
      this.$store.commit("updateWalletAddress", addr[0]);
      this.$store.commit("updateMainAccount", addr[0]);
      // } else if (window.sessionStorage.connected == 0 && this.$route.path == '/home') {
    } else if (global_.Connected == 0 && this.$route.path == "/home") {
      this.$store.commit("updateSwitchLang", true);
      this.$store.commit("updateShowAddress", false);
      this.$store.commit("updateConnectStatus", false);
      this.$store.commit("updateWalletAddress", "Connect");
      this.$store.commit("updateMainAccount", "");
      this.$notify.closeAll();
      // this.$notify({
      //   title: this.$t('home.connectFirst'),
      //   type: 'error',
      //   duration: 0,
      //   showClose: false
      // })
    }
    // 以上为登录状态的保持

    // 切换用户时的操作，断开登录也包含在内
    window.ethereum.on("accountsChanged", async () => {
      const add = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (add.length == 0) {
        this.$store.commit("updateConnectStatus", false);
        window.sessionStorage.connected = 0;
        global_.Connected = 0;
        this.$store.commit("updateWalletAddress", "Connect");
        this.$store.commit("updateSwitchLang", true);
        this.$store.commit("updateShowAddress", false);
        this.$store.state.mainAccount = "";
        this.$store.commit("updateMainAccount", "");
        // console.log('此时全局切换账户，无账户登录:', this.$store.state.mainAccount)

        this.$notify.closeAll();
        // this.$notify({
        //   title: this.$t('home.connectFirst'),
        //   type: 'error',
        //   showClose: false,
        //   duration: 0
        // });
        this.$router.push("/home");
      } else if (add.length != 0) {
        this.$notify.closeAll();
        this.$store.commit("updateSwitchLang", false);
        this.$store.commit("updateShowAddress", true);
        this.$store.commit("updateConnectStatus", true);
        window.sessionStorage.connected = 1;
        global_.Connected = 1;
        this.$store.commit("updateWalletAddress", add[0]);
        this.$store.commit("updateMainAccount", add[0]);
        // console.log('此时全局切换账户，有账户登录:', this.$store.state.mainAccount)
        // 刷新一下个人的资产
        this.$axios.post(this.url + "retrieve_personal_collections", {
          user_address: add[0],
        });
        // 切换账户的时候，也要请求一下用户的头像，更新store中的
        var formData = new FormData();
        formData.append("user_address", add);
        this.$axios
          .post(this.url + "get_personal_avatars", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            var temp = Object.keys(res.data)[0];
            this.$store.commit("updateImage_avatar", res.data[temp]);
          });
        this.$forceUpdate();
        this.$router.push("/home");
      }
    });
  },
};
</script>

<style lang="less">
html,
body,
.app {
  width: 100%;
  height: 100%;
  min-width: 21.8125rem;
  font-size: 16px;
  // overflow: hidden;

  @media (max-width: 980px) {
    /* min-width: 37.5rem; */
  }
}

.vue-typer {
  /* Styles for the vue-typer container
     e.g. font-family, font-size  */

  .custom.char {
    /* Styles for each character
       e.g. color, background-color */

    &.typed {
      /* Styles specific to typed characters
         i.e. characters to the left of the caret */
      color: #fff !important;
    }

    &.selected {
      /* Styles specific to selected characters
         i.e. characters to the right of the caret while VueTyper's
              'eraseStyle' is set to a selection-based style */
    }

    &.erased {
      /* Styles specific to erased characters
         i.e. characters to the right of the caret while VueTyper's
              'eraseStyle' is set to a non-selection-based style */
    }
  }

  .custom.caret {

    /* Styles for the caret
       e.g. background-color, animation, display */
    // background-color: #fff;
    &.pre-type {
      /* Styles for the caret when it is idle before typing
         i.e. before a string starts being typed, during 'preTypeDelay' */
    }

    &.pre-erase {
      /* Styles for the caret when it is idle before erasing
         i.e. before a string starts being erased, during 'preEraseDelay' */
    }

    &.idle {
      /* Styles for the caret when it is idle, but VueTyper has not yet completed typing
         i.e. when 'pre-type' or 'pre-erase' is set, but not 'complete' */
    }

    &.typing {
      /* Styles for the caret while VueTyper is typing
         i.e. when the caret is moving forwards */
    }

    &.selecting {
      /* Styles for the caret while VueTyper is selecting
         i.e. when the caret is moving backwards and 'eraseStyle' is
         set to a selection-based style */
    }

    &.erasing {
      /* Styles for the caret while VueTyper is erasing
         i.e. when the caret is moving backwards and 'eraseStyle' is
         set to a non-selection-based style */
    }

    &.complete {
      /* Styles for the idle caret when VueTyper has finished all typing/erasing */
      // display: inline-block;
    }
  }
}

img[src=""],
img:not([src]) {
  opacity: 0;
}

.el-badge__content.is-fixed {
  position: absolute;
  top: 0;
  right: 30px !important;
  transform: translateY(-50%) translateX(100%);
}

// .el-pagination {
//   .el-pagination__jump {
//     #text {
//       display: none;
//     }
//   }
// }

.el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #010101 !important;
  color: #fff;
}

.el-pagination.is-background .el-pager li:not(.disabled):hover {
  // color: #010101 !important;
  transition: all ease 0.3s;
}

.refreshCol {
  font-family: "HelveticaNeue";
}

.registerSuccess {
  font-family: "HelveticaNeue";
}

.codeError {
  background-color: #e4e8ee !important;
  font-family: "HelveticaNeue";
  border-radius: 8px;
  color: red !important;
}

.el-tooltip__popper[x-placement^="top"] .popper__arrow::after {
  border-top-color: #e4e8ee !important;
}

.el-tooltip__popper[x-placement^="top"] .popper__arrow {
  border-top-color: #e4e8ee !important;
}

.walletconnectConfirm {
  max-width: 400px !important;
  word-break: keep-all !important;
  border-radius: 12px !important;
  @media screen and (max-width:450px) {
    max-width: 350px !important;
  }
  @media screen and (max-width:380px) {
    max-width: 320px !important;
  }
}

.redeemCodeDialog {
  transform: translateY(0) !important;
  width: 35rem !important;
  // height: 32rem !important;
  border-radius: 10px !important;
  overflow: hidden;
  background-color: #f1f2f3 !important;

  // transform: translateY(10%);
  & .el-dialog__header {
    height: 4rem;
    border-radius: 6px 6px 0 0;
    padding: 0;

    & .headerOfRedeem {
      height: 100%;
      display: flex;
      justify-content: flex-end;
      box-sizing: border-box;
      padding: 1.5rem 1.8rem 1rem 0;

      & .svgContainer {
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;

        & svg {
          cursor: pointer;
          width: 22px;
          height: 22px;
        }
      }
    }
  }

  & .el-dialog__body {
    padding: 0;
    word-break: keep-all;

    & .centerOfRedeemedFailure {
      width: 80%;
      height: 29rem;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      overflow: hidden;

      & .RedeemedFailure {
        width: 100%;
        height: 88%;

        & .RedeemedFailure__title {
          width: 100%;
          height: 20%;
          display: flex;
          align-items: center;
          justify-content: center;

          & h1 {
            font-family: "MyriadConcept";
            color: black;
            text-align: center;
          }
        }

        & .RedeemedFailure__create {
          width: 100%;
          height: 20%;
          display: flex;
          align-items: center;
          justify-content: center;

          & .RedeemedFailure__createBtn {
            width: 30%;
            height: 45%;
            color: white;
            background-color: #ec4f31;
            border-radius: 5px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            box-sizing: border-box;
            font-size: 0.8rem;
            margin-right: 0.8rem;
          }
        }

        & h2 {
          font-family: "MyriadConcept";
          color: black;
          font-size: 1rem;
          text-align: center;
          padding: 1rem 0;
        }

        & .threeCodesContainer {
          width: 70%;
          height: 50%;
          border: 1px solid #dddedf;
          margin: 0 auto;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;

          & .threeCodesContainer__center {
            width: 90%;
            height: 80%;
            display: flex;
            align-items: center;
            justify-content: space-evenly;
            flex-direction: column;

            & .code1 {
              display: flex;
              justify-content: space-between;
              width: 100%;

              & .code1__left {
                & .Code1Span {
                  font-family: "MyriadConcept";
                  color: black;
                  margin-right: 0.5rem;
                  font-size: 1rem;
                }

                & .code1Content {
                  font-family: Arial, Helvetica, sans-serif;
                  color: green;
                }

                & .code1RedeemedBy {
                  & span:nth-child(1) {
                    font-family: "MyriadConcept";
                    color: black;
                    font-size: 0.5rem;
                    margin-right: 0.5rem;
                  }

                  & span:nth-child(2) {
                    font-size: 0.5rem;
                    font-family: Arial, Helvetica, sans-serif;
                  }
                }
              }

              & .code1__right {
                & svg {
                  width: 22px;
                  height: 22px;
                }
              }

              & .code1__copy {
                & svg {
                  width: 18px;
                  height: 18px;
                  cursor: pointer;
                }
              }
            }
          }
        }
      }
    }

    & .centerOfRedeemedSuccess {
      width: 80%;
      height: 25rem;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      overflow: hidden;

      & .RedeemedSuccess {
        width: 100%;
        height: 88%;

        & .RedeemedSuccess__title {
          width: 100%;
          height: 20%;
          display: flex;
          align-items: center;
          justify-content: center;

          & h1 {
            font-family: "MyriadConcept";
            text-align: center;
            color: black;
          }
        }

        & .RedeemedSuccess__create {
          width: 100%;
          height: 20%;
          display: flex;
          align-items: center;
          justify-content: center;

          & .RedeemedSuccess__createBtn {
            width: 30%;
            height: 45%;
            color: white;
            background-color: #ec4f31;
            border-radius: 5px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            box-sizing: border-box;
            font-size: 0.8rem;
            margin-right: 0.8rem;
          }
        }

        & h2 {
          font-family: "MyriadConcept";
          color: black;
          font-size: 1rem;
          text-align: center;
          padding: 1rem 0;
        }

        & .threeCodesContainer {
          width: 70%;
          height: 40%;
          border: 1px solid #dddedf;
          margin: 0 auto;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;

          & .threeCodesContainer__center {
            width: 80%;
            height: 80%;
            display: flex;
            align-items: center;
            justify-content: space-evenly;
            flex-direction: column;

            & .code1 {
              width: 100%;
              display: flex;
              align-items: center;
              justify-content: space-between;

              & .codeInfoContainer {
                display: flex;
                justify-content: flex-start;

                & .Code1Span {
                  font-family: "MyriadConcept";
                  color: black;
                  margin-right: 0.5rem;
                  font-size: 1rem;
                }

                & .code1Content {
                  font-family: Arial, Helvetica, sans-serif;
                  color: green;
                }
              }

              & .code1__copy {
                width: 22px;
                height: 22px;

                & svg {
                  width: 18px !important;
                  height: 18px !important;
                  cursor: pointer;
                }
              }
            }
          }
        }
      }
    }

    & .centerOfRedeemOfFreeMuseum {
      width: 80%;
      height: 29rem;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      overflow: hidden;

      & .RedeemFreeMuseum {
        width: 100%;
        height: 100%;

        & .RedeemFreeMuseum__titlePart {
          width: 100%;
          height: 20%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;

          & h1 {
            font-family: "MyriadConcept";
            color: black;
            text-align: center;
            font-size: 1.8rem;
          }

          & h3 {
            font-family: "MyriadConcept";
            color: black;
            text-align: center;
            letter-spacing: 0.5px;
          }

          & p {
            color: #9a9b9c;
          }
        }

        & .RedeemFreeMuseum__centerPart {
          width: 100%;
          height: 80%;

          & .RedeemFreeMuseum__centerPart__top {
            width: 100%;
            height: 40%;

            & .RedeemFreeMuseum__centerPart__top__first {
              height: 50%;
              width: 100%;

              & .codeInputPart {
                height: 100%;
                display: flex;

                & .code {
                  width: 20%;
                  height: 100%;
                  color: black;
                  font-family: "MyriadConcept";
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  font-size: 1.1rem;
                }

                & .inputPanel {
                  width: 80%;
                  height: 100%;
                  display: flex;
                  flex-direction: column;
                  justify-content: center;

                  & input {
                    border: 1px solid #cbcccd;
                    border-radius: 4px;
                    outline: none;
                    width: 90%;
                    height: 45%;
                    padding-left: 10px;
                  }

                  & p {
                    color: red;
                    font-size: 5px;
                    font-family: "DM Sans";
                    letter-spacing: -0.9px;
                    word-break: keep-all;
                  }
                }
              }
            }

            & .RedeemFreeMuseum__centerPart__top__second {
              height: 50%;
              width: 100%;
              display: flex;
              align-items: center;
              justify-content: center;

              & .RedeemBtn {
                width: 25%;
                height: 50%;
                color: white;
                background-color: #ec4f31;
                border-radius: 5px;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                box-sizing: border-box;
                font-size: 0.8rem;
                margin-right: 0.8rem;
              }

              & .CancelBtn {
                width: 25%;
                height: 50%;
                color: #98999a;
                border-radius: 5px;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                box-sizing: border-box;
                font-size: 0.8rem;
                border: 1px solid #cececf;
              }
            }
          }

          & .RedeemFreeMuseum__centerPart__bottom {
            width: 90%;
            margin: 0 auto;
            height: 60%;
            box-sizing: border-box;

            & h2 {
              font-family: "MyriadConcept";
              color: black;
              font-size: 1.1rem;
              padding: 0.5rem 0;
            }

            & .option1 {
              width: 100%;
              height: 20%;
              margin-bottom: 1rem;
              display: flex;

              & .p1 {
                word-break: keep-all;
                color: #b1b2b3;
                font-family: Arial, Helvetica, sans-serif;
                font-size: 1rem;

                & .span1 {
                  font-family: "MyriadConcept";
                  color: black;
                  margin-right: 0.5rem;
                  font-size: 1.1rem;
                }
              }
            }

            & .option2 {
              width: 100%;
              height: 40%;
              margin-bottom: 1rem;
              display: flex;

              & .p2 {
                word-break: keep-all;
                color: #b1b2b3;
                font-family: Arial, Helvetica, sans-serif;
                font-size: 1rem;

                & .span2 {
                  font-family: "MyriadConcept";
                  color: black;
                  margin-right: 0.5rem;
                  font-size: 1.1rem;
                }
              }
            }
          }
        }
      }
    }
  }

  & .el-dialog__footer {
    padding: 0;

    & .footerOfRedeem {
      height: 3.5rem;
      width: 80%;
      margin: 0 auto;
      text-align: left;
      padding-left: 1.2rem;
      box-sizing: border-box;

      & a {
        font-family: "MyriadConcept";
        color: #2975cc;
        transition: all ease 0.3s;
        text-decoration: none;

        &:hover {
          transition: all ease 0.3s;
          text-decoration: underline;
        }

        &:visited {
          color: #2975cc;
        }
      }
    }
  }
}

@media screen and (max-width: 570px) {
  .redeemCodeDialog {
    width: 33rem !important;
    height: 35rem !important;

    & .el-dialog__body {
      & .centerOfRedeemOfFreeMuseum {
        width: 90%;
      }

      & .centerOfRedeemedSuccess {
        width: 90%;
      }

      & .centerOfRedeemedFailure {
        width: 90%;
      }
    }
  }
}

@media screen and (max-width: 540px) {
  .redeemCodeDialog {
    width: 31rem !important;
    height: 35rem !important;
  }
}

@media screen and (max-width: 500px) {
  .redeemCodeDialog {
    width: 29rem !important;
    height: 35rem !important;

    & .el-dialog__body {
      & .centerOfRedeemOfFreeMuseum {
        width: 100%;
      }

      & .centerOfRedeemedSuccess {
        width: 100%;
      }

      & .centerOfRedeemedFailure {
        width: 100%;
      }
    }
  }
}

@media screen and (max-width: 470px) {
  .redeemCodeDialog {
    width: 27rem !important;
    height: 35rem !important;
  }
}

@media screen and (max-width: 440px) {
  .redeemCodeDialog {
    width: 25rem !important;
    height: 35rem !important;

    & .el-dialog__body {
      & .centerOfRedeemOfFreeMuseum {
        & .RedeemFreeMuseum__centerPart {
          margin-top: 1.5rem;

          & .RedeemFreeMuseum__centerPart__top {
            & .RedeemFreeMuseum__centerPart__top__first {
              & .inputPanel {
                & p {
                  font-size: 0.8rem !important;
                }
              }
            }
          }
        }
      }
    }
  }
}

.sortByToolTip {
  height: 2rem;
  width: 8rem;
  font-family: "HelveticaNeue";

  & .sort {
    & img {
      margin-left: 1rem;
    }
  }

  & .time {
    width: inherit;
    height: inherit;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;

    & span {
      transition: all ease 0.3s;
      cursor: pointer;

      &:hover {
        transition: all ease 0.3s;
        color: #8fa2cd;
      }
    }
  }
}

.poapNFT {
  width: 30rem !important;
  color: white;
  overflow: auto;

  & .poapNFT__container {
    width: 100%;
    height: 100%;
    overflow: auto;
    box-sizing: border-box;
    padding: 1rem 2rem 1rem 2rem;
    display: flex;
    flex-direction: column;
    background-image: linear-gradient(to top, #0250c5 0%, #d43f8d 100%);

    & h1 {
      font-family: "MyriadConcept";
      font-size: 2.4rem;
    }

    & .poapNFT__outer {
      width: 100%;
      height: 90%;
      margin: 0 auto;
      width: inherit;
      display: flex;
      flex-wrap: wrap;
      border-radius: 16px;
      align-content: flex-start;
      overflow: auto;

      & .poapNFT__items {
        box-sizing: border-box;
        margin-right: 0.2rem;
        width: 8rem;
        height: 8rem;
        margin-bottom: 1rem;

        & .poapImg {
          width: 8rem;
          height: 8rem;
          object-fit: cover;
          border-radius: 50%;
          cursor: pointer;
        }
      }
    }

    & .loadMore__container {
      width: 100%;
      height: 5rem;
      display: flex;
      align-items: center;
      justify-content: center;

      & .loadMore {
        width: 11.238rem;
        height: 2.25rem;
        color: #999999;
        font-family: "HelveticaNeue";
        border: 1px solid #cdcdcd;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        color: white;
        cursor: pointer;
      }
    }
  }
}

.chooseFileOrNFT {
  width: 30rem !important;
  height: 15rem;
  transform: translateY(50%);
  border-radius: 16px !important;
  font-family: "HelveticaNeue";
  position: relative;

  & .choose__container {
    width: 100%;
    height: 100%;
    color: black;
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 16px;
    box-sizing: border-box;
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgb(252, 250, 250);

    & .leftAndRight {
      width: 80%;
      height: 70%;
      display: flex;
      justify-content: space-evenly;

      & .choose__container__left {
        width: 40%;
        height: 100%;
        background-color: rgb(206, 225, 236);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border-radius: 16px;
        cursor: pointer;

        & svg {
          margin-bottom: 1rem;
        }
      }

      & .choose__container__right {
        width: 40%;
        height: 100%;
        background-color: rgb(132, 207, 236);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border-radius: 16px;
        cursor: pointer;

        & svg {
          margin-bottom: 1rem;
        }
      }
    }
  }
}

.discoverTooptip {
  height: 7rem;
  width: 14rem;

  & .contentDiv {
    display: flex;
    flex-direction: column;

    & div {
      color: white;
      font-size: 1.2rem;
      cursor: pointer;
      transition: all ease 0.3s;
      font-family: "HelveticaNeue";
      width: 100%;
      border-radius: 4px;
      box-sizing: border-box;
      padding: 0.5rem;
      text-align: left;

      &:hover {
        color: #0073ff;
        // background-color: #b4b9be;
        transition: all ease 0.3s;
      }
    }
  }
}

.tezosTooltip {
  width: 8.375rem;
  text-align: center;

  & div {
    font-size: 1.2rem;
    cursor: pointer;
    transition: all ease 0.3s;
    font-family: "HelveticaNeue";

    &:hover {
      color: #0073ff;
    }
  }
}

.dialog-fade-enter-active .el-dialog.shareInTwitter {
  animation: anim-open 0.3s ease;
  animation-fill-mode: forwards;
}

.dialog-fade-leave-active .el-dialog.shareInTwitter {
  animation: anim-close 0.3s ease-in-out;
  animation-fill-mode: forwards;
}

.dialog-fade-enter-active .el-dialog.userNotExist {
  animation: anim-open 0.3s ease;
  animation-fill-mode: forwards;
}

.dialog-fade-leave-active .el-dialog.userNotExist {
  animation: anim-close 0.3s ease-in-out;
  animation-fill-mode: forwards;
}

.dialog-fade-enter-active .el-dialog.unfollowDialog {
  animation: anim-open 0.3s ease;
  animation-fill-mode: forwards;
}

.dialog-fade-leave-active .el-dialog.unfollowDialog {
  animation: anim-close 0.3s ease-in-out;
  animation-fill-mode: forwards;
}

.dialog-fade-enter-active .el-dialog.followingAndFollowerDialog {
  animation: anim-open 0.3s ease;
  animation-fill-mode: forwards;
}

.dialog-fade-leave-active .el-dialog.followingAndFollowerDialog {
  animation: anim-close 0.3s ease-in-out;
  animation-fill-mode: forwards;
}

.dialog-fade-enter-active .el-dialog.addMuseum {
  animation: anim-open 0.3s ease;
  animation-fill-mode: forwards;
}

.dialog-fade-leave-active .el-dialog.addMuseum {
  animation: anim-close 0.3s ease-in-out;
  animation-fill-mode: forwards;
}

.dialog-fade-enter-active .el-dialog.redeemCodeDialog {
  animation: anim-open 0.3s ease;
  animation-fill-mode: forwards;
}

.dialog-fade-leave-active .el-dialog.redeemCodeDialog {
  animation: anim-close 0.3s ease-in-out;
  animation-fill-mode: forwards;
}

@keyframes anim-open {
  0% {
    transform: scale(0);
  }

  100% {
    transform: scale(1);
  }
}

@keyframes anim-close {
  0% {
    transform: scale(1);
  }

  100% {
    transform: scale(0);
  }
}

.addMuseum {
  width: 40rem !important;
  height: 30rem !important;
  border-radius: 10px !important;
  display: flex;
  flex-direction: column;

  & .el-dialog__header {
    display: none;
  }

  & .el-dialog__body {
    width: 100%;
    height: 100%;
    padding: 30px 40px 0 40px;
    font-size: 14px;
    word-break: break-all;
    box-sizing: border-box;
    background-color: #f2f2f2;
    border-radius: 10px;

    & .addMuseum__container {
      width: 100%;
      height: 100%;
      box-sizing: border-box;

      & .addMuseum__title {
        display: flex;
        justify-content: center;
        width: 100%;
        height: 10%;
        color: black;
        font-family: "MyriadConcept";
        font-size: 2.3rem;
      }

      & .centerContent {
        width: 100%;
        height: 71%;
        // background-color: rgb(240, 238, 109);
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;

        & .centerContent__left {
          width: 47%;
          height: 100%;
          // background-color: rgb(246, 234, 250);
          display: flex;
          flex-direction: column;

          & .mname {
            font-family: "MyriadConcept";
            color: black;
            font-size: 1.2rem;
            padding: 1rem 0 1rem 0;
          }

          & .mname__input {
            width: 100%;
            height: 15%;
            border: 1px solid #d0d0d0;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            font-family: "HelveticaNeue";

            & .inputMuseumName {
              outline: none;
              width: 99%;
              height: 90%;
              background-color: inherit;
              border-radius: 8px;
              font-family: "HelveticaNeue";
              color: #626264;
              border: none;
              font-size: 1.3rem;
              text-indent: 1rem;
            }
          }

          & .des {
            font-family: "MyriadConcept";
            color: black;
            font-size: 1.2rem;
            padding: 1rem 0 1rem 0;
          }

          & .des__textAreaContainer {
            width: 100%;
            height: 50%;
            border: 1px solid #d0d0d0;
            border-radius: 8px;
            transition: all ease 0.3s;

            & .des__textArea {
              outline: none;
              width: 100%;
              height: 100%;
              border-radius: 8px;
              background-color: inherit;
              font-size: 1.3rem;
              resize: none;
              font-family: "HelveticaNeue";
              color: #626264;
              text-indent: 1rem;
              border: none;
            }
          }
        }

        & .centerContent__right {
          width: 47%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;

          & .banner {
            font-family: "MyriadConcept";
            color: black;
            font-size: 1.2rem;
            padding: 1rem 0 0 0;
          }

          & .centerContent__right__uploadArea {
            width: 100%;
            height: 83%;
            border-radius: 8px;
            background-color: #e6e8ed;

            & .centerContent__right__upload-demo {
              width: 100%;
              height: 100%;
              display: flex;
              align-items: center;
              justify-content: center;
              box-sizing: border-box;
              position: relative;

              & .uploadbtn {
                font-family: "HelveticaNeue";
                color: #999999;
                width: 100%;
                height: 100%;
                position: relative;
                z-index: 9;
                transition: all ease 0.3s;

                &:hover {
                  color: #2f7fe2;
                  transition: all ease 0.3s;

                  .icon-tingMuseumupload {
                    color: #2f7fe2;
                  }
                }

                & .icon-tingMuseumupload {
                  font-size: 2rem;
                  color: #9a9a9a;
                  margin-bottom: 1rem;
                  transition: all ease 0.3s;
                }
              }

              & .backimg {
                width: 100%;
                height: 100%;
                border-radius: 8px;
                z-index: 1;
                position: absolute;
                top: 0;
                left: 0;

                &>img {
                  width: inherit;
                  height: inherit;
                  border-radius: 8px;
                  opacity: 0.5;
                  object-fit: cover;
                }

                // 解决img标签的src不存在的时候出现的莫名其妙的空白边框
                img[src=""],
                img:not([src]) {
                  opacity: 0;
                }
              }
            }
          }
        }
      }

      & .bottomButton {
        width: 100%;
        height: 18%;
        box-sizing: border-box;
        display: flex;
        align-items: flex-end;
        justify-content: center;

        & .bottomButton__container {
          width: 50%;
          height: 80%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-family: "HelveticaNeue";

          & .confirm {
            width: 45%;
            height: 62%;
            color: white;
            background-color: #ec4f31;
            border-radius: 5px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            box-sizing: border-box;
          }

          & .cancel {
            width: 45%;
            height: 62%;
            color: #979797;
            border: 1px solid #cecece;
            border-radius: 5px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            box-sizing: border-box;
          }
        }
      }
    }
  }
}

#particles-js {
  width: 99%;
  height: calc(100% - 310px);
  position: absolute; //设置absolute,其他DIV设置为relative，这样这个例子效果就作为背景
  z-index: 1;
  margin-top: 4.9375rem;
}

// 设置输入框自动填充的延迟属性
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  transition-delay: 999999999s;
  transition: color 999999999s ease-out, background-color 999999999s ease-out;
  -webkit-transition-delay: 999999999s;
  -webkit-transition: color 999999999s ease-out,
    background-color 999999999s ease-out;
  -webkit-text-fill-color: inherit;
}

// 设置填充色为透明
input:-webkit-autofill {
  box-shadow: 0 0 0px 1000px transparent inset !important;
}

.attention {
  font-family: "HelveticaNeue";

  a {
    color: blue;
  }
}

* {
  padding: 0;
  margin: 0;
  // 不允许用户选中页面上的文字
  // user-select: none;
}

// 个人主页的following和follower共同的dialog
.followingAndFollowerDialog {
  width: 35rem !important;
  height: 48rem !important;
  border-radius: 20px !important;
  overflow: hidden;
  margin-top: 10vh !important;
  background-image: linear-gradient(to top,
      #f3e7e9 0%,
      #e3eeff 99%,
      #e3eeff 100%) !important;

  & .el-dialog__header {
    padding: none;
    width: 100%;
    height: 1%;

    & .el-dialog__close {
      font-size: 2rem;
      width: 32px;
      height: 32px;
      border-radius: 4px;
      cursor: pointer;
      transition: all ease 0.3s;

      &:hover {
        color: white;
        background-color: rgb(185, 183, 183);
      }
    }
  }

  & .el-dialog__body {
    width: 100%;
    height: 100%;
    box-sizing: border-box;

    & .ff__container {
      width: 100%;
      height: 100%;

      & .fandf {
        width: 100% !important;
        height: 5% !important;
        font-family: "HelveticaNeue";

        & .el-tabs__header {
          & .el-tabs__nav-wrap {
            & .el-tabs__nav-scroll {
              display: flex;
              justify-content: center;

              & .el-tabs__nav {
                & .el-tabs__item {
                  font-size: 1.1rem;
                }
              }
            }
          }
        }

        & .el-tabs__nav-wrap::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          height: 2px;
          background-color: transparent;
          z-index: 1;
        }
      }

      & .followingUL {
        width: 100%;
        height: 85%;
        padding: 1rem 0;
        box-sizing: border-box;
        overflow-y: auto;
        overflow-x: hidden;
        font-family: "HelveticaNeue";

        // 滚动条整体样式
        &::-webkit-scrollbar {
          width: 8px;
          border-radius: 10px;
          background-color: #ededed;
        }

        // 滚动条里的方块
        &::-webkit-scrollbar-thumb {
          border-radius: 10px;
          box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
          background-color: #535353;
        }

        &::-webkit-scrollbar-track {
          box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
          border-radius: 10px;
          background-color: #ededed;
        }

        & li {
          width: 100%;
          height: 10%;
          margin-bottom: 1%;
          padding: 1% 0 1% 1%;
          display: flex;
          align-items: center;
          color: black;
          overflow: hidden;
          justify-content: space-evenly;
          border-radius: 8px;
          cursor: pointer;

          &:hover {
            background-color: #fff;
          }

          & .avatar {
            width: 12%;
            height: 100%;
            border-radius: 50%;
          }

          & i {
            cursor: pointer;
          }
        }
      }

      & .followerUL {
        width: 100%;
        height: 85%;
        padding: 1rem 0;
        box-sizing: border-box;
        overflow-y: auto;
        overflow-x: hidden;
        font-family: "HelveticaNeue";

        & li {
          width: 100%;
          height: 10%;
          margin-bottom: 1%;
          padding: 1% 0 1% 1%;
          display: flex;
          align-items: center;
          color: black;
          overflow: hidden;
          justify-content: space-evenly;
          border-radius: 8px;
          cursor: pointer;

          &:hover {
            background-color: #f3f3f3;
          }

          & .avatar {
            width: 12%;
            height: 100%;
            border-radius: 50%;
          }

          & i {
            cursor: pointer;
          }
        }
      }
    }
  }
}

.controlInstruction {
  width: 69vw !important;
  height: 70vh !important;
  background: linear-gradient(to top,
      rgba(0, 0, 0, 0.5) 27.51%,
      rgba(0, 0, 0, 0.2) 79.9%) !important;
  margin-top: 16vh !important;
  border-radius: 48px !important;
  overflow: hidden;

  @media screen and (max-width: 540px) {
    & {
      height: 50vh !important;
      margin-top: 10vh !important;
    }
  }

  @media screen and (orientation: landscape) {
    & {
      height: 80vh !important;
      overflow-y: auto;
      margin-top: 5vh !important;

      & .el-dialog__header {
        padding: 0 !important;
      }
    }
  }

  & .el-dialog__body {
    width: 100%;
    height: 100%;
    margin: 0 !important;
    padding: 0 !important;

    @font-face {
      font-family: "mobileFont";
      src: url("../src/assets/fontSelf/MobileFont.woff") format("woff"),
        /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
        url("../src/assets/fontSelf/MobileFont.ttf") format("truetype");
      /* Chrome 4+, Firefox 3.5, Opera 10+, Safari 3—5 */
      font-weight: normal;
      font-style: normal;
    }

    & .controlDialog__container {
      width: 100%;
      height: 95%;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      flex-direction: column;
      padding: 10px 10px;
      box-sizing: border-box;

      @media screen and (orientation: landscape) {
        & {
          justify-content: flex-start;
        }
      }

      & .esc {
        width: 100%;
        height: 43%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;

        & .text {
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: rgb(201, 201, 201);
          border-radius: 30px;
          color: black;
          text-align: center;
          font-family: "mobileFont";
          font-size: 2rem;
          padding: 5px 20px;

          & .spanPart1 {
            word-break: keep-all;
          }

          & .spanPart2 {
            word-break: keep-all;
          }

          & img {
            width: 90px;
            height: 90px;
            border-radius: 50%;
          }
        }
      }

      & .control {
        width: 100%;
        height: 43%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-family: "mobileFont";
        color: #fff;

        & .wasd {
          width: 48%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;

          & .wasd__info {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;

            & p {
              font-size: 2rem;
              margin-bottom: 1rem;
              word-break: keep-all;
              text-align: center;
            }
          }
        }

        & .drag {
          width: 48%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;

          & .drag__info {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;

            & p {
              font-size: 2rem;
              margin-bottom: 1rem;
              word-break: keep-all;
              text-align: center;
            }
          }
        }
      }
    }

    @media screen and (max-width: 600px) {
      & .controlDialog__container {
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: flex-start;
      }
    }

    @media screen and (max-width: 570px) {
      & .controlDialog__container {
        & .esc {
          & .text {
            flex-direction: column;
          }
        }
      }
    }

    @media screen and (orientation: landscape) {
      & .controlDialog__container {
        & .esc {
          & .text {
            font-size: 1.2rem;

            & .spanPart1 {}

            & .spanPart2 {}

            & img {
              width: 40px;
              height: 40px;
            }
          }
        }

        & .control {
          & .wasd {
            & .wasd__info {
              & p {
                font-size: 1.2rem;
              }

              & img {
                width: 45%;
              }
            }
          }

          & .drag {
            & .drag__info {
              & p {
                font-size: 1.2rem;
              }

              & img {
                width: 45%;
              }
            }
          }
        }
      }
    }

    @media screen and (max-width: 540px) {
      & .controlDialog__container {
        & .esc {
          & .text {
            font-size: 1.4rem;

            & .spanPart1 {}

            & .spanPart2 {}

            & img {
              width: 50px;
              height: 50px;
            }
          }
        }

        & .control {
          & .wasd {
            & .wasd__info {
              & p {
                font-size: 1.4rem;
              }

              & img {
                width: 65%;
              }
            }
          }

          & .drag {
            & .drag__info {
              & p {
                font-size: 1.4rem;
              }

              & img {
                width: 65%;
              }
            }
          }
        }
      }
    }
  }
}

.shareInTwitter {
  width: 35rem !important;
  height: 15rem !important;
  font-family: "HelveticaNeue" !important;
  box-shadow: none !important;
  border-radius: 10px !important;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30vh !important;
  background-color: #fff !important;
  overflow: hidden;

  & .el-dialog__body {
    font-size: 1.2rem;
    text-align: center;
    color: black;
    width: 100%;
    height: 75%;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    word-break: keep-all;

    & .twitterDialog {
      width: 100%;
      height: 90%;
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      flex-direction: column;

      & h2 {
        width: 68%;
        font-size: 1.6rem;
        font-weight: bolder;
      }

      & .twoBtns {
        width: 65%;
        height: 30%;
        display: flex;
        align-items: center;
        justify-content: space-between;

        & .confirm {
          width: 45%;
          height: 100%;
          background: linear-gradient(to right, #004cf5, #009adf);
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          color: white;
          cursor: pointer;
        }

        & .cancel {
          width: 45%;
          height: 100%;
          background-color: rgb(67, 66, 68);
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 8px;
          color: white;
          cursor: pointer;
        }
      }
    }
  }
}

@media screen and (max-width: 570px) {
  .shareInTwitter {
    width: 30rem !important;
    height: 15rem !important;
  }
}

@media screen and (max-width: 500px) {
  .shareInTwitter {
    width: 28rem !important;
    height: 15rem !important;
  }
}

@media screen and (max-width: 420px) {
  .shareInTwitter {
    width: 25rem !important;
    height: 15rem !important;
  }
}

.unfollowDialog {
  width: 30rem !important;
  height: 12rem !important;
  font-family: "HelveticaNeueLTPro-Bd" !important;
  box-shadow: none !important;
  border-radius: 10px !important;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30vh !important;

  & .el-dialog__body {
    font-size: 1.2rem;
    text-align: center;
    color: black;
  }

  & .el-dialog__footer {
    color: black;

    & .cancel {
      border-radius: 16px;
      transition: all ease 0.3s;
      font-family: "HelveticaNeue" !important;
      color: rgb(87, 83, 83);
      background-color: #e7ecf7;
      border: none;

      &:hover {
        background-color: #d4d9e2;
      }
    }

    & .confirm {
      border-radius: 16px;
      transition: all ease 0.3s;
      font-family: "HelveticaNeue" !important;
      background-color: #3e76f6;
      border: none;
      color: white;

      &:hover {
        background-color: #185af2;
      }
    }
  }
}

.userNotExist {
  width: 30rem !important;
  height: 12rem !important;
  font-family: "HelveticaNeueLTPro-Bd" !important;
  box-shadow: none !important;
  border-radius: 10px !important;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30vh !important;

  & .el-dialog__body {
    font-size: 1.2rem;
    text-align: center;
    color: black;
  }

  & .el-dialog__footer {
    color: black;

    & .el-button {
      border-radius: 16px;
      transition: all ease 0.3s;
      font-family: "HelveticaNeue" !important;
      color: rgb(87, 83, 83);
      background-color: #e7ecf7;
      border: none;

      &:hover {
        background-color: #ced5e4;
      }
    }
  }
}

/deep/.ge,
/deep/.su {
  background-color: transparent;
}

.followDia {
  width: 39%;
  border-radius: 18px;
  height: 50%;
  overflow: auto;
  margin: 0 auto !important;
  transform: translateY(50%) !important;

  & .el-dialog__body {
    height: 70%;
    overflow: auto;
  }

  & ul li {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 4%;
    border-radius: 10px;
    background-color: #f7f7f7;
    width: 100%;

    & img {
      width: 12%;
      margin-right: 7%;
      border-radius: 50%;
    }

    & span {
      font-weight: 700;
    }

    & i {
      cursor: pointer;
      margin-left: 10px;

      &:hover {
        color: rgb(47, 47, 209);
      }
    }
  }
}

.haha {
  margin: 0 auto;
  width: calc(98% - 200px) !important;
  display: flex;
  background-color: transparent !important;
  justify-content: space-between;
  flex-wrap: wrap;
}

@media screen and (max-width: 910px) {
  .haha {
    margin: 0 auto;
    width: calc(98% - 100px) !important;
    display: flex;
    background-color: transparent !important;
    justify-content: space-between;
    flex-wrap: wrap;
  }
}

.alreadyBuiltSke {
  margin: 0 auto;
  width: 100% !important;
  display: flex;
  background-color: transparent !important;
  flex-wrap: wrap;
  justify-content: space-between;
  // padding: 1rem 0 0 0;
}

.userInfoSke {
  margin: 0 auto;
  width: 100% !important;
  // width: calc(100% - 303px) !important;
  display: flex;
  background-color: transparent !important;
  justify-content: space-between;
  flex-wrap: wrap;
}

.followerDia {
  width: 39%;
  border-radius: 18px;
  height: 50%;
  overflow: auto;
  margin: 0 auto !important;
  transform: translateY(50%) !important;

  & .el-dialog__body {
    height: 70%;
    overflow: auto;
  }

  & ul li {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 4%;
    border-radius: 10px;
    background-color: #f7f7f7;
    width: 100%;

    & img {
      width: 12%;
      margin-right: 7%;
      border-radius: 50% !important;
    }

    img {
      border-radius: 50% !important;
    }

    & span {
      font-weight: 700;
    }

    & i {
      cursor: pointer;
      margin-left: 10px;
    }
  }
}

ul,
dl {
  list-style: none;
}

.addPartPop {
  border-radius: 20px !important;

  .addInfo {
    & .addressDiv {
      .el-button {
        font-family: "HelveticaNeue";
      }
    }

    .el-input__inner {
      border-radius: 20px;
    }

    .addr {
      display: inline-block;
      font-size: 1rem;
      margin-bottom: 0.4rem;
    }
  }

  .twoBtns {
    display: flex;
    justify-content: space-evenly;
    margin-top: 0.6rem;
    font-family: "Poiret One";

    .add,
    .add:focus:not(.add:hover),
    .del,
    .del:focus:not(.del:hover) {
      transition: all ease 0.5s;
      border: 2px rgb(119, 115, 115) solid;
      font-weight: 600;
    }

    .add:hover,
    .del:hover {
      transition: all ease 0.5s;
      color: aliceblue;
      background-color: #044eff;
    }
  }
}

.connMargin {
  margin-left: 5px;
  margin-right: 5px;
}

.nightBgc {
  background-color: #141416 !important;
  transition: all 0.1s;
}

.morningBgc {
  background-color: #ffffff !important;
  transition: all 0.1s;
}

.morningShowDow {
  box-shadow: 0px 0.625rem 2.5rem rgba(31, 47, 70, 0.12);
}

.nightColor {
  color: #fcfcfd !important;
  transition: all 0.1s;
}

.morningColor {
  color: #000 !important;
  transition: all 0.1s;
}

.borderNight {
  // border-color: #353945 !important;
  transition: all 0.1s;
}

.borderMorning {
  border-color: #e6e8ec !important;
  transition: all 0.1s;
}

/* @media (max-width: 768px) {
  html,
  body,
  .app {
    min-width: unset;
  }
} */
</style>
