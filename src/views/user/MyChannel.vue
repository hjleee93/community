<template>
    <div class="content" v-if="user">
        <!-- 비주얼영역 - 정보 -->
        <div class="visual-info-center"
             :style="{'background' : 'url(' + require('../../assets/images/1200_380_my_channel.png') + ') center no-repeat', 'background-size' : 'cover'}">

        </div>
        <!-- 비주얼영역 - 정보 끝 -->


        <!-- 탭메뉴 -->
        <div class="tab-menu-swiper">
            <swiper class="swiper-area" :options="TMSswiperOption">
                <swiper-slide :class="
                        $route.name === 'MyChannel' &&
                        media === ''
                            ? 'active'
                            : ''
                    ">
                    <a @click="media=''">
                        <p><i class="uil uil-clock-three"></i></p>
                        <h2>{{ $t('timeline')}}(ALL)</h2>
                    </a>
                </swiper-slide>
                <swiper-slide :class="media=== 'sns' ? 'active' : ''">
                    <a @click="media='sns'">
                        <p><i class="uil uil-comment-dots"></i></p>
                        <h2>SNS</h2>
                    </a>
                </swiper-slide>
                <swiper-slide :class="media=== 'blog' ? 'active' : ''">
                    <a @click="media='blog'">
                        <p><i class="uil uil-edit"></i></p>
                        <h2>{{ $t('blog')}}</h2>
                    </a>
                </swiper-slide>
                <swiper-slide :class="media=== 'image' ? 'active' : ''">
                    <a @click="media='image'">
                        <p><i class="uil uil-image-edit"></i></p>
                        <h2>{{ $t('image')}}</h2>
                    </a>
                </swiper-slide>
                <swiper-slide :class="media=== 'video' ? 'active' : ''">
                    <a @click="media='video'">
                        <p><i class="uil uil-play-circle"></i></p>
                        <h2>{{ $t('video')}}</h2>
                    </a>
                </swiper-slide>
                <swiper-slide :class="media=== 'sound' ? 'active' : ''">
                    <a @click="media='sound'">
                        <p><i class="uil uil-music"></i></p>
                        <h2>{{ $t('audio')}}</h2>
                    </a>
                </swiper-slide>
                <swiper-slide :class="media=== 'game' ? 'active' : ''">
                    <a @click="media='game'">
                        <p><i class="uil uil-map-pin-alt"></i></p>
                        <h2>{{ $t('game')}}</h2>
                    </a>
                </swiper-slide>
                <div class="swiper-button-prev" slot="button-prev"></div>
                <div class="swiper-button-next" slot="button-next"></div>
            </swiper>
        </div>
        <!-- 탭메뉴 끝 -->


        <!-- 3단영역 -->
        <AllGameCard v-if="media === 'game'"></AllGameCard>
        <FollowerList v-else-if="media === 'followers'" :userId="user.id"></FollowerList>
        <FollowingList v-else-if="media === 'followings'" :userId="user.id"></FollowingList>
        <dl class="three-area" v-else>
            <dt>
                <div class="ta-myinfo">
                    <UserAvatar :user="user" :tag="'p'"></UserAvatar>
<!--                    <p :style="`background:url(${user.picture || 'img/300_300_default_profile.png'}) center; background-size:cover;`">-->
                        <!--                        <span><i class="uil uil-camera"></i></span>-->
