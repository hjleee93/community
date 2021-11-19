<template>
    <div class="quick-post" id="postContainer">
        <div class="quick-post-header">
            <div class="option-items">
                <div
                    class="option-item"
                    @click="isActive('SNS')"
                    :class="activeTab === 'SNS' ? 'active' : ''"
                >
                    <svg class="option-item-icon icon-status">
                        <use xlink:href="#svg-status"></use>
                    </svg>

                    <p class="option-item-title">Post</p>
                </div>
                <div
                    class="option-item"
                    @click="isActive('BLOG')"
                    :class="activeTab === 'BLOG' ? 'active' : ''"
                >
                    <svg class="option-item-icon icon-status">
                        <use xlink:href="#svg-status"></use>
                    </svg>

                    <p class="option-item-title">Blog Post</p>
                </div>
            </div>
        </div>

        <!-- blog post -->
        <div class="quick-post-body" v-if="activeTab === 'BLOG'">
            <div class="form">
                <div class="form-row">
                    <div class="form-item">
                        <div class="form-textarea">
                            <!-- tiptap -->
                            <tiptap-post
                                :postType="activeTab"
                                @isEmpty="editorState"
                                :key="activeTab"
                            ></tiptap-post>

                            <!-- <video
                                width="320"
                                height="240"
                                controls
                                v-if="videoSrc"
                            >
                                <source
                                    :src="videoSrc"
                                    :type="`video/${fileExt}`"
                                    :key="videoSrc"
                                />
                            </video> -->
                            <!-- <audio controls v-if="audioSrc">
                                <source
                                    :src="audioSrc"
                                    :type="`audio/${fileExt}`"
                                    :key="audioSrc"
                                />
                            </audio> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- sns post -->
        <div class="quick-post-body" v-else-if="activeTab === 'SNS'">
            <div class="form">
                <div class="form-row">
                    <div class="form-item">
                        <div class="form-textarea">
                            <tiptap-sns
                                :feed="feed"
                                @isEmpty="editorState"
                                :key="activeTab"
                            ></tiptap-sns>

                            <image-preview
                                :feed="feed"
                                :editFileLoader="fileLoader"
                            ></image-preview>



                            <div
                                class="video-container"
                                v-if="videoSrc.url"
                            >
                                <svg class="icon-cross" @click="deleteVideo">
                                    <use xlink:href="#svg-cross-thin"></use>
                                </svg>

                                <video
                                    width="320"
                                    height="240"
                                    controls
                                    :src="videoSrc.url"
                                ></video>
                            </div>
                            <!-- <p>{{ feed.attatchment_files }}</p> -->
                            <audio-preview :feed="feed"></audio-preview>
                            <!-- <div
                                v-for="(audio, idx) in audioPreviewArr"
                                :key="idx"
                            >
                                <svg
                                    class="icon-cross"
                                    @click="deletePreviewAudio(idx)"
                                >
                                    <use xlink:href="#svg-cross-thin"></use>
                                </svg>
                                <audio controls :src="audio"></audio>
                            </div> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <overlay-scrollbars>
            <div
                @mousewheel="disableWheel"
                class="
                    custom-scroll
                    quick-post-footer
                    post-select
                    category-select
                "
            >
                <!-- todo: user id send -->
                <!-- <p>{{ feed.posted_at }}</p> -->
                <!--                <custom-tooltip-->
                <!--                    @channel="getChannel"-->
                <!--                    @community="getCommunity"-->
                <!--                ></custom-tooltip>-->

                <div
                    class="category-listing"
                    v-for="(category, idx) in selectedCategory"
                    :key="idx"
                >
                    <button class="selected-category" ref="categoryBtn">
                        <div class="category-title pl-2">
                            <p>{{ category.name }}</p>
                        </div>
                        <div class="diagonal-border mx-2"></div>
                        <div class="category-title">
                            <p>{{ category.channel.name }}</p>
                        </div>
                        <div class="mx-2" @click="deleteCategory(idx)">
                            <svg class="icon-cross">
                                <use xlink:href="#svg-cross-thin"></use>
                            </svg>
                        </div>
                    </button>
                </div>

                <!-- <div
                    class="category-listing"
                    v-for="(category, idx) in selectedCategory"
                    :key="idx"
                >
                    <button class="selected-category" ref="categoryBtn">
                        <div class="category-title pl-2">
                            <p>{{ category.community.name }}</p>
                        </div>
                        <div class="diagonal-border mx-2"></div>
                        <div class="category-title">
                            <p>{{ category.channel.name }}</p>
                        </div>
                        <div class="mx-2" @click="deleteCategory(idx)">
                            <svg class="icon-cross">
                                <use xlink:href="#svg-cross-thin"></use>
                            </svg>
                        </div>
                    </button>
                </div> -->

                <!-- <div class="form-select dropdown-container">
                <select class="dropbox dropdown-item" @change="selectCommunity">
                    <option value="communities">My games</option>

                    <option>game</option>
                </select>
            </div>
            <div class="form-select dropdown-container">
                <select class="dropbox dropdown-item" @change="selectCommunity">
                    <option value="communities">Portfolios</option>

                    <option>Portfolio</option>
                </select>
            </div> -->
            </div>
        </overlay-scrollbars>
        <!-- <div class="quick-post-footer checkbox">
            <div class="checkbox-wrap">
                <input
                    type="checkbox"
                    id="event-add-end-time"
                    name="event_add-end-time"
                />

                <div class="checkbox-box">
                    <svg class="icon-check">
                        <use xlink:href="#svg-check"></use>
                    </svg>
                </div>

                <label for="event-add-end-time">private</label>
            </div>
        </div> -->

        <div class="quick-post-footer attachment">
            <div class="quick-post-footer-actions">
                <!-- upload pic -->

                <image-uploader-btn
                    @fileCheckDone="getFileList('img')"
                    :activeTab="activeTab"
                ></image-uploader-btn>

                <!-- upload video -->
                <video-uploader-btn
                    @fileCheckDone="getFileList('video')"
                    :activeTab="activeTab"
                ></video-uploader-btn>

                <!-- /upload video  -->
                <!-- upload audio -->
                <audio-uploader-btn
                    @fileCheckDone="getFileList('audio')"
                    :activeTab="activeTab"
                >
                </audio-uploader-btn>
                <!-- /upload audio -->
                <!-- <div
                    class="quick-post-footer-action text-tooltip-tft-medium"
                    data-title="Insert Link"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                    >
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path
                            d="M13.06 8.11l1.415 1.415a7 7 0 0 1 0 9.9l-.354.353a7 7 0 0 1-9.9-9.9l1.415 1.415a5 5 0 1 0 7.071 7.071l.354-.354a5 5 0 0 0 0-7.07l-1.415-1.415 1.415-1.414zm6.718 6.011l-1.414-1.414a5 5 0 1 0-7.071-7.071l-.354.354a5 5 0 0 0 0 7.07l1.415 1.415-1.415 1.414-1.414-1.414a7 7 0 0 1 0-9.9l.354-.353a7 7 0 0 1 9.9 9.9z"
                            fill="rgba(97,106,130,1)"
                        />
                    </svg>
                </div> -->

                <!-- 투표 -->
                <!-- <div
                    class="quick-post-footer-action text-tooltip-tft-medium"
                    data-title="Poll"
                >
                    <svg class="option-item-icon icon-poll">
                        <use xlink:href="#svg-poll"></use>
                    </svg>
                </div> -->
                <!-- scheduled post -->
                <!-- <div
                    class="quick-post-footer-action text-tooltip-tft-medium"
                    data-title="Schedule Post"
                    @click="isScheduledPost = !isScheduledPost"
                >
                    <svg class="option-item-icon icon-blog-posts">
                        <use xlink:href="#svg-blog-posts"></use>
                    </svg>
                </div> -->
                <div class="checkbox-wrap">
                    <input
                        type="checkbox"
                        :id="feed ? `checkbox${feed.id}` : 'checkbox'"
                        v-model="isPrivate"
                    />

                    <div class="checkbox-box">
                        <svg class="icon-check">
                            <use xlink:href="#svg-check"></use>
                        </svg>
                    </div>

                    <label :for="feed ? `checkbox${feed.id}` : 'checkbox'"
                    >private</label
                    >
                </div>
            </div>

            <div class="quick-post-footer-actions">
                <!-- <p class="button small">임시 저장</p> -->
                <p class="button small secondary" @click="updatePost" v-if="feed">Update</p>
                <p class="button small secondary" @click="uploadPost" v-else>Post</p>
            </div>
        </div>
        <div v-if="isScheduledPost" class="date-container">
            <b-form-datepicker
                today-button
                :min="minDate"
                class="datepicker"
                v-model="reserved_date"
            >
            </b-form-datepicker>
            <b-form-timepicker
                class="timepicker"
                v-model="reserved_time"
            ></b-form-timepicker>
        </div>
        <iframe
            v-for="link in youtubeLink"
            :key="link.id"
            width="560"
            height="315"
            :src="`https://www.youtube.com/embed/${link}`"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
        ></iframe>

        <div v-html="content"></div>
        <b-modal
            ref="alertModal"
            class="modal-container"
            centered
            hide-header
            hide-footer
            no-close-on-backdrop
        >
            <p class="my-4" style="color: #000">
                작성중인 글은 저장되지 않고 사라집니다. 작성을 끝내시겠습니까?
            </p>

            <div>
                <button
                    class="popup-box-action half button tertiary"
                    style="width: 47%"
                    @click="postDone(true)"
                >
                    OK
                </button>
                <button
                    class="popup-box-action half button"
                    style="width: 47%"
                    @click="postDone(false)"
                >
                    Cancel
                </button>
            </div>
        </b-modal>
    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from "vue-property-decorator";
