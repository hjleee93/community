<template>
    <a class="btn-sub w120 mr10" v-if="this.$route.meta.title === 'ManageJoinedGroup'" @click="unsubscribe">
        {{ $t('isSubscribing') }}</a>
    <a class="btn-default w120 mr10" v-else-if="!community.is_subscribed" :community="community"
       @click="subscribe">{{ $t('subscribe.btn') }}</a>
    <a class="btn-sub w120 mr10" v-else @click="unsubscribe">{{ $t('isSubscribing') }}</a>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import {AxiosError, AxiosResponse} from "axios";
import {mapGetters} from "vuex";
import {User} from "@/types";

@Component({
    components: {},
    computed: {...mapGetters(["user"])},
})
export default class SubscribeBtn extends Vue {
    @Prop() community!: any;
    private user!: User;


    subscribe() {
        if (this.user) {
            this.$api.subscribe({user_id: this.user.id, community_id: this.community.id})
                .then((res: AxiosResponse) => {
                    this.$emit('reFetch')
                }).catch((err: AxiosError) => {
                if (err.message) {
                    alert(err.message)
                }
            })
        }
        else {
            this.$store.commit('needLogin', true)
            this.$modal.show('needLogin')
        }
    }

    unsubscribe() {
        this.$emit('unsubscribe', this.community.id)

    }
}
</script>

<style scoped lang="scss">
</style>