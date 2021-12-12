<template>

  <!--            <div-->
  <!--                class="widget-box no-padding"-->
  <!--                :style="-->
  <!--                    isOpenedComments-->
  <!--                        ? 'border-bottom-left-radius: 0px; border-bottom-right-radius: 0px;'-->
  <!--                        : ''-->
  <!--                "-->
  <!--            >-->
  <!--                <post-dropdown-->
  <!--                    :feed="feed"-->
  <!--                    @postEdit="postEdit"-->
  <!--                    @refreshFeed="refreshFeed"-->
  <!--                ></post-dropdown>-->

  <!--                <div class="widget-box-status">-->
  <!--                    <div class="widget-box-status-content">-->
  <!--                        <div class="user-status">-->
  <!--                            <router-link-->
  <!--                                :to="`/channel/${feed.user&&feed.user.uid}/timeline`"-->
  <!--                            >-->
  <!--                                <UserAvatar :user="feed.user"/>-->
  <!--                            </router-link>-->

  <!--                            <p class="user-status-title medium" v-if="feed.user">-->
  <!--                                <router-link :to="`/channel/${feed.user.channel_id}`" class="bold">{{-->
  <!--                                        feed.user.name-->
  <!--                                    }}-->
  <!--                                </router-link>-->
  <!--                                uploaded a-->
  <!--                                <span class="bold"-->
  <!--                                >{{ feed.post_type }} post</span-->
  <!--                                >-->
  <!--                            </p>-->

  <!--                            <p class="user-status-text small">{{ postDate }}</p>-->
  <!--                        </div>-->

  <!--                        <div-->
  <!--                            class="widget-box-status-text feed-content"-->
  <!--                            ref="feedContent"-->
  <!--                            v-html="feed.content"-->
  <!--                            @click="contentClicked"-->
  <!--                        ></div>-->
  <!--                        <template v-if="attachedFile && feed.post_type === 'SNS'">-->
  <!--                            <div v-for="file in attachedFile">-->
  <!--                                <b-img @click="contentClicked" v-if="file.type === 'image'" :src="file.url"-->
  <!--                                       class="feed-img mt-3"></b-img>-->
  <!--                                <video-->
  <!--                                    width="320"-->
  <!--                                    height="240"-->
  <!--                                    controls-->
  <!--                                    :src="file.url"-->
  <!--                                    v-if="file.type === 'video'"></video>-->
  <!--                                <audio v-if="file.type === 'sound'" controls :src="file.url"></audio>-->
  <!--                            </div>-->
  <!--                        </template>-->
  <!--                    </div>-->

  <!--                    <div class="widget-box-status-content">-->
  <!--                        <div class="tag-list">-->
  <!--                            &lt;!&ndash;                            <div&ndash;&gt;-->
  <!--                            &lt;!&ndash;                                class="tag-item secondary"&ndash;&gt;-->
  <!--                            &lt;!&ndash;                                @click="moveHashtag(hashtag)"&ndash;&gt;-->
  <!--                            &lt;!&ndash;                                v-for="hashtag in hashtags"&ndash;&gt;-->
  <!--                            &lt;!&ndash;                                :key="hashtag"&ndash;&gt;-->
  <!--                            &lt;!&ndash;                            >{{ hashtag }}&ndash;&gt;-->
  <!--                            &lt;!&ndash;                            </div&ndash;&gt;-->
  <!--                            &lt;!&ndash;                            >&ndash;&gt;-->
  <!--                        </div>-->
  <!--                        <b-modal-->
  <!--                            modal-class="post-edit-modal"-->
  <!--                            centered-->
  <!--                            hide-header-->
  <!--                            hide-footer-->
  <!--                            v-model="show"-->
  <!--                            ref="editModal"-->
  <!--                        >-->
  <!--                            <Post :feed="feed" :key="isEdit">-->
  <!--                                <template v-slot:closeBtn>-->
  <!--                                    <div-->
  <!--                                        class="modal-close-container"-->
  <!--                                        @click="closeEditModal"-->
  <!--                                    >-->
  <!--                                        <svg class="icon-cross text-right">-->
  <!--                                            <use xlink:href="#svg-cross"></use>-->
  <!--                                        </svg>-->
  <!--                                    </div>-->
  <!--                                </template>-->
  <!--                            </Post>-->
  <!--                        </b-modal>-->
  <!--                        <div class="content-actions">-->
  <!--                            <div class="meta-line">-->
  <!--                                <div class="meta-line-list reaction-item-list">-->
  <!--                                    <div-->
  <!--                                        class="-->
  <!--                                            reaction-item-->
  <!--                                            reaction-item-dropdown-trigger-->
  <!--                                        "-->
  <!--                                        style="width: 100%"-->
  <!--                                    >-->
  <!--                                        <img-->
  <!--                                            style="margin-left: 6px"-->
  <!--                                            class="reaction-image"-->
  <!--                                            src="../../img/reaction/love.png"-->
  <!--                                            alt="reaction-love"-->
  <!--                                        />-->

  <!--                                        <div-->
  <!--                                            class="-->
  <!--                                                simple-dropdown-->
  <!--                                                padded-->
  <!--                                                reaction-item-dropdown-->
  <!--                                            "-->
  <!--                                        >-->
  <!--                                            <p class="simple-dropdown-text">-->
  <!--                                                <img-->
  <!--                                                    class="reaction"-->
  <!--                                                    src="../../img/reaction/love.png"-->
  <!--                                                    alt="reaction-love"-->
  <!--                                                />-->
  <!--                                                <span class="bold">Like</span>-->
  <!--                                            </p>-->

  <!--                                            <p-->
  <!--                                                class="simple-dropdown-text"-->
  <!--                                                v-for="like in likeList"-->
  <!--                                                :key="like.id"-->
  <!--                                            >-->
  <!--                                                <router-link-->
  <!--                                                    :to="`/channel/${like.user.channel_id}/timeline`"-->
  <!--                                                    style="color: #fff"-->
  <!--                                                >{{-->
  <!--                                                        like.user.name-->
  <!--                                                    }}-->
  <!--                                                </router-link-->
  <!--                                                >-->
  <!--                                            </p>-->
  <!--                                        </div>-->
  <!--                                    </div>-->
  <!--                                </div>-->
  <!--                            </div>-->
  <!--                            <div class="post-icon-wrap">-->
  <!--                                <LikeBtn :feed="feed"/>-->
  <!--                                <div-->
  <!--                                    :style="-->
  <!--                                        this.isOpenedComments-->
  <!--                                            ? 'border-bottom-left-radius: 0px; border-bottom-right-radius: 0px;'-->
  <!--                                            : ''-->
  <!--                                    "-->
  <!--                                >-->
  <!--                                    <div-->
  <!--                                        class="post-option"-->
  <!--                                        @click="openComments"-->
  <!--                                    >-->
  <!--                                        <svg-->
  <!--                                            class="-->
  <!--                                                post-option-icon-->
  <!--                                                icon-comment-->
  <!--                                            "-->
  <!--                                            :class="-->
  <!--                                                isOpenedComments ? 'active' : ''-->
  <!--                                            "-->
  <!--                                        >-->
  <!--                                            <use-->
  <!--                                                xlink:href="#svg-comment"-->
  <!--                                            ></use>-->
  <!--                                        </svg>-->
  <!--                                        -->
  <!--                                    </div>-->
  <!--                                </div>-->

  <!--                                <div-->
  <!--                                    class="post-option copy-url-tooltip"-->
  <!--                                    @click="copyUrl"-->
  <!--                                    @mouseover="isCopied = false"-->
  <!--                                    data-title="Copy URL"-->
  <!--                                >-->
  <!--                                    <svg class="post-option-icon icon-share">-->
  <!--                                        <use xlink:href="#svg-share"></use>-->
  <!--                                    </svg>-->
  <!--                                </div>-->

  <!--                                &lt;!&ndash;                                todo: 핀기능 테스트 후 넣기 &ndash;&gt;-->
  <!--                                &lt;!&ndash;                                <div&ndash;&gt;-->
  <!--                                &lt;!&ndash;                                    style="margin-left: auto"&ndash;&gt;-->
  <!--                                &lt;!&ndash;                                    class="post-option copy-url-tooltip"&ndash;&gt;-->
  <!--                                &lt;!&ndash;                                    data-title="pin"&ndash;&gt;-->
  <!--                                &lt;!&ndash;                                    @click="pinPost"&ndash;&gt;-->
  <!--                                &lt;!&ndash;                                >&ndash;&gt;-->
  <!--                                &lt;!&ndash;                                    <svg&ndash;&gt;-->
  <!--                                &lt;!&ndash;                                        class="icon-pinned"&ndash;&gt;-->
  <!--                                &lt;!&ndash;                                        :class="feed.is_pinned ? 'active' : ''"&ndash;&gt;-->
  <!--                                &lt;!&ndash;                                    >&ndash;&gt;-->
  <!--                                &lt;!&ndash;                                        <use xlink:href="#svg-pinned"></use>&ndash;&gt;-->
  <!--                                &lt;!&ndash;                                    </svg>&ndash;&gt;-->
  <!--                                &lt;!&ndash;                                </div>&ndash;&gt;-->

  <!--                            </div>-->
  <!--                        </div>-->
  <!--                    </div>-->
  <!--                </div>-->
  <!--            </div>-->
  <!--        </div>-->

  <li class="tap-list" v-if="feed&& feed.user">
    <dl class="tapl-title">
      <dt>
        <dl>
          <UserAvatar :user="feed.user"></UserAvatar>

          <dd>
            <h2>{{ feed.user.name }} uploaded a {{ feed.post_type }} post</h2>
            <p><i class="uis uis-clock" style="color:#c1c1c1;"></i> {{ dateFormat(feed.createdAt) }}</p>

          </dd>
        </dl>
      </dt>
      <dd>
        <dropdown-menu :overlay="false" class="tapl-more-dropdown"
                       :isOpen="isOpenReportModal" @closed="isOpenReportModal= false">
          <a class="btn-circle-none pt6" slot="trigger" @click="isOpenReportModal= !isOpenReportModal"><i class="uil uil-ellipsis-h font25"></i></a>
          <div slot="body" class="more-list">
            <template v-if="user && (user.id === feed.user.id)">
              <a @click="openEdit">포스팅 수정</a>
              <a @click="deletePost">포스팅 삭제</a>

              <!--                          <a @click="reportUser">유저 신고</a>-->
            </template>
            <template v-else>
              <router-link :to="`/channel/${feed.user.uid}/timeline`">유저 채널 방문</router-link>
              <a @click="openEdit">포스팅 수정</a>
              <a @click="report">포스팅 신고</a>

            </template>
          </div>
        </dropdown-menu>
      </dd>
    </dl>


    <div class="tapl-content" v-html="feed.content" @click="contentClicked"></div>

    <template v-if="attachedFile && feed.post_type === 'SNS'">
      <div v-for="file in attachedFile">
        <img @click="contentClicked" v-if="file.type === 'image'" :src="file.url"
             class="feed-img mt-3"></img>
      </div>
    </template>

    <ul class="tapl-option">
      <li>
        <ul>
          <LikeBtn :feed="feed"></LikeBtn>
          <li @click="openComments"><i class="uil uil-comment-alt-dots comment-icon"
                                       style="font-size:22px;"></i>&nbsp; {{ feed.comment_cnt }}
          </li>
          <!--                    <li><i class="uil uil-eye" style="font-size:22px;"></i>&nbsp;680</li>-->
          <li><a @click="copyUrl"><i class="uil uil-share-alt" style="font-size:20px;"></i></a></li>
        </ul>
      </li>
      <!--            <li><router-link to="#"><i class="uil uil-bookmark" style="font-size:24px; color:#ff6e17;"></i></router-link></li>-->
    </ul>
    <div v-if="isOpenedComments" class="tapl-comment">
      <ul @scroll="scrollCheck">
        <li v-for="comment in comments" :key="comment.id">
          <dl>
            <dt>
              <dl>
                <dt><span
                    style="background: url('https://i.pinimg.com/564x/27/0c/51/270c515a26bb02c232bf0c1cc906ddbb.jpg') center center no-repeat; background-size: cover;"></span>
                </dt>
                <dd>
                  <h2>{{ comment.user_id }} <span>{{ dateFormat(comment.createdAt) }}</span></h2>
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
      </ul>

      <dl>
        <dt><input type="text" name="" title="" placeholder="댓글달기"/></dt>
        <dd><a href="#"><i class="uil uil-message"></i></a></dd>
      </dl>

    </div>
  </li>

