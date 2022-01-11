import store from '@/store';
import axios, {AxiosInstance} from 'axios'
import Vue, {PluginObject} from "vue";
import firebase from 'firebase/app';

const zempieApi = process.env.VUE_APP_BASE_API;
const studioApi = process.env.VUE_APP_STUDIO_API;
export default class Api {
    private communityApi = process.env.VUE_APP_COMMUNITY_API;

    async request(method: string, url: string, data: any, withCredentials: boolean = false, errorCallback: Function | null = null, retryCount: number = 0): Promise<any> {
        try {
            //파라미터 파싱용

            if (method === 'get') {
                url = url + '?_=' + Date.now()
                if(data) {
                    for (let d in data) {
                        if (data[d]) url += `&${d}=${data[d]}`
                    }
                }
                // let keys = Object.keys(data)
                // const paramKeys = keys.filter((key: string) => {
                //     if (data[key]) {
                //         return key
                //     }
                // })
                // const params = paramKeys.map((key: string) => {
                //     return `${key}=${data[key]}`
                // })
                //
                // const query = params.join('&');
                // url = `${url}?${query}`
            }
            // @ts-ignore
            const result = await Vue.$axios({
                method: method,
                url,
                data,
                withCredentials
            });
            return result.data;
        }
        catch (error) {
            // if ( error && error.response && error.response.data && error.response.data.error && error.response.data.error.message === 'Unauthorized' ) {
            if (error?.response?.data?.error?.code === 10001 || error && error.response && error.response.data && error.response.data.error === 'Unauthorized') {
                const currentUser = firebase.auth().currentUser;
                if (currentUser) {
                    const idToken = await currentUser.getIdToken(true);
                    store.commit('idToken', idToken);
                    if (retryCount < 3) {
                        return await this.request(method, url, data, withCredentials, errorCallback, ++retryCount);
                    }
                    else {
                        //3번 초과
                        errorCallback && errorCallback(error);
                        // throw new Error(error);
                    }
                }
                else {
                    //로그인 안됨.
                    errorCallback && errorCallback(error);
                    // throw new Error(error)
                    // return error;
                }
            }
            // console.log(error, error.message);
            // throw error;
            //error && error.response && error.response.data || error

            const result = error && error.response && error.response.data || {
                error: error.message || error,
            };
            throw result;
        }
    }


    /* community */
    async communityList(obj: any) {
        return await this.request('get', `${this.communityApi}community/list`, obj, false)
    };

    async channelList(community_id: string, obj: any) {
        return await this.request('get', `${this.communityApi}community/${community_id}/channels`, obj, false)
    }

    async communityInfo(id: string) {
        return await this.request('get', `${this.communityApi}community/${id}`, undefined, false);
    };

    async subscribe(obj: any) {
        return await this.request('post', `${this.communityApi}community/${obj.community_id}/subscribe?user_id=${obj.user_id}`, undefined, false);
    }

    async unsubscribe(obj: any) {
        return await this.request('post', `${this.communityApi}community/${obj.community_id}/unsubscribe?user_id=${obj.user_id}`, undefined, false);
    }

    async communityTimeline(obj: any) {
        return await this.request('get', `${this.communityApi}timeline/${obj.community_id}/post`, obj, false)
    }

    async communityMembers(community_id: string, obj: any) {
        return await this.request('get', `${this.communityApi}community/${community_id}/members`, obj, false);
    }

    async channelInfo(community_id: string, channel_id: string) {
        return await this.request('get', `${this.communityApi}community/${community_id}/channel/${channel_id}`, undefined, false);
    }

    async channelTimeline(community_id: string, channel_id: string, obj: any) {
        return await this.request('get', `${this.communityApi}timeline/${community_id}/channel/${channel_id}`, obj, false);
    }

    /* /community */

    /* search */
    async search(obj: any) {
        return await this.request('get', `${this.communityApi}search`, obj, false)
    }

    /* /search */

    /* fcm */
    async saveFcmToken(user_id: number, token: string) {
        return await this.request('post', `${this.communityApi}fcm/${user_id}?token="${token}`, undefined, false)
    }

