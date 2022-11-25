<template>
  <div :id="containerId">
    <!-- v3dapp.vue -->
    <!-- 顶部文字 -->
    <div class="topBtn">
      <div class="twoBtnsContainer">
        <div class="pointerbtn edit" @click="openAddExihibition" ref="addOrEdit">
          {{ $t("editMuseum.editMuseum") }}
        </div>
        <!-- <div class="pointerbtn" @click="changeShow" v-if="cs">{{$t('changeShow.changeShowBtn')}}</div> -->
        <!-- <div class="pointerbtn" v-if="share">{{$t('share.share')}}</div> -->
        <div class="pointerbtn save" @click="savePack">
          {{ $t("editMuseum.save") }}
        </div>
      </div>
      <div class="twitterAndRedeem">
        <img src="../assets/home/Twitter.svg" class="redeemCode" @click="openTwitter" alt="" />
        <img src="../assets/header/redeemCode.jpg" alt="" class="redeemCode" @click="openRedeemDialog" />
      </div>
    </div>
    <!-- 画布参数,靠近作品的时候显示在作品下方的作品信息 -->
    <div id="msgBox" class="msgBoxInV3dApp">
      <div class="msgBoxupsidePartInV3dApp">
        <div class="textBoxInV3dApp">{{ $t("collectionInfo.info") }}</div>
        <!-- <div class="axCloseInV3dApp" @click="closeMsgBox">X</div> -->
        <svg @click="closeMsgBox" t="1648024951056" class="icon axCloseInV3dApp" viewBox="0 0 1025 1024" version="1.1"
          xmlns="http://www.w3.org/2000/svg" p-id="2214" width="22" height="22">
          <path
            d="M982.668821 313.74918c-25.810101-60.752236-62.714-115.373446-109.685763-162.346233-46.972787-46.971763-101.593997-83.875662-162.346233-109.685763C647.666853 14.966132 580.925912 1.401699 512.268258 1.401699S376.868639 14.966132 313.898667 41.717184c-60.752236 25.810101-115.373446 62.714-162.346233 109.685763-46.971763 46.972787-83.875662 101.593997-109.685763 162.346233C15.115619 376.719151 1.551186 443.460092 1.551186 512.118771S15.115619 647.517366 41.866671 710.487337c25.810101 60.75326 62.714 115.37447 109.685763 162.346233 46.971763 46.972787 101.592974 83.876686 162.346233 109.685763 62.969971 26.752076 129.710912 40.316509 198.369591 40.316509s135.398595-13.564433 198.368567-40.316509c60.75326-25.809077 115.37447-62.712976 162.346233-109.685763 46.972787-46.971763 83.876686-101.592974 109.685763-162.346233 26.752076-62.969971 40.316509-129.710912 40.316509-198.368567S1009.419873 376.719151 982.668821 313.74918zM937.435615 691.271058c-23.333323 54.923257-56.71096 104.317532-99.204249 146.811845-42.494313 42.493289-91.888588 75.870926-146.811845 99.204249-56.8584 24.155503-117.133505 36.403219-179.152287 36.403219-62.018782 0-122.293887-12.247716-179.152287-36.403219-54.923257-23.333323-104.317532-56.71096-146.810821-99.204249-42.493289-42.494313-75.870926-91.888588-99.204249-146.811845C62.944374 634.412658 50.697682 574.136529 50.697682 512.118771c0-62.018782 12.247716-122.293887 36.403219-179.152287 23.333323-54.923257 56.709936-104.317532 99.204249-146.810821s91.888588-75.870926 146.810821-99.204249c56.8584-24.155503 117.133505-36.403219 179.152287-36.403219 62.017758 0 122.292863 12.247716 179.152287 36.403219 54.923257 23.333323 104.317532 56.709936 146.810821 99.204249 42.494313 42.493289 75.870926 91.888588 99.205273 146.810821 24.155503 56.8584 36.403219 117.134529 36.403219 179.152287S961.591118 634.412658 937.435615 691.271058z"
            p-id="2215" fill="#ffffff"></path>
          <path
            d="M704.62457 319.769626c-9.997216-9.996192-26.203273-9.996192-36.199466 0L512.382933 475.810773 356.341786 319.769626c-9.996192-9.996192-26.204297-9.996192-36.199466 0-9.996192 9.996192-9.996192 26.203273 0 36.199466l156.041147 156.041147L320.14232 668.05241c-9.996192 9.997216-9.996192 26.204297 0 36.199466 4.997584 4.998608 11.549426 7.496888 18.100245 7.496888s13.101637-2.49828 18.100245-7.496888l156.041147-156.041147L668.424081 704.251876c4.998608 4.998608 11.548403 7.496888 18.100245 7.496888s13.101637-2.49828 18.100245-7.496888c9.996192-9.996192 9.996192-26.203273 0-36.199466L548.583423 512.011263l156.041147-156.041147C714.620762 345.973923 714.620762 329.765818 704.62457 319.769626z"
            p-id="2216" fill="#ffffff"></path>
        </svg>
      </div>
      <div class="contentPartInV3dApp" @click="goCollectionDetailPage()" ref="info">
        <p id="msg1" class="msgnum"></p>
        <p id="msg2" class="msgnum"></p>
        <!-- <p id="msg3" class="msgnum"></p> -->
      </div>
    </div>
    <!-- 画布图片,这个是点击作品信息之后弹出显示的页面 -->
    <!-- 11月2日，先注释了，先做跳转了，而不是弹出这个页面 -->
    <!-- <div id="imgBox">
      <span class="closeBtn" id="closeBtn" @click="closeBox"></span>
      <div class="DetailmsgBox">
        <p id="imgmsg1" class="msgnu"></p>
        <p id="imgmsg2" class="msgnu"></p>
        <p id="imgmsg3" class="msgnu"></p>
      </div>
      <img id="photoBox" />
      <video id="videoBox"></video>
    </div> -->
    <!-- 用于获取画框编号
    <div class="clickArt" @click="clickArt"></div> -->
    <!-- 画选择,即左侧额 NFT Assets框 -->
    <div class="imgchoose">
      <div style="
          width: 90%;
          margin: 0 auto;
          color: #fcfcfd;
          font-size: 40px;
          height: 80px;
          line-height: 80px;
          font-family: 'MyriadConcept';
          font-weight: 400;
          display: flex;
          justify-content: space-around;
          align-items: center;
        ">
        {{ $t("editMuseum.nftAssets") }}
        <div class="hecoAndOpenseaBtn">
          <div :class="
            showHECO == true && showOpenSea == false
              ? 'hecoBtnActive'
              : 'hecoBtn'
          " @click="clickToShowHeco">
            HECO
          </div>
          <div :class="
            showOpenSea == true && showHECO == false
              ? 'openseaBtnActive'
              : 'openseaBtn'
          " @click="clickToShowOpensea">
            OpenSea
          </div>
        </div>
      </div>
      <ul style="height: calc(100% - 160px)" class="imgselect" v-infinite-scroll="loadMoreCollection" v-cloak>
        <li v-for="(item, index) in imgMsg" :key="index" :id="index" style="
            width: 337px;
            display: block;
            margin: auto;
            height: 200px;
            opacity: 1;
            border-radius: 16px;
          " class="imgMore" ref="nftImg" @click="ChangeImg(item)" v-cloak>
          <p class="colName" ref="pp">
            {{ item.name }}
          </p>
          <!-- <img :src="item.tpye == 'texture' ? item.url : item.preview" class="banner" alt="" /> -->

          <div v-if="showHECO" class="showheco">
        <li class="ban" v-if="item.type == 'single' && item.data[0].indexOf('mp4') == -1">
          <img :src="
            item.type == 'single'
              ? url + item.data[0]
              : item.data.length > 1
                ? canvasImg
                : url + item.data[0]
          " class="banner" ref="img1" />
        </li>
        <li class="ban" v-if="item.type == 'layer' && item.data[0].indexOf('mp4') == -1">
          <img :src="
            item.type == 'layer'
              ? url + item.data[0]
              : item.data.length > 1
                ? canvasImg
                : url + item.data[0]
          " class="banner" ref="img2" />
        </li>
        <li v-if="item.type == 'canvas' && item.data.length > 1" class="canvasDiv">
          <div v-for="(items, index) in item.data" :key="index" class="canvasImgDiv">
            <img :src="url + items" ref="img3" />
          </div>
        </li>
        <li v-if="item.type == 'single' && item.data[0].indexOf('mp4') > -1" class="collectVideo">
          <video ref="videoPart" controls controlslist="nodownload nofullscreen noremoteplayback"
            :disablePictureInPicture="true">
            <source :src="url + item.data[0]" ref="img4" />
          </video>
        </li>
    </div>
    <div v-if="showOpenSea" class="showopensea">
      <li class="openseaImg">
        <img v-if="
          item.type == 'img' &&
          item.type_img !== 'svg' &&
          item.type_img !== 'mp4'
        " :src="url + item.data_img[0]" class="normalImg" />
      </li>
      <li v-if="item.type_animation == 'glb'" class="htmlCol">
        <img :src="url + item.data_img[0]" class="htmlColImg" />
      </li>
      <li v-if="item.type_animation == 'gltf'" class="htmlCol">
        <img :src="url + item.data_img[0]" class="htmlColImg" />
      </li>
      <li v-if="item.type == 'animation' && item.type_animation == 'mp4'" class="collectVideoOfOpensea">
        <video controls ref="videoPart" :src="url + item.data_animation[0]"
          controlslist="nodownload nofullscreen noremoteplayback" :disablePictureInPicture="true"></video>
      </li>
      <li v-if="item.type == 'animation' && item.type_animation == 'mov'" class="collectVideoOfOpensea">
        <video controls ref="videoPart" :src="url + item.data_animation[0]"
          controlslist="nodownload nofullscreen noremoteplayback" :disablePictureInPicture="true"></video>
      </li>
      <li v-if="item.type == 'animation' && item.type_animation == 'webm'" class="collectVideoOfOpensea">
        <video controls ref="videoPart" :src="url + item.data_animation[0]"
          controlslist="nodownload nofullscreen noremoteplayback" :disablePictureInPicture="true"></video>
      </li>
      <li v-if="item.type == 'img' && item.type_img == 'mp4'" class="collectVideoOfOpensea">
        <video controls muted ref="videoPart" :src="url + item.data_img[0]"
          controlslist="nodownload nofullscreen noremoteplayback" :disablePictureInPicture="true"></video>
      </li>
      <li v-if="item.type_animation == 'mp3'" class="htmlColMp3">
        <img :src="url + item.data_img[0]" class="htmlColMp3Img" />
      </li>
      <li v-if="
        item.type_animation == 'HTML' || item.type_animation == 'html'
      " class="htmlCol">
        <img :src="url + item.data_img[0]" class="htmlColImg" />
      </li>
      <li class="openseasvgImg">
        <img v-if="
          item.type == 'img' &&
          item.type_img == 'svg' &&
          item.type_animation == ''
        " :src="url + item.data_img[0]" class="svgimg" />
      </li>

      <li v-if="item.type == 'img' && item.type_img == 'mp4'" class="collectVideoOfOpensea">
        <video controls muted ref="videoPart" :src="url + item.data_img[0]"
          controlslist="nodownload nofullscreen noremoteplayback" :disablePictureInPicture="true"></video>
      </li>
      <li v-if="item.type_animation == 'mp3'" class="htmlColMp3">
        <img :src="url + item.data_img[0]" class="htmlColMp3Img" />
      </li>
      <li v-if="
        item.type_animation == 'HTML' || item.type_animation == 'html'
      " class="htmlCol">
        <img :src="url + item.data_img[0]" class="htmlColImg" />
      </li>
    </div>
    </li>
    </ul>
    <div v-if="loadMoreData" class="loadMoreData">
      <i class="el-icon-loading" style="color: white; font-size: 2rem"></i>
    </div>
    <div v-if="noMoreData" class="noMoreData">
      <svg t="1636102600989" class="icon" viewBox="0 0 1137 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
        p-id="2172" width="32" height="32">
        <path
          d="M989.531022 364.259556c12.117333 22.755556-15.132444-41.813333-60.529778-41.813334H208.787911a66.104889 66.104889 0 0 0-60.529778 38.627556C133.125689 386.787556 0.005689 602.396444 0.005689 647.452444v292.864A82.773333 82.773333 0 0 0 78.683022 1024h980.423111A80.668444 80.668444 0 0 0 1137.783467 940.316444v-292.864c0-41.813333-148.252444-283.192889-148.252445-283.192888z m-257.194666 263.907555a34.133333 34.133333 0 0 0-36.295112 28.956445v6.599111A132.096 132.096 0 0 1 568.894578 798.72a132.096 132.096 0 0 1-127.089778-134.997333v-9.671111a39.822222 39.822222 0 0 0-36.295111-25.770667h-335.644445l114.972445-221.866667s21.162667-38.627556 51.2-38.627555h677.831111c24.234667 0 27.249778 9.671111 45.511111 38.627555l114.972445 221.866667h-342.072889zM323.817244 206.563556L236.037689 116.451556a22.357333 22.357333 0 0 1 0-32.199112 22.755556 22.755556 0 0 1 33.28 0l87.779555 86.926223a26.396444 26.396444 0 0 1 0 35.384889 25.998222 25.998222 0 0 1-33.28 0z m238.933334-38.627556a25.486222 25.486222 0 0 1-5.973334-16.213333l-3.015111-125.155556a24.405333 24.405333 0 0 1 21.162667-25.770667 19.683556 19.683556 0 0 1 24.234667 19.285334l3.015111 125.496889a24.177778 24.177778 0 0 1-15.132445 22.755555 17.521778 17.521778 0 0 1-24.234666 0z m223.914666 32.199111a24.405333 24.405333 0 0 1 0-32.199111l81.692445-93.354667a22.755556 22.755556 0 0 1 33.28 0 26.396444 26.396444 0 0 1 0 35.384889l-81.578667 93.354667a22.414222 22.414222 0 0 1-15.132444 6.428444c-9.102222-3.185778-15.132444-3.185778-18.147556-9.671111z"
          p-id="2173" fill="#8a8a8a"></path>
      </svg>
    </div>
    <div class="subtn" style="
          position: absolute;
          bottom: -3.3rem;
          height: 80px;
          align-items: center;
          background: #23262f;
          width: 100%;
          justify-content: space-around;
        ">
      <!-- 放分页 -->
      <!-- <div class="pagina">
        <el-pagination :page-size=pageSize layout="prev, pager, next" :total=totalCollectionPage*pageSize
          @prev-click="handleNftAssetsCollectionCurrentChange" @next-click="handleNftAssetsCollectionCurrentChange"
          @current-change="handleNftAssetsCollectionCurrentChange" v-loading.fullscreen.lock="fullscreenLoading">
        </el-pagination>
      </div> -->
      <div class="confandcan">
        <!-- <div @click="confrimTo" class="pointer btnButtom bgBlue">{{$t('editMuseum.confirm')}}</div> -->
        <div class="pointer btnButtom borderGrey" @click="closeAset">
          {{ $t("editMuseum.cancel") }}
        </div>
      </div>
    </div>
  </div>
  <!-- 添加展馆或者编辑展馆的弹窗 -->
  <el-dialog :append-to-body="true" :visible.sync="dialogVisible1" :show-close="false" :close-on-click-modal="false"
    :close-on-press-escape="false" custom-class="addMuseum">
    <div class="addMuseum__container">
      <h1 class="addMuseum__title">
        {{ $t("addMuseum.add") }}
      </h1>
      <div class="centerContent">
        <div class="centerContent__left">
          <h1 class="mname">{{ $t("addMuseum.museumName") }}</h1>
          <div class="mname__input">
            <input type="text" class="inputMuseumName" autofocus ref="museumName" v-model="addMuseumName" />
          </div>
          <h1 class="des">{{ $t("addMuseum.description") }}</h1>
          <div class="des__textAreaContainer">
            <textarea class="des__textArea" ref="description" v-model="addMuseumDescription"></textarea>
          </div>
        </div>
        <div class="centerContent__right">
          <h1 class="banner">{{ $t("addMuseum.banner") }}</h1>
          <div class="centerContent__right__uploadArea">
            <el-upload class="centerContent__right__upload-demo" action="fakeaction" :limit="1" ref="imgupload"
              :show-file-list="false" :http-request="uploadImg" list-type="picture" :on-success="handleAvatarSuccess"
              accept=".jpg,.png,.jpeg,.gif,.JPG,.PNG,.JPEG,.GIF" :on-error="handleAvatarError">
              <div class="uploadbtn">
                <i class="icon-tingMuseumupload" style="display: inline-block"></i><br />
                <span>{{ $t("addMuseum.clickToUpload") }}</span>
              </div>
              <div v-show="isShow" class="backimg">
                <img :src="ImgURLS" alt="" />
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
  <!-- 在展馆中分享到推特的弹窗 -->
  <el-dialog :append-to-body="true" :visible.sync="shareInTwitterDialog" :show-close="false"
    :close-on-click-modal="false" :close-on-press-escape="false" custom-class="shareInTwitter">
    <div class="twitterDialog">
      <h2>Share Ting Museum in Twitter?</h2>
      <div class="twoBtns">
        <div class="confirm" @click="goToTwitter">Confirm</div>
        <div class="cancel" @click="closeShareInTwitterDialog">Cancel</div>
      </div>
    </div>
  </el-dialog>
  <!-- 操作说明的弹窗 -->
  <el-dialog :append-to-body="true" :modal-append-to-body="false" :visible.sync="controlInstructionDialog"
    :show-close="false" :close-on-click-modal="true" :close-on-press-escape="true" custom-class="controlInstruction">
    <div class="controlDialog__container">
      <div class="esc">
        <div class="text">
          <span class="spanPart1">Press</span> <img src="../assets/v3dMuseum/esc.png" alt="" /> <span
            class="spanPart2">to display
            the mouse cursor</span>
        </div>
      </div>
      <div class="control">
        <div class="wasd">
          <div class="wasd__info">
            <p>Use your keyboard to move</p>
            <img src="../assets/v3dMuseum/keyboard.png" alt="" />
          </div>
        </div>
        <div class="drag">
          <div class="drag__info">
            <p>Use your mouse to rotate</p>
            <img src="../assets/v3dMuseum/mousemove.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  </el-dialog>
  <!-- 点击Redeem Code的弹窗 -->
  <el-dialog :visible.sync="redeemShown" :close-on-click-modal="true" :close-on-press-escape="false" :show-close="false"
    @close="closeRedeemDialog" custom-class="redeemCodeDialog" :modal-append-to-body="false">
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
                <span class="span1">Option1:</span> Ask your friends who own a
                TingMuseum venue.
              </p>
            </div>
            <div class="option2">
              <p class="p2">
                <span class="span2">Option2:</span> If you have qualified NFT
                assets and would like to help us promote TingMuseum.Please
                fill in the form and the team will contact you with the code.
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
  </div>
