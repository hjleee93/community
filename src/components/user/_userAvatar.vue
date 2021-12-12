<template>

    <dt>
        <span :style="`background: url('${user && user.picture  || 'img/zempy.png'}') center center no-repeat; background-size: cover;`"></span>
    </dt>
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
</style>
