<template>
    <!-- 상단영역 -->
    <div class="header">
        <dl>
            <dt>
                <div class="header-logo-menu">
                    <p>
                        <i class="uil uil-bars" v-on:click="headerSideOpenMobile"></i>
                        <router-link :to="`/`">
                            <img src="../assets/images/zempie-logo-black.png" width="120"/>
                        </router-link>
                    </p>
                    <ul class="menu">
                        <li>
                            <router-link :to="`/${$i18n.locale}/communityList`"
                                         :class="$route.name === 'CommunityList' ? 'active' : ''">
                                COMMUNITY
                            </router-link>
                        </li>
                        <li>
                            <router-link :to="`/${$i18n.locale}/gameList`"
                                         :class="$route.name === 'GameList' ? 'active' : ''">GAME
                            </router-link>
                        </li>
                    </ul>
                </div>
            </dt>

            <dd>
                <div class="header-search">
                    <div class="input-search-line">
                        <p><i class="uil uil-search"></i>
                        <p>
                        <div>
                            <input type="text"
                                   name=""
                                   title="keywords"
                                   :placeholder="$t('needSearchInput')"
                                   v-model="searchInput"
                                   @keyup.enter="moveSearchPage"
                                   v-debounce:150ms="searchType"/>
                        </div>
                    </div>
                </div>
                <div class="header-language">
                    <v-select class="hl-select-box" :options="locales" :placeholder="$t('korean')"
                              :reduce="name => name.code"
                              label="name"
                              @input="setSelectedLang"
                              v-model="selectedLang">
                        <template #open-indicator="{ attributes }">
                            <span v-bind="attributes"><i class="uil uil-angle-down" style="font-size:20px;"></i></span>
                        </template>
                    </v-select>
                </div>

                <!-- 로그인 했을 때 -->
                <template>
                    <div class="header-info"   v-if="$store.getters.user">
                        <!--            <button class="btn-circle-icon" @click="isOpenMessage = !isOpenMessage">-->
                        <!--              <i class="uil uil-comment-alt"></i>-->
                        <!--              <span></span>-->
                        <!--            </button>-->
                        <!--            -->
                        <!--            <button class="btn-circle-icon ml10" @click="isOpenMessage = !isOpenMessage">-->
                        <!--              <i class="uil uil-bell"></i>-->
                        <!--              <span></span>-->
                        <!--            </button>-->

                        <button class="btn-circle-none ml5" @click="isOpenSetting = !isOpenSetting">
                            <i class="uil uil-setting"></i>
                        </button>
                    </div>
<!--                    <div class="header-login" v-else>-->
<!--                        <button class="btn-default" @click="login"><i class="uil uil-user"></i>{{ $t('login') }}</button>-->
<!--                    </div>-->

                    <!-- 모바일 - 우측버튼 -->
                    <div class="header-info-mobile" v-if="$store.getters.user">
                        <!--                    <button class="btn-none" @click="isOpenMessage = !isOpenMessage">-->
                        <!--                        <i class="uil uil-comment" style="font-size:21px;"></i>-->
                        <!--                        <span></span>-->
                        <!--                    </button>-->
                        <!--                    <button class="btn-none" @click="isOpenMessage = !isOpenMessage">-->
                        <!--                        <i class="uil uil-bell" style="font-size:23px;"></i>-->
                        <!--                        <span></span>-->
                        <!--                    </button>-->
                        <button class="btn-none" @click="isOpenSetting = !isOpenSetting">
                            <i class="uil uil-setting"></i>
                        </button>
                    </div>
