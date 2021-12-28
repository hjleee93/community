<template>
  <div class="wrap">


    <Header></Header>
    <slot />
    <Footer></Footer>
    <Lnb></Lnb>
    

  </div>
</template>

<script>
import Header from "./Header.vue";
import Footer from "./Footer.vue";
import Lnb from "./Lnb.vue";


export default {
  name: "LayoutStudio",
  components: {
    Header,
    Footer,
    Lnb,
  }
};
</script>

<style scoped>

</style>