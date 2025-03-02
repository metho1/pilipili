<template>
	<StatusBar />
	<view class="top-bar">
		<view class="left">
			<uni-icons type="left" size="50rpx" @click="back"></uni-icons>
			<text class="title">密码登录</text>
		</view>
		<text class="right" @click="goToRegister">验证码登录</text>
	</view>
	<view class="container">
		<!-- 账号输入框 -->
		<view class="form-item">
			<text class="label">账号</text>
			<input class="input" v-model="username" placeholder="请输入用户名或邮箱" focus cursor-color="#fe58a4" />
		</view>
		<!-- 密码输入框 -->
		<view class="form-item">
			<text class="label">密码</text>
			<input class="input" v-model="password" placeholder="请输入密码" password cursor-color="#fe58a4" />
			<text class="forgot-password">忘记密码？</text>
		</view>
		<!-- 登录按钮 -->
		<view class="button">
			<button class="register-button" @click="goToRegister">注册</button>
			<button class="login-button" :class="{'login-button-disabled': loginDisabled}" @click="login"
				:disabled="loginDisabled">登录</button>
		</view>
		<!-- 用户协议 -->
		<view class="agreement">
			<checkbox class="checkbox" :checked="isAgreed" @click="toggleAgreement" activeBackgroundColor="#fe58a4"
				active-border-color="#fe58a4" icon-color="#fff" />
			<text class="agreement-text">我已阅读并同意用户协议和隐私政策</text>
		</view>
	</view>
</template>

<script>
	import {
		API_BASE_URL
	} from '@/config/api';
	import {
		API_RESOURCES_URL
	} from '@/config/api';
	import {
		useUserStore
	} from '@/store/user';
	export default {
		setup() {
			const userStore = useUserStore(); // 提前初始化 Store
			return {
				userStore, // 将 userStore 暴露给模板和方法
			};
		},
		data() {
			return {
				username: '', // 用户名或邮箱
				password: '', // 密码
				isAgreed: false // 是否同意协议
			}
		},
		computed: {
			loginDisabled() { // 计算属性：判断登录按钮是否禁用
				return !this.username || !this.password;
			}
		},
		methods: {
			goToRegister() {
				uni.redirectTo({
					url: '/pages/register/register'
				});
			},
			back() {
				uni.redirectTo({
					url: '/pages/index/index'
				});
			},
			login() {
				// 如果未勾选协议，弹出提示
				if (!this.isAgreed) {
					uni.showToast({
						title: '请先同意用户协议',
						icon: 'none',
					});
					return;
				}
				// 登录逻辑
				console.log('用户名:', this.username);
				console.log('密码:', this.password);
				// 显示加载状态
				uni.showLoading({
					title: '验证中...',
					mask: true
				});
				uni.request({
					url: API_BASE_URL + 'user/login', // 根据实际接口修改
					method: 'POST',
					data: {
						username: this.username,
						password: this.password
					},
					success: async (res) => {
						uni.hideLoading();
						console.log(res);
						if (res.data.code === 200) {
							// 登录状态持久化保存
							uni.setStorageSync('token', res.data.data.token);
							uni.setStorageSync('userInfo', {
								userid: res.data.data.userid,
								avatar: API_RESOURCES_URL + res.data.data.avatar,
								username: res.data.data.username
							});
							// 使用 Pinia 更新用户状态
							this.userStore.setUser(res.data.data);
							// 验证成功处理
							uni.showToast({
								title: '登录成功',
								icon: 'success'
							});
							// 跳转首页（关闭所有页面打开新首页）
							uni.reLaunch({
								url: '/pages/index/index'
							});
						} else {
							// 验证失败处理
							uni.showToast({
								title: res.data.msg || '用户名或密码错误',
								icon: 'none'
							});
						}
					},
					fail: (err) => {
						uni.hideLoading();
						uni.showToast({
							title: '网络请求失败，请重试',
							icon: 'none'
						});
					}
				});

			},
			toggleAgreement() {
				this.isAgreed = !this.isAgreed;
				console.log('是否同意协议:', this.isAgreed);
			}
		}
	}
</script>

<style>
	.top-bar {
		padding: 30rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		box-shadow: 0rpx 6rpx 6rpx #d5d5d5;
	}

	.left {
		display: flex;
		align-items: center;
	}

	.title {
		margin-left: 10rpx;
		font-size: 36rpx;
	}

	.right {
		font-size: 30rpx;
		color: #69686d;
	}

	.container {
		margin-top: 10rpx;
		padding: 30rpx;
		display: flex;
		flex-direction: column;
	}

	.form-item {
		margin-bottom: 30rpx;
		display: flex;
		flex-direction: column;
	}

	.label {
		font-size: 32rpx;
		margin-bottom: 10rpx;
		color: #333;
	}

	.input {
		height: 70rpx;
		padding: 10rpx 20rpx;
		border: 2rpx solid #d5d5d5;
		border-radius: 10rpx;
		font-size: 30rpx;
	}

	.forgot-password {
		margin-top: 20rpx;
		font-size: 28rpx;
		color: #fe58a4;
		text-align: right;
	}

	.button {
		margin: 20rpx 0rpx;
		display: flex;
		justify-content: space-around;
	}

	.register-button {
		width: 300rpx;
		background-color: #ffffff;
		color: #fe58a4;
		font-size: 34rpx;
		height: 90rpx;
		line-height: 90rpx;
		border-radius: 50rpx;
		border: 2rpx solid #fe58a4;
	}

	.login-button {
		width: 300rpx;
		background-color: #fe58a4;
		color: white;
		font-size: 34rpx;
		height: 90rpx;
		line-height: 90rpx;
		border-radius: 50rpx;
	}

	/* 禁用状态下的样式 */
	.login-button-disabled {
		background-color: #fe58a4 !important;
		color: rgba(255, 255, 255, 0.5) !important;
		opacity: 0.5 !important;
	}

	.agreement {
		margin-top: 20rpx;
		display: flex;
		align-items: center;
	}

	.checkbox {
		transform: scale(0.6);
	}

	.agreement-text {
		font-size: 28rpx;
		color: #69686d;
	}
</style>