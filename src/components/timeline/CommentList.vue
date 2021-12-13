<template>
    <div>
        <div class="widget-box no-padding">
            <comment-input
                :commentId="null"
                :postId="postId"
                class="bordered-top"
            ></comment-input>
            <div class="widget-box-scrollable" data-simplebar>
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
            </div>
            <!-- comment input -->


        </div>
    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from "vue-property-decorator";

import Dropdown from "@/plugins/dropdown";
import Comment from "@/components/timeline/Comment.vue";
import CommentInput from "@/components/comment/_commentInput.vue";
import {AxiosError, AxiosResponse} from "axios";
import {scrollDone} from "@/script/scrollManager";

@Component({
    components: {Comment, CommentInput},
})
export default class CommentList extends Vue {
    @Prop() postId!: any;
    private dropdown: Dropdown = new Dropdown();

    private comments: any = [];
    private isOpenReport: boolean = false;
    private selectedCommentId: number = 0;

    private limit: number = 10;
    private offset: number = 0;
    private sort: string = '';

    private isAddData: boolean = false;

    mounted() {

        this.fetch()
        this.dropdown.init();
        window.addEventListener("scroll", this.scrollCheck);
    }
    beforeDestroy() {
        window.removeEventListener("scroll", this.scrollCheck);
    }

    fetch() {
        const obj = {
            limit: this.limit,
            offset: this.offset,
            sort: this.sort
        }
        this.$api.comments(this.postId, obj)
            .then((res:any) => {
                if (this.isAddData) {
                    if (res.result.length > 0) {
                        this.comments = [...this.comments, ...res.result]
                    }
                    else {
                        console.log('no data')
                        window.removeEventListener("scroll", this.scrollCheck);
                    }
                }
                else {
                    this.comments = res.result;
                    this.isAddData = true
                }
            })
            .catch((err: AxiosError) => {

            })
        .finally(()=>{

        })
    }
    scrollCheck() {
        if (scrollDone(document.documentElement)) {
            this.offset += this.limit;
            this.fetch();
        }
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

    init(){
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
</style>