<!--                    <div class="header-login" v-else>-->
<!--                        <button class="btn-default" @click="login"><i class="uil uil-user"></i>{{ $t('login') }}</button>-->
<!--                    </div>-->
                    <!-- 모바일 - 우측버튼 끝 -->
                    <!-- 모바일 - 좌측영역 -->
                    <div class="header-side-mobile" :style="isHeaderSideMobile ? 'left:0px;' : '' "
                         id="headerSideMobile">
                        <div class="hsm-close"><i class="uil uil-times" v-on:click="headerSideCloseMobile"></i></div>
                        <div class="hsm-search">
                            <div class="input-search-line-mobile" @click="isOpenSearch = !isOpenSearch">
                                <p><i class="uil uil-search"></i>
                                <p>
                                <div><input type="text" name="" title="keywords"
                                            :placeholder="$t('needSearchInput')"/></div>
                            </div>
                        </div>
                        <div class="hsm-menu">
                            <router-link :to="`/${$i18n.locale}/communityList`" @click.native="headerSideCloseMobile"><i class="uil uil-comment"></i>
                                Community
                            </router-link>
                            <router-link :to="`/${$i18n.locale}/gameList`" @click.native="headerSideCloseMobile"><i class="uil uil-robot"></i> Game
                            </router-link>
                        </div>
                        <!--                        <div class="hsm-language">-->
                        <!--                            <a href="#" class="active">Korea</a>-->
                        <!--                            <a href="#">English</a>-->
                        <!--                        </div>-->
                    </div>
                    <div class="header-side-bg-mobile" :style="isHeaderSideBgMobile ? 'display:block;' : '' "
                         id="headerSideBgMobile" v-on:click="headerSideCloseMobile">
                        &nbsp;
                    </div>
                    <!-- 모바일 - 좌측영역 끝 -->
                </template>
                <!-- 로그인 했을 때 끝 -->
                <!-- 로그인 안했을 때 -->
                <div class="header-login" v-show="!$store.getters.user">
                    <button class="btn-default" @click="login"><i class="uil uil-user"></i>{{ $t('login') }}</button>
                </div>
                <!-- 로그인 안했을 때 끝 -->

                <!--          <div class="header-info-mobile">-->
                <!--            <button class="btn-none" @click="isOpenMessage = !isOpenMessage">-->
                <!--              <i class="uil uil-comment"></i>-->
                <!--              <span></span>-->
                <!--            </button>-->
                <!--            <button class="btn-none" @click="isOpenMessage = !isOpenMessage">-->
                <!--              <i class="uil uil-bell"></i>-->
                <!--              <span></span>-->
                <!--            </button>-->
                <!--            <button class="btn-none" @click="isOpenSetting = !isOpenSetting">-->
                <!--              <i class="uil uil-setting"></i>-->
                <!--            </button>-->
                <!--          </div>-->

                <!-- <div class="header-search-mobile">
                  <div class="input-search" @click="isOpenSearch = !isOpenSearch">
                    <p><i class="uil uil-search"></i><p>
                    <div><input type="text" name="" title="keywords" placeholder="검색어를 입력하세요." /></div>
                  </div>
                </div> -->


                <!-- 검색 리스트 -->
                <template v-if="searchInput.length > 0">
                    <dropdown-menu :isOpen="isOpenSearch" @closed="isOpenSearch = false" :overlay="false"
                                   class="header-search-dropdown">

                        <div slot="body" class="header-search-list">
                            <div>
                                <template v-if="userList && userList.length > 0">
                                    <h2>{{ $t('user.name') }}</h2>
                                    <div v-for="user in userList"
                                         :key="user.id"
                                         @click="userPage(user.channel_id)">
                                        <dl>
                                            <dt>
                                                <UserAvatar :user="user" :tag="'span'"></UserAvatar>
                                                {{ user.name }}
                                            </dt>
                                            <dd><i class="uil uil-user"></i></dd>
                                        </dl>
                                    </div>
                                </template>
                                <template v-if="gameList && gameList.length > 0">
                                    <h2>{{ $t('game.name') }}</h2>
                                    <div v-for="game in gameList" :key="game.id"
                                         @click="moveGamePage(game.pathname)"
                                    >
                                        <!--                                {{ game}}-->
                                        <dl>
                                            <dt>
                                        <span
                                            :style="`background:url(${game.profile_img ||  game.url_thumb}) center center / cover no-repeat; background-size:cover;`"></span>
                                                {{ game.title }}
                                            </dt>
                                            <dd><i class="uil uil-robot"></i></dd>
                                        </dl>
                                    </div>
                                </template>
                                <template v-if="groupList &&groupList.length > 0">
                                    <h2>{{ $t('community.name') }}</h2>
                                    <div v-for="group in groupList" :key="group.id" @click="groupPage(group.id)">
                                        <dl>
                                            <dt>
                                        <span
                                            :style="`background:url(${group.profile_img}) center center / cover no-repeat; background-size:cover;`"></span>
                                                {{ group.name }}
                                            </dt>
                                            <dd><i class="uil uil-comments"></i></dd>
                                        </dl>
                                    </div>
                                </template>

                            </div>
                        </div>
                    </dropdown-menu>
                </template>
                <!-- 검색 리스트 끝 -->

                <!-- 신규 메세지 -->
                <!-- 퍼블리싱 페이지에서 붙여와서 사용-->
                <!-- 신규 메세지 끝 -->

                <!-- 설정 -->
                <dropdown-menu v-if="$store.getters.user" :isOpen="isOpenSetting" @closed="isOpenSetting = false"
                               :overlay="false" class="header-setting-dropdown">

                    <div slot="body" class="header-setting">
                        <dl>
                            <dt>
                                <UserAvatar :user="$store.getters.user" :tag="'span'"></UserAvatar>
                            </dt>
                            <dd>
                                <h2>{{ user.name }}</h2>
                                <!--                  <h3>@Username1234</h3>-->
                            </dd>
                        </dl>
                        <div>
                            <h2>{{ $t('myProfile') }}</h2>
                            <div>
                                <router-link :to="`/${$i18n.locale}/myChannel`" @click.native="isOpenSetting = false"><i
                                    class="uil uil-user"></i>
                                    {{ $t('myChannel') }}
                                </router-link>
                                <!--                                <a @click="moveGameDashBoard"><i class="uil uil-robot"></i>게임스튜디오</a>-->
                                <router-link :to="`/${$i18n.locale}/projectList`"><i class="uil uil-robot"></i>
                                    {{ $t('gameStudio') }}
                                </router-link>
                                <router-link :to="`/${$i18n.locale}/user/${user.channel_id}/settings`"
                                             @click.native="isOpenSetting = false"><i
                                    class="uil uil-setting"></i>
                                    {{ $t('account.settings') }}
                                </router-link>
                            </div>
                        </div>
                        <div>
                            <h2>{{ $t('group') }}</h2>
                            <div>
                                <router-link @click.native="isOpenSetting = false"
                                             :to="`/${$i18n.locale}/user/${user.channel_id}/manageJoinedGroup`"><i
                                    class="uil uil-users-alt"></i>
                                    {{ $t('joined.group') }}
                                </router-link>
                            </div>
                        </div>
                        <p @click="logout"><a class="btn-default w100p">{{ $t('logout') }}</a></p>
                    </div>
                </dropdown-menu>
                <!-- 설정 끝 -->
            </dd>
        </dl>

    </div>

    <!-- 상단영역 끝 -->
    <!--    <modal v-model="showModal" name="deleteComment">-->
    <!--        <div class="modal-alert">-->
    <!--            <dl class="ma-header">-->
    <!--                <dt>안내</dt>-->
    <!--                <dd>-->
    <!--                    <button @click="$modal.hide('deleteComment')"><i class="uil uil-times"></i></button>-->
    <!--                </dd>-->
    <!--            </dl>-->
    <!--            <div class="ma-content">-->
    <!--                <h2> 해당 댓글을 삭제하시겠습니까?</h2>-->
    <!--                <div>-->
    <!--                    <button class="btn-default w48p" @click="deleteComment">{{ $t('yes') }}</button>-->
    <!--                    <button class="btn-gray w48p" @click="$modal.hide('deleteComment')">{{ $t('no') }}</button>-->
    <!--                </div>-->
    <!--            </div>-->
    <!--        </div>-->
    <!--    </modal>-->