    async removeFcmToken(user_id: number) {
        return await this.request('post', `${this.communityApi}fcm/${user_id}`, undefined, false);
    }

    /* /fcm */


    /* post */

    async uploadPost(obj: any) {
        return await this.request('post', `${this.communityApi}post`, obj, false);
    }

    async updatePost(obj: any) {
        return await this.request('put', `${this.communityApi}post/${obj.post_id}`, obj, false);
    }

    async likeList(obj: any) {
        return await this.request('get', `${this.communityApi}post/${obj.post_id}/like/list`, obj, false)
    }

    async like(post_id: string) {
        return await this.request('post', `${this.communityApi}post/${post_id}/like`, undefined, false);
    }

    async unlike(post_id: string) {
        return await this.request('post', `${this.communityApi}post/${post_id}/unlike`, undefined, false);
    }

    async feed(post_id: string) {
        return await this.request('get', `${this.communityApi}post/${post_id}`, undefined, false)
    }

    async deletePost(post_id: string) {
        return await this.request('delete', `${this.communityApi}post/${post_id}`, undefined, false);
    }

    async retweet(post_id: string) {
        return await this.request('post', `${this.communityApi}post/${post_id}/retweet`, undefined, false);
    }

    async userPostCnt(user_id: number) {
        return await this.request('get', `${this.communityApi}user/${user_id}/totalPost`, undefined, false);
    }

    /* /post */

    /* comment */
    async comments(post_id: string, obj: any) {
        return await this.request('get', `${this.communityApi}post/${post_id}/comment/list`, obj, false)
    }

    async sendComment(obj: any) {
        return await this.request('post', `${this.communityApi}post/${obj.post_id}/comment`, obj, false)
    }

    async deleteComment(post_id: string, comment_id: string) {
        return await this.request('delete', `${this.communityApi}post/${post_id}/comment/${comment_id}`, undefined, false);
    }

    async updateComment(obj: any) {
        return await this.request('post', `${this.communityApi}post/${obj.post_id}/comment/${obj.comment_id}`, obj, false)
    }

    async likeComment(post_id: string, comment_id: string) {
        return await this.request('post', `${this.communityApi}post/${post_id}/comment/${comment_id}/like`, undefined, false);
    }

    async unlikeComment(post_id: string, comment_id: string) {
        return await this.request('post', `${this.communityApi}post/${post_id}/comment/${comment_id}/unlike`, undefined, false);
    }

    /* /comment */

    /* game */
    async projectList() {
        const response = await this.request('get', `${studioApi}studio/project`, undefined, false);
        return response.result || response;
    }

    async getProject(id: any) {
        const response = await this.request('get', `${zempieApi}community/project/${id}`, undefined, false);
        return response.result || response;
    }

    async userChannel(channel_id) {
        const response = await this.request('get', `${zempieApi}channel/${channel_id}`, undefined, false);
        return response.result || response;
    }

    async gameInfo(pathname: string) {
        return await this.request('get', `/launch/game/${pathname}`, undefined, false)
    }

    async gameTimeline(obj: any) {
        return await this.request('get', `${this.communityApi}timeline/game/${obj.game_id}`, obj, false)

    }

    async officalGameList(obj) {
        return await this.request('get', `${zempieApi}games`, obj, false);
    }

    /* /game */

    /* report */
    async reportPost(obj) {
        return await this.request('post', `${this.communityApi}post/${obj.post_id}/report`, obj, false);
    }

    /* /report */


    //USER
    async joinedCommunityList(user_id: number) {
        return await this.request('get', `${this.communityApi}user/${user_id}/list/community`, undefined, false)
    }

    async follow(user_id: number) {
        return await this.request('post', `${this.communityApi}user/${user_id}/follow`, undefined, false);
    }

    async unfollow(user_id: number) {
        return await this.request('post', `${this.communityApi}user/${user_id}/unfollow`, undefined, false);
    }

