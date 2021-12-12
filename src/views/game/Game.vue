<template>
  <div class="content">
    <div class="visual-info-left"
         :style="{'background' : 'url(' + game && game.url_thumb_webp+ ') center no-repeat', 'background-size' : 'cover'}">
      <dl>
        <dt>
          <dl>
            <dt>
              &nbsp;
              <div
                  :style="`background:url(${game && game.url_thumb}); background-size:cover;`">
                <span></span>
              </div>
            </dt>
            <dd>
              <h2> {{ game && game.title }}<span></span></h2>
              <h3>by@ {{ game.user && game.user.name}}</h3>
              <div
                  class="tag-item secondary"
                  @click="moveHashtag(hashtag)"
                  v-for="hashtag in hashtags"
                  :key="hashtag"
              ><a >{{ hashtag }}</a>
              </div
              >
            </dd>
          </dl>
        </dt>
        <dd>
          <a   @click="playGame(game.pathname)" class="btn-default w150">Play Game</a>
          <a v-if="loginUser" @click="subscribe" class="btn-sub w150 ml10">구독</a>
        </dd>
      </dl>
    </div>
    <div class="tab-menu-swiper">
      <swiper class="swiper-area" :options="TMSswiperOption">
<!--        todo: 클래스 수정(회사)-->
        <swiper-slide  :class="
                        $route.name === 'GameTimeline' &&
                        Object.keys($route.query).length === 0
                            ? 'active'
                            : ''
                    ">
          <router-link  :to="{path:`/timeline/game/${game.pathname}`, query:{game_id:game.id}}">
          <p><i class="uil uil-clock-three"></i></p>
          <h2>타임라인(ALL)</h2>
          </router-link>
        </swiper-slide>
        <swiper-slide :class="$route.query.media === 'sns' ? 'active' : ''">
          <router-link :to="{path:`/timeline/game/${game.pathname}/timeline`, query:{game_id:game.id, media:'sns'}}">
          <p><i class="uil uil-comment-dots"></i></p>
          <h2>SNS</h2>
          </router-link>
        </swiper-slide>
        <swiper-slide  :class="$route.query.media === 'blog' ? 'active' : ''">
          <router-link  :to="{path:`/timeline/game/${game.pathname}/timeline`, query:{game_id:game.id, media:'blog'}}">
          <p><i class="uil uil-edit"></i></p>
          <h2>블로그</h2>
          </router-link>
        </swiper-slide>
        <swiper-slide  :class="$route.query.media === 'image' ? 'active' : ''">
          <router-link :to="{path:`/timeline/game/${game.pathname}/timeline`, query:{game_id:game.id, media:'image'}}">
          <p><i class="uil uil-image-edit"></i></p>
          <h2>이미지</h2>
          </router-link>
        </swiper-slide>
        <swiper-slide  :class="$route.query.media === 'video' ? 'active' : ''">
          <router-link   :to="{path:`/timeline/game/${game.pathname}/timeline`, query:{game_id:game.id, media:'video'}}">
          <p><i class="uil uil-play-circle"></i></p>
          <h2>동영상</h2>
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
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'


enum eStage {
  Dev = 1,
  Early,
  Complete,
  Monetization
}

@Component({
  components: { Swiper,
    SwiperSlide,},
})
export default class GameHeader extends Vue {

  private gamePath = this.$route.params.gamePath;
  private game: any = {};

  private loginUser = {};
  private user: any = {}

  private hashtags: string[] = [];
  private userInfo: any = [];
  private followingCnt: number = 0;
  private followerCnt: number = 0;

  gameId = this.$route.query.game_id

  TMSswiperOption =  {
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
    this.fetch()
    this.loginUser = this.$store.getters.user

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

        })
        .catch((err: any) => {


        })
    this.$api.getProject(Number(this.gameId))
        .then((res: any) => {
          console.log('getProject', eStage[res.stage])
        })
        .catch((err: any) => {

        })


  }

  moveHashtag(hashtag: string) {
    this.$router.push(`/search?hashtag=${hashtag}`)
  }

  subscribe() {
    //todo : game 페이지구독 api 연결
    console.log(this.game.id);
  }

  playGame(pathname: string) {

    window.open(
        this.$store.getters.homeUrl + `play/${pathname}`, "_blank");

  }

  @Watch("game", {immediate: true})
  watchImg(val: any) {
    // console.log("watch userInfo", val);
    this.$nextTick(() => {

    });
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
</style>
