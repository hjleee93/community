<template>
    <div class="modal-post">
        <ul class="mp-header">
            <li :class="activeTab === 'SNS' ? 'active' : ''" @click="isActive('SNS')"><i
                class="uil uil-file-landscape"></i>
                SNS
            </li>
            <li :class="activeTab === 'BLOG' ? 'active' : ''" @click="isActive('BLOG')"><i
                class="uil uil-files-landscapes"></i> Blog
            </li>
        </ul>
        <div class="mp-editer2">
            <TiptapSns
                v-if="activeTab === 'SNS'"
                @isEmpty="editorState"
                :key="activeTab"
            ></TiptapSns>
            <TiptapBlog
                v-if="activeTab === 'BLOG'"
                @isEmpty="editorState"
                :key="activeTab"
            ></TiptapBlog>
        </div>
        <template v-if="activeTab === 'SNS'">
            <div class="mp-image" style="padding-bottom: 0px">
                <dd style="width: 100%;">
                    <swiper class="swiper-area" :options="MPIswiperOption" v-if="imgPreviewArr.length > 0">

                        <swiper-slide
                            v-for="(img, idx) in imgPreviewArr" :key="idx"
                            :style="`padding-bottom: 43px; background: url(${img.url}) center center / cover no-repeat; background-size:cover;`">
                            <span @click="deletePreviewImg(idx)"><i class="uis uis-times-circle"></i></span>
                        </swiper-slide>
                        <div class="swiper-pagination" slot="pagination"></div>
                    </swiper>
                </dd>
            </div>
            <div class="mp-midi" v-if="videoSrc.url ||audioPreviewArr.length > 0 ">
                <div v-if="videoSrc.url">

                    <span @click="deleteVideo" class="delete-btn"><i class="uis uis-times-circle"></i></span>
                    <video width="100%" height="315" :src="videoSrc.url" title="YouTube video player"
                           frameborder="0"
                           allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                           allowfullscreen></video>
                </div>
                <ul v-if="audioPreviewArr.length > 0" v-for="audio in audioPreviewArr" class="audio-wrapper">
                    <div class="btn-container">
                        <audio controls :src="audio.url"></audio>
                        <span class="audio-cancel-btn" @click="deleteAudio"><i class="uis uis-times-circle"></i></span>
                    </div>
                    <p> {{ audio.name || audio.file.name }}</p>
                </ul>
            </div>
        </template>
        <dl class="mp-category">
        </dl>
        <dl class="mp-type" :style="activeTab === 'BLOG'? 'margin-top:20px;':''">
            <dt>
                <image-uploader-btn
                    :activeTab="activeTab"
                ></image-uploader-btn>
                <video-uploader-btn
                    :activeTab="activeTab"
                ></video-uploader-btn>
                <audio-uploader-btn
                    :activeTab="activeTab">
                </audio-uploader-btn>

            </dt>
            <dd>
                <button class="btn-default-samll w100" @click="updatePost" v-if="feed&&feed.id">Update</button>
                <button class="btn-default-samll w100" @click="uploadPost" v-else>Post</button>
                <button class="btn-default-samll w100 cancel-btn" @click="hideModal">Cancel</button>
            </dd>
        </dl>

        <!-- /이미지 미리보기 -->

        <!--    모달-->
        <modal :clickToClose="false" class="modal-area-type" name="alertModal" width="90%" height="auto" :maxWidth="380"
               :adaptive="true"
               :scrollable="true">
            <div class="modal-alert">
                <dl class="ma-header">
                    <dt>안내</dt>
                    <dd>
                        <button @click="$modal.hide('alertModal')"><i class="uil uil-times"></i></button>
                    </dd>
                </dl>
                <div class="ma-content">
                    <h2>작성 중인 내용이 저장되지 않고 사라집니다.<br/>작성을 끝내시겠습니까?</h2>
                    <div>
                        <button class="btn-default w48p" @click="leavePost(true)">네</button>
                        <button class="btn-gray w48p" @click="leavePost(false)">아니오</button>
                    </div>
                </div>
            </div>
        </modal>

        <modal :clickToClose="false" class="modal-area-type" name="alertAttrModal" width="90%" height="auto"
               :maxWidth="380"
               :adaptive="true"
               :scrollable="true">
            <div class="modal-alert">
                <dl class="ma-header">
                    <dt>안내</dt>
                    <dd>
                        <button @click="$modal.hide('alertAttrModal')"><i class="uil uil-times"></i></button>
                    </dd>
                </dl>
                <div class="ma-content">
                    <h2>같은 포맷의 파일만 업로드할 수 있습니다. 다양한 포맷의 파일을 업로드 하고 싶은 경우 블로그 포스팅을 이용해주세요.</h2>
                    <p>기존 첨부파일을 지우시겠습니까?</p>
                    <div>
                        <button class="btn-default w48p" @click="resetAttr(false)">아니오</button>
                        <button class="btn-gray w48p" @click="resetAttr(true)">네</button>
                    </div>
                </div>
            </div>
        </modal>

        <modal :clickToClose="false" class="modal-area-type" name="minChar" width="90%" height="auto"
               :maxWidth="380"
               :adaptive="true"
               :scrollable="true">
            <div class="modal-alert">
                <dl class="ma-header">
                    <dt>안내</dt>
                    <dd>
                        <button @click="$modal.hide('minChar')"><i class="uil uil-times"></i></button>
                    </dd>
                </dl>
                <div class="ma-content">
                    <h2> 최소 1글자 이상 작성해주세요 </h2>
                    <div>
                        <button class="btn-default" style="width:100%" @click="$modal.hide('minChar')">네</button>
                    </div>
                </div>
            </div>
        </modal>


    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from "vue-property-decorator";
