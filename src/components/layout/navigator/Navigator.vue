<template>
    <header class="header" id="header">
        <div class="header-actions">
            <div class="header-brand">
                <div class="logo">
                    <b-img
                        src="img/zempie_logo.png"
                        @click="$router.push('/')"
                    />
                </div>

                <h1 class="header-brand-text" @click="$router.push('/')">
                    Zempie
                </h1>
            </div>
        </div>

        <div class="header-actions">
            <div class="mobilemenu-trigger navigation-widget-mobile-trigger">
                <div class="burger-icon inverted">
                    <div class="burger-icon-bar"></div>

                    <div class="burger-icon-bar"></div>

                    <div class="burger-icon-bar"></div>
                </div>
            </div>

            <nav class="navigation">
                <ul class="menu-main">
                    <!-- <li class="menu-main-item">
            <router-link class="menu-main-item-link" to="/">Home</router-link>
          </li> -->

                    <li class="menu-main-item">
                        <router-link
                            class="menu-main-item-link"
                            to="/community/list"
                        >Community
                        </router-link
                        >
                    </li>
                    <li class="menu-main-item">
                        <div
                            class="menu-main-item-link"
                            @click="moveGameList"
                        >Games
                        </div
                        >
                    </li>
                </ul>
            </nav>
        </div>

        <div class="header-actions search-bar" v-click-outside="hide">
            <div class="interactive-input dark" ref="input">
                <input
                    type="text"
                    id="search-main"
                    name="search_main"
                    ref="searchInput"
                    v-model="searchInput"
                    @keyup="debounceSearchInput"
                    placeholder="Search here for people or groups"
                />

                <div class="interactive-input-icon-wrap">
                    <svg class="interactive-input-icon icon-magnifying-glass">
                        <use xlink:href="#svg-magnifying-glass"></use>
                    </svg>
                </div>

                <div class="interactive-input-action" ref="closeDropbox">
                    <svg class="interactive-input-action-icon icon-cross-thin">
                        <use xlink:href="#svg-cross-thin"></use>
                    </svg>
                </div>
            </div>

            <div
                class="dropdown-box padding-bottom-small header-search-dropdown"
                style="padding: 0px"
            >
                <div v-if="userList.length > 0 && userList">
                    <div class="dropdown-box-category">
                        <p class="dropdown-box-category-title">Members</p>
                    </div>

                    <div class="dropdown-box-list small no-scroll">
                        <router-link
                            class="dropdown-box-list-item"
                            :to="`/channel/${user.uid}/timeline?userId=${this.$store.getters.user.id}`"
                            v-for="user in userList"
                            :key="user.id"
                            @click.native="closeDropbox"
                        >
                            <div class="user-status notification">
                                <div class="user-status-avatar">
                                    <div class="user-avatar small no-outline">
                                        <div class="user-avatar-content">
                                            <b-img
                                                class="hexagon-image-30-32"
                                                :src="user.profile_img"
                                            ></b-img>
                                        </div>
                                    </div>
                                </div>

                                <p class="user-status-title">
                                    <span class="bold username"
                                    >{{ user.name }}</span
                                    >
                                </p>

                                <div class="user-status-icon">
                                    <svg class="icon-friend">
                                        <use xlink:href="#svg-friend"></use>
                                    </svg>
                                </div>
                            </div>
                        </router-link>
                    </div>
                </div>
                <!-- 커뮤니티 검색  -->
                <div v-if="groupList&&groupList.length > 0">
                    <div class="dropdown-box-category">
                        <p class="dropdown-box-category-title">Groups</p>
                    </div>

                    <div class="dropdown-box-list small no-scroll">
                        <router-link
                            @click.native="closeDropbox"
                            v-for="group in groupList"
                            class="dropdown-box-list-item"
                            :to="`/community/${group.id}/timeline`"
                            :key="group.id"
                        >
                            <div class="user-status notification">
                                <div class="user-status-avatar">
                                    <div class="user-avatar small no-outline">
                                        <div class="user-avatar-content">
                                            <div
                                                class="hexagon-image-30-32"
                                                :data-src="`${group.profile_img}`"
                                            ></div>
                                        </div>
                                        <div class="user-avatar-progress">
                                            <div
                                                class="hexagon-progress-40-44"
                                            ></div>
                                        </div>

                                        <div
                                            class="user-avatar-progress-border"
                                        >
                                            <div
                                                class="hexagon-border-40-44"
                                            ></div>
                                        </div>
                                    </div>
                                </div>

                                <p class="user-status-title">
                                    <span class="bold username">{{
                                            group.name
                                        }}</span>
                                </p>

                                <div class="user-status-icon">
                                    <svg class="icon-group">
                                        <use xlink:href="#svg-group"></use>
                                    </svg>
                                </div>
                            </div>
                        </router-link>
                    </div>
                </div>

                <div v-if="gameList && gameList.length > 0">
                    <div class="dropdown-box-category">
                        <p class="dropdown-box-category-title">GAMES</p>
                    </div>

                    <div class="dropdown-box-list small no-scroll">
                        <a
                            class="dropdown-box-list-item"
                            href="marketplace-product.html"
                            v-for="game in gameList"
                            :key="game.id"
                        >
                            <div class="user-status no-padding-top">
                                <div class="user-status-avatar">
                                </div>

                                <p class="user-status-title">
                                    <span class="bold username">{{
                                            game.title
                                        }}</span>
                                </p>
                                <div class="user-status-icon">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        xmlns:xlink="http://www.w3.org/1999/xlink"
                                        class="game-console-icon"
                                        id="Icons"
                                        style="enable-background: new 0 0 32 32"
                                        version="1.1"
                                        viewBox="0 0 32 32"
                                        xml:space="preserve"
                                    >
                                        <path
                                            d="M23,14c-1.3,0-2.5,0.3-3.6,1H17v-1c0-2.8-2.2-5-5-5H9C7.3,9,6,7.7,6,6V3c0-0.6-0.4-1-1-1S4,2.4,4,3v3c0,2.8,2.2,5,5,5h3  c1.7,0,3,1.3,3,3v1h-2.4c-1.1-0.7-2.3-1-3.6-1c-3.9,0-7,3.1-7,7s3.1,7,7,7c1.3,0,2.5-0.3,3.6-1h6.8c1.1,0.7,2.3,1,3.6,1  c3.9,0,7-3.1,7-7S26.9,14,23,14z M11,22h-1v1c0,0.6-0.4,1-1,1s-1-0.4-1-1v-1H7c-0.6,0-1-0.4-1-1s0.4-1,1-1h1v-1c0-0.6,0.4-1,1-1  s1,0.4,1,1v1h1c0.6,0,1,0.4,1,1S11.6,22,11,22z M22.1,18.6c0.1-0.1,0.1-0.2,0.2-0.3c0.3-0.3,0.7-0.4,1.1-0.2  c0.1,0.1,0.2,0.1,0.3,0.2c0.1,0.1,0.2,0.2,0.2,0.3c0,0.1,0.1,0.3,0.1,0.4c0,0.1,0,0.3-0.1,0.4c-0.1,0.1-0.1,0.2-0.2,0.3  c-0.1,0.1-0.2,0.2-0.3,0.2C23.3,20,23.1,20,23,20c-0.3,0-0.5-0.1-0.7-0.3c-0.1-0.1-0.2-0.2-0.2-0.3c0-0.1-0.1-0.3-0.1-0.4  C22,18.9,22,18.7,22.1,18.6z M21,22c-0.3,0-0.5-0.1-0.7-0.3c-0.1-0.1-0.2-0.2-0.2-0.3c0-0.1-0.1-0.3-0.1-0.4c0-0.3,0.1-0.5,0.3-0.7  c0.4-0.4,1-0.4,1.4,0c0,0,0.1,0.1,0.1,0.1c0,0.1,0.1,0.1,0.1,0.2c0,0.1,0,0.1,0.1,0.2c0,0.1,0,0.1,0,0.2c0,0.3-0.1,0.5-0.3,0.7  C21.5,21.9,21.3,22,21,22z M24,23.2c0,0.1,0,0.1-0.1,0.2c0,0.1-0.1,0.1-0.1,0.2c0,0-0.1,0.1-0.1,0.1c-0.1,0.1-0.2,0.2-0.3,0.2  C23.3,24,23.1,24,23,24c-0.3,0-0.5-0.1-0.7-0.3C22.1,23.5,22,23.3,22,23s0.1-0.5,0.3-0.7c0.3-0.3,0.7-0.4,1.1-0.2  c0.1,0.1,0.2,0.1,0.3,0.2c0.2,0.2,0.3,0.4,0.3,0.7C24,23.1,24,23.1,24,23.2z M25.9,21.4c-0.1,0.1-0.1,0.2-0.2,0.3  c-0.1,0-0.1,0.1-0.1,0.1c-0.1,0-0.1,0.1-0.2,0.1c-0.1,0-0.1,0-0.2,0.1c-0.1,0-0.1,0-0.2,0c-0.3,0-0.5-0.1-0.7-0.3  c-0.1-0.1-0.2-0.2-0.2-0.3c0-0.1-0.1-0.3-0.1-0.4c0-0.1,0-0.3,0.1-0.4c0.1-0.1,0.1-0.2,0.2-0.3c0.2-0.2,0.6-0.3,0.9-0.3  c0.1,0,0.1,0,0.2,0.1c0.1,0,0.1,0.1,0.2,0.1c0,0,0.1,0.1,0.1,0.1c0.1,0.1,0.2,0.2,0.2,0.3c0,0.1,0.1,0.3,0.1,0.4  C26,21.1,26,21.3,25.9,21.4z"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <!--       todo: 언어 선택-->
        <!--        <div class="lang-selector form-select dropbox-container">-->
        <!--            <b-form-select-->
        <!--                name="sub-manager" class="dropbox"-->
        <!--                v-model="lanSelected"-->
        <!--                :options="langList"-->
        <!--                value-field="item"-->
        <!--                text-field="name"-->
        <!--                disabled-field="notEnabled"-->
        <!--            ></b-form-select>-->
        <!--        </div>-->
        <profile-menu v-if="$store.getters.user"></profile-menu>

        <div class="header-actions" v-else>
            <div class="login" @click="login">login</div>
        </div>
        <AlertModal v-if="$store.getters.needLogin" @needLogin="$store.commit('needLogin', false)"></AlertModal>
    </header>

