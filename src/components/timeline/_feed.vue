<template>
    <li class="tap-list" v-if="feed && feed.user">
        <dl class="tapl-title">
            <dt>
                <dl>
                    <UserAvatar :user="feed.user"></UserAvatar>
                    <dd>
                        <h2>{{ feed.user.name }} uploaded a {{ feed.post_type }} post</h2>
                        <p><i class="uis uis-clock" style="color:#c1c1c1;"></i> {{ dateFormat(feed.createdAt) }}</p>

                    </dd>
                </dl>
            </dt>
            <dd>
                <dropdown-menu :overlay="false" class="tapl-more-dropdown"
                               :isOpen="isOpenReportModal" @closed="isOpenReportModal= false">
                    <a class="btn-circle-none pt6" slot="trigger" @click="isOpenReportModal= !isOpenReportModal"><i
                        class="uil uil-ellipsis-h font25"></i></a>
                    <div slot="body" class="more-list">
                        <template v-if="user && (user.id === feed.user.id)">
                            <a @click="openEdit">포스팅 수정</a>
                            <a @click="deletePost">포스팅 삭제</a>
                        </template>
                        <template v-else>
                            <router-link :to="`/channel/${feed.user.uid}/timeline`">유저 채널 방문</router-link>
                            <a @click="report">포스팅 신고</a>
                        </template>
                    </div>
                </dropdown-menu>
            </dd>
        </dl>


        <div class="tapl-content" v-html="feed.content" @click="contentClicked"></div>

        <template v-if="attachedFile && feed.post_type === 'SNS'">
            <div v-for="file in attachedFile">
                <img v-if="file.type === 'image'" :src="file.url"
                     class="feed-img mt-3"></img>
                <div class="video">
                    <video
                        width="100%"
                        height="240"

                        controls
                        :src="file.url"
                        v-if="file.type === 'video'"></video>
                </div>
                <div class="audio">
                    <audio v-if="file.type === 'sound'" controls :src="file.url"></audio>
                </div>
            </div>
        </template>

        <ul class="tapl-option">
            <li>
                <ul>
                    <LikeBtn :feed="feed"></LikeBtn>
                    <li @click="openComments"><i class="uil uil-comment-alt-dots comment-icon"
                                                 style="font-size:22px;"></i>&nbsp; {{ feed && feed.comment_cnt }}
                    </li>
                    <!--                    <li><i class="uil uil-eye" style="font-size:22px;"></i>&nbsp;680</li>-->
                    <li><a @click="copyUrl"><i class="uil uil-share-alt" style="font-size:20px;"></i></a></li>
                </ul>
            </li>
            <!--            <li><router-link to="#"><i class="uil uil-bookmark" style="font-size:24px; color:#ff6e17;"></i></router-link></li>-->
        </ul>
        <div v-if="isOpenedComments" class="tapl-comment">
            <ul @scroll="scrollCheck">
                <li v-for="comment in comments" :key="comment.id">
                    <Comment :comment="comment" :editContent="comment.content" :postId="feed.id" @editDone="editDone"/>
                </li>
            </ul>

            <CommentInput :postId="feed.id" @sendComment="editDone"/>

        </div>

    </li>

</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";

import Post from "@/components/timeline/Post.vue";
import TiptapSns from "@/components/timeline/_tiptapSns.vue";
import {dateFormat} from "@/script/moment";
import {AxiosError, AxiosResponse} from "axios";
import LikeBtn from "@/components/timeline/_likeBtn.vue";
import UserAvatar from "@/components/user/_userAvatar.vue";

import {mapGetters} from "vuex";
import {scrollDone} from "@/script/scrollManager";
import {execCommandCopy} from "@/script/util";
import Toast from "@/script/message";
import CommentInput from "@/components/comment/_commentInput.vue";
import Comment from "@/components/timeline/Comment.vue";

@Component({
    components: {
        Post,
        TiptapSns,
        LikeBtn,
        UserAvatar,
        CommentInput,
        Comment
    },
    computed: {...mapGetters(["user"])},
})
export default class Feed extends Vue {
    @Prop() feed!: any;

    toast = new Toast();
    isOpenedComments: boolean = false;
    likeList: any = [];

    attachedFile: any = '';
    hashtags: any = '';

    originImg: string = "";

    limit: number = 5;
    offset: number = 0;
    sort: string = '';

    isAddData: boolean = false;
    comments: any = [];
    user!: any;
    isOpenReportModal = false

    mounted() {
        this.attachedFile = this.feed.attatchment_files
        this.hashtags = this.feed.hashtags;
        this.likeListFetch();
    }

    scrollCheck(e) {
        if (scrollDone(e.target)) {
            this.offset += this.limit;
            this.commentFetch();
        }
    }

    dateFormat(date: number) {
        return dateFormat(date);
    }

