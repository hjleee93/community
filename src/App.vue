<template>
    <div id="app" class="no-drag">
        <template v-if="$route.name && $route.name.toLowerCase() !== 'login'">
            <navigator></navigator>
        </template>
        <router-view />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import Navigator from "@/components/layout/navigator/Navigator.vue";
import Dropdown from "@/plugins/dropdown";

import MetaSetting from "@/utils/meta"

@Component({
    components: { Navigator },
})
export default class App extends Vue {
    private dropdown: Dropdown = new Dropdown();
    // metaInfo:{
    //     title:'ZEMPIE',
    //     titleTemplate:'게임 공유 플랫폼',
    // }
    async mounted() {
        await this.$store.dispatch("loginState");
        this.dropdown.init();

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
@import "./css/modal.scss";
@import "./css/common.scss";
@import "./css/simplebar.css";
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap");

#app {
    font-family: "Noto Sans KR", "sans-serif";
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;

    // margin-top: 60px;
}

.no-drag {
    -ms-user-select: none;
    -moz-user-select: -moz-none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    user-select: none;
}
</style>