export default {
    state: {
        currPage : {},
    },
    getters: {
        currPage(state:any){
            return state.currPage;
        },


    },

    mutations: {
        currPage(state:any, payload:any){
            state.currPage = payload;
        },


    },
    actions: {}
}

