<template>
  <div class="outer_header">
    <header :class="time === 'night' ? 'header' : 'header'">
      <div class="header-container">
        <aside class="header-left">
          <div class="logo" @click="changeRouter('home')">
            <img src="../assets/TT/切图/2x/资源 1.svg" alt="" />
          </div>
          <div class="gapLine"></div>
          <ul class="leftList">
            <li>
              <img src="@/assets/TT/切图/2x/资源 4@2x.png" alt="" class="discoverLogo" />
              <el-tooltip effect="dark" placement="bottom" transition="el-zoom-in-top" :visible-arrow="false"
                :open-delay="100" popper-class="discoverTooptip">
                <span>{{ $t("header.discover") }}</span>
                <div slot="content" class="contentDiv">
                  <div class="d1" @click="changeDiscover('museum_Introduction')">
                    Museum Exploration
                  </div>
                  <div class="d2" @click="changeDiscover('already_built')">
                    Museum Exhibition
                  </div>
                  <div class="d3" @click="changeDiscover('user_info')">
                    Museum User
                  </div>
                </div>
              </el-tooltip>
            </li>
            <li @click="faq('faq')">
              <img src="@/assets/TT/切图/2x/资源 3@2x.png" alt="" class="faqLogo" />
              <span>{{ $t("header.faq") }}</span>
            </li>
            <li>
              <img src="../assets/home/资源 16@2x.png" alt="" class="inviteCodeLogo" />
              <span class="redeemCode" @click="openRedeemDialog">{{
                  $t("header.redeemCode")
              }}</span>
            </li>
          </ul>
        </aside>
        <aside class="header-right">
          <ul class="rightList">
            <el-badge :value="activeflag" class="activity" type="success">
              <li class="gift" @click="gotoGiftRegister('gift_register')">
                <span>{{ $t("header.activity") }}</span>
              </li>
            </el-badge>

            <li :class="!isConnect ? 'unSetUp' : 'setUp'" @click="changeSetUpRouter('setUp')" :disabled="!isConnect"
              ref="setUpBtn">
              {{ $t("header.setUp") }}
            </li>
            <!-- 头像和用户地址的框框 -->
            <el-tooltip effect="dark" placement="bottom" transition="el-zoom-in-top" :visible-arrow="false" :disabled="
              addr.startsWith('0x')
                ? walletconnect
                  ? false
                  : true
                : addr == 'mainAddress' || addr == ''
                  ? true
                  : false
            " :open-delay="100" popper-class="tezosTooltip">
              <li :class="
                time == 'night'
                  ? 'user-box user-box-night'
                  : 'user-box user-box-morning'
              " @click="changePerRouter(personalOrCreate)">
                <div :class="addr.startsWith('0x') ? 'avatar' : 'avatarTezos'" v-show="this.$store.state.isConnect">
                  <img :src="
                    addr.startsWith('0x')
                      ? avatar == null || avatar == ''
                        ? backupavatar
                        : url + avatar
                      : tezosAvatar
                  " alt="" />
                </div>
                <img src="@/assets/TT/切图/2x/资源 2@2x.png" alt="" v-if="switchLang" class="switchLangLinkImg" />
                <span :class="
                  time === 'night'
                    ? 'username nightColor connMargin'
                    : 'username morningColor connMargin'
                " ref="addr" v-if="switchLang">{{ $t("header.connectWallet") }}</span>
                <span :class="
                  time === 'night'
                    ? 'username2 nightColor connMargin'
                    : 'username2 morningColor connMargin'
                " ref="addr" v-if="showAddress">{{ address.slice(0, 8) + "..." }}</span>
              </li>
              <div slot="content" class="contentDiv">
                <div @click="disconnectTezosOrWalletConnect">
                  {{ $t("header.disconnect") }}
                </div>
              </div>
            </el-tooltip>

            <!-- 语言切换框 -->
            <li :class="
              time === 'night'
                ? 'changeLanguage nightColor changeLanguageNight'
                : 'changeLanguage morningColor changeLanguageMorning'
            ">
              Language
              <ul :class="
                time == 'night' ? 'languageList' : 'languageListMorning'
              ">
                <div class="triangle"></div>
                <li @click="changeLan('en')">
                  {{ $t("header.lanOfEnglish") }}
                </li>
                <li @click="changeLan('zh')">
                  {{ $t("header.lanOfChinese") }}
                </li>
                <li @click="changeLan('spa')">
                  {{ $t("header.lanOfSpanish") }}
                </li>
              </ul>
            </li>
            <!-- 暗黑模式切换框 -->
            <!-- <li class="changeTime" @click="changeTime">
            <div :class="
                time === 'night'
                  ? 'activeTime activeNight'
                  : 'activeTime activeMorning'
              "></div>
            <div class="night">
              <img src="@/assets/header/night.png" alt="" />
            </div>
            <div class="morning">
              <img src="@/assets/header/morning.png" alt="" />
            </div>
          </li> -->
          </ul>
        </aside>

        <aside class="menu">
          <div class="menu__container" @click="activeMenu"></div>
        </aside>
      </div>
      <!-- 移动端展示的菜单 -->
      <div class="menu__container__item menuBar" v-show="showMenu">
        <ul class="menu__container__item__ul">
          <!-- 头像和用户地址的框框 -->
          <li :class="
            time == 'night'
              ? 'user-box user-box-night'
              : 'user-box user-box-morning'
          " @click="changePerRouter(personalOrCreate)">
            <div class="avatar" v-show="this.$store.state.isConnect">
              <img :src="
                avatar == null || avatar == '' ? backupavatar : url + avatar
              " alt="" />
            </div>
            <img src="@/assets/TT/切图/2x/资源 2@2x.png" alt="" v-if="switchLang" class="switchLangLinkImg" />
            <span :class="
              time === 'night'
                ? 'username nightColor connMargin'
                : 'username morningColor connMargin'
            " ref="addr" v-if="switchLang">{{ $t("header.connectWallet") }}</span>
            <span :class="
              time === 'night'
                ? 'username2 nightColor connMargin'
                : 'username2 morningColor connMargin'
            " ref="addr" v-if="showAddress">{{ address.slice(0, 22) + "..." }}</span>
            <div class="whenLoginWithTezos__disconnectTooltip">disconnect</div>
          </li>
          <li class="menu__container__item__discover">
            <span @click="slideDownDiscover">{{ $t("header.discover") }}</span>
            <ul class="discover__menu">
              <li class="discover__menu__first" @click.stop="changeDiscover('museum_Introduction')">
                <span>Museum Exploration</span>
              </li>
              <li class="discover__menu__second" @click.stop="changeDiscover('already_built')">
                <span>Museum Exhibition</span>
              </li>
              <li class="discover__menu__third" @click.stop="changeDiscover('user_info')">
                <span>Museum User</span>
              </li>
            </ul>
          </li>
          <li class="menu__container__item__faq">
            <span @click="faq('faq')">FAQ</span>
          </li>
          <li class="menu__container__item__redeemCode">
            <span @click="openRedeemDialog">Redeem Code</span>
          </li>
          <li class="menu__container__item__gift">
            <span @click="gotoGiftRegister('gift_register')">Gift</span>
          </li>
          <li class="menu__container__item__createMuseum">
            <div :class="!isConnect ? 'unSetUp' : 'setUp'" @click="changeSetUpRouter('setUp')" :disabled="!isConnect">
              {{ $t("header.setUp") }}
            </div>
          </li>
          <!-- 语言切换框 -->
          <li class="menu__container__item__language">
            <span @click.stop="clickToChangeLan">EN/中</span>
            <ul class="lanList">
              <li><span @click="changeLan('en')">English</span></li>
              <li><span @click="changeLan('zh')">中文</span></li>
            </ul>
          </li>
        </ul>
      </div>
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
                    <span class="span1">Option1:</span> Ask your friends who own
                    a TingMuseum venue.
                  </p>
                </div>
                <div class="option2">
                  <p class="p2">
                    <span class="span2">Option2:</span> If you have qualified
                    NFT assets and would like to help us promote
                    TingMuseum.Please fill in the form and the team will contact
                    you with the code.
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
    </header>
  </div>
