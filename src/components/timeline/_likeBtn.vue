<template>
  <li v-if="!feed.liked" @click="sendLike"><i class="xi-heart-o like-icon"
                                              style="font-size:22px; color:#ff6e17;cursor: pointer;"></i>&nbsp;
    {{ feed.like_cnt }}
  </li>
  <li v-else @click="sendLike"><i class="xi-heart like-icon"
                                  style="font-size:22px; color:#ff6e17; cursor: pointer;"></i>&nbsp; {{ feed.like_cnt }}
  </li>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import {AxiosError, AxiosResponse} from "axios";
import {mapGetters} from "vuex";
import {User} from "../../types";

@Component({
  components: {},
  computed: {...mapGetters(["user"])},
})
export default class LikeBtn extends Vue {
  @Prop() feed!: any;
  private user!: User;


  sendLike() {
    if (this.user) {
      this.$api.like(this.feed.id)
          .then((res: AxiosResponse) => {
            console.log(res)
          })
          .catch((err: AxiosError) => {
          })
    }
    else {
      this.$modal.show('needLogin')
    }
  }
}
</script>

<style scoped lang="scss">
</style>
