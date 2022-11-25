<template>
  <div class="profile animate__animated animate__fadeIn">
    <Header></Header>
    <div :class="time === 'night' ? 'outer borderNight' : 'outer borderMorning'">
      <div class="nav">
        <!-- 在nav里放back to home 和可以回到home的面包屑 -->
        <!-- back to home -->
        <div class="content">
          <div :class="
            time === 'night'
              ? 'backToPersonal'
              : 'borderMorning backToPersonalMorning'
          " @click="changeRouter('personal')">
            <i class="icon-tingMuseuma-Arrow-Left3"><span class="back">{{ $t("profile.backToPersonal") }}</span></i>
          </div>
          <!-- 面包屑 -->
          <div class="breadcrumb">
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item :to="{ path: '/personal', query: { id: addr } }">{{ $t("profile.personal") }}
              </el-breadcrumb-item>
              <el-breadcrumb-item>{{
              $t("profile.profileEdit")
              }}</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
        </div>
      </div>
    </div>
    <!-- 个人信息的编辑页面 -->
    <div class="editSection">
      <div class="details_center center">
        <div class="details__top">
          <h1 class="details__title h2">{{ $t("profile.editProfile") }}</h1>
          <div class="details__info">{{ $t("profile.des") }}</div>
        </div>
        <div class="details__row">
          <div class="details__col">
            <div class="details__user">
              <div class="details__avatar">
                <img :src="imgUrls" alt="Avatar" />
              </div>
              <div class="details__wrap">
                <div class="details__stage">
                  {{ $t("profile.profilePhoto") }}
                </div>
                <div class="details__text">
                  {{ $t("profile.profilePhotoDes") }}
                </div>
                <div class="details__file">
                  <el-upload class="upload-demo" action="fakeaction" :limit="1" ref="imgupload" :show-file-list="false"
                    :http-request="uploadImg" list-type="picture" :on-success="handleAvatarSuccess"
                    accept=".jpg,.png,.jpeg,.gif" :on-error="handleAvatarError">
                    <el-button id="openfile" size="small" type="plain" v-if="true" :class="
                      time === 'night'
                        ? 'uploadbtn uploadbtnspanNight'
                        : 'uploadbtn uploadbtnspanMorning'
                    ">
                      <span>{{ $t("profile.edit") }}</span>
                    </el-button>
                    <div slot="tip" class="el-upload__tip">
                      {{ $t("profile.imageType") }}
                    </div>
                  </el-upload>
                  <el-button :class="
                    time === 'night'
                      ? 'uploadbtn2 uploadbtnspanNight2'
                      : 'uploadbtn2 uploadbtnspanMorning2'
                  " size="small" type="plain" @click="choose">
                    <span>{{ $t("profile.edit") }}</span>
                  </el-button>
                </div>
              </div>
            </div>
          </div>

          <div class="details__col">
            <div class="details__list">
              <div class="details__item">
                <div class="details__category">
                  {{ $t("profile.AccountInfo") }}
                </div>
                <div class="details__fieldset">
                  <div class="field">
                    <div class="field__label">{{ $t("profile.userName") }}</div>
                    <div class="field__wrap">
                      <input :class="
                        time === 'night'
                          ? 'field__input field__inputNight field__inputNights inputNightBorderColor'
                          : 'field__input field__inputMorning'
                      " type="text" name="name" :placeholder="userName" required v-model="userName" ref="userName"
                        autocomplete="off" />
                    </div>
                  </div>
                  <div class="field">
                    <div class="field__label">
                      {{ $t("profile.personalUrl") }}
                    </div>
                    <div class="field__wrap">
                      <input :class="
                        time === 'night'
                          ? 'field__input field__inputNight field__inputNights inputNightBorderColor'
                          : 'field__input field__inputMorning'
                      " type="text" name="url" :placeholder="personalUrl" required v-model="personalUrl"
                        autocomplete="off" />
                    </div>
                  </div>
                  <div class="field field_textarea">
                    <div class="field__label">
                      {{ $t("profile.profileDescription") }}
                    </div>
                    <div class="field__wrap">
                      <textarea :class="
                        time === 'night'
                          ? 'field__textarea field__textAreaNight field__textAreaNights inputNightBorderColor'
                          : 'field__textarea field__textAreaMorning'
                      " name="bio" :placeholder="description" required v-model="description" maxlength="100"
                        ref="descripionArea" autocomplete="off"></textarea>
                    </div>
                  </div>
                </div>
              </div>
              <div class="details__item">
                <div class="details__category">{{ $t("profile.social") }}</div>
                <div class="details__fieldset">
                  <div class="field">
                    <div class="field__label">{{ $t("profile.facebook") }}</div>
                    <div class="field__wrap">
                      <input :class="
                        time === 'night'
                          ? 'field__input field__inputNight field__inputNights inputNightBorderColor'
                          : 'field__input field__inputMorning'
                      " type="text" name="facebook" :placeholder="facebookLink" required v-model="facebookLink"
                        autocomplete="off" />
                    </div>
                  </div>

                  <div class="field">
                    <div class="field__label">{{ $t("profile.twitter") }}</div>
                    <div class="field__wrap">
                      <input :class="
                        time === 'night'
                          ? 'field__input field__inputNight field__inputNights inputNightBorderColor'
                          : 'field__input field__inputMorning'
                      " type="text" name="twitter" :placeholder="twitterLink" required v-model="twitterLink"
                        autocomplete="off" />
                    </div>
                  </div>

                  <div class="field">
                    <div class="field__label">
                      {{ $t("profile.pinterest") }}
                    </div>
                    <div class="field__wrap">
                      <input :class="
                        time === 'night'
                          ? 'field__input field__inputNight field__inputNights inputNightBorderColor'
                          : 'field__input field__inputMorning'
                      " type="text" name="pinterest" :placeholder="pinterestLink" required v-model="pinterestLink"
                        autocomplete="off" />
                    </div>
                  </div>

                  <div class="field">
                    <div class="field__label">
                      {{ $t("profile.instagram") }}
                    </div>
                    <div class="field__wrap">
                      <input :class="
                        time === 'night'
                          ? 'field__input field__inputNight field__inputNights inputNightBorderColor'
                          : 'field__input field__inputMorning'
                      " type="text" name="instagram" :placeholder="instagramLink" required v-model="instagramLink"
                        autocomplete="off" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="details__btns">
              <el-button class="button details__button" @click="update">{{ $t("profile.updateProfile") }}
              </el-button>
              <button class="details__clear" @click="clear">
                <i class="icon-tingMuseumclear"></i>{{ $t("profile.clearAll") }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog :visible.sync="chooseOpenfileOrNot" :close-on-click-modal="true" :show-close="false"
      custom-class="chooseFileOrNFT" :close-on-press-escape="true" :modal-append-to-body="false">
      <div class="choose__container">
        <div class="leftAndRight">
          <div class="choose__container__left" @click="openFiles">
            <svg t="1640575539130" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
              p-id="2042" width="32" height="32">
              <path
                d="M128 300.032v-1.344h1.408L426.688 0.256V0H896v1024H128V300.032z m121.856-1.344h176.832V121.152L249.856 298.688zM213.376 384v554.688h597.312V85.312H512V384H213.312z"
                fill="#262626" p-id="2043"></path>
            </svg>
            <span>Open Files</span>
          </div>
          <div class="choose__container__right" @click="POAP">
            <svg t="1640575569291" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
              p-id="2896" width="32" height="32">
              <path
                d="M887.808 19.968H136.192C72.192 19.968 19.968 72.192 19.968 136.192v751.616c0 64 52.224 116.224 116.224 116.224h751.616c64 0 116.224-52.224 116.224-116.224V136.192c0-64-52.224-116.224-116.224-116.224z m-509.44 650.24H304.64L183.296 510.976v159.232H94.72V354.304h77.824l116.736 153.6v-153.6h88.576v315.904z m290.304-232.448H512v36.864h138.24v83.456H512v112.128H422.4V354.304h246.272v83.456z m270.848 1.024h-88.064v231.424h-89.6V438.784h-88.064V354.304h266.24v84.48z"
                p-id="2897" fill="#13227a"></path>
            </svg>
            <span>POAP</span>
          </div>
        </div>
      </div>
    </el-dialog>
    <el-drawer :visible.sync="drawer" :with-header="false" custom-class="poapNFT" :modal-append-to-body="false">
      <div class="poapNFT__container">
        <h1>Select a nft</h1>
        <ul class="poapNFT__outer">
          <li class="poapNFT__items" v-for="(item, index) in poapList" :key="index">
            <img :src="url + item.data[0]" alt="" class="poapImg" @click="chooseNFTForAvatar(url + item.data[0])" />
          </li>
        </ul>
        <div class="loadMore__container" @click="loadMore">
          <div class="loadMore">loadMore</div>
        </div>
      </div>
    </el-drawer>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "@/components/header.vue";
import Footer from "@/components/footer.vue";

export default {
  props: ["time"],
  data() {
    return {
      imgUrls: require("@/assets/personal/defaultAvatar.png"),
      userName: "",
      personalUrl: "",
      description: "",
      facebookLink: "",
      twitterLink: "",
      pinterestLink: "",
      instagramLink: "",
      addr: "",
      file: "",
      url: window.urls,
      chooseOpenfileOrNot: false,
      drawer: false,
      poapPage: 1,
      poapList: "",
      nftOrFile: "file",
    };
  },
  watch: {
    userName(newValue, oldValue) {
      this.$notify.close();
      if (newValue.length > 20) {
        this.$notify({
          title: this.$t("profile.overflowUsername"),
          type: "error",
        });
        this.userName = newValue.slice(0, 21);
        setTimeout(() => {
          this.userName = newValue.slice(0, 20);
        }, 100);
      }
    },
  },
  methods: {
    chooseNFTForAvatar(data) {
      this.imgUrls = data;
    },
    async loadMore() {
      const address = await window.ethereum.request({
        method: "eth_accounts",
      });
      this.$axios
        .get(this.url + "get_collects/poap", {
          params: {
            user_address: address[0],
            page: ++this.poapPage,
          },
        })
        .then((res) => {
          this.poapList = this.poapList.concat(res.data.data);
        });
    },
    openFiles() {
      this.nftOrFile = "file";
      var e = document.createEvent("MouseEvents");
      e.initEvent("click", true, true);
      document.getElementById("openfile").dispatchEvent(e);
      setTimeout(() => {
        this.chooseOpenfileOrNot = false;
      }, 1000);
    },
    async POAP() {
      this.nftOrFile = "nft";
      const address = await window.ethereum.request({
        method: "eth_accounts",
      });
      this.$axios
        .get(this.url + "get_collects/poap", {
          params: {
            user_address: address[0],
            page: this.poapPage,
          },
        })
        .then((res) => {
          this.poapList = res.data.data;
          if (res.data.count == 0) {
            this.drawer = false;
            this.chooseOpenfileOrNot = true;
            this.$notify({
              title: this.$t("profile.poapNull"),
              type: "error",
            });
          } else {
            this.drawer = true;
            this.chooseOpenfileOrNot = false;
          }
        });
    },
    choose() {
      this.chooseOpenfileOrNot = true;
    },
    handleAvatarSuccess(res, file) {
      this.$refs.imgupload.clearFiles();
    },
    handleAvatarError(res, fiel) {
      this.$refs.imgupload.clearFiles();
    },
    // 改变路由
    changeRouter(path) {
      setTimeout(() => { }, 1000);
      this.$router.push({
        path,
        name: path.replace(path[0], path[0].toUpperCase()),
        query: {
          id: this.addr,
        },
      });
    },
    async uploadImg(params) {
      // Promise的数据需要用.then得到
      this.getBase64(params.file).then((res) => {
        if (params.file.size / 1024 / 1024 > 2) {
          this.$notify({
            title: "file size cannot greater than 2M",
            type: "error",
          });
        } else {
          this.file = params.file;
          this.imgUrls = res;
        }
      });
    },
    // 转换格式
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
    async update() {
      const address = await window.ethereum.request({
        method: "eth_accounts",
      });

      if (this.nftOrFile == "file") {
        var formData = new FormData();
        formData.append("user_address", address[0]);
        formData.append("username", this.userName);
        formData.append("description", this.description);
        formData.append("personal_url", this.personalUrl);
        formData.append("image_avatar", this.file);
        formData.append("facebook_url", this.facebookLink);
        formData.append("twitter_url", this.twitterLink);
        formData.append("instagram_url", this.instagramLink);
        formData.append("pinter_url", this.pinterestLink);
        this.$axios
          .post(this.url + "save_personal_info", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then(() => {
            var formData = new FormData();
            formData.append("user_address", address);
            this.$axios
              .post(this.url + "get_personal_avatars", formData, {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              })
              .then((res) => {
                var temp = Object.keys(res.data)[0];
                this.$store.commit("updateImage_avatar", res.data[temp]);
                this.$forceUpdate();
              });
            this.$store.commit("updateUserName", this.userName);
            this.$store.commit("updateDescription", this.description);
            this.$store.commit("updatePersonal_url", this.personalUrl);
            this.$store.commit("updateFacebook_url", this.facebookLink);
            this.$store.commit("updateTwitter_url", this.twitterLink);
            this.$store.commit("updatePinter_url", this.pinterestLink);
            this.$store.commit("updateInstagram_url", this.instagramLink);
            this.$forceUpdate();
            this.$notify({
              title: this.$t("profile.updateSuccess"),
              type: "success",
            });
            setTimeout(() => {
              this.changeRouter("personal");
              window.location.reload();
            }, 300);
          });
      } else if (this.nftOrFile == "nft") {
        var formData = new FormData();
        formData.append("user_address", address[0]);
        formData.append("username", this.userName);
        formData.append("description", this.description);
        formData.append("personal_url", this.personalUrl);
        formData.append("image_static_url", this.imgUrls.slice(25));
        formData.append("facebook_url", this.facebookLink);
        formData.append("twitter_url", this.twitterLink);
        formData.append("instagram_url", this.instagramLink);
        formData.append("pinter_url", this.pinterestLink);
        this.$axios
          .post(this.url + "save_personal_info", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then(() => {
            var formData = new FormData();
            formData.append("user_address", address);
            this.$axios
              .post(this.url + "get_personal_avatars", formData, {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              })
              .then((res) => {
                var temp = Object.keys(res.data)[0];
                this.$store.commit("updateImage_avatar", res.data[temp]);
                this.$forceUpdate();
              });
            this.$store.commit("updateUserName", this.userName);
            this.$store.commit("updateDescription", this.description);
            this.$store.commit("updatePersonal_url", this.personalUrl);
            this.$store.commit("updateFacebook_url", this.facebookLink);
            this.$store.commit("updateTwitter_url", this.twitterLink);
            this.$store.commit("updatePinter_url", this.pinterestLink);
            this.$store.commit("updateInstagram_url", this.instagramLink);
            this.$forceUpdate();
            this.$notify({
              title: this.$t("profile.updateSuccess"),
              type: "success",
            });
            setTimeout(() => {
              this.changeRouter("personal");
              window.location.reload();
            }, 300);
          });
      }
    },
    open() {
      const h = this.$createElement;
      this.$notify({
        title: this.$t("profile.updateSuccess"),
        type: "success",
      });
    },
    async clear() {
      this.userName = "";
      this.personalUrl = "";
      this.description = "";
      this.facebookLink = "";
      this.twitterLink = "";
      this.pinterestLink = "";
      this.instagramLink = "";
      this.imgUrls = require("@/assets/personal/defaultAvatar.png");
    },
  },
  components: {
    Header,
    Footer,
  },
  async mounted() {
    console.log('this.$store.state.walletAddress :',this.$store.state.walletAddress );
    if (this.$store.state.walletAddress !== '') {
      this.addr = this.$store.state.walletAddress;
      this.$axios
        .get(this.url + "get_user_info", {
          params: {
            user_address: this.addr,
          },
        })
        .then((data) => {
          this.userName = data.data.username;
          this.personalUrl = data.data.personal_url;
          this.description = data.data.description;
          this.facebookLink = data.data.facebook_url;
          this.twitterLink = data.data.twitter_url;
          this.pinterestLink = data.data.pinter_url;
          this.instagramLink = data.data.instagram_url;
          this.imgUrls = this.url + data.data.image_avatar;
        });
    } else {
      const addresses = await window.ethereum.request({
        method: "eth_accounts",
      });
      this.addr = addresses[0];
      this.$axios
        .get(this.url + "get_user_info", {
          params: {
            user_address: addresses[0],
          },
        })
        .then((data) => {
          this.userName = data.data.username;
          this.personalUrl = data.data.personal_url;
          this.description = data.data.description;
          this.facebookLink = data.data.facebook_url;
          this.twitterLink = data.data.twitter_url;
          this.pinterestLink = data.data.pinter_url;
          this.instagramLink = data.data.instagram_url;
          this.imgUrls = this.url + data.data.image_avatar;
        });
    }

  },
};
</script>

<style lang="less">
.clear {
  clear: both;
}

.profile {
  width: 100%;
  height: 100%;
  transition: all 0.5s;
  overflow: auto;

  & .outer {
    border-bottom: 1px solid #353945;

    .nav {
      width: 79%;
      max-width: 1400px;
      padding: 24px 0;
      margin: 0 auto;
      position: relative;

      // background-color: blue;
      & .content {
        display: flex;
        align-content: flex-end;
        align-items: center;
        justify-content: space-between;

        & .breadcrumb {
          position: relative;
          z-index: 99;
        }
      }

      & .backToPersonal {
        // position: absolute;
        cursor: pointer;
        // bottom: 13.2%;
        // right: 16%;
        display: inline-block;
        border: 2px solid #353945;
        border-radius: 90px;
        padding: 10px 15px;
        color: #fcfcfd;
        transition: all 0.5s;
        position: relative;
        z-index: 99;

        &:hover {
          background: #3772ff;
          color: #fcfcfd;
          border-color: transparent;
        }

        & .back {
          margin-left: 8px;
        }
      }

      .backToPersonalMorning {
        .backToPersonal();
        color: #23262f;
      }
    }
  }

  & .editSection {
    padding-top: 80px;
    padding-bottom: 128px;

    & .details_center {
      // background-color: rgb(195, 174, 174);
      max-width: 896px;
      position: relative;
      z-index: 99;
    }

    & .center {
      width: 100%;
      margin: 0 auto;
      padding: 0 80px;
    }

    .details__top {
      margin-bottom: 64px;
    }

    .details__title {
      margin-bottom: 16px;
    }

    .h2 {
      font-size: 48px;
      line-height: 1.16667;
      letter-spacing: -0.02em;
    }

    .details__info {
      color: #777e90;
    }

    .details__row {
      display: flex;
      margin: 0 -16px;
    }

    .details__col {
      flex: 0 0 calc(50% - 32px);
      width: calc(50% - 32px);
      margin: 0 16px;
    }

    .details__user {
      display: flex;
    }

    .details__avatar {
      flex-shrink: 0;
      width: 128px;
      height: 128px;
      margin-right: 32px;
    }

    .details__wrap {
      flex-grow: 1;
    }

    .details__list {
      margin-bottom: 40px;
    }

    .details__item {
      margin-bottom: 40px;

      & .details__category {
        margin-bottom: 32px;
        font-size: 16px;
        line-height: 1.5;
        font-weight: 500;
      }

      & .details__fieldset {
        margin-bottom: 32px;

        & .field {
          margin-bottom: 32px;
        }
      }
    }

    .field__label {
      margin-bottom: 12px;
      font-size: 12px;
      line-height: 1;
      font-weight: 700;
      text-transform: uppercase;
      color: #b1b5c3;
    }

    .field__wrap {
      position: relative;
      word-break: break-all;
    }

    .field__textarea {
      height: 96px;
      padding: 10px 14px;
      resize: none;
      width: 100%;
      border-radius: 12px;
      border: 2px solid #e6e8ec;
      background: none;
      font-family: "Poppins", sans-serif;
      font-size: 14px;
      line-height: 1.71429;
      font-weight: 500;
      transition: border-color 0.5s;
      outline: none;
      word-break: break-all;
    }

    .field__input {
      height: 48px;
      padding: 0 14px;
      width: 100%;
      border-radius: 12px;
      border: 2px solid #e6e8ec;
      background: none;
      font-family: "Poppins", sans-serif;
      font-size: 14px;
      line-height: 1.71429;
      font-weight: 500;
      transition: border-color 0.5s;
      outline: none;
    }

    .field__input:-webkit-autofill,
    .field__textarea:-webkit-autofill {
      background-color: transparent !important;
      background-image: none !important;
      // -webkit-box-shadow: 0 0 0 1000px white inset !important;
    }

    .inputNightBorderColor {
      border: 2px solid #8f8d8d;
    }

    .field__inputNights {
      color: aliceblue;
    }

    .field__inputNight:focus {
      border: 2px solid rgb(234, 236, 238);
    }

    .field__inputMorning:focus {
      border: 2px solid rgb(76, 76, 77);
    }

    .field__textAreaNights {
      color: aliceblue;
    }

    .field__textAreaNight:focus {
      border: 2px solid rgb(234, 236, 238);
    }

    .field__textAreaMorning:focus {
      border: 2px solid rgb(76, 76, 77);
    }

    .details__btns {
      display: flex;
      margin-top: 40px;
      padding-top: 40px;
      border-top: 1px solid #e6e8ec;
      justify-content: space-evenly;
      width: 107%;
    }

    .button {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      height: 48px;
      padding: 0 24px;
      background: #3772ff;
      border-radius: 24px;
      font-family: "DM Sans", sans-serif;
      font-size: 16px;
      font-weight: 700;
      line-height: 1;
      text-align: center;
      color: #fcfcfd;
      transition: all 0.2s;
      border: none;
      cursor: pointer;

      &:hover {
        background: #5f8dfa;
        color: #fcfcfd;
        border-color: transparent;
      }
    }

    .details__clear {
      display: flex;
      align-items: center;
      font-family: "DM Sans", sans-serif;
      font-size: 16px;
      font-weight: 700;
      line-height: 1;
      color: #777e90;
      transition: color 0.2s;
      cursor: pointer;
      border: none;
      background-color: transparent;

      &:hover {
        color: #3772ff;
      }
    }

    .details__file {
      display: inline-block;
      position: relative;
      overflow: hidden;
      height: 50%;

      & .uploadbtn {
        border-radius: 23px;
        background-color: transparent;
        border: 2px solid #dddbdb;
        font-weight: bold;
        font-size: 13px;
        position: absolute;
        top: 0;
        left: 0;
        display: none;
      }

      & .uploadbtn2 {
        border-radius: 23px;
        background-color: transparent;
        border: 2px solid #dddbdb;
        font-weight: bold;
        font-size: 13px;
        position: absolute;
        top: 0;
        left: 0;
      }

      & .upload-demo {
        height: 100%;
        display: flex;
        align-items: flex-end;

        & .uploadbtn {
          border-radius: 23px;
          background-color: transparent;
          border: 2px solid #dddbdb;
          font-weight: bold;
          font-size: 13px;
        }
      }
    }

    .uploadbtnspanNight {
      display: none;
      color: aliceblue;
    }

    .uploadbtnspanNight2 {
      color: aliceblue;
    }

    .uploadbtnspanMorning {
      display: none;
      color: black;
    }

    .uploadbtnspanMorning2 {
      color: black;
    }

    .button-small {
      height: 40px;
      border-radius: 20px;
      padding: 0 16px;
      font-size: 14px;
      background-color: transparent;
      border: 2px solid;
      cursor: pointer;
      margin-top: 10px;
    }

    .button-smallNight {
      color: aliceblue;
    }

    .details__input {
      position: absolute;
      top: 0;
      left: 0;
      font-size: 140px;
      opacity: 0;
      cursor: pointer !important;
    }

    .details__text {
      margin-bottom: 16px;
      font-size: 12px;
      line-height: 1.66667;
      color: #777e90;
    }

    .details__avatar {
      flex-shrink: 0;
      width: 128px;
      height: 128px;
      margin-right: 32px;

      & img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        -o-object-fit: cover;
        object-fit: cover;
      }
    }

    .icon-tingMuseumclear {
      margin-right: 8px;
    }
  }
}
</style>
