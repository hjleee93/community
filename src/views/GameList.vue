<template>
    <div class="content">
        <div class="visual-title">
            <h2><span>Games</span></h2>
        </div>
        <!--        <div class="tab-search-swiper">-->
        <!--            <swiper class="swiper-area" :options="TSSswiperOption">-->
        <!--                <swiper-slide>-->
        <!--                    <a @click="clickCategory(1); " :class="category === 1 ? 'active' : ''">공식 게임</a>-->
        <!--                </swiper-slide>-->
        <!--                <swiper-slide>-->
        <!--                    <a @click="clickCategory(0); " :class="category === 0 ? 'active' : ''">도전 게임-->
        <!--                        &lt;!&ndash;                        <span>10</span>&ndash;&gt;-->
        <!--                    </a>-->
        <!--                </swiper-slide>-->
        <!--            </swiper>-->
        <!--        </div>-->


        <dl class="area-title">
            <dt>Games <span>{{ games.length }}</span></dt>
        </dl>

        <transition name="component-fade" mode="out-in">
            <ul>
                <transition-group name="list-complete" class="card-game">
                    <GameCard v-for="game in games" :key="game.id" :game="game"/>
                </transition-group>

                <!--            <li class="more-card" v-if="games && games.length>3">-->
                <!--                <div>-->
                <!--                    <h3><i class="uil uil-plus"></i></h3>-->
                <!--                    <p>모두보기</p>-->
                <!--                </div>-->
                <!--            </li>-->
            </ul>
        </transition>

    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from "vue-property-decorator";
import Feed from "@/components/timeline/_feed.vue";
import MemberCard from "@/components/community/_memberCard.vue";
import {Swiper, SwiperSlide} from 'vue-awesome-swiper'
import Toast from "@/script/message";
import {scrollDone} from "@/script/scrollManager";
import UserAvatar from "@/components/user/_userAvatar.vue";
import GameCard from "@/components/game/_gameCard.vue";
import MetaSetting from "@/script/metaSetting";

@Component({
    components: {
        Feed,
        MemberCard,
        Swiper,
        SwiperSlide,
        UserAvatar,
        GameCard
    },
})
export default class gameList extends Vue {
    metaSetting !: MetaSetting;
    toast = new Toast();
    games: any = [];
    category: number = 1;

    //parameters
    limit: number = 20;
    offset: number = 0;
    sort: string = 'c';
    dir: string = 'asc'

    //state
    isAddData: boolean = false;
    hasData: boolean = true;


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

    async mounted() {

        await this.$store.dispatch("loginState");
        this.fetch()
        this.metaSetting = new MetaSetting({
            title: `${this.$t('gameList')} | Zempie.com`, //게임 리스트
            meta: [
                {name: 'description', content: `${this.$t('gameList.desc')}`},
                {property: 'og:url', content: `${this.$store.getters.homeUrl}/${this.$i18n.locale}/gameList`},
                {property: 'og:title', content: `${this.$t('gameList')} | Zempie.com`},
                {property: 'og:description', content: `${this.$t('gameList.desc')}`},
            ]
        });
        window.addEventListener("scroll", this.scrollCheck);
    }

    beforeDestroy() {
        this.$store.dispatch('resetResearchData')
        this.initData();
        window.removeEventListener("scroll", this.scrollCheck);
    }

    fetch() {
        const obj = {
            limit: this.limit,
            offset: this.offset,
            // category: this.category,
            sort: this.sort,
            dir: this.dir
        };

        this.$api.gameList(obj)
            .then((res: any) => {
                if (this.isAddData) {
                    if (res.result.games.length > 0) {
                        this.games = [...this.games, ...res.result.games]
                    }
                    else {
                        this.hasData = false
                        window.removeEventListener("scroll", this.scrollCheck);

                    }
                }
                else {
                    this.games = res.result.games;
                    this.isAddData = true
                }

            })


    }

    clickCategory(category: number) {
        this.category = category;
        this.initData();

        this.fetch();

    }


    initData() {
        window.addEventListener("scroll", this.scrollCheck);
        this.isAddData = false
        this.hasData = false
        this.limit = 20;
        this.offset = 0;
        this.games = [];
        this.sort = 'c';
        this.dir = 'asc';
    }

    scrollCheck() {
        if (scrollDone(document.documentElement)) {
            this.offset += this.limit;
            this.fetch();
        }
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

.swiper-slide {
    cursor: pointer;
}


.list-complete-item {
    display: inline-block;
    margin-right: 10px;
}

.list-complete-enter, .list-complete-leave-to
    /* .list-complete-leave-active below version 2.1.8 */
{
    opacity: 0;
    transform: translateY(30px);
}

.list-complete-enter-active {
    transition: all 1s;
}

.component-fade-enter-active,
.component-fade-leave-active {
    transition: opacity 0.3s ease;
}

.component-fade-enter-from,
.component-fade-leave-to {
    opacity: 0;
}
</style>
