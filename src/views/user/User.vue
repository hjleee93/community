<template>
    <div class="content min-vh-100" v-if="userInfo">
        <div class="visual-info-center"
             :key="$route.params.channel_id"
             :style="{'background' : 'url(' + require('../../assets/images/banner_white.png') + ') center no-repeat', 'background-size' : 'cover'}">
            <dl>
                <dt>
                    <ul>
                        <li>

                            <h2 class="cursor" @click="movePage('timeline')">{{ postCnt }}</h2>
                            <h3>Posts</h3>
                        </li>
                        <li>
                            <h2 class="cursor" @click="movePage('follower')">{{ userInfo.follower_cnt }}</h2>
                            <h3>Followers</h3>
                        </li>
                        <li>
                            <h2 class="cursor" @click="movePage('following')">{{ userInfo.following_cnt }}</h2>
                            <h3>Followings</h3>
                        </li>
                    </ul>
                </dt>
                <dd>
                    <UserAvatar :key='userInfo.id' :user="userInfo" :tag="'div'"></UserAvatar>

                    <!--                    <div-->
                    <!--                        :style="`background:url(${userInfo.picture ||  '../../assets/images/300_300_default_profile.png' }) center center / cover no-repeat; background-size:cover;`">-->
                    <!--                        &lt;!&ndash;                        <span></span>&ndash;&gt;-->
                    <!--                    </div>-->
                    <h2>
                        {{ userInfo.name }}
                    </h2>
                    <!--                    <h3>게임을 사랑하는 사람들</h3>-->
                </dd>
                <dt>
                    <FollowBtn v-if="user&&(userInfo.id !== user.id)" class="follow-btn" :member="userInfo"
                               :key="followKey"
                               @reFetch="reFetch"/>
                </dt>

            </dl>
        </div>
        <div class="tab-menu-swiper">
            <swiper class="swiper-area" :options="TMSswiperOption">
                <swiper-slide
                    :class=" $route.name === 'UserTimeline' &&
                        Object.keys($route.query).length === 0
                            ? 'active'
                            : ''">
                    <router-link :to="`/${$i18n.locale}/channel/${userInfo.channel_id}/timeline`">
                        <p><i class="uil uil-clock-three"></i></p>
                        <h2>{{ $t('timeline')}}(ALL)</h2>
                    </router-link>
                </swiper-slide>
                <swiper-slide :class="$route.query.media === 'sns' ? 'active' : ''">
                    <router-link :to="`/${$i18n.locale}/channel/${userInfo.channel_id}/timeline?media=sns`">
                        <p><i class="uil uil-comment-dots"></i></p>
                        <h2>SNS</h2>
                    </router-link>
                </swiper-slide>
                <swiper-slide :class="$route.query.media === 'blog' ? 'active' : ''">
                    <router-link :to="`/${$i18n.locale}/channel/${userInfo.channel_id}/timeline?media=blog`">
                        <p><i class="uil uil-edit"></i></p>
                        <h2>{{ $t('blog')}}</h2>
                    </router-link>
                </swiper-slide>
                <swiper-slide :class="$route.query.media === 'image' ? 'active' : ''">
                    <router-link :to="`/${$i18n.locale}/channel/${userInfo.channel_id}/timeline?media=image`">
                        <p><i class="uil uil-image-edit"></i></p>
                        <h2>{{ $t('image')}}</h2>
                    </router-link>
                </swiper-slide>
                <swiper-slide :class="$route.query.media === 'video' ? 'active' : ''">
                    <router-link :to="`/${$i18n.locale}/channel/${userInfo.channel_id}/timeline?media=video`">
                        <p><i class="uil uil-play-circle"></i></p>
                        <h2>{{ $t('video')}}</h2>
                    </router-link>
                </swiper-slide>
                <swiper-slide :class="$route.query.media === 'sound' ? 'active' : ''">
                    <router-link :to="`/${$i18n.locale}/channel/${userInfo.channel_id}/timeline?media=sound`">
                        <p><i class="uil uil-music"></i></p>
                        <h2>{{ $t('audio')}}</h2>
                    </router-link>
                </swiper-slide>
                <swiper-slide :class="$route.name === 'AllGameCard' ? 'active' : ''">
                    <router-link :to="`/${$i18n.locale}/channel/${userInfo.channel_id}/games`">
                        <p><i class="uil uil-map-pin-alt"></i></p>
                        <h2>{{ $t('game')}}</h2>
                    </router-link>
                </swiper-slide>
                <div class="swiper-button-prev" slot="button-prev"></div>
                <div class="swiper-button-next" slot="button-next"></div>
            </swiper>
        </div>

        <!--        포트폴리오-->
        <!--                <router-link-->
        <!--                    class="section-menu-item"-->
        <!--                    :to="`/channel/${userUid}/portfolio`"-->
        <!--                    :class="-->
        <!--                        $route.name === 'PortfolioList' ||-->
        <!--                        $route.name === 'PortfolioTimeline'-->
        <!--                            ? 'active'-->
        <!--                            : ''-->
        <!--                    "-->
        <!--                >-->

        <router-view></router-view>
    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from "vue-property-decorator";

