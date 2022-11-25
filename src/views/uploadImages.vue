<template>
  <div class="upload__container">
    <Header></Header>
    <div class="upload">
      <div class="upload__img" v-show="showUploadImg">
        <!-- <div class="upload__img__svg">
                    <svg t="1638355487438" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="10284" width="32" height="32">
                        <path d="M1024 448H576V0H448v448H0v128h448v448h128V576h448z" p-id="10285"></path>
                    </svg>
                </div> -->
        <el-upload
          action="fakeaction"
          class="upload-demo"
          :drag="true"
          :show-file-list="false"
          :limit="1"
          list-type="picture"
          ref="imgupload"
          :http-request="uploadImgUseFormData"
          :on-success="handleAvatarSuccess"
          :on-error="handleAvatarError"
          :before-upload="beforeAvatarUpload"
          accept=".jpg,.png,.jpeg,.gif,.mp4,.mov,.m4v,.JPG,.PNG,.JPEG,.GIF,.MP4,.MOV,.M4V"
        >
          <i class="icon-tingMuseumupload"></i>
          <div class="el-upload__text">
            <strong style="font-size: 25px; color: white">{{
              $t("personal.dragPhoto")
            }}</strong
            ><br /><span style="color: white; font-size: 17px">{{
              $t("personal.orClick")
            }}</span>
          </div>
        </el-upload>
        <div class="ok" @click="ok">{{ $t("personal.ok") }}</div>
        <div class="afterUpload">
          <img :src="imgUrl" v-show="imgUrl.indexOf('data:image') > -1" />
          <video
            :src="imgUrl"
            autoplay
            loop
            v-show="imgUrl.indexOf('data:video') > -1"
          ></video>
        </div>
      </div>
      <div class="upload__afterUpload" v-show="showAfterUploadImg">
        <div v-if="imgUrl == '' && showAfterUploadImg" class="add">
          <svg
            t="1638415652553"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="10431"
            width="32"
            height="32"
          >
            <path
              d="M443.6957 0l136.6086 0 0 1024-136.6086 0 0-1024Z"
              p-id="10432"
            ></path>
            <path
              d="M0 443.6957l1024 0 0 136.6086-1024 0 0-136.6086Z"
              p-id="10433"
            ></path>
          </svg>
        </div>
        <img :src="imgUrl" v-show="imgUrl.indexOf('data:image') > -1" />
        <video
          :src="imgUrl"
          autoplay
          loop
          v-show="imgUrl.indexOf('data:video') > -1"
        ></video>
        <div class="edit" @click="edit">{{ $t("personal.edit") }}</div>
      </div>
      <div class="upload__infoList">
        <div class="creator">{{ $t("uploadImg.creator") }}</div>
        <div class="upload__infoList__inputContainer">
          <input
            v-model="creator"
            type="text"
            class="upload__infoList__input"
            ref="creator"
            autofocus="autofocus"
          />
        </div>
        <div class="description">{{ $t("uploadImg.description") }}</div>
        <div class="upload__infoList__textareaContainer">
          <textarea
            v-model="description"
            cols="30"
            rows="10"
            class="upload__infoList__textarea"
            ref="descriptions"
          ></textarea>
        </div>
        <div class="name">{{ $t("uploadImg.name") }}</div>
        <div class="upload__infoList__inputContainer">
          <input
            v-model="name"
            type="text"
            class="upload__infoList__input"
            ref="name"
          />
        </div>
        <div class="owner">{{ $t("uploadImg.owner") }}</div>
        <div class="upload__infoList__inputContainer">
          <input
            v-model="owner"
            type="text"
            class="upload__infoList__input"
            ref="owner"
          />
        </div>
        <div class="controlBtn">
          <el-button class="confirm" @click="confirm" :loading="loading">{{
            $t("uploadImg.confirm")
          }}</el-button>
          <div class="clearAll" @click="clear">
            {{ $t("uploadImg.clearAll") }}
          </div>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "../components/header.vue";
