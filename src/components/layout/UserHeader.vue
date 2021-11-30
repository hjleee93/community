<template>
    <div class="content-grid" :key="this.$route.fullPath">
        <div class="profile-header">
            <figure class="profile-header-cover liquid">
                <div
                    style="background-color: #fff; width: 100%; height: 100%"
                ></div>
            </figure>

            <div class="profile-header-info">
                <div class="user-short-description big">
                    <div class="user-short-description-avatar user-avatar big" v-if="userInfo">


                        <b-img
                            style="border-radius: 12px; width: 100%; height: 100%"
                            :src="profileImg"
                        ></b-img>

                    </div>


                    <p class="user-short-description-title">
                        {{ userInfo.name }}
                    </p>

                    <!-- todo: zempie 백엔드 nickname 추가후 수정-->
                    <!--                    <p class="user-short-description-text">-->
                    <!--                        @{{ userInfo.nickname }}-->
                    <!--                    </p>-->
                </div>

                <div class="user-stats">
                    <div class="user-stat big">
                        <router-link
                            class="user-stat-title"
                            :to="`/channel/${userInfo.uid}/timeline`"
                        >{{ postCnt }}
                        </router-link
                        >

                        <p class="user-stat-text">posts</p>
                    </div>
                    <!--todo :젬파이 백엔드 following_cnt 수정해야댐-->
                    <div class="user-stat big">
                        <router-link
                            class="user-stat-title"
                            :to="{path:`/channel/${userInfo.uid}/followers`, query:{user_id:userInfo.id}}"

                        >{{ followerCnt }}
                        </router-link
                        >
                        <p class="user-stat-text">Followers</p>
                    </div>
                    <div class="user-stat big">
                        <router-link
                            class="user-stat-title"
                            :to="{path:`/channel/${userInfo.uid}/followings`, query:{user_id:userInfo.id}}"

                        >{{ followingCnt }}
                        </router-link
                        >

                        <p class="user-stat-text">Followings</p>
                    </div>
                </div>
                <div
                    class="profile-header-info-actions"
                    v-if="user && user.uid !== userInfo.uid"
                >
                    <!--                    todo:following 여부 백엔드 추가 필요 -->
                    <FollowBtn :member="userInfo" @memberFetch="fetch"/>

                </div>
            </div>
        </div>
        <nav class="section-navigation">
            <div
                id="section-navigation-medium-slider"
                class="section-menu secondary"
            >
                <router-link
                    class="section-menu-item"
                    :to="`/channel/${userUid}/timeline`"
                    :class="
                        $route.name === 'UserPage.vue' &&
                        Object.keys($route.query).length === 0
                            ? 'active'
                            : ''
                    "
                >
                    <svg class="section-menu-item-icon icon-timeline">
                        <use xlink:href="#svg-timeline"></use>
                    </svg>

                    <p class="section-menu-item-text">Timeline</p>
                </router-link>

                <router-link
                    class="section-menu-item"
                    :to="`/channel/${userUid}/timeline?media=sns`"
                    :class="$route.query.media === 'sns' ? 'active' : ''"
                >
                    <svg class="section-menu-item-icon icon-forums">
                        <use xlink:href="#svg-forums"></use>
                    </svg>
                    <p class="section-menu-item-text">SNS</p>
                </router-link>

                <router-link
                    class="section-menu-item"
                    :to="`/channel/${userUid}/timeline?media=blog`"
                    :class="$route.query.media === 'blog' ? 'active' : ''"
                >
                    <svg class="section-menu-item-icon icon-forum">
                        <use xlink:href="#svg-forum"></use>
                    </svg>

                    <p class="section-menu-item-text">Blog</p>
                </router-link>

                <router-link
                    class="section-menu-item"
                    :to="`/channel/${userUid}/timeline?media=image`"
                    :class="$route.query.media === 'image' ? 'active' : ''"
                >
                    <svg class="section-menu-item-icon icon-photos">
                        <use xlink:href="#svg-photos"></use>
                    </svg>

                    <p class="section-menu-item-text">Photos</p>
                </router-link>

                <router-link
                    class="section-menu-item"
                    :to="`/channel/${userUid}/timeline?media=video`"
                    :class="$route.query.media === 'video' ? 'active' : ''"
                >
                    <svg class="section-menu-item-icon icon-videos">
                        <use xlink:href="#svg-videos"></use>
                    </svg>

                    <p class="section-menu-item-text">Videos</p>
                </router-link>
                <router-link
                    class="section-menu-item"
                    :to="`/channel/${userUid}/games`"
                    :class="$route.name === 'AllGameList' ? 'active' : ''"
                >
                    <svg class="section-menu-item-icon icon-newsfeed">
                        <use xlink:href="#svg-newsfeed"></use>
                    </svg>

                    <p class="section-menu-item-text">Games</p>
                </router-link>
                <router-link
                    class="section-menu-item"
                    :to="`/channel/${userUid}/portfolio`"
                    :class="
                        $route.name === 'PortfolioList' ||
                        $route.name === 'PortfolioTimeline'
                            ? 'active'
                            : ''
                    "
                >
                    <svg class="section-menu-item-icon icon-newsfeed">
                        <use xlink:href="#svg-newsfeed"></use>
                    </svg>

                    <p class="section-menu-item-text">Portfolio</p>
                </router-link>
            </div>

            <div
                id="section-navigation-medium-slider-controls"
                class="slider-controls"
            >
                <div class="slider-control left">
                    <svg class="slider-control-icon icon-small-arrow">
                        <use xlink:href="#svg-small-arrow"></use>
                    </svg>
                </div>

                <div class="slider-control right">
                    <svg class="slider-control-icon icon-small-arrow">
                        <use xlink:href="#svg-small-arrow"></use>
                    </svg>
                </div>
            </div>
        </nav>

        <router-view></router-view>
    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from "vue-property-decorator";

