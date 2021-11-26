<template>
    <div
        v-if="feed"
        class=" post-option  reaction-options-dropdown-trigger "
        @click="sendLike"
    >
        <svg
            class="post-option-icon icon-thumbs-up"
            :class="feed.liked === true ? 'active' : ''"
        >
            <use xlink:href="#svg-thumbs-up"></use>
        </svg>
    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import {AxiosError, AxiosResponse} from "axios";
import {mapGetters} from "vuex";
import {User} from "../../types";


@Component({
    components: {},
    computed: {...mapGetters(["user"])},
})
export default class LikeBtn extends Vue {
    @Prop() feed!: any;
    private user!: User;
    private needLogin = false;


    sendLike() {
        if (this.user) {
            this.$api.like(this.feed.id)
                .then((res: AxiosResponse) => {
                    console.log(res)
                })
                .catch((err: AxiosError) => {

                })
        }
        else {
            this.$store.commit('needLogin', true)
            console.log('need login service')
        }
    }
}
</script>

<style scoped lang="scss">
</style>
