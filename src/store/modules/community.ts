import Vue from 'vue'

export default {
    state: {
        communityList: [],
        communityInfo:{}
    },
    getters: {
        communityList(state: any) {
            return state.communityList;
        },
        communityInfo(state: any) {
            return state.communityInfo;
        },
    },
    mutations: {
        communityList(state: any, payload: any) {
            state.communityList = payload;
        },
        communityInfo(state: any, payload: any) {
            state.communityInfo = payload;
        },
    },
    actions: {

    },
}