</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";

import Post from "@/components/timeline/Post.vue";
import TiptapSns from "@/components/timeline/_tiptapSns.vue";
import {dateFormat} from "@/script/moment";
import {AxiosError, AxiosResponse} from "axios";
import CommentList from "@/components/comment/_commentList.vue";
import LikeBtn from "@/components/timeline/_likeBtn.vue";
import UserAvatar from "@/components/user/_userAvatar.vue";

import {mapGetters} from "vuex";
import {scrollDone} from "@/script/scrollManager";
import {execCommandCopy} from "@/script/util";
import Toast from "@/script/message";

@Component({
  components: {
    CommentList,
    Post,
    TiptapSns,
    LikeBtn,
    UserAvatar,
  },
  computed: {...mapGetters(["user"])},
})
export default class Feed extends Vue {
  @Prop() feed!: any;

  toast = new Toast();
  private isOpenedComments: boolean = false;
  private likeList: any = [];
  private isCopied: boolean = false;
  private isEdit: number = 0;

  private show: boolean = false;

  private attachedFile: any = '';
  private hashtags: any = '';

  private originImg: string = "";

  limit: number = 5;
  offset: number = 0;
  sort: string = '';

  isAddData: boolean = false;
  private comments: any = [];
  private user!: any;
  isOpenReportModal= false

