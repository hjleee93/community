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
            <h2><span style="font: 36px/46px 'Jalnan';">{{ $t('landing.info') }}</span> {{ $t('landing.step1.info') }}<br/>{{ $t('landing.step1.info1') }} <span
                style="font: 36px/46px 'Jalnan';">{{ $t('landing.step1.info2') }}</span></h2>
            <h3>
                <div><img width="100%" height="auto" src="../assets/images/landing_totem.gif"/>
                    <!--                    <iframe width="100%" height="325" src="https://www.youtube.com/embed/sasxYDWzuOk" title="YouTube video player" frameborder="0"-->
                    <!--                             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>-->
                </div>
            </h3>
            <div class="mv-play" @click="openCommunity()">&nbsp;</div>
            <div class="mv-animal01"><img src="../assets/images/main_visual_animal01.svg" alt="" title=""/></div>
            <div class="mv-animal02"><img src="../assets/images/main_visual_animal02.svg" alt="" title=""/></div>
            <div class="mv-animal03"><img src="../assets/images/main_visual_animal03.png" alt="" title=""/></div>
            <div class="mv-card mvc-pos01" v-tilt="{speed: 500, perspective: 1200, scale: 1.1}">

                <p :style="'background:url(' + require('../assets/images/basketballpapa.png') + ') center center / cover no-repeat; background-size:cover;'"></p>

                <dl>
                    <dt>
                        <span
                            :style="'background:url(' + require('../assets/images/zempie_logo_154_155.png') + ') center center / cover no-repeat; background-size:cover;'"></span>
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
                            :style="'background:url(' + require('../assets/images/zempie_logo_154_155.png') + ') center center / cover no-repeat; background-size:cover;'"></span>
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
                            :style="'background:url(' + require('../assets/images/zempie_logo_154_155.png') + ') center center / cover no-repeat; background-size:cover;'"></span>
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
            <h2 style="font-size: 30px;line-height: 40px;">{{ $t('landing.step2.info1') }}<br/>{{ $t('landing.step2.info2') }}</h2>
            <h3>{{ $t('landing.step2.info3') }}<span style="font: 36px/46px 'Jalnan';">{{ $t('landing.step2.info4') }}</span>{{ $t('landing.step2.info5') }}</h3>
            <p><img src="../assets/images/main_upload_img.jpg" alt="" title=""/></p>
            <div class="mba-more">
                <a @click="gameUpload">{{ $t('gameUpload') }} &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <i class="uil uil-import"></i></a>
            </div>
        </div>


        <div class="main-boast">
            <div class="mb-area">
                <div class="mba-title">
                    <h2>Zempie Game</h2>
                    <h3>{{ $t('landing.step3.info1') }}</h3>
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
                                        <dt :style="`background: url(${game.user && game.user.picture || '/img/300_300_default_profile.png' }) center center / cover no-repeat; background-size: cover;`"></dt>
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
                                <dt :style="`background: url(${game.user && game.user.picture || 'img/300_300_default_profile.png' }) center center / cover no-repeat; background-size: cover;`"></dt>
                                <dd>
                                    <h3>{{ game && game.title }}</h3>
                                    <p>{{ game.user && game.user.name }}</p>
                                </dd>
                            </dl>
                        </div>
                    </li>

                </ul>
                <div class="mba-more">
                    <router-link to="/gameList">{{ $t('moreView') }}</router-link>
                </div>
            </div>
        </div>
        <modal :clickToClose="false" class="modal-area-type" name="gameUpload" width="90%" height="auto" :maxWidth="380"
               :adaptive="true"
               :scrollable="true">
            <div class="modal-alert">
                <dl class="ma-header">
                    <dt>{{ $t('information') }}</dt>
                    <dd>
                        <button @click="$modal.hide('gameUpload')"><i class="uil uil-times"></i></button>
                    </dd>
                </dl>
                <div class="ma-content">
                    <h2>{{ $t('landing.update.info') }} </h2>
                    <!--                    <div>-->
                    <!--                        <button class="btn-default w48p" @click="leavePost(true)">{{ $t('yes') }}</button>-->
                    <!--                        <button class="btn-gray w48p" @click="gameUpload(false)">{{ $t('no') }}</button>-->
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
        this.$router.push(`/${this.$i18n.locale}/login`)
    }

    gameUpload() {
        this.$modal.show('gameUpload')
    }

    officalFetch() {
        const obj = {
            limit: this.limit,
            offset: this.offset,
            // category: this.category,
            sort: this.sort,
            dir: this.dir
        };

        this.$api.gameList(obj)
            .then((res: any) => {
                this.games1 = res.result.games.slice(0,2)
                this.games2 = res.result.games.slice(2,6);

            })
    }
    playGame(pathname:string){
        window.open(
            `play/${pathname}`, "_blank")
    }

    openCommunity(){
        window.open('https://zempie.com/community/18a26bd9-353f-41a9-b9d7-e846a9b41a2b/timeline')
    }

}
</script>

<style scoped lang="scss">
.mv-animal02{
    z-index: 998 !important;
}
.mv-play{
    top:0px;
}
@media all and (max-width:479px) {
    .mv-play{
        top:30px;
    }
}

@media all and (min-width:480px) and (max-width:767px) {

    .mv-play{
        top:65px;
    }
}

@media (min-width: 768px) and (max-width: 991px){
    .mv-play{
        top:0px;
    }
}
</style>