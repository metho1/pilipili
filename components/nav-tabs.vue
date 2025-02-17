<!-- 导航选项卡 -->
<template>
	<view class="nav-tabs">
		<text v-for="(tab,index) in tabs" :key="index" :class="['tab',activeTab === tab.value ? 'active' : '']"
			@click="switchTab(tab.value)">{{ tab.text }}</text>
	</view>
</template>

<script>
	export default {
		name: "NavTabs",
		props: {
			activeTab: String ,//父组件传递当前选中的tab值
			tabs: Array
		},
		data() {
			return {
			};
		},
		methods: {
			switchTab(tab) {
				this.$emit("tabChange", tab);
			}
		}
	}
</script>

<style>
	.nav-tabs {
		position: sticky;
		top: 70rpx;
		z-index: 999;
		background-color: #fff;
		display: flex;
		justify-content: space-around;
		padding: 15rpx 0;
		border-bottom: 2rpx #d5d5d5 solid;
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