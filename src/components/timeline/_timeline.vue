<template>
  <ul class="ta-post">
    <dd>
      <!-- 포스트 박스 -->

      <!--        todo:내채널, 커뮤니티, 내 게임은 글 작성 가능
                      남의 채널 남의 게임은 글 작성 불가 : v-if="this.user.uid === this.$route.params.channel_id" -->
      <div class="ta-message-send" v-if="ableToPost() === true">
        <p><span
            :style="`background:url(${user && user.picture}) center; background-size:cover;`"></span>
        </p>
        <dl>
          <dt><input type="text" name="" title="" readonly
                     @click="openPostModal"
                     placeholder="무슨 생각을 하고 계신가요"/></dt>
          <dd><a href="#"><i class="uil uil-message"></i></a></dd>
        </dl>
      </div>
      <div class="ta-message-block" v-else-if="ableToPost() === 'block'">
        <i class="uil uil-exclamation-triangle"></i> 블락으로 인해 포스팅을 작성하실 수 없습니다.
      </div>
      <ul class="ta-post" v-if="timeline.length > 0">
        <Feed
            class="mt-3"
            data-aos-once="true"
            data-aos="fade"
            v-for="feed in timeline"
            :key="feed.id"
            :feed="feed"
            @refetch="refetch"
            @deleteFeed="deleteFeed"
            @reportPost="reportPost"
        ></Feed>
      </ul>

      <div class="ta-post-none" v-else>
        <p><span><i class="uil uil-layers-slash"></i></span></p>
        <h2>작성된 글이 없습니다.</h2>
      </div>


      <!--        </div>-->
      <!--        <PulseLoader :loading="$store.getters.LoadingStatus"></PulseLoader>-->
    </dd>
    <modal name="writingModal" classes="post-modal" :clickToClose="false">
      <post @closePostModal="closePostModal" @refetch="refetch">
      </post>
    </modal>

    <modal
        name="deleteModal"
        centered
        classes="vue-modal"
        no-close-on-backdrop
    >
      <div class="pw-reset">
        <div class="pr-title">
          <h3>포스팅 삭제</h3>

        </div>
        <div class="pr-content">
          <div>삭제하신 포스팅은 복구하실 수 없습니다.<br/>정말 삭제하시겠습니까?</div>
          <p>
            <a @click="yesDeletePost" class="btn-default-big">네</a>
            <a @click="closeModal" class="btn-default-big">아니요</a>
          </p>
        </div>
      </div>
    </modal>

    <modal :clickToClose="false" class="modal-area-type" name="modalPost" width="90%" height="auto" :maxWidth="550" :adaptive="true">
    <Post></Post>
    </modal>

    <modal class="modal-area-type" name="modalReport" width="90%"  height="auto" :maxWidth="375" :adaptive="true">
      <div class="modal-report">
        <dl class="mr-header">
          <dt>포스트 신고하기</dt>
          <dd><button @click="$modal.hide('modalReport')"><i class="uil uil-times"></i></button></dd>
        </dl>
        <div class="mr-content">
          <ul>
            <li>
              <input type="radio" v-model="pickedReason" value="report1" id="report1"/> <label for="report1"><i class="uil uil-check"></i></label>&nbsp;
              <span><label for="report1"> 욕설</label></span>
            </li>
            <li>
              <input type="radio" v-model="pickedReason" value="report2" id="report2"/> <label for="report2"><i class="uil uil-check"></i></label>&nbsp; <span><label for="report2"> 스팸</label></span>
            </li>
            <li>
              <input type="radio" v-model="pickedReason" value="report3" id="report3"/> <label for="report3"><i class="uil uil-check"></i></label>&nbsp; <span><label for="report3"> 음란성</label></span>
            </li>
<!--            <li>-->
<!--              <input type="radio" v-model="pickedReason" value="report4" id="report4"/> <label for="report4"><i class="uil uil-check"></i></label>&nbsp; <span><label for="report4"> 기타</label></span>-->
<!--              <div><textarea name=""></textarea></div>-->
<!--            </li>-->
          </ul>
          <div @click="sendReport"><button class="btn-default">신고</button></div>
        </div>
      </div>
    </modal>


  </ul>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from "vue-property-decorator";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import Feed from "@/components/timeline/_feed.vue";
