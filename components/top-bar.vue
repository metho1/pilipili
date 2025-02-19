<!-- 顶部导航栏 -->
<template>
	<view class="top-bar">
		<image class="avatar" src="/static/avatar.jpg" />
		<view class="custom-search-bar" @click="goToSearch">
			<uni-icons type="search" size="36rpx" style="margin-right: 15rpx;"></uni-icons>
			<text>搜索</text>
		</view>
		<uni-icons type="email" size="50rpx"></uni-icons>
	</view>
</template>

<script>
	export default {
		name: "TopBar",
		data() {
			return {

			};
		},
		methods: {
			goToSearch() {
				uni.navigateTo({
					url: '/pages/search/search' // 这里是你的搜索页面路径
				});
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
</style>