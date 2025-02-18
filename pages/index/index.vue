<template>
	<StatusBar />
	<!-- 顶部导航 -->
	<TopBar />
	<!-- 直播、推荐、热门、分区 -->
	<NavTabs :activeTab="currentTab" :tabs="tabs" @tabChange="handleTabChange" />
	<!-- 主要内容区域 -->
	<scroll-view scroll-y class="container" @scroll="scrollm(event)">
		<component :is="currentComponent"></component>
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
				]

			}
		},
		onLoad() {
			console.log(1);
		},
		onPageScroll(e) {
			// e.scrollTop 表示当前页面滚动的距离
			console.log('页面滚动距离：', e.scrollTop);
			// 在这里编写你的滚动相关逻辑
		},
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
			scrollm(event) {
				console.log("2");
				console.log(event.detail.scrollTop);
				console.log(event.detail.deltaX);
				console.log(event.detail.deltaY);
				// event.detail.scrollTop;
			}

		},

	}
</script>

<style>
	.container {
		display: flex;
		flex-direction: column;
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