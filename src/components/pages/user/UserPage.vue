<template>
    <div class="grid grid-3-6-3 mobile-prefer-content">
        <div class="grid-column">
            <game-list :userUid="userUid"></game-list>
            <portfolio :userUid="userUid"></portfolio>
        </div>
        <div class="grid-column">
            <PostBox></PostBox>
            <!-- 타임라인 -->
            <Timeline :currPage="'user'" :key="this.$route.query.media" ></Timeline>
        </div>
        <div class="grid-column">
            <who-to-follow v-if="user"></who-to-follow>
            <joined-community :userUid="userUid"></joined-community>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { mapGetters } from "vuex";
import Dropdown from "@/plugins/dropdown";
import Hexagon from "@/plugins/hexagon";

import PostBox from "@/components/layout/PostBox.vue";
import Feed from "@/components/timeline/Feed.vue";
import WhoToFollow from "@/components/pages/user/WhoToFollow.vue";
import JoinedCommunity from "@/components/pages/user/JoinedCommunity.vue";
import Portfolio from "@/components/pages/user/PortfolioList.vue";
import GameList from "@/components/pages/user/GameList.vue";

import Timeline from "@/components/common/_timeline.vue"

import { User } from "@/types";

@Component({
    computed: { ...mapGetters(["user"]) },
    components: {
        PostBox,
        Feed,
        WhoToFollow,
        Portfolio,
        JoinedCommunity,
        GameList,
        Timeline
    },
})
export default class UserPage extends Vue {
    private dropdown: Dropdown = new Dropdown();
    private hexagon: Hexagon = new Hexagon();
    private userUid = this.$route.params.channel_id;

    mounted() {
        this.dropdown.init();
        this.hexagon.init();

    }






}
</script>

<style scoped>
</style>
