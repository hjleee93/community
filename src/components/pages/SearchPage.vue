<template>
    <div class="content">
        <div class="visual-title">
            <h2>'{{ keyword }}' <span>검색결과</span></h2>
        </div>

        <div class="tab-search-swiper">
            <swiper class="swiper-area" :options="TSSswiperOption">
                <swiper-slide>
                    <router-link to="#" class="active">ALL</router-link>
                </swiper-slide>
                <swiper-slide>
                    <router-link to="#">Communities
<!--                        <span>10</span>-->
                    </router-link>
                </swiper-slide>
                <swiper-slide>
                    <router-link to="#">Users</router-link>
                </swiper-slide>
                <swiper-slide>
                    <router-link to="#">Games</router-link>
                </swiper-slide>
            </swiper>
        </div>
        <dl class="area-title">
            <dt>Users <span>{{ memberList.length }}</span></dt>
        </dl>
        <ul class="card-follow" >
            <li v-for="member in memberList" :key="member.id" @click="userPage(member.uid)">
                <div class="cf-img" ></div>
<!--                todo: zempy s3에 올려서 url 따서 넣기-->
                <p :style="{'background' : 'url(' +member.picture === null ?  '/zempie/community/img/zempy.png': member.picture  + ') center center no-repeat', 'background-size' : 'cover'}"></p>
                <div class="cf-info">
                    <h3>{{ member.name }}</h3>
                    <p> </p>
                    <dl>
                        <dd>
                            <h4>{{ member.followers_cnt }}</h4>
                            <p>Followers</p>
                        </dd>
                        <dt><p></p></dt>
                        <dd>
                            <h4>{{  member.followings_cnt }}</h4>
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


        <dl class="area-title">
            <dt>Games <span>{{ games.length }}</span></dt>
        </dl>

        <ul class="card-game" >
            <li v-for="game in games" :key="game.id">
                <div :style="`background: url( ${game && game.url_thumb_webp} ) center center no-repeat; background-size: cover;`"></div>
                <dl>
                    <dt>
                        <P :style="`background: url('https://i.pinimg.com/564x/c8/73/80/c873800d7a80266bc1bd4797671caaae.jpg') center center no-repeat; background-size: cover;`"></P>
                    </dt>
                    <dd>
                        <h2>{{ game && game.title  }}</h2>
                        <p>{{ game.user && game.user.name  }}</p>
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

        <dl class="area-title">
            <dt>Posts <span>{{ posts.length }}</span></dt>
        </dl>

        <div class="post-wrap" v-if="posts.length > 0">
            <ul class="post-list">
                <!--포스트 반복 -->
                <li v-for="post in posts" :key="post.id">
                    <dl>
                        <dt>
                            <p style="background: url('https://i.pinimg.com/564x/70/86/0a/70860a694929c5a615deead4a9c9d259.jpg') center center no-repeat; background-size: cover;"></p>
                        </dt>
                        <dd>
                            <h2>젬파이 업데이트 포스트 무슨생각을 하고 계신가요?</h2>
                            <p><i class="uis uis-clock" style="color:#c1c1c1;"></i> 10시간전</p>
                        </dd>
                        <dt><router-link to="#"><i class="uil uil-ellipsis-h font25"></i></router-link></dt>
                    </dl>
                    <div>

                        <p v-html="post.content"></p>
<!--                        <ul>-->
<!--                            <li>#프롬더레드</li>-->
<!--                            <li>#젬파이</li>-->
<!--                            <li>#창작게임</li>-->
<!--                        </ul>-->
                    </div>
                    <ul>
                        <li>
                            <ul>
                                <li><i class="xi-heart" style="font-size:22px; color:#ff6e17"></i>&nbsp; {{post.like_cnt}}</li>
                                <li><i class="uil uil-comment-alt-dots" style="font-size:22px;"></i>&nbsp; {{post.comment_cnt}}</li>
<!--                                <li><i class="uil uil-eye" style="font-size:22px;"></i>&nbsp;680</li>-->
                                <li><a @click="copyUrl"><i class="uil uil-share-alt" style="font-size:20px;"></i></a></li>
                            </ul>
                        </li>
<!--                        <li><router-link to="#"><i class="uil uil-bookmark" style="font-size:24px; color:#ff6e17;"></i></router-link></li>-->
                    </ul>
                </li>
                <!--포스트 반복 끝-->

            </ul>
            <!-- <div class="post-loading">
              <p><img src="../../assets/images/loading-icon.png" alt="" title="" /></p>
              <h3>LOADING...</h3>
            </div> -->
        </div>


    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from "vue-property-decorator";
import Feed from "@/components/timeline/Feed.vue";
import MemberCard from "@/components/community/_memberCard.vue";
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import {copyUrl} from "@/script/utils";
@Component({
    components: {
        Feed,
        MemberCard,
        Swiper,
        SwiperSlide,
    },
})
export default class SearchPage extends Vue {
    private type: string = Object.keys(this.$route.query)[0];
    private query: any = this.$route.query[Object.keys(this.$route.query)[0]];
    private posts: any = [];
    private games: any = [];
    private memberList: any = [];

    keyword: string | (string | null)[] = '';
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

    async created() {
        console.log(this.$store.getters.researchData)
        console.log('quer', this.$route)
        console.log('data', this.$store.getters.userData)


        if (this.$store.getters.userData.length > 0) {
            this.keyword = this.$route.query.username
            this.memberList = this.$store.getters.userData;
            console.log('me', this.memberList)
        }
        else {
            this.keyword = this.$route.query.q
        }

        this.memberList = this.$store.getters.researchData.users;
        this.posts = this.$store.getters.researchData.posts;
        // const result = await this.$api.search(this.query, this.type);
        // this.posts = result.posts;
        this.games = this.$store.getters.researchData.games;
        this.fetch()
    }

    beforeDestroy() {
        this.$store.dispatch('resetResearchData')
    }

    fetch() {
        console.log('fetch', this.$route.query.q)
        const obj = {
            q: this.$route.query.q,
            limit: 5
        };

        this.$api.search(obj)
            .then((res: any) => {
                console.log('resd', res.users)
                this.memberList = res.users
                this.games = res.games
                this.posts = res.posts

            })
            .catch((err: any) => {

            })
    }

    toGamePage(gamePath: string, gameId: number) {
        this.$router.push(`/timeline/game/${gamePath}?game_id=${gameId}`)


    }

    @Watch('$route.query.q')
    watchQuery() {
        this.fetch();
    }
    userPage(userUid: string){
        this.$router.push(`/channel/${userUid}/timeline`)
    }

    copyUrl() {
        copyUrl()
        this.$toasted.clear();
        this.$toasted.show("Link copied to clipboard", {
            singleton: true,
            fullWidth: false,
            fitToScreen: true,
            theme: "outline",
            position: "bottom-left",
            className: "toast-success",
            duration: 3000,
            action: {
                text: "X",
                onClick: (e, toastObject) => {
                    toastObject.goAway(0);
                },
            },
        });
    }

}
</script>

<style scoped>
.toasted, .toast-success{
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
.cf-info{
    height: 100%;
}
.cf-img{
    background-color: #f39800;
}
</style>
