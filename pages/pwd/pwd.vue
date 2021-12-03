<template>
	<view class="container">
		<view class="title"><text>输入密码</text></view>
		<view class="pwd-box">
			<view class="item"><input type="text" value="" /></view>
			<view class="item"><input type="text" value="" /></view>
			<view class="item"><input type="text" value="" /></view>
			<view class="item"><input type="text" value="" /></view>
		</view>
		<view class="center-box">
			<view class="item-box" v-for="(item, index) in q" :key="index">
				<text>{{ item }}</text>
			</view>
		</view>
		<view class="bottom-box">
			<label>返回</label>
			<label>删除</label>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			q: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
		};
	}
};
</script>

<style lang="scss">
@import './pwd.scss';
// .container{
// 	.title{
// 		background:#FFFFFF;
// 	}
//}
</style>
