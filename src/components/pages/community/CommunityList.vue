<template>
    <div class="content-grid">
        <div class="section-banner">
            <img
                class="section-banner-icon"
                src="../../../img/banner/groups-icon.png"
                alt="groups-icon"
            />

            <p class="section-banner-title">
                Groups
                <span v-if="communityList && communityList.length > 0"
                >({{ communityList.length }})</span
                >
            </p>

            <p class="section-banner-text">
                Browse all the groups of the community!
            </p>
        </div>

        <div class="section-filters-bar v1">
            <div class="section-filters-bar-actions">
                <div class="form">
                    <div
                        class="form-input small with-button"
                        :class="searchInput.length > 0 ? 'active' : ''"
                    >
                        <label for="groups-search">Search Groups</label>
                        <input
                            type="text"
                            id="groups-search"
                            name="groups_search"
                            v-model="searchInput"
                            @keyup.enter="searchCommunity"
                        />
                        <template v-if="isSearched">
                            <button class="search button primary" @click="searchReset">
                                <svg class="icon-cross-thin">
                                    <use xlink:href="#svg-cross-thin"></use>
                                </svg>
                            </button>
                        </template>
                        <template v-else>
                            <button
                                class="search button primary"
                                @click="searchCommunity"
                            >
                                <svg class="icon-magnifying-glass">
                                    <use xlink:href="#svg-magnifying-glass"></use>
                                </svg>
                            </button>
                        </template>
                    </div>

                    <div class="form-select">
                        <label for="groups-filter-category">Filter By</label>
                        <select
                            id="groups-filter-category"
                            name="groups_filter_category"
                            @change="sortGroups($event.target.value)"
                        >
                            <option value=0>Newly Created</option>
                            <option value=1>Most Members</option>
                            <option value=2>Alphabetical</option>
                        </select>

                        <svg class="form-select-icon icon-small-arrow">
                            <use xlink:href="#svg-small-arrow"></use>
                        </svg>
                    </div>
                </div>

                <div class="filter-tabs" v-if="communityList.length > 0">
                    <div
                        class="filter-tab"
                        :class="filter === 0 ? 'active' : ''"
                        @click="sortGroups(0)"
                    >
                        <p class="filter-tab-text">
                            Newly Created
                        </p>
                    </div>

                    <div
                        class="filter-tab"
                        :class="filter === 1 ? 'active' : ''"
                        @click="sortGroups(1)"
                    >
                        <p class="filter-tab-text">
                            Most Members
                        </p>
                    </div>

                    <div
                        class="filter-tab"
                        :class="filter === 2 ? 'active' : ''"
                        @click="sortGroups(2)"
                    >
                        <p class="filter-tab-text">
                            Alphabetical
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <div>
            <div v-if="!communityList || communityList.length === 0">
                <p class="mt-5 mb-3">검색 결과가 없습니다.</p>
                <b-img src="img/not-found.png" width="100px" height="100px"></b-img>

            </div>
            <transition-group name="list-complete" class="grid grid-4-4-4">
                <community-card
                    data-aos="fade"
                    v-for="community in communityList"
                    :key="community.id"
                    :community="community"
                >
                    <template v-slot:communityState>
                        <template v-if="!community.is_private">
                            <div class="tag-sticker">

                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="30px">
                                    <path fill="#fff"
                                          d="M17,9H9V7a3,3,0,0,1,5.12-2.13,3.08,3.08,0,0,1,.78,1.38,1,1,0,1,0,1.94-.5,5.09,5.09,0,0,0-1.31-2.29A5,5,0,0,0,7,7V9a3,3,0,0,0-3,3v7a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V12A3,3,0,0,0,17,9Zm1,10a1,1,0,0,1-1,1H7a1,1,0,0,1-1-1V12a1,1,0,0,1,1-1H17a1,1,0,0,1,1,1Z"/>
                                </svg>
                            </div>
                        </template>
                        <template v-else>
                            <div class="tag-sticker">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="30px" >
                                    <path fill="#fff"
                                          d="M17,9V7A5,5,0,0,0,7,7V9a3,3,0,0,0-3,3v7a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V12A3,3,0,0,0,17,9ZM9,7a3,3,0,0,1,6,0V9H9Zm9,12a1,1,0,0,1-1,1H7a1,1,0,0,1-1-1V12a1,1,0,0,1,1-1H17a1,1,0,0,1,1,1Z"/>
                                </svg>
                            </div>
                        </template>
                    </template>
                    <template v-slot:communityDetail>
                        <div class="user-stats">
                            <router-link
                                class="user-stat"
                                :to="`/community/${community.id}/members`"
                            > <p class="user-stat-title">
                                    {{ community.member_cnt }}
                                </p>
                                <p class="user-stat-text">members</p>
                            </router-link>
                            <div class="user-stat">
                                <p class="user-stat-title">
                                    {{ community.posts_cnt }}
                                </p>

                                <p class="user-stat-text">posts</p>
                            </div>

                            <div class="user-stat">
                                <p class="user-stat-title">
                                    {{ community.visit_cnt }}
                                </p>

                                <p class="user-stat-text">visits</p>
                            </div>
                        </div>
                    </template>
                    <template v-slot:communityAction>
                        <div class="user-preview-actions">
                            <!--                        <template v-if="!community.is_subscribed">-->
                            <!--                            <p-->
                            <!--                                style="width: 100%"-->
                            <!--                                class="button secondary full subscribe-btn"-->
                            <!--                                @click="joinCommunity"-->
                            <!--                            >-->
                            <!--                                <svg class="button-icon icon-join-group">-->
                            <!--                                    <use xlink:href="#svg-join-group"></use>-->
                            <!--                                </svg>-->
                            <!--                                Join Group!-->
                            <!--                            </p>-->
                            <!--                        </template>-->
                            <!--                        <template v-else>-->
                            <!--                            <router-link-->
                            <!--                                style="width: 100%"-->
                            <!--                                :to="`/community/${community.id}/timeline`"-->
                            <!--                            >-->
                            <!--                                <p class="button primary full subscribe-btn">-->
                            <!--                                    Joined-->
                            <!--                                </p>-->
                            <!--                            </router-link>-->
                            <!--                        </template>-->
                            <SubscribeBtn class="button secondary full" :community="community"></SubscribeBtn>
                        </div>
                    </template>
                </community-card>
            </transition-group>
        </div>

    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import PageLoader from "@/components/common/PageLoader.vue";
