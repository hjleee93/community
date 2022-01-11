<template>
    <div class="content-studio">


        <!-- 상단배너 -->
        <div class="studio-banner bg01">
            <h3>Dashboard</h3>
        </div>
        <!-- 상단배너 끝 -->


        <!-- 차트 -->
        <div class="studio-dashboard-chart">
            <dl>
                <dt>그래픽 차트</dt>
                <dd>
                    <v-select class="sdc-select-box" :options="['게임리스트1', '게임리스트2', '게임리스트3', '게임리스트4', '게임리스트5']" placeholder="게임">
                        <template #open-indicator="{ attributes }">
                            <span v-bind="attributes"><i class="uil uil-angle-down" style="font-size:20px;"></i></span>
                        </template>
                    </v-select>
                    &nbsp; &nbsp;
                    <v-select class="sdc-select-box" :options="['기간', '지난 30일', '지난 7일', '지난 6개월', '올해 (2021)', '작년 (2020)', '저번달', '이번달', '오늘']" placeholder="기간">
                        <template #open-indicator="{ attributes }">
                            <span v-bind="attributes"><i class="uil uil-angle-down" style="font-size:20px;"></i></span>
                        </template>
                    </v-select>
                </dd>
            </dl>
            <div></div>
        </div>

        <ul class="studio-dashboard-info">
            <li style="background-color:#f97316;">
                <dl>
                    <dt>
                        <p><i class="uil uil-play"></i></p>
                    </dt>
                    <dd>
                        <h3>142</h3>
                        <p>플레이</p>
                    </dd>
                </dl>
            </li>
            <li style="background-color:#feb100;">
                <dl>
                    <dt>
                        <p><i class="uil uil-eye"></i></p>
                    </dt>
                    <dd>
                        <h3>142</h3>
                        <p>게임 페이지 방문</p>
                    </dd>
                </dl>
            </li>
            <li style="background-color:#5d5ffe;">
                <dl>
                    <dt>
                        <p><i class="uil uil-heart-alt"></i></p>
                    </dt>
                    <dd>
                        <h3>142</h3>
                        <p>좋아요</p>
                    </dd>
                </dl>
            </li>
            <li style="background-color:#33e4ce;">
                <dl>
                    <dt>
                        <p><i class="uil uil-stopwatch"></i></p>
                    </dt>
                    <dd>
                        <h3>142</h3>
                        <p>플레이 시간</p>
                    </dd>
                </dl>
            </li>
            <li style="background-color:#b53bff;">
                <dl>
                    <dt>
                        <p><i class="uil uil-play-circle"></i></p>
                    </dt>
                    <dd>
                        <h3>142</h3>
                        <p>리플레이 횟수</p>
                    </dd>
                </dl>
            </li>
        </ul>


    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
    components: {},
})
export default class Dashboard extends Vue {

   async mounted(){
        await this.$store.dispatch("loginState");
        this.playCount();
    }
    playCount(){

    }

}
</script>

<style scoped lang="scss">
</style>