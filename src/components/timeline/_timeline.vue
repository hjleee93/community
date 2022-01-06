<template>
    <ul class="ta-post">
        <dd>
            <!-- 포스트 박스 -->
            <!--        todo:내채널, 커뮤니티, 내 게임은 글 작성 가능
                            남의 채널 남의 게임은 글 작성 불가 : v-if="this.user.uid === this.$route.params.channel_id"
                            zempie 공식 커뮤니티 글 작성 블락(젬파이 지메일 계정 제외, f4cbce49-4626-4211-b954-31877da18b5b)
                             -->


<!--            <template v-if="community.id === 'f4cbce49-4626-4211-b954-31877da18b5b'">-->
<!--                <div class="ta-message-send" v-if="user.uid='n8lFf5Nu51UTU4d7ph7gol0ESvs1'">-->
<!--                    <p>-->
<!--                        <UserAvatar :user="user" :tag="'span'"></UserAvatar>-->
<!--                    </p>-->
<!--                    <dl @click="openPostModal">-->
<!--                        <dt>-->
<!--                            <input-->
<!--                                type="text"-->
<!--                                readonly-->
<!--                                placeholder="무슨 생각을 하고 계신가요"/>-->
<!--                        </dt>-->
<!--                        <dd><a><i class="uil uil-message"></i></a></dd>-->
<!--                    </dl>-->
<!--                </div>-->
<!--            </template>-->
<!--            <template v-else>-->
                <div class="ta-message-send" v-if="ableToPost() === true">
                    <p>
                        <UserAvatar :user="user" :tag="'span'"></UserAvatar>
                    </p>
                    <dl @click="openPostModal">
                        <dt>
                            <input
                                type="text"
                                readonly
                                placeholder="무슨 생각을 하고 계신가요"/>
                        </dt>
                        <dd><a><i class="uil uil-message"></i></a></dd>
                    </dl>
                </div>

<!--            </template>-->
            <div class="ta-message-block" v-else-if="ableToPost() === 'block'">
                <i class="uil uil-exclamation-triangle"></i> 블락으로 인해 포스팅을 작성하실 수 없습니다.
            </div>
            <ul class="ta-post" v-if="filterDupTl.length > 0"
                :style="ableToPost() === false ? 'margin-top: -20px;' : ''">
                <Feed
                    class="mt-3"
                    data-aos-once="true"
                    data-aos="fade"
                    v-for="feed in filterDupTl"
                    :key="feed.id"
                    :feed="feed"
                    @reFetch="reFetch"
                    @deleteFeed="deleteFeed"
                    @reportPost="reportPost"
                    @originImg="(val)=>originImg = val"
                ></Feed>
            </ul>

            <div v-else-if="this.$store.getters.LoadingStatus || isFirstLoading"
                 style="opacity: 0.5;"
                 class="ta-post-none">
            </div>

            <div v-else
                 class="ta-post-none"
                 :style="ableToPost() === false ? 'margin-top: 0px;' : ''">
                <p><span><i class="uil uil-layers-slash"></i></span></p>
                <h2>작성된 글이 없습니다.</h2>
            </div>


            <!--        </div>-->

