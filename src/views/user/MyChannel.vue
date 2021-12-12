<template>
    <div class="content" v-if="user">
        <!-- 비주얼영역 - 정보 -->
        <div class="visual-info-center"
             :style="{'background' : 'url(' + require('../../assets/images/visual_top_img.png') + ') center no-repeat', 'background-size' : 'cover'}">

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


        <!-- 3단영역 -->
        <dl class="three-area">
            <dt>
                <div class="ta-myinfo">
                    <p style="background:url('https://i.pinimg.com/564x/3a/8d/98/3a8d98a8ea40173bc1eb592981f4b643.jpg') center; background-size:cover;">
                        <span><i class="uil uil-camera"></i></span>
                    </p>
                    <h2>{{ user.name }}</h2>
                    <!--                    <h3>Admin</h3>-->
                    <ul>
                        <li>
                            <p style="background:#FEB100;"><i class="uil uil-comment-chart-line"></i></p>
                            <h2>{{ postCnt }}</h2>
                            <h3>Posts</h3>
                        </li>
                        <li>
                            <p style="background:#5D5FFE;"><i class="uil uil-user-plus"></i></p>
                            <h2>{{ user.profile && user.profile.following_cnt }}</h2>
                            <h3>Following</h3>
                        </li>
                        <li>
                            <p style="background:#33E4CE;"><i class="uil uil-users-alt"></i></p>
                            <h2>{{ user.profile && user.profile.followers_cnt }}</h2>
                            <h3>Followers</h3>
                        </li>
                    </ul>
                </div>

