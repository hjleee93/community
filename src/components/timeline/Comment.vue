<template>
    <div class="comment-box" style="border-bottom: 1px solid #d5d5d5; border-radius: 0px">
        <p><span
            :style="`background:url('img/zempy.png') center; background-size:cover;`"></span>
        </p>
        <dl>
            {{ userInfo && userInfo.name }}
            <dt><p>{{ comment && comment.content }}</p></dt>
            <dt><p>{{ comment && createdDate }}</p></dt>
        </dl>
        <CommentInput
            v-if="isOpenReply"
            :postId="postId"
            :commentId="comment.id"
            :parentId="parentId"
            :parentName="userInfo.name"
            class="post-comment unread reply-2"
        ></CommentInput>
        <button @click="isOpenReply = !isOpenReply">Reply</button>{{isOpenReply}}

        <!--  unread reply-2 -->
        <!--        <div class="post-comment">-->
        <!--            &lt;!&ndash; {{userInfo}} &ndash;&gt;-->
        <!--            <router-link-->
        <!--                v-if="!isEditing"-->
        <!--                :to="`/channel/${userInfo && userInfo.uid}/timeline`"-->
        <!--            >-->

        <!--            </router-link>-->

        <!--            <p class="post-comment-text">-->
        <!--                <template v-if="!isEditing">-->
        <!--                    <a-->
        <!--                        class="post-comment-text-author"-->
        <!--                        href="profile-timeline.html"-->
        <!--                    >{{ userInfo && userInfo.name }}</a-->
        <!--                    >{{ comment && comment.content }}-->
        <!--                </template>-->
        <!--                &lt;!&ndash; edit comment &ndash;&gt;-->
        <!--                <template v-else>-->
        <!--                    <comment-input-->
        <!--                        @editDone="editDone"-->
        <!--                        :postId="postId"-->
        <!--                        :commentId="comment.id"-->
        <!--                        :editContent="comment.content"-->
        <!--                    ></comment-input>-->
        <!--                </template>-->
        <!--                &lt;!&ndash; /edit comment &ndash;&gt;-->
        <!--            </p>-->

        <!--            <div class="content-actions">-->
        <!--                <div class="content-action">-->
        <!--                    <div class="meta-line">-->
        <!--                        <div class="meta-line-list reaction-item-list small">-->
        <!--                            <div class="reaction-item"></div>-->

        <!--                            <div class="reaction-item">-->
        <!--&lt;!&ndash;                                <img&ndash;&gt;-->
        <!--&lt;!&ndash;                                    class="reaction-image"&ndash;&gt;-->
        <!--&lt;!&ndash;                                    src="../../img/reaction/love.png"&ndash;&gt;-->
        <!--&lt;!&ndash;                                    alt="reaction-love"&ndash;&gt;-->
        <!--&lt;!&ndash;                                />&ndash;&gt;-->
        <!--                            </div>-->
        <!--                        </div>-->

        <!--                        <p class="meta-line-text">-->
        <!--                            {{ comment && comment.like_cnt }}-->
        <!--                        </p>-->
        <!--                    </div>-->

        <!--                    <div class="meta-line" @click="likeComment">-->
        <!--                        <p-->
        <!--                            class="-->
        <!--                                meta-line-link-->
        <!--                                light-->
        <!--                                reaction-options-small-dropdown-trigger-->
        <!--                            "-->
        <!--                        >-->
        <!--                            Like!-->
        <!--                        </p>-->
        <!--                    </div>-->

        <!--                    <div class="meta-line" @click="openReply(comment)">-->
        <!--                        <p-->
        <!--                            class="meta-line-link light comment mr-3"-->
        <!--                            :class="isOpenReply ? 'active' : ''"-->
        <!--                        >-->
        <!--                            Reply-->
        <!--                        </p>-->
        <!--                        <p class="meta-line-timestamp">-->
        <!--                            {{ comment && createdDate }}-->
        <!--                        </p>-->
        <!--                    </div>-->

        <!--&lt;!&ndash;                    수정, 삭제&ndash;&gt;-->
        <!--                    <div class="meta-line" v-if="user.id === comment.user_id">-->
        <!--                        <button class='comment-btn mr-3' @click="deleteComment(comment.id)">삭제</button>-->
        <!--                        <button class='comment-btn'  @click="editComment">수정</button>-->
        <!--                    </div>-->


        <!--&lt;!&ndash;                    <div class="meta-line settings">&ndash;&gt;-->
        <!--&lt;!&ndash;                        <div class="post-settings-wrap">&ndash;&gt;-->
        <!--&lt;!&ndash;                            <div&ndash;&gt;-->
        <!--&lt;!&ndash;                                class="&ndash;&gt;-->
        <!--&lt;!&ndash;                                    post-settings post-settings-dropdown-trigger&ndash;&gt;-->
        <!--&lt;!&ndash;                                "&ndash;&gt;-->
        <!--&lt;!&ndash;                                ref="dropbox"&ndash;&gt;-->
        <!--&lt;!&ndash;                            >&ndash;&gt;-->
        <!--&lt;!&ndash;                                <svg class="post-settings-icon icon-more-dots">&ndash;&gt;-->
        <!--&lt;!&ndash;                                    <use xlink:href="#svg-more-dots"></use>&ndash;&gt;-->
        <!--&lt;!&ndash;                                </svg>&ndash;&gt;-->
        <!--&lt;!&ndash;                            </div>&ndash;&gt;-->


        <!--&lt;!&ndash;                            &lt;!&ndash;                            <div&ndash;&gt;&ndash;&gt;-->
        <!--&lt;!&ndash;                            &lt;!&ndash;                                class="simple-dropdown post-settings-dropdown"&ndash;&gt;&ndash;&gt;-->
        <!--&lt;!&ndash;                            &lt;!&ndash;                                ref="dropboxList"&ndash;&gt;&ndash;&gt;-->
        <!--&lt;!&ndash;                            &lt;!&ndash;                            >&ndash;&gt;&ndash;&gt;-->
        <!--&lt;!&ndash;                            &lt;!&ndash;                                <p&ndash;&gt;&ndash;&gt;-->
        <!--&lt;!&ndash;                            &lt;!&ndash;                                    class="&ndash;&gt;&ndash;&gt;-->
        <!--&lt;!&ndash;                            &lt;!&ndash;                                        simple-dropdown-link&ndash;&gt;&ndash;&gt;-->
        <!--&lt;!&ndash;                            &lt;!&ndash;                                        popup-event-creation-trigger&ndash;&gt;&ndash;&gt;-->
        <!--&lt;!&ndash;                            &lt;!&ndash;                                    "&ndash;&gt;&ndash;&gt;-->
        <!--&lt;!&ndash;                            &lt;!&ndash;                                    v-b-modal="comment.id.toString()"&ndash;&gt;&ndash;&gt;-->
        <!--&lt;!&ndash;                            &lt;!&ndash;                                    @click="reportComment"&ndash;&gt;&ndash;&gt;-->
        <!--&lt;!&ndash;                            &lt;!&ndash;                                >&ndash;&gt;&ndash;&gt;-->
        <!--&lt;!&ndash;                            &lt;!&ndash;                                    Report Comment&ndash;&gt;&ndash;&gt;-->
        <!--&lt;!&ndash;                            &lt;!&ndash;                                </p>&ndash;&gt;&ndash;&gt;-->
        <!--&lt;!&ndash;                            &lt;!&ndash;                                <p&ndash;&gt;&ndash;&gt;-->
        <!--&lt;!&ndash;                            &lt;!&ndash;                                    class="simple-dropdown-link"&ndash;&gt;&ndash;&gt;-->
        <!--&lt;!&ndash;                            &lt;!&ndash;                                    @click="editPost"&ndash;&gt;&ndash;&gt;-->
        <!--&lt;!&ndash;                            &lt;!&ndash;                                >&ndash;&gt;&ndash;&gt;-->
        <!--&lt;!&ndash;                            &lt;!&ndash;                                    Edit Comment&ndash;&gt;&ndash;&gt;-->
        <!--&lt;!&ndash;                            &lt;!&ndash;                                </p>&ndash;&gt;&ndash;&gt;-->
        <!--&lt;!&ndash;                            &lt;!&ndash;                                <p&ndash;&gt;&ndash;&gt;-->
        <!--&lt;!&ndash;                            &lt;!&ndash;                                    class="simple-dropdown-link"&ndash;&gt;&ndash;&gt;-->
        <!--&lt;!&ndash;                            &lt;!&ndash;                                    @click="deleteComment(comment.id)"&ndash;&gt;&ndash;&gt;-->
        <!--&lt;!&ndash;                            &lt;!&ndash;                                >&ndash;&gt;&ndash;&gt;-->
        <!--&lt;!&ndash;                            &lt;!&ndash;                                    Delete Comment&ndash;&gt;&ndash;&gt;-->
        <!--&lt;!&ndash;                            &lt;!&ndash;                                </p>&ndash;&gt;&ndash;&gt;-->
        <!--&lt;!&ndash;                            &lt;!&ndash;                            </div>&ndash;&gt;&ndash;&gt;-->

        <!--&lt;!&ndash;                        </div>&ndash;&gt;-->
        <!--&lt;!&ndash;                    </div>&ndash;&gt;-->
        <!--                </div>-->
        <!--            </div>-->
        <!--        </div>-->
        <!--        <modal-->
        <!--            :reportId="comment.id.toString()"-->
        <!--            :title="modalTitle"-->
        <!--            :key="uniqeKey"-->
        <!--        >-->
        <!--            <template v-slot:reason1>욕설</template>-->
        <!--            <template v-slot:reason2>스팸</template>-->
        <!--            <template v-slot:reason3>음란성</template>-->
        <!--        </modal>-->

    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import Hexagon from "@/plugins/hexagon";
