<template>
    <div v-if="user">
        <p class="button secondary" @click="follow" v-if="user.id !== member.id">follow</p>
        <p class="button secondary" @click="follow" v-if="user.id !== member.id && this.member.is_following">
            followed</p>
    </div>
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


    mounted() {
        console.log(this.member)
        console.log(this.user)
    }


    follow() {
        this.$api.follow(this.member.id)
            .then((res: AxiosResponse) => {
                console.log(res)
            })
            .catch((err: AxiosError) => {

            })
    }

}
</script>

<style scoped lang="scss">
</style>
