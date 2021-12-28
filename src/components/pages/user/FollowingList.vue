<template>
    <div>
        <dl class="area-title">
            <dt>Followers <span>{{ followingList.length }}</span></dt>
        </dl>
        <div class="grid grid-4-4-4" v-if="$store.getters.LoadingStatus">
            <b-skeleton-img animation="throb" variant="dark"></b-skeleton-img>
        </div>
        <ul class="card-member" v-if="followingList.length>0">
            <MemberCard
                v-for="member in followingList"
                :key="member.id"
                :member="member"
                @refetch="fetch"
            ></MemberCard>
        </ul>
        <div class="no-result" v-else>
            <h1> 팔로잉한 유저가 없습니다</h1>
            <img src="../../../assets/images/not-found.png" width="100px" height="100px"/>
        </div>
    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";

import MemberCard from "@/components/community/_memberCard.vue";
import {mapGetters} from "vuex";
import webpack from "webpack";
import Parser = webpack.compilation.normalModuleFactory.Parser;

@Component({
    computed: {...mapGetters(["user"])},
    components: {MemberCard},
})
export default class FollowingList extends Vue {
    @Prop() userId!: any;
    private followingList: any = [];
    private totalCnt: number = 0;
    private limit: number = 10;
    private offset: number = 0;
    private search: string = '';
    private user !: any;

    channel_id: string = '';


    mounted() {
        if (this.$route.params.channel_id) {
            this.channel_id = this.$route.params.channel_id;
        }
        else {
            this.channel_id = this.userId;
        }
        this.fetch();
    }

    fetch() {
        const obj = {
            limit: this.limit,
            offset: this.offset,
            search: this.search
        }

        //userId로 넘기는 부분인데 params 이름이 channel_id임
        this.$api.followingList(obj, this.channel_id)
            .then((res: any) => {
                this.followingList = res.result;
                this.totalCnt = res.totalCount;
            })
            .catch((err: any) => {

            })
    }
}
</script>

<style scoped lang="scss">
.min-vh-100 {
    min-height: 100vh;
}

.no-result {
    display: flex;
    align-content: center;
    justify-content: center;
    flex-direction: column;
    flex-wrap: wrap;

    h1 {
        color: #333;
        font-size: 18px;
        margin-bottom: 10px;
    }

    img {
        margin: 0 auto
    }
}
</style>