import PopupPlugin from "@/plugins/popup";

import {dateFormat} from "@/script/moment";
import Modal from "@/components/common/Modal.vue";
import CommentInput from "@/components/comment/_commentInput.vue";
import {AxiosError, AxiosResponse} from "axios";
import {mapGetters} from "vuex";
import UserAvatar from "@/components/common/_userAvatar.vue";

@Component({
    computed: {...mapGetters(["user"])},
    components: {CommentInput, Modal, UserAvatar},
})
export default class Comment extends Vue {
    @Prop() comment!: any;
    @Prop() postId!: any;
    private userInfo: any = [];
    private content: string = this.comment.content;
    private isEditing: boolean = false;
    private isPrivate: boolean = false;
    private isOpenReply = false;
    private parentId: number = -1;
    private modalTitle: string = "Report Comment";
    private createdDate: string = "";

    mounted() {
        this.init();
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
        this.$emit('sendComment')
    }

    deleteComment(commentId: string) {
        this.$api.deleteComment(this.postId, commentId)
            .then((res: AxiosResponse) => {
                this.$emit('sendComment')
            })
            .catch((err: AxiosError) => {

            })
    }

    editComment() {
        this.isEditing = true;
    }

    reportComment() {
        (this.$refs.dropbox as HTMLElement).click();
        this.$emit("openReport", true);
        this.$emit("commentId", this.comment.id);
        //  document.documentElement.style.overflow = 'hidden'
    }

    likeComment() {
        this.$api.likeComment(this.postId, this.comment.id)
            .then((res: AxiosResponse) => {
                console.log(res)
            })
            .catch((err: AxiosError) => {

            })


    }
    //
    // openReply(comment: any) {
    //     this.isOpenReply = !this.isOpenReply;
    //     this.parentId = this.comment.id;
    // }

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
