<template>
    <div class="wrap">


        <Header :key="user &&user.picture"></Header>
        <slot/>
        <Footer></Footer>

    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from "vue-property-decorator";
import Header from "./Header.vue";
import Footer from "./Footer.vue";
import {mapGetters} from "vuex";

@Component({
    components: {Header, Footer},
    computed: {...mapGetters(["user"])},
})
export default class LayoutDefault extends Vue {
    user!: any;


}
</script>

<style scoped lang="scss">
</style>