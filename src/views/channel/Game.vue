<template>
  <div class="content">


    <!-- 비주얼영역 - 정보 -->
    <div class="visual-info-center" :style="{'background' : 'url(' + require('../../assets/images/visual_top_img.png') + ') center no-repeat', 'background-size' : 'cover'}">
      <dl>
        <dt>
          <ul>
            <li>
              <h2>438</h2>
              <h3>Member</h3>
            </li>
            <li>
              <h2>298</h2>
              <h3>Poste</h3>
            </li>
            <li>
              <h2>321K</h2>
              <h3>Visits</h3>
            </li>
          </ul>
        </dt>
        <dd>
          <div style="background:url('https://i.pinimg.com/564x/5a/c6/9f/5ac69fbf5904a38984b8c39cdd3c7a6f.jpg'); background-size:cover;">
            <span></span>
          </div>
          <h2>
            잼파이 게임 그룹 블로그
          </h2>
          <h3>게임을 사랑하는 사람들</h3>
        </dd>
        <dt></dt>
      </dl>
    </div>
    <!-- 비주얼영역 - 정보 끝 -->


    <!-- 탭메뉴 -->
    <div class="tab-menu-swiper">
      <swiper class="swiper-area" :options="TMSswiperOption">
        <swiper-slide class="active">
          <p><i class="uil uil-clock-three"></i></p>
          <h2>타임라인(ALL)</h2>
        </swiper-slide>
        <swiper-slide>
          <p><i class="uil uil-comment-dots"></i></p>
          <h2>SNS</h2>
        </swiper-slide>
        <swiper-slide>
          <p><i class="uil uil-edit"></i></p>
          <h2>블로그</h2>
        </swiper-slide>
        <swiper-slide>
          <p><i class="uil uil-image-edit"></i></p>
          <h2>이미지</h2>
        </swiper-slide>
        <swiper-slide>
          <p><i class="uil uil-play-circle"></i></p>
          <h2>동영상</h2>
        </swiper-slide>
        <swiper-slide>
          <p><i class="uil uil-layers"></i></p>
          <h2>포트폴리오</h2>
        </swiper-slide>
        <swiper-slide>
          <p><i class="uil uil-map-pin-alt"></i></p>
          <h2>게임</h2>
        </swiper-slide>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
      </swiper>
    </div>
    <!-- 탭메뉴 끝 -->


    <!-- 타이틀 -->
    <dl class="area-title">
      <dt>Game <span>10</span></dt>
      <dd><router-link to="#" class="btn-default-samll">Add Game <i class="uil uil-plus"></i></router-link></dd>
    </dl>
    <!-- 타이틀 끝 -->


    <!-- 카드  -->
    <ul class="card-portfolio">
      <li>
        <div class="cp-img" :style="{'background' : 'url(' + require('../../assets/images/card_test_img01.png') + ') center no-repeat', 'background-size' : 'cover'}"></div>
        <div class="cp-info">
          <h3>게임게임게임</h3>
          <p>@zempieeeee</p>
        </div>
      </li>
      <li>
        <div class="cp-img" :style="{'background' : 'url(' + require('../../assets/images/card_test_img02.png') + ') center no-repeat', 'background-size' : 'cover'}"></div>
        <div class="cp-info">
          <h3>게임게임게임</h3>
          <p>@zempieeeee</p>
        </div>
      </li>
      <li>
        <div class="cp-img" :style="{'background' : 'url(' + require('../../assets/images/card_test_img03.png') + ') center no-repeat', 'background-size' : 'cover'}"></div>
        <div class="cp-info">
          <h3>게임게임게임</h3>
          <p>@zempieeeee</p>
        </div>
      </li>
      <li>
        <div class="cp-img" :style="{'background' : 'url(' + require('../../assets/images/card_test_img04.png') + ') center no-repeat', 'background-size' : 'cover'}"></div>
        <div class="cp-info">
          <h3>게임게임게임</h3>
          <p>@zempieeeee</p>
        </div>
      </li>
    </ul>
    <!-- 카드  -->
      

  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css'

export default {
  name: "",
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      TMSswiperOption: {
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
      },
    }
  },
};
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