</template>
<script>
import * as v3dAppAPI from "../3dpart/model.js";
import { pinitFirst, setScreen } from "../3dpart/model.js";
// import $ from "jquery";
export default {
  name: "V3DApp",
  props: ["time", "showHowToUseMuseum"],
  data() {
    return {
      containerId: v3dAppAPI.CONTAINER_ID,
      dialogVisible: false,
      dialogVisible1: false,
      dialogVisible2: false,
      shareInTwitterDialog: false,
      controlInstructionDialog: true,
      dialogImageUrl: "",
      disabled: false,
      /* asset: false, */
      status: 1,
      statusa: 0,
      imgMsg: {},
      imgUrls: "",
      isShow: false,
      museumId: "",
      showList: "",
      totalPage: 1,
      totalCollectionPage: 1,
      currentPage: 1,
      nftAssetsCurrentPage: 1,
      hecoCurrentPage: 2,
      openseaCurrentPage: 2,
      fullscreenLoading: false,
      pageSize: 8,
      museumType: "",
      file: "",
      url: window.urls,
      isLoading: false,
      assetsIsshow: true,
      canvasImg: false,
      tokenId: "",
      productInfo: "", //画框的位置，输出的格式为product_**
      addr: this.$store.state.mainAccount,
      aoe: false,
      cs: false,
      share: false,
      defaultMuseumName: "",
      defaultMuseumBanner: "",
      defaultDescription: "",
      nowBeshowed: "",
      result: {},
      showHECO: true,
      showOpenSea: false,
      showMsg: {
        Creator: "abc",
        Name: "absPictrue",
        desCription: "this is a pictrue",
      },
      nowClick: "",
      productInfo: "",
      loadMoreData: false,
      noMoreData: false,
      showDetailOfNFT: false,
      suload: false,
      setting: {
        title: "Ting Museum - NFT Collections Platform",
        image:
          "https://www.tingmuseum.art/api/ting_museum_database/cover_page/twitter.png",
        description:
          "Ting Museum, an immersive NFT art metaverse experience venue. Ting Museum is dedicated to providing users with a new combination of science fiction visual, auditory and gaming experience, presenting the most avant-garde, interesting and high-end immersive meta-universe.",
      },
      redeemShown: false,
      showRedeemFreeMuseum: true,
      showRedeemedSuccess: false,
      showRedeemedFailure: false,
      ifCodeUserByAnotherAddress: false,
      showCode1Warning: false,
      showCode2Warning: false,
      showCode3Warning: false,
      threeCodesList: "",
      addMuseumName: "",
      addMuseumDescription: "",
    };
  },
  app: null,
  metaInfo() {
    return {
      meta: [
        {
          name: "image",
          content: this.setting.keywords,
        },
        {
          name: "title",
          content: this.setting.title,
        },
        {
          name: "description",
          content: this.setting.description,
        },
      ],
    };
  },
  created() {
    // 进入展馆的时候，请求后端的showdatabase.json
    this.getshowdatabase();
  },
  mounted() {
    // 监听一下当前设备的尺寸，如果是移动端设备，只显示browsing
    this.getWidth();
    window.localStorage.setItem("museumId", this.$route.query.museumId);
    /*
      创建屏幕对象按照modle.js中函数对应用法，传入适当的参数
      */
    this.setScreen();

    window.localStorage.setItem("fromV3dApp", true);

    if (this.$route.path == "/show") {
      this.cs = true;
      this.share = true;
      this.aoe = true;
      this.dialogVisible1 = false;
    }

    this.getData();
    const _that = this;
    v3dAppAPI
      .createApp(function () {
        // 参数一：对应物体名称
        // 参数二：点击物体后对应操作响应
        v3dAppAPI.objRegistClickFun("Screen-5", function () {
          // 弹窗的逻辑
          _that.$emit("changeIframeFlag", true);
        });
        v3dAppAPI.objRegistClickFun("Screen-3", function () {
          // 弹窗的逻辑
          _that.$emit("changeIframeFlagTwo", true);
        });
        // 修改街机封面
        /**
         * @param {*} nodeName gameScreen1~11
         * @param {*} materialName gameScreenTexture1~11
         * @param {*} texture 填写图片的路径
         */
        v3dAppAPI.replaceScreen(
          "gameScreen1",
          "gameScreentexture1",
          "/comingsoon.jpeg"
        );
        v3dAppAPI.replaceScreen(
          "gameScreen2",
          "gameScreentexture2",
          "/comingsoon.jpeg"
        );
        v3dAppAPI.replaceScreen(
          "gameScreen3",
          "gameScreentexture3",
          "IMG_5866.PNG"
        );
        v3dAppAPI.replaceScreen(
          "gameScreen4",
          "gameScreentexture4",
          "/comingsoon.jpeg"
        );
        v3dAppAPI.replaceScreen(
          "gameScreen5",
          "gameScreentexture5",
          "/windy.png"
        );
        v3dAppAPI.replaceScreen(
          "gameScreen6",
          "gameScreentexture6",
          "/comingsoon.jpeg"
        );
        v3dAppAPI.replaceScreen(
          "gameScreen7",
          "gameScreentexture7",
          "/comingsoon.jpeg"
        );
        v3dAppAPI.replaceScreen(
          "gameScreen8",
          "gameScreentexture8",
          "/comingsoon.jpeg"
        );
        v3dAppAPI.replaceScreen(
          "gameScreen9",
          "gameScreentexture9",
          "/comingsoon.jpeg"
        );
        v3dAppAPI.replaceScreen(
          "gameScreen10",
          "gameScreentexture10",
          "/comingsoon.jpeg"
        );
        v3dAppAPI.replaceScreen(
          "gameScreen11",
          "gameScreentexture11",
          "/comingsoon.jpeg"
        );
      })
      .then((app) => {
        this.$options.app = app;
      });
  },
  computed: {
    ImgURLS: {
      get() {
        return this.imgUrls;
      },
      set(newValue) {
        return newValue;
      },
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
    useForRedeemAddress: {
      get() {
        return this.addr;
      },
    },
  },
  methods: {
    getWidth() {
      if (document.body.clientWidth <= 1350) {
        console.log("ff");
        this.$router.push({
          path: "/browsing",
          query: {
            model: this.$route.query.model,
            museumId: this.$route.query.museumId,
          },
        });
      } else {
        this.$router.push({
          path: "/show",
          query: {
            model: this.$route.query.model,
            museumId: this.$route.query.museumId,
          },
        });
      }
    },
    setScreen() {
      document.addEventListener("makeit", function (e) {
        console.log("???:", e);
        v3dAppAPI.setScreen(
          "windyMuse",
          "https://www.tingmuseum.art/windymuse/",
          1050,
          800,
          0.01
        );
      });
    },
    goToTwitter() {
      var url2 = encodeURIComponent(this.result.name);
      var url3 = encodeURIComponent(window.location.href);
      var url =
        "https://twitter.com/intent/tweet?text=I%20am%20exploring%20" +
        url2 +
        "%20in%20TingMuseum!%0A%0ACome%20join%20me%20at:%0A" +
        url3 +
        "%0A%0A%23TingDAO%20%23TingMuseum";
      window.open(url, "_blank");
      this.shareInTwitterDialog = false;
    },
    closeShareInTwitterDialog() {
      this.shareInTwitterDialog = false;
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
    openTwitter() {
      this.shareInTwitterDialog = true;
    },
    closeRedeemDialog() {
      this.redeemShown = false;
      this.ifCodeUserByAnotherAddress = false;
      this.$refs.code.value = "";
    },
    successLoad() {
      this.suload = true;
    },
    loadAsyncScript(src, callback) {
      var head = document.getElementsByTagName("head")[0];
      var script = document.createElement("script");
      script.setAttribute("type", "text/javascript");
      script.setAttribute("src", src);
      script.setAttribute("async", true);
      script.setAttribute("defer", true);
      head.appendChild(script);

      //fuck ie! duck type
      if (document.all) {
        script.onreadystatechange = function () {
          var state = this.readyState;
          if (state === "loaded" || state === "complete") {
            callback();
          }
        };
      } else {
        //firefox, chrome
        script.onload = function () {
          callback();
        };
      }
    },
    // 滚动到最底部的时候加载资产，取消分页的方式
    async loadMoreCollection() {
      this.loadMoreData = true;
      const address = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (this.showHECO == true && this.showOpenSea == false) {
        this.$axios
          .get(this.url + "get_collects/owned", {
            params: {
              current_address: address[0],
              user_address: address[0],
              page: this.hecoCurrentPage++,
            },
          })
          .then((res) => {
            console.log("res:", res);
            var newArr = Array.from(res.data.data);
            this.imgMsg = this.imgMsg.concat(newArr);
            //等请求成功了就结束加载
            this.loadMoreData = false;
            this.noMoreData = false;
          })
          .catch((error) => {
            if (error.response.status == 401) {
              this.noMoreData = true;
              this.loadMoreData = false;
            }
          });
      } else if (this.showHECO == false && this.showOpenSea == true) {
        this.$axios
          .get(this.url + "get_collects/opensea", {
            params: {
              current_address: address[0],
              user_address: address[0],
              page: this.openseaCurrentPage++,
            },
          })
          .then((res) => {
            var newArr = Array.from(res.data.data);
            this.imgMsg = this.imgMsg.concat(newArr);
            //等请求成功了就结束加载
            this.loadMoreData = false;

            this.noMoreData = false;
          })
          .catch((error) => {
            if (error.response.status == 401) {
              this.noMoreData = true;
              this.loadMoreData = false;
            }
          });
      }
    },
    clickToShowHeco() {
      this.hecoCurrentPage = 2;
      this.showHECO = true;
      this.showOpenSea = false;
      if (this.showHECO == true && this.showOpenSea == false) {
        this.$axios
          .get(this.url + "get_collects/owned", {
            params: {
              current_address: this.$store.state.mainAccount,
              user_address: this.$store.state.mainAccount,
            },
          })
          .then((res) => {
            this.totalCollectionPage = res.data.total_page;
            this.imgMsg = res.data.data;
          });
      } else if (this.showOpenSea == true && this.showHECO == false) {
        this.$axios
          .get(this.url + "get_collects/opensea", {
            params: {
              current_address: this.$store.state.mainAccount,
              user_address: this.$store.state.mainAccount,
            },
          })
          .then((res) => {
            this.totalCollectionPage = res.data.total_page;
            this.imgMsg = res.data.data;
          });
      }
    },
    clickToShowOpensea() {
      this.openseaCurrentPage = 2;
      this.showHECO = false;
      this.showOpenSea = true;
      if (this.showHECO == true && this.showOpenSea == false) {
        this.$axios
          .get(this.url + "get_collects/owned", {
            params: {
              current_address: this.$store.state.mainAccount,
              user_address: this.$store.state.mainAccount,
            },
          })
          .then((res) => {
            this.totalCollectionPage = res.data.total_page;
            this.imgMsg = res.data.data;
          });
      } else if (this.showOpenSea == true && this.showHECO == false) {
        this.$axios
          .get(this.url + "get_collects/opensea", {
            params: {
              current_address: this.$store.state.mainAccount,
              user_address: this.$store.state.mainAccount,
            },
          })
          .then((res) => {
            this.totalCollectionPage = res.data.total_page;
            this.imgMsg = res.data.data;
          });
      }
    },
    async getshowdatabase() {
      var formData = new FormData();
      formData.append("museum_id", this.$route.query.museumId);

      var that = this;
      await that.$axios
        .post(that.url + "enter_museum", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(async (res) => {
          that.result = res.data;
          localStorage.setItem("firstData", JSON.stringify(res.data));
          this.setting.title = res.data.name;
          this.setting.image = this.url + res.data.image_banner;
          this.setting.description = res.data.description;
          // 到这里已经获取到了展馆的信息了，现在来判断下，当前用户是否是参与者的一员
          const address = await window.ethereum.request({
            method: "eth_accounts",
          });
          if (this.$route.path == "/show") {
            if (address.length !== 0) {
              var flag = false;
              //现在用户是登录的状态，判断一下他是否是参与者的一员，如果不是，也要跳转到browsing，如果是则什么也不做，也就是直接进入
              for (let index in res.data.participant) {
                if (
                  address[0].toLowerCase() ==
                  res.data.participant[index].toLowerCase()
                ) {
                  flag = true;
                  break;
                } else {
                  flag = false;
                }
              }
              if (flag) {
              } else {
                this.$router.push({
                  path: "/browsing",
                  query: {
                    model: this.$route.query.model,
                    // scale: this.$route.query.scale,
                    museumId: res.data._id,
                  },
                });
              }
            } else {
              this.$router.push({
                path: "/browsing",
                query: {
                  model: this.$route.query.model,
                  // scale: this.$route.query.scale,
                  museumId: res.data._id,
                },
              });
            }
          }
        });
    },
    // 点击cancel关闭NFT Assets
    closeAset() {
      v3d.puzzles.procedures.closeAset();
    },
    // 之前用于测试的不用理会
    setShowDivStyle() {
      this.$refs.sd.style.border = "1px solid white";
    },
    // 用于路由跳转，点changeshow中的展馆，再点confirm进行跳转
    transformMuseumType(type) {
      this.museumType = type;
    },
    // 全屏加载
    openFullScreen1() {
      if (this.isLoading == true) {
        this.fullscreenLoading = true;
      }
      if (this.isLoading == false) {
        this.fullscreenLoading = false;
      }
    },
    // 处理分页的页数变化时的api，和card中的一样
    handleCurrentChange(val) {
      this.currentPage = val;
      // 要发送给后端，根据当前页去请求对应的资产
      // 让全屏加载
      this.isLoading = true;
      this.openFullScreen1();
      this.$axios
        .get(this.url + "show_exhibition", {
          params: {
            current_address: this.$route.query.id,
            page: this.currentPage,
          },
        })
        .then((res) => {
          this.showList = res.data.data;
          //等请求成功了就结束加载
          this.isLoading = false;
          this.openFullScreen1();
        });
    },
    // 针对NFT Assets中的资产的分页处理
    async handleNftAssetsCollectionCurrentChange(val) {
      const address = await window.ethereum.request({
        method: "eth_accounts",
      });
      this.nftAssetsCurrentPage = val;
      // 要发送给后端，根据当前页去请求对应的资产
      // 让全屏加载
      this.isLoading = true;
      this.openFullScreen1();
      if (this.showHECO == true && this.showOpenSea == false) {
        this.$axios
          .get(this.url + "get_collects/owned", {
            params: {
              current_address: address[0],
              user_address: address[0],
              page: this.nftAssetsCurrentPage,
            },
          })
          .then((res) => {
            this.imgMsg = res.data.data;
            //等请求成功了就结束加载
            this.isLoading = false;
            this.openFullScreen1();
          });
      } else if (this.showHECO == false && this.showOpenSea == true) {
        this.$axios
          .get(this.url + "get_collects/opensea", {
            params: {
              current_address: address[0],
              user_address: address[0],
              page: this.nftAssetsCurrentPage,
            },
          })
          .then((res) => {
            this.imgMsg = res.data.data;
            //等请求成功了就结束加载
            this.isLoading = false;
            this.openFullScreen1();
          });
      }
    },
    // 暂时没用到
    closeAssets() {
      // 向后端请求资产
    },
    // 点changeshow中的展馆，再点confirm之后，跳转到对应的模版展馆
    changeToModel(data, item) {
      this.$router.push({
        path: "/show",
        query: {
          model: data,
          // scale: 1,
          museumId: item.museum_id,
        },
      });
      window.location.reload();
    },
    changeToShow(data, mId) {
      this.$router.push({
        path: data,
        query: {
          model: this.$route.query.model,
          // scale: 1,
          museumId: mId,
        },
      });
      window.location.reload();
    },
    // 改变当前的展馆
    changeShow() {
      this.dialogVisible2 = true;
      this.$axios
        .get(this.url + "show_exhibition", {
          params: {
            current_address: this.$route.query.id,
            page: this.currentPage,
          },
        })
        .then((res) => {
          this.showList = res.data.data;
          this.$forceUpdate();
          this.currentPage = res.data.page;
          this.totalPage = res.data.total_page;
        });
    },
    // 虽然名字是叫openAddExihibition,但是现在是，为了打开编辑展馆的弹窗显示当前展馆的信息
    openAddExihibition() {
      this.dialogVisible1 = true;
      this.addMuseumName = this.result.name;
      this.addMuseumDescription = this.result.description;
      this.imgUrls = this.url + this.result.image_banner;
      this.isShow = true;
      this.$forceUpdate();
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
            title: this.$t("museum.cannotBiggerThan2M"),
            type: "error",
          });
        } else {
          this.isShow = true;
          this.imgUrls = res;
        }
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
    haha() { },
    closeMsgBox() {
      v3d.puzzles.procedures.closeMsgBox();
    },
    showInfo() {
      this.showDetailOfNFT = !this.showDetailOfNFT;
      $("#detailOfCollection").slideDown();
    },
    // 跳转到资产的详细信息页面
    goCollectionDetailPage() {
      var flag = false;
      this.productInfo = v3d.puzzles.procedures.getNowproduct();
      var savePackdata = v3d.puzzles.procedures.savePack();
      for (let m in Object.keys(savePackdata)) {
        if (Object.keys(savePackdata)[m] == this.productInfo) {
          if (JSON.stringify(Object.values(savePackdata)[m]) == "{}") {
            // 找出对应this.result中的那个product，提供信息并跳转，当前的goCollectionDetilPage就return
            for (let n in Object.keys(this.result)) {
              if (Object.keys(this.result)[n] == this.productInfo) {
                if (Object.values(this.result)[n].label == "HECO") {
                  let route = this.$router.resolve({
                    path: "/collection",
                    query: {
                      label: Object.values(this.result)[n].label.toLowerCase(),
                      token_id: Object.values(this.result)[n].token_id,
                    },
                  });
                  window.open(route.href, "_blank");
                  flag = true;
                } else if (Object.values(this.result)[n].label == "opensea") {
                  let route = this.$router.resolve({
                    path: "/collection",
                    query: {
                      label: Object.values(this.result)[n].label,
                      opensea_id: Object.values(this.result)[n].token_id,
                    },
                  });
                  window.open(route.href, "_blank");
                  flag = true;
                } else if (Object.values(this.result)[n].label == "notmint") {
                  let route = this.$router.resolve({
                    path: "/collection",
                    query: {
                      label: Object.values(this.result)[n].label,
                      token_id: Object.values(this.result)[n].token_id,
                    },
                  });
                  window.open(route.href, "_blank");
                  flag = true;
                }
              }
            }
          }
        }
      }
      if (flag) {
        return;
      }
      for (let j in Object.keys(savePackdata)) {
        if (Object.keys(savePackdata)[j] == this.productInfo) {
          if (Object.values(savePackdata)[j].label == "HECO") {
            let route = this.$router.resolve({
              path: "/collection",
              query: {
                label: Object.values(savePackdata)[j].label.toLowerCase(),
                token_id: Object.values(savePackdata)[j].token_id,
              },
            });
            window.open(route.href, "_blank");
          } else if (Object.values(savePackdata)[j].label == "opensea") {
            let route = this.$router.resolve({
              path: "/collection",
              query: {
                label: Object.values(savePackdata)[j].label,
                opensea_id: Object.values(savePackdata)[j].token_id,
              },
            });
            window.open(route.href, "_blank");
          } else if (Object.values(savePackdata)[j].label == "notmint") {
            let route = this.$router.resolve({
              path: "/collection",
              query: {
                label: Object.values(savePackdata)[j].label,
                opensea_id: Object.values(savePackdata)[j].token_id,
              },
            });
            window.open(route.href, "_blank");
          }
        }
      }
    },
    closeBox() {
      v3d.puzzles.procedures.closeBox();
    },
    ChangeImg(item) {
      var selectObj = item;
      let img_url;
      if (selectObj.label == "HECO") {
        if (selectObj.motype == "video") {
          img_url = selectObj.preview[0];
        } else {
          img_url = selectObj.data[0];
        }
      } else if (selectObj.label == "opensea") {
        if (selectObj.motype == "video") {
          if (selectObj.type_animation == "mp4") {
            img_url = selectObj.data_img[0];
          }
        } else if (selectObj.motype == "textrue") {
          img_url = selectObj.data_img[0];
        } else if (selectObj.motype == "html") {
          img_url = selectObj.data_img[0];
        } else if (selectObj.motype == "svg") {
          img_url = selectObj.data_img[0];
        }
      } else if (selectObj.label == "notmint") {
        if (selectObj.motype == "video") {
          img_url = selectObj.preview[0];
        } else {
          img_url = selectObj.data[0];
        }
      }
      let img = new Image();
      var fileAspect = 0;
      img.src = window.urls + img_url;
      var that = this;
      img.onload = function () {
        fileAspect = img.width / img.height;
        v3d.puzzles.procedures.ChangeImg(selectObj, fileAspect);
      };
      v3d.puzzles.procedures.closeMsgBox();
    },
    // 向后端拿取资产
    async getData() {
      // 向后端发起请求获取资产
      const address = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (this.$route.path == "/show") {
        if (this.showHECO == true && this.showOpenSea == false) {
          this.$axios
            .get(this.url + "get_collects/owned", {
              params: {
                current_address: address[0],
                user_address: address[0],
              },
            })
            .then((res) => {
              this.totalCollectionPage = res.data.total_page;
              this.imgMsg = res.data.data;
            });
        } else if (this.showOpenSea == true && this.showHECO == false) {
          this.$axios
            .get(this.url + "get_collects/opensea", {
              params: {
                current_address: address[0],
                user_address: address[0],
              },
            })
            .then((res) => {
              this.totalCollectionPage = res.data.total_page;
              this.imgMsg = res.data.data;
            });
        }
      }
    },
    toAssets() {
      this.dialogVisible2 = false;
    },
    // 添加展馆,如果在show.vue中就是编辑当前展馆的信息
    async add_exhibition() {
      this.$store.commit("updateIntoShow", true);
      if (this.$route.path == "/show") {
        // 更改当前展馆信息的请求
        if (
          this.$refs.museumName.value == "" ||
          this.$refs.museumName.value == null
        ) {
          await this.$notify({
            title: "You must enter museum name",
            type: "error",
          });
        }
        // 让confirm可以编辑信息
        var formData = new FormData();
        formData.append("name", this.$refs.museumName.value);
        formData.append("image_banner", this.file);
        formData.append("description", this.$refs.description.value);
        formData.append("museum_id", this.$route.query.museumId);
        this.$axios
          .post(this.url + "edit_exhibition", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            this.$notify({
              title: this.$t("museum.editSuccess"),
              type: "success",
            });
            this.dialogVisible1 = false;
            this.$refs.museumName.value = "";
            this.$refs.description.value = "";
          });
      }
    },
    // 关闭edit museum时的操作，让表单都清空，banner也清空
    closeEditInfo() {
      this.dialogVisible1 = false;
      this.addMuseumName = "";
      this.addMuseumDescription = "";
      this.imgUrls = "";
    },
    async confrimTo() {
      await this.$axios
        .post("https://cdn.viewspread.com/get_file/MX/UploadJson", {
          object: v3d.puzzles.procedures.getJson(),
        })
        .then((relsult) => {
          this.$router.push({
            name: "Browsing",
            query: {
              model: this.$route.query.model,
              // scale: 1,
              EditJson: relsult.data.id + ".json",
            },
          });
        });
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    savePack() {
      var savePackdata = v3d.puzzles.procedures.savePack();
      var formData = new FormData();
      formData.append("museum_id", this.$route.query.museumId);
      formData.append("prod", JSON.stringify(savePackdata));
      this.$axios
        .post(this.url + "save_exhibition", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          this.$notify({
            title: this.$t("museum.saveSuccess"),
            type: "success",
          });
        });
    },
  },
  watch: {},
  beforeDestroy() {
    if (this.$options.app) {
      this.$options.app.dispose();
      this.$options.app = null;
    }
  },
};
</script>
<style scoped lang="less">
@import "../3dpart/model.css";

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

