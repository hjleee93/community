<template>
    <div style="height: 200px">
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
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

import { mapGetters } from "vuex";
import { Editor, EditorContent, VueRenderer } from "@tiptap/vue-2";
import StarterKit from "@tiptap/starter-kit";

import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Highlight from "@tiptap/extension-highlight";
import Typography from "@tiptap/extension-typography";
import Dropcursor from "@tiptap/extension-dropcursor";
import CharacterCount from "@tiptap/extension-character-count";

import lowlight from "lowlight";

//custom tiptap
import Video from "@/script/tiptap/customVideo";
import Audio from "@/script/tiptap/customAudio";
import Iframe from "@/script/tiptap/iframe";
import Hashtag from "@/script/tiptap/hashtag";
import Mention from "@/script/tiptap/mention";
import Image from "@/script/tiptap/image";

import HashtagList from "./HashTagList.vue";
import MentionList from "./MentionList.vue";
import tippy from "tippy.js";
import { bus } from "@/main";

import { dataURItoBlob, FileLoader, urlToBlob } from "@/script/fileLoader";

@Component({
    computed: { ...mapGetters(["user"]) },
    components: { EditorContent },
})
export default class TiptapPost extends Vue {
    @Prop() postType!: any;
    private imgPreviewArr: any[] = [];
    private postingText: string = "";
    private editor!: Editor;
    private fileLoader: FileLoader = new FileLoader();
    private user!: any;
    private limit: number = 5000;
    private charCnt: number = 0;

    // 해시태그 멘션
    private hasTagSuggestion: boolean = false;
    private postedHashtag: string[] = [];

    private hasMentionSuggestion: boolean = false;
    private mentionList: any[] = [];
    hashTagListTest: string[] = [
        "ahashtag1",
        "bhashtag2",
        "chashtag3",
        "dhashtag4",
        "ehashtag5",
        "fhashtag6",
        "ghashtag7",
        "해시태그01",
        "hashtag8",
        "hashtag9",
        "hashtag10",
        "hashtag11",
        "hashtag12",
        "hashtag13",
        "hashtag14",
        "hashtag15",
        "hashtag16",
        "hashtag17",
        "hashtag18",
        "hashtag19",
        "hashtag20",
    ];
    // tiptap

    feed!:any;

    @Watch("user")
    async watchUser() {
        // this.mentionList = await this.$api.followingList(this.user.uid);
    }

