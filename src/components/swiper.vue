<template>
  <div class="wrapper">
    <swiper ref="mySwiper" :options="swiperOptions" class="swiper">
      <swiper-slide>
        <h1>Secret Partaay! Whitelist</h1>
        <div class="center">
          <div class="bannerAndAddressOfActive">
            <div class="banner">
              <video src="https://tinigmuseum-bucket.s3.ap-east-1.amazonaws.com/gift-folder/mpoc-airdrop.mp4" loop
                autoplay preload ref="mpoc" id="0"></video>
            </div>
            <div class="tip">This activity is now live</div>
            <!-- <div class="address">
              {{ addr }}
            </div>
            <div class="discordId">
              <input
                type="text"
                placeholder="Enter Your Discord_Id"
                ref="discord_id"
              />
            </div> -->
            <div class="description">
              <div class="part1">
                By playing the WindyMuse in any CyberPunk museum, part of the
                lead in ranking will get a music NFT airdrop from MPOC.<br /><br />
                What is MPOC?
              </div>
              <div class="part2">
                <span @click="openMPOC">https://nft.mpocmusic.com/</span>
              </div>
              <div class="part3">
                MPOC stands for Master-Piece-On-Chain, with a website and a
                mobile app built on Ethereum. At the current stage, due to cyber
                security reasons, the mobile app version mainly serves as an
                exhibition gallery and collectors’ online club, while the
                website version would serve as a marketplace for all.
              </div>
            </div>
          </div>
          <div class="btnsOfActive">
            <!-- <div class="confirm" @click="confirm"><span>Confirm</span></div> -->
            <div class="cancel" @click="cancelTingMuseumPoap">
              <span>cancel</span>
            </div>
          </div>
          <div class="eventRegisterText">
            <h2>
              <img src="../assets/home/idea.png" alt="" />Join our
              <span @click="openDiscord" class="discord">Discord</span> to get
              more info for air-drop events.
            </h2>
            <h2>
              <img src="../assets/home/idea.png" alt="" />OpenSea might hidden
              air dropped NFT, you could ask for solution in our
              <span @click="openDiscord" class="discord">Discord</span>.
            </h2>
          </div>
        </div>
      </swiper-slide>
      <swiper-slide>
        <h1>Ting Museum POAP</h1>
        <div class="center">
          <div class="bannerAndAddress">
            <div class="banner">
              <video src="https://tinigmuseum-bucket.s3.ap-east-1.amazonaws.com/gift-folder/tingmuseumPOAP%232.mp4" loop
                autoplay preload id="1"></video>
            </div>
            <div class="tip">This activity is expired</div>
          </div>
          <div class="btns">
            <div class="confirm"><span>Closed</span></div>
            <div class="cancel" @click="cancelTingMuseumPoap">
              <span>cancel</span>
            </div>
          </div>
          <div class="eventRegisterText">
            <h2>
              <img src="../assets/home/idea.png" alt="" />Join our
              <span @click="openDiscord" class="discord">Discord</span> to get
              more info for air-drop events.
            </h2>
            <h2>
              <img src="../assets/home/idea.png" alt="" />OpenSea might hidden
              air dropped NFT, you could ask for solution in our
              <span @click="openDiscord" class="discord">Discord</span>.
            </h2>
          </div>
        </div>
      </swiper-slide>
      <swiper-slide>
        <h1>CATs Festival New York</h1>
        <div class="center">
          <div class="bannerAndAddress">
            <div class="banner">
              <video src="https://tinigmuseum-bucket.s3.ap-east-1.amazonaws.com/gift-folder/tingmuseumPOAP%231.mp4" loop
                autoplay preload id="2"></video>
            </div>
            <div class="tip">This activity is expired</div>
          </div>
          <div class="btns">
            <div class="confirm"><span>Closed</span></div>
            <div class="cancel" @click="cancelTingMuseumPoap">
              <span>cancel</span>
            </div>
          </div>
          <div class="eventRegisterText">
            <h2>
              <img src="../assets/home/idea.png" alt="" />Join our
              <span @click="openDiscord" class="discord">Discord</span> to get
              more info for air-drop events.
            </h2>
            <h2>
              <img src="../assets/home/idea.png" alt="" />OpenSea might hidden
              air dropped NFT, you could ask for solution in our
              <span @click="openDiscord" class="discord">Discord</span>.
            </h2>
          </div>
        </div>
      </swiper-slide>
      <swiper-slide>
        <h1>CATs Festival Beijing</h1>
        <div class="center">
          <div class="bannerAndAddress">
            <div class="banner">
              <video src="https://tinigmuseum-bucket.s3.ap-east-1.amazonaws.com/gift-folder/tingmuseumPOAP%233.mp4" loop
                autoplay preload id="3"></video>
            </div>
            <div class="tip">This activity is expired</div>
          </div>
          <div class="btns">
            <div class="confirm"><span>Closed</span></div>
            <div class="cancel" @click="cancelTingMuseumPoap">
              <span>cancel</span>
            </div>
          </div>
          <div class="eventRegisterText">
            <h2>
              <img src="../assets/home/idea.png" alt="" />Join our
              <span @click="openDiscord" class="discord">Discord</span> to get
              more info for air-drop events.
            </h2>
            <h2>
              <img src="../assets/home/idea.png" alt="" />OpenSea might hidden
              air dropped NFT, you could ask for solution in our
              <span @click="openDiscord" class="discord">Discord</span>.
            </h2>
          </div>
        </div>
      </swiper-slide>
      <swiper-slide>
        <h1>Wearable CV gears</h1>
        <div class="center">
          <div class="bannerAndAddress">
            <div class="banner">
              <img src="https://tinigmuseum-bucket.s3.ap-east-1.amazonaws.com/gift-folder/WearableCV.jpg" alt="" />
              <div class="tip">This activity is expired</div>
            </div>
          </div>
          <div class="btns">
            <div class="confirm"><span>Closed</span></div>
            <div class="cancel" @click="cancelTingMuseumPoap">
              <span>cancel</span>
            </div>
          </div>
          <div class="eventRegisterText">
            <h2>
              <img src="../assets/home/idea.png" alt="" />Join our
              <span @click="openDiscord" class="discord">Discord</span> to get
              more info for air-drop events.
            </h2>
            <h2>
              <img src="../assets/home/idea.png" alt="" />OpenSea might hidden
              air dropped NFT, you could ask for solution in our
              <span @click="openDiscord" class="discord">Discord</span>.
            </h2>
          </div>
        </div>
      </swiper-slide>
      <swiper-slide>
        <h1>Wearable christmas hat</h1>
        <div class="center">
          <div class="bannerAndAddress">
            <div class="banner">
              <!-- <img src="../assets/home/Christmas.jpeg" alt=""> -->
              <video
                src="https://tinigmuseum-bucket.s3.ap-east-1.amazonaws.com/gift-folder/c082645bbc4ad27d535ea55e215595a5.mp4"
                loop autoplay preload id="4"></video>
            </div>
            <div class="tip">This activity is expired</div>
          </div>
          <div class="btns">
            <div class="confirm"><span>Closed</span></div>
            <div class="cancel" @click="cancelOfChristmas">
              <span>cancel</span>
            </div>
          </div>
          <div class="eventRegisterText">
            <h2>
              <img src="../assets/home/idea.png" alt="" />Join our
              <span @click="openDiscord" class="discord">Discord</span> to get
              more info for air-drop events.
            </h2>
            <h2>
              <img src="../assets/home/idea.png" alt="" />OpenSea might hidden
              air dropped NFT, you could ask for solution in our
              <span @click="openDiscord" class="discord">Discord</span>.
            </h2>
            <h2>
              <img src="../assets/home/idea.png" alt="" /><span class="profile">Remember to change your profile picture
                in personal page for
                participanting in this activity.</span>
            </h2>
          </div>
        </div>
      </swiper-slide>
    </swiper>
    <!--分页器。如果放置在swiper外面，需要自定义样式。-->
    <!-- <div class="swiper-pagination" slot="pagination"></div> -->
    <!--左箭头。如果放置在swiper外面，需要自定义样式。-->
    <div class="swiper-button-prev swiper-button-black" slot="button-prev" id="arrow-left">
      <img src=".././assets/Gift/previous.png" alt="" class="animate__animated" />
    </div>
    <!--右箭头。如果放置在swiper外面，需要自定义样式。-->
    <div class="swiper-button-next swiper-button-black" slot="button-next" id="arrow-right">
      <img src=".././assets/Gift/next.png" alt="" class="animate__animated" />
    </div>
  </div>
