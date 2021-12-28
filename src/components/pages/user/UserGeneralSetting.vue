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
                    <p :style="prevProfile ? `background: url(${prevProfile}) center center / cover no-repeat; background-size: cover;` :`background: url(${require('../../../assets/images/zempy.png')}) center center / cover no-repeat; background-size: cover;`  "></p>
                </dt>
                <!--                <div class="delete-div" @click="deleteImg">-->
                <!--                    <router-link class="delete-btn" to="#"><i class="uil uil-trash-alt"></i></router-link>-->
                <!--                </div>-->
                <dd @click="uploadFile">
                    <div style="height: 0px; overflow: hidden">
                        <input type="file"
                               @input="onFileChange"
                               accept=image/*
                               ref="profileImg"
                               name="fileInput"/>
                    </div>
                    <p><i class="uil uil-image-plus"></i></p>
                    <h2>Change Profile</h2>
                    <h3>{{ fileName }}</h3>
                    <div @click="deleteImg">
                        <a><i class="uil uil-trash-alt"></i></a>
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
                               :value="user && user.email"/></li>
                    <li>&nbsp;</li>
                </ol>
                <ol>
                    <li>유저이름</li>
                    <li><input type="text" name="" title="" readonly class="w100p" :value="user && user.name"/>
                    </li>
                    <!--                    <li>-->
                    <!--                        <router-link to="#" class="btn-line-big w100p">변경</router-link>-->
                    <!--                    </li>-->
                </ol>

            </div>
        </div>
        <!-- 입력/수정 끝 -->

        <!-- 버튼영역 -->
        <div class="area-btn">
            <a @click="uploadProfile" class="btn-default w250">저장</a>
        </div>
        <!-- 버튼영역 끝 -->
        <div class="delete-account">
            <h2>비밀 번호 번경</h2>
            <div>
                <p>비밀번호를 변경하시려면 <span><router-link :to="`/user/${this.$route.params.userUid}/changePwd`">클릭</router-link></span>해주세요.
                </p>
            </div>
        </div>
        <div class="delete-account">
            <h2>계정삭제</h2>
            <div>
                <p>계정을 비활성화 하려면 <span><router-link :to="`/user/${this.$route.params.userUid}/leave`">클릭</router-link></span>해주세요.
                </p>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from "vue-property-decorator";
import {mapGetters} from "vuex";

import Toast from "@/script/message";

@Component({
    computed: {...mapGetters(["user"])},
    components: {},
})
export default class UserGeneralSetting extends Vue {
    toast = new Toast();
    private user!: any;
    private isCommentOn: boolean = false;
    private isLikeOn: boolean = false;
    private isFollowOn: boolean = false;
    private isMentionOn: boolean = false;
    private isRetweetOn: boolean = false;
    private isDmOn: boolean = false;

    private fileName: string = "";
    private prevProfile: any = ''
    private updateFile: File | null = null;

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


    userInfo() {
        try {
            return this.user;
        }
        catch (error) {
        }
    }

    uploadFile() {
        (this.$refs.profileImg as HTMLElement).click();
    }

    onFileChange(event: { target: { files: any } }) {
        if (event.target.files[0].size < 1024 * 1024 * 3) {
            this.fileName = event.target.files[0].name
            this.updateFile = event.target.files[0]
            const reader = new FileReader();
            reader.onload = e => {
                this.prevProfile = e.target!.result
            };
            reader.readAsDataURL(event.target.files[0]);
        }
        else {
            alert(`최대 파일 크기는 3mb입니다. `)
        }

    }

    uploadProfile() {
        const formData = new FormData();
        if (this.updateFile) {
            formData.append('file', this.updateFile);
            formData.append('name', this.user.name)

            this.$api.updateUser(formData)
                .then(() => {
                    this.toast.successToast("계정 업데이트가 완료되었습니다.")
                    // this.$store.dispatch('userInfoUpdate', res.picture)
                    console.log(this.$store.getters.user.picture)

                    this.$store.commit('userInfoUpdate', {
                        picture: this.$store.getters.user.picture + `?t=${Date.now()}`
                    });
                })
        }else{
            formData.append('rm_picture', 'true');
            this.$api.updateUser(formData)
                .then(() => {
                    this.toast.successToast("계정 업데이트가 완료되었습니다.")
                    // this.$store.dispatch('userInfoUpdate', res.picture)
                    console.log(this.$store.getters.user.picture)

                    this.$store.commit('userInfoUpdate', {
                        picture: this.$store.getters.user.picture + `?t=${Date.now()}`
                    });
                })
        }

    }

    deleteImg(e) {
        this.prevProfile = '';
        this.fileName = '';
        e.stopPropagation()

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