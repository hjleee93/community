<template>
    <div>
        <div class="delete-account">
            <h2>계정삭제</h2>
            <ul>
                <li>
                    <h3>회원 재가입 제한</h3>
                    <p>- 탈퇴 후 재가입 시 신규 회원으로 가입되며, 탈퇴 전의 정보는 복원되지 않습니다.</p>

                    <p>- 커뮤니티 서비스에 등록한 포스팅은 탈퇴 후에도 남아있으므로 아이디 탈퇴 전 반드시 비공개 처리하거나 삭제해 주시기 바랍니다.</p>

                    <p>- 매니저로 계신 커뮤니티가 존재하여도 회원 탈퇴가 가능하니 탈퇴 전 반드시 매니저 위임을 진행해 주셔야 합니다.</p>

                    <p>- 사이버 머니가 남아있을 시, 탈퇴 정책에 의해 환불에 따른 수수료 지급 및 소액 잔액 미환급 등의 불이익이 있을 수 있습니다.</p>
                </li>
                <li>
                    <h3>개인정보 파기</h3>
                    <p>- 탈퇴 신청 후 3일의 유예 기간 동안 개인정보를 임시 보관하게 되며, 유예 기간 이후에는 회사의 회원 정보 는 즉시 파기됩니다.</p>
                    <p>- 관계 법령의 규정에 의하여 보관할 필요가 있는 경우 회사는 수집 및 이용 목적 달성 후에도 관계 법령에서 정한 일정 기간 동안 회원의 개인정보를 보관할 수 있습니다.</p>
                </li>
                <li>
                    <h3>탈퇴 사유 및 개선점(선택)</h3>
                    <h4>
                        <input v-model="reason" type="text"/>
                    </h4>
                </li>
                <li>
                    <div>
                        <input type="checkbox" v-model="check1" id="agree"/> <label for="agree"><i
                        class="uil uil-check"></i></label><span>회원탈퇴 유의사항을 모두 확인하였으며 회원 탈퇴에 동의합니다.</span>
                    </div>
                </li>
            </ul>
            <!--           todo:모달 혹은 확인창 필요하고 @click="leave(true)"-->
            <p><a class="btn-default w200" @click="openModal">계정삭제</a></p>
        </div>
        <modal :clickToClose="false" class="modal-area-type" name="deleteAccount" width="90%" height="auto"
               :maxWidth="380"
               :adaptive="true"
               :scrollable="true">
            <div class="modal-alert">
                <dl class="ma-header">
                    <dt>안내</dt>
                    <dd>
                        <button @click="$modal.hide('deleteAccount')"><i class="uil uil-times"></i></button>
                    </dd>
                </dl>
                <div class="ma-content">
                    <h2> 회원탈퇴 시 모든 정보가 삭제되며, 복구되지 않습니다.<br/>정말 탈퇴하시겠습니까? </h2>
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
import {Vue, Component, Watch} from "vue-property-decorator";
import {LoginState} from "@/store/modules/user";
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
            }
            else {
                await Login.logout();
                await this.$router.push("/");
            }
            console.log(result);
        }
    }

    openModal() {
        if (!this.check1) {
            alert('회원 탈퇴에 동의해주세요')
        }
        else {
            this.$modal.show('deleteAccount')
        }
    }
}
</script>
<style lang="scss" scoped>
h3{
    font-weight: bold;
    font-size: 16px;
}
p{
    color: #333333c2;
}
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