.subtn {
  // display: flex;
  justify-content: space-between;
  margin-top: 77px;
  height: 124px !important;

  &>.confandcan {
    display: flex;
    justify-content: space-around;
  }
}

.subtn2 {
  display: flex;
  justify-content: space-between;
  margin-top: 77px;
}

.cshow {
  width: 100%;
  // height: 100%;
  padding-left: 14px;
  height: calc(100% - 200px);
}

.pagina {
  display: flex !important;
  justify-content: center !important;
  margin-bottom: 10px;

  .el-pagination .btn-next,
  .el-pagination .btn-prev {
    background: center center no-repeat transparent;
    background-size: 16px;
    cursor: pointer;
    margin: 0;
    color: #a9aaad;
  }

  .el-pagination .btn-next:hover,
  .el-pagination .btn-prev:hover {
    color: rgb(18, 1, 255);
  }

  .el-pager,
  .el-pager li {
    vertical-align: top;
    margin: 0;
    display: inline-block;
    background-color: transparent;
  }

  .el-pagination__editor.el-input .el-input__inner {
    height: 28px;
    background-color: transparent;
  }

  & .el-pagination button,
  .el-pagination span:not([class*="suffix"]) {
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    vertical-align: top;
    box-sizing: border-box;
    font-weight: 700;
  }
}

