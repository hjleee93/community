import Vue from "vue";

export default class Toast{
    successToast(text:string){
        Vue.toasted.show(text, {
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
    failToast(text:string){
        Vue.toasted.show(text, {
            singleton: true,
            fullWidth: false,
            fitToScreen: true,
            theme: "outline",
            position: "bottom-left",
            className: "toast-danger",
            duration: 3000,
            type: "error",
            action: {
                text: "X",
                onClick: (e, toastObject) => {
                    toastObject.goAway(0);
                },
            },
        });
    }
    clear(){
        Vue.toasted.clear();
    }


}

export {
    Toast
}