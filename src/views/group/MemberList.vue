<template>
    <div>
        <dl class="area-title">
            <dt>Members <span>{{ totalMembers }}</span></dt>
        </dl>
        <ul class="card-member">
            <MemberCard
                v-for="member in memberList"
                :key="member.id"
                :member="member"
                @refetch="refetch"
            >
            </MemberCard>
        </ul>
    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import {mapGetters} from "vuex";

import MemberCard from "@/components/community/_memberCard.vue";
import {User} from "@/types";
import FollowBtn from "@/components/user/_followBtn.vue";
import {AxiosError, AxiosResponse} from "axios";

@Component({
    computed: {...mapGetters(["user"])},
    components: {MemberCard, FollowBtn},
})
export default class MemberList extends Vue {
    private communityId = this.$route.params.community_id;
    private totalMembers: number = 0;
    private memberList: User[] = [];
    private user!: User;
    private limit: number = 10;
    private offset: number = 0;

    mounted() {
        this.fetch();
    }

    fetch() {
        const obj = {
            limit: this.limit,
            offset: this.offset
        }
        this.$api.communityMembers(this.communityId, obj)
            .then((res: any) => {
                this.totalMembers = res.totalCount;
                this.memberList = res.result;
            })
            .catch((err: AxiosError) => {

            })


    }

    refetch(){
        this.limit = 10;
        this.offset = 0;
        this.memberList = [];
        this.$store.dispatch('reloadUserInfo');
        this.fetch();

    }


}
</script>

<style lang="scss" scoped>
svg {
    vertical-align: middle;
}

.button-container {
    display: flex;
}
</style>
