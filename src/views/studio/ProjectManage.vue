<template>
    <div class="content-studio">

        <!-- 상단배너 -->
        <div class="studio-banner bg02">
            <h2>{{ $route.meta.title }}</h2>
            <p>게임이 현재 진행중인 개발 단계를 선택하세요. 개발 도중 언제든지 개발 단계를 변경할 수 있습니다.</p>
        </div>
        <!-- 상단배너 끝 -->

        <!-- 탭메뉴 -->
        <div class="tab-search-swiper">
            <swiper class="swiper-area" :options="TSSswiperOption">
                <!--                <swiper-slide>-->
                <!--                    <router-link to="#">대시보드</router-link>-->
                <!--                </swiper-slide>-->
                <swiper-slide>
                    <router-link

                        :to="`/project/${$route.params.id}`"
                                 :class="$route.name === 'ProjectUpdate'? 'active' :''">게임정보수정
                    </router-link>
                </swiper-slide>
                <swiper-slide>
                    <router-link :to="`/versionManage/${$route.params.id}`"
                                 :class="$route.name === 'VersionManage'? 'active' :''">버전관리
                    </router-link>
                </swiper-slide>
                <swiper-slide>
                    <router-link :to="`/addVersion/${$route.params.id}`"
                                 :class="$route.name === 'AddVersion'? 'active' :''">버전추가
                    </router-link>
                </swiper-slide>
                <swiper-slide>
                    <router-link :to="`/deployManage/${$route.params.id}`"
                                 :class="$route.name === 'DeployManage'? 'active' :''">배포관리
                    </router-link>
                </swiper-slide>
            </swiper>
        </div>
        <!-- 탭메뉴 끝 -->
        <vue-page-transition class="h100p">
            <router-view></router-view>
        </vue-page-transition>


        <!-- 2단영역 -->

        <!-- 2단영역 끝 -->


    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import {Swiper, SwiperSlide} from 'vue-awesome-swiper'

@Component({
    components: {Swiper, SwiperSlide},
})
export default class projectManage extends Vue {

    TSSswiperOption = {
        slidesPerView: 8,
        spaceBetween: 0,
        breakpoints: {
            300: {
                slidesPerView: 2.5
            },
            480: {
                slidesPerView: 3.5
            },
            768: {
                slidesPerView: 4.5
            },
            992: {
                slidesPerView: 6
            },
            1200: {
                //slidesPerView: 7
            }
        }
    }

    async mounted() {
        const projectId = this.$route.params.id;
        await this.$store.dispatch("loginState");
        await this.$store.dispatch("project", projectId);

    }


};
</script>

<style scoped>

</style>
