<template>
    <div class="widget-box">
        <button class="button primary" @click="copyUrl">Copy Game Link</button>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
    components: {},
})
export default class ClipboardBox extends Vue {
    @Prop() game!: any;

    mounted() {
        console.log(this.game);
    }
    copyUrl() {
        const url = `${process.env.VUE_APP_LAUNCHER_URL}game/${this.game.pathname}`;
        let input = document.body.appendChild(document.createElement("input"));
        input.value = url;
        input.select();
        document.execCommand("copy");
        input.parentNode?.removeChild(input);
        this.$toasted.clear();
        this.$toasted.show("Link copied to clipboard", {
            singleton: true,
            fullWidth: false,
            fitToScreen: true,
            theme: "outline",
            position: "bottom-left",
            className: "toast-success",
            duration: 3000,
            type: "success",
            action: {
                text: "X",
                onClick: (e, toastObject) => {
                    toastObject.goAway(0);
                },
            },
        });
    }
}
</script>

<style scoped lang="scss">
</style>
