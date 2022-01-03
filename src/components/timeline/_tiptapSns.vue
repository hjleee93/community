<template>
    <div>
        <!--      v-if="user"-->
        <editor-content
            :editor="editor"
            class="editor-container"
            v-model="postingText"
        />
        <div class="character-count">
            <p>{{ charCnt }}/{{ limit }}</p>
        </div>
    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from "vue-property-decorator";

import {mapGetters} from "vuex";
import {Editor, EditorContent, VueRenderer} from "@tiptap/vue-2";
import StarterKit from "@tiptap/starter-kit";

import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import Highlight from "@tiptap/extension-highlight";
import Typography from "@tiptap/extension-typography";
import Dropcursor from "@tiptap/extension-dropcursor";

import Video from "@/script/tiptap/customVideo";
import Audio from "@/script/tiptap/customAudio";
import Iframe from "@/script/tiptap/iframe";
import Hashtag from "@/script/tiptap/hashtag";
import CharacterCount from "@tiptap/extension-character-count";
import Mention from "@/script/tiptap/mention";

import HashtagList from "./HashTagList.vue";
import MentionList from "./MentionList.vue";
import tippy from "tippy.js";
import {User} from "@/types";


@Component({
    computed: {...mapGetters(["user"])},
    components: {EditorContent},
})
export default class TiptapSns extends Vue {
    feed!: any;
    imgPreviewArr:any[] = [];
    audioPreviewArr:any[] = [];
    private postingText: string = "";
    private editor: Editor|null = null;
    private user!: User;
    private limit: number = 300;
    private charCnt: number = 0;

    // 해시태그 멘션
    private hasTagSuggestion: boolean = false;
    private postedHashtag: string[] = [];

    private hasMentionSuggestion: boolean = false;
    private mentionList: any[] = [];
    hashTagList: string[] = [];


    // tiptap

    async created() {
        this.editorInit();
    }

    async mounted() {
        await this.$store.dispatch("loginState");
        this.feed = this.$store.getters.feed

        if (this.feed) {
            this.editor!.commands.setContent(this.feed.content);
            this.charCnt = this.editor!.getCharacterCount();
            // this.prefill();
        }

    }

    prefill() {
        const attachFiles = Array.isArray(this.feed.attatchment_files) ? this.feed.attatchment_files : JSON.parse(this.feed.attatchment_files)
        if(attachFiles) {
            this.$store.dispatch('resetAttFiles')
            for (const file of attachFiles ){
                if (file.type === 'image') {
                    this.imgPreviewArr.push(file);
                }
                else if(file.type === 'sound'){
                    this.audioPreviewArr.push(file)
                }
            }

            this.$store.commit('imgArr', this.imgPreviewArr)
            this.$store.commit('audioArr', this.audioPreviewArr)

            if (this.feed.attatchment_files.type === 'image') {
                this.imgPreviewArr = this.feed.attatchment_files.img;
            }
            else if (this.feed.attatchment_files.type === 'sound') {
                this.audioPreviewArr = this.feed.attatchment_files.audio;
            }
        }
    }
    beforeUnmount() {
        this.editor!.destroy()
    }