import {AxiosError, AxiosResponse} from "axios";
import {scrollDone} from "@/script/scrollManager";
import {mapGetters} from "vuex";
import {User} from "@/types";
import Post from "@/components/timeline/Post.vue";
import UserAvatar from "@/components/user/_userAvatar.vue";
import {Swiper, SwiperSlide} from "vue-awesome-swiper";
import TiptapSns from "@/components/timeline/_tiptapSns.vue";
import TiptapPost from "@/components/timeline/_tiptapBlog.vue";
import ImageUploaderBtn from "@/components/timeline/post/_imageUploaderBtn.vue";

@Component({
  computed: {...mapGetters(["user"])},
  components: {
    Feed, PulseLoader, Post, UserAvatar, Swiper,
    SwiperSlide, TiptapSns,
    TiptapPost,ImageUploaderBtn
  },
})
export default class Timeline extends Vue {
  @Prop() currPage!: string;
  @Prop() id!: any;
  @Prop() block!: any;
  private timeline: any = [];
  private user!: User;

  //parameters
  private limit: number = 10;
  private offset: number = 0;
  private sort: string = '';
  private media: string = '';

  //state
  private isAddData: boolean = false;
  private hasData: boolean = true;

  activeTab: string = "SNS";


  private feedId = '';
  pickedReason: any = '';
  MPIswiperOption = {
    slidesPerView: 4,
    spaceBetween: 10,
    breakpoints: {
      300: {
        slidesPerView: 3
      },
      480: {
        slidesPerView: 4
      },
      768: {
        slidesPerView: 4
      },
      992: {
        slidesPerView: 4
      },
      1200: {
        //slidesPerView: 7
      }
    }
  }
  MPCswiperOption = {
    slidesPerView: 'auto',
    spaceBetween: 5,
  }

  mounted() {
    this.fetch()
    window.addEventListener("scroll", this.scrollCheck);
  }

  beforeDestroy() {

    window.removeEventListener("scroll", this.scrollCheck);
  }

  refetch() {
    this.initData()
    this.fetch()
  }

  initData() {
    this.isAddData = false
    this.hasData = false
    this.limit = 10;
    this.offset = 0;
    this.timeline = [];
    this.sort = '';
    this.media = '';
  }

  fetch() {
    let obj = {}
    switch (this.currPage) {

      case 'user':
        console.log('user timeline')
        obj = {
          channel_id: this.$route.params.channel_id || this.user.uid,
          limit: this.limit,
          offset: this.offset,
          sort: this.sort,
          media: this.$route.query.media
        }
        this.$api.userTimeline(obj)
            .then((res: any) => {
              console.log(res)
              if (this.isAddData) {
                if (res.result.length > 0) {
                  this.timeline = [...this.timeline, ...res.result]
                }
                else {
                  console.log('no data')
                  this.hasData = false
                  window.removeEventListener("scroll", this.scrollCheck);

                }
              }
              else {

                this.timeline = res.result;
                this.isAddData = true
              }


            })
            .catch((err: AxiosError) => {
              this.$router.push('/')

            })
        break;
      case 'game':

        obj = {
          game_id: this.$route.query.game_id,
          limit: this.limit,
          offset: this.offset,
          sort: this.sort,
          media: this.$route.query.media
        }
        console.log('game timel', obj)
        this.$api.gameTimeline(obj)
            .then((res: any) => {
              if (this.isAddData) {
                if (res.result.length > 0) {
                  this.timeline = [...this.timeline, ...res.result]
                }
                else {
                  console.log('no data')
                  this.hasData = false
                  window.removeEventListener("scroll", this.scrollCheck);

                }
              }
              else {

                this.timeline = res.result;
                this.isAddData = true
              }


            })
            .catch((err: AxiosError) => {


            })
        break;
      case 'community':
        console.log('community')
        obj = {
          community_id: this.$route.params.community_id,
          limit: this.limit,
          offset: this.offset,
          sort: this.sort,
          media: this.$route.query.media
        }
        console.log(obj, this.timeline)
        this.$api.communityTimeline(obj)
            .then((res: any) => {

              if (this.isAddData) {
                if (res.result.length > 0) {
                  this.timeline = [...this.timeline, ...res.result]
                }
                else {
                  console.log('no data')
                  this.hasData = false
                  window.removeEventListener("scroll", this.scrollCheck);

                }
              }
              else {

                this.timeline = res.result;
                this.isAddData = true
              }


            })
            .catch((err: AxiosError) => {


            })

        break;
      case 'channel':
        console.log('channel', this.$store.getters.currPage.community.id)

        obj = {
          limit: this.limit,
          offset: this.offset,
          sort: this.sort,
          media: this.media
        }

        this.$api.channelTimeline(this.$store.getters.currPage.community[0].id, this.$store.getters.currPage.community[0].channel_id, obj)
            .then((res: any) => {
              console.log(res)
              if (this.isAddData) {
                if (res.result.length > 0) {
                  this.timeline = [...this.timeline, ...res.result]
                }
                else {
                  console.log('no data')
                  this.hasData = false

                }
              }
              else {

                this.timeline = res.result;
                this.isAddData = true
              }


            })
            .catch((err: AxiosError) => {


            })

        break;
    }

  }


