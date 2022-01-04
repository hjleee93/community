<template>
    <div class="upload-box" @click="uploadFile">
        <div style="height: 0px; overflow: hidden">
            <input type="file" @change="onFileChange" accept= image/*
            ref="bannerImg" name="fileInput" />
        </div>
        <svg class="upload-box-icon icon-photos">
            <use xlink:href="#svg-photos"></use>
        </svg>

        <p class="upload-box-title">Change Banner</p>

        <p class="upload-box-text">Recommended 1184x300px / maximum 15mb</p>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
    components: {},
})
export default class BannerImgUploader extends Vue {
    uploadFile() {
        (this.$refs.bannerImg as HTMLElement).click();
    }

    onFileChange(event: { target: { files: any } }) {
        this.inputFile(event.target.files);
    }

    inputFile(files: File) {

    }
}
</script>

<style scoped>
</style>
