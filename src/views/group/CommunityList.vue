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
                <!--              커뮤니티 검색용 -->
                <!--                -->
                <!--                <div class="input-search-default">-->
                <!--                    <p><i class="uil uil-search"></i>-->
                <!--                    </p>-->
                <!--                    <div>-->
                <!--                        <input-->
                <!--                            v-model="searchInput"-->
                <!--                            @keyup.enter="searchCommunity" type="text" name="" title="keywords"-->
                <!--                            placeholder="검색어를 입력하세요."/>-->
                <!--                    </div>-->
                <!--                </div>-->
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
        <div class="result-container">
            <!--            <div class="no-result" v-if="!communityList || communityList.length === 0">-->
            <!--                <h1>검색 결과가 없습니다.</h1>-->
            <!--                <img src="../../assets/images/not-found.png" width="100px" height="100px"/>-->
            <!--            </div>-->
            <transition-group name="list-complete" class="card-timeline">
                <template v-if="isFirstLoading">
                    <li :key="Date.now()" style="list-style-type: none; opacity: 0.5;">
                        <div>
                        </div>
                    </li>
                </template>
                <template v-else>
                    <community-card
                        @reFetch="reFetch"
                        v-for="community in communityList"
                        :key="community.id"
                        :community="community"
                    >
                        <template v-slot:subBtn>
                            <SubscribeBtn @reFetch="reFetch" class="sub-btn" :community="community"
                                          @unsubscribe="unsubscribe"/>
                        </template>
                    </community-card>
                </template>
            </transition-group>
        </div>

        <modal :clickToClose="false" class="modal-area-type" name="deleteConfirm" width="90%" height="auto"
               :maxWidth="380"
               :scrollable="true"
               :adaptive="true">
            <div class="modal-alert">
                <dl class="ma-header">
                    <dt>안내</dt>
                    <dd>
                        <button @click="$modal.hide('deleteConfirm')"><i class="uil uil-times"></i></button>
                    </dd>
                </dl>
                <div class="ma-content">
                    <h2> 커뮤니티에서 탈퇴하시겠습니까?<br/>※ 커뮤니티 탈퇴시 작성한 포스팅은 자동으로 삭제되지 않습니다.</h2>
                    <div>
                        <button class="btn-default w48p" @click="yesUnsubscribe">네</button>
                        <button class="btn-gray w48p" @click="$modal.hide('deleteConfirm')">아니오</button>
                    </div>
                </div>
            </div>
        </modal>
    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import PageLoader from "@/components/common/PageLoader.vue";
import CommunityCard from "@/components/community/_communityCard.vue";

import {AxiosError, AxiosResponse} from "axios";
import {scrollDone} from "@/script/scrollManager";
import {mapGetters} from "vuex";
import SubscribeBtn from "@/components/community/_subscribeBtn.vue";
import UniCons from '@iconscout/vue-unicons'
import ClickManager from "@/script/clickManager";

@Component({
    components: {PageLoader, CommunityCard, SubscribeBtn, UniCons},
    computed: {...mapGetters(["user"])},
})
export default class CommunityList extends Vue {
    clickManager: ClickManager = new ClickManager();
    private communityList: any = [];
    private searchInput: string = "";
    private filter: number = 0;
    private isSearched: boolean = false;

    //fetch data object
    limit: number = 20;
    offset: number = 0;
    community: string = '';
    sort: string = '';
    show: string = ''
    isAddData: boolean = false;
    unCommunityId: string = ''
    user !: any;

    isFirstLoading: boolean = true;

    scrollCheck() {
        if (scrollDone(document.documentElement)) {
            this.offset += this.limit;
            this.fetch();
        }
    }

    mounted() {
        this.fetch();
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
            .finally(() => {
                this.isFirstLoading = false;
            })
    }

    unsubscribe(communityId: string) {
        this.$modal.show('deleteConfirm')
        this.unCommunityId = communityId;
    }

    yesUnsubscribe() {
        this.initData()
        this.$api.unsubscribe({user_id: this.user.id, community_id: this.unCommunityId})
            .then((res: any) => {
                this.fetch();
            })
            .catch((err: any) => {
                if (err.message) {
                    alert(err.message)
                }
            })
            .finally(() => {
                this.$modal.hide('deleteConfirm')
            })
    }

    sortGroups(filter: number) {
        this.isAddData = false;
        this.filter = filter;
        if (this.clickManager.doubleClickCheck() === false) {
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

    reFetch() {
        this.initData();
        this.fetch();
    }
}
</script>

<style scoped lang="scss">
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
