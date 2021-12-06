<template>
    <div class="content">
        <!-- 비주얼영역 -->
        <div class="visual-img"
             :style="{'background' : 'url(' + require('../../assets/images/visual_top_img.png') + ') center no-repeat', 'background-size' : 'cover'}">

            <div class="title">
                Groups
                <span v-if="communityList && communityList.length > 0"
                >({{ communityList.length }})</span
                >
            </div>
            <p>
                Browse all the groups of the community!
            </p>
        </div>
        <!-- 비주얼영역 끝 -->


        <!-- 검색/구분 -->
        <dl class="area-search-sort">
            <dt>
                <div class="input-search-default">
                    <p><i class="uil uil-search"></i>
                    <p>
                    <div>
                        <input
                            v-model="searchInput"
                            @keyup.enter="searchCommunity" type="text" name="" title="keywords"
                            placeholder="검색어를 입력하세요."/>
                    </div>

                </div>
            </dt>
            <dd>
                <div class="sort-default">
                    <a @click="sortGroups(0)" :class="filter === 0 ? 'active' : ''"><i class="uis uis-check"></i>
                        신규순</a>
                    <span>·</span>
                    <a @click="sortGroups(1)" :class="filter === 1 ? 'active' : ''"><i class="uis uis-check"></i> 가입많은순</a>
                    <span>·</span>
                    <a @click="sortGroups(2)" :class="filter === 2? 'active' : ''"><i class="uis uis-check"></i> 글자순</a>
                </div>
            </dd>
        </dl>
        <!-- 검색/구분 끝 -->

        <!--        <div class="section-filters-bar v1">-->
        <!--            <div class="section-filters-bar-actions">-->
        <!--                <div class="form">-->
        <!--                    <div-->
        <!--                        class="form-input small with-button"-->
        <!--                        :class="searchInput.length > 0 ? 'active' : ''"-->
        <!--                    >-->
        <!--                        <label for="groups-search">Search Groups</label>-->
        <!--                        <input-->
        <!--                            type="text"-->
        <!--                            id="groups-search"-->
        <!--                            name="groups_search"-->
        <!--                            v-model="searchInput"-->
        <!--                            @keyup.enter="searchCommunity"-->
        <!--                        />-->
        <!--                        <template v-if="isSearched">-->
        <!--                            <button class="search button primary" @click="searchReset">-->
        <!--                                <svg class="icon-cross-thin">-->
        <!--                                    <use xlink:href="#svg-cross-thin"></use>-->
        <!--                                </svg>-->
        <!--                            </button>-->
        <!--                        </template>-->
        <!--                        <template v-else>-->
        <!--                            <button-->
        <!--                                class="search button primary"-->
        <!--                                @click="searchCommunity"-->
        <!--                            >-->
        <!--                                <svg class="icon-magnifying-glass">-->
        <!--                                    <use xlink:href="#svg-magnifying-glass"></use>-->
        <!--                                </svg>-->
        <!--                            </button>-->
        <!--                        </template>-->
        <!--                    </div>-->

        <!--                    <div class="form-select">-->
        <!--                        <label for="groups-filter-category">Filter By</label>-->
        <!--                        <select-->
        <!--                            id="groups-filter-category"-->
        <!--                            name="groups_filter_category"-->
        <!--                            @change="sortGroups($event.target.value)"-->
        <!--                        >-->
        <!--                            <option value=0>Newly Created</option>-->
        <!--                            <option value=1>Most Members</option>-->
        <!--                            <option value=2>Alphabetical</option>-->
        <!--                        </select>-->

        <!--                        <svg class="form-select-icon icon-small-arrow">-->
        <!--                            <use xlink:href="#svg-small-arrow"></use>-->
        <!--                        </svg>-->
        <!--                    </div>-->
        <!--                </div>-->

        <!--                <div class="filter-tabs" v-if="communityList.length > 0">-->
        <!--                    <div-->
        <!--                        class="filter-tab"-->
        <!--                        :class="filter === 0 ? 'active' : ''"-->
        <!--                        @click="sortGroups(0)"-->
        <!--                    >-->
        <!--                        <p class="filter-tab-text">-->
        <!--                            Newly Created-->
        <!--                        </p>-->
        <!--                    </div>-->

        <!--                    <div-->
        <!--                        class="filter-tab"-->
        <!--                        :class="filter === 1 ? 'active' : ''"-->
        <!--                        @click="sortGroups(1)"-->
        <!--                    >-->
        <!--                        <p class="filter-tab-text">-->
        <!--                            Most Members-->
        <!--                        </p>-->
        <!--                    </div>-->

        <!--                    <div-->
        <!--                        class="filter-tab"-->
        <!--                        :class="filter === 2 ? 'active' : ''"-->
        <!--                        @click="sortGroups(2)"-->
        <!--                    >-->
        <!--                        <p class="filter-tab-text">-->
        <!--                            Alphabetical-->
        <!--                        </p>-->
        <!--                    </div>-->
        <!--                </div>-->
        <!--            </div>-->
        <!--        </div>-->

        <div class="result-container">
            <div class="no-result" v-if="!communityList || communityList.length === 0">
                <h1>검색 결과가 없습니다.</h1>
                <img src="../../assets/images/not-found.png" width="100px" height="100px"/>

            </div>
            <transition-group name="list-complete" class="card-timeline">
                <community-card
                    @refetch="refetch"
                    data-aos="fade"
                    v-for="community in communityList"
                    :key="community.id"
                    :community="community"
                >
                    <template v-slot:subBtn>
                        <SubscribeBtn @refetch="refetch" class="sub-btn" :community="community"/>
                    </template>
                </community-card>
            </transition-group>

        </div>

    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import PageLoader from "@/components/common/PageLoader.vue";
import CommunityCard from "@/components/community/_communityCard.vue";

import Form from "@/script/form";
import {AxiosError, AxiosResponse} from "axios";
import {scrollDone} from "@/script/scrollManager";
import {mapGetters} from "vuex";
import SubscribeBtn from "@/components/community/_subscribeBtn.vue";
import UniCons from '@iconscout/vue-unicons'

@Component({
    components: {PageLoader, CommunityCard, SubscribeBtn, UniCons},
    computed: {...mapGetters(["user"])},
})
export default class CommunityList extends Vue {
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
                console.log('fetch', this.isAddData)
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

    refetch() {
        console.log('refetch')
        this.initData();
        this.fetch();
    }
}
</script>

<style scoped lang="scss">
.result-container {
    min-height: 872px;
}

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

.visual-img {
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .title {
        font-size: 2.25rem;
        font-weight: 700;
    }

    p {
        margin-top: 10px;
        font-size: 1rem;
        font-weight: 500;
    }
}

.uil-times {
    display: inline-block;
    margin-right: 10px;
    font-size: 26px;
}

.no-result {
    display: flex;
    flex-direction: column;
    align-items: center;

    h1 {
        color: #333;
        font-size: 18px;
        margin-bottom: 10px;
    }
}
</style>
