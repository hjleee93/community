<template>
    <div class="content-studio">
        <!-- 상단배너 -->
        <div class="studio-banner bg02">
            <h2>{{ $t('uploadGame.selectStage.text') }}</h2>
            <p>{{ $t('uploadGame.selectStage.info') }}
                </p>
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