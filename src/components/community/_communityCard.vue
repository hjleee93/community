<template>
    <li>
        <div :class="imgClass()"
             :style="{'background' : 'url(' + bannerImg + ') center center / cover no-repeat', 'background-size' : 'cover'}"></div>
        <p @click="moveCommunity"
           :style="{'background' : 'url(' + profileImg + ') center center / cover no-repeat', 'background-size' : 'cover'}"></p>
        <!--                <div class="ct-setup">-->
        <!--                    <i class="uil uil-ellipsis-h font20"></i>-->
        <!--                </div>-->
        <div :class="infoClass()">
            <h3 class="title" @click="moveCommunity"> {{ community.name }}</h3>
            <p class="desc"> {{ community.description }}</p>
            <dl>
                <dd @click="moveMemberList()">
                    <h4>{{ community.member_cnt }}</h4>
                    <p>멤버수</p>
                </dd>
                <dt><p></p></dt>
                <dd>
                    <h4> {{ community.posts_cnt }}</h4>
                    <p>포스팅</p>
                </dd>
                <dt><p></p></dt>
                <dd>
                    <h4> {{ visitCnt(community.visit_cnt) }}</h4>
                    <p>방문</p>
                </dd>
            </dl>
            <div>
                <slot name="subBtn"></slot>
            </div>
        </div>
    </li>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import {numToKMB} from "@/script/util"

@Component({
    components: {},
})

export default class CommunityCard extends Vue {
    @Prop() community!: any;

    private bannerImg: string = "/img/1500_300_com_banner_default.png";
    private profileImg: string = '/img/100_100_com_profile_default.png';

    mounted() {
        if (this.community.banner_img) this.bannerImg = this.community.banner_img;
        if (this.community.profile_img) this.profileImg = this.community.profile_img;

    }


    moveCommunity() {
        this.$router.push(`/${this.$i18n.locale}/community/${this.community.id}/timeline`)
    }
    moveMemberList(){
        this.$router.push(`/${this.$i18n.locale}/community/${this.community.id}/members`)
    }

//    퍼블리싱 이미지 처리
    imgClass() {
        let result = '';
        if (this.$route.meta?.title === 'ManageJoinedGroup') {
            result = 'cmg-img'
        }
        else if (this.$route.meta?.title === 'CommunityList') {
            result = 'ct-img'
        }
        return result;
    }

    infoClass() {
        let result = '';
        if (this.$route.meta?.title === 'ManageJoinedGroup') {
            result = 'cmg-info'
        }
        else if (this.$route.meta?.title === 'CommunityList') {
            result = 'ct-info'
        }
        return result;
    }

    visitCnt(num: number) {
        return numToKMB(num)
    }


}
</script>

<style lang="scss" scoped>
li {
    list-style-type: none
}

.sub-btn {
    width: 100% !important;
}

.title {
    height: 16px;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
}

.desc {
    height: 40px;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;

}
</style>
