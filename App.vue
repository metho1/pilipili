<!-- 监听应用生命周期、配置全局样式、配置小程序全局变量globalData -->
<script>
	import {
		useUserStore
	} from '@/store/user.js'
	export default {
		setup() {
			return {
				userStore: useUserStore() // 提前初始化store
			}
		},
		onLaunch: function() { //当uni-app 初始化完成时触发（全局只触发一次）
			console.log('App Launch');
			this.userStore.checkLogin(); // store中封装验证逻辑
		},
		onShow: function() { //当 uni-app 启动，或从后台进入前台显示，
			console.log('App Show');
			if (!this.userStore.token) {
				uni.showModal({
					title: '提示',
					content: '需要登录才能继续操作',
					confirmText: '去登录',
					success(res) {
						if (res.confirm) uni.navigateTo({
							url: '/pages/login/login'
						});
					}
				});
			}
		},
		onHide: function() { //当 uni-app 从前台进入后台
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>