import {mapGetters} from "vuex";
import Tooltip from "@/plugins/tooltip";
import FileUpload from "@/components/common/FileUpload.vue";
import TiptapSns from "@/components/timeline/TiptapSns.vue";
import TiptapPost from "@/components/timeline/TiptapPost.vue";
import Modal from "@/components/common/Modal.vue";

import {Editor, EditorContent, HTMLElement, VueRenderer} from "@tiptap/vue-2";

import moment from "moment";
import {FileLoader} from "@/script/fileLoader";
import {mbToByte} from "@/script/fileManager";
import ImageUploaderBtn from "@/components/timeline/post/ImageUploaderBtn.vue";
import ImagePreview from "@/components/timeline/post/ImagePreview.vue";
import VideoUploaderBtn from "@/components/timeline/post/VideoUploaderBtn.vue";
import AudioUploaderBtn from "@/components/timeline/post/AudioUploaderBtn.vue";
import AudioPreview from "@/components/timeline/post/AudioPreview.vue";

import AlertModal from "@/components/common/AlertModal.vue";
import {User} from "@/types";

import Messages from "@/components/pages/user/Messages.vue";

import Dropdown from "@/plugins/dropdown";
import CustomTooltip from "@/components/layout/tooltip/Tooltip.vue";
import {fileObjWtUrl} from "@/types/file/file";
import {AxiosError, AxiosResponse} from "axios";
import {OverlayScrollbarsComponent} from "overlayscrollbars-vue";
@Component({
    computed: {...mapGetters(["user"])},
    components: {
        Messages,
        FileUpload,
        EditorContent,
        Modal,
        ImageUploaderBtn,
        ImagePreview,
        TiptapSns,
        TiptapPost,
        AlertModal,
        CustomTooltip,
        VideoUploaderBtn,
        AudioUploaderBtn,
        AudioPreview,
    },
})
export default class Post extends Vue {
    @Prop() feed!: any;
    private dropdown: Dropdown = new Dropdown();
    private tooltip: Tooltip = new Tooltip();
    private fileLoader: FileLoader = new FileLoader();
    private editor!: Editor;
    private postEditor!: Editor;
    private postingText: string = "";
    private isEditorEmpty: boolean = true;