</template>

<script>
export default {
  props: ["currentPage"],
  data() {
    return {
      swiperOptions: {
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true, //修改swiper的父元素时，自动初始化swiper
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
          type: "bullets",
        },
        effect: "slide",
        autoplay: 3000,
        speed: 500,
        loop: false,
        preloadImages: true,
        grabCursor: true,
        autoplayDisableOnInteraction: false, //用户操作了swiper之后还会继续轮播，默认值是true，代表操作了之后就不会继续轮播了
      },
      address: "",
      page: 0,
    };
  },
  methods: {
    openDiscord() {
      window.open("https://discord.com/invite/G7SR5Yxy2R", "_blank");
    },
    openMPOC() {
      window.open("https://nft.mpocmusic.com/", "_blank");
    },
    confirm() {
      if (this.confirmBtnText == "Connect Wallet") {
        this.$router.push({
          path: "/createYours",
        });
      } else {
        var formData = new FormData();
        formData.append("user_address", this.address);
        formData.append("discord_id", this.$refs.discord_id.value);
        this.$axios
          .post(this.url + "event_christmaseve", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            this.$notify({
              title: "Register Success",
              type: "success",
              customClass: "registerSuccess",
            });
          })
          .catch((error) => {
            if (error.message == "Request failed with status code 400") {
              this.$notify({
                title: "You have registered already!",
                type: "error",
                customClass: "attention",
              });
            } else if (error.message == "Request failed with status code 404") {
              this.$notify({
                title: "You should enter correct discord_id!",
                type: "error",
                customClass: "attention",
              });
            }
          });
      }
    },
    cancelOfChristmas() {
      this.$emit("changeCenterEvent", false);
      this.$emit("changeEventSelect", true);
    },
    cancelTingMuseumPoap() {
      this.$emit("changeCenterEvent", false);
      this.$emit("changeEventSelect", true);
    },
    prev() {
      this.swiper.slidePrev();
    },
    next() {
      this.swiper.slideNext();
    },
    slideToSomePage(page) {
      // this.$refs.mySwiper.swiper.slideTo(page, 0, false);
    },
  },
  computed: {
    pages: {
      get() {
        return this.currentPage;
      },
    },
    swiper() {
      return this.$refs.mySwiper.swiper;
    },
    addr() {
      return this.address;
    },
  },
  watch: {},
  async mounted() {
    document.getElementsByClassName("giftRegister")[0].scrollTop = 0;
    var _that = this;
    try {
      var mySwiper = new Swiper(".swiper");
      $("#arrow-left").click(function () {
        mySwiper.slidePrev();
      });
      $("#arrow-right").click(function () {
        mySwiper.slideNext();
      });
    } catch (error) { }

    this.$refs.mySwiper.swiper.slideTo(this.pages, 0, false);
    for (let i of $("video")) {
      console.log("i.id:", i.id);
      console.log("activeIndex:", this.$refs.mySwiper.swiper.activeIndex);
      if (Number(i.id) !== this.$refs.mySwiper.swiper.activeIndex) {
        i.muted = true;
        i.play();
      } else if (Number(i.id) == this.$refs.mySwiper.swiper.activeIndex) {
        i.muted = false;
        i.play();
      }
    }
    this.$refs.mySwiper.swiper.on("slideChange", () => {
      for (let i of $("video")) {
        if (Number(i.id) !== this.$refs.mySwiper.swiper.activeIndex) {
          i.muted = true;
          i.play();
        } else if (Number(i.id) == this.$refs.mySwiper.swiper.activeIndex) {
          i.muted = false;
          i.play();
        }
      }
    });
    $(".cancel").on("click", function () {
      _that.$emit("changeCenterEvent", false);
      _that.$emit("changeEventSelect", true);
    });
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

<style lang="less" scoped>
.wrapper {
  width: 100%;
  overflow: hidden;
  position: relative;
  --swiper-navigation-size: 0;
  user-select: none;

  & .swiper {
    height: 80rem;

    & .swiper-slide {
      height: 65rem;

      & h1 {
        font-family: "MyriadConcept";
        font-size: 3.5rem;
        padding: 1rem 0 1rem 1rem;
        text-align: center;
      }

      & .center {
        width: 48.625rem;
        height: 65rem;
        margin: 0 auto;
        display: flex;
        flex-direction: column;

        & .bannerAndAddress {
          width: 41.625rem;
          height: 43rem;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          box-sizing: border-box;
          border-radius: 5px;
          margin-bottom: 1rem;

          & .banner {
            width: 100%;
            height: 100%;
            border-radius: 5px 5px 0 0;
            box-sizing: border-box;
            overflow: hidden;
            position: relative;

            & img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }

            & video {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
          }

          & .tip {
            width: 100%;
            height: 26px;
            // position: absolute;
            // bottom: 0;
            background: #9e8657;
            font-family: "Bitter-Bold";
            font-size: 20px;
            font-style: normal;
            font-weight: 700;
            line-height: 24px;
            letter-spacing: 0em;
            text-align: center;
            color: rgba(255, 235, 235, 1);
            border-radius: 0 0 5px 5px;
          }

          & .address {
            font-family: "HelveticaNeue";
            width: 100%;
            height: 8%;
            font-family: "HelveticaNeue";
            border-radius: 5px;
            background-color: #f5f5f5;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          & .discordId {
            font-family: "HelveticaNeue";
            width: 100%;
            height: 8%;
            font-family: "HelveticaNeue";
            border-radius: 5px;
            background-color: #f5f5f5;
            display: flex;
            align-items: center;
            justify-content: center;

            & input {
              font-family: "HelveticaNeue";
              font-size: 1rem;
              width: 90%;
              height: 60%;
              outline: none;
              background-color: transparent;
              border: none;
              text-align: center;

              &::-webkit-input-placeholder {
                color: #aab2bd;
              }
            }
          }
        }

        & .bannerAndAddressOfActive {
          width: 41.625rem;
          height: 49rem;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          box-sizing: border-box;
          border-radius: 5px;
          margin-bottom: 1rem;

          & .banner {
            width: 100%;
            height: 90%;
            border-radius: 5px 5px 0 0;
            box-sizing: border-box;
            overflow: hidden;
            position: relative;

            & img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }

            & video {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
          }

          & .description {
            font-family: "HelveticaNeue";
            width: 100%;
            height: 16rem;
            word-break: keep-all;
            text-align: left;
            display: flex;
            flex-direction: column;
            align-items: center;
            color: #6f767a;
            margin-top: 1rem;

            & .part2 {
              width: 100%;
              text-align: left;
              margin-bottom: 1rem;
              cursor: pointer;
              color: #0026f3;

              & span {
                font-weight: 800;
                transition: all ease 0.3s;
              }

              & span:hover {
                color: #cc9bce;
              }
            }
          }

          & .tip {
            width: 100%;
            height: 26px;
            // position: absolute;
            // bottom: 0;
            background: #9e8657;
            font-family: "Bitter-Bold";
            font-size: 20px;
            font-style: normal;
            font-weight: 700;
            line-height: 24px;
            letter-spacing: 0em;
            text-align: center;
            color: rgba(255, 235, 235, 1);
            border-radius: 0 0 5px 5px;
          }

          & .address {
            font-family: "HelveticaNeue";
            width: 100%;
            height: 8%;
            font-family: "HelveticaNeue";
            border-radius: 5px;
            background-color: #f5f5f5;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: 1rem;
          }

          & .discordId {
            font-family: "HelveticaNeue";
            width: 100%;
            height: 8%;
            font-family: "HelveticaNeue";
            border-radius: 5px;
            background-color: #f5f5f5;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: 1rem;

            & input {
              font-family: "HelveticaNeue";
              font-size: 1rem;
              width: 90%;
              height: 60%;
              outline: none;
              background-color: transparent;
              border: none;
              text-align: center;

              &::-webkit-input-placeholder {
                color: #aab2bd;
              }
            }
          }
        }

        & .btns {
          width: 41.625rem;
          height: 3rem;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          color: white;
          font-family: "HelveticaNeue";

          & .confirm {
            box-sizing: border-box;
            width: 20%;
            height: 100%;
            line-height: 100%;
            background-image: linear-gradient(to right,
                #cc208e 0%,
                #6713d2 100%);
            border-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
          }

          & .cancel {
            box-sizing: border-box;
            width: 20%;
            height: 100%;
            background-color: #dcd9d4;
            background-image: linear-gradient(to bottom,
                rgba(255, 255, 255, 0.5) 0%,
                rgba(0, 0, 0, 0.5) 100%),
              radial-gradient(at 50% 0%,
                rgba(255, 255, 255, 0.1) 0%,
                rgba(0, 0, 0, 0.5) 50%);
            background-blend-mode: soft-light, screen;
            border-radius: 4px;
            display: flex;
            align-items: center;
            cursor: pointer;
            justify-content: center;
          }
        }

        & .btnsOfActive {
          width: 41.625rem;
          height: 3rem;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          color: white;
          font-family: "HelveticaNeue";

          & .confirm {
            box-sizing: border-box;
            width: 20%;
            height: 100%;
            line-height: 100%;
            background-image: linear-gradient(to right,
                #cc208e 0%,
                #6713d2 100%);
            border-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
          }

          & .cancel {
            box-sizing: border-box;
            width: 20%;
            height: 100%;
            background-color: #dcd9d4;
            background-image: linear-gradient(to bottom,
                rgba(255, 255, 255, 0.5) 0%,
                rgba(0, 0, 0, 0.5) 100%),
              radial-gradient(at 50% 0%,
                rgba(255, 255, 255, 0.1) 0%,
                rgba(0, 0, 0, 0.5) 50%);
            background-blend-mode: soft-light, screen;
            border-radius: 4px;
            display: flex;
            align-items: center;
            cursor: pointer;
            justify-content: center;
          }
        }

        & .eventRegisterText {
          width: 48.625rem;
          height: 10rem;
          margin: 0 auto;
          margin-top: 1rem;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          padding-left: 3rem;

          & img {
            width: 16px;
            height: 16px;
            margin-right: 0.5rem;
          }

          & h2 {
            font-family: "MyriadConcept";
            padding: 1rem 1rem 1rem 0;
            font-size: 1.1rem;
            color: #6f767a;

            & .discord {
              cursor: pointer;
              color: blue;
              transition: all ease 0.3s;

              &:hover {
                color: #d496d2;
              }
            }

            & .profile {
              color: #d496d2;
            }
          }
        }
      }

      & .nav {
        max-height: 38.5625rem;
        height: inherit;
        width: 100%;
        overflow: hidden;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 99;

        .navImgMorning {
          width: 100%;
          object-fit: cover;
          // max-width: 90rem;
          margin: 0 auto;

          img {
            width: 100%;
            object-fit: cover;
          }
        }

        .navMaskMorning {
          width: 100%;
          height: 100%;
          position: absolute;
          left: 0;
          top: 0;
          background: rgba(0, 0, 0, 0);
          text-align: center;

          .nav-container {
            position: absolute;
            top: 36%;
            left: 50%;
            transform: translateX(-50%);
            white-space: nowrap;

            h4 {
              color: #818181;
              font-size: 3rem;
              font-weight: bold;
            }

            .navGo {
              position: absolute;
              color: #918787;
              border: 2px solid #777e90;
              border-radius: 5.625rem;
              left: 50%;
              transform: translateX(-50%);
              margin-top: 2rem;
              width: 10rem;
              padding: 0.75rem 0;
              font-size: 1rem;
              font-weight: 700;
              cursor: pointer;
              transition: all 0.6s;

              &:hover {
                background: #3772ff;
                border-color: transparent;
              }
            }

            .navGo1 {
              position: absolute;
              color: #ffffff;
              border: 2px solid #ffffff;
              border-radius: 5.625rem;
              left: 50%;
              transform: translateX(-50%);
              margin-top: 2rem;
              width: 10rem;
              padding: 0.75rem 0;
              font-size: 1rem;
              font-weight: 700;
              cursor: pointer;
              transition: all 0.6s;

              &:hover {
                background: #3772ff;
                border-color: transparent;
              }
            }
          }
        }
      }

      & .swiper-img {
        width: 100%;
        object-fit: fill;
        height: 100%;
      }

      & .swiper-img1 {
        width: inherit;
        object-fit: contain;
        height: inherit;
      }
    }
  }

  & .swiper-button-prev,
  & .swiper-button-next {
    position: absolute;
    top: 36%;

    &:hover {
      --swiper-navigation-color: #3f76f6;
    }
  }

  & .swiper-button-prev {
    &>img {
      transform: scale(0.8);
      transition: all ease 0.3s;

      &:hover {
        transition: all ease 0.3s;

        transform: scale(1);
      }
    }
  }

  & .swiper-button-next {
    &>img {
      transform: scale(0.8);
      transition: all ease 0.3s;

      &:hover {
        transition: all ease 0.3s;
        transform: scale(1);
      }
    }
  }

  & .swiper-pagination {
    width: 100px;
    height: 20px;
    background-color: red;
  }
}
</style>
