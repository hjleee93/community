<template>
  <dl class="three-area">
    <dt>
      <div class="ta-screenshot">
        <h2>Screenshot</h2>
        <swiper class="swiper-area" :options="TASswiperOption">
          <swiper-slide class="active">
            <img src="https://i.pinimg.com/564x/5f/da/ff/5fdaff21e318fc69cb9509edb6b2706b.jpg" width="100%" alt=""
                 title=""/>
          </swiper-slide>
          <swiper-slide>
            <img src="https://i.pinimg.com/564x/5f/da/ff/5fdaff21e318fc69cb9509edb6b2706b.jpg" width="100%" alt=""
                 title=""/>
          </swiper-slide>
          <swiper-slide>
            <img src="https://i.pinimg.com/564x/5f/da/ff/5fdaff21e318fc69cb9509edb6b2706b.jpg" width="100%" alt=""
                 title=""/>
          </swiper-slide>
          <swiper-slide>
            <img src="https://i.pinimg.com/564x/5f/da/ff/5fdaff21e318fc69cb9509edb6b2706b.jpg" width="100%" alt=""
                 title=""/>
          </swiper-slide>
          <swiper-slide>
            <img src="https://i.pinimg.com/564x/5f/da/ff/5fdaff21e318fc69cb9509edb6b2706b.jpg" width="100%" alt=""
                 title=""/>
          </swiper-slide>
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
        </swiper>
      </div>
    </dt>
    <dd>

      <Timeline :currPage="'game'" :id="game.id" :key="this.$route.query.media"></Timeline>
    </dd>


    <dt>
      <div class="ta-about">
        <h2>About Us</h2>
        <div>
          {{ game.description }}
        </div>
        <dl>
          <dt>Version</dt>
          <dd> {{ game.version }}</dd>
        </dl>
      </div>
      <div class="ta-copy-link">
        <a @click="copyUrl"><em>Copy Game Link</em> <span><i class="uil uil-link"></i></span></a>
      </div>
    </dt>

  </dl>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import {mapGetters} from "vuex";

import Feed from "@/components/timeline/_feed.vue";
import Timeline from "@/components/timeline/_timeline.vue";
import {Swiper, SwiperSlide} from "vue-awesome-swiper";
import {execCommandCopy} from "@/script/util";
import Toast from "@/script/message";

@Component({
  components: {
    Feed, Timeline, Swiper,
    SwiperSlide
  },
})
export default class GameTimeline extends Vue {
  toast = new Toast();

  TASswiperOption = {
    slidesPerView: 1,
    spaceBetween: 20,
    navigation: {
      nextEl: '.ta-screenshot .swiper-button-next',
      prevEl: '.ta-screenshot .swiper-button-prev'
    },
  }
  gamePath = this.$route.params.gamePath;
  user!: any;
  game: any = {};
  imgSrc = '';
  hashtags = [];


  mounted() {
    this.fetch();
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
          this.$store.commit('currPage', {
            game_id: game.id
          })
          //@ts-ignore
          Vue.$gtag.event('visit_game_page', {
            'gameId': game.id,
          });

        })
        .catch((err: any) => {


        })
  }

  openImgModal(imgSrc: string) {
    this.imgSrc = imgSrc;
    (this.$refs.originScreenShootImgModal as any).show();
  }

  closeImgModal() {
    (this.$refs.originScreenShootImgModal as any).hide();
  }

  copyUrl() {
    const url = `${process.env.VUE_APP_LAUNCHER_URL}game/${this.game.pathname}`;
    execCommandCopy(url)
    this.toast.clear();
    this.toast.successToast("클립보드에 복사되었습니다.")
  }
}
</script>

<style scoped lang="scss">
.ta-screenshot .swiper-button-next {
  --swiper-navigation-color: #fff;
  --swiper-navigation-size: 10px;

  display: block;
  position: absolute;
  width: 20px;
  height: 20px;
  margin: 15px 15px 0 0;
  text-align: center;
  line-height: 17px;
  border: #fff 1px solid;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.5);
  overflow: hidden;
  z-index: 99999999;

  &:hover {
    --swiper-navigation-color: #fff;
    background: #FF6216;
  }
}

.ta-screenshot .swiper-button-prev {
  --swiper-navigation-color: #fff;
  --swiper-navigation-size: 10px;

  display: block;
  position: absolute;
  width: 20px;
  height: 20px;
  margin: 15px 0 0 15px;
  text-align: center;
  line-height: 17px;
  border: #fff 1px solid;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.5);
  overflow: hidden;

  &:hover {
    --swiper-navigation-color: #fff;
    background: #FF6216;
  }
}

.ta-copy-link a {
  cursor: pointer;
}
</style>
