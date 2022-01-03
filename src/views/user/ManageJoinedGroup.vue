<template>
    <div>
        <dl class="area-title">
            <dt>Manager Group</dt>
        </dl>
        <transition name="component-fade" mode="out-in">
        <ul class="card-manage-group" v-if="communityList.length > 0">
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

            <div class="no-result" v-else>
                <h1> 가입한 커뮤니티가 없습니다. </h1>
                <img src="../../assets/images/not-found.png" width="100px" height="100px"/>
            </div>

        </transition>
        <modal :clickToClose="false" class="modal-area-type" name="deleteConfirm" width="90%" height="auto"
               :maxWidth="380"
               :scrollable="true"
               :adaptive="true">
            <div class="modal-alert">
                <dl class="ma-header">
                    <dt>안내</dt>
                    <dd>
                        <button @click="$modal.hide('deleteConfirm')"><i class="uil uil-times"></i></button>
                    </dd>
                </dl>
                <div class="ma-content">
                    <h2> 커뮤니티에서 탈퇴하시겠습니까?<br/>※ 커뮤니티 탈퇴시 작성한 포스팅은 자동으로 삭제되지 않습니다.</h2>
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

.component-fade-enter-active,
.component-fade-leave-active {
    transition: opacity 0.3s ease;
}

.component-fade-enter-from,
.component-fade-leave-to {
    opacity: 0;
}
</style>