<!--                    <PulseLoader :loading="$store.getters.LoadingStatus"></PulseLoader>-->
        </dd>
        <modal name="writingModal" classes="post-modal" :clickToClose="false" :scrollable="true" height="auto">
            <post @closePostModal="closePostModal" @reFetch="reFetch" @reMount="reMount">
            </post>
        </modal>


        <modal :clickToClose="false" class="modal-area-type" name="deleteModal" width="90%" height="auto"
               :maxWidth="380"
               :adaptive="true"
               :scrollable="true">
            <div class="modal-alert">
                <dl class="ma-header">
                    <dt>안내</dt>
                    <dd>
                        <button @click="$modal.hide('deleteModal')"><i class="uil uil-times"></i></button>
                    </dd>
                </dl>
                <div class="ma-content">
                    <h2> 삭제된 포스트는 복구가 불가능합니다.<br/>해당 포스트를 삭제하시겠습니까?</h2>
                    <div>
                        <button class="btn-default w48p" @click="yesDeletePost">네</button>
                        <button class="btn-gray w48p" @click="closeModal">아니오</button>
                    </div>
                </div>
            </div>
        </modal>

        <modal :clickToClose="false" class="modal-area-type" name="modalPost" width="90%" height="auto" :maxWidth="550"
               :adaptive="true"
               :scrollable="true">
            <Post @reFetch="reFetch"></Post>
        </modal>

        <modal class="modal-area-type" name="modalReport" width="90%" height="auto" :maxWidth="375" :adaptive="true"
               :scrollable="true">
            <div class="modal-report">
                <dl class="mr-header">
                    <dt>포스트 신고하기</dt>
                    <dd>
                        <button @click="$modal.hide('modalReport')"><i class="uil uil-times"></i></button>
                    </dd>
                </dl>
                <div class="mr-content">
                    <ul>
                        <li>
                            <input type="radio" v-model="pickedReason" value="1" id="report1"/> <label
                            for="report1"><i class="uil uil-check"></i></label>&nbsp;
                            <span><label for="report1"> 욕설</label></span>
                        </li>
                        <li>
                            <input type="radio" v-model="pickedReason" value="2" id="report2"/> <label
                            for="report2"><i class="uil uil-check"></i></label>&nbsp; <span><label
                            for="report2"> 스팸</label></span>
                        </li>
                        <li>
                            <input type="radio" v-model="pickedReason" value="3" id="report3"/> <label
                            for="report3"><i class="uil uil-check"></i></label>&nbsp; <span><label
                            for="report3"> 음란성</label></span>
                        </li>
                        <!--            <li>-->
                        <!--              <input type="radio" v-model="pickedReason" value="report4" id="report4"/> <label for="report4"><i class="uil uil-check"></i></label>&nbsp; <span><label for="report4"> 기타</label></span>-->
                        <!--              <div><textarea name=""></textarea></div>-->
                        <!--            </li>-->
                    </ul>
                    <div @click="sendReport">
                        <button class="btn-default" style="width: 100% !important;">신고</button>
                    </div>
                </div>
            </div>
        </modal>
        <modal name="deleteComment" :clickToClose="false" class="modal-area-type" width="90%" height="auto"
               :maxWidth="380"
               :adaptive="true"
               :scrollable="true"
               @before-open="beforeOpen">
            <div class="modal-alert">
                <dl class="ma-header">
                    <dt>안내</dt>
                    <dd>
                        <button @click="$modal.hide('deleteComment')"><i class="uil uil-times"></i></button>
                    </dd>
                </dl>
                <div class="ma-content">
                    <h2> 해당 댓글을 삭제하시겠습니까?</h2>
                    <div>
                        <button class="btn-default w48p" @click="deleteComment">네</button>
                        <button class="btn-gray w48p" @click="$modal.hide('deleteComment')">아니오</button>
                    </div>
                </div>
            </div>
        </modal>

        <modal name="needSubscribe" :clickToClose="false" class="modal-area-type" width="90%" height="auto"
               :maxWidth="380"
               :adaptive="true"
               :scrollable="true">
            <div class="modal-alert">
                <dl class="ma-header">
                    <dt>안내</dt>
                    <dd>
                        <button @click="$modal.hide('needSubscribe')"><i class="uil uil-times"></i></button>
                    </dd>
                </dl>
                <div class="ma-content">
                    <h2> 커뮤니티 멤버만 이용가능한 서비스입니다.<br/>가입 하시겠습니까?</h2>
                    <div>
                        <button class="btn-default w48p" @click="needSubscribe">네</button>
                        <button class="btn-gray w48p" @click="$modal.hide('needSubscribe')">아니오</button>
                    </div>
                </div>
            </div>
        </modal>

        <!--        <modal-->
        <!--            :adaptive="true"-->
        <!--            name="originImgModal"-->
        <!--            classes="img-modal"-->
        <!--            :maxWidth="720"-->
        <!--            :maxHeight="1280"-->
        <!--        >-->
        <!--            <img :src="originImg"/>-->
        <!--        </modal>-->
    </ul>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from "vue-property-decorator";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import Feed from "@/components/timeline/_feed.vue";
import {AxiosError, AxiosResponse} from "axios";
import {scrollDone} from "@/script/scrollManager";
import {mapGetters} from "vuex";
import {User} from "@/types";
import Post from "@/components/timeline/_post.vue";
import UserAvatar from "@/components/user/_userAvatar.vue";
import {Swiper, SwiperSlide} from "vue-awesome-swiper";
import TiptapSns from "@/components/timeline/_tiptapSns.vue";
import TiptapPost from "@/components/timeline/_tiptapBlog.vue";
import ImageUploaderBtn from "@/components/timeline/post/_imageUploaderBtn.vue";
import Toast from "@/script/message";
import SubscribeBtn from "@/components/community/_subscribeBtn.vue";
import _ from "lodash";

@Component({
    computed: {
        ...mapGetters(["user"]),
        //timeline 중복 제거
        filterDupTl: function () {
            return _.uniqBy(this['timeline'], (e: any) => {
                    return e.id;
                }
            )
        }
    },
    components: {
        Feed,
        PulseLoader,
        Post,
        UserAvatar,
        Swiper,
        SwiperSlide,
        TiptapSns,
        TiptapPost,
        ImageUploaderBtn,
        SubscribeBtn
    },
})
export default class Timeline extends Vue {
    @Prop() currPage!: string;
    @Prop() id!: any;
    @Prop() community!: any;
    @Prop() mediaType!: any;
    private timeline: any = [];
    private user!: User;

