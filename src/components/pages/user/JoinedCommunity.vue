<template>
    <div class="widget-box">
        <p class="widget-box-title">Groups</p>

        <div class="widget-box-content" >
            <div class="user-status-list" v-if="communityList">
                <div
                    v-for="community in communityList"
                    :key="community.id"
                    class="user-status"
                >
                    <router-link
                        class="user-status-avatar"
                        :to="`/community/${community.id}/timeline`"
                    >
                        <div class="user-avatar small no-border">
                            <div class="user-avatar-content">
                                <b-img :src="community.profile_img"  style="
                                        width: 40px;
                                        height: 44px;
                                        position: relative;
                                        border-radius: 10px;
                                    "/>

                            </div>
                        </div>
                    </router-link>

                    <p class="user-status-title text-left">
                        <router-link
                            class="bold"
                            :to="`/community/${community.id}/timeline`"
                        >{{ community.name }}
                        </router-link
                        >
                    </p>

                    <p class="user-status-text small text-left">
                        {{ community.member_cnt }} members
                    </p>
                </div>
            </div>
            <div class="user-status-list" v-else>
                groups
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {Group, User} from "@/types";
import {Component, Prop, Vue} from "vue-property-decorator";

import Hexagon from "@/plugins/hexagon";
import {AxiosError, AxiosResponse} from "axios";
import {mapGetters} from "vuex";

@Component({
    components: {},
    computed: {...mapGetters(["user"])},
})
export default class JoinedCommunity extends Vue {
    @Prop() userUid!: string;
    private hexagon: Hexagon = new Hexagon();
    private communityList: {
        id: number;
        name: string;
        profile_img: string;
        state: string;
        member_cnt: number;
    }[] = [];

    async mounted() {
        await this.$store.dispatch("loginState");
        this.hexagon.init();
        await  this.fetch();
    }

    fetch() {
        this.$api.joinedCommunityList(this.$store.getters.channelUserInfo.id)
            .then((res: any) => {
                console.log('joinedCommunityList', res)
                this.communityList = res;
            })
            .catch((err: AxiosError) => {

            })


    }
}
</script>

<style scoped>
</style>
