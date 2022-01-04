<template>
    <div class="content">
        <div class="visual-title">
            <h2>'{{ keyword }}' <span>검색결과</span></h2>
        </div>

        <!--        <div class="tab-search-swiper">-->
        <!--            <swiper class="swiper-area" :options="TSSswiperOption">-->
        <!--                <swiper-slide>-->
        <!--                    <router-link to="#" class="active">ALL</router-link>-->
        <!--                </swiper-slide>-->
        <!--                <swiper-slide>-->
        <!--                    <router-link to="#">Communities-->
        <!--                        &lt;!&ndash;                        <span>10</span>&ndash;&gt;-->
        <!--                    </router-link>-->
        <!--                </swiper-slide>-->
        <!--                <swiper-slide>-->
        <!--                    <router-link to="#">Users</router-link>-->
        <!--                </swiper-slide>-->
        <!--                <swiper-slide>-->
        <!--                    <router-link to="#">Games</router-link>-->
        <!--                </swiper-slide>-->
        <!--            </swiper>-->
        <!--        </div>-->
        <dl class="area-title" v-if="memberList && memberList.length > 0">
            <dt>Users <span>{{ memberList && memberList.length }}</span></dt>
        </dl>
        <ul class="card-follow" v-if="memberList">
            <li v-for="member in memberList" :key="member.id" @click="userPage(member.channel_id)">
                <div class="cf-img"></div>
                <UserAvatar :user="member" :tag="'p'"></UserAvatar>

                <!--                <p :style="{'background' : 'url(' + member.picture || '../../assets/images/300_300_default_profile.png' + ') center center no-repeat', 'background-size' : 'cover'}"></p>-->
                <div class="cf-info">
                    <h3>{{ member.name }}</h3>
                    <p></p>
                    <dl>
                        <dd>
                            <h4>{{ member.followers_cnt }}</h4>
                            <p>Followers</p>
                        </dd>
                        <dt><p></p></dt>
                        <dd>
                            <h4>{{ member.followings_cnt }}</h4>
                            <p>Followings</p>
                        </dd>
                    </dl>
                </div>
            </li>
            <li class="more-card" v-if="memberList && memberList.length>3">
                <h3><i class="uil uil-plus"></i></h3>
                <h4>모두보기</h4>
            </li>
        </ul>

<!--        <dl class="area-title">-->
<!--            <dt>Communities <span>{{ communityList && communityList.length }}</span></dt>-->
<!--        </dl>-->
<!--        <div class="card-follow">-->
<!--            <community-card-->
<!--                @refetch="refetch"-->
<!--                data-aos="zoom-in"-->
<!--                v-for="community in communityList"-->
<!--                :key="community.id"-->
<!--                :community="community"-->
<!--            >-->
<!--                <template v-slot:subBtn>-->
<!--                    <SubscribeBtn @refetch="refetch" class="sub-btn" :community="community" @unsubscribe="unsubscribe"/>-->
<!--                </template>-->
<!--            </community-card>-->
<!--        </div>-->

        <dl class="area-title" v-if="games && games.length > 0">
            <dt>Games <span>{{ games && games.length }}</span></dt>
        </dl>

        <ul class="card-game" v-if="games">
            <li v-for="game in games" :key="game.id" @click="playGame(game.pathname)">
                <div
                    :style="`background: url( ${game && game.url_thumb_webp ||  game.url_thumb} ) center center no-repeat; background-size: cover;`"></div>
                <dl>
                    <dt>

                        <P :style="`background: url(${game.user&& game.user.picture || '/img/300_300_default_profile.png'}) center center no-repeat; background-size: cover;`"></P>
                    </dt>
                    <dd>
                        <h2>{{ game && game.title }}</h2>
                        <p>{{ game.user && game.user.name }}</p>
                        <ul>
                            <!--                            <li><img src="../../assets/images/charge_game_icon.svg" alt=""></li>-->
                            <!--                            <li><img src="../../assets/images/hot_game_icon.svg" alt=""></li>-->
                            <li><img src="../../assets/images/zempie_game_icon.svg" alt=""></li>
                        </ul>
                    </dd>
                </dl>
            </li>


            <!--            <li class="more-card" v-if="games && games.length>3">-->
            <!--                <div>-->
            <!--                    <h3><i class="uil uil-plus"></i></h3>-->
            <!--                    <p>모두보기</p>-->
            <!--                </div>-->
            <!--            </li>-->
        </ul>

        <dl class="area-title"  v-if="posts && posts.length > 0">
            <dt>Posts <span>{{ posts && posts.length }}</span></dt>
        </dl>
        <div class="ta-search-post" v-if="posts" :style="posts ? 'padding:0px ;':''">
            <ul class="ta-post">
                <div v-for="feed in posts" :key="feed.id">
                    <!--                    {{feed}}-->
                    <Feed :feed="feed"
                    ></Feed>
                </div>
            </ul>
        </div>


    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from "vue-property-decorator";
