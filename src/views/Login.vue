<template>
    <!--    <div class="landing">-->
    <div class="login-bg pt50 pb50 ">
        <div class="login-logo">
            <router-link to="/"><img src="../assets/images/zempie_logo.png" alt="" title=""/></router-link>
        </div>

        <div class="login-area">
            <div class="la-logo">
                <router-link to="#"><img src="../assets/images/logo.svg" width="140" alt="" title=""/></router-link>
            </div>
            <div class="la-title">
                <h3>젬파이에 오신것을 환영합니다.</h3>
                <p>젬파이 회원가입으로 다양한 혜택을 누려보세요!</p>
            </div>
            <div class="la-content">
                <b-form>
                    <b-form-group>
                        <b-form-input v-model="$v.form.email.$model" type="text"
                                      name="login-email"
                                      title=""
                                      placeholder="이메일 주소 또는 아이디"
                                      class="w100p h60"
                                      :state="login?validateState('email') :undefined"
                                      @keydown="checkLogin"/>

                        <!--                        <h2><i class="uil uil-check"></i> 이메일 주소를 입력하세요.</h2>-->
                        <b-form-invalid-feedback
                            v-if="!$v.form.email.emailValidator"
                        ><i class="uil uil-check"></i> 올바른 이메일 형식을
                            작성해주세요
                        </b-form-invalid-feedback
                        >
                        <b-form-invalid-feedback
                            v-if="!$v.form.email.required"
                        ><i class="uil uil-check"></i> 이메일을 입력해주세요
                        </b-form-invalid-feedback
                        >
                    </b-form-group>

                    <b-form-group>
                        <b-form-input v-model="$v.form.password.$model"
                                      :state="login ? validateState('password'): undefined"
                                      type="password"
                                      name="login-password"
                                      title="" placeholder="비밀번호를 입력하세요."
                                      class="w100p h60"
                                      @keydown="checkLogin">
                        </b-form-input>

                        <b-form-invalid-feedback
                            v-if="!$v.form.password.pwdValidator"
                        ><i class="uil uil-check"></i> 영문과 최소 1개의 숫자 혹은 특수 문자를
                            포함한 6~20자리 비밀번호를
                            입력해주세요.
                        </b-form-invalid-feedback>
                        <b-form-invalid-feedback
                            v-if="!$v.form.password.required"
                        ><i class="uil uil-check"></i> 비밀번호를 입력해주세요
                        </b-form-invalid-feedback>
                    </b-form-group>
                </b-form>
                <!--                <div>-->
                <!--                    <input type="checkbox" name="" title="" id="id-save"/> <label for="id-save"><i-->
                <!--                    class="uil uil-check"></i></label>&nbsp; <span><label for="id-save">아이디저장</label></span>-->
                <!--                    <input type="checkbox" name="" title="" id="auto-login"/> <label for="id-save"><i-->
                <!--                    class="uil uil-check"></i></label>&nbsp; <span><label for="auto-login">자동로그인</label></span>-->
                <!--                </div>-->
                <p><a  @click="login" class="btn-default-big">로그인</a></p>


                <dl>
                    <!--                    <dt>-->
                    <!--                        <router-link to="#">아이디찾기</router-link>-->
                    <!--                    </dt>-->
                    <!--                    <dd>|</dd>-->
                    <dt>
                        <router-link to="PasswordSearch">비밀번호 재설정</router-link>
                    </dt>
                    <dd>|</dd>
                    <dt>
                        <router-link to="join">회원가입</router-link>
                    </dt>
                </dl>
            </div>
            <div class="la-bottom">
                <dl>
                    <dt></dt>
                    <dd>또는 다른 서비스 계정으로 로그인</dd>
                    <dt></dt>
                </dl>
                <ul>
                    <!--                    <li>-->
                    <!--                        <router-link to="#"><img src="../assets/images/kakao_icon.png" alt="" title=""/></router-link>-->
                    <!--                    </li>-->
                    <li>
                        <img @click="google" src="../assets/images/google_icon.png" alt="" title=""/>
                    </li>
                    <!--                    <li>-->
                    <!--                        <router-link to="#"><img src="../assets/images/naver_icon.png" alt="" tile=""/></router-link>-->
                    <!--                    </li>-->
                    <!--                    <li>-->
                    <!--                        <router-link to="#"><img src="../assets/images/facebook_icon.png" alt="" title=""/>-->
                    <!--                        </router-link>-->
                    <!--                    </li>-->
                    <!--                    <li>-->
                    <!--                        <router-link to="#"><img src="../assets/images/twitter_icon.png" alt="" title=""/></router-link>-->
                    <!--                    </li>-->
                </ul>
                <p>
                    <span><i class="uil uil-info-circle" style="font-size:16px; line-height:24px;"></i></span> &nbsp;SNS계정으로
                    간편하게 가입하여 서비스를 이용하실 수 있습니다.
                </p>
            </div>
        </div>
        <modal
            name="noUser"
            centered
            hide-header
            no-close-on-backdrop
        >
            <div class="modal-text">
                작성하신 이메일로 비밀번호 재설정 메일을 보냈습니다.<br />메일함을
                확인해주세요.
            </div>
            <button class="btn-default"    @click="closeModal">OK</button>


        </modal>
    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from "vue-property-decorator";