    editorInit() {
        this.editor = new Editor({
            content: this.postingText,
            extensions: [
                StarterKit,
                Link,
                Highlight,
                // Typography,
                Dropcursor,
                CharacterCount.configure({
                    limit: this.limit,
                }),
                Placeholder.configure({
                    emptyEditorClass: 'is-editor-empty',
                    placeholder: "멋진 생각을 공유해주세요.",
                }),
                Video,
                Iframe,
                Audio,
                // Hashtag.configure({
                //     HTMLAttributes: {
                //         class: "hashtag",
                //     },
                //     renderLabel({options, node}) {
                //         return `${options.suggestion.char}${
                //             node.attrs.label ?? node.attrs.id
                //         }`;
                //     },
                //
                //     suggestion: {
                //         //@ts-ignore
                //         items: async (query) => {
                //             /* 추후 hashtag log api 생기면 추가 예정 */
                //             // if (query.length > 0) {
                //             //     return this.hashTagListTest
                //             //         .filter((item) =>
                //             //             item
                //             //                 .toLowerCase()
                //             //                 .startsWith(query.toLowerCase())
                //             //         )
                //             //         .slice(0, 10);
                //             // }
                //         },
                //         render: () => {
                //             let component;
                //             let popup;
                //
                //             return {
                //                 onStart: (props) => {
                //                     component = new VueRenderer(HashtagList, {
                //                         parent: this,
                //                         propsData: props,
                //                     });
                //
                //                     popup = tippy("body", {
                //                         getReferenceClientRect:
                //                         props.clientRect,
                //                         appendTo: () => document.body,
                //                         content: component.element,
                //                         showOnCreate: true,
                //                         interactive: false,
                //                         trigger: "manual",
                //                         placement: "bottom-start",
                //                     });
                //                 },
                //                 onUpdate: (props) => {
                //
                //                     component.updateProps(props);
                //                     if (props.items && props.items.length > 0) {
                //                         this.hasTagSuggestion = true;
                //                     }
                //                     else {
                //                         this.hasTagSuggestion = false;
                //                     }
                //                     popup[0].setProps({
                //                         getReferenceClientRect:
                //                         props.clientRect,
                //                     });
                //                 },
                //                 onKeyDown: (props) => {
                //
                //                     if (
                //                         props.event.code === "Space" ||
                //                         (props.event.key === "Enter" &&
                //                             !this.hasTagSuggestion &&
                //                             component.ref?._props.query)
                //                     ) {
                //                         let id = {
                //                             id: component.ref?._props.query,
                //                         };
                //
                //                         return component.ref?._props.editor
                //                             .chain()
                //                             .focus()
                //                             .insertContentAt(
                //                                 component.ref?._props.range,
                //                                 [
                //                                     {
                //                                         type: "hashtag",
                //                                         attrs: id,
                //                                     }
                //                                 ]
                //                             )
                //                             .run();
                //                     }
                //                     else if (props.event.key === "#") {
                //                         let id = {
                //                             id: component.ref?._props.query,
                //                         };
                //
                //                         return component.ref?._props.editor
                //                             .chain()
                //                             .focus()
                //                             .insertContentAt(
                //                                 component.ref?._props.range,
                //                                 [
                //                                     {
                //                                         type: "hashtag",
                //                                         attrs: id,
                //                                     },
                //                                     {
                //                                         type: "text",
                //                                         text: "#",
                //                                     },
                //                                 ]
                //                             )
                //                             .run();
                //                     }
                //                     else {
                //                         return component.ref?.onKeyDown(props);
                //                     }
                //                 },
                //                 onExit() {
                //                     popup[0].destroy();
                //                     component.destroy();
                //                 },
                //             };
                //         },
                //     },
                // }),
                // Mention.configure({
                //     HTMLAttributes: {
                //         class: 'mention',
                //     },
                //     renderLabel({options, node}) {
                //         return `${options.suggestion.char}${
                //             node.attrs.label ?? node.attrs.id
                //         }`;
                //     },
                //     suggestion: {
                //         //@ts-ignore
                //         items: async (query) => {
                //             if (query.length > 0) {
                //                 const obj = {
                //                     limit: 5,
                //                     username: query
                //                 }
                //                 const res = await this.$api.search(obj)
                //                 let username = res.result.map((user) => {
                //                     return user.name
                //                 })
                //                 return username;
                //             }
                //         },
                //         render: () => {
                //             let component;
                //             let popup;
                //
                //             return {
                //                 onStart: (props) => {
                //                     component = new VueRenderer(MentionList, {
                //                         parent: this,
                //                         propsData: props,
                //                     });
                //
                //                     popup = tippy("body", {
                //                         getReferenceClientRect:
                //                         props.clientRect,
                //                         appendTo: () => document.body,
                //                         content: component.element,
                //                         showOnCreate: true,
                //                         interactive: false,
                //                         trigger: "manual",
                //                         placement: "bottom-start",
                //                     });
                //                 },
                //                 onUpdate: (props) => {
                //                     component.updateProps(props);
                //                     if (props.items && props.items.length > 0) {
                //                         this.hasMentionSuggestion = true;
                //                     }
                //                     else {
                //                         this.hasMentionSuggestion = false;
                //                     }
                //                     popup[0].setProps({
                //                         getReferenceClientRect:
                //                         props.clientRect,
                //                     });
                //                 },
                //                 onKeyDown: (props) => {
                //
                //                     if (
                //                         props.event.code === "Space" ||
                //                         (props.event.key === "Enter" &&
                //                             !this.hasMentionSuggestion &&
                //                             component.ref?._props.query)
                //                     ) {
                //                         let id = {
                //                             id: component.ref?._props.query,
                //                         };
                //                         return component.ref?._props.editor
                //                             .chain()
                //                             .focus()
                //                             .insertContentAt(
                //                                 component.ref?._props.range,
                //                                 [
                //                                     {
                //                                         type: "mention",
                //                                         attrs: id,
                //                                     }
                //                                 ]
                //                             )
                //                             .run();
                //                     }
                //                         // else if(props.event.key === "@") {
                //                         //     let id = {
                //                         //         id: component.ref?._props.query,
                //                         //     };
                //                         //     this.$store.commit(
                //                         //         "userTagList",
                //                         //         component.ref?._props.query
                //                         //     );
                //                         //     return component.ref?._props.editor
                //                         //         .chain()
                //                         //         .focus()
                //                         //         .insertContentAt(
                //                         //             component.ref?._props.range,
                //                         //             [
                //                         //                 {
                //                         //                     type: "mention",
                //                         //                     attrs: id,
                //                         //                 },
                //                         //                 {
                //                         //                     type: "text",
                //                         //                     text: "@",
                //                         //                 },
                //                         //             ]
                //                         //         )
                //                         //         .run();
                //                     // }
                //                     else {
                //
                //                         return component.ref?.onKeyDown(props);
                //                     }
                //                 },
                //                 onExit() {
                //                     popup[0].destroy();
                //                     component.destroy();
                //                 },
                //             };
                //         },
                //     },
                // }),

            ],
            autofocus: true,
            onUpdate: () => {
                this.$emit("isEmpty", this.editor!.isEmpty);
                this.$store.commit("postContents", this.editor!.getHTML());
                this.$store.commit("isClearEditor", false);
                this.charCnt = this.editor!.getCharacterCount();
            },
        });
    }
}
</script>

<style lang="scss" scoped>
.character-count {
    display: flex !important;
    justify-content: flex-end !important;
    margin-right: 10px;
}

.editor-container {
    text-align: left;
    padding: 15px;
    height: 200px;




    .iframe-wrapper {
        position: relative;
        padding-bottom: 100/16 * 9%;
        height: 0;
        overflow: hidden;
        width: 100%;
        height: auto;

        &.ProseMirror-selectednode {
            outline: 3px solid #F97316;
        }

        iframe {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }
    }

    .video-wrapper {
        position: relative;
        padding-bottom: 100/16 * 9%;

        overflow: hidden;
        width: 360px;
        height: 240px;

        &.ProseMirror-selectednode {
            outline: 3px solid #F97316;
        }
    }

    .audio-wrapper {
        position: relative;

        overflow: hidden;
        width: 360px;
        height: 100px;

        &.ProseMirror-selectednode {
            outline: 3px solid #F97316;
        }
    }
}
</style>
