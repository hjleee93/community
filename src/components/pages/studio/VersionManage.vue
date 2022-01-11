<template>
    <div class="studio-version">
        <dl>
            <dt>
                <!--                <div class="input-search-default">-->
                <!--                    <p><i class="uil uil-search"></i>-->
                <!--                    <p>-->
                <!--                    <div><input type="text" name="" title="keywords" placeholder="검색어를 입력하세요."/></div>-->
                <!--                </div>-->
            </dt>
            <dd>
                <router-link :to="`/addVersion/${this.$route.params.id}`" class="btn-default"><i
                    class="uil uil-plus"></i> ADD VERSION
                </router-link>
            </dd>
        </dl>
        <ul class="gv-title">
            <li></li>
            <li>번호</li>
            <li>Detailed version</li>
            <li>State</li>
            <li>Creation date and time</li>
            <li></li>
        </ul>

        <VersionRow :version="version" :idx="idx" v-for="(version, idx) in versions" :key="version.id"/>
        <!--            <ul>-->
        <!--                <li class="solid-checkbox">-->
        <!--&lt;!&ndash;                    <input type="checkbox" id="virsion1"/> <label for="virsion1"><i&ndash;&gt;-->
        <!--&lt;!&ndash;                    class="uil uil-check"></i></label>&ndash;&gt;-->
        <!--                </li>-->
        <!--                <li><span>&ndash; 번호: </span> &nbsp;&nbsp;{{ idx + 1 }}</li>-->
        <!--                <li><span>&ndash; Detailed version : </span> &nbsp;&nbsp;ver {{ version.version }}</li>-->
        <!--                <li><span>&ndash; State : &nbsp;&nbsp; </span> <span class="state01"></span>{{version.state}}</li>-->
        <!--                <li><span>&ndash; Creation date and time : </span> &nbsp;&nbsp;{{ moment(version.created_at).format('yyyy-MM-DD HH:mm:ss') }}</li>-->
        <!--                <li @click="openDrawer(version)" ><i class="uil uil-angle-down" style="font-size:22px; cursor:pointer;"></i></li>-->
        <!--            </ul>-->
        <!--            <ul class='gv-toggle'>-->
        <!--                <li></li>-->
        <!--                <li></li>-->
        <!--                <li>-->
        <!--                    <p><span>&ndash;</span> Upload file information </p>-->
        <!--                    <p><span>&ndash;</span> Delete version </p>-->
        <!--                </li>-->
        <!--                <li>-->
        <!--                    <p><span>&ndash;</span> File size : {{ version.size }}MB</p>-->
        <!--                    <p> the deleted version cannot be recovered Deletion of the deployed version is not-->
        <!--                        possible</p>-->
        <!--                </li>-->
        <!--                <li>-->
        <!--                    <a @click="$modal.show('deleteVer')" class="btn-default">DELETE</a>-->
        <!--                </li>-->
        <!--                <li></li>-->
        <!--            </ul>-->

        <!-- 페이지네이션 -->
        <!--<div class="studio-pagination">-->
        <!--    <dl>-->
        <!--        <dt>-->
        <!--            <span>Rows per page:</span>&nbsp;-->
        <!--            <select name="page" title="">-->
        <!--                <option value="">8</option>-->
        <!--                <option value="">7</option>-->
        <!--                <option value="">6</option>-->
        <!--                <option value="">5</option>-->
        <!--                <option value="">4</option>-->
        <!--                <option value="">3</option>-->
        <!--                <option value="">2</option>-->
        <!--                <option value="">1</option>-->
        <!--            </select>-->
        <!--        </dt>-->
        <!--        <dd>1-8 of 1240</dd>-->
        <!--        <dd>-->
        <!--            <span><i class="uil uil-angle-left-b"></i></span>&nbsp;&nbsp;-->
        <!--            <span><i class="uil uil-angle-right-b"></i></span>-->
        <!--        </dd>-->
        <!--    </dl>-->
        <!--</div>-->
        <!-- 페이지네이션 끝 -->
        <modal :clickToClose="false"
               class="modal-area-type" name="deleteVer" width="90%" height="auto" :maxWidth="380"
               :adaptive="true"
               :scrollable="true">
            <div class="modal-alert">
                <dl class="ma-header">
                    <dt>안내</dt>
                    <dd>
                        <button @click="$modal.hide('deleteVer')"><i class="uil uil-times"></i></button>
                    </dd>
                </dl>
                <div class="ma-content">
                    <h2>작성 중인 내용이 저장되지 않고 사라집니다.<br/>작성을 끝내시겠습니까?</h2>
                    <div>
                        <button class="btn-default w48p" @click="deleteVersion()">네</button>
                        <button class="btn-gray w48p" @click="$modal.hide('deleteVer')">아니오</button>
                    </div>
                </div>
            </div>
        </modal>

        <!--<AlertModal :msg="'alert'" :modalName="'alertModal'"/>-->
    </div>
</template>
<script lang="ts">
import {Component, Prop, Vue, Watch} from "vue-property-decorator";
import {dateFormat} from "@/script/moment";
import store from "@/store";
import {eGameStage} from "@/common/enumData";
import AlertModal from "@/components/common/_alertModal.vue";
import moment from "moment";
import VersionRow from "@/components/studio/_verionRow.vue";

@Component({
    components: {AlertModal, VersionRow},
})
export default class VersionManage extends Vue {
    moment = moment;

    versions: any[] = [];
    verObj: any = {};

    isOpenDelete: boolean = false;

    // beforeRouteEnter(to, from, next){
    //     const { stage } = store.getters.projects[from.params.id];
    //
    //     if(eGameStage.Dev === stage){
    //        alert('관리할 게임 버전이 없습니다. 개발 단계를 얼리억세스 이상으로 설정하여, 게임 파일을 업로드해주세요.')
    //     }else{
    //         next();
    //     }
    // }

    async mounted() {
        this.loadVersions();
    }


    loadVersions() {
        this.$api.getProject(this.$route.params.id)
            .then((res) => {
                this.versions = res.projectVersions;
                this.$store.commit('project', res)

            })
    }

    // clickedDeleteBtn(){
    //     this.openDeleteModal(this.verObj)
    // }

    deleteVersion() {
        console.log('/....')

        // this.$api.deleteVersion(version.id)
        // .then((res:any)=>{
        //     console.log('res', res)
        // })
    }

    // openDeleteModal(verObj: any ){
    //     const { version, id } = verObj;
    //
    //     this.$modal.show({
    //         template: `<div class="modal-alert">
    //             <dl class="ma-header">
    //                 <dt>안내</dt>
    //                 <dd>
    //                     <button @click="$modal.hide('deleteVer')"><i class="uil uil-times"></i></button>
    //                 </dd>
    //             </dl>
    //             <div class="ma-content">
    //                 <h2> 버전 ${version}을 삭제하시겠습니까? <br/>삭제하신 버전은 복구되지않습니다.  </h2>
    //                <div>
    //                     <button class="btn-default" style="width:48%" @click="${this.deleteVersion()}">네</button>
    //                     <button class="btn-default" style="width:48%" @click="$modal.hide('deleteVer')">아니오</button>
    //                 </div>
    //             </div>
    //         </div>`,
    //     },  {},{
    //         name: "deleteVer",
    //         width: 380,
    //         maxWidth: 380,
    //         height: "auto",
    //         class: "modal-area-type",
    //         scrollable: true
    //     })
    // }


}
</script>

<style scoped>


</style>