<template>
    <div class="grid-column">
        <section class="section">
            <div class="section-header">
                <div class="section-header-info">
                    <h2 class="section-title">
                        Followers
                        <span class="highlighted secondary">{{
                            totalCnt
                        }}</span>
                    </h2>
                </div>
            </div>
            <div class="grid grid-4-4-4" v-if="$store.getters.LoadingStatus">
                <b-skeleton-img animation="throb" variant="dark" ></b-skeleton-img>
            </div>
            <div class="grid grid-4-4-4" v-if="followerList.length>0">
                <member-card
                    v-for="member in followerList"
                    :key="member.id"
                    :member="member"
                ></member-card>
            </div>
            <p v-else>
                해당 유저의 팔로워가 없습니다
            </p>
        </section>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import MemberCard from "@/components/pages/community/MemberCard.vue";
import {mapGetters} from "vuex";
@Component({
    computed: {...mapGetters(["user"])},
    components: { MemberCard },
})
export default class FollowerList extends Vue {
    private followerList: any = [];
    private totalCnt: number = 0;
    private userId = this.$route.query.user_id;
    private limit: number = 10;
    private offset: number = 0;
    private search: string = '';
    private user !: any;

    mounted(){
        this.fetch();
    }

    fetch(){
        const obj={
            limit : this.limit,
            offset : this.offset,
            search: this.search
        }
        //@ts-ignore
        this.$api.followerList(obj, this.userId)
            .then((res: any) => {
                this.followerList = res.result;
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
