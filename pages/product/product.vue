<template>
	<view class="container">
		<view class="123">
			<!-- 类别栏 -->
			<view class="class-box">
				<view class="text-title">
					<!-- <text>习酒</text> -->
				</view>
				<image class="img-add" src="../../static/images/product/add.png"></image>
			</view>
			<!-- 产品栏 -->
			<view class="product-box" v-for="(item,index) in prodcuts">
				<!-- 图片栏 -->
				<view>
					<image class="img-box" src="../../static/images/product/1998.jpeg"></image>
				</view>
				<!-- 文字栏 -->
				<view class="info-box">
					<view class="productName">
						{{item.Productname}}
					</view>
					<view class="info-other">
						<view class="info-left">
							<view class="productClass">
								香型：
							</view>
							<view class="productSpe">
								规格:{{item.Spec}}
							</view>
						</view>
						<view class="info-right">
							<view class="productPice">
								价格:{{item.Price}}
							</view>
						</view>

					</view>

				</view>
				<image class="img-edit" src="../../static/images/product/edit.png"></image>
			</view>
		</view>
		<!-- 购物车 -->
		<view class="bottom-box">
			<view class="left-box">

			</view>
			<view class="right-box">

			</view>
		</view>


	</view>

</template>

<script>
	export default {
		data() {
			return {
				prodcuts: [], //一级分类
				imageList: [],
			}
		},
		onReady() {},
		onLoad() {
			this.getProductInfo();
			// uni.startPullDownRefresh();
		},
		onPullDownRefresh() {

		},
		methods: {
			//获取全部产品信息
			getProductInfo() {
				uni.request({
					url: "http://119.3.66.245:8006/api/spirit/getproducts",
					success: (res) => {
						console.log(res.data.data);
						var data = res.data.data;
						this.prodcuts = data;
					}
				})
			},
			getCate2(autoid) {
				//console.log(autoid);
				uni.request({
					url: "http://119.3.66.245:8080/api/tuya/cate2?highid=" + autoid + "",
					success: (res) => {
						console.log(res.data.data);
						var data = res.data.data;
						this.cate2 = data;
						//console.log("cate2:" + this.cate2);
					}
				})
			},
			handleImage(e) { //转到另外一页，显示一张图片
				var navData = JSON.stringify(e); // 这里转换成 字符串
				console.log("navData:" + navData);
				uni.navigateTo({
					url: '../image/image?data=' + navData + '' //把参数传到另一页面
					//不能用  url:'pages/imagelist/list' 这种写法
				})
			},
			handleImageList(cateid) { //获取图像列表
				console.log(cateid);
				uni.request({
					url: "http://119.3.66.245:8080/api/tuya/getimage?cateid=" + cateid + "",
					success: (res) => {
						//console.log(res.data.data);
						var data = res.data.data;
						this.imageList = data;
						//console.log("cate2:" + this.cate2);
					}
				})
			}
		}
	}
</script>

<style>
	@import './product2.scss';
</style>
