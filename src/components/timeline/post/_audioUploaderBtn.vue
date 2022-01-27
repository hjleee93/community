<template>
    <div
        style="width: 30px"
        @click="uploadFile"
    >
        <a href="#"><i class="uil uil-music"></i></a>
        <div style="height: 0px; overflow: hidden">
            <input
                type="file"
                @input="onSelectFile"
                multiple
                accept=".mp3"
                ref="audio"/>
        </div>

    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import {mbToByte} from "@/script/fileManager";
import {onSelectFile} from "@/script/fileManager";

@Component({
    components: {},
})
export default class AudioUploaderBtn extends Vue {
    @Prop() activeTab!: string;
    maxFileNum: number = 5;

    uploadFile() {
        if (this.activeTab === 'SNS') {
            if (this.$store.getters.imgArr.length > 0 || this.$store.getters.videoArr.file) {
                this.$modal.show('alertAttrModal')
            }
            else {
                (this.$refs.audio as HTMLElement).click();
            }
        }
        else {
            (this.$refs.audio as HTMLElement).click();

        }
    }

    onSelectFile() {
        const input: any = this.$refs.audio;
        if (this.activeTab === 'SNS') {
            if (this.$store.getters.audioArr.length < this.maxFileNum) {
                onSelectFile(input.files, this.maxFileNum, 10, 'audioArr')
            }
            else {
                alert(`${this.$t('maxFile.count.text1')} ${this.maxFileNum}${this.$t('maxFile.count.text2')}`) //
            }

        }
        else if (this.activeTab === 'BLOG') {
            if (input.files.length > 10) {
                alert(`${this.$t('maxFile.count.ten.text')}`)
                return;
            }

            const formData = new FormData();

            for (let i = 0; i < input.files.length; i++) {
                if (input.files[i].size > mbToByte(10)) {
                    alert(`${this.$t('maxFile.size.ten.text')}`)
                }
                else {
                    formData.append(input.files[i].name, input.files[i]);
                }
            }

            this.$api.fileUploader(formData)
                .then((res: any) => {
                    this.$store.commit('blogAudioArr', res)
                })
        }
        (this.$refs.audio as any).value = '';
    }


}
</script>

<style scoped>
</style>