import {mapGetters} from "vuex";
import TiptapSns from "@/components/timeline/_tiptapSns.vue";
import TiptapBlog from "@/components/timeline/_tiptapBlog.vue";
import moment from "moment";
import ImageUploaderBtn from "@/components/timeline/post/_imageUploaderBtn.vue";
import VideoUploaderBtn from "@/components/timeline/post/_videoUploaderBtn.vue";
import AudioUploaderBtn from "@/components/timeline/post/_audioUploaderBtn.vue";
import {User} from "@/types";

import Messages from "@/components/pages/user/Messages.vue";
import {AxiosError, AxiosResponse} from "axios";
import {Swiper, SwiperSlide} from "vue-awesome-swiper";
import Toast from "@/script/message";
import {forEach} from "lodash";

@Component({
    computed: {...mapGetters(["user"])},
    components: {
        Messages,
        ImageUploaderBtn,
        TiptapSns,
        TiptapBlog,
        VideoUploaderBtn,
        AudioUploaderBtn,
        Swiper,
        SwiperSlide,
    },
})
export default class Post extends Vue {
    toast = new Toast();
    feed: any = {};
    isEditorEmpty: boolean = true;
    private youtubeLink: string[] = [];

    private communityList: any[] = [];
    private isChannelOn: boolean = false;
    private communities: string = "Communities";
    private channels: string = "Channels";

    // 첨부파일
    private imgPreviewArr: any[] = [];
    private videoSrc: any = {};
    private audioPreviewArr: any[] = [];

    private user!: User;
    // follow 공개 여부
    private isPrivate: boolean = false;
    private isScheduledPost: boolean = false;
    private time: any = 0;

    private selectedCommunityId: number = -1;
    private selectedChannelId: number = -1;

    // 예약 포스팅
    private minDate = new Date();
    private reserved_date: string = "";
    private reserved_time: string = "";

    //community
    private isCommunityClick: boolean = false;

    private selectedCommunity: any = "";
    private selectedCategory: any[] = [];

    private attFiles: any[] = [];
    updateImgArr: any = [];
    updateAudioArr: any = [];
    updateVideo: any = {};

