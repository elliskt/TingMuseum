import Vue from 'vue'
import Vuex from 'vuex'
import I18N from '../lang/index'; //为了在router的index.js中使用i18n所引入

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        time: "night",
        isConnect: false,
        walletAddress: I18N.t('header.connectWallet'),
        description: '',
        personal_url: '',
        image_avatar: require('@/assets/personal/defaultAvatar.png'),
        facebook_url: '',
        twitter_url: '',
        pinter_url: '',
        instagram_url: '',
        userName: '',
        _id: '',
        followShow: true,
        mainAccount: 'mainAddress',
        showEditCoverPage: true,
        showEditProfile: true,
        url: 'http://127.0.0.1:8800/',
        since_time: '',
        switchLang: true,
        showAddress: false,
        intoShow: false,
        useToShowMuseum: '',
        space: I18N.t('setUP.space'),
        gallery: I18N.t('setUP.gallery'),
        cyberpunk: I18N.t('setUP.cyberpunk'),
        museumList: '',
        allMuseumlist: '',
        museumIndex: '',
        ActivityNewFlag: 'new'
    },
    mutations: {
        changeActivityNewFlag(state, data) {
            state.ActivityNewFlag = data;
        },
        updateMuseumList(state, data) {
            state.museumList = data;
        },
        updateAllMuseumList(state, data) {
            state.allMuseumlist = data;
        },
        updateMuseumIndex(state, data) {
            state.museumIndex = data;
        },
        updateTime(state, data) {
            state.time = data
        },
        updateConnectStatus(state, data) {
            state.isConnect = data
        },
        updateWalletAddress(state, data) {
            state.walletAddress = data
        },
        // from here
        updateDescription(state, data) {
            state.description = data
        },
        updatePersonal_url(state, data) {
            state.personal_url = data
        },
        updateImage_avatar(state, data) {
            state.image_avatar = data
        },
        updateFacebook_url(state, data) {
            state.facebook_url = data
        },
        updateTwitter_url(state, data) {
            state.twitter_url = data
        },
        updatePinter_url(state, data) {
            state.pinter_url = data
        },
        updateInstagram_url(state, data) {
            state.instagram_url = data
        },
        updateUserName(state, data) {
            state.userName = data
        },
        updateId(state, data) {
            state._id = data
        },
        updateFollowShow(state, data) {
            state.followShow = data
        },
        updateMainAccount(state, data) {
            state.mainAccount = data
        },
        updateShowEditCoverPage(state, data) {
            state.showEditCoverPage = data
        },
        updateShowEditProfile(state, data) {
            state.showEditProfile = data
        },
        updateSinceTime(state, data) {
            var tempTime = data.slice(0, 23);
            state.since_time = tempTime
        },
        updateSwitchLang(state, data) {
            state.switchLang = data;
        },
        updateShowAddress(state, data) {
            state.showAddress = data
        },
        updateIntoShow(state, data) {
            state.intoShow = data
        },
        updateUseToShowMuseum(state, data) {
            state.useToShowMuseum = data
        },
    },
    actions: {},
    modules: {}
})