import {mapGetters} from "vuex";
import Hexagon from "@/plugins/hexagon";
import {User} from "@/types";
import plugins from "@/plugins/plugins";
import {AxiosError, AxiosResponse} from "axios";
import FollowBtn from "@/components/pages/user/_followBtn.vue";

@Component({
    computed: {...mapGetters(["user"])},
    components: {FollowBtn},
})
export default class UserHeader extends Vue {
    private hexagon: Hexagon = new Hexagon();

    private userUid = this.$route.params.channel_id;
    private userInfo: any = [];
    private postCnt: number = 0;
    private followingCnt: number = 0;
    private followerCnt: number = 0;
    private user!: User;

    profileImg: string = '';

    mounted() {
        this.fetch();
    }


    fetch() {
        this.$api.channel(this.userUid)
            .then((res: any) => {
                this.userInfo = res.target;
                this.$store.commit("channelUserInfo", this.userInfo);
                if (res.picture) {
                    this.profileImg = this.userInfo.picture
                }
                else {
                    this.profileImg = 'img/default_profile.png'
                }
            })
            .then(()=>{

                this.postCntFetch(this.userInfo.id);
            })
            .catch((err: any) => {

            })
    }

    postCntFetch(userId: number) {
        this.$api.userPostCnt(userId)
            .then((res: number) => {
                console.log('count!!!!!!',res)
                this.postCnt = res;
            })
            .catch((err: AxiosError) => {

            })
    }

    @Watch("$route.fullPath")
    watchUserUid(val: any) {
        this.fetch()
    }

    followUser() {
        this.$api.follow(this.userInfo.id)
            .then((res: any) => {
                //todo: follow 버튼 새로고침 처리
                //todo: 백엔드 수정해야됨
                if (res.is_following) {
                    console.log('following...')
                }

            })
            .catch((err: any) => {

            })

    }
}
</script>

<style scoped>
svg {
    vertical-align: middle;
}

figure > div {
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
}
</style>
