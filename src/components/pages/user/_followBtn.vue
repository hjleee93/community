<template>
    <p class="button secondary" @click="follow" v-if="user && user.id !== member.id && !member.is_following">follow</p>
    <p class="button secondary" @click="unfollow" v-else-if="user && user.id !== member.id && member.is_following">
        followed</p>
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
                console.log(res)
                this.$emit('memberFetch')
            })
            .catch((err: AxiosError) => {

            })
    }

    unfollow() {
        this.$api.unfollow(this.member.id)
            .then((res: AxiosResponse) => {
                this.$emit('memberFetch')
            })
            .catch((err: AxiosError) => {

            })
    }

}
</script>

<style scoped lang="scss">
.button {
    width: 100%;
}
</style>