    private content: string = "";
    private youtubeLink: string[] = [];

    private communityList: any[] = [];
    private isChannelOn: boolean = false;
    private communities: string = "Communities";
    private channelList: any[] = [];
    private channels: string = "Channels";

    // 첨부파일
    private imgPreviewArr: any[] = [];
    private videoSrc: any = {};
    private fileList: {
        img: fileObjWtUrl[];
        video: fileObjWtUrl[];
        audio: fileObjWtUrl[];
    } = {
        img: [],
        video: [],
        audio: [],
    };
    private remainFileSize: number = 20971520; //20mb (binary);
    private audioPreviewArr: any[] = [];
    private remainAudioSize: number = 41943040; //40mb

    private user!: User;

    private tempType: string = "";
    private imageSrcArr: ImageData[] = [];
    private selectedFileType: string = "";

    // follow 공개 여부
    private isPrivate: boolean = false;
    private isScheduledPost: boolean = false;
    private time: any = 0;

    private selectedCommunityId: number = -1;
    private selectedChannelId: number = -1;
    private selectedGameId: number = -1;
    private selectedPfId: number = -1;

    // 예약 포스팅
    private minDate = new Date();
    private reserved_date: string = "";
    private reserved_time: string = "";

    //community
    private isCommunityClick: boolean = false;