</template>

<script>
import global_ from "../components/global.vue";
// import $ from "jquery";
import { provider } from "../walletConnect/provider";

export default {
  props: ["followContent", "userAddress"],
  data() {
    return {
      imgUrl: require("@/assets/personal/defaultAvatar.png"),
      addr: "",
      backupavatar: "@/assets/personal/defaultAvatar.png",
      url: window.urls,
      language: window.localStorage.getItem("languageStorage") || "en",
      addrs: this.$t("header.connectWallet"),
      followbtn: this.followBtnInnerHTML,
      // connected: window.sessionStorage.getItem('connected')
      connected: global_.Connected,
      showItem: false,
      showDiscoverItem: false,
      redeemShown: false,
      showRedeemFreeMuseum: true,
      showRedeemedSuccess: false,
      showRedeemedFailure: false,
      ifCodeUserByAnotherAddress: false,
      showCode1Warning: false,
      showCode2Warning: false,
      showCode3Warning: false,
      threeCodesList: "",
      menuFork: "",
      activityValue: window.localStorage.getItem("activityFlag"),
      tezosAvatar: require("../assets/header/tezos-xtz-logo.svg"),
      walletconnect: window.localStorage.walletconnect,
    };
  },
  methods: {
    async disconnectTezosOrWalletConnect() {
      if (JSON.parse(window.localStorage.userState).address !== "") {
        this.$notify({
          type: "success",
          message: "Disconnecting...",
          customClass: "attention",
        });
        await provider.disconnect();
        localStorage.removeItem("userState");
        this.$notify.closeAll();
        this.$store.commit("updateConnectStatus", false);
        window.sessionStorage.connected = 0;
        global_.Connected = 0;
        this.$store.commit("updateWalletAddress", "Connect");
        this.$store.commit("updateSwitchLang", true);
        this.$store.commit("updateShowAddress", false);
        this.$store.state.mainAccount = "";
        this.$store.commit("updateMainAccount", "");
        this.addr = "";
        this.$router.push({
          path: "/home",
        });
      } else {
        this.$notify({
          type: "success",
          message: "Disconnecting...",
          customClass: "attention",
        });
        await window.dAppClient.clearActiveAccount();
        this.$notify.closeAll();
        this.$store.commit("updateConnectStatus", false);
        window.sessionStorage.connected = 0;
        global_.Connected = 0;
        this.$store.commit("updateWalletAddress", "Connect");
        this.$store.commit("updateSwitchLang", true);
        this.$store.commit("updateShowAddress", false);
        this.$store.state.mainAccount = "";
        this.$store.commit("updateMainAccount", "");
        this.addr = "";
        this.$router.push({
          path: "/home",
        });
      }
    },
    clickToChangeLan() {
      $(".lanList").slideToggle();
      $(".discover__menu").slideUp();
    },
    slideDownDiscover() {
      this.showDiscoverItem = true;
      $(".discover__menu").slideToggle();
      $(".lanList").slideUp();
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
    openRedeemDialog() {
      // this.redeemShown = true;
      // this.showRedeemedSuccess = false;
      // this.showRedeemedFailure = false;
      // this.showRedeemFreeMuseum = true;
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
    },
    closeRedeemDialog() {
      this.redeemShown = false;
      this.ifCodeUserByAnotherAddress = false;
      this.$refs.code.value = "";
    },
    gotoGiftRegister(path) {
      this.$store.commit("changeActivityNewFlag", "");
      this.$router.push({
        path,
      });
    },
    changeDiscover(path) {
      this.$router.push(path);
    },
    activeMenu() {
      this.showItem = true;
      $(".menu__container").toggleClass("activeMenu");
      $(".menuBar").slideToggle().addClass("active");
    },
    faq(path) {
      this.$router.push({
        path: path,
      });
    },
    howItWork(path) {
      this.$router.push({
        path: path,
      });
    },
    changeLan(la) {
      window.localStorage.setItem("languageStorage", la);
      setTimeout(() => {
        document.querySelector("body").style.opacity = 1;
        document.querySelector("body").style.backgroundColor = "black";
        document.querySelector("body").style.transition = "all ease 0.8s";
        this.language = la;
        this.$i18n.locale = la;
        this.$forceUpdate();
      }, 1000);
      setTimeout(() => {
        document.querySelector("body").style.opacity = 0;
        document.querySelector("body").style.backgroundColor = "black";
        document.querySelector("body").style.transition = "all ease 0.8s";
      }, 200);
      setTimeout(() => {
        if (la == "en") {
          if (this.followContent == "取关") {
            this.$emit("followContentChange", "Unfollow");
          } else if (this.followContent == "Dejar de seguir") {
            this.$emit("followContentChange", "Unfollow");
          } else if (this.followContent == "关注") {
            this.$emit("followContentChange", "Follow");
          } else if (this.followContent == "Seguir") {
            this.$emit("followContentChange", "Follow");
          }
        } else if (la == "zh") {
          if (this.followContent == "Unfollow") {
            this.$emit("followContentChange", "取关");
          } else if (this.followContent == "Dejar de seguir") {
            this.$emit("followContentChange", "取关");
          } else if (this.followContent == "Follow") {
            this.$emit("followContentChange", "关注");
          } else if (this.followContent == "Seguir") {
            this.$emit("followContentChange", "关注");
          }
        } else {
          if (this.followContent == "Unfollow") {
            this.$emit("followContentChange", "Dejar de seguir");
          } else if (this.followContent == "取关") {
            this.$emit("followContentChange", "Dejar de seguir");
          } else if (this.followContent == "Follow") {
            this.$emit("followContentChange", "Seguir");
          } else if (this.followContent == "关注") {
            this.$emit("followContentChange", "Seguir");
          }
        }
      }, 700);
    },
    // 改变时间
    changeTime() {
      if (this.$store.state.time === "night") {
        this.$store.commit("updateTime", "morning");
      } else {
        this.$store.commit("updateTime", "night");
      }
    },
    // 改变路由
    changeRouter(path) {
      this.$router.push({
        path,
        name: path.replace(path[0], path[0].toUpperCase()),
      });
    },
    // 点击右上角个人头像和地址的那个部分时，跳转到个人信息页的路由跳转方法
    async changePerRouter(path) {
      const add = await window.ethereum.request({
        method: "eth_accounts",
      });
      console.log("add:", add.length);
      console.log(
        "this.$store.state.walletAddress:",
        this.$store.state.walletAddress
      );
      if (add.length !== 0) {
        if (this.$route.path == "/personal") {
          if (this.userAddress !== add[0]) {
            this.$router.push({
              path,
              name: path.replace(path[0], path[0].toUpperCase()),
              query: {
                id: this.addr,
              },
            });
            window.location.reload();
          }
        } else {
          this.$router.push({
            path,
            name: path.replace(path[0], path[0].toUpperCase()),
            query: {
              id: this.addr,
            },
          });
        }
      } else {
        this.$router.push({
          path: "/createYours",
        });
      }
    },
    changeSetUpRouter(path) {
      // 当没有登录的时候，禁用create museum的点击事件，因为是div，所以要用js控制，之前是el-button，所以当时直接用disable即可
      if (!this.isConnect) {
        this.$refs.setUpBtn.addEventListener("click", function () {
          return;
        });
      } else {
        this.$router.push({
          path,
          name: path.replace(path[0], path[0].toUpperCase()),
        });
      }
    },
  },
  computed: {
    activeflag() {
      return this.$store.state.ActivityNewFlag;
    },
    showMenu: {
      get() {
        return this.showItem;
      },
      set(newValue) {
        return newValue;
      },
    },
    useForRedeemAddress: {
      get() {
        return this.addr;
      },
    },
    switchLang: {
      get() {
        return this.$store.state.switchLang;
      },
      set() { },
    },
    showAddress: {
      get() {
        return this.$store.state.showAddress;
      },
      set() { },
    },
    time: {
      get() {
        return this.$store.state.time;
      },
      set() { },
    },
    isConnect: {
      get() {
        return this.$store.state.isConnect;
      },
      set() { },
    },
    address: {
      get() {
        return this.$store.state.walletAddress;
      },
      set() { },
    },
    personalOrCreate: {
      get() {
        return this.$store.state.isConnect ? "personal" : "createYours";
      },
      set() { },
    },
    avatar: {
      get() {
        return this.$store.state.image_avatar;
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
  },
  watch: {
    time() {
      this.statuses = this.$store.state.statuses;
    },
  },
  async mounted() {
    window.addEventListener("resize", function () {
      if (document.body.clientWidth > 1350) {
        this.showItem = false;
        $(".menu__container").removeClass("activeMenu");
        $(".menuBar").css({
          display: "none",
        });
      }
    });

    if (this.$route.path == "/setUp") {
      // 在session中设置一个标志，代表我试从setUp中进入的展馆，直接在router中放行
      window.sessionStorage.setItem("gotoshow", true);
    } else if (this.$route.path == "/show") {
      window.sessionStorage.setItem("gotoshow", true);
    } else {
      window.sessionStorage.setItem("gotoshow", false);
    }
    const add = await window.ethereum.request({
      method: "eth_accounts",
    });
    var address = this.$store.state.mainAccount;
    if (address !== "" && address !== null) {
      this.addr = address;
      if (this.$store.state.isConnect == true) {
        var formData = new FormData();
        formData.append("user_address", this.$store.state.mainAccount);
        this.$axios
          .post(this.url + "get_personal_avatars", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            var temp = Object.keys(res.data)[0];
            if (res.data[temp] !== null && res.data[temp] !== "") {
              this.imgUrl = res.data[temp];
              this.$store.commit("updateImage_avatar", res.data[temp]);
              this.$store.commit("updateConnectStatus", true);
              this.$store.commit(
                "updateWalletAddress",
                this.$store.state.mainAccount
              );
            }
          });
      }
    }

    window.ethereum.on("accountsChanged", async () => {
      const addresses = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (addresses.length !== 0) {
        this.addr = addresses[0];
        this.$store.commit("updateConnectStatus", true);
        var formData = new FormData();
        formData.append("user_address", this.$store.state.mainAccount);
        this.$axios
          .post(this.url + "get_personal_avatars", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            var temp = Object.keys(res.data)[0];
            if (res.data[temp] !== null && res.data[temp] !== "") {
              this.imgUrl = res.data[temp];
            }
          });

        this.$forceUpdate();
      }
    });
  },
};
</script>

<style lang="less" scoped>
@import "~@/assets/stylesheet/header.less";
</style>
