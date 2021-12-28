<template>
    <div class="main-bg">


        <!-- <div class="main-test">
          &nbsp;
        </div> -->


        <div class="main-copy">
            <p><img src="../assets/images/main_copy.svg" width="500" alt="" title=""/></p>
            <h2>Follow the easy-to-develop to<br/>game and share your own pie!</h2>
        </div>


        <div class="main-visual">
            <h2><span style="font: 36px/46px 'Jalnan';">STEP BY STEP</span> 으로<br/>젬파이의 게임을 <span
                style="font: 36px/46px 'Jalnan';">직접 개발해 보세요!</span></h2>
            <h3>
                <div><img width="100%" height="auto" src="../assets/images/landing_totem.gif"/>
                    <!--                    <iframe width="100%" height="325" src="https://www.youtube.com/embed/sasxYDWzuOk" title="YouTube video player" frameborder="0"-->
                    <!--                             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>-->
                </div>
            </h3>
            <div class="mv-play">&nbsp;</div>
            <div class="mv-animal01"><img src="../assets/images/main_visual_animal01.svg" alt="" title=""/></div>
            <div class="mv-animal02"><img src="../assets/images/main_visual_animal02.svg" alt="" title=""/></div>
            <div class="mv-animal03"><img src="../assets/images/main_visual_animal03.png" alt="" title=""/></div>
            <div class="mv-card mvc-pos01" v-tilt="{speed: 500, perspective: 1200, scale: 1.1}">

                <p :style="'background:url(' + require('../assets/images/basketballpapa.png') + ') center center / cover no-repeat; background-size:cover;'"></p>

                <dl>
                    <dt>
                        <span
                            :style="'background:url(' + require('../assets/images/favicon.png') + ') center center / cover no-repeat; background-size:cover;'"></span>
                    </dt>
                    <dd>
                        <h2>BasketBall Papa</h2>
                        <h3>Zempie</h3>
                    </dd>
                </dl>
                <div>
                    <a href="https://zempie.com/play/sis8io8zhvd" target="_blank">PLAY</a>
                </div>
            </div>
            <div class="mv-card mvc-pos02" v-tilt="{speed: 500, perspective: 1200, scale: 1.1}">
                <p :style="'background:url(' + require('../assets/images/starpop.png') + ') center center / cover no-repeat; background-size:cover;'"></p>
                <dl>
                    <dt>
                        <span
                            :style="'background:url(' + require('../assets/images/favicon.png') + ') center center / cover no-repeat; background-size:cover;'"></span>
                    </dt>
                    <dd>
                        <h2>Star pop</h2>
                        <h3>Zempie</h3>
                    </dd>
                </dl>
                <div>
                    <a href="https://zempie.com/play/4g6k2ewx6yo" target="_blank">PLAY</a>
                </div>
            </div>
            <div class="mv-card mvc-pos03" v-tilt="{speed: 500, perspective: 1200, scale: 1.1}">
                <p :style="'background:url(' + require('../assets/images/Totem_breaker.png') + ') center center no-repeat; background-size:cover;'"></p>
                <dl>
                    <dt>
                        <span
                            :style="'background:url(' + require('../assets/images/favicon.png') + ') center center / cover no-repeat; background-size:cover;'"></span>
                    </dt>
                    <dd>
                        <h2>Totem breaker</h2>
                        <h3>Zempie</h3>
                    </dd>
                </dl>
                <div>
                    <a href="https://zempie.com/play/eiuqgz82g5v" target="_blank">PLAY</a>
                </div>
            </div>
        </div>


        <div class="main-upload">
            <h2 style="font-size: 30px;line-height: 40px;">강좌를 보고 게임을 다 만들었거나,<br/>이미 만든 게임이 있으신가요?</h2>
            <h3>나만의 멋진 <span style="font: 36px/46px 'Jalnan';">게임 페이지</span>를 가져보세요.</h3>
            <p><img src="../assets/images/main_upload_img.jpg" alt="" title=""/></p>
            <div class="mba-more">
                <a @click="gameUpload">게임업로드 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <i class="uil uil-import"></i></a>
            </div>
        </div>


        <div class="main-boast">
            <div class="mb-area">
                <div class="mba-title">
                    <h2>Zempie Game</h2>
                    <h3>자신의 멋진 파이 자랑하기</h3>
                </div>
                <ul class="mba-best" v-if="games1">
                    <li v-for="game in games1" >
                        <div @click="playGame(game.pathname)">
                            <div
                                :style="`background: url( ${game &&( game.url_thumb_webp || game.url_thumb )} ) center center / cover no-repeat; background-size: cover;`">
                            </div>
                            <dl>
                                <dt>
                                    <dl>
                                        <dt :style="`background: url(${game.user && game.user.picture || 'img/zempy.png' }) center center / cover no-repeat; background-size: cover;`"></dt>
                                        <dd>
                                            <h3>{{ game && game.title }}</h3>
                                            <p>{{ game.user && game.user.name }}</p>
                                        </dd>
                                    </dl>
                                </dt>
