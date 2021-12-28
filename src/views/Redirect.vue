<template>
</template>

<script lang="ts">
import {Vue, Component, Watch} from 'vue-property-decorator';

@Component
export default class Redirect extends Vue {

    constructor() {
        super();
        // const { params } = this.$route;
        // const {pathMatch} = params;
        //
        // this.$router.replace( pathMatch );
        this.$router.replace('/update')



        // const { hash } = this.$route;
        // console.log( this.$route, this.$router, hash );
        // if (!hash || hash.length <= 2) {
        //     this.$router.replace('/');
        //     return;
        // }
        // this.$router.replace(hash.substring(2));
    }

}
</script>
<style lang="scss" scoped>
.footer {
    //background-color: #292929;
}
</style>
