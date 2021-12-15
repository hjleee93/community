<template>
    <div id="app" class="no-drag ">
        <component :is="this.$route.meta.layout || 'div'">
            <vue-page-transition class="h100p">
                <router-view/>
            </vue-page-transition>
        </component>
        <modal
            name="needLogin"
            centered
            classes="vue-modal"
            no-close-on-backdrop
        >
            <slot name="modalContent"></slot>
            <div class="pw-reset">
                <div class="pr-title">
                    <h3>로그인</h3>

                </div>
                <div class="pr-content">
                    <div>로그인 하신 후 이용하실 수 있습니다</div>
                    <p><a @click="moveLogin" class="btn-default-big">로그인하기</a></p>
                </div>
            </div>


        </modal>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";

import MetaSetting from "@/plugins/meta"

@Component({
    components: {},
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

    moveLogin() {
        this.$modal.hide('needLogin')
        this.$router.push('/login')
    }


}
</script>

<style lang="scss">
@use "sass:math";
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
.toast-success {
    color: #F97316 !important;
    border-color: #F97316 !important;
}

.toast-danger {
    color: #dc3545 !important;
    border-color: #dc3545 !important;
}

//common
.min-vh-100 {
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

//header
.header-search-dropdown .v-dropdown-menu__container {min-width:260px; margin:30px 0 0 -321px !important;}
.vue-modal {
    border-radius: 20px !important;
    max-height: 500px !important;
}

.post-modal {
    height: 418px !important;
    border-radius: 10px !important;
}

//timeline
.attr-img {
    max-width: 100%;
}

//tiptap

.tapl-content{

    pre {
        overflow: auto;
        background: #0D0D0D !important;
        color: #fff !important;
        font-family: JetBrainsMono, monospace !important;
        padding: 0.75rem 1rem !important;
        border-radius: 0.5rem !important;
    }

    pre code {
        width: 512px !important;
        max-width: 512px !important;
        color: inherit !important;
        padding: 0 !important;
        background: none !important;
        font-size: .8rem !important;
    }
}
.editor-container {
    height: 100%;
    text-align: left;
    padding: 15px;

    .ProseMirror {
        > * + * {
            margin-top: 0.75em;
        }

        height: 148px;
        overflow: auto;

        pre {
            overflow: auto;
            background: #0D0D0D;
            color: #fff;
            font-family: JetBrainsMono, monospace;
            padding: 0.75rem 1rem;
            border-radius: 0.5rem;
        }

        pre code {
            color: inherit;
            padding: 0;
            background: none;
            font-size: .8rem;
        }
        ul,
        ol {
            padding: 0 1rem;
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
            line-height: 1.1;
        }

        code {
            background-color: rgba(#616161, 0.1);
            color: #616161;
        }

        pre {
            overflow: auto;
            background: #0D0D0D;
            color: #FFF;
            font-family: 'JetBrainsMono', monospace;
            padding: 0.75rem 1rem;
            border-radius: 0.5rem;

            code {
                color: inherit;
                padding: 0;
                background: none;
                font-size: 0.8rem;
            }
        }

        img {
            max-width: 100%;
            height: auto;
        }

        hr {
            margin: 1rem 0;
        }

        blockquote {
            padding-left: 1rem;
            border-left: 2px solid rgba(#0D0D0D, 0.1);
        }
    }

    .ProseMirror:focus-visible {
        outline-color: transparent;
    }


    .iframe-wrapper {
        position: relative;
        padding-bottom: math.div(100, 16) * 9%;
        height: 0;
        overflow: hidden;
        width: 100%;
        height: auto;

        &.ProseMirror-selectednode {
            outline: 3px solid #68cef8;
        }

        iframe {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }
    }

    .audio-wrapper {
        position: relative;
        overflow: hidden;
        width: 360px;
        height: 100px;

        &.ProseMirror-selectednode {
            outline: 3px solid #68cef8;
        }
    }
}

.ct-info {
    background-color: red;
}
</style>