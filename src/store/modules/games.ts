import Vue from 'vue';
import {LoginState} from "src/store/modules/user";


enum GameLoadState {
    none,       //로드전
    loading,    //로드중
    loaded,     //로드완료
    complete,   //모든게임 로드완료
}

export {
    GameLoadState,
}

export default {
    state: {
        gameList: [],
        gameInfo: {},

        limit : 20,

        officialGames : [],
        challengeGames : [],
        affiliateGames : [],


        crtOriginGames : [],
        searchGames : [],
        isSearchGame : false,

        isOfficialPage : true,

        officialLoadState : GameLoadState.none,
        challengeLoadState : GameLoadState.none,
        affiliateLoadState : GameLoadState.none,

        /**
         * 스튜디오
         * */
        gameStage: null,
        sendGameInfoDone: false,
        sendGameFileDone: false,
        gameInfoObj: null,
        gameFileInfoObj: null,
        uploadGameFiles: null,
        zipOriginFile:null,

    },
    getters: {

        gameList: (state: any) => {
            return state.gameList;
        },
        gameInfo: (state: any) => {
            return state.gameInfo;
        },

        officialGames : ( state : any ) =>{
            return state.officialGames;
        },

        challengeGames : ( state : any ) =>{
            return state.challengeGames;
        },

        affiliateGames : ( state : any ) =>{
            return state.affiliateGames;
        },

        officialLoadState : ( state : any ) =>{
            return state.officialLoadState;
        },

        challengeLoadState : ( state : any ) =>{
            return state.challengeLoadState;
        },

        affiliateLoadState : ( state : any ) =>{
            return state.affiliateLoadState;
        },

        gameByTitle : ( state : any ) => (title : string) => {
            let game = state.officialGames.find( (game:any) => game.title === title );
            if( !game ) {
                game = state.challengeGames.find( (game:any) => game.title === title );
            }
            if( !game ) {
                game = state.affiliateGames.find( (game:any) => game.title === title );
            }

            return game;
        },

        gameByPathname : ( state : any ) => (pathname : string) => {
            let game = state.officialGames.find( (game:any) => game.pathname === pathname );
            if( !game ) {
                game = state.challengeGames.find( (game:any) => game.pathname === pathname );
            }
            if( !game ) {
                game = state.affiliateGames.find( (game:any) => game.pathname === pathname );
            }

            return game;
        },

        isSearchGame : ( state : any ) => {
            return state.isSearchGame;
        },
        searchGames : ( state : any ) => {
            return state.searchGames;
        },
        isOfficialPage : ( state : any ) => {
            return state.isOfficialPage;
        },

        /**
         * 스튜디오
         * */
        gameStage: (state: any) => {
            return state.gameStage;
        },
        sendGameInfoDone: (state: any) => {
            return state.sendGameInfoDone;
        },
        sendGameFileDone: (state: any) => {
            return state.sendGameFileDone;
        },
        gameInfoObj: (state: any) => {
            return state.gameInfoObj;
        },
        gameFileInfoObj: (state: any) => {
            return state.gameFileInfoObj;
        },
        uploadGameFiles: (state: any) => {
            return state.uploadGameFiles;
        },
        zipOriginFile: (state: any) => {
            return state.zipOriginFile;
        },
    },

    mutations: {

        gameList: (state: any, payload: any) => {
            state.gameList = payload;
        },
        gameInfo: (state: any, payload: any) => {
            state.gameInfo = payload;
        },

        officialGames : ( state : any, payload : any ) => {
            state.officialGames = payload;
        },
        challengeGames : ( state : any, payload : any ) => {
            state.challengeGames = payload;
        },
        affiliateGames : ( state : any, payload : any ) => {
            state.affiliateGames = payload;
        },
        officialLoadState : ( state : any, payload : any ) => {
            state.officialLoadState = payload;
        },
        challengeLoadState : ( state : any, payload : any ) => {
            state.challengeLoadState = payload;
        },
        affiliateLoadState : ( state : any, payload : any ) => {
            state.affiliateLoadState = payload;
        },

        isSearchGame : ( state : any, payload : any ) => {
            state.isSearchGame = payload;
        },
        searchGames :  ( state : any, payload : any ) => {
            state.searchGames = payload;
        },
        isOfficialPage :  ( state : any, payload : any ) => {
            state.isOfficialPage = payload;
        },
        /**
         * 스튜디오
         * */

        gameStage: (state: any, payload: any) => {
            state.gameStage = payload;
        },
        sendGameInfoDone: (state: any, payload: any) => {
            state.sendGameInfoDone = payload;
        },
        sendGameFileDone: (state: any, payload: any) => {
            state.sendGameFileDone = payload;
        },
        gameInfoObj: (state: any, payload: any) => {
            state.gameInfoObj = payload;
        },
        gameFileInfoObj: (state: any, payload: any) => {
            state.gameFileInfoObj = payload;
        },
        uploadGameFiles: (state: any, payload: any) => {
            state.uploadGameFiles = payload;
        },
        zipOriginFile: (state: any, payload: any) => {
            state.zipOriginFile = payload;
        },
    },
    actions: {
        clearGames : async (context : any, category : number = 1) => {
            const gameKeys = [ 'challengeGames', 'officialGames', 'affiliateGames' ];
            const stateKeys = [ 'challengeLoadState', 'officialLoadState', 'affiliateLoadState' ];
            const gameKey = gameKeys[category];
            const stateKey = stateKeys[category];

            context.commit(gameKey, []);
            context.commit( stateKey, GameLoadState.none );
        },

        loadGames : async (context : any, {category, sort, dir} ) => {

            //dir = asc, desc

            const gameKeys = [ 'challengeGames', 'officialGames', 'affiliateGames' ];
            const stateKeys = [ 'challengeLoadState', 'officialLoadState', 'affiliateLoadState' ];
            const gameKey = gameKeys[category];
            const stateKey = stateKeys[category];

            if ( context.state[stateKey] === GameLoadState.none ||
                context.state[stateKey] === GameLoadState.loaded) {

                const limit = context.state.limit;
                const offset = context.state[gameKey].length;
                context.commit( stateKey, GameLoadState.loading );

                const result = await Vue.$api.games(limit, offset, category, sort, dir);
                if( !result || result.error ) {
                    result && result.error && console.error( result.error );
                    context.commit(gameKey, []);
                    context.commit( stateKey, GameLoadState.complete );
                    return [];
                }

                let { games } = result;
                let arr = context.state[gameKey].slice();
                arr = arr.concat( games );

                context.commit(gameKey, arr);

                if( games.length < limit ) {
                    context.commit( stateKey, GameLoadState.complete );
                }
                else {
                    context.commit( stateKey, GameLoadState.loaded );
                }

                return arr;
            }
            else if( context.state[stateKey] === GameLoadState.loading ) {
                await function () {
                    return new Promise((resolve, reject) => {
                        function wait() {
                            if ( context.state[stateKey] === GameLoadState.loading ) {
                                setTimeout(wait, 500);
                            } else {
                                return resolve(null);
                            }
                        }
                        wait();
                    })
                }
            }
            return context.state[gameKey];
        },

    }
}

