<template>
    <div>
        <div class="info-input">
            <div class="ii-title">
                <h2>비밀번호 변경</h2>
                <h3>&nbsp;비밀번호를 재설정하려는 계정(이메일)을 입력해주세요.</h3>
            </div>
            <dl class="ii-card">

                <div>
                    <input @keyup.enter="sendEmail" type="text" v-model="email" name="" title="" placeholder="이메일 주소 입력"
                           @input="isEmailErr=false"
                           class="w100p h60"/>
                    <p :class="isEmailErr?'email-error':'email-no-error'">올바른 이메일 주소를 입력해주세요</p>
                </div>

                <p>
                    <button @click="sendEmail" class="btn-default-big">이메일 전송</button>
                </p>
            </dl>
        </div>

        <modal :clickToClose="false" class="modal-area-type" name="checkMailModal" width="90%" height="auto"
               :maxWidth="380"
               :adaptive="true"
               :scrollable="true">
            <div class="modal-alert">
                <dl class="ma-header">
                    <dt>안내</dt>
                    <dd>
                        <button @click="$modal.hide('checkMailModal')"><i class="uil uil-times"></i></button>
                    </dd>
                </dl>
                <div class="ma-content">
                    <h2>작성하신 이메일로 비밀번호 재설정 메일을 보냈습니다.<br/>메일함을 확인해주세요</h2>
                    <div>
                        <button class="btn-default" style="width: 100%" @click="$modal.hide('checkMailModal')">확인
                        </button>
                    </div>
                </div>
            </div>
        </modal>
    </div>

</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import firebase from "firebase";
import {mapGetters} from "vuex";

@Component({
    components: {},
    computed: {...mapGetters(["user"])},
})
export default class ChangePwd extends Vue {
    user!: any;
    email = '';
    isEmailErr = false;

    async sendEmail() {

        if (this.email === this.user.email) {
            try {
                const result = await firebase
                    .auth()
                    .sendPasswordResetEmail(this.email);
                this.$modal.show('checkMailModal')
            }
            catch {
                // this.submitError = true;
            }
        }
        else {
            this.isEmailErr = true;
        }
    }

}
</script>

<style scoped lang="scss">
.ii-card {
    div {
        width: 100%;
        margin-bottom: 16px;
    }

    p {
        width: 100%;
        display: flex;
        justify-content: flex-end;
    }
}

.email-no-error {
    display: none !important;
}

.email-error {
    margin-top: 10px;
    display: inline-block !important;
    color: #c5292a;
    justify-content: left !important;

}

</style>
