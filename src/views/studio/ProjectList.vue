<template>
    <div class="content-studio">
        <!-- 상단배너 -->
        <div class="studio-banner bg03">
            <h2>{{ $t('projectList.banner.text') }}</h2>
            <p>{{ $t('projectList.banner.info') }}</p>
        </div>
        <!-- 상단배너 끝 -->

        <!-- 모든게임 끝 -->
        <div class="studio-all-game">
            <dl>
                <dt>
                    <div class="input-search-default">
                        <p><i class="uil uil-search"></i>
                        <p>
                        <div>
                            <input type="text" name=""
                                   title="keywords"
                                   :placeholder="$t('needSearchInput')"
                                   v-debounce:200ms="searchGame"
                                   v-model="inputKeyword"/>
                        </div>
                    </div>
                </dt>
                <dd>
                    <router-link :to="`/${$i18n.locale}/uploadGame`" class="btn-default"><i class="uil uil-plus"></i>{{ $t('gameUpload') }}</router-link>
                </dd>
            </dl>

            <ul class="ag-title">
                <li>{{ $t('game.thumbnail') }} </li>
                <li>{{ $t('game.title') }}
                    <Sorting :sort="'name'" :array="orginList" @sortedArray="sortedArray"/>
                </li>
                <li>{{ $t('game.uploadDate') }}
                    <Sorting :sort="'created_at'" :array="orginList" @sortedArray="sortedArray"/>
                </li>
                <li>{{ $t('game.status') }}
                    <Sorting :sort="'stage'" :array="orginList" @sortedArray="sortedArray"/>
                </li>
                <li>{{ $t('game.playCnt') }}
                    <Sorting :sort="'game.count_start'" :array="orginList" @sortedArray="sortedArray"/>
                </li>
                <li>{{ $t('game.likeCnt') }}
                    <Sorting :sort="'game.count_heart'" :array="orginList" @sortedArray="sortedArray"/>
                </li>
            </ul>

            <transition-group name="list" tag="div">
                <ul v-for="project in pagingData()" @click="editProject(project.id)" :key="project.id">

                    <li>
                        <span>&ndash; {{ $t('game.thumbnail') }}: </span>
                        <p :style="`background: url(${project.picture_web || project.picture || project.url_thumb || 'img/default.png' }?t=${Date.now()}) center center / cover no-repeat; background-size: cover;`"></p>
                    </li>
                    <li>
                        <span>&ndash; {{ $t('game.title') }}: </span> &nbsp;&nbsp;{{ project.name }}
                    </li>

                    <li>
                        <span>&ndash; {{ $t('game.uploadDate') }}: </span> &nbsp;&nbsp;{{ moment(project.created_at).format('yyyy-MM-DD') }}
                    </li>
                    <li>
                        <span>&ndash; {{ $t('game.status') }}: </span> &nbsp;&nbsp;{{ gameStage[project.stage] }}
                    </li>
                    <li>
                        <span>&ndash; {{ $t('game.playCnt') }}: </span> &nbsp;&nbsp;{{ project.game.count_start }}
                    </li>
                    <li>
                        <span>&ndash; {{ $t('game.likeCnt') }}:</span> &nbsp;&nbsp;{{ project.game.count_heart }}
                    </li>

                </ul>
            </transition-group>

            <!-- 페이지네이션 -->
            <div class="studio-pagination">
                <dl>
                    <!--                                <dt>-->
                    <!--                                    <span>Rows per page:</span>&nbsp;-->
                    <!--                                    <select name="page" title="">-->
                    <!--                                        <option value="">8</option>-->
                    <!--                                        <option value="">7</option>-->
                    <!--                                        <option value="">6</option>-->
                    <!--                                        <option value="">5</option>-->
                    <!--                                        <option value="">4</option>-->
                    <!--                                        <option value="">3</option>-->
                    <!--                                        <option value="">2</option>-->
                    <!--                                        <option value="">1</option>-->
                    <!--                                    </select>-->
                    <!--                                </dt>-->
                    <dd>{{ currPage + 1 }}-{{ pageCount() }} of {{ pageCount() }}</dd>
                    <dd>
                        <span @click="prevPage()" :class="[currPage !== 0 ? '' : 'disabled','prev-btn']"><i
                            class="uil uil-angle-left-b"></i></span>&nbsp;&nbsp;
                        <span @click="nextPage()"
                              :class="[currPage >= (pageCount() - 1 ) ? 'disabled' : '','next-btn']"><i
                            class="uil uil-angle-right-b"></i></span>
                    </dd>
                </dl>
            </div>
            <!--             페이지네이션 끝-->
        </div>
        <!-- 모든게임 끝 -->
    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from "vue-property-decorator";
