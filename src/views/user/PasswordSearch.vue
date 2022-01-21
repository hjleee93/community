<template>
  <div class="login-bg pt50 pb50">


    <div class="login-logo">
      <router-link to="/login"><img src="../../assets/images/zempie_logo.png" alt="" title="" /></router-link>
    </div>

    <div class="pw-find">
      <div class="pf-title">
        <h3>비밀번호 찾기</h3>
        <p>비밀번호를 잊으셨나요?</p>
      </div>
      <div class="pf-content">
        <div><i class="uil uil-info-circle" style="font-size:16px; line-height:24px;"></i>&nbsp;&nbsp;비밀번호를 재설정하려는 계정(이메일)을 입력해주세요.</div>
        <ul>
          <li>
            <div>
                <input @keyup.enter="sendEmail" type="text"v-model="$v.email.$model" name="" title="" placeholder="이메일 주소 입력" class="w100p h60" /></div>
          </li>
        </ul>
        <p><button  @click="sendEmail" class="btn-default-big">이메일 전송</button></p>
      </div>
    </div>
      <!--   todo:모달 퍼블리싱 다 오면 수정-->


      <modal :clickToClose="false" class="modal-area-type" name="checkMailModal" width="90%" height="auto" :maxWidth="380"
             :scrollable="true"
             :adaptive="true">
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
                      <button class="btn-default" style="width: 100%" @click="closeModal">확인</button>
                  </div>
              </div>
          </div>
      </modal>

  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";


import firebase from "firebase/app";
import { LoginState } from "@/store/modules/user";

import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import { helpers } from "vuelidate/lib/validators";

const notExist = (value, vm) => {
    if (vm.submitError) {
        // clear error after 1st display
        const error = vm.submitError;
        vm.submitErrorMessage = error;
        vm.submitError = false;
        return false;
    }
    return true;
};

const emailValidator = helpers.regex(
    "emailValidator",
    /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
);

@Component({
    components: {},
    mixins: [validationMixin],
    validations: {
        email: {
            required,
            emailValidator,
            notExist,
        },
    },
})
export default class PasswordSearch extends Vue {
    private email: string = "";
    private show: boolean = false;

    async sendEmail(event) {
        //todo: 존재하는 이메일인지 아닌지확인

        event.preventDefault();
        this.$v.email.$touch();
        // if (this.$v.email.$anyError) {
        //     return;
        // }
        try {
            const result = await firebase
                .auth()
                .sendPasswordResetEmail(this.email);
            this.$modal.show('checkMailModal')
        } catch {
            // this.submitError = true;
        }
    }

    closeModal() {
        this.$modal.hide('checkMailModal')
        this.$router.push('/login')
    }

}
</script>

<style scoped>
.btn-default-big{
    width:100%; border-radius:30px;
}

.vue-modal{
    border-radius: 20px !important;
}
</style>