</template>

<script>
import Login from "@/script/login";
import UserAvatar from "@/components/user/_userAvatar.vue";
import {AxiosError, AxiosResponse} from "axios";
import {LoginState} from "@/store/modules/user";
import {Watch} from "vue-property-decorator";

import {SUPPORTED_LOCALES} from '@/common/locale';

export default {
    name: "Header",
    components: {UserAvatar},
    data() {
        return {

            isOpenMessage: false,
            isOpenSetting: false,
            isOpenSearch: false,
            user: {},
            profileImg: '',
            searchInput: '',
            debounce: '',
            userList: [],
            groupList: [],
            gameList: [],
            hasResult: false,

            options: [{code: 'ko', lang: '한국어'},
                {code: 'en', lang: 'English'}],
            selectedLang: 'ko',

            path: "/",
            locales: SUPPORTED_LOCALES,
            isHeaderSideMobile: false,
            isHeaderSideBgMobile: false
        }
    },
    computed: {
        locale() {
            return this.$store.getters.locale;
        }
    },
    mounted() {
        if (this.$i18n.locale === 'ko') {
            this.selectedLang = 'ko'
        } else {
            this.selectedLang = 'en'
        }
        // console.log("18n", this.$store.getters.locale)
        this.$store.dispatch("loginState")
            .then((res) => {
                if (res === LoginState.login) {
                    this.user = this.$store.getters.user;
                    if (this.user.picture) {
                        this.profileImg = this.user.picture
                    } else {
                        this.profileImg = 'img/300_300_default_profile.png'
                    }
                }
            })
    },
    beforeDestroy() {
        clearTimeout(this.debounce);
    },

    watch: {
        searchInput: function () {
            if (this.searchInput.length === 0) {
                this.listReset();
                this.isOpenSearch = false
            }
        },
        gameList: function () {
            if (this.gameList.length > 0) {
                this.isOpenSearch = true
            }
        },
        userList: function () {
            if (this.userList.length > 0) {
                this.isOpenSearch = true
            }
        },
        groupList: function () {
            if (this.groupList.length > 0) {
                this.isOpenSearch = true
            }
        },
        $route() {
            this.selectedLang = this.$i18n.locale;
        }
    },
    methods: {

        moveGameDashBoard() {
            this.isOpenSetting = false
            window.open(this.$store.getters.studioUrl);
        },
        async logout() {
            this.$store.state.pathName = "logout";
            await Login.logout();
            await this.$router.push(`/${this.$i18n.locale}/landing`);
        },
        login() {
            this.$router.push(`/${this.$i18n.locale}/login`)
        },

        playGame(pathname) {
            window.open(
                this.$store.getters.homeUrl + `play/${pathname}`, "_blank");
        },
        listReset() {
            this.isOpenSearch = false;
            this.searchInput = '';
            this.userList = [];
            this.gameList = [];
            this.groupList = [];
        },
        groupPage(groupId) {
            this.listReset()
            this.$router.push(`/${this.$i18n.locale}/community/${groupId}/timeline`)
        },
        userPage(channel_id) {
            this.listReset()
            this.$router.push(`/${this.$i18n.locale}/channel/${channel_id}/timeline`)
        },
        gamePage(pathname) {
            this.listReset()
            this.$router.push(`/${this.$i18n.locale}/timeline/game/${pathname}`)
        },
        async searchType(event) {
            if (event.keyCode === 27) {
                this.searchInput = "";
            } else if (this.searchInput && this.searchInput.length > 0) {

                //code 27 : esc
                let query = "";
                //유저 검색
                if (this.searchInput.charAt(0) === "@") {
                    query = this.searchInput.substring(1);

                    const obj = {
                        username: query,
                        limit: 5
                    };

                    if (query.length > 0) {
                        this.$api.search(obj)
                            .then((res) => {
                                this.userList = res.result;
                                this.$store.commit('userData', this.userList)
                                if (event.key === 'Enter') {
                                    // this.$router.push(`/search?username=${query}`)
                                }
                            })
                            .catch((err) => {

                            })
                    }
                }
                //해시태그 검색
                else if (this.searchInput.charAt(0) === "#") {
                    query = this.searchInput.substring(1);
                    const obj = {
                        hashtag: query,
                        limit: 5
                    };
                    if (query.length > 0) {
                        this.$api.search(obj)
                            .then((res) => {
                                this.userList = res.result;
                                this.$store.commit('userData', this.userList)
                                if (event.key === 'Enter') {
                                    // this.$router.push(`/search?username=${query}`)
                                }
                            })
                            .catch((err) => {

                            })
                    }

                }
                //모두 검색
                else {
                    query = this.searchInput;
                    const obj = {
                        q: event,
                        limit: 5
                    };


                    this.$api.search(obj)
                        .then((res) => {
                            this.$store.commit('researchData', res)
                            this.groupList = res.community
                            this.userList = res.users;
                            this.gameList = res.games;
                            if (this.gameList.length === 0 || this.userList.length === 0 || this.groupList.length === 0) {
                                this.isOpenSearch = false
                            } else {
                                this.isOpenSearch = true;

                            }

                        })
                        .catch((err) => {
                            this.isOpenSearch = false;
                        })

                }


            } else if (this.searchInput.length === 0) {
                this.isOpenSearch = false
            }
        },

        moveSearchPage: function () {
            this.$router.push(`/${this.$i18n.locale}/search?q=${this.searchInput}`)
            this.listReset();

        },
        headerSideOpenMobile: function () {
            console.log("?")
            this.isHeaderSideMobile = true;
            this.isHeaderSideBgMobile = true;
            document.body.style.overflow = "hidden";
        },
        headerSideCloseMobile: function () {
            this.isHeaderSideMobile = false;
            this.isHeaderSideBgMobile = false;
            //document.getElementById("headerMobileSideMobile").style.display = "none";
            document.getElementById("headerSideMobile").style.left = "-305px";
            document.getElementById("headerSideBgMobile").style.display = "none";
            document.body.style.overflow = "visible";
        },
        setSelectedLang: function (lang) {
            this.$i18n.locale = lang;

            this.$router.push({
                params: {locale: lang}
            })

        },
        moveGamePage(pathname) {
            this.$router.push(`/${this.$i18n.locale}/timeline/game/${pathname}`);
            this.isOpenSearch = !this.isOpenSearch;
        }

    }


};
</script>

