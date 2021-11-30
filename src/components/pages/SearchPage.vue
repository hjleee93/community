<template>
    <div class="content-grid">
        <div class="section-banner">
            <h3>Search result for</h3>
            <p class="section-banner-title">{{ keyword }}</p>
        </div>

        <div class="grid grid-9-3 mobile-prefer-content">
            <div class="forum-content grid-column">
                <template>
                    <h3 style="margin-bottom: 16px" class="text-left">Users</h3>
                    <div class="grid grid-3-3-3-3">
                        <template v-if="memberList && memberList.length > 0">
                            <member-card
                                v-for="member in memberList"
                                :key="member.id"
                                :member="member"
                            ></member-card>
                        </template>
                        <template v-else>
                            <p>해당 유저가 없습니다.</p>
                        </template>
                    </div>

                </template>
                <h3 style="margin-bottom: 16px" class="text-left">Posts</h3>

                <template v-if="posts && posts.length > 0">
                    <feed v-for="feed in posts" :key="feed.id" :feed="feed"></feed>
                </template>
                <template v-else>
                    <p>검색된 포스팅이 없습니다. </p>
                </template>

            </div>
            <!-- todo: game search  -->
            <div class="forum-content grid-column">
                <h3 style="margin-bottom: 16px" class="text-left">Games</h3>
                <template v-if="games && games.length > 0">
                    <div @click="toGamePage(game.pathname, game.id)" class="stats-decoration" v-for="game in games" :key="game.id" :style="`border-radius:12px; background: url('${game.url_thumb_webp}') center
                                center / cover no-repeat;display: flex;justify-content: center;align-items: center; cursor:pointer` ">

                        <p class="stats-decoration-title">{{ game.title }}</p>

                    </div>
                </template>
                <template v-else>
                    <p> 검색된 게임이 없습니다.</p>

                </template>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from "vue-property-decorator";
import Feed from "@/components/timeline/Feed.vue";
import Card from "@/components/pages/search/GameCard.vue";
import MemberCard from "@/components/pages/community/MemberCard.vue";

@Component({
    components: {Feed, Card, MemberCard},
})
export default class SearchPage extends Vue {
    private type: string = Object.keys(this.$route.query)[0];
    private query: any = this.$route.query[Object.keys(this.$route.query)[0]];
    private posts: any = [];
    private games: any = [];
    private memberList: any = [];

    keyword: string | (string | null)[] = '';

    async created() {
        console.log(this.$store.getters.researchData)
        console.log('quer', this.$route)
        console.log('data', this.$store.getters.userData)


        if (this.$store.getters.userData.length > 0) {
            this.keyword = this.$route.query.username
            this.memberList = this.$store.getters.userData;
            console.log('me', this.memberList)
        }
        else {
            this.keyword = this.$route.query.q
        }

        this.memberList = this.$store.getters.researchData.users;
        this.posts = this.$store.getters.researchData.posts;
        // const result = await this.$api.search(this.query, this.type);
        // this.posts = result.posts;
        this.games = this.$store.getters.researchData.games;
        this.fetch()
    }

    beforeDestroy() {
        this.$store.dispatch('resetResearchData')
    }

    fetch() {
        console.log('fetch', this.$route.query.q)
        const obj = {
            q: this.$route.query.q,
            limit: 5
        };

        this.$api.search(obj)
            .then((res: any) => {
                console.log('resd', res.users)
                this.memberList = res.users
                this.games = res.games
                this.posts = res.posts

            })
            .catch((err: any) => {

            })
    }
    toGamePage(gamePath: string, gameId: number){
        this.$router.push(`/timeline/game/${gamePath}?game_id=${gameId}`)


    }

    @Watch('$route.query.q')
    watchQuery() {
        this.fetch();
    }

}
</script>

<style scoped>
.section-banner {
    padding: 0;
    display: flex;
    align-content: space-around;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.stats-decoration-title {
    padding: 2px 6px;
    font-size: 16px;
    text-overflow: ellipsis;
    font-weight: 600;
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
    color: #fff;
    border-radius: 6px;
    background-color: #1d2333;
}
</style>
