<template>
	<StatusBar />
	<view class="container">
		<!-- 顶部搜索栏 -->
		<view class="top-bar">
			<uni-icons type="left" size="40rpx;" @click="back"></uni-icons>
			<view class="search-bar">
				<uni-icons type="search" size="36rpx" style="margin-right: 15rpx;"></uni-icons>
				<input style="font-size: 28rpx;width: 390rpx;" v-model="searchText" type="text" focus
					:placeholder="searchHistory[Math.floor(Math.random() * searchHistory.length)]"
					placeholder-style="font-size: 28rpx;" cursor-color="#fe58a4" @confirm="search" />
				<view v-show="searchText" @click="searchText=''"><uni-icons type="clear" size="36rpx"
						color="#69686d;"></uni-icons></view>
			</view>
			<text class="search-btn" @click="search">搜索</text>
		</view>
		<!-- 搜索历史 -->
		<view class="search-history">
			<view class="title">
				<text>搜索历史</text>
				<uni-icons type="trash" size="38rpx;" color="#69686d" @click="clearHistory"></uni-icons>
			</view>
			<view class="history-tags">
				<text v-for="item in searchHistory" :key="item" class="tag" @click="searchFromHistory(item)">
					{{ item }}
				</text>
			</view>
		</view>
		<!-- pilipili热搜 -->
		<view class="hot-search">
			<view class="title">pillipili热搜</view>
			<view v-for="item in hotSearchList" :key="item.id" class="hot-item" @click="goHotSearch(item.title)">
				<text class="hot-text">{{ item.id || ''}} &nbsp;{{ item.title || '' }}</text>
				<view v-show="item.tag" class="hot-tag" :class="item.tagType">{{ item.tag || ''}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { API_BASE_URL } from '@/config/api.js';
	import { useUserStore } from '@/store/user';
	export default {
		setup() {
			const userStore = useUserStore(); // 提前初始化 Store
			return {
				userStore, // 将 userStore 暴露给模板和方法
			};
		},
		data() {
			return {
				searchText: '', // 搜索框输入
				searchHistory: ['元宵', '第五人格', 'deepseek', '捏捏乐', '游戏实况', '元宵', '第五人格', 'deepseek', '捏捏乐',
					'游戏实况'
				], // 模拟搜索历史
				hotSearchList: []
			};
		},
		onLoad() {
			this.fetchHotSearchList(); // 初始化热搜列表
		},
		methods: {
			search() {
				if (!this.searchText.trim()) return;
				if (!this.searchHistory.includes(this.searchText)) {
					this.searchHistory.unshift(this.searchText); // 添加新历史记录
					if (this.searchHistory.length > 10) this.searchHistory.pop(); // 只保存10条
				};
				uni.navigateTo({
					url: `/pages/search/searchResult?query=${this.searchText}`,
					success: () => {
						this.searchText = '';
					}
				});
			},
			back() {
				uni.switchTab({
					url: '/pages/index/index'
				});
			},
			searchFromHistory(item) {
				this.searchText = item;
				this.search(); // 调用 TopSearchBar 组件的 search 方法
			},
			clearHistory() {
				this.searchHistory = [];
			},
			goHotSearch(title) {
				uni.navigateTo({
					url: `/pages/search/searchResult?query=${title}`
				});
			},
			// 获取热搜列表
			async fetchHotSearchList() {
				try {
					const res = await uni.request({
						url: API_BASE_URL+'hotSearchBuss/hotSearch', // 替换为实际的后端接口地址
						method: 'GET',
						header: {token: this.userStore.token}
					});
					if (res.statusCode === 200) {
						this.hotSearchList = res.data; // 更新热搜列表
					} else {
						console.error('请求失败:', res);
						uni.showToast({
							title: '数据加载失败',
							icon: 'none'
						});
					}
				} catch (error) {
					console.error('网络请求错误:', error);
					uni.showToast({
						title: '网络请求失败',
						icon: 'none'
					});
				}
			}

		}
	};
</script>

<style>
	.container {
		display: flex;
		flex-direction: column;
		padding: 20rpx;
	}

	.top-bar {
		display: flex;
		justify-content: space-around;
		align-items: center;
	}

	.search-bar {
		width: 500rpx;
		height: 60rpx;
		border: 1rpx solid #69686d;
		border-radius: 50rpx;
		display: flex;
		align-items: center;
		padding-left: 15rpx;
		position: relative;
	}

	.search-btn {
		color: #fe58a4;
		font-size: 30rpx;
		font-weight: bold;
	}

	.search-history {
		margin-top: 30rpx;
	}

	.title {
		display: flex;
		justify-content: space-between;
		font-size: 30rpx;
		font-weight: bold;
		margin-bottom: 20rpx;
	}

	.history-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 20rpx;
	}

	.tag {
		background: #f7f7f7;
		border-radius: 30rpx;
		padding: 10rpx 30rpx;
		font-size: 28rpx;
		color: #69686d;
		white-space: nowrap;
	}

	.hot-search {
		margin-top: 30rpx;
	}

	.hot-item {
		display: flex;
		align-items: center;
		font-size: 28rpx;
		color: #69686d;
		padding: 10rpx;
		border-bottom: 2rpx solid #d5d5d5;
	}

	.hot-text {
		flex: 1;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.hot-tag {
		padding: 5rpx 10rpx;
		border-radius: 10rpx;
		font-size: 20rpx;
		color: #fff;
	}

	.new {
		background-color: #ffcc00;
	}

	.hot {
		background-color: #ff4444;
	}

	.live {
		background-color: #ff66cc;
	}

	.exclusive {
		background-color: #6633ff;
	}

	.meme {
		background-color: #ff9900;
	}
</style>