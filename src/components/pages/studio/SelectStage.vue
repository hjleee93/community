<template>
    <ul class="studio-game-step">
        <li @click="selectStage(uploadStage.Dev)">
            <p>
                <!--                <input type="radio" name="stage" id="uoload1" /> <label for="uoload1"><i class="uil uil-check"></i></label>-->
            </p>
            <dl>
                <dt><img src="../../../assets/images/studio_icon01.png" alt="" title=""/></dt>
                <dd>
                    <h3>개발로그</h3>
                    <div>아직 게임을 플레이 할 수 없지만 여러분의 게임개발 아이디어를 이미지, 게시물 등으로 다른 사람들에게 공유해보세요.</div>
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
                    <h3>얼리억세스</h3>
                    <div>게임을 실행할 수 있지만 아직 개발이 더 필요한 상태 입니다.</div>
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
                    <h3>결과물</h3>
                    <div>게임이 완성 되었습니다. 젬파이 퍼블리싱 화면에 멋진 작품을 공개해 주세요!</div>
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
                    <h3>수익화</h3>
                    <div>젬파이 sdk를 이용하여 완성한 게임을 통해 수익을 벌어 보세요.</div>
                </dd>
            </dl>
        </li>
    </ul>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";

import {eGameUploadStage} from "@/common/enumData";

@Component({
    components: {},
})
export default class SelectStage extends Vue {
    private uploadStage = eGameUploadStage;

    mounted() {
        //
        // window.addEventListener("beforeunload", function (event) {
        //
        //     event.returnValue = "진짜 나감?";
        //
        // });

        this.$store.commit("gameStage", null);
    }

    selectStage(stage: number) {
        this.$store.commit("gameStage", stage);
        this.$store.commit("sendGameInfoDone", false);
        this.$store.commit("sendGameFileDone", false);
        this.$router.push("/addGameInfo");
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