    async followingList(obj: any, user_id: any) {
        return await this.request('get', `${this.communityApi}user/${user_id}/list/following`, obj, false);
    }

    async followerList(obj: any, user_id: any) {
        return await this.request('get', `${this.communityApi}user/${user_id}/list/follower`, obj, false);
    }

    async userTimeline(channel_id: string, obj: any) {
        return await this.request('get', `${this.communityApi}timeline/channel/${channel_id}`, obj, false)
    }

    async userMute(user_id: number) {
        return await this.request('post', `${this.communityApi}member/${user_id}/mute`, undefined, false)
    }

    async userBlock(user_id: number) {
        return await this.request('post', `${this.communityApi}member/${user_id}/mute`, undefined, false)
    }

    async session() {
        const response = await this.request('get', '/user/verify-session', undefined, true);
        return response.result || response;
    }

    async user() {
        const response = await this.request('get', '/user/info', undefined, true);
        return response.result || response;
    }

    async verifyEmail() {
        const response = await this.request('post', '/user/verify-email', undefined, false);
        return response.result || response;
    }

    async channel(channel_id: any) {
        //id가 string인 경우와 number인 경우 분리
        const stringCheck = /^[0-9+]*$/;
        let result;
        if (!stringCheck.test(channel_id)) {
            result = this.request('get', `/community/channel/${channel_id}`, undefined, false);
        }
        else {
            result = this.request('get', `/community/user/${channel_id}`, undefined, false);
        }
        return result;

    }

    async verifyChannelId(channel_id: any) {

        const response = await this.request('post', `/user/verify-channel`, {
            channel_id
        }, false);

        // const response = await this.request( Vue.$axios.post(`/user/verify-channel`, {
        //     channel_id
        // }) );
        return response.result || response;
    }

    async signUp(obj: any) {
        // Ads.gtag_report_conversion()
        const response = await this.request('post', `/user/sign-up`, obj, true);
        return response.result || response;
    }

    async hasNickname(nickname: string){
        return await this.request('post', `/user/has-nickname`, {nickname}, true)
    }

    async signOut() {
        const response = await this.request('post', `/user/sign-out`, undefined, true);
        return response.result || response;
    }

    async updateUser(formData) {
        // const formData = new FormData();
        // if (name) {
        //     formData.append('name', name);
        // }
        // if (state_msg) {
        //     formData.append('state_msg', state_msg);
        // }
        // if (file) {
        //     formData.append('file', file);
        // }
        // if (channel_id) {
        //     formData.append('channel_id', channel_id);
        // }
        // if (description) {
        //     formData.append('description', description);
        // }

        const response = await this.request('post', `/user/update/info`, formData, false);
        return response.result || response;
    }

    async updateBanner(file: File) {
        const formData = new FormData();
        if (file) {
            formData.append('file', file);
        }

        const response = await this.request('post', `/user/update/banner`, formData, false);
        return response.result || response;
    }

    async leave(text: string, num: string = '0') {

        const response = await this.request('post', `/user/leave-zempie`, {
            num,
            text,
        }, false);

        return response.result || response;
    }

    async hasEmail(email: string) {
        return await this.request('post', `/user/has-email`, {email}, true);
    }

    /* 파일 업로드 */

    //multiple file 되는건가!
    async fileUploader(formData: FormData) {
        const response = await this.request('POST', `/community/att`, formData, false);
        return response.result || response;


    }

    /* 파일 업로드 */

    //GAME
    async games(limit: number = 100, offset: number = 0, category: number, sort: string, dir: string) {

        let url = `/games?limit=${limit}&offset=${offset}`;
        if (category !== undefined) {
            url += `&category=${category}`;
        }
        if (sort !== undefined) {
            url += `&sort=${sort}`;
        }
        if (dir !== undefined) {
            url += `&dir=${dir}`;
        }

        const response = await this.request('get', url, {
            limit,
            offset,
            category,
            sort,
            dir,
        }, false);
        return response.result || response;
    }

    async game(pathname: string) {
        const response = await this.request('get', `/game/${pathname}`, undefined, false);
        return response.result || response;
    }

