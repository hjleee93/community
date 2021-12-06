<template>
    <div class="error-section">
        <div class="login-logo">
            <router-link to="/"><img src="../assets/images/zempie_logo.png" alt="" title=""/></router-link>
        </div>
        <img class="img404" src="../assets/images/404.png"/>
        <button class='btn-default' @click="$router.go(-1)">뒤로가기</button>
<!--        <p class="error-section-text">-->
<!--            If the problem persists, please send us an email to our support-->
<!--            team at <a :href="'mailto:' +  $store.getters.supportEmail" style="color: #30a6d8">-->
<!--            {{ $store.getters.supportEmail }}-->
<!--        </a>-->
<!--        </p>-->

    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";

@Component({
    components: {},
})
export default class Error404 extends Vue {
}
</script>

<style scoped>
.error-section {
    height: 100vh;
    display: flex;
    align-content: center;
    align-items: center;
    flex-direction: column;
    justify-content: center;
}

.img404 {
    display: flex;
    margin: 0 auto;

}
</style>
