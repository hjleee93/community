export default {
    state: {
        LoadingStatus: false,
        locale: {}
    },
    getters: {
        LoadingStatus(state:any){
            return state.LoadingStatus;
        },
        locale(state:any){
            return state.locale;
        }
    },

    mutations: {
        startLoading(state:any){
            state.LoadingStatus = true;
        },
        endLoading(state:any){
            state.LoadingStatus = false;
        },
        setLocale(state:any, payload:any) {
            state.locale = payload
        }

    },
    actions: {
        setLocale({ commit }, payload) {
            commit('setLocale', payload)
        }
    }
}

