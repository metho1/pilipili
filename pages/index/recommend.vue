<!-- 推荐页面 -->
<template>
	<!-- 轮播图 -->
	<uni-card margin="8rpx" padding="0rpx" spacing="0rpx">
		<swiper style="height: 400rpx;" circular autoplay :interval="2000" indicator-dots indicator-active-color="#fff">
			<swiper-item v-for="(item, index) in banners" :key="index">
				<view class="swiper-item">
					<image :src="item.url" class="banner-image"></image>
					<view class="text-overlay">{{ item.content }}</view>
				</view>
			</swiper-item>
		</swiper>
	</uni-card>
	<!-- 视频列表 -->
	<scroll-view scroll-y>
		<view class="video-container">
			<view v-for="video in videos" :key="video.videoid" class="video-item" @click="gotoVideo(video)">
				<view class="video-image-container">
					<image :src="video.cover" class="video-image"></image>
					<view class="video-time">{{ video.time }}</view>
					<view class="video-stats">
						<image src="@/static/views.svg" class="stats-icon"></image>
						<text class="views_barrages">{{ format(video.views) }}</text>
						<image src="@/static/barrages.svg" class="stats-icon"></image>
						<text class="views_barrages">{{ format(video.barrages) }}</text>
					</view>
				</view>
				<view style="padding: 10rpx 15rpx;">
					<view class="video-title">{{ video.title }}</view>
					<view class="video-uploader"><uni-icons type="person" size="30rpx"></uni-icons>&nbsp;{{ video.username }}
					</view>
				</view>
			</view>
		</view>
	</scroll-view>
</template>

<script>
	import {
		API_BASE_URL
	} from '@/config/api.js';
	export default {
		name: 'Recommend',
		data() {
			return {
				banners: [{
						url: 'https://th.bing.com//th//id//OIP.jDr1vWoSpnzP7_vgLt-98gHaEE?w=325&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7',
						content: '静谧的街道竟暗藏汹涌，真相竟是！'
					},
					{
						url: 'https://th.bing.com//th//id//OIP.oyA5CToKH8-hNNi8J0jUvAHaEK?w=309&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7',
						content: '点击开启你的异世界冒险之旅！'
					},
					{
						url: 'https://th.bing.com//th//id//OIP.dn7iT8uhhGO8OjzUC4wmYwHaEG?w=255&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7',
						content: '周边模玩年度盛典，投稿赢大额流量与万元奖金，快来参与吧！'
					}
				],
				videos: [
					{
						videoid: 1,
						title: "今年的新科状元居然是位女子！",
						cover: "https://th.bing.com//th//id//OIP.ECINZWIzQunW4_8_pdbDuAHaEK?w=263&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
						views: 160000,
						barrages: 3230,
						time: '0:15',
						userid: 1,
						username: '芝士阿毛'
					},
					{
						videoid: 2,
						title: "我看到的和我画的",
						cover: "https://n.sinaimg.cn//sinakd20122//121//w1441h1080//20200519//7d3b-itvqcca5339779.jpg",
						views: 1169,
						barrages: 5,
						time: '1:07',
						userid: 2,
						username: 'MORNCOLOUR'
					},
					{
						videoid: 3,
						title: "deepseek对话chatgpt,谁是真人工智能？deepseek对话chatgpt,谁是真人工智能？",
						cover: "https://th.bing.com//th//id//OIF.Sg5crB34GbbeMPfIUeRYTg?w=287&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
						views: 1109000,
						barrages: 11000,
						time: '16:12',
						userid: 3,
						username: 'DeepSeek小助理'
					},
					{
						videoid: 4,
						title: "128秒看完《哪吒2》",
						cover: "https://th.bing.com//th//id//OIF.wGKp55LBt8wSF8rHC2tGsg?w=295&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
						views: 628000,
						barrages: 592,
						time: '2:08',
						userid: 4,
						username: '神奇的大智'
					},
					{
						videoid: 5,
						title: "今年的新科状元居然是位女子！今年的新科状元居然是位女子！今年的新科状元居然是位女子！今年的新科状元居然是位女子！",
						cover: "https://th.bing.com//th//id//OIP.ECINZWIzQunW4_8_pdbDuAHaEK?w=263&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
						views: 160000,
						barrages: 3230,
						time: '0:15',
						userid: 1,
						username: '芝士阿毛'
					},
					{
						videoid: 6,
						title: "我看到的和我画的",
						cover: "https://n.sinaimg.cn//sinakd20122//121//w1441h1080//20200519//7d3b-itvqcca5339779.jpg",
						views: 449000,
						barrages: 242,
						time: '1:07',
						userid: 2,
						username: 'MORNCOLOUR'
					},
					{
						videoid: 7,
						title: "deepseek对话chatgpt,谁是真人工智能？",
						cover: "https://th.bing.com//th//id//OIF.Sg5crB34GbbeMPfIUeRYTg?w=287&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
						views: 1109000,
						barrages: 11000,
						time: '16:12',
						userid: 3,
						username: 'DeepSeek小助理'
					},
					{
						videoid: 8,
						title: "128秒看完《哪吒2》",
						cover: "https://th.bing.com//th//id//OIF.wGKp55LBt8wSF8rHC2tGsg?w=295&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
						views: 628000,
						barrages: 592,
						time: '2:08',
						userid: 4,
						username: '神奇的大智'
					}
				]
			}
		},
		onLoad(){
			console.log('recommend');
			// this.fetchVideos();
		},
		// activated() {
		//     // 当组件被激活时，调用 onLoad
		//     this.onLoad();
		//   },
		methods: {
			// 获取 fetchVideos 数据
			async fetchVideos() {
				try {
					console.log(2);
					const res = await uni.request({
						url: API_BASE_URL + 'videoBuss/getVideoList',
						method: 'GET',
						// data: {
						// 	videoid: this.videoid
						// }
					});
					if (res.statusCode === 200) {
						console.log(res.data);
						this.videos = res.data.list;
						
						console.log(this.videos);
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
			},
			format(num) {
				if (num >= 10000) {
					let formatted = (num / 10000).toFixed(1);
					return formatted.endsWith(".0") ? formatted.slice(0, -2) + "万" : formatted + "万";
				}
				return num;
			},
			gotoVideo(video) {
				uni.setStorageSync('videoInfo', video); // 先存本地缓存，减少页面间数据传输
				uni.navigateTo({
					url: `/pages/video/video?videoid=${video.videoid}`
				});
			}
		}
	}
</script>

<style>
	.swiper-item {
		position: relative;
		width: 100%;
		height: 100%;
	}

	.banner-image {
		width: 100%;
		height: 100%;
	}

	.text-overlay {
		width: 500rpx;
		position: absolute;
		bottom: 4rpx;
		left: 20rpx;
		color: #ffffff;
		font-size: 28rpx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.video-container {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		padding: 0rpx 10rpx;
	}

	.video-item {
		width: 49%;
		background: #fff;
		border-radius: 10rpx;
		/* 		overflow: hidden; */
		margin-bottom: 10rpx;
		box-shadow: 0 5rpx 15rpx rgba(0, 0, 0, 0.3);
		transition: transform 0.2s ease;
	}

	.video-item:active {
		transform: scale(0.98);
	}

	.video-image-container {
		position: relative;
		width: 100%;
		/* padding-top: 56.25%;  16:9 比例 */
		padding-top: 70%;
	}

	.video-image {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		border-radius: 10rpx 10rpx 0 0;
	}

	.video-time {
		position: absolute;
		bottom: 5rpx;
		right: 5rpx;
		color: #fff;
		font-size: 18rpx;
	}

	.video-stats {
		position: absolute;
		left: 5rpx;
		bottom: 5rpx;
		display: flex;
		align-items: center;
	}

	.stats-icon {
		width: 30rpx;
		height: 30rpx;
		margin-right: 4rpx;
	}

	.views_barrages {
		color: #fff;
		font-size: 20rpx;
		margin-right: 12rpx;
	}

	.video-title {
		font-size: 28rpx;
		color: #000000;
		min-height: 76rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	.video-uploader {
		padding: 10rpx 0rpx;
		font-size: 24rpx;
		color: #69686d;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>