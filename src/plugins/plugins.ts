import XM_Dropdown from "@/script/vendor/xm_dropdown.min.js";
import XM_Hexagon from "@/script/vendor/xm_hexagon.min.js"
import XM_Tab from "@/script/vendor/xm_tab.min.js"

const existsInDOM = function (selector: any) {
    return document.querySelectorAll(selector).length;
};

const plugins = {

    createDropdown: function (options: any) {
        if ((
            (existsInDOM(options.container) || typeof options.containerElement !== 'undefined') && options.controlToggle) || ((existsInDOM(options.trigger) || typeof options.triggerElement !== 'undefined') && (existsInDOM(options.container) || typeof options.containerElement !== 'undefined'))) {
            //@ts-ignore       
            return new XM_Dropdown(options);
        }
    },
    createHexagon: function (options: any) {
        if (existsInDOM(options.container) || typeof options.containerElement !== 'undefined') {
            return new XM_Hexagon(options);
        }
    },
    createTab: function (options: any) {
        if (existsInDOM(options.triggers) && existsInDOM(options.elements)) {
            //@ts-ignore       
            return new XM_Tab(options);
        }
    }
}

export default plugins;