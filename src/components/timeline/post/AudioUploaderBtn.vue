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
            <input type="file" @input="onSelectFile" multiple accept= audio/*
            ref="audio" />
        </div>

        <b-modal ref="alertModal" class="modal-container"
                 centered
                 hide-header
                 hide-footer>
            <div class="my-4">
                <h5 style="color: #000">한가지 형식의 첨부파일만 입력이 가능합니다. 여러가지 첨부파일을 업로드 하고 싶은 경우 블로그 포스팅을 이용해주세요.</h5>
                <p style="color: #000">기존 첨부파일을 지우시겠습니까?</p>
            </div>
            <div style="display: flex">
                <button
                    class="popup-box-action half button tertiary"
                    style="width: 47%"
                    @click="resetAttr(true)"
                >
                    네
                </button>
                <button
                    class="popup-box-action half button "
                    style="width: 47%"
                    @click="resetAttr(false)"
                >
                    아니요
                </button>
            </div>

        </b-modal>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { FileLoader } from "@/script/fileLoader";
import { mbToByte } from "@/script/fileManager";
import { bus } from "@/main";
import { onSelectFile } from "@/script/fileManager";
@Component({
    components: {},
})
export default class AudioUploaderBtn extends Vue {
    @Prop() fileLoader!: FileLoader;
    @Prop() activeTab!: string;
    private remainFileSize: number = mbToByte(40); //40mb (binary);
    private fileList: any[] = [];

    uploadFile() {
        if (this.$store.getters.audioArr.length > 0 || this.$store.getters.imgArr.length>0) {
            (this.$refs['alertModal'] as any).show()
        }else{
            (this.$refs.audio as HTMLElement).click();
        }
    }

    onSelectFile() {
        const input:any = this.$refs.audio;

    }

    resetAttr(isReset: boolean) {
        if (isReset) {
            this.$store.dispatch('resetAttFiles')
        }
        (this.$refs['alertModal'] as any).hide()

    }

    toggleModal() {
        // We pass the ID of the button that we want to return focus to
        // when the modal has hidden
        (this.$refs['my-modal'] as any).toggle('#toggle-btn')
    }

}
</script>

<style scoped>
</style>
