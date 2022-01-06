import Vue, { PluginObject } from 'vue';
import axios, { AxiosInstance } from "axios";
import store from './../store';

declare module 'vue/types/vue' {
  interface Vue {
    $axios: AxiosInstance,
  }

  interface VueConstructor {
    $axios: AxiosInstance
  }
}


let config = {
  baseURL: process.env.VUE_APP_BASE_API || process.env.baseURL || process.env.apiUrl || '',
  validateStatus: function (status) {
    return status < 300 && status >= 200; // Resolve only if the status code is less than 500
  }
};
const _axios = axios.create(config);

_axios.interceptors.request.use(
  (cfg) => {
    store.commit('startLoading');
    // console.log('interceptor', store.getters.idToken)
    if (store.getters.idToken) {
      cfg.headers.authorization = `Bearer ${store.getters.idToken}`;
    }

    return cfg;
  },
  (err) => {
    store.commit('endLoading');
    // Do something with request error
    return Promise.reject(err);
  },
);

_axios.interceptors.response.use(
  (res) => {
    store.commit('endLoading');
    // if ( res.data.result ) {
    //   res.data = res.data.result;
    // }
    // else if ( res.data.data ) {
    //   res.data = res.data.data;
    // }

    return res;
  },
  (err) => {
    store.commit('endLoading');
    // Do something with response error
    return Promise.reject(err);
  },
);


const Plugin: PluginObject<any> = {
  install: (Vue) => {
    Vue.$axios = _axios;
  },
};
Plugin.install = (Vue) => {
  Vue.$axios = _axios;
  Object.defineProperties(Vue.prototype, {
    $axios: {
      get() {
        return _axios;
      },
    },
  });
};

Vue.use(Plugin);
export default Plugin;