import moment from "moment";
import _ from "lodash";
import {eGameStage} from "@/common/enumData";
import Sorting from "@/components/studio/_sorting.vue";

@Component({
    components: {Sorting},
})
export default class ProjectList extends Vue {
    gameStage = eGameStage;
    inputKeyword: string = '';
    projectList: any = []
    moment = moment;
    count = 0;
    orginList: any = []

    pageSize: number = 10;
    currPage: number = 0;

    async mounted() {
        await this.$store.dispatch("loginState");
        this.fetch();
    }

    fetch() {
        this.$api.projectList()
            .then((res: any) => {
                this.projectList = _.sortBy(res, res.created_at).reverse();
                this.orginList = res;
            })
    }


    searchGame() {
        let list: any = [];
        const input = this.inputKeyword;

        if (input.length > 0) {
            this.orginList.map((e: any) => {
                    if (e.name.includes(input)) {
                        list.push(e)
                    }
                }
            );
            this.projectList = list;
        }
        else {
            this.projectList = this.orginList;
        }

    }

    editProject(id: string) {
        this.$router.push(`/${this.$i18n.locale}/project/${id}`)
    }

    sortedArray(array: any) {
        console.log('sortedArray', array)
        this.projectList = [];
        this.projectList = array;
    }

    /**
     * 페이지네이션
     */
    pagingData() {
        const start = this.currPage * this.pageSize;
        const end = start + this.pageSize;

        return this.projectList.slice(start, end);
    }

    pageCount() {
        return Math.floor((this.projectList.length - 1) / this.pageSize) + 1;
    }

    nextPage() {
        document.documentElement.scrollTop = 0;
        this.currPage += 1;
    }

    prevPage() {
        document.documentElement.scrollTop = 0;
        this.currPage -= 1;
    }
}
</script>

<style scoped lang="scss">

//transition
.list-item {
    display: inline-block;
    margin-right: 10px;
}

.list-enter-active, .list-leave-active {
    transition: all 1s;
}

.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */
{
    opacity: 0;
    transform: translateY(30px);
}

//pagination
.prev-btn.disabled, .next-btn.disabled {
    pointer-events: none;
    opacity: 0.5;
}


//transition으로 인한 css 수정
.studio-all-game {
    width: 1200px;
    margin: 30px auto;
    background-color: #fff;
    box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.05);
    border-radius: 10px;
}

.studio-all-game > dl {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30px 30px;
    border-bottom: #e9e9e9 1px solid;
}

.studio-all-game > div > ul {
    display: flex;
    width: 100%;
    align-items: center;
    padding: 0px 30px;
    text-align: center;
    border-bottom: 1px solid #f1f1f1;
    transition: all 0.4s ease-in-out;
}

.studio-all-game > ul.ag-title {
    background-color: #f9f9f9;
}

.studio-all-game > ul.ag-title > li {
    font-weight: 500;
    font-size: 17px;
}

.studio-all-game > div > ul > li {
    padding: 25px 0px;
    font-weight: 500;
    font-size: 16px;
    line-height: 16px;
    color: #333;
}

.studio-all-game > div > ul > li > span {
    display: none;
}

.studio-all-game > div > ul > li > p {
    width: 70px;
    height: 70px;
    border-radius: 5px;
    margin: auto;
}

.studio-all-game > div > ul:hover {
    background-color: #f9f9f9;
}