    sendLike() {
        if (this.user) {
            // console.log(this.feed.liked)
            if (!this.feed.liked) {
                console.log('like')
                this.$api.like(this.feed.id)
                    .then((res: AxiosResponse) => {
                        this.$emit('refetch')
                        console.log(res)
                    })
                    .catch((err: AxiosError) => {

                    })
            }
            else {
                console.log('unlike')
                this.$api.unlike(this.feed.id)
                    .then((res: AxiosResponse) => {
                        this.$emit('fetch')
                    })
                    .catch((err: AxiosError) => {

                    })
            }

        }
        else {
            this.$modal.show('needLogin')
        }
    }

    openComments() {
        this.isOpenedComments = !this.isOpenedComments;
        if (this.isOpenedComments && this.feed.comment_cnt > 0) {
            this.comments = []
            this.commentFetch()
        }

    }

    likeListFetch() {
        const obj = {
            post_id: this.feed.id,
            limit: this.limit,
            offset: this.offset
        }
        this.$api.likeList(obj)
            .then((res: AxiosResponse) => {
                this.likeList = res;
            })
            .catch((err: AxiosError) => {

            })


    }


    copyUrl() {
        execCommandCopy(`${this.$store.getters.communityUrl}/feed/${this.feed.id}`)
        this.toast.clear();
        this.toast.successToast("Link copied to clipboard")
    }

    //post
    contentClicked(e: any) {
        if (e.target.matches("img")) {
            console.log("이미지 클릭", e.target.src);
            this.originImg = e.target.src;
            // this.$modal.show('originImgModal')
            this.$emit('originImg', this.originImg)
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
        else {
            // this.$router.push(`/feed/${this.feed.id}`);
        }
    }

    moveHashtag(hashtag: string) {
        this.$router.push(`/search?hashtag=${hashtag}`)
    }

    commentFetch() {
        const obj = {
            limit: this.limit,
            offset: this.offset,
            sort: this.sort
        }
        console.log(obj)
        this.$api.comments(this.feed.id, obj)
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


    openEdit() {
        this.$modal.show('modalPost')
        this.$store.commit('feed', this.feed)
    }

    pinPost() {
        console.log("pinned");
    }

    closeModal() {
        this.$modal.hide('noUser')

    }

    deletePost() {
        this.$emit('deleteFeed', this.feed.id)
        this.$modal.show('deleteModal')

    }

    report() {
        this.$emit('reportPost', this.feed.id)
        this.isOpenReportModal = !this.isOpenReportModal
        this.$modal.show('modalReport')

    }


    /**
     * 댓글
     * */
    commentInit() {
        this.comments = [];
        this.limit = 5;
        this.offset = 0;
        this.sort = '';
    }

    deleteComment(commentId: string) {
        this.commentInit();
        this.$api.deleteComment(this.feed.id, commentId)
            .then((res: AxiosResponse) => {
                this.commentFetch()
            })
            .catch((err: AxiosError) => {

            })
    }

    editDone() {
        this.commentInit();
        this.commentFetch()
    }


}
</script>

}

<style lang="scss" scoped>
.tapl-comment > ul {
    max-height: 500px;
    overflow-y: auto;
    overflow-x: hidden;
}

.like-icon:hover, .comment-icon:hover {
    cursor: pointer;
}

.feed-img {
    max-width: 100%;
}

.content-grid {
    transform: translate(199.5px, 0px);
    transition: transform 0.4s ease-in-out 0s;
}

.icon-thumbs-up.active,
.icon-comment.active {
    fill: #4ff461;
    opacity: 1;
}

.thumbs-up.active,
.post-option-text.active {
    color: #fff;
}

.reaction {
    top: 5px;
}

#copied {
    z-index: 999999;
}

.checkbox-wrap input[type="checkbox"]:checked + .checkbox-box .icon-check,
.checkbox-wrap input[type="radio"]:checked + .checkbox-box .icon-check {
    fill: #ffffff;
}

.checkbox-wrap .checkbox-box .icon-check {
    fill: transparent;
    transition: fill 0.2s ease-in-out;
}

.content-actions {
    height: 92px;
    flex-direction: column;

    .meta-line {
        margin-right: 10px;
        width: 100%;
        margin-top: 16px;
    }
}

.post-icon-wrap {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
}

.icon-pinned {
    fill: #616a82;
}

.icon-pinned.active {
    fill: #f39800;
    opacity: 1;
}

.orgin-img-modal {
    .modal-dialog {
        max-width: 100% !important;
    }
}

.feed-img {
    padding: 20px 20px 0 20px;
}

.video {
    width: 100%;
    padding: 20px 20px 0 20px;
}

.audio {
    margin: 20px 20px 0 20px;
    display: flex;
    align-items: center;
    border-radius: 5px;
    background: #f5f5f5;
}
</style>