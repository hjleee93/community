export default {
    state: {
        currPage : {},
        isNeededRefresh: false,
    },
    getters: {
        currPage(state:any){
            return state.currPage;
        },
        isNeededRefresh(state:any){
            return state.isNeededRefresh;
        },

    },

    mutations: {
        currPage(state:any, payload:any){
            state.currPage = payload;
        },
        isNeededRefresh(state:any, payload:any){
            state.isNeededRefresh = payload;
        },

    },
    actions: {}
}

