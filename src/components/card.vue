<template>
  <div>
    <el-dialog :visible.sync="delDialog" width="30%" :close-on-click-modal="false" :show-close="false"
      custom-class="unfollowDialog" :close-on-press-escape="false" :modal-append-to-body="false">
      <i class="el-icon-error" style="color: red; font-size: 18px"></i><span> {{ $t("personal.sureToDelete") }}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelToDelMu(delDialogItem)" class="cancel">{{
            $t("addMuseum.cancel")
        }}</el-button>
        <el-button type="primary" @click="deleteExhibition(delDialogItem)" class="confirm">
          {{ $t("addMuseum.confirm") }}</el-button>
      </span>
    </el-dialog>
    <!-- 展馆部分 -->
    <ul class="card-containerMuseum" v-show="museumShow">
      <el-skeleton style="width: 100%; margin-bottom: 20px" animated :count="5" :loading="isMuSkeletonLoading"
        :throttle="500">
        <template slot="template">
          <el-skeleton-item variant="p" style="width: 100%; height: 15rem; border-radius: 10px" />
          <el-skeleton-item variant="p" style="
              width: 9%;
              height: 1rem;
              line-height: 1rem;
              border-radius: 10px;
              vertical-align: center;
              margin-right: 10px;
              margin-bottom: 5px;
            " />
          <el-skeleton-item variant="button" style="
              width: 17%;
              height: 2rem;
              border-radius: 20px;
              display: inline-block;
              margin-right: 0.5rem;
              magin-left: 0.5rem;
            " />
          <el-skeleton-item variant="button" style="
              width: 17%;
              height: 2rem;
              border-radius: 20px;
              display: inline-block;
              margin-right: 0.5rem;
              magin-left: 0.5rem;
            " />
          <el-skeleton-item variant="image" style="
              width: 3rem;
              height: 3rem;
              vertical-align: bottom;
              border-radius: 50%;
              margin-right: 12px;
              margin-bottom: 50px;
              margin-top: 10px;
            " />
        </template>
        <template></template>
      </el-skeleton>
      <li v-for="(item, index) in museumList" :key="index">
        <div class="musenumImg" @click="changeRouter(item, index)">
          <img :src="url + item.image_banner" />
          <div class="musenumImgMask">
            <div class="love" @click.stop="like">
              <!-- <img :src="unLikeImgUrl" alt="" /> -->
            </div>
            <div class="museumName">
              <span class="mname">{{ item.name }}</span>
            </div>
            <div class="great" @click.stop="favor">
              <!-- <img :src="unFavorImgUrl" alt="" /> -->
            </div>
          </div>
        </div>
        <div class="ParticipantList">
          <div class="participant">
            <div>
              <span class="part">{{ $t("personal.participant") }}</span>
              <div class="addP" v-show="isMainAddr">
                <el-popover placement="bottom" width="400" trigger="click" popper-class="addPartPop">
                  <div class="addInfo">
                    <span class="addr"><strong>{{ $t("personal.parAddr") }}:</strong></span><br />
                    <div class="addressDiv">
                      <div class="addressDivChild">
                        <el-input class="address" ref="partAddress" clearable v-model="elInputValue"></el-input>
                      </div>
                      <div class="twoBtns">
                        <el-button round :loading="paraddress" @click="addPart(item, $event)" class="add">
                          {{ $t("personal.confirm") }}
                        </el-button>
                        <el-button round :loading="delPart" @click="delePart(item, $event)" class="del">
                          {{ $t("personal.delp") }}
                        </el-button>
                      </div>
                    </div>
                  </div>
                  <el-button round class="addPart" slot="reference" @click="cleanFocusOfAdd($event)">
                    {{ $t("personal.addp") }}
                    <i class="el-icon-circle-plus-outline"></i>
                  </el-button>
                </el-popover>
              </div>
              <div class="delExi" v-show="isMainAddr">
                <el-button round class="delExhibiton" @click="openDelDialog(item, $event)" :showClose="false"
                  :showCancelButton="true" :roundButton="true">{{ $t("personal.delE") }} <i class="el-icon-delete"></i>
                </el-button>
              </div>
            </div>
            <div class="gameVisited" v-if="item.museum_type == 'EH003'">
              <svg t="1646905865068" class="icon" viewBox="0 0 1024 1024" version="1.1"
                xmlns="http://www.w3.org/2000/svg" p-id="1927" width="22" height="22">
                <path d="M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z" fill="#f49d85" p-id="1928"></path>
              </svg>
              {{ item.windymuse_visited }} players have visited WindyMuse here.
            </div>
          </div>

          <div class="pc">
            <div class="part" v-for="(item1, index1) in item.participant_avatar" :key="index1">
              <div class="rotateContainer" v-if="item1.indexOf('POAP') > -1 ? true : false"></div>
              <img :src="url + item1" :title="item.participant[index1++]" @click="showPersonal(item, item1)" />
            </div>
          </div>
        </div>
      </li>
    </ul>

    <div class="pagina" v-if="museumPaginationShow">
      <el-pagination background v-show="museumShow" :page-size="pageSize" layout="prev, pager,jumper, next"
        :total="total_museumPage * pageSize" @prev-click="handleMuseumCurrentChange"
        @next-click="handleMuseumCurrentChange" @current-change="handleMuseumCurrentChange"
        v-loading.fullscreen.lock="fullscreenLoading" :pager-count="5" :current-page.sync="realCurrentMuseumPage">
      </el-pagination>
    </div>
    <div v-if="museumNoMoreData" class="noMoreData">
      <el-empty description="Museum is empty."></el-empty>
    </div>

    <!-- heco资产部分 -->
    <ul class="card-containerCollection" v-show="collectionShow">
      <li v-for="(item, index) in collectionList" :key="index">
        <div class="collectionImg" @click="addColIndexThenEnjoyCol(item, index)">
          <img v-if="item.type == 'layer' && item.data[0].indexOf('mp4') == -1" :src="
            item.type == 'layer'
              ? url + item.data[0]
              : item.data.length > 1
                ? canvasImg
                : url + item.data[0]
          " alt="" />
          <img v-if="item.type == 'single' && item.data[0].indexOf('mp4') == -1" :src="
            item.type == 'single'
              ? url + item.data[0]
              : item.data.length > 1
                ? canvasImg
                : url + item.data[0]
          " alt="" />
          <div v-if="item.type == 'canvas' && item.data.length > 1" class="canvasDiv">
            <div v-for="(items, index) in item.data" :key="index" class="canvasImgDiv">
              <img :src="url + items" alt="" />
            </div>
          </div>
          <div v-if="item.type == 'single' && item.data[0].indexOf('mp4') > -1" class="collectVideo">
            <video ref="videoPart" :src="url + item.data[0]" controlslist="nodownload nofullscreen noremoteplayback"
              :id="item.token_id" preload></video>
          </div>
          <div class="collectionImgMask" v-if="item.label !== 'notmint'">
            <div class="love">
              <img :src="item.isLiked ? likeImgUrl : unLikeImgUrl" ref="like" alt="" @click.stop="like(item, $event)" />
            </div>
            <div class="collectionName">
              <span class="cname">{{ item.name }}</span>
            </div>
            <div class="great">
              <!-- <img :src="item.isFavored?favorImgUrl:unFavorImgUrl" ref="favor" alt=""
                @click.stop="favor(item,$event)" /> -->
            </div>
            <div class="chainCollection">
              <div class="svg">
                <img src=".././assets/hecotoken.png" class="chain" style="width: 24px; height: 24px" />
                <div class="playBtn1">
                  <i class="el-icon-view" @click.stop="playVideoOfHeco(item, item.token_id)" v-if="
                    item.type == 'single' && item.data[0].indexOf('mp4') > -1
                  "></i>
                </div>
              </div>
            </div>
          </div>
          <div class="collectionImgMaskNotmint" v-if="item.label == 'notmint'">
            <div class="collectionName">
              <span class="cname">{{ item.name }}</span>
            </div>
            <div class="chainCollection">
              <div class="svg">
                <img src=".././assets/hecotoken.png" class="chain" style="width: 24px; height: 24px" />
                <div class="playBtn1">
                  <i class="el-icon-view" @click.stop="playVideoOfHeco(item, item.token_id)" v-if="
                    item.type == 'single' && item.data[0].indexOf('mp4') > -1
                  "></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="creatorAndOwner" @click.stop="">
          <div class="creator">
            <span class="creatorSpan">{{ $t("personal.creator") }}:</span><br />
            <img :src="url + item.creator_avatar[0]" :title="item.creator" @click.stop="showPersonalCreator(item)" />
          </div>
          <div class="owner">
            <span class="ownerSpan">{{ $t("personal.owner") }}:</span><br />
            <div class="ownerDiv" v-for="(items, indexes) in item.owner_avatar" :key="indexes">
              <img :src="url + items" :title="item.owner" @click.stop="showPersonalOwner(item.owner)" />
            </div>
          </div>
        </div>
      </li>
    </ul>
    <div class="pagina" v-if="hecoPaginationShow">
      <el-pagination v-loading.fullscreen.lock="fullscreenLoading" background v-show="collectionShow"
        :page-size="pageSize" layout="prev, pager,jumper, next" :total="total_page * pageSize"
        @prev-click="handleCurrentChange" @next-click="handleCurrentChange" @current-change="handleCurrentChange"
        :pager-count="5" :current-page.sync="realCurrentCollectionPage">
      </el-pagination>
    </div>
    <div v-if="hecoNoMoreData" class="noMoreData">
      <el-empty description="IcarusArt Assets is empty."></el-empty>
    </div>

    <!-- opensea资产部分 -->
    <ul class="card-containerCollectionOfOpensea" v-show="openseaShow">
      <li v-for="(item, index) in openseaList" :key="index">
        <div class="collectionImgOfOpensea" @click="enjoyOpenseaCol(item, index, $event)">
          <img v-if="
            item.type == 'img' &&
            item.type_img !== 'svg' &&
            item.type_img !== 'mp4'
          " :src="url + item.data_img[0]" class="normalImg" />
          <img v-if="item.type == 'img' && item.type_img == 'svg'" :src="url + item.data_img[0]" class="svgimg" />
          <div v-if="item.type == 'animation' && item.type_animation == 'mp4'" class="collectVideo">
            <video ref="videoPart" :src="url + item.data_animation[0]"
              controlslist="nodownload nofullscreen noremoteplayback" :disablePictureInPicture="true"
              :id="item.opensea_id" preload></video>
          </div>
          <img v-if="
            item.type == 'animation' &&
            (item.type_animation == 'glb' || item.type_animation == 'gltf')
          " :src="url + item.data_img[0]" class="normalImg" />
          <div v-if="item.type == 'animation' && item.type_animation == 'mov'" class="collectVideo">
            <video ref="videoPart" :src="url + item.data_animation[0]"
              controlslist="nodownload nofullscreen noremoteplayback" :disablePictureInPicture="true"
              :id="item.opensea_id" preload></video>
          </div>
          <div v-if="item.type == 'animation' && item.type_animation == 'webm'" class="collectVideo">
            <video ref="videoPart" :src="url + item.data_animation[0]"
              controlslist="nodownload nofullscreen noremoteplayback" :disablePictureInPicture="true"
              :id="item.opensea_id" preload></video>
          </div>
          <div v-if="item.type == 'img' && item.type_img == 'mp4'" class="collectVideo">
            <video ref="videoPart" :src="url + item.data_img[0]" controlslist="nodownload nofullscreen noremoteplayback"
              :id="item.opensea_id" preload></video>
          </div>
          <div v-if="item.type_animation == 'mp3'" class="htmlCol">
            <img :src="url + item.data_img[0]" />
          </div>
          <div v-if="
            item.type_animation == 'HTML' || item.type_animation == 'html'
          " class="htmlCol">
            <img :src="url + item.data_img[0]" />
          </div>
          <div class="collectionImgMaskOfOpensea">
            <div class="love">
              <img :src="item.isLiked ? likeImgUrl : unLikeImgUrl" ref="like" @click.stop="likeOpensea(item, $event)" />
            </div>
            <div class="collectionName">
              <span class="cname">{{ item.name }}</span>
            </div>
            <div class="great">
              <!-- <img :src="item.isFavored?favorImgUrl:unFavorImgUrl" ref="favor"
                @click.stop="favorOpensea(item,$event)" /> -->
            </div>
            <div class="chainCollectionOfOpensea">
              <div class="svgOfOpensea">
                <img src=".././assets/OpenSea.png" class="chain" style="width: 24px; height: 24px" />
                <div class="playBtn1">
                  <i class="el-icon-view" @click.stop="playVideo(item, item.opensea_id)" v-if="
                    item.type == 'animation' && item.type_animation == 'mp4'
                  "></i>
                  <i class="el-icon-view" @click.stop="playVideo(item, item.opensea_id)" v-if="
                    item.type == 'animation' && item.type_animation == 'mov'
                  "></i>
                  <i class="el-icon-view" @click.stop="playVideo(item, item.opensea_id)" v-if="
                    item.type == 'animation' && item.type_animation == 'webm'
                  "></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="creatorAndOwner" @click.stop="">
          <!-- creator -->
          <div class="creator">
            <span class="creatorSpan">{{ $t("personal.creator") }}:</span><br />
            <img :src="url + item.creator_avatar[0]" :title="item.creator" @click.stop="showPersonalCreator(item)" />
          </div>
          <div class="owner">
            <span class="ownerSpan">{{ $t("personal.owner") }}:</span><br />
            <div class="ownerDiv" v-for="(items, indexes) in item.owner_avatar" :key="indexes">
              <img :src="url + items" :title="item.owner" @click.stop="showPersonalOwner(item.owner)" />
            </div>
          </div>
        </div>
      </li>
    </ul>
    <div class="pagina" v-if="openseaPaginationShow">
      <el-pagination background v-show="openseaShow" :page-size="pageSize" layout="prev, pager,jumper, next"
        :total="total_openseaPage * pageSize" @prev-click="handleCurrentOpenseaChange"
        @next-click="handleCurrentOpenseaChange" @current-change="handleCurrentOpenseaChange"
        v-loading.fullscreen.lock="fullscreenLoading" :pager-count="5" :current-page.sync="realCurrentOpenseaPage">
      </el-pagination>
    </div>
    <div v-if="openseaNoMoreData" class="noMoreData">
      <el-empty description="Opensea Assets is empty."></el-empty>
    </div>

    <!-- POAP -->
    <ul class="card-containerCollectionOfPoap animate__animated animate__slideInDown" v-show="poapShow">
      <li class="poapItems" v-for="(item, index) in poapList" :key="index">
        <img :src="url + item.data[0]" alt="" class="poapImg" />
        <div class="shadowBox"></div>
      </li>
    </ul>
    <div class="pagina" v-if="poapPaginationShow">
      <el-pagination background v-show="poapShow" :page-size="pageSize" layout="prev, pager,jumper, next"
        :total="total_poapPage * pageSize" @prev-click="handlePoapCurrentChange" @next-click="handlePoapCurrentChange"
        @current-change="handlePoapCurrentChange" v-loading.fullscreen.lock="fullscreenLoading" :pager-count="5"
        :current-page.sync="realCurrentPoapPage">
      </el-pagination>
    </div>
    <div v-if="poapPaginationNoMoreData" class="noMoreData">
      <el-empty description="POAP is empty."></el-empty>
    </div>

    <!-- 收藏的资产部分 -->
    <ul class="card-containerLike" v-show="likeShow">
      <li v-for="(item, index) in likeList" :key="index">
        <div class="likeImg" @click="enjoyLikeCol(item, index)">
          <!-- heco -->
          <img v-if="item.type == 'layer' && item.data[0].indexOf('mp4') == -1" :src="
            item.type == 'layer'
              ? url + item.data[0]
              : item.data.length > 1
                ? canvasImg
                : url + item.data[0]
          " alt="" />
          <img v-if="item.type == 'single' && item.data[0].indexOf('mp4') == -1" :src="
            item.type == 'single'
              ? url + item.data[0]
              : item.data.length > 1
                ? canvasImg
                : url + item.data[0]
          " alt="" />
          <div v-if="item.type == 'canvas' && item.data.length > 1" class="canvasDiv">
            <div v-for="(items, index) in item.data" :key="index" class="canvasImgDiv">
              <img :src="url + items" alt="" />
            </div>
          </div>
          <div v-if="item.type == 'single' && item.data[0].indexOf('mp4') > -1" class="likeVideo">
            <video ref="videoPart" :src="url + item.data[0]" preload :id="item.token_id"></video>
          </div>
          <!-- opensea -->
          <img v-if="
            item.type == 'img' &&
            item.type_img !== 'svg' &&
            item.type_img !== 'mp4'
          " :src="url + item.data_img[0]" class="normalImg" />
          <img v-if="item.type == 'img' && item.type_img == 'svg'" :src="url + item.data_img[0]" class="svgimg" />
          <img v-if="
            item.type == 'animation' &&
            (item.type_animation == 'glb' || item.type_animation == 'gltf')
          " :src="url + item.data_img[0]" class="normalImg" />
          <div v-if="item.type == 'animation' && item.type_animation == 'mp4'" class="likeVideo">
            <video ref="videoPart" :src="url + item.data_animation[0]" preload :id="item.opensea_id"></video>
          </div>
          <div v-if="item.type == 'img' && item.type_img == 'mp4'" class="likeVideo">
            <video ref="videoPart" :src="url + item.data_img[0]" preload :id="item.opensea_id"></video>
          </div>
          <div v-if="item.type_animation == 'mp3'" class="htmlCol">
            <img :src="url + item.data_img[0]" />
          </div>
          <div v-if="
            item.type_animation == 'HTML' || item.type_animation == 'html'
          " class="htmlCol">
            <img :src="url + item.data_img[0]" />
          </div>
          <div class="likeImgMask">
            <div class="collectionName">
              <span class="cname">{{ item.name }}</span>
            </div>
            <div class="chainCollection">
              <div class="svg" v-if="item.label == 'HECO'">
                <img src=".././assets/hecotoken.png" class="chain" style="width: 24px; height: 24px" />
                <div class="playBtn1">
                  <i class="el-icon-view" @click.stop="playVideoOfLike(item, item.token_id)" v-if="
                    item.type == 'single' && item.data[0].indexOf('mp4') > -1
                  " :id="index"></i>
                </div>
              </div>
              <div class="svgOfOpensea" v-if="item.label == 'opensea'">
                <img src=".././assets/OpenSea.png" class="chain" style="width: 24px; height: 24px" />
                <div class="playBtn1">
                  <i class="el-icon-view" @click.stop="playVideo(item, item.opensea_id)" v-if="
                    item.type == 'animation' && item.type_animation == 'mp4'
                  " :id="index"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <div class="pagina" v-if="likePaginationShow">
      <el-pagination background v-show="likeShow" :page-size="pageSize" layout="prev, pager,jumper, next"
        :total="total_likedPage * pageSize" @prev-click="handleLikeCurrentChange" @next-click="handleLikeCurrentChange"
        @current-change="handleLikeCurrentChange" v-loading.fullscreen.lock="fullscreenLoading" :pager-count="5"
        :current-page.sync="realCurrentLikedPage">
      </el-pagination>
    </div>
    <div v-if="likeNoMoreData" class="noMoreData">
      <el-empty description="The Assets you like is empty."></el-empty>
    </div>

    <!-- 拥有的皮肤 -->
    <ul class="ownedskin" v-if="skinShow">
      <li :class="
        time == 'night'
          ? 'animate__animated animate__jackInTheBox ownedskin__li'
          : 'animate__animated animate__jackInTheBox ownedksin__li__Morning'
      ">
        <div class="ownedskin_container">
          <div class="ownedskin__img">
            <img :src="skinIMgList[0].imgLink" alt="" />
          </div>
          <div class="animate__animated animate__jackInTheBox ownedskin__text" v-if="skinTextShow">
            <div class="ownedskin__t1">
              <table>
                <tr>
                  <td>{{ $t("card.alreadyHave") }}:</td>
                  <td>{{ skinList["EH001"][0] }}</td>
                </tr>
                <tr>
                  <td>{{ $t("card.skinBalance") }}:</td>
                  <td>{{ skinList["EH001"][1] }}</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </li>
      <li :class="
        time == 'night'
          ? 'animate__animated animate__jackInTheBox ownedskin__li'
          : 'animate__animated animate__jackInTheBox ownedksin__li__Morning'
      ">
        <div class="ownedskin_container">
          <div class="ownedskin__img">
            <img :src="skinIMgList[1].imgLink" alt="" />
          </div>
          <div class="animate__animated animate__jackInTheBox ownedskin__text" v-if="skinTextShow">
            <div class="ownedskin__t1">
              <table>
                <tr>
                  <td>{{ $t("card.alreadyHave") }}:</td>
                  <td>{{ skinList["EH002"][0] }}</td>
                </tr>
                <tr>
                  <td>{{ $t("card.skinBalance") }}:</td>
                  <td>{{ skinList["EH002"][1] }}</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </li>
      <li :class="
        time == 'night'
          ? 'animate__animated animate__jackInTheBox ownedskin__li'
          : 'animate__animated animate__jackInTheBox ownedksin__li__Morning'
      ">
        <div class="ownedskin_container">
          <div class="ownedskin__img">
            <img :src="skinIMgList[2].imgLink" alt="" />
          </div>
          <div class="animate__animated animate__jackInTheBox ownedskin__text" v-if="skinTextShow">
            <div class="ownedskin__t1">
              <table>
                <tr>
                  <td>{{ $t("card.alreadyHave") }}:</td>
                  <td>{{ skinList["EH003"][0] }}</td>
                </tr>
                <tr>
                  <td>{{ $t("card.skinBalance") }}:</td>
                  <td>{{ skinList["EH003"][1] }}</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import "animate.css";