<!--                    </p>-->
                    <h2>{{ user.name }}</h2>
                    <!--                    <h3>Admin</h3>-->
                    <ul>
                        <li @click="media = ''">
                            <p style="background:#FEB100; cursor: pointer"><i class="uil uil-comment-chart-line"></i>
                            </p>
                            <h2>{{ postCnt }}</h2>
                            <h3>Posts</h3>
                        </li>
                        <li @click="media = 'followings'">

                            <p style="background:#5D5FFE;cursor: pointer"><i class="uil uil-user-plus"></i></p>
                            <h2>{{ user.profile && user.following_cnt }}</h2>
                            <h3>Followings</h3>
                        </li>
                        <li @click="media = 'followers'">
                            <p style="background:#33E4CE;cursor: pointer"><i class="uil uil-users-alt"></i></p>
                            <h2>{{ user.profile && user.follower_cnt }}</h2>
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
            <dd >
                <Timeline :currPage="'user'" :key="media" :mediaType='media'></Timeline>
            </dd>
            <dt>
                <!--                <div class="ta-who-follow">-->
                <!--                    <h2>Who to Follow</h2>-->
                <!--                    <dl>-->
                <!--                        <dt>-->
                <!--                            <dl>-->
                <!--                                <dt><span-->
                <!--                                    style="background: url('https://i.pinimg.com/564x/a3/15/62/a3156289f13307ec8f0d37746ae830a5.jpg') center center no-repeat; background-size: cover;"></span>-->
                <!--                                </dt>-->
                <!--                                <dd>-->
                <!--                                    <h2>User Name</h2>-->
                <!--                                    <h3>@nice to talk with</h3>-->
                <!--                                </dd>-->
                <!--                            </dl>-->
                <!--                        </dt>-->
                <!--                        <dd><a href="#"><i class="uil uil-plus"></i></a></dd>-->
                <!--                    </dl>-->
                <!--                    <dl>-->
                <!--                        <dt>-->
                <!--                            <dl>-->
                <!--                                <dt><span-->
                <!--                                    style="background: url('https://i.pinimg.com/564x/a3/15/62/a3156289f13307ec8f0d37746ae830a5.jpg') center center no-repeat; background-size: cover;"></span>-->
                <!--                                </dt>-->
                <!--                                <dd>-->
                <!--                                    <h2>User Name</h2>-->
                <!--                                    <h3>@nice to talk with</h3>-->
                <!--                                </dd>-->
                <!--                            </dl>-->
                <!--                        </dt>-->
                <!--                        <dd><a href="#"><i class="uil uil-plus"></i></a></dd>-->
                <!--                    </dl>-->
                <!--                    <div><a href="#" class="btn-default-samll w100p">더보기</a></div>-->
                <!--                </div>-->

                <div class="ta-groups">
                    <h2>Groups</h2>
                    <div>
                        <template v-if="communityList && communityList.length > 0">
                            <dl v-for="community in communityList" @click="moveCommunity(community.id)">
                                <dt><span
                                    :style="`background: url(${community.profile_img || 'img/100_100_com_profile.png'}) center center no-repeat; background-size: cover;`"></span>
                                </dt>
                                <dd>
                                    <h2>{{ community.name }}</h2>
                                    <h3><i class="uil uil-chat-bubble-user"></i>{{ $t('member') }}  {{ community.member_cnt }}</h3>
                                </dd>
                            </dl>
                        </template>
                        <template v-else>
                            <dl>
                                {{ $t('noJoined.community') }}
                            </dl>
                        </template>
                    </div>
                    <p v-if="communityList.length>5"><a href="#" class="btn-default-samll w100p">{{ $t('moreView') }}</a></p>
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
import AllGameCard from "@/components/pages/user/AllGameCard.vue";
import FollowerList from "@/components/pages/user/FollowerList.vue";
import FollowingList from "@/components/pages/user/FollowingList.vue";
import UserAvatar from "@/components/user/_userAvatar.vue";
import MetaSetting from "@/script/metaSetting";

@Component({
    components: {
        Swiper,
        SwiperSlide,
        Timeline,
        AllGameCard,
        FollowerList,
        FollowingList,
        UserAvatar
    },
    computed: {...mapGetters(["user"])},
})
export default class MyChannel extends Vue {
    metaSetting !: MetaSetting;
    TMSswiperOption = {
        slidesPerView: 'auto',
        spaceBetween: '0.2%',
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
    communityList = [];
    user!: any;
    media = '';

    mounted() {


        this.$store.dispatch("loginState")
            .then((res: any) => {
                if (res === 4) {
                    this.metaSetting = new MetaSetting({
                        title: `${this.$t('myChannel')} | Zempie.com`,
                        meta: [
                            {name: 'description', content: `${this.user.name} ${this.$t('myChannel.desc')}`}, //~의 채널입니다.
                            {property: 'og:url', content: `${this.$store.getters.homeUrl}/${this.$i18n.locale}/myChannel`},
                            {property: 'og:title', content: `${this.$t('myChannel')} | Zempie.com`},
                            {property: 'og:description', content: `${this.user.name} ${this.$t('myChannel.desc')}`},
                        ]
                    });
                    this.postCntFetch(this.user.id)
                    this.joinedComFetch(this.user.id)
                }
                else {
                    this.$router.push(`/${this.i18n.locale}/login`)
                }

            })
    }


    postCntFetch(userId: number) {
        this.$api.userPostCnt(userId)
            .then((res: number) => {
                this.postCnt = res;
            })
            .catch((err: AxiosError) => {

            })
    }

    joinedComFetch(userId: number) {
        this.$api.joinedCommunityList(userId)
            .then((res: any) => {
                this.communityList = res;
            })
            .catch((err: AxiosError) => {

            })
    }

    moveCommunity(id: string) {
        this.$router.push(`/${this.$i18n.locale}/community/${id}/timeline`)
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

.ta-groups {
    margin-top: 0px;
}
</style>