</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from "vue-property-decorator";
import Dropdown from "@/plugins/dropdown";

import plugins from "@/plugins/plugins";
import router from "@/router";

import ProfileMenu from "@/components/layout/navigator/ProfileMenu.vue";
import Header from "@/script/header";
import Hexagon from "@/plugins/hexagon";
import {Group, User} from "@/types";
import {AxiosError, AxiosResponse} from "axios";
import AlertModal from "@/components/common/AlertModal.vue";


@Component({
    components: {ProfileMenu, AlertModal},
})
export default class Navtigator extends Vue {
    private dropdown: Dropdown = new Dropdown();
    private header: Header = new Header();
    private hexagon: Hexagon = new Hexagon();

    private searchInput: string = "";
    private userList: User[] = [];
    private groupList: Group[] = [];
    private isFocus: boolean = true;
    // todo: gameList 연결하기
    private gameList: any[] = [];

    private needLogin = false;

    private lanSelected = 'ko'
    private langList = [
        {item: 'ko', name: '한국어'},
        {item: 'en', name: 'English'},
    ];

    debounce:any = '';

    async mounted() {
        this.hexagon.init();
        this.dropdown.init();
        this.header.searchDropdown();

    }

    hide() {
        this.searchInput = "";
        (this.$refs.input as HTMLElement).classList.remove("active");
        this.header.searchDropdown();
    }

