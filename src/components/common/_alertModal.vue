<template>
    <modal :clickToClose="false"
           class="modal-area-type"
           name="alert"
           width="90%"
           height="auto"
           :maxWidth="380"
           :adaptive="true"
           :scrollable="true">
        <div class="modal-alert">
            <dl class="ma-header">
                <dt>{{ $t('information') }}</dt>
                <dd>
                    <button @click="$modal.hide(modalName)"><i class="uil uil-times"></i></button>
                </dd>
            </dl>
            <div class="ma-content">
                <h2>{{msg}}}</h2>
                <div>
                    <button class="btn-gray w48p" style="width: 100%;" @click="$modal.hide(modalName)">확인</button>
                </div>
            </div>
        </div>
    </modal>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";

@Component({
    components: {},
})
export default class AlertModal extends Vue {
    @Prop() msg!: string;
    @Prop() modalName !:string;

}
</script>

<style scoped>

</style>