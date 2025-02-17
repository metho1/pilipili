<template>
	<StatusBar />
	<view class="container">
		<!-- 顶部搜索栏 -->
		<view class="top-bar">
			<uni-icons type="left" size="40rpx;" @click="back"></uni-icons>
			<view class="search-bar">
				<uni-icons type="search" size="36rpx" style="margin-right: 15rpx;"></uni-icons>
				<input style="font-size: 28rpx;width: 390rpx;" v-model="searchText" type="text" cursor-color="#fe58a4"
					@confirm="search" />
				<view @click="back"><uni-icons type="clear" size="36rpx" color="#69686d;"></uni-icons></view>
			</view>
			<text class="search-btn" @click="search">搜索</text>
		</view>
		<!-- 筛选框 -->
		<NavTabs :activeTab="currentTab" :tabs="tabs" @tabChange="handleTabChange" />
		<!-- 视频搜索结果 -->
		<view v-show="currentTab === 'videos'">
			<RelatedVideos :related-videos="relatedVideos" />
		</view>
		<!-- 用户搜索结果 -->
		<view v-show="currentTab === 'users'"></view>
	</view>
</template>

<script>
	import RelatedVideos from '@/components/related-videos.vue'
	import NavTabs from '@/components/nav-tabs.vue'
	export default {
		components: {
			RelatedVideos,
			NavTabs
		},
		data() {
			return {
				searchText: '',
				debounceTimer: null, //用于防抖的计时器
				currentTab: "videos",
				tabs: [{
						text: "视频",
						value: "videos"
					},
					{
						text: "用户",
						value: "users"
					// },
					// {
					// 	text: '<image src="@/static/views_gray.svg"></image>',
					// 	value: "filter"
					}
				],
				relatedVideos: [{
						videoid: 5,
						title: "我看到的和我画的",
						cover: "https://n.sinaimg.cn//sinakd20122//121//w1441h1080//20200519//7d3b-itvqcca5339779.jpg",
						views: 1169,
						barrages: 5,
						time: '1:07',
						username: 'MORNCOLOUR'
					},
					{
						videoid: 6,
						title: "128秒看完《哪吒2》",
						cover: "https://th.bing.com//th//id//OIF.wGKp55LBt8wSF8rHC2tGsg?w=295&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
						views: 628000,
						barrages: 592,
						time: '2:08',
						username: '神奇的大智'
					},
					{
						videoid: 7,
						title: "今年的新科状元居然是位女子！今年的新科状元居然是位女子！今年的新科状元居然是位女子！今年的新科状元居然是位女子！",
						cover: "https://th.bing.com//th//id//OIP.ECINZWIzQunW4_8_pdbDuAHaEK?w=263&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
						views: 160000,
						barrages: 3230,
						time: '0:15',
						username: '芝士阿毛'
					},
					{
						videoid: 8,
						title: "我看到的和我画的",
						cover: "https://n.sinaimg.cn//sinakd20122//121//w1441h1080//20200519//7d3b-itvqcca5339779.jpg",
						views: 449000,
						barrages: 242,
						time: '1:07',
						username: 'MORNCOLOUR'
					},
					{
						videoid: 9,
						title: "128秒看完《哪吒2》",
						cover: "https://th.bing.com//th//id//OIF.wGKp55LBt8wSF8rHC2tGsg?w=295&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
						views: 628000,
						barrages: 592,
						time: '2:08',
						username: '神奇的大智'
					},
					{
						videoid: 10,
						title: "我看到的和我画的",
						cover: "https://n.sinaimg.cn//sinakd20122//121//w1441h1080//20200519//7d3b-itvqcca5339779.jpg",
						views: 1169,
						barrages: 5,
						time: '1:07',
						username: 'MORNCOLOUR'
					},
					{
						videoid: 11,
						title: "128秒看完《哪吒2》",
						cover: "https://th.bing.com//th//id//OIF.wGKp55LBt8wSF8rHC2tGsg?w=295&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
						views: 628000,
						barrages: 592,
						time: '2:08',
						username: '神奇的大智'
					},
					{
						videoid: 12,
						title: "今年的新科状元居然是位女子！今年的新科状元居然是位女子！今年的新科状元居然是位女子！今年的新科状元居然是位女子！",
						cover: "https://th.bing.com//th//id//OIP.ECINZWIzQunW4_8_pdbDuAHaEK?w=263&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
						views: 160000,
						barrages: 3230,
						time: '0:15',
						username: '芝士阿毛'
					}
				],
			}
		},
		onLoad(options) {
			this.searchText = options.query || ''; // 从 URL 参数中初始化 searchText
		},
		watch: {
			// 监听 searchText 的变化
			searchText: {
				handler(newVal, oldVal) { //监听器的回调函数
					if (this.debounceTimer) {
						clearTimeout(this.debounceTimer); // 清除之前的计时器
					}
					this.debounceTimer = setTimeout(() => {
						if (newVal === '') {
							this.back(); // 在用户停止输入 300ms 后执行
						}
					}, 300); // 设置防抖时间为 300ms
				},
				immediate: true // 立即触发监听器
			}
		},
		methods: {
			back() {
				uni.redirectTo({
					url: '/pages/search/search'
				});
			},
			search() {
				if (!this.searchText.trim()) return;
				// if (!this.searchHistory.includes(this.searchText)) {
				// 	this.searchHistory.unshift(this.searchText); // 添加新历史记录
				// 	if (this.searchHistory.length > 10) this.searchHistory.pop(); // 只保存10条
				// };
				uni.navigateTo({
					url: `/pages/search/searchResult?query=${this.searchText}`
				});
			},
			handleTabChange(tab) {
				this.currentTab = tab;
			}
		}
	}
</script>

<style>
	.container {
		display: flex;
		flex-direction: column;
		padding: 20rpx;
	}

	.top-bar {
		position: sticky;
		top: 0;
		background-color: #fff;
		z-index: 999;
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
</style>