import Feed from "@/components/timeline/_feed.vue";
import MemberCard from "@/components/community/_memberCard.vue";
import {Swiper, SwiperSlide} from 'vue-awesome-swiper'
import {execCommandCopy} from "@/script/util";
import Toast from "@/script/message";
import {scrollDone} from "@/script/scrollManager";
import {AxiosError} from "axios";

import Comment from "@/components/timeline/Comment.vue";
import CommentInput from "@/components/comment/_commentInput.vue";
import UserAvatar from "@/components/user/_userAvatar.vue";
import CommunityCard from "@/components/community/_communityCard.vue";
import SubscribeBtn from "@/components/community/_subscribeBtn.vue";

@Component({
    components: {
        Feed,
        MemberCard,
        Swiper,
        SwiperSlide,
        Comment,
        CommentInput,
        UserAvatar,
        CommunityCard, SubscribeBtn

    },
})
export default class SearchPage extends Vue {
    toast = new Toast();
    type: string = Object.keys(this.$route.query)[0];
    query: any = this.$route.query[Object.keys(this.$route.query)[0]];
    posts: any = [];
    games: any = [];
    memberList: any = [];
    communityList: any = [];
    keyword: string | (string | null)[] = '';

    limit: number = 5;
    offset: number = 0;
    sort: string = '';

    isAddData: boolean = false;
    comments: any = [];
    isOpenedComments: boolean = false;

    TSSswiperOption = {
        slidesPerView: 8,
        spaceBetween: 0,
        breakpoints: {
            300: {
                slidesPerView: 2.5
            },
            480: {
                slidesPerView: 3.5
            },
            768: {
                slidesPerView: 4.5
            },
            992: {
                slidesPerView: 6
            },
            1200: {
                //slidesPerView: 7
            }
        }
    }

    async mounted() {
        if (this.$store.getters.userData.length > 0) {
            this.keyword = this.$route.query.username
            this.memberList = this.$store.getters.userData;
        }
        else {
            this.keyword = this.$route.query.q
        }

        this.memberList = this.$store.getters.researchData.users;
        this.posts = this.$store.getters.researchData.posts;
        this.communityList = this.$store.getters.researchData.community;
        // const result = await this.$api.search(this.query, this.type);
        // this.posts = result.posts;
        this.games = this.$store.getters.researchData.games;
        this.fetch()
    }

    beforeDestroy() {
        this.$store.dispatch('resetResearchData')
    }

    fetch() {
        const obj = {
            q: this.$route.query.q,
            limit: 5
        };

        this.$api.search(obj)
            .then((res: any) => {
                this.memberList = res.users;
                this.communityList = res.community;
                this.games = res.games;
                this.posts = res.posts;

            })
            .catch((err: any) => {

            })
    }


    toGamePage(gamePath: string, gameId: number) {
        this.$router.push(`/timeline/game/${gamePath}?game_id=${gameId}`)


    }

    @Watch('$route.query.q')
    watchQuery() {
        this.keyword = this.$route.query.q
        this.fetch();
    }

    userPage(channel_id: string) {
        this.$router.push(`/channel/${channel_id}/timeline`)
    }

    playGame(pathname: string) {
        window.open(
            this.$store.getters.homeUrl + `play/${pathname}`, "_blank");

    }


}
</script>

<style scoped>
.toasted, .toast-success {
    color: #F97316 !important;
    border-color: #F97316 !important;
}

.section-banner {
    padding: 0;
    display: flex;
    align-content: space-around;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.stats-decoration-title {
    padding: 2px 6px;
    font-size: 16px;
    text-overflow: ellipsis;
    font-weight: 600;
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
    color: #fff;
    border-radius: 6px;
    background-color: #1d2333;
}

.cf-info {
    height: 100%;
}

.cf-img {
    background-color: #f39800;
}
</style>
