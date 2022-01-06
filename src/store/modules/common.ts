
export default {
    state: {
        LoadingStatus: false,
    },
    getters: {
        LoadingStatus(state:any){
            return state.LoadingStatus;
        }
    },

    mutations: {
        startLoading(state:any){
            state.LoadingStatus = true;
        },
        endLoading(state:any){
            state.LoadingStatus = false;
        },


    },
    actions: {}
}

