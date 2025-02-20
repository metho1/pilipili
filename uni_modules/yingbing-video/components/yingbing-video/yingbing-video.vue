<template>
	<view
	class="yingbing-video"
	:id="'yb-video' + dataId"
	:data-title="title"
	:data-poster="poster"
	:data-formats="formats"
	:data-duration="duration"
	:data-muted="muted"
	:data-autoplay="autoplay"
	:data-initialTime="initialTime"
	:data-loop="loop"
	:data-preload="preload"
	:data-settings="settings"
	:data-controls="controls"
	:data-progressShow="progressShow"
	:data-prevBtnShow="prevBtnShow"
	:data-nextBtnShow="nextBtnShow"
	:data-playShow="playShow"
	:data-timeShow="timeShow"
	:data-volumeShow="volumeShow"
	:data-settingShow="settingShow"
	:data-fullscreenShow="fullscreenShow"
	:data-mirror="mirror"
	:data-volume="volume"
	:data-playbackRate="playbackRate"
	:data-longpressPlaybackRate="longpressPlaybackRate"
	:data-barrageShow="barrageShow"
	:data-barrageGap="barrageGap"
	:data-isLive="isLive"
	:data-generallyDirection="generallyDirection"
	:data-fullscreenDirection="fullscreenDirection"
	:data-objectFit="objectFit"
	:data-crossOrigin="crossOrigin"
	:data-enableBlob="enableBlob"
	:data-enableLongpressPlaybackRate="enableLongpressPlaybackRate"
	:data-enableDoubleToggle="enableDoubleToggle"
	:data-pictureInPicture="pictureInPicture"
	:data-fullscreen="fullscreen"
	
	:barrages="barrages" :change:barrages="ybVideo.barragesWatcher"
	:barrageConfig="barrageConfig" :change:barrageConfig="ybVideo.barrageConfigWatcher"
	:fullscreen="fullscreen" :change:fullscreen="ybVideo.fullscreenWatcher"
	:flvConfig="flvConfig" :change:flvConfig="ybVideo.flvConfigWatcher"
	:state="state" :change:state="ybVideo.stateWatcher"
	:seekTime="seekTime" :change:seekTime="ybVideo.seekTimeWatcher"
	:danmu="danmu" :change:danmu="ybVideo.danmuWatcher"
	:captureEvent="captureEvent" :change:captureEvent="ybVideo.captureEventWatcher"
	:barrageRefresh="barrageRefresh" :change:barrageRefresh="ybVideo.barrageRefreshWatcher"
	
	:prop="prop" :change:prop="ybVideo.propWatcher"
	:ready="ready" :change:ready="ybVideo.readyWatcher"
	:src="src" :change:src="ybVideo.srcWatcher"
	:segments="segments" :change:segments="ybVideo.segmentsWatcher">
		<view class="ybplayer-slots">
			<view class="ybplayer-controls-slots">
				<slot name="controls"></slot>
			</view>
			<view class="ybplayer-default-slots">
				<slot></slot>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			dataId: {
				type: String,
				default () {
					let mydate = new Date()
					return 'cms' + mydate.getMinutes() + mydate.getSeconds() + mydate.getMilliseconds() + Math.round(Math.random() * 10000)
				}
			},
			//播放链接
			src: {
				type: String,
				default: ''
			},
			//标题
			title: {
				type: String,
				default: ''
			},
			//封面
			poster: {
				type: String,
				default: ''
			},
			//视频格式
			formats: {
				type: String,
				default: 'auto'
			},
			//时长（单位：s）
			duration: {
				type: Number,
				default: 0
			},
			//静音
			muted: {
				type: Boolean,
				default: false
			},
			//自动播放
			autoplay: {
				type: Boolean,
				default: false
			},
			//初始播放时间 (单位是秒)
			initialTime: {
				type: Number,
				default: 0
			},
			//是否循环播放
			loop: {
				type: Boolean,
				default: false
			},
			//预加载属性
			preload: {
				type: String,
				default: 'auto' //auto/meta/none
			},
			//设置菜单
			settings: {
				type: String,
				default: 'all'
			},
			//控制栏
			controls: {
				type: Boolean,
				default: true
			},
			//展示进度条
			progressShow: {
				type: Boolean,
				default: true
			},
			//显示上一个视频按钮
			prevBtnShow: {
				type: Boolean,
				default: false
			},
			//显示下一个视频按钮
			nextBtnShow: {
				type: Boolean,
				default: false
			},
			//显示播放按钮
			playShow: {
				type: Boolean,
				default: true
			},
			//显示播放时间
			timeShow: {
				type: Boolean,
				default: true
			},
			//显示静音按钮
			volumeShow: {
				type: Boolean,
				default: true
			},
			//显示设置按钮
			settingShow: {
				type: Boolean,
				default: true
			},
			//显示全拼按钮
			fullscreenShow: {
				type: Boolean,
				default: true
			},
			//镜像画面
			mirror: {
				type: Boolean,
				default: false
			},
			//音量
			volume: {
				type: Number,
				default: 1.0
			},
			//倍率
			playbackRate: {
				type: Number,
				default: 1.0
			},
			//长按倍速
			longpressPlaybackRate: {
				type: Number,
				default: 3.0
			},
			//展示弹幕
			barrageShow: {
				type: Boolean,
				default: false
			},
			//弹幕库
			barrages: {
				type: Array,
				default () {
					return new Array
				}
			},
			//弹幕配置
			barrageConfig: {
				type: Object,
				default () {
					return new Object
				}
			},
			//弹幕显示上下间距
			barrageGap: {
				type: Number,
				default: 0
			},
			//是否直播
			isLive: {
				type: Boolean,
				default: false
			},
			//flv配置
			flvConfig: {
				type: Object,
				default () {
					return new Object
				}
			},
			//flv切片列表
			segments: {
				type: Array,
				default () {
					return new Array
				}
			},
			//非全屏时屏幕方向 仅APP支持
			generallyDirection: {
				type: String,
				default: 'portrait-primary'
			},
			//全屏时屏幕方向 仅APP支持
			fullscreenDirection: {
				type: String,
				default: 'landscape-primary'
			},
			//当视频尺寸与视频容器大小不一致时的处理
			objectFit: {
				type: String,
				default: 'contain'
			},
			crossOrigin: {
				type: String,
				default: ''
			},
			//开启长按倍速播放
			enableLongpressPlaybackRate: {
				type: Boolean,
				default: true
			},
			//开启双击播放暂停
			enableDoubleToggle: {
				type: Boolean,
				default: true
			},
			//是否将视频转化为Blob对象,仅支持mp4
			enableBlob: {
				type: Boolean,
				default: false
			}
		},
		computed: {
			prop () {
				return {
					//监听标题
					title: this.title,
					//监听倍速
					playbackRate: this.playbackRate,
					//监听长按倍速
					longpressPlaybackRate: this.longpressPlaybackRate,
					//监听总进度
					duration: this.duration,
					//监听音量
					volume: this.volume,
					//监听封面
					poster: this.poster,
					//监听控制器
					controls: this.controls,
					//监听静音
					muted: this.muted,
					//监听弹幕显示/隐藏
					barrageShow: this.barrageShow,
					//监听进度条显示/隐藏
					progressShow: this.progressShow,
					//监听上一集按钮显示/隐藏
					prevBtnShow: this.prevBtnShow,
					//监听下一集按钮显示/隐藏
					nextBtnShow: this.nextBtnShow,
					//监听播放按钮显示/隐藏
					playShow: this.playShow,
					//监听时间显示/隐藏
					timeShow: this.timeShow,
					//监听音量按钮显示/隐藏
					volumeShow: this.volumeShow,
					//监听设置按钮显示/隐藏
					settingShow: this.settingShow,
					//监听全屏按钮显示/隐藏
					fullscreenShow: this.fullscreenShow,
					//监听循环播放
					loop: this.loop,
					//监听自动播放
					autoplay: this.autoplay,
					//监听加载模式
					preload: this.preload,
					//监听设置选项
					settings: this.settings,
					//监听镜像
					mirror: this.mirror,
					//监听尺寸不合时的处理
					objectFit: this.objectFit,
					//监听网络处理
					crossOrigin: this.crossOrigin,
					//监听blob
					enableBlob: this.enableBlob,
					//监听长按倍速播放开关
					enableLongpressPlaybackRate: this.enableLongpressPlaybackRate,
					//监听双击播放暂停开关
					enableDoubleToggle: this.enableDoubleToggle,
					//监听初始播放时间
					initialTime: this.initialTime,
					//监听画中画
					pictureInPicture: this.pictureInPicture
				}
			}
		},
		data () {
			return {
				ready: '',
				state: '',
				seekTime: -1,
				danmu: '',
				fullscreen: false,
				pictureInPicture: false,
				barrageRefresh: -1,
				captureEvent: -1
			}
		},
		created () {
			// #ifdef APP-VUE
			plus.screen.lockOrientation(this.generallyDirection);
			// #endif
		},
		mounted () {
			this.$nextTick(function () {
				setTimeout(() => {
					this.ready = this.dataId
				}, 100)
			})
		},
		beforeDestroy() {
			// #ifdef APP-VUE
			plus.screen.lockOrientation(this.generallyDirection);
			// #endif
		},
		methods: {
			//触发事件
			onCanplay (e) {
				this.$emit('canplay', e)
			},
			onCanplaythrough (e) {
				this.$emit('canplaythrough', e)
			},
			onLoadeddata (e) {
				this.$emit('loadeddata', e)
			},
			onLoadedmetadata (e) {
				this.$emit('loadedmetadata', e)
			},
			onLoadstart (e) {
				this.$emit('loadstart', e)
			},
			onPlay (e) {
				this.$emit('play', e)
			},
			onPause (e) {
				this.$emit('pause', e)
			},
			onEnded (e) {
				this.$emit('ended', e)
			},
			onSeeking (e) {
				this.$emit('seeking', e)
			},
			onSeeked (e) {
				this.$emit('seeked', e)
			},
			onWaiting (e) {
				this.$emit('waiting', e)
			},
			onPlaying (e) {
				this.$emit('playing', e)
			},
			onProgress (e) {
				this.$emit('progress', e)
			},
			onTimeupdate (e) {
				this.$emit('timeupdate', e)
			},
			onVolumechange(e) {
				this.$emit('volumeChange', e)
			},
			onRatechange (e) {
				this.$emit('rateChange', e)
			},
			onDurationchange (e) {
				this.$emit('durationChange', e)
			},
			onAbort (e) {
				this.$emit('abort', e)
			},
			onErr (e) {
				this.$emit('error', e)
			},
			onEnterpictureinpicture (e) {
				this.$emit('enterpictureinpicture', e)
			},
			onLeavepictureinpicture (e) {
				this.$emit('leavepictureinpicture', e)
			},
			onCaptureFinish (e) {
				this.$emit('captureFinish', e)
			},
			onControlsChange (e) {
				this.$emit('controlsChange', e)
			},
			onBarrageChange (e) {
				this.$emit('barrageChange', e)
			},
			onPrevBtnClick (e) {
				this.$emit('prevBtnClick', e)
			},
			onNextBtnClick (e) {
				this.$emit('nextBtnClick', e)
			},
			onSeizing (e) {
				this.$emit('seizing', e)
			},
			onStatisticsInfo (e) {
				this.$emit('statisticsInfo', e)
			},
			onLoadingComplete (e) {
				this.$emit('loadingComplete', e)
			},
			onRecoveredEarlyEof (e) {
				this.$emit('recoveredEarlyEof', e)
			},
			onMediaInfo (e) {
				this.$emit('mediaInfo', e)
			},
			onMetadataArrived (e) {
				this.$emit('metadataArrived', e)
			},
			onScriptdataArrived (e) {
				this.$emit('scriptdataArrived', e)
			},
			
			// 操作事件
			play () {
				this.state = ''
				this.$nextTick(function () {
					this.state = 'play'
				})
			},
			pause () {
				this.state = ''
				this.$nextTick(function () {
					this.state = 'pause'
				})
			},
			toggle () {
				this.state = ''
				this.$nextTick(function () {
					this.state = 'toggle'
				})
			},
			reload () {
				this.state = ''
				this.$nextTick(function () {
					this.state = 'reload'
				})
			},
			stop () {
				this.state = ''
				this.$nextTick(function () {
					this.state = 'stop'
				})
			},
			seek (time) {
				this.seekTime = -1
				this.$nextTick(function () {
					this.seekTime = time
				})
			},
			capture () {
				this.captureEvent = -1
				this.$nextTick(function () {
					this.captureEvent = 1
				})
			},
			drawBarrage (danmu) {
				this.danmu = ''
				this.$nextTick(function () {
					this.danmu = danmu
				})
			},
			refreshBarrage () {
				this.barrageRefresh = -1
				this.$nextTick(function () {
					this.barrageRefresh = 1
				})
			},
			switchFullscreen () {
				this.fullscreen = !this.fullscreen
				this.switchDirection()
			},
			switchPictureInPicture () {
				this.pictureInPicture = !this.pictureInPicture
			},
			launchPictureInPicture () {
				this.pictureInPicture = true
			},
			exitPictureInPicture () {
				this.pictureInPicture = false
			},
			launchFullscreen () {
				this.fullscreen = true
				this.switchDirection()
			},
			exitFullscreen () {
				this.fullscreen = false
				this.switchDirection()
			},
			switchDirection () {
				// #ifdef APP-VUE
				if ( this.fullscreen ) {
					plus.screen.lockOrientation(this.fullscreenDirection);
				} else {
					plus.screen.lockOrientation(this.generallyDirection);
				}
				// #endif
			},
			fullscreenChange (e) {
				this.fullscreen = e.fullscreen;
				this.$emit('fullscreenChange', e)
				this.switchDirection()
			}
		}
	}
