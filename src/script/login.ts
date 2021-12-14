import firebase from 'firebase/app';
import {LoginState} from "@/store/modules/user";
import store from "@/store"
import Cookie from "@/script/cookie";
import Vue from "vue";
import router from '@/router';
import {AxiosError, AxiosResponse} from "axios";
// import {firebaseInitStartTime} from "boot/firebase";

const cookieName = process.env.VUE_APP_COOKIE_NAME;

class Login {

    static async autoLogin() {
        // console.log('파이어베이스 초기화 : ' +  (Date.now() - firebaseInitStartTime) / 1000 );
        if( store.getters.loginState === LoginState.none ) {
            const currentUser = firebase.auth().currentUser;
            console.log('currentUser', currentUser)

            if ( currentUser ) {

                const idToken = await currentUser.getIdToken();
                // console.log('아이디 토큰 갱신 : ' +  (Date.now() - firebaseInitStartTime) / 1000 );

                store.commit('idToken', idToken);

                /**
                 * 쿠키 있는 경우
                 * */
                //@ts-ignore
                const cookie = Cookie.read( cookieName );
                // console.log( cookie, currentUser.uid, cookie === currentUser.uid );
                if( cookie && cookie === currentUser.uid ) {
                    const result = await Vue.$api.user();

                    // console.log('유저정보 세팅 : ' +  (Date.now() - firebaseInitStartTime) / 1000 );
                    if( !result || result.error ) {
                        await Login.logout();
                    }
                    else {
                        const { user } = result;
                        store.commit('user', user);
                        console.log('user commit')
                        await Login.login();
                    }
                }
                else if( cookie ) {
                    //쿠키는 있지만 기존 사용자랑 다른 상태
                    // console.log('로그아웃(쿠키다름) : ' +  (Date.now() - firebaseInitStartTime) / 1000 );
                    await firebase.auth().signOut();
                }
                else {
                    // console.log('로그아웃(쿠키없음) : ' +  (Date.now() - firebaseInitStartTime) / 1000 );
                    await Login.logout();
                }

                /**
                 * 로컬 스토리지
                 * */

                const local = localStorage.getItem('z_uid')
                console.log('local', local)
                if( local && local === currentUser.uid ) {
                    const result = await Vue.$api.user();

                    // console.log('유저정보 세팅 : ' +  (Date.now() - firebaseInitStartTime) / 1000 );
                    if( !result || result.error ) {
                        await Login.logout();
                    }
                    else {
                        const { user } = result;
                        store.commit('user', user);
                        console.log('user commit')
                        await Login.login();
                    }
                }
                else if(local){
                    await firebase.auth().signOut();
                }else{
                    await Login.logout();
                }
            }
            else {
                //@ts-ignore
                const cookie = Cookie.read(cookieName);
                if( cookie ) {
                    const result = await Vue.$api.session();
                    // console.log('세션 확인 : ' +  (Date.now() - firebaseInitStartTime) / 1000 );
                    // console.log(result);
                    if( !result || result.error ) {
                        await Login.logout();
                    }
                    else {
                        const { customToken } = result;
                        store.commit('loginState', LoginState.customToken );
                        await firebase.auth().signInWithCustomToken( customToken );
                        // console.log('커스텀토큰 로그인 : ' +  (Date.now() - firebaseInitStartTime) / 1000 );
                    }
                }
                else {
                    await Login.logout();
                }
            }


        }
        else if( store.getters.loginState === LoginState.customToken ) {
            const currentUser = firebase.auth().currentUser;
            const idToken = await currentUser!.getIdToken();
            // console.log('커스텀토큰 로그인 - 토큰갱신 : ' +  (Date.now() - firebaseInitStartTime) / 1000 );
            store.commit('idToken', idToken);
            // console.log(idToken);
            const result = await Vue.$api.user();
            // console.log('커스텀토큰 로그인 - 유저 정보 갱신 : ' +  (Date.now() - firebaseInitStartTime) / 1000 );
            if( !result || result.error ) {
                await Login.logout();
            }
            else {
                const { user } = result;
                store.commit('user', user);
                await Login.login();
            }
        }
    }

    static async login() {
        store.commit('loginState', LoginState.login );
        localStorage.setItem('z_uid', store.getters.user.uid)
        //@ts-ignore
        Cookie.write( cookieName, store.getters.user.uid, 30, process.env.VUE_APP_COOKIE_DOMAIN );

        //fcm
        // Vue.$api.saveFcmToken(store.getters.user.id, store.getters.fcmToken)
        //     .then((res: AxiosResponse) => {
        //         console.log('fcm token is registered')
        //     })
        //     .catch((err: AxiosError) => {
        //
        //     })
    }

    static async logout() {
        console.log('logout',store.getters.user)
        await firebase.auth().signOut();
        await store.dispatch('logout');
        // await store.commit('clearMail');
        localStorage.removeItem('z_uid')
        //@ts-ignore
        Cookie.delete( cookieName, process.env.VUE_APP_COOKIE_DOMAIN );

        //fcm
        // if(store.getters.user) {
        //     Vue.$api.removeFcmToken(store.getters.user.id)
        //         .then((res: AxiosResponse) => {
        //             console.log('fcm token is deleted')
        //         })
        //         .catch((err: AxiosError) => {
        //
        //         })
        // }
    }
    

}

export default Login;