.showlist {
  color: #606266;
  font-size: 14px;
  word-break: break-all;
  margin-left: 12px;

  & span {
    font-weight: 700;
    margin-bottom: 8px;
    margin-top: 5px;
    color: aliceblue;
    display: inline-block;
  }
}

.showDivParent {
  position: relative;
  left: 0;
  width: 353px;
  height: 161px;
  // overflow: hidden;
  border-radius: 16px;
  cursor: pointer;

  &:hover::before,
  &:hover::after {
    opacity: 1;
  }

  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg,
        #00f,
        rgb(15, 58, 136),
        #f00,
        #dd85b8,
        rgb(127, 19, 216),
        #f00);
    transition: 0.5s;
    background-size: 400%;
    filter: blur(15px);
    opacity: 0;
    animation: animate 20s linear infinite;
  }

  &::after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg,
        #fb0094,
        #00f,
        rgb(15, 58, 136),
        #f00,
        #dd85b8,
        rgb(127, 19, 216),
        #f00);
    transition: 0.5s;
    background-size: 400%;
    filter: blur(15px);
    opacity: 0;
    animation: animate 20s linear infinite;
  }

  & .showDiv {
    position: absolute;
    top: 1px;
    left: 1px;
    right: 1px;
    bottom: 1px;
    z-index: 1;
    border-radius: 16px;
    transition: all 1s ease;
    // overflow: hidden;s
    // background-size: cover;
    background-repeat: no-repeat;
    background-size: cover;

    &:hover {
      // background-size: 120%;
      transform: scale(1.08);
      transition: all 1s ease;
    }

    // &>img {
    //   transform: scale(1);
    //   transition: all 1s ease;
    //   // object-fit: fill;

    // }

    // &:hover {
    //   &>img {
    //     transform: scale(1.2);
    //     transition: all 1s ease;
    //   }
    // }
  }

  & .showDiv::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.1);
    transition: 0.5s;
    background-size: 400%;
    opacity: 0;
  }
}

