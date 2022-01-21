import Vue from 'vue'
import VueRouter, {RouteConfig} from 'vue-router'
import {i18n} from "@/plugins/i18n";
import routes from './router'
import {SUPPORTED_LOCALES} from '../common/locale';
Vue.use(VueRouter)


// duplicate error
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    //@ts-ignore
    return originalPush.call(this, location).catch(err => {
        if (err.name !== 'NavigationDuplicated') throw err;
    });
};

function getLocaleRegex() {
    let reg = ''
    SUPPORTED_LOCALES.forEach((locale, index) => {
        reg = `${reg}${locale.code}${index !== SUPPORTED_LOCALES.length - 1 ? '|' : ''}`
    })
    return `(${reg})`
}

const router = new VueRouter({
    scrollBehavior: () => ({x: 0, y: 0}),
    //@ts-ignore
    mode: process.env.VUE_APP_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE,
    routes: [
        {
          path:'/',
          redirect:`/${i18n.locale}`
        },
        {
        path: `/:locale${getLocaleRegex()}?`,
        component: {
            template: '<router-view></router-view>'
        },
        children: routes
    }]
});

//title 설정
router.afterEach((to, from) => {
    // i18n.locale = to.params.lang;
    Vue.nextTick(() => {
        document.title = to.meta!.title;
    });
});

export default router