    //parameters
    private limit: number = 10;
    private offset: number = 0;
    private sort: string = '';
    private media: string = '';

    //state
    isAddData: boolean = false;
    hasData: boolean = true;

    activeTab: string = "SNS";


    feedId = '';
    pickedReason: any = '';
    originImg = '';
    toast = new Toast();

    commentId = '';
    postId = '';

    isFirstLoading:boolean = true;


    mounted() {
        this.$store.dispatch("loginState")
            .then(() => {
                this.fetch()
            });

        window.addEventListener("scroll", this.scrollCheck);
    }

    beforeDestroy() {
        window.removeEventListener("scroll", this.scrollCheck);
    }

    reFetch() {
        this.$emit('reFetch')
        this.initData()
        this.fetch()
    }

    deleteComment() {
        this.$api.deleteComment(this.postId, this.commentId)
            .then((res) => {
                this.reFetch()
            })
            .catch((err) => {

            })
            .finally(() => {
                this.$modal.hide('deleteComment')
            })
    }

    beforeOpen(event) {
        this.commentId = event.params.commentId;
        this.postId = event.params.postId;

    }

    initData() {
        this.isAddData = false
        this.hasData = false
        this.limit = 10;
        this.offset = 0;
        this.timeline = [];
        this.sort = '';
        this.media = '';
        window.scrollTo(0, 0)
    }

    fetch() {

        switch (this.currPage) {
            case 'user':
                const userObj = {
                    limit: this.limit,
                    offset: this.offset,
                    sort: this.sort,
                    media: this.$route.query.media || this.mediaType
                }

                const channel_id: any = this.$route.name === 'MyChannel' ? this.user.channel_id : this.$route.params.channel_id;

                this.$api.userTimeline(channel_id, userObj)
                    .then((res: any) => {
                        if (this.isAddData) {
                            if (res.result.length > 0) {
                                this.timeline = [...this.timeline, ...res.result]
                            }
                            else {
                                window.removeEventListener("scroll", this.scrollCheck);
                            }
                        }
                        else {
                            this.timeline = res.result;
                            this.isAddData = true
                        }
                    })
                    .catch((err: AxiosError) => {
                        this.$router.push('/communityList')

                    })
                    .finally(() => {
                        this.isFirstLoading = false;
                        this.timeline = _.orderBy(this.timeline, 'createdAt', 'desc')
                    })

                break;
            case 'game':

                const gameObj = {
                    game_id: this.$route.query.game_id,
                    limit: this.limit,
                    offset: this.offset,
                    sort: this.sort,
                    media: this.$route.query.media
                }
                this.$api.gameTimeline(gameObj)
                    .then((res: any) => {
                        if (this.isAddData) {
                            if (res.result.length > 0) {
                                this.timeline = [...this.timeline, ...res.result]
                            }
                            else {
                                this.hasData = false
                                window.removeEventListener("scroll", this.scrollCheck);

                            }
                        }
                        else {

                            this.timeline = res.result;
                            this.isAddData = true
                        }


                    })
                    .catch((err: AxiosError) => {


                    })
                break;
            case 'community':
                const comObj = {
                    community_id: this.$route.params.community_id,
                    limit: this.limit,
                    offset: this.offset,
                    sort: this.sort,
                    media: this.$route.query.media
                }
                this.$api.communityTimeline(comObj)
                    .then((res: any) => {

                        if (this.isAddData) {
                            if (res.result.length > 0) {
                                this.timeline = [...this.timeline, ...res.result]
                            }
                            else {
                                // console.log('no data')
                                this.hasData = false
                                window.removeEventListener("scroll", this.scrollCheck);

                            }
                        }
                        else {

                            this.timeline = res.result;
                            this.isAddData = true
                        }


                    })
                    .catch((err: AxiosError) => {


                    })

                break;
            //커뮤니티 내의 채널
            case 'channel':

                const chaObj = {
                    limit: this.limit,
                    offset: this.offset,
                    sort: this.sort,
                    media: this.media
                }

                this.$api.channelTimeline(this.$store.getters.currPage.community[0].id, this.$store.getters.currPage.community[0].channel_id, chaObj)
                    .then((res: any) => {
                        if (this.isAddData) {
                            if (res.result.length > 0) {
                                this.timeline = [...this.timeline, ...res.result]
                            }
                            else {
                                // console.log('no data')
                                this.hasData = false

                            }
                        }
                        else {

                            this.timeline = res.result;
                            this.isAddData = true
                        }


                    })
                    .catch((err: AxiosError) => {


                    })

                break;
        }

    }