@keyframes animate {
  from {
    background-position: 0 0;
  }

  50% {
    background-position: 100% 0;
  }

  to {
    background-position: 0 0;
  }
}

// .showDiv {
//   // width: 353px;
//   // height: 161px;
//   cursor: pointer;
//   border-radius: 16px;
//   background-size: cover;
//   background-repeat: no-repeat;
//   background-position: center;
//   transition: all ease 1s;
//   margin-bottom: 10px;

//   &:hover {}

// }

.eldialog2 {
  height: 750px;
  overflow-y: scroll;
}

.editinfo {
  width: 100%;
  height: 100%;
  padding-left: 14px;
}

.chshow {
  text-align: center;
  font-size: 24px;
  font-family: Helvetica;
  font-weight: 400;
  color: #fcfcfd;
  opacity: 1;
  position: relative;
  bottom: 25px;
  left: -12px;
}

.uploadArea {
  margin-top: 20px;
  width: 353px;
  height: 161px;
  background: #ffffff;
  text-align: center;
  border-radius: 16px;
  z-index: 2;
  color: black;

  & .upload-demo {
    border-radius: 16px;
  }

  & .uploadbtn {
    font-size: 18px;
    font-family: Helvetica;
    font-weight: 400;
    line-height: 48px;
    color: rgba(0, 0, 0, 1);
    text-decoration: underline;
    line-height: 161px;
  }

  & .backimg {
    margin-top: 20px;
    width: 353px;
    height: 161px;
    text-align: center;
    border-radius: 16px;
    z-index: 1;
    position: absolute;
    top: 0;
    left: 0;

    &>img {
      width: 353px;
      height: 161px;
      border-radius: 16px;
      opacity: 0.5;
    }

    // 解决img标签的src不存在的时候出现的莫名其妙的空白边框
    img[src=""],
    img:not([src]) {
      opacity: 0;
    }
  }
}