    textPreview: any = "";
    userTag: string = "";

    activeTab: string = "SNS";
    sliderValue = 200
    MPIswiperOption = {
        pagination: {
            el: '.swiper-pagination'
        },
        slidesPerView: 4,
        spaceBetween: 10,
        breakpoints: {
            300: {
                slidesPerView: 3
            },
            480: {
                slidesPerView: 4
            },
            768: {
                slidesPerView: 4
            },
            992: {
                slidesPerView: 4
            },
            1200: {
                //slidesPerView: 7
            }
        }
    }


    // 해시태그 멘션
    private hasTagSuggestion: boolean = false;
    private postedHashtag: string[] = [];

    async mounted() {

        await this.$store.dispatch("loginState");
        if (this.$store.getters.feed) {
            this.feed = this.$store.getters.feed
            this.prefill();
        }
        // this.fetch();
    }

    beforeDestroy() {
        this.init()
        this.$emit('reMount')

    }

    prefill() {
        this.activeTab = this.feed.post_type;
        const attachFiles = Array.isArray(this.feed.attatchment_files) ? this.feed.attatchment_files : JSON.parse(this.feed.attatchment_files)
        if (attachFiles) {
            this.$store.dispatch('resetAttFiles')
            for (const file of attachFiles) {
                if (this.activeTab === 'SNS') {
                    if (file.type === 'image') {
                        this.$store.commit('imgArr', file)
                    }
                    else if (file.type === 'sound') {
                        this.$store.commit('audioArr', file)
                    }
                    else if (file.type === 'video') {
                        this.$store.commit('videoArr', file)
                    }

                }
                else if (this.activeTab === 'BLOG') {

                    if (file.type === 'image') {
                        this.$store.commit('blogImgArr', file)
                    }
                    else if (file.type === 'sound') {
                        this.$store.commit('blogAudioArr', file)
                    }
                    else if (file.type === 'video') {
                        this.$store.commit('blogVideoArr', file)
                    }
                    // console.log("blogAudioArr", this.$store.getters.blogAudioArr)
                    // console.log("blogVideoArr", this.$store.getters.blogVideoArr)
                    // console.log("blogImgArr", this.$store.getters.blogImgArr)
                }

            }
        }
        this.$store.commit('postContents', this.feed.content);

    }

    fetch() {
        const obj = {
            user_id: this.user.id,
            sort: 'ALPAHBETIC'
        }
        this.$api.joinedCommunityList(this.user.id)
            .then((res: any) => {
                this.communityList = res;
            })
            .catch((err: AxiosError) => {

            })
    }

    init() {
        this.selectedCategory = [];
        this.videoSrc = "";
        this.imgPreviewArr = [];
        this.audioPreviewArr = [];
        this.$store.dispatch("resetEditor");
    }

    isActive(type: string) {
        if (!this.user) {
            this.$modal.show('needLogin')
        }
        else {
            this.isPostEmpty() ? this.activeTab = type : this.$modal.show('alertModal');
            // this.isEditorEmpty = true
        }

    }

    isPostEmpty() {
        if (
            this.attFiles.length !== 0 ||
            !this.isEditorEmpty ||
            this.$store.getters.imgArr.length > 0 ||
            this.$store.getters.audioArr.length > 0
            || this.feed.content
            // || !(Object.keys(this.feed).length === 0)
        ) {
            // console.log(this.attFiles.length !== 0)
            // console.log(this.isEditorEmpty)
            // console.log(this.$store.getters.imgArr.length)
            // console.log(this.$store.getters.audioArr.length)
            return false;
        }
        else {
            return true;
        }
    }

    leavePost(state: boolean) {
        if (state) {
            if (this.activeTab === 'SNS') {
                this.activeTab = 'BLOG'
            }
            else {
                this.activeTab = 'SNS'
            }
            this.init();
        }

        this.$modal.hide('alertModal')
    }

    hideModal() {
        this.$store.dispatch('resetEditor')
        this.$modal.hide('modalPost')
    }

