<template>
    <dl class="three-area">
        <dt>
            <div class="ta-channel-list">
                <h2>Channel</h2>

                <ul @click="isActive">
                    <li :class="{ active: isActive(-1) }"
                        class="channel"
                        @click="allPost">
                        <span>All Posts</span>
                    </li>
                    <li v-for="channel in community.channels"
                        class="channel"
                        :class="{ active: isActive(channel.id) }"
                        @click="openChannelTl(channel.id)"
                        :id="channel.id"
                        :style="`background: url(${channel.profile_img || 'img/default.png'}) center center / cover no-repeat;`">
                        <span>{{ channel.title }}</span>
                    </li>

                </ul>

            </div>
        </dt>

        <dd>
            <Timeline :currPage="currPage" :key="generateKey()" :block="community.user_block"></Timeline>
        </dd>

        <!-- 커뮤니티 설명-->
        <dt>
            <div class="ta-about">
                <h2>About Us</h2>
                <div>
                    {{ community.description }}
                </div>
                <dl>
                    <!--                <dt>Owner</dt>-->
                    <!--                <dd>바람의 소환사@</dd>-->
                    <!--                <dt>Manager</dt>-->
                    <!--                <dd>noH피디</dd>-->
                    <dt>Created</dt>
                    <dd> {{ createdDate }}</dd>
                </dl>
            </div>
        </dt>


        <!-- /커뮤니티 설명-->


    </dl>
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

    currPage: string = '';

    private user!: any;
    show = false;
    private createdDate: string = dateFormat(this.community.createdAt);

    mounted() {

        this.isAllPosts = true;
        this.dropdown.init();
        this.currPage = 'community';

        this.$store.dispatch("loginState")
            .then(() => {
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
        this.$api.communityInfo(this.communityId)
            .then((res: any) => {
                console.log('fetch user', this.user)
                console.log("postCnt", res.block)
                this.$store.commit('communityInfo', res);
                this.community = res
                this.createdDate = dateFormat(res.createdAt);

            })
            .catch((err: any) => {
                console.log(err)
            })

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


    generateKey() {

        return this.currPage;
    }


}
</script>

<style scoped>
.channel {
    background-color: #f39800;
}

.channel:hover {
    cursor: pointer;
}

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
