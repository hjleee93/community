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
                <form class="form">
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
                        />

                        <!-- <template v-if="isSearched"> -->
                        <button class="search button primary" @click="searchReset">
                            <svg class="icon-cross-thin">
                                <use xlink:href="#svg-cross-thin"></use>
                            </svg>
                        </button>
                        <!-- </template>
                        <template v-else> -->
                        <button
                            class="search button primary"
                            @click="searchCommunity"
                        >
                            <svg class="icon-magnifying-glass">
                                <use xlink:href="#svg-magnifying-glass"></use>
                            </svg>
                        </button>
                        <!-- </template> -->
                    </div>

                    <div class="form-select">
                        <label for="groups-filter-category">Filter By</label>
                        <select
                            id="groups-filter-category"
                            name="groups_filter_category"
                            @change="filterList($event.target.value)"
                        >
                            <option value="0">Newly Created</option>
                            <option value="1">Most Members</option>
                            <option value="2">Alphabetical</option>
                        </select>

                        <svg class="form-select-icon icon-small-arrow">
                            <use xlink:href="#svg-small-arrow"></use>
                        </svg>
                    </div>
                </form>

                <div class="filter-tabs">
                    <div
                        class="filter-tab"
                        :class="filter === 0 ? 'active' : ''"
                    >
                        <p class="filter-tab-text" @click="filterList(0)">
                            Newly Created
                        </p>
                    </div>

                    <div
                        class="filter-tab"
                        :class="filter === 1 ? 'active' : ''"
                    >
                        <p class="filter-tab-text" @click="filterList(1)">
                            Most Members
                        </p>
                    </div>

                    <div
                        class="filter-tab"
                        :class="filter === 2 ? 'active' : ''"
                    >
                        <p class="filter-tab-text" @click="filterList(2)">
                            Alphabetical
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <div class="grid grid-4-4-4">
            <p v-if="!communityList">검색 결과가 없습니다.</p>
            <community-card
                v-for="community in communityList"
                :key="community.id"
                :community="community"
            >
                <template v-slot:communityState>
                    <template v-if="community.state === 'public'">
                        <div class="tag-sticker">
                            <svg class="tag-sticker-icon icon-public">
                                <use xlink:href="#svg-public"></use>
                            </svg>
                        </div>
                    </template>
                    <template v-else>
                        <div class="tag-sticker">
                            <svg class="tag-sticker-icon icon-private">
                                <use xlink:href="#svg-private"></use>
                            </svg>
                        </div>
                    </template>
                </template>
                <template v-slot:communityDetail>
                    <div class="user-stats">
                        <router-link
                            class="user-stat"
                            :to="`/community/${community.id}/members`"
                        >
                            <p class="user-stat-title">
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
                        <template v-if="!community.is_subscribed">
                            <p
                                style="width: 100%"
                                class="button secondary full subscribe-btn"
                                @click="joinCommunity"
                            >
                                <svg class="button-icon icon-join-group">
                                    <use xlink:href="#svg-join-group"></use>
                                </svg>
                                Join Group!
                            </p>
                        </template>
                        <template v-else>
                            <router-link
                                style="width: 100%"
                                :to="`/community/${community.id}/timeline`"
                            >
                                <p class="button primary full subscribe-btn">
                                    Joined
                                </p>
                            </router-link>
                        </template>
                    </div>
                </template>
            </community-card>
        </div>
    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import PageLoader from "@/components/common/PageLoader.vue";
import CommunityCard from "@/components/pages/community/CommunityCard.vue";

import Form from "@/script/form";
import {AxiosError, AxiosResponse} from "axios";
import {PaginationRes} from "@/types";
import {scrollDone} from "@/script/scrollManager";

@Component({
    components: {PageLoader, CommunityCard},
})
export default class Community extends Vue {
    private selectedFilter: number = 0;
    private communityList: any = [];
    private searchInput: string = "";
    private filter: number = 0;
    private isSearched: boolean = false;

    //fetch data object
    private limit: number = 20;
    private offset: number = 0;
    private community: string = null;
    private sort: string = null;
    private show: string = null
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
        this.$api.getCommunityList(obj)
            .then((res: AxiosResponse) => {
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


    filterList(filter: number) {
        if (filter === 0) {
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
        this.isAddData = false
        this.fetch()

        if (this.communityList) {
            this.isSearched = true;
        }
    }

    searchReset(e: Event) {
        e.preventDefault();
        console.log("search Reset");
    }

    joinCommunity() {
        console.log("joined!");
    }
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
</style>
