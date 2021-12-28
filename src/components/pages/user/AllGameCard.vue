<template>
    <div>
        <dl class="area-title">
            <dt>Game <span>{{
                    gameList && gameList.length
                }}</span></dt>
            <dd>

                <a @click="addGame" v-if="user && (user.uid === userUid)" class="btn-default-samll">Add
                    Game <i
                        class="uil uil-plus"></i></a>
            </dd>
        </dl>
        <ul class="card-portfolio" v-if="gameList && gameList.length > 0">
            <li v-for="game in gameList"
                :to="{path:`/timeline/game/${game.pathname}/timeline`, query:{game_id:game.id}}"
                :key="game.id"
                :game="game">
                <div class="cp-img" :style="{'background' : 'url(' +  game.url_thumb_webp ||
                game.url_thumb ||
                '../../../assets/images/default.png' + ') center no-repeat', 'background-size' : 'cover'}"></div>
                <div class="cp-info">
                    <p>{{ game.title }}</p>
                    <p> Version {{ game.version }}</p>
                </div>
            </li>
        </ul>
        <div class="no-result" v-else>
            <h1> 게임 없음</h1>
            <img src="../../../assets/images/not-found.png" width="100px" height="100px"/>
        </div>

    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from "vue-property-decorator";
import {mapGetters} from "vuex";
import {Game, User} from "@/types";
import {AxiosError, AxiosResponse} from "axios";
@Component({
    computed: {...mapGetters(["user"])},
    components: {},
})
export default class AllGameCard extends Vue {
    private gameList: Game[] = [];
    private tlUser: any = "";
    private user!: User;

    userUid = '';

    async mounted() {
        await this.$store.dispatch("loginState");

        if (this.$route.params.channel_id) {
            this.userUid = this.$route.params.channel_id;
        }
        else {
            this.userUid = this.user.uid
        }

        this.fetch();
    }

    fetch() {
        if (this.$store.getters.gameList.length !== 0) {
            this.gameList = this.$store.getters.gameList;
        }
        else {
            this.$api.userChannel(this.userUid)
                .then((res: any) => {

                    const {target} = res;
                    const {games} = target;
                    this.gameList = games;

                })
                .catch((err: any) => {
                    console.log('err', err)
                })
        }

    }

    addGame() {
        if (this.user && (this.user.uid === this.userUid)) {
            window.location.href = this.$store.getters.studioUrl + "addGame";
        }
    }
}
</script>

<style scoped>
.section-header {
    margin-top: 32px;
}
</style>