    //postring
    private isResetEditor: boolean = false;

    private selectedCommunity: any = "";
    private selectedCategory: any[] = [];

    private attFiles: any[] = [];

    //scroll
    ops = {
        scrollPanel: {
            scrollingY: false,
        },

        bar: {
            background: "rgb(119, 80, 248)",
            opacity: 1,
            keepShow: true,
        },
    };

    textPreview: any = "";
    tempKey: string = "";
    userTag: string = "";

    // videoSrc: string = "";
    audioSrc: string = "";
    imgSrc: string = "";
    activeTab: string = "SNS";

    // 해시태그 멘션
    private hasTagSuggestion: boolean = false;
    private postedHashtag: string[] = [];

    async mounted() {
        await this.$store.dispatch("loginState");
        // console.log(this.$store.getters.currPage)
        // console.log(this.feed);
        this.tooltip.init();
        this.dropdown.init();

        this.fetch();




    }

    prefill(){

            // console.log()
            // this.selectedCategory = (
            //     await this.$api.getPostedAt(this.feed.id)
            // ).community;
            console.log(this.feed);

            if (this.feed.attatchment_files.img) {
                this.fileLoader.fileObj.img = this.feed.attatchment_files.img;
            }
            else if (this.feed.attatchment_files.audio) {
                this.fileLoader.fileObj.audio =
                    this.feed.attatchment_files.audio;
            }
            else if (this.feed.attatchment_files.video) {
                this.fileLoader.fileObj.video =
                    this.feed.attatchment_files.video;


        }
    }
    fetch() {
        const obj = {
            user_id: this.user.id,
            sort: 'ALPAHBETIC'
        }
        this.$api.joinedCommunityList(this.user.id)
            .then((res: AxiosResponse) => {
                console.log('res', res)
                this.communityList = res;
            })
            .catch((err: AxiosError) => {

            })


    }

    disableWheel(e) {
        e.stopPropagation();
    }

    init() {
        console.log("init");
        this.fileLoader.deletePreviewImg("all");
        this.fileLoader.deletePreviewAudio("all");
        this.fileLoader.fileObj.video = [];
        this.selectedCategory = [];
        this.imgSrc = "";
        this.audioSrc = "";
        this.videoSrc = "";
        this.imgPreviewArr = [];
        this.audioPreviewArr = [];
        this.remainFileSize = 20971520;
        this.remainAudioSize = 41943040;
        this.fileList = {img: [], video: [], audio: []};
        this.$store.dispatch("resetEditor");
        this.isResetEditor = true;
    }

