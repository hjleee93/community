<template>
    <ul class="studio-game-step">
        <li @click="selectStage(uploadStage.Dev)">
            <p>
                <!--                <input type="radio" name="stage" id="uoload1" /> <label for="uoload1"><i class="uil uil-check"></i></label>-->
            </p>
            <dl>
                <dt><img src="img/studio_icon01.png" alt="" title=""/></dt>
                <dd>
                    <h3>{{ $i18n.t('devLog') }}</h3>
                    <div>{{ $i18n.t('devLog.info') }}
                        </div>
                </dd>
            </dl>
        </li>
        <li @click="selectStage(uploadStage.Early)">
            <p>
                <!--                <input type="radio" name="stage" id="uoload2" /> <label for="uoload2"><i class="uil uil-check"></i></label>-->
            </p>
            <dl>
                <dt><img src="../../../assets/images/studio_icon02.png" alt="" title=""/></dt>
                <dd>
                    <h3>{{ $i18n.t('earlyAccess') }}</h3>
                    <div>{{ $i18n.t('earlyAccess.info') }}</div>
                </dd>
            </dl>
        </li>
        <li @click="selectStage(uploadStage.Complete)">
            <p>
                <!--                <input type="radio" name="stage" id="uoload3"/> <label for="uoload3"><i class="uil uil-check"></i></label>-->
            </p>
            <dl>
                <dt><img src="../../../assets/images/studio_icon03.png" alt="" title=""/></dt>
                <dd>
                    <h3>{{ $i18n.t('complete') }}</h3>
                    <div>{{ $i18n.t('complete.info') }}</div>
                </dd>
            </dl>
        </li>
        <li @click="selectStage(uploadStage.Monetization)">
            <p>
                <!--                <input type="radio" name="stage" id="uoload4"/> <label for="uoload4"><i class="uil uil-check"></i></label>-->
            </p>
            <dl>
                <dt><img src="../../../assets/images/studio_icon04.png" alt="" title=""/></dt>
                <dd>
                    <h3>{{ $i18n.t('monetization') }}</h3>
                    <div>{{ $i18n.t('monetization.info') }}</div>
                </dd>
            </dl>
        </li>

        <modal :clickToClose="false"
               class="modal-area-type"
               name="deleteGameFile"
               width="90%" height="auto" :maxWidth="380"
               :adaptive="true"
               :scrollable="true">
            <div class="modal-alert">
                <dl class="ma-header">
                    <dt>안내</dt>
                    <dd>
                        <button @click="$modal.hide('deleteGameFile')"><i class="uil uil-times"></i></button>
                    </dd>
                </dl>
                <div class="ma-content">
                    <h2>{{ $i18n.t('selectStage.alert') }}<br/> {{ $i18n.t('selectStage.alert.confirm') }}
                        </h2>

                    <div>
                        <button class="btn-default w48p" @click="deleteGameFile()">{{ $i18n.t('yes') }}네</button>
                        <button class="btn-gray w48p" @click="$modal.hide('deleteGameFile')">{{ $i18n.t('no') }}아니오</button>
                    </div>
                </div>
            </div>
        </modal>


    </ul>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";

import {eGameStage} from "@/common/enumData";

@Component({
    components: {},
})
export default class SelectStage extends Vue {
    @Prop() projectInfo !: any;
    private uploadStage = eGameStage;

    mounted() {
        this.$store.commit("gameStage", null);
    }

    selectStage(selectedStage: number) {
        if (this.projectInfo) {
            const {projectVersions, stage} = this.projectInfo
            console.log('projectVersions', projectVersions)
            console.log('stage', stage)


            if (selectedStage === eGameStage.Dev) {
                if (projectVersions.length > 0) {
                    this.$modal.show('deleteGameFile')
                    console.log('projectVersions', projectVersions)
                    console.log('stage', stage)
                }
                else {
                    this.$emit('stage', selectedStage)
                    this.$store.commit("gameStage", selectedStage);
                }
            }
            else {
                this.$emit('stage', selectedStage)
                this.$store.commit("gameStage", selectedStage);
            }
        }else{
            this.$emit('stage', selectedStage)
            this.$store.commit("gameStage", selectedStage);
        }

    }

    deleteGameFile() {

    }

}
</script>

<style scoped lang="scss">
input[type="radio"] {
    display: none;
}

input[type="radio"]:checked + label {
    color: #fff;
    background: #FF6E17;
    border-color: #FF6E17;
}

input[type="radio"] + label {
    display: inline-block;
    width: 22px;
    height: 22px;
    text-align: center;
    font-size: 15px;
    color: #fff;
    border: 1px solid #e5e5e5;
    border-radius: 4px;
    cursor: pointer;
}

.studio-game-step > li:hover {
    box-shadow: 0px 10px 50px rgba(0, 0, 0, 0.2);
    cursor: pointer;

}
</style>