.studio-all-game .ag-empty {
    padding: 150px 0;
    text-align: center;
}

.studio-all-game .ag-empty > p {
    width: 60px;
    height: 60px;
    margin: auto;
    padding-top: 15px;
    text-align: center;
    font-size: 24px;
    color: #c1c1c1;
    border-radius: 50%;
    background-color: #f1f1f1;
}

.studio-all-game .ag-empty > h4 {
    margin-top: 25px;
    font-weight: 500;
    font-size: 16px;
    line-height: 16px;
}

.studio-all-game > div > ul > li:nth-child(1) {
    width: 15%;
}

.studio-all-game > div > ul > li:nth-child(2) {
    width: 40%;
    text-align: left;
}

.studio-all-game > div > ul > li:nth-child(3) {
    width: 15%;
}

.studio-all-game > div > ul > li:nth-child(4) {
    width: 10%;
}

.studio-all-game > div > ul > li:nth-child(5) {
    width: 10%;
}

.studio-all-game > div > ul > li:nth-child(6) {
    width: 10%;
}

@media all and (max-width: 479px) {
    .studio-all-game {
        width: 90%;
        margin: 20px auto;
        padding: 0 15px;
    }
    .studio-all-game > dl {
        flex-wrap: wrap;
        padding: 20px;
    }
    .studio-all-game > dl dt {
        width: 100%;
    }
    .studio-all-game > dl dd {
        width: 100%;
        margin-top: 10px;
    }
    .studio-all-game > dl dd a {
        width: 100%;
    }
    .studio-all-game > ul.ag-title {
        display: none;
    }
    .studio-all-game > div > ul {
        display: block;
        margin-top: 10px;
        padding: 15px 30px;
        border: 2px solid #f1f1f1;
        background-color: #fff;
        border-radius: 10px;
        box-shadow: 0px 10px 50px rgba(0, 0, 0, 0.05);
    }
    .studio-all-game > div > ul > li {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding: 5px 0px;
        font-size: 13px;
    }
    .studio-all-game > div > ul > li {
        width: 100% !important;
    }
    .studio-all-game > div > ul > li > p {
        margin: 0 0 0 15px;
    }
    .studio-all-game > div > ul > li > span {
        display: block;
        font-size: 14px;
    }
}

@media all and (min-width: 480px) and (max-width: 767px) {
    .studio-all-game {
        width: 470px;
        margin: 20px auto;
        padding: 0 20px;
    }
    .studio-all-game > dl {
        flex-wrap: wrap;
        padding: 20px;
    }
    .studio-all-game > dl dt {
        width: 100%;
    }
    .studio-all-game > dl dd {
        width: 100%;
        margin-top: 10px;
    }
    .studio-all-game > dl dd a {
        width: 100%;
    }
    .studio-all-game > ul.ag-title {
        display: none;
    }
    .studio-all-game > div > ul {
        display: block;
        margin-top: 15px;
        padding: 15px 30px;
        border: 2px solid #f1f1f1;
        background-color: #fff;
        border-radius: 10px;
        box-shadow: 0px 10px 50px rgba(0, 0, 0, 0.05);
    }
    .studio-all-game > div > ul > li {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding: 10px 0px;
        font-size: 14px;
    }
    .studio-all-game > div > ul > li {
        width: 100% !important;
    }
    .studio-all-game > div > ul > li > p {
        margin: 0 0 0 15px;
    }
    .studio-all-game > div > ul > li > span {
        display: block;
        font-size: 15px;
    }

}

@media all and (min-width: 768px) and (max-width: 991px) {
    .studio-all-game {
        width: 750px;
    }
    .studio-all-game > ul.ag-title > li {
        font-size: 16px;
    }
    .studio-all-game > div > ul > li {
        padding: 20px 0px;
        font-size: 15px;
    }
    .studio-all-game > div > ul > li > p {
        width: 60px;
        height: 60px;
    }
}

@media all and (min-width: 992px) and (max-width: 1199px) {
    .studio-all-game {
        width: 970px;
    }
}

@media all and (min-width: 1200px) {

}

</style>