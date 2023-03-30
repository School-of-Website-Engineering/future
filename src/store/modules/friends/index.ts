import { defineStore } from 'pinia';
import UserFriendsService, { IUserFriendsResponse, IUserFriendsPendingResponse } from '@/api/friends';

/**
 * 用于管理用户好友的 Pinia 存储。
 */
export const useUserFriendsStore = defineStore('menu', {
    state: () => ({
        /**
         * 用户好友列表。
         *
         * @type {IUserFriendsResponse[]}
         */
        friends: [] as IUserFriendsResponse[],
        /**
         * 用户待定好友列表。
         * @type {IUserFriendsPendingResponse[]}
         */
        pendingFriends: [] as IUserFriendsPendingResponse[],
    }),

    getters: {},

    actions: {
        /**
         * 异步从 API 检索用户好友列表，并设置“friends”状态属性。
         *
         * @async
         */
        async getFriends() {
            /**
             * 检索用户好友 API 调用的响应对象。
             *
             * @type {object}
             * @property {IUserFriendsResponse} data - 包含用户好友列表的响应数据。
             * @property {number} code - 表示成功或失败的响应代码。
             */
            const { data, code } = await UserFriendsService.getUserFriends();

            if (code === 0) {
                this.friends = data.friends || [];
            }
        },
        /**
         * 异步从 API 检索用户待定好友列表，并设置“pendingFriends”状态属性。
         * @async
         */
        async getPendingFriends() {
            /**
             * 检索用户待定好友 API 调用的响应对象。
             *
             * @type {object}
             * @property {IUserFriendsPendingResponse} data - 包含用户待定好友列表的响应数据。
             * @property {number} code - 表示成功或失败的响应代码。
             */
            const { data, code } = await UserFriendsService.getUserFriendsPending();

            if (code === 0) {
                this.pendingFriends = data.friends || [];
                console.log('---------待定好友列表---------');
                console.log('pendingFriends', this.pendingFriends);
            }
        },
    },
});