    //포스팅 업로드
    async uploadPost() {
        this.attFiles = [];
        let date = this.reserved_date + "T" + this.reserved_time;
        let scheduledTime = moment(date).valueOf();

        if (this.activeTab === 'BLOG') {
            if (this.$store.getters.blogImgArr.length > 0) {
                for (let i = 0; i < this.$store.getters.blogImgArr.length; i++) {
                    if (!this.$store.getters.postContents.includes(`"attr-img" src="${this.$store.getters.blogImgArr[i].url}"`)) {
                        this.$store.getters.blogImgArr.splice(i, 1)
                    }
                }
                this.attFiles.push(...this.$store.getters.blogImgArr)
            }
            if (this.$store.getters.blogVideoArr.length > 0) {
                for (let i = 0; i < this.$store.getters.blogVideoArr.length; i++) {
                    if (!this.$store.getters.postContents.includes(`<iframe src="${this.$store.getters.blogVideoArr[i].url}"`)) {
                        this.$store.getters.blogVideoArr.splice(i, 1)
                    }
                }
                this.attFiles.push(...this.$store.getters.blogVideoArr)
            }
            if (this.$store.getters.blogAudioArr.length > 0) {

                for (let i = 0; i < this.$store.getters.blogAudioArr.length; i++) {
                    if (!this.$store.getters.postContents.includes(`src="${this.$store.getters.blogAudioArr[i].url}"`)) {
                        this.$store.getters.blogAudioArr.splice(i, 1)
                    }
                }
                this.attFiles.push(...this.$store.getters.blogAudioArr)
            }
        }
        else {
            this.attFiles = await this.uploadAtt();
        }
        if (this.$store.getters.postContents.length === 0) {
            this.$modal.show('minChar')
        }
        else {
            const obj = {
                user_uid: this.user.uid,
                post_state: this.activeTab,
                attatchment_files: this.attFiles,
                post_contents: this.$store.getters.postContents,
                visibility: this.isPrivate ? "PRIVATE" : "PUBLIC",
                hashtags: [],
                // user_tagId: this.$store.getters.userTagList,
                user_tag: [
                    // {
                    //     id: 111,
                    //     nickname: "followers"
                    // },
                ],
                game_id: "",
                channel_id: this.user.channel_id,
                ...this.$store.getters.currPage,
                // portfolio_ids: [
                // ],
                scheduled_for: null
            }

            this.$api.uploadPost(obj)
                .then((res: AxiosResponse) => {
                    this.$emit('refetch')
                    this.toast.successToast("포스팅이 완료되었습니다.")
                })
                .catch((err: AxiosError) => {
                    this.toast.failToast("업로드에 실패하였습니다.")
                })
                .finally(() => {
                    this.$modal.hide("modalPost");
                    this.init();
                    this.$store.commit('postContents', '')
                })
        }


    }


