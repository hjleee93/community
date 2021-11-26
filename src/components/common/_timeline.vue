<template>
    <div>
        <!-- 포스트 박스 -->
        <div class="quick-post mb-3">
            <div class="quick-post-body">
                <div class="form">
                    <div class="form-row">
                        <div class="form-item">
                            <div class="form-textarea entry-post-container">
                                <UserAvatar :user="user"/>
                                <textarea
                                    readonly
                                    @click="openEdit"
                                    placeholder="무슨 생각을 하고 계신가요"
                                ></textarea>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <b-modal
                modal-class="post-edit-modal"
                centered
                hide-header
                hide-footer
                v-model="show"
                ref="editModal"
            >
                <post @closePostModal="closePostModal">
                    <template v-slot:closeBtn>
                        <div class="modal-close-container">
                            <svg class="icon-cross text-right">
                                <use xlink:href="#svg-cross"></use>
                            </svg>
                        </div>
                    </template>
                    <template v-slot:saveType>
                        <p class="button small secondary">post</p>
                    </template>
                </post>
            </b-modal>

        </div>
        <template v-if="timeline.length > 0">
        <Feed
            class="mt-3"
            data-aos-once="true"
            data-aos="fade"
            v-for="feed in timeline"
            :key="feed.id"
            :feed="feed"
        ></Feed>
        </template>
        <template v-else>
            <h2 >No Result</h2>
        </template>
        <PulseLoader :loading="$store.getters.LoadingStatus"></PulseLoader>
    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import Feed from "@/components/timeline/Feed.vue";
import {AxiosError} from "axios";
import {scrollDone} from "@/script/scrollManager";
import {mapGetters} from "vuex";
import { User} from "@/types";
import Post from "@/components/timeline/Post.vue";
import UserAvatar from "@/components/common/_userAvatar.vue";

@Component({
    computed: {...mapGetters(["user"])},
    components: {Feed, PulseLoader, Post, UserAvatar},
})
export default class Timeline extends Vue {
    @Prop() currPage!: string;
    @Prop() id!: any;
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
    private hasData:boolean = true;

    mounted() {
        this.fetch();

        window.addEventListener("scroll", this.scrollCheck);
    }

    beforeDestroy() {
        window.removeEventListener("scroll", this.scrollCheck);
    }

    fetch() {
        let obj={}
        switch (this.currPage) {

            case 'user':
                console.log('user timeline')
                obj = {
                    channel_id: this.$route.params.channel_id,
                    limit:this.limit,
                    offset:this.offset,
                    sort:this.sort,
                    media:this.$route.query.media
                }
                this.$api.userTimeline(obj)
                    .then((res:any) => {
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
            case 'game':
                // console.log('game timeline')
                obj = {
                    game_id: this.$route.query.game_id,
                    limit:this.limit,
                    offset:this.offset,
                    sort:this.sort,
                    media:this.$route.query.media
                }
                this.$api.gameTimeline(obj)
                    .then((res:any) => {
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
                    community_id : this.$route.params.community_id ,
                    limit:this.limit,
                    offset:this.offset,
                    sort:this.sort,
                    media:this.$route.query.media
                }
                console.log(obj, this.timeline)
                this.$api.communityTimeline(obj)
                    .then((res:any) => {

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
        }

    }



    openEdit() {
        this.$store.dispatch('resetAttFiles')
        if (this.user) {
            this.show = true;
        } else {
            (this.$refs.loginModal as any).show();
        }
    }

    goLoginPage(state: boolean) {
        if (state) {
            this.$router.push("/login");
        } else {
            (this.$refs["loginModal"] as any).hide();
        }
    }

    closePostModal(){
        console.log('modal close~', this.currPage);
        this.fetch();
        this.isAddData = false;
        (this.$refs.editModal as any).hide();
    }

    scrollCheck() {
        if (scrollDone(document.documentElement)) {
            this.offset += this.limit;
            this.fetch();
        }
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
</style>
