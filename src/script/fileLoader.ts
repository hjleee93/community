import store from "@/store";
import { mbToByte } from "@/script/fileManager";
import { fileObjWtUrl } from "@/types/file/file";


class FileLoader {

    private remainImgFileSize: number = mbToByte(20); //20mb (binary);
    fileObj: fileObjWtUrl[] = [];

    imgLoad(file: File, callback) {
        store.commit('isClearEditor', false)
        // let fileUrl: string | null | ArrayBuffer;
        let reader = new FileReader();


        reader.onload = callback;

        reader.readAsDataURL(file);
    }
    getFileUrl(src: string | ArrayBuffer | null) {
        return src;
    }
    videoLoad(file: File) {
        let reader = new FileReader();

        reader.onload = (e) => {
            store.commit('previewVideo', e.target!.result);
        }
        reader.readAsDataURL(file);

    }
    audioLoad(file: File) {
        let reader = new FileReader();

        reader.onload = (e) => {
            store.commit('previewAudioArr', e.target!.result);
        }
        reader.readAsDataURL(file);
    }

    previewArr(src: string) {
        this.fileObj.forEach(elem => {
            console.log(elem, src)
            elem.url = src;
        })
    }
    checkImgFile(files: File[]) {
        let totalImgCnt = files.length + this.fileObj.length;

        if (files.length > 5 || totalImgCnt > 5) {
            alert("이미지 개수는 최대 5개입니다");
            return false;
        } else {
            if (files.length <= 5) {
                for (let i = 0; i < files.length; i++) {
                    this.remainImgFileSize -= files[i].size;
                    if (this.remainImgFileSize < 0) {
                        alert("최대 파일 용량을 넘었습니다.(최대 20mb)");
                        this.remainImgFileSize += files[i].size;
                        return false;

                    }


                    // this.imgLoad(files[i]);
                    this.imgLoad(files[i], e => {
                        this.fileObj.push({
                            contentType: 'image',
                            size: files[i].size,
                            name: files[i].name,
                            type: files[i].type,
                            url: e.target.result
                        });

                    })
                }
            }

            console.log(this.fileObj)
            return this.fileObj;
        }
    }
    //미리보기 사진 삭제
    deletePreviewImg(idx: number | string) {
        if (typeof idx === 'number') {
            this.remainImgFileSize += this.fileObj[idx].size;
            this.fileObj.splice(idx, 1);
        }
        else if (typeof idx === 'string' && idx === 'all') {
            console.log('delte all')
            //todo:array 비우기
            this.remainImgFileSize = mbToByte(20);

        }
        console.log(this.fileObj)
    }


}

async function urlToFile(url: string) {
    console.log(url)

    let blob = await fetch(url).then(r => r.blob())
        .then(blobFile => new File([blobFile], 'text'));

    console.log(blob)

}

async function getFileFromUrl(url, name, defaultType = 'image/jpeg') {
    const response = await fetch(url);
    const data = await response.blob();
    let file = new File([data], name, {
        type: response.headers.get('content-type') || defaultType,
    });

    return file
    // console.log(file)
}



export {
    FileLoader,
    getFileFromUrl,
}