    isActive(type: string) {
        if (!this.user) {
            (this.$refs["loginModal"] as any).show();
        }
        else {
            this.tempType = type;
            if (
                this.postingText ||
                this.imgSrc ||
                this.audioSrc ||
                this.videoSrc ||
                !this.isEditorEmpty
            ) {
                (this.$refs["alertModal"] as any).show();
            }
            else {
                this.activeTab = type;
            }
        }
    }

    postDone(state: boolean) {
        if (state) {
            this.init();
            this.activeTab = this.tempType;
        }
        (this.$refs["alertModal"] as any).hide();
    }

    //첨부파일 업로드
    uploadFile(fileType: string) {
        this.selectedFileType = fileType;

        // (this.$refs[fileType] as HTMLElement).click();
    }

    deleteVideo() {
        this.fileList.video = [];
        console.log(this.fileList);
        this.videoSrc = "";
    }

    deletePreviewAudio(idx: number) {
        this.remainAudioSize += this.fileList[idx].size;
        this.audioPreviewArr.splice(idx, 1);
        this.fileList.audio.splice(idx, 1);
    }

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

    //포스팅 업로드
    async uploadPost() {

        let date = this.reserved_date + "T" + this.reserved_time;
        let scheduledTime = moment(date).valueOf();
        this.attFiles = await this.uploadAtt()

        console.log(document.querySelectorAll('.hashtag'))

        const obj = {
            user_uid: this.user.uid,
            post_state: this.activeTab,
            attatchment_files: this.attFiles,
            post_contents: this.$store.getters.postContents,
            visibility: this.isPrivate ? "PRIVATE" : "PUBLIC",
            hashtags: [],
            // user_tagId: this.$store.getters.userTagList,
            user_tag: [
                {
                    id: 111,
                    nickname: "followers"
                },
            ],
            game_id: "",
            channel_id: this.user.uid,
            ...this.$store.getters.currPage,
            // portfolio_ids: [
            // ],
            scheduled_for: null
        }
        console.log(this.$store.getters.postContents)
        console.log(obj)

        this.$api.uploadPost(obj)
        .then((res: AxiosResponse) => {
            this.init();
            this.$emit("closePostModal");
            this.$toasted.show("포스팅이 완료되었습니다.", {
                fullWidth: true,
                fitToScreen: true,
                theme: "outline",
                position: "top-center",
                className: "toast-success",
                duration: 3000,
                type: "success",
                action: {
                    text: "X",
                    onClick: (e, toastObject) => {
                        toastObject.goAway(0);
                    },
                },
            });
        })
        .catch((err: AxiosError) => {
            this.$toasted.show("업로드에 실패하였습니다.", {
                fullWidth: true,
                fitToScreen: true,
                theme: "outline",
                position: "top-center",
                className: "toast-error",
                duration: 3000,
                type: "error",
                action: {
                    text: "X",
                    onClick: (e, toastObject) => {
                        toastObject.goAway(0);
                    },
                },
            });
        })


    }

    //포스팅 수정
    async updatePost(){
        const obj = {
            post_id:this.feed.id,
            user_uid: this.user.uid,
            post_state: this.activeTab,
            attatchment_files: this.attFiles,
            post_contents: this.$store.getters.postContents,
            visibility: this.isPrivate ? "PRIVATE" : "PUBLIC",
            hashtags: [],
            // user_tagId: this.$store.getters.userTagList,
            // user_tagId:'123',
            game_id: "",
            channel_id: this.user.uid,
            ...this.$store.getters.currPage,
            portfolio_ids: [
                ""
            ],
            scheduled_for: null
        }

        this.$api.updatePost(obj)
            .then((res: AxiosResponse) => {
                this.init();
                this.$emit("closePostModal");
                this.$toasted.show("포스팅이 완료되었습니다.", {
                    fullWidth: true,
                    fitToScreen: true,
                    theme: "outline",
                    position: "top-center",
                    className: "toast-success",
                    duration: 3000,
                    type: "success",
                    action: {
                        text: "X",
                        onClick: (e, toastObject) => {
                            toastObject.goAway(0);
                        },
                    },
                });
            })
            .catch((err: AxiosError) => {
                this.$toasted.show("업로드에 실패하였습니다.", {
                    fullWidth: true,
                    fitToScreen: true,
                    theme: "outline",
                    position: "top-center",
                    className: "toast-error",
                    duration: 3000,
                    type: "error",
                    action: {
                        text: "X",
                        onClick: (e, toastObject) => {
                            toastObject.goAway(0);
                        },
                    },
                });
            })
    }

