<template>
    <div
        class="quick-post-footer-action text-tooltip-tft-medium"
        data-title="Insert Video"
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
                d="M3 3.993C3 3.445 3.445 3 3.993 3h16.014c.548 0 .993.445.993.993v16.014a.994.994 0 0 1-.993.993H3.993A.994.994 0 0 1 3 20.007V3.993zM5 5v14h14V5H5zm5.622 3.415l4.879 3.252a.4.4 0 0 1 0 .666l-4.88 3.252a.4.4 0 0 1-.621-.332V8.747a.4.4 0 0 1 .622-.332z"
                fill="rgba(97,106,130,1)"
            />
        </svg>
        <div style="height: 0px; overflow: hidden">
            <input type="file" @input="onSelectFile" accept= video/*
            ref="video" />
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
import { onSelectFile } from "@/script/fileManager";
@Component({
    components: {},
})
export default class ImageUploaderBtn extends Vue {
    @Prop() activeTab!: string;
    private maxFileNum: number = 1;

    uploadFile() {
        console.log(this.$store.getters.imgArr.length)
        if (this.$store.getters.audioArr.length > 0 || this.$store.getters.imgArr.length>0) {
            (this.$refs['alertModal'] as any).show()
        }else{
            (this.$refs.video as HTMLElement).click();
        }
    }

    onSelectFile() {
        const input:any = this.$refs.video;
        onSelectFile(input.files, this.maxFileNum, 'video')
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
        // this.$refs['my-modal'].toggle('#toggle-btn')
    }


}
</script>

<style scoped>
</style>
