<template>
  <!-- <footer :class="
      time === 'night' ? 'borderTopNight footer' : 'borderTopMorning footer'
    ">
    <div class="footer-container">
      <div class="footer-top">
        <div class="footer-top_firstPart">
          <img :src="tingLogo" alt="" class="tinglogo">
          <h2>Ting.Museum</h2>
        </div>
        <div class="footer-top_secondPart">
          <img :src="icarusLogo" alt="" class="icarusLogo">
          <ul>
            <li v-for="(item, index) in footerImgList" :key="index">
              <img :src="item" alt="" />
            </li>
          </ul>
        </div>
      </div>
      <div :class="
          time === 'night'
            ? 'borderTopNight footer-bottom'
            : 'borderTopMorning footer-bottom'
        ">
        <div class="footer-left">
          Copyright © 2021 Ting.Museum All rights reserved
        </div>
      </div>
    </div>
  </footer> -->
  <div class="footerContainer">
    <div class="footerContainer__items">
      <h1>Ting Museum</h1>
      <p class="p1">Powered By TingDAO</p>
      <p class="p2">Copyright @ 2021 Ting Museum All rights reserved</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
  computed: {
    time: {
      get() {
        return this.$store.state.time;
      },
      set() {},
    },
  },
  watch: {
    time() {
      this.statuses = this.$store.state.statuses;
    },
  },
};
</script>

<style lang="less">
@import "~@/assets/stylesheet/footer.less";
</style>
