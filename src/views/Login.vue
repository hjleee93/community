<template>
    <!--    <div class="landing">-->
    <div class="login-bg pt50 pb50 ">
        <div class="login-logo">
            <router-link to="/landing"><img src="../assets/images/zempie_logo.png" alt="" title=""/></router-link>
        </div>

        <div class="login-area">
            <div class="la-logo">
                <router-link to="#"><img src="../assets/images/logo.svg" width="140" alt="" title=""/></router-link>
            </div>
            <div class="la-title">
                <h3>{{ $t('login.text1') }}</h3>
                <p>{{ $t('login.text2') }}</p>
            </div>
            <div class="la-content">
                <b-form>
                    <b-form-group>
                        <b-form-input v-model="$v.form.email.$model" type="text"
                                      name="login-email"
                                      title=""
                                      :placeholder="$t('login.email.placeholder')"
                                      class="w100p h60"
                                      :state="login?validateState('email') :undefined"
                                      @keydown="checkLogin"/>

                        <!--                        <h2><i class="uil uil-check"></i> 이메일 주소를 입력하세요.</h2>-->
                        <b-form-invalid-feedback
                            v-if="!$v.form.email.emailValidator"
                        ><i class="uil uil-check"></i>
                            {{ $t('login.email.format.err') }}
                        </b-form-invalid-feedback
                        >
                        <b-form-invalid-feedback
                            v-if="!$v.form.email.required"
                        ><i class="uil uil-check"></i> {{ $t('login.empty.email') }}
                        </b-form-invalid-feedback
                        >
                    </b-form-group>

                    <b-form-group>
                        <b-form-input v-model="$v.form.password.$model"
                                      :state="login ? validateState('password'): undefined"
                                      type="password"
                                      name="login-password"
                                      title=""
                                      :placeholder="$t('login.pwd.placeholder')"
                                      class="w100p h60"
                                      @keydown="checkLogin">
                        </b-form-input>

                        <b-form-invalid-feedback
                            v-if="!$v.form.password.pwdValidator"
                        ><i class="uil uil-check"></i>
                            {{ $t('login.pwd.format.err') }}
                        </b-form-invalid-feedback>
                        <b-form-invalid-feedback
                            v-if="!$v.form.password.required"
                        ><i class="uil uil-check"></i>
                            {{ $t('login.empty.pwd') }}
                        </b-form-invalid-feedback>
                    </b-form-group>
                </b-form>
                <!--                <div>-->
                <!--                    <input type="checkbox" name="" title="" id="id-save"/> <label for="id-save"><i-->
                <!--                    class="uil uil-check"></i></label>&nbsp; <span><label for="id-save">아이디저장</label></span>-->
                <!--                    <input type="checkbox" name="" title="" id="auto-login"/> <label for="id-save"><i-->
                <!--                    class="uil uil-check"></i></label>&nbsp; <span><label for="auto-login">자동로그인</label></span>-->
                <!--                </div>-->
                <p><a @click="login" class="btn-default-big">{{ $t('login') }}</a></p>


                <dl>
                    <!--                    <dt>-->
                    <!--                        <router-link to="#">아이디찾기</router-link>-->
                    <!--                    </dt>-->
                    <!--                    <dd>|</dd>-->
                    <dt>
                        <router-link to="PasswordSearch">{{ $t('reset.pwd') }}</router-link>
                    </dt>
                    <dd>|</dd>
                    <dt>
                        <router-link :to="`/${$i18n.locale}/join`">{{ $t('join') }}</router-link>
                    </dt>
                </dl>
            </div>
            <div class="la-bottom">
                <dl>
                    <dt></dt>
                    <dd>{{ $t('login.text3') }}</dd>
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
                    <span><i class="uil uil-info-circle" style="font-size:16px; line-height:24px;"></i></span>
                    {{ $t('login.text4') }}&nbsp;
                </p>
            </div>
        </div>


        <modal :clickToClose="false" class="modal-area-type" name="noUser" width="90%" height="auto" :maxWidth="380"
               :adaptive="true"
               :scrollable="true">
            <div class="modal-alert">
                <dl class="ma-header">
                    <dt>{{ $t('information') }}</dt>
                    <dd>
                        <button @click="$modal.hide('noUser')"><i class="uil uil-times"></i></button>
                    </dd>
                </dl>
                <div class="ma-content">
                    <h2>{{ $t('login.err.text1') }}</h2>
                    <div>
                        <button class="btn-default" @click="closeModal">{{ $t('confirm') }}확인</button>
                    </div>
                </div>
            </div>
        </modal>

        <modal :clickToClose="false" class="modal-area-type" name="wrongInfo" width="90%" height="auto" :maxWidth="380"
               :adaptive="true"
               :scrollable="true">
            <div class="modal-alert">
                <dl class="ma-header">
                    <dt>{{ $t('information') }}</dt>
                    <dd>
                        <button @click="$modal.hide('wrongInfo')"><i class="uil uil-times"></i></button>
                    </dd>
                </dl>
                <div class="ma-content">
                    <h2>{{ $t('login.err.text2') }}</h2>
                    <div>
                        <button class="btn-default" @click="$modal.hide('wrongInfo')">{{ $t('confirm') }}</button>
                    </div>
                </div>
            </div>
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

    // private googleRegister: boolean = false;
    // private isClickedLoginBtn: boolean = false;
    private isGoolgeLoginDone: boolean = false;
    // private isClickedRegisterTab: boolean = false;

    // private googleBtn: string = "img/btn_google_signin_dark_normal_web.png";


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
                    await this.$router.replace('/');
                }
            }
        }
        catch (e) {


            const code = e.code;
            // console.log(code);
            if (code) {
                switch (code) {
                    case "auth/wrong-password":
                        this.$modal.show('wrongInfo')
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

                await this.$router.replace('/');
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



        if (result.user) {
            const token = await firebase.auth().currentUser?.getIdToken();
            this.$store.commit("idToken", token);
            Vue.$api.user()
                .then(async (res: any) => {
                    const {user} = res;
                    this.$store.commit("user", user);
                    await LoginManager.login();
                    // this.$store.commit('loginState', LoginState.login );
                    // await this.$router.replace('/');
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

                        await this.$router.push(`/${this.i18n.locale}/channel/${this.$store.getters.user.channel_id}/timeline`
                        );
                    }

                })
                .catch((err: any) => {
                    if (err.error.code === 20001) {
                        this.$store.commit("loginState", LoginState.no_user);
                        this.$router.replace(`/${this.i18n.locale}/googleJoin`);
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

    closeModal() {
        this.$modal.hide('noUser')
    }
}
</script>

<style scoped lang="scss">

//.btn-default-big {
//    width: 100%;
//    border-radius: 30px;
//}

.btn-default {
    width: 100%;
}

.form-control {
    margin: 10px 0 10px 0;
}

.form-control + .invalid-feedback {
    display: none;
    color: #999;
}

.is-invalid + .invalid-feedback {
    font-size: 12px;
    display: inline-block;
    color: red;
}

.modal-text {
    display: flex;
    justify-content: center;
}
</style>
