import { languages } from '../../translation_tool/languages'
import Vue from 'vue';
import VueI18n from 'vue-i18n';

declare module 'vue/types/vue' {
    interface Vue {
        i18n: VueI18n;
    }
}

const messages = Object.assign(languages)
Vue.use(VueI18n);

export const i18n = new VueI18n({
    silentTranslationWarn: true,
    locale: navigator.language.split('-')[0],
    fallbackLocale: "en-us",
    messages

});