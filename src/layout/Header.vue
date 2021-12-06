<template>
    <!-- 상단영역 -->
    <div class="header">
        <dl>
            <dt>
                <div class="header-logo-menu">
                    <p>
                        <router-link to="/"><img src="../assets/images/logo.svg" width="120" alt="" title=""/>
                        </router-link>
                    </p>
                    <ul>
                        <li>
                            <router-link to="/community/list">COMMUNITY</router-link>
                        </li>
                        <li>
                            <a @click="moveGameList">GAME </a>
                        </li>
                    </ul>
                </div>
            </dt>
            <dd>
                <div class="header-search">
                    <div class="input-search-line">
                        <p><i class="uil uil-search"></i>
                        <p>
                        <div><input type="text" name="" title="keywords" placeholder="검색어를 입력하세요." v-model="searchInput"
                                    @keyup="debounceSearchInput"/></div>
                    </div>
                </div>
                <!--          <div class="header-language">-->
                <!--            <v-select class="hl-select-box" :options="['한국어', 'English']" placeholder="한국어">-->
                <!--              <template #open-indicator="{ attributes }">-->
                <!--                <span v-bind="attributes"><i class="uil uil-angle-down" style="font-size:20px;"></i></span>-->
                <!--              </template>-->
                <!--            </v-select>-->
                <!--          </div>-->

                <!-- 로그인 했을 때 -->

                <div class="header-info" v-if="$store.getters.user">
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

                <!-- 로그인 했을 때 끝 -->
                <!-- 로그인 안했을 때 -->
                <div class="header-login" v-else>
                    <button class="btn-default" @click="login"><i class="uil uil-user"></i> 로그인</button>
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
                                    <h2>유저이름</h2>
                                    <div v-for="user in userList"
                                         :key="user.id"
                                         @click="userPage(user.uid)">
                                        <dl>
                                            <dt>
                                                <em :style="`background:url(${user.picture || '/src/assets/images/zempy.png'}) center center / cover no-repeat; background-size:cover;`"></em>
                                                {{ user.name }}
                                            </dt>
                                            <dd><i class="uil uil-user"></i></dd>
                                        </dl>
                                    </div>
                                </template>
                                <template v-if="gameList && gameList.length > 0">
                                    <h2>게임이름</h2>
                                    <div v-for="game in gameList" :key="game.id" @click="gamePage(game.pathname)">
                                        <!--                                {{ game}}-->
                                        <dl>
                                            <dt>
                                        <span
                                            :style="`background:url(${game.profile_img}) center center / cover no-repeat; background-size:cover;`"></span>
                                                {{ game.title }}
                                            </dt>
                                            <dd><i class="uil uil-robot"></i></dd>
                                        </dl>
                                    </div>
                                </template>
                                <template v-if="groupList &&groupList.length > 0">
                                    <h2>커뮤니티이름</h2>
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
                            <dt><span
                                :style="`background:url(${profileImg})center center / cover no-repeat; background-size:cover;`"></span>
                            </dt>
                            <dd>
                                <h2>{{ user.name }}</h2>
                                <!--                  <h3>@Username1234</h3>-->
                            </dd>
                        </dl>
                        <div>
                            <h2>내 프로필</h2>
                            <div>
                                <router-link to="/"><i class="uil uil-user"></i> 내채널</router-link>
                                <a @click="moveGameDashBoard" ><i class="uil uil-robot"></i> 게임스튜디오</a>
                                <router-link :to="`/user/${user.uid}/settings`"><i class="uil uil-setting"></i> 계정설정
                                </router-link>
                            </div>
                        </div>
                        <div>
                            <h2>그룹</h2>
                            <div>
                                <router-link :to="`/user/${user.uid}/manageJoinedGroup`"><i
                                    class="uil uil-users-alt"></i> 가입한 그룹
                                </router-link>
                            </div>
                        </div>
                        <p @click="logout"><a class="btn-default w100p">로그아웃</a></p>
                    </div>
                </dropdown-menu>
                <!-- 설정 끝 -->
            </dd>
        </dl>
    </div>
    <!-- 상단영역 끝 -->


</template>

<script >
import Login from "@/script/login";
import {AxiosError} from "axios";

export default {
    name: "Header",
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
            hasResult: false

        }
    },
    mounted() {
        this.$store.dispatch("loginState")
            .then((res) => {
                this.user = this.$store.getters.user;
                if (this.user.picture) {
                    this.profileImg = this.user.picture
                } else {
                    this.profileImg = '/src/assets/images/zempy.png'
                }
            })
            .catch((err) => {

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
        }
    },
    methods: {
        moveGameList() {
            window.open(this.$store.getters.homeUrl);
        },
        moveGameDashBoard() {
            window.open(this.$store.getters.studioUrl );
        },
        async logout() {
            this.$store.state.pathName = "logout";
            await Login.logout();
            await this.$router.push("/landing");
        },
        login() {
            this.$router.push('/login')
        },
        debounceSearchInput(event) {
            if (this.searchInput.length !== 0) {
                clearTimeout(this.debounce);
                this.debounce = setTimeout(() => {
                    console.log('debounce', this.searchInput)
                    this.searchType(event)
                }, 150);
            } else {
                clearTimeout(this.debounce);
                this.debounce = setTimeout(() => {
                    console.log('clear', this.searchInput)
                    this.listReset();
                    this.searchInput = '';
                    this.isOpenSearch = false
                }, 150);
            }
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
            this.$router.push(`/community/${groupId}/timeline`)
        },
        userPage(userUid) {
            this.listReset()
            this.$router.push(`/channel/${userUid}/timeline`)
        },
        gamePage(pathname) {
            this.listReset()
            this.$router.push(`/timeline/game/${pathname}`)
        },
        async searchType(event) {

            if (event.keyCode === 27) {
                this.searchInput = "";
            } else if (this.searchInput && this.searchInput.length > 0) {

                // this.listReset();
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
                        q: query,
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
                            console.log('query obj2', this.gameList.length, this.userList.length, this.groupList.length)
                            if (event.key === 'Enter') {
                                this.$router.push(`/search?q=${query}`)
                            }

                        })
                        .catch((err) => {

                        })
                    console.log('query obj1', this.isOpenSearch)
                }


            } else if (this.searchInput.length === 0) {
                console.log("search 3")
                this.isOpenSearch = false
            }
        },


    }


};
</script>

<style lang="scss" scoped>
</style>
