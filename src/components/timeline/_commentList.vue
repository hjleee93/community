<template>
    <div>
        <div class="comment-box">
        <p><span
            style="background:url('https://i.pinimg.com/236x/47/73/c7/4773c7b87bbe9f7d92d54a0c8f6364d4.jpg') center; background-size:cover;"></span>
        </p>
            <dl>
                <dt><input type="text" name="" title=""

                           placeholder="댓글을 작성해 주세요"/></dt>
                <dd><a href="#"><i class="uil uil-message"></i></a></dd>
            </dl>
        </div>
            <overlay-scrollbars ref="commentContainer" class="widget-box-scrollable"
                                :options="{ callbacks: {
                                    onScroll:handleComplete,
                                    onScrollStart: null}}">
                <div class="post-comment-list">
                    <comment
                        @sendComment="commentDone"
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
        console.log('comment fetch')
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

    commentDone(){
        this.init();
        this.fetch();
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


.comment-box {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 20px 20px;
    border-radius: 10px;
    background: #fff;
}

.comment-box > p {
    width: 12%;
}

.comment-box > p span {
    display: inline-block;
    width: 45px;
    height: 45px;
    border-radius: 50%;
}

.comment-box > dl {
    display: flex;
    align-items: center;
    width: 88%;
    border: #e5e5e5 1px solid;
    border-radius: 10px;
}

.comment-box > dl dt {
    width: 80%;
    padding: 0 5px;
}

.comment-box > dl dt input {
    width: 100%;
    border: none;
}

.comment-box > dl dt input:focus {
    border: none;
    box-shadow: none;
}

.comment-box > dl dd {
    width: 20%;
    padding-right: 15px;
    text-align: right;
    font-size: 20px;
}


</style>
