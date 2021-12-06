<template>
    <div>
        <!-- 입력/수정 -->
        <div class="info-input">
            <div class="ii-title">
                <h2>General Settings</h2>
                <h3>프로필 사진을 ZEMPIE가 제공하는 커뮤니티를 나타내는 위치에 표시됩니다.</h3>
            </div>

            <dl class="ii-card">
                <dt>
                    <div :style="{'background-color' : 'orange', 'background-size' : 'cover'}"></div>
                    <!--                    <div :style="{'background' : 'url(' + require('../../assets/images/card_test_img01.png') + ') center no-repeat', 'background-size' : 'cover'}"></div>-->
                    <p :style="{'background' : 'url(' + prevProfile + ') center center / cover no-repeat', 'background-size' : 'cover'}"></p>
                </dt>
<!--                <div class="delete-div" @click="deleteImg">-->
<!--                    <router-link class="delete-btn" to="#"><i class="uil uil-trash-alt"></i></router-link>-->
<!--                </div>-->
                <dd @click="uploadFile">
                    <div style="height: 0px; overflow: hidden">
                        <input type="file" @change="onFileChange" accept=image/*
                               ref="profileImg" name="fileInput"/>
                    </div>
                    <p><i class="uil uil-image-plus"></i></p>
                    <h2>Change Profile</h2>
                    <h3>{{ fileName }}</h3>
                    <div @click="deleteImg">
                        <router-link to="#"><i class="uil uil-trash-alt"></i></router-link>
                    </div>
                </dd>



                <!--                <dd>-->
                <!--                    <p><i class="uil uil-user-plus"></i></p>-->
                <!--                    <h2>Change Profile</h2>-->
                <!--                    <h3>프로필사진을 변경할 수 있어요.</h3>-->

                <!--                    <div><router-link to="#"><i class="uil uil-trash-alt"></i></router-link></div>-->
                <!--                </dd>-->
                <!--                <dd>-->
                <!--                    <p><i class="uil uil-image-plus"></i></p>-->
                <!--                    <h2>Change Banner</h2>-->
                <!--                    <h3>A_젬파이_01.png</h3>-->
                <!--                    <div><router-link to="#"><i class="uil uil-trash-alt"></i></router-link></div>-->
                <!--                </dd>-->
            </dl>
            <div class="ii-form">
                <!--                <ol>-->
                <!--                    <li>닉네임</li>-->
                <!--                    <li><input type="text" name="" title="" placeholder="" class="w100p" /></li>-->
                <!--                    <li><router-link to="#" class="btn-line-big w100p">변경</router-link></li>-->
                <!--                </ol>-->
                <ol>
                    <li>Email</li>
                    <li><input type="text" name="" title="" placeholder="" class="w100p" readonly
                               :value="user && user.name"/></li>
                    <li>&nbsp;</li>
                </ol>
                <ol>
                    <li>유저이름</li>
                    <li><input type="text" name="" title="" placeholder="" class="w100p" :value="user && user.name"/>
                    </li>
                    <li>
                        <router-link to="#" class="btn-line-big w100p">변경</router-link>
                    </li>
                </ol>
            </div>
        </div>
        <!-- 입력/수정 끝 -->


        <!-- 버튼영역 -->
        <div class="area-btn">
            <router-link to="#" class="btn-default w250">저장</router-link>
        </div>
        <!-- 버튼영역 끝 -->
        <div class="delete-account">
            <h2>계정삭제</h2>
            <div>
                <p>계정을 비활성화 하려면 <span><router-link :to="`/user/${this.$route.params.channel_id}/leave`">클릭</router-link></span>해주세요.
                </p>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import {mapGetters} from "vuex";

import Hexagon from "@/plugins/hexagon";
import ImgPreview from "@/components/common/upload/ImgPreview.vue";
import ProfileImgUploader from "@/components/common/upload/ProfileImgUploader.vue";
import BannerImgUploader from "@/components/common/upload/BannerImgUploader.vue";
import {User} from "@/types";
import {FileSizeCheck} from "@/script/fileManager";
import {bus} from "@/main";
import {FileLoader} from "@/script/fileLoader";

@Component({
    computed: {...mapGetters(["user"])},
    components: {
        ImgPreview,
        ProfileImgUploader,
        BannerImgUploader,
    },
})
export default class UserSettings extends Vue {
    private fileLoader: FileLoader = new FileLoader();
    private user!: any;
    private isCommentOn: boolean = false;
    private isLikeOn: boolean = false;
    private isFollowOn: boolean = false;
    private isMentionOn: boolean = false;
    private isRetweetOn: boolean = false;
    private isDmOn: boolean = false;

    private fileName: string = "";
    private prevProfile: string = ''

    private isUploadRun = false;

    private form = {
        // bannerImgSrc: "",
        profileImgSrc: "",
    };

    mounted() {
        this.prevProfile = this.user.picture
    }


    async switchOnOff(type: string) {
        if (type === "comment") {
            this.isCommentOn = !this.isCommentOn;
        }
        else if (type === "like") {
            this.isLikeOn = !this.isLikeOn;
        }
        else if (type === "follow") {
            this.isFollowOn = !this.isFollowOn;
        }
        else if (type === "mention") {
            this.isMentionOn = !this.isMentionOn;
        }
        else if (type === "retweet") {
            this.isRetweetOn = !this.isRetweetOn;
        }
        else if (type === "dm") {
            this.isDmOn = !this.isDmOn;
        }

        // await this.$api.alarmOnOff(type);
    }

    getProfileImgSrc(imgSrc: string) {
        this.form.profileImgSrc = imgSrc;
    }

    userInfo() {
        try {
            return this.user;
        }
        catch (error) {
        }
    }

    async leave() {
        await this.$router.push("/leave");
    }

    uploadFile() {
        (this.$refs.profileImg as HTMLElement).click();
    }

    onFileChange(event: { target: { files: any } }) {
        this.inputFile(event.target.files);
        this.fileName = event.target.files[0].name
    }

    inputFile(files: File) {
        if (FileSizeCheck(files[0], 5)) {
            this.fileLoader.getFileUrl(files[0], (e) => {
                this.prevProfile = e.target!.result;
                // bus.$emit("profileImgSrc", e.target!.result);
                // this.$emit("profileImgSrc", e.target!.result);
            });
        }
        else {
            alert("5mb 이하의 사진으로 업로드해주세요");
        }
        // let file = files[0];
        // this.filename = file.name;
    }

    deleteImg() {
        this.prevProfile = '';

    }
}
</script>

<style lang="scss" scoped>
.delete-account-btn {
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    align-items: center;
}

//
//.delete-div {
//    position: absolute;
//    top: 0;
//    right: 0;
//    margin: 10px 10px 0 0;
//}

.delete-btn {
    display: inline-block;
    width: 40px;
    height: 40px;
    padding-top: 8px;
    font-size: 20px;
    color: #fff;
    border-radius: 50%;
    background: #979797;
}

.delete-btn:hover {
    background: #F97316;
}

.delete-btn i {
    display: flex;
    justify-content: center;
}


</style>