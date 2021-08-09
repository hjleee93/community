<template>
    <div
        class="quick-post-footer-action text-tooltip-tft-medium"
        data-title="Insert audio"
        style="width: 30px"
        @click="uploadFile"
    >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
        >
            <path fill="none" d="M0 0h24v24H0z" />
            <path
                d="M16 8v2h-3v4.5a2.5 2.5 0 1 1-2-2.45V8h4V4H5v16h14V8h-3zM3 2.992C3 2.444 3.447 2 3.999 2H16l5 5v13.993A1 1 0 0 1 20.007 22H3.993A1 1 0 0 1 3 21.008V2.992z"
                fill="rgba(97,106,130,1)"
            />
        </svg>
        <div style="height: 0px; overflow: hidden">
            <input type="file" @change="onFileChange" multiple accept= audio/*
            ref="audio" />
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { FileLoader } from "@/script/fileLoader";
import { mbToByte } from "@/script/fileManager";
import { bus } from "@/main";
@Component({
    components: {},
})
export default class AudioUploaderBtn extends Vue {
    @Prop() fileLoader!: FileLoader;
    @Prop() activeTab!: string;
    private remainFileSize: number = mbToByte(40); //40mb (binary);
    private fileList: any[] = [];

    uploadFile() {
        (this.$refs.audio as HTMLElement).click();
    }

    // 파일 업로드
    async onFileChange(event: {
        target: { accept: any; files: any; value: string | null };
    }) {
        //포스팅 타입 분기
        if (this.activeTab === "sns") {
            if (this.fileLoader.checkAudioFile(event.target.files)) {
                this.$emit("fileCheckDone");
                bus.$emit("fileLoader", this.fileLoader);
            }
        } else if (this.activeTab === "blog") {
            event.target.files.forEach(async (element) => {
                let audio = await this.$api.audioUplaod(element);
                bus.$emit("audioUrl", audio.url);
            });
        }
        event.target.value = null;
    }
}
</script>

<style scoped>
</style>