    //포스팅 수정
    async updatePost() {

        // if (this.activeTab === 'BLOG') {
        //     if (this.$store.getters.blogImgArr) {
        //         // for (let i = 0; i < this.$store.getters.blogImgArr.length; i++) {
        //         //     if (!this.$store.getters.postContents.includes(`"attr-img" src="${this.$store.getters.blogImgArr[i].url}"`)) {
        //         //         this.$store.getters.blogImgArr.splice(i, 1)
        //         //     }
        //         // }
        //         this.attFiles.push(this.$store.getters.blogImgArr)
        //     }
        //     if (this.$store.getters.blogVideoArr) {
        //         // for (let i = 0; i < this.$store.getters.blogVideoArr.length; i++) {
        //         //     if (!this.$store.getters.postContents.includes(`<iframe src="${this.$store.getters.blogVideoArr[i].url}"`)) {
        //         //         this.$store.getters.blogVideoArr.splice(i, 1)
        //         //     }
        //         // }
        //         this.attFiles.push(this.$store.getters.blogVideoArr)
        //     }
        //     if (this.$store.getters.blogAudioArr) {
        //
        //         // for (let i = 0; i < this.$store.getters.blogAudioArr.length; i++) {
        //         //     if (!this.$store.getters.postContents.includes(` src="${this.$store.getters.blogAudioArr[i].url}"`)) {
        //         //         this.$store.getters.blogAudioArr.splice(i, 1)
        //         //     }
        //         // }
        //         this.attFiles.push(this.$store.getters.blogAudioArr)
        //     }
        // }
        // else {
        //     this.attFiles = await this.uploadAtt();
        // }
        // console.log('this.attFiles', this.attFiles)
        // console.log('this.$store.getters.blogAudioArr', this.$store.getters.blogAudioArr)
        // console.log('this.updateAudioArr', this.updateAudioArr)
        // if (this.updateImgArr.length > 0) {
        //     this.attFiles.unshift(...this.updateImgArr)
        // }
        // if (this.updateAudioArr.length > 0) {
        //     this.attFiles.unshift(...this.updateAudioArr)
        // }
        // if (Object.keys(this.updateVideo).length !== 0) {
        //     this.attFiles.unshift(this.updateVideo)
        // }
// console.log('====', this.attFiles)

        //todo: 백엔드 수정후 변경
        if(this.$store.getters.postContents.includes('<audio')){
            this.attFiles.push( {
                priority: 0,
                url:'audio',
                type:'sound'
            })
        }
        if(this.$store.getters.postContents.includes('<iframe')){
            this.attFiles.push( {
                priority: 0,
                url:'video',
                type:'video'
            })

        }
        if(this.$store.getters.postContents.includes('<img')){
            this.attFiles.push( {
                priority: 0,
                url:'image',
                type:'image'
            })
        }


        const obj = {
            post_id: this.feed.id,
            user_uid: this.user.uid,
            post_state: this.activeTab,
            attatchment_files: this.attFiles,
            post_contents: this.$store.getters.postContents,
            visibility: this.isPrivate ? "PRIVATE" : "PUBLIC",
            hashtags: [],
            // user_tagId: this.$store.getters.userTagList,
            // user_tagId:'123',
            game_id: "",
            channel_id: this.user.channel_id,
            ...this.$store.getters.currPage,
            portfolio_ids: [""],
            scheduled_for: null
        }

        this.$api.updatePost(obj)
            .then((res: AxiosResponse) => {
                this.$emit('refetch')
                this.toast.successToast("포스팅이 수정되었습니다.")
            })
            .catch((err: AxiosError) => {
                this.toast.failToast("포스팅 수정에 실패하였습니다.")
            })
            .finally(() => {
                this.init();
                this.$modal.hide("modalPost");
                this.$store.commit('postContents', '')
            })
    }


    editorState(state: boolean) {
        this.isEditorEmpty = state;
    }


    /**
     * 첨부파일
     * */
    @Watch('$store.getters.imgArr')
    imgArr() {
        this.imgPreviewArr = this.$store.getters.imgArr

    }

    @Watch('$store.getters.audioArr')
    audioArr() {
        this.audioPreviewArr = this.$store.getters.audioArr
    }

    @Watch('$store.getters.videoArr')
    watchImg() {
        this.videoSrc = this.$store.getters.videoArr
    }

    deletePreviewImg(idx: number) {
        this.$store.getters.imgArr.splice(idx, 1)
        this.imgPreviewArr = this.$store.getters.imgArr
    }

    deleteVideo() {
        this.videoSrc = "";
    }

    deleteAudio(idx: number) {
        this.$store.getters.audioArr.splice(idx, 1)
    }

