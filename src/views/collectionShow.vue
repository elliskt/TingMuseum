<template>
    <div class="collection">
        <Header></Header>
        <div :class="time==='night'?'outer':'outer'">
            <div class="colItem">
                <div class="colItem_center">
                    <!-- 放资产的图片 -->
                    <div class="colItem_bg">
                        <div class="colItem_preview">
                            <!-- heco的图片 -->
                            <img v-viewer v-if="showLayer&& fromV3d == 'false'" :src="layerUrl" class="onlyImg">
                            <!-- 接下来的两个放的是当前资产的like和unlike的状态 -->
                            <div class="likeNotmint"
                                v-if="showLayer&& fromV3d == 'false' && likeOrUnlike && showLikeOrUnlike" @click="like">
                                <svg class="icon icon-heart-fill">
                                    <use xlink:href="#icon-heart-fill" fill="red"></use>
                                </svg>
                            </div>
                            <div class="likeNotmint"
                                v-if="showLayer&& fromV3d == 'false' && !likeOrUnlike && showLikeOrUnlike"
                                @click="like">
                                <svg class="icon icon-heart">
                                    <use xlink:href="#icon-heart"></use>
                                </svg>
                            </div>
                            <!-- heco的视频 -->
                            <video v-if="showSingle&& fromV3d == 'false'" :src="singleUrl" controls autoplay
                                loop></video>
                            <div class="likeNotmint"
                                v-if="showSingle&& fromV3d == 'false' && likeOrUnlike && showLikeOrUnlike"
                                @click="like">
                                <svg class="icon icon-heart-fill">
                                    <use xlink:href="#icon-heart-fill" fill="red"></use>
                                </svg>
                            </div>
                            <div class="likeNotmint"
                                v-if="showSingle&& fromV3d == 'false' && !likeOrUnlike && showLikeOrUnlike"
                                @click="like">
                                <svg class="icon icon-heart">
                                    <use xlink:href="#icon-heart"></use>
                                </svg>
                            </div>
                            <!-- heco的canvas（多图层） -->
                            <div v-viewer v-if="showCanvas && fromV3d == 'false'"
                                class="colItem_preview-canvasContainer">
                                <div v-for="(item,index) in canvasList" :key="index" class="colItem_preview-canvas">
                                    <img :src=url+item alt="">
                                </div>
                            </div>
                            <div class="likeNotmint"
                                v-if="showCanvas&& fromV3d == 'false' && likeOrUnlike && showLikeOrUnlike"
                                @click="like">
                                <svg class="icon icon-heart-fill">
                                    <use xlink:href="#icon-heart-fill" fill="red"></use>
                                </svg>
                            </div>
                            <div class="likeNotmint"
                                v-if="showCanvas&& fromV3d == 'false' && !likeOrUnlike && showLikeOrUnlike"
                                @click="like">
                                <svg class="icon icon-heart">
                                    <use xlink:href="#icon-heart"></use>
                                </svg>
                            </div>
                            <!-- notmint的图片 -->
                            <img v-viewer v-if="showNotmintLayer && fromV3d == 'false'" :src="notmintLayerUrl" alt=""
                                class="onlyImg">
                            <!-- notmint的视频 -->
                            <video v-if="showNotmintSingle && fromV3d == 'false'" :src="notmintSingleUrl" controls
                                autoplay loop></video>
                            <!-- notmint的canvas（多图层） -->
                            <div v-viewer v-if="showNotmintCanvas && fromV3d == 'false'"
                                class="colItem_preview-canvasContainer">
                                <div v-for="(item,index) in notMintCanvasList" :key="index"
                                    class="colItem_preview-canvas">
                                    <img :src=url+item alt="">
                                </div>
                            </div>
                            <!-- opensea图片 -->
                            <img v-viewer v-if="showOpenseaImg && fromV3d == 'false'" :src="openseaImgURL"
                                class="onlyImg">
                            <!-- <img v-viewer v-if="showOpenseaGLBImg && fromV3d == 'false'" :src="openseaImgURLGLB"
                                class="onlyImg"> -->
                            <!-- glb模型 -->
                            <div class="model" v-if="showOpenseaGLBImg && fromV3d == 'false'">
                                <model-viewer class="model_viewer" autoplay camera-controls auto-rotate="true"
                                    :src="openseaImgURLGLB">
                                </model-viewer>
                            </div>
                            <div class="model" v-if="showOpenseaGLTFImg && fromV3d == 'false'">
                                <model-viewer class="model_viewer" autoplay camera-controls auto-rotate="true"
                                    :src="openseaImgURLGLTF">
                                </model-viewer>
                            </div>
                            <div class="likeNotmint"
                                v-if="showOpenseaImg&& fromV3d == 'false' && likeOrUnlike && showLikeOrUnlike"
                                @click="likeOpensea">
                                <svg class="icon icon-heart-fill">
                                    <use xlink:href="#icon-heart-fill" fill="red"></use>
                                </svg>
                            </div>
                            <div class="likeNotmint"
                                v-if="showOpenseaImg&& fromV3d == 'false' && !likeOrUnlike && showLikeOrUnlike"
                                @click="likeOpensea">
                                <svg class="icon icon-heart">
                                    <use xlink:href="#icon-heart"></use>
                                </svg>
                            </div>
                            <div class="likeNotmint"
                                v-if="showOpenseaGLBImg&& fromV3d == 'false' && likeOrUnlike && showLikeOrUnlike"
                                @click="likeOpensea">
                                <svg class="icon icon-heart-fill">
                                    <use xlink:href="#icon-heart-fill" fill="red"></use>
                                </svg>
                            </div>
                            <div class="likeNotmint"
                                v-if="showOpenseaGLBImg&& fromV3d == 'false' && !likeOrUnlike && showLikeOrUnlike"
                                @click="likeOpensea">
                                <svg class="icon icon-heart">
                                    <use xlink:href="#icon-heart"></use>
                                </svg>
                            </div>
                            <!-- opensea的mp3 -->
                            <img v-viewer v-if="showOpenseaMp3&& fromV3d == 'false'" :src="openseaImgURL"
                                class="onlyImg">
                            <audio v-if="showOpenseaMp3&& fromV3d == 'false'" :src="openseaMp3URL" controls autoplay
                                loop></audio>
                            <div class="likeNotmint"
                                v-if="showOpenseaMp3&& fromV3d == 'false' && likeOrUnlike && showLikeOrUnlike"
                                @click="likeOpensea">
                                <svg class="icon icon-heart-fill">
                                    <use xlink:href="#icon-heart-fill" fill="red"></use>
                                </svg>
                            </div>
                            <div class="likeNotmint"
                                v-if="showOpenseaMp3&& fromV3d == 'false' && !likeOrUnlike && showLikeOrUnlike"
                                @click="likeOpensea">
                                <svg class="icon icon-heart">
                                    <use xlink:href="#icon-heart"></use>
                                </svg>
                            </div>
                            <!-- opensea的视频 -->
                            <video v-if="showOpenseaVideo&& fromV3d == 'false'" :src="openseaVideoURL" controls autoplay
                                loop></video>
                            <div class="likeNotmint"
                                v-if="showOpenseaVideo&& fromV3d == 'false' && likeOrUnlike && showLikeOrUnlike"
                                @click="likeOpensea">
                                <svg class="icon icon-heart-fill">
                                    <use xlink:href="#icon-heart-fill" fill="red"></use>
                                </svg>
                            </div>
                            <div class="likeNotmint"
                                v-if="showOpenseaVideo&& fromV3d == 'false' && !likeOrUnlike && showLikeOrUnlike"
                                @click="likeOpensea">
                                <svg class="icon icon-heart">
                                    <use xlink:href="#icon-heart"></use>
                                </svg>
                            </div>
                            <!-- opensea的视频（url在data_img中的） -->
                            <video v-if="showOpenseaAnotherVideo&& fromV3d == 'false'" :src="openseaAnotherVideoURL"
                                controls autoplay loop></video>
                            <div class="likeNotmint"
                                v-if="showOpenseaAnotherVideo&& fromV3d == 'false' && likeOrUnlike && showLikeOrUnlike"
                                @click="likeOpensea">
                                <svg class="icon icon-heart-fill">
                                    <use xlink:href="#icon-heart-fill" fill="red"></use>
                                </svg>
                            </div>
                            <div class="likeNotmint"
                                v-if="showOpenseaAnotherVideo&& fromV3d == 'false' && !likeOrUnlike && showLikeOrUnlike"
                                @click="likeOpensea">
                                <svg class="icon icon-heart">
                                    <use xlink:href="#icon-heart"></use>
                                </svg>
                            </div>
                            <!-- opensea的html -->
                            <iframe v-if="showOpenseaHTML&& fromV3d == 'false'" :src="openseaHtmlURL"
                                frameborder="0"></iframe>
                            <div class="likeNotmint"
                                v-if="showOpenseaHTML&& fromV3d == 'false' && likeOrUnlike && showLikeOrUnlike"
                                @click="likeOpensea">
                                <svg class="icon icon-heart-fill">
                                    <use xlink:href="#icon-heart-fill" fill="red"></use>
                                </svg>
                            </div>
                            <div class="likeNotmint"
                                v-if="showOpenseaHTML&& fromV3d == 'false' && !likeOrUnlike && showLikeOrUnlike"
                                @click="likeOpensea">
                                <svg class="icon icon-heart">
                                    <use xlink:href="#icon-heart"></use>
                                </svg>
                            </div>
                            <!-- 放来自于3d展馆的图片，视频，html，mp3 -->
                            <!-- heco -->
                            <img v-viewer v-if="showLayerFrom3d&& fromV3d == 'true'" :src="layerUrlFrom3d"
                                class="onlyImg">
                            <div class="likeNotmint"
                                v-if="showLayerFrom3d&& fromV3d == 'true' && likeOrUnlike && showLikeOrUnlike"
                                @click="like">
                                <svg class="icon icon-heart-fill">
                                    <use xlink:href="#icon-heart-fill" fill="red"></use>
                                </svg>
                            </div>
                            <div class="likeNotmint"
                                v-if="showLayerFrom3d&& fromV3d == 'true' && !likeOrUnlike && showLikeOrUnlike"
                                @click="like">
                                <svg class="icon icon-heart">
                                    <use xlink:href="#icon-heart"></use>
                                </svg>
                            </div>
                            <video v-if="showSingleFrom3d&& fromV3d == 'true'" :src="singleUrlFrom3d" controls autoplay
                                loop></video>
                            <div class="likeNotmint"
                                v-if="showSingleFrom3d&& fromV3d == 'true' && likeOrUnlike && showLikeOrUnlike"
                                @click="like">
                                <svg class="icon icon-heart-fill">
                                    <use xlink:href="#icon-heart-fill" fill="red"></use>
                                </svg>
                            </div>
                            <div class="likeNotmint"
                                v-if="showSingleFrom3d&& fromV3d == 'true' && !likeOrUnlike && showLikeOrUnlike"
                                @click="like">
                                <svg class="icon icon-heart">
                                    <use xlink:href="#icon-heart"></use>
                                </svg>
                            </div>
                            <div v-viewer v-if="showCanvasFrom3d&& fromV3d == 'true'"
                                class="colItem_preview-canvasContainer">
                                <div v-for="(item,index) in canvasFrom3dList" :key="index"
                                    class="colItem_preview-canvas">
                                    <img :src=url+item alt="">
                                </div>
                            </div>
                            <div class="likeNotmint"
                                v-if="showCanvasFrom3d&& fromV3d == 'true' && likeOrUnlike && showLikeOrUnlike"
                                @click="like">
                                <svg class="icon icon-heart-fill">
                                    <use xlink:href="#icon-heart-fill" fill="red"></use>
                                </svg>
                            </div>
                            <div class="likeNotmint"
                                v-if="showCanvasFrom3d&& fromV3d == 'true' && !likeOrUnlike && showLikeOrUnlike"
                                @click="like">
                                <svg class="icon icon-heart">
                                    <use xlink:href="#icon-heart"></use>
                                </svg>
                            </div>
                            <!-- opensea -->
                            <img v-viewer v-if="showOpenseaImgFrom3d && fromV3d == 'true'" :src="openseaImgURLFrom3d"
                                class="onlyImg">
                            <div class="model" v-if="showOpenseaGLBImgFrom3d && fromV3d == 'false'">
                                <model-viewer class="model_viewer" autoplay camera-controls auto-rotate="true"
                                    :src="openseaImgURLGLBFrom3d">
                                </model-viewer>
                            </div>
                            <div class="model" v-if="showOpenseaGLTFImgFrom3d && fromV3d == 'false'">
                                <model-viewer class="model_viewer" autoplay camera-controls auto-rotate="true"
                                    :src="openseaImgURLGLTFFrom3d">
                                </model-viewer>
                            </div>
                            <div class="likeNotmint"
                                v-if="showOpenseaImgFrom3d && fromV3d == 'true' && likeOrUnlike && showLikeOrUnlike"
                                @click="likeOpensea">
                                <svg class="icon icon-heart-fill">
                                    <use xlink:href="#icon-heart-fill" fill="red"></use>
                                </svg>
                            </div>
                            <div class="likeNotmint"
                                v-if="showOpenseaImgFrom3d && fromV3d == 'true' && !likeOrUnlike && showLikeOrUnlike"
                                @click="likeOpensea">
                                <svg class="icon icon-heart">
                                    <use xlink:href="#icon-heart"></use>
                                </svg>
                            </div>
                            <img v-viewer v-if="showOpenseaMp3From3d&& fromV3d == 'true'" :src="openseaImgURLFrom3d"
                                class="onlyImg">
                            <audio v-if="showOpenseaMp3From3d&& fromV3d == 'true'" :src="openseaMp3URLFrom3d" controls
                                autoplay loop></audio>
                            <div class="likeNotmint"
                                v-if="showOpenseaMp3From3d&& fromV3d == 'true' && likeOrUnlike && showLikeOrUnlike"
                                @click="likeOpensea">
                                <svg class="icon icon-heart-fill">
                                    <use xlink:href="#icon-heart-fill" fill="red"></use>
                                </svg>
                            </div>
                            <div class="likeNotmint"
                                v-if="showOpenseaMp3From3d&& fromV3d == 'true' && !likeOrUnlike && showLikeOrUnlike"
                                @click="likeOpensea">
                                <svg class="icon icon-heart">
                                    <use xlink:href="#icon-heart"></use>
                                </svg>
                            </div>
                            <video v-if="showOpenseaVideoFrom3d&& fromV3d == 'true'" :src="openseaVideoURLFrom3d"
                                controls autoplay loop></video>
                            <div class="likeNotmint"
                                v-if="showOpenseaVideoFrom3d&& fromV3d == 'true' && likeOrUnlike && showLikeOrUnlike"
                                @click="likeOpensea">
                                <svg class="icon icon-heart-fill">
                                    <use xlink:href="#icon-heart-fill" fill="red"></use>
                                </svg>
                            </div>
                            <div class="likeNotmint"
                                v-if="showOpenseaVideoFrom3d&& fromV3d == 'true' && !likeOrUnlike && showLikeOrUnlike"
                                @click="likeOpensea">
                                <svg class="icon icon-heart">
                                    <use xlink:href="#icon-heart"></use>
                                </svg>
                            </div>
                            <video v-if="showOpenseaAnotherVideoFrom3d&& fromV3d == 'true'"
                                :src="openseaAnotherVideoURLFrom3d" controls autoplay loop></video>
                            <div class="likeNotmint"
                                v-if="showOpenseaAnotherVideoFrom3d&& fromV3d == 'true' && likeOrUnlike && showLikeOrUnlike"
                                @click="likeOpensea">
                                <svg class="icon icon-heart-fill">
                                    <use xlink:href="#icon-heart-fill" fill="red"></use>
                                </svg>
                            </div>
                            <div class="likeNotmint"
                                v-if="showOpenseaAnotherVideoFrom3d&& fromV3d == 'true' && !likeOrUnlike && showLikeOrUnlike"
                                @click="likeOpensea">
                                <svg class="icon icon-heart">
                                    <use xlink:href="#icon-heart"></use>
                                </svg>
                            </div>
                            <iframe v-if="showOpenseaHTMLFrom3d&& fromV3d == 'true'" :src="openseaHtmlURLFrom3d"
                                frameborder="0"></iframe>
                            <div class="likeNotmint"
                                v-if="showOpenseaHTMLFrom3d&& fromV3d == 'true' && likeOrUnlike && showLikeOrUnlike"
                                @click="likeOpensea">
                                <svg class="icon icon-heart-fill">
                                    <use xlink:href="#icon-heart-fill" fill="red"></use>
                                </svg>
                            </div>
                            <div class="likeNotmint"
                                v-if="showOpenseaHTMLFrom3d&& fromV3d == 'true' && !likeOrUnlike && showLikeOrUnlike"
                                @click="likeOpensea">
                                <svg class="icon icon-heart">
                                    <use xlink:href="#icon-heart"></use>
                                </svg>
                            </div>
                            <!-- 放来自于3d展馆的那些notmint的资产  -->
                            <img v-viewer v-if="showNotmintLayerFrom3d&& fromV3d == 'true'" :src="notmintLayerUrlFrom3d"
                                class="onlyImg">
                            <video v-if="showNotmintSingleFrom3d&& fromV3d == 'true'" :src="notmintSingleUrlFrom3d"
                                controls autoplay loop></video>
                            <div v-viewer v-if="showNotmintCanvasFrom3d&& fromV3d == 'true'"
                                class="colItem_preview-canvasContainer">
                                <div v-for="(item,index) in notMintCanvasFrom3dList" :key="index"
                                    class="colItem_preview-canvas">
                                    <img :src=url+item alt="">
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 放资产的详细信息 -->
                    <div class="colItem_detail">
                        <h1 class="colItem_title">{{realName}}</h1>
                        <div class="colItem_tabs">
                            <div class="colItem_nav">
                                <div :class="time=='night'?(showProperty==true&&showDetails==false?'activeMorning colItem_link':'activeNight colItem_link'):(showProperty==true&&showDetails==false?'activeNight colItem_link':'activeMorning colItem_link')"
                                    @click="checkCreator">
                                    {{$t('collectionShow.property')}}</div>
                                <div :class="time=='night'?(showProperty==true&&showDetails==false?'activeNight colItem_link':'activeMorning colItem_link'):(showProperty==true&&showDetails==false?'activeMorning colItem_link':'activeNight colItem_link')"
                                    @click="checkOwners">
                                    {{$t('collectionShow.detail')}}</div>
                            </div>
                            <div class="colItem_container">
                                <div class="colItem_userOfProperty" v-show="showProperty">
                                    <img :src="url+realCreatorAvatar" alt="">
                                    <div class="creInfo">
                                        <span>{{$t('personal.creator')}}</span>
                                        <span @click="goToThisUserPage('personal',realCreator)">{{realCreator}}</span>
                                    </div>
                                </div>
                                <div class="colItem_userOfOwners" v-show="showProperty">
                                    <div class="colItem_userOfProperty" v-for="(items,indexes) in realOwnerAvatar"
                                        :key="indexes">
                                        <img :src="url+realOwnerAvatar[indexes]" alt="">
                                        <div class="creInfo">
                                            <span>{{$t('personal.owner')}}</span>
                                            <span @click="goToThisUserPage('personal',realOwner)">{{realOwner}}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="colItem_des" v-show="showProperty">
                                    <div class="colItem_description">
                                        <p>{{realList.description}}</p>
                                    </div>
                                </div><br>
                                <span v-show="showProperty">{{$t('collectionShow.createTime')}}: </span><span
                                    v-show="showProperty">{{realList.create_time}}</span>
                                <div class="colItem_userOfDetailContainer" v-show="showDetails">
                                    <!-- 显示heco资产的detail -->
                                    <div class="colItem_userOfDetailContainer2"
                                        v-if="showCollection == 'true'&&(urlQuery[0] == 'heco'||urlQuery[0] == 'HECO') && fromV3d == 'false'">
                                        <div class="colItem_userOfDetail">
                                            <span class="contract">{{$t('collectionShow.contract')}} : </span><br>
                                            <!-- <a :href="'https://etherscan.io/address/'+realList.contract_address"
                                                target="_blank" class="etherscanLink">{{realList.contract_name}}</a> -->
                                            <span class="cname" @click="gotoContract">{{realList.contract_name}}</span>
                                        </div>
                                        <div class="colItem_userOfDetail">
                                            <span class="contract2">{{$t('collectionShow.tokenID')}} : </span><br>
                                            <span class="needToShort" title="sdfsdfs">{{realList.contract_token}}</span>
                                        </div>
                                        <div class="colItem_userOfDetail">
                                            <span class="contract3">{{$t('collectionShow.tokenStandard')}} : </span><br>
                                            <span class="needToShort">{{realList.contract_type}}</span>
                                        </div>
                                        <div class="colItem_userOfDetail">
                                            <span class="contract4">{{$t('collectionShow.externalLink')}} : </span><br>
                                            <span class="elink"
                                                @click="gotoHecoElink">{{realList.contract_external_link}}</span>
                                        </div>
                                        <div class="twoBtnContainer">
                                            <!-- 在Icarus中打开 -->
                                            <div v-if="urlQuery[0] == 'HECO'" class="openInIcarus"
                                                @click="openInIcarusArt">
                                                {{$t('collectionShow.openInIcarusArt')}}
                                            </div>
                                            <!-- 检视原图 -->
                                            <div class="checkOriImg" @click="checkOriImg">
                                                {{$t('collectionShow.checkOri')}}
                                            </div>
                                        </div>
                                    </div>
                                    <!-- 当notmint资产在heco中时 -->
                                    <div class="colItem_userOfDetailContainer2"
                                        v-if="showCollection == 'true'&&(urlQuery[0] == 'notmint') && fromV3d == 'false'">
                                        <div class="displayOnly">
                                            <span>{{$t('collectionShow.disOnly')}}</span>
                                        </div>
                                    </div>
                                    <!-- 显示like中的opensea资产的detail -->
                                    <div class="colItem_userOfDetailContainer2"
                                        v-if="showLike == 'true'&&urlQuery[0] == 'opensea' && fromV3d == 'false'">
                                        <div class="colItem_userOfDetail">
                                            <span class="contract">{{$t('collectionShow.contract')}} : </span><br>
                                            <!-- <a :href="'https://etherscan.io/address/'+realList.contract_address"
                                                target="_blank" class="etherscanLink">{{realList.contract_name}}</a> -->
                                            <span class="cname" @click="gotoContract">{{realList.contract_name}}</span>
                                        </div>
                                        <div class="colItem_userOfDetail">
                                            <span class="contract2">{{$t('collectionShow.tokenID')}} : </span><br>
                                            <span class="needToShort">{{realList.contract_token}}</span>
                                        </div>
                                        <div class="colItem_userOfDetail">
                                            <span class="contract3">{{$t('collectionShow.tokenStandard')}} : </span><br>
                                            <span class="needToShort">{{realList.contract_type}}</span>
                                        </div>
                                        <div class="colItem_userOfDetail">
                                            <span class="contract4">{{$t('collectionShow.externalLink')}} : </span><br>
                                            <span class="elink"
                                                @click="gotoHecoElink">{{realList.contract_external_link}}</span>
                                        </div>
                                        <div class="twoBtnContainer">
                                            <!-- 在Icarus中打开 -->
                                            <div v-if="urlQuery[0] == 'opensea'" class="openInOpensea"
                                                @click="openInOpensea">
                                                {{$t('collectionShow.openInOpensea')}}
                                            </div>
                                            <!-- 检视原图 -->
                                            <div class="checkOriImg" @click="checkOriImg">
                                                {{$t('collectionShow.checkOri')}}
                                            </div>
                                        </div>
                                    </div>
                                    <!-- 显示like中的heco资产的detail -->
                                    <div class="colItem_userOfDetailContainer2"
                                        v-if="showLike == 'true'&&(urlQuery[0] == 'heco'||urlQuery[0] == 'HECO') && fromV3d == 'false'">
                                        <div class="colItem_userOfDetail">
                                            <span class="contract">{{$t('collectionShow.contract')}} : </span><br>
                                            <!-- <a :href="'https://etherscan.io/address/'+realList.contract_address"
                                                target="_blank" class="etherscanLink">{{realList.contract_name}}</a> -->
                                            <span class="cname" @click="gotoContract">{{realList.contract_name}}</span>
                                        </div>
                                        <div class="colItem_userOfDetail">
                                            <span class="contract2">{{$t('collectionShow.tokenID')}} : </span><br>
                                            <span class="needToShort">{{realList.contract_token}}</span>
                                        </div>
                                        <div class="colItem_userOfDetail">
                                            <span class="contract3">{{$t('collectionShow.tokenStandard')}} : </span><br>
                                            <span class="needToShort">{{realList.contract_type}}</span>
                                        </div>
                                        <div class="colItem_userOfDetail">
                                            <span class="contract4">{{$t('collectionShow.externalLink')}} : </span><br>
                                            <span class="elink"
                                                @click="gotoHecoElink">{{realList.contract_external_link}}</span>
                                        </div>
                                        <div class="twoBtnContainer">
                                            <!-- 在Icarus中打开 -->
                                            <div v-if="urlQuery[0] == 'heco'" class="openInIcarus"
                                                @click="openInIcarusArt">
                                                {{$t('collectionShow.openInIcarusArt')}}
                                            </div>
                                            <!-- 检视原图 -->
                                            <div class="checkOriImg" @click="checkOriImg">
                                                {{$t('collectionShow.checkOri')}}
                                            </div>
                                        </div>
                                    </div>
                                    <!-- 显示opensea资产的detail -->
                                    <div class="colItem_userOfDetailContainer2"
                                        v-if="showOpenseaCollection == 'true' && urlQuery[0] == 'opensea' && fromV3d == 'false'">
                                        <div class="colItem_userOfDetail">
                                            <span class="contract">{{$t('collectionShow.contract')}} : </span><br>
                                            <!-- <a :href="'https://etherscan.io/address/'+realList.contract_address"
                                                target="_blank" class="etherscanLink">{{realList.contract_name}}</a> -->
                                            <span class="cname" @click="gotoContract">{{realList.contract_name}}</span>
                                        </div>
                                        <div class="colItem_userOfDetail">
                                            <span class="contract2">{{$t('collectionShow.tokenID')}} : </span><br>
                                            <span>{{realList.contract_token}}</span>
                                        </div>
                                        <div class="colItem_userOfDetail">
                                            <span class="contract3">{{$t('collectionShow.tokenStandard')}} : </span><br>
                                            <span>{{realList.contract_type}}</span>
                                        </div>
                                        <div class="colItem_userOfDetail">
                                            <span class="contract4">{{$t('collectionShow.externalLink')}} : </span><br>
                                            <!-- <a class="externalLink" :href="realList.contract_external_link"
                                                target="_blank">{{realList.contract_external_link}}</a> -->
                                            <span class="elink"
                                                @click="gotoElink">{{realList.contract_external_link}}</span>
                                        </div>
                                        <div class="twoBtnContainer">
                                            <!-- 在opensea中打开 -->
                                            <div v-if="urlQuery[0] == 'opensea'" class="openInOpensea"
                                                @click="openInOpensea">
                                                {{$t('collectionShow.openInOpensea')}}
                                            </div>
                                            <!-- 检视原图 -->
                                            <div class="checkOriImg" @click="checkOriImg">
                                                {{$t('collectionShow.checkOri')}}
                                            </div>
                                        </div>
                                    </div>
                                    <!-- 当notmint在opensea中时 -->
                                    <div class="colItem_userOfDetailContainer2"
                                        v-if="showOpenseaCollection == 'true' && urlQuery[0] == 'notmint' && fromV3d == 'false'">
                                        <div class="displayOnly">
                                            <span>{{$t('collectionShow.disOnly')}}</span>
                                        </div>
                                    </div>
                                    <!-- 当在其他标签页时也要显示资产的detail-->
                                    <div class="colItem_userOfDetailContainer2"
                                        v-if="showOpenseaCollection == null && showLike == null && showCollection == null && fromV3d == 'false'">
                                        <div class="colItem_userOfDetail" v-if="urlQuery[0] !== 'notmint'">
                                            <span class="contract">{{$t('collectionShow.contract')}} : </span><br>
                                            <span class="cname" @click="gotoContract">{{realList.contract_name}}</span>
                                        </div>
                                        <div class="colItem_userOfDetail" v-if="urlQuery[0] !== 'notmint'">
                                            <span class="contract2">{{$t('collectionShow.tokenID')}} : </span><br>
                                            <span class="needToShort" title="sdfsdfs">{{realList.contract_token}}</span>
                                        </div>
                                        <div class="colItem_userOfDetail" v-if="urlQuery[0] !== 'notmint'">
                                            <span class="contract3">{{$t('collectionShow.tokenStandard')}} : </span><br>
                                            <span class="needToShort">{{realList.contract_type}}</span>
                                        </div>
                                        <div class="colItem_userOfDetail" v-if="urlQuery[0] !== 'notmint'">
                                            <span class="contract4">{{$t('collectionShow.externalLink')}} : </span><br>
                                            <span class="elink"
                                                @click="gotoHecoElink">{{realList.contract_external_link}}</span>
                                        </div>
                                        <div class="twoBtnContainer"
                                            v-if="urlQuery[0] == 'heco' || urlQuery[0] == 'HECO'">
                                            <!-- 在Icarus中打开 -->
                                            <div v-if="urlQuery[0] == 'heco'" class="openInIcarus"
                                                @click="openInIcarusArt">
                                                {{$t('collectionShow.openInIcarusArt')}}
                                            </div>
                                            <!-- 检视原图 -->
                                            <div class="checkOriImg" @click="checkOriImg">
                                                {{$t('collectionShow.checkOri')}}
                                            </div>
                                        </div>
                                        <div class="twoBtnContainer" v-if="urlQuery[0] == 'opensea'">
                                            <!-- 在opensea中打开 -->
                                            <div v-if="urlQuery[0] == 'opensea'" class="openInOpensea"
                                                @click="openInOpensea">
                                                {{$t('collectionShow.openInOpensea')}}
                                            </div>
                                            <!-- 检视原图 -->
                                            <div class="checkOriImg" @click="checkOriImg">
                                                {{$t('collectionShow.checkOri')}}
                                            </div>
                                        </div>
                                        <div class="displayOnly" v-if="urlQuery[0] == 'notmint'">
                                            <span>{{$t('collectionShow.disOnly')}}</span>
                                        </div>
                                    </div>
                                    <!-- 从3d展馆跳转过来的heco资产的detail -->
                                    <div class="colItem_userOfDetailContainer2"
                                        v-if="(urlQuery[0] == 'heco'||urlQuery[0] == 'HECO')&&fromV3d=='true'">
                                        <div class="colItem_userOfDetail">
                                            <span class="contract">{{$t('collectionShow.contract')}} : </span><br>
                                            <span class="cname" @click="gotoContract">{{realList.contract_name}}</span>
                                        </div>
                                        <div class="colItem_userOfDetail">
                                            <span class="contract2">{{$t('collectionShow.tokenID')}} : </span><br>
                                            <span class="needToShort" title="sdfsdfs">{{realList.contract_token}}</span>
                                        </div>
                                        <div class="colItem_userOfDetail">
                                            <span class="contract3">{{$t('collectionShow.tokenStandard')}} : </span><br>
                                            <span class="needToShort">{{realList.contract_type}}</span>
                                        </div>
                                        <div class="colItem_userOfDetail">
                                            <span class="contract4">{{$t('collectionShow.externalLink')}} : </span><br>
                                            <span class="elink"
                                                @click="gotoHecoElink">{{realList.contract_external_link}}</span>
                                        </div>
                                        <div class="twoBtnContainer">
                                            <!-- 在Icarus中打开 -->
                                            <div v-if="urlQuery[0] == 'heco'" class="openInIcarus"
                                                @click="openInIcarusArt">
                                                {{$t('collectionShow.openInIcarusArt')}}
                                            </div>
                                            <!-- 检视原图 -->
                                            <div class="checkOriImg" @click="checkOriImg">
                                                {{$t('collectionShow.checkOri')}}
                                            </div>
                                        </div>
                                    </div>
                                    <!-- 从3d展馆跳转过来的opensea资产的detail -->
                                    <div class="colItem_userOfDetailContainer2"
                                        v-if="(urlQuery[0] == 'opensea')&&fromV3d=='true'">
                                        <div class="colItem_userOfDetail">
                                            <span class="contract">{{$t('collectionShow.contract')}} : </span><br>
                                            <!-- <a :href="'https://etherscan.io/address/'+realList.contract_address"
                                                target="_blank" class="etherscanLink">{{realList.contract_name}}</a> -->
                                            <span class="cname" @click="gotoContract">{{realList.contract_name}}</span>
                                        </div>
                                        <div class="colItem_userOfDetail">
                                            <span class="contract2">{{$t('collectionShow.tokenID')}} : </span><br>
                                            <span class="needToShort" title="sdfsdfs">{{realList.contract_token}}</span>
                                        </div>
                                        <div class="colItem_userOfDetail">
                                            <span class="contract3">{{$t('collectionShow.tokenStandard')}} : </span><br>
                                            <span class="needToShort">{{realList.contract_type}}</span>
                                        </div>
                                        <div class="colItem_userOfDetail">
                                            <span class="contract4">{{$t('collectionShow.externalLink')}} : </span><br>
                                            <span class="elink"
                                                @click="gotoHecoElink">{{realList.contract_external_link}}</span>
                                        </div>
                                        <div class="twoBtnContainer">
                                            <!-- 在opensea中打开 -->
                                            <div v-if="urlQuery[0] == 'opensea'" class="openInOpensea"
                                                @click="openInOpensea">
                                                {{$t('collectionShow.openInOpensea')}}
                                            </div>
                                            <!-- 检视原图 -->
                                            <div class="checkOriImg" @click="checkOriImg">
                                                {{$t('collectionShow.checkOri')}}
                                            </div>
                                        </div>
                                    </div>
                                    <!-- 从3d展馆跳转过来的notmint资产的detail(在heco中包含的notmint) -->
                                    <div class="colItem_userOfDetailContainer2"
                                        v-if="(urlQuery[0] == 'notmint')&&fromV3d=='true'">
                                        <div class="displayOnly">
                                            <span>{{$t('collectionShow.disOnly')}}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" id="icon-heart">
            <path
                d="M11 2.112c2.393 0 4.333 1.94 4.333 4.333 0 4.245-4.647 6.59-6.542 7.37-.511.21-1.071.21-1.582 0-1.896-.78-6.543-3.124-6.543-7.37 0-2.393 1.94-4.333 4.333-4.333a4.32 4.32 0 0 1 3 1.206 4.32 4.32 0 0 1 3-1.206zm0 1.333c-.807 0-1.537.317-2.077.835l-.462.443c-.258.248-.665.248-.923 0l-.462-.443c-.54-.518-1.27-.835-2.077-.835a3 3 0 0 0-3 3c0 1.588.86 2.9 2.101 3.978s2.728 1.794 3.615 2.159a.73.73 0 0 0 .567 0c.888-.365 2.373-1.08 3.615-2.159S14 8.034 14 6.445a3 3 0 0 0-3-3z">
            </path>
        </symbol>
        <symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" id="icon-heart-fill">
            <path
                d="M8 3.339a4.32 4.32 0 0 0-3-1.206c-2.393 0-4.333 1.94-4.333 4.333 0 4.246 4.647 6.59 6.543 7.37.511.21 1.071.21 1.582 0 1.896-.78 6.543-3.124 6.543-7.37 0-2.393-1.94-4.333-4.333-4.333a4.32 4.32 0 0 0-3 1.206z">
            </path>
        </symbol>
        <Footer></Footer>
    </div>
