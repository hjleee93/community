<template>
    <div>
        <Feed
            data-aos-once="true"
            data-aos="fade"
            v-for="feed in timeline"
            :key="feed.id"
            :feed="feed"
        ></Feed>
        <PulseLoader :loading="$store.getters.LoadingStatus"></PulseLoader>
    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import Feed from "@/components/timeline/Feed.vue";
import {AxiosError, AxiosResponse} from "axios";
import {scrollDone} from "@/script/scrollManager";
import {mapGetters} from "vuex";

@Component({
    computed: {...mapGetters(["user"])},
    components: {Feed, PulseLoader},
})
export default class Timeline extends Vue {
    @Prop() currPage!: string;
    private timeline: any = [];

    //parameters
    private limit: number = 10;
    private offset: number = 0;
    private sort: string = '';
    private media: string = '';

    //state
    private isAddData: boolean = false;
    private hasData:boolean = true;

    mounted() {
        this.fetch();
        window.addEventListener("scroll", this.scrollCheck);
    }

    beforeDestroy() {
        window.removeEventListener("scroll", this.scrollCheck);
    }

    fetch() {
        switch (this.currPage) {
            case 'user':

                const obj = {
                    channel_id: this.$route.params.channel_id,
                    limit:this.limit,
                    offset:this.offset,
                    sort:this.sort,
                    media:this.$route.query.media
                }
                this.$api.userTimeline(obj)
                    .then((res: AxiosResponse) => {
                        console.log('obj', obj)
                        if (this.isAddData) {
                            if (res.result.length > 0) {
                                this.timeline = [...this.timeline, ...res.result]
                            }
                            else {
                                console.log('no data')
                                this.hasData = false
                                window.removeEventListener("scroll", this.scrollCheck);

                            }
                        }
                        else {

                            this.timeline = res.result;
                            this.isAddData = true
                        }


                    })
                    .catch((err: AxiosError) => {


                    })
                break;

        }

    }

    scrollCheck() {
        if (scrollDone(document.documentElement)) {
            this.offset += this.limit;
            this.fetch();
        }
    }

}
</script>

<style scoped lang="scss">
</style>
