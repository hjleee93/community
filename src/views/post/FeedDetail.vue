<template>
    <div class="content" v-if="feed">
        <div class=" area-view">
            <ul class="ta-post">
                <li class="tap-list">
                    <dl class="tapl-title">
                        <dt>
                            <dl>
                                <dt>
                                    <UserAvatar :user="feed.user" :tag="'span'"/>
                                </dt>
                                <dd v-if="feed.user.name">
                                    <h2>{{ feed.user.name }}</h2>
                                    <p><i class="uis uis-clock" style="color:#c1c1c1;"></i> {{ createdDate }}</p>
                                </dd>
                                <dd v-else>
                                    <h2>탈퇴한 유저가 작성한 포스팅입니다.</h2>
                                    <p><i class="uis uis-clock" style="color:#c1c1c1;"></i> {{ createdDate }}</p>
                                </dd>
                            </dl>
                        </dt>
                        <dd>
                            <FollowBtn :member="feed.user" @refetch="refetch" :key="generateKey()"></FollowBtn>
                        </dd>
                    </dl>

                    <div class="tapl-content" v-html="feed.content"></div>
                    <template
                        v-if="feed.post_type==='SNS' && feed.attatchment_files && feed.attatchment_files.length > 0">
                        <div class="tapl-movie-img" v-if="feed.attatchment_files[0].type === 'image' ">
                            <swiper class="swiper" :options="swiperOption" style="height: 350px;">
                                <template v-for="file in feed.attatchment_files">
                                    <swiper-slide>
                                        <img style="height: 88%;
                             margin: 0 auto;
                             display: flex;" v-if="file.type === 'image'" :src="file.url"
                                             class="feed-img mt-3"/>
                                    </swiper-slide>

                                </template>
                                <div class="swiper-pagination" slot="pagination"></div>
                            </swiper>
                        </div>
                        <div class="tapl-movie-img" v-else>
                            <div v-for="file in feed.attatchment_files" :key="file.id">
                                <video
                                    class="sns-img"
                                    v-if="file.type === 'video' "
                                    width="320"
                                    height="240"
                                    controls
                                    :src="file.url"></video>
                                <audio v-if="file.type === 'sound' " controls :src="file.url"></audio>
                            </div>
                        </div>
                    </template>
                    <ul class="tapl-option">
                        <li>
                            <ul>
                                <LikeBtn :feed="feed"/>
                                <li><i class="uil uil-comment-alt-dots" style="font-size:22px;"></i>&nbsp;
                                    {{ feed.comment_cnt }}
                                </li>

                                <li @click="copyUrl">
                                    <a><i class="uil uil-share-alt" style="font-size:20px;"></i>
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <!--                    <li>-->
                        <!--                        <router-link to="#"><i class="uil uil-bookmark" style="font-size:24px; color:#ff6e17;"></i>-->
                        <!--                        </router-link>-->
                        <!--                    </li>-->
                    </ul>
                    <div class="tapl-comment">
                        <h2>댓글 {{ feed.comment_cnt }}개 </h2>
                        <CommentInput :postId="feed.id" @sendComment="editDone"/>
                        <ul>
                            <li v-for="comment in comments" :key="comment.id">
                                <Comment :comment="comment" :editContent="comment.content" :postId="feed.id"
                                         @editDone="editDone"/>
                            </li>
                        </ul>

                    </div>
                </li>
            </ul>
        </div>
        <!--        <div-->
        <!--            class="post-open-body pt-0"-->
        <!--            style="margin-top: 80px; height: 100vh"-->
        <!--        >-->
        <!--            <div class="post-top">-->


        <!--                <template v-if="feed.user">-->
        <!--                    <router-link :to="`/channel/${feed.user.uid}/timeline`">-->
        <!--                        <UserAvatar :user="feed.user" :tag="'span'"/>-->
        <!--                    </router-link>-->

        <!--                </template>-->
        <!--                <div class="forum-post-user-title ml-3">-->
        <!--                    <router-link :to="`${feed.user.uid}`"-->
        <!--                    >{{ feed.user.name }}-->
        <!--                        &lt;!&ndash;                        @{{ feed.user.nickname}}&ndash;&gt;-->
        <!--                    </router-link-->
        <!--                    >-->
        <!--                    <small style="color:ghostwhite">{{ createdDate }}</small>-->
        <!--                </div>-->
        <!--                <FollowBtn :member="feed.user"></FollowBtn>-->
        <!--            </div>-->

        <!--            <div class="post-open-content">-->
        <!--                <div class="post-open-content-body">-->
        <!--                    <div v-html="feed.content" @click="contentClicked">-->
        <!--                        {{ feed.content }}-->
        <!--                    </div>-->
        <!--                    `-->
        <!--                </div>-->
        <!--            </div>-->
        <!--            <template v-if="feed.post_type==='SNS' && feed.attatchment_files">-->
        <!--                <div v-for="file in feed.attatchment_files" :key="file.id">-->
        <!--                    <img @click="contentClicked" class="sns-img" v-if="file.type === 'image' " :src="file.url"/>-->
        <!--                    <video-->
        <!--                        class="sns-img"-->
        <!--                        v-if="file.type === 'video' "-->
        <!--                        width="320"-->
        <!--                        height="240"-->
        <!--                        controls-->
        <!--                        :src="file.url"></video>-->
        <!--                </div>-->
        <!--            </template>-->


        <!--            <div class="content-actions">-->
        <!--                <div class="content-action">-->
        <!--                    <div class="post-option-wrap" style="position: relative">-->
        <!--                        <LikeBtn :feed="feed"/>-->
        <!--                    </div>-->

        <!--                    <div class="post-option active">-->
        <!--                        <svg class="post-option-icon icon-comment">-->
        <!--                            <use xlink:href="#svg-comment"></use>-->
        <!--                        </svg>-->
        <!--                    </div>-->

        <!--                    <div-->
        <!--                        class="post-option"-->
        <!--                        @click="copyUrl"-->

        <!--                    >-->
        <!--                        <svg class="post-option-icon icon-share">-->
        <!--                            <use xlink:href="#svg-share"></use>-->
        <!--                        </svg>-->
        <!--                    </div>-->
        <!--                </div>-->
        <!--            </div>-->

        <!--            <modal-->
        <!--                :adaptive="true"-->
        <!--                name="originImgModal"-->
        <!--            >-->
        <!--                <img :src="originImg" @click="closeImgModal"/>-->
        <!--            </modal>-->
        <!--            <AlertModal v-if="needLogin" @needLogin="needLogin = false"></AlertModal>-->
        <!--        </div>-->
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
    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";

import {dateFormat} from "@/script/moment";
import {AxiosError, AxiosResponse} from "axios";
import FollowBtn from "@/components/user/_followBtn.vue";
import {mapGetters} from "vuex";
import {User} from "@/types";
import LikeBtn from "@/components/timeline/_likeBtn.vue";
import UserAvatar from "@/components/user/_userAvatar.vue";
import {execCommandCopy} from "@/script/util";
import Toast from "@/script/message";
import CommentInput from "@/components/comment/_commentInput.vue";
import Comment from "@/components/timeline/Comment.vue";
import {scrollDone} from "@/script/scrollManager";
import {Swiper, SwiperSlide} from "vue-awesome-swiper";

@Component({
    components: {
        FollowBtn,
        LikeBtn,
        UserAvatar,
        CommentInput,
        Comment,
        Swiper,
        SwiperSlide,
    },
    computed: {...mapGetters(["user"])},
})
export default class FeedDetail extends Vue {
    toast = new Toast();
    feedId = this.$route.params.feedId;
    feed: any = null;
    createdDate: string = "";
    commentId: string = '';

    originImg: string = "";
    needLogin = false;
    user!: User;
    comments: any = [];
    limit: number = 10;
    offset: number = 0;
    sort: string = '';

    isAddData: boolean = false;
    swiperOption = {
        pagination: {
            el: '.swiper-pagination'
        }
    }


    mounted() {
        this.$store.dispatch("loginState")
            .then(() => {
                this.fetch();
                this.commentFetch();
            })

        window.addEventListener("scroll", this.scrollCheck);
    }

    beforeDestroy() {
        window.removeEventListener("scroll", this.scrollCheck);
    }

    fetch() {
        this.$api.feed(this.feedId)
            .then((res: AxiosResponse) => {
                this.feed = res;
                this.createdDate = dateFormat(this.feed.createdAt)!;
            })
    }

    refetch() {
        console.log('re-fetch', this.feed.user)
        this.$store.dispatch("loginState")
            .then(() => {
                this.fetch()
                this.generateKey();
            })
    }

    copyUrl() {
        execCommandCopy(window.location.href)
        this.toast.clear();
        this.toast.successToast("클립보드에 복사되었습니다.")
    }

    scrollCheck() {
        if (scrollDone(document.documentElement)) {
            this.offset += this.limit;
            this.commentFetch();
        }

    }

    commentInit() {
        this.comments = [];
        this.limit = 10;
        this.offset = 0;
        this.sort = '';
    }

    commentFetch() {
        const obj = {
            limit: this.limit,
            offset: this.offset,
            sort: this.sort
        }
        this.$api.comments(this.feedId, obj)
            .then((res: any) => {
                console.log(res.result)
                if (this.isAddData) {
                    if (res.result.length > 0) {
                        this.comments = [...this.comments, ...res.result]
                    }
                    else {
                        console.log('no data')
                    }
                }
                else {
                    this.comments = res.result;
                    this.isAddData = true
                }
            })
            .catch((err: AxiosError) => {

            })
            .finally(() => {

            })
    }

    beforeOpen(event) {
        this.commentId = event.params.commentId;

    }

    deleteComment() {
        this.commentInit();
        this.$api.deleteComment(this.feedId, this.commentId)
            .then((res: AxiosResponse) => {
                this.$modal.hide('deleteComment')
                this.commentFetch()
                this.fetch();

            })
            .catch((err: AxiosError) => {

            })
    }

    editDone() {
        this.commentInit();
        this.commentFetch()
    }

    contentClicked(e: any) {
        if (e.target.matches("img")) {
            this.originImg = e.target.src;
            (this.$refs.originImgModal as any).show();
        }
        else if (e.target.matches(".hashtag")) {
            this.$router.push(
                `/search?hashtag=${e.target.attributes["data-id"].nodeValue}`
            );
        }
        else if (e.target.matches(".mention")) {
            this.$router.push(
                `/channel/${e.target.attributes["channel-id"].nodeValue}/timeline`
            );
        }
    }

    closeImgModal() {
        (this.$refs.originImgModal as any).hide();
    }
    generateKey(){
        return Date.now();
    }
}
</script>

<style lang="scss" scoped>
.tapl-content {
    word-break: break-all;
}

.user-avatar {
    z-index: 999;
}

.sns-img {
    width: 100%
}

.dropdown {
    display: flex;
    justify-content: flex-end;
    margin-right: 28px;
    align-items: center;
}

.post-open-content-body {
    text-align: left;

    div > * {
        margin-top: 0.75em !important;
    }
}

.post-open-content {
    margin-top: 0px !important;
}

.post-open-content-sidebar {
    display: flex;
    flex-direction: column;
    align-items: center;

    .forum-post-user-title {
        margin-top: 16px;
    }
}

.content-actions {
    border-bottom: 1px solid #2f3749;
}

.post-top {
    margin-left: 30px;
    margin-right: 30px;
    display: flex;
    height: 100px;
    align-items: center;

    .forum-post-user-title {
        margin-right: 30%;
        display: flex;
        flex-direction: column;
    }

    .button {
        width: 100px !important;
    }
}

audio {
    width: 80%;
    margin: 20px 20px 0 20px;
    display: flex;
    align-items: center;
    border-radius: 5px;
    background: #f5f5f5;
}

</style>
