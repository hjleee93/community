<template>
  <div>


    <!-- 하단영역 -->
    <div class="footer">
<!--      <div>-->
<!--        <dl>-->
<!--          <dt>-->
<!--            <span>공지사항</span>-->
<!--            <a href="#">잼파이 론칭기념 이벤트 안내</a>-->
<!--          </dt>-->
<!--          <dd>-->
<!--            <a href="#"><i class="uil uil-angle-left-b"></i></a>-->
<!--            <a href="#"><i class="uil uil-angle-right-b"></i></a>-->
<!--          </dd>-->
<!--        </dl>-->
<!--      </div>-->
      <dl>
        <dt>
          <p>
            <a href="https://fromthered.com/ " target="_blank">{{$t('company.info.title')}}</a>
<!--            <a href="#">서비스소개</a>-->
            <router-link :to="`/${$i18n.locale}/terms`">{{$t('terms')}}</router-link>
<!--            <a href="#">개인정보처리방침</a>-->
<!--            <a href="#">고객센터</a>-->
          </p>
          <div>
              {{$t('fromthered')}} &nbsp; | &nbsp; {{$t('company.owner')}} : {{$t('company.owner.name')}} &nbsp; | &nbsp;{{$t('company.id')}} : 178-88-00617<br /><br />

              {{$t('company.address')}} &nbsp; | &nbsp; {{$t('email')}} : <a :href="'mailto:' +  $store.getters.supportEmail" style="color: #30a6d8">support@fromthered.com</a><br />
            Copyright ⓒ Fromthered Inc. All rights reserved.
          </div>
        </dt>
        <dd>
<!--          <a href="#"><i class="uil uil-facebook"></i></a>-->
          <a href="https://www.instagram.com/zempie_official/" target="_blank" class="insta-icon"><i class="uil uil-instagram"></i></a>
<!--          <a href="#"><i class="uil uil-youtube"></i></a>-->
<!--          <a href="#"><i class="uil uil-twitter-alt"></i></a>-->
        </dd>
      </dl>
    </div>
    <!-- 하단영역 끝 -->

  </div>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style scoped lang="scss">
.insta-icon:hover{
    color: #C13584;
}


</style>
