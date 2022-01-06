<template>
    <p class="btn-default" @click="follow" v-if="user && (user.id !== member.id) && !member.is_following">Follow</p>
    <p class="btn-default" @click="unfollow" v-else-if="user && (user.id !== member.id) && member.is_following">
        Followed</p>
    <p class="btn-default my-channel" @click="myChannel(member.channel_id)" v-else-if="user && user.id === member.id">내 채널</p>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import {AxiosError, AxiosResponse} from "axios";
import {mapGetters} from "vuex";

@Component({
    computed: {...mapGetters(["user"])},
    components: {},
})
export default class FollowBtn extends Vue {
    @Prop() member!: any;
    user!: any;


    async  mounted(){
        await this.$store.dispatch("loginState")
    }

    follow() {
        this.$api.follow(this.member.id)
            .then((res: AxiosResponse) => {
                this.$emit('reFetch')
            })
            .catch((err: AxiosError) => {

            })

    }

    unfollow() {
        this.$api.unfollow(this.member.id)
            .then((res: AxiosResponse) => {
                this.$emit('reFetch')
            })
            .catch((err: AxiosError) => {

            })

    }

    myChannel(channel_id: string) {
        this.$router.push(`/channel/${channel_id}/timeline`)
    }

}
</script>

<style scoped lang="scss">
.btn-default {
    width: 100%;

    &.my-channel {
        background-color: #28a745;
    }
    &.my-channel:hover {
        color:#28a745;
        background-color: rgba(40, 167, 69, 0.3);
    }
}

.cm-info {
    min-height: 171px;
}
</style>
