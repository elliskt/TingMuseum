<template>
  <div :class="
    time === 'night'
      ? 'personal nightBgc nightColor animate__animated animate__fadeIn'
      : 'personal morningBgc morningColor animate__animated animate__fadeIn'
  ">
    <Header :followContent="followContent" @followContentChange="updateFollowContent" :userAddress="userAddress">
    </Header>
    <div class="nav">
      <div v-show="flag" class="uploaddiv">
        <el-upload action="fakeaction" class="upload-demo" :drag="true" :show-file-list="false" :limit="1"
          list-type="picture" ref="imgupload" :http-request="uploadImgUseFormData" :on-success="handleAvatarSuccess"
          :on-error="handleAvatarError" :before-upload="beforeAvatarUpload" accept=".jpg,.png,.jpeg,.gif">
          <i class="icon-tingMuseumupload"></i>
          <div class="el-upload__text">
            <strong style="font-size: 25px; color: white">{{
                $t("personal.dragPhoto")
            }}</strong><br /><span style="color: white; font-size: 17px">{{
    $t("personal.orClick")
}}</span>
          </div>
        </el-upload>
        <div class="save" @click="save">{{ $t("personal.save") }}</div>
      </div>
      <div class="navImg">
        <img :src="imgUrl" alt="" class="imgClass" v-cloak />
      </div>
      <div class="navMask">
        <div class="navedit">
          <div class="edit" @click="changeCover" v-show="editCoverShow">
            {{ $t("personal.coverPage") }} <i class="icon-tingMuseumset"></i>
          </div>
          <div class="editProfile" @click="changeProfileRouter('profileEdit')" v-show="editProfileShow">
            {{ $t("personal.profile") }} <i class="icon-tingMuseumprofile1"></i>
          </div>
        </div>
      </div>
    </div>
    <!-- 个人信息 -->
    <div class="personalMsg">
      <div class="clear"></div>
      <div :class="
        time === 'night'
          ? ' personalBox'
          : 'morningBgc morningShowDow personalBox'
      ">
        <div class="personalAvatar">
          <div class="rotateContainer" v-if="rotateClass"></div>
          <img :src="addr.startsWith('0x') ? image_avatar : tezosAvatar" alt="" />
        </div>
        <h2 class="usrna" @change="userNameChange" ref="userName">
          {{ userName }}
        </h2>
        <h4>
          <span class="addr">{{ addr.startsWith('0x') ? userAddress : addr }}</span>
          <div class="clip" v-clipboard:copy="this.$route.query.id" slot="reference">
            <img @click="open1" src="@/assets/personal/copy.png" class="linkImg" />
          </div>
        </h4>
        <p class="des">
          {{ description }}
        </p>
        <div class="personalUrl">
          <img src="@/assets/personal/url.png" alt="" v-if="personal_url !== '' && personal_url !== null" />
          <span><a :class="time == 'night' ? '' : 'perMor'" :href="
            personal_url !== ''
              ? personal_url.indexOf('https://') == 0
                ? personal_url
                : personal_url.indexOf('http://') == 0
                  ? personal_url
                  : 'http://' + personal_url
              : 'javasript:void(0)'
          " target="_blank">{{ personal_url }}</a></span>
        </div>
        <ul class="personalBtn">
          <li class="down"></li>
          <!-- :class="time=='night'?(iconShow=='not-allowed'?'notAllow':'allow'):(iconShow=='not-allowed'?'notAllowMorning':'allowMorning')" 这个是原本refresh collection按钮的样式 -->
          <li @click.once="refreshCollection" class="refreshBtn refresh">
            <!-- <i class="el-icon-refresh" :style="{cursor:iconShow}" 
              title="Refresh Collection"></i> -->
            <span>{{ $t("personal.refreshCollection") }}</span>
            <i class="el-icon-refresh"></i>
          </li>
          <li class="more"></li>
        </ul>
        <div class="followBtn">
          <el-button class="follow" v-if="followShow" @click="follow" ref="followbtn" :loading="isFollowingLoading"
            id="followBTN">
            {{ followContent }}
          </el-button>
        </div>
        <ul class="personalWeb">
          <li>
            <a :href="
              facebook_url == null || facebook_url == ''
                ? 'javasript:void(0)'
                : facebook_url
            " :target="
  facebook_url == null || facebook_url == '' ? '_self' : '_blank'
"><svg t="1635493424868" class="icon" viewBox="0 0 1024 1024" version="1.1"
                xmlns="http://www.w3.org/2000/svg" p-id="2402" width="32" height="32">
                <path
                  d="M1024 512c0-282.763636-229.236364-512-512-512C229.236364 0 0 229.236364 0 512s229.236364 512 512 512C794.763636 1024 1024 794.763636 1024 512zM46.545455 512C46.545455 254.929455 254.929455 46.545455 512 46.545455c257.070545 0 465.454545 208.384 465.454545 465.454545 0 257.070545-208.384 465.454545-465.454545 465.454545C254.929455 977.454545 46.545455 769.070545 46.545455 512z"
                  p-id="2403" fill="#8a8a8a"></path>
                <path
                  d="M531.642182 807.517091 531.642182 512l97.512727 0 15.406545-97.931636-112.919273 0L531.642182 364.962909c0-25.553455 8.378182-49.943273 45.056-49.943273l73.309091 0 0-97.745455-104.075636 0c-87.505455 0-111.383273 57.623273-111.383273 137.495273l0 59.252364-60.043636 0L374.504727 512l60.043636 0 0 295.517091L531.642182 807.517091z"
                  p-id="2404" fill="#8a8a8a"></path>
              </svg></a>
          </li>
          <li>
            <a :href="
              twitter_url == null || twitter_url == ''
                ? 'javasript:void(0)'
                : twitter_url
            " :target="
  twitter_url == null || twitter_url == '' ? '_self' : '_blank'
"><svg t="1635493841901" class="icon" viewBox="0 0 1024 1024" version="1.1"
                xmlns="http://www.w3.org/2000/svg" p-id="3966" width="32" height="32">
                <path
                  d="M731.554909 410.205091c0-5.166545-0.093091-10.286545-0.325818-15.36 22.109091-16.477091 41.285818-37.096727 56.459636-60.695273-20.293818 9.122909-42.077091 15.220364-64.977455 17.780364 23.365818-14.382545 41.285818-37.376 49.757091-64.977455-21.876364 13.265455-46.08 22.760727-71.819636 27.694545-20.619636-23.458909-50.036364-38.4-82.571636-38.958545-62.464-1.024-113.105455 51.758545-113.105455 117.899636 0 9.402182 0.977455 18.525091 2.932364 27.322182C413.835636 414.859636 330.472727 365.893818 274.711273 292.072727c-9.728 17.687273-15.313455 38.353455-15.313455 60.509091 0 41.890909 19.968 79.127273 50.315636 101.096727C291.141818 452.840727 273.733818 447.208727 258.466909 437.992727c0 0.512 0 1.024 0 1.536 0 58.554182 39.005091 107.613091 90.763636 119.063273-9.495273 2.699636-19.502545 4.096-29.789091 4.049455-7.307636-0.046545-14.382545-0.837818-21.271273-2.327273 14.382545 47.988364 56.180364 83.037091 105.658182 84.200727-38.725818 32.116364-87.505455 51.293091-140.474182 51.153455-9.122909 0-18.152727-0.605091-26.996364-1.722182 50.082909 34.350545 109.521455 54.365091 173.428364 54.365091C617.797818 748.357818 731.554909 567.296 731.554909 410.205091z"
                  p-id="3967" fill="#8a8a8a"></path>
                <path
                  d="M1024 512c0-282.763636-229.236364-512-512-512S0 229.236364 0 512s229.236364 512 512 512S1024 794.763636 1024 512zM46.545455 512C46.545455 254.929455 254.929455 46.545455 512 46.545455c257.070545 0 465.454545 208.384 465.454545 465.454545 0 257.070545-208.384 465.454545-465.454545 465.454545C254.929455 977.454545 46.545455 769.070545 46.545455 512z"
                  p-id="3968" fill="#8a8a8a"></path>
              </svg></a>
          </li>
          <li>
            <a :href="
              pinter_url == null || pinter_url == ''
                ? 'javasript:void(0)'
                : pinter_url
            " :target="
  pinter_url == null || pinter_url == '' ? '_self' : '_blank'
