<template>
    <div>
        <dl class="area-title">
            <dt>Game <span>{{
                    games && games.length
                }}</span></dt>
            <dd>
                <a @click="addGame" v-if="$route.name === 'MyChannel'" class="btn-default-samll">Add
                    Game <i
                        class="uil uil-plus"></i></a>
            </dd>
        </dl>
        <ul class="card-portfolio" v-if="games && games.length > 0">
            <li v-for="game in games"
                @click="moveGamePage(game.pathname)"
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
            <h1>{{ $t('no.game') }}</h1>
            <img src="../../../assets/images/not-found.png" width="100px" height="100px"/>
        </div>

    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from "vue-property-decorator";
import {mapGetters} from "vuex";
import {Game, User} from "@/types";
import {AxiosError, AxiosResponse} from "axios";
import _ from "lodash";
@Component({
    computed: {...mapGetters(["user"]),
        games: function () {
            return _.filter(this['gameList'], {
                    'activated': true
                }
            )
        }
    },
    components: {

    },
})
export default class AllGameCard extends Vue {
    private gameList: Game[] = [];
    private tlUser: any = "";
    private user!: User;

    channel_id: any = '';

    async mounted() {
        await this.$store.dispatch("loginState");

        if (this.$route.params.channel_id) {
            this.channel_id = this.$route.params.channel_id;
        }
        else {
            this.channel_id = this.user.channel_id
        }

        this.fetch();
    }

    fetch() {
        if (this.$store.getters.gameList.length !== 0) {
            this.gameList = this.$store.getters.gameList;
        }
        else {
            this.$api.userChannel(this.channel_id)
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
        window.location.href = this.$store.getters.studioUrl + "addGame";

    }


    playGame(pathname: string) {
        window.open(
            this.$store.getters.homeUrl + `play/${pathname}`, "_blank");
    }
    moveGamePage(pathname: string){
        this.$router.push(`/${this.$i18n.locale}/timeline/game/${pathname}`)
    }
}
</script>

<style scoped>
.section-header {
    margin-top: 32px;
}
.cp-info{
    text-align: left !important;
}
</style>
