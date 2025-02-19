<template>
	<StatusBar />
	<!-- 顶部导航 -->
	<TopBar />
	<!-- 直播、推荐、热门、分区 -->
	<NavTabs :activeTab="currentTab" :tabs="tabs" @tabChange="handleTabChange" />
	<!-- 主要内容区域 -->
	<scroll-view scroll-y class="container" @scrolltolower="fetchData" lower-threshold="200rpx"
		:refresher-enabled="isLoadingTop" :refresher-triggered="isTriggeredTop" @refresherrefresh="handleRefresher">
		<component :is="currentComponent" ref="currentComponentRef"></component>
	</scroll-view>

</template>

<script>
	import TopBar from "@/components/top-bar.vue"
	import NavTabs from "@/components/nav-tabs.vue"
	import Recommend from "@/pages/index/recommend.vue"
	import Hot from "@/pages/index/hot.vue"
	import Live from "@/pages/index/live.vue"
	import Zones from "@/pages/index/zones.vue"
	export default {
		components: {
			TopBar,
			NavTabs,
			Recommend,
			Hot,
			Live,
			Zones
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
				isTriggeredTop: false // 初始时不显示下拉刷新动画


			}
		},
		onLoad() {},
		computed: {
			currentComponent() {
				return this.currentTab === "live" ?
					"Live" :
					this.currentTab === "hot" ?
					"Hot" :
					this.currentTab === "zones" ?
					"Zones" :
					"Recommend";
			}
		},
		methods: {
			handleTabChange(tab) {
				this.currentTab = tab;
				console.log('当前Tab:', this.currentTab);
			},
			fetchData() { // 父组件调用子组件的fetchData方法
				this.isLoading = true; // 标记正在加载中，防止多次请求
				console.log("fetch");
				const childComponent = this.$refs.currentComponentRef;
				if (childComponent && typeof childComponent.fetchVideos === 'function') {
					childComponent.fetchVideos().then(() => {
						this.isLoading = false;
					}).catch(() => this.isLoading = false); // 加载更多数据
				}
			},
			handleRefresher() {
				console.log("顶部下拉刷新s>>>", this.isLoadingTop, this.isTriggeredTop);
				if (this.isLoading) return; // 如果正在加载中，直接返回
				this.isLoadingTop = true;
				this.isTriggeredTop = true;
				this.isLoading = true;
				console.log("fetch");
				const childComponent = this.$refs.currentComponentRef;
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
			}



		}
	}
</script>

<style>
	.container {
		display: flex;
		flex-direction: column;
		height: 1274rpx;
		/* height:100%; */
	}

	.bottom-nav-tabs {
		position: sticky;
		bottom: 0rpx;
		z-index: 999;
		background-color: #fff;
		display: flex;
		justify-content: space-around;
		padding: 15rpx 0;
		border-top: 2rpx #d5d5d5 solid;
	}

	.tab {
		font-size: 32rpx;
		color: #69686d;
	}

	.tab.active {
		color: #fe58a4;
		font-weight: bold;
		border-bottom: 4rpx solid #fe58a4;
	}
</style>