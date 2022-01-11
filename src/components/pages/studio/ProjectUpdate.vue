<template>
    <ProjectUpload></ProjectUpload>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from "vue-property-decorator";
import ProjectUpload from "@/components/studio/_projectUplaod.vue";


@Component({
    components: {ProjectUpload},
})
export default class ProjectUpdate extends Vue {


}
</script>

<style scoped>

</style>
