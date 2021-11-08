<template>
    <div class="grid grid-3-6-3 mobile-prefer-content">
        <div class="grid-column">
            <screenshot :gameId="game.id"></screenshot>
        </div>
        <div class="grid-column">
            <entry-post></entry-post>
            <feed v-for="feed in timeline" :key="feed.id" :feed="feed"></feed>
        </div>
        <div class="grid-column">
            <about-game :game="game"></about-game>
            <clipboard-box :game="game"></clipboard-box>
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
import AboutGame from "@/components/pages/game/GameDescBox.vue";
import Screenshot from "@/components/pages/game/GameScreenshot.vue";
import ClipboardBox from "@/components/pages/game/ClipboardBox.vue";
@Component({
    components: { PostBox, Feed, AboutGame, Screenshot, ClipboardBox },
})
export default class GameTimeline extends Vue {
    @Prop() game!: any;
    private dropdown: Dropdown = new Dropdown();
    private hexagon: Hexagon = new Hexagon();

    private gamePathname = this.$route.params.game_pathname;
    private timeline: any = "";
    // private game: any = {};

    async created() {
        this.timeline = await this.$api.getTimeline(this.gamePathname);

        console.log("created", this.game);
    }

    mounted() {
        this.dropdown.init();
        this.hexagon.init();
    }
}
</script>

<style scoped>
</style>
