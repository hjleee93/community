<template>
    <div class="login-bg pt50 pb50">
        <div class="login-logo">
            <router-link to="/login"><img src="../../assets/images/zempie_logo.png" alt="" title=""/></router-link>
        </div>

        <div class="login-join">
            <div class="lj-logo">
                <router-link to="/login"><img src="../../assets/images/logo.svg" width="140" alt="" title=""/>
                </router-link>
            </div>
            <div class="lj-title">
                <h3>{{ $t('join')}}</h3>
                <p>{{ $t('join.text1')}}</p>
            </div>
            <form class="lj-content" @submit="register">
                <ul>
                    <li>
                        <b-form-group>
                            <b-form-input type="text" name="register-email"
                                          v-model="$v.form.email.$model"
                                          :state=" register
                                        ? validateState('email')
                                        : undefined
                                "
                                          :placeholder="$t('login.email.placeholder')"
                                          :readonly="isEmailReadOnly"
                                          class="w100p h60"/>
                            <span></span>
                            <h3>
                                <b-form-invalid-feedback
                                    v-if="!$v.form.email.emailValidator"
                                ><i class="uil uil-check"></i> {{ $t('login.email.format.err')}}
                                </b-form-invalid-feedback
                                >
                                <b-form-invalid-feedback
                                    v-if="!$v.form.email.required"
                                ><i class="uil uil-check"></i>{{ $t('login.empty.email')}}
                                </b-form-invalid-feedback
                                >
                            </h3>
                        </b-form-group>
                    </li>
                    <li>
                        <b-form-group>
                            <b-form-input type="password" name="register-password"
                                          v-model="$v.form.password.$model"
                                          :state="
                                    register
                                        ? validateState('password')
                                        : undefined
                                " title="" placeholder="비밀번호" class="w100p h60"/>
                            <!--                        <h2><i class="uil uil-check"></i> 비밀번호는 8~20자 이내로 영문 대소문자, 숫, 특수문자 중 3가지 이상 혼용하여 입력해주세요.</h2>-->
                            <span></span>
                            <h3>
                                <b-form-invalid-feedback
                                    v-if="!$v.form.password.required"
                                ><i class="uil uil-check"></i> 비밀번호를 입력해주세요
                                </b-form-invalid-feedback>
                                <b-form-invalid-feedback
                                    v-if="!$v.form.password.pwdValidator"
                                ><i class="uil uil-check"></i> 영문과 최소 1개의 숫자 혹은 특수 문자를 포함한
                                    6~20자리 비밀번호를 입력해주세요.
                                </b-form-invalid-feedback>
                            </h3>
                        </b-form-group>
                    </li>
                    <li>
                        <b-form-group>
                            <b-form-input type="password" name="register-repeat-password"
                                          v-model="$v.form.repeatPassword.$model"
                                          :state="
                                    register
                                        ? validateState('repeatPassword')
                                        : undefined
                                " title=""
                                          :placeholder="$t('login.pwd.placeholder')"
                                          class="w100p h60 "></b-form-input>
                            <!--                            class success-->
                            <span></span>
                            <h3>
                                <b-form-invalid-feedback
                                    v-if="!$v.form.repeatPassword.required"
                                ><i class="uil uil-check"></i> {{ $t('login.empty.pwd') }}
                                </b-form-invalid-feedback>
                                <b-form-invalid-feedback
                                    v-if="!$v.form.repeatPassword.sameAsPassword"
                                ><i class="uil uil-check"></i> {{ $t('pwd.check.err') }}
                                </b-form-invalid-feedback>
                            </h3>

                            <!--                            <h4><i class="uil uil-check"></i> 비밀번호 확인 되였습니다.</h4>-->
                        </b-form-group>
                    </li>
                    <li>
                        <b-form-group>
                            <b-form-input type="text" name="register-username"
                                          v-model="$v.form.username.$model"
                                          :state="
                                    register
                                        ? validateState('username')
                                        : undefined
                                " title=""
                                          :placeholder="$t('name')"
                                          :readonly="isNameReadOnly"
                                          class="w100p h60"></b-form-input>
                            <span></span>
                            <h3>
                                <b-form-invalid-feedback
                                    v-if="!$v.form.username.required"
                                ><i class="uil uil-check"></i> {{ $t('join.name.empty.err')}}
                                </b-form-invalid-feedback>
                                <b-form-invalid-feedback
                                    v-if="!$v.form.username.maxLength"
                                ><i class="uil uil-check"></i>{{ $t('join.name.format.err')}}
                                </b-form-invalid-feedback>
                            </h3>
                            <!--                            <h2><i class="uil uil-check"></i> 실명을 입력하세요.</h2>-->
                        </b-form-group>
                    </li>
                    <!--                    todo:백엔드에 닉네임 추가후 입력 -->
