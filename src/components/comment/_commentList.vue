<template>
        <overlay-scrollbars ref="commentContainer" class="scroll-box"
                            :options="{ callbacks: {
                                    onScroll:handleComplete,
                                    onScrollStart: null}}">

                <li v-for="comment in comments" :key="comment.id">
                    <dl>
                        <dt>
                            <dl>
                                <dt><span
                                    style="background: url('https://i.pinimg.com/564x/27/0c/51/270c515a26bb02c232bf0c1cc906ddbb.jpg') center center no-repeat; background-size: cover;"></span>
                                </dt>
                                <dd>
                                    <h2>{{ comment.user_id }} <span>{{dateFormat(comment.createdAt)}}</span></h2>
                                    <div>
                                        {{ comment.content }}
                                    </div>
                                    <p>
                                        <a href="#"><i class="uil uil-heart-sign"></i> 좋아요 {{ comment.like_cnt }}개</a>
                                        <a href="#"><i class="uil uil-edit-alt"></i> 댓글 작성</a>
                                    </p>
                                </dd>
                            </dl>
                        </dt>
                        <dd>
                            <dropdown-menu :overlay="false" class="tapl-more-dropdown">
                                <router-link to="#" slot="trigger"><i class="uil uil-ellipsis-h font25"></i>
                                </router-link>
                                <div slot="body" class="more-list">
                                    <router-link to="#">댓글 등록</router-link>
                                    <router-link to="#">댓글 수정</router-link>
                                    <router-link to="#">댓글 삭제</router-link>
                                </div>
                            </dropdown-menu>
                        </dd>
                    </dl>
                </li>

        </overlay-scrollbars>
        <!-- comment input -->


</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from "vue-property-decorator";

import Dropdown from "@/plugins/dropdown";
import Comment from "@/components/timeline/Comment.vue";
import CommentInput from "@/components/comment/_commentInput.vue";
import {AxiosError, AxiosResponse} from "axios";
import {scrollDone} from "@/script/scrollManager";
import {OverlayScrollbarsComponent} from "overlayscrollbars-vue";
import {mapGetters} from "vuex";

import {dateFormat} from "@/script/moment";
@Component({
    components: {Comment, CommentInput},
    computed: {...mapGetters(["user"])},
})
export default class CommentList extends Vue {
    @Prop() postId!: any;

    private comments: any = [];
    private isOpenReport: boolean = false;
    private selectedCommentId: number = 0;

    private limit: number = 5;
    private offset: number = 0;
    private sort: string = '';

    private isAddData: boolean = false;
    content = '';
    user!: any;

    handleComplete() {

        let scrollInfo = (this.$refs.commentContainer as OverlayScrollbarsComponent).osInstance()?.scroll();

        //@ts-ignore
        if (scrollInfo.ratio.y === 1) {
            this.offset += this.limit;
            this.fetch();
        }
    }
    dateFormat(date:number){
        return dateFormat(date);
    }

    mounted() {
        this.fetch()
    }


    fetch() {
        this.comments = [];
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

    commentDone() {
        this.init();
        this.fetch();
    }

    sendComment() {
        if (!this.user) {
            this.$store.commit('needLogin', true)
        }
        else {
            // if (this.commentId) {
            // const obj = {
            //     comment_id: this.commentId,
            //     post_id: this.postId,
            //     content: this.content
            // }
            // this.$api.updateComment(obj)
            //     .then((res) => {
            //         console.log('updata', res)
            //         this.$emit('sendComment')
            //
            //     })
            //     .catch((err) => {
            //
            //     })
            //     .finally(() => {
            //         this.$emit("editDone", true);
            //     })


            // }
            // else {

            const obj = {
                user_id: this.user.id,
                attatchment_files: [
                    {
                        priority: 0,
                        url: "string"
                    }
                ],
                type: "COMMENT",
                post_id: this.postId,
                content: this.content,

            }
            if (this.content.length > 0) {
                this.$api.sendComment(obj)
                    .then((res: any) => {
                        this.fetch()
                    })
                    .catch((err: any) => {
                    })
            }
            this.content = "";
        }

        // }

    }
}
</script>

<style scoped>

.scroll-box > li {margin-top:20px; padding-top:20px; border-top:#e9e9e9 1px solid;}
.scroll-box > li > dl {display:flex; justify-content:space-between;}
.scroll-box > li > dl > dt > dl {display:flex;}
.scroll-box > li > dl > dt > dl dt {margin-right:10px;}
.scroll-box > li > dl > dt > dl dt span {display:inline-block; width:30px; height:30px; border-radius:50%; border:1px solid #e9e9e9; filter:drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.05));}
.scroll-box > li > dl > dt > dl dd h2 {font-weight:500; font-size:13px; line-height:13px; color:#333;}
.scroll-box > li > dl > dt > dl dd h2 span {padding-left:5px; font-size:11px; line-height:11px; color:#999;}
.scroll-box > li > dl > dt > dl dd div {margin-top:10px;}
.scroll-box > li > dl > dt > dl dd p {margin-top:10px;}
.scroll-box > li > dl > dt > dl dd p a {margin-right:15px;}
.scroll-box {display:flex; align-items:center; margin-top:25px; border:#e5e5e5 1px solid; border-radius:10px;}
.scroll-box dt {width:80%; padding:0 5px;}
.scroll-box dt input {width:100%; border:none;}
.scroll-box dt input:focus {border:none; box-shadow:none;}
.scroll-box dd {width:20%; padding-right:15px; text-align:right; font-size:20px;}

</style>
