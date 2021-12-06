<template>
    <div class="content" v-if="community">
        <div :key="community.id" class="visual-info-center"
             :style="{'background' : 'url(' + bannerImg + ') center center no-repeat', 'background-size' : 'cover'}">
            <dl>
                <dt>
                    <ul>
                        <li>
                            <h2  class="cursor" @click="movePage('members')"> {{ community.member_cnt }}</h2>
                            <h3>Member</h3>
                        </li>
                        <li>
                            <h2 class="cursor" @click="movePage('timeline')">{{ postCnt }}</h2>
                            <h3>Posts</h3>
                        </li>
                        <li>
                            <h2 >{{ postCnt }}</h2>
                            <h3>Visits</h3>
                        </li>
                    </ul>
                </dt>
                <dd>
                    <div :style="`background:url(${profileImg}); background-size:cover;`">
                        <!--                        <span></span>-->
                    </div>
                    <h2>
                        <span v-if="community.state === 'PUBLIC'"><i class="uil uil-unlock-alt"></i></span>
                        <em v-else><i class="uil uil-lock-alt"></i></em>
                        {{ community.name }}
                    </h2>
                    <h3> {{ community.description }}</h3>
                </dd>
                <dt v-if="user">
                    <SubscribeBtn :community="community" @fetch="fetch"/>
<!--                    <dropdown-menu :overlay="false" class="vic-more-dropdown">-->
<!--                        <router-link to="#" class="btn-circle-none pt6" slot="trigger"><i-->
<!--                            class="uil uil-ellipsis-h"></i></router-link>-->
<!--                        <div slot="body" class="vic-more-list">-->
<!--                            <router-link @click="setting" :to="`/community/${community && community.id}/setting`">Group-->
<!--                                Setting-->
<!--                            </router-link>-->
<!--                            <router-link to="/createCommunity" class="active">Create Group</router-link>-->
<!--                        </div>-->
<!--                    </dropdown-menu>-->
                </dt>
            </dl>

        </div>
        <div class="tab-menu-swiper">
            <swiper class="swiper-area" :options="TMSswiperOption">
                <swiper-slide :class="
                        $route.name === 'CommunityTimeline' &&
                        Object.keys($route.query).length === 0
                            ? 'active'
                            : ''
                    ">
                    <router-link :to="`/community/${community.id}/timeline`">
                        <p><i class="uil uil-clock-three"></i></p>
                        <h2>타임라인(ALL)</h2>
                    </router-link>
                </swiper-slide>
                <swiper-slide :class="$route.query.media === 'sns' ? 'active' : ''">
                    <router-link :to="`/community/${community.id}/timeline?media=sns`">
                        <p><i class="uil uil-comment-dots"></i></p>
                        <h2>SNS</h2>
                    </router-link>
                </swiper-slide>
                <swiper-slide :class="$route.query.media === 'blog' ? 'active' : ''">
                    <router-link :to="`/community/${community.id}/timeline?media=blog`">
                        <p><i class="uil uil-edit"></i></p>
                        <h2>블로그</h2>
                    </router-link>
                </swiper-slide>
                <swiper-slide :class="$route.query.media === 'image' ? 'active' : ''">
                    <router-link
                        :to="`/community/${community.id}/timeline?media=image`"

                    >
                        <p><i class="uil uil-image-edit"></i></p>
                        <h2>이미지</h2>
                    </router-link>
                </swiper-slide>

                <swiper-slide :class="$route.query.media === 'video' ? 'active' : ''">
                    <router-link :to="`/community/${community.id}/timeline?media=video`">
                        <p><i class="uil uil-play-circle"></i></p>
                        <h2>동영상</h2>
                    </router-link>
                </swiper-slide>
                <div class="swiper-button-prev" slot="button-prev"></div>
                <div class="swiper-button-next" slot="button-next"></div>
            </swiper>
        </div>
        <router-view></router-view>
    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import {mapGetters} from "vuex";
import {User} from "@/types";
import {AxiosError, AxiosResponse} from "axios";
import SubscribeBtn from "@/components/community/_subscribeBtn.vue";
import {Swiper, SwiperSlide} from "vue-awesome-swiper";


@Component({
    components: {
        SubscribeBtn,
        Swiper,
        SwiperSlide,
    },
    computed: {...mapGetters(["user"])},
})
export default class Community extends Vue {
    private postCnt: number = 0;
    private community: any = {};
    private user!: User;

    profileImg = '';

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

    private bannerImg: string = "";


    mounted() {
        this.$store.dispatch("loginState")
            .then(() => {
                this.fetch()

            })
            .finally(() => {

            })
    }

    fetch() {
        this.$api.communityInfo(this.$route.params.community_id)
            .then((res: any) => {
                this.community = res
                if (this.community.banner_img) {
                    this.bannerImg = this.community.banner_img;
                }
                else {
                    this.bannerImg = "img/community_banner_default.jpg"
                }
                if (this.community.profile_img) {
                    this.profileImg = this.community.profile_img;
                }
                else {
                    this.profileImg = '/src/assets/images/zempy.png'
                }
            })
            .catch((err: any) => {
                console.log(err)
            })

    }


    subscribe() {
        this.$api.subscribe({user_id: this.user.id, community_id: this.$route.params.community_id})
            .then((res: AxiosResponse) => {
                console.log(res)
            }).catch((err: AxiosError) => {
            if (err.message) {
                alert(err.message)
            }
        })
    }

    unsubscribe() {
        this.$api.unsubscribe({user_id: this.user.id, community_id: this.$route.params.community_id})
            .then((res: AxiosResponse) => {
                console.log(res)
            }).catch((err: AxiosError) => {
            if (err.message) {
                alert(err.message)
            }
        })

    }

    setting() {
        // (this.$refs.dropbox as HTMLElement).click();
    }

    joined() {
        this.fetch();
    }

    currPage(routeName: string, query?: string) {

        console.log(Object.keys(this.$route.query), Object.keys(this.$route.query).length)
        let result = '';
        if ((routeName === this.$route.name) && Object.keys(this.$route.query).length === 0) {
            console.log('1')
            result = 'active'
        }
        else if (this.$route.query.media === query) {
            console.log('2')
            result = 'active'
        }
        console.log('result', result)

        return result;
    }

    movePage(router: string) {
        if (router === 'members') this.$router.push(`/community/${this.community.id}/members`)
        else if (router === 'timeline') this.$router.push(`/community/${this.community.id}/timeline`)
    }
}
</script>

<style scoped>
svg {
    vertical-align: middle;
}

figure > img {
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
}
.cursor{
    cursor: pointer;
}
</style>