<!--                    <li>-->
<!--                        <b-form-group>-->
<!--                            <b-form-input type="text" name="register-nickname"-->
<!--                                          v-model="$v.form.nickname.$model"-->
<!--                                          :state="-->
<!--                                    register-->
<!--                                        ? validateState('nickname')-->
<!--                                        : undefined"-->
<!--                                          @focusout="checkNickname"-->
<!--                                          @input="watchNickname"-->
<!--                                          placeholder="닉네임"-->
<!--                                          :readonly="isNameReadOnly"-->
<!--                                          class="w100p h60"></b-form-input>-->
<!--                            <span></span>-->
<!--                            <h3>-->
<!--                                <b-form-invalid-feedback-->
<!--                                    v-if="!$v.form.nickname.required"-->
<!--                                ><i class="uil uil-check"></i>닉네임은 최소 두글자 이상입력해주세요-->
<!--                                </b-form-invalid-feedback>-->
<!--                                <b-form-invalid-feedback-->
<!--                                    v-if="!$v.form.nickname.maxLength"-->
<!--                                ><i class="uil uil-check"></i>닉네임은 20글자 이내로 작성해주세요.-->
<!--                                </b-form-invalid-feedback>-->
<!--                            </h3>-->
<!--                            <h3 :style="isDuplicatedNickname ? 'display:block;' : 'display:none;'">-->
<!--                                <i class="uil uil-check"></i>중복된 닉네임입니다.-->
<!--                            </h3>-->
<!--                        </b-form-group>-->
<!--                    </li>-->
                </ul>
                <div class="login-agreement-container">

                    <div class="lam-content">
                        <ul>
                            <!--                            <li>-->
                            <!--                                <dl>-->
                            <!--                                    <dt>-->
                            <!--                                        <input @click="allAgree" type="checkbox" name="" title="" id="agree1"-->
                            <!--                                               v-model="allAgreement"/>-->
                            <!--                                        <label for="agree1"><i class="uil uil-check"></i></label>&nbsp;-->
                            <!--                                        <span><label for="agree1">네 모두 동의합니다.</label></span>-->
                            <!--                                    </dt>-->
                            <!--                                    <dd></dd>-->

                            <!--                                </dl>-->
                            <!--                            </li>-->


                            <li>
                                <dl>
                                    <dt>
                                        <input type="checkbox" name="reportReason"
                                               v-model="form.policyAgreement1" title="" id="agree2"
                                               @click="agreement1"/>
                                        <label for="agree2"><i class="uil uil-check"></i></label>&nbsp;
                                        <span><label for="agree2"
                                                     style="text-decoration:underline;">{{ $t('terms')}} ({{ $t('required')}})</label></span>
                                    </dt>
                                    <dd>
                                        <router-link :to="`/${$i18n.locale}/terms`" target="_blank">{{ $t('view')}}</router-link>
                                    </dd>
                                </dl>
                            </li>
                            <h3 :class="errorAgree1 ?'error-agree1' :'agree1'"><i class="uil uil-check"></i>{{ $t('agreement.text')}}</h3>

                        </ul>

                    </div>

                </div>
                <p>
                    <a @click="register" class="btn-default-big">{{ $t('join')}}</a>
                </p>
                <!--                <dl>
                                    <dt></dt>
                                    <dd>또는 다른 서비스 계정으로 로그인</dd>
                                    <dt></dt>
                                </dl>-->
            </form>
            <!--            <div class="lj-bottom">-->
            <!--                <dl @click="google">-->
            <!--                    <dt><img src="../../assets/images/google_icon.svg" alt=""></dt>-->
            <!--                    <dd>구글 계정으로 가입</dd>-->
            <!--                    <dt></dt>-->
            <!--                </dl>-->
            <!--                <p><i class="uil uil-info-circle" style="font-size:16px; line-height:24px;"></i> &nbsp;SNS계정으로 간편하게 가입하여-->
            <!--                    서비스를 이용하실 수 있습니다.</p>-->
            <!--            </div>-->
        </div>


    </div>
</template>

