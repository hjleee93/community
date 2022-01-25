<template>
    <li v-if="!isLiked " :key="isLiked" @click="sendLike(false)">
        <i class="xi-heart-o like-icon"
           style="font-size:22px; color:#ff6e17;cursor: pointer;"></i>&nbsp;
        {{ likeCnt }}
    </li>
    <li :key="isLiked" v-else-if="isLiked" @click="sendLike(true)">
        <i class="xi-heart like-icon"
           style="font-size:22px; color:#ff6e17; cursor: pointer;"></i>&nbsp;
        {{ likeCnt}}
    </li>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from "vue-property-decorator";
import {mapGetters} from "vuex";
import {User} from "../../types";

import ClickManager from '@/script/clickManager'

@Component({
    components: {},
    computed: {...mapGetters(["user"])},
})
export default class LikeBtn extends Vue {
    @Prop() feed!: any;
    user!: User;
    clickManager: ClickManager = new ClickManager();
    isLiked: boolean = this.feed.liked;
    likeCnt = this.feed.like_cnt;

    //todo: 하트 상태 변화
    sendLike(state: boolean) {
        // ClickManager.

        if (this.user) {
            if (state) {
                if (!this.clickManager.doubleClickCheck()) {
                    this.$api.unlike(this.feed.id)
                        .then((res: any) => {
                            if (res.success) {
                                this.isLiked = false;
                                this.likeCnt--;
                            }
                        })
                        .catch((err: any) => {
                        })
                        .finally(() => {

                        })
                }

            }
            else {
                if (!this.clickManager.doubleClickCheck()) {
                    this.$api.like(this.feed.id)
                        .then((res: any) => {
                            if (res.is_liked) {
                                this.isLiked = true;
                                this.likeCnt++;

                                this.$gtag.event('like_feed', {
                                    'feedId': this.feed.id,
                                });

                            }
                        })
                        .catch((err: any) => {
                        })
                }

            }
        }
        else {
            this.$modal.show('needLogin')
        }
    }
}
</script>

<style scoped lang="scss">
</style>