import firebase from "firebase/app";
import {LoginState} from "@/store/modules/user";
import LoginManager from "@/script/login";
import {UrlHelper} from "@/script/util";

import {validationMixin} from "vuelidate";
import {required, minLength, maxLength} from "vuelidate/lib/validators";
import {helpers} from "vuelidate/lib/validators";

const emailValidator = helpers.regex(
    "emailValidator",
    /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
);

const pwdValidator = helpers.regex(
    "pwdValidator",
    /^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{6,20}$/
);
@Component({
    components: {},
    mixins: [validationMixin],
    validations: {
        form: {
            email: {
                required,
                emailValidator,
            },
            password: {
                required,
                pwdValidator,
                minLength: minLength(6),
                maxLength: maxLength(20),
            },
        },
    },
})
export default class Login extends Vue {
    private redirect: string = "";
    private form = {email: "", password: ""};

    private googleForm = {
        googleNickname: "@",
        googleUsername: "",
        googleEmail: "",
    };

    // private googleRegister: boolean = false;
    // private isClickedLoginBtn: boolean = false;
    private isGoolgeLoginDone: boolean = false;
    // private isClickedRegisterTab: boolean = false;

    // private googleBtn: string = "img/btn_google_signin_dark_normal_web.png";

    goolgeBtnHover() {
        // this.googleBtn = "img/btn_google_signin_dark_focus_web.png";
    }

    goolgeBtnOut() {
        // this.googleBtn = "img/btn_google_signin_dark_normal_web.png";
    }

    // vuelidate
    validateState(name) {
        const {$dirty, $error} = this.$v.form[name]!;
        return $dirty ? !$error : null;
    }

    //login enter key event
    checkLogin(event) {
        if (event.which === 13) {
            this.login();
        }
    }

    async login() {
        this.$v.form.$touch();
        if (this.$v.form.$anyError) {
            return;
        }

        try {
            const result = await firebase
                .auth()
                .signInWithEmailAndPassword(
                    this.form.email,
                    this.form.password
                );

            console.log('rest', result)

            // await this.$router.replace('/');

            if (result.user) {
                const token = await firebase.auth().currentUser!.getIdToken();
                this.$store.commit("idToken", token);

                const result = await Vue.$api.user();
                // if( result.error && result.error && result.error.message === '잘 못 된 유저 아이디입니다' ) {
                if (result?.error?.code === 20001) {
                    // alert( this.$t('login.joinError') as string );
                    this.$store.commit("loginState", LoginState.no_user);

                    // this.googleRegister = false;
                    // await this.$router.replace("/joinEmailContinue");
                    return;
                }

                const {user} = result;
                this.$store.commit("user", user);
                await LoginManager.login();
                // this.$store.commit('loginState', LoginState.login );

                if (this.$store.getters.redirectRouter) {
                    const router = this.$store.getters.redirectRouter;
                    this.$store.commit("redirectRouter", null);
                    await this.$router.replace(router);
                }
                else if (this.$store.getters.redirectUrl) {
                    const url = this.$store.getters.redirectUrl;
                    this.$store.commit("redirectUrl", null);
                    window.location.href = url;
                }
                else {
                    await this.$router.replace("/");
                }
            }
        }
        catch (e) {


            const code = e.code;
            // console.log(code);
            if (code) {
                switch (code) {
                    case "auth/wrong-password":
                        alert("잘못된 정보입니다. 다시 한 번 입력해주세요");
                        // this.passwordError = '잘못된 비밀번호 입니다. 다시 입력하세요.'
                        break;
                    case "auth/user-not-found":
                        this.$modal.show('noUser')
                        // alert(this.$t('login.firebaseError.userNotFound') as string);
                        break;
                    default:
                        // alert('잠시 후 다시 시도해주세요.');
                        break;
                }
            }
        }
    }