<script lang="ts">
import {Component, Vue, Watch} from "vue-property-decorator";
import {LoginState} from "../../store/modules/user";
import firebase from "firebase";
import LoginManager from "../../script/login";
import {helpers, maxLength, minLength, required, sameAs} from "vuelidate/lib/validators";
import {validationMixin} from "vuelidate";

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
            repeatPassword: {
                required,
                sameAsPassword: sameAs("password"),
            },
            username: {
                required,
                maxLength: maxLength(12),
            },
            // nickname: {
            //     required,
            //     maxLength: maxLength(20),
            //
            // },
        },
    },
})
export default class Login extends Vue {
    private form = {
        email: "",
        password: "",
        username: "",
        nickname: "",
        repeatPassword: "",
        policyAgreement1: false
    };
    isEmailReadOnly = false;
    isNameReadOnly = false;

    errorAgree1 = false;
    allAgreement = false;

    isDuplicatedNickname = false;

    async mounted() {
        const loginState = await this.$store.dispatch("loginState");

        switch (loginState) {
            case LoginState.login:
                await this.$router.replace("/").catch(() => {
                });
                return;
        }

    }


    beforeDestroy() {
        this.isEmailReadOnly = false;
        this.isNameReadOnly = false;
    }

    // vuelidate
    validateState(name) {
        const {$dirty, $error} = this.$v.form[name]!;
        return $dirty ? !$error : null;
    }
    @Watch('this.form.nickname')
    watchNickname(){
        if(this.form.nickname.length === 0)
        this.isDuplicatedNickname = false;
    }

    checkNickname(){
        this.$api.hasNickname(this.form.nickname)
        .then((res:any)=>{
            if(res.result === true){
                this.isDuplicatedNickname = true;
            }else{
                this.isDuplicatedNickname = false;
            }
        })
    }

    async register(event) {
        event.preventDefault();
        this.$v.form.$touch();
        let isReturn = false;
        if (this.$v.form.$anyError) {
            isReturn = true;
        }
        if (!this.form.policyAgreement1) {
            isReturn = true;
            this.errorAgree1 = true;
        }
        if(this.isDuplicatedNickname) {
            this.isDuplicatedNickname = true;
            isReturn = true;
        }

        if (isReturn) return;


        try {
            await firebase
                .auth()
                .createUserWithEmailAndPassword(
                    this.form.email,
                    this.form.password
                );
            const currentUser = firebase.auth().currentUser;
            const idToken = await currentUser!.getIdToken();

            this.$store.commit("idToken", idToken);

            this.joinZempie();

            // const obj={
            //     name:this.form.username,
            //     // nickname:this.form.nickname
            // }
            //
            // this.$api.signUp(obj)
            // .then(async (result:any)=>{
            //     const {user} = result;
            //     this.$store.commit("user", user);
            //     await LoginManager.login();
            //     // await this.$router.replace('/');
            //
            //     if (this.$store.getters.redirectRouter) {
            //         const router = this.$store.getters.redirectRouter;
            //         this.$store.commit("redirectRouter", null);
            //         await this.$router.replace(router).catch(() => {
            //         });
            //     }
            //     else if (this.$store.getters.redirectUrl) {
            //         const url = this.$store.getters.redirectUrl;
            //         this.$store.commit("redirectUrl", null);
            //         window.location.href = url;
            //     }
            //     else {
            //         await this.$router.replace("/").catch(() => {
            //         });
            //     }
            // })
            // .catch((result:any)=>{
            //     if (result?.error?.code === 40101) {
            //         alert("사용할 수 없는 이름입니다");
            //         // todo 닉네임 필터 에러 처리
            //         // alert(this.$t('join.joinNicknameError'));
            //     }
            //     else {
            //         console.error((result && result.error) || "error");
            //         result && result.error && alert(result.error.message);
            //     }
            // })

        }
        catch (error) {
            const code = error.code;
            if (code) {
                switch (code) {
                    case 'auth/wrong-password' :
                        alert(`${this.$t('wrong.pwd')}`)
                        break;
                    case 'auth/user-not-found' :
                        alert(`${this.$t('login.email.fail')}`)
                        break;
                    case 'auth/email-already-in-use':
                        const result = await this.$api.hasEmail(this.form.email)
                        if(result === true){
                            alert(`${this.$t('joined.email')}`)
                        }else{
                            this.joinZempie();
                        }
                        break;
                }
            }
        }
    }

