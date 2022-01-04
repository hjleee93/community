<template>
    <dl v-if="!isEditing">
        <dt>
            <dl>
                <dt @click="moveUserChannel(comment.user.channel_id)">
                    <UserAvatar :user="comment.user" :tag="'span'"></UserAvatar>
                </dt>
                <dd>
                    <h2>{{ comment.user && comment.user.name }} <span>{{  }}</span></h2>
                    <div>
                        {{ comment.content }}
                    </div>
                    <p :key="likeCnt">
                        <!--                        is_liked-->
                        <a v-if="!isLiked " :key="isLiked" @click="sendLike(false)">
                            <i class="uil uil-heart-sign"></i>
                        </a>
                        <a v-else :key="isLiked" @click="sendLike(true)">
                            <i class="xi-heart like-icon"
                               style="color:red"></i>
                        </a>
                        좋아요 {{ likeCnt }}개
                        <!--                    <a href="#"><i class="uil uil-edit-alt"></i> 댓글 작성</a>-->
                    </p>
                </dd>
            </dl>

        </dt>

        <dd v-if="comment.user.uid === (user && user.uid)">
            <dropdown-menu :overlay="false" class="tapl-more-dropdown">
                <a slot="trigger"><i class="uil uil-ellipsis-h font25"></i>
                </a>

                <div slot="body" :class="$route.name === 'feedDetail' ? 'more-list':'more-list fixed'">
                    <a @click="editComment(comment.id)">댓글 수정</a>
                    <a @click="$modal.show('deleteComment', {commentId:comment.id, postId:postId})">댓글 삭제</a>
                    <!--                    <a @click="deleteComment(comment.id)">댓글 삭제</a>-->
                </div>
            </dropdown-menu>
        </dd>

    </dl>
    <dl v-else>
        <CommentInput
            @sendComment="editDone"
            :editContent="comment.content"
            :postId="postId"
            :commentId="comment.id"
            :parentId="parentId"
        ></CommentInput>
    </dl>


</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";


import {dateFormat} from "@/script/moment";
import {AxiosError, AxiosResponse} from "axios";
import {mapGetters} from "vuex";
import UserAvatar from "@/components/user/_userAvatar.vue";
import CommentInput from "@/components/comment/_commentInput.vue";
import {User} from "@/types";
import ClickManager from "@/script/clickManager";

@Component({
    computed: {...mapGetters(["user"])},
    components: {UserAvatar, CommentInput},
})
export default class Comment extends Vue {
    @Prop() comment!: any;
    @Prop() postId!: any;
    private userInfo: any = [];
    private content: string = this.comment.content;
    private isEditing: boolean = false;
    private parentId: number = -1;
    private modalTitle: string = "Report Comment";
    private createdDate: string = "";

    showModal: boolean = false;
    user!: User;
    clickManager: ClickManager = new ClickManager();
    isLiked: boolean = this.comment.is_liked;
    likeCnt: number = this.comment.like_cnt

    mounted() {
        this.init();
        this.createdDate = dateFormat(this.comment.createdAt);
    }

    async init() {
        const result = await this.$api.channel(this.comment.user.channel_id);
        this.userInfo = result.target;
    }

    editPost() {
        this.isEditing = true;
        (this.$refs.dropbox as HTMLElement).click();
    }

    editDone() {
        this.isEditing = false;
        this.$emit('editDone')
    }

    editComment() {
        this.isEditing = true;
    }


    sendLike(state: boolean) {
        if (this.user) {
            if (state) {
                if (!this.clickManager.doubleClickCheck()) {
                    this.$api.unlikeComment(this.postId, this.comment.id)
                        .then((res: AxiosResponse) => {
                            this.isLiked = false;
                            this.likeCnt--;
                            // this.$emit('editDone')
                        })
                        .catch((err: AxiosError) => {

                        })
                }
            }
            else {
                if (!this.clickManager.doubleClickCheck()) {
                    this.$api.likeComment(this.postId, this.comment.id)
                        .then((res: AxiosResponse) => {
                            this.isLiked = true;
                            this.likeCnt++;
                            // this.$emit('editDone')
                        })
                        .catch((err: AxiosError) => {

                        })
                }
            }
        }
        else {
            this.$modal.show('needLogin')
        }

    }

    moveUserChannel(channel_id: string) {
        this.$router.push(`/channel/${channel_id}/timeline`)
    }

}
</script>

<style lang='scss' scoped>
.post-comment-text {

    position: absolute;
    width: 520px;
    height: 98px;
    left: 0px;
    top: 55.5px;
}

.post-comment-text-author {

}

.post-comment-text {
    text-align: left;
}

.comment.active {
    color: #4ff461;
}

.comment-btn {
    color: #9aa4bf;
    background: none;
}

.more-list {
    background-color: #fff !important;
    border-radius: 10px !important;
    box-shadow: 0 0 15px 0 rgb(82 70 70 / 20%);
}

.fixed {
    width: 100px;
    position: fixed;
    right: 10px;
}
</style>
