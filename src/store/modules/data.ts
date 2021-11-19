export default {
    state: {

        userTagList: [],
        imgArr: [],
        audioArr: [],
        video:[],
        previewAudioArr: [],
        previewVideo: '',
        imageList: [],
        postContents: '',
        isClearEditor: false,
        channelUserInfo: [],
    },
    getters: {

        userTagList(state: any) {
            return state.userTagList;
        },
        imgArr(state: any) {
            return state.imgArr;
        },
        video(state:any){
            return state.video
        },
        audioArr(state: any) {
            return state.audioArr;
        },
        previewAudioArr(state: any) {
            return state.previewAudioArr;
        },
        previewVideo(state: any) {
            return state.previewVideo;
        },
        imageList(state: any) {
            return state.imageList;
        },
        postContents(state: any) {
            return state.postContents;
        },
        isClearEditor(state: any) {
            return state.isClearEditor;
        },
        channelUserInfo(state: any) {
            return state.channelUserInfo;
        },
    },

    mutations: {

        userTagList(state: any, payload: any) {
            state.userTagList.push(payload);
        },
        imgArr(state: any, payload: any) {
            state.imgArr.push(payload);
        },
        video(state: any, payload: any) {
            state.video = payload;
        },
        audioArr(state: any, payload: any) {
            state.audioArr.push(payload);
        },
        previewAudioArr(state: any, payload: any) {
            state.previewAudioArr.push(payload);
        },
        previewVideo(state: any, payload: any) {
            state.previewVideo = payload;
        },

        imageList(state: any, payload: any) {
            state.imageList.push(payload);
        },
        postContents(state: any, payload: any) {
            state.postContents = payload;
        },
        isClearEditor(state: any, payload: any) {
            state.isClearEditor = payload;
        },
        channelUserInfo(state: any, payload: any) {
            state.channelUserInfo = payload;
        },
    },
    actions: {
        resetEditor(context: any) {
            context.state.userTagList = [];
            context.state.postContents = '';
            context.state.isClearEditor = true;
        },
        resetAttFiles(context:any){
            console.log('reset!!!!')
            context.state.imgArr =[];
            context.state.audioArr =[];
            context.state.video =[];

        }

    }
}

