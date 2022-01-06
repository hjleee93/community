<template>
    <div class="grid grid-3-6-3 mobile-prefer-content">
        <div class="grid-column">
            <game-list :userUid="userUid"></game-list>
            <portfolio></portfolio>
        </div>
        <div class="grid-column">
            <entry-post></entry-post>
            <!-- 타임라인 -->

            <feed v-for="feed in timeline" :key="feed.id" :feed="feed"></feed>
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

import Post from "@/components/timeline/_post.vue";
import Feed from "@/components/timeline/_feed.vue";

import { User } from "@/types";

@Component({
    computed: { ...mapGetters(["user"]) },
    components: {
        Post,
        Feed,
        // GameList,
    },
})
export default class PortfolioTimeline extends Vue {
    private userUid = this.$route.params.channel_id;

    private timeline: any = "";
    private user!: User;

    async created() {
        // this.timeline = await this.$api.getTimeline(
        //     this.userUid,
        //     undefined,
        //     parseInt(this.$route.params.porfolio_id)
        // );
    }

}
</script>

<style scoped>
</style>
