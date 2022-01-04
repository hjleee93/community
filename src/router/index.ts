import store from '@/store'
import Vue from 'vue'
import VueRouter, {RouteConfig} from 'vue-router'
import Home from '../views/Home.vue'
import {LoginState} from "@/store/modules/user";
import LayoutDefault from "../layout/LayoutDefault.vue";
import LayoutStudio from "@/layout/LayoutStudio.vue"
import LayoutNone from "../layout/LayoutNone.vue";

Vue.use(VueRouter)

// duplicate error
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    //@ts-ignore
    return originalPush.call(this, location).catch(err => {
        if (err.name !== 'NavigationDuplicated') throw err;
    });
};

const routes: Array<RouteConfig> = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        beforeEnter: async function (to, from, next) {
            const loginState = await store.dispatch("loginState");
            switch (loginState) {
                case LoginState.login:
                    if(from.name === 'MyChannel'){
                        window.location.reload();
                    }else{
                        await router.push(`/MyChannel`)
                    }

                    break;
                case LoginState.no_user:
                    await router.push('/landing')
                    break;
                case LoginState.logout:
                    await router.push('/landing')
                    break;
                default:
                    next();
            }
        }
    },
    // {
    //     path: '/update',
    //     name: 'Update',
    //     meta: {
    //         layout: LayoutNone,
    //         title: 'Login',
    //         transition: 'fade-in-down'
    //     },
    //     component: () => import("@/views/Update.vue"),
    // },
    {
        path: '/login',
        name: 'Login',
        meta: {
            layout: LayoutNone,
            title: 'Login',
            transition: 'fade-in-down'
        },
        component: () => import("@/views/Login.vue"),
    },
    {
        path: '/PasswordSearch',
        name: 'PasswordSearch',
        meta: {
            layout: LayoutNone,
            title: 'PasswordSearch',
            transition: 'fade-in-down'
        },
        component: () => import(/* webpackChunkName: "PasswordSearch" */ '@/views/user/PasswordSearch.vue')
    },
    {
        path: '/Landing',
        name: 'Landing',
        meta: {
            layout: LayoutDefault,
            title: 'Landing',
            transition: 'fade-in-down'
        },
        component: () => import(/* webpackChunkName: "Landing" */ '@/views/Landing.vue')
    },

    {
        path: '/Join',
        name: 'Join',
        meta: {
            layout: LayoutNone,
            title: 'Join',
            transition: 'fade-in-down'
        },
        component: () => import(/* webpackChunkName: "Join" */ '@/views/user/Join.vue')
    },
    {
        path: '/googleJoin',
        name: 'GoogleJoin',
        meta: {
            layout: LayoutNone,
            title: 'GoogleJoin',
            transition: 'fade-in-down'
        },
        component: () => import(/* webpackChunkName: "Join" */ '@/views/user/GoogleJoin.vue')
    },
    {
        path: '/user/:channel_id/settings',
        name: 'UserSettingHeader',
        meta: {
            layout: LayoutDefault,
            title: 'UserSetting.vue',
            transition: 'fade-in-down'
        },
        component: () => import("@/views/user/UserSetting.vue"),
        children: [
            {
                path: '/user/:channel_id/settings',
                name: 'UserGeneralSetting.vue',
                meta: {
                    layout: LayoutDefault,
                    title: 'UserGeneralSetting.vue',
                    transition: 'fade-in-down'
                },
                component: () => import("@/components/pages/user/UserGeneralSetting.vue"),
            },
            {
                path: '/user/:channel_id/manageJoinedGroup',
                name: 'ManageJoinedGroup.vue',
                meta: {
                    layout: LayoutDefault,
                    title: 'ManageJoinedGroup',
                    transition: 'fade-in-down'
                },
                component: () => import("@/views/user/ManageJoinedGroup.vue"),
            },

            {
                path: '/user/:channel_id/changePassword',
                name: 'ChangePassword',
                component: () => import("@/views/ChangePassword.vue"),
            },
            {
                path: '/user/:channel_id/followers',
                name: 'FollowerList',
                meta: {
                    layout: LayoutDefault,
                    title: 'FollowerList',
                    transition: 'fade-in-down'
                },
                component: () => import("@/components/pages/user/FollowerList.vue"),
            },
            {
                path: '/user/:channel_id/followings',
                name: 'FollowingList',
                meta: {
                    layout: LayoutDefault,
                    title: 'FollowingList',
                    transition: 'fade-in-down'
                },
                component: () => import("@/components/pages/user/FollowingList.vue"),
            },
            {
                path: '/user/:channel_id/notificationList',
                name: 'NotificationList',
                component: () => import('@/views/NotificationList.vue'),
            },
            {
                path: '/user/:channel_id/messageList',
                name: 'MessageList',
                component: () => import('@/views/MessageList.vue'),
            },
            {
                path: '/user/:channel_id/leave',
                name: 'Leave',
                meta: {
                    layout: LayoutDefault,
                    title: 'Leave',
                    transition: 'fade-in-down'
                },
                component: () => import('@/views/Leave.vue'),
            },
            {
                path: '/user/:channel_id/changePwd',
                name: 'ChangePwd',
                meta: {
                    layout: LayoutDefault,
                    title: 'ChangePwd',
                    transition: 'fade-in-down'
                },
                component: () => import('@/components/pages/user/ChangePwd.vue'),
                props: true
            },
        ]

    },
    {
        path: '/communityList',
        name: 'CommunityList',
        component: () => import(/* webpackChunkName: "about" */ '@/views/group/CommunityList.vue'),
        meta: {
            layout: LayoutDefault,
            title: 'CommunityList',
            transition: 'fade-in-down'
        },
    },
    {
        path: '/community/:community_id/setting',
        name: 'CommunitySettingHeader',
        meta: {
            layout: LayoutDefault,
            title: 'GameTimeline',
            transition: 'fade-in-down'
        },
        props: true,
        component: () => import("@/views/group/CommunitySetting.vue"),
        children: [
            {
                path: '/community/:community_id/setting',
                name: 'CommunitySetting',
                meta: {
                    layout: LayoutDefault,
                    title: 'GameTimeline',
                    transition: 'fade-in-down'
                },
                component: () => import("@/components/pages/community/CommunitySetting.vue"),
            },
            {
                path: '/community/:community_id/setting/member',
                name: 'CommunitySettingMember',
                meta: {
                    layout: LayoutDefault,
                    title: 'CommunitySettingMember',
                    transition: 'fade-in-down'
                },
                component: () => import("@/components/pages/community/CommunitySettingMember.vue"),
            },
            {
                path: '/community/:community_id/setting/channel',
                name: 'ChannelManage',
                meta: {
                    layout: LayoutDefault,
                    title: 'ChannelManage',
                    transition: 'fade-in-down'
                },
                component: () => import("@/components/pages/community/channel/ChannelManage.vue"),
            },
            {
                path: '/community/:community_id/setting/channel/:channel_id',
                name: 'EditChannel',
                meta: {
                    layout: LayoutDefault,
                    title: 'ChannelEdit',
                    transition: 'fade-in-down'
                },
                component: () => import("@/components/pages/community/channel/ChannelEdit.vue"),
            },
            {
                path: '/community/:community_id/channelCreate',
                name: 'ChannelCreate',
                meta: {
                    layout: LayoutDefault,
                    title: 'ChannelCreate',
                    transition: 'fade-in-down'
                },
                component: () => import("@/components/pages/community/channel/ChannelCreate.vue"),
            },
        ]
    },
    {
        path: '/createCommunity',
        name: 'CreateCommunity',
        component: () => import("@/components/pages/community/CommunityCreate.vue"),
    },
    {
        path: '/community/:community_id',
        name: 'Community',
        meta: {
            layout: LayoutDefault,
            title: 'CommunityTimeline',
            transition: 'fade-in-down'
        },
        props: true,
        component: () => import(/* webpackChunkName: "CommunityTimeline" */ "@/views/group/Community.vue"),
        redirect: '/community/:community_id/timeline',
        children: [
            {
                path: '/community/:community_id/timeline',
                name: 'CommunityTimeline',
                meta: {
                    layout: LayoutDefault,
                    title: 'CommunityTimeline',
                    transition: 'fade-in-down'
                },
                props: true,
                component: () => import("@/components/pages/community/CommunityTimeline.vue"),
            },
            {
                path: '/community/:community_id/members',
                name: 'MemberList',
                meta: {
                    layout: LayoutDefault,
                    title: 'MemberList',
                    transition: 'fade-in-down'
                },
                props: true,
                component: () => import("@/views/group/MemberList.vue"),
            },

        ]
    },
    {
        path: '/search',
        name: 'Search',
        meta: {
            layout: LayoutDefault,
            title: 'CommunityTimeline',
            transition: 'fade-in-down'
        },
        component: () => import("@/components/pages/SearchPage.vue"),
        // children: [
        //   {
        //     path: '/search/',
        //     name: 'CommunityTimeline',
        //     component: () => import("@/components/pages/community/Community.vue"),
        //   },
        // ]
    },
    {
        path: '/channel/:channel_id',
        name: 'UserChannel',
        component: () => import("@/views/user/User.vue"),
        redirect: '/channel/:channel_id/timeline',
        meta: {
            layout: LayoutDefault,
            title: 'User',
            transition: 'fade-in-down'
        },
        beforeEnter: async function (to, from, next) {
            const loginState = await store.dispatch("loginState");

            if ((loginState === LoginState.login) && (store.getters.user.channel_id === to.params.channel_id)) {
                await router.push('/myChannel')
            }
            else {
                next();
            }
        },
        children: [
            {
                path: '/channel/:channel_id/timeline',
                name: 'UserTimeline',
                component: () => import("@/components/pages/user/UserTimeline.vue"),
                meta: {
                    layout: LayoutDefault,
                    title: 'UserTimeline',
                    transition: 'fade-in-down'
                },
                beforeEnter: async function (to, from, next) {
                    const loginState = await store.dispatch("loginState");

                    if ((loginState === LoginState.login) && (store.getters.user.channel_id === to.params.channel_id)) {
                        await router.push('/myChannel')
                    }
                    else {
                        next();
                    }
                },
            },
            {
                path: '/channel/:channel_id/followers',
                name: 'Followers',
                component: () => import("@/components/pages/user/FollowerList.vue"),
                meta: {
                    layout: LayoutDefault,
                    title: 'Followers',
                    transition: 'fade-in-down'
                },
            },
            {
                path: '/channel/:channel_id/followings',
                name: 'Followings',
                component: () => import("@/components/pages/user/FollowingList.vue"),
                meta: {
                    layout: LayoutDefault,
                    title: 'Followings',
                    transition: 'fade-in-down'
                },
            },
            {
                path: '/channel/:channel_id/games',
                name: 'AllGameCard',
                component: () => import("@/components/pages/user/AllGameCard.vue"),
                meta: {
                    layout: LayoutDefault,
                    title: 'AllGameCard',
                    transition: 'fade-in-down'
                },
            },
            {
                path: '/channel/:channel_id/portfolio',
                name: 'PortfolioList',
                meta: {
                    layout: LayoutDefault,
                    title: 'PortfolioList',
                    transition: 'fade-in-down'
                },
                component: () => import("@/components/pages/user/portfolio/PortfolioList.vue"),
            },
            {
                path: '/channel/:channel_id/portfolio/:porfolio_id/timeline',
                name: 'PortfolioTimeline',
                meta: {
                    layout: LayoutDefault,
                    title: 'PortfolioTimeline',
                    transition: 'fade-in-down'
                },
                component: () => import("@/components/pages/user/portfolio/PortfolioTimeline.vue"),
            },

        ]
    },
    {
        path: '/timeline/game/:gamePath',
        name: 'Game',
        component: () => import("@/views/game/Game.vue"),
        redirect: '/timeline/game/:gamePath/timeline',
        meta: {
            layout: LayoutDefault,
            title: 'Game',
            transition: 'fade-in-down'
        },
        children: [
            {
                path: '/timeline/game/:gamePath/timeline',
                name: 'GameTimeline',
                meta: {
                    layout: LayoutDefault,
                    title: 'GameTimeline',
                    transition: 'fade-in-down'
                },
                component: () => import("@/components/pages/game/GameTimeline.vue"),
            },
        ]
    },

    /**
    *스튜디오
    **/
    {
        path: '/dashboard',
        name: 'Dashboard',
        meta: {
            layout: LayoutStudio,
            title: 'Dashboard',
            transition: 'fade-in-down'
        },
        component: () => import("@/views/studio/Dashboard.vue"),
    },
    {
        path: '/projectList',
        name: 'ProjectList',
        meta: {
            layout: LayoutStudio,
            title: 'ProjectList',
            transition: 'fade-in-down'
        },
        component: () => import(/* webpackChunkName: "ProjectList" */ '@/views/studio/ProjectList.vue')
    },
    {
        path: '/uploadGame',
        name: 'UploadGame',
        meta: {
            layout: LayoutStudio,
            title: 'UploadGame',
            transition: 'fade-in-down'
        },
        redirect: '/selectStage',
        children: [
            {
                path: '/selectStage',
                name: 'SelectStage',
                meta: {
                    layout: LayoutStudio,
                    title: 'SelectStage',
                    transition: 'fade-in-down'
                },
                component: () => import("@/components/pages/studio/SelectStage.vue"),
            },
            {
                path: '/addGameInfo',
                name: 'AddGameInfo',
                component: () => import(/* webpackChunkName: "about" */ "@/components/pages/studio/AddGameInfo.vue"),
                meta: {
                    layout: LayoutStudio,
                    title: 'AddGameInfo',
                    transition: 'fade-in-down'
                },
            },
            {
                path: '/addGameFile',
                name: 'AddGameFile',
                component: () => import(/* webpackChunkName: "about" */ "@/components/pages/studio/AddGameFile.vue"),
                meta: {
                    layout: LayoutStudio,
                    title: 'AddGameFile',
                    transition: 'fade-in-down'
                },
            },
        ],
        component: () => import(/* webpackChunkName: "GameList" */ '@/views/studio/UploadGame.vue')
    },


    //porfolio

    {
        path: '/createPortfolio',
        name: 'CreatePortfolio',
        component: () => import('@/components/pages/user/portfolio/CreatePortfolio.vue'),
        props: true
    },

    // {
    //     path: '/Home',
    //     name: 'Home',
    //     meta: {
    //         layout: LayoutDefault,
    //         title: 'Home',
    //         transition: 'fade-in-down'
    //     },
    //     component: () => import(/* webpackChunkName: "Home" */ '../views/Home.vue')
    // },
    {
        path: '/feed/:feedId',
        name: 'feedDetail',
        meta: {
            layout: LayoutDefault,
            title: 'FeedDetail',
            transition: 'fade-in-down'
        },
        component: () => import("@/views/post/FeedDetail.vue")
    },
    {
        path: '/play/:pathname',
        name: 'Play',
        component: () => import('@/views/Play.vue'),
        props: true
    },
    {
        path: '/terms',
        name: 'Terms',
        component: () => import('@/views/Terms.vue'),
        meta: {
            layout: LayoutDefault,
            title: 'Terms',
            transition: 'fade-in-down'
        },
    },
    {
        path: '/gameList',
        name: 'GameList',
        component: () => import('@/views/GameList.vue'),
        meta: {
            layout: LayoutDefault,
            title: 'GameList',
            transition: 'fade-in-down'
        },
    },
    {
        path: '/myChannel',
        name: 'MyChannel',
        component: () => import('@/views/user/MyChannel.vue'),
        meta: {
            layout: LayoutDefault,
            title: 'MyChannel',
            transition: 'fade-in-down'
        },
    },
    {
        path: '*',
        component: () => import('@/views/Error404.vue'),
        meta: {
            layout: LayoutNone,
            title: 'Home',
            transition: 'fade-in-down'
        },
    },
    /**
     * 서버 리다이렉트용
     */
    {
        name: 'redirect',
        path: '/redirect*',
        component: () => import( '@/views/Redirect.vue' ),
    },

]

const router = new VueRouter({
    scrollBehavior: () => ({x: 0, y: 0}),
    //@ts-ignore
    mode: process.env.VUE_APP_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE,
    routes
})


router.beforeEach((to, from, next) => {
    if (from.name !== 'redirect') {
        store.commit('fromRouterName', from.name);
    }
    next();
});
export default router
