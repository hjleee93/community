<template>
    <div
        style="width: 30px"
        @click="uploadFile"
    >
        <a href="#"><i class="uil uil-play-circle"></i></a>
        <div style="height: 0px; overflow: hidden">
            <input
                type="file"
                @input="onSelectFile"
                accept=video/*
                ref="video"/>
        </div>
    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import {onSelectFile} from "@/script/fileManager";

@Component({
    components: {},
})
export default class VideoUploaderBtn extends Vue {
    @Prop() activeTab!: string;
    maxFileNum: number = 1;

    uploadFile() {
        if (this.$store.getters.audioArr.length > 0 || this.$store.getters.imgArr.length > 0) {
            this.$modal.show('alertAttrModal')
        }
        else {
            (this.$refs.video as HTMLElement).click();
        }
    }

    onSelectFile() {
        const input: any = this.$refs.video;

        if (this.activeTab === 'SNS') {
            onSelectFile(input.files, this.maxFileNum, 30, 'videoArr')
        }
        else if (this.activeTab === 'BLOG') {
            const formData = new FormData();

            for (let i = 0; i < input.files.length; i++) {
                formData.append(input.files[i].name, input.files[i]);
            }

            this.$api.fileUploader(formData)
                .then((res: any) => {
                    this.$store.commit('blogVideoArr', res)
                })
        }
    }


}
</script>

<style scoped>
.ma-content p {
    font-size: 16px;
    font-weight: 700;
    color: #C5292A;
}
</style>
