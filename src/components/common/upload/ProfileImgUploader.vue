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
import {mapGetters} from "vuex";
@Component({
    computed: { ...mapGetters(["user"]) },
    components: {},
})
export default class ProfileImgUploader extends Vue {

    private fileName: string = "";

    uploadFile() {
        (this.$refs.profileImg as HTMLElement).click();
    }

    onFileChange(event: { target: { files: any } }) {
        this.inputFile(event.target.files);
        this.fileName =event.target.files[0].name
    }

    inputFile(files: File) {

    }
}
</script>

<style lang="scss" scoped>
</style>