  mounted() {
    this.attachedFile = this.feed.attatchment_files
    this.hashtags = this.feed.hashtags
  }

  scrollCheck(e) {
    if (scrollDone(e.target)) {
      this.offset += this.limit;
      this.commentFetch();
    }
  }

  dateFormat(date: number) {
    return dateFormat(date);
  }

  sendLike() {
    if (this.user) {
      // console.log(this.feed.liked)
      if (!this.feed.liked) {
        console.log('like')
        this.$api.like(this.feed.id)
            .then((res: AxiosResponse) => {
              this.$emit('refetch')
              console.log(res)
            })
            .catch((err: AxiosError) => {

            })
      }
      else {
        console.log('unlike')
        this.$api.unlike(this.feed.id)
            .then((res: AxiosResponse) => {
              this.$emit('fetch')
            })
            .catch((err: AxiosError) => {

            })
      }

    }
    else {
      this.$modal.show('needLogin')
    }
  }

  openComments() {
    this.isOpenedComments = !this.isOpenedComments;
    this.commentFetch()
  }

  created() {
    this.likeListFetch();
  }

  likeListFetch() {
    const obj = {
      post_id: this.feed.id,
      limit: this.limit,
      offset: this.offset
    }
    this.$api.likeList(obj)
        .then((res: AxiosResponse) => {
          this.likeList = res;
        })
        .catch((err: AxiosError) => {

        })


  }

