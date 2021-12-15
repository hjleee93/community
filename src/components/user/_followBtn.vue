<template>
    <p class="btn-default" @click="follow" v-if="user && (user.id !== member.id) && !member.is_following">Follow</p>
    <p class="btn-default" @click="unfollow" v-else-if="user && (user.id !== member.id) && member.is_following">
        Followed</p>
    <p class="btn-default my-channel" @click="myChannel(member.uid)" v-else-if="user && user.id === member.id">내 채널</p>
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

    follow() {
        this.$api.follow(this.member.id)
            .then((res: AxiosResponse) => {

            })
            .catch((err: AxiosError) => {

            })
            .finally(() => {
                this.$emit('refetch')
            })
    }

    unfollow() {
        this.$api.unfollow(this.member.id)
            .then((res: AxiosResponse) => {
                this.$emit('refetch')
            })
            .catch((err: AxiosError) => {

            })
    }

    myChannel(uid: string) {
        this.$router.push(`/channel/${uid}/timeline`)
    }

}
</script>

<style scoped lang="scss">
.btn-default {
    width: 100%;

    &.my-channel {
        background-color: #28a745;
    }
}

.cm-info {
    min-height: 171px;
}
</style>
