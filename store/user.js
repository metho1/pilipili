// 全局状态管理 Pinia
import {
	defineStore
} from 'pinia';
import {
	API_RESOURCES_URL
} from '@/config/api.js';
import {
	API_BASE_URL
} from '@/config/api.js';
const validateToken = async (token) => {
	return !!token
}
export const useUserStore = defineStore('user', {
	state: () => ({
		token: uni.getStorageSync('token') || '',
		userInfo: uni.getStorageSync('userInfo') || null
	}),
	actions: {
		// 更新用户信息
		setUser(data) {
			this.token = data.token;
			this.userInfo = {
				userid: data.userid,
				avatar: API_RESOURCES_URL + data.avatar,
				username: data.username
			};
		},
		async checkLogin() {
			if (this.token && await validateToken(this.token)) {
				return true;
			}
			this.logout();
			return false;
		},
		logout() {
			uni.request({
				url: API_BASE_URL + 'user/logout',
				method: 'POST',
				header: {
					token: this.token
				},
				success: () => {
					uni.removeStorageSync('token');
					uni.removeStorageSync('userInfo');
					this.$reset();
				},
				fail: () => {
					uni.showToast({
						title: '退出登录失败',
						icon: 'none'
					});
				}
			});
		}
		
		
		
	}
});