</script>
<!-- #ifdef APP-VUE || H5 -->
<script lang="renderjs" type="module" module="ybVideo">
	let myVideo
	import YBPlayer from "../../jssdk/ybplayer.js"
	import YBBarrage from "../../jssdk/ybbarrage.js"
	import Hls from "../../jssdk/hls.mjs"
	export default {
		data () {
			return {
				dp: null,
				dom: null,
				observe: null,
				videoUrl: '',
				videoSegments: [],
				videoBarrages: [],
				videoBarrageConfig: {},
				videoFlvConfig: {}
			}
		},
		mounted () {
			document.oncontextmenu = function () {
				event.returnValue = false
			}
			// this.initDom.bind(this)
			// window.Hls = require("../modules/hls.min.js")
			// window.flvjs = require("../modules/flv.min.js")
			window.YBBarrage = YBBarrage
			window.Hls = Hls
		},
		beforeDestroy() {
			this.destoryVideo()
		},
		methods: {
			//销毁视频
			destoryVideo () {
				if ( this.dp ) {
					this.dp.stop()
					this.dp = null
				}
			},
			//监听组件是否渲染完毕
			readyWatcher (newVal) {
				if ( newVal ) this.dom = document.getElementById('yb-video' + newVal)
				if ( this.videoUrl || (this.videoSegments && this.videoSegments.length > 0) ) this.switchVideo()
			},
			//监听播放链接
			srcWatcher (newVal, oldVal) {
				this.videoUrl = newVal
				if ( !this.dom ) return
				if ( newVal != oldVal ) {
					if ( oldVal ) this.destoryVideo()
					if ( newVal ) this.switchVideo()
				}
			},
			//监听切片列表
			segmentsWatcher (newVal, oldVal) {
				this.videoSegments = newVal
				if ( !this.dom ) return
				if ( newVal != oldVal ) {
					if ( oldVal && oldVal.length > 0 ) this.destoryVideo()
					if ( newVal && newVal.length > 0 ) this.switchVideo()
				}
			},
			//监听弹幕列表
			barragesWatcher (newVal) {
				this.videoBarrages = newVal
				this.dp && this.dp.setConfig('barrages', newVal)
			},
			//监听弹幕配置
			barrageConfigWatcher (newVal) {
				this.videoBarrageConfig = newVal
				this.dp && this.dp.setConfig('barrageConfig', newVal)
			},
			//监听flv配置
			flvConfigWatcher (newVal) {
				this.videoFlvConfig = newVal
				this.dp && this.dp.setConfig('flvConfig', newVal)
			},
			//监听弹幕刷新
			barrageRefreshWatcher (newVal) {
				if ( newVal > -1 && this.dp ) this.dp.refreshBarrage()
			},
			//监听全屏改变
			fullscreenWatcher (newVal) {
				if ( !this.dp ) return
				if ( newVal ) this.dp.lanuchFullscreen()
				else this.dp.exitFullscreen()
			},
			//监听播放状态控制
			stateWatcher (newVal) {
				if ( this.dp ) {
					if ( newVal == 'play' ) this.dp.play()
					if ( newVal == 'pause' ) this.dp.pause()
					if ( newVal == 'toggle' ) this.dp.toggle()
					if ( newVal == 'reload' ) this.dp.reload()
					if ( newVal == 'stop' ) this.destoryVideo()
				}
			},
			//监听跳转时间
			seekTimeWatcher (newVal) {
				if ( newVal > -1 && this.dp ) this.dp.seek(newVal)
			},
			//监听弹幕绘制
			danmuWatcher (newVal) {
				if ( newVal && this.dp ) this.dp.drawBarrage(newVal)
			},
			//监听截图
			captureEventWatcher (newVal) {
				if ( newVal > -1 && this.dp ) this.dp.capture()
			},
			propWatcher (newVal, oldVal) {
				if ( this.dp && newVal ) {
					Object.keys(newVal).forEach(key => {
						if ( newVal[key] != oldVal[key] ) this.dp.setConfig(key, newVal[key])
					})
				}
			},
			async switchVideo () {
				try{
					if ( !this._getScriptDomByDataId('flv') || !this._getScriptDomByDataId('jsbridge') ) {
						this.dom.setAttribute('class', 'yingbing-video yb-video yb-video-first')
						await this._initFLV()
						await this._initJsbridge()
						this.dom.setAttribute('data-is-ready', true)
					}
					if ( YBPlayer && YBBarrage && flvjs && Hls && jsBridge ) {
						if ( this.dp ) this.destoryVideo()
						this.dp = new YBPlayer({
							container: this.dom,
							src: this.videoUrl,
							poster: this.getData('poster'),
							title: this.getData('title'),
							formats: this.getData('formats'),
							controls: this.getData('controls'),
							autoplay: this.getData('autoplay'),
							loop: this.getData('loop'),
							mirror: this.getData('mirror'),
							preload: this.getData('preload'),
							settings: this.getData('settings'),
							duration: this.getData('duration'),
							muted: this.getData('muted'),
							progressShow: this.getData('progressShow'),
							prevBtnShow: this.getData('prevBtnShow'),
							nextBtnShow: this.getData('nextBtnShow'),
							playShow: this.getData('playShow'),
							timeShow: this.getData('timeShow'),
							volumeShow: this.getData('volumeShow'),
							settingShow: this.getData('settingShow'),
							fullscreenShow: this.getData('fullscreenShow'),
							fullscreen: this.getData('fullscreen'),
							initialTime: this.getData('initialTime'),
							volume: this.getData('volume'),
							playbackRate: this.getData('playbackRate'),
							longpressPlaybackRate: this.getData('longpressPlaybackRate'),
							objectFit: this.getData('objectFit'),
							crossOrigin: this.getData('crossOrigin'),
							pictureInPicture: this.getData('pictureInPicture'),
							barrages: this.videoBarrages,
							barrageGap: this.getData('barrageGap'),
							barrageShow: this.getData('barrageShow'),
							barrageConfig: this.videoBarrageConfig,
							segments: this.videoSegments,
							flvConfig: this.videoFlvConfig,
							isLive: this.getData('isLive'),
							enableLongpressPlaybackRate: this.getData('enableLongpressPlaybackRate'),
							enableDoubleToggle: this.getData('enableDoubleToggle'),
							enableBlob: this.getData('enableBlob')
						})
						this.dp.on('canplay', e => {
							this.triggerMethod('onCanplay', e)
						})
						this.dp.on('canplaythrough', e => {
							this.triggerMethod('onCanplaythrough', e)
						})
						this.dp.on('loadeddata', e => {
							this.triggerMethod('onLoadeddata', e)
						})
						this.dp.on('loadedmetadata', e => {
							this.triggerMethod('onLoadedmetadata', e)
						})
						this.dp.on('loadstart', e => {
							this.triggerMethod('onLoadstart', e)
						})
						this.dp.on('play', e => {
							this.triggerMethod('onPlay', e)
						})
						this.dp.on('pause', e => {
							this.triggerMethod('onPause', e)
						})
						this.dp.on('ended', e => {
							this.triggerMethod('onEnded', e)
						})
						this.dp.on('seeking', e => {
							this.triggerMethod('onSeeking', e)
						})
						this.dp.on('seeked', e => {
							this.triggerMethod('onSeeked', e)
						})
						this.dp.on('timeupdate', e => {
							this.triggerMethod('onTimeupdate', e)
						})
						this.dp.on('waiting', e => {
							this.triggerMethod('onWaiting', e)
						})
						this.dp.on('playing', e => {
							this.triggerMethod('onPlaying', e)
						})
						this.dp.on('progress', e => {
							this.triggerMethod('onProgress', e)
						})
						this.dp.on('abort', e => {
							this.triggerMethod('onAbort', e)
						})
						this.dp.on('error', e => {
							this.triggerMethod('onErr', e)
						})
						this.dp.on('volumechange', e => {
							this.triggerMethod('onVolumechange', e)
						})
						this.dp.on('ratechange', e => {
							this.triggerMethod('onRatechange', e)
						})
						this.dp.on('durationchange', e => {
							this.triggerMethod('onDurationchange', e)
						})
						this.dp.on('enterpictureinpicture', e => {
							this.triggerMethod('onEnterpictureinpicture', e)
						})
						this.dp.on('leavepictureinpicture', e => {
							this.triggerMethod('onLeavepictureinpicture', e)
						})
						this.dp.on('fullscreenChange', e => {
							this.triggerMethod('fullscreenChange', e)
						})
						this.dp.on('captureFinish', e => {
							// #ifdef H5
							this.triggerMethod('onCaptureFinish', e)
							// #endif
							// #ifndef H5
							this.triggerMethod('onCaptureFinish', e.base64)
							// #endif
						})
						this.dp.on('controlsChange', e => {
							this.triggerMethod('onControlsChange', e)
						})
						this.dp.on('barrageChange', e => {
							this.triggerMethod('onBarrageChange', e)
						})
						this.dp.on('prevBtnClick', e => {
							this.triggerMethod('onPrevBtnClick', e)
						})
						this.dp.on('nextBtnClick', e => {
							this.triggerMethod('onNextBtnClick', e)
						})
						this.dp.on('seizing', e => {
							this.triggerMethod('onSeizing', e)
						})
						this.dp.on('statisticsInfo', e => {
							this.triggerMethod('onStatisticsInfo', e)
						})
						this.dp.on('loadingComplete', e => {
							this.triggerMethod('onLoadingComplete', e)
						})
						this.dp.on('recoveredEarlyEof', e => {
							this.triggerMethod('onRecoveredEarlyEof', e)
						})
						this.dp.on('mediaInfo', e => {
							this.triggerMethod('onMediaInfo', e)
						})
						this.dp.on('metadataArrived', e => {
							this.triggerMethod('onMetadataArrived', e)
						})
						this.dp.on('scriptdataArrived', e => {
							this.triggerMethod('onScriptdataArrived', e)
						})
					}
				}catch(e){
					const firstVideo = document.querySelector('.yb-video-first')
					if ( firstVideo ) {
						if ( firstVideo.getAttribute('data-is-ready') ) {
							if ( !this.dp ) this.switchVideo()
						} else {
							this.observer = new MutationObserver((MutationRecord, target) => {
							  // 指定的DOM节点(目标节点)发生变化时被调用
							  MutationRecord.forEach((mutation) => {
								if ( mutation.attributeName == 'data-is-ready' ) {
									this.observer.disconnect()
									this.observer = null
									if ( !this.dp ) this.switchVideo()
								}
							  });
							});
							this.observer.observe(firstVideo, {
								attributes: true,// 观察属性
								childList: false,// 观察子节点
								characterData: false, // characterData节点
								attributeOldValue: false, // 记忆上一次的atrr值
							})
						}
					}
				}
			},
			getData (name) {
				const value = this.dom.getAttribute('data-' + name)
				if ( ['true', 'false'].includes(value) ) return value == 'false' ? false : true
				else if ( /^[\d]+$/.test(value) ) return Number(value)
				else return value
			},
			triggerMethod (name, args) {
				// #ifndef H5
				// UniViewJSBridge.publishHandler('onWxsInvokeCallMethod', {
				//   cid: this._$id,
				//   method: name,
				//   args: args
				// })
				this.$ownerInstance.callMethod(name, args)
				// #endif
				// #ifdef H5
				this[name](args)
				// #endif
			},
			_getScriptDomByDataId (dataId) {
				let scripts = document.getElementsByTagName('script')
				let script = null
				for ( let i = 0; i < scripts.length; i++ ) {
					if ( scripts[i].getAttribute('data-id') == dataId )  {
						script = scripts[i]
						break
					}
				}
				return script
			},
			_initHLS () {
				return new Promise(resolve => {
					const script = document.createElement('SCRIPT')
					script.setAttribute('data-id', 'hls')
					script.src = './uni_modules/yingbing-video/static/hls.min.js'
					script.onload = () => {
						resolve()
					}
					document.body.appendChild(script)
				})
			},
			_initFLV () {
				return new Promise(resolve => {
					const script = document.createElement('SCRIPT')
					script.setAttribute('data-id', 'flv')
					script.src = './uni_modules/yingbing-video/static/flv.min.js'
					script.onload = () => {
						resolve()
					}
					document.body.appendChild(script)
				})
			},
			_initJsbridge () {
				return new Promise(resolve => {
					const script = document.createElement('SCRIPT')
					script.setAttribute('data-id', 'jsbridge')
					script.src = './uni_modules/yingbing-video/static/jsbridge-mini.js'
					script.onload = () => {
						resolve()
					}
					document.body.appendChild(script)
				})
			},
			_initYBBarrage () {
				return new Promise(resolve => {
					const script = document.createElement('SCRIPT')
					script.setAttribute('data-id', 'ybbarrage')
					script.src = './uni_modules/yingbing-video/static/ybbarrage.js'
					script.onload = () => {
						resolve()
					}
					document.body.appendChild(script)
				})
			},
			_initYBPlayer () {
				return new Promise(resolve => {
					const script = document.createElement('SCRIPT')
					script.setAttribute('data-id', 'ybplayer')
					script.src = './uni_modules/yingbing-video/static/ybplayer.js'
					script.onload = () => {
						resolve()
					}
					document.body.appendChild(script)
				})
			}
		}
	}
</script>
<!-- #endif -->

<style>
	@import url(/uni_modules/yingbing-video/css/ybplayer.css);
	.yingbing-video {
		position: relative;
		overflow: hidden;
		width: 100%;
		height: 100%;
		background: inherit;
		background-color: inherit;
		background-image: inherit;
		/* 禁止用户选择视频内容 */
		-webkit-user-select: none!important; /* Safari */
		-moz-user-select: none!important;    /* Firefox */
		-ms-user-select: none!important;     /* IE/Edge */
		user-select: none!important;         /* 标准语法 */
	}
</style>