<!--                                <dd><i class="uil uil-user-circle" style="font-size:18px;"></i>&nbsp; 798 Plays</dd>-->
                            </dl>
                        </div>
<!--                        <p><img src="../assets/images/main_boast_new_icon.png" alt=""></p>-->
                    </li>
<!--                    <li>-->
<!--                        <div>-->
<!--                            <div-->
<!--                                style="background: url('https://i.pinimg.com/564x/56/47/e2/5647e241ec02d4c34411e1d0534a1eb7.jpg') center center no-repeat; background-size:cover;"></div>-->
<!--                            <dl>-->
<!--                                <dt>-->
<!--                                    <dl>-->
<!--                                        <dt style="background: url('https://i.pinimg.com/564x/e5/1b/83/e51b839c40346cb9d27770ce51cfd0b9.jpg') center center no-repeat; background-size: cover;"></dt>-->
<!--                                        <dd>-->
<!--                                            <h3>Totem breaker</h3>-->
<!--                                            <p>미니게임팩토리</p>-->
<!--                                        </dd>-->
<!--                                    </dl>-->
<!--                                </dt>-->
<!--                                <dd><i class="uil uil-user-circle" style="font-size:18px;"></i>&nbsp; 798 Plays</dd>-->
<!--                            </dl>-->
<!--                        </div>-->
<!--                        <p><img src="../assets/images/main_boast_hot_icon.png" alt=""></p>-->
<!--                    </li>-->
                </ul>
                <ul class="mba-list" v-if="games2">
                    <li v-for="game in games2">
                        <div @click="playGame(game.pathname)" :key="game.id">
                            <div
                                :style="`background: url( ${ game && ( game.url_thumb_webp || game.url_thumb )} ) center center / cover no-repeat; background-size: cover;`">

                            </div>
                            <dl>
                                <dt :style="`background: url(${game.user && game.user.picture || 'img/zempy.png' }) center center / cover no-repeat; background-size: cover;`"></dt>
                                <dd>
                                    <h3>{{ game && game.title }}</h3>
                                    <p>{{ game.user && game.user.name }}</p>
                                </dd>
                            </dl>
                        </div>
                    </li>

                </ul>
                <div class="mba-more">
                    <router-link to="/gameList">더보기</router-link>
                </div>
            </div>
        </div>
        <modal :clickToClose="false" class="modal-area-type" name="gameUpload" width="90%" height="auto" :maxWidth="380"
               :adaptive="true"
               :scrollable="true">
            <div class="modal-alert">
                <dl class="ma-header">
                    <dt>안내</dt>
                    <dd>
                        <button @click="$modal.hide('gameUpload')"><i class="uil uil-times"></i></button>
                    </dd>
                </dl>
                <div class="ma-content">
                    <h2>1월중으로 업데이트 예정입니다. </h2>
                    <!--                    <div>-->
                    <!--                        <button class="btn-default w48p" @click="leavePost(true)">네</button>-->
                    <!--                        <button class="btn-gray w48p" @click="gameUpload(false)">아니오</button>-->
                    <!--                    </div>-->
                </div>
            </div>
        </modal>

    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";

@Component({
    components: {},
})
export default class Landing extends Vue {
    category: number = 0;
    games1: any = [];
    games2: any = []
    //parameters
    limit: number = 6;
    offset: number = 0;
    sort: string = 'c';
    dir: string = 'asc'

    //state
    isAddData: boolean = false;
    hasData: boolean = true;

    mounted() {
        this.officalFetch()
    }

    login() {
        this.$router.push('/login')
    }

    gameUpload() {
        this.$modal.show('gameUpload')
    }

    officalFetch() {
        const obj = {
            limit: this.limit,
            offset: this.offset,
            category: this.category,
            sort: this.sort,
            dir: this.dir
        };

        this.$api.officalGameList(obj)
            .then((res: any) => {
                this.games1 = res.result.games.slice(0,2)
                this.games2 = res.result.games.slice(2,6);

            })
    }
    playGame(pathname:string){
        window.open(
            `play/${pathname}`, "_blank")
    }

}
</script>

<style scoped lang="scss">
.mv-animal02{
    z-index: 998 !important;
}
</style>