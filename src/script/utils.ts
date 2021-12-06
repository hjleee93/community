function copyUrl() {
    let input = document.body.appendChild(document.createElement("input"));
    input.value = window.location.href;
    // input.focus();
    input.select();
    document.execCommand("copy");
    input.parentNode?.removeChild(input);


}

export {
    copyUrl
}
