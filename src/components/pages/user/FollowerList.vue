<template>
    <div>

        <dl class="area-title">
            <dt>Followers <span>{{ followerList.length }}</span></dt>
        </dl>
        <div class="grid grid-4-4-4" v-if="$store.getters.LoadingStatus">
            <b-skeleton-img animation="throb" variant="dark"></b-skeleton-img>
        </div>
        <ul class="card-member" v-if="followerList.length>0">

            <MemberCard
                v-for="member in followerList"
                :key="member.id"
                :member="member"
                @refetch="fetch"
            ></MemberCard>
        </ul>

        <div class="no-result" v-else>
            <h1>해당 유저의 팔로워가 없습니다</h1>
            <img src="../../../assets/images/not-found.png" width="100px" height="100px"/>

        </div>
    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";

import MemberCard from "@/components/community/_memberCard.vue";
import {mapGetters} from "vuex";
import UserCard from "@/components/user/_userCard.vue";

@Component({
    computed: {...mapGetters(["user"])},
    components: {MemberCard, UserCard},
})
export default class FollowerList extends Vue {
    private followerList: any = [];
    private totalCnt: number = 0;
    private limit: number = 10;
    private offset: number = 0;
    private search: string = '';
    private user !: any;

    mounted() {
        this.fetch();
    }

    fetch() {
        const obj = {
            limit: this.limit,
            offset: this.offset,
            search: this.search
        }
        //userId로 넘기는 부분인데 params 이름이 channel_id임
        this.$api.followerList(obj, this.$route.params.channel_id)
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

<style lang="scss" scoped>

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
