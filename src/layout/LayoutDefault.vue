<template>
  <div class="wrap ">


    <Header></Header>
    <slot />
    <Footer></Footer>
    

  </div>
</template>

<script>
import Header from "./Header.vue";
import Footer from "./Footer.vue";


export default {
  name: "LayoutDefault",
  components: {
    Header,
    Footer,
  }
};
</script>

<style scoped>

</style>