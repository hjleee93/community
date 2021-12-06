<template>
    <a class="btn-sub w120 mr10" v-if="this.$route.meta.title === 'ManageJoinedGroup'" @click="unsubscribe">가입중</a>
    <a class="btn-default w120 mr10" v-else-if="!community.is_subscribed" :community="community" @click="subscribe">가입하기 </a>
    <a class="btn-sub w120 mr10" v-else @click="unsubscribe">가입중</a>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import {AxiosError, AxiosResponse} from "axios";
import {mapGetters} from "vuex";
import {User} from "@/types";
import AlertModal from "@/components/common/AlertModal.vue";

@Component({
    components: {AlertModal},
    computed: {...mapGetters(["user"])},
})
export default class SubscribeBtn extends Vue {
    @Prop() community!:any;
    private user!: User;


    subscribe() {

        if(this.user) {
            this.$api.subscribe({user_id: this.user.id, community_id: this.community.id})
                .then((res: AxiosResponse) => {
                    this.$emit('refetch')
                    console.log(res)
                }).catch((err: AxiosError) => {
                if (err.message) {
                    alert(err.message)
                }
            })
        }else{
            this.$store.commit('needLogin', true)
            console.log('need login service')
        }
    }

    //todo: 확인 모달 추가해서 refetch 하기
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