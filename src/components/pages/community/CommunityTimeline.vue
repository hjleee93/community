<template>
    <dl class="three-area" v-if="community">
        <dt>
            <div class="ta-channel-list">
                <h2>Channel</h2>

                <ul @click="isActive">
                    <li :class="{ active: isActive(-1) }"
                        class="channel"
                        :style="`background: url('/img/1500_300_com_banner_default.png') center center / cover no-repeat;`"
                        @click="allPost">
                        <span>All Posts</span>
                    </li>
                    <li v-for="channel in orderedChannelList"
                        class="channel"
                        :class="{ active: isActive(channel.id) }"
                        @click="openChannelTl(channel)"
                        :id="channel.id"
                        :style="`background: url(${channel.profile_img || '/img/1500_300_com_channel_default.png'}) center center / cover no-repeat;`">
                        <span>{{ channel.title }}</span>
                    </li>

                </ul>

            </div>
        </dt>

        <dd>
            <Timeline
                :currPage="currPage"
                :key="generateKey()"
                :community="community"
                @reFetch="reFetch"></Timeline>
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


import Post from "@/components/timeline/_post.vue";
import Feed from "@/components/timeline/_feed.vue";
import {AxiosError, AxiosResponse} from "axios";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import {mapGetters} from "vuex";
import Timeline from "@/components/timeline/_timeline.vue";
import {dateFormat} from "@/script/moment";

import _ from 'lodash';
import MetaSetting from "@/script/metaSetting";

@Component({
    computed: {
        ...mapGetters(["user"]),
        orderedChannelList: function () {
            const channels = this.$store.getters.communityInfo.channels
            return _.orderBy(channels, 'createdAt', 'asc')
        }
    },
    components: {Post, Feed, PulseLoader, Timeline},
})
export default class CommunityTimeline extends Vue {
    metaSetting !: MetaSetting;
    communityId = this.$route.params.community_id;
    community: any = this.$store.getters.communityInfo;
    channelId: any = -1;
    channelList = []

    //parameters
    limit: number = 10;
    offset: number = 0;
    sort: string = '';
    media: string = '';

    //state
    isAddData: boolean = false;
    hasData: boolean = true;

    currPage: string = '';

    user!: any;
    createdDate: string = dateFormat(this.community.createdAt);

    mounted() {

        this.currPage = 'community';

        this.$store.dispatch("loginState")
            .then(() => {
                this.createdDate = dateFormat(this.community.createdAt);
                this.channelList = this.community.channels;
                //@ts-ignore
                if (this.orderedChannelList[0]) {
                    this.$store.commit('currPage', {
                        community: [{
                            id: this.communityId,
                            community:this.community,
                            //@ts-ignore
                            channel_id: this.orderedChannelList[0].id,
                            //@ts-ignore
                            channel:this.orderedChannelList[0]
                        }]
                    })
                }
                // this.createMetaSetting();

            })
    }

    beforeDestroy() {
        this.$store.commit('currPage', null)
    }


    createMetaSetting(){
        console.log(' this.createMetaSetting()');
        this.metaSetting = new MetaSetting({
            title: `${this.community.name} | Zempie.com`,
            meta: [
                {name: 'description', content: this.community.description},
                {property: 'og:url', content: `${this.$store.getters.homeUrl}/${this.$i18n.locale}/community/${this.community.id}/timeline`},
                {property: 'og:title', content: `${this.community.name} | Zempie.com`},
                {property: 'og:description', content: this.community.description},
            ]
        });
    }

    reFetch() {
        this.$emit('reFetch')
        // this.communityFetch()
    }

    communityFetch() {
        this.$api.communityInfo(this.communityId)
            .then((res: any) => {
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
                id: this.communityId,
                community:this.community,
                //@ts-ignore
                channel_id: this.orderedChannelList[0].id,
                //@ts-ignore
                channel:this.orderedChannelList[0]
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
        this.isAddData = false;
        this.hasData = false;
    }


    isActive(id?: any) {
        return id === this.channelId;
    }


    openEdit() {
        if (!this.user) {
            this.$store.commit('needLogin', true)
        }
    }


    openChannelTl(channel: any) {
        this.channelId = channel.id;
        this.currPage = 'channel'
        this.$store.commit('currPage', {
            community: [{
                id: this.communityId,
                community:this.community,
                channel_id: channel.id,
                channel:channel
            }]
        })
    }

    @Watch('$store.getters.currPage')
    generateKey() {
        return Date.now();
    }




}
</script>

<style scoped>
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

.channel {
    opacity: 0.5;
}

.channel.active, .channel:hover {
    opacity: 1;
}

</style>
