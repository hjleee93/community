<template>
    <i v-if='isAsc' class="uil uil-angle-down" style="font-size:20px; cursor: pointer;"
       @click="ascSort(sort)"></i>
    <i v-else class="uil uil-angle-up" style="font-size:20px; cursor: pointer;"
       @click="descSort(sort)"></i>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from "vue-property-decorator";
import _ from "lodash";


@Component({
    components: {},
})
export default class Sorting extends Vue {
    @Prop() sort!: string;
    @Prop() array!: any[];

    sortedArray: any[] = [];

    isAsc:boolean = true;

    ascSort(){
        this.$emit('sortedArray', _.sortBy(this.array, this.sort).reverse())
        this.isAsc = !this.isAsc;
    }

    descSort(){
        this.$emit('sortedArray', _.sortBy(this.array, this.sort))
        this.isAsc = !this.isAsc;
    }

}
</script>

<style scoped>

</style>