<template>
	<view class="container">
		<image class="bg-set" src="../../static/images/main/bg.jpeg"></image>
		<view class="content">
			<view class="top-box">
				<view class="top-item">
					<view class="title">
						<label>今日销售额</label>
						<label>*****元</label>
					</view>
					<image class="top-img" src="../../static/images/main/border.png"></image>
					<view class="title">
						<label>本周销售额</label>
						<label>*****元</label>
					</view>
				</view>

				<view class="top-item">
					<view class="title">
						<label>本月销售额</label>
						<label>*****元</label>
					</view>
					<image class="top-img" src="../../static/images/main/border.png"></image>
					<view class="title">
						<label>当前库存数</label>
						<label>*****元</label>
					</view>
					</view>
					<button class="top-button">查看详细信息</button>
				
			</view>
			<view class="center-box">
					<view class="row">
						<view class="center-item" @click="showProduct">
							<image class="item-img" src="../../static/images/main/product.png"></image>
							<text class="text-item">产品管理</text>
						</view>
						<view class="center-item" @click="showCustom">
							<image class="item-img" src="../../static/images/main/custom.png"></image>
							<text class="text-item">客户管理</text>
						</view>
						<view class="center-item" @click="handlerSale">
							<image class="item-img" src="../../static/images/main/order.png"></image>
							<text class="text-item">销售开单</text>
						</view>
						<view class="center-item" @click="showPwd">
							<image class="item-img" src="../../static/images/main/custom2.png"></image>
							<text class="text-item">更多</text>
						</view>
						<view class="center-item" @click="showContact">
							<image class="item-img" src="../../static/images/main/custom2.png"></image>
							<text class="text-item">通讯</text>
						</view>
						<view class="center-item" @click="showAuth">
							<image class="item-img" src="../../static/images/main/custom2.png"></image>
							<text class="text-item">授权</text>
						</view>
					</view>
				</view>
			
		</view>
	</view>
</template>

<script>
	//第四步：
	import  {mapState} from 'vuex'
	export default {
		data() {
			return {
				list: []
			};
		},
		computed:{
			...mapState(['isLogin'])
		},
		methods: {
		handlerSale(){
				if(!this.isLogin){
					this.showAuth();
				}
				else{
					this.showSale();
				}
			},
			showAuth() {
				uni.navigateTo({
					url: '../auth/auth'
				});
			},
			showContact() {
				uni.navigateTo({
					url: '../telcontact/telcontact'
				});
			},
			showProduct() {
				console.log('点击了产品管理')
				getApp().globalData.isProdcutList = true;
				uni.navigateTo({
					url: '../index/index1'
				});
			},
			showCustom() {
				getApp().globalData.initCustomList = 'list';
				uni.navigateTo({
					url: '../custom/custom'
				});
			},
			showSale() {
				getApp().globalData.initProdcutList = 'list';
				getApp().globalData.carts = [];
				uni.navigateTo({
					url: '../sale/sale2'
				});
			},
			showPwd() {
				uni.navigateTo({
					url: '../pwd/pwd'
				});
			}
		}
	};
</script>

<style>
	@import './main.scss';
</style>
