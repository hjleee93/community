<template>
  <div
    class="user-status-list"
    @click="openChannelTl(channel.id)"
    :id="channel.id"
  >
    <span class="channel-title">{{ channel.title }}</span>
    <div
      :style="`background: url(${
        channel.profile_img || 'img/default.png'
      }) center center / cover no-repeat;`"
      class="thumb img channel-img"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  components: {},
})
export default class Channel extends Vue {
  @Prop() channel!: any;
  @Prop() communityId!: number;

  private timeline: any;
  private channelId: any = -1;

  private limit: number = 5;
  private offset: number = 0;

    openChannelTl(channel_id?: string) {
    this.$emit("channelId", channel_id);
  }

  mounted(){
      console.log(this.channel)
      this.fetch()
  }

  fetch(){
      const obj = {
          limit: this.limit,
          offset: this.offset
      }
      this.$api.channelList(this.communityId, obj)
          .then((res: AxiosResponse) => {
              console.log(res)
          })
          .catch((err: AxiosError) => {

          })


  }
}
</script>

<style scoped>
.channel-img {
  width: 100%;
  height: 65px;
  border-radius: 7px;
  margin-bottom: 10px;
  opacity: 50%;
}
.channel-img:hover,
.user-status-list.active .channel-img {
  opacity: 100%;
  cursor: pointer;
}
.user-status-list.active .channel-title {
  background-color: #fff;
  color: #1d2333;
}
.channel-title {
  border-radius: 6px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-weight: 600;
  padding: 2px 6px;
  background-color: #1d2333;
  color: #fff;
  position: absolute;
  z-index: 3;
  margin: 8px;
  display: flex;
  justify-content: space-between;
}
</style>
