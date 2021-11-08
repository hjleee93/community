import store from "@/store";

function FileSizeCheck(file: File, maxSize: number) {
    console.log(file.size, mbToByte(maxSize))

    if (file.size > mbToByte(maxSize)) {
        return false;
    } else {
        return true;
    }

}

function kbToByte(kb = 1) {
    return kb * 1024;
}

function mbToByte(mb = 1) {
    return mb * 1024 * 1024;
}

function byteToMb(byte = 1) {
    return byte / 1024 / 1024;
}

function onSelectFile(files, maxFileNum, storeArr) {
    if (files && files[0]) {
        if(files.length> maxFileNum){
            alert('최대 파일 개수 초과')
            return;
        }
        for (const file of files) {
            const reader = new FileReader();
            reader.onload = e => {
                store.commit(storeArr, {url:e.target!.result, file:file})
            };
            reader.readAsDataURL(file);
        }
    }
}

export {
    onSelectFile,
    FileSizeCheck,
    kbToByte,
    mbToByte,
    byteToMb

}