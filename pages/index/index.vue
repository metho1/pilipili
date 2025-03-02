<template>
	<StatusBar />
	<!-- 顶部栏 -->
	<view class="top-bar">
		<image class="avatar" :src="userStore.userInfo?.avatar || '/static/avatar.svg'" @click="handleAvatarClick" />
		<view class="custom-search-bar" @click="goToSearch">
			<uni-icons type="search" size="36rpx" style="margin-right: 15rpx;"></uni-icons>
			<text>搜索</text>
		</view>
		<uni-icons type="email" size="50rpx"></uni-icons>
	</view>
	<!-- 导航栏：直播、推荐、热门、分区 -->
	<NavTabs :activeTab="currentTab" :tabs="tabs" @tabChange="handleTabChange" />
	<!-- 主要内容区域 -->
	<scroll-view scroll-y class="container" @scrolltolower="fetchData" lower-threshold="200rpx"
		:refresher-enabled="isLoadingTop" :refresher-triggered="isTriggeredTop" @refresherrefresh="handleRefresher"
		:scroll-top="scrollTop" scroll-with-animation @scroll="handleScroll">
		<!-- <component :is="currentComponent" ref="currentComponentRef"></component> -->
		<Live v-show="currentTab === 'live'" ref="liveRef" />
		<Recommend v-show="currentTab === 'recommend'" ref="recommendRef" />
		<Hot v-show="currentTab === 'hot'" ref="hotRef" />
		<Zones v-show="currentTab === 'zones'" ref="zonesRef" />
	</scroll-view>


</template>

<script>
	import {
		useUserStore
	} from '@/store/user';
	import NavTabs from "@/components/nav-tabs.vue"
	import Recommend from "@/pages/index/recommend.vue"
	import Hot from "@/pages/index/hot.vue"
	import Live from "@/pages/index/live.vue"
	import Zones from "@/pages/index/zones.vue"
	export default {
		components: {
			NavTabs,
			Recommend,
			Hot,
			Live,
			Zones
		},
		setup() {
			const userStore = useUserStore(); // 提前初始化 Store
			return {
				userStore, // 将 userStore 暴露给模板和方法
			};
		},
		data() {
			return {
				currentTab: "recommend",
				tabs: [{
						text: "直播",
						value: "live"
					},
					{
						text: "推荐",
						value: "recommend"
					},
					{
						text: "热门",
						value: "hot"
					},
					{
						text: "分区",
						value: "zones"
					}
				],
				isLoading: false, // 防止多次请求，避免请求过快
				isLoadingTop: true, // 启用下拉刷新功能
				isTriggeredTop: false, // 初始时不显示下拉刷新动画
				scrollTop: 0, //控制 scroll-view 的滚动位置
				currentScrollTop: 0, //存储当前的滚动位置


			}
		},
		onLoad() {},
		onShow() {
			console.log(this.userStore.token);
			console.log(this.userStore.userInfo);
			this.fetchData();
		},
		onReady() {
		},
		computed: {},
		methods: {
			goToSearch() {
				uni.navigateTo({
					url: '/pages/search/search'
				});
			},
			handleTabChange(tab) {
				this.currentTab = tab;
				console.log('当前Tab:', this.currentTab);
				this.scrollTop = this.currentScrollTop; // 先设置为当前滚动位置
				console.log(this.scrollTop);
				this.$nextTick(() => {
					this.scrollTop = 0; // 重置 scrollTop 以触发 scroll-view 回到顶部
					this.currentScrollTop = 0; // 同时清空当前滚动位置
					console.log(this.scrollTop);
				});
			},
			handleScroll(event) {
				this.currentScrollTop = event.detail.scrollTop;
			},
			fetchData() { // 父组件调用子组件的fetchData方法
				if (this.isLoading) return;
				this.isLoading = true; // 标记正在加载中，防止多次请求
				console.log("fetch");
				// const childComponent = this.$refs.currentComponentRef;
				let childComponent = null; // 根据当前 Tab 获取对应的子组件
				switch (this.currentTab) {
					case 'live':
						childComponent = this.$refs.liveRef;
						break;
					case 'recommend':
						childComponent = this.$refs.recommendRef;
						break;
					case 'hot':
						childComponent = this.$refs.hotRef;
						break;
					case 'zones':
						childComponent = this.$refs.zonesRef;
						break;
				}
				// 调用子组件的 fetchVideos 方法
				if (childComponent && typeof childComponent.fetchVideos === 'function') {
					childComponent.fetchVideos().then(() => {
						this.isLoading = false;
					}).catch(() => this.isLoading = false); // 加载更多数据
				} else {
					this.isLoading = false;
				}
			},
			handleRefresher() {
				console.log("顶部下拉刷新s>>>", this.isLoadingTop, this.isTriggeredTop);
				if (this.isLoading) return; // 如果正在加载中，直接返回
				this.isLoadingTop = true;
				this.isTriggeredTop = true;
				this.isLoading = true;
				console.log("refresher");
				// 禁用 scroll-top 的更新
				this.scrollTop = null; // 设置为 null，避免干扰下拉刷新
				// const childComponent = this.$refs.currentComponentRef;
				let childComponent = null; // 根据当前 Tab 获取对应的子组件
				switch (this.currentTab) {
					case 'live':
						childComponent = this.$refs.liveRef;
						break;
					case 'recommend':
						childComponent = this.$refs.recommendRef;
						break;
					case 'hot':
						childComponent = this.$refs.hotRef;
						break;
					case 'zones':
						childComponent = this.$refs.zonesRef;
						break;
				}
				if (childComponent && typeof childComponent.fetchVideos === 'function') {
					childComponent.videos = []; //清空子组件中的视频数据
					childComponent.fetchVideos().then(() => {
						// 数据加载成功
						console.log("数据加载成功");
					}).catch(() => {
						// 数据加载失败
						console.error("数据加载失败");
					}).finally(() => {
						this.isLoading = false; // 无论成功或失败，重置状态
						this.isTriggeredTop = false; // 隐藏下拉刷新动画
					});
				} else {
					// 如果没有子组件，直接重置状态
					this.isLoading = false;
					this.isTriggeredTop = false; // 隐藏下拉刷新动画
				}
			},
			// 处理头像点击事件
			handleAvatarClick() {
				if (this.userStore.token) {
					// 如果用户已登录，弹出确认弹窗
					uni.showModal({
						title: '提示',
						content: '是否退出登录？',
						success: (res) => {
							if (res.confirm) {
								// 用户点击确认，执行退出登录操作
								uni.showLoading({
									title: '退出中...',
									mask: true
								});
								this.userStore.logout(); // 清空本地用户信息
								setTimeout(() => {
									uni.hideLoading();
									uni.reLaunch({
										url: '/pages/login/login'
									});
								}, 1000); // 模拟延迟
							}
						}
					});
				} else {
					// 如果用户未登录，跳转到登录页面
					uni.reLaunch({
						url: '/pages/login/login'
					});
				}
			}
		}

	}
</script>

<style>
	.top-bar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 16rpx 30rpx;
	}

	.avatar {
		width: 72rpx;
		height: 72rpx;
		border-radius: 50%;
	}

	.custom-search-bar {
		width: 400rpx;
		height: 56rpx;
		border: 1rpx solid #69686d;
		border-radius: 50rpx;
		display: flex;
		align-items: center;
		padding-left: 15rpx;
		color: #69686d;
		font-size: 28rpx;
	}

	.container {
		display: flex;
		flex-direction: column;
		height: 1274rpx;
	}
</style>