// import $ from "jquery";
export default {
  props: [
    "museumList",
    "collectionList",
    "openseaList",
    "poapList",
    "mp3List",
    "likeList",
    "skinList",
    "museumShow",
    "collectionShow",
    "likeShow",
    "skinShow",
    "skinTextShow",
    "openseaShow",
    "mp3Show",
    "poapShow",
    "poapPaginationShow",
    "poapPaginationNoMoreData",
    "museumPaginationShow",
    "museumNoMoreData",
    "hecoPaginationShow",
    "hecoNoMoreData",
    "openseaPaginationShow",
    "openseaNoMoreData",
    "likePaginationShow",
    "likeNoMoreData",
    "total_museumPage",
    "total_page",
    "total_likedPage",
    "total_openseaPage",
    "total_poapPage",
    "total_mp3Page",
    "currentPageOfMuseum",
    "currentCollectionPage",
    "currentLikePage",
    "currentOpenseaPage",
    "currentPoapPage",
    "currentMp3Page",
    "isMuSkeletonLoading",
  ],
  data() {
    return {
      hecoSkeletonLoading: true,
      delDialog: false, //控制删除展馆的对话框的显示于隐藏
      elInputValue: "",
      isMainAddr: false,
      delPart: false,
      paraddress: false,
      language: window.localStorage.getItem("languageStorage") || "en",
      visible: false,
      favorNum: 0,
      pageSize: 8,
      currentPage: "", //当前是第几页，需要发送给后端的
      currentMuseumPage: "",
      realCurrentLikedPage: this.currentLikePage,
      realCurrentCollectionPage: this.currentCollectionPage,
      realCurrentMuseumPage: this.currentPageOfMuseum,
      realCurrentOpenseaPage: this.currentOpenseaPage,
      realCurrentPoapPage: this.currentPoapPage,
      isLoading: false,
      canvasImg: false,
      fullscreenLoading: false,
      url: window.urls,
      likeImgUrl: require("../assets/card/like.png"),
      unLikeImgUrl: require("../assets/card/unlike.png"),
      favorImgUrl: require("../assets/card/favor.png"),
      unFavorImgUrl: require("../assets/card/unfavor.png"),
      showLike: false,
      showfavor: false,
      mainAddr: this.$store.state.mainAccount,
      skeletonOfMuseumLoading: this.isLoading,
      delDialogItem: "",
      showBtns: [],
      showBtnsOfHeco: [],
      skinIMgList: [
        {
          imgLink: require("../assets/setUp/1.png"),
        },
        {
          imgLink: require("../assets/setUp/2.png"),
        },
        {
          imgLink: require("../assets/setUp/3.png"),
        },
      ],
      meta: [
        // Twitter Card
        {
          name: "twitter:card",
          content: "summary",
        },
        {
          name: "twitter:title",
          content: "Vue Social Cards Example",
        },
        {
          name: "twitter:description",
          content: "Vue sample site showing off Twitter and Facebook Cards.",
        },
        // image must be an absolute path
        {
          name: "twitter:image",
          content: this.logo,
        },
      ],
    };
  },

  methods: {
    playVideo(item, index) {
      var newShowPlayObj = {
        showPlay: true,
        showPause: false,
      };
      this.showBtns[index] = newShowPlayObj;
      var myVideo = document.getElementsByTagName("video");
      for (let i = 0; i < myVideo.length; i++) {
        if (myVideo[i].id == index) {
          if (myVideo[i].paused) {
            myVideo[i].play();
          } else {
            myVideo[i].pause();
          }
        }
      }
    },
    playVideoOfHeco(item, index) {
      var myVideo = document.getElementsByTagName("video");
      for (let i = 0; i < myVideo.length; i++) {
        if (myVideo[i].id == index) {
          if (myVideo[i].paused) {
            myVideo[i].play();
          } else {
            myVideo[i].pause();
          }
        }
      }
    },
    playVideoOfLike(item, index) {
      var myVideo = document.getElementsByTagName("video");
      for (let i = 0; i < myVideo.length; i++) {
        if (myVideo[i].id == index) {
          if (myVideo[i].paused) {
            myVideo[i].play();
          } else {
            myVideo[i].pause();
          }
        }
      }
    },
    cancelToDelMu(item) {
      this.delDialog = false;
    },
    // 打开heco资产的详情页面
    addColIndexThenEnjoyCol(item, index) {
      window.sessionStorage.setItem("collectionIndex", index);
      var realPath = "collection";
      let route = this.$router.resolve({
        path: realPath,
        query: {
          label: item.label,
          token_id: item.token_id,
        },
      });
      window.open(route.href, "_blank");
    },
    // 打开收藏的资产的详细页面
    enjoyLikeCol(item, index) {
      window.sessionStorage.setItem("likeCollectionIndex", index);
      var realPath = "collection";
      if (
        item.label == "HECO" ||
        item.label == "heco" ||
        item.label == "Heco"
      ) {
        // window.sessionStorage.setItem('showCollection',true);
        // window.sessionStorage.setItem('showOpenseaCollection',false)
        let route = this.$router.resolve({
          path: realPath,
          query: {
            label: "heco",
            token_id: item.token_id,
          },
        });
        window.open(route.href, "_blank");
      } else if (item.label == "opensea" || item.label == "Opensea") {
        // window.sessionStorage.setItem('showCollection',false);
        // window.sessionStorage.setItem('showOpenseaCollection',true)
        let route = this.$router.resolve({
          path: realPath,
          query: {
            label: "opensea",
            opensea_id: item.opensea_id,
          },
        });
        window.open(route.href, "_blank");
      }
    },
    enjoyOpenseaCol(item, index, event) {
      window.sessionStorage.setItem("openseaCollectionIndex", index);
      if (
        event.target.innerText == item.name &&
        item.type_animation == "html"
      ) {
        var realPath = "collection";
        let route = this.$router.resolve({
          path: realPath,
          query: {
            label: "opensea",
            opensea_id: JSON.parse(
              window.sessionStorage.getItem("openseaList")
            )[index].opensea_id,
          },
        });
        window.open(route.href, "_blank");
      } else {
        var realPath = "collection";
        let route = this.$router.resolve({
          path: realPath,
          query: {
            label: "opensea",
            opensea_id: JSON.parse(
              window.sessionStorage.getItem("openseaList")
            )[index].opensea_id,
          },
        });
        window.open(route.href, "_blank");
      }
    },
    // blur()是用来移除焦点
    cleanFocusOfAdd(event) {
      let target = event.target;
      if (target.nodeName == "BUTTON" || target.nodeName == "SPAN") {
        target.parentNode.blur();
      }
      target.blur();
    },
    cleanFocusOfDel(event) {
      let target = event.target;
      if (target.nodeName == "BUTTON" || target.nodeName == "SPAN") {
        target.parentNode.blur();
      }
      target.blur();
    },
    // 让el-button点击后会回复原来按钮的状态
    handleBtnClick(event) {
      let target = event.target;
      if (target.nodeName == "BUTTON" || target.nodeName == "SPAN") {
        target.parentNode.blur();
      }
      target.blur();
    },
    // 弹窗打开方法,打开删除展馆的弹窗
    open(item, event) {
      this.cleanFocusOfDel(event);
      this.delDialog = true;
    },
    openDelDialog(item, event) {
      this.cleanFocusOfDel(event);
      this.delDialog = true;
      this.delDialogItem = item;
    },
    // 添加策展人
    addPart(item, event) {
      this.handleBtnClick(event);
      if (this.elInputValue == "" || this.elInputValue == null) {
        this.paraddress = false;
        this.$notify({
          title: this.$t("personal.haveToInsertPartAddr"),
          type: "error",
        });
      } else {
        this.paraddress = true;
        var formData = new FormData();
        formData.append("museum_id", item.museum_id);
        formData.append("target_address", this.elInputValue);
        this.$axios
          .post(this.url + "add_participant/add", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            this.paraddress = false;
            this.elInputValue = "";
            this.$notify({
              title: this.$t("personal.addSuccess"),
              type: "success",
            });
            window.location.reload();
          })
          .catch((error) => { });
      }
    },
    // 删除策展人
    delePart(item, event) {
      this.handleBtnClick(event);
      if (this.elInputValue == "" || this.elInputValue == null) {
        this.$notify({
          title: this.$t("personal.haveToInsertPartAddr"),
          type: "error",
        });
      } else {
        var formData = new FormData();
        formData.append("museum_id", item.museum_id);
        formData.append("target_address", this.elInputValue);
        this.$axios
          .post(this.url + "add_participant/delete", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            this.elInputValue = "";
            // window.location.reload();
            this.$emit("refreshExhibitionWhenDelete", "deleteSuccess");
          })
          .catch((error) => {
            this.$notify({
              title: this.$t("personal.deleteSuccess"),
              type: "success",
            });
            // window.location.reload();
            this.$emit("refreshExhibitionWhenDelete", "deleteSuccess");
          });
      }
    },
    // 删除展馆
    async deleteExhibition(item) {
      var formData = new FormData();
      formData.append("museum_id", item.museum_id);
      await this.$axios
        .post(this.url + "delete_exhibition", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          this.$notify({
            title: this.$t("personal.deleteSuccess"),
            type: "success",
          });
          this.cancelToDelMu(item);
          this.$emit("refreshExhibitionWhenDelete", "deleteSuccess");
        });
    },
    // 全屏加载,用isLoading和fullscreenLoading进行控制
    openFullScreen1() {
      if (this.isLoading == true) {
        this.fullscreenLoading = true;
      }
      if (this.isLoading == false) {
        this.fullscreenLoading = false;
      }
    },
    // element-ui自带的方法
    handleSizeChange(val) { },
    // 针对资产的检测当前页数的方法。我使用了分页，当页数改变的时候就会自动调用这个方法，并向后端发起请求拿数据
    async handleCurrentChange(val) {
      this.$emit("currentCollectionPageChange", val);
      const address = await window.ethereum.request({
        method: "eth_accounts",
      });
      this.currentPage = val;
      // 要发送给后端，根据当前页去请求对应的资产
      // 让全屏加载
      this.isLoading = true;
      this.openFullScreen1();
      this.$axios
        .get(this.url + "get_collects/owned", {
          params: {
            user_address: address[0],
            current_address: this.$route.query.id,
            page: this.currentPage,
          },
        })
        .then((res) => {
          window.sessionStorage.setItem(
            "collectionList",
            JSON.stringify(res.data.data)
          );
          this.$emit("collectionListChange", res.data.data);
          //等请求成功了就结束加载
          this.isLoading = false;
          this.openFullScreen1();
        });
    },
    // 对于opensea的资产
    async handleCurrentOpenseaChange(val) {
      this.$emit("currentOpenseaPageChange", val);
      const address = await window.ethereum.request({
        method: "eth_accounts",
      });
      // 要发送给后端，根据当前页去请求对应的资产
      // 让全屏加载
      this.isLoading = true;
      this.openFullScreen1();
      this.$axios
        .get(this.url + "get_collects/opensea", {
          params: {
            user_address: address[0],
            current_address: this.$route.query.id,
            page: val,
          },
        })
        .then((res) => {
          window.sessionStorage.setItem(
            "openseaList",
            JSON.stringify(res.data.data)
          );
          this.$emit("openseaListChange", res.data.data);
          //等请求成功了就结束加载
          this.isLoading = false;
          this.openFullScreen1();
        });
    },
    // 针对展馆的方法，作用同上
    handleMuseumCurrentChange(val) {
      this.$emit("currentMuseumPageChange", val);
      this.currentMuseumPage = val;
      // 要发送给后端，根据当前页去请求对应的资产
      // 让全屏加载
      this.isLoading = true;
      this.openFullScreen1();
      this.$axios
        .get(this.url + "show_exhibition", {
          params: {
            current_address: this.$route.query.id,
            page: this.currentMuseumPage,
          },
        })
        .then((res) => {
          this.$emit("museumListChange", res.data.data);
          //等请求成功了就结束加载
          this.isLoading = false;
          this.openFullScreen1();
        });
    },
    // 针对poap资产
    async handlePoapCurrentChange(val) {
      this.$emit("currentPoapPageChange", val);
      const address = await window.ethereum.request({
        method: "eth_accounts",
      });
      // 要发送给后端，根据当前页去请求对应的资产
      // 让全屏加载
      this.isLoading = true;
      this.openFullScreen1();
      // 发送请求的部分，拿poap的资产
      this.$axios
        .get(this.url + "get_collects/poap", {
          params: {
            current_address: this.$route.query.id,
            page: this.currentPoapPage,
          },
        })
        .then((res) => {
          this.$emit("poapListChange", res.data.data);
          //等请求成功了就结束加载
          this.isLoading = false;
          this.openFullScreen1();
        });
    },
    // 针对收藏的资产
    async handleLikeCurrentChange(val) {
      this.$emit("currentLikedPageChange", val);
      const address = await window.ethereum.request({
        method: "eth_accounts",
      });
      // 要发送给后端，根据当前页去请求对应的资产
      // 让全屏加载
      this.isLoading = true;
      this.openFullScreen1();
      // 发送请求的部分，拿收藏了的资产
      this.$axios
        .get(this.url + "get_collects/liked", {
          params: {
            current_address: this.$route.query.id,
            page: val,
          },
        })
        .then((res) => {
          this.$emit("likeListChange", res.data.data);
          window.sessionStorage.setItem(
            "likeList",
            JSON.stringify(res.data.data)
          );

          //等请求成功了就结束加载
          this.isLoading = false;
          this.openFullScreen1();
        });
    },
    changeRouter(data, index) {
      this.$store.commit("updateMuseumList", data);
      document.title = data.name;
      window.sessionStorage.setItem(
        "mType",
        this.museumList[index].museum_type
      );
      // 用于在index.js中，点击展馆的时候，看一下当前用户是不是参与者的一员，也就是点击展馆的时候，看一下当前是第几个展馆
      window.sessionStorage.setItem("museumIndex", index);
      this.$store.commit("updateMuseumIndex", index);
      var participants = data.participant;
      var realPath = "";
      for (let index in participants) {
        if (
          this.$store.state.mainAccount.toLowerCase() ==
          participants[index].toLowerCase()
        ) {
          realPath = "/show";
          break;
        } else {
          realPath = "/browsing";
        }
      }
      if (realPath == "/browsing") {
        this.$router.push({
          path: realPath,
          query: {
            model: data.museum_type,
            // scale: 1,
            museumId: data.museum_id,
          },
          alias: data.name,
        });
      } else if (realPath == "/show") {
        this.$router.push({
          path: realPath,
          query: {
            model: data.museum_type,
            // scale: 1,
            museumId: data.museum_id,
          },
          alias: data.name,
        });
      }
    },
    showPersonal(item, item1) {
      for (let i in item.participant_avatar) {
        if (item1 == item.participant_avatar[i]) {
          var realPath = "/personal";
          let route = this.$router.resolve({
            path: realPath,
            query: {
              id: item.participant[i],
            },
          });
          window.open(route.href, "_blank");
        }
      }
    },
    showPersonalCreator(data) {
      var realPath = "/personal";
      let route = this.$router.resolve({
        path: realPath,
        query: {
          id: data.creator,
        },
      });
      window.open(route.href, "_blank");
    },
    showPersonalOwner(data) {
      var realPath = "/personal";
      let route = this.$router.resolve({
        path: realPath,
        query: {
          id: data,
        },
      });
      window.open(route.href, "_blank");
    },
    // 资产的收藏功能
    async like(item, event) {
      var likeOrUnlike;
      const address = await window.ethereum.request({
        method: "eth_accounts",
      });
      var formData2 = new FormData();
      formData2.append("user_address", address);
      formData2.append("label", item.label);
      formData2.append("token_id", item.token_id);
      await this.$axios
        .post(this.url + "get_collects_single", formData2, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          likeOrUnlike = res.data.isLiked;
        });

      var formData = new FormData();
      // 执行unlike
      var if1 = event.target.src == this.likeImgUrl;
      var if2 = event.target.src == this.unLikeImgUrl;
      if (likeOrUnlike == true && if1 == true) {
        event.target.src = this.unLikeImgUrl;
        formData.append("token_id", item.token_id);
        formData.append("user_address", this.$store.state.mainAccount);
        this.$axios
          .post(this.url + "collections_state/heco/unlike", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => { });
      }
      if (likeOrUnlike == false && if2 == true) {
        // 这里执行like
        event.target.src = this.likeImgUrl;
        formData.append("token_id", item.token_id);
        formData.append("user_address", this.$store.state.mainAccount);
        this.$axios
          .post(this.url + "collections_state/heco/like", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => { });
      }
    },
    // opensea资产的收藏功能
    async likeOpensea(item, event) {
      var likeOrUnlike;
      const address = await window.ethereum.request({
        method: "eth_accounts",
      });
      await this.$axios
        .get(this.url + "get_collects/opensea", {
          params: {
            user_address: address[0],
            current_address: this.$route.query.id,
            page: this.currentOpenseaPage,
          },
        })
        .then((res) => {
          for (let i in res.data.data) {
            if (item.opensea_id == res.data.data[i].opensea_id) {
              likeOrUnlike = res.data.data[i].isLiked;
              break;
            }
          }
        });

      var formData = new FormData();
      // 执行unlike
      var if1 = event.target.src == this.likeImgUrl;
      var if2 = event.target.src == this.unLikeImgUrl;
      if (likeOrUnlike == true && if1 == true) {
        event.target.src = this.unLikeImgUrl;
        formData.append("token_id", item.opensea_id);
        formData.append("user_address", this.$store.state.mainAccount);

        this.$axios
          .post(this.url + "collections_state/opensea/unlike", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => { });
      }
      if (likeOrUnlike == false && if2 == true) {
        // 这里执行like
        event.target.src = this.likeImgUrl;
        formData.append("token_id", item.opensea_id);
        formData.append("user_address", this.$store.state.mainAccount);

        this.$axios
          .post(this.url + "collections_state/opensea/like", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => { });
      }
    },
    // 资产的点赞功能
    async favor(item, event) {
      var favorOrUnfavor;
      const address = await window.ethereum.request({
        method: "eth_accounts",
      });
      await this.$axios
        .get(this.url + "get_collects/owned", {
          params: {
            user_address: address[0],
            current_address: this.$route.query.id,
            page: this.currentPage,
          },
        })
        .then((res) => {
          for (let i in res.data.data) {
            if (item.token_id == res.data.data[i].token_id) {
              favorOrUnfavor = res.data.data[i].isFavored;
              break;
            }
          }
        });
      var formData = new FormData();
      // 点击的时候，图标已经是显示favor状态了
      var if1 = event.target.src == this.favorImgUrl;
      // 点击的时候，图标已经是显示unFavor状态了
      var if2 = event.target.src == this.unFavorImgUrl;
      // 如果favorOrUnfavor为true，说明已经是favor状态了，点击则要执行unfavor
      if (favorOrUnfavor == true && if1 == true) {
        formData.append("token_id", item.token_id);
        formData.append("user_address", address[0]);
        this.$axios
          .post(this.url + "collections_state/heco/unfavor", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            event.target.src = this.unFavorImgUrl;
          });
      }
      if (favorOrUnfavor == false && if2 == true) {
        event.target.src = this.favorImgUrl;
        formData.append("token_id", item.token_id);
        formData.append("user_address", this.$store.state.mainAccount);

        this.$axios
          .post(this.url + "collections_state/heco/favor", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => { });
      }
    },
    // opensea资产的点赞功能
    async favorOpensea(item, event) {
      var favorOrUnfavor;
      const address = await window.ethereum.request({
        method: "eth_accounts",
      });
      await this.$axios
        .get(this.url + "get_collects/opensea", {
          params: {
            user_address: address[0],
            current_address: this.$route.query.id,
            page: this.currentOpenseaPage,
          },
        })
        .then((res) => {
          for (let i in res.data.data) {
            if (item.opensea_id == res.data.data[i].opensea_id) {
              favorOrUnfavor = res.data.data[i].isFavored;
              break;
            }
          }
        });
      var formData = new FormData();
      var if1 = event.target.src == this.favorImgUrl;
      var if2 = event.target.src == this.unFavorImgUrl;
      if (favorOrUnfavor == true && if1 == true) {
        event.target.src = this.unFavorImgUrl;
        formData.append("token_id", item.opensea_id);
        formData.append("user_address", this.$store.state.mainAccount);

        this.$axios
          .post(this.url + "collections_state/opensea/unfavor", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => { });
      }
      if (favorOrUnfavor == false && if2 == true) {
        event.target.src = this.favorImgUrl;
        formData.append("token_id", item.opensea_id);
        formData.append("user_address", this.$store.state.mainAccount);

        this.$axios
          .post(this.url + "collections_state/opensea/favor", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => { });
      }
    },
  },
  computed: {
    time: {
      get() {
        return this.$store.state.time;
      },
      set() { },
    },
    mainAccount: {
      get() {
        return this.$store.state.mainAccount;
      },
      set() { },
    },
  },
  watch: {
    museumList(newValue, oldValue) { },
    time() {
      this.statuses = this.$store.state.statuses;
    },
    currentLikePage(newValue, oldValue) {
      this.realCurrentLikedPage = newValue;
    },
    currentCollectionPage(newValue, oldValue) {
      this.realCurrentCollectionPage = newValue;
    },
    currentOpenseaPage(newValue, oldValue) {
      this.realCurrentOpenseaPage = newValue;
    },
  },
  mounted() {
    if (this.$route.query.id.toLowerCase() == this.mainAddr.toLowerCase()) {
      this.isMainAddr = true;
    } else {
      this.isMainAddr = false;
    }
    // 改变了一下分页中的文字，因为是中文，现在网站都是英文，我就改成英文了，没找到改的方法，element-ui没提供，索性直接操作dom
    document.getElementsByClassName(
      "el-pagination__jump"
    )[0].childNodes[0].nodeValue = "";
    document.getElementsByClassName(
      "el-pagination__jump"
    )[0].childNodes[2].nodeValue = "";
  },
};
</script>

<style lang="less">
@import "~@/assets/stylesheet/card.less";
</style>
