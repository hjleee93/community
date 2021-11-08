import store from '@/store';
import axios, {AxiosInstance} from 'axios'
import Vue, {PluginObject} from "vue";
import firebase from 'firebase/app';


export default class Api {
    private communityApi = process.env.VUE_APP_COMMUNITY_API;

    async request(method: string, url: string, data: any, withCredentials: boolean = false, errorCallback: Function | null = null, retryCount: number = 0): Promise<any> {
        try {
            //파라미터 파싱용

            if (method === 'get' && data) {
                url = url + '?_=' + Date.now()
                for (let d in data) {
                    if (data[d]) url += `&${d}=${data[d]}`
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
            if (error?.response?.data?.error?.code === 10001) {
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

    async communityInfo(id: string) {
        return await this.request('get', `${this.communityApi}community/${id}`, undefined, false);
    };

    async subscribe(obj: any) {
        return await this.request('post', `${this.communityApi}community/${obj.community_id}/subscribe?user_id=${obj.user_id}`, undefined, false);
    }

    async communityTimeline(obj: any) {
        return await this.request('get', `${this.communityApi}timeline/${obj.community_id}/post`, obj, false)
    }

    async joinedCommunityList(obj: any) {
        return await this.request('get', `${this.communityApi}user/${obj.user_id}/list/community`, undefined, false)
    }

    /* /community */

    /* search */
    async search(obj: any) {
        return await this.request('get', `${this.communityApi}search`, obj, false)
    }
    /* /search */

    /* fcm */
   async saveFcmToken(user_id: number, token: string){
        return await this.request('post', `${this.communityApi}fcm/${user_id}?token="${token}`, undefined, false)
    }
    async removeFcmToken(user_id: number){
        return await this.request('post', `${this.communityApi}fcm/${user_id}`, undefined, false);
    }
    /* /fcm */


    /* post */

    async uploadPost(obj:any){
        return await this.request('post', `${this.communityApi}post`, obj, false);
    }
    async likeList(obj:any){
        return await this.request('get',`${this.communityApi}post/${obj.post_id}/like/list`, obj, false )
    }
    async like(post_id: string){
        return await this.request('post', `${this.communityApi}post/${post_id}/like`, undefined, false);
    }
    async feed(post_id: string){
        return await this.request('get', `${this.communityApi}post/${post_id}`, undefined, false)
    }
    /* /post */

    getCommentList(id: number) {
        let result = [
            {
                "id": 1,
                "user_id": 1,
                "parent_id": null,
                "post_id": 111,
                "created_at": 1622615373000,
                "content": "comment~!",
                "state": "public",
                "is_pinned": false,
                "attatchment_file":
                    {
                        "id": 123,
                        "type": "image/png",
                        "size": 15762,
                        "data_unit": "bytes",
                        "url": "https://blush-design.imgix.net/collections/ob0qDoT6RsCX7xcsG6PD/51234a1a-d7ef-41e6-9ec9-75249e850f08.png?w=800&auto=compress&cs=srgb"

                    },
                "like_cnt": 0,
                "dislike_cnt": 0


            }
        ]
        return result;
    }


    //USER
    async userTimeline(obj:any){
        return await this.request('get', `${this.communityApi}timeline/channel/${obj.channel_id}`, obj,false)

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
        const response = await this.request('get', `/channel/${channel_id}`, undefined, false);
        return response.result || response;
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

    async signUp(name: string) {
        // Ads.gtag_report_conversion()
        const response = await this.request('post', `/user/sign-up`, {
            name
        }, true);
        return response.result || response;
    }

    async signOut() {
        const response = await this.request('post', `/user/sign-out`, undefined, true);
        return response.result || response;
    }

    async updateUser(name: string, state_msg: string, file: File, channel_id: string, description: string) {
        const formData = new FormData();
        if (name) {
            formData.append('name', name);
        }
        if (state_msg) {
            formData.append('state_msg', state_msg);
        }
        if (file) {
            formData.append('file', file);
        }
        if (channel_id) {
            formData.append('channel_id', channel_id);
        }
        if (description) {
            formData.append('description', description);
        }

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

    /* 파일 업로드 */
    //multiple file 되는건가!
    async fileUploader(formData: FormData) {
        const response = await this.request('POST', `/community/att`, formData, false);
        return response.result || response;


    }

    /* 파일 업로드 */

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