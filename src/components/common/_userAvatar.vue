<template>
    <div class="user-status-avatar">
        <div class="user-avatar-content" v-if=" user && user.picture">
            <img :src="user.picture"/>
        </div>
        <div class="user-avatar-content" v-else>
            <img src="img/default_profile.png"/>
        </div>
    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";

@Component({
    components: {},
})
export default class UserAvatar extends Vue {
    @Prop() user!: any;
}
</script>

<style scoped lang="scss">
.user-avatar-content {
    img {
        width: 45px;
        border: 3px solid rgba(106, 79, 223, 0.8);
        border-radius: 10px;
    }
}
</style>