    async created() {
        this.editor = new Editor({
            content: this.postingText,
            extensions: [
                StarterKit,
                Image,
                CodeBlockLowlight.configure({
                    lowlight,
                }),
                Placeholder.configure({
                    placeholder: "멋진 생각을 공유해주세요.",
                }),
                Link,
                Highlight,
                Typography,
                Dropcursor,
                Video,
                Iframe,
                Audio,
                Hashtag.configure({
                    HTMLAttributes: {
                        class: "hashtag",
                    },
                    renderLabel({ options, node }) {
                        return `${options.suggestion.char}${
                            node.attrs.label ?? node.attrs.id
                        }`;
                    },
                    suggestion: {
                        //@ts-ignore
                        items: (query) => {
                            if (query.length > 0) {
                                return this.hashTagListTest
                                    .filter((item) =>
                                        item
                                            .toLowerCase()
                                            .startsWith(query.toLowerCase())
                                    )
                                    .slice(0, 10);
                            }
                        },
                        render: () => {
                            let component;
                            let popup;

                            return {
                                onStart: (props) => {
                                    component = new VueRenderer(HashtagList, {
                                        parent: this,
                                        propsData: props,
                                    });

                                    popup = tippy("body", {
                                        getReferenceClientRect:
                                            props.clientRect,
                                        appendTo: () => document.body,
                                        content: component.element,
                                        showOnCreate: true,
                                        interactive: false,
                                        trigger: "manual",
                                        placement: "bottom-start",
                                    });
                                },
                                onUpdate: (props) => {
                                    component.updateProps(props);
                                    if (props.items && props.items.length > 0) {
                                        this.hasTagSuggestion = true;
                                    } else {
                                        this.hasTagSuggestion = false;
                                    }
                                    popup[0].setProps({
                                        getReferenceClientRect:
                                            props.clientRect,
                                    });
                                },
                                onKeyDown: (props) => {
                                    // console.log("onKeyDown", props);
                                    if (
                                        props.event.key === "Enter" &&
                                        !this.hasTagSuggestion &&
                                        component.ref?._props.query
                                    ) {
                                        let id = {
                                            id: component.ref?._props.query,
                                        };

                                        return component.ref?._props.editor
                                            .chain()
                                            .focus()
                                            .insertContentAt(
                                                component.ref?._props.range,
                                                [
                                                    {
                                                        type: "hashtag",
                                                        attrs: id,
                                                    },
                                                    {
                                                        type: "text",
                                                        text: " ",
                                                    },
                                                ]
                                            )
                                            .run();
                                    } else {
                                        return component.ref?.onKeyDown(props);
                                    }
                                },
                                onExit() {

                                    popup[0].destroy();
                                    component.destroy();
                                },
                            };
                        },
                    },
                }),
                Mention.configure({
                    HTMLAttributes: {
                        class: "mention",
                    },
                    suggestion: {
                        items: (query) => {
                            return this.mentionList
                                .filter((item) =>
                                    item.nickname
                                        .toLowerCase()
                                        .startsWith(query.toLowerCase())
                                )
                                .slice(0, 10);
                        },
                        render: () => {
                            let component;
                            let popup;

                            return {
                                onStart: (props) => {
                                    component = new VueRenderer(MentionList, {
                                        parent: this,
                                        propsData: props,
                                    });

                                    popup = tippy("body", {
                                        getReferenceClientRect:
                                            props.clientRect,
                                        appendTo: () => document.body,
                                        content: component.element,
                                        showOnCreate: true,
                                        interactive: true,
                                        trigger: "manual",
                                        placement: "bottom-start",
                                    });
                                    if (props.items && props.items.length > 0) {
                                        this.hasMentionSuggestion = true;
                                    } else {
                                        this.hasMentionSuggestion = false;
                                    }
                                },
                                onUpdate: (props) => {
                                    component.updateProps(props);
                                    if (props.items && props.items.length > 0) {
                                        this.hasMentionSuggestion = true;
                                    } else {
                                        this.hasMentionSuggestion = false;
                                    }

                                    popup[0].setProps({
                                        getReferenceClientRect:
                                            props.clientRect,
                                    });
                                },
                                onKeyDown: (props) => {
                                    if (
                                        props.event.key === "Enter" &&
                                        !this.hasMentionSuggestion &&
                                        component.ref?._props.query
                                    ) {
                                        let id = {
                                            id: component.ref?._props.query,
                                        };
                                        this.$store.commit(
                                            "userTagList",
                                            component.ref?._props.query
                                        );
                                        return component.ref?._props.editor
                                            .chain()
                                            .focus()
                                            .insertContentAt(
                                                component.ref?._props.range,
                                                [
                                                    {
                                                        type: "mention",
                                                        attrs: id,
                                                    },
                                                    {
                                                        type: "text",
                                                        text: " ",
                                                    },
                                                ]
                                            )
                                            .run();
                                    } else {
                                        return component.ref?.onKeyDown(props);
                                    }
                                },
                                onExit() {
                                    popup[0].destroy();
                                    component.destroy();
                                },
                            };
                        },
                    },
                }),
            ],
            autofocus: "end",
            onUpdate: () => {
                this.$emit("isEmpty", this.editor.isEmpty);
                this.charCnt = this.editor.getCharacterCount();
                this.$store.commit("postContents", this.editor.getHTML());
                this.$store.commit("isClearEditor", false);
            },
        });
    }
    mounted() {
        this.feed = this.$store.getters.feed
        if (this.feed) {
            this.prefill();
        }
        bus.$on("imgUrl", (url) => {
            this.editor.chain().focus().setImage({ src: url }).run();
        });
        bus.$on("videoUrl", (url) => {
            this.editor.chain().focus().setIframe({ src: url }).run();
        });
        bus.$on("audioUrl", (url) => {
            this.editor.chain().focus().setAudio({ src: url }).run();
        });
    }
    prefill() {

        this.$store.dispatch('resetAttFiles')
        console.log(this.feed)
        for (const file of this.feed.attatchment_files) {
            console.log(file)
            if (file.type === 'image') {
                this.imgPreviewArr.push(file);
                console.log(this.imgPreviewArr)
            }
        }

        this.$store.commit('imgArr', this.imgPreviewArr)

        if (this.feed.attatchment_files.type === 'image') {
            this.imgPreviewArr = this.feed.attatchment_files.img;
            console.log(this.imgPreviewArr)
        }
        else if (this.feed.attatchment_files.audio) {
            this.fileLoader.fileObj.audio =
                this.feed.attatchment_files.audio;
        }
        else if (this.feed.attatchment_files.video) {
            this.fileLoader.fileObj.video =
                this.feed.attatchment_files.video;
        }
        this.postingText = this.feed.content
        console.log('this.postingText', this.postingText)
    }

    @Watch('$store.getters.blogImgArr')
    blogImgArr() {
        for (const img of this.$store.getters.blogImgArr) {
            this.editor.chain().focus().setImage({ src: img.url }).run();
        }
    }
    @Watch('$store.getters.blogVideoArr')
    blogVideoArr() {
        for (const video of this.$store.getters.blogVideoArr) {
            this.editor.chain().focus().setIframe({ src: video.url }).run();
        }
    }
    @Watch('$store.getters.blogAudioArr')
    blogAudioArr() {
        for (const audio of this.$store.getters.blogAudioArr) {
            this.editor.chain().focus().setAudio({ src: audio.url }).run();
        }
    }
    destroyed() {
        bus.$off("imgUrl");
    }
    getFile() {
        console.log();
    }
}
</script>

<style lang="scss" scoped>
@use "sass:math";
.character-count {
    display: flex;
    justify-content: flex-end;
    padding: 5px 5px 0px 0px;
}
.editor-container {
    height: 100%;
    text-align: left;
    padding: 15px;
    .iframe-wrapper {
        position: relative;
        padding-bottom: math.div(100, 16) * 9%;
        height: 0;
        overflow: hidden;
        width: 100%;
        height: auto;
        &.ProseMirror-selectednode {
            outline: 3px solid #68cef8;
        }
        iframe {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }
    }

    .audio-wrapper {
        position: relative;
        overflow: hidden;
        width: 360px;
        height: 100px;
        &.ProseMirror-selectednode {
            outline: 3px solid #68cef8;
        }
    }
}
</style>
