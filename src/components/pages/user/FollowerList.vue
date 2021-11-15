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

            <div class="grid grid-4-4-4">
                <member-card
                    v-for="member in followerList"
                    :key="member.id"
                    :member="member"
                ></member-card>
            </div>
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
    private userId = this.$route.params.channel_id;
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
        this.$api.followerList(obj, this.user.id)
            .then((res: AxiosResponse) => {
                this.followerList = res.result;
                this.totalCnt = res.totalCount;
                console.log(res)
            })
            .catch((err: AxiosError) => {

            })


    }
}
</script>

<style scoped>
</style>
