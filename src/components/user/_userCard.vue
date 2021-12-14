<template>
    <ul class="card-follow">
        <li>
            <div class="cf-img" :style="{
                'background' :
            `url(${member.profile_img || defaultProfile}) center no-repeat`,
             'background-size' : 'cover'}"></div>

<p style="background-color: #f39800"/>
<!--            <p :style="{'background' : 'url(' + require('../../assets/images/card_profile_img03.png') + ') center no-repeat', 'background-size' : 'cover'}"></p>-->
            <div class="cf-info">
                <h3>{{ member.name }}</h3>
<!--                <p>@zempieeeee</p>-->
                <dl>
                    <dd>
                        <h4>438</h4>
                        <p>Followers</p>
                    </dd>
                    <dt><p></p></dt>
                    <dd>
                        <h4>298</h4>
                        <p>포스팅</p>
                    </dd>
                </dl>
            </div>
        </li>
    </ul>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import {User} from "@/types";

@Component({
    components: {},
})
export default class UserCard extends Vue {
    @Prop() member!: User;
    defaultProfile = 'img/zempy.png'
    bannerImg = 'img/channel_banner.png'

    mounted() {

    }
}

</script>

<style scoped lang="scss">
</style>
