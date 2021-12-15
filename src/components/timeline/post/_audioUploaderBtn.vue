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
                accept=audio/*
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
        if (this.$store.getters.imgArr.length > 0  || this.$store.getters.videoArr.file) {
            this.$modal.show('alertAttrModal')
        }
        else {
            (this.$refs.audio as HTMLElement).click();
        }
    }

    onSelectFile() {
        const input: any = this.$refs.audio;
        if (this.activeTab === 'SNS') {
            onSelectFile(input.files, this.maxFileNum, 10, 'audioArr')
        }
        else if (this.activeTab === 'BLOG') {

            const formData = new FormData();

            for (let i = 0; i < input.files.length; i++) {
                formData.append(input.files[i].name, input.files[i]);
            }

            this.$api.fileUploader(formData)
                .then((res: any) => {
                    this.$store.commit('blogAudioArr', res)
                })
        }
    }


}
</script>

<style scoped>
</style>
