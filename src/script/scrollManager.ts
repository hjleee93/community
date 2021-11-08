function scrollDone(element) {
    if (
        element.scrollTop + element.clientHeight ===
        element.scrollHeight
    ) {
        console.log('true')
        return true;
    }
    else {
        return false;
    }
}

export{
    scrollDone
}