.topBtn {
  display: flex;
  margin: 0 auto;
  position: relative;
  top: 3%;
  width: calc(100% - 303px);
  flex-direction: row;
  z-index: 99;
  justify-content: space-between;
  padding-right: 2rem;
  box-sizing: border-box;

  & .twoBtnsContainer {
    display: flex;
    width: 20%;

    & .edit,
    .save {
      transition: all ease 0.3s;
    }

    & .edit:hover {
      transform: translateY(-3px);
    }

    & .save:hover {
      transform: translateY(-3px);
    }
  }

  & .twitterAndRedeem {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 7rem;

    .redeemCode {
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 99;
      cursor: pointer;
    }
  }
}

.pointerbtn {
  cursor: pointer;
  padding: 0 20px;
  height: 100%;
  background: #010101;
  border-radius: 4px;
  font-size: 14px;
  font-family: "HelveticaNeue";
  color: #fff !important;
  display: flex;
  white-space: nowrap;
  margin-right: 1rem;
  font-weight: 700;
  align-items: center;
}

.btnButtom {
  width: 180px;
  height: 48px;
  border-radius: 90px;
  font-size: 18px;
  font-family: "HelveticaNeue";
  color: #fcfcfd;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btnButtom2 {
  width: 145px;
  height: 48px;
  opacity: 1;
  border-radius: 90px;
  font-size: 18px;
  font-family: DMSans-Bold;
  line-height: 48px;
  color: #fcfcfd;
  text-align: center;
  cursor: pointer;
  margin-right: 20px;
  margin-bottom: 30px;
}

