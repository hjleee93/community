<template>
    <li @mouseenter="enterCard" @mouseleave="leaveCard">
        <div

            class="thumbnail"
            @click="moveGamePage(game.pathname)"
            :style="`background: url( ${thumbnail} ) center center / cover no-repeat; background-size: cover;`"
        ></div>

        <dl>
            <dt>
                <UserAvatar :user="game.user" :tag="'p'"></UserAvatar>
                <!--                            <P :style="`background: url(${game.user && game.user.picture || 'img/300_300_default_profile.png' }) center center no-repeat; background-size: cover;`"></P>-->
            </dt>
            <dd>
                <h2 @click="playGame(game.pathname)">
                    {{ game && game.title }}
                </h2>
                <p>{{ game.user && game.user.name }}</p>
                <ul>
                    <!--                            <li><img src="../../assets/images/charge_game_icon.svg" alt=""></li>-->
                    <!--                            <li><img src="../../assets/images/hot_game_icon.svg" alt=""></li>-->
                    <li>
                        <img
                            src="../../assets/images/zempie_game_icon.svg"
                            alt=""
                        />
                    </li>
                </ul>
            </dd>
        </dl>
    </li>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import UserAvatar from "@/components/user/_userAvatar.vue";

@Component({
    components: { UserAvatar },
})
export default class GameCard extends Vue {
    @Prop() game!: any;
    thumbnail: any = "";

    mounted() {
        this.thumbnail = this.game.url_thumb_webp || this.game.url_thumb;
    }

    enterCard() {
        this.thumbnail =
            this.game.url_thumb_gif ||
            this.game.url_thumb_webp ||
            this.game.url_thumb;
    }

    leaveCard() {
        this.thumbnail = this.game.url_thumb_webp || this.game.url_thumb;
    }

    playGame(pathname: string) {
        window.open(this.$store.getters.homeUrl + `play/${pathname}`, "_blank");
    }

    moveGamePage(pathname: string){
        this.$router.push(`/${this.$i18n.locale}/timeline/game/${pathname}`)
    }
}
</script>

<style scoped lang="scss">
.thumbnail:hover,
.thumbnail {
    transition: 0.5s;
}
</style>
