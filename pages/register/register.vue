<template>
	<StatusBar />
	<view class="top-bar">
		<view class="left">
			<uni-icons type="left" size="50rpx" @click="back"></uni-icons>
			<text class="title">邮箱登录/注册</text>
		</view>
		<text class="right" @click="goToLogin">密码登录</text>
	</view>
	<view class="container">
		<!-- 邮箱输入框 -->
		<view class="form-item">
			<text class="label">邮箱</text>
			<input class="input" v-model="email" placeholder="请输入邮箱" focus cursor-color="#fe58a4" @confirm="getCaptcha"
				confirm-type="send" />
			<!-- :class="{'get-captcha-disabled': emailDisabled}" -->
			<button class="get-captcha" @click="getCaptcha" plain
				:disabled="getCaptchaDisabled">{{getCaptchaText}}</button>
		</view>
		<!-- 验证码输入框 -->
		<view class="form-item">
			<text class="label">验证码</text>
			<input class="input" v-model="captcha" placeholder="请输入验证码" type="number" cursor-color="#fe58a4"
				maxlength="6" />
		</view>
		<!-- 登录按钮 -->
		<view class="button">
			<button class="register-button" :class="{'register-button-disabled': registerDisabled}" @click="register"
				:disabled="registerDisabled">验证登录</button>
		</view>
		<!-- 用户协议 -->
		<view class="agreement">
			<checkbox class="checkbox" :checked="isAgreed" @click="toggleAgreement" activeBackgroundColor="#fe58a4"
				active-border-color="#fe58a4" icon-color="#fff" />
			<text class="agreement-text">我已阅读并同意用户协议和隐私政策，未注册绑定的邮箱验证成功后将自动注册</text>
		</view>
	</view>
</template>

<script>
	import {
		API_BASE_URL
	} from '@/config/api.js';
	import {
		API_RESOURCES_URL
	} from '@/config/api.js';
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
				email: '', // 邮箱
				captcha: '', // 验证码
				getCaptchaText: '获取验证码', // 验证码按钮文字
				getCaptchaDisabled: false, // 验证码按钮是否禁用
				isAgreed: false, //是否同意协议
				countdown: 60 //倒计时
			}
		},
		computed: {
			registerDisabled() { // 计算属性：判断登录按钮是否禁用
				return !this.email || !this.captcha;
			}
		},
		methods: {
			goToLogin() {
				uni.redirectTo({
					url: '/pages/login/login'
				});
			},
			back() {
				uni.redirectTo({
					url: '/pages/index/index'
				});
			},
			register() {
				// 如果未勾选协议，弹出提示
				if (!this.isAgreed) {
					uni.showToast({
						title: '请先同意用户协议',
						icon: 'none',
					});
					return;
				}
				// 注册逻辑
				console.log('邮箱:', this.email);
				console.log('验证码:', this.captcha);
				// 显示加载状态
				uni.showLoading({
					title: '验证中...',
					mask: true
				});
				// 发送验证请求
				uni.request({
					url: API_BASE_URL + 'user/register', // 根据实际接口修改
					method: 'POST',
					data: {
						email: this.email,
						captcha: this.captcha
					},
					success: (res) => {
						uni.hideLoading();
						console.log(res);
						console.log(res.data);
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
								title: res.data.msg || '验证码错误',
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
			},
			getCaptcha() { // 获取验证码
				if (!this.email) {
					uni.showToast({
						title: '请输入邮箱',
						icon: 'none'
					});
					return;
				};
				// 邮箱格式验证
				const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
				if (!emailRegex.test(this.email)) {
					uni.showToast({
						title: '邮箱格式不正确',
						icon: 'none'
					});
					return;
				}
				this.getCaptchaDisabled = true;
				uni.showLoading({
					title: '发送中...',
					mask: true
				});
				// API请求发送验证码
				uni.request({
					url: API_BASE_URL + 'user/email',
					method: 'POST',
					data: {
						email: this.email
					},
					success: (res) => {
						uni.hideLoading();
						if (res.data.code === 200) {
							uni.showToast({
								title: '验证码已发送'
							});
							this.startCountdown();
						} else {
							uni.showToast({
								title: res.data.msg || '发送失败',
								icon: 'none'
							});
							this.getCaptchaDisabled = false;
						}
					},
					fail: () => {
						uni.hideLoading();
						uni.showToast({
							title: '网络请求失败',
							icon: 'none'
						});
						this.getCaptchaDisabled = false;
					}
				});
			},
			startCountdown() { // 开始倒计时
				this.countdown = 60;
				const timer = setInterval(() => {
					if (this.countdown > 0) {
						this.countdown--;
						this.getCaptchaText = `${this.countdown}s后重新获取`;
					} else {
						clearInterval(timer);
						this.getCaptchaText = '获取验证码';
						this.getCaptchaDisabled = false;
					}
				}, 1000);
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

	.get-captcha {
		position: absolute;
		top: 286rpx;
		right: 40rpx;
		border: 0rpx !important;
		background-color: #fff !important;
		font-size: 28rpx;
		color: #fe58a4 !important;
	}

	.button {
		display: flex;
		justify-content: space-around;
	}

	.register-button {
		margin: 20rpx 0rpx;
		width: 650rpx;
		background-color: #fe58a4;
		color: white;
		font-size: 34rpx;
		height: 90rpx;
		line-height: 90rpx;
		border-radius: 50rpx;
	}

	/* 禁用状态下的样式 */
	.register-button-disabled {
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