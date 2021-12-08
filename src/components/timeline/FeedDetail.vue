<template>
    <article class="content" v-if="feed">
        <div
            class="post-open-body pt-0"
            style="margin-top: 80px; height: 100vh"
        >
            <div class="post-top">


                <template v-if="feed.user">
                    <router-link :to="`/channel/${feed.user.uid}/timeline`">
                        <UserAvatar :user="feed.user"/>
                    </router-link>

                </template>
                <div class="forum-post-user-title ml-3">
                    <router-link :to="`${feed.user.uid}`"
                    >{{ feed.user.name }}
<!--                        @{{ feed.user.nickname}}-->
                    </router-link
                    >
                    <small style="color:ghostwhite">{{ createdDate }}</small>
                </div>
                <FollowBtn :member="feed.user"></FollowBtn>
            </div>

            <div class="post-open-content">
                <div class="post-open-content-body">
                    <div v-html="feed.content" @click="contentClicked">
                        {{ feed.content }}
                    </div>
                    `
                </div>
            </div>
            <template v-if="feed.post_type==='SNS' && feed.attatchment_files">
                <div v-for="file in feed.attatchment_files" :key="file.id">
                    <img  @click="contentClicked" class="sns-img" v-if="file.type === 'image' " :src="file.url"/>
                    <video
                        class="sns-img"
                        v-if="file.type === 'video' "
                        width="320"
                        height="240"
                        controls
                        :src="file.url"></video>
                </div>
            </template>


            <div class="content-actions">
                <div class="content-action">
                    <div class="post-option-wrap" style="position: relative">
                        <LikeBtn :feed="feed"/>
                    </div>

                    <div class="post-option active">
                        <svg class="post-option-icon icon-comment">
                            <use xlink:href="#svg-comment"></use>
                        </svg>
                    </div>

                    <div
                        class="post-option"
                        @click="copyUrl"
                        @mouseover="isCopied = false"
                        data-title="Copy URL"
                    >
                        <svg class="post-option-icon icon-share">
                            <use xlink:href="#svg-share"></use>
                        </svg>
                    </div>
                </div>
                <post-dropdown class="dropdown" :feed="feed"></post-dropdown>
            </div>
            <div id="comments" class="post-comment-list">
                <comment-list :postId="feedId"></comment-list>
            </div>
        </div>
        <b-modal
            modal-class="orgin-img-modal"
            centered
            hide-header
            hide-footer
            ref="originImgModal"
        >
            <b-img-lazy :src="originImg" @click="closeImgModal"/>
        </b-modal>
        <AlertModal v-if="needLogin" @needLogin="needLogin = false"></AlertModal>
    </article>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import CommentList from "./CommentList.vue";

import Dropdown from "@/plugins/dropdown";

import PostDropdown from "@/components/layout/dropdown/PostDropdown.vue";
import {dateFormat} from "@/script/moment";
import {AxiosError, AxiosResponse} from "axios";
import FollowBtn from "@/components/user/_followBtn.vue";
import AlertModal from "@/components/common/AlertModal.vue";
import {mapGetters} from "vuex";
import {User} from "@/types";
import LikeBtn from "@/components/common/_likeBtn.vue";
import UserAvatar from "@/components/common/_userAvatar.vue";

@Component({
    components: {CommentList, PostDropdown, FollowBtn, AlertModal, LikeBtn, UserAvatar},
    computed: {...mapGetters(["user"])},
})
export default class FeedDetail extends Vue {
    private dropdown: Dropdown = new Dropdown();
    private feedId = this.$route.params.feedId;
    private feed: any = null;
    private isCopied: boolean = false;
    private createdDate: string = "";

    private originImg: string = "";
    private needLogin = false;
    private user!: User;

    fetch() {
        this.$api.feed(this.feedId)
            .then((res: AxiosResponse) => {
                console.log(res)
                this.feed = res

                this.createdDate = dateFormat(this.feed.createdAt)!;
            })
    }

    mounted() {
        this.fetch();
        this.dropdown.init();
    }

    sendLike() {
        if (this.user) {
            this.$api.like(this.feed.id)
                .then((res: AxiosResponse) => {
                    console.log(res)
                })
                .catch((err: AxiosError) => {

                })
        }
        else {
            this.needLogin = true;
            console.log('need login service')
        }
    }

    copyUrl() {
        let input = document.body.appendChild(document.createElement("input"));
        input.value = window.location.href;

        input.select();
        document.execCommand("copy");
        input.parentNode?.removeChild(input);

        this.isCopied = true;
    }

    contentClicked(e: any) {
        if (e.target.matches("img")) {
            this.originImg = e.target.src;
            (this.$refs.originImgModal as any).show();
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
    }

    closeImgModal() {
        console.log("?");
        (this.$refs.originImgModal as any).hide();
    }
}
</script>

<style lang="scss" scoped>
.user-avatar {
    z-index: 999;
}

.sns-img {
    width: 100%
}

.dropdown {
    display: flex;
    justify-content: flex-end;
    margin-right: 28px;

    align-items: center;
}

.post-open-content-body {
    text-align: left;

    div > * {
        margin-top: 0.75em !important;
    }
}

.post-open-content {
    margin-top: 0px !important;
}

.post-open-content-sidebar {
    display: flex;
    flex-direction: column;
    align-items: center;

    .forum-post-user-title {
        margin-top: 16px;
    }
}

.content-actions {
    border-bottom: 1px solid #2f3749;
}

.post-top {
    margin-left: 30px;
    margin-right: 30px;
    display: flex;
    height: 100px;
    align-items: center;

    .forum-post-user-title {
        margin-right: 30%;
        display: flex;
        flex-direction: column;
    }

    .button {
        width: 100px !important;
    }
}
</style>
