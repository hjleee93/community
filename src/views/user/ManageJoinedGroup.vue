<template>
    <div>
        <dl class="area-title">
            <dt>Manager Group</dt>
        </dl>
        <div class="grid grid-4-4-4" v-if="$store.getters.LoadingStatus">
            <b-skeleton-img animation="throb" variant="dark"></b-skeleton-img>
        </div>

        <ul class="card-manage-group" v-else>
            <CommunityCard
                v-for="community in communityList"
                :key="community.id"
                :community="community"
            >
                <template v-slot:subBtn>
                    <SubscribeBtn @refetch="fetch"  @eee="fetch" class="sub-btn" :community="community"/>
                </template>
            </CommunityCard>
        </ul>
    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";

import CommunityCard from "@/components/community/_communityCard.vue";

import SubscribeBtn from "@/components/community/_subscribeBtn.vue";

@Component({
    components: {CommunityCard, SubscribeBtn},
})
export default class ManageJoinedGroup extends Vue {
    private communityList: any = [];


    mounted() {
        this.fetch();
    }

    fetch() {

        this.$api.joinedCommunityList(this.$store.getters.user.id)
            .then((res: any) => {
                this.communityList = res;
            })
            .catch((err: any) => {

            })


    }

}
</script>

<style scoped>
</style>
