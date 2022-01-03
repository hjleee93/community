<template>
    <li>
        <div class="cm-img"></div>
        <UserAvatar :user="member" :tag="'p'"></UserAvatar>
<!--        <p @click="userPage"-->
<!--           :style="{'background' : 'url(' + profileImg || '../../assets/images/zempy.png'+ ') center no-repeat', 'background-size' : 'cover'}"></p>-->

        <!--        <div class="cm-setup">-->
        <!--            <i class="uil uil-ellipsis-h" slot="trigger" @click="isOpenMyDropdown = !isOpenMyDropdown"></i>-->
        <!--            <dropdown-menu :overlay="false" :isOpen="isOpenMyDropdown" @closed="isOpenMyDropdown = false">-->

        <!--                <ul slot="body" class="vic-more-list">-->
        <!--                    <a @click="muteUser">뮤트</a>-->
        <!--                </ul>-->

        <!--            </dropdown-menu>-->

        <!--        </div>-->
        <div class="cm-info">
            <h3>{{ member.name }}</h3>
            <!--                    <p>@Zempieabcd</p>-->
            <div>
                <FollowBtn :member="member" @refetch="refetch"/>
                <!--                <router-link to="#" class="btn-default">Fellow</router-link>-->
                <!--                        <router-link to="#" class="btn-gray">Send Message</router-link>-->
            </div>
        </div>
    </li>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import {User} from "@/types";
import FollowBtn from "@/components/user/_followBtn.vue";
import {AxiosError, AxiosResponse} from "axios";
import UserAvatar from "@/components/user/_userAvatar.vue";

@Component({
    components: {
        FollowBtn,
        UserAvatar},
})
export default class MemberCard extends Vue {
    @Prop() member!: any;
    profileImg = '';
    bannerImg = 'img/channel_banner.png'
    isOpenMyDropdown = false

    muteUser() {
        this.isOpenMyDropdown = false;
        this.$api.userBlock(this.member.id)
            .then((res: AxiosResponse) => {
                console.log(res)
            })
            .catch((err: AxiosError) => {

            })


    }

    mounted() {
        if (this.member.profile_img) {
            this.profileImg = this.member.profile_img
        }
    }

    refetch() {
        this.$emit('refetch')
    }

    userPage() {
        this.$router.push(`/channel/${this.member.channel_id}/timeline`)
    }
}
</script>

<style scoped>
svg {
    vertical-align: middle;
}

.cm-img {
    background-color: #f39800;
}

.cm-setup {
    left: 30px;
}
</style>
