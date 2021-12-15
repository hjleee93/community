<template>
    <div>
        <div class="delete-account">
            <h2>계정삭제</h2>
            <ul>
                <li>
                    <h3>회원 재가입 제한</h3>
                    <p>회원탈퇴 후 재가입 시 신규회원으로 가입되며, 탈퇴 전의 회원정보, 주문정보, 마일리지, 쿠폰은 복원되지 않습니다. <br/>사이트 정책에 따라 최대 30일 동안 회원 재가입이 불가능합니다.</p>
                </li>
                <li>
                    <h3>개인정보 파기</h3>
                    <p>개인정보는 회원 재가입 유예기간 경과 후 즉시 파기됩니다.<br/>
                        단, 전자상거래법, 통신비밀보호법 등 관련 법령의 규정에 의하여 아래의 개인정보가 일정기간 보관됩니다.</p>
                </li>
                <li>
                    <h3>탈퇴 사유 및 개선점(선택)</h3>
                    <h4>
                        <input v-model="reason" type="text"/>
                    </h4>
                </li>
                <li>
                    <div>
                        <input type="checkbox"  v-model="check1" id="agree"/> <label for="agree"><i class="uil uil-check"></i></label><span>회원탈퇴 유의사항을 모두 확인하였으며 회원 탈퇴에 동의합니다.</span>
                    </div>
                </li>
            </ul>
<!--           todo:모달 혹은 확인창 필요하고 @click="leave(true)"-->
            <p><a   class="btn-default w200" @click="openModal">계정삭제</a></p>
        </div>
        <modal :clickToClose="false" class="modal-area-type" name="deleteAccount" width="90%" height="auto"
               :maxWidth="380"
               :adaptive="true">
            <div class="modal-alert">
                <dl class="ma-header">
                    <dt>안내</dt>
                    <dd>
                        <button @click="$modal.hide('deleteAccount')"><i class="uil uil-times"></i></button>
                    </dd>
                </dl>
                <div class="ma-content">
                    <h2> 정말 젬파이를 떠나시겠습니까? </h2>
                    <div>
                        <button class="btn-default w48p" @click="leave(true)">네</button>
                        <button class="btn-gray w48p" @click="$modal.hide('deleteAccount')">아니오</button>
                    </div>
                </div>
            </div>
        </modal>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import { LoginState } from "@/store/modules/user";
import Login from "@/script/login";

@Component({
    components: {},
})
export default class Leave extends Vue {
     reason: string = "";
     check1: boolean = false;
     check2: boolean = false;

    async mounted() {
        const loginState = await this.$store.dispatch("loginState");
        switch (loginState) {
            case LoginState.login:
                return;
        }
    }

    async leave(state: boolean) {
        if (state) {
            const result = await this.$api.leave(this.reason);
            if (!result || result.error) {
                result && result.error && alert(result.error.message);
                console.error((result && result.error) || "error");
            } else {
                await Login.logout();
                await this.$router.push("/");
            }
            console.log(result);
        }
    }
    openModal(){
        if(!this.check1) {
            alert('회원 탈퇴에 동의해주세요')
        }else{
            this.$modal.show('deleteAccount')
        }
    }
}
</script>
<style lang="scss" scoped>
.textColor {
    color: #b7b7b7;
}
.list {
    padding-left: 18px;
}
li {
    color: #b7b7b7;
    list-style: none;
}
.leave-reason {
    border-bottom: 1px solid #3f485f !important;
    border-top: none !important;
    border-left: none !important;
    border-right: none !important;
    border-radius: 0% !important;
}
input[type="text"]:focus {
    box-shadow: none !important;
}
.delete-account-btn {
    button {
        width: 15% !important;
    }
}

.checkbox-wrap input[type="checkbox"]:checked + .checkbox-box .icon-check,
.checkbox-wrap input[type="radio"]:checked + .checkbox-box .icon-check {
    fill: #ffffff;
}
.checkbox-wrap .checkbox-box .icon-check {
    fill: transparent;
    transition: fill 0.2s ease-in-out;
}
</style>
