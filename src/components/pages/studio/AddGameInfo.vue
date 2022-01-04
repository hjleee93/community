<template>
    <div class="studio-upload-input">
        <div class="sui-input">
            <div class="suii-title">게임정보</div>
            <dl class="suii-content">
                <dt>게임 타이틀<span style="color: red;">*</span></dt>
                <dd>
                    <input v-model="title" type="text" name="" title="" placeholder="" class="w100p"/>
                </dd>
            </dl>
            <dl class="suii-content">
                <dt>게임 설명<span style="color: red;">*</span></dt>
                <dd>
                    <textarea v-model="description" name="" title="" placeholder="" class="w100p h100"></textarea>
                </dd>
            </dl>
            <dl class="suii-content">
                <dt>태그</dt>
                <dd>
                    <div class="chip-container">
                        <div class="chip" v-for="(chip, i) of chips" :key="chip.id">
                            {{ chip }}
                            <i class="uil uil-times" @click="deleteChip(i)"></i>
                        </div>

                        <input v-model="currentInput" @keyup.enter="saveChip" @keydown.delete="backspaceDelete">
                    </div>
                    <!--                    <input v-model="hashtagsArr" type="text" name="" title="" placeholder="" class="w100p"/>-->
                    <h2>
                        게임을 나타낼 수 있는 단어로 태그를 설정합니다. 이러한 태그는 게임 검색에 사용되며 여러 태그를 사용하는 경우 엔터키로 구분
                    </h2>
                </dd>
            </dl>
            <dl class="suii-content">
                <dt>썸네일 이미지</dt>
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
                                <button class="btn-circle-icon" @click="prevImg='';"><i class="uil uil-trash-alt"></i>
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
                                <button class="btn-gray" @click="uploadGif"><i class="uil uil-upload"></i>&nbsp; 이미지 업로드</button>

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
                                <button class="btn-gray" @click="uploadGif"><i class="uil uil-upload"></i>&nbsp; 이미지 업로드</button>
                                <button class="btn-circle-icon" @click="prevGif='';"><i class="uil uil-trash-alt"></i>
                                </button>
                            </p>
                        </li>
                    </ul>
                </dd>
            </dl>
            <dl class="suii-content">
                <dt>영어게임 ID 자동 작성</dt>
                <dd>
                    <label class="switch-button">
                        <input type="checkbox" name="" v-model="autoGamePath"/>
                        <span class="onoff-switch"></span>
                    </label>
                </dd>
            </dl>
            <transition name="component-fade" mode="out-in">
                <dl class="suii-content" v-if="!autoGamePath">
                    <dt>영어게임 ID</dt>
                    <dd>
                        <input v-model="title" type="text" name="" title="" placeholder="" class="w100p"/>
                    </dd>
                </dl>
            </transition>
        </div>

        <ul class="sui-btn">
            <li>
                <!--                <router-link to="#" class="btn-line w150"><i class="uil uil-angle-left-b"></i> 이전</router-link>-->
            </li>
            <li><a @click="save" class="btn-default w150">다음 <i class="uil uil-angle-right-b"></i></a></li>
        </ul>
    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import _ from 'lodash';

@Component({
    components: {},
})
export default class AddGameInfo extends Vue {
    @Prop({default: false}) set!: boolean;
    title: string = '';
    description: string = '';
    hashtagsArr: string[] = [];
    currentInput = ''
    chips: string[] = [];
    prevImg: any = '';
    prevGif: any = '';

    autoGamePath: boolean = true;

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
                next();
                // resetLocalStorage();
            }
            else {
            }
        }
        else {
            next();
        }
    }

    save() {
        if (!this.title || !this.description) {
            alert('필수입력 사항을 입력해주세요')
            return;
        }
        else {
            this.$router.push('/addGameFile')
        }


    }

    uploadFile() {
        (this.$refs.thumbnail as HTMLElement).click();
    }
    uploadGif(){
        (this.$refs.thumbnailGif as HTMLElement).click();
    }

    onFileChange(event: { target: { files: any } }) {
        if (event.target.files[0].size < 1024 * 1024 * 4) {
            // this.fileName = event.target.files[0].name
            // this.updateFile = event.target.files[0]
            const reader = new FileReader();
            reader.onload = e => {
                this.prevImg = e.target!.result
            };
            reader.readAsDataURL(event.target.files[0]);
        }
        else {
            alert(`최대 파일 크기는 4mb입니다. `)
        }
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

    /**
     * tag chips
     */
    saveChip() {
        const {chips, currentInput, set} = this;
        if (!_.includes(chips, currentInput.trim())) {
            ((set && chips.indexOf(currentInput) === -1) || !set) && chips.push(currentInput.trim());
        }
        this.currentInput = '';
    }

    deleteChip(index) {
        this.chips.splice(index, 1);
    }

    backspaceDelete({which}) {
        which == 8 && this.currentInput === '' && this.chips.splice(this.chips.length - 1);
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
        padding: 0px 4px;
        border-radius: 3px;
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