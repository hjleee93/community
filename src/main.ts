import Vue from 'vue'
import Component from 'vue-class-component'
import App from './App.vue'
import router from './router'
import store from './store'
import './api/api';
import './plugins/firebase'
import './plugins/axios'
import 'vuedraggable'
import {i18n} from './plugins/i18n';
import 'tiny-slider'

import {BootstrapVue, BootstrapVueIcons} from 'bootstrap-vue'
import AOS from 'aos';
import "aos/dist/aos.css";
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';

import Toasted from 'vue-toasted';
import 'remixicon/fonts/remixicon.css'
import Vuelidate from 'vuelidate'
import vueDebounce from 'vue-debounce'
//ga
import './plugins/analytics';
import VueMeta from 'vue-meta'
//퍼블리싱
import VuePageTransition from 'vue-page-transition'
import vSelect from 'vue-select'
import DropdownMenu from 'v-dropdown-menu'
import VueTilt from 'vue-tilt.js'
import VModal from 'vue-js-modal'
import 'swiper/css/swiper.css'
import 'vue-select/dist/vue-select.css';
import 'v-dropdown-menu/dist/v-dropdown-menu.css';
import axios from "axios";

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(Vuelidate)
Vue.use(Toasted)
Vue.use(vueDebounce)
Vue.use(VueMeta)
Vue.use(VuePageTransition);
Vue.component('v-select', vSelect);
Vue.use(DropdownMenu);
Vue.use(VModal, {dynamic: true});
Vue.use(VueTilt);

Component.registerHooks([
    'beforeRouteEnter',
    'beforeRouteLeave',
    'beforeRouteUpdate'
])


Vue.config.productionTip = false;


router.beforeEach((to, from, next) => {

    if (from.name !== 'redirect') {
        store.commit('fromRouterName', from.name);
    }
    let lang = to.params.locale;

    if (!lang) {
        lang = 'ko'
    }
    i18n.locale = lang;
    next();
})

new Vue({
    router,
    store,
    i18n,
    created() {
        AOS.init();
    },
    components: {PulseLoader},
    render: h => h(App)
}).$mount('#app')
