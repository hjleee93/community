<template>
    <div class="content-grid">
        <div class="grid-column">
            <div class="section-header-info mb-5">
                <h2 class="section-title mb-3">대표 사진</h2>
                <p class="section-pretitle">채널을 표시하는 대표 사진입니다.</p>
            </div>

            <div class="grid grid-3-3-3">
                <!-- 'https://contattafiles.s3.us-west-1.amazonaws.com/tnt34018/3zSt8zXVMKCNeeG/default_profile.png' -->
                <img-preview
                    :key="form.profileImgSrc"
                    :profileImg="null"
                    :bannerImg="form.profileImgSrc"
                ></img-preview>
                <profile-img-uploader
                    @profileImgSrc="getProfileImgSrc"
                ></profile-img-uploader>
                <!-- <banner-img-uploader
                    @bannerImgSrc="getBannerImgSrc"
                ></banner-img-uploader> -->
            </div>

            <div class="mt-5">
                <form class="form">
                    <div class="form-row">
                        <div class="form-item">
                            <div
                                class="form-input small"
                                :class="
                                    form.channelName.length > 0 ? 'active' : ''
                                "
                            >
                                <b-form-group
                                    label="Channel Name"
                                    label-for="channel-name"
                                >
                                    <b-form-input
                                        class="form-control"
                                        type="text"
                                        id="channel-name"
                                        name="channel-name"
                                        v-model="$v.form.channelName.$model"
                                        :state="
                                            editChannel
                                                ? validateState('channelName')
                                                : undefined
                                        "
                                    ></b-form-input>
                                    <b-form-invalid-feedback
                                        >필수 입력사항입니다. 50자 이내로
                                        작성해주세요</b-form-invalid-feedback
                                    >
                                </b-form-group>
                            </div>
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-item">
                            <div
                                class="form-input small mid-textare active"
                                :class="
                                    form.description.length > 0 ? 'active' : ''
                                "
                            >
                                <b-form-group
                                    label="Description"
                                    label-for="description"
                                >
                                    <b-form-textarea
                                        id="description"
                                        name="description"
                                        v-model="$v.form.description.$model"
                                        :state="
                                            editChannel
                                                ? validateState('description')
                                                : undefined
                                        "
                                    ></b-form-textarea>
                                    <p
                                        class="form-textarea-limit-text"
                                        style="padding-top: 18px"
                                    >
                                        {{ this.form.description.length }}/2000
                                    </p>
                                    <b-form-invalid-feedback
                                        >필수 입력사항입니다. 2000자 이내로
                                        작성해주세요</b-form-invalid-feedback
                                    >
                                </b-form-group>
                            </div>
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-item">
                            <div class="switch-option">
                                <div class="toggle-container">
                                    <p class="switch-option-title">
                                        Public channel
                                    </p>

                                    <p class="switch-option-text">
                                        채널 공개 여부
                                    </p>
                                </div>
                                <div
                                    class="form-switch"
                                    @click="isPrivate = !isPrivate"
                                    :class="isPrivate ? '' : 'active'"
                                >
                                    <div class="form-switch-button"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
                <div class="button-container" @click="editChannel">
                    <p
                        class="
                            button
                            small
                            white
                            add-field-button
                            save-btn
                            primary
                        "
                    >
                        SAVE
                    </p>
                </div>
                <div class="button-container" @click="openDeleteChannelModal">
                    <p class="button small white add-field-button tertiary">
                        Delete
                    </p>
                </div>
            </div>
        </div>
        <b-modal
            ref="deleteChannelModal"
            class="modal-container"
            centered
            hide-header
            hide-footer
        >
            <p class="mt-4 text-center" style="color: #000">
                해당 채널을 삭제하시겠습니까?
            </p>
            <p class="my-3 text-center small" style="color: #000">
                해당 채널의 포스팅을 다른 채널로 옮기시고 싶으신경우 move <br />
                모든 포스팅을 삭제하고 싶으신 경우 delete를 클릭해주세요
            </p>

            <transition-group name="fade">
                <template v-if="isMoveChannel">
                    <p
                        v-for="channel in channelList"
                        :key="channel.id"
                        class="my-3 text-center small"
                        style="color: #000"
                    >
                        <template v-if="channel.id !== channelId">
                            <p
                                @click="combinedChannel(channel.id)"
                                style="color: #000"
                            >
                                {{ channel.name }}
                            </p></template
                        >
                    </p>
                </template>
            </transition-group>
            <div class="button-container">
                <button
                    class="popup-box-action half button"
                    @click="deleteChannel"
                >
                    delete
                </button>
                <button
                    class="popup-box-action half button"
                    @click="moveChannelPosting"
                >
                    move
                </button>
            </div>
        </b-modal>

        <b-modal
            ref="deleteDone"
            hide-footer
            hide-header
            centered
            modal-class="modal-container"
        >
            <template #default="{ close }">
                <p class="mt-4 text-center" style="color: #000">
                    삭제가 완료되었습니다.
                </p>
                <button class="full button secondary" @click="close()">
                    확인
                </button>
            </template>
        </b-modal>

        <b-modal
            ref="combindDone"
            hide-footer
            hide-header
            centered
            modal-class="modal-container"
        >
            <template #default="{ close }">
                <p class="mt-4 text-center" style="color: #000">
                    포스팅 이동이 완료되었습니다.
                </p>
                <button class="full button secondary" @click="close()">
                    확인
                </button>
            </template>
        </b-modal>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { mapGetters } from "vuex";