    /**
     * zempie db 등록
     */
    joinZempie(){
        const obj={
            name:this.form.username,
            // nickname:this.form.nickname
        }

        this.$api.signUp(obj)
            .then(async (result:any)=>{
                const {user} = result;
                this.$store.commit("user", user);
                await LoginManager.login();
                // await this.$router.replace('/');

                if (this.$store.getters.redirectRouter) {
                    const router = this.$store.getters.redirectRouter;
                    this.$store.commit("redirectRouter", null);
                    await this.$router.replace(router).catch(() => {
                    });
                }
                else if (this.$store.getters.redirectUrl) {
                    const url = this.$store.getters.redirectUrl;
                    this.$store.commit("redirectUrl", null);
                    window.location.href = url;
                }
                else {
                    await this.$router.replace("/").catch(() => {
                    });
                }
            })
            .catch((result:any)=>{
                if (result?.error?.code === 40101) {
                    alert(`${this.$t('name.err.text')}`);
                    // todo 닉네임 필터 에러 처리
                    // alert(this.$t('join.joinNicknameError'));
                }
                else {
                    console.error((result && result.error) || "error");
                    result && result.error && alert(result.error.message);
                }
            })
    }

    agreement1() {
        if (this.form.policyAgreement1) {
            this.errorAgree1 = true;
        }
        else {
            this.errorAgree1 = false;
        }

    }

    allAgree() {
        if (this.allAgreement) {
            this.form.policyAgreement1 = false;
            // this.form.policyAgreement2 = false;
            this.errorAgree1 = true;
            // this.errorAgree2 = true;
        }
        else {
            this.form.policyAgreement1 = true;
            // this.form.policyAgreement2 = true;
            this.errorAgree1 = false;
            // this.errorAgree2 = false;
        }


    }


}
</script>

<style lang="scss" scoped>

/*약관 동의*/
.lam-content h3 {
    color: #C5292A;
}

.agree1 {
    display: none !important;
}

.error-agree1 {
    display: inline-block !important;
    font-size: 12px !important;
    color: #C5292A !important;
}

.form-control + span + h3, .form-control + span + h2 {
    display: none;
    color: #999;
}

.is-invalid + span + h3, .form-control + span + h2 {
    font-size: 12px;
    display: inline-block;
    color: #C5292A;
}

.login-agreement-container .lam-content > ul {
    margin-top: 40px;
    padding: 23px 0px;
    border-top: 1px solid #f1f1f1;
    border-bottom: 1px solid #f1f1f1;
}

.login-agreement-container .lam-content > ul > li {
    margin: 7px 0;
    padding: 15px;
    border: 1px solid #e5e5e5;
    border-radius: 5px;
}

.login-agreement-container .lam-content > ul > li:first-child {
    padding: 13px 15px;
    background-color: #f1f1f1;
    box-shadow: 0px 1px 2px rgba(50, 50, 71, 0.08), 0px 0px 1px rgba(50, 50, 71, 0.2);
}

.login-agreement-container .lam-content > ul > li > dl {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.login-agreement-container .lam-content > ul > li > dl > dt > span {
    color: #333;
}

.login-agreement-container .lam-content > ul > li > dl > dd {
    color: #333;
}

.login-agreement-container .lam-content > p {
    margin-top: 40px;
    text-align: center;
}

.login-agreement-container .lam-content > p a {
    width: 100%;
    border-radius: 30px;
}

@media all and (max-width: 479px) {
    .login-agreement-container {
        position: relative;
        top: 0;
        left: 0;
        width: 100%;
        padding: 40px 20px;
        background: #fff;
        border-radius: 0;
        transform: translate(0, 0);
    }

    .login-agreement-container .lam-logo {
        display: block;
    }

    .login-agreement-container .lam-title > h3 {
        font-size: 20px;
        line-height: 20px;
    }

    .login-agreement-container .lam-title > p {
        font-size: 14px;
        line-height: 14px;
    }

    .login-agreement-container .lam-content {
        margin-top: 15px;
        padding-top: 15px;
    }

    .login-agreement-container .lam-content > p {
        margin-top: 20px;
    }
}

@media all and (min-width: 480px) and (max-width: 767px) {
    .login-agreement-container {
        position: relative;
        top: 0;
        left: 0;
        width: 100%;
        padding: 40px 20px;
        background: #fff;
        border-radius: 0;
        transform: translate(0, 0);
    }

    .login-agreement-container .lam-logo {
        display: block;
    }

    .login-agreement-container .lam-title > h3 {
        font-size: 20px;
        line-height: 20px;
    }

    .login-agreement-container .lam-title > p {
        font-size: 14px;
        line-height: 14px;
    }

    .login-agreement-container .lam-content {
        margin-top: 15px;
        padding-top: 15px;
    }

    .login-agreement-container .lam-content > p {
        margin-top: 20px;
    }
}
</style>