    async mounted() {

        //로그인
        const loginState = await this.$store.dispatch("loginState");
        switch (loginState) {
            case LoginState.login:
                // if(this.redirect) {
                //     window.location.href = this.redirect;
                // }
                // else {
                //     await this.$router.replace('/');
                // }

                await this.$router.replace("/");
                break;
        }

        this.redirect = UrlHelper.getParameterByName("z_redirect_url");

        if (this.redirect) {
            // console.log(this.redirect);
            this.$store.commit("redirectUrl", this.redirect);
        }
    }


    async google() {
        await this.$store.dispatch("loginState");

        const provider = new firebase.auth.GoogleAuthProvider();
        const result: any = await firebase.auth().signInWithPopup(provider);
        this.googleForm.googleUsername = result.user.displayName;
        this.googleForm.googleEmail = result.user.email;


        if (result.user) {
            const token = await firebase.auth().currentUser?.getIdToken();
            this.$store.commit("idToken", token);
            Vue.$api.user()
            .then(async (res:any)=>{
                const {user} = result;
                this.$store.commit("user", user);
                console.log("user", user);
                await LoginManager.login();
                // this.$store.commit('loginState', LoginState.login );
                // await this.$router.replace('/');
                if (this.$store.getters.redirectRouter) {
                    console.log(
                        "redirectRouter",
                        this.$store.getters.redirectRouter
                    );
                    const router = this.$store.getters.redirectRouter;
                    this.$store.commit("redirectRouter", null);
                    await this.$router.replace(router);
                }
                else if (this.$store.getters.redirectUrl) {
                    console.log("redirectUrl", this.$store.getters.redirectUrl);
                    const url = this.$store.getters.redirectUrl;
                    this.$store.commit("redirectUrl", null);
                    window.location.href = url;
                }
                else {
                    console.log("replace");
                    await this.$router.push(
                        `/channel/${this.$store.getters.user.uid}/timeline`
                    );
                }

            })
        .catch((err:any)=>{
            console.log('err',err)
            if (err.error.code === 20001) {
                this.$modal.show('example')
                // (this.$refs.googleRegisterBtn as any).click();
                // alert(this.$t("login.googleJoinError") as string);
                this.$store.commit("loginState", LoginState.no_user);
                this.$store.commit("googleAccountInfo", this.googleForm);
                 this.$router.replace("/join");
                return;
            }
            })

            // const result = await Vue.$api.user();
            // if( result.error && result.error && result.error.message === '잘 못 된 유저 아이디입니다' ) {



        }
    }



    findPwd() {
        document.getElementById("forgotPwdBtn")!.click();
        (this.$refs.forgotPwdBtn as any).click();
    }

    googleRegisterDone() {
        (this.$refs.registerBtn as any).click();
        this.isGoolgeLoginDone = !this.isGoolgeLoginDone;
    }
    closeModal(){
        this.$modal.hide('noUser')
    }
}
</script>

<style scoped lang="scss">

////.btn-default-big {
////    width: 100%;
////    border-radius: 30px;
////}
//
//.form-control {
//    margin: 10px 0 10px 0;
//}
//
//.form-control + .invalid-feedback {
//    display: none;
//    color: #999;
//}
//
//.is-invalid + .invalid-feedback {
//    font-size:12px;
//    display: inline-block;
//    color: red;
//}
//.modal-text{
//    display: flex;
//    justify-content: center;
//}
</style>