  ableToPost() {

    let result: any = ''
    //커뮤니티 블락당한 경우
    if (this.block) {
      result = 'block'
    }
    //남의 채널인경우
    else if (this.user && (this.user.uid === this.$route.params.channel_id)) {
      result = true;

    }
    else {
      result = true;
    }
    return result;

  }

  openEdit() {
    this.$store.dispatch('resetAttFiles')
    if (this.user) {
      this.$modal.show('writingModal')
    }
    else {
      this.$modal.show('needLogin')
      this.$store.commit('needLogin', true)
    }
  }

  openPostModal() {
    this.$modal.show('modalPost')
  }

  closePostModal() {
    console.log('modal close~', this.currPage);
    this.fetch();
    this.isAddData = false;
    // (this.$refs.editModal as any).hide();
  }

  scrollCheck() {
    if (scrollDone(document.documentElement)) {
      this.offset += this.limit;
      this.fetch();
    }
  }

  closeModal() {
    this.$modal.hide('deleteModal')
    this.$store.commit('postContents', '')
    this.$store.dispatch('resetAttFiles')
    this.$store.dispatch('resetBlogImgArr')
  }

  @Watch('$route.query')
  watchMedia() {
    this.initData()
    console.log("?")
    this.fetch();
  }

  deleteFeed(feedId: any) {
    this.feedId = feedId;
    this.$modal.show('deleteModal')
  }

  reportPost(feedId: any) {
    this.feedId = feedId;
  }

  yesDeletePost() {
    this.$modal.hide('deleteModal')


    this.$api.deletePost(this.feedId)
        .then((res: any) => {
          console.log(res)
          if (res.success) {
            this.$toasted.clear();
            this.$toasted.show("포스팅이 삭제되었습니다.", {
              singleton: true,
              fullWidth: false,
              fitToScreen: true,
              theme: "outline",
              position: "bottom-left",
              className: "toast-danger",
              duration: 3000,
              action: {
                text: "X",
                onClick: (e, toastObject) => {
                  toastObject.goAway(0);
                },
              },
            });
          }
          this.timeline = []
          this.fetch();
        })
        .catch((err: any) => {

        })

  }

  sendReport() {
    const obj = {
      post_id: this.feedId,
      user_id: this.user.id,
      targetType: 'POST',
      report_reason: this.pickedReason
    }
    console.log(obj)
    this.$api.reportPost(obj)
        .then((res: AxiosResponse) => {
          console.log(res)
        })
        .catch((err: AxiosError) => {

        })


  }
}
</script>

<style scoped lang="scss">

.quick-post {
  height: 100px;

  .quick-post-body {
    height: 100%;
    display: flex;
  }

  .form-row {
    height: 100%;
  }
}

.entry-post-container {
  border-radius: 10px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100%;
}

.user-avatar {
  display: flex;
}

textarea {
  height: 57px !important;
  width: 500px !important;
  padding: 14px 18px;
}


.block-alarm {
  background-color: red;
  border-radius: 5px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}


input[type="radio"] + label {display:inline-block; width:22px; height:22px; text-align:center; font-size:15px; color:#fff; border:1px solid #e5e5e5; border-radius:4px; cursor:pointer;}
input[type="radio"]:checked + label {color:#fff; background:#FF6E17; border-color:#FF6E17 ;}
input[type="radio"] {display:none;}
</style>
