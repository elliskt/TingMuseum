<template>
  <div class="home nightBgc nightColor animate__animated animate__fadeIn" ref="el">
    <Header class="header"></Header>
    <keep-alive>
      <SwiperOfHomeBanner />
    </keep-alive>
    <div class="howitworks">
      <h1>
        How it works
        <div title="https://youtu.be/CQQfkUoz7HE">
          <a href="https://youtu.be/CQQfkUoz7HE" target="__blank"><svg t="1646372490362" class="icon"
              viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10645" width="50"
              height="50">
              <path
                d="M426.666667 682.666667V384l256 149.845333L426.666667 682.666667z m587.093333-355.541334s-10.026667-71.04-40.704-102.357333c-38.954667-41.088-82.602667-41.258667-102.613333-43.648C727.168 170.666667 512.213333 170.666667 512.213333 170.666667h-0.426666s-214.954667 0-358.229334 10.453333c-20.053333 2.389333-63.658667 2.56-102.656 43.648-30.677333 31.317333-40.661333 102.4-40.661333 102.4S0 410.538667 0 493.952v78.293333c0 83.456 10.24 166.912 10.24 166.912s9.984 71.04 40.661333 102.357334c38.997333 41.088 90.154667 39.765333 112.938667 44.074666C245.76 893.568 512 896 512 896s215.168-0.341333 358.442667-10.752c20.053333-2.432 63.658667-2.602667 102.613333-43.690667 30.72-31.317333 40.704-102.4 40.704-102.4s10.24-83.413333 10.24-166.869333v-78.250667c0-83.456-10.24-166.912-10.24-166.912z"
                fill="#FF0000" p-id="10646"></path>
            </svg></a>
        </div>
      </h1>
      <div class="howItWorks_TwoBoxes__Container">
        <div class="upperBox">
          <div class="wallet">
            <img src="../assets/home/hYwXYi.tif@2x.png" alt="" />
          </div>
          <div class="arrow">
            <img src="../assets/home/资源 10@2x.png" alt="" class="arrowImg" />
          </div>
          <div class="nft">
            <img src="../assets/home/资源 11@2x.png" alt="" />
          </div>
          <div class="arrow">
            <img src="../assets/home/资源 10@2x.png" alt="" class="arrowImg" />
          </div>
          <div class="chooseMuseum">
            <img src="../assets/home/资源 12@2x.png" alt="" />
          </div>
          <div class="arrow">
            <img src="../assets/home/资源 10@2x.png" alt="" class="arrowImg" />
          </div>
          <div class="decorate">
            <img src="../assets/home/0ZVTwZ.tif@2x.png" alt="" />
          </div>
          <div class="arrow">
            <img src="../assets/home/资源 10@2x.png" alt="" class="arrowImg" />
          </div>
          <div class="share">
            <img src="../assets/home/fMFg5z.tif@2x.png" alt="" />
          </div>
        </div>
        <div class="bottomBox">
          <div class="walletText">
            <p>1. Log in with your wallet address</p>
          </div>
          <div class="arrowBoxWithNothing"></div>
          <div class="nftText">
            <p>2. System will retrieve your personal NFTs automatically</p>
          </div>
          <div class="arrowBoxWithNothing"></div>
          <div class="chooseMuseumText">
            <p>3. Choose the favorite museum you like to decorate.</p>
          </div>
          <div class="arrowBoxWithNothing"></div>
          <div class="decorateText">
            <p>4. Decorate the museum with your favorite collection</p>
          </div>
          <div class="arrowBoxWithNothing"></div>
          <div class="shareText">
            <p>5. Share your museum with the crypto community</p>
          </div>
        </div>
      </div>
    </div>
    <div class="mostnotableMuseums">
      <h1>Most Notable Museums</h1>
      <p>The most popular Museums curated by the community</p>
      <div class="btnContainer">
        <div class="space spaceBtn" @click="showMuseumSpace">
          <span>Space</span>
        </div>
        <div class="gallery galleryBtn" @click="showMuseumGallery">
          <span>Gallery</span>
        </div>
        <div class="cyberpunk cyberpunkBtn" @click="showMuseumCyberpunk">
          <span>Cyberpunk</span>
        </div>
      </div>

      <el-skeleton :loading="loading" animated class="haha" :throttle="100">
        <template slot="template">
          <ul class="mostnotableMuseums__item__container">
            <li v-for="index in 6" :key="index" class="mostnotableMuseums__item">
              <el-skeleton-item variant="p" class="banner" />
              <div class="mostnotableMuseums__item__info">
                <el-skeleton-item variant="p" class="mostnotableMuseums__item__left__ske_mname" />
                <div class="mostnotableMuseums__item__right__ske__right">
                  <el-skeleton-item variant="p" class="mostnotableMuseums__item__right__avatar__ske_avatar" />
                  <div class="mostnotableMuseums__item__right__detail__ske__detail">
                    <el-skeleton-item variant="p" class="
                        mostnotableMuseums__item__right__detailName__ske_mname
                      " />
                    <el-skeleton-item variant="p" class="
                        mostnotableMuseums__item__right__detailAddress__ske_mname
                      " />
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </template>
        <template>
          <ul class="mostnotableMuseums__item__container">
            <li class="mostnotableMuseums__item" v-for="(item, index) in realList" :key="index"
              @click="changeToMuseum(item, index)">
              <img :src="url + item.image_banner" alt="" class="banner" />
              <div class="mostnotableMuseums__item__info">
                <div class="mostnotableMuseums__item__left">
                  {{ item.name }}
                </div>
                <div class="mostnotableMuseums__item__right">
                  <img :src="url + item.participant_avatar[0]" alt="" class="mostnotableMuseums__item__right__avatar" />
                  <div class="mostnotableMuseums__item__right__detail">
                    <span class="mostnotableMuseums__item__right__detailName">@{{ item.creator_username[0] }}</span>
                    <span class="mostnotableMuseums__item__right__detailAddress">{{ item.participant[0].slice(0, 18) +
                        "..."
                    }}</span>
                  </div>
                </div>
              </div>
            </li>
            <div class="loadMoreBtn__container">
              <div class="loadMoreBtn" @click="showAll">Show All</div>
            </div>
          </ul>
        </template>
      </el-skeleton>
    </div>
    <div class="join">
      <h1>Join The Community For Much More</h1>
      <div class="icons">
        <a href="https://discord.gg/G7SR5Yxy2R" target="__blank">
          <svg t="1638951078552" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
            p-id="8560" width="32" height="32">
            <path
              d="M657.316864 151.7056c131.4816 0 242.176 90.0096 242.176 90.0096 131.4304 270.08 124.5184 505.5488 124.5184 505.5488-103.7824 138.496-262.912 124.672-262.912 124.672l-55.296-69.2736c96.8192-20.7872 152.1664-103.8848 152.1664-103.8848S712.664064 795.7504 512.062464 795.7504c-207.5648 0-345.9072-96.9728-345.9072-96.9728s62.2592 83.0976 152.2176 103.936L263.025664 871.936S103.896064 878.848 0.062464 747.264c0 0-6.912-235.4688 124.5184-505.5488 0 0 117.6064-90.0096 242.176-90.0096l13.824 13.824s-138.3936 41.5744-214.4768 110.7968c0 0 145.3056-90.0096 345.9072-90.0096 193.6896 0 338.944 83.0976 345.9072 90.0096-76.0832-69.2224-214.4768-110.7968-214.4768-110.7968l13.824-13.824z m-308.7872 307.2C298.712064 458.9056 256.062464 501.6064 256.062464 558.5408s42.6496 99.6864 92.4672 99.6864c49.7664 0 92.416-42.752 92.416-99.6864s-42.6496-99.6352-92.416-99.6352z m327.0656 0c-49.7664 0-92.416 42.7008-92.416 99.6352s42.6496 99.6864 92.416 99.6864c49.8176 0 92.4672-42.752 92.4672-99.6864-7.1168-56.9344-42.6496-99.6352-92.4672-99.6352z"
              p-id="8561" fill="#ffffff"></path>
          </svg>
        </a>
        <a href="https://twitter.com/theTingDAO" target="__blank">
          <svg t="1638951101299" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
            p-id="9412" width="32" height="32">
            <path
              d="M928 254.3c-30.6 13.2-63.9 22.7-98.2 26.4 35.4-21.1 62.3-54.4 75-94-32.7 19.5-69.7 33.8-108.2 41.2C765.4 194.6 721.1 174 672 174c-94.5 0-170.5 76.6-170.5 170.6 0 13.2 1.6 26.4 4.2 39.1-141.5-7.4-267.7-75-351.6-178.5-14.8 25.4-23.2 54.4-23.2 86.1 0 59.2 30.1 111.4 76 142.1-28-1.1-54.4-9-77.1-21.7v2.1c0 82.9 58.6 151.6 136.7 167.4-14.3 3.7-29.6 5.8-44.9 5.8-11.1 0-21.6-1.1-32.2-2.6C211 652 273.9 701.1 348.8 702.7c-58.6 45.9-132 72.9-211.7 72.9-14.3 0-27.5-0.5-41.2-2.1C171.5 822 261.2 850 357.8 850 671.4 850 843 590.2 843 364.7c0-7.4 0-14.8-0.5-22.2 33.2-24.3 62.3-54.4 85.5-88.2z"
              p-id="9413" fill="#ffffff"></path>
          </svg>
        </a>
        <a href="https://www.instagram.com/thetingdao/" target="__blank">
          <svg t="1638951122724" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
            p-id="10268" width="32" height="32">
            <path
              d="M512 306.9c-113.5 0-205.1 91.6-205.1 205.1S398.5 717.1 512 717.1 717.1 625.5 717.1 512 625.5 306.9 512 306.9z m0 338.4c-73.4 0-133.3-59.9-133.3-133.3S438.6 378.7 512 378.7 645.3 438.6 645.3 512 585.4 645.3 512 645.3zM725.5 250.7c-26.5 0-47.9 21.4-47.9 47.9s21.4 47.9 47.9 47.9 47.9-21.3 47.9-47.9c-0.1-26.6-21.4-47.9-47.9-47.9z"
              p-id="10269" fill="#ffffff"></path>
            <path
              d="M911.8 512c0-55.2 0.5-109.9-2.6-165-3.1-64-17.7-120.8-64.5-167.6-46.9-46.9-103.6-61.4-167.6-64.5-55.2-3.1-109.9-2.6-165-2.6-55.2 0-109.9-0.5-165 2.6-64 3.1-120.8 17.7-167.6 64.5C132.6 226.3 118.1 283 115 347c-3.1 55.2-2.6 109.9-2.6 165s-0.5 109.9 2.6 165c3.1 64 17.7 120.8 64.5 167.6 46.9 46.9 103.6 61.4 167.6 64.5 55.2 3.1 109.9 2.6 165 2.6 55.2 0 109.9 0.5 165-2.6 64-3.1 120.8-17.7 167.6-64.5 46.9-46.9 61.4-103.6 64.5-167.6 3.2-55.1 2.6-109.8 2.6-165z m-88 235.8c-7.3 18.2-16.1 31.8-30.2 45.8-14.1 14.1-27.6 22.9-45.8 30.2C695.2 844.7 570.3 840 512 840c-58.3 0-183.3 4.7-235.9-16.1-18.2-7.3-31.8-16.1-45.8-30.2-14.1-14.1-22.9-27.6-30.2-45.8C179.3 695.2 184 570.3 184 512c0-58.3-4.7-183.3 16.1-235.9 7.3-18.2 16.1-31.8 30.2-45.8s27.6-22.9 45.8-30.2C328.7 179.3 453.7 184 512 184s183.3-4.7 235.9 16.1c18.2 7.3 31.8 16.1 45.8 30.2 14.1 14.1 22.9 27.6 30.2 45.8C844.7 328.7 840 453.7 840 512c0 58.3 4.7 183.2-16.2 235.8z"
              p-id="10270" fill="#ffffff"></path>
          </svg>
        </a>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "@/components/header.vue";