import Footer from "../components/footer.vue";
export default {
  props: ["time"],
  data() {
    return {
      showUploadImg: true,
      showAfterUploadImg: false,
      imgUrl: "",
      file: "",
      imgType: [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/PNG",
        "image/JPG",
        "image/JPEG",
        "image/gif",
        "image/GIF",
        "video/mp4",
        "video/mov",
        "video/quicktime",
        "video/m4v",
      ],
      creator: "",
      description: "",
      name: "",
      owner: "",
      url: window.urls,
      loading: false,
    };
  },
  components: {
    Header,
    Footer,
  },
  methods: {
    async confirm() {
      if (
        this.$refs.creator.value == "" ||
        this.$refs.descriptions.value == "" ||
        this.$refs.name.value == "" ||
        this.$refs.owner.value == "" ||
        this.imgUrl == ""
      ) {
        this.$notify({
          title: this.$t("You should enter the information of collection!"),
          type: "error",
        });
      } else {
        const address = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (address.length == 0) {
          this.$notify({
            title: this.$t("You must connect wallet first!"),
            type: "warning",
          });
        } else {
          var formData = new FormData();
          this.loading = true;
          formData.append("image", this.file);
          formData.append("creator", this.creator);
          formData.append("description", this.description);
          formData.append("name", this.name);
          formData.append("owner", this.owner);
          formData.append("user_address", address[0]);
          this.$axios
            .post(this.url + "upload_notmint", formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            })
            .then((res) => {
              console.log("res:", res);
              if (res.data.status == 0) {
                this.$notify({
                  title: this.$t("personal.uploadFailure"),
                  type: "error",
                });
                this.loading = false;
              } else if (res.data.status == 1) {
                this.$notify({
                  title: this.$t("personal.uploadSuccess"),
                  type: "success",
                });
                this.loading = false;
                this.imgUrl = "";
                this.creator = "";
                this.description = "";
                this.name = "";
                this.owner = "";
              }
            });
        }
      }
    },
    clear() {
      this.creator = "";
      this.description = "";
      this.name = "";
      this.owner = "";
      this.imgUrl = "";
    },
    edit() {
      this.showUploadImg = true;
      this.showAfterUploadImg = false;
    },
    ok() {
      this.showUploadImg = false;
      this.showAfterUploadImg = true;
    },
    handleAvatarSuccess(res, file) {
      this.$refs.imgupload.clearFiles();
    },
    handleAvatarError(res, fiel) {
      this.$refs.imgupload.clearFiles();
    },
    // 上传文件判断
    beforeAvatarUpload(file) {
      return new Promise((resolve, reject) => {
        // 调用testFileType方法，把定义的imgType数组和我们上传的图片类型file.type一起传进去
        var isTYPE;
        this.testFileType(this.imgType, file.type, (data) => {
          isTYPE = data;
        });
        const isLt10M = file.size / 1024 / 1024 < 1000000000000;

        if (!isTYPE) {
          this.$notify({
            title: this.$t("uploadImg.format"),
            type: "error",
          });
          return reject(false);
        } else if (!isLt10M) {
          this.$notify({
            title: this.$t("uploadImg.sizeLimit"),
            type: "error",
          });
          return reject(false);
        } else {
          return resolve(true);
        }
      });
    },
    // 判断文件类型是否在数组中 返回布尔值
    testFileType(arr, fileType, callback) {
      arr.filter((el, index) => {
        if (fileType === el) {
          // console.log(fileType === el)
          callback(fileType === el);
        }
      });
    },
    // 上传图片(使用formData)
    async uploadImgUseFormData(params) {
      // console.log('params is ', params)
      this.file = params.file;
      // console.log('this.file:', this.file)
      this.getBase64(params.file).then((res) => {
        this.imgUrl = res;
      });
    },
    // 转换格式,将图片转化为base64格式的
    getBase64(file) {
      return new Promise((resolve, reject) => {
        // console.log(file)
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
  },
  mounted() {
    this.$refs.creator.focus();
  },
};
</script>

<style lang="less">
@import "~@/assets/stylesheet/uploadImages.less";
</style>
