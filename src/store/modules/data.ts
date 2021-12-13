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
        postImgArr:[],
        blogImgArr:[],
        blogVideoArr:[],
        blogAudioArr:[],
        researchData:{},
        userData:[],
        feed:null
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
        blogImgArr(state: any) {
            return state.blogImgArr;
        },
        postImgArr(state: any) {
            return state.postImgArr;
        },
        blogVideoArr(state: any) {
            return state.blogVideoArr;
        },
        blogAudioArr(state: any) {
            return state.blogAudioArr;
        },
        researchData(state: any) {
            return state.researchData;
        },
        userData(state: any) {
            return state.userData;
        },
        feed(state: any) {
            return state.feed;
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
        blogImgArr(state: any, payload: any) {
            state.blogImgArr =payload;
            // state.blogImgArr.push(payload);
        },
        postImgArr(state: any, payload: any) {
            // state.postImgArr =payload;
            state.postImgArr.push(payload);
        },
        blogVideoArr(state: any, payload: any) {
            state.blogVideoArr =payload;

        },
        blogAudioArr(state: any, payload: any) {
            state.blogAudioArr =payload;

        },

        researchData(state: any, payload: any) {
            state.researchData =payload;

        },
        userData(state: any, payload: any) {
            state.userData =payload;
        },
        feed(state: any, payload: any) {
            state.feed =payload;
        },
    },
    actions: {
        resetEditor(context: any) {
            context.state.postImgArr = [];
            context.state.userTagList = [];
            context.state.postContents = '';
            context.state.isClearEditor = true;
        },
        resetAttFiles(context:any){
            context.state.imgArr =[];
            context.state.audioArr =[];
            context.state.video =[];
        },
        resetBlogImgArr(context:any){
            context.state.blogImgArr =[];
        },
        resetResearchData(context:any){
            context.state.researchData ={};
            context.state.userData =[]
        }


    }
}