import Footer from "@/components/footer.vue";
import SwiperOfHomeBanner from "../components/swiperOfHomeBanner.vue";
import "animate.css";
import { switchSpace, switchGallery, switchCyberpunk } from '../utils/util'
export default {
  name: "App",
  components: {
    Header,
    Footer,
    SwiperOfHomeBanner,
  },
  data() {
    return {
      collectionListFromArtist: {},
      url: window.urls,
      pageOfSpace: 1,
      pageOfGallery: 1,
      pageOfCyberpunk: 1,
      spaceList: "",
      galleryList: "",
      cyberpunkList: "",
      realList: "",
      showMostNotableMuseum: false,
      loading: true,
      language: window.localStorage.getItem("languageStorage") || "en",
      skeletonLoading: true,
    };
  },
  methods: {
    showAll() {
      this.$router.push({
        path: "/already_built",
      });
    },
    changeToMuseum(data, index) {
      this.$router.push({
        path: "/browsing",
        query: {
          model: data.museum_type,
          // scale: 1,
          museumId: data.museum_id,
        },
      });
    },
    showMuseumSpace() {
      if ($(".spaceBtn").hasClass("active") == true) {

      } else {
        switchSpace();
        this.loading = true;
        setTimeout(() => {
          var formData = new FormData();
          formData.append("page", 1);
          this.$axios
            .post(this.url + "get_skins_all_exhibition/EH001", formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            })
            .then((res) => {
              this.realList = res.data.data;
              this.showMostNotableMuseum = true;
              this.loading = false;
            });
        }, 1000);
      }
    },
    showMuseumGallery() {
      if ($(".galleryBtn").hasClass("active") == true) {

      } else {
        switchGallery();
        this.loading = true;
        setTimeout(() => {
          var formData = new FormData();
          formData.append("page", 1);
          this.$axios
            .post(this.url + "get_skins_all_exhibition/EH002", formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            })
            .then((res) => {
              this.realList = res.data.data;
              this.showMostNotableMuseum = false;
              this.loading = false;
            });
        }, 1000);
      }
    },
    showMuseumCyberpunk() {
      if ($(".cyberpunkBtn").hasClass("active") == true) {

      } else {
        switchCyberpunk();
        this.loading = true;
        setTimeout(() => {
          var formData = new FormData();
          formData.append("page", 1);
          this.$axios
            .post(this.url + "get_skins_all_exhibition/EH003", formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            })
            .then((res) => {
              this.realList = res.data.data;
              this.showMostNotableMuseum = false;
              this.loading = false;
            });
        }, 1000);
      }
    },
    async changeSetUpRouter(path) {
      const add = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (add.length == 0) {
        this.$notify({
          title: "Please connect your wallet",
          type: "error",
        });
      } else {
        this.$router.push({
          path,
          name: path.replace(path[0], path[0].toUpperCase()),
        });
      }
    },
    goToFaq(path) {
      this.$router.push({
        path
      });
    },
  },
  async mounted() {
    this.showMostNotableMuseum = false;
    this.loading = true;
    setTimeout(() => {
      // 获取一下第一页的space的资产
      var formData = new FormData();
      formData.append("page", 1);
      this.$axios
        .post(this.url + "get_skins_all_exhibition/EH001", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          this.spaceList = res.data.data;
          this.realList = this.spaceList;
          this.showMostNotableMuseum = true;
          this.loading = false;
          switchSpace();
        });
    }, 1000);
  },
};
</script>
<style lang="less" scoped>
@import "~@/assets/stylesheet/Home.less";
</style>