    ableToPost() {
        let result: any = ''
        //커뮤니티 블락당한 경우
        switch (this.currPage) {
            case 'user':
                if (this.user && (this.user.uid === this.$route.params.channel_id) || this.$route.name === 'MyChannel') {
                    result = true;
                }
                else {
                    result = false;
                }
                break;
            case 'community' :
                if (this.community.user_block) {
                    result = 'block'
                }
                else {
                    result = true;
                }
                break;
            case 'channel' :
                result = true;
                break;
        }
        return result;

    }

    openEdit() {
        this.$store.dispatch('resetAttFiles')
        if (this.user) {
            this.$modal.show('writingModal')
        }
        else {
            this.$modal.show('needLogin')
            this.$store.commit('needLogin', true)
        }
    }

    openPostModal() {
        if (!this.user) {
            this.$modal.show('needLogin')
            this.$store.commit('needLogin', true)
        }
        else if (this.user && this.currPage === 'user') {
            this.$modal.show('modalPost')
        }
        else if (!this.community.is_subscribed) {
            this.$modal.show('needSubscribe')
        }
        else {
            this.$modal.show('modalPost')
        }

    }

    needSubscribe() {
        this.$api.subscribe({user_id: this.user.id, community_id: this.community.id})
            .then((res: AxiosResponse) => {
                this.$emit('reFetch')
            }).catch((err: AxiosError) => {
            if (err.message) {
                alert(err.message)
            }
        })
    }

    closePostModal() {
        this.fetch();
        this.isAddData = false;
        // (this.$refs.editModal as any).hide();
    }

    scrollCheck() {
        if (scrollDone(document.documentElement)) {
            this.offset += this.limit;
            this.fetch();
        }
    }

    closeModal() {
        this.$modal.hide('deleteModal')
        this.$store.commit('postContents', '')
        this.$store.dispatch('resetAttFiles')
        this.$store.dispatch('resetBlogImgArr')
    }

    @Watch('$route.query')
    watchMedia() {
        this.initData()
        this.media = (this.$route.query.media as string);
        this.fetch();
    }

    deleteFeed(feedId: any) {
        this.feedId = feedId;
        this.$modal.show('deleteModal')
    }

    reportPost(feedId: any) {
        this.feedId = feedId;
    }

    yesDeletePost() {
        this.$modal.hide('deleteModal')


        this.$api.deletePost(this.feedId)
            .then((res: any) => {
                if (res.success) {
                    this.$toasted.clear();
                    this.$toasted.show("포스팅이 삭제되었습니다.", {
                        singleton: true,
                        fullWidth: false,
                        fitToScreen: true,
                        theme: "outline",
                        position: "bottom-left",
                        className: "toast-danger",
                        duration: 3000,
                        action: {
                            text: "X",
                            onClick: (e, toastObject) => {
                                toastObject.goAway(0);
                            },
                        },
                    });
                }
                this.timeline = []
                this.initData();
                this.fetch();
            })
            .catch((err: any) => {

            })

    }

    sendReport() {
        const obj = {
            post_id: this.feedId,
            user_id: this.user.id,
            targetType: 'POST',
            report_reason: this.pickedReason
        }
        this.$api.reportPost(obj)
            .then((res: AxiosResponse) => {

            })
            .catch((err: AxiosError) => {

                this.toast.failToast(err.message)
            })
            .finally(() => {
                this.$modal.hide('modalReport')
                this.pickedReason = ''
            })
    }

    commentInfo(event) {
        this.$api.deleteComment(event.params.postId, event.params.commentId)
            .then((res: AxiosResponse) => {

            })
            .catch((err: AxiosError) => {

            })
    }

    reMount() {
        this.initData();
        this.fetch()
    }

}
</script>

<style scoped lang="scss">


.pw-reset {
    padding-bottom: 44px !important;
    padding-top: 44px !important;
}

.pw-reset .pr-content > p {
    display: flex !important;
    justify-content: space-between !important;
}

.btn-default {
    width: 48% !important;
    border-radius: 20px;
}

.quick-post {
    height: 100px;

    .quick-post-body {
        height: 100%;
        display: flex;
    }

    .form-row {
        height: 100%;
    }
}

.entry-post-container {
    border-radius: 10px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 100%;
}

.user-avatar {
    display: flex;
}

textarea {
    height: 57px !important;
    width: 500px !important;
    padding: 14px 18px;
}


.block-alarm {
    background-color: red;
    border-radius: 5px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
}


input[type="radio"] + label {
    display: inline-block;
    width: 22px;
    height: 22px;
    text-align: center;
    font-size: 15px;
    color: #fff;
    border: 1px solid #e5e5e5;
    border-radius: 4px;
    cursor: pointer;
}

input[type="radio"]:checked + label {
    color: #fff;
    background: #FF6E17;
    border-color: #FF6E17;
}

input[type="radio"] {
    display: none;
}
</style>