<style lang="scss" scoped>
.menu li .active {
    color: #F97316;
}


@media all and (max-width:479px) {
    //.header > dl {width:90%; padding:15px 0;}
    //.header-logo-menu p {display:flex; align-items:center; margin-right:0;}
    //.header-logo-menu p i {display:block; font-size:22px; margin-right:10px;}
    //.header-logo-menu p a img {width:100px;}
    //.header-logo-menu ul {display:none;}
    //.header-search {display:none;}
    //.header-language {display:none;}
    .header-login {display:block !important;}
    //.header-info {display:none;}
    //.header-info-mobile {display:block;}
}
@media all and (min-width:480px) and (max-width:767px) {
    //.header > dl {width:470px; padding:15px 0;}
    //.header-logo-menu p {display:flex; align-items:center; margin-right:0;}
    //.header-logo-menu p i {display:block; font-size:22px; margin-right:10px;}
    //.header-logo-menu p a img {width:100px;}
    //.header-logo-menu ul {display:none;}
    //.header-search {display:none;}
    //.header-language {display:none;}
    .header-login {display:block !important;}
    //.header-info {display:none;}
    //.header-info-mobile {display:block;}
}
@media all and (min-width:768px) and (max-width:991px) {
    //.header > dl {width:750px;}
    //.header-search {display:none;}
    //.header-language {display:none;}
    .header-login {display:block !important;}
    //.header-info {display:none;}
    //.header-info-mobile {display:block;}
}
@media all and (min-width:992px) and (max-width:1199px) {
    .header > dl {width:970px;}
    .header-info-mobile {display:none;}
}
@media all and (min-width:1200px) {

}

</style>
