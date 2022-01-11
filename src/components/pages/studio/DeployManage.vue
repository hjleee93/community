<template>
    <div>
        <div class="info-input">
            <div class="ii-title-one">
                현재 배포중인 버전
            </div>
            <div v-if="version" class="ii-form">
                <ul>
                    <li>버전표시</li>
                    <li><input readonly v-model="number" type="text" name="" title="" placeholder="" class="w100p"/>
                    </li>
                </ul>
                <ul>
                    <li>디테일 버전 표시</li>
                    <li><input readonly v-model="version" type="text" name="" title="" placeholder="" class="w100p"/>
                    </li>
                </ul>
                <ol>
                    <li>배포 해제</li>
                    <li>배포된 버전의 게임을 비공개로 전환합니다.</li>
                    <li>
                        <a @click="undeploy" class="btn-gray w100p">배포 해제</a>
                    </li>
                </ol>
            </div>
            <div v-else class="ii-form">
                <ul>
                    <li>배포중인 버전이 없습니다.</li>
                </ul>
            </div>

            <div class="ii-title-one-line">
                배포 버전 변경하기
            </div>
            <div class="ii-form">
                <ul>
                    <li>변경 할 버전</li>
                    <li v-if="options[0]">
                        <select name="" title="" class="w100p" v-model="selectVersion">
                            <option v-for="option in options" :value="option">{{ option }}</option>
                        </select>
                    </li>
                    <li v-else>
                        <select name="" title="" class="w100p">
                            <option value="배포할 버전이 없습니다.">
                                배포할 버전이 없습니다.
                            </option>
                        </select>
                    </li>

                </ul>

                <ol style="border-top: 0px;">
                    <li>배포 변경</li>
                    <li>게임의 배포 버전을 선택한 버전으로 변경합니다.</li>
                    <li>
                        <a @click="deploy" class="btn-default w100p">배포</a>
                    </li>
                </ol>

            </div>
        </div>
        <!-- 입력/수정 끝 -->


    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import * as _ from "lodash";
import Toast from "@/script/message";


@Component({
    components: {},
})
export default class DeployManage extends Vue {
    toast = new Toast();

    projectId: string = this.$route.params.id;
    version: string = "";
    number: number = 0;
    selectVersion: string = '';
    options: string[] = [];
    deployVersion: any = null;
    wait: boolean = false;

    async mounted() {
        await this.$store.dispatch("loginState");
        await this.loadVersions();

        const project = this.$store.getters.project(this.projectId);
        const versions = this.$store.getters.versionList(this.projectId);

        if (project.deploy_version_id) {
            const deployVersion = _.find(
                versions,
                (v) => v.id === project.deploy_version_id
            );

            console.log('deployVersion', deployVersion)

            this.version = deployVersion.version;
            this.number = deployVersion.number;
            this.deployVersion = deployVersion;


         }

        const passedList = versions.filter((version) => {
            return version.state === "passed";
        });

        this.options = passedList.map((version) => version.version);

        this.selectVersion = this.options[0]


    }

    loadVersions() {
        this.$api.getProject(this.$route.params.id)
            .then((res) => {
                this.versions = res.projectVersions;
                this.$store.commit('project', res)

            })
    }

    deploy() {
        if (!this.selectVersion) {
            return;
        }

        const versions = this.$store.getters.versions(this.projectId);
        const version = _.find(
            versions,
            (v) => v.version === this.selectVersion
        );
        const deploy_version_id = version.id;


        this.$api.updateProject({
            id: this.projectId,
            deploy_version_id,
        })
            .then((res) => {
                console.log('deployw res', res)
                version.state = "deploy";
                if (this.deployVersion) {
                    const preVersion = _.find(
                        versions,
                        (v) => v.number === this.deployVersion.number
                    );
                    preVersion.state = "passed";
                    const project = this.$store.getters.project(this.projectId);
                    project.deploy_version_id = version.id;
                    console.log('project', project)
                    console.log('version', version)
                    if (project.update_version_id === version.id) {
                        project.update_version_id = null;
                    }
                }

                this.toast.clear();
                this.toast.successToast(`${this.selectVersion} 버전이 배포되었습니다.`)
                this.$router.replace(`/versionManage/${this.projectId}`);
            })
            .catch(() => {

            })

    }


    undeploy() {

        this.$api.updateProject({
            id: this.projectId,
            deploy_version_id: "0",
        })
            .then((res) => {
                if (this.deployVersion) {
                    const versions = this.$store.getters.versions(this.projectId);
                    const preVersion = _.find(
                        versions,
                        (v) => v.number === this.deployVersion.number
                    );
                    preVersion.state = "passed";
                    const project = this.$store.getters.project(this.projectId);
                    project.deploy_version_id = null;
                }
                console.log(this.deployVersion)
                this.toast.clear();
                this.toast.successToast(`${this.deployVersion.version} 버전이 배포 해제되었습니다.`)

                this.$router.replace(`/versionManage/${this.projectId}`);
            })
            .catch((err) => {
                console.error((result && result.error) || "error");
            })


    }

}
</script>

<style scoped>

</style>