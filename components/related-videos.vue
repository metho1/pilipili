<!-- 相关视频推荐 -->
<template>
	<scroll-view scroll-y> <!-- @scrolltolower="loadMoreVideos" -->
		<view v-for="related in relatedVideos" :key="related.videoid" class="related-item"
			@click="gotoVideo(related)">
			<!-- 视频封面 -->
			<view class="related-image-container">
				<image :src="related.cover" class="related-image"></image>
				<view class="related-time">{{ related.time }}</view>
			</view>
			<!-- 视频信息 -->
			<view class="related-stats">
				<text class="related-title">{{ related.title }}</text>
				<view class="related-username">
					<uni-icons type="person" size="30rpx"></uni-icons>&nbsp;{{ related.username }}
				</view>
				<view style="display:flex;align-items:center;">
					<image src="@/static/views_gray.svg" class="related-icon"></image>
					<text class="related-views">{{ format(related.views) }}</text>
					<image src="@/static/barrages_gray.svg" class="related-icon"></image>
					<text class="related-barrages">{{ format(related.barrages) }}</text>
				</view>
			</view>
		</view>
	</scroll-view>
</template>

<script>
	export default {
		name: "RelatedVideos",
		props: {
			relatedVideos: Array
		},
		data() {
			return {
				
			};
		},
		methods: {
			gotoVideo(video) {
				uni.setStorageSync('videoInfo', video) // 先存本地缓存，减少页面间数据传输
				uni.navigateTo({
					url: `/pages/video/video?videoid=${video.videoid}`
				});
			},
			format(num) {
				if (num >= 10000) {
					let formatted = (num / 10000).toFixed(1);
					return formatted.endsWith(".0") ? formatted.slice(0, -2) + "万" : formatted + "万";
				}
				return num;
			}
		}
	}
</script>

<style>
	.related-item {
		width: 100%;
		display: flex;
		padding: 20rpx 0rpx;
		border-top: 2rpx #d5d5d5 solid;
	}

	.related-image-container {
		position: relative;
		width: 42%;
		padding-top: 25%;
	}

	.related-image {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		border-radius: 10rpx;
	}

	.related-time {
		position: absolute;
		bottom: 5rpx;
		right: 5rpx;
		background: rgba(0, 0, 0, 0.5);
		color: #fff;
		font-size: 18rpx;
		padding: 2rpx 6rpx;
		border-radius: 5rpx;
	}

	.related-stats {
		flex: 1;
		margin-left: 20rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.related-title {
		font-size: 30rpx;
		min-height: 80rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}

	.related-username {
		margin: 10rpx 0rpx;
		font-size: 24rpx;
		color: #69686d;
	}

	.related-icon {
		color: #69686d;
		width: 30rpx;
		height: 30rpx;
		margin-right: 4rpx;
	}

	.related-views,
	.related-barrages {
		color: #69686d;
		font-size: 24rpx;
		margin-right: 20rpx;
	}
</style>