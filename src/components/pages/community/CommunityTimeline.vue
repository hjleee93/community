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
                        <Channel v-for="channel in community.channels" :channel="channel" :communityId="communityId"
                                 @channelId="getChannelId"/>
                    </div>
                </div>
            </div>
        </div>
        <div class="grid-column">
            <!-- todo: 블락회원 진입때 표시  -->
            <p class="block-alarm">
                블락으로 인해 포스팅을 작성하실 수 없습니다.
            </p>
                <Timeline :currPage="'community'"  :key="this.$route.query.media"></Timeline>
        </div>
        <div class="grid-column">
            <div class="widget-box">
                <p class="widget-box-title">About Us</p>

                <div class="widget-box-content">
                    <p class="paragraph">
                        {{ community.description }}
                    </p>

                    <div class="information-line-list">
<!--                        <div class="information-line">-->
<!--                            <p class="information-line-title">Owner</p>-->
<!--                            <router-link-->
<!--                                class="user-status-avatar"-->
<!--                                :to="`/channel/${this.community.owner_uid}/timeline`"-->
<!--                            >-->
<!--                                <div class="user-avatar small no-outline">-->
<!--                                    <div class="user-avatar-content">-->
<!--                                        <div-->
<!--                                            class="hexagon-image-24-26"-->
<!--                                            :data-src="ownerInfo.picture"-->
<!--                                        ></div>-->
<!--                                    </div>-->
<!--                                </div>-->
<!--                            </router-link>-->

<!--                            <router-link-->
<!--                                :to="`/channel/${ownerInfo.uid}/timeline`"-->
<!--                                class="information-line-text nickname-link"-->
<!--                            >-->
<!--                                (@닉네임)-->
<!--                            </router-link>-->
<!--                        </div>-->
<!--                        <div class="information-line">-->
<!--                            <p class="information-line-title">Manager</p>-->
<!--                            <router-link-->
<!--                                class="user-status-avatar"-->
<!--                                :to="`/channel/${this.community.manager_uid}/timeline`"-->
<!--                            >-->
<!--                                <div class="user-avatar small no-outline">-->
<!--                                    <div class="user-avatar-content">-->
<!--                                        <div-->
<!--                                            class="hexagon-image-24-26"-->
<!--                                            :data-src="managerInfo.picture"-->
<!--                                        ></div>-->
<!--                                    </div>-->


<!--                                </div>-->
<!--                            </router-link>-->

<!--                            <router-link-->
<!--                                :to="`/channel/${managerInfo.uid}/timeline`"-->
<!--                                class="information-line-text nickname-link"-->
<!--                            >-->
<!--                                (@닉네임)-->
<!--                            </router-link>-->
<!--                        </div>-->

                        <div class="information-line">
                            <p class="information-line-title">Created</p>

                            <p class="information-line-text">
                                {{ createdDate }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
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
import {AxiosError, AxiosResponse} from "axios";
import {scrollDone} from "@/script/scrollManager";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import {mapGetters} from "vuex";
import Timeline from "@/components/common/_timeline.vue";
import {dateFormat} from "@/script/moment";

@Component({
    computed: {...mapGetters(["user"])},
    components: {Post, Channel, Feed, PostBox, PulseLoader, Timeline},
})
export default class CommunityTimeline extends Vue {
    private dropdown: Dropdown = new Dropdown();
    private communityId = this.$route.params.community_id;
    private community: any = this.$store.getters.communityInfo;
    private timeline: any = [];
    private isAllPosts: boolean = false;

    private channelId: string = '';

    //parameters
    private limit: number = 10;
    private offset: number = 0;
    private sort: string = '';
    private media: string = '';

    //state
    private isAddData: boolean = false;
    private isLoading: boolean = false;
    private hasData: boolean = true;

    private user!: any;
    show = false;
    private createdDate: string = "";

    created() {
        this.isAllPosts = true;
    }

    mounted() {
        this.createdDate = dateFormat(this.community.createdAt);
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
        console.log('obj', obj)
        this.$api.communityTimeline(obj)
            .then((res: any) => {
                console.log('res', res)
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
        this.channelId = '';
        this.isActive(-1);
        this.fetch();
    }

    getChannelId(id: string) {
        this.channelId = id;
        this.channelTlFetch();
    }

    channelTlFetch(){
        this.timeline = [];
        const obj = {
            limit: this.limit,
            offset: this.offset,
            sort: this.sort,
            media: this.media
        }
        console.log('obj', obj)

        this.$api.channelTimeline(this.communityId, this.channelId, obj)
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


            })

    }

    isActive(id?: any) {
        return id == this.channelId;
    }

    @Watch("$route.query")
    watchQuery(query: any) {
        console.log(query);
    }



    openEdit() {
        console.log('here?')
        if (this.user) {
            this.show = true;
        } else {
            this.$store.commit('needLogin', true)
        }
    }

    closePostModal(){
        (this.$refs.editModal as any).hide();
        this.fetch();
    }
}
</script>

<style scoped>

.quick-post {
    height: 100px;
    border-radius: 12px;
}
.quick-post-body {
    height: 100%;
    display: flex;
}
.form-row {
    height: 100%;
}
.entry-post-container {
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
