<template>
    <li>
        <div class="cm-img"></div>
        <p @click="userPage" :style="{'background' : 'url(' + profileImg + ') center no-repeat', 'background-size' : 'cover'}"></p>
<!--        <div class="cm-setup">-->
<!--            <i class="uil uil-padlock font20"></i>-->
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

@Component({
    components: {FollowBtn},
})
export default class MemberCard extends Vue {
    @Prop() member!: User;
    profileImg = '';
    bannerImg = 'img/channel_banner.png'

    mounted() {

        if (this.member.profile_img) {
            this.profileImg = this.member.profile_img
        }
        else {
            this.profileImg = 'img/default_profile.png';
        }

        console.log(this.profileImg)
    }
    refetch(){
        this.$emit('refetch')
    }
    userPage(){
        this.$router.push(`/channel/${this.member.uid}/timeline`)
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
</style>