import CommunityCard from "@/components/pages/community/CommunityCard.vue";

import Form from "@/script/form";
import {AxiosError, AxiosResponse} from "axios";
import {scrollDone} from "@/script/scrollManager";
import {mapGetters} from "vuex";
import SubscribeBtn from "@/components/pages/community/_subscribeBtn.vue";
import UniCons from '@iconscout/vue-unicons'

@Component({
    components: {PageLoader, CommunityCard, SubscribeBtn, UniCons},
    computed: {...mapGetters(["user"])},
})
export default class Community extends Vue {
    private communityList: any = [];
    private searchInput: string = "";
    private filter: number = 0;
    private isSearched: boolean = false;

    //fetch data object
    private limit: number = 20;
    private offset: number = 0;
    private community: string = '';
    private sort: string = '';
    private show: string = ''
    private isAddData: boolean = false;


    scrollCheck() {
        if (scrollDone(document.documentElement)) {
            this.offset += this.limit;
            this.fetch();
        }
    }

    mounted() {
        this.fetch();
        Form.formInput();
        window.addEventListener("scroll", this.scrollCheck);
    }

    beforeDestroy() {
        window.removeEventListener("scroll", this.scrollCheck);
    }

    fetch() {
        const obj = {
            limit: this.limit,
            offset: this.offset,
            community: this.searchInput,
            sort: this.sort,
            show: this.show
        }

        this.$api.communityList(obj)
            .then((res: any) => {
                //todo:중첩 데이터 수정해야됨
                console.log('fetch',this.isAddData)
                if (this.isAddData) {
                    if (res.length > 0) {
                        this.communityList = [...this.communityList, ...res]
                    }
                    else {
                        window.removeEventListener("scroll", this.scrollCheck);
                    }
                }
                else {
                    this.communityList = res;
                    this.isAddData = true
                }
            })
            .catch((err: AxiosError) => {
                console.log(err)
            })
    }

    sortGroups(filter: number) {
        this.isAddData = false;
        this.filter = filter;
        if (filter === 0) {
            this.sort = '';
            this.fetch()
        }
        else if (filter === 1) {
            this.sort = 'SUBSCRIBE'
            this.fetch()
        }
        else if (filter === 2) {
            this.sort = 'ALPAHBETIC'
            this.fetch()
        }
    }

    searchCommunity(e: Event) {
        e.preventDefault();

        this.isSearched = true;
        this.isAddData = false;
        this.fetch()
    }

    searchReset(e: Event) {
        e.preventDefault();
        this.initData();
        this.fetch()

    }

    initData() {
        this.isSearched = false;
        this.isAddData = false
        this.limit = 20;
        this.offset = 0;
        this.community = '';
        this.sort = '';
        this.show = '';
        this.searchInput = '';
    }

    // joinCommunity() {
    //     console.log('join!')
    //     this.$api.subscribe({user_id: this.user.id, community_id: this.communityId})
    //         .then((res: AxiosResponse) => {
    //             console.log(res)
    //         }).catch((err: AxiosError) => {
    //         if (err.message) {
    //             alert(err.message)
    //         }
    //     })
    // }
}
</script>

<style scoped>
svg {
    overflow: hidden;
    vertical-align: middle;
}

.search.button {
    width: 64px !important;
    position: absolute;
    top: 0;
    right: 0;
}

/* transition */


.list-complete-item {
    transition: all 1s;
    display: inline-block;
    margin-right: 10px;
}

.list-complete-enter, .list-complete-leave-to
    /* .list-complete-leave-active below version 2.1.8 */
{
    opacity: 0;
    transform: translateY(30px);
}

.list-complete-leave-active {
    position: absolute;
}
</style>