import Form from "@/script/form";
import Hexagon from "@/plugins/hexagon";

import { validationMixin } from "vuelidate";
import { required, minLength, maxLength } from "vuelidate/lib/validators";

import ImgPreview from "@/components/common/upload/ImgPreview.vue";
import ProfileImgUploader from "@/components/common/upload/ProfileImgUploader.vue";
import BannerImgUploader from "@/components/common/upload/BannerImgUploader.vue";
import { Channel } from "@/types/group/group";

@Component({
    computed: { ...mapGetters(["user"]) },
    components: { ImgPreview, ProfileImgUploader, BannerImgUploader },
    mixins: [validationMixin],
    validations: {
        form: {
            channelName: {
                required,
                maxLength: maxLength(50),
            },
            description: {
                required,
                maxLength: maxLength(2000),
            },
        },
    },
})
export default class ChannelEdit extends Vue {
    private form = {
        channelName: "",
        description: "",
        profileImgSrc: "",
    };
    private hexagon: Hexagon = new Hexagon();
    private user!: any;
    private isPrivate: boolean = false;
    private communityId: string = this.$route.params.community_id;
    private channelId: string = this.$route.params.channel_id;
    private channelInfo: Channel = {} as Channel;
    private channelList: Channel[] = [];
    private isMoveChannel: boolean = false;

    async mounted() {
        this.hexagon.init();
        Form.formInput();
        this.channelInfo = await this.$api.getChannelInfo(123, 123);
        this.form.channelName = this.channelInfo.name;
        this.form.description = this.channelInfo.description;
        this.form.profileImgSrc = this.channelInfo.profile_img;
    }
    async editChannel() {
        this.$v.form.$touch();
        if (this.$v.form.$anyError) {
            return;
        }
        // const result = await this.$api.editChannel(
        //     this.communityId,
        //     this.channelId,
        //     this.form.channelName,
        //     this.form.description,
        //     this.isPrivate,
        //     this.form.profileImgSrc
        // );

        // //todo: 백엔드 연결 후 분기 처리
        // if (result) {
        //     this.$router.push(`/community/${this.communityId}/setting/channel`);
        // }
    }

    validateState(name) {
        const { $dirty, $error } = this.$v.form[name]!;
        return $dirty ? !$error : null;
    }

    getProfileImgSrc(imgSrc: string) {
        this.form.profileImgSrc = imgSrc;
    }
    openDeleteChannelModal() {
        this.isMoveChannel = false;
        (this.$refs.deleteChannelModal as any).show();
    }
    async deleteChannel() {
        this.$api.group.channel
            .delete(this.communityId, this.channelId)
            .then((res) => {
                console.log(res);
            });

        // let result = await this.$api.deleteChannel(
        //     this.communityId,
        //     this.channelId
        // );
        // //todo: 백엔드 연결 후 분기 처리
        // console.log(result);

        // (this.$refs.deleteChannelModal as any).hide();
        // (this.$refs.deleteDone as any).show();
    }

    async moveChannelPosting() {
        this.isMoveChannel = true;
        this.channelList = await this.$api.getChannelList(1234, 123);
    }
    async combinedChannel(combined_channel_id: number) {
        const result = await this.$api.combinedChannel(
            123,
            123,
            combined_channel_id
        );
        //todo: 분기처리
        if (result) {
            (this.$refs.combindDone as any).show();
            (this.$refs.deleteChannelModal as any).hide();
        } else {
        }
    }
}
</script>

<style lang="scss" scoped>
.dropbox-container {
    display: flex;
    justify-content: space-around;
    height: 48px;
    font-size: 1rem;
}
.dropbox {
    width: 50%;
}
.dropbox-label {
    width: 40%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
.toggle-container {
    display: flex;
    flex-direction: column;
    height: 48px;
    justify-content: center;
    width: 40%;
    align-items: flex-start;
}
.button.white {
    color: white;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
}
</style>
