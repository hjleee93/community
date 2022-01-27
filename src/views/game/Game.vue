<template>
    <div class="content">

        <div class="visual-info-left"
             :key="$route.params.gamePath"
             :style="{'background' : 'url(' + game && game.url_thumb_webp+ ') center center / cover no-repeat', 'background-size' : 'cover'}">
            <dl>
                <dt>
                    <dl>
                        <dt>
                            &nbsp;
                            <div
                                :style="`background:url(${game && game.url_thumb}) center center / cover no-repeat; background-size:cover;`">
                                <!--                                <span></span>-->
                            </div>
                        </dt>
                        <dd>
                            <h2> {{ game && game.title }}<span></span></h2>
                            <h3>by@ {{ game.user && game.user.name }}</h3>
                            <div
                                class="tag-item secondary"
                                @click="moveHashtag(hashtag)"
                                v-for="hashtag in hashtags"
                                :key="hashtag"
                            ><a>{{ hashtag }}</a>
                            </div
                            >
                        </dd>
                    </dl>
                </dt>

                <dd>
                    <a v-if="game.stage !== eGameStage.Dev" @click="playGame(game.pathname)" class="btn-default w150">Play Game</a>
                    <!--                    <a v-if="loginUser" @click="subscribe" class="btn-sub w150 ml10">{{ $t('subscribe')}} </a>-->
                </dd>
            </dl>
        </div>
        <div class="tab-menu-swiper">
            <swiper class="swiper-area" :options="TMSswiperOption">
                <swiper-slide :class="
                        $route.name === 'GameTimeline' &&
                        Object.keys($route.query).length === 0
                            ? 'active'
                            : ''
                    ">
                    <router-link :to="`/${$i18n.locale}/timeline/game/${game.pathname}`">
                        <p><i class="uil uil-clock-three"></i></p>
                        <h2>{{ $t('timeline') }}(ALL)</h2>
                    </router-link>
                </swiper-slide>
                <swiper-slide :class="$route.query.media === 'sns' ? 'active' : ''">
                    <router-link
                        :to="{path:`/${$i18n.locale}/timeline/game/${game.pathname}`, query:{media:'sns'}}">
                        <p><i class="uil uil-comment-dots"></i></p>
                        <h2>SNS</h2>
                    </router-link>
                </swiper-slide>
                <swiper-slide :class="$route.query.media === 'blog' ? 'active' : ''">
                    <router-link
                        :to="{path:`/${$i18n.locale}/timeline/game/${game.pathname}`, query:{media:'blog'}}">
                        <p><i class="uil uil-edit"></i></p>
                        <h2>{{ $t('blog') }}</h2>
                    </router-link>
                </swiper-slide>
                <swiper-slide :class="$route.query.media === 'image' ? 'active' : ''">
                    <router-link
                        :to="{path:`/${$i18n.locale}/timeline/game/${game.pathname}`, query:{ media:'image'}}">
                        <p><i class="uil uil-image-edit"></i></p>
                        <h2>{{ $t('image') }}</h2>
                    </router-link>
                </swiper-slide>
                <swiper-slide :class="$route.query.media === 'video' ? 'active' : ''">
                    <router-link
                        :to="{path:`/${$i18n.locale}/timeline/game/${game.pathname}`, query:{ media:'video'}}">
                        <p><i class="uil uil-play-circle"></i></p>
                        <h2>{{ $t('video') }}</h2>
                    </router-link>
                </swiper-slide>
                <swiper-slide :class="$route.query.media === 'sound' ? 'active' : ''">
                    <router-link
                        :to="{path:`/${$i18n.locale}/timeline/game/${game.pathname}`, query:{media:'sound'}}">
                        <p><i class="uil uil-music"></i></p>
                        <h2>{{ $t('audio') }}</h2>
                    </router-link>
                </swiper-slide>

                <div class="swiper-button-prev" slot="button-prev"></div>
                <div class="swiper-button-next" slot="button-next"></div>
            </swiper>
        </div>


        <router-view :game="game"></router-view>
    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from "vue-property-decorator";

import {AxiosResponse} from "axios";
import {Swiper, SwiperSlide} from 'vue-awesome-swiper'
import {eGameStage} from "@/common/enumData";


@Component({
    components: {
        Swiper,
        SwiperSlide,
    },
})
export default class GameHeader extends Vue {
    eGameStage = eGameStage;
    gamePath = this.$route.params.gamePath;
    game: any = {};

    loginUser = {};
    user: any = {}

    hashtags: string[] = [];
    userInfo: any = [];
    followingCnt: number = 0;
    followerCnt: number = 0;

    gameId = this.$route.query.game_id

    TMSswiperOption = {
        slidesPerView: 'auto',
        spaceBetween: '0.4%',
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        },
        breakpoints: {
            300: {
                slidesPerView: 3.5
            },
            480: {
                slidesPerView: 3.5
            },
            768: {
                slidesPerView: 5.5
            },
            992: {
                slidesPerView: 7
            },
            1200: {
                //slidesPerView: 7
            }
        }
    }


    async mounted() {
        this.$store.dispatch("loginState")
            .then(() => {
                this.fetch()
                this.loginUser = this.$store.getters.user;
            })
            .finally(() => {

            })


    }

    fetch() {
        this.$api.gameInfo(this.gamePath)
            .then((res: any) => {
                const {result} = res;
                const {game} = result;
                this.$store.commit('gameInfo', game)
                this.game = game;
                this.user = game.user
                this.hashtags = (game.hashtags.length > 0) ? game.hashtags.split(",") : undefined;

                // this.hashtags = ['a','b','b']
                // this.projectFetch();

            })
            .catch((err: any) => {


            })


    }

    projectFetch() {
        this.$api.getProject(this.game.id)
            .then((res: any) => {
                console.log('projectFetch', res)
            })
            .catch((err: any) => {

            })
    }

    moveHashtag(hashtag: string) {
        this.$router.push(`/${this.$i18n.locale}/search?q=${hashtag}`)
    }

    subscribe() {
        //todo : game 페이지구독 api 연결
        console.log(this.game.id);
    }

    playGame(pathname: string) {

        window.open(
            this.$store.getters.homeUrl + `play/${pathname}`, "_blank");

    }

    @Watch('$route.params.gamePath')
    watchParams() {
        this.gamePath = this.$route.params.gamePath
        this.fetch();
    }
}
</script>

<style lang="scss" scoped>
.swiper-button-next,
.swiper-button-prev {
    --swiper-navigation-color: #999;
    --swiper-navigation-size: 20px;

    &:hover {
        --swiper-navigation-color: #FF6216;
    }
}

.tag-item {
    display: inline-block !important;
    margin-right: 10px;
    cursor: pointer;
}
</style>
