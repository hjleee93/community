<template>
    <div class="studio-upload-input">
        <div class="sui-input">
            <div class="suii-title">첫번째 버전 추가</div>
            <dl class="suii-content">
                <dt>게임 업로드</dt>
                <dd>
                    <p>
                        <label for="game-file"><i class="uil uil-file-plus" style="font-size:18px;"></i> &nbsp; 파일업로드</label>
                        <input type="file" id="game-file">
                    </p>
                    <h2>
                        게임에 포함된 웹페이지를 압축 파일로 업로드 해주세요. <br/> ZIP 파일만 업로드가 가능하고, 압축하지 않은 파일들의 총 크기가 100MB 이하여야 합니다.
                    </h2>
                </dd>
            </dl>
            <div class="suii-open">
                <span>고급설정</span> &nbsp;<i class="uil uil-sliders-v-alt"></i>
            </div>
            <div>
                <dl class="suii-content">
                    <dt>게임정보</dt>
                    <dd>
                        <select name="" title="" class="w100p">
                            <option value="option1">게임 시작 파일 선택 리스트 박스</option>
                            <option value="option2">게임 시작 파일 선택 리스트 박스1</option>
                            <option value="option3">게임 시작 파일 선택 리스트 박스2</option>
                        </select>
                    </dd>
                </dl>
                <dl class="suii-content">
                    <dt>게임 자동 배포 선택</dt>
                    <dd>
                        <ul>
                            <li>
                                <label class="switch-button">
                                    <input type="checkbox" name="" />
                                    <span class="onoff-switch"></span>
                                </label>
                            </li>
                            <li>Auto-deployment mode</li>
                        </ul>
                        <h2>
                            게임에 포함된 웹페이지를 압축 파일로 업로드 해주세요. <br/> ZIP 파일만 업로드가 가능하고, 압축하지 않은 파일들의 총 크기가 100MB 이하여야 합니다.
                        </h2>
                    </dd>
                </dl>
                <div class="suii-close"><button class="btn-line">닫기 &nbsp;&nbsp;<i class="uil uil-angle-up"></i></button></div>
            </div>
        </div>

        <div class="sui-input mt20">
            <div class="suii-title">첫번째 버전 추가</div>
            <dl class="suii-content">
                <dt>게임 업로드</dt>
                <dd>
                    <p>
                        <label for="game-file"><i class="uil uil-file-plus" style="font-size:18px;"></i> &nbsp; 파일업로드</label>
                        <input type="file" id="game-file">
                    </p>
                    <h2>
                        게임에 포함된 웹페이지를 압축 파일로 업로드 해주세요. <br/> ZIP 파일만 업로드가 가능하고, 압축하지 않은 파일들의 총 크기가 100MB 이하여야 합니다.
                    </h2>
                </dd>
            </dl>
            <div class="suii-open">
                <span>고급설정</span> &nbsp;<i class="uil uil-sliders-v-alt"></i>
            </div>
        </div>

        <ul class="sui-btn">
            <li><router-link to="#" class="btn-line w150"><i class="uil uil-angle-left-b"></i> 이전</router-link></li>
            <li><router-link to="#" class="btn-default w150">다음 <i class="uil uil-angle-right-b"></i></router-link></li>
        </ul>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
    components: {},
})
export default class AddGameFile extends Vue {

}
</script>

<style scoped lang="scss">
</style>