"><svg t="1635493906701" class="icon" viewBox="0 0 1024 1024" version="1.1"
                xmlns="http://www.w3.org/2000/svg" p-id="4888" width="32" height="32">
                <path
                  d="M748.311273 421.701818c0-106.170182-88.110545-205.079273-221.975273-205.079273-166.632727 0-250.600727 121.949091-250.600727 223.650909 0 61.579636 22.807273 116.363636 71.819636 136.750545 8.005818 3.351273 15.220364 0.093091 17.547636-8.936727 1.582545-6.283636 5.445818-22.155636 7.121455-28.718545 2.373818-8.983273 1.442909-12.101818-5.026909-19.968C353.047273 502.318545 344.064 480.349091 344.064 449.163636c0-90.437818 66.280727-171.426909 172.637091-171.426909 94.161455 0 145.92 58.740364 145.92 137.169455 0 103.237818-44.730182 190.324364-111.197091 190.324364-36.724364 0-64.139636-30.952727-55.342545-68.933818 10.519273-45.335273 30.952727-94.301091 30.952727-127.022545 0-29.277091-15.406545-53.76-47.290182-53.76-37.515636 0-67.630545 39.610182-67.630545 92.672 0 33.792 11.217455 56.645818 11.217455 56.645818s-38.4 166.027636-45.102545 195.072c-6.097455 26.484364-7.028364 55.575273-6.190545 80.151273 2.56 22.062545 23.924364 40.029091 42.449455 15.825455 13.032727-21.271273 27.042909-48.128 34.304-75.031273 4.328727-15.918545 24.669091-98.397091 24.669091-98.397091 12.194909 23.738182 47.802182 44.637091 85.690182 44.637091C671.837091 667.042909 748.311273 562.129455 748.311273 421.701818z"
                  p-id="4889" fill="#8a8a8a"></path>
                <path
                  d="M1024 512c0-282.763636-229.236364-512-512-512C229.236364 0 0 229.236364 0 512s229.236364 512 512 512C794.763636 1024 1024 794.763636 1024 512zM46.545455 512C46.545455 254.929455 254.929455 46.545455 512 46.545455c257.070545 0 465.454545 208.384 465.454545 465.454545 0 257.070545-208.384 465.454545-465.454545 465.454545C254.929455 977.454545 46.545455 769.070545 46.545455 512z"
                  p-id="4890" fill="#8a8a8a"></path>
              </svg></a>
          </li>
          <li>
            <a :href="
              instagram_url == null || instagram_url == ''
                ? 'javasript:void(0)'
                : instagram_url
            " :target="
  instagram_url == null || instagram_url == ''
    ? '_self'
    : '_blank'
