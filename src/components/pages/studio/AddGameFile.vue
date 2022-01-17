<template>
    <div class="studio-upload-input">
        <div class="sui-input">
            <div class="suii-title">첫번째 버전 추가</div>
            <dl class="suii-content">
                <dt>게임 업로드</dt>
                <dd>

                    <p class="upload-file-container">
                        <label for="game-file"><i class="uil uil-file-plus" style="font-size:18px;"></i> &nbsp;
                            파일업로드</label>
                        <input
                            @input="onFileChange"
                            type="file"
                            ref="gameFile"
                            id="game-file"
                            accept=".zip">
                        <ClipLoader v-if="isLoadingFile" :color="'#ff6e17'" :size="'20px'"></ClipLoader>
                        <button class="btn-circle-icon" @click="deleteFile" v-if="fileName"><i
                            class="uil uil-trash-alt"></i>
                        </button>
                    </p>
                    <transition name="component-fade" mode="out-in">
                        <div v-if="fileName">
                            <p class="file-size">파일 크기 : {{
                                    totalSize < 1
                                        ? `${totalSize * 1000} KB`
                                        : `${totalSize} MB`
                                }}</p>
                            <p class="file-name">파일 명 : {{ fileName }}</p>
                        </div>
                    </transition>
                    <transition name="component-fade" mode="out-in">
                        <h2 :class="isFileEmpty ?'file-err on' : 'file-err off' ">
                            게임 파일을 선택해주세요
                        </h2>
                    </transition>
                    <h2>
                        게임에 포함된 웹페이지를 압축 파일로 업로드 해주세요. <br/> ZIP 파일만 업로드가 가능하고, 압축하지 않은 파일들의 총 크기가 500MB 이하여야 합니다.
                    </h2>
                </dd>
            </dl>
            <div class="suii-open" @click="isAdvancedOpen = !isAdvancedOpen">
                <span>고급설정</span> &nbsp;<i class="uil uil-sliders-v-alt"></i>
            </div>
            <transition name="component-fade" mode="out-in">
                <div v-if="isAdvancedOpen">
                    <dl class="suii-content">
                        <dt>게임정보</dt>
                        <dd>
                            <select name="" title="" class="w100p">
                                <option v-for="file in startFileOptions" :value="file">{{ file }}</option>
                            </select>
                        </dd>
                    </dl>
                    <dl class="suii-content">
                        <dt>게임 자동 배포 선택</dt>
                        <dd>
                            <ul>
                                <li>
                                    <label class="switch-button">
                                        <input type="checkbox" name="" v-model="autoDeploy"/>
                                        <span class="onoff-switch"></span>
                                    </label>
                                </li>
                                <li>Auto-deployment mode</li>
                            </ul>
                            <h2>
                                게임에 포함된 웹페이지를 압축 파일로 업로드 해주세요. <br/> ZIP 파일만 업로드가 가능하고, 압축하지 않은 파일들의 총 크기가 100MB 이하여야
                                합니다.
                            </h2>
                        </dd>
                    </dl>
                    <div class="suii-close">
                        <button class="btn-line" @click="isAdvancedOpen = !isAdvancedOpen">닫기 &nbsp;&nbsp;<i
                            class="uil uil-angle-up"></i></button>
                    </div>
                </div>
            </transition>
        </div>
        <ul class="sui-btn">

            <li>
                <a @click="prevPage" class="btn-line w150"><i class="uil uil-angle-left-b"></i> 이전
                </a>
            </li>
            <li>
                <a v-if="isEditProject" @click="updateProject" class="btn-default w150">업데이트
                    <i class="uil uil-angle-right-b"></i></a>
                <a v-else @click="upload" class="btn-default w150">업로드<i class="uil uil-angle-right-b"></i></a>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from "vue-property-decorator";
import ZipUtil from "@/script/zipUtil";
import ClipLoader from 'vue-spinner/src/ClipLoader.vue';
import Toast from "@/script/message";
import {eGameStage} from "@/common/enumData";
import Version from "@/script/version";

@Component({
    components: {ClipLoader},
})
export default class AddGameFile extends Vue {
    @Prop() isEditProject !: any;
    projectId = this.$route.params.id;

    toast = new Toast();
    limitSize: number = 1024 * 1000 * 500;
    totalSize: number = 0;
    uploadGameFile: File | null = null;
    uploadGameFiles: File[] = [];
    isAdvancedOpen: boolean = false;
    startFile: string = '';
    startFileOptions: string[] = [];

    fileName: string = '';
    versionDescription: string = "";

    isLoadingFile: boolean = false;
    autoDeploy: boolean = true;

    isFileEmpty: boolean = false;
    isLoadingUpload: boolean = false;

    mounted(){

        console.log('isEditProject', this.isEditProject)
    }