    async uploadAtt() {
        const imgFiles: any = [];
        const audioFiles: any = [];

        this.$store.getters.imgArr.forEach((img) => {
            if (img.file) {
                imgFiles.push(img)
            }
            else {
                this.updateImgArr.push(img)
            }
        })

        this.$store.getters.audioArr.forEach((audio) => {
            if (audio.file) {
                audioFiles.push(audio)
            }
            else {
                this.updateAudioArr.push(audio)
            }
        })

        const formData = new FormData();

        for (let i = 0; i < imgFiles.length; i++) {
            formData.append(imgFiles[i].file.name, imgFiles[i].file);
        }

        for (let i = 0; i < audioFiles.length; i++) {
            formData.append(audioFiles[i].file.name, audioFiles[i].file);
        }


        if (this.videoSrc.file) {
            formData.append(this.videoSrc.file.name, this.videoSrc.file)
        }
        else {
            this.updateVideo = this.videoSrc;
        }

        if (formData) {
            return await this.$api.fileUploader(formData)
        }

    }

    resetAttr(isReset: boolean) {
        if (isReset) {
            this.$store.dispatch('resetAttFiles')
        }
        this.$modal.hide('alertAttrModal')


    }

    /**
     * 예약 포스팅
     * */

    @Watch("reserved_time")
    watchTime(time: Date) {
        let today = moment().format("yyyy-MM-DD");
        let currentTime = moment().format("HH:MM:SS");
        let newTime = moment().add(1, "h").format("HH:MM:SS");

        if (today === this.reserved_date) {
            if (currentTime >= this.reserved_time) {
                alert("현재시간 이전은 선택이 불가능합니다.");
                this.reserved_time = newTime;
            }
        }
    }

    /**
     * 포스팅 카테고리 선택
     * */
    // select category
    selectCommunity(e) {
        let selectedItem = e.target.value;
        if (selectedItem.toLowerCase() === "communities") {
            this.isChannelOn = false;
        }
        else {
            this.isChannelOn = true;
            // this.channelList = this.$api.getCommunityInfo(
            //     selectedItem.id
            // ).channels;
        }
        this.communities = selectedItem.name;
        this.selectedCommunityId = selectedItem.id;
    }

    selectChannel(selectedItem: any) {
        this.channels = selectedItem.name;
        this.selectedChannelId = selectedItem.id;
        // console.log(selectedItem);
    }

    getChannel(channel) {
        this.selectedCommunity = Object.assign(this.selectedCommunity, {
            channel: channel,
        });

        this.selectedCategory.push(this.selectedCommunity);
    }

    getCommunity(community) {
        this.selectedCommunity = community;
    }

    deleteCategory(idx: number) {
        this.selectedCategory.splice(idx, 1);
    }
}
</script>

<style lang="scss" scoped>
.btn-default-samll {
    width: 30%;
    float: right;
    padding: 5px 5px 0px 0px;
}


.btn-default.post-btn.active {
    color: #fff;
    background: #F97316;
}

.btn-default.post-btn {
    background: #fff;
    color: #F97316;
    /* border-color: #F97316; */
    border-bottom: 1px solid #F97316;
}

.video-container {
    video {
        margin-top: 15px;
        width: 100%;
    }

}

.audio-preview-container {
    // background-color: #F97316;
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    // border-top: 2px solid #616161;

    .audio-preview {
        margin: 5px;
        height: 70px;
        width: 100%;
        border-radius: 10px;
        position: relative;
        overflow: hidden;

        .icon-cross {
            position: absolute;
            top: 0px;
            right: 10px;
            cursor: pointer;
        }


        audio {
            margin-top: 15px;
            display: block;
            border-radius: 10px;
            width: 100%;
            //height: 100px;
        }
    }
}

.positive {
    margin-right: 4px;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-pack: center;
    justify-content: center;
    -ms-flex-align: center;
    align-items: center;
    width: 16px;
    height: 16px;
    border-radius: 50%;

    border: 1px solid #fff;
}

.quick-post.dimmed {
    // position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    z-index: 100;
    // background-color: rgb(0, 0, 0);
    // opacity: 0.3;
    pointer-events: none;
}

