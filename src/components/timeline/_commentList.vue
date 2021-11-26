<template>
    <div>
        <div class="widget-box no-padding">
            <comment-input
                :commentId="null"
                :postId="postId"
                class="bordered-top"
            ></comment-input>
            <overlay-scrollbars ref="commentContainer" class="widget-box-scrollable"
                                :options="{ callbacks: {
                                    onScroll:handleComplete,
                                    onScrollStart: null}}">
                <div class="post-comment-list">
                    <comment
                        v-for="comment in comments"
                        :key="comment.id"
                        :comment="comment"
                        :postId="postId"
                        @openReport="openReport"
                        @commentId="selectedComment"
                    ></comment>
                </div>
            </overlay-scrollbars>
            <!-- comment input -->


        </div>
    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from "vue-property-decorator";

import Dropdown from "@/plugins/dropdown";
import Comment from "@/components/timeline/Comment.vue";
import CommentInput from "@/components/timeline/CommentInput.vue";
import {AxiosError, AxiosResponse} from "axios";
import {scrollDone} from "@/script/scrollManager";
import {OverlayScrollbarsComponent} from "overlayscrollbars-vue";

@Component({
    components: {Comment, CommentInput},
})
export default class TimelineComments extends Vue {
    @Prop() postId!: any;
    private dropdown: Dropdown = new Dropdown();

    private comments: any = [];
    private isOpenReport: boolean = false;
    private selectedCommentId: number = 0;

    private limit: number = 5;
    private offset: number = 0;
    private sort: string = '';

    private isAddData: boolean = false;

    handleComplete() {

        let scrollInfo = (this.$refs.commentContainer as OverlayScrollbarsComponent).osInstance()?.scroll();

        //@ts-ignore
        if (scrollInfo.ratio.y === 1) {
            this.offset += this.limit;
            this.fetch();
        }
    }


    mounted() {
        this.fetch()
        this.dropdown.init();
    }


    fetch() {
        const obj = {
            limit: this.limit,
            offset: this.offset,
            sort: this.sort
        }
        this.$api.comments(this.postId, obj)
            .then((res: any) => {
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


    openReport() {
        this.isOpenReport = true;
    }

    selectedComment(val: number) {
        this.selectedCommentId = val;
    }

    // reportDone(state: boolean) {
    //     if (state) {
    //         this.uniqeKey = new Date().getTime();
    //     }
    // }

    init() {
        this.isAddData = false;
        this.limit = 10;
        this.offset = 0;
        this.sort = '';
    }


}
</script>

<style scoped>
.popup-header {
    margin-top: 32px;
}

.post-comment-list {
    max-height: 500px !important;
}
</style>
