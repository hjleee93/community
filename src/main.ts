import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './api/api';
import './plugins/firebase'
import './plugins/axios'
import 'vuedraggable'

import 'tiny-slider'
import '@/script/utils/svg-loader'

import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

import "./css/styles.css";
import 'remixicon/fonts/remixicon.css'

import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)

import VTooltip from 'v-tooltip'
Vue.use(VTooltip)

import vuescroll from 'vuescroll/dist/vuescroll-slide';
Vue.use(vuescroll);

import 'overlayscrollbars/css/OverlayScrollbars.css';
import { OverlayScrollbarsPlugin } from 'overlayscrollbars-vue';
Vue.use(OverlayScrollbarsPlugin);

import Toasted from 'vue-toasted';
Vue.use(Toasted)

export const bus = new Vue();




Vue.config.productionTip = false

new Vue({
  router,
  store,

  render: h => h(App)
}).$mount('#app')
