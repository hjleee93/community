<template>
    <div
        style="width: 30px"
        @click="uploadFile"
    >
        <a><i class="uil uil-image"></i></a>
        <div style="height: 0px; overflow: hidden">
            <input type="file"
                   @input="onSelectFile"
                   multiple
                   accept=image/*
                   ref="image"/>
        </div>
    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import {onSelectFile} from "@/script/fileManager";

@Component({
    components: {},
})
export default class ImageUploaderBtn extends Vue {
    @Prop() activeTab!: string;
    maxFileNum: number = 5;

    uploadFile() {
        if (this.activeTab === 'SNS') {
            if (this.$store.getters.audioArr.length > 0 || this.$store.getters.videoArr.file) {
                this.$modal.show('alertAttrModal')

            }else{
                (this.$refs.image as HTMLElement).click();
            }
        }
        else {
            (this.$refs.image as HTMLElement).click();

        }

    }

    onSelectFile() {

        const input: any = this.$refs.image;
        const formData = new FormData();

        if (this.activeTab === 'SNS') {
            if (this.$store.getters.imgArr.length < 5) {
                onSelectFile(input.files, this.maxFileNum, 15, 'imgArr')
            }
            else {
                alert(`최대 파일 개수는 ${this.maxFileNum}개입니다.`)
            }
        }
        else if (this.activeTab === 'BLOG') {
            const files = input.files;
            if (files.length > 20) {
                alert(`최대 파일 개수는 20개입니다.`)
                return;
            }

            for (let i = 0; i < input.files.length; i++) {
                formData.append(input.files[i].name, input.files[i]);
            }

            this.$api.fileUploader(formData)
                .then((res: any) => {
                    this.$store.commit('blogImgArr', res)
                })
                .catch((err:any)=>{

                })

        }

        (this.$refs.image as any).value = '';
    }
}
</script>

<style scoped>
.quick-post-footer-action {
    cursor: pointer
}
</style>
