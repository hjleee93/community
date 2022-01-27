<template>
    <div id="app" class="no-drag ">
        <component :is="this.$route.meta.layout || 'div'">
            <vue-page-transition class="h100p">
                <router-view/>
            </vue-page-transition>
        </component>

        <modal :clickToClose="false" class="modal-area-type" name="needLogin" width="90%" height="auto" :maxWidth="380"
               :adaptive="true"
               :scrollable="true">
            <div class="modal-alert">
                <dl class="ma-header">
                    <dt>{{ $t('information') }}</dt>
                    <dd>
                        <button @click="$modal.hide('needLogin')"><i class="uil uil-times"></i></button>
                    </dd>
                </dl>
                <div class="ma-content">
                    <h2> 회원만 이용가능한 서비스입니다.<br/>로그인 하시겠습니까?</h2>
                    <div>
                        <button class="btn-default" style="width: 100%" @click="moveLogin">로그인</button>
                    </div>
                </div>

            </div>
        </modal>


    </div>
</template>

<script lang="ts">
import {Component, Vue, Watch} from "vue-property-decorator";
import store from '@/store'
import MetaSetting from "@/plugins/meta"
import {mapGetters} from "vuex";
import {SUPPORTED_LOCALES} from '@/common/locale';

@Component({
    components: {},
})
export default class App extends Vue {
    // metaInfo:{
    //     title:'ZEMPIE',
    //     titleTemplate:'게임 공유 플랫폼',
    // }
    path = "/";
    locales =  SUPPORTED_LOCALES;

    async mounted() {
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
        this.$router.push(`/${this.$i18n.locale}/login`)
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
    -moz-user-select: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    user-select: none;
}

//dropdown
.stage-select-box .vs__dropdown-toggle {display:flex; margin-top:0px !important; align-items:center; width:150px; height:38px; padding:0 5px 2px 5px; border:#e5e5e5 1px solid !important; border-radius:5px !important;}
.stage-select-box .vs__selected-options {display:flex; margin-top:0px !important; align-items:center; flex-wrap:nowrap;}
.stage-select-box .vs__selected {line-height:13px !important;}
.stage-select-box .vs__actions {margin-top: 0px !important;}
.stage-select-box .vs__dropdown-menu {min-width:120px !important;  padding:10px; border-radius:10px;}
.stage-select-box .vs__dropdown-menu li {padding:7px; border-radius:4px;}
.stage-select-box .vs__dropdown-menu li:hover {background:#F97316;}
.stage-select-box .vs__dropdown-option--highlight {background:#F97316;}
.stage-select-box .vs__clear {display:none;}
.stage-select-box .vs__open-indicator {fill:#999;}

//
.tab-menu-swiper + div {
    min-height: 500px;
}

//loading spinner
.v-spinner {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100px;

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
.header-search-dropdown .v-dropdown-menu__container {
    min-width: 260px;
    margin: 30px 0 0 -321px !important;
}

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

.tapl-content {
    p {
        margin-top: 0.75em;
        min-height: 20px;
    }

    h1 {
        display: block !important;
        font-size: 2em !important;
        margin-block-start: 0.67em !important;
        margin-block-end: 0.67em !important;
        margin-inline-start: 0px !important;
        margin-inline-end: 0px !important;
        font-weight: bold !important;
    }

    .audio-wrapper {
        margin: 20px 20px 0 20px;
        display: flex;
        align-items: center;
        border-radius: 5px;
        background: #f5f5f5;
        flex-direction: column;

        audio {
            width: 100%;
        }

        p {

            width: 100%;
            height: 30px;
            padding-left: 20px;
        }

        &.ProseMirror-selectednode {
            outline: 3px solid #F97316;
        }

    }

    .iframe-wrapper {
        position: relative;
        overflow: hidden;
        width: 100%;
        height: 300px;

        &.ProseMirror-selectednode {
            outline: 3px solid #F97316 !important;
        }

        iframe {
            position: absolute;
            top: 0;
            left: 0;
            width: 100% !important;
            height: 100% !important;
        }
    }

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

    ul {
        padding: 0 1.5rem;
        list-style-type: disc;
    }

    ol {
        padding: 0 1.5rem;
        list-style-type: decimal;
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

.editor-container.blog {
    .ProseMirror {
        > * + * {
            margin-top: 0.75em;
        }

        height: 75vh;
    }

    h1 {
        display: block;
        font-size: 2em;
        margin-block-start: 0.67em;
        margin-block-end: 0.67em;
        margin-inline-start: 0px;
        margin-inline-end: 0px;
        font-weight: bold;
    }
}

.editor-container, {
    height: 100%;
    text-align: left;
    padding: 15px;

    .ProseMirror {
        > * + * {
            margin-top: 0.75em;
        }


        height: 148px;
        overflow: auto;

        p.is-editor-empty:first-child::before {
            content: attr(data-placeholder);
            float: left;
            color: #adb5bd;
            pointer-events: none;
            height: 0;
        }

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

        ul {
            padding: 0 1.5rem;
            list-style-type: disc;
        }

        ol {
            padding: 0 1.5rem;
            list-style-type: decimal;
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


            &.ProseMirror-selectednode {
                margin-left: 3px;
                margin-top: 3px;
                outline: 3px solid #F97316;
            }
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
        overflow: hidden;

        &.ProseMirror-selectednode {
            outline: 3px solid #F97316;
        }

        iframe {
            position: absolute;
            top: 0;
            left: 0;
            width: 100% !important;
            height: 100% !important;
        }
    }

    .audio-wrapper {
        margin: 20px 20px 0 20px;
        display: flex;
        align-items: center;
        border-radius: 5px;
        background: #f5f5f5;
        flex-direction: column;

        audio {
            width: 100%;
        }

        p {
            width: 100%;
            height: 30px;
            padding-left: 20px;
        }

        &.ProseMirror-selectednode {
            outline: 3px solid #F97316;
        }
    }
}

.ct-info {
    background-color: red;
}
</style>