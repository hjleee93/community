<template>
    <div>
        <p
            v-if="!community.is_subscribed"
            class="profile-header-info-action button secondary"
            @click="subscribe"
        >
            <svg class="icon-join-group">
                <use xlink:href="#svg-join-group"></use>
            </svg>
        </p>

        <p
            v-else
            class="profile-header-info-action button"
            @click="unsubscribe"
        >
            탈퇴
        </p>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import {AxiosError, AxiosResponse} from "axios";
import {mapGetters} from "vuex";
import {User} from "@/types";

@Component({
    components: {},
    computed: {...mapGetters(["user"])},
})
export default class SubscribeBtn extends Vue {
    @Prop() community!:any;
    private user!: User;
    private communityId = this.$route.params.community_id;

    subscribe() {
        this.$api.subscribe({user_id: this.user.id, community_id: this.community.id})
            .then((res:AxiosResponse)=>{
                console.log(res)
            }).catch((err:AxiosError)=>{
            if(err.message){
                alert(err.message)
            }
        })
    }

    unsubscribe(){
        this.$api.unsubscribe({user_id: this.user.id, community_id: this.community.id})
            .then((res:AxiosResponse)=>{
                console.log(res)
            }).catch((err:AxiosError)=>{
            if(err.message){
                alert(err.message)
            }
        })

    }
}
</script>

<style scoped lang="scss">
</style>