<!--                <div class="ta-game-list mt20">-->
<!--                    <dl>-->
<!--                        <dt>Game</dt>-->
<!--                        <dd><a href="#"><i class="uil uil-plus"></i> 게임추가</a></dd>-->
<!--                    </dl>-->
<!--                    <ul>-->
<!--                        <li>-->
<!--                            <p style="background:url('https://i.pinimg.com/564x/3a/8d/98/3a8d98a8ea40173bc1eb592981f4b643.jpg') center; background-size:cover;"></p>-->
<!--                            <h2>Bunny Roulette</h2>-->
<!--                        </li>-->
<!--                        <li>-->
<!--                            <p style="background:url('https://i.pinimg.com/236x/47/73/c7/4773c7b87bbe9f7d92d54a0c8f6364d4.jpg') center; background-size:cover;"></p>-->
<!--                            <h2>Bunny Roulette</h2>-->
<!--                        </li>-->
<!--                        <li>-->
<!--                            <p style="background:url('https://i.pinimg.com/564x/5a/c6/9f/5ac69fbf5904a38984b8c39cdd3c7a6f.jpg') center; background-size:cover;"></p>-->
<!--                            <h2>Bunny Roulette</h2>-->
<!--                        </li>-->
<!--                        <li>-->
<!--                            <p style="background:url('https://i.pinimg.com/564x/6b/c7/4a/6bc74a3ae68b2a30b946861b6f7c459a.jpg') center; background-size:cover;"></p>-->
<!--                            <h2>Bunny Roulette</h2>-->
<!--                        </li>-->
<!--                        <li>-->
<!--                            <p style="background:url('https://i.pinimg.com/236x/47/73/c7/4773c7b87bbe9f7d92d54a0c8f6364d4.jpg') center; background-size:cover;"></p>-->
<!--                            <h2>Bunny Roulette</h2>-->
<!--                        </li>-->
<!--                    </ul>-->
<!--                    <div><a href="#" class="btn-default-samll w100p">더보기</a></div>-->
<!--                </div>-->
            </dt>
            <dd>
                <Timeline :currPage="'user'" :key="this.$route.query.media"></Timeline>
            </dd>
            <dt>
                <div class="ta-who-follow">
                    <h2>Who to Follow</h2>
                    <dl>
                        <dt>
                            <dl>
                                <dt><span
                                    style="background: url('https://i.pinimg.com/564x/a3/15/62/a3156289f13307ec8f0d37746ae830a5.jpg') center center no-repeat; background-size: cover;"></span>
                                </dt>
                                <dd>
                                    <h2>User Name</h2>
                                    <h3>@nice to talk with</h3>
                                </dd>
                            </dl>
                        </dt>
                        <dd><a href="#"><i class="uil uil-plus"></i></a></dd>
                    </dl>
                    <dl>
                        <dt>
                            <dl>
                                <dt><span
                                    style="background: url('https://i.pinimg.com/564x/a3/15/62/a3156289f13307ec8f0d37746ae830a5.jpg') center center no-repeat; background-size: cover;"></span>
                                </dt>
                                <dd>
                                    <h2>User Name</h2>
                                    <h3>@nice to talk with</h3>
                                </dd>
                            </dl>
                        </dt>
                        <dd><a href="#"><i class="uil uil-plus"></i></a></dd>
                    </dl>
                    <div><a href="#" class="btn-default-samll w100p">더보기</a></div>
                </div>

                <div class="ta-groups">
                    <h2>Groups</h2>
                    <div>
                        <dl>
                            <dt><span
                                style="background: url('https://i.pinimg.com/564x/e6/86/2b/e6862b37876bb456ce6a302061a9ef20.jpg') center center no-repeat; background-size: cover;"></span>
                            </dt>
                            <dd>
                                <h2>폼생폼사 창작게임 고수 모임으로 드루와</h2>
                                <h3><i class="uil uil-chat-bubble-user"></i> 멤버 28,020명</h3>
                            </dd>
                        </dl>
                        <dl>
                            <dt><span
                                style="background: url('https://i.pinimg.com/564x/61/49/eb/6149ebd02d67cae6a96120491f8559d3.jpg') center center no-repeat; background-size: cover;"></span>
                            </dt>
                            <dd>
                                <h2>폼생폼사 창작게임 고수 모임으로 드루와</h2>
                                <h3><i class="uil uil-chat-bubble-user"></i> 멤버 28,020명</h3>
                            </dd>
                        </dl>
                        <dl>
                            <dt><span
                                style="background: url('https://i.pinimg.com/564x/fa/af/28/faaf2883b80d8df1ee9a1a3ce25e1720.jpg') center center no-repeat; background-size: cover;"></span>
                            </dt>
                            <dd>
                                <h2>폼생폼사 창작게임 고수 모임으로 드루와</h2>
                                <h3><i class="uil uil-chat-bubble-user"></i> 멤버 28,020명</h3>
                            </dd>
                        </dl>
                        <dl>
                            <dt><span
                                style="background: url('https://i.pinimg.com/564x/49/dd/c4/49ddc4fe8d61b61327031c2a272adb5f.jpg') center center no-repeat; background-size: cover;"></span>
                            </dt>
                            <dd>
                                <h2>폼생폼사 창작게임 고수 모임으로 드루와</h2>
                                <h3><i class="uil uil-chat-bubble-user"></i> 멤버 28,020명</h3>
                            </dd>
                        </dl>
                        <dl>
                            <dt><span
                                style="background: url('https://i.pinimg.com/564x/a3/15/62/a3156289f13307ec8f0d37746ae830a5.jpg') center center no-repeat; background-size: cover;"></span>
                            </dt>
                            <dd>
                                <h2>폼생폼사 창작게임 고수 모임으로 드루와</h2>
                                <h3><i class="uil uil-chat-bubble-user"></i> 멤버 28,020명</h3>
                            </dd>
                        </dl>
                    </div>
                    <p><a href="#" class="btn-default-samll w100p">더보기</a></p>
                </div>
            </dt>
        </dl>
        <!-- 3단영역 끝 -->


    </div>
</template>


<script lang="ts">
import {Swiper, SwiperSlide} from 'vue-awesome-swiper'
import {Component, Prop, Vue} from "vue-property-decorator";
import {mapGetters} from "vuex";
import {AxiosError} from "axios";
import Timeline from "@/components/timeline/_timeline.vue";

@Component({
    components: {
        Swiper,
        SwiperSlide,
        Timeline
    },
    computed: {...mapGetters(["user"])},
})
export default class MyChannel extends Vue {
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
    postCnt = 0;
    mounted(){

    }

    postCntFetch(userId: number) {
        this.$api.userPostCnt(userId)
            .then((res: number) => {
                this.postCnt = res;
            })
            .catch((err: AxiosError) => {

            })
    }
}
</script>

<style scoped lang="scss">
.swiper-button-next,
.swiper-button-prev {
    --swiper-navigation-color: #999;
    --swiper-navigation-size: 20px;

    &:hover {
        --swiper-navigation-color: #FF6216;
    }
}
</style>
