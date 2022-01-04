<template>
    <dl :class="commentId ? 'edit-comment' :''">
        <UserAvatar :user="user" :tag="'p'" class="user"/>
        <dt><input type="text" v-model="content" name="" title="" placeholder="댓글달기" @click='checkLogin'
                   @keyup.enter="sendComment"/></dt>
        <dd><a @click="sendComment"><i class="uil uil-message"></i></a></dd>
    </dl>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from "vue-property-decorator";
import {mapGetters} from "vuex";
import {AxiosError, AxiosResponse} from "axios";
import {User} from "@/types";
import UserAvatar from "@/components/user/_userAvatar.vue";

@Component({
    computed: {...mapGetters(["user"])},
    components: {UserAvatar},
})
export default class CommentInput extends Vue {
    @Prop() postId!: any;
    @Prop() parentId!: any;
    @Prop() editContent!: any;
    @Prop() commentId!: number;
    @Prop() parentName!: string;

    content: string = "";


    isPrivate: boolean = false;
    user!: User;

    mounted() {
        if (this.editContent) {
            this.content = this.editContent;
        }
    }

    checkLogin() {
        if (!this.user) {
            this.$modal.show('needLogin')
        }
    }

    //수정 , 작성
    sendComment() {
        const whiteSpace = /\s/g;

        if (!this.user) {
            this.$modal.show('needLogin')
        }
        else {
            if (!this.content ||  this.content.match(whiteSpace)) {
                this.$modal.show({
                    template: `<div class="modal-alert">
                <dl class="ma-header">
                    <dt>안내</dt>
                    <dd>
                        <button @click="$modal.hide('minChar')"><i class="uil uil-times"></i></button>
                    </dd>
                </dl>
                <div class="ma-content">
                    <h2> 텍스트 내용을 입력해 주세요. </h2>
                    <div>
                        <button class="btn-default" style="width:100%" @click="$modal.hide('minChar')">네</button>
                    </div>
                </div>
            </div>`,
                }, {}, {
                    name: "minChar",
                    width: 380,
                    maxWidth: 380,
                    height: "auto",
                    class: "modal-area-type",
                    scrollable: true
                })
                return;
            }
            if (this.commentId) {
                const obj = {
                    comment_id: this.commentId,
                    post_id: this.postId,
                    content: this.content
                }
                this.$api.updateComment(obj)
                    .then((res: AxiosResponse) => {
                        this.$emit('sendComment')

                    })
                    .catch((err: AxiosError) => {

                    })
                    .finally(() => {
                        this.$emit("editDone", true);
                    })


            }
            else {
                const obj = {
                    user_id: this.user.id,
                    attatchment_files: [
                        {
                            priority: 0,
                            url: "string"
                        }
                    ],
                    type: "COMMENT",
                    parent_id: this.parentId,
                    post_id: this.postId,
                    content: this.content,
                    is_private: this.isPrivate
                }
                this.$api.sendComment(obj)
                    .then((res: AxiosResponse) => {
                        this.$emit('sendComment')
                    })
                    .catch((err: AxiosError) => {

                    })


                this.content = "";
                this.isPrivate = false;
            }

        }

    }


}
</script>


<style lang="scss" scoped>

.user {
    display: inline-block;
    width: 40px;
    height: 37px;
    border-radius: 50%;
    border: 1px solid #e9e9e9;
    margin-left: 6px;
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

.reply-send-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60px;
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;
}

.icon-send-message:hover {
    fill: #fff;
}

.checkbox-wrap label {
    text-align: left;
}

.checkbox-wrap {
    margin-top: 8px;
}

.checkbox-wrap input[type="checkbox"]:checked + .checkbox-box,
.checkbox-wrap input[type="radio"]:checked + .checkbox-box {
    background-color: rgb(0 0 0 / 10%);
    border-color: #3f485f;
}

.checkbox-wrap input[type="checkbox"]:checked + .checkbox-box .icon-check,
.checkbox-wrap input[type="radio"]:checked + .checkbox-box .icon-check {
    fill: #ffffff;
}

.checkbox-wrap .checkbox-box .icon-check {
    fill: transparent;
    transition: fill 0.2s ease-in-out;
}

.edit-comment {
    display: flex;
    align-items: center;
    margin-top: 25px;
    border: #e5e5e5 1px solid;
    border-radius: 10px;
    width: 100%;

    dt {
        width: 80%;
        padding: 0 5px;

    }

    input {
        width: 100%;
        border: none;
    }

    input[type='text']:focus {
        box-shadow: none;
    }

    dd {
        width: 20%;
        padding-right: 15px;
        text-align: right;
        font-size: 20px;
    }
}
</style>