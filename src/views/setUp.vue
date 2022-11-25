<template>
  <div
    :class="
      time === 'night'
        ? 'setUp nightBgc nightColor animate__animated animate__fadeIn'
        : 'setUp morningBgc morningColor animate__animated animate__fadeIn'
    "
  >
    <!-- 头部 -->
    <Header></Header>

    <!-- 内容 -->
    <div class="setUp-container">
      <h1 class="setUp-container_h1">
        <div class="d2">{{ $t("setUP.choose") }}</div>
        <!-- <div class="d1__container">
          <div class="numMuseumTitle">
            <h2>Collected Museums</h2>
          </div>
          <div class="d1">
            <table>
              <tr>
                <td>{{skinList['EH001'][1]}} {{$t('setUP.space')}}</td>
              </tr>
              <tr>
                <td>{{skinList['EH002'][1]}} {{$t('setUP.gallery')}}</td>
              </tr>
              <tr>
                <td>{{skinList['EH003'][1]}} {{$t('setUP.cyberpunk')}}</td>
              </tr>
            </table>
            <i class="el-icon-question" @click="attention"></i>
          </div>
          <span class="redeem" @click="openRedeemDialog"><svg t="1641801044224" class="icon" viewBox="0 0 1072 1024"
              version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="14703" width="22" height="22">
              <path
                d="M519.696937 172.553857c24.339592 0 36.636599 16.000243 42.884043 34.714308 1.017683 4.070733 1.017683 26.544573 1.017683 72.481666s0 67.393249-1.017683 71.463982c-6.162638 18.516182-14.869484 28.721284-34.714308 33.696625-26.798993 5.371106-42.403471-13.908338-49.018412-33.696625-1.017683-4.070733-1.017683-25.526889-1.017683-71.463982s0-68.410933 1.017683-72.481666c5.766872-17.328885 18.063879-34.714308 40.848677-34.714308z m-269.544729 111.294976c9.187419 0 11.222785 1.017683 17.357154 4.070733 13.173345 6.586672 104.199462 98.800087 112.312659 112.312659 13.653918 20.466742-2.48767 51.873579-18.374837 57.188148-10.600868 3.533623-27.590525 7.49128-38.785041 0-13.512573-8.113197-105.725987-99.139314-112.312659-112.31266-3.05305-7.152052-4.070733-8.169735-4.070734-18.374837 0-20.749432 7.463011-24.820165 17.357154-34.714308 6.445328-6.445328 13.088538-8.169735 26.544573-8.169735z m544.177874 0c23.548061 0 40.848677 18.742334 40.848677 42.884043 0 10.205102-1.017683 11.222785-4.070734 18.374837-4.975341 9.950681-104.425614 109.174803-112.312659 112.31266-10.600868 3.533623-27.590525 7.49128-38.785041 0-13.342959-8.904729-34.035852-33.668356-18.374837-57.188148 3.05305-5.116685 10.205102-14.304104 52.071462-56.142195 26.544573-27.562256 52.071462-51.053779 55.124511-53.089145 7.378204-4.918803 13.003731-7.152052 25.52689-7.152052zM201.133796 555.428928c61.117536 0 64.538082-1.272104 83.73272 5.116685 16.113319 5.371106 32.113562 36.551792 18.374837 57.188148-4.296885 6.473597-10.54433 15.774091-18.374837 18.374837-19.166369 6.38879-22.530377 5.116685-82.686768 5.116686-45.937093 0-68.410933 0-72.481666-1.017684-18.03561-6.021293-39.180807-21.569232-33.696624-49.018412 4.551306-18.205223 15.80236-29.088781 32.678941-34.714308 4.070733-1.017683 22.473839-1.017683 72.481666-1.017683z m321.616191 0c11.420668 0 399.158004 132.016139 400.232225 132.722863 13.342959 8.904729 34.035852 33.668356 18.374837 57.188148-2.035367 3.05305-5.116685 8.169735-8.169735 11.222785-5.116685 4.070733-14.304104 9.187419-86.78577 45.937093l-80.651401 40.848677-41.866361 81.669084c-36.749675 73.499349-41.86636 82.686768-45.937093 86.78577-9.41357 9.41357-32.961631 17.837727-49.018412 7.152052a70.955141 70.955141 0 0 1-18.374837-18.374837c-1.498256-2.233249-132.722863-391.949414-132.722863-398.196859 0-16.169857 4.862265-25.272469 13.28642-33.696624 8.367618-8.367618 15.180443-13.286421 31.661259-13.286421z m167.437171 143.945648l-102.107558-33.696624 33.696625 102.107557c18.374837 56.142195 34.714308 101.089874 34.714308 101.089874s10.205102-18.374837 21.427887-40.848677c18.374837-37.767358 20.410204-41.86636 25.52689-46.954776s9.187419-7.152052 46.954776-25.526889c22.473839-11.222785 40.848677-21.427887 40.848677-21.427888s-44.91941-16.339471-101.089874-34.714308z m-349.178447 34.714308c-6.445328 0-14.643332 1.922291-19.39252 5.116686-6.64321 3.307471-104.510421 98.743549-111.294976 112.312659-3.05305 7.152052-4.070733 8.169735-4.070734 18.374838 0 25.555158 17.47023 42.884043 42.884044 42.884043 10.205102 0 11.222785-1.017683 18.374837-4.070733 13.173345-6.586672 104.199462-98.800087 112.312659-112.31266 13.653918-20.466742-2.48767-51.873579-18.374837-57.188147-5.936486-1.978829-12.777579-5.116685-20.410204-5.116686z"
                p-id="14704" fill="#ffffff"></path>
            </svg>{{$t('setUP.redeem')}}

          </span>
        </div> -->
      </h1>
      <ul class="setUpList">
        <li @click="addExhibitionTemplate($event)">
          <div class="setUpModel">
            <img :src="require('@/assets/setUp/1.png')" alt="" />
            <div class="setUpMask">
              <div class="modelMsg">
                <h2>{{ $t("setUP.space") }}</h2>
                <h3>You owned: {{ skinList["EH001"][1] }}</h3>
              </div>
            </div>
          </div>
        </li>
        <li @click="addExhibitionTemplate($event)">
          <div class="setUpModel">
            <img :src="require('@/assets/setUp/2.png')" alt="" />
            <div class="setUpMask">
              <div class="modelMsg">
                <h2>{{ $t("setUP.gallery") }}</h2>
                <h3>You owned: {{ skinList["EH002"][1] }}</h3>
              </div>
            </div>
          </div>
        </li>
        <li @click="addExhibitionTemplate($event)">
          <div class="setUpModel">
            <img :src="require('@/assets/setUp/3.png')" alt="" />
            <div class="setUpMask">
              <div class="modelMsg">
                <h2>{{ $t("setUP.cyberpunk") }}</h2>
                <h3>You owned: {{ skinList["EH003"][1] }}</h3>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <el-dialog
        :append-to-body="true"
        :visible.sync="dialogVisible1"
        :show-close="false"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        custom-class="addMuseum"
      >
        <div class="addMuseum__container">
          <h1 class="addMuseum__title">
            {{ $t("addMuseum.add") }}
          </h1>
          <div class="centerContent">
            <div class="centerContent__left">
              <h1 class="mname">{{ $t("addMuseum.museumName") }}</h1>
              <div class="mname__input">
                <input
                  type="text"
                  class="inputMuseumName"
                  autofocus
                  ref="museumName"
                />
              </div>
              <h1 class="des">{{ $t("addMuseum.description") }}</h1>
              <div class="des__textAreaContainer">
                <textarea class="des__textArea" ref="description"></textarea>
              </div>
            </div>
            <div class="centerContent__right">
              <h1 class="banner">{{ $t("addMuseum.banner") }}</h1>
              <div class="centerContent__right__uploadArea">
                <el-upload
                  class="centerContent__right__upload-demo"
                  action="fakeaction"
                  :limit="1"
                  ref="imgupload"
                  :show-file-list="false"
                  :http-request="uploadImg"
                  list-type="picture"
                  :on-success="handleAvatarSuccess"
                  accept=".jpg,.png,.jpeg,.gif,.JPG,.PNG,.JPEG,.GIF"
                  :on-error="handleAvatarError"
                >
                  <div class="uploadbtn">
                    <i
                      class="icon-tingMuseumupload"
                      style="display: inline-block"
                    ></i
                    ><br />
                    <span>{{ $t("addMuseum.clickToUpload") }}</span>
                  </div>
                  <div v-show="isShow" class="backimg">
                    <img :src="uploadImgUrls" alt="" />
                  </div>
                </el-upload>
              </div>
            </div>
          </div>
          <div class="bottomButton">
            <div class="bottomButton__container">
              <div class="confirm" @click="add_exhibition">
                {{ $t("addMuseum.confirm") }}
              </div>
              <div class="cancel" @click="closeEditInfo">
                {{ $t("addMuseum.cancel") }}
              </div>
              <!-- <button @click="test">Test</button> -->
            </div>
          </div>
        </div>
      </el-dialog>
      <!-- 点击Redeem Code的弹窗 -->
      <el-dialog
        :visible.sync="redeemShown"
        :close-on-click-modal="true"
        :close-on-press-escape="false"
        :show-close="false"
        @close="closeRedeemDialog"
        custom-class="redeemCodeDialog"
        :append-to-body="true"
        :modal-append-to-body="false"
      >
        <div slot="title" class="headerOfRedeem">
          <div class="svgContainer" @click="closeRedeemDialog">
            <svg
              t="1640932429674"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="2796"
              width="32"
              height="32"
            >
              <path
                d="M343.104 319.008l-24.128 24.128 168.896 168.896-168.096 168.096 24.128 24.128 168.096-168.096 168.096 168.096 24.128-24.128-168.096-168.096 168.896-168.896-24.128-24.128-168.896 168.896z"
                p-id="2797"
              ></path>
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
                <div
                  class="code1"
                  v-for="(item, index) in threeCodesList"
                  :key="index"
                >
                  <div class="codeInfoContainer">
                    <span class="Code1Span">Code{{ index + 1 }}: </span>
                    <span class="code1Content">{{ item._id }}</span>
                  </div>
                  <div class="code1__copy" v-if="item.redeemed_by == null">
                    <svg
                      t="1640945303958"
                      class="icon"
                      viewBox="0 0 1024 1024"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      p-id="7907"
                      width="32"
                      height="32"
                      @click="doCopy(item._id)"
                    >
                      <path
                        d="M829.568 53.12H960V1024H194.432v-121.344H64V284.48L361.92 0h467.648v53.12z m0 80.896v768.64H279.488v40.448h595.456V134.016h-45.44zM149.056 317.952v503.808h595.456V80.896H397.248L149.12 317.952z"
                        fill="#2c2c2c"
                        p-id="7908"
                      ></path>
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
                <div
                  class="code1"
                  v-for="(item, index) in threeCodesList"
                  :key="index"
                >
                  <div class="code1__left">
                    <span class="Code1Span">Code{{ index + 1 }}: </span>
                    <span
                      class="code1Content"
                      :style="{
                        color: item.redeemed_by !== null ? 'red' : 'green',
                      }"
                      >{{ item._id }}</span
                    >
                    <div
                      class="code1RedeemedBy"
                      v-if="item.redeemed_by !== null"
                    >
                      <span>Redeemed by:</span>
                      <span>{{
                        item.redeemed_by == null ? "" : item.redeemed_by
                      }}</span>
                    </div>
                  </div>
                  <div class="code1__right" v-if="item.redeemed_by !== null">
                    <el-tooltip
                      content="Used!"
                      placement="top-start"
                      popper-class="codeError"
                    >
                      <svg
                        t="1640939770385"
                        class="icon"
                        viewBox="0 0 1024 1024"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        p-id="3606"
                        width="32"
                        height="32"
                      >
                        <path
                          d="M522.656 676.064a32 32 0 1 1 0 64 32 32 0 0 1 0-64z m-32-256a32 32 0 1 1 64 0v160a32 32 0 1 1-64 0v-160z m418.528 363.584L566.528 187.712c-10.112-17.6-26.112-27.712-43.872-27.712s-33.728 10.08-43.872 27.712L136.16 783.616c-10.112 17.6-10.816 36.512-1.92 51.84 8.864 15.36 25.568 24.16 45.76 24.16h685.344c20.224 0 36.896-8.768 45.76-24.128 8.928-15.36 8.224-34.272-1.92-51.84z"
                          p-id="3607"
                          fill="#d81e06"
                        ></path>
                      </svg>
                    </el-tooltip>
                  </div>
                  <div class="code1__copy" v-if="item.redeemed_by == null">
                    <svg
                      t="1640945303958"
                      class="icon"
                      viewBox="0 0 1024 1024"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      p-id="7907"
                      width="32"
                      height="32"
                      @click="doCopy(item._id)"
                      slot="reference"
                    >
                      <path
                        d="M829.568 53.12H960V1024H194.432v-121.344H64V284.48L361.92 0h467.648v53.12z m0 80.896v768.64H279.488v40.448h595.456V134.016h-45.44zM149.056 317.952v503.808h595.456V80.896H397.248L149.12 317.952z"
                        fill="#2c2c2c"
                        p-id="7908"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div slot="footer" class="footerOfRedeem" v-if="showRedeemFreeMuseum">
          <a href="https://forms.gle/2DhRNRPcGsmxy4Yn9" target="_blank"
            >Apply Code</a
          >
        </div>
      </el-dialog>
    </div>
    <!-- 底部 -->
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "@/components/header.vue";
import Footer from "@/components/footer.vue";
import "animate.css";
export default {
  props: ["time"],
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      model: "",
      file: "",
      isShow: false,
      dialogVisible1: false,
      addr: "",
      language: window.localStorage.getItem("languageStorage") || "en",
      imgUrls: "",
      url: window.urls,
      skinList: {
        EH001: [0, 0],
        EH002: [0, 0],
        EH003: [0, 0],
      },
      URL: "http://82.157.25.193:8800/",
      redeemShown: false,
      showRedeemFreeMuseum: true,
      showRedeemedSuccess: false,
      showRedeemedFailure: false,
      ifCodeUserByAnotherAddress: false,
      showCode1Warning: false,
      showCode2Warning: false,
      showCode3Warning: false,
      threeCodesList: "",
    };
  },
  computed: {
    uploadImgUrls: {
      get() {
        return this.imgUrls;
      },
    },
    useToShowMuseum: {
      get() {
        return this.$store.state.useToShowMuseum;
      },
      set() {},
    },
    mainAccount: {
      get() {
        return this.$store.state.mainAccount;
      },
      set() {},
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
  methods: {
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
        function (e) {}
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
    async test() {
      var formData = new FormData();
      formData.append("file_name", this.$refs.museumName.value);
      await this.$axios
        .post(this.URL + "stylization", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          var str = res.data.imageData;
          this.imgUrls =
            "data:image/jpeg;base64," +
            str.substring(0, res.data.imageData.length - 1);
        });
      this.$forceUpdate();
    },
    attention() {
      this.$notify({
        title: this.$t("setUP.attention"),
        message:
          this.$t("setUP.attention2") +
          "<a href='museum_Introduction' class='attentionA'>" +
          this.$t("setUP.here") +
          "</a>" +
          this.$t("setUP.attention3"),
        dangerouslyUseHTMLString: true,
        type: "info",
        customClass: "attention",
      });
    },
    // 转换格式，转成base64的
    getBase64(file) {
      return new Promise((resolve, reject) => {
        let reader = new FileReader();
        let fileResult = "";
        reader.readAsDataURL(file); //开始转
        reader.onload = function () {
          fileResult = reader.result;
        }; //转 失败
        reader.onerror = function (error) {
          reject(error);
        }; //转 结束  咱就 resolve 出去
        reader.onloadend = function () {
          resolve(fileResult);
        };
      });
    },
    // 文件上传成功时，element-ui的upload的api
    handleAvatarSuccess(res, file) {
      this.$refs.imgupload.clearFiles();
    },
    // 文件上传失败时，element-ui的upload的api
    handleAvatarError(res, fiel) {
      this.$refs.imgupload.clearFiles();
    },
    // 上传文件之前的判断
    async beforeAvatarUpload(file) {
      // 调用testFileType方法，把定义的imgType数组和我们上传的图片类型file.type一起传进去
      var isTYPE;
      this.testFileType(this.imgType, file.type, (data) => {
        isTYPE = data;
      });
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isTYPE) {
        await this.$notify({
          title: "file type should only be jpg、jpeg、png、gif",
          type: "error",
        });
      }
      if (!isLt2M) {
        await this.$notify({
          title: "file size cannot greater than 2M",
          type: "error",
        });
      }
      return !isTYPE && isLt2M;
    },
    // 判断文件类型是否在数组中 返回布尔值
    testFileType(arr, fileType, callback) {
      arr.filter((el, index) => {
        if (fileType === el) {
          callback(fileType === el);
        }
      });
    },
    // 上传文件
    async uploadImg(params) {
      // Promise的数据需要用.then得到
      this.file = params.file;
      this.getBase64(params.file).then((res) => {
        if (params.file.size / 1024 / 1024 > 2) {
          this.$notify({
            title: "file size cannot greater than 2M",
            type: "error",
          });
        } else {
          this.isShow = true;
          this.imgUrls = res;
        }
      });
    },
    // 添加展馆,如果在show.vue中就是编辑当前展馆的信息
    async add_exhibition() {
      // 在session中设置一个标志，代表我试从setUp中进入的展馆，直接在router中放行
      window.sessionStorage.setItem("gotoshow", true);
      // this.$store.commit('updateIntoShow', true);
      const address = await window.ethereum.request({
        method: "eth_accounts",
      });
      // 检测展馆的名字是否为空，若是空的，则提示用户必须输入展馆的名字
      if (
        this.$refs.museumName.value == "" ||
        this.$refs.museumName.value == null
      ) {
        await this.$notify({
          title: "Please enter the Museum name",
          type: "error",
        });
      } else {
        var formData = new FormData();
        formData.append("user_address", this.$store.state.mainAccount);
        formData.append("name", this.$refs.museumName.value);
        formData.append("image_banner", this.file);
        formData.append("description", this.$refs.description.value);
        formData.append("museum_type", window.sessionStorage.getItem("model"));
        this.$axios
          .post(this.url + "add_exhibition", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            this.dialogVisible1 = false;
            this.imgUrls = "";
            this.$refs.museumName.value = "";
            this.$refs.description.value = "";
            this.changeToShow("/show", res.data.museum_id);
          })
          .catch((error) => {
            if (error.response.status == 401) {
              this.$notify({
                title: this.$t("setUP.notEnoughBalance"),
                dangerouslyUseHTMLString: true,
                message:
                  "<a href='museum_Introduction'>" +
                  this.$t("setUP.buySkin") +
                  "</a>",
                type: "error",
                customClass: "attention",
              });
            }
          });
      }
    },
    changeToShow(data, mId) {
      this.$router.push({
        path: data,
        query: {
          model: this.model,
          // scale: 1,
          museumId: mId,
        },
      });
      // window.location.reload();
    },
    closeEditInfo() {
      this.dialogVisible1 = false;
      this.$refs.museumName.value = "";
      this.$refs.description.value = "";
      this.imgUrls = "";
    },
    addExhibitionTemplate(event) {
      this.dialogVisible1 = true;
      if (
        event.target.innerText.indexOf("Space") > -1 ||
        event.target.innerText.indexOf("太空") > -1
      ) {
        window.sessionStorage.setItem("model", "EH001");
        this.model = "EH001";
      } else if (
        event.target.innerText.indexOf("Gallery") > -1 ||
        event.target.innerText.indexOf("画廊") > -1
      ) {
        window.sessionStorage.setItem("model", "EH002");

        this.model = "EH002";
      } else if (
        event.target.innerText.indexOf("Cyberpunk") > -1 ||
        event.target.innerText.indexOf("赛博朋克") > -1
      ) {
        window.sessionStorage.setItem("model", "EH003");
        this.model = "EH003";
      }
    },
  },
  async mounted() {
    const addresses = await window.ethereum.request({
      method: "eth_accounts",
    });
    if (addresses.length !== 0) {
      this.addr = addresses[0];
      var formData = new FormData();
      formData.append("current_address", addresses[0]);
      this.$axios
        .post(this.url + "get_collects_skin_balance", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          this.skinList = res.data;
        });
    } else {
      this.$router.push({
        path: "/createYours",
      });
    }
  },
};
</script>

<style lang="less" scoped>
@import "~@/assets/stylesheet/setUp.less";
</style>
