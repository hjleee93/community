<template>
  <div class="content">
    <div class="visual-title">
      <h2><span>Games</span></h2>
    </div>
    <div class="tab-search-swiper">
      <swiper class="swiper-area" :options="TSSswiperOption">
        <swiper-slide>
          <a @click="fetch(1)" :class="category === 1 ? 'active' : ''">공식 게임</a>
        </swiper-slide>
        <swiper-slide>
          <a @click="fetch(0)" :class="category === 0 ? 'active' : ''">도전 게임
            <!--                        <span>10</span>-->
          </a>
        </swiper-slide>
      </swiper>
    </div>


    <dl class="area-title">
      <dt>Games <span>{{ games.length }}</span></dt>
    </dl>

    <ul class="card-game">
      <li v-for="game in games" :key="game.id" @click="playGame(game.pathname)">
        <div
            :style="`background: url( ${game && game.url_thumb_webp ||  game.picture} ) center center no-repeat; background-size: cover;`"></div>
        <dl>
          <dt>
            <P :style="`background: url('https://i.pinimg.com/564x/c8/73/80/c873800d7a80266bc1bd4797671caaae.jpg') center center no-repeat; background-size: cover;`"></P>
          </dt>
          <dd>
            <h2>{{ game && game.title }}</h2>
            <p>{{ game.user && game.user.name }}</p>
            <ul>
              <!--                            <li><img src="../../assets/images/charge_game_icon.svg" alt=""></li>-->
              <!--                            <li><img src="../../assets/images/hot_game_icon.svg" alt=""></li>-->
              <li><img src="img/zempie_game_icon.svg" alt=""></li>
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


  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from "vue-property-decorator";
import Feed from "@/components/timeline/_feed.vue";
import MemberCard from "@/components/community/_memberCard.vue";
import {Swiper, SwiperSlide} from 'vue-awesome-swiper'
import {execCommandCopy} from "@/script/util";
import Toast from "@/script/message";

@Component({
  components: {
    Feed,
    MemberCard,
    Swiper,
    SwiperSlide,
  },
})
export default class GameListOffical extends Vue {
  toast = new Toast();
  games: any = [];
  category: number = 1;

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

  mounted() {
    this.fetch(this.category)
  }

  beforeDestroy() {
    this.$store.dispatch('resetResearchData')
  }

  fetch(category: number) {
    this.category = category;
    const obj = {
      limit: 20,
      category: category,
      sort: 'c',
      dir: 'asc'
    };
    switch (category) {
        //도전
      case 0:
        this.$api.officalGameList(obj)
            .then((res: any) => {
              this.games = res.result.games
            })
        break;
        //공식
      case 1:
        this.$api.officalGameList(obj)
            .then((res: any) => {
              this.games = res.result.games

            })
        break;


    }

  }

  playGame(pathname: string) {
    window.open(
        this.$store.getters.homeUrl + `play/${pathname}`, "_blank");

  }

  userPage(userUid: string) {
    this.$router.push(`/channel/${userUid}/timeline`)
  }

  copyUrl() {
    execCommandCopy(`${this.$store.getters.communityUrl}/feed/${this.feed.id}`)
    this.toast.clear();
    this.toast.successToast("Link copied to clipboard")
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
