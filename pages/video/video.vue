<template>
	<StatusBar />
	<view class="container">
		<!-- 视频播放器 -->
		<yingbing-video :src="videoComplement.url" style="width: 100%;height: 450rpx;" autoplay preload="meta"
			:title="videoData.title" @fullscreenChange="fullscreenChange" settings="barrage,playbackRate,mirror"
			object-fit="contain" :barrages="barrages" barrageShow :barrage-config="barrageConfig">
			<template #controls>
				<uni-icons v-show="showControls" class="back-button" type="left" size="40rpx" color="#FFF"
					@click="back"></uni-icons>
			</template>
		</yingbing-video>
		<!-- 简介、评论 -->
		<NavTabs :activeTab="currentTab" :tabs="tabs" @tabChange="handleTabChange" />
		<!-- 简介页面 -->
		<scroll-view scroll-y style="height: 995rpx;">
			<view v-show="currentTab === 'abstracts'" style="padding: 15rpx 15rpx 0rpx 15rpx;">
				<!-- 作者信息 -->
				<view class="user-info" @click="onVideoClick">
					<view style="position:relative;min-width:350rpx;">
						<image class="avatar" :src="user.avatar" />
						<text class="username">{{ videoData.username }}</text>
						<text class="userfans">{{ format(user.fans) }}粉丝 {{ user.videonum}}视频</text>
					</view>
					<view class="attent-button">+ 关注</view>
				</view>
				<!-- 视频信息 采用折叠面板-->
				<uni-collapse style="padding-top: 10rpx; padding-bottom: 10rpx; max-width: 96%;">
					<uni-collapse-item title-border="none" :border="false">
						<!-- 使用插槽实现自定义标题面板 -->
						<template v-slot:title>
							<view class="video-title">{{ videoData.title }}</view>
							<view
								style="display:flex;justify-content: flex-start;align-items: center;margin:10rpx 0rpx;">
								<image src="@/static/views_gray.svg" class="stats-icon"></image>
								<text class="views_barrages">{{ format(videoData.views) }}</text>
								<image src="@/static/barrages_gray.svg" class="stats-icon"></image>
								<text class="views_barrages">{{ format(videoData.barrages) }}</text>
								<text class="views_barrages">{{ videoComplement.releasetime }}</text>
							</view>
						</template>
						<!-- 隐藏面板 -->
						<text style="color: #69686d;font-size: 26rpx;">{{ videoComplement.abstracts }}</text>
						<view style="display: flex; gap: 20rpx; flex-wrap: wrap;margin-top: 15rpx;">
							<text class="tag" v-for="tag in videoComplement.tags">{{ tag }}</text>
						</view>
					</uni-collapse-item>
				</uni-collapse>
				<!-- 点赞、收藏、分享 -->
				<view class="actions">
					<view class="action-item" @click="toggleLike">
						<uni-icons :type="action.liked ? 'hand-up-filled' : 'hand-up'" size="66rpx;"></uni-icons>
						<view class="likes">{{ format(videoComplement.likes) }}</view>
					</view>
					<view class="action-item" @click="toggleCollect">
						<uni-icons :type="action.collected ? 'star-filled' : 'star'" size="66rpx;"></uni-icons>
						<text class="likes">{{ format(videoComplement.collections) }}</text>
					</view>
					<view class="action-item" @click="toggleShare">
						<uni-icons :type="action.shared ? 'redo-filled' : 'redo'" size="66rpx;"></uni-icons>
						<text class="likes">{{ format(videoComplement.forwards) }}</text>
					</view>
				</view>
				<!-- 相关视频推荐 -->
				<RelatedVideos :related-videos="relatedVideos" />
			</view>
			<!-- 评论区页面 -->
			<view v-show="currentTab === 'comments'" class="comments-section">
				<text class="section-title">评论</text>
				<view v-for="comment in comments" :key="comment.id" class="comment-item">
					<text class="comment-author">{{ comment.author }}:</text>
					<text class="comment-content">{{ comment.content }}</text>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import {
		API_BASE_URL
	} from '@/config/api.js';
	import {
		API_RESOURCES_URL
	} from '@/config/api.js';
	import { useUserStore } from '@/store/user';
	import NavTabs from '@/components/nav-tabs.vue';
	import RelatedVideos from '@/components/related-videos.vue';
	export default {
		components: {
			NavTabs,
			RelatedVideos
		},
		setup() {
			const userStore = useUserStore(); // 提前初始化 Store
			return {
				userStore, // 将 userStore 暴露给模板和方法
			};
		},
		data() {
			return {
				showControls: true,
				currentTab: "abstracts",
				videoid: null,
				videoData: {},
				videoComplement: {},
				action: {
					liked: false,
					collected: false,
					shared: false
				},
				comments: [],
				relatedVideos: [
				],
				user: {
					// userid: 1, （已知）
					// username: '芝士阿毛', 根据userid得到下面完整信息
					avatar: "/static/avatar.jpg",
					fans: 53000,
					videonum: 108
				},
				barrages: [],
				barrageConfig: {
					speed: 100,
					defaultColor: '#000000',
					fontSize: 20,
					textShadowBlur: 0
				}


			}
		},
		computed: {
			tabs() {
				return [{
						text: "简介",
						value: "abstracts"
					},
					{
						text: `评论（${this.videoComplement.comments})`,
						value: "comments"
					}
				];
			}
		},
		onLoad(options) {
			this.videoid = options.videoid;
			this.videoData = uni.getStorageSync('videoInfo') || {}; //先用本地数据渲染已有信息
			this.fetchVideoComplement(); //再向服务器请求完整视频数据
			this.fetchBarrages();

		},
		onReady() {
			this.videoContext = uni.createVideoContext('myVideo');
		},
		methods: {
			handleTabChange(tab) {
				this.currentTab = tab;
			},
			format(num) {
				if (num >= 10000) {
					let formatted = (num / 10000).toFixed(1);
					return formatted.endsWith(".0") ? formatted.slice(0, -2) + "万" : formatted + "万";
				}
				return num;
			},
			toggleLike() {
				this.action.liked = !this.action.liked;
				this.videoComplement.likes += this.action.liked ? 1 : -1;
			},
			toggleCollect() {
				this.action.collected = !this.action.collected;
				this.videoComplement.collections += this.action.collected ? 1 : -1;
			},
			toggleShare() {
				this.action.shared = !this.action.shared;
				this.videoComplement.forwards += this.action.shared ? 1 : -1;
			},
			convert(number) {
				return number < 10 ? '0' + number : number;
			},
			// 获取 videoComplement 数据
			async fetchVideoComplement() {
				try {
					const res = await uni.request({
						url: API_BASE_URL + 'videoBuss/getVideo',
						method: 'GET',
						header: {token: this.userStore.token},
						data: {
							videoid: this.videoid
						}
					});
					if (res.statusCode === 200) {
						this.videoComplement = res.data; // 更新 videoComplement 数据
						this.videoComplement.tags = JSON.parse(this.videoComplement.tags.replace(/'/g, '"')); //字符串转数组
						let date = new Date(this.videoComplement.releasetime * 1000); //十位时间戳转日期类
						let year = date.getFullYear();
						let month = date.getMonth() + 1;
						let day = date.getDate();
						let hours = this.convert(date.getHours());
						let minutes = this.convert(date.getMinutes());
						let seconds = this.convert(date.getSeconds());
						this.videoComplement.releasetime = year + "年" + month + "月" + day + "日" + " " + hours + ":" +
							minutes + ":" + seconds; //拼接为 YYYY年M月D日 HH:MM:SS 格式
						this.videoComplement.url = API_RESOURCES_URL + this.videoComplement.url;
						console.log(this.videoComplement);
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
			back() {
				uni.navigateBack();
			},
			fullscreenChange() { //全屏切换
				this.showControls = !this.showControls;
			},
			// 获取 videoComplement 数据
			async fetchBarrages() {
				try {
					const res = await uni.request({
						url: API_BASE_URL + 'barrageBuss/getBarrageList',
						method: 'GET',
						header: {token: this.userStore.token},
						data: {
							videoid: this.videoid
						}
					});
					if (res.statusCode === 200) {
						this.barrages = res.data; // 更新 videoComplement 数据
						console.log(this.barrages.length);
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
	}
</script>

<style>
	.container {
		display: flex;
		flex-direction: column;
		position: relative;
	}

	.back-button {
		position: absolute;
		top: 20rpx;
		left: 30rpx;
	}

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

	.user-info {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.avatar {
		width: 66rpx;
		height: 66rpx;
		border-radius: 50%;
	}

	.username {
		position: absolute;
		top: 0;
		left: 90rpx;
		color: #fe58a4;
		font-size: 28rpx;
	}

	.userfans {
		position: absolute;
		top: 36rpx;
		left: 90rpx;
		color: #69686d;
		font-size: 24rpx;
	}

	.attent-button {
		width: 100rpx;
		height: 50rpx;
		border-radius: 30rpx;
		background-color: #fe58a4;
		display: flex;
		align-items: center;
		padding-left: 15rpx;
		color: #ffffff;
		font-size: 28rpx;
	}

	.video-title {
		font-size: 34rpx;
		font-weight: bold;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.stats-icon {
		color: #69686d;
		width: 30rpx;
		height: 30rpx;
		margin-right: 4rpx;
	}

	.views_barrages {
		color: #69686d;
		font-size: 24rpx;
		margin-right: 12rpx;
	}

	.tag {
		padding: 10rpx 20rpx;
		border-radius: 30rpx;
		background-color: #f7f7f7;
		display: inline-flex;
		justify-content: center;
		align-items: center;
		color: #69686d;
		font-size: 24rpx;
		white-space: nowrap;
	}

	.actions {
		display: flex;
		justify-content: space-around;
		padding-bottom: 10rpx;
		border-bottom: 2rpx #d5d5d5 solid;
	}

	.action-item {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.likes {
		color: #69686d;
		font-size: 24rpx;
	}

	.comments-section {
		margin-top: 20px;
	}

	.comment-item {
		margin-bottom: 10px;
	}

	.comment-author {
		font-weight: bold;
		margin-right: 5px;
	}

	.comment-content {
		font-size: 14px;
	}
</style>