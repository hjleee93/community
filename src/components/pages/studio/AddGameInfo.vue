<template>
    <div class="studio-upload-input">
        <div class="sui-input">
            <div class="suii-title">게임정보</div>
            <dl class="suii-content">
                <dt>게임 제목<span v-if="!projectInfo" style="color: red;">*</span></dt>

                <dd>
                    <input @focusout="autoSave" v-model="title" type="text" name="" title="" placeholder=""
                           class="w100p"/>
                    <transition name="component-fade" mode="out-in">
                        <p class="valid-err" :key="isTitleErr" :class="isTitleErr? 'active' :'' ">게임 제목을 입력해주세요.</p>
                    </transition>
                </dd>

            </dl>
            <dl class="suii-content">
                <dt>게임 설명<span v-if="!projectInfo" style="color: red;">*</span></dt>
                <dd>
                    <textarea @focusout="autoSave" v-model="description" name="" title="" placeholder=""
                              class="w100p h100"></textarea>
                    <transition name="component-fade" mode="out-in">
                        <p class="valid-err" :key="isDescErr" :class="isDescErr? 'active' :'' ">게임에 대한 설명을 입력해주세요.</p>
                    </transition>
                </dd>
            </dl>
            <dl class="suii-content">
                <dt>태그<span v-if="!projectInfo" style="color: red;">*</span></dt>
                <dd>
                    <div class="chip-container">
                        <div class="chip" v-for="(chip, i) of hashtagsArr" :key="chip.id">
                            {{ chip }}
                            <i class="uil uil-times" @click="deleteChip(i)"></i>
                        </div>

                        <input @focusout="autoSave" v-model="currentInput" @keyup.enter="saveChip"
                               @keydown.delete="backspaceDelete">

                    </div>
                    <!--                    <input v-model="hashtagsArr" type="text" name="" title="" placeholder="" class="w100p"/>-->
                    <transition name="component-fade" mode="out-in">
                        <p class="valid-err" :key="isHashtagErr" :class="isHashtagErr? 'active' :'' ">최소 1개 이상
                            설정하세요.</p>
                    </transition>
                    <h2>
                        게임을 나타낼 수 있는 단어로 태그를 설정합니다. 이러한 태그는 게임 검색에 사용되며 여러 태그를 사용하는 경우 엔터키로 구분
                    </h2>
                </dd>
            </dl>
            <dl class="suii-content">
                <dt>썸네일 이미지<span v-if="!projectInfo" style="color: red;">*</span></dt>
                <dd>
                    <ul class="image-upload">

                        <li v-if="!prevImg">
                            <div>
                                <div style="height: 0px; overflow: hidden">
                                    <input type="file"
                                           @change="onFileChange"
                                           accept=image/*
                                           ref="thumbnail"
                                           name="fileInput"/>
                                </div>
                                <p><i class="uil uil-image-v"></i></p>
                                <h2>
                                    이미지사이즈 512* 340<br/>
                                    (up to 4MB)
                                </h2>
                            </div>

                            <transition name="component-fade" mode="out-in">
                                <p class="valid-err" :key="isThumbErr" :class="isThumbErr? 'active' :'' ">썸네일 이미지를
                                    업로드해주세요.</p>
                            </transition>
                            <p>

                                <button class="btn-gray" @click="uploadFile"><i class="uil uil-upload"></i>&nbsp; 이미지
                                    업로드
                                </button>

                            </p>

                        </li>
                        <li v-else>
                            <div
                                :style="{'background' : 'url(' + prevImg + ') center center / cover no-repeat', 'background-size' : 'cover'}"
                                style="border:#e9e9e9 2px solid;">
                                <div style="height: 0px; overflow: hidden">
                                    <input type="file"
                                           @change="onFileChange"
                                           accept=image/*
                                           ref="thumbnail"
                                           name="fileInput"/>
                                </div>
                            </div>

                            <p>
                                <button class="btn-gray" @click="uploadFile"><i class="uil uil-upload"></i>&nbsp; 이미지
                                    업로드
                                </button>
                                &nbsp; &nbsp;
                                <button class="btn-circle-icon" @click="deleteThumbnail"><i
                                    class="uil uil-trash-alt"></i>
                                </button>
                            </p>
                        </li>
                    </ul>
                </dd>
            </dl>
            <dl class="suii-content">
                <dt>미리보기 이미지</dt>
                <dd>
                    <ul class="image-upload">
                        <li v-if="!prevGif">
                            <div>
                                <div style="height: 0px; overflow: hidden">
                                    <input type="file"
                                           @change="onGifChange"
                                           accept=image/*
                                           ref="thumbnailGif"
                                           name="fileInput"/>
                                </div>
                                <p><i class="uil uil-image-v"></i></p>
                                <h2>
                                    이미지사이즈 512* 340<br/>
                                    (up to 4MB)
                                </h2>
                            </div>
                            <p>
                                <button class="btn-gray" @click="uploadGif"><i class="uil uil-upload"></i>&nbsp; 이미지 업로드
                                </button>

                            </p>
                        </li>
                        <li v-else>
                            <div
                                :style="{'background' : 'url(' + prevGif + ') center center / cover no-repeat', 'background-size' : 'cover'}"
                                style="border:#e9e9e9 2px solid;">
                                <div style="height: 0px; overflow: hidden">
                                    <input type="file"
                                           @change="onGifChange"
                                           accept=image/*
                                           ref="thumbnailGif"
                                           name="fileInput"/>
                                </div>
                            </div>
                            <p>
                                <button class="btn-gray" @click="uploadGif"><i class="uil uil-upload"></i>&nbsp; 이미지 업로드
                                </button>
                                <button class="btn-circle-icon" @click="prevGif='';"><i class="uil uil-trash-alt"></i>
                                </button>
                            </p>
                        </li>
                    </ul>
                </dd>
            </dl>
            <dl class="suii-content" v-if="!projectInfo">
                <dt style="padding-top:5px;">영어게임 ID 자동 작성</dt>
                <dd>
                    <label class="switch-button">
                        <input type="checkbox" name="" v-model="autoGamePath"/>
                        <span class="onoff-switch"></span>
                    </label>
                </dd>
            </dl>
            <transition name="component-fade" mode="out-in">
                <dl class="suii-content" v-if="!autoGamePath || projectInfo">
                    <dt>영어게임 ID</dt>
                    <dd>
                        <input :readonly="projectInfo" v-model="gamePath"
                               type="text" name="" title="" placeholder="" :class="!projectInfo? 'w90p' : 'w100p'"/>

                        <p style="color: #C5292A; margin-top:10px">{{ gamePathError }}</p>
                        <p v-if="confirmedGamePath" style="color: #1fc944; margin-top:10px">사용 가능한 ID입니다.</p>
                    </dd>
                    <a @click="checkGamePath" class="btn-default w150" v-if="!projectInfo">중복 확인</a>

                </dl>

            </transition>

        </div>

        <ul class="sui-btn">
            <li>
                <a @click="prevPage" class="btn-line w150"><i class="uil uil-angle-left-b"></i>이전</a>
            </li>
            <li>

                <a v-if="$store.getters.gameStage !== gameStage.Dev" @click="save" class="btn-default w150">다음 <i class="uil uil-angle-right-b"></i></a>
                <a v-else @click="save" class="btn-default w150">업로드 </a>
            </li>

        </ul>


        <div class="sui-input" style="margin-top:100px;" v-if="projectInfo">
            <dl class="suii-content delete-area">
                <dt>게임 삭제</dt>
                <dd class="game-delete-btn"><a @click="$modal.show('deleteProject')" class="btn-default w150">삭제</a>
                </dd>
            </dl>

        </div>

        <modal :clickToClose="false"
               class="modal-area-type" name="deleteProject" width="90%" height="auto" :maxWidth="380"
               :adaptive="true"
               :scrollable="true">
            <div class="modal-alert">
                <dl class="ma-header">
                    <dt>안내</dt>
                    <dd>
                        <button @click="$modal.hide('deleteProject')"><i class="uil uil-times"></i></button>
                    </dd>
                </dl>
                <div class="ma-content">
                    <h2>한 번 삭제한 게임은 복구할 수 없습니다. 정말 삭제하시겠습니까?</h2>
                    <div>
                        <button class="btn-default w48p" @click="deleteProject()">네</button>
                        <button class="btn-gray w48p" @click="$modal.hide('deleteProject')">아니오</button>
                    </div>
                </div>
            </div>
        </modal>


    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from "vue-property-decorator";
import _ from 'lodash';
import {randomString} from '@/script/util';
import {eGameStage} from "@/common/enumData";
import Toast from "@/script/message";

@Component({
    components: {},
})
export default class AddGameInfo extends Vue {
    @Prop({default: false}) set!: boolean;
    @Prop() projectInfo !: any;
    toast = new Toast();
    gameStage = eGameStage;

    title: string = '';
    description: string = '';
    hashtagsArr: string[] = [];
    currentInput = ''
    // chips: string[] = [];
    prevImg: any = '';
    prevGif: any = '';
    thumbFile: File | null = null;
    gamePath: string = ""
    autoGamePath: boolean = true;

    confirmedGamePath: boolean |  null = null;

    isTitleErr: boolean = false;
    isDescErr: boolean = false;
    isHashtagErr: boolean = false;
    isThumbErr: boolean = false;

    thumbFile2: File | null = null;

    gamePathError: string = "";
    waitGamePath: boolean = false;

    beforeRouteLeave(to, from, next) {
        if (to.name == "AddGameFile") {
            next();
        }
        else if (
            this.title ||
            this.description ||
            this.hashtagsArr.length > 0
            // ||  this.thumbFileUrl ||
            // this.thumbFile2Url
        ) {
            if (
                confirm(
                    "작성하신 글은 저장되지않고 지워집니다. 이 페이지를 나가시겠습니까?"
                )
            ) {
                this.resetLocalStorage();
                next();

            }
            else {
            }
        }
        else {
            this.resetLocalStorage();
            next();
        }
    }

    mounted() {

        // this.callLocalStorageData();
    }

    callLocalStorageData() {
        this.title = localStorage.getItem('title')!
        this.description = localStorage.getItem('description')!
        this.hashtagsArr = localStorage.getItem('hashtagsArr')!.split(',')
    }

    @Watch('projectInfo')
    callUpdateProjectData() {
        const { name, description, picture, hashtags, game } = this.projectInfo;
        const { pathname } = game;

        this.title = name;
        this.description = description;
        this.prevImg = picture;
        this.gamePath = pathname;
        this.hashtagsArr = hashtags ? hashtags.split(',') : []
    }


    init() {
        this.isTitleErr = false;
        this.isDescErr = false;
        this.isHashtagErr = false;
        this.isThumbErr = false;
    }

    resetLocalStorage() {
        localStorage.removeItem('title')
        localStorage.removeItem('description')
        localStorage.removeItem('hashtagsArr')
        localStorage.removeItem('thumbnail')
    }

   async checkGamePath(){
        this.waitGamePath = true;
        if(this.gamePath) {
            const result = await this.$api.confirmGamePath(this.gamePath);
            if (result && result.success) {
                this.confirmedGamePath = true;
                this.gamePathError = "";
            }
            else {
                this.gamePathError = '사용중인 아이디 입니다. 다른 아이디를 입력하세요.';
            }
        }
        this.waitGamePath = false;
    }
    prevPage() {
        this.resetLocalStorage();
        this.$store.commit("gameStage", null);
        this.$emit('stage', null)
        this.$emit('isActivePublish', false)
    }

    async save() {
        this.init();

        if (!this.title) {
            this.isTitleErr = true;
        }

        if (!this.description) {
            this.isDescErr = true;
        }

        if (this.hashtagsArr.length === 0) {
            this.isHashtagErr = true;
        }

        if (!this.thumbFile && !this.prevImg) {
            this.isThumbErr = true;
        }

        else {
            await this.commitGameInfo();
            if(this.$store.getters.gameStage === this.gameStage.Dev){
                this.uploadGame()
            }else{
                this.$emit('gameInfoDone', true)
            }

        }

    }


    async commitGameInfo() {
        if (!this.confirmedGamePath) {
            if (!this.autoGamePath) {
                alert('게임 id 다ㅅ; 확인 ')

            }
            else {
                let count = 0;
                while (!this.confirmedGamePath && count < 10) {
                    count++;
                    this.gamePath = randomString(11);
                    const result = await this.$api.confirmGamePath(
                        this.gamePath
                    );
                    if (result && result.success) {
                        this.confirmedGamePath = true;
                    }
                }

                if (!this.confirmedGamePath) {

                    return;
                }
            }
        }
        const gameInfo = {
            name: this.title,
            description: this.description,
            pathname: this.gamePath,
            project_picture: this.thumbFile,
            project_picture2: this.thumbFile2,
            hashtags: this.hashtagsArr.toString(),
            stage: this.$store.getters.gameStage,
        };

        this.$store.commit("uploadGameFiles", []);
        this.$store.commit("gameFileInfoObj", {});
        this.$store.commit("gameInfoObj", gameInfo);
    }

    uploadFile() {
        (this.$refs.thumbnail as HTMLElement).click();
    }

    uploadGif() {
        (this.$refs.thumbnailGif as HTMLElement).click();
    }

    onFileChange(event: { target: { files: any } }) {

        if (event.target.files[0].size < 1024 * 1024 * 4) {

            // this.fileName = event.target.files[0].name
            this.thumbFile = event.target.files[0];
            this.checkActivePublish();
            const reader = new FileReader();
            reader.onload = e => {
                this.prevImg = e.target!.result;
                this.$store.commit('thumbFile', this.thumbFile)

                localStorage.setItem('thumbnail', this.prevImg);
                this.isThumbErr = false;
            };
            reader.readAsDataURL(event.target.files[0]);

        }
        else {
            alert(`최대 파일 크기는 4mb입니다. `)
        }
    }

    deleteThumbnail() {
        this.prevImg = '';
        localStorage.removeItem('thumbnail')
    }

    onGifChange(event: { target: { files: any } }) {
        if (event.target.files[0].size < 1024 * 1024 * 4) {
            // this.fileName = event.target.files[0].name
            // this.updateFile = event.target.files[0]
            const reader = new FileReader();
            reader.onload = e => {
                this.prevGif = e.target!.result
            };
            reader.readAsDataURL(event.target.files[0]);
        }
        else {
            alert(`최대 파일 크기는 4mb입니다. `)
        }
    }


    checkActivePublish() {
        if (this.$store.getters.gameStage === this.gameStage.Dev) {
            if (this.title && this.description && this.hashtagsArr.length !== 0 && this.thumbFile) {

                this.commitGameInfo();
                this.$emit('isActivePublish', true)
            }
            else {
                this.$emit('isActivePublish', false)
            }

        }

    }

    @Watch('$store.getters.gameStage')
    watchGameStage() {
        this.checkActivePublish()
    }


    deleteProject() {
        this.$api.deleteProject(this.projectInfo.id)
            .then((res) => {
                this.$store.getters.projects[this.projectInfo.id] = null;
                this.toast.clear();
                this.toast.successToast("해당 게임이 삭제되었습니다.")
            })
            .catch(() => {
                this.toast.clear();
                this.toast.failToast("게임 삭제에 실패했습니다.")

            })
            .finally(() => {
                this.$modal.hide('deleteProject')
                this.$router.replace("/projectList");
            })
    }

    uploadGame() {
        const {gameInfoObj, gameFileInfoObj, uploadGameFiles} = this.$store.getters;

        this.$api.createProject(
            gameInfoObj,
            gameFileInfoObj,
            uploadGameFiles
        )
            .then((res) => {

                this.toast.successToast("개발 로그가 업로드되었습니다.");
                this.$router.push('/projectList')
            })
            .catch((err) => {

            })
    }


    /**
     * tag chips
     */
    saveChip() {
        const {hashtagsArr, currentInput, set} = this;
        if (!_.includes(hashtagsArr, currentInput.trim())) {
            ((set && hashtagsArr.indexOf(currentInput) === -1) || !set) && hashtagsArr.push(currentInput.trim());
        }
        this.currentInput = '';
    }

    deleteChip(index) {
        this.hashtagsArr.splice(index, 1);
    }

    backspaceDelete({which}) {
        which == 8 && this.currentInput === '' && this.hashtagsArr.splice(this.hashtagsArr.length - 1);
    }

    /**
     * 게임 정보 local storage 저장
     */
    autoSave() {

        if (this.title) {
            localStorage.setItem('title', this.title)
            this.isTitleErr = false;
        }
        else {
            localStorage.removeItem('title')
        }

        if (this.description) {
            localStorage.setItem('description', this.description)
            this.isDescErr = false;
        }
        else {
            localStorage.removeItem('description')
        }

        if (this.currentInput) {
            this.saveChip();
        }
        if (this.hashtagsArr.length > 0) {
            this.isHashtagErr = false;
            localStorage.setItem('hashtagsArr', this.hashtagsArr.toString())
        }
        else {
            localStorage.removeItem('hashtagsArr')
        }
        this.checkActivePublish();
    }




}
</script>

