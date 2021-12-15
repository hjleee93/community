<template>
    <dl class="three-area">
        <dt>
            <div class="ta-channel-list">
                <h2>Game</h2>
                <ul v-if="games && games.length > 0">
                    <li
                        @click="moveGameChannel(game.pathname)"
                        :style="`background:url(${
                            game.url_thumb_webp ||
                            game.picture ||
                            'img/default.png'
                        }) center; background-size:cover;`" v-for="game in games">
                        <span>{{ game.title }}</span>
                    </li>

                </ul>
                <ul v-else class="no-game">
                    <li>등록된 게임이 없습니다.</li>
                </ul>
            </div>
        </dt>


        <dd>
            <!-- 타임라인 -->
            <Timeline :currPage="'user'" :key="this.$route.query.media"></Timeline>
        </dd>
        <!-- 가입한 그룹 리스트 -->
        <dt>


            <div class="ta-groups">
                <h2>Group</h2>
                <div>
                    <template v-if="communityList && communityList.length > 0">
                        <dl v-for="community in communityList"
                            :key="community.id"
                            @click="moveGroupPage(community.id)">
                            <dt><span
                                :style="`background: url(${
                           community.profile_img ||
                            'img/default.png'
                       }) center center no-repeat; background-size: cover;`"></span>
                            </dt>
                            <dd>
                                <h2>{{ community.name }}</h2>
                                <h3><i class="uil uil-chat-bubble-user"></i>{{ community.member_cnt }}</h3>
                            </dd>
                        </dl>
                    </template>
                    <template v-else>
                        <dl>
                            가입한 커뮤니티가 없습니다.
                        </dl>
                    </template>
                </div>
            </div>
            <!--            <div class="widget-box">-->
            <!--                <p class="widget-box-title">Groups</p>-->
            <!--                <div class="widget-box-content">-->
            <!--                    <div class="user-status-list" v-if="communityList">-->
            <!--                        <div-->
            <!--                            v-for="community in communityList"-->
            <!--                            :key="community.id"-->
            <!--                            class="user-status"-->
            <!--                        >-->

            <!--                            <p class="user-status-title text-left">-->
            <!--                                <router-link-->
            <!--                                    class="bold"-->
            <!--                                    :to="`/community/${community.id}/timeline`"-->
            <!--                                >{{ community.name }}-->
            <!--                                </router-link-->
            <!--                                >-->
            <!--                            </p>-->

            <!--                            <p class="user-status-text small text-left">-->
            <!--                                {{ community.member_cnt }} members-->
            <!--                            </p>-->
            <!--                        </div>-->
            <!--                    </div>-->
            <!--                    <div class="user-status-list" v-else>-->
            <!--                        groups-->
            <!--                    </div>-->
            <!--                </div>-->
            <!--            </div>-->

        </dt>
    </dl>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import {mapGetters} from "vuex";

import Feed from "@/components/timeline/_feed.vue";
import Portfolio from "@/components/pages/user/PortfolioList.vue";


import Timeline from "@/components/timeline/_timeline.vue"

import {User} from "@/types";
import {AxiosError, AxiosResponse} from "axios";

@Component({
    computed: {...mapGetters(["user"])},
    components: {
        Feed,
        Portfolio,
        Timeline
    },
})
export default class UserPage extends Vue {
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
        await this.$store.dispatch("loginState");
        this.gameListFetch();

    }

    gameListFetch() {
        // this.$api.gameList()
        this.$api.userChannel(this.userUid)
            .then((res: any) => {
                const {target} = res;
                const {games} = target;
                this.userId = target.id
                this.$store.commit('gameList', games)
                if (games.length > 0) {
                    this.totalGameCnt = games.length;
                }

                this.games = games.slice(0, 5)
                this.communityFetch();
            })
            .catch((err: AxiosError) => {
                this.$router.push('/')
                // console.log('err', err)
            })


    }

    communityFetch() {
        this.$api.joinedCommunityList(this.userId)
            .then((res: any) => {
                this.communityList = res;
            })
            .catch((err: AxiosError) => {
                this.$router.push('/')
            })


    }

    moveGameChannel(gamePath: string) {
        this.$router.push(`/timeline/game/${gamePath}`);
    }

    moveGroupPage(id: any) {
        this.$router.push(`/community/${id}/timeline`);
    }

    addGame() {
        if (this.user && (this.user.uid === this.userUid)) {
            window.location.href = this.$store.getters.studioUrl + "addGame";
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

.no-game {
    padding: 20px 20px 0 20px;

    li {
        display: flex;
        align-items: center;
        padding-bottom: 20px;
        cursor: pointer;
        height: 40px;
        margin-top: 0px;
        padding-bottom: 20px
    }
}

.ta-groups {
    margin-top: 0px;
}
</style>
