import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './api/api';
import './plugins/firebase'
import './plugins/axios'
import 'vuedraggable'

import 'tiny-slider'

import {BootstrapVue, BootstrapVueIcons} from 'bootstrap-vue'
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

import 'remixicon/fonts/remixicon.css'

import Vuelidate from 'vuelidate'

Vue.use(Vuelidate)

import AOS from 'aos';
import "aos/dist/aos.css";
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import VTooltip from 'v-tooltip'

Vue.use(VTooltip)


import 'overlayscrollbars/css/OverlayScrollbars.css';
import {OverlayScrollbarsPlugin} from 'overlayscrollbars-vue';

Vue.use(OverlayScrollbarsPlugin);

import Toasted from 'vue-toasted';

Vue.use(Toasted)


Vue.config.productionTip = false

//VUE-META
import VueMeta from 'vue-meta'

Vue.use(VueMeta)

//modal
import VModal from 'vue-js-modal'
Vue.use(VModal, { dynamic: true });

//ga
import './plugins/analytics';
//퍼블리싱
import VuePageTransition from 'vue-page-transition'
import vSelect from 'vue-select'
import DropdownMenu from 'v-dropdown-menu'

import 'swiper/css/swiper.css'
import 'vue-select/dist/vue-select.css';
import 'v-dropdown-menu/dist/v-dropdown-menu.css';

Vue.use(VuePageTransition);
Vue.component('v-select', vSelect);
Vue.use(DropdownMenu);


new Vue({
    router,
    store,
    created() {
        AOS.init();
    },
    components: {PulseLoader},
    render: h => h(App)
}).$mount('#app')