    async searchGame(tag) {
        const response = await this.request('get', `/games/s/${tag}`, undefined, false);
        return response.result || response;
    }

    async featured() {
        const response = await this.request('get', `/featured`, undefined, false);
        return response.result || response;
    }

    async hashtags(tag) {
        const response = await this.request('get', `/games/hashtags/${tag}`, undefined, false);
        return response.result || response;
    }

    async tagged(id) {
        const response = await this.request('get', `/games/tagged/${id}`, undefined, false);
        return response.result || response;
    }

    /**
     * studio
     * */

    async createProject(options: { name?: string, description?: string, hashtags?: string, pathname?: string, project_picture?: File, project_picture2?: File },
                        updateVersion: { version?: string, autoDeploy?: boolean, startFile?: string, size?: number, version_description?: string }, files: File[]) {

        const formData = new FormData();
        for (let k in options) {
            formData.append(k, options[k]);
        }

        for (let k in updateVersion) {
            formData.append(k, updateVersion[k]);
        }

        for (let i = 0; i < files.length; i++) {
            const file = files[i] as File;
            formData.append(`file_${i + 1}`, file);
        }


        const response = await this.request('post', `${studioApi}studio/project`, formData, false);
        return response.result || response;
    }

    async createVersion(project_id: number, version: string, files: File[], startFile: string, autoDeploy: boolean, size: number, description: string, stage: string) {
        //파일 업로드
        const formData = new FormData();
        formData.append('project_id', project_id.toString());
        formData.append('version', version);
        formData.append('startFile', startFile);
        formData.append('autoDeploy', String(autoDeploy));
        formData.append('description', description);
        formData.append('stage', stage);

        if (size) {
            formData.append('size', size.toFixed(2));
        }

        for (let i = 0; i < files.length; i++) {
            const file = files[i] as File;
            formData.append(`file_${i + 1}`, file);
        }

        const response = await this.request('post', `${studioApi}studio/version`, formData, false);
        return response.result || response;
    }

    async confirmGamePath(pathname: string) {
        const response = await this.request('get', `${studioApi}studio/verify-pathname/${pathname}`, undefined, false);
        return response.result || response;
    }

    async updateProject(options: { id: number, name?: string, description?: string, hashtags?: string, deploy_version_id?: string, stage?: string }, file?: File, file2?: File) {
        //파일 업로드
        const formData = new FormData();
        if (options.id) { formData.append('id', options.id.toString()); }
        if (options.name) { formData.append('name', options.name); }
        if (options.description) { formData.append('description', options.description); }
        if (options.hashtags) { formData.append('hashtags', options.hashtags); }
        else { formData.append('hashtags', ""); }
        if (options.stage) { formData.append('stage', options.stage); }
        if (options.deploy_version_id !== undefined) { formData.append('deploy_version_id', options.deploy_version_id); }
        if (file) {
            formData.append('file', file);
        }
        if (file2) {
            formData.append('file2', file2);
        }


        const response = await this.request('post', `${studioApi}studio/project/${options.id}`, formData, false);

        // if (!response.error) {
        //     store.commit('project', response.result)
        // }

        return response.result || response;
    }

    async deleteVersion(id) {
        const response = await this.request('delete', `${studioApi}studio/version/${id}`, undefined, false);
        return response.result || response;
    }

    async deleteProject(id) {
        const response = await this.request('delete', `${studioApi}studio/project/${id}`, undefined, false);
        return response.result || response;
    }


}


declare module 'vue/types/vue' {
    interface Vue {
        $api: Api,
    }

    interface VueConstructor {
        $api: Api,
    }
}

const _api = new Api();
const Plugin: PluginObject<any> = {
    install: (Vue) => {
        Vue.$api = _api;
    },
};
Plugin.install = (Vue) => {
    Vue.$api = _api;
    Object.defineProperties(Vue.prototype, {
        $api: {
            get() {
                return _api;
            },
        },
    });
};

Vue.use(Plugin);