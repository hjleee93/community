<template>
  <div>


    <!-- 좌측영역 -->
    <div class="lnb">
      <ul>
        <li @click="movePage('/dashboard')">
          <i class="uil uil-chart-pie-alt"></i>
          <span>대시보드</span>
        </li>
        <li @click="movePage('/projectList')">
          <i class="uil uil-robot"></i>
          <span>모든게임</span>
        </li>
        <li @click="movePage('/uploadGame')">
          <i class="uil uil-folder-upload"></i>
          <span>게임업로드</span>
        </li>
      </ul>

      <ol>
        <li>
          <i class="uil uil-sign-out-alt"></i>
          <span>로그아웃</span>
        </li>
      </ol>
    </div>
    <!-- 좌측영역 끝 -->


  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
    components: {},
})
export default class Lnb extends Vue {
    movePage(pathName: string){
       this.$router.push(pathName)

    }
}
</script>

<style scoped lang="scss">
</style>