"><svg t="1635498032385" class="icon" viewBox="0 0 1024 1024" version="1.1"
                xmlns="http://www.w3.org/2000/svg" p-id="651" width="32" height="32">
                <path
                  d="M756.92973 327.772252a101.477477 101.477477 0 0 0-58.58018-58.58018 1385.075315 1385.075315 0 0 0-372.6991 0 100.554955 100.554955 0 0 0-58.118918 58.58018 670.12036 670.12036 0 0 0-12.546307 184.504505 693.183423 693.183423 0 0 0 12.546307 184.504504 101.477477 101.477477 0 0 0 58.58018 58.58018 1385.075315 1385.075315 0 0 0 372.699099 0 101.477477 101.477477 0 0 0 58.58018-58.58018 673.994955 673.994955 0 0 0 12.546306-184.504504 696.781261 696.781261 0 0 0-13.007567-184.504505zM509.878198 675.286486a163.286486 163.286486 0 1 1 0-326.572972A166.054054 166.054054 0 0 1 673.441441 512a163.563243 163.563243 0 0 1-163.563243 163.286486z m167.53009-293.085405a37.731171 37.731171 0 1 1 37.638919-37.731171 37.638919 37.638919 0 0 1-37.638919 37.731171z"
                  p-id="652" fill="#8a8a8a"></path>
                <path
                  d="M509.878198 512m-104.706306 0a104.706306 104.706306 0 1 0 209.412613 0 104.706306 104.706306 0 1 0-209.412613 0Z"
                  p-id="653" fill="#8a8a8a"></path>
                <path
                  d="M512 1024A512 512 0 1 1 1024 512 512.645766 512.645766 0 0 1 512 1024z m0-972.892252a461.261261 461.261261 0 1 0 461.261261 461.261261 461.261261 461.261261 0 0 0-461.261261-461.261261z"
                  p-id="654" fill="#8a8a8a"></path>
              </svg></a>
          </li>
        </ul>
        <div class="personFooter">
          <div class="timeInfo">
            <p>{{ $t("personal.memberSince") }}</p>
            <p>{{ sinceTime }}</p>
          </div>
        </div>
      </div>

      <div class="card-Box">
        <div class="faf">
          <!-- 关注者 -->
          <div class="following">
            <span @click="openFollowingDialog" class="span1">{{
                $t("personal.following")
            }}</span><span class="fing"><i></i>{{ count_following }}<i></i></span>
          </div>
          <!-- 粉丝 -->
          <div class="follower">
            <span @click="openFollowerDialog" class="span1">{{
                $t("personal.follower")
            }}</span><span class="fer"><i></i>{{ count_follower }}<i></i></span>
          </div>
          <!-- 大的弹窗，里面分为following和follower -->

          <el-dialog :visible.sync="dialogOfFollowingAndFollower" @close="closeFollowerDialog"
            custom-class="followingAndFollowerDialog" :append-to-body="true" @open="whenOpen">
            <div class="ff__container">
              <!-- 先放两个标签，用于切换following和follower -->
              <el-tabs v-model="activeName" @tab-click="handleTabs" class="fandf">
                <el-tab-pane :label="$t('personal.following')" name="following"></el-tab-pane>
                <el-tab-pane :label="$t('personal.follower')" name="follower"></el-tab-pane>
              </el-tabs>
              <!-- 再放两个ul，用于显示following和follower -->
              <ul v-if="followingInDialogOfFollowingAndFollower" class="followingUL">
                <li v-for="(item, index) in followingList.following" :key="index" @click="goPersonal(item)">
                  <img :src="url + followingList.following_avatars[item]" alt="" class="avatar" />
                  <span>{{ item }}</span>
                  <i class="el-icon-document-copy" @click.stop="doCopy(item)"></i>
                </li>
                <div v-if="followingList.following.length == 0" class="noMoreData">
                  <el-empty description="Oops,you haven't follow anyone."></el-empty>
                </div>
              </ul>
              <ul v-if="followerInDialogOfFollowingAndFollower" class="followerUL">
                <li v-for="(item, index) in followerList.follower" :key="index" @click="goPersonal(item)">
                  <img :src="url + followerList.follower_avatars[item]" alt="" class="avatar" />
                  <span>{{ item }}</span>
                  <i class="el-icon-document-copy" @click.stop="doCopy(item)"></i>
                </li>
                <div v-if="followerList.follower.length == 0" class="noMoreData">
                  <el-empty description="Oops,you haven't any followers."></el-empty>
                </div>
              </ul>
            </div>
          </el-dialog>
        </div>
        <!-- 排序、分页 -->
        <div class="sortPage">
          <!-- 黑夜 -->
          <ul v-if="time == 'night'" class="page">
            <li @click="changePageMuseum()" :class="
              showMu == true &&
                showCol == false &&
                showLike == false &&
                showOpensea == false &&
                showMp3 == false &&
                showMuseumSkin == false
                ? 'pageActive2'
                : 'pageActive'
            ">
              {{ $t("personal.museum") }}
            </li>
            <li @click="changePageCollection()" :class="
              showCol == true &&
                showMu == false &&
                showLike == false &&
                showOpensea == false &&
                showMp3 == false &&
                showMuseumSkin == false
                ? 'pageActive2'
                : 'pageActive'
            ">
              {{ $t("personal.collection") }}
            </li>
            <li @click="changePageOpenseaCollection()" :class="
              showOpensea == true &&
                showCol == false &&
                showMu == false &&
                showLike == false &&
                showMp3 == false &&
                showMuseumSkin == false
                ? 'pageActive2'
                : 'pageActive'
            ">
              {{ $t("personal.opensea") }}
            </li>
            <li @click="changePagePoap()" :class="
              showPoap == true &&
                showOpensea == false &&
                showCol == false &&
                showMu == false &&
                showLike == false &&
                showMp3 == false &&
                showMuseumSkin == false
                ? 'pageActive2'
                : 'pageActive'
            ">
              POAP
            </li>
            <li :class="
              showLike == true &&
                showMu == false &&
                showCol == false &&
                showOpensea == false &&
                showMp3 == false &&
                showMuseumSkin == false
                ? 'pageActive2'
                : 'pageActive'
            " @click="changePageLike()">
              {{ $t("personal.like") }}
            </li>
            <li :class="
              showLike == false &&
                showMu == false &&
                showCol == false &&
                showOpensea == false &&
                showMp3 == false &&
                showMuseumSkin == true
                ? 'pageActive2'
                : 'pageActive'
            " @click="changeMuseumSkin()">
              {{ $t("personal.skin") }}
            </li>
          </ul>
          <!-- 白天 -->
          <ul v-if="time != 'night'" class="page">
            <li @click="changePageMuseum()" :class="
              showMu == true &&
                showCol == false &&
                showLike == false &&
                showOpensea == false &&
                showMp3 == false &&
                showMuseumSkin == false
                ? 'pageActive2'
                : 'pageActive'
            ">
              {{ $t("personal.museum") }}
            </li>
            <li @click="changePageCollection()" :class="
              showCol == true &&
                showMu == false &&
                showLike == false &&
                showOpensea == false &&
                showMp3 == false &&
                showMuseumSkin == false
                ? 'pageActive2'
                : 'pageActive'
            ">
              {{ $t("personal.collection") }}
            </li>
            <li @click="changePageOpenseaCollection()" :class="
              showOpensea == true &&
                showCol == false &&
                showMu == false &&
                showLike == false &&
                showMp3 == false &&
                showMuseumSkin == false
                ? 'pageActive2'
                : 'pageActive'
            ">
              {{ $t("personal.opensea") }}
            </li>
            <li @click="changePagePoap()" :class="
              showPoap == true &&
                showOpensea == false &&
                showCol == false &&
                showMu == false &&
                showLike == false &&
                showMp3 == false &&
                showMuseumSkin == false
                ? 'pageActive2'
                : 'pageActive'
            ">
              POAP
            </li>
            <li :class="
              showLike == true &&
                showMu == false &&
                showCol == false &&
                showOpensea == false &&
                showMp3 == false &&
                showMuseumSkin == false
                ? 'pageActive2'
                : 'pageActive'
            " @click="changePageLike()">
              {{ $t("personal.like") }}
            </li>
            <li :class="
              showLike == false &&
                showMu == false &&
                showCol == false &&
                showOpensea == false &&
                showMp3 == false &&
                showMuseumSkin == true
                ? 'pageActive2'
                : 'pageActive'
            " @click="changeMuseumSkin()">
              {{ $t("personal.skin") }}
            </li>
          </ul>
          <!-- 排序 -->
          <el-tooltip effect="dark" placement="bottom" transition="el-zoom-in-top" :visible-arrow="false"
            :open-delay="100" popper-class="sortByToolTip">
            <div class="sort">
              <span>{{ $t("personal.sortBy") }}</span>
              <img src="../assets/personal/arrowup.svg" alt="" />
            </div>
            <div slot="content" class="time">
              <span>time</span>
            </div>
          </el-tooltip>
        </div>
        <keep-alive>
          <Card :museumList="museumList" :collectionList="collectionList" :openseaList="openseaList"
            :poapList="poapList" :mp3List="mp3List" :skinList="skinList" :likeList="likeList" :museumShow="museumShow"
            :collectionShow="collectionShow" :openseaShow="openseaShow" :poapShow="poapShow" :mp3Show="mp3Show"
            :poapPaginationShow="poapPaginationShow" :poapPaginationNoMoreData="poapPaginationNoMoreData"
            :museumPaginationShow="museumPaginationShow" :museumNoMoreData="museumNoMoreData"
            :hecoPaginationShow="hecoPaginationShow" :hecoNoMoreData="hecoNoMoreData"
            :openseaPaginationShow="openseaPaginationShow" :openseaNoMoreData="openseaNoMoreData"
            :likePaginationShow="likePaginationShow" :likeNoMoreData="likeNoMoreData" :likeShow="likeShow"
            :skinShow="skinShow" :skinTextShow="skinTextShow" @museumListChange="updateMuseumList"
            @collectionListChange="updateCollectList" @openseaListChange="updateOpenseaList"
            @poapListChange="updatePoapList" @mp3ListChange="updateMp3List" @likeListChange="updateLikeList"
            :total_museumPage="total_museumPage" :total_page="total_page" :total_openseaPage="total_openseaPage"
            :total_poapPage="total_poapPage" :total_mp3Page="total_mp3Page" :total_likedPage="total_likedPage"
            :currentPageOfMuseum="currentPageOfMuseum" @currentMuseumPageChange="updateCurrentMuseumPage"
            :currentCollectionPage="currentCollectionPage" @currentCollectionPageChange="updateCurrentCollectionPage"
            :currentOpenseaPage="currentOpenseaPage" @currentOpenseaPageChange="updateCurrentOpenseaPage"
            :currentPoapPage="currentPoapPage" @currentPoapPageChange="updateCurrentPoapPage"
            :currentMp3Page="currentMp3Page" @currentMp3Change="updateCurrentMp3Page" :currentLikePage="currentLikePage"
            @currentLikedPageChange="updateCurrentLikedPage" :isMuSkeletonLoading="isMuSkeletonLoading"
            @refreshExhibitionWhenDelete="refreshExhibitionWhenDelete">
          </Card>
        </keep-alive>
      </div>
      <div class="clear"></div>
    </div>
    <!-- 点击取消关注的时候弹出的框 -->
    <el-dialog :visible.sync="dialogVisible" width="30%" :close-on-click-modal="false" :show-close="false"
      custom-class="unfollowDialog" :close-on-press-escape="false" :modal-append-to-body="false">
      <span>{{ $t("personal.sureToUnfollow") }}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelUnfollow" class="cancel">{{
            $t("addMuseum.cancel")
        }}</el-button>
        <el-button type="primary" @click="unfollow" class="confirm">{{
            $t("addMuseum.confirm")
        }}</el-button>
      </span>
    </el-dialog>
    <!-- 显示当前用户不存在 -->
    <el-dialog :visible.sync="errorCode" width="30%" :close-on-click-modal="false" :show-close="false"
      custom-class="userNotExist" :close-on-press-escape="false" :modal-append-to-body="false">
      <i class="el-icon-error" style="color: red; font-size: 18px"></i><span> {{ $t("personal.notExist") }}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="goBack()">{{ $t("personal.goBack") }}</el-button>
      </span>
    </el-dialog>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "@/components/header.vue";
