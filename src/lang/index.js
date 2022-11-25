// 中英文切换
import Vue from 'vue';
import VueI18n from 'vue-i18n';
Vue.use(VueI18n);

const i18n = new VueI18n({
    locale: window.localStorage.getItem('languageStorage') || 'en',
    messages: {
        'zh': require('./zh'),
        'en': require('./en'),
        'spa': require('./spanish')
    },
});

export default i18n;