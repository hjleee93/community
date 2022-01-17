<template>
    <div class="content-studio">
        <!-- 상단배너 -->
        <div class="studio-banner bg02">
            <h2>게임 단계 선택</h2>
            <p>게임이 현재 진행중인 개발 단계를 선택하세요. 개발 도중 언제든지 개발 단계를 변경할 수 있습니다.</p>
        </div>
        <!-- 상단배너 끝 -->


     <ProjectUpload> </ProjectUpload>


    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import ProjectUpload from "@/components/studio/_projectUplaod.vue";

@Component({
    components: { ProjectUpload },
})
export default class UploadGame extends Vue {


}
</script>

<style scoped lang="scss">

</style>