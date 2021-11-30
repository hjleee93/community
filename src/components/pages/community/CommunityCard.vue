<template>
    <div class="user-preview">
        <!-- 배너이미지 -->
            <div
                :style="`background: url(${
                           community.banner_img || bannerImg
                        }) center center / cover no-repeat;`"
                class="user-preview-cover liquid"
            />
        <!--/ 배너이미지 -->

        <div class="user-preview-info">
            <!-- Community State -->
            <slot name="communityState"></slot>
            <!-- /Community State -->
            <div class="user-short-description">
                <router-link
                    class="
                        user-short-description-avatar user-avatar
                        medium
                        no-stats
                    "
                    :to="`/community/${community.id}/timeline`"
                >


                    <!--todo: 퍼블리싱 오면 수정-->
                    <div class="user-avatar-content">
                        <b-img
                            class="hexagon-image-100-110"
                            style="border-radius: 12px"
                            :src="profileImg"
                        ></b-img>
                    </div>
                </router-link>

                <p class="user-short-description-title text-left">
                    <router-link :to="`/community/${community.id}/timeline`">
                        {{ community.name }}
                    </router-link>
                </p>

                <p class="user-short-description-text text-left">
                    {{ community.description }}
                </p>
            </div>
            <!-- Community Detail Info  -->
            <slot name="communityDetail"></slot>
            <!-- /Community Detail Info  -->
            <slot name="communityAction"></slot>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import Hexagon from "@/plugins/hexagon";

@Component({
    components: {},
})

export default class CommunityCard extends Vue {
    @Prop() community!: any;
    private hexagon: Hexagon = new Hexagon();

    private bannerImg: string = "img/community_banner_default.jpg";
    private profileImg: string ='';

    mounted() {
        this.hexagon.init();
        console.log('profile_img', this.community.profile_img)
        if(this.community.profile_img){
            this.profileImg = this.community.profile_img;
        }else{
            this.profileImg ='img/zempy.png'
        }

    }
}
</script>

<style scoped>
svg {
    vertical-align: middle;
}
figure > img {
    border-top-right-radius: 12px;
    border-top-left-radius: 12px;
}
</style>
