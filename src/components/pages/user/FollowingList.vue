<template>
    <div class="grid-column">
        <section class="section">
            <div class="section-header">
                <div class="section-header-info">
                    <h2 class="section-title">
                        Followings
                        <span class="highlighted secondary">{{
                            followingList.length
                        }}</span>
                    </h2>
                </div>
            </div>
            <div class="grid grid-4-4-4" v-if="$store.getters.LoadingStatus">
                <b-skeleton-img animation="throb" variant="dark" ></b-skeleton-img>
            </div>
            <div class="grid grid-4-4-4" v-if="followingList.length>0" >
                <member-card
                    v-for="member in followingList"
                    :key="member.id"
                    :member="member"
                ></member-card>
            </div>
            <p v-else>
                팔로잉한 유저가 없습니다
            </p>
        </section>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import MemberCard from "@/components/pages/community/MemberCard.vue";
import {mapGetters} from "vuex";
import webpack from "webpack";
import Parser = webpack.compilation.normalModuleFactory.Parser;
@Component({
    computed: {...mapGetters(["user"])},
    components: { MemberCard },
})
export default class FollowingList extends Vue {
    private followingList: any = [];
    private totalCnt: number = 0;
    private userId: number = 0;

    private limit: number = 10;
    private offset: number = 0;
    private search: string = '';
    private user !: any;


    mounted(){
        this.userId = Number(this.$route.query.user_id)
        this.fetch();
    }
    fetch(){
        const obj={
            limit : this.limit,
            offset : this.offset,
            search: this.search
        }
        this.$api.followingList(obj, this.userId)
            .then((res: any) => {
                this.followingList = res.result;
                this.totalCnt = res.totalCount;
                console.log(res)
            })
            .catch((err: any) => {

            })
    }
}
</script>

<style scoped>
</style>
