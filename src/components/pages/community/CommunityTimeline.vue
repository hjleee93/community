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
                        <span class="channel-title">All Posts</span>
                        <div class="all-post-container"></div>
                        <!-- <img  /> -->
                    </div>

                    <div @click="isActive">
                        <!-- 채널리스트 -->
                        <div
                            v-for="channel in community.channels"
                            :class="{ active: isActive(channel.id) }"
                            class="user-status-list"
                            @click="openChannelTl(channel.id)"
                            :id="channel.id"
                        >
                            <span class="channel-title">{{ channel.title }}</span>
                            <div
                                :style="`background: url(${channel.profile_img || 'img/default.png'}) center center / cover no-repeat;`"
                                class="thumb img channel-img"
                            />
                        </div>
                        <!-- /채널리스트 -->
                    </div>
                </div>
            </div>
        </div>
        <div class="grid-column">
                <Timeline :currPage="currPage" :key="generateKey()" :block="community.user_block"></Timeline>
        </div>
        <div class="grid-column">
            <!-- 커뮤니티 설명-->
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
            <!-- /커뮤니티 설명-->
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

    private channelId: any = -1;

    //parameters
    private limit: number = 10;
    private offset: number = 0;
    private sort: string = '';
    private media: string = '';

    //state
    private isAddData: boolean = false;
    private isLoading: boolean = false;
    private hasData: boolean = true;

    currPage:string = '';

    private user!: any;
    show = false;
    private createdDate: string = dateFormat(this.community.createdAt);

    mounted() {

        this.isAllPosts = true;
        this.dropdown.init();
        this.currPage = 'community';

        this.$store.dispatch("loginState")
            .then(()=>{
                this.communityFetch();
                this.createdDate = dateFormat(this.community.createdAt);
                this.$store.commit('currPage', {
                    community: [{
                        id: this.communityId
                    }]
                })
            })
    }


    communityFetch() {
        if (!this.$store.getters.communityInfo.id) {
            this.$api.communityInfo(this.communityId)
                .then((res: any) => {
                    console.log('fetch user', this.user)
                    console.log("postCnt", res.profile_img)
                    this.$store.commit('communityInfo', res);
                    this.community = res
                    this.createdDate = dateFormat(res.createdAt);


                })
                .catch((err: any) => {
                    console.log(err)
                })
        }else{
            this.community = this.$store.getters.communityInfo;
        }
    }


    allPost() {
        this.channelId = -1;
        this.isActive(-1);
        this.currPage = 'community';
        this.$store.commit('currPage', {
            community: [{
                id: this.communityId
            }]
        })
    }

    getChannelId(id: string) {
        this.channelId = id;
    }

    initData() {
        this.limit = 10;
        this.offset = 0;
        this.sort = '';
        this.media = '';
        this.timeline = [];
        this.isAddData = false;
        this.hasData = false;
    }



    isActive(id?: any) {
        console.log('active', id === this.channelId)
        return id === this.channelId;
    }



    openEdit() {
        console.log('here?')
        if (this.user) {
            this.show = true;
        }
        else {
            this.$store.commit('needLogin', true)
        }
    }

    closePostModal() {
        (this.$refs.editModal as any).hide();
    }

    openChannelTl(channel_id: string) {
        this.channelId = channel_id;
        this.currPage = 'channel'
        this.$store.commit('currPage', {
            community: [{
                id: this.communityId,
                channel_id: channel_id
            }]
        })

    }


    generateKey(){

        return this.currPage;
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


.channel-img {
    width: 100%;
    height: 65px;
    border-radius: 7px;
    margin-bottom: 10px;
    opacity: 50%;
}

.channel-img:hover,
.user-status-list.active .channel-img {
    opacity: 100%;
    cursor: pointer;
}

.user-status-list.active .channel-title {
    background-color: #fff;
    color: #1d2333;
}

.channel-title {
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
</style>
