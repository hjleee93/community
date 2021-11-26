<template>
    <div class="grid-column">
        <section class="section">
            <div class="section-header">
                <div class="section-header-info">
                    <h2 class="section-title">
                        Members
                        <span class="highlighted secondary">{{
                                totalMembers
                            }}</span>
                    </h2>
                </div>
            </div>

            <div class="grid grid-4-4-4">
                <member-card
                    v-for="member in memberList"
                    :key="member.id"
                    :member="member"
                >
                    <template v-slot:action-button1 v-if="user">
                        <FollowBtn :member="member"></FollowBtn>
                    </template>
<!--                    <template v-slot:action-button2 v-if="user">-->
<!--                        <p class="button primary">Send Message</p>-->
<!--                    </template>-->
                </member-card>
            </div>
        </section>
    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import {mapGetters} from "vuex";

import MemberCard from "@/components/pages/community/MemberCard.vue";
import {User} from "@/types/index";
import FollowBtn from "@/components/pages/user/_followBtn.vue";
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

    async followUser() {
        if (!this.user) {
        }
        else {
            const result = this.$api.follow(this.user.id);
            console.log("follow");
        }
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
