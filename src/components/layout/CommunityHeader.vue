<template>
    <div class="content-grid">
        <div class="profile-header v2">
            <figure class="profile-header-cover liquid">
                <img :src="`${community.banner_img}`" alt="cover-29"/>
            </figure>

            <div class="profile-header-info">
                <div class="user-short-description big">
                    <div
                        class="
                            user-short-description-avatar user-avatar
                            big
                            no-stats
                        "
                    >
                        <div class="user-avatar-border">
                            <div class="hexagon-148-164"></div>
                        </div>
                        <div class="user-avatar-content">
                            <div
                                class="hexagon-image-124-136"
                                :data-src="community.profile_img"
                            ></div>
                        </div>
                    </div>
                    <div
                        class="
                            user-short-description-avatar
                            user-short-description-avatar-mobile
                            user-avatar
                            medium
                            no-stats
                        "
                    >
                        <div class="user-avatar-border">
                            <div class="hexagon-120-130"></div>
                        </div>

                        <div class="user-avatar-content">
                            <div
                                class="hexagon-image-100-110"
                                :data-src="community.profile_img"
                            ></div>
                        </div>
                    </div>

                    <p
                        class="user-short-description-title"
                        style="margin-top: 10px"
                    >
                        {{ community.name }}
                    </p>
                    <!-- 
                    <p class="user-short-description-text">
                        {{ community.description }}
                    </p> -->
                </div>

                <div class="user-stats">
                    <div class="user-stat big">
                        <div class="user-stat-icon">
                            <template v-if="community.state === 'PUBLIC'">
                                <svg class="icon-public">
                                    <use xlink:href="#svg-public"></use>
                                </svg>
                            </template>
                            <template v-else>
                                <svg class="icon-private">
                                    <use xlink:href="#svg-private"></use>
                                </svg>
                            </template>
                        </div>

                        <p class="user-stat-text">{{ community.state }}</p>
                    </div>

                    <router-link
                        class="user-stat big"
                        :to="`/community/${community.id}/members`"
                    >
                        <p class="user-stat-title">
                            {{ community.member_cnt }}
                        </p>

                        <p class="user-stat-text">members</p>
                    </router-link>

                    <router-link
                        class="user-stat big"
                        :to="`/community/${community.id}/timeline`"
                    >
                        <p class="user-stat-title">{{ postCnt }}</p>

                        <p class="user-stat-text">posts</p>
                    </router-link>

                    <div class="user-stat big">
                        <p class="user-stat-title">{{ community.visit_cnt }}</p>

                        <p class="user-stat-text">visits</p>
                    </div>
                </div>

                <div class="tag-sticker">
                    <svg class="tag-sticker-icon icon-public">
                        <use xlink:href="#svg-public"></use>
                    </svg>
                </div>

                <div class="profile-header-info-actions">
                    <SubscribeBtn :community="community"></SubscribeBtn>

                    <div
                        class="
                            profile-header-info-action
                            button
                            group-setting-dropdown-trigger
                        "
                        ref="dropbox"
                    >
                        <svg class="icon-more-dots">
                            <use xlink:href="#svg-more-dots"></use>
                        </svg>
                    </div>
                    <div>
                        <div

                            class="simple-dropdown header-settings-dropdown"
                            @click="setting"
                        >
                            <router-link
                                v-if="community.manager_id === user.id"
                                class="simple-dropdown-link"
                                :to="`/community/${community && community.id}/setting`"
                            >
                                Group setting
                            </router-link>

<!--                            todo: 커뮤니티 관리자만 보이게 수정-->
                            <router-link
                                class="simple-dropdown-link"
                                to="/createCommunity"
                            >
                                Create group
                            </router-link>
                        </div>
                    </div>
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
                    :to="`/community/${community.id}/timeline`"
                    :class="
                        $route.name === 'CommunityTimeline' &&
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
                    :to="`/community/${community.id}/timeline?media=sns`"
                    :class="$route.query.media === 'sns' ? 'active' : ''"
                >
                    <svg class="section-menu-item-icon icon-forums">
                        <use xlink:href="#svg-forums"></use>
                    </svg>
                    <p class="section-menu-item-text">SNS</p>
                </router-link>

                <router-link
                    class="section-menu-item"
                    :to="`/community/${community.id}/timeline?media=blog`"
                    :class="$route.query.media === 'blog' ? 'active' : ''"
                >
                    <svg class="section-menu-item-icon icon-forum">
                        <use xlink:href="#svg-forum"></use>
                    </svg>

                    <p class="section-menu-item-text">Blog</p>
                </router-link>

                <router-link
                    class="section-menu-item"
                    :to="`/community/${community.id}/members`"
                    :class="$route.name === 'MemberList' ? 'active' : ''"
                >
                    <svg class="section-menu-item-icon icon-members">
                        <use xlink:href="#svg-members"></use>
                    </svg>

                    <p class="section-menu-item-text">Members</p>
                </router-link>
                <router-link
                    class="section-menu-item"
                    :to="`/community/${community.id}/timeline?media=image`"
                    :class="$route.query.media === 'image' ? 'active' : ''"
                >
                    <svg class="section-menu-item-icon icon-photos">
                        <use xlink:href="#svg-photos"></use>
                    </svg>

                    <p class="section-menu-item-text">Photos</p>
                </router-link>

                <router-link
                    class="section-menu-item"
                    :to="`/community/${community.id}/timeline?media=video`"
                    :class="$route.query.media === 'video' ? 'active' : ''"
                >
                    <svg class="section-menu-item-icon icon-videos">
                        <use xlink:href="#svg-videos"></use>
                    </svg>

                    <p class="section-menu-item-text">Videos</p>
                </router-link>
            </div>

            <!-- <div
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
            </div> -->
        </nav>
        <router-view></router-view>
    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import {mapGetters} from "vuex";
import Dropdown from "@/plugins/dropdown";
import Hexagon from "@/plugins/hexagon";
import {User} from "@/types";
import {AxiosError, AxiosResponse} from "axios";
import SubscribeBtn from "@/components/pages/community/_subscribeBtn.vue";


@Component({
    components: {SubscribeBtn},
    computed: {...mapGetters(["user"])},
})
export default class CommunityHeader extends Vue {
    private dropdown: Dropdown = new Dropdown();
    private hexagon: Hexagon = new Hexagon();
    private postCnt: number = 0;
    private communityId = this.$route.params.community_id;
    private community: any = {};
    private user!: User;

    mounted() {
        this.fetch()
        this.dropdown.init();
        this.hexagon.init();
    }

    fetch() {
        this.$api.communityInfo(this.communityId)
            .then((res: AxiosResponse) => {
                console.log("postCnt", res)
                this.$store.commit('communityInfo', res);
                this.community = res
            })
        .catch((err:AxiosError)=>{
            console.log(err)
        })
    }



    subscribe() {
        this.$api.subscribe({user_id: this.user.id, community_id: this.communityId})
            .then((res:AxiosResponse)=>{
                console.log(res)
            }).catch((err:AxiosError)=>{
            if(err.message){
                alert(err.message)
            }
        })
    }

    unsubscribe(){
        this.$api.unsubscribe({user_id: this.user.id, community_id: this.communityId})
            .then((res:AxiosResponse)=>{
                console.log(res)
            }).catch((err:AxiosError)=>{
            if(err.message){
                alert(err.message)
            }
        })

    }
    setting() {
        // (this.$refs.dropbox as HTMLElement).click();
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
</style>
