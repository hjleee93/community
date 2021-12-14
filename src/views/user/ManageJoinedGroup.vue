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
                    <SubscribeBtn @refetch="fetch" class="sub-btn" :community="community" @unsubscribe="unsubscribe"/>
                </template>
            </CommunityCard>
        </ul>

        <modal :clickToClose="false" class="modal-area-type" name="deleteConfirm" width="90%" height="auto"
               :maxWidth="380"
               :adaptive="true">
            <div class="modal-alert">
                <dl class="ma-header">
                    <dt>안내</dt>
                    <dd>
                        <button @click="$modal.hide('deleteConfirm')"><i class="uil uil-times"></i></button>
                    </dd>
                </dl>
                <div class="ma-content">
                    <h2> 해당 커뮤니티를 정말 탈퇴하시겠습니까? </h2>
                    <div>
                        <button class="btn-default w48p" @click="yesUnsubscribe">네</button>
                        <button class="btn-gray w48p" @click="$modal.hide('deleteConfirm')">아니오</button>
                    </div>
                </div>
            </div>
        </modal>
    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";

import CommunityCard from "@/components/community/_communityCard.vue";

import SubscribeBtn from "@/components/community/_subscribeBtn.vue";
import {AxiosError, AxiosResponse} from "axios";
import {mapGetters} from "vuex";
import {User} from "@/types";

@Component({
    components: {CommunityCard, SubscribeBtn},
    computed: {...mapGetters(["user"])},
})
export default class ManageJoinedGroup extends Vue {
    communityList: any = [];
    user!: User;
    unCommunityId: string = ''

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

    unsubscribe(communityId: string) {
        this.$modal.show('deleteConfirm')
        this.unCommunityId = communityId;
    }

    yesUnsubscribe() {
        this.$api.unsubscribe({user_id: this.user.id, community_id: this.unCommunityId})
            .then((res: any) => {
                this.fetch();
            })
            .catch((err: any) => {
                if (err.message) {
                    alert(err.message)
                }
            })
            .finally(() => {
                this.$modal.hide('deleteConfirm')
            })
    }

}
</script>

<style scoped>
</style>
