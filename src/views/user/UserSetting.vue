<template>
    <div class="content min-vh-100" v-if="user">
        <!-- 비주얼영역 - 메뉴 -->
        <div class="visual-menu"
             :style="{'background' : 'url(' + require('../../assets/images/1200_240_setting.png') + ') center no-repeat', 'background-size' : 'cover'}">
            <p class="title"> Settings</p>
            <swiper class="swiper-area" :options="VMswiperOption">
                <swiper-slide >
                    <router-link :class="
                    $route.name === 'UserGeneralSetting.vue' ||
                    $route.name === 'Leave'
                        ? 'active'
                        : ''
                " :to="`/${$i18n.locale}/user/${user.channel_id}/settings`">계정</router-link>
                </swiper-slide>
                <!--                <swiper-slide>-->
                <!--                    <router-link to="#">비밀번호변경</router-link>-->
                <!--                </swiper-slide>-->
                <swiper-slide>
                    <router-link :class="$route.name === 'FollowerList' ? 'active' : ''"
                                 :to="{path:`/user/${user.id}/followers`}">팔로워
                    </router-link>
                </swiper-slide>
                <swiper-slide>
                    <router-link :to="{path:`/user/${user.id}/followings`}"
                                 :class="$route.name === 'FollowingList' ? 'active' : ''">팔로잉
                    </router-link>
                </swiper-slide>
                <swiper-slide>
                    <router-link :to="`/${$i18n.locale}/user/${user.channel_id}/manageJoinedGroup`"
                                 :class="$route.name === 'ManageJoinedGroup.vue' ? 'active' : ''">그룹
                    </router-link>
                </swiper-slide>
                <!--                <swiper-slide>-->
                <!--                    <router-link :class="$route.name === 'NotificationList' ? 'active' : ''"
                                :to="`/user/${user.uid}/notificationList`">알림</router-link>-->
                <!--                </swiper-slide>-->
                <!--                <swiper-slide>-->
                <!--                    <router-link :class="$route.name === 'MessageList' ? 'active' : ''"
                                :to="`/user/${user.uid}/messageList`">메세지</router-link>-->
                <!--                </swiper-slide>-->
            </swiper>
        </div>

        <router-view></router-view>
    </div>
</template>

<script lang="ts">
import {Swiper, SwiperSlide} from 'vue-awesome-swiper'
import {User} from "@/types";
import {Component, Prop, Vue} from "vue-property-decorator";

import {mapGetters} from "vuex";

@Component({
    components: {
        Swiper,
        SwiperSlide,
    },
    computed: {...mapGetters(["user"])},
})
export default class UserSettingHeader extends Vue {
    private user!: User;
    VMswiperOption = {
        slidesPerView: 7,
        spaceBetween: 0,
        breakpoints: {
            300: {
                slidesPerView: 4
            },
            480: {
                slidesPerView: 4
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

    async mounted(){
        await this.$store.dispatch('loginState')
    }
}
</script>

<style scoped lang="scss">
.simple-tab-items {
    margin-top: 32px;
}
.title{
    display: flex;
    justify-content: center;
    width: 100%;
    height: 80%;
    align-items: center;
    color: #fff;
    font-size: 2.25rem;
    font-weight: 700;
}
</style>