    async onFileChange(e) {

        this.uploadGameFile = e.target.files[0];

        this.isLoadingFile = true;
        const zip = await ZipUtil.zipFileToZip(this.uploadGameFile);

        const files: any = await ZipUtil.zipToFiles(zip);
        let size: number = 0;

        for (let f in files) {
            size += files[f].size;
        }

        if (size > this.limitSize) {
            alert('100mb 초과임')
            return;
        }

        this.totalSize = Number((size / (1024 * 1000)).toFixed(2));
        this.uploadGameFiles = files;

        const htmls = this.uploadGameFiles.filter((file) => {
            return file.name.indexOf('.html') > -1;
        });

        this.startFileOptions = htmls.map(file => file.name);
        this.startFileOptions.sort((a, b) => a.length - b.length);
        const indexFiles = this.startFileOptions.filter(name => name.includes('index'));

        if (indexFiles.length) {
            indexFiles.sort((a, b) => a.length - b.length);
            this.startFile = indexFiles[0];
        }
        else {
            this.startFile = this.startFileOptions[0];
        }

        this.startFileOptions.sort((a, b) => a.length - b.length);

        if (this.startFileOptions.length) {
            // this.uploadGameFileError = '';
            this.fileName = e.target.files[0].name
        }
        else {
            alert('no html file')
            this.fileName = ''
            // this.uploadGameFileError = this.$t('projectAddVersion.error.notFoundHtml').toString();

        }
        if (
            this.uploadGameFiles.length > 0 &&
            this.startFileOptions.length > 0
        ) {
            this.$store.commit("sendGameFileDone", true);

            this.$store.commit("uploadGameFiles", this.uploadGameFiles);
            this.isFileEmpty = false;
        }
        else {
            this.$store.commit("sendGameFileDone", false);
        }

        this.isLoadingFile = false;
    }

    deleteFile() {
        this.$store.commit("uploadGameFiles", []);
        this.uploadGameFile = null;
        this.uploadGameFiles = [];
        this.startFile = '';
        this.startFileOptions = [];
        this.totalSize = 0;
        this.fileName = '';
        (this.$refs.gameFile as any).value = '';
    }

    upload() {
        const gameFileInfo = {
            autoDeploy: this.autoDeploy,
            startFile: this.startFile,
            size: this.totalSize,
            version_description: this.versionDescription,
        };

        const { gameInfoObj, uploadGameFiles, gameStage } = this.$store.getters;

        console.log('gameFileInfo', gameFileInfo)

        if (gameStage !== eGameStage.Dev  && uploadGameFiles.length === 0) {
            this.isFileEmpty = true;
        }
        else {
            this.$api.createProject(
                gameInfoObj,
                gameFileInfo,
                uploadGameFiles
            )
                .then((res) => {
                    this.toast.successToast("게임이 업로드되었습니다.");
                    this.$router.push('/projectList')
                })
                .catch((err) => {

                })

            this.isFileEmpty = false;
        }


    }

  async updateProject() {

        let isError = false;

        if( !this.uploadGameFiles.length ) {
            isError = true;
            // this.uploadGameFileError = this.$t('projectAddVersion.error.noUploadFile').toString();
        }

        if( !this.startFileOptions.length ) {
            isError = true;
        }

        if( isError ) {
            // this.wait = false;
            return;
        }


      const option: any = {
          id: this.projectId,
          name: localStorage.getItem('title'),
          description: localStorage.getItem('description'),
          hashtags: localStorage.getItem('hashtagsArr'),
          stage: this.$store.getters.gameStage
      };


      this.$api.updateProject(option, this.$store.getters.thumbFile)
          .then((res) => {
              // this.toast.successToast("게임이 업로드되었습니다.");
              // this.$router.push('/projectList')
          })
          .catch((err) => {
              console.log('err', err)
              return;
          })


        const version = await this.$api.createVersion(this.projectId, '1.0.0', this.uploadGameFiles, this.startFile,
            this.autoDeploy, this.totalSize,'', this.$store.getters.gameStage);

      await this.$router.replace(`/projectList`);
    }

    prevPage() {
        this.$emit('gameInfoDone', false)
    }

}
</script>

<style scoped lang="scss">

.file-err {
    color: #c5292a;

    &.on {
        display: inline-block;
    }

    &.off {
        display: none;
    }
}

//upload button
.upload-file-container {
    display: flex;
    align-items: center;

    .btn-circle-icon {
        margin-left: 10px
    }
}

.file-size, .file-name {
    margin: 10px 0px 10px;
}


//transition
.component-fade-enter-active, .component-fade-leave-active {
    transition: opacity .3s ease;
}

.component-fade-enter, .component-fade-leave-to
    /* .component-fade-leave-active below version 2.1.8 */
{
    opacity: 0;
}

//spinner
.v-spinner {
    margin-left: 10px;
    display: flex;
    align-items: center;
}
</style>