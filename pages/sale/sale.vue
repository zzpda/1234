<template>
	<view class="container">
		<!-- 基本信息 -->
		<view class="basic-box">
			<view class="text-box">基本信息
				<image  style="width:40rpx;height: 40rpx;margin-left:auto" src="../../static/images/sale/up.png"></image>
			</view>
			<!-- 日期 -->
			<view class="data-custom-box">
				<image class="img-box" src="../../static/images/sale/data.png"></image>
				<text class="t1">日期:</text>
				<text class="t2"> {{getDate.fulldate}}</text>
				<image class="img-right-box" src="../../static/images/login/right.png" @click="open"></image>

				<uni-calendar ref="calendar" class="uni-calendar--hook" :insert="false" :clear-date="true"
					@confirm="confirm" @close="close" />
			</view>
			<!-- 客户 -->
			<view class="data-custom-box">
				<image class="img-box" src="../../static/images/sale/choose.png"></image>
				<text class="t1">客户:</text>
				<text class="t2">{{custom.c_name}}</text>
				<image class="img-right-box" src="../../static/images/login/right.png" @click="showCustom"></image>
			</view>
		</view>
		<!-- 选择商品 -->
		<view class="checked-box">
			<view class="text-box">选择商品</view>
			<view class="check-box">
				<image class="img-add" src="../../static/images/sale/add.png" @click="showProduct"></image>
			</view>
		</view>
		<view style="display: flex;justify-content: center;">
			<image src="../../static/images/sale/hide.png" style="width: 30rpx;height: 30rpx;"></image>
		</view>
		<!-- 已经选择的商品列表 -->
		<view class="cartListBox">
			<scroll-view scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scrolltoupper="upper"
				@scrolltolower="lower" @scroll="scroll">

				<view class="cartItem" v-for="(item,index) in shopCars" :key="index" :data-index="index">
					<view v-show="display">
						<checkbox class="item-Checkbox" />
					</view>
					<!-- <view class="imgBox"> -->
					<image src="../../static/images/cart-empty.png" mode="" class="cartImg"></image>
					<!-- </view> -->
					<view class="itemContent">
						<view class="tipTop">
							<!-- 产品名称等描述 -->
							<view class="pname">
								{{item.p_name}}{{item.spec}}
							</view>
							<!-- 产品单价 -->
							<view class="p-y">
								<view class="price">
									单价:{{item.price}}
								</view>
								<view class="yinshou">
									应收:{{item.price}}
								</view>
							</view>
						</view>
						<!-- 产品价格及数量 -->
						<view class="tipBottom">
							<view class="money">
								<view style="display: flex;flex-direction: row;width:120rpx;">实收:</view>
								<input type="text" v-model="item.price" style="margin-right:15rpx;" />
							</view>
							<view class="qtyBox">
								<view class="jian">-</view>
								<view class="qty">{{item.qty}}</view>
								<view class="jia">+</view>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<!-- 结算 -->
		<view class="bottom">
			<view class="data-custom-box">
				<text>结算方式</text>
				<image class="img-right-box" src="../../static/images/login/right.png" @click="open"></image>
			</view>
			<view class="data-custom-box">
				<text>实收合计</text>
				<image class="img-right-box" src="../../static/images/login/right.png" @click="open"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		uniCalendar
	} from '@dcloudio/uni-ui';
	export default {
		components: {
			uniCalendar
		},
		data() {
			return {
				getDate: {},
				custom: {
					autoid: '',
					c_name: '',
				},
				shopCars: [],
				shopCar: {
					p_id: '',
					p_name: '',
					p_unit: '',
					p_price: '',
					p_amount: '',
				},
			}
		},
		onReady() {

		},
		onLoad() {
			this.custom.autoid = getApp().globalData.selCustomId;
			this.custom.c_name = getApp().globalData.selCustomName;
			this.getDate.fulldate = getApp().globalData.saleDate;
			console.log(this.getDate.fulldate);
			this.getShopCar();
		},
		onPullDownRefresh() {

		},
		methods: {
			open() {
				this.$refs.calendar.open();
			},
			close() {
				console.log('弹窗关闭');
			},
			confirm(e) {
				this.getDate = e;
				getApp().globalData.saleDate = this.getDate.fulldate;
				console.log(this.getDate);
			},
			showCustom() {
				uni.navigateTo({
					url: '../custom/custom'
				})
				getApp().globalData.initProdcutList = 'select';
				//console.log(getApp().globalData.initCustomList);
			},
			showProduct() {
				console.log("开始选择商品！");
				uni.navigateTo({
					url: '../index/index'
				});
				getApp().globalData.initProdcutList = 'select';
			},
			getShopCar() {
				uni.request({
					//请求路径
					url: "http://119.3.66.245:8006/api/Spirit/getShopCar",
					//请求方法			
					//method: 'POST',
					header: {
						'Content-Type': 'application/json',
						//'Content-Type': 'application/x-www-form-urlencoded'
					},
					data: {
						//autoid:getApp().globalData.selCustomId,
					},
					success: (res) => {
						console.log(res);
						var data = res.data;
						this.shopCars = data;
						console.log(this.shopCars);

					}
				});
			}

		}
	}
</script>

<style>
	@import './sale.scss';
</style>