import {mapGetters} from "vuex";
import {User} from "@/types";
import {AxiosError, AxiosResponse} from "axios";
import FollowBtn from "@/components/user/_followBtn.vue";
import {Swiper, SwiperSlide} from "vue-awesome-swiper";
import UserAvatar from "@/components/user/_userAvatar.vue";

@Component({
    computed: {...mapGetters(["user"])},
    components: {
        FollowBtn,
        Swiper,
        SwiperSlide,
        UserAvatar
    },
})
export default class UserHeader extends Vue {
    userInfo: any = [];
    postCnt: number = 0;
    user!: User;

    profileImg: string = '';
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
    followKey = Date.now()

    mounted() {
        this.$store.dispatch("loginState")
            .then(() => {
                this.fetch()

            })
            .finally(() => {

            })
    }


    fetch() {
        this.$api.channel(this.$route.params.channel_id)
            .then((res: any) => {
                const {target} = res.result
                this.userInfo = target;
                this.$store.commit("channelUserInfo", this.userInfo);
                if (res.userInfo) {
                    this.profileImg = this.userInfo.picture
                }
                else {
                    this.profileImg = 'img/300_300_default_profile.png'
                }
                this.followKey = Date.now();
            })
            .then(() => {
                this.postCntFetch(this.userInfo.id);
            })
            .catch((err: any) => {
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

    followUser() {
        this.$api.follow(this.userInfo.id)
            .then((res: any) => {
                //todo: follow 버튼 새로고침 처리
                //todo: 백엔드 수정해야됨
                if (res.is_following) {
                    // console.log('following...')
                }

            })
            .catch((err: any) => {

            })

    }


    currPage(routeName: string) {

        let result = '';
        if ((routeName === this.$route.name) && Object.keys(this.$route.query).length === 0) {
            result = 'active'
        }
        else if (routeName === this.$route.name) {
            result = 'active'
        }

        return result;
    }

    reFetch() {
        this.fetch();
        this.$store.dispatch('reloadUserInfo')
    }

    movePage(page: string) {
        if (page === 'timeline') {
            this.$router.push(`/${this.$i18n.locale}/channel/${this.userInfo && this.userInfo.channel_id}/timeline`)
        }
        else if (page === 'following') {

            this.$router.push(`/${this.$i18n.locale}/channel/${this.userInfo && this.userInfo.id}/followings`)

        }
        else if (page === 'follower') {
            this.$router.push(`/${this.$i18n.locale}/channel/${this.userInfo && this.userInfo.id}/followers`)
        }
    }

    @Watch('$route.params.channel_id')
    watchParams() {
        this.fetch();
    }
}
</script>

<style lang="scss" scoped>
.cursor {
    cursor: pointer;
}

.swiper-button-next,
.swiper-button-prev {
    --swiper-navigation-color: #999;
    --swiper-navigation-size: 20px;

    &:hover {
        --swiper-navigation-color: #FF6216;
    }
}

//todo: media 반응형 처리해야됨
.follow-btn {
    width: 50%;
}
</style>
