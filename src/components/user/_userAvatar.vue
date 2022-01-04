<template>
    <span
        :class="user && user.uid ? 'user-avatar' : ''"
        @click="moveUserPage"
        v-if="tag === 'span'"
        :style="`background: url('${picture}') center center  / cover no-repeat; background-size: cover;`"></span>
    <div
        v-else-if="tag === 'div'"
        :style="`background: url('${picture}') center center  / cover no-repeat; background-size: cover;`"></div>
    <p
        :class="user && user.uid ? 'user-avatar' : ''"
        @click="moveUserPage"
        v-else-if="tag === 'p'"
        :style="`background: url('${picture}') center center  / cover no-repeat; background-size: cover;`"></p>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from "vue-property-decorator";

@Component({
    components: {},
})
export default class UserAvatar extends Vue {
    @Prop() user!: any;
    @Prop() tag !: string;

    picture = ''

    async mounted() {
        await this.$store.dispatch("loginState");
        if (this.user) {

            this.picture = this.user.picture ? this.user.picture + `?t=${Date.now()}` : '/img/300_300_default_profile.png'
        }else{
            this.picture = 'img/300_300_default_profile.png'
        }
    }

    moveUserPage() {
        if(this.user.channel_id)
        this.$router.push(`/channel/${this.user.channel_id}/timeline`)
    }
}
</script>

<style scoped lang="scss">
.user-avatar{
    cursor: pointer;
}

</style>
