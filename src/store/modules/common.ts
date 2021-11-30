
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
        startSpinner(state:any){
            state.LoadingStatus = true;
        },
        endSpinner(state:any){
            state.LoadingStatus = false;
        },


    },
    actions: {}
}

