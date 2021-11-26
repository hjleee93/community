<template>
    <div class="grid grid-3-6-3 mobile-prefer-content">
        <div class="grid-column">
            <div class="widget-box">
                <p class="widget-box-title">Screenshot</p>
                <b-carousel
                    class="carousel"
                    :interval="4000"
                    controls
                    indicators
                    background="#ababab"
                    style="text-shadow: 1px 1px 2px #333"
                >
<!--                    <div-->
<!--                        v-for="img in imgList"-->
<!--                        :key="img.id"-->
<!--                        @click="openImgModal(img.url)"-->
<!--                    >-->
<!--                        &lt;!&ndash; @click="openImgModal(img.url)"> &ndash;&gt;-->
<!--                        <b-carousel-slide-->
<!--                            :style="`background:url(${img.url}) center-->
<!--                                center / cover no-repeat; height:400px; border-radius:12px;`"-->
<!--                        ></b-carousel-slide>-->
<!--                    </div>-->
                </b-carousel>

                <b-modal
                    modal-class="orgin-img-modal"
                    centered
                    hide-header
                    hide-footer
                    ref="originScreenShootImgModal"
                >
<!--                    <b-img-lazy :src="imgSrc" @click="closeImgModal" />-->
                </b-modal>
            </div>
        </div>
        <div class="grid-column"  v-if="game">
            <Timeline :currPage="'game'" :id="game.id" :key="this.$route.query.media"></Timeline>
<!--            <entry-post></entry-post>-->
<!--            <feed v-for="feed in timeline" :key="feed.id" :feed="feed"></feed>-->
        </div>
        <div class="grid-column">
            <!-- about game-->
            <div class="widget-box">
                <p class="widget-box-title">About Game</p>

                <div class="widget-box-content">
                    <p class="paragraph">
                        {{ game.description }}
                    </p>
                    <div class="information-line-list my-3">
                        <div class="information-line">
                            <p class="information-line-title">Version</p>

                            <p class="information-line-text">
                                {{ game.version }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <!-- copy game link-->
            <div class="widget-box">
                <button class="button primary" @click="copyUrl">Copy Game Link</button>
            </div>
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
import Screenshot from "@/components/pages/game/GameScreenshot.vue";
import Timeline from "@/components/common/_timeline.vue";
import {AxiosResponse} from "axios";
@Component({
    components: { PostBox, Feed, Screenshot, Timeline },
})
export default class GameTimeline extends Vue {
    // @Prop() game!: any;
    private dropdown: Dropdown = new Dropdown();
    private hexagon: Hexagon = new Hexagon();

    private gamePath = this.$route.params.gamePath;
    private timeline: any = "";
    private user!: any;
    game:any = {};
    imgSrc = '';
    hashtags = [];


    mounted() {
        console.log('game timeline1', this.gamePath)
        this.dropdown.init();
        this.hexagon.init();
        this.fetch();
    }

    fetch(){
        this.$api.gameInfo(this.gamePath)
            .then((res: any) => {
                const {result} = res;
                const {game} = result;
                this.$store.commit('gameInfo', game)
                this.game = game;
                this.user = game.user
                this.hashtags = (game.hashtags.length > 0) ? game.hashtags.split(",") : undefined;
                this.$store.commit('currPage', {
                    game_id: game.id
                })

            })
            .catch((err: any) => {


            })
    }

    openImgModal(imgSrc: string) {
        this.imgSrc = imgSrc;
        (this.$refs.originScreenShootImgModal as any).show();
    }
    closeImgModal() {
        (this.$refs.originScreenShootImgModal as any).hide();
    }

    copyUrl() {
        const url = `${process.env.VUE_APP_LAUNCHER_URL}game/${this.game.pathname}`;
        let input = document.body.appendChild(document.createElement("input"));
        input.value = url;
        input.select();
        document.execCommand("copy");
        input.parentNode?.removeChild(input);
        this.$toasted.clear();
        this.$toasted.show("Link copied to clipboard", {
            singleton: true,
            fullWidth: false,
            fitToScreen: true,
            theme: "outline",
            position: "bottom-left",
            className: "toast-success",
            duration: 3000,
            type: "success",
            action: {
                text: "X",
                onClick: (e, toastObject) => {
                    toastObject.goAway(0);
                },
            },
        });
    }
}
</script>

<style scoped lang="scss">
.widget-box-content{
    margin-top:0px;
}
.carousel {
    height: 400px;
    border-radius: 12px;
    box-shadow: 0 0 40px 0 rgb(0 0 0 / 6%);
    position: relative;
}
.widget-box {
    padding: 0;
.widget-box-title {
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
}
}
</style>
