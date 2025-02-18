<template>
	<view class="status-bar">
		<!-- 这里是状态栏 -->
	</view>
</template>

<script>
	export default {
		name:"StatusBar",
		data() {
			return {
				
			};
		}
	}
</script>

<style>
	.status-bar {
		position: sticky;
		top:0;
		height: var(--status-bar-height);
		width: 100%;
		background-color: #ffffff;
		z-index: 999;
	}
</style>