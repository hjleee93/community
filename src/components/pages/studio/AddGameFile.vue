<template>
    <div class="studio-upload-input">
        <div class="sui-input">
            <div class="suii-title">첫번째 버전 추가</div>
            <dl class="suii-content">
                <dt>게임 업로드</dt>
                <dd>
                    <p>
                        <label for="game-file"><i class="uil uil-file-plus" style="font-size:18px;"></i> &nbsp; 파일업로드</label>
                        <input

                            @change="onFileChange"
                            type="file"
                            id="game-file"
                            accept=".zip">
                        {{fileName}}
                    </p>
                    <h2>
                        게임에 포함된 웹페이지를 압축 파일로 업로드 해주세요. <br/> ZIP 파일만 업로드가 가능하고, 압축하지 않은 파일들의 총 크기가 100MB 이하여야 합니다.
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
                            <option value="option1">게임 시작 파일 선택 리스트 박스</option>
                            <option value="option2">게임 시작 파일 선택 리스트 박스1</option>
                            <option value="option3">게임 시작 파일 선택 리스트 박스2</option>
                        </select>
                    </dd>
                </dl>
                <dl class="suii-content" >
                    <dt>게임 자동 배포 선택</dt>
                    <dd>
                        <ul>
                            <li>
                                <label class="switch-button">
                                    <input type="checkbox" name="" />
                                    <span class="onoff-switch"></span>
                                </label>
                            </li>
                            <li>Auto-deployment mode</li>
                        </ul>
                        <h2>
                            게임에 포함된 웹페이지를 압축 파일로 업로드 해주세요. <br/> ZIP 파일만 업로드가 가능하고, 압축하지 않은 파일들의 총 크기가 100MB 이하여야 합니다.
                        </h2>
                    </dd>
                </dl>
                <div class="suii-close"><button class="btn-line">닫기 &nbsp;&nbsp;<i class="uil uil-angle-up"></i></button></div>
            </div>
            </transition>
        </div>
        <ul class="sui-btn">
            <li><router-link to="/addGameInfo" class="btn-line w150"><i class="uil uil-angle-left-b"></i> 이전</router-link></li>
            <li><router-link to="#" class="btn-default w150">업로드<i class="uil uil-angle-right-b"></i></router-link></li>
        </ul>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

@Component({
    components: {},
})
export default class AddGameFile extends Vue {

    isAdvancedOpen:boolean = false;

    uploadGameFile : File = null;
    fileName: string = '';

    onFileChange(e){
        console.log('e', e.target.files[0])
        this.fileName = e.target.files[0].name
    }

    @Watch('uploadGameFile')
    private async onChangedFile() {

        console.log(this.uploadGameFile)

        if( !this.uploadGameFile ) {
            return;
        }

        const zip = await ZipUtil.zipFileToZip(this.uploadGameFile);
        // console.log( zip );

        const files = await ZipUtil.zipToFiles(zip);
        let size = 0;
        for( let f in files ) {
            size += files[f].size;
        }

        if( size > this.limitSize ) {
            this.uploadGameFileError = this.$t('projectAddVersion.error.fileSizeExceeded').toString();
            return;
        }

        this.totalSize = Number((size / (1024 * 1000)).toFixed( 2 ));
        this.uploadGameFiles = files;
        // console.log(this.uploadGameFiles);

        const htmls = this.uploadGameFiles.filter((file) => {
            return file.name.indexOf('.html') > -1;
        });

        this.startFileOptions = htmls.map(file => file.name);
        this.startFileOptions.sort( (a, b) => a.length - b.length );
        const indexFiles = this.startFileOptions.filter( name => name.includes( 'index' ) );

        if( indexFiles.length ) {
            indexFiles.sort( (a, b) => a.length - b.length );
            this.startFile = indexFiles[0];
        }
        else {
            this.startFile = this.startFileOptions[0];
        }

        this.startFileOptions.sort( ( a, b ) => a.length - b.length );

        if (this.startFileOptions.length) {
            this.uploadGameFileError = '';
            Notify.create({
                message : this.$t('projectAddVersion.success.loadFile').toString(),
                position : 'top',
                color : 'primary',
                timeout: 2000
            });
        } else {
            this.uploadGameFileError = this.$t('projectAddVersion.error.notFoundHtml').toString();
            Notify.create({
                message : this.$t('projectAddVersion.error.uploadFail').toString(),
                position : 'top',
                color : 'negative',
                timeout: 2000
            });
        }

        this.$store.commit('ajaxBar', false);

        this.$q.loading.hide();


    }

}
</script>

<style scoped lang="scss">

//transition
.component-fade-enter-active, .component-fade-leave-active {
    transition: opacity .3s ease;
}

.component-fade-enter, .component-fade-leave-to
    /* .component-fade-leave-active below version 2.1.8 */
{
    opacity: 0;
}

</style>