<template>
    <ul class="ta-post">
    <dd>
        <!-- 포스트 박스 -->

        <!--        todo:내채널, 커뮤니티, 내 게임은 글 작성 가능
                        남의 채널 남의 게임은 글 작성 불가 : v-if="this.user.uid === this.$route.params.channel_id" -->
        <div class="ta-message-send" v-if="ableToPost() === true">
            <p><span style="background:url('https://i.pinimg.com/236x/47/73/c7/4773c7b87bbe9f7d92d54a0c8f6364d4.jpg') center; background-size:cover;"></span></p>
            <dl>
                <dt><input type="text" name="" title=""  readonly
                           @click="openEdit"
                           placeholder="무슨 생각을 하고 계신가요" /></dt>
                <dd><a href="#"><i class="uil uil-message"></i></a></dd>
            </dl>
        </div>
        <div class="ta-message-block" v-else-if="ableToPost() === 'block'">
            <i class="uil uil-exclamation-triangle"></i> 블락으로 인해 포스팅을 작성하실 수 없습니다.
        </div>
<!--        <div class="quick-post mb-3" v-if="ableToPost() === true">-->
<!--            &lt;!&ndash;            !this.block || user && (user.uid === userUid)&ndash;&gt;-->
<!--            <div class="quick-post-body">-->
<!--                <div class="form">-->
<!--                    <div class="form-row">-->
<!--                        <div class="form-item">-->
<!--                            <div class="form-textarea entry-post-container">-->
<!--                                <UserAvatar :user="user"/>-->
<!--                                <textarea-->
<!--                                    readonly-->
<!--                                    @click="openEdit"-->
<!--                                    placeholder="무슨 생각을 하고 계신가요"-->
<!--                                ></textarea>-->
<!--                            </div>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                </div>-->
<!--            </div>-->

<!--            <b-modal-->
<!--                modal-class="post-edit-modal"-->
<!--                centered-->
<!--                hide-header-->
<!--                hide-footer-->
<!--                v-model="show"-->
<!--                ref="editModal"-->
<!--                @hidden="closeModal()"-->
<!--            >-->
<!--                <post @closePostModal="closePostModal">-->
<!--                    <template v-slot:closeBtn>-->
<!--                        <div class="modal-close-container">-->
<!--                            <svg class="icon-cross text-right">-->
<!--                                <use xlink:href="#svg-cross"></use>-->
<!--                            </svg>-->
<!--                        </div>-->
<!--                    </template>-->
<!--                    <template v-slot:saveType>-->
<!--                        <p class="button small secondary">post</p>-->
<!--                    </template>-->
<!--                </post>-->
<!--            </b-modal>-->


        <ul class="ta-post" v-if="timeline.length > 0">
            <Feed
                class="mt-3"
                data-aos-once="true"
                data-aos="fade"
                v-for="feed in timeline"
                :key="feed.id"
                :feed="feed"
                @refreshFeed="refreshFeed"
            ></Feed>
        </ul>

        <div class="ta-post-none" v-else>
            <p><span><i class="uil uil-layers-slash"></i></span></p>
            <h2>작성된 글이 없습니다.</h2>
        </div>


<!--        </div>-->
<!--        <PulseLoader :loading="$store.getters.LoadingStatus"></PulseLoader>-->
    </dd>
        <modal name="writingModal">
            <post @closePostModal="closePostModal">
<!--            <template v-slot:closeBtn>-->
<!--                <div class="modal-close-container">-->
<!--                    <svg class="icon-cross text-right">-->
<!--                        <use xlink:href="#svg-cross"></use>-->
<!--                    </svg>-->
<!--                </div>-->
<!--            </template>-->
<!--            <template v-slot:saveType>-->
<!--                <p class="button small secondary">post</p>-->
<!--            </template>-->
        </post>
        </modal>
    </ul>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from "vue-property-decorator";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import Feed from "@/components/timeline/Feed.vue";
import {AxiosError} from "axios";
import {scrollDone} from "@/script/scrollManager";
import {mapGetters} from "vuex";
import {User} from "@/types";
import Post from "@/components/timeline/Post.vue";
import UserAvatar from "@/components/common/_userAvatar.vue";

@Component({
    computed: {...mapGetters(["user"])},
    components: {Feed, PulseLoader, Post, UserAvatar},
})
export default class Timeline extends Vue {
    @Prop() currPage!: string;
    @Prop() id!: any;
    @Prop() block!: any;
    private timeline: any = [];
    private show: boolean = false;
    private user!: User;

    //parameters
    private limit: number = 10;
    private offset: number = 0;
    private sort: string = '';
    private media: string = '';

    //state
    private isAddData: boolean = false;
    private hasData: boolean = true;

    mounted() {
        this.fetch()
        console.log(this.$route)
        window.addEventListener("scroll", this.scrollCheck);
    }

    beforeDestroy() {
        window.removeEventListener("scroll", this.scrollCheck);
    }

    refreshFeed() {
        console.log('refreshFeed')
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
                    channel_id: this.$route.params.channel_id,
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

        console.log('result', result)
        return result;

    }

    openEdit() {
        this.$modal.show('writingModal')
        this.$store.dispatch('resetAttFiles')
        if (this.user) {
            this.show = true;
        }
        else {
            this.$store.commit('needLogin', true)
        }
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
</style>