    async uploadAtt() {
        const imgFiles = this.$store.getters.imgArr.map((img) => {
            return img.file;
        })
        const audioFiles = this.$store.getters.audioArr.map((audio) => {
            return audio.file;
        })
        const formData = new FormData();
        for (let i = 0; i < imgFiles.length; i++) {
            formData.append(imgFiles[i].name, imgFiles[i]);
        }
        for (let i = 0; i < audioFiles.length; i++) {
            formData.append(audioFiles[i].name, audioFiles[i]);
        }

        if(this.videoSrc.file){
            formData.append(this.videoSrc.file.name, this.videoSrc.file)
        }


        return await this.$api.fileUploader(formData)

    }


    @Watch('$store.getters.video')
    watchImg(){
        this.videoSrc = this.$store.getters.video
        console.log('watch',  this.videoSrc)
    }

    stringToHTML = (str: any) => {
        var dom = document.createElement("div");
        dom.innerHTML = str;
        console.log(str);
        for (let i = 0; i < dom.getElementsByTagName("a").length; i++) {
            this.youtubeLink.push(
                dom
                    .getElementsByTagName("a")
                    [i].href.match(
                    /(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/
                )![1]
            );
        }
        return dom;
    };

    // select category
    selectCommunity(e) {
        let selectedItem = e.target.value;
        if (selectedItem.toLowerCase() === "communities") {
            this.isChannelOn = false;
        }
        else {
            this.isChannelOn = true;
            this.channelList = this.$api.getCommunityInfo(
                selectedItem.id
            ).channels;
        }
        this.communities = selectedItem.name;
        this.selectedCommunityId = selectedItem.id;
    }

    selectChannel(selectedItem: any) {
        this.channels = selectedItem.name;
        this.selectedChannelId = selectedItem.id;
        // console.log(selectedItem);
    }

    // keyup
    checkText(text: string) {
        console.log(text);
    }

    //emit
    getFileList(fileType: string) {
        // todo: 블로그 이미지
        console.log("getFileList", this.fileList);
        console.log("fileLoader", this.fileLoader);
        if (fileType === "img") {
            this.fileList.img = this.fileLoader.fileObj.img;
        }
        else if (fileType === "video") {
            this.fileList.video = this.fileLoader.fileObj.video;
        }
        else if (fileType === "audio") {
            this.fileList.audio = this.fileLoader.fileObj.audio;
        }
        // console.log("getFileList", this.fileLoader.fileObj, value);
        // this.fileList = files;
        console.log("getFileList", this.fileList);
    }

    editorState(state: boolean) {
        this.isEditorEmpty = state;
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
        console.log("idx", idx, this.selectedCategory);
    }
}
</script>

<style lang="scss" scoped>
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
    // background-color: #68cef8;
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    // border-top: 2px solid #616161;

    .img-preview {
        margin: 5px;
        height: auto;
        width: calc(100% * (1 / 5) - 10px - 1px);
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
        height: 0;
        overflow: hidden;
        width: 100%;
        height: auto;

        &.ProseMirror-selectednode {
            outline: 3px solid #68cef8;
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
            outline: 3px solid #68cef8;
        }
    }

    .audio-wrapper {
        position: relative;

        overflow: hidden;
        width: 360px;
        height: 100px;

        &.ProseMirror-selectednode {
            outline: 3px solid #68cef8;
        }
    }
}
</style>
