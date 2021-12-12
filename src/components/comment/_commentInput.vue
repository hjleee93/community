<template>
    <div class="comment-box">
        <p v-if="user"><span
            :style="`background:url(${user && user.picture || 'img/zempy.png'}) center; background-size:cover;`"></span>
        </p>
        <dl>
            <dt><input type="text" name="" title=""
                       v-model="content"
                       @keyup.enter="sendComment"
                       placeholder="댓글을 작성해 주세요"/></dt>
            <dd @click="sendComment"><i class="uil uil-message"></i></dd>
        </dl>
    </div>
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

    private content: string = "";
 
 

    private isPrivate: boolean = false;
    private userTag: string = "";
    private user!: User;

    mounted() {
        if (this.editContent) {
            this.content = this.editContent;
        }
        //대댓글
        if (this.parentId) {
            // this.content = `<router-link @${this.parentId}></router-link>`;
            this.userTag = this.parentId;
        }
    }

    //수정 , 작성
    sendComment() {
        if(!this.user){
            this.$store.commit('needLogin', true)
        }else{


        if(this.commentId){
            const obj={
                comment_id: this.commentId,
                post_id: this.postId,
                content:this.content
            }
            this.$api.updateComment(obj)
                .then((res: AxiosResponse) => {
                    console.log('updata', res)
                    this.$emit('sendComment')

                })
                .catch((err: AxiosError) => {

                })
            .finally(()=>{
                this.$emit("editDone", true);
            })


        }else {
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
                    this.$emit('refetch')
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


<style scoped>

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

.user-tag {
    font-weight: 700;
    margin-left: 10px;
}

.form-input.small {
    height: 48px;
}

.reply-container {
    display: flex;
    align-items: center;
    background-color: #1d2333;
    border: 1px solid #3f485f;
    color: #fff;
    transition: border-color 0.2s ease-in-out;
    border-radius: 12px;
}

.reply-form {
    width: 100%;
}

.reply-input {
    border: none;
    width: 100%;
}

/* .reply-label {
    margin-left: 20%;
} */
</style>