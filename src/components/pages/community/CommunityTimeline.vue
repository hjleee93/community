<template>
    <div class="grid grid-3-6-3 mobile-prefer-content">
        <div class="grid-column">
            <div class="widget-box">
                <p class="widget-box-title">Channels</p>
                <div class="widget-box-content">
                    <div
                        class="user-status-list"
                        :class="{ active: isActive(-1) }"
                        @click="allPost"
                    >
                        <!-- todo: 이미지 있없 -->
                        <span class="all-post-title">All Posts</span>
                        <div class="all-post-container"></div>
                        <!-- <img  /> -->
                    </div>

                    <div @click="isActive">
                        <!--                        <Channel-->
                        <!--                            :channel="channel"-->
                        <!--                            v-for="channel in community.channels"-->
                        <!--                            :key="channel.id"-->
                        <!--                            :communityId="communityId"-->
                        <!--                            :class="{ active: isActive(channel.id) }"-->
                        <!--                            @channelId="getChannelId"-->
                        <!--                            @channelTimeline="getChannelTL"-->
                        <!--                        ></Channel>-->
                    </div>
                </div>
            </div>
        </div>
        <div class="grid-column">
            <!-- todo: 블락회원 진입때 표시  -->
            <p class="block-alarm">
                블락으로 인해 포스팅을 작성하실 수 없습니다.
            </p>
            <PostBox></PostBox>
            <!-- 타임라인 -->
            <template v-if="timeline">
                <feed
                    data-aos-once="true"
                    data-aos="fade"
                    v-for="feed in timeline"
                    :key="feed.id"
                    :feed="feed"
                ></feed>

                <PulseLoader :loading="$store.getters.LoadingStatus" ></PulseLoader>
            </template>
            <template v-if="!hasData">
                <!-- todo: design -->
                <h2>No Result</h2>
            </template>
        </div>
        <div class="grid-column">
            <!--            <CommunityDescBox></CommunityDescBox>-->
        </div>
    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from "vue-property-decorator";
import Dropdown from "@/plugins/dropdown";

import PostBox from "@/components/layout/PostBox.vue";
import Post from "@/components/timeline/Post.vue";
import Channel from "@/components/pages/community/Channel.vue";
import Feed from "@/components/timeline/Feed.vue";
import CommunityDescBox from "@/components/pages/community/CommunityDescBox.vue";
import {AxiosError, AxiosResponse} from "axios";
import {scrollDone} from "@/script/scrollManager";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";

@Component({
    components: {Post, Channel, Feed, CommunityDescBox, PostBox, PulseLoader},
})
export default class CommunityTimeline extends Vue {
    private dropdown: Dropdown = new Dropdown();
    private communityId = this.$route.params.community_id;
    // private community: any;
    private timeline: any = [];
    private isAllPosts: boolean = false;

    private channelId: number = -1;

    //parameters
    private limit: number = 10;
    private offset: number = 0;
    private sort: string = '';
    private media: string = '';

    //state
    private isAddData: boolean = false;
    private isLoading: boolean = false;
    private hasData:boolean = true;

    created() {
        this.isAllPosts = true;
        // this.community = this.$api.getCommunityInfo(this.communityId);
        //all posts
        // this.timeline = this.$api.getTimeline(this.communityId);
    }

    mounted() {
        this.fetch();
        this.dropdown.init();
        this.$store.commit('currPage', {
            community: [{
                id: this.communityId
            }]
        })
        window.addEventListener("scroll", this.scrollCheck);

    }

    beforeDestroy() {
        window.removeEventListener("scroll", this.scrollCheck);
    }

    fetch() {
        const obj = {
            community_id: this.communityId,
            limit: this.limit,
            offset: this.offset,
            sort: this.sort,
            media: this.media
        }
        this.$store.commit('isNeededRefresh', false)
        this.$api.communityTimeline(obj)
            .then((res: AxiosResponse) => {


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


    }

    scrollCheck() {
        if (scrollDone(document.documentElement)) {
            this.offset += this.limit;
            this.fetch();
        }
    }

    allPost() {
        this.channelId = -1;
        this.isActive(-1);
        this.timeline = this.$api.getTimeline(this.communityId);
    }

    getChannelId(id?: any) {
        this.channelId = id;
    }

    getChannelTL(timeline: any) {
        this.timeline = timeline;
    }

    isActive(id?: any) {
        return id == this.channelId;
    }

    @Watch("$route.query")
    watchQuery(query: any) {
        console.log(query);
    }

    @Watch("$store.getters.isNeededRefresh")
    watchTimeline() {
        if (this.$store.getters.isNeededRefresh) {
            this.fetch();
        }

    }
}
</script>

<style scoped>
.all-post-container {
    width: 100%;
    height: 65px;
    margin-bottom: 10px;
    background-color: #343a40 !important;
    opacity: 0.5;
}

.all-post-container:hover,
.user-status-list.active .all-post-container {
    opacity: 100%;
    cursor: pointer;
}

.user-status-list.active .all-post-title {
    background-color: #fff;
    color: #1d2333;
}

.all-post-title {
    border-radius: 6px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-weight: 600;
    padding: 2px 6px;
    background-color: #1d2333;
    color: #fff;
    position: absolute;
    z-index: 3;
    margin: 8px;
    display: flex;
    justify-content: space-between;
}

.all-post-container {
    border-radius: 7px;
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
