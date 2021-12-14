<template>
    <dl    v-if="!isEditing">
        <dt >
            <dl>
                <dt><span
                    :style="`background: url(${comment.user&&comment.user.picture}) center center no-repeat; background-size: cover;`"></span>
                </dt>
                <dd>
                    <h2>{{ comment.user&&comment.user.name }} <span>{{  }}</span></h2>
                    <div>
                        {{ comment.content }}
                    </div>
                    <p>
<!--                        is_liked-->
                        <a @click="sendLike"  ><i class="uil uil-heart-sign" :style="comment.is_liked ? 'color:red':''"></i></a> 좋아요 {{ comment.like_cnt }}개
                        <!--                    <a href="#"><i class="uil uil-edit-alt"></i> 댓글 작성</a>-->
                    </p>
                </dd>
            </dl>

        </dt>

        <dd>
            <dropdown-menu :overlay="false" class="tapl-more-dropdown">
                <a slot="trigger"><i class="uil uil-ellipsis-h font25"></i>
                </a>
                <div slot="body" class="more-list">
                    <a @click="editComment(comment.id)">댓글 수정</a>
                    <a @click="deleteComment(comment.id)">댓글 삭제</a>
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

@Component({
    computed: {...mapGetters(["user"])},
    components: { UserAvatar,CommentInput},
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

    mounted() {
        this.init();
        console.log('post',this.postId)
        this.createdDate = dateFormat(this.comment.createdAt);
    }

    async init() {
        const result = await this.$api.channel(this.comment.user_uid);
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

    deleteComment(commentId: string) {
        this.$api.deleteComment(this.postId, commentId)
            .then((res: AxiosResponse) => {
                this.$emit('editDone')
            })
            .catch((err: AxiosError) => {

            })
    }

    editComment() {
        this.isEditing = true;
    }


    sendLike() {
        if(this.comment.is_liked){
            this.$api.unlikeComment(this.postId, this.comment.id)
                .then((res: AxiosResponse) => {
                    this.$emit('editDone')
                })
                .catch((err: AxiosError) => {

                })
        }else{
            this.$api.likeComment(this.postId, this.comment.id)
                .then((res: AxiosResponse) => {
                    this.$emit('editDone')
                })
                .catch((err: AxiosError) => {

                })
        }



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
</style>