import Card from "@/components/card.vue";
import Footer from "@/components/footer.vue";
// import $ from "jquery";
import * as lodash from "lodash";
export default {
  props: ["time"],
  data() {
    return {
      followBtnLan: window.localStorage.languageStorage,
      dialogVisible: false,
      followContent: "",
      isFollowingLoading: false,
      followingList: [],
      followingInfoList: [],
      defaultImage: require("../assets/personal/defaultAvatar.png"),
      followerList: [],
      followerInfoList: [],
      dialogTableVisibleOfFollowing: false, //控制关注者的弹框
      dialogTableVisibleOfFollower: false, //控制粉丝的弹框
      language: window.localStorage.getItem("languageStorage") || "en",
      iconShow: "pointer",
      systemTime: this.$store.state.since_time,
      museumList: {},
      collectionList: {},
      likeList: {},
      openseaList: {},
      poapList: {},
      mp3List: {},
      skinList: {},
      museumShow: true, //在card中显示museum的部分
      collectionShow: false,
      likeShow: false,
      openseaShow: false,
      poapShow: false,
      poapPaginationShow: false, // 当poap没有内容的时候，控制页数的bar不能出现
      poapPaginationNoMoreData: false, // 当poap没有内容的时候，显示NoMoreData的图案
      museumPaginationShow: false, // 当museum没有内容的时候，不显示页数
      museumNoMoreData: false, // 当museum没有内容的时候，显示NoMoreData的图案
      hecoPaginationShow: false, // 当heco没有内容的时候，不显示页数
      hecoNoMoreData: false, // 当heco没有内容的时候，显示NoMoreData的图案
      openseaPaginationShow: false, // 当opensea没有内容的时候，不显示页数
      openseaNoMoreData: false, // 当opensea没有内容的时候，显示NoMoreData的图案
      likePaginationShow: false, // 当like没有内容的时候，不显示页数
      likeNoMoreData: false, // 当like没有内容的时候，显示NoMoreData的图案
      mp3Show: false,
      skinShow: false,
      skinTextShow: false,
      flag: false, //控制着上传遮罩层的显示与隐藏
      edit: true, //控制edit cover photo的显示与隐藏
      profile: true, //控制edit profile的显示与隐藏
      showMu: true, //用来控制展馆按钮的白天黑天的样式
      showCol: false, //用来控制资产按钮的白天黑天的样式
      showLike: false, //用来控制收藏资产的按钮的白天黑天的样式
      showOpensea: false, //用来控制opensea资产的按钮的白天黑天的样式
      showPoap: false,
      showMp3: false, //用来控制mp3资产的按钮的白天黑天的样式
      showMuseumSkin: false,
      imgType: [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/PNG",
        "image/JPG",
        "image/JPEG",
        "image/gif",
        "image/GIF",
      ],
      imgUrl: require("../assets/personal/nav.png"),
      img: "",
      description: "",
      personal_url: "",
      image_avatar: require("@/assets/personal/defaultAvatar.png"),
      facebook_url: "",
      twitter_url: "",
      pinter_url: "",
      instagram_url: "",
      userName: "",
      userAddress: "",
      total_page: 0,
      total_museumPage: 0,
      total_mp3Page: 0,
      total_likedPage: 0,
      total_openseaPage: 0,
      total_poapPage: 0,
      currentLikePage: 1,
      currentCollectionPage: 1,
      currentPageOfMuseum: 1,
      currentOpenseaPage: 1,
      currentPoapPage: 1,
      currentMp3Page: 1,
      count_following: "0",
      count_follower: "0",
      followed: false,
      following: [],
      follower: [],
      refreshbtnloading: false,
      isrefreshDisabled: false,
      file: "",
      addr: "",
      errorCode: false,
      url: window.urls, //从public的url.js中拿
      isMuSkeletonLoading: true, //要传到子组件card中的变量，代表museum的骨架屏是否在加载
      isNavSkeletonLoading: true,
      dialogOfFollowingAndFollower: false, // 显示following和follower共同的dialog
      followingInDialogOfFollowingAndFollower: false, // 显示following的部分
      followerInDialogOfFollowingAndFollower: false, // 显示follower的部分
      activeName: "following",
      timer: null,
      tezosAvatar: require('../assets/header/tezos-xtz-logo.svg')
    };
  },
  created() {
    this.handleTabs = lodash.debounce(this.handleTabs, 500);
    this.changePageMuseum = lodash.debounce(this.changePageMuseum, 500);
    this.changePageCollection = lodash.debounce(this.changePageCollection, 500);
    this.changePageOpenseaCollection = lodash.debounce(
      this.changePageOpenseaCollection,
      500
    );
    this.changePagePoap = lodash.debounce(this.changePagePoap, 500);
    this.changeMuseumSkin = lodash.debounce(this.changeMuseumSkin, 500);
    this.changePageLike = lodash.debounce(this.changePageLike, 500);
  },
  methods: {
    goPersonal(item) {
      const route = this.$router.resolve({
        path: "/personal",
        query: {
          id: item,
        },
      });
      window.open(route.href, "_blank");
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
    whenOpen() {
      if (this.followingInDialogOfFollowingAndFollower) {
        this.activeName = "following";
      } else if (this.followerInDialogOfFollowingAndFollower) {
        this.activeName = "follower";
      }
    },
    // 监听用户名的长度的变化
    userNameChange() {
      alert("haha");
    },
    async handleTabs() {
      const address = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (this.activeName == "following") {
        this.followerInDialogOfFollowingAndFollower = false;
        this.followingInDialogOfFollowingAndFollower = true;
        // 获取关注数和粉丝数
        this.$axios
          .get(this.url + "get_follow", {
            params: {
              user_address: address[0],
              current_address: this.$route.query.id,
            },
          })
          .then((res) => {
            this.followingList = res.data;
          });
      } else {
        this.followerInDialogOfFollowingAndFollower = true;
        this.followingInDialogOfFollowingAndFollower = false;
        this.$axios
          .get(this.url + "get_follow", {
            params: {
              user_address: address[0],
              current_address: this.$route.query.id,
            },
          })
          .then((res) => {
            this.followerList = res.data;
          });
      }
    },
    // 监听museum的快速点击
    museumKeyDown() {
      var date = new Date();
      if (this.museumClickTime == 0) {
        this.museumClickTime = date.getTime();
      } else {
        if (date.getTime() - this.museumClickTime <= 10) {
          this.$notify({
            title: "您两次点击的间隔时间太短了",
            type: "error",
          });
        } else {
          this.museumClickTime = date.getTime();
        }
      }
    },
    goBack(path) {
      window.close();
    },
    cancelUnfollow() {
      this.dialogVisible = false;
      this.isFollowingLoading = false;
      this.followContent = this.$t("personal.unFollow");
    },
    async unfollow() {
      const address = await window.ethereum.request({
        method: "eth_accounts",
      });
      this.dialogVisible = false;
      this.$axios
        .post(this.url + "unfollow_current", {
          user_address: address[0],
          current_address: this.$route.query.id,
        })
        .then(() => {
          this.isFollowingLoading = false;

          // this.$refs.followbtn.innerHTML = this.$t('personal.follow')
          this.followContent = this.$t("personal.follow");

          this.$axios
            .get(this.url + "get_follow", {
              params: {
                user_address: address[0],
                current_address: this.$route.query.id,
              },
            })
            .then((res) => {
              this.count_following = res.data.count_following;
              this.count_follower = res.data.count_follower;
              this.following = res.data.following;
              this.follower = res.data.follower;
              this.followed = res.data.isFollowing;
            });
        });
    },
    async openFollowingDialog() {
      // 先从后端请求关注者，替换followingList，自己对返回的结果构造成一个新的对象，赋值给followingList即可
      const address = await window.ethereum.request({
        method: "eth_accounts",
      });
      // 获取关注数和粉丝数
      this.$axios
        .get(this.url + "get_follow", {
          params: {
            user_address: address[0],
            current_address: this.$route.query.id,
          },
        })
        .then((res) => {
          this.followingList = res.data;
          this.dialogOfFollowingAndFollower = true;
          this.followingInDialogOfFollowingAndFollower = true;
          this.followerInDialogOfFollowingAndFollower = false;
        });
    },
    closeFollowingDialog() {
      this.dialogTableVisibleOfFollowing = false;
    },
    async openFollowerDialog() {
      // 先从后端请求关注者，替换followingList，自己对返回的结果构造成一个新的对象，赋值给followingList即可
      const address = await window.ethereum.request({
        method: "eth_accounts",
      });
      // 获取关注数和粉丝数
      this.$axios
        .get(this.url + "get_follow", {
          params: {
            user_address: address[0],
            current_address: this.$route.query.id,
          },
        })
        .then((res) => {
          this.followerList = res.data;
          this.dialogOfFollowingAndFollower = true;
          this.followerInDialogOfFollowingAndFollower = true;
          this.followingInDialogOfFollowingAndFollower = false;
        });
    },
    closeFollowerDialog() {
      this.dialogOfFollowingAndFollower = false;
    },
    // 后端需要的方法，刷新当前用户在链上的资产
    refreshCollection() {
      this.$axios
        .post(this.url + "retrieve_personal_collections", {
          user_address: this.$route.query.id,
        })
        .then(() => {
          this.isrefreshDisabled = true;
          $(".refresh").removeClass("refreshBtn");
          $(".refresh").addClass("disable");
          this.$notify({
            title: "Retrieving data. Please wait a moment.",
            type: "success",
          });
        });
    },
    // 进入别人的主页时，可以提供关注他的功能，关注后显示unfollow,同时following和follower的数量都会发生变化
    async follow() {
      const address = await window.ethereum.request({
        method: "eth_accounts",
      });
      // 判断是否关注的按钮，用followed来判断，这个从数据库中获取，初始为false，即没有被关注，按钮显示的是follow字样
      if (!this.followed) {
        // 如果followed为false，说明当前这个账户没有被主账户关注，那么就执行follow_current方法
        // follow_current
        this.isFollowingLoading = true;
        this.$axios
          .post(this.url + "follow_current", {
            user_address: address[0],
            current_address: this.$route.query.id,
          })
          .then(() => {
            this.isFollowingLoading = false;

            // this.$refs.followbtn.innerHTML = this.$t('personal.unFollow')
            this.followContent = this.$t("personal.unFollow");
            this.$forceUpdate();
            this.$axios
              .get(this.url + "get_follow", {
                params: {
                  user_address: address[0],
                  current_address: this.$route.query.id,
                },
              })
              .then((res) => {
                this.count_following = res.data.count_following;
                this.count_follower = res.data.count_follower;
                this.following = res.data.following;
                this.follower = res.data.follower;
                this.followed = res.data.isFollowing;
              });
          });
      } else if (this.followed) {
        // 如果followed为true，说明已经被关注了，按钮显示unfollow字样，同时执行unfollow_current方法
        // unfollow_current
        this.dialogVisible = true;
        this.isFollowingLoading = true;
        // this.$refs.followbtn.innerHTML = this.$t('personal.unFollow')
        this.followContent = this.$t("personal.unFollow");

        this.$forceUpdate();
      }
    },
    // 和子组件通信,交换展馆的信息
    updateMuseumList(event) {
      this.museumList = event;
    },
    // 和子组件通信，交换资产的信息
    updateCollectList(event) {
      this.collectionList = event;
    },
    // 和子组件通信，交换收藏的资产的信息
    updateLikeList(event) {
      this.likeList = event;
    },
    updateOpenseaList(event) {
      this.openseaList = event;
    },
    updatePoapList(event) {
      this.poapList = event;
    },
    updateMp3List(event) {
      this.mp3List = event;
    },
    // 和子组件通信，交换当前是那一页，初始进入like是显示第一页的，因为会重新请求
    updateCurrentLikedPage(event) {
      this.currentLikePage = event;
    },
    updateCurrentCollectionPage(event) {
      this.currentCollectionPage = event;
    },
    updateCurrentMuseumPage(event) {
      this.currentPageOfMuseum = event;
    },
    updateCurrentOpenseaPage(event) {
      this.currentOpenseaPage = event;
    },
    updateCurrentPoapPage(event) {
      this.currentPoapPage = event;
    },
    updateCurrentMp3Page(event) {
      this.currentMp3Page = event;
    },
    updateFollowContent(event) {
      this.followContent = event;
    },
    refreshExhibitionWhenDelete(deleteMessage) {
      if (deleteMessage == "deleteSuccess") {
        this.$axios
          .get(this.url + "show_exhibition", {
            params: {
              current_address: this.$route.query.id,
            },
          })
          .then((res) => {
            this.currentPageOfMuseum = res.data.page;
            this.museumList = res.data.data;
            if (this.museumList.length == 0) {
              this.museumPaginationShow = false;
              this.museumNoMoreData = true;
            } else {
              this.museumPaginationShow = true;
              this.museumNoMoreData = false;
            }
            this.total_museumPage = res.data.total_page;
            this.$forceUpdate();
          });
      }
    },
    createSetInterval() {
      this.stopSetInterval();
      const _this = this;
      this.timer = setInterval(() => {
        _this.clearTextOfElPagination();
      }, 300);
    },
    // 关闭轮询
    stopSetInterval() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    },
    clearTextOfElPagination() {
      if (
        this.museumPaginationShow !== false ||
        this.hecoPaginationShow !== false ||
        this.openseaPaginationShow !== false ||
        this.poapPaginationShow !== false ||
        this.likePaginationShow !== false
      ) {
        if (
          document.getElementsByClassName("el-pagination__jump")[0]
            .childNodes[0].nodeValue !== undefined &&
          document.getElementsByClassName("el-pagination__jump")[0]
            .childNodes[2].nodeValue !== undefined
        ) {
          if (
            document.getElementsByClassName("el-pagination__jump")[0]
              .childNodes[0].nodeValue !== "" &&
            document.getElementsByClassName("el-pagination__jump")[0]
              .childNodes[2].nodeValue !== ""
          ) {
            document.getElementsByClassName(
              "el-pagination__jump"
            )[0].childNodes[0].nodeValue = "";
            document.getElementsByClassName(
              "el-pagination__jump"
            )[0].childNodes[2].nodeValue = "";
          } else {
            this.stopSetInterval();
          }
        } else {
        }
      } else {
      }
    },
    // 切换显示展览馆
    changePageMuseum() {
      this.createSetInterval();
      this.museumShow = true;
      this.collectionShow = false;
      this.likeShow = false;
      this.openseaShow = false;
      this.poapShow = false;
      this.showPoap = false;
      this.mp3Show = false;
      this.skinShow = false;
      this.skinTextShow = false;
      this.showMu = true;
      this.showCol = false;
      this.showLike = false;
      this.showOpensea = false;
      this.showMp3 = false;
      this.showMuseumSkin = false;
      this.poapPaginationNoMoreData = false;
      this.poapPaginationShow = false;
      this.hecoPaginationShow = false;
      this.hecoNoMoreData = false;
      this.openseaPaginationShow = false;
      this.openseaNoMoreData = false;
      this.likePaginationShow = false;
      this.likeNoMoreData = false;
      this.$axios
        .get(this.url + "show_exhibition", {
          params: {
            current_address: this.$route.query.id,
          },
        })
        .then((res) => {
          console.log("show_exhibition的res:", res);
          this.currentPageOfMuseum = res.data.page;
          this.museumList = res.data.data;
          if (this.museumList.length == 0) {
            this.museumPaginationShow = false;
            this.museumNoMoreData = true;
          } else {
            this.museumPaginationShow = true;
            this.museumNoMoreData = false;
          }
          this.total_museumPage = res.data.total_page;
          this.$forceUpdate();
        });
    },
    // 切换显示资产
    async changePageCollection() {
      this.createSetInterval();
      const address = await window.ethereum.request({
        method: "eth_accounts",
      });
      window.sessionStorage.setItem("showCollection", true);
      window.sessionStorage.setItem("showLike", false);
      window.sessionStorage.setItem("showOpenseaCollection", false);
      window.sessionStorage.setItem("showMp3Collection", false);
      this.collectionShow = true;
      this.museumShow = false;
      this.likeShow = false;
      this.openseaShow = false;
      this.poapShow = false;
      this.showPoap = false;
      this.mp3Show = false;
      this.skinShow = false;
      this.skinTextShow = false;
      this.showCol = true;
      this.showMu = false;
      this.showLike = false;
      this.showOpensea = false;
      this.showMp3 = false;
      this.showMuseumSkin = false;
      this.poapPaginationNoMoreData = false;
      this.poapPaginationShow = false;
      this.museumPaginationShow = false;
      this.museumNoMoreData = false;
      this.openseaPaginationShow = false;
      this.openseaNoMoreData = false;
      this.likePaginationShow = false;
      this.likeNoMoreData = false;
      this.$axios
        .get(this.url + "get_collects/owned", {
          params: {
            current_address: this.$route.query.id,
            user_address: address[0],
          },
        })
        .then((res) => {
          this.currentCollectionPage = res.page;
          window.sessionStorage.setItem(
            "collectionList",
            JSON.stringify(res.data.data)
          );
          this.collectionList = res.data.data;
          if (this.collectionList.length == 0) {
            this.hecoPaginationShow = false;
            this.hecoNoMoreData = true;
          } else {
            this.hecoPaginationShow = true;
            this.hecoNoMoreData = false;
          }
          this.total_page = res.data.total_page;
          this.$forceUpdate();
        });
    },
    // 切换显示opensea资产
    async changePageOpenseaCollection() {
      this.createSetInterval();
      const address = await window.ethereum.request({
        method: "eth_accounts",
      });
      window.sessionStorage.setItem("showCollection", false);
      window.sessionStorage.setItem("showLike", false);
      window.sessionStorage.setItem("showOpenseaCollection", true);
      window.sessionStorage.setItem("showMp3Collection", false);
      this.collectionShow = false;
      this.museumShow = false;
      this.likeShow = false;
      this.openseaShow = true;
      this.poapShow = false;
      this.showPoap = false;
      this.mp3Show = false;
      this.skinShow = false;
      this.skinTextShow = false;
      this.showCol = false;
      this.showMu = false;
      this.showLike = false;
      this.showOpensea = true;
      this.showMp3 = false;
      this.showMuseumSkin = false;
      this.poapPaginationNoMoreData = false;
      this.poapPaginationShow = false;
      this.hecoPaginationShow = false;
      this.hecoNoMoreData = false;
      this.museumNoMoreData = false;
      this.museumPaginationShow = false;
      this.likePaginationShow = false;
      this.likeNoMoreData = false;
      // 发送查看opensea资产的请求
      // 具体参考上面的资产的方法
      // total_OpenseaPage要修改
      // currentOpenseaPage要修改
      // opensealist要修改
      this.$axios
        .get(this.url + "get_collects/opensea", {
          params: {
            current_address: this.$route.query.id,
            user_address: address[0],
          },
        })
        .then((res) => {
          this.currentOpenseaPage = res.data.page;
          window.sessionStorage.setItem(
            "openseaList",
            JSON.stringify(res.data.data)
          );
          this.openseaList = res.data.data;
          if (this.openseaList.length == 0) {
            this.openseaPaginationShow = false;
            this.openseaNoMoreData = true;
          } else {
            this.openseaPaginationShow = true;
            this.openseaNoMoreData = false;
          }
          this.total_openseaPage = res.data.total_page;
          this.$forceUpdate();
        });
    },
    // 显示poap资产
    async changePagePoap() {
      this.createSetInterval();
      const address = await window.ethereum.request({
        method: "eth_accounts",
      });
      this.poapShow = true;
      this.collectionShow = false;
      this.museumShow = false;
      this.likeShow = false;
      this.openseaShow = false;
      this.mp3Show = false;
      this.skinShow = false;
      this.skinTextShow = false;
      this.showCol = false;
      this.showMu = false;
      this.showLike = false;
      this.showOpensea = false;
      this.showPoap = true;
      this.showMp3 = false;
      this.showMuseumSkin = false;
      this.museumPaginationShow = false;
      this.museumNoMoreData = false;
      this.hecoPaginationShow = false;
      this.hecoNoMoreData = false;
      this.openseaPaginationShow = false;
      this.openseaNoMoreData = false;
      this.likePaginationShow = false;
      this.likeNoMoreData = false;
      this.$axios
        .get(this.url + "get_collects/poap", {
          params: {
            current_address: this.$route.query.id,
            page: 1,
          },
        })
        .then((res) => {
          this.poapList = res.data.data;
          this.total_poapPage = res.data.total_page;
          if (this.poapList.length == 0) {
            this.poapPaginationShow = false;
            this.poapPaginationNoMoreData = true;
          } else {
            this.poapPaginationShow = true;
            this.poapPaginationNoMoreData = false;
          }
        });
    },
    changeMuseumSkin() {
      this.likeShow = false;
      this.collectionShow = false;
      this.museumShow = false;
      this.openseaShow = false;
      this.poapShow = false;
      this.showPoap = false;
      this.mp3Show = false;
      this.showLike = false;
      this.showCol = false;
      this.skinShow = true;
      this.showMu = false;
      this.showOpensea = false;
      this.showMp3 = false;
      this.showMuseumSkin = true;
      this.poapPaginationNoMoreData = false;
      this.poapPaginationShow = false;
      this.museumPaginationShow = false;
      this.museumNoMoreData = false;
      this.openseaPaginationShow = false;
      this.openseaNoMoreData = false;
      this.hecoPaginationShow = false;
      this.hecoNoMoreData = false;
      this.likePaginationShow = false;
      this.likeNoMoreData = false;
      var formData = new FormData();
      formData.append("current_address", this.$route.query.id);
      this.$axios
        .post(this.url + "get_collects_skin_balance", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          this.skinTextShow = true;
          this.skinList = res.data;
        });
    },
    // 切换显示收藏的资产
    async changePageLike() {
      this.createSetInterval();
      // 在sessionSotarge中设置一个变量用于保存收藏的资产的页数，保证一进入的时候是第一页，因为每次进入like的时候都需要进行请求，但是页码却保持在上次，这是个bug
      window.sessionStorage.setItem("currentPageToOne", 1);
      const address = await window.ethereum.request({
        method: "eth_accounts",
      });
      window.sessionStorage.setItem("showCollection", false);
      window.sessionStorage.setItem("showLike", true);
      window.sessionStorage.setItem("showOpenseaCollection", false);
      this.likeShow = true;
      this.collectionShow = false;
      this.museumShow = false;
      this.openseaShow = false;
      this.mp3Show = false;
      this.poapShow = false;
      this.showLike = true;
      this.showCol = false;
      this.showMu = false;
      this.skinShow = false;
      this.showOpensea = false;
      this.showPoap = false;
      this.showMp3 = false;
      this.showMuseumSkin = false;
      this.poapPaginationNoMoreData = false;
      this.poapPaginationShow = false;
      this.museumPaginationShow = false;
      this.museumNoMoreData = false;
      this.hecoPaginationShow = false;
      this.hecoNoMoreData = false;
      this.openseaPaginationShow = false;
      this.openseaNoMoreData = false;
      this.$axios
        .get(this.url + "get_collects/liked", {
          params: {
            current_address: this.$route.query.id,
            user_address: address[0],
          },
        })
        .then((res) => {
          this.currentLikePage = res.page;
          window.sessionStorage.setItem(
            "likeList",
            JSON.stringify(res.data.data)
          );
          this.likeList = res.data.data;
          if (this.likeList.length == 0) {
            this.likePaginationShow = false;
            this.likeNoMoreData = true;
          } else {
            this.likePaginationShow = true;
            this.likeNoMoreData = false;
          }
          this.total_likedPage = res.data.total_page;
          this.$forceUpdate();
        });
    },
    // 改变路由
    changeRouter(path) {
      setTimeout(() => {
        this.$router.push({
          path,
          name: path.replace(path[0], path[0].toUpperCase()),
        });
      }, 600);
    },
    // 切换到editprofile页面
    changeProfileRouter(path) {
      this.$router.push({
        path,
        name: path.replace(path[0], path[0].toUpperCase()),
      });
    },
    // 显示nav的遮罩
    changeCover() {
      this.flag = true;
      this.edit = false;
      this.profile = false;
    },
    // 保存cover page
    save() {
      this.edit = true;
      this.profile = true;
      this.flag = false;
      var formData = new FormData();
      formData.append("user_address", this.$route.query.id);
      formData.append("image_coverpage", this.file);
      this.$axios
        .post(this.url + "save_coverpage_info", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => { });
    },
    // 以下的之前有说过
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
        const isLt3M = file.size / 1024 / 1024 < 3;

        if (!isTYPE) {
          this.$notify({
            title: "file type should only be jpg、jpeg、png、gif",
            type: "error",
          });
          return reject(false);
        } else if (!isLt3M) {
          this.$notify({
            title: "file size cannot greater than 3M",
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
          callback(fileType === el);
        }
      });
    },
    // 上传tup(使用base64)
    async uploadImgUseBase64(params) {
      const addresses = await window.ethereum.request({
        method: "eth_accounts",
      });
      var imgUrl = "";
      // Promise的数据需要用.then得到
      this.getBase64(params.file).then((res) => {
        imgUrl = res;
        // this.$axios.post('test1', {
        //   image_coverpage: imgUrl
        // })
        this.$axios
          .post(this.url + "save_coverpage_info", {
            user_address: addresses[0],
            image_coverpage: imgUrl,
          })
          .then((data) => {
            const image = JSON.parse(data.config.data);
            if (
              image.image_coverpage !== null &&
              image.image_coverpage !== ""
            ) {
              this.imgUrl = image.image_coverpage;
              this.img = image.image_coverpage;
            }
          });
      });
    },
    // 上传图片(使用formData)
    async uploadImgUseFormData(params) {
      this.file = params.file;
      this.getBase64(params.file).then((res) => {
        this.imgUrl = res;
      });
    },
    // 转换格式,将图片转化为base64格式的
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
    open1() {
      const h = this.$createElement;

      this.$notify({
        title: this.$t("personal.copySuccess"),
        type: "success",
        message: h(
          "i",
          {
            style: "color: teal",
          },
          this.$t("personal.copySuccess2")
        ),
        customClass: "attention",
      });
    },
    open2() {
      const h = this.$createElement;

      this.$notify({
        type: "success",
        message: h(
          "i",
          {
            style: "color: teal",
          },
          "Address has been copied to clipboard"
        ),
      });
    },
    mountedLoadOperation(address) {
      this.addr = address;
      this.isNavSkeletonLoading = true;
      this.$axios
        .get(this.url + "get_user_info", {
          params: {
            user_address: this.$route.query.id,
          },
        })
        .then((data) => {
          this.isNavSkeletonLoading = false;
          this.$store.commit("updateSinceTime", data.data.since_time);
          this.$forceUpdate();
          if (
            data.data.image_coverpage !== null &&
            data.data.image_coverpage !== ""
          ) {
            this.imgUrl = this.url + data.data.image_coverpage;
          }
          // this.imgUrl = require('@/assets/personal/nav.png'); //记得删除
          this.description = data.data.description;
          this.personal_url = data.data.personal_url;
          this.image_avatar = this.url + data.data.image_avatar;
          this.$forceUpdate();
          if (
            !data.data.facebook_url.includes("https://") &&
            !data.data.facebook_url.includes("http://") &&
            data.data.facebook_url !== "" &&
            data.data.facebook_url.endsWith(".com")
          ) {
            this.facebook_url = "https://" + data.data.facebook_url;
          } else if (
            (data.data.facebook_url.includes("https://") ||
              data.data.facebook_url.includes("http://")) &&
            data.data.facebook_url.endsWith(".com")
          ) {
            this.facebook_url = data.data.facebook_url;
          }

          if (
            !data.data.twitter_url.includes("https://") &&
            !data.data.twitter_url.includes("http://") &&
            data.data.twitter_url !== "" &&
            data.data.twitter_url.endsWith(".com")
          ) {
            this.twitter_url = "https://" + data.data.twitter_url;
          } else if (
            (data.data.twitter_url.includes("https://") ||
              data.data.twitter_url.includes("http://")) &&
            data.data.twitter_url.endsWith(".com")
          ) {
            this.twitter_url = data.data.twitter_url;
          }

          if (
            !data.data.pinter_url.includes("https://") &&
            !data.data.pinter_url.includes("http://") &&
            data.data.pinter_url !== "" &&
            data.data.pinter_url.endsWith(".com")
          ) {
            this.pinter_url = "https://" + data.data.pinter_url;
          } else if (
            (data.data.pinter_url.includes("https://") ||
              data.data.pinter_url.includes("http://")) &&
            data.data.pinter_url.endsWith(".com")
          ) {
            this.pinter_url = data.data.pinter_url;
          }

          if (
            !data.data.instagram_url.includes("https://") &&
            !data.data.instagram_url.includes("http://") &&
            data.data.instagram_url !== "" &&
            data.data.instagram_url.endsWith(".com")
          ) {
            this.instagram_url = "https://" + data.data.instagram_url;
          } else if (
            (data.data.instagram_url.includes("https://") ||
              data.data.instagram_url.includes("http://")) &&
            data.data.instagram_url.endsWith(".com")
          ) {
            this.instagram_url = data.data.instagram_url;
          }
          this.userName = data.data.username;
          this.userAddress = data.config.params.user_address;
          this.$forceUpdate();
        })
        .catch((error) => {
          if (error.response.status == 500) {
            this.errorCode = true;
          }
        });
      this.$forceUpdate();
      // 获取当前用户下的展馆
      this.$axios
        .get(this.url + "show_exhibition", {
          params: {
            current_address: this.$route.query.id,
          },
        })
        .then((res) => {
          if (res.data.data.length == 0) {
            this.museumPaginationShow = false;
            this.museumNoMoreData = true;
          }
          this.isMuSkeletonLoading = false;
          this.museumList = res.data.data;
          window.sessionStorage.setItem(
            "museumList",
            JSON.stringify(res.data.data)
          );
          this.$store.commit("updateMuseumList", res.data.data);
          this.total_museumPage = res.data.total_page;
          window.localStorage.setItem("participant", res.data.data.participant);
          this.$forceUpdate();
        });
      // 获取关注数和粉丝数
      this.$axios
        .get(this.url + "get_follow", {
          params: {
            user_address: address,
            current_address: this.$route.query.id,
          },
        })
        .then((res) => {
          this.count_following = res.data.count_following;
          this.count_follower = res.data.count_follower;
          this.following = res.data.following;
          this.follower = res.data.follower;
          this.followed = res.data.isFollowing;
          if (!this.followed) {
            this.followContent = this.$t("personal.follow");
            this.$forceUpdate();
          } else if (this.followed) {
            this.followContent = this.$t("personal.unFollow");
            this.$forceUpdate();
          }
        });
      // 判断一下follow按钮的状态
      if (
        this.$route.query.id.toLowerCase() !==
        this.$store.state.mainAccount.toLowerCase()
      ) {
        this.$store.commit("updateFollowShow", true);
        this.$store.commit("updateShowEditCoverPage", false);
        this.$store.commit("updateShowEditProfile", false);
      }
      if (
        this.$route.query.id.toLowerCase() ==
        this.$store.state.mainAccount.toLowerCase()
      ) {
        this.$store.commit("updateFollowShow", false);
        this.$store.commit("updateShowEditCoverPage", true);
        this.$store.commit("updateShowEditProfile", true);
      }
      if (
        this.$route.query.id.toLowerCase() ==
        this.$store.state.mainAccount.toLowerCase()
      ) {
        this.$store.commit("updateFollowShow", false);
        this.$store.commit("updateShowEditCoverPage", true);
        this.$store.commit("updateShowEditProfile", true);
      }

      ethereum.on("accountsChanged", async () => {
        const add = await window.ethereum.request({
          method: "eth_accounts",
        });
        // 把地址传给后端记录每次钱包登录的时间
        this.$axios.post(this.url + "save_sincetime_info", {
          user_address: add[0],
        });
        if (add.length == 0) {
          this.$router.push("/home");
        } else if (add.length !== 0) {
          this.$router.push("/home");
        }
      });
    }
  },
  watch: {
    userName(newValue, oldValue) {
      // newValue就是每次从personal_info中获得的
      if (newValue.length >= 15) {
        this.$refs.userName.style.fontSize = "16px";
      } else if (newValue.length == 20) {
        this.$refs.userName.style.fontSize = "12px";
      }
    },
  },
  computed: {
    rotateClass: {
      get() {
        if (this.image_avatar.indexOf("POAP") > -1) {
          return true;
        } else {
          return false;
        }
      },
    },
    followChangeInnerHTML: {
      get() {
        return window.localStorage.languageStorage;
      },
    },
    sinceTime: {
      get() {
        return this.$store.state.since_time;
      },
      set() { },
    },
    address: {
      get() {
        return this.$store.state.walletAddress;
      },
      set() { },
    },
    followShow: {
      get() {
        return this.$store.state.followShow;
      },
      set() { },
    },
    editCoverShow: {
      get() {
        return this.$store.state.showEditCoverPage;
      },
      set() { },
    },
    editProfileShow: {
      get() {
        return this.$store.state.showEditProfile;
      },
      set() { },
    },
  },
  async mounted() {
    // 将这个index清空，便于判断从discover进入show和从personal进入show
    window.sessionStorage.setItem("allMuseumIndex", null);
    window.localStorage.setItem("fromV3dApp", false);

    // 基本上是与后端交互和与钱包交互
    const address = await window.ethereum.request({
      method: "eth_accounts",
    });
    if (this.$store.state.walletAddress !== '') {
      this.mountedLoadOperation(this.$store.state.walletAddress)
    } else if (address[0] == undefined) {
      this.$router.push({
        path: "/createYours",
      });
    } else {
      this.mountedLoadOperation(address[0])
    }
  },
  destroyed() {
    this.stopSetInterval();
  },
  components: {
    Header,
    Card,
    Footer,
  },
};
</script>

<style lang="less">
@import "~@/assets/stylesheet/personal.less";
</style>
