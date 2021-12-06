<template>
<!--    <div class="upload-box" @click="uploadFile">-->
<!--        <div style="height: 0px; overflow: hidden">-->
<!--            <input type="file" @change="onFileChange" accept= image/*-->
<!--            ref="profileImg" name="fileInput" />-->
<!--        </div>-->
<!--        <svg class="upload-box-icon icon-members">-->
<!--            <use xlink:href="#svg-members"></use>-->
<!--        </svg>-->

<!--        <p class="upload-box-title">Change Profile</p>-->

<!--        <p class="upload-box-text">recommended 300x300px / maximum 5mb</p>-->
<!--    </div>-->



<!--        <dl class="ii-card"  @click="uploadFile">-->
            <dd @click="uploadFile">
                <div style="height: 0px; overflow: hidden">
                    <input type="file" @change="onFileChange" accept= image/*
                           ref="profileImg" name="fileInput" />
                </div>
                <p><i class="uil uil-image-plus"></i></p>
                <h2>Change Banner</h2>
                <h3>{{ fileName }}</h3>
                <div><router-link to="#"><i class="uil uil-trash-alt"></i></router-link></div>
            </dd>
<!--        </dl>-->
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { FileSizeCheck } from "@/script/fileManager";
import { FileLoader } from "@/script/fileLoader";
import { bus } from "@/main";
import {mapGetters} from "vuex";
@Component({
    computed: { ...mapGetters(["user"]) },
    components: {},
})
export default class ProfileImgUploader extends Vue {
    private fileLoader: FileLoader = new FileLoader();
    private fileName: string = "";

    uploadFile() {
        (this.$refs.profileImg as HTMLElement).click();
    }

    onFileChange(event: { target: { files: any } }) {
        this.inputFile(event.target.files);
        this.fileName =event.target.files[0].name
        console.log(event.target.files[0].name)
    }

    inputFile(files: File) {
        if (FileSizeCheck(files[0], 5)) {
            this.fileLoader.getFileUrl(files[0], (e) => {
                bus.$emit("profileImgSrc", e.target!.result);
                this.$emit("profileImgSrc", e.target!.result);
            });
        } else {
            alert("5mb 이하의 사진으로 업로드해주세요");
        }
        // let file = files[0];
        // this.filename = file.name;
    }
    123() {

    }
}
</script>

<style lang="scss" scoped>
</style>