  refreshFeed() {
    this.$emit('refreshFeed', true)
  }

  copyUrl() {
    execCommandCopy(`${this.$store.getters.communityUrl}/feed/${this.feed.id}`)
    this.toast.clear();
    this.toast.successToast("Link copied to clipboard")
  }

  //post
  contentClicked(e: any) {
    if (e.target.matches("img")) {
      console.log("이미지 클릭", e.target.src);
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
    else {
      this.$router.push(`/feed/${this.feed.id}`);
    }
  }

  moveHashtag(hashtag: string) {
    this.$router.push(`/search?hashtag=${hashtag}`)
  }

  commentFetch() {
    const obj = {
      limit: this.limit,
      offset: this.offset,
      sort: this.sort
    }
    this.$api.comments(this.feed.id, obj)
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

  closeImgModal() {
    console.log("?");
    (this.$refs.originImgModal as any).hide();
  }

  closeEditModal() {
    (this.$refs.editModal as any).hide();
  }

  openEdit() {
    this.$modal.show('modalPost')
    this.$store.commit('feed', this.feed)
  }

  pinPost() {
    console.log("pinned");
  }

  closeModal() {
    this.$modal.hide('noUser')

  }

  deletePost() {
    this.$emit('deleteFeed', this.feed.id)
    this.$modal.show('deleteModal')

  }

  report() {
    this.$emit('reportPost', this.feed.id)
    this.isOpenReportModal= !this.isOpenReportModal
    this.$modal.show('modalReport')

  }

  yesDeletePost() {
    this.$emit('deleteFeed', this.feed.id)

    this.$api.deletePost(this.feed.id)
        .then((res: any) => {
          if (res.success) {
            this.$emit('refreshFeed', true)

          }
        })
        .catch((err: any) => {

        })


  }

}
</script>

}

<style lang="scss" scoped>
.tapl-comment > ul {
  max-height: 500px;
  overflow: auto;
}

.like-icon:hover, .comment-icon:hover {
  cursor: pointer;
}

.feed-img {
  max-width: 100%;
}

.content-grid {
  transform: translate(199.5px, 0px);
  transition: transform 0.4s ease-in-out 0s;
}

.icon-thumbs-up.active,
.icon-comment.active {
  fill: #4ff461;
  opacity: 1;
}

.thumbs-up.active,
.post-option-text.active {
  color: #fff;
}

.reaction {
  top: 5px;
}

#copied {
  z-index: 999999;
}

.checkbox-wrap input[type="checkbox"]:checked + .checkbox-box .icon-check,
.checkbox-wrap input[type="radio"]:checked + .checkbox-box .icon-check {
  fill: #ffffff;
}

.checkbox-wrap .checkbox-box .icon-check {
  fill: transparent;
  transition: fill 0.2s ease-in-out;
}

.content-actions {
  height: 92px;
  flex-direction: column;

  .meta-line {
    margin-right: 10px;
    width: 100%;
    margin-top: 16px;
  }
}

.post-icon-wrap {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}

.icon-pinned {
  fill: #616a82;
}

.icon-pinned.active {
  fill: #f39800;
  opacity: 1;
}

.orgin-img-modal {
  .modal-dialog {
    max-width: 100% !important;
  }
}
</style>