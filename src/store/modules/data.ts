export default {
    state: {
        userTagList: [],
        //첨부파일
        imgArr: [],
        audioArr: [],
        videoArr:[],
        blogImgArr:[],
        blogVideoArr:[],
        blogAudioArr:[],
        //tiptap
        postContents: '',
        isClearEditor: false,
        //검색
        channelUserInfo: [],
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
        videoArr(state:any){
            return state.videoArr;
        },
        audioArr(state: any) {
            return state.audioArr;
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
        videoArr(state: any, payload: any) {
            state.videoArr = payload;
        },
        audioArr(state: any, payload: any) {
            state.audioArr.push(payload);
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
            context.state.userTagList = [];
            context.state.postContents = '';
            context.state.isClearEditor = true;
            context.state.imgArr =[];
            context.state.audioArr =[];
            context.state.videoArr =[];

        },
        resetAttFiles(context:any){
            context.state.imgArr =[];
            context.state.audioArr =[];
            context.state.videoArr =[];
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

