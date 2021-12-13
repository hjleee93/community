<template>
    <div
        class="quick-post-footer-action text-tooltip-tft-medium"
        style="width: 30px"
        @click="uploadFile"
    >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
        >
            <path fill="none" d="M0 0h24v24H0z"/>
            <path
                d="M4.828 21l-.02.02-.021-.02H2.992A.993.993 0 0 1 2 20.007V3.993A1 1 0 0 1 2.992 3h18.016c.548 0 .992.445.992.993v16.014a1 1 0 0 1-.992.993H4.828zM20 15V5H4v14L14 9l6 6zm0 2.828l-6-6L6.828 19H20v-1.172zM8 11a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"
                fill="rgba(97,106,130,1)"
            />
        </svg>
        <div style="height: 0px; overflow: hidden">
            <input type="file" @input="onSelectFile" multiple accept=image/*
                   ref="image" name="fileInput"/>
        </div>

        <b-modal ref="alertModal" class="modal-container"
                 centered
                 hide-header
                 hide-footer>
            <div class="my-4">
                <h5 style="color: #000">한가지 형식의 첨부파일만 입력이 가능합니다. 여러가지 첨부파일을 업로드 하고 싶은 경우 블로그 포스팅을 이용해주세요.</h5>
                <p style="color: #000">기존 첨부파일을 지우시겠습니까?</p>
            </div>
            <div style="display: flex">
                <button
                    class="popup-box-action half button tertiary"
                    style="width: 47%"
                    @click="resetAttr(true)"
                >
                    네
                </button>
                <button
                    class="popup-box-action half button "
                    style="width: 47%"
                    @click="resetAttr(false)"
                >
                    아니요
                </button>
            </div>

        </b-modal>


    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import {onSelectFile} from "@/script/fileManager";

@Component({
    components: {},
})
export default class ImageUploaderBtn extends Vue {
    @Prop() activeTab!: string;


    uploadFile() {
        if (this.$store.getters.audioArr.length > 0 || this.$store.getters.video.file) {
            (this.$refs['alertModal'] as any).show()
        }
        else {
            (this.$refs.image as HTMLElement).click();
        }

    }

    resetAttr(isReset: boolean) {
        if (isReset) {
            this.$store.dispatch('resetAttFiles')
        }
        (this.$refs['alertModal'] as any).hide()

    }

    onSelectFile() {
        const input: any = this.$refs.image;
        const formData = new FormData();
        console.log(this.activeTab)

        if (this.activeTab === 'SNS') {
            const files = input.files;


            if (files.length > 5 || this.$store.getters.imgArr.length >= 5) {
                this.$toasted.show("최대 파일 갯수는 5장입니다.", {
                    fullWidth: true,
                    fitToScreen: true,
                    theme: "outline",
                    position: "top-center",
                    className: "toast-success",
                    duration: 3000,
                    type: "negative",
                    action: {
                        text: "X",
                        onClick: (e, toastObject) => {
                            toastObject.goAway(0);
                        },
                    },
                });
            }
            else {
                for (const file of files) {
                    // if(file.size > 1024 * 1024 * 3){
                    //
                    //     this.$toasted.show("최대 파일 크기는 3mb입니다.", {
                    //         fullWidth: true,
                    //         fitToScreen: true,
                    //         theme: "outline",
                    //         position: "top-center",
                    //         duration: 3000,
                    //         type: "negative",
                    //         action: {
                    //             text: "X",
                    //             onClick: (e, toastObject) => {
                    //                 toastObject.goAway(0);
                    //             },
                    //         },
                    //     });
                    //     return;
                    // }else
                    if (this.$store.getters.imgArr.length > 0) {
                        let maxFileSize: number = 1024 * 1024 * 15;
                        for (const img of this.$store.getters.imgArr) {
                            maxFileSize -= img.size;
                            console.log('maxFileSize', maxFileSize)
                            if (maxFileSize < 0) {
                                this.$toasted.show("총 업로드 크기는 15mb입니다. ", {
                                    fullWidth: true,
                                    fitToScreen: true,
                                    theme: "outline",
                                    position: "top-center",
                                    duration: 3000,
                                    type: "negative",
                                    action: {
                                        text: "X",
                                        onClick: (e, toastObject) => {
                                            toastObject.goAway(0);
                                        },
                                    },
                                });
                                return;
                            }
                        }

                    }

                    const reader = new FileReader();
                    reader.onload = (e) => {

                        const obj = {
                            file: file,
                            url: e.target!.result,
                            size: file.size
                        }
                        this.$store.commit('imgArr', obj)
                    };
                    reader.readAsDataURL(file);


                }
            }

        }
        else if (this.activeTab === 'BLOG') {
            const files = input.files;
            if (files.length > 20) {
                this.$toasted.show("최대 파일 갯수는 20장입니다.", {
                    fullWidth: true,
                    fitToScreen: true,
                    theme: "outline",
                    position: "top-center",
                    className: "toast-success",
                    duration: 3000,
                    type: "negative",
                    action: {
                        text: "X",
                        onClick: (e, toastObject) => {
                            toastObject.goAway(0);
                        },
                    },
                });
                return;
            }

            for (let i = 0; i < input.files.length; i++) {
                formData.append(input.files[i].name, input.files[i]);
            }

            this.$api.fileUploader(formData)
                .then((res: any) => {
                    this.$store.commit('blogImgArr', res)
                    console.log(res)
                })
            // console.log('blogImgArr', this.$store.getters.blogImgArr)
        }

    }
}
</script>

<style scoped>
.quick-post-footer-action {
    cursor: pointer
}
</style>
