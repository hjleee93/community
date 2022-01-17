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

        <VersionRow
            v-for="(version, idx) in versions"
            :version="version"
            :idx="idx"
            :key="version.id"
            @deleteVersion="openDeleteModal"/>

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
                    <h2>해당 버전을 삭제하시겠습니까?<br/>삭제한 버전은 복구되지않습니다.</h2>
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
import Toast from "@/script/message";

@Component({
    components: {AlertModal, VersionRow},
})
export default class VersionManage extends Vue {
    toast = new Toast();
    moment = moment;

    versions: any[] = [];
    verObj: any = {};

    isOpenDelete: boolean = false;

    version:any = '';



    beforeRouteEnter(to, from, next){

        if(eGameStage.Dev === (from.params.id && store.getters.projects[from.params.id].stage)){
            alert('관리할 게임 버전이 없습니다. 개발 단계를 얼리억세스 이상으로 설정하여, 게임 파일을 업로드해주세요.')
        }else if(!from.params.id){
            next('/projectList')
        }
        else{
            next();
        }
    }

    async mounted() {
        this.fecth();
    }

    fecth() {
        this.$api.getProject(this.$route.params.id)
            .then((res) => {
                this.versions = res.projectVersions;
                this.$store.commit('project', res)

            })
    }

    // clickedDeleteBtn(){
    //     this.openDeleteModal(this.verObj)
    // }

    openDeleteModal(version:any){
        this.$modal.show('deleteVer')
        this.version = version;
    }

    deleteVersion() {
        console.log('versions', this.versions.length)

        // this.$modal.show('deleteVer')
        //
        // this.$api.deleteVersion(this.version.id)
        // .then((res:any)=>{
        //     this.toast.successToast("해당 게임이 삭제되었습니다.");
        //     this.fecth();
        // })
        // .catch((err:any)=>{
        //
        // })
        // .finally(()=>{
        //     this.$modal.hide('deleteVer')
        //     this.version = '';
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