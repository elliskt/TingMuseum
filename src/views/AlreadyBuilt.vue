<template>
  <div
    :class="
      time === 'night'
        ? 'alreadyBuilt nightBgc nightColor'
        : 'alreadyBuilt morningBgc morningColor'
    "
  >
    <Header></Header>
    <div class="alreadyBuilt__container animate__animated animate__fadeIn">
      <div class="titleAndBtn">
        <h1>Museums Curated By The Community</h1>
        <div class="sortButtons">
          <div class="space spaceBtn" @click="showMuseumSpace">
            <div>Space</div>
          </div>
          <div class="gallery galleryBtn" @click="showMuseumGallery">
            <div>Gallery</div>
          </div>
          <div class="cyberpunk cyberpunkBtn" @click="showMuseumCyberpunk">
            <div>Cyberpunk</div>
          </div>
          <div class="coming comingBtn" @click="showMuseumComingSoon">
            <div>Coming Soon...</div>
          </div>
        </div>
      </div>
      <ul class="mostnotableMuseums__item__container" v-if="showRealList">
        <li
          class="mostnotableMuseums__item"
          v-for="(item, index) in realList"
          :key="index"
          @click="changeToMuseum(item, index)"
        >
          <img :src="url + item.image_banner" alt="" class="banner" />
          <div class="mostnotableMuseums__item__info">
            <div class="mostnotableMuseums__item__left">{{ item.name }}</div>
            <div
              class="mostnotableMuseums__item__right"
              @click.stop="goToPersonal(item.participant[0])"
            >
              <img
                :src="url + item.participant_avatar[0]"
                alt=""
                class="mostnotableMuseums__item__right__avatar"
              />
              <div class="mostnotableMuseums__item__right__detail">
                <span class="mostnotableMuseums__item__right__detailName"
                  >@{{ item.creator_username[0] }}</span
                >
                <span class="mostnotableMuseums__item__right__detailAddress">{{
                  item.participant[0].slice(0, 18) + "..."
                }}</span>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <el-skeleton
        :loading="loading"
        animated
        class="alreadyBuiltSke"
        :throttle="0"
        v-if="showSke"
      >
        <template slot="template">
          <ul class="mostnotableMuseums__item__container">
            <li
              v-for="index in 6"
              :key="index"
              class="mostnotableMuseums__item"
            >
              <el-skeleton-item variant="p" class="banner" />
              <div class="mostnotableMuseums__item__info">
                <el-skeleton-item
                  variant="p"
                  class="mostnotableMuseums__item__left__ske_mname"
                />
                <div class="mostnotableMuseums__item__right__ske__right">
                  <el-skeleton-item
                    variant="p"
                    class="mostnotableMuseums__item__right__avatar__ske_avatar"
                  />
                  <div
                    class="mostnotableMuseums__item__right__detail__ske__detail"
                  >
                    <el-skeleton-item
                      variant="p"
                      class="mostnotableMuseums__item__right__detailName__ske_mname"
                    />
                    <el-skeleton-item
                      variant="p"
                      class="mostnotableMuseums__item__right__detailAddress__ske_mname"
                    />
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </template>
        <!-- <template>
                    <ul class="mostnotableMuseums__item__container">
                        <li class="mostnotableMuseums__item" v-for="(item,index) in realList" :key="index"
                            @click="changeToMuseum(item,index)">
                            <img :src="url+item.image_banner" alt="" class="banner">
                            <div class="mostnotableMuseums__item__info">
                                <div class="mostnotableMuseums__item__left">{{item.name}}</div>
                                <div class="mostnotableMuseums__item__right">
                                    <img :src="url+item.participant_avatar[0]" alt=""
                                        class="mostnotableMuseums__item__right__avatar">
                                    <div class="mostnotableMuseums__item__right__detail">
                                        <span
                                            class="mostnotableMuseums__item__right__detailName">@{{item.creator_username[0]}}</span>
                                        <span
                                            class="mostnotableMuseums__item__right__detailAddress">{{(item.participant[0]).slice(0,18)+'...'}}</span>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </template> -->
      </el-skeleton>

      <div class="loadMoreBtn__container" v-if="showLoadMore">
        <div class="loadMoreBtn" @click="loadMore">Load More</div>
      </div>
      <div class="loadingSymbol" v-if="showLoadingSymbol">
        <svg
          t="1640230678106"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="10262"
          width="32"
          height="32"
        >
          <path
            d="M517.12 132.352a382.656 382.656 0 1 0 0 765.248 382.656 382.656 0 0 0 0-765.248z m0 680.448a297.792 297.792 0 1 1 0-595.648 297.792 297.792 0 0 1 0 595.648z"
            fill="#2c2c2c"
            opacity=".2"
            p-id="10263"
          ></path>
          <path
            d="M797.056 426.24l80.64-26.048c-20.48-64-57.472-121.344-107.264-166.4l-56.832 62.912a296.192 296.192 0 0 1 83.456 129.536z"
            fill="#2c2c2c"
            p-id="10264"
          ></path>
        </svg>
      </div>
      <div class="comingSoonContainer" v-if="showComingSoonContainer">
        <div class="comingSoonBtn">
          <div class="text">Coming Soon...</div>
        </div>
      </div>
    </div>

    <div class="joinAndFoot">
      <div class="join">
        <h1>Join The Community For Much More</h1>
        <div class="icons">
          <!-- <svg t="1638951023538" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="7059" width="32" height="32">
                        <path
                            d="M347.8 794.8c0 4-4.6 7.2-10.4 7.2-6.6 0.6-11.2-2.6-11.2-7.2 0-4 4.6-7.2 10.4-7.2 6-0.6 11.2 2.6 11.2 7.2z m-62.2-9c-1.4 4 2.6 8.6 8.6 9.8 5.2 2 11.2 0 12.4-4s-2.6-8.6-8.6-10.4c-5.2-1.4-11 0.6-12.4 4.6z m88.4-3.4c-5.8 1.4-9.8 5.2-9.2 9.8 0.6 4 5.8 6.6 11.8 5.2 5.8-1.4 9.8-5.2 9.2-9.2-0.6-3.8-6-6.4-11.8-5.8zM505.6 16C228.2 16 16 226.6 16 504c0 221.8 139.6 411.6 339 478.4 25.6 4.6 34.6-11.2 34.6-24.2 0-12.4-0.6-80.8-0.6-122.8 0 0-140 30-169.4-59.6 0 0-22.8-58.2-55.6-73.2 0 0-45.8-31.4 3.2-30.8 0 0 49.8 4 77.2 51.6 43.8 77.2 117.2 55 145.8 41.8 4.6-32 17.6-54.2 32-67.4-111.8-12.4-224.6-28.6-224.6-221 0-55 15.2-82.6 47.2-117.8-5.2-13-22.2-66.6 5.2-135.8 41.8-13 138 54 138 54 40-11.2 83-17 125.6-17s85.6 5.8 125.6 17c0 0 96.2-67.2 138-54 27.4 69.4 10.4 122.8 5.2 135.8 32 35.4 51.6 63 51.6 117.8 0 193-117.8 208.4-229.6 221 18.4 15.8 34 45.8 34 92.8 0 67.4-0.6 150.8-0.6 167.2 0 13 9.2 28.8 34.6 24.2C872.4 915.6 1008 725.8 1008 504 1008 226.6 783 16 505.6 16zM210.4 705.8c-2.6 2-2 6.6 1.4 10.4 3.2 3.2 7.8 4.6 10.4 2 2.6-2 2-6.6-1.4-10.4-3.2-3.2-7.8-4.6-10.4-2z m-21.6-16.2c-1.4 2.6 0.6 5.8 4.6 7.8 3.2 2 7.2 1.4 8.6-1.4 1.4-2.6-0.6-5.8-4.6-7.8-4-1.2-7.2-0.6-8.6 1.4z m64.8 71.2c-3.2 2.6-2 8.6 2.6 12.4 4.6 4.6 10.4 5.2 13 2 2.6-2.6 1.4-8.6-2.6-12.4-4.4-4.6-10.4-5.2-13-2z m-22.8-29.4c-3.2 2-3.2 7.2 0 11.8 3.2 4.6 8.6 6.6 11.2 4.6 3.2-2.6 3.2-7.8 0-12.4-2.8-4.6-8-6.6-11.2-4z"
                            p-id="7060" fill="#ffffff"></path>
                    </svg> -->
          <svg
            t="1638951078552"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="8560"
            width="32"
            height="32"
            @click="openDiscord"
          >
            <path
              d="M657.316864 151.7056c131.4816 0 242.176 90.0096 242.176 90.0096 131.4304 270.08 124.5184 505.5488 124.5184 505.5488-103.7824 138.496-262.912 124.672-262.912 124.672l-55.296-69.2736c96.8192-20.7872 152.1664-103.8848 152.1664-103.8848S712.664064 795.7504 512.062464 795.7504c-207.5648 0-345.9072-96.9728-345.9072-96.9728s62.2592 83.0976 152.2176 103.936L263.025664 871.936S103.896064 878.848 0.062464 747.264c0 0-6.912-235.4688 124.5184-505.5488 0 0 117.6064-90.0096 242.176-90.0096l13.824 13.824s-138.3936 41.5744-214.4768 110.7968c0 0 145.3056-90.0096 345.9072-90.0096 193.6896 0 338.944 83.0976 345.9072 90.0096-76.0832-69.2224-214.4768-110.7968-214.4768-110.7968l13.824-13.824z m-308.7872 307.2C298.712064 458.9056 256.062464 501.6064 256.062464 558.5408s42.6496 99.6864 92.4672 99.6864c49.7664 0 92.416-42.752 92.416-99.6864s-42.6496-99.6352-92.416-99.6352z m327.0656 0c-49.7664 0-92.416 42.7008-92.416 99.6352s42.6496 99.6864 92.416 99.6864c49.8176 0 92.4672-42.752 92.4672-99.6864-7.1168-56.9344-42.6496-99.6352-92.4672-99.6352z"
              p-id="8561"
              fill="#ffffff"
            ></path>
          </svg>
          <svg
            t="1638951101299"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="9412"
            width="32"
            height="32"
            @click="openTwitter"
          >
            <path
              d="M928 254.3c-30.6 13.2-63.9 22.7-98.2 26.4 35.4-21.1 62.3-54.4 75-94-32.7 19.5-69.7 33.8-108.2 41.2C765.4 194.6 721.1 174 672 174c-94.5 0-170.5 76.6-170.5 170.6 0 13.2 1.6 26.4 4.2 39.1-141.5-7.4-267.7-75-351.6-178.5-14.8 25.4-23.2 54.4-23.2 86.1 0 59.2 30.1 111.4 76 142.1-28-1.1-54.4-9-77.1-21.7v2.1c0 82.9 58.6 151.6 136.7 167.4-14.3 3.7-29.6 5.8-44.9 5.8-11.1 0-21.6-1.1-32.2-2.6C211 652 273.9 701.1 348.8 702.7c-58.6 45.9-132 72.9-211.7 72.9-14.3 0-27.5-0.5-41.2-2.1C171.5 822 261.2 850 357.8 850 671.4 850 843 590.2 843 364.7c0-7.4 0-14.8-0.5-22.2 33.2-24.3 62.3-54.4 85.5-88.2z"
              p-id="9413"
              fill="#ffffff"
            ></path>
          </svg>
          <svg
            t="1638951122724"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="10268"
            width="32"
            height="32"
            @click="openInstagram"
          >
            <path
              d="M512 306.9c-113.5 0-205.1 91.6-205.1 205.1S398.5 717.1 512 717.1 717.1 625.5 717.1 512 625.5 306.9 512 306.9z m0 338.4c-73.4 0-133.3-59.9-133.3-133.3S438.6 378.7 512 378.7 645.3 438.6 645.3 512 585.4 645.3 512 645.3zM725.5 250.7c-26.5 0-47.9 21.4-47.9 47.9s21.4 47.9 47.9 47.9 47.9-21.3 47.9-47.9c-0.1-26.6-21.4-47.9-47.9-47.9z"
              p-id="10269"
              fill="#ffffff"
            ></path>
            <path
              d="M911.8 512c0-55.2 0.5-109.9-2.6-165-3.1-64-17.7-120.8-64.5-167.6-46.9-46.9-103.6-61.4-167.6-64.5-55.2-3.1-109.9-2.6-165-2.6-55.2 0-109.9-0.5-165 2.6-64 3.1-120.8 17.7-167.6 64.5C132.6 226.3 118.1 283 115 347c-3.1 55.2-2.6 109.9-2.6 165s-0.5 109.9 2.6 165c3.1 64 17.7 120.8 64.5 167.6 46.9 46.9 103.6 61.4 167.6 64.5 55.2 3.1 109.9 2.6 165 2.6 55.2 0 109.9 0.5 165-2.6 64-3.1 120.8-17.7 167.6-64.5 46.9-46.9 61.4-103.6 64.5-167.6 3.2-55.1 2.6-109.8 2.6-165z m-88 235.8c-7.3 18.2-16.1 31.8-30.2 45.8-14.1 14.1-27.6 22.9-45.8 30.2C695.2 844.7 570.3 840 512 840c-58.3 0-183.3 4.7-235.9-16.1-18.2-7.3-31.8-16.1-45.8-30.2-14.1-14.1-22.9-27.6-30.2-45.8C179.3 695.2 184 570.3 184 512c0-58.3-4.7-183.3 16.1-235.9 7.3-18.2 16.1-31.8 30.2-45.8s27.6-22.9 45.8-30.2C328.7 179.3 453.7 184 512 184s183.3-4.7 235.9 16.1c18.2 7.3 31.8 16.1 45.8 30.2 14.1 14.1 22.9 27.6 30.2 45.8C844.7 328.7 840 453.7 840 512c0 58.3 4.7 183.2-16.2 235.8z"
              p-id="10270"
              fill="#ffffff"
            ></path>
          </svg>
        </div>
      </div>
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
import Header from "@/components/header.vue";
import Footer from "@/components/footer.vue";
// import $ from "jquery";

export default {
  props: ["time"],
  name: "AlreadyBuilt",
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      url: window.urls,
      spaceList: "",
      galleryList: "",
      cyberpunkList: "",
      realList: "", //用其他的list替换这个list的内容，显示到最终的页面上
      loading: true, // 控制骨架屏的加载状态
      language: window.localStorage.getItem("languageStorage") || "en",
      showSke: true, //显示骨架屏，comingSoon的时候隐藏骨架屏
      showComingSoonContainer: false, //显示comingSoon的部分，点其他museum按钮时隐藏
      showLoadMore: true, //显示loadMore的按钮，点击comingSoon的时候要隐藏
      pageOfLoadMore: 2, //每次点击museum的按钮，都会将这个变量置为2，为了让每次点击loadMore的时候都是请求第二页的内容
      museumType: "EH001", //初始为EH001，每次点击不同的museum按钮的时候，都会改变这个值为对应的展馆类型
      infiniteScroll: false, // 刚开始时禁用无限滚动，点击loadMore一次之后才可以无限滚动
      showLoadingSymbol: false, // 用于显示
      showRealList: false,
      totalPageOfSpace: "",
      totalPageOfGallery: "",
      totalPageOfCyberpunk: "",
    };
  },
  methods: {
    goToPersonal(address) {
      const route = this.$router.resolve({
        path: "/personal",
        query: {
          id: address,
        },
      });
      window.open(route.href, "_blank");
    },
    openDiscord() {
      window.open("https://discord.gg/G7SR5Yxy2R", "_blank");
    },
    openTwitter() {
      window.open("https://twitter.com/theTingDAO", "_blank");
    },
    openInstagram() {
      window.open("https://www.instagram.com/thetingdao/", "_blank");
    },
    /**点击loadMore按钮加载更多，然后隐藏loadMore按钮，实现无限滚动 */
    loadMore() {
      if (this.museumType == "EH001") {
        if (this.pageOfLoadMore > this.totalPageOfSpace) {
          this.$notify({
            title: this.$t("discover.loadOver"),
            type: "warning",
          });
        } else {
          this.loading = true;
          setTimeout(() => {
            var formData = new FormData();
            formData.append("page", this.pageOfLoadMore++);
            this.$axios
              .post(this.url + "get_skins_all_exhibition/EH001", formData, {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              })
              .then((res) => {
                this.realList = this.realList.concat(res.data.data);
                this.loading = false;
              });
          }, 1000);
        }
      } else if (this.museumType == "EH002") {
        if (this.pageOfLoadMore > this.totalPageOfGallery) {
          this.$notify({
            title: this.$t("discover.loadOver"),
            type: "warning",
          });
        } else {
          this.loading = true;
          setTimeout(() => {
            var formData = new FormData();
            formData.append("page", this.pageOfLoadMore++);
            this.$axios
              .post(this.url + "get_skins_all_exhibition/EH002", formData, {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              })
              .then((res) => {
                this.realList = this.realList.concat(res.data.data);
                this.loading = false;
              });
          }, 1000);
        }
      } else {
        if (this.pageOfLoadMore > this.totalPageOfCyberpunk) {
          this.$notify({
            title: this.$t("discover.loadOver"),
            type: "warning",
            customClass: "attention",
          });
        } else {
          this.loading = true;
          setTimeout(() => {
            var formData = new FormData();
            formData.append("page", this.pageOfLoadMore++);
            this.$axios
              .post(this.url + "get_skins_all_exhibition/EH003", formData, {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              })
              .then((res) => {
                this.realList = this.realList.concat(res.data.data);
                this.loading = false;
              });
          }, 1000);
        }
      }
    },
    /**
     * 点击进入对应的展馆
     */
    changeToMuseum(data, index) {
      this.$router.push({
        path: "/browsing",
        query: {
          model: data.museum_type,
          museumId: data.museum_id,
        },
      });
    },
    /**
     * 点击space按钮切换到space的内容
     */
    showMuseumSpace() {
      $(".spaceBtn").addClass("active");
      $(".spaceBtn").removeClass("commonBtn space");
      $(".galleryBtn").removeClass("active");
      $(".galleryBtn").addClass("gallery");
      $(".cyberpunkBtn").removeClass("active");
      $(".cyberpunkBtn").addClass("cyberpunk");
      $(".comingBtn").removeClass("active");
      $(".comingBtn").addClass("coming");
      this.showSke = true;
      this.showRealList = false;
      this.showComingSoonContainer = false;
      this.showLoadMore = false;
      this.loading = true;
      this.museumType = "EH001";
      this.pageOfLoadMore = 2;
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
            this.loading = false;
            this.totalPageOfSpace = res.data.total_page;
            this.showRealList = true;
            this.showLoadMore = true;
          });
      }, 1000);
    },
    /**
     * 点击gallery按钮切换到gallerye的内容
     */
    showMuseumGallery() {
      $(".galleryBtn").removeClass("gallery");
      $(".galleryBtn").addClass("active");
      $(".spaceBtn").removeClass("space active");
      $(".spaceBtn").addClass("commonBtn");
      $(".cyberpunkBtn").removeClass("active");
      $(".cyberpunkBtn").addClass("cyberpunk");
      $(".comingBtn").removeClass("active");
      $(".comingBtn").addClass("coming");
      this.showComingSoonContainer = false;
      this.showLoadMore = false;
      this.showRealList = false;
      this.showSke = true;
      this.museumType = "EH002";
      this.pageOfLoadMore = 2;
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
            this.loading = false;
            this.totalPageOfGallery = res.data.total_page;
            this.showRealList = true;
            this.showLoadMore = true;
          });
      }, 1000);
    },
    /**
     * 点击cyberpunk按钮切换到cyberpunk的内容
     */
    showMuseumCyberpunk() {
      $(".cyberpunkBtn").removeClass("cyberpunk");
      $(".cyberpunkBtn").addClass("active");
      $(".spaceBtn").removeClass("space active");
      $(".spaceBtn").addClass("commonBtn");
      $(".galleryBtn").removeClass("active");
      $(".galleryBtn").addClass("gallery");
      $(".comingBtn").removeClass("active");
      $(".comingBtn").addClass("coming");
      this.showComingSoonContainer = false;
      this.showSke = true;
      this.showLoadMore = false;
      this.showRealList = false;
      this.museumType = "EH003";
      this.pageOfLoadMore = 2;
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
            this.totalPageOfCyberpunk = res.data.total_page;
            this.loading = false;
            this.showRealList = true;
            this.showLoadMore = true;
          });
      }, 1000);
    },
    /**
     * 点击comingSoon按钮切换到comingSoon的内容
     */
    showMuseumComingSoon() {
      $(".comingBtn").removeClass("coming");
      $(".comingBtn").addClass("active");
      $(".spaceBtn").removeClass("space active");
      $(".spaceBtn").addClass("commonBtn");
      $(".galleryBtn").removeClass("active");
      $(".galleryBtn").addClass("gallery");
      $(".cyberpunkBtn").removeClass("active");
      $(".cyberpunkBtn").addClass("cyberpunk");
      this.showComingSoonContainer = true;
      this.showSke = false;
      this.showRealList = false;
      this.showLoadMore = false;
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 1000);
    },
  },
  mounted() {
    this.showRealList = false;
    this.museumType = "EH001";
    this.loading = true;
    this.showLoadingSymbol = false;
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
          this.loading = false;
          this.showRealList = true;
          this.totalPageOfSpace = res.data.total_page;
        });
    }, 1000);
  },
};
</script>

<style lang="less" scope>
@import "~@/assets/stylesheet/AlreadyBuilt.less";
</style>
