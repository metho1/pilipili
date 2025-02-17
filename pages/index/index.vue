<template>
	<StatusBar />
	<view class="container">
		<!-- 顶部导航 -->
		<TopBar />
		<!-- 直播、推荐、热门、分区 -->
		<NavTabs :activeTab="currentTab" :tabs="tabs" @tabChange="handleTabChange" />
		<!-- 主要内容区域 -->
		<view v-if="currentTab === 'recommend'">
			<Recommend ref="recommend" />
		</view>
		<view v-if="currentTab === 'hot'">
			<Hot ref="hot" />
		</view>
		<view v-if="currentTab === 'live'">
			<Live ref="live" />
		</view>
		<view v-if="currentTab === 'zones'">
			<Zones ref="zones" />
		</view>
	</view>
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
		methods: {
			handleTabChange(tab) {
				this.currentTab = tab;
				console.log('当前Tab:', this.currentTab);
				// 手动触发 onLoad
				this.$nextTick(() => {
					const currentComponent = this.$refs[this.currentTab];
					if (currentComponent && currentComponent.onLoad) {
						console.log("调用 onLoad");
						currentComponent.onLoad();
					}
				});
			}
		},
	}
</script>

<style>
	.container {
		display: flex;
		flex-direction: column;
	}
</style>