</template>

<script>
    import Header from '../components/header.vue';
    import Footer from '../components/footer.vue';
    import * as model from '@google/model-viewer';
    import 'viewerjs/dist/viewer.css'
    export default {
        props: ["time"],
        data() {
            return {
                realName: '',
                realCreator: '',
                realCreatorAvatar: '',
                realOwner: '',
                realOwnerAvatar: '',
                realList: '',
                language: window.localStorage.getItem('languageStorage') || 'en',
                showProperty: true,
                showDetails: false,
                creatorList: {},
                ownerList: {},
                collectionList: JSON.parse(window.sessionStorage.getItem('collectionList')),
                collectionIndex: window.sessionStorage.getItem('collectionIndex'),
                likeList: JSON.parse(window.sessionStorage.getItem('likeList')),
                likeCollectionIndex: window.sessionStorage.getItem('likeCollectionIndex'),
                openseaList: JSON.parse(window.sessionStorage.getItem('openseaList')),
                openseaCollectionIndex: window.sessionStorage.getItem('openseaCollectionIndex'),
                url: window.urls,
                defaultAvatar: require('../assets/personal/defaultAvatar.png'),
                showCollection: window.sessionStorage.getItem('showCollection'),
                showLike: window.sessionStorage.getItem('showLike'),
                showOpenseaCollection: window.sessionStorage.getItem('showOpenseaCollection'),
                showLayer: false, //显示heco的单图层图片，即type为layer的
                showLayerFrom3d: false, //显示来自3d展馆的layer图片
                showNotmintLayer: false, //显示heoc的nomint资产
                showNotmintLayerFrom3d: false,
                showCanvas: false, //显示canvas（包含多涂层）
                showNotmintCanvas: false,
                showCanvasFrom3d: false,
                showNotmintCanvasFrom3d: false,
                showSingle: false, //显示type为single的，可能是图片，也可能是视频
                showNotmintSingle: false,
                showSingleFrom3d: false,
                showNotmintSingleFrom3d: false,
                showOpenseaImg: false, //显示opensea的图片
                showOpenseaImgFrom3d: false,
                showOpenseaGLBImg: false, //显示opensea的glb模型(不是来自3d展馆)
                showOpenseaGLBImgFrom3d: false,
                showOpenseaGLTFImg: false,
                showOpenseaGLTFImgFrom3d: false,
                showOpenseaMp3: false,
                showOpenseaMp3From3d: false,
                showOpenseaVideo: false,
                showOpenseaVideoFrom3d: false,
                showOpenseaAnotherVideo: false,
                showOpenseaAnotherVideoFrom3d: false,
                showOpenseaHTML: false,
                showOpenseaHTMLFrom3d: false,
                showImgFrom3d: false,
                showMp3From3d: false,
                showVideoFrom3d: false,
                showHTMLFrom3d: false,
                layerUrl: '',
                layerUrlFrom3d: '',
                notmintLayerUrl: '',
                notmintLayerUrlFrom3d: '',
                singleUrl: '',
                singleUrlFrom3d: '',
                notmintSingleUrl: '',
                notmintSingleUrlFrom3d: '',
                canvasList: '',
                notMintCanvasList: '',
                canvasFrom3dList: '',
                notMintCanvasFrom3dList: '',
                openseaImgURL: '',
                openseaImgURLFrom3d: '',
                openseaImgURLGLB: '',
                openseaImgURLGLBFrom3d: '',
                openseaImgURLGLTF: '',
                openseaImgURLGLTFFrom3d: '',
                openseaVideoURL: '',
                openseaVideoURLFrom3d: '',
                openseaAnotherVideoURL: '',
                openseaAnotherVideoURLFrom3d: '',
                openseaHtmlURL: '',
                openseaHtmlURLFrom3d: '',
                openseaMp3URL: '',
                openseaMp3URLFrom3d: '',
                from3dImgURL: '',
                from3dVideoURL: '',
                from3dHtmlURL: '',
                from3dMp3URL: '',
                from3dAudioImgURL: '',
                notMintImgURL: '',
                notMintVideoURL: '',
                useToAccessFromAnywhere: {}, //保存一下mounted中请求当前是哪个label和哪个token_id的资产，方便用户在新开一个标签页的时候也能进入这个资产的详细页面
                urlQuery: Object.values(this.$route.query),
                fromV3d: window.localStorage.getItem('fromV3dApp'),
                likeOrUnlike: false, //用于判断收藏状态图标的变量
                showLikeOrUnlike: false,
            }
        },
        components: {
            Header,
            Footer
        },
        methods: {
            // 资产的收藏功能
            async like() {
                const address = await window.ethereum.request({
                    method: 'eth_accounts'
                })
                var formData = new FormData();
                // 如果当前已经是like了，执行unlike方法
                if (this.likeOrUnlike == true) {
                    formData.append('token_id', this.useToAccessFromAnywhere.token_id);
                    formData.append('user_address', address);
                    this.$axios.post(this.url + 'collections_state/heco/unlike', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }).then((res) => {
                        this.likeOrUnlike = false;
                    })
                } else if (this.likeOrUnlike == false) {
                    formData.append('token_id', this.useToAccessFromAnywhere.token_id);
                    formData.append('user_address', address);
                    this.$axios.post(this.url + 'collections_state/heco/like', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }).then((res) => {
                        this.likeOrUnlike = true;
                    })
                }
            },
            async likeOpensea() {
                const address = await window.ethereum.request({
                    method: 'eth_accounts'
                })
                var formData = new FormData();
                // 如果当前已经是like了，执行unlike方法
                if (this.likeOrUnlike == true) {
                    formData.append('token_id', this.useToAccessFromAnywhere.opensea_id);
                    formData.append('user_address', address);
                    this.$axios.post(this.url + 'collections_state/opensea/unlike', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }).then((res) => {
                        this.likeOrUnlike = false;
                    })
                } else if (this.likeOrUnlike == false) {
                    formData.append('token_id', this.useToAccessFromAnywhere.opensea_id);
                    formData.append('user_address', address);
                    this.$axios.post(this.url + 'collections_state/opensea/like', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }).then((res) => {
                        this.likeOrUnlike = true;
                    })
                }

            },
            gotoContract() {
                window.open('https://etherscan.io/address/' + this.realList.contract_address, '_blank')
            },
            gotoElink() {
                window.open('https://' + this.useToAccessFromAnywhere.contract_external_link, '_blank')
            },
            gotoHecoElink() {
                window.open('https://' + this.collectionList[this.collectionIndex].contract_external_link, '_blank')
            },
            checkOriImg() {
                if (this.realList.label == 'opensea') {
                    if (this.realList.url_ori_animation !== '') {
                        window.open(this.realList.url_ori_animation)
                    } else {
                        window.open(this.realList.url_ori_img)
                    }
                } else {
                    window.open(this.realList.url_ori)
                }
            },
            openInOpensea() {
                window.open(this.realList.opensea_link, '_blank')
            },
            openInIcarusArt() {
                window.open('https://' + this.realList.contract_external_link, '_blank')
            },
            goToThisUserPage(path, id) {
                let route = this.$router.resolve({
                    path,
                    name: path.replace(path[0], path[0].toUpperCase()),
                    query: {
                        id: id
                    }
                })
                window.open(route.href, '_blank');
            },
            checkCreator() {
                this.showProperty = true;
                this.showDetails = false;
            },
            checkOwners() {
                this.showProperty = false;
                this.showDetails = true;

            },
        },
        async mounted() {
            const addres = await window.ethereum.request({
                method: 'eth_accounts'
            })
            // 发送一个请求，拿当前opensea资产的详细信息，如果得到的opensea_id和label和query中的一样的话，就像下面的那个else if中的写法
            if (addres.length !== 0) {
                this.showLikeOrUnlike = true;
                var formData = new FormData();
                formData.append('user_address', addres)
                formData.append('label', this.$route.query.label);
                formData.append('token_id', Object.values(this.$route.query)[1])
                await this.$axios.post(this.url + 'get_collects_single', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then((res) => {
                    this.useToAccessFromAnywhere = res.data;
                    this.likeOrUnlike = res.data.isLiked;
                })
            } else {
                this.showLikeOrUnlike = false;
                var formData = new FormData();
                formData.append('label', this.$route.query.label);
                formData.append('token_id', Object.values(this.$route.query)[1])
                await this.$axios.post(this.url + 'get_collects_single', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then((res) => {
                    this.useToAccessFromAnywhere = res.data;
                })
            }

            // 请求结束

            // 这里的if和else if中的realList什么的是为了显示详细信息页右半部的信息，creator,owner那些
            if (this.showCollection !== null && this.showLike !== null && this.showOpenseaCollection !== null) {
                if (this.showCollection == 'true' && this.showLike == 'false' && this.showOpenseaCollection ==
                    'false' && this.fromV3d == 'false') {
                    this.realList = this.collectionList[this.collectionIndex];
                    this.realName = this.collectionList[this.collectionIndex].name;
                    this.realCreator = this.collectionList[this.collectionIndex].creator;
                    this.realCreatorAvatar = this.collectionList[this.collectionIndex].creator_avatar[0];
                    this.realOwner = this.collectionList[this.collectionIndex].owner;
                    this.realOwnerAvatar = this.collectionList[this.collectionIndex].owner_avatar;
                } else if (this.showCollection == 'false' && this.showLike == 'true' && this
                    .showOpenseaCollection ==
                    'false' && this.fromV3d == 'false') {
                    this.realList = this.likeList[this.likeCollectionIndex];
                    this.realName = this.likeList[this.likeCollectionIndex].name;
                    this.realCreator = this.likeList[this.likeCollectionIndex].creator;
                    this.realCreatorAvatar = this.likeList[this.likeCollectionIndex].creator_avatar[0];
                    this.realOwner = this.likeList[this.likeCollectionIndex].owner;
                    this.realOwnerAvatar = this.likeList[this.likeCollectionIndex].owner_avatar;
                } else if (this.showCollection == 'false' && this.showLike == 'false' && this
                    .showOpenseaCollection ==
                    'true' && this.fromV3d == 'false') {
                    this.realList = this.useToAccessFromAnywhere;
                    this.realName = this.useToAccessFromAnywhere.name;
                    this.realCreator = this.useToAccessFromAnywhere.creator;
                    this.realCreatorAvatar = this.useToAccessFromAnywhere.creator_avatar[0];
                    this.realOwner = this.useToAccessFromAnywhere.owner;
                    this.realOwnerAvatar = this.useToAccessFromAnywhere.owner_avatar;
                }
                if (this.fromV3d == 'true') {
                    this.realList = this.useToAccessFromAnywhere;
                    this.realName = this.useToAccessFromAnywhere.name;
                    this.realCreator = this.useToAccessFromAnywhere.creator;
                    this.realCreatorAvatar = this.useToAccessFromAnywhere.creator_avatar[0];
                    this.realOwner = this.useToAccessFromAnywhere.owner;
                    this.realOwnerAvatar = this.useToAccessFromAnywhere.owner_avatar;
                }
            } else if (this.showCollection == null && this.showLike == null && this.showOpenseaCollection == null) {
                this.realList = this.useToAccessFromAnywhere;
                this.realName = this.useToAccessFromAnywhere.name;
                this.realCreator = this.useToAccessFromAnywhere.creator;
                this.realCreatorAvatar = this.useToAccessFromAnywhere.creator_avatar[0];
                this.realOwner = this.useToAccessFromAnywhere.owner;
                this.realOwnerAvatar = this.useToAccessFromAnywhere.owner_avatar;
            }


            // 从这里开始判断的是详细页面中左边的图片和视频那些
            if (this.showCollection !== null && this.showLike !== null && this.showOpenseaCollection !== null) {
                // 如果当前是heco的资产跳转过来的，因为点击了heco资产，所以showCollection是true，其他两个为false，而且不是从3d展馆跳转过来的
                if (this.showCollection == 'true' && this.fromV3d == 'false') {
                    // 当前是heco资产的部分(label是'HECO'),notmint的不包含在内
                    if (this.collectionList[this.collectionIndex].label == 'HECO') {
                        if (this.collectionList[this.collectionIndex].type == 'layer' && this.collectionList[this
                                .collectionIndex].data[0]
                            .indexOf('mp4') == -1) {
                            // 显示type为layer的
                            this.showLayer = true;
                            this.showCanvas = false;
                            this.showSingle = false;
                            this.layerUrl = this.url + this.collectionList[this.collectionIndex].data[0];
                        } else if (this.collectionList[this.collectionIndex].type == 'single') {
                            // 显示type为single的
                            this.showLayer = false;
                            this.showCanvas = false;
                            this.showSingle = true;
                            if (this.collectionList[this.collectionIndex].data[0].indexOf('mp4') == -1) {
                                this.showLayer = true;
                                this.showCanvas = false;
                                this.showSingle = false;
                                this.layerUrl = this.url + this.collectionList[this.collectionIndex].data[0]
                            } else if (this.collectionList[this.collectionIndex].data[0].indexOf('mp4') > -1) {
                                this.singleUrl = this.url + this.collectionList[this.collectionIndex].data[0];
                            }
                        } else if (this.collectionList[this.collectionIndex].type == 'canvas') {
                            // 显示type为canvas的
                            this.showLayer = false;
                            this.showCanvas = true;
                            this.showSingle = false;
                            this.canvasList = this.collectionList[this.collectionIndex].data
                        }
                    } else if (this.collectionList[this.collectionIndex].label == 'notmint') {
                        // 当前是heco中的notmint的资产
                        if (this.collectionList[this.collectionIndex].type == 'layer' && this.collectionList[this
                                .collectionIndex].data[0]
                            .indexOf('mp4') == -1) {
                            // 显示type为layer的
                            this.showNotmintCanvas = false;
                            this.showNotmintSingle = false;
                            this.showNotmintLayer = true;
                            this.notmintLayerUrl = this.url + this.collectionList[this.collectionIndex].data[0];
                        } else if (this.collectionList[this.collectionIndex].type == 'single') {
                            // 显示type为single的

                            if (this.collectionList[this.collectionIndex].data[0].indexOf('mp4') == -1) {
                                this.showNotmintCanvas = false;
                                this.showNotmintSingle = false;
                                this.showNotmintLayer = true;
                                this.notmintLayerUrl = this.url + this.collectionList[this.collectionIndex].data[0];
                            } else if (this.collectionList[this.collectionIndex].data[0].indexOf('mp4') > -1) {
                                this.showNotmintCanvas = false;
                                this.showNotmintLayer = false;
                                this.showNotmintSingle = true;
                                this.notmintSingleUrl = this.url + this.collectionList[this.collectionIndex].data[
                                    0];
                            }
                        } else if (this.collectionList[this.collectionIndex].type == 'canvas') {
                            // 显示type为canvas的
                            this.showNotmintCanvas = true;
                            this.showNotmintSingle = false;
                            this.showNotmintLayer = false;
                            this.notMintCanvasList = this.collectionList[this.collectionIndex].data
                        }
                    }
                    // 如果当前是like中的资产跳转过来的，不是从3d跳转过来的
                } else if (this.showLike == 'true' && this.fromV3d == 'false') {
                    // 当前是like的部分(label为'opensea'),不包含notmint，因为notmint无需被like
                    if (this.likeList[this.likeCollectionIndex].type == 'layer' && this.likeList[this
                            .likeCollectionIndex].data[0]
                        .indexOf('mp4') == -1) {
                        // 显示type为layer的
                        this.showLayer = true;
                        this.showCanvas = false;
                        this.showSingle = false;
                        this.layerUrl = this.url + this.likeList[this.likeCollectionIndex].data[0];
                    } else if (this.likeList[this.likeCollectionIndex].type == 'single') {
                        // 显示type为single的
                        this.showLayer = false;
                        this.showCanvas = false;
                        this.showSingle = true;
                        if (this.likeList[this.likeCollectionIndex].data[0].indexOf('mp4') == -1) {
                            this.layerUrl = this.url + this.likeList[this.likeCollectionIndex].data[0]
                            this.showLayer = true;
                            this.showCanvas = false;
                            this.showSingle = false;
                        } else if (this.likeList[this.likeCollectionIndex].data[0].indexOf('mp4') > -1) {
                            this.singleUrl = this.url + this.likeList[this.likeCollectionIndex].data[0];
                        }
                    } else if (this.likeList[this.likeCollectionIndex].type == 'canvas') {
                        // 显示type为canvas的
                        this.showLayer = false;
                        this.showCanvas = true;
                        this.showSingle = false;
                        this.canvasList = this.likeList[this.likeCollectionIndex].data
                    } else if (this.likeList[this.likeCollectionIndex].type == 'img') {
                        this.showOpenseaImg = true;
                        this.showOpenseaVideo = false;
                        this.showOpenseaHTML = false;
                        this.showOpenseaMp3 = false;
                        this.showOpenseaAnotherVideo = false;
                        this.openseaImgURL = this.url + this.likeList[this.likeCollectionIndex].data_img[0];
                        if (this.likeList[this.likeCollectionIndex].type_img == 'mp4') {
                            this.showOpenseaAnotherVideo = true;
                            this.showOpenseaImg = false;
                            this.showOpenseaVideo = false;
                            this.showOpenseaHTML = false;
                            this.showOpenseaMp3 = false;
                            this.openseaAnotherVideoURL = this.url + this.likeList[this.likeCollectionIndex]
                                .data_img[
                                    0];
                        }
                    } else if (this.likeList[this.likeCollectionIndex].type_animation == 'mp4') {
                        this.showOpenseaImg = false;
                        this.showOpenseaVideo = true;
                        this.showOpenseaHTML = false;
                        this.showOpenseaMp3 = false;
                        this.showOpenseaAnotherVideo = false;
                        this.openseaVideoURL = this.url + this.likeList[this.likeCollectionIndex]
                            .data_animation[
                                0];

                    } else if (this.likeList[this.likeCollectionIndex].type_animation == 'mov') {
                        this.showOpenseaImg = false;
                        this.showOpenseaVideo = true;
                        this.showOpenseaHTML = false;
                        this.showOpenseaMp3 = false;
                        this.showOpenseaAnotherVideo = false;
                        this.openseaVideoURL = this.url + this.likeList[this.likeCollectionIndex]
                            .data_animation[
                                0];

                    } else if (this.likeList[this.likeCollectionIndex].type_animation == 'webm') {
                        this.showOpenseaImg = false;
                        this.showOpenseaVideo = true;
                        this.showOpenseaHTML = false;
                        this.showOpenseaMp3 = false;
                        this.showOpenseaAnotherVideo = false;
                        this.openseaVideoURL = this.url + this.likeList[this.likeCollectionIndex]
                            .data_animation[
                                0];

                    } else if (this.likeList[this.likeCollectionIndex].type_animation == 'html') {
                        this.showOpenseaImg = false;
                        this.showOpenseaVideo = false;
                        this.showOpenseaHTML = true;
                        this.showOpenseaMp3 = false;
                        this.showOpenseaAnotherVideo = false;
                        this.openseaHtmlURL = this.likeList[this.likeCollectionIndex]
                            .url_ori_animation;
                    } else if (this.likeList[this.likeCollectionIndex].type_animation == 'mp3') {
                        this.showOpenseaImg = false;
                        this.showOpenseaVideo = false;
                        this.showOpenseaHTML = false;
                        this.showOpenseaMp3 = true;
                        this.showOpenseaAnotherVideo = false;
                        this.openseaMp3URL = this.url + this.likeList[this.likeCollectionIndex]
                            .data_animation[0];
                    } else if (this.likeList[this.likeCollectionIndex].type_animation == 'glb') {
                        this.showOpenseaImg = false;
                        this.showOpenseaVideo = false;
                        this.showOpenseaHTML = false;
                        this.showOpenseaMp3 = false;
                        this.showOpenseaAnotherVideo = false;
                        this.showOpenseaGLBImg = true;
                        this.openseaImgURLGLB = this.url + this.likeList[this.likeCollectionIndex]
                            .data_animation[0];
                    } else if (this.likeList[this.likeCollectionIndex].type_animation == 'gltf') {
                        this.showOpenseaImg = false;
                        this.showOpenseaVideo = false;
                        this.showOpenseaHTML = false;
                        this.showOpenseaMp3 = false;
                        this.showOpenseaAnotherVideo = false;
                        this.showOpenseaGLBImg = false;
                        this.showOpenseaGLTFImg = true;
                        this.openseaImgURLGLTF = this.url + this.likeList[this.likeCollectionIndex]
                            .data_animation[0];
                    }
                    // opensea的资产跳转过来的，而且不是3d跳转过来的
                } else if (this.showOpenseaCollection == 'true' && this.useToAccessFromAnywhere
                    .opensea_id == this.$route.query.opensea_id && this.$route.query.label == 'opensea' &&
                    this.fromV3d == 'false') {
                    // opensea没有notmint的资产
                    if (this.useToAccessFromAnywhere.type == 'img') {
                        this.showOpenseaImg = true;
                        this.showOpenseaVideo = false;
                        this.showOpenseaHTML = false;
                        this.showOpenseaMp3 = false;
                        this.showOpenseaAnotherVideo = false;
                        this.openseaImgURL = this.url + this.useToAccessFromAnywhere.data_img[0];
                        if (this.useToAccessFromAnywhere.type_img == 'mp4') {
                            this.showOpenseaAnotherVideo = true;
                            this.showOpenseaImg = false;
                            this.showOpenseaVideo = false;
                            this.showOpenseaHTML = false;
                            this.showOpenseaMp3 = false;
                            this.openseaAnotherVideoURL = this.url + this.useToAccessFromAnywhere
                                .data_img[
                                    0];
                        }
                    } else if (this.useToAccessFromAnywhere.type_animation == 'mp4') {
                        this.showOpenseaImg = false;
                        this.showOpenseaVideo = true;
                        this.showOpenseaHTML = false;
                        this.showOpenseaMp3 = false;
                        this.showOpenseaAnotherVideo = false;
                        this.openseaVideoURL = this.url + this.useToAccessFromAnywhere
                            .data_animation[
                                0];

                    } else if (this.useToAccessFromAnywhere.type_animation == 'mov') {
                        this.showOpenseaImg = false;
                        this.showOpenseaVideo = true;
                        this.showOpenseaHTML = false;
                        this.showOpenseaMp3 = false;
                        this.showOpenseaAnotherVideo = false;
                        this.openseaVideoURL = this.url + this.useToAccessFromAnywhere
                            .data_animation[
                                0];

                    } else if (this.useToAccessFromAnywhere.type_animation == 'webm') {
                        this.showOpenseaImg = false;
                        this.showOpenseaVideo = true;
                        this.showOpenseaHTML = false;
                        this.showOpenseaMp3 = false;
                        this.showOpenseaAnotherVideo = false;
                        this.openseaVideoURL = this.url + this.useToAccessFromAnywhere
                            .data_animation[
                                0];

                    } else if (this.useToAccessFromAnywhere.type_animation == 'glb') {
                        this.showOpenseaImg = false;
                        this.showOpenseaGLBImg = true;
                        this.showOpenseaVideo = false;
                        this.showOpenseaHTML = false;
                        this.showOpenseaMp3 = false;
                        this.showOpenseaAnotherVideo = false;
                        this.openseaImgURLGLB = this.url + this.useToAccessFromAnywhere
                            .data_animation[
                                0];
                    } else if (this.useToAccessFromAnywhere.type_animation == 'gltf') {
                        this.showOpenseaImg = false;
                        this.showOpenseaGLBImg = false;
                        this.showOpenseaGLTFImg = true;
                        this.showOpenseaVideo = false;
                        this.showOpenseaHTML = false;
                        this.showOpenseaMp3 = false;
                        this.showOpenseaAnotherVideo = false;
                        this.openseaImgURLGLTF = this.url + this.useToAccessFromAnywhere
                            .data_animation[
                                0];
                    } else if (this.useToAccessFromAnywhere.type_animation == 'html') {
                        this.showOpenseaImg = false;
                        this.showOpenseaVideo = false;
                        this.showOpenseaHTML = true;
                        this.showOpenseaMp3 = false;
                        this.showOpenseaAnotherVideo = false;
                        this.openseaHtmlURL = this.useToAccessFromAnywhere
                            .url_ori_animation;
                    } else if (this.useToAccessFromAnywhere.type_animation == 'mp3') {
                        this.showOpenseaImg = false;
                        this.showOpenseaVideo = false;
                        this.showOpenseaHTML = false;
                        this.showOpenseaMp3 = true;
                        this.showOpenseaAnotherVideo = false;
                        this.openseaMp3URL = this.url + this.useToAccessFromAnywhere
                            .data_animation[0];
                        this.openseaImgURL = this.url + this.useToAccessFromAnywhere.data_img[0];
                    }
                }

                if (this.$route.query.label == 'HECO' || this.$route.query.label == 'heco') {
                    if (this.fromV3d == 'true') {
                        // 从3d展馆过来的
                        // 单图层的图片，不是视频
                        if (this.useToAccessFromAnywhere.type == 'layer' && this.useToAccessFromAnywhere.data[0]
                            .indexOf('mp4') == -1) {
                            // 显示type为layer的
                            this.showLayerFrom3d = true;
                            this.showCanvasFrom3d = false;
                            this.showSingleFrom3d = false;
                            this.showOpenseaImgFrom3d = false;
                            this.showOpenseaVideoFrom3d = false;
                            this.showOpenseaHTMLFrom3d = false;
                            this.showOpenseaMp3From3d = false;
                            this.showOpenseaAnotherVideoFrom3d = false;
                            this.layerUrlFrom3d = this.url + this.useToAccessFromAnywhere.data[0];
                            // single的时候，包含好几种情况
                        } else if (this.useToAccessFromAnywhere.type == 'single') {
                            // 显示type为single的
                            this.showLayerFrom3d = false;
                            this.showCanvasFrom3d = false;
                            this.showSingleFrom3d = true;
                            this.showOpenseaImgFrom3d = false;
                            this.showOpenseaVideoFrom3d = false;
                            this.showOpenseaHTMLFrom3d = false;
                            this.showOpenseaMp3From3d = false;
                            this.showOpenseaAnotherVideoFrom3d = false;
                            // 不是mp4，那就是单图层图片
                            if (this.useToAccessFromAnywhere.data[0].indexOf('mp4') == -1) {
                                this.layerUrlFrom3d = this.url + this.useToAccessFromAnywhere.data[0]
                                this.showLayerFrom3d = true;
                                this.showCanvasFrom3d = false;
                                this.showSingleFrom3d = false;
                                this.showOpenseaImgFrom3d = false;
                                this.showOpenseaVideoFrom3d = false;
                                this.showOpenseaHTMLFrom3d = false;
                                this.showOpenseaMp3From3d = false;
                                this.showOpenseaAnotherVideoFrom3d = false;
                                // 是视频
                            } else if (this.useToAccessFromAnywhere.data[0].indexOf('mp4') > -1) {
                                this.singleUrlFrom3d = this.url + this.useToAccessFromAnywhere.data[0];
                            }
                            // canvas，多图层的图片
                        } else if (this.useToAccessFromAnywhere.type == 'canvas') {
                            // 显示type为canvas的
                            this.showLayerFrom3d = false;
                            this.showCanvasFrom3d = true;
                            this.showSingleFrom3d = false;
                            this.showOpenseaImgFrom3d = false;
                            this.showOpenseaVideoFrom3d = false;
                            this.showOpenseaHTMLFrom3d = false;
                            this.showOpenseaMp3From3d = false;
                            this.showOpenseaAnotherVideoFrom3d = false;
                            this.canvasFrom3dList = this.useToAccessFromAnywhere.data
                        }
                    }
                    // url栏中的label的opensea资产
                } else if (this.$route.query.label == 'opensea') {
                    if (this.fromV3d == 'true') {
                        if (this.useToAccessFromAnywhere.type == 'img') {
                            this.showLayerFrom3d = false;
                            this.showCanvasFrom3d = false;
                            this.showSingleFrom3d = false;
                            this.showOpenseaImgFrom3d = true;
                            this.showOpenseaVideoFrom3d = false;
                            this.showOpenseaHTMLFrom3d = false;
                            this.showOpenseaMp3From3d = false;
                            this.showOpenseaAnotherVideoFrom3d = false;
                            this.openseaImgURLFrom3d = this.url + this.useToAccessFromAnywhere.data_img[0];
                            if (this.useToAccessFromAnywhere.type_img == 'mp4') {
                                this.showLayerFrom3d = false;
                                this.showCanvasFrom3d = false;
                                this.showSingleFrom3d = false;
                                this.showOpenseaImgFrom3d = false;
                                this.showOpenseaVideoFrom3d = false;
                                this.showOpenseaHTMLFrom3d = false;
                                this.showOpenseaMp3From3d = false;
                                this.showOpenseaAnotherVideoFrom3d = true;
                                this.openseaAnotherVideoURLFrom3d = this.url + this.useToAccessFromAnywhere
                                    .data_img[0];
                            }
                        } else if (this.useToAccessFromAnywhere.type_animation == 'mp4') {
                            this.showLayerFrom3d = false;
                            this.showCanvasFrom3d = false;
                            this.showSingleFrom3d = false;
                            this.showOpenseaImgFrom3d = false;
                            this.showOpenseaVideoFrom3d = true;
                            this.showOpenseaHTMLFrom3d = false;
                            this.showOpenseaMp3From3d = false;
                            this.showOpenseaAnotherVideoFrom3d = false;
                            this.openseaVideoURLFrom3d = this.url + this.useToAccessFromAnywhere
                                .data_animation[0];

                        } else if (this.useToAccessFromAnywhere.type_animation == 'mov') {
                            this.showLayerFrom3d = false;
                            this.showCanvasFrom3d = false;
                            this.showSingleFrom3d = false;
                            this.showOpenseaImgFrom3d = false;
                            this.showOpenseaVideoFrom3d = true;
                            this.showOpenseaHTMLFrom3d = false;
                            this.showOpenseaMp3From3d = false;
                            this.showOpenseaAnotherVideoFrom3d = false;
                            this.openseaVideoURLFrom3d = this.url + this.useToAccessFromAnywhere
                                .data_animation[0];

                        } else if (this.useToAccessFromAnywhere.type_animation == 'webm') {
                            this.showLayerFrom3d = false;
                            this.showCanvasFrom3d = false;
                            this.showSingleFrom3d = false;
                            this.showOpenseaImgFrom3d = false;
                            this.showOpenseaVideoFrom3d = true;
                            this.showOpenseaHTMLFrom3d = false;
                            this.showOpenseaMp3From3d = false;
                            this.showOpenseaAnotherVideoFrom3d = false;
                            this.openseaVideoURLFrom3d = this.url + this.useToAccessFromAnywhere
                                .data_animation[0];

                        } else if (this.useToAccessFromAnywhere.type_animation == 'html') {
                            this.showLayerFrom3d = false;
                            this.showCanvasFrom3d = false;
                            this.showSingleFrom3d = false;
                            this.showOpenseaImgFrom3d = false;
                            this.showOpenseaVideoFrom3d = false;
                            this.showOpenseaHTMLFrom3d = true;
                            this.showOpenseaMp3From3d = false;
                            this.showOpenseaAnotherVideoFrom3d = false;
                            this.openseaHtmlURLFrom3d = this.useToAccessFromAnywhere
                                .url_ori_animation;
                        } else if (this.useToAccessFromAnywhere.type_animation == 'mp3') {
                            this.showLayerFrom3d = false;
                            this.showCanvasFrom3d = false;
                            this.showSingleFrom3d = false;
                            this.showOpenseaImgFrom3d = false;
                            this.showOpenseaVideoFrom3d = false;
                            this.showOpenseaHTMLFrom3d = false;
                            this.showOpenseaMp3From3d = true;
                            this.showOpenseaAnotherVideoFrom3d = false;
                            this.openseaMp3URLFrom3d = this.url + this.useToAccessFromAnywhere
                                .data_animation[0];
                            this.openseaImgURL = this.url + this.useToAccessFromAnywhere.data_img[0];

                        }
                    }

                } else if (this.$route.query.label == 'notmint') {
                    if (this.fromV3d == 'true') {
                        // 从3d展馆过来的
                        // 单图层的图片，不是视频
                        if (this.useToAccessFromAnywhere.type == 'layer' && this.useToAccessFromAnywhere.data[0]
                            .indexOf('mp4') == -1) {
                            // 显示type为layer的
                            this.showNotmintLayerFrom3d = true;
                            this.showNotmintCanvasFrom3d = false;
                            this.showNotmintSingleFrom3d = false;
                            this.showOpenseaImgFrom3d = false;
                            this.showOpenseaVideoFrom3d = false;
                            this.showOpenseaHTMLFrom3d = false;
                            this.showOpenseaMp3From3d = false;
                            this.showOpenseaAnotherVideoFrom3d = false;
                            this.notmintLayerUrlFrom3d = this.url + this.useToAccessFromAnywhere.data[0];
                            // single的时候，包含好几种情况
                        } else if (this.useToAccessFromAnywhere.type == 'single') {
                            // 显示type为single的
                            this.showNotmintLayerFrom3d = false;
                            this.showNotmintCanvasFrom3d = false;
                            this.showNotmintSingleFrom3d = true;
                            this.showOpenseaImgFrom3d = false;
                            this.showOpenseaVideoFrom3d = false;
                            this.showOpenseaHTMLFrom3d = false;
                            this.showOpenseaMp3From3d = false;
                            this.showOpenseaAnotherVideoFrom3d = false;
                            // 不是mp4，那就是单图层图片
                            if (this.useToAccessFromAnywhere.data[0].indexOf('mp4') == -1) {
                                this.showNotmintLayerFrom3d = true;
                                this.showNotmintCanvasFrom3d = false;
                                this.showNotmintSingleFrom3d = false;
                                this.showOpenseaImgFrom3d = false;
                                this.showOpenseaVideoFrom3d = false;
                                this.showOpenseaHTMLFrom3d = false;
                                this.showOpenseaMp3From3d = false;
                                this.showOpenseaAnotherVideoFrom3d = false;
                                this.notmintLayerUrlFrom3d = this.url + this.useToAccessFromAnywhere.data[0]
                                // 是视频
                            } else if (this.useToAccessFromAnywhere.data[0].indexOf('mp4') > -1) {
                                this.notmintSingleUrlFrom3d = this.url + this.useToAccessFromAnywhere.data[0];
                            }
                            // canvas，多图层的图片
                        } else if (this.useToAccessFromAnywhere.type == 'canvas') {
                            // 显示type为canvas的
                            this.showNotmintLayerFrom3d = false;
                            this.showNotmintCanvasFrom3d = true;
                            this.showNotmintSingleFrom3d = false;
                            this.showOpenseaImgFrom3d = false;
                            this.showOpenseaVideoFrom3d = false;
                            this.showOpenseaHTMLFrom3d = false;
                            this.showOpenseaMp3From3d = false;
                            this.showOpenseaAnotherVideoFrom3d = false;
                            this.notMintCanvasFrom3dList = this.useToAccessFromAnywhere.data
                        }
                    }
                }
                // 若这3个变量都是空的话，说明是在新的标签页中了，就要使用请求得到的useToAccessFromAnywhere来显示资产了
            } else if (this.showCollection == null && this.showLike == null && this.showOpenseaCollection == null) {
                // 用的是url的label中的heco资产
                if (this.$route.query.label == 'heco' || this.$route.query.label == 'HECO') {
                    if (this.fromV3d == 'false') {
                        // 单图层的图片，不是视频
                        if (this.useToAccessFromAnywhere.type == 'layer' && this.useToAccessFromAnywhere.data[0]
                            .indexOf('mp4') == -1) {
                            // 显示type为layer的
                            this.showLayer = true;
                            this.showCanvas = false;
                            this.showSingle = false;
                            this.showOpenseaImg = false;
                            this.showOpenseaMp3 = false;
                            this.showOpenseaVideo = false;
                            this.showOpenseaAnotherVideo = false;
                            this.showOpenseaHTML = false;
                            this.layerUrl = this.url + this.useToAccessFromAnywhere.data[0];
                            // single的时候，包含好几种情况
                        } else if (this.useToAccessFromAnywhere.type == 'single') {
                            // 显示type为single的
                            this.showLayer = false;
                            this.showCanvas = false;
                            this.showSingle = true;
                            this.showOpenseaImg = false;
                            this.showOpenseaMp3 = false;
                            this.showOpenseaVideo = false;
                            this.showOpenseaAnotherVideo = false;
                            this.showOpenseaHTML = false;
                            // 不是mp4，那就是单图层图片
                            if (this.useToAccessFromAnywhere.data[0].indexOf('mp4') == -1) {
                                this.layerUrl = this.url + this.useToAccessFromAnywhere.data[0]
                                this.showLayer = true;
                                this.showCanvas = false;
                                this.showSingle = false;
                                this.showOpenseaImg = false;
                                this.showOpenseaMp3 = false;
                                this.showOpenseaVideo = false;
                                this.showOpenseaAnotherVideo = false;
                                this.showOpenseaHTML = false;
                                // 是视频
                            } else if (this.useToAccessFromAnywhere.data[0].indexOf('mp4') > -1) {
                                this.singleUrl = this.url + this.useToAccessFromAnywhere.data[0];
                            }
                            // canvas，多图层的图片
                        } else if (this.useToAccessFromAnywhere.type == 'canvas') {
                            // 显示type为canvas的
                            this.showLayer = false;
                            this.showCanvas = true;
                            this.showSingle = false;
                            this.showOpenseaImg = false;
                            this.showOpenseaMp3 = false;
                            this.showOpenseaVideo = false;
                            this.showOpenseaAnotherVideo = false;
                            this.showOpenseaHTML = false;
                            this.canvasList = this.useToAccessFromAnywhere.data
                        }
                    } else if (this.fromV3d == 'true') {
                        // 从3d展馆过来的
                        // 单图层的图片，不是视频
                        if (this.useToAccessFromAnywhere.type == 'layer' && this.useToAccessFromAnywhere.data[0]
                            .indexOf('mp4') == -1) {
                            // 显示type为layer的
                            this.showLayerFrom3d = true;
                            this.showCanvasFrom3d = false;
                            this.showSingleFrom3d = false;
                            this.showOpenseaImgFrom3d = false;
                            this.showOpenseaVideoFrom3d = false;
                            this.showOpenseaHTMLFrom3d = false;
                            this.showOpenseaMp3From3d = false;
                            this.showOpenseaAnotherVideoFrom3d = false;
                            this.layerUrlFrom3d = this.url + this.useToAccessFromAnywhere.data[0];
                            // single的时候，包含好几种情况
                        } else if (this.useToAccessFromAnywhere.type == 'single') {
                            // 显示type为single的
                            this.showLayerFrom3d = false;
                            this.showCanvasFrom3d = false;
                            this.showSingleFrom3d = true;
                            this.showOpenseaImgFrom3d = false;
                            this.showOpenseaVideoFrom3d = false;
                            this.showOpenseaHTMLFrom3d = false;
                            this.showOpenseaMp3From3d = false;
                            this.showOpenseaAnotherVideoFrom3d = false;
                            // 不是mp4，那就是单图层图片
                            if (this.useToAccessFromAnywhere.data[0].indexOf('mp4') == -1) {
                                this.layerUrlFrom3d = this.url + this.useToAccessFromAnywhere.data[0]
                                this.showLayerFrom3d = true;
                                this.showCanvasFrom3d = false;
                                this.showSingleFrom3d = false;
                                this.showOpenseaImgFrom3d = false;
                                this.showOpenseaVideoFrom3d = false;
                                this.showOpenseaHTMLFrom3d = false;
                                this.showOpenseaMp3From3d = false;
                                this.showOpenseaAnotherVideoFrom3d = false;
                                // 是视频
                            } else if (this.useToAccessFromAnywhere.data[0].indexOf('mp4') > -1) {
                                this.singleUrlFrom3d = this.url + this.useToAccessFromAnywhere.data[0];
                            }
                            // canvas，多图层的图片
                        } else if (this.useToAccessFromAnywhere.type == 'canvas') {
                            // 显示type为canvas的
                            this.showLayerFrom3d = false;
                            this.showCanvasFrom3d = true;
                            this.showSingleFrom3d = false;
                            this.showOpenseaImgFrom3d = false;
                            this.showOpenseaVideoFrom3d = false;
                            this.showOpenseaHTMLFrom3d = false;
                            this.showOpenseaMp3From3d = false;
                            this.showOpenseaAnotherVideoFrom3d = false;
                            this.canvasFrom3dList = this.useToAccessFromAnywhere.data
                        }
                    }
                    // url栏中的label的opensea资产
                } else if (this.$route.query.label == 'opensea') {
                    if (this.fromV3d == 'false') {
                        if (this.useToAccessFromAnywhere.type == 'img') {
                            this.showLayer = false;
                            this.showCanvas = false;
                            this.showSingle = false;
                            this.showOpenseaImg = true;
                            this.showOpenseaVideo = false;
                            this.showOpenseaHTML = false;
                            this.showOpenseaMp3 = false;
                            this.showOpenseaAnotherVideo = false;
                            this.openseaImgURL = this.url + this.useToAccessFromAnywhere.data_img[0];
                            if (this.useToAccessFromAnywhere.type_img == 'mp4') {
                                this.showLayer = false;
                                this.showCanvas = false;
                                this.showSingle = false;
                                this.showOpenseaAnotherVideo = true;
                                this.showOpenseaImg = false;
                                this.showOpenseaVideo = false;
                                this.showOpenseaHTML = false;
                                this.showOpenseaMp3 = false;
                                this.openseaAnotherVideoURL = this.url + this.useToAccessFromAnywhere
                                    .data_img[0];
                            }
                        } else if (this.useToAccessFromAnywhere.type_animation == 'mp4') {
                            this.showLayer = false;
                            this.showCanvas = false;
                            this.showSingle = false;
                            this.showOpenseaImg = false;
                            this.showOpenseaVideo = true;
                            this.showOpenseaHTML = false;
                            this.showOpenseaMp3 = false;
                            this.showOpenseaAnotherVideo = false;
                            this.openseaVideoURL = this.url + this.useToAccessFromAnywhere
                                .data_animation[0];

                        } else if (this.useToAccessFromAnywhere.type_animation == 'mov') {
                            this.showLayer = false;
                            this.showCanvas = false;
                            this.showSingle = false;
                            this.showOpenseaImg = false;
                            this.showOpenseaVideo = true;
                            this.showOpenseaHTML = false;
                            this.showOpenseaMp3 = false;
                            this.showOpenseaAnotherVideo = false;
                            this.openseaVideoURL = this.url + this.useToAccessFromAnywhere
                                .data_animation[0];

                        } else if (this.useToAccessFromAnywhere.type_animation == 'webm') {
                            this.showLayer = false;
                            this.showCanvas = false;
                            this.showSingle = false;
                            this.showOpenseaImg = false;
                            this.showOpenseaVideo = true;
                            this.showOpenseaHTML = false;
                            this.showOpenseaMp3 = false;
                            this.showOpenseaAnotherVideo = false;
                            this.openseaVideoURL = this.url + this.useToAccessFromAnywhere
                                .data_animation[0];

                        } else if (this.useToAccessFromAnywhere.type_animation == 'html') {
                            this.showLayer = false;
                            this.showCanvas = false;
                            this.showSingle = false;
                            this.showOpenseaImg = false;
                            this.showOpenseaVideo = false;
                            this.showOpenseaHTML = true;
                            this.showOpenseaMp3 = false;
                            this.showOpenseaAnotherVideo = false;
                            this.openseaHtmlURL = this.useToAccessFromAnywhere
                                .url_ori_animation;
                        } else if (this.useToAccessFromAnywhere.type_animation == 'mp3') {
                            this.showLayer = false;
                            this.showCanvas = false;
                            this.showSingle = false;
                            this.showOpenseaImg = false;
                            this.showOpenseaVideo = false;
                            this.showOpenseaHTML = false;
                            this.showOpenseaMp3 = true;
                            this.showOpenseaAnotherVideo = false;
                            this.openseaMp3URL = this.url + this.useToAccessFromAnywhere
                                .data_animation[0];
                            this.openseaImgURL = this.url + this.useToAccessFromAnywhere.data_img[0];

                        } else if (this.useToAccessFromAnywhere.type_animation == 'glb') {
                            this.showLayer = false;
                            this.showCanvas = false;
                            this.showSingle = false;
                            this.showOpenseaImg = false;
                            this.showOpenseaVideo = false;
                            this.showOpenseaHTML = false;
                            this.showOpenseaMp3 = false;
                            this.showOpenseaAnotherVideo = false;
                            this.showOpenseaGLBImg = true;
                            this.openseaImgURLGLB = this.url + this.useToAccessFromAnywhere.data_animation[0];

                        } else if (this.useToAccessFromAnywhere.type_animation == 'gltf') {
                            this.showLayer = false;
                            this.showCanvas = false;
                            this.showSingle = false;
                            this.showOpenseaImg = false;
                            this.showOpenseaVideo = false;
                            this.showOpenseaHTML = false;
                            this.showOpenseaMp3 = false;
                            this.showOpenseaAnotherVideo = false;
                            this.showOpenseaGLBImg = false;
                            this.showOpenseaGLTFImg = true;
                            this.openseaImgURLGLTF = this.url + this.useToAccessFromAnywhere.data_animation[0];

                        }
                    } else if (this.fromV3d == 'true') {
                        if (this.useToAccessFromAnywhere.type == 'img') {
                            this.showLayerFrom3d = false;
                            this.showCanvasFrom3d = false;
                            this.showSingleFrom3d = false;
                            this.showOpenseaImgFrom3d = true;
                            this.showOpenseaVideoFrom3d = false;
                            this.showOpenseaHTMLFrom3d = false;
                            this.showOpenseaMp3From3d = false;
                            this.showOpenseaAnotherVideoFrom3d = false;
                            this.openseaImgURLFrom3d = this.url + this.useToAccessFromAnywhere.data_img[0];
                            if (this.useToAccessFromAnywhere.type_img == 'mp4') {
                                this.showLayerFrom3d = false;
                                this.showCanvasFrom3d = false;
                                this.showSingleFrom3d = false;
                                this.showOpenseaImgFrom3d = false;
                                this.showOpenseaVideoFrom3d = false;
                                this.showOpenseaHTMLFrom3d = false;
                                this.showOpenseaMp3From3d = false;
                                this.showOpenseaAnotherVideoFrom3d = true;
                                this.openseaAnotherVideoURLFrom3d = this.url + this.useToAccessFromAnywhere
                                    .data_img[0];
                            }
                        } else if (this.useToAccessFromAnywhere.type_animation == 'mp4') {
                            this.showLayerFrom3d = false;
                            this.showCanvasFrom3d = false;
                            this.showSingleFrom3d = false;
                            this.showOpenseaImgFrom3d = false;
                            this.showOpenseaVideoFrom3d = true;
                            this.showOpenseaHTMLFrom3d = false;
                            this.showOpenseaMp3From3d = false;
                            this.showOpenseaAnotherVideoFrom3d = false;
                            this.openseaVideoURLFrom3d = this.url + this.useToAccessFromAnywhere
                                .data_animation[0];

                        } else if (this.useToAccessFromAnywhere.type_animation == 'mov') {
                            this.showLayerFrom3d = false;
                            this.showCanvasFrom3d = false;
                            this.showSingleFrom3d = false;
                            this.showOpenseaImgFrom3d = false;
                            this.showOpenseaVideoFrom3d = true;
                            this.showOpenseaHTMLFrom3d = false;
                            this.showOpenseaMp3From3d = false;
                            this.showOpenseaAnotherVideoFrom3d = false;
                            this.openseaVideoURLFrom3d = this.url + this.useToAccessFromAnywhere
                                .data_animation[0];

                        } else if (this.useToAccessFromAnywhere.type_animation == 'webm') {
                            this.showLayerFrom3d = false;
                            this.showCanvasFrom3d = false;
                            this.showSingleFrom3d = false;
                            this.showOpenseaImgFrom3d = false;
                            this.showOpenseaVideoFrom3d = true;
                            this.showOpenseaHTMLFrom3d = false;
                            this.showOpenseaMp3From3d = false;
                            this.showOpenseaAnotherVideoFrom3d = false;
                            this.openseaVideoURLFrom3d = this.url + this.useToAccessFromAnywhere
                                .data_animation[0];

                        } else if (this.useToAccessFromAnywhere.type_animation == 'html') {
                            this.showLayerFrom3d = false;
                            this.showCanvasFrom3d = false;
                            this.showSingleFrom3d = false;
                            this.showOpenseaImgFrom3d = false;
                            this.showOpenseaVideoFrom3d = false;
                            this.showOpenseaHTMLFrom3d = true;
                            this.showOpenseaMp3From3d = false;
                            this.showOpenseaAnotherVideoFrom3d = false;
                            this.openseaHtmlURLFrom3d = this.useToAccessFromAnywhere
                                .url_ori_animation;
                        } else if (this.useToAccessFromAnywhere.type_animation == 'mp3') {
                            this.showLayerFrom3d = false;
                            this.showCanvasFrom3d = false;
                            this.showSingleFrom3d = false;
                            this.showOpenseaImgFrom3d = false;
                            this.showOpenseaVideoFrom3d = false;
                            this.showOpenseaHTMLFrom3d = false;
                            this.showOpenseaMp3From3d = true;
                            this.showOpenseaAnotherVideoFrom3d = false;
                            this.openseaMp3URLFrom3d = this.url + this.useToAccessFromAnywhere
                                .data_animation[0];
                            this.openseaImgURL = this.url + this.useToAccessFromAnywhere.data_img[0];

                        } else if (this.useToAccessFromAnywhere.type_animation == 'glb') {
                            this.showLayerFrom3d = false;
                            this.showCanvasFrom3d = false;
                            this.showSingleFrom3d = false;
                            this.showOpenseaImgFrom3d = false;
                            this.showOpenseaVideoFrom3d = false;
                            this.showOpenseaHTMLFrom3d = false;
                            this.showOpenseaMp3From3d = false;
                            this.showOpenseaAnotherVideoFrom3d = false;
                            this.showOpenseaGLBImgFrom3d = true;
                            this.openseaImgURLGLBFrom3d = this.url + this.useToAccessFromAnywhere.data_animation[0];
                        } else if (this.useToAccessFromAnywhere.type_animation == 'gltf') {
                            this.showLayerFrom3d = false;
                            this.showCanvasFrom3d = false;
                            this.showSingleFrom3d = false;
                            this.showOpenseaImgFrom3d = false;
                            this.showOpenseaVideoFrom3d = false;
                            this.showOpenseaHTMLFrom3d = false;
                            this.showOpenseaMp3From3d = false;
                            this.showOpenseaAnotherVideoFrom3d = false;
                            this.showOpenseaGLBImgFrom3d = false;
                            this.showOpenseaGLTFImgFrom3d = true;
                            this.openseaImgURLGLTFFrom3d = this.url + this.useToAccessFromAnywhere.data_animation[
                                0];
                        }
                    }

                } else if (this.$route.query.label == 'notmint') {
                    if (this.fromV3d == 'false') {
                        // 单图层的图片，不是视频
                        if (this.useToAccessFromAnywhere.type == 'layer' && this.useToAccessFromAnywhere.data[0]
                            .indexOf('mp4') == -1) {
                            // 显示type为layer的
                            this.showNotmintLayer = true;
                            this.showNotmintCanvas = false;
                            this.showNotmintSingle = false;
                            this.showOpenseaImg = false;
                            this.showOpenseaMp3 = false;
                            this.showOpenseaVideo = false;
                            this.showOpenseaAnotherVideo = false;
                            this.showOpenseaHTML = false;
                            this.notmintLayerUrl = this.url + this.useToAccessFromAnywhere.data[0];
                            // single的时候，包含好几种情况
                        } else if (this.useToAccessFromAnywhere.type == 'single') {
                            // 显示type为single的
                            this.showNotmintLayer = false;
                            this.showNotmintCanvas = false;
                            this.showNotmintSingle = true;
                            this.showOpenseaImg = false;
                            this.showOpenseaMp3 = false;
                            this.showOpenseaVideo = false;
                            this.showOpenseaAnotherVideo = false;
                            this.showOpenseaHTML = false;
                            // 不是mp4，那就是单图层图片
                            if (this.useToAccessFromAnywhere.data[0].indexOf('mp4') == -1) {
                                this.notmintLayerUrl = this.url + this.useToAccessFromAnywhere.data[0]
                                this.showNotmintLayer = true;
                                this.showNotmintCanvas = false;
                                this.showNotmintSingle = false;
                                this.showOpenseaImg = false;
                                this.showOpenseaMp3 = false;
                                this.showOpenseaVideo = false;
                                this.showOpenseaAnotherVideo = false;
                                this.showOpenseaHTML = false;
                                // 是视频
                            } else if (this.useToAccessFromAnywhere.data[0].indexOf('mp4') > -1) {
                                this.notmintSingleUrl = this.url + this.useToAccessFromAnywhere.data[0];
                            }
                            // canvas，多图层的图片
                        } else if (this.useToAccessFromAnywhere.type == 'canvas') {
                            // 显示type为canvas的
                            this.showNotmintLayer = false;
                            this.showNotmintCanvas = true;
                            this.showNotmintSingle = false;
                            this.showOpenseaImg = false;
                            this.showOpenseaMp3 = false;
                            this.showOpenseaVideo = false;
                            this.showOpenseaAnotherVideo = false;
                            this.showOpenseaHTML = false;
                            this.notMintCanvasList = this.useToAccessFromAnywhere.data
                        }
                    } else if (this.fromV3d == 'true') {
                        // 从3d展馆过来的
                        // 单图层的图片，不是视频
                        if (this.useToAccessFromAnywhere.type == 'layer' && this.useToAccessFromAnywhere.data[0]
                            .indexOf('mp4') == -1) {
                            // 显示type为layer的
                            this.showNotmintLayerFrom3d = true;
                            this.showNotmintCanvasFrom3d = false;
                            this.showNotmintSingleFrom3d = false;
                            this.showOpenseaImgFrom3d = false;
                            this.showOpenseaVideoFrom3d = false;
                            this.showOpenseaHTMLFrom3d = false;
                            this.showOpenseaMp3From3d = false;
                            this.showOpenseaAnotherVideoFrom3d = false;
                            this.notmintLayerUrlFrom3d = this.url + this.useToAccessFromAnywhere.data[0];
                            // single的时候，包含好几种情况
                        } else if (this.useToAccessFromAnywhere.type == 'single') {
                            // 显示type为single的
                            this.showNotmintLayerFrom3d = false;
                            this.showNotmintCanvasFrom3d = false;
                            this.showNotmintSingleFrom3d = true;
                            this.showOpenseaImgFrom3d = false;
                            this.showOpenseaVideoFrom3d = false;
                            this.showOpenseaHTMLFrom3d = false;
                            this.showOpenseaMp3From3d = false;
                            this.showOpenseaAnotherVideoFrom3d = false;
                            // 不是mp4，那就是单图层图片
                            if (this.useToAccessFromAnywhere.data[0].indexOf('mp4') == -1) {
                                this.showNotmintLayerFrom3d = true;
                                this.showNotmintCanvasFrom3d = false;
                                this.showNotmintSingleFrom3d = false;
                                this.showOpenseaImgFrom3d = false;
                                this.showOpenseaVideoFrom3d = false;
                                this.showOpenseaHTMLFrom3d = false;
                                this.showOpenseaMp3From3d = false;
                                this.showOpenseaAnotherVideoFrom3d = false;
                                this.notmintLayerUrlFrom3d = this.url + this.useToAccessFromAnywhere.data[0]
                                // 是视频
                            } else if (this.useToAccessFromAnywhere.data[0].indexOf('mp4') > -1) {
                                this.notmintSingleUrlFrom3d = this.url + this.useToAccessFromAnywhere.data[0];
                            }
                            // canvas，多图层的图片
                        } else if (this.useToAccessFromAnywhere.type == 'canvas') {
                            // 显示type为canvas的
                            this.showNotmintLayerFrom3d = false;
                            this.showNotmintCanvasFrom3d = true;
                            this.showNotmintSingleFrom3d = false;
                            this.showOpenseaImgFrom3d = false;
                            this.showOpenseaVideoFrom3d = false;
                            this.showOpenseaHTMLFrom3d = false;
                            this.showOpenseaMp3From3d = false;
                            this.showOpenseaAnotherVideoFrom3d = false;
                            this.notMintCanvasFrom3dList = this.useToAccessFromAnywhere.data
                        }
                    }
                }
            }


        },
        beforeCreate() {

            window.sessionStorage.setItem('fromV3dApp', true);
        },
        created() {
            window.sessionStorage.setItem('fromV3dApp', true);
        }
    }
</script>

<style lang="less" scoped>
    @import '~@/assets/stylesheet/collectionShow.less';
</style>