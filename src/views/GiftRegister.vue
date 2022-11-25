<template>
  <div :class="
    time === 'night'
      ? 'giftRegister nightBgc nightColor'
      : 'giftRegister morningBgc morningColor'
  ">
    <!-- 头部 -->
    <Header></Header>
    <div class="eventSelectPage animate__animated animate__fadeIn" v-if="eventSelect">
      <h1>
        Ting Museum always keen to<br />
        give back to the <span class="community">community</span><br />
        that supports us
      </h1>
      <div class="eventList">
        <div class="event" @click="enterEvent(0)">
          <video src="https://tinigmuseum-bucket.s3.ap-east-1.amazonaws.com/gift-folder/mpoc-airdrop.mp4" muted loop
            autoplay />
          <div class="active">ACTIVE</div>
          <div class="title">Secret Partaay!<br />Whitelist</div>
          <div class="mask"></div>
        </div>
        <div class="event" @click="enterEvent(1)">
          <video src="https://tinigmuseum-bucket.s3.ap-east-1.amazonaws.com/gift-folder/tingmuseumPOAP%232.mp4" muted
            loop autoplay></video>
          <div class="expired">Expired</div>
          <div class="title">
            Ting Museum<br />
            POAP
          </div>
          <div class="mask"></div>
        </div>
        <div class="event" @click="enterEvent(2)">
          <video src="https://tinigmuseum-bucket.s3.ap-east-1.amazonaws.com/gift-folder/tingmuseumPOAP%231.mp4" muted
            loop autoplay></video>
          <div class="expired">Expired</div>
          <div class="title">
            CATs Festival<br />
            New York
          </div>
          <div class="mask"></div>
        </div>
        <div class="event" @click="enterEvent(3)">
          <video src="https://tinigmuseum-bucket.s3.ap-east-1.amazonaws.com/gift-folder/tingmuseumPOAP%233.mp4" muted
            loop autoplay></video>
          <div class="expired">Expired</div>
          <div class="title">
            CATs Festival<br />
            Beijing
          </div>
          <div class="mask"></div>
        </div>
        <div class="event" @click="enterEvent(4)">
          <img src="https://tinigmuseum-bucket.s3.ap-east-1.amazonaws.com/gift-folder/WearableCV.jpg" alt="" />
          <div class="expired">Expired</div>
          <div class="title">
            Wearable CV<br />
            gears
          </div>
          <div class="mask"></div>
        </div>
        <div class="event" @click="enterEvent(5)">
          <video
            src="https://tinigmuseum-bucket.s3.ap-east-1.amazonaws.com/gift-folder/c082645bbc4ad27d535ea55e215595a5.mp4"
            muted loop autoplay></video>
          <div class="expired">Expired</div>
          <div class="title">
            Wearable<br />
            christmas hat
          </div>
          <div class="mask"></div>
        </div>
      </div>
    </div>
    <div class="gift__container animate__animated animate__fadeIn" v-if="centerEvent">
      <Swiper :currentPage="currentPage" :showCenterEvent="showCenterEvent" :showEventSelect="showEventSelect"
        @changeEventSelect="updateEventSelect" @changeCenterEvent="updateCenterEvent"
        @changeCurrentPage="updateCurrentPage"></Swiper>
    </div>
    <div class="foot">
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
import Header from "@/components/header.vue";
import Footer from "@/components/footer.vue";
import Swiper from "../components/swiper.vue";
import "animate.css";
export default {
  props: ["time"],
  name: "GiftRegister",
  components: {
    Header,
    Footer,
    Swiper,
  },
  computed: {
    eventSelect: {
      get() {
        return this.showEventSelect;
      },
      set(newValue) {
        return newValue;
      },
    },
    centerEvent: {
      get() {
        return this.showCenterEvent;
      },
      set(newValue) {
        return newValue;
      },
    },
    addr: {
      get() {
        return this.address;
      },
    },
  },
  data() {
    return {
      url: window.urls, //从public的url.js中拿
      language: window.localStorage.getItem("languageStorage") || "en",
      userList: {},
      allMuseumList: {},
      // 当前页数
      showUserInfo: false, //控制按钮的白天黑夜的效果以及两个按钮之间的切换
      showAllMuseums: false, //控制按钮的白天黑夜的效果以及两个按钮之间的切换
      showMuseumSkin: true,
      userShow: false, //传给子组件carddiscover的，用于控制每个按钮下面的需要显示的内容
      museumShow: false, //传给子组件carddiscover的，用于控制每个按钮下面的需要显示的内容
      page: 1,
      address: "",
      errorCode: "",
      showCenterEvent: false,
      showEventSelect: true,
      currentPage: 0,
    };
  },
  methods: {
    updateEventSelect(event) {
      this.showEventSelect = event;
    },
    updateCenterEvent(event) {
      this.showCenterEvent = event;
    },
    updateCurrentPage(event) {
      this.currentPage = event;
    },
    enterEvent(page) {
      this.showCenterEvent = true;
      this.showEventSelect = false;
      this.currentPage = page;
    },
    openDiscord() {
      window.open("https://discord.com/invite/G7SR5Yxy2R", "_blank");
    },
  },
  async mounted() {
    const address = await ethereum.request({
      method: "eth_accounts",
    });
    if (address.length !== 0) {
      this.address = this.$ethers.utils.getAddress(address[0]);
    }
    window.ethereum.on("accountsChanged", async () => {
      const address = await ethereum.request({
        method: "eth_accounts",
      });
      if (address.length !== 0) {
        this.address = this.$ethers.utils.getAddress(address[0]);
      } else {
        this.$router.push({
          path: "/home",
        });
      }
    });
  },
};
</script>

<style lang="less">
@import "~@/assets/stylesheet/GiftRegister.less";
</style>