.date-container {
    display: flex;
    justify-content: space-evenly;

    .datepicker,
    .timepicker {
        width: 48%;
        background-color: #1d2333;
        border: 1px solid #616a82;

        .btn {
            // width: 30% !important;
        }

        label {
            color: #fff !important;
        }

        svg {
            fill: #616a82;
        }

        .dropdown-menu .show {
            width: 100% !important;
        }
    }
}

.form-control {
    .btn {
        width: 50% !important;
    }
}

// image preview of post
.img-preview-container {
    // background-color: #F97316;
    display: flex;
    /* flex-direction: row; */
    flex-wrap: nowrap;
    // border-top: 2px solid #616161;

    .img-preview {
        margin: 5px;
        height: auto;
        width: 100px;
        border-radius: 10px;
        position: relative;
        overflow: hidden;

        .icon-cross {
            position: absolute;
            top: 10px;
            right: 10px;
            cursor: pointer;
        }

        img {
            display: block;
            border-radius: 10px;
            width: 100%;
            height: auto;
        }
    }
}

.upload-image {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 150px;
    white-space: nowrap;
    overflow-x: auto;
}

.preview-img {
    max-width: 100%;
    height: 100%;
}

.input {
    height: 150px;
    color: #fff;
    text-align: left;
    padding: 20px;
    overflow: auto;
}

.editor-header {
    display: flex;
    align-items: center;
    flex: 0 0 auto;
    flex-wrap: wrap;
    padding: 0.25rem;
    border-bottom: 1px solid #fff;
    /* margin-bottom: 20px; */
}

.menu-item {
    width: 1.75rem;
    height: 1.75rem;
    color: #fff;
    border: none;
    background-color: transparent;
    border-radius: 0.4rem;
    padding: 0.25rem;
    margin-right: 0.25rem;
}

.editor-container {
    text-align: left;
    padding: 15px;

    .iframe-wrapper {
        position: relative;
        padding-bottom: 100/16 * 9%;
        overflow: hidden;
        width: 100%;
        height: auto;

        &.ProseMirror-selectednode {
            outline: 3px solid #F97316;
        }

        iframe {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;

        }
    }

    .video-wrapper {
        position: relative;
        padding-bottom: 100/16 * 9%;

        overflow: hidden;
        width: 360px;
        height: 240px;

        &.ProseMirror-selectednode {
            outline: 3px solid #F97316;
        }
    }

    .audio-wrapper {
        margin: 20px 20px 0 20px;
        display: flex;
        align-items: center;
        border-radius: 5px;
        background: #f5f5f5;
        flex-direction: column;

        audio {
            width: 100%;
        }

        p {
            width: 100%;
            height: 30px;
            padding-left: 20px;
        }

        &.ProseMirror-selectednode {
            outline: 3px solid #F97316;
        }
    }
}

.audio-wrapper {
    margin: 20px 20px 0 20px;
    display: flex;
    align-items: center;
    border-radius: 5px;
    background: #f5f5f5;
    flex-direction: column;

    audio {
        width: 100%;
    }

    p {
        width: 100%;
        height: 30px;
        padding-left: 20px;
    }
}

.mp-category {
    padding: 0;
    border-bottom: 0px;
}

.cancel-btn {
    margin-right: 10px;
    background-color: #dc3545;
}

.cancel-btn:hover {
    color: #dc3545;
    background: rgba(220, 53, 69, 0.27);
}

.delete-btn {
    position: absolute;
    top: 5px;
    right: 5px;
    font-size: 20px;
    color: #333;
    cursor: pointer;
}

.delete-btn:hover, .audio-cancel-btn:hover {
    color: #F97316;
}

.audio-cancel-btn {
    font-size: 20px;
    color: #333;
    cursor: pointer;
    display: flex;
    justify-content: flex-end;

}

.swiper-wrapper, .swiper-container {
    height: 130px !important;
}

.mp-midi {
    padding: 0px !important;
}

.btn-container {
    padding-bottom: 0px !important;
    width: 100%;
    padding-top: 0px !important;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: auto !important;
}
</style>
