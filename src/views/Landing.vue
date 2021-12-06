<template>
    <div style="padding-top:70px;" @click="login">


        <div class="main-test">
            &nbsp;
        </div>


    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
    components: {},
})
export default class Landing extends Vue {
    login(){
        this.$router.push('/login')
    }


}
</script>

<style scoped lang="scss">
</style>