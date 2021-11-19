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
                            @click="moveGameChannel(game.game)"
                            :id="game.id"
                        >
                            <span class="game-title">{{ game.name }}</span>

                            <div
                                :style="`background: url(${
                            game.picture_webp ||
                            game.picture ||
                            'img/default.png'
                        }) center center / cover no-repeat;`"
                                class="thumb img game-img"
                            />
                        </div>
                    </template>
                    <router-link
                        v-if="games.length > 5"
                        class="user-status-list all-btn"
                        :to="`/channel/${userUid}/games`"
                    >View all
                    </router-link
                    >
                    <div v-if="games.length === 0">
                        <p @click="addGame" style="cursor: pointer">
                            게임 등록 하실래요?
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
        <div class="grid-column">
            <joined-community :userUid="userUid"></joined-community>
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
import JoinedCommunity from "@/components/pages/user/JoinedCommunity.vue";
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
        JoinedCommunity,
        Timeline
    },
})
export default class UserPage extends Vue {
    private dropdown: Dropdown = new Dropdown();
    private hexagon: Hexagon = new Hexagon();
    private userUid = this.$route.params.channel_id;
    private games: any[] = [];
    private user!: any;

    mounted() {
        this.dropdown.init();
        this.hexagon.init();
        this.gameListfetch();
    }

    gameListfetch() {
        this.$api.gameList()
            .then((res: AxiosResponse) => {
                this.games = res;
            })
            .catch((err: AxiosError) => {

            })


    }

    moveGameChannel(game: any) {
        this.$router.push(`/timeline/game/${game.pathname}`);
    }

    addGame() {
        // if (this.$store.getters.user.is_developer) {
        window.location.href = this.$store.getters.studioUrl + "selectStage";
        // }
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
