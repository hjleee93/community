function scrollDone(element) {
    if (
        element.scrollTop + element.offsetHeight >= element.scrollHeight
    ) {
        return true;
    }
    else {
        return false;
    }
}

export {
    scrollDone
}