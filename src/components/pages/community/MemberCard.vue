<template>
    <div class="user-preview">
        <figure class="user-preview-cover liquid" style="background-color: #F97316">
<!--            <div></div>-->
<!--            <b-img :src="bannerImg" alt="cover-04" />-->
        </figure>

        <div class="user-preview-info">
            <div class="user-short-description">
                <router-link
                    :to="`/channel/${member.uid}/timeline`"
                    class="user-short-description-avatar user-avatar medium"
                >
                    <div class="user-avatar-border">
                        <div class="hexagon-120-132"></div>
                    </div>

                    <div class="user-avatar-content">
                        <div
                            class="hexagon-image-82-90"
                            :data-src="member.profile_img || defaultProfile"
                        ></div>
                    </div>

                    <div class="user-avatar-progress">
                        <div class="hexagon-progress-100-110"></div>
                    </div>

                    <div class="user-avatar-progress-border">
                        <div class="hexagon-border-100-110"></div>
                    </div>
                </router-link>

                <p class="user-short-description-title">
                    <router-link
                        :to="`/channel/${member.uid}/timeline`"
                        style="color: #fff"
                        >{{ member.name }}</router-link
                    >
                </p>
                <!--                        todo: 백엔드 수정되면 업데이트, 회원 정보 젬파이 api 수정해야됨 -->
<!--                 <p class="user-nickname">-->
<!--                    <router-link-->
<!--                        :to="`/channel/${member.uid}/timeline`"-->
<!--                        style="color: #616161"-->
<!--                        >@{{ member.nickname }}</router-link-->
<!--                    >-->
<!--                </p>-->
            </div>

            <div
                id="user-preview-stats-slides-01"
                class="user-preview-stats-slides"
            >
                <div class="user-preview-stats-slide">
                    <div class="user-stats">
<!--                        todo: 백엔드 수정되면 업데이트, post_cnt 누락됨-->
<!--                        <div class="user-stat">-->
<!--                            <p class="user-stat-title">{{ member.post_cnt }}</p>-->

<!--                            <p class="user-stat-text">posts</p>-->
<!--                        </div>-->

                        <div class="user-stat">
                            <p class="user-stat-title">
                                {{ member.followers_cnt }}
                            </p>

                            <p class="user-stat-text">followers</p>
                        </div>
                        <div class="user-stat">
                            <p class="user-stat-title">
                                {{ member.followings_cnt }}
                            </p>

                            <p class="user-stat-text">followings</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="user-preview-actions">
                <slot name="action-button1"></slot>
                <slot name="action-button2"></slot>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Hexagon from "@/plugins/hexagon";
import { User } from "@/types/index";
@Component({
    components: {},
})
export default class MemberCard extends Vue {
    @Prop() member!: User;
    private hexagon: Hexagon = new Hexagon();
    defaultProfile = 'img/default_profile.png'
    bannerImg = 'img/channel_banner.png'

    mounted() {
        this.hexagon.init();
    }
}
</script>

<style scoped>
svg {
    vertical-align: middle;
}
</style>
