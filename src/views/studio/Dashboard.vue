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
                <dt>{{ $t('chart') }}</dt>
                <dd>
                    <v-select class="sdc-select-box"
                              :options="this.gameList"
                              v-model="selectedProject"
                              :placeholder="$t('game')">
                        <template #open-indicator="{ attributes }">
                            <span v-bind="attributes"><i class="uil uil-angle-down" style="font-size:20px;"></i></span>
                        </template>
                    </v-select>
                    &nbsp; &nbsp;
                    <v-select class="sdc-select-box"
                              v-model="selectedDate"
                              :reduce="name => name.date"
                              label="name"
                              :options="dataOptions"
                              :placeholder="$t('period')">
                        <template #open-indicator="{ attributes }">
                            <span v-bind="attributes"><i class="uil uil-angle-down" style="font-size:20px;"></i></span>
                        </template>
                    </v-select>
                </dd>
            </dl>
            <div>
                <LineChart :game="selectedProject" :date="selectedDate"/>
            </div>
        </div>

        <ul class="studio-dashboard-info">
            <li style="background-color:#f97316;">
                <dl>
                    <dt>
                        <p><i class="uil uil-play"></i></p>
                    </dt>
                    <dd>
                        <h3>{{ playCnt }}</h3>
                        <p>{{ $t('dashboard.play') }}</p>
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
                        <p>{{ $t('dashboard.gamePage.visit') }}</p>
                    </dd>
                </dl>
            </li>
            <li style="background-color:#5d5ffe;">
                <dl>
                    <dt>
                        <p><i class="uil uil-heart-alt"></i></p>
                    </dt>
                    <dd>
                        <h3>{{ likeCnt }}</h3>
                        <p>{{ $t('dashboard.like') }}</p>
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
                        <p>{{ $t('dashboard.playTime') }}</p>
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
                        <p>{{ $t('dashboard.replayCnt') }}</p>
                    </dd>
                </dl>
            </li>
        </ul>


    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import LineChart from "@/components/studio/_chart.vue";
import _ from 'lodash';
import MetaSetting from "@/script/metaSetting";

@Component({
    components: {LineChart}
})
export default class Dashboard extends Vue {
    metaSetting !: MetaSetting;

    projects: any[] = [];
    selectedProject: any = '';
    selectedDate: any = 'today';

    playCnt: number = 0;
    likeCnt: number = 0;

    gameList: any[] = [];
    // :options="['기간', '지난 30일', '지난 7일', '지난 6개월', '올해 (2021)', '작년 (2020)', '저번달', '이번달', '오늘']"

    dataOptions = [
        {name: '오늘', date: 'today'}, {name: '지난 7일', date: '7'}, {name: '지난 30일', date: '30'}];

    async mounted() {
        this.metaSetting = new MetaSetting({
            title: `${this.$t('dashboard')} | Zempie.com`,
            meta: [
                {name: 'description', content: `${this.$t('dashboard.desc')}`},
                {property: 'og:url', content: `${this.$store.getters.homeUrl}/${this.$i18n.locale}/dashboard`},
                {property: 'og:title', content: `${this.$t('dashboard')} | Zempie.com`},
                {property: 'og:description', content: `${this.$t('dashboard.desc')}`},
            ]
        });


        await this.$store.dispatch("loginState");
        this.gameListFetch();

        this.playCount();
    }

    playCount() {

        //
        //
        //
        //
        // const arr = [1, 2, 3];
        //
        // const result = arr.reduce(function add(sum, currValue) {
        //     return sum + currValue;
        // }, 0);

    }

    gameListFetch() {
        this.$api.projectList()
            .then((res: any) => {
                this.projects = res;
                this.selectedProject = res[0].gameId;

                this.playCnt = _.reduce(this.projects, function add(sum, currValue) {
                    return sum + currValue.game.count_start;
                }, 0)

                this.likeCnt = _.reduce(this.projects, function add(sum, currValue) {
                    return sum + currValue.game.count_heart;
                }, 0)

                this.gameList = _.map(this.projects, project => {
                    return {label: project.name, id: project.id};
                })

                console.log('gameList', this.gameList)

            });
    }

}
</script>

<style scoped lang="scss">

</style>