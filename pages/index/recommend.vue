<!-- 推荐页面 -->
<template>
	<!-- 轮播图 -->
	<uni-card margin="8rpx" padding="0rpx" spacing="0rpx">
		<swiper style="height: 400rpx;" circular autoplay :interval="2000" indicator-dots indicator-active-color="#fff">
			<swiper-item v-for="(item, index) in banners" :key="index">
				<view class="swiper-item">
					<image :src="item.url" class="banner-image" lazy-load="true"></image>
					<view class="text-overlay">{{ item.content }}</view>
				</view>
			</swiper-item>
		</swiper>
	</uni-card>
	<!-- 视频列表 -->
	<view class="video-container">
		<view v-for="video in videos" :key="video.videoid" class="video-item" @click="gotoVideo(video)">
			<view class="video-image-container">
				<image :src="video.cover" class="video-image" lazy-load="true"></image>
				<view class="video-time">{{ video.time }}</view>
				<view class="video-stats">
					<image src="@/static/views.svg" class="stats-icon" lazy-load="true"></image>
					<text class="views_barrages">{{ format(video.views) }}</text>
					<image src="@/static/barrages.svg" class="stats-icon" lazy-load="true"></image>
					<text class="views_barrages">{{ format(video.barrages) }}</text>
				</view>
			</view>
			<view style="padding: 10rpx 15rpx;">
				<view class="video-title">{{ video.title }}</view>
				<view class="video-uploader"><uni-icons type="person"
						size="30rpx"></uni-icons>&nbsp;{{ video.username }}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		API_BASE_URL
	} from '@/config/api.js';
	export default {
		name: 'Recommend',
		data() {
			return {
				page: 0,
				banners: [{
						url: API_BASE_URL + 'covers/6.jpg',
						content: '静谧的街道竟暗藏汹涌，真相竟是！'
					},
					{
						url: API_BASE_URL + 'covers/4.jpg',
						content: '点击开启你的异世界冒险之旅！'
					},
					{
						url: API_BASE_URL + 'covers/5.jpg',
						content: '周边模玩年度盛典，投稿赢大额流量与万元奖金，快来参与吧！'
					}
				],
				videos: []
			}
		},
		created() {
			console.log('recommend');
			this.fetchVideos();
		},
		methods: {
			// 获取 fetchVideos 数据
			async fetchVideos() {
				try {
					this.page++;
					console.log(this.page);
					const res = await uni.request({
						url: API_BASE_URL + 'videoBuss/getVideoList',
						method: 'GET',
						data: {
							page: this.page
						}
					});
					if (res.statusCode === 200) {
						let newvideos = res.data.list;
						newvideos = newvideos.map(item => {
							item.cover = API_BASE_URL + item.cover;
							item.time = this.formatTime(item.time);
							return item;
						});
						this.videos = this.videos.concat(newvideos);
					} else {
						console.error('请求失败:', res);
						this.page--;
						uni.showToast({
							title: '数据加载失败',
							icon: 'none'
						});
					}
				} catch (error) {
					this.page--;
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
			},
			formatTime(time) {
				let hour = Math.floor(time / 3600);
				let minute = Math.floor(time / 60 % 60);
				let second = time % 60;
				minute = minute < 10 ? '0' + minute : minute;
				second = second < 10 ? '0' + second : second;
				return (hour > 0 ? hour + ':' : '') + minute + ':' + second;
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