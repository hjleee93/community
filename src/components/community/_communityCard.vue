<template>
    <li>
        <div :class="imgClass()"
             :style="{'background' : 'url(' + bannerImg + ') center center no-repeat', 'background-size' : 'cover'}"></div>
        <p @click="moveCommunity" :style="{'background' : 'url(' + profileImg + ') center center no-repeat', 'background-size' : 'cover'}"></p>
        <!--                <div class="ct-setup">-->
        <!--                    <i class="uil uil-ellipsis-h font20"></i>-->
        <!--                </div>-->
        <div :class="infoClass()">
            <h3 @click="moveCommunity"> {{ community.name }}</h3>
            <p> {{ community.description }}</p>
            <dl>
                <dd>
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
                    <h4> {{ community.visit_cnt }}</h4>
                    <p>방문</p>
                </dd>
            </dl>
            <div >
                <slot name="subBtn"></slot>
            </div>
        </div>
    </li>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
@Component({
    components: {},
})

export default class CommunityCard extends Vue {
    @Prop() community!: any;

    private bannerImg: string = "img/community_banner_default.jpg";
    private profileImg: string = 'img/zempy.png';

    mounted() {
        if (this.community.banner_img) this.bannerImg = this.community.banner_img;
        if (this.community.profile_img) this.profileImg = this.community.profile_img;

    }


    moveCommunity() {
        this.$router.push(`/community/${this.community.id}/timeline`)
    }

//    퍼블리싱 이미지 처리
    imgClass(){
        let result = '';
        if(this.$route.meta.title=== 'ManageJoinedGroup'){
            result ='cmg-img'
        }else if(this.$route.meta.title==='CommunityList'){
            result ='ct-img'
        }
        return result;
    }
    infoClass(){
        let result = '';
        if(this.$route.meta.title=== 'ManageJoinedGroup'){
            result ='cmg-info'
        }else if(this.$route.meta.title==='CommunityList'){
            result ='ct-info'
        }
        return result;
    }


}
</script>

<style lang="scss" scoped>
li{
    list-style-type: none
}
.sub-btn{
    width: 100% !important;
}

</style>
