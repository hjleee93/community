<template>
    <div class="grid grid-3-6-3 mobile-prefer-content">
        <div class="grid-column">
            <!-- game list -->
            <div class="widget-box">
                <div class="widget-box-title">
                    <p>Games</p>
                    <div
                        class="add-game-tooltip"
                        data-title="Add Game"
                        @click="addGame"
                    >
                        <div class="percentage-diff-icon-wrap positive">
                            <svg
                                class="
                            icon-plus-small
                            action-list-item
                            category-dropdown-trigger
                        "
                                ref="dropdown"
                                style="fill: #fff"
                            >
                                <use xlink:href="#svg-plus-small"></use>
                            </svg>
                        </div>
                    </div>
                </div>
                <div class="widget-box-content">

                    <template v-for="game in games">
                        <div
                            :key="game.id"
                            class="user-status-list"
                            @click="moveGameChannel(game.pathname)"
                        >
                            <span class="game-title">{{ game.title }}</span>

                            <div
                                :style="`background: url(${
                            game.url_thumb_webp ||
                            game.picture ||
                            'img/default.png'
                        }) center center / cover no-repeat;`"
                                class="thumb img game-img"
                            />
                        </div>
                    </template>
                    <router-link
                        v-if="totalGameCnt > 5"
                        class="user-status-list all-btn"
                        :to="`/channel/${userUid}/games`"
                    >View all
                    </router-link
                    >
                    <div v-if="totalGameCnt === 0">
                        <p @click="addGame" style="cursor: pointer">
                            등록된 게임이 없습니다.
                        </p>
                    </div>
                </div>
            </div>
            <!-- /game list -->
        </div>
        <div class="grid-column">
            <!-- 타임라인 -->
            <Timeline :currPage="'user'" :key="this.$route.query.media"></Timeline>
        </div>
        <!-- 가입한 그룹 리스트 -->
        <div class="grid-column">
            <div class="widget-box">
                <p class="widget-box-title">Groups</p>
                <div class="widget-box-content">
                    <div class="user-status-list" v-if="communityList">
                        <div
                            v-for="community in communityList"
                            :key="community.id"
                            class="user-status"
                        >
                            <router-link
                                class="user-status-avatar"
                                :to="`/community/${community.id}/timeline`"
                            >
                                <div class="user-avatar small no-border" >
                                    <div class="user-avatar-content">
                                        <b-img  v-if="community.profile_img" :src="community.profile_img"  style="
                                        width: 40px;
                                        height: 44px;
                                        position: relative;
                                        border-radius: 10px;
                                    "/>
                                        <b-img v-else src="/img/default.png"  style="
                                        width: 40px;
                                        height: 44px;
                                        position: relative;
                                        border-radius: 10px;
                                    "/>

                                    </div>
                                </div>

                            </router-link>

                            <p class="user-status-title text-left">
                                <router-link
                                    class="bold"
                                    :to="`/community/${community.id}/timeline`"
                                >{{ community.name }}
                                </router-link
                                >
                            </p>

                            <p class="user-status-text small text-left">
                                {{ community.member_cnt }} members
                            </p>
                        </div>
                    </div>
                    <div class="user-status-list" v-else>
                        groups
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import {mapGetters} from "vuex";
import Dropdown from "@/plugins/dropdown";
import Hexagon from "@/plugins/hexagon";

import PostBox from "@/components/layout/PostBox.vue";
import Feed from "@/components/timeline/Feed.vue";
import WhoToFollow from "@/components/pages/user/WhoToFollow.vue";
import Portfolio from "@/components/pages/user/PortfolioList.vue";


import Timeline from "@/components/common/_timeline.vue"

import {User} from "@/types";
import {AxiosError, AxiosResponse} from "axios";

@Component({
    computed: {...mapGetters(["user"])},
    components: {
        PostBox,
        Feed,
        WhoToFollow,
        Portfolio,
        Timeline
    },
})
export default class UserPage extends Vue {
    private dropdown: Dropdown = new Dropdown();
    private hexagon: Hexagon = new Hexagon();
    private userUid = this.$route.params.channel_id;
    private games: any[] = [];
    private totalGameCnt = 0;
    private user!: any;
    private communityList: {
        id: number;
        name: string;
        profile_img: string;
        state: string;
        member_cnt: number;
    }[] = [];
    userId = 0;

   async mounted() {
        this.dropdown.init();
        this.hexagon.init();
        await this.$store.dispatch("loginState");
        this.gameListFetch();

    }

    gameListFetch() {
        // this.$api.gameList()
        this.$api.userChannel(this.userUid)
            .then((res: any) => {
                const { target } = res;
                const {games} = target;
                this.userId = target.id
                this.$store.commit('gameList', games)
                if(games.length > 0){
                    this.totalGameCnt = games.length;
                }

                this.games = games.slice(0,5)
                this.communityFetch();
            })
            .catch((err: AxiosError) => {
                console.log('err', err)
            })


    }

    communityFetch() {
        this.$api.joinedCommunityList(this.userId)
            .then((res: any) => {
                this.communityList = res;
            })
            .catch((err: AxiosError) => {

            })


    }

    moveGameChannel(gamePath: string) {
        this.$router.push(`/timeline/game/${gamePath}`);
    }

    addGame() {
        console.log('addGame', this.user)
        if(this.user && (this.user.uid === this.userUid)) {
            window.location.href = this.$store.getters.studioUrl + "selectStage";
        }
    }


}
</script>

<style lang="scss" scoped>
.game-img {
    width: 100%;
    height: 65px;
    border-radius: 7px;
    margin-bottom: 10px;
    opacity: 50%;
}

.game-img:hover,
.user-status-list.active .game-img {
    opacity: 100%;
    cursor: pointer;
}

.user-status-list.active .game-title {
    background-color: #fff;
    color: #1d2333;
}

.game-title {
    border-radius: 6px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-weight: 600;
    padding: 2px 6px;
    background-color: #1d2333;
    color: #fff;
    position: absolute;
    z-index: 3;
    margin: 8px;
    display: flex;
    justify-content: space-between;
}

.widget-box-title {
    display: flex;
    justify-content: center;
    align-items: baseline;

    .percentage-diff-icon-wrap {
        position: absolute !important;
        left: 78px !important;
        bottom: 0px !important;
        cursor: pointer;
        border-color: #fff;
    }
}

.all-btn {
    border-radius: 6px;
    border: 1px solid #9aa4bf;
    color: #fff;
    font-size: 0.75rem;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}

.all-btn:hover {
    color: #1d2333;
    background: #fff;
}
</style>