    listReset() {
        this.userList = [];
        this.gameList = [];
        this.groupList = [];
    }

    login() {
        router.push("/login");
    }

    beforeDestroy() {
        clearTimeout(this.debounce);
    }

    debounceSearchInput(event?:any) {
        if (this.searchInput.length !== 0) {
            console.log('this.searchInput', this.searchInput)
            clearTimeout(this.debounce);
            this.debounce = setTimeout(() => {
               this.searchType(event)
            }, 180);
        }
        else {
            clearTimeout(this.debounce);
            this.debounce = setTimeout(() => {
                this.listReset();
                this.searchInput = '';
            }, 180);
        }
    }


    async searchType(event?: any) {
        if (event.keyCode === 27) {
            this.searchInput = "";
        }
        else if (this.searchInput) {
            this.listReset();
            //code 27 : esc

            let query: string = "";
            //유저 검색
            if (this.searchInput.charAt(0) === "@") {
                query = this.searchInput.substring(1);

                const obj = {
                    username: query,
                    limit: 5
                };

                if (query.length > 0) {
                    this.$api.search(obj)
                        .then((res: any) => {
                            this.userList = res.result;
                            this.$store.commit('userData', this.userList)
                            if (event.key === 'Enter') {
                                // this.$router.push(`/search?username=${query}`)
                            }
                        })
                        .catch((err: AxiosError) => {

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
                        .then((res: any) => {
                            this.userList = res.result;
                            this.$store.commit('userData', this.userList)
                            if (event.key === 'Enter') {
                                // this.$router.push(`/search?username=${query}`)
                            }
                        })
                        .catch((err: AxiosError) => {

                        })
                }

            }
            //모두 검색
            else {
                query = this.searchInput;
                const obj = {
                    q: query,
                    limit: 5
                };

                console.log('query obj', obj)
                this.$api.search(obj)
                    .then((res: any) => {
                        this.$store.commit('researchData', res)
                        this.groupList = res.community
                        this.userList = res.users;
                        this.gameList = res.games;
                        if (event.key === 'Enter') {
                            this.$router.push(`/search?q=${query}`)
                        }

                    })
                    .catch((err: any) => {

                    })

            }


        }

    }


    closeDropbox() {
        (this.$refs.closeDropbox as HTMLElement).click();
        this.searchInput = "";
    }

    moveGameList() {
        window.open(this.$store.getters.homeUrl);
    }

}
</script>

<style lang="scss" scoped>
.logo,
.header-brand-text {
    cursor: pointer;
}

.login {
    color: #fff;
    display: flex;
    margin-right: 26px;
    text-transform: uppercase;
    cursor: pointer;
}

.user-status-title {
    .username {
        height: 44px;

        display: flex;

        align-items: center;
    }
}

.interactive-input.dark input {
    border: none !important;
    background-color: #5538b5 !important;
    color: #fff !important;
}


.lang-selector {
    display: flex;
    align-items: center;
    height: 80px;
    width: 100px;

    .custom-select {
        height: 38px;
        border: none !important;
        background: #7750f8 url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='4' height='5' viewBox='0 0 4 5'%3e%3cpath fill='white' d='M2 0L0 2h4zm0 5L0 3h4z'/%3e%3c/svg%3e") no-repeat right 0.75rem center/8px 10px !important;
    }

    .custom-select:focus {
        box-shadow: none !important;
    }

    .custom-select::after {
        color: #fff;
    }
}
</style>
