<template>
    <b-modal
        ref="loginModal"
        class="modal-container"
        centered
        hide-header
        hide-footer
        @hidden="closeModal()"
    >
        <p class="my-4" style="color: #000">로그인 후 사용하시겠습니까?</p>

        <div>
            <button
                class="popup-box-action half button tertiary"
                style="width: 47%"
                @click="goLoginPage(true)"
            >
                Login
            </button>
            <button class="popup-box-action half button" style="width: 47%"
                    @click="goLoginPage(false)">
                Cancel
            </button>
        </div>
    </b-modal>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
    components: {},
})
export default class AlertModal extends Vue {

    mounted(){
        (this.$refs.loginModal as any).show();
    }

    goLoginPage(state:boolean){
        this.$emit('needLogin', false)
        if (state) {
            this.$router.push("/login");
        } else {
            (this.$refs["loginModal"] as any).hide();
        }
    }

    closeModal(){
        this.$emit('needLogin', false)
    }
}
</script>

<style scoped>
</style>
