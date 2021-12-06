<template>
    <div id="app" class="no-drag ">
        <component :is="this.$route.meta.layout || 'div'">
            <vue-page-transition class="h100p">
                <router-view />
            </vue-page-transition>
        </component>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import Navigator from "@/components/layout/navigator/Navigator.vue";

import MetaSetting from "@/utils/meta"

@Component({
    components: { Navigator },
})
export default class App extends Vue {
    // metaInfo:{
    //     title:'ZEMPIE',
    //     titleTemplate:'게임 공유 플랫폼',
    // }
    async mounted() {
        console.log('process.env.VUE_ROUTER_MODE', process.env.VUE_APP_ROUTER_MODE)
        await this.$store.dispatch("loginState");

        //  if( state === LoginState.login ) {
        //     if( !this.$store.getters.user.is_developer ) {
        //         await this.$router.replace('/signup').catch(()=>{});
        //     }
        // }
        // else {
        //     await this.$router.replace('/login');
        // }
    }


}
</script>

<style lang="scss">
// @import "./css/styles.css";
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap");

@import "./assets/css/fonts.css";
@import "./assets/css/style.css";
@import "./assets/css/layout.css";
@import "./assets/css/common.css";
@import "./assets/css/content.css";

@import "https://unicons.iconscout.com/release/v3.0.3/css/line.css";
@import "https://unicons.iconscout.com/release/v3.0.3/css/solid.css";
@import "https://cdn.jsdelivr.net/npm/xeicon@2.3.3/xeicon.min.css";

#app {
    font-family: "Noto Sans KR", "sans-serif";
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    //text-align: center;
    //color: #2c3e50;

    // margin-top: 60px;
}

.no-drag {
    -ms-user-select: none;
    -moz-user-select: -moz-none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    user-select: none;
}

//toast
.toast-success{
    color: #F97316 !important;
    border-color: #F97316 !important;
}
//common
.min-vh-100{
    min-height: 100vh;
}

.no-result {
    display: flex;
    align-content: center;
    justify-content: center;
    flex-direction: column;
    flex-wrap: wrap;

    h1 {
        color: #333;
        font-size: 18px;
        margin-bottom: 10px;
    }

    img {
        margin: 0 auto
    }

}
</style>