.bgBlue {
  background: #3772ff;
}

.borderGrey {
  border: 2px solid #777e90;
}

#container {
  height: 100%;
  // max-width: 90rem;
  max-width: 100%;
  position: absolute;
}

.imgchoose {
  width: 32rem;
  height: 47rem;
  overflow: hidden;
  background: #23262f;
  box-shadow: 0px 32px 40px rgba(15, 15, 15, 0.12);
  opacity: 1;
  border-radius: 16px;
  position: absolute;
  margin-top: 0;
  left: 5%;
  z-index: 99;
  top: 77px;
  display: none;

  & .loadMoreData {
    display: flex;
    justify-content: center;
  }

  & .noMoreData {
    display: flex;
    justify-content: center;
  }

  & .hecoAndOpenseaBtn {
    width: 40%;
    height: 42%;
    display: flex;
    border-radius: 10px;

    & .hecoBtn {
      font-family: "HelveticaNeue";
      width: 50%;
      font-size: 10px;
      text-align: center;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 10px 0 0 10px;
      border: 2px solid gray;
      border-right: none;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        transition: all 0.3s ease;

        opacity: 0.6;
      }
    }

    .hecoBtnActive {
      font-family: "HelveticaNeue";
      width: 50%;
      font-size: 10px;
      text-align: center;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 10px 0 0 10px;
      border: 2px solid gray;
      border-right: none;
      cursor: pointer;
      background-color: #fff;
      color: black;
    }

    & .openseaBtn {
      font-family: "HelveticaNeue";
      width: 50%;
      font-size: 10px;
      height: 100%;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 0 10px 10px 0;
      border: 2px solid gray;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        transition: all 0.3s ease;

        opacity: 0.6;
      }
    }

    .openseaBtnActive {
      font-family: "HelveticaNeue";
      width: 50%;
      font-size: 10px;
      height: 100%;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 0 10px 10px 0;
      border: 2px solid gray;
      cursor: pointer;
      background-color: #fff;
      color: black;
    }
  }

  &>.imgselect {
    overflow-y: auto;
    background-color: #1d1d24;
    background: transparent;
    height: 75% !important;
    margin-left: 10px;
    font-family: "HelveticaNeue";

    img[src=""],
    img:not([src]) {
      opacity: 0;
    }

    [v-cloak] {
      display: none;
    }

    & .imgMore {
      width: 50% !important;
      height: 32% !important;
      // max-height: 25rem;
      // position: relative !important;
      float: left;
      box-sizing: border-box;
      overflow: hidden;

      & .colName {
        margin: 0;
        height: 30px;
        line-height: 30px;
        color: #fff;
        white-space: pre;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 95%;
      }

      & .showheco {
        & .ban {
          // position: relative;
          // left: 1px;
          // top: 12vh;
          width: 13.5rem;

          .banner {
            width: 100%;
            height: 9.5rem;
            object-fit: cover;
            cursor: pointer;
            border-radius: 16px;
          }
        }

        & .canvasDiv {
          overflow: hidden;
          width: 13.5rem;
          height: 9.5rem;
          border-radius: 10px;
          object-fit: cover;
          cursor: pointer;
          position: relative;
          // top: 1.1vh;
        }

        .canvasImgDiv {
          width: 13.5rem;
          height: 9.5em;
          object-fit: cover;
        }

        & .canvasDiv>.canvasImgDiv>img {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) scale(1);
          width: 13.5rem;
          height: 9.5rem;
          vertical-align: bottom;
          transition: all 1s;
          overflow: hidden;
          border-radius: 16px;
          object-fit: cover;
        }

        &>.collectVideo {
          // position: relative;
          // left: 0.1rem;
          // top: 0;

          video::-webkit-media-controls-play-button {
            display: block;
            position: absolute;
            top: 0;
            left: 0;
          }

          //进度条
          video::-webkit-media-controls-timeline {
            display: none;
          }

          video::-webkit-media-controls:not(.audio-only) [pseudo="-webkit-media-controls-panel"] [pseudo="-internal-media-controls-overflow-button"] {
            display: none;
          }

          //观看的当前时间
          video::-webkit-media-controls-current-time-display {
            display: none;
          }

          //剩余时间
          video::-webkit-media-controls-time-remaining-display {
            display: none;
          }

          //音量按钮
          video::-webkit-media-controls-mute-button {
            display: none;
          }

          video::-webkit-media-controls-toggle-closed-captions-button {
            display: none;
          }

          //音量的控制条
          video::-webkit-media-controls-volume-slider {
            display: none;
          }
        }

        & .collectVideo>video {
          border-radius: 16px;

          width: 13.5rem;
          height: 9.5rem;
          object-fit: cover;
        }

        & img {
          // position: relative;
          // top: 50%;
          // left: 50%;
          // transform: translate(-50%, -50%) scale(1);
          // width: 100%;
          // height: auto;
          vertical-align: bottom;
          transition: all 1s;
        }
      }

      & .showopensea {
        & .normalImg {
          width: 13.5rem;
          height: 9.5rem;
          object-fit: cover;
          border-radius: 16px;
        }

        & .openseasvgImg {
          width: 13.5rem;
          height: 9.5rem;
          position: relative;
          overflow: hidden;
          border-radius: 16px;

          & .svgimg {
            border-radius: 16px;
            width: 100%;
            object-fit: cover;
            height: 147%;
          }
        }

        & .openseaImg {
          width: 95%;
        }

        & .htmlCol {
          width: 13.5rem;
          height: 9.5rem;

          & .htmlColImg {
            object-fit: cover;
            width: 100%;
            height: 100%;
            border-radius: 16px;
          }
        }

        &>.collectVideoOfOpensea {
          // position: relative;
          // left: 0.1rem;
          // top: 0;

          video::-webkit-media-controls-play-button {
            display: none;
          }

          video::-webkit-media-controls-enclosure {
            display: none;
          }
        }

        & .collectVideoOfOpensea>video {
          border-radius: 16px;

          width: 13.5rem;
          height: 9.5rem;
          object-fit: cover;
        }
      }
    }
  }
}