<style scoped lang="scss">
.delete-area {
    border-top: 0px !important;
}

.game-delete-btn {
    display: flex;
    justify-content: flex-end;

    a {
        background-color: #C5292A;
    }

}

.game-delete-btn:hover {
    a {
        background-color: #c5292a4a;
        color: #C5292a;
    }
}

.btn-line {
    height: 40px
}

//validation
.valid-err {
    color: #C5292A;
    display: none;

    &.active {
        display: inline-block;
    }
}

// /validation

//transition
.component-fade-enter-active, .component-fade-leave-active {
    transition: opacity .3s ease;
}

.component-fade-enter, .component-fade-leave-to
    /* .component-fade-leave-active below version 2.1.8 */
{
    opacity: 0;
}

// chips
.chip-container {
    height: 48px;
    padding: 0 15px;
    border: #e9e9e9 1px solid;
    border-radius: 5px;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;

    .chip {
        height: 30px;
        color: #fff;
        margin: 4px;
        background: #ff6e17;
        padding: 0px 10px;
        border-radius: 20px;
        display: flex;
        align-items: center;

        i {
            cursor: pointer;
            opacity: .56;
            margin-left: 8px;
        }
    }

    input {
        flex: 1 1 auto;
        width: 30px;
        border: none;
        outline: none;
        padding: 4px;
    }
}

// /chips
</style>