<template>
    <div class="error-section">
        <div class="login-logo">
            <router-link to="/"><img src="../assets/images/zempie_logo.png" alt="" title=""/></router-link>
        </div>
        <p style="font-size: 50px;color: #fff;">서비스 준비중</p>
        <p style="margin-top: 25px; color:#fff; font-size:16px;">이용에 불편을 드려 죄송합니다. 빠른 시일내에 서비스를 제공할 수 있도록 노력하겠습니다. </p>
        <p style="color:#fff; font-size:16px;">감사합니다.</p>
        <img class="img-update" src="../assets/images/update.png"/>
    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";

@Component({
    components: {},
})
export default class Update extends Vue {
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

.img-update {
    width: 70vh;
    display: flex;
    margin: 0 auto;

}
</style>