/*滚动条样式*/
.imgselect::-webkit-scrollbar {
  width: 27px;
  /*height: 4px;*/
}

.imgselect::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 5px #000;
  box-shadow: inset 0 0 5px #000;
  background: #000;
  z-index: 999;
}

.imgselect::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 5px #1d1d24;
  box-shadow: inset 0 0 5px #1d1d24;
  border-radius: 10px;
  background: #1d1d24;
}

.changeshowdialog {
  /deep/.el-dialog {
    // background-color: red !important;

    /deep/ & .el-dialog__body {
      padding: 28px 16px;
      color: #606266;
      font-size: 14px;
      word-break: break-all;
      margin-left: 17px;
    }
  }

  &>el-dialog>.el-body::-webkit-scrollbar {
    width: 10px;
    // background-color: red;
  }
}

/deep/.el-dialog {
  background: black;
  border-radius: 10px;
}

/deep/ .el-textarea__inner,
.el-input__inner {
  background: transparent !important;
}

/deep/.el-textarea__inner {
  height: 300px;
}
</style>

<style lang="less" scoped>
@import "../assets/fontSelf/font.less";

.msgBoxInV3dApp {
  font-family: "MyriadConcept" !important;
  width: 25rem;
  height: 8.8rem;
  margin: 0 auto;
  background-color: #fcfcfd;
  border-radius: 10px;
  overflow: hidden;
  display: none;
  z-index: 99;
  margin-top: 70vh;

  & #msg2 {
    text-overflow: ellipsis;
    overflow: hidden;
  }

  & .contentPartInV3dApp {
    height: 77%;
    width: 100%;
    position: relative;
    bottom: 0;
    display: flex;
    flex-direction: column;

    justify-content: space-around;

    & .msgnum {
      display: inline-block;
      color: #000 !important;
      width: 95%;
      padding-left: 5%;
    }
  }

  & .msgBoxupsidePartInV3dApp {
    background-color: #000;
    height: 23%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-content: center;
    position: relative;

    & .textBoxInV3dApp {
      pointer-events: none;
      height: 100%;
      display: flex;
      align-items: center;
    }

    & .axCloseInV3dApp {
      // font-family: none !important;
      // border: 1px solid #fcfcfd;
      // border-radius: 12px;
      // height: 16px;
      // width: 16px;
      cursor: pointer;
      position: absolute;
      top: 20%;
      right: 2%;
      // text-align: center;
      // line-height: 21px;
      // color: #fcfcfd;
      // cursor: pointer;
    }
  }
}

#imgBox {
  display: none;
  font-family: "tingMuseum";
  height: 72%;
  width: 95%;
  position: absolute;
  background-color: rgba(255, 255, 255, 0.27);
  top: 8%;
  left: 50%;
  transform: translateX(-50%);
  outline: none;

  .closeBtn {
    font-family: none !important;
    border: 1px solid #fcfcfd;
    border-radius: 12px;
    height: 16px;
    width: 16px;
    position: absolute;
    right: 2%;
    top: 6.2%;
    text-align: center;
    line-height: 16.5px;
    color: #fcfcfd;
    cursor: pointer;
    z-index: 999;
  }

  .DetailmsgBox {
    display: flex;
    height: 100%;
    width: 46%;
    justify-content: space-around;
    flex-direction: column;
    align-items: center;
    font-size: 24px;
  }

  #imgBox {
    position: relative;
    right: 5%;
    top: 20%;

    box-shadow: 1px 6px 12px #000;
    width: 55%;
    height: 95%;
  }

  #videoBox {
    position: relative;
    right: 5%;
    top: 20%;
    box-shadow: 1px 6px 12px #000;
    width: 55%;
    height: 95%;
  }
}

.username {
  width: 353px;
  height: 48px;
  border: 2px solid #353945;
  opacity: 1;
  border-radius: 90px;
  margin-top: 20px;
  background: black;
  color: #fff;
  outline: none;
  text-indent: 2em;
}

.description {
  width: 353px;
  height: 175px;
  border: 2px solid #353945;
  opacity: 1;
  border-radius: 16px;
  margin-top: 20px;
  background: black;
  color: #fff;
  text-indent: 2em;
  outline: none;
  resize: none;
}

.name1,
.name2,
.name3 {
  height: 152px;
  width: 353px;
  background: #ffffff;
  opacity: 1;
  border-radius: 16px;
  margin-top: 10px;
  color: #000;
  text-indent: 2em;
  resize: none;
  outline: none;
}

#msg3 {
  display: none;
}

.ctup {
  font-size: 18px;
  font-family: Helvetica;
  font-weight: 400;
  line-height: 48px;
  color: #141416;
  text-decoration: underline;
  opacity: 1;
  line-height: 161px;
}
</style>
