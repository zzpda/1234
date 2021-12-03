<template>
	<view class="container">
		<view class="add-box">
			<view class="text-title">
						<!-- <text>习酒</text> -->
			</view>
			<image class="img-add" src="../../static/images/product/add.png"></image>
		</view>
		<scroll-view scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scrolltoupper="upper" @scrolltolower="lower"
				@scroll="scroll">
				<!-- 类别栏 -->
				
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
					<view v-if="style=='list'">
						<image class="img-edit" src="../../static/images/product/edit.png"></image>
					</view>
					<view  v-else>
						<image class="img-edit" src="../../static/images/product/tocar.png" @click="updatetarrayitem(index)"></image>
					</view>
				</view>			
			</scroll-view >

		<!-- 加入一个空格 -->
		<view class="empty-box">
			
		</view>
		
		<!-- 购物车 -->
		<view class="bottom-box" v-if="style=='select'">
			<view class="car-box">
				<image class="img-edit" src="../../static/images/product/car.png"></image>
				<view class="num-box">
					<text>{{num}}</text>
				</view>
				<view class="sum">
					合计:
				</view>
			</view>
			<view class="ok-box">
				选好了
			</view>
		</view>
	</view>
</template>

<script>
	var style='list';
	export default {
		data() {
			return {
				prodcuts: [], //一级分类
				imageList: [],
				id:'',//被选中商品的id(autoid)
				num:0,//数量
				cart:[]
			}
		},
		onReady() {},
		onLoad() {
			//_this=this;
			this.getProductInfo();
			this.style=getApp().globalData.initProdcutList;
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
			},
			addCartList(index){	
				this.id=this.prodcuts[index].autoid;				
				this.num=this.num+1;//总数量
				this.cart.push({ //向数组中增加内容
					id:this.id,
					num:1,
				});
				uni.setStorageSync("cart",JSON.stringify(this.cart));
				console.log("加入到购物车了!id:"+this.id+"  num:"+this.num);
				console.log("购物车:"+JSON.stringify(this.cart));
				this.arrayLookup(this.cart,"id",this.id,"num");
				console.log("购物车:"+JSON.stringify(this.cart));
			},
			arrayLookup(data,key,value,targetKey){//在数组中按条件查找
			    var targetValue = "";
				var index=0;
			    for (var i = 0; i < data.length; i++) {
			        if(data[i][key]==value){
			           // targetValue = data[i][targetKey];//当前数组中已有数量												//targetValue=targetValue+1;	
						index=i;    
						console.log("当前数据在购物车数组中的下标是："+index);
						data[i]["num"]=data[i]["num"]+1;
						//data.splice(index,1,(data[i]["id"],5));
						// console.log("购物车已有该数据了!id:"+this.id+"  num:"+targetValue);
			       
						break;
			        }
			    }
			    return targetValue;
			},
			updatetarrayitem(index){
				this.id=this.prodcuts[index].autoid;
				console.log("当前数据的ID是："+this.id);	
					
				if(this.cart.length==0){
					this.cart.push({ //向数组中增加内容
						id:this.id,
						num:1,
					});
				}
				else{
					for(var i=0;i<this.cart.length;i++){
						console.log("this.id："+this.id);
						console.log("this.cart[i][id]："+this.cart[i]["id"]);
						if(this.cart[i]["id"]==this.id){
							//修改数组中原有的数据要
							var n=this.cart[i]["num"];
							console.log("修改操作，当前数据在购物车数组中的num是："+this.n);
							n=n+1;
						}
						else{
							//在数组中增加数据
							this.cart.push({ //向数组中增加内容
								id:this.id,
								num:1,
							});
							console.log("增加操作，当前在购物车数组中的num是："+n);
						}
						
						break;
					}
				}
				console.log("购物车:"+JSON.stringify(this.cart));
			}
		}
	}
</script>

<style>
	/* @import './product2.scss'; */
	page {
		height:100%;
		width: 100%;
		background-color: #eeeeee;
	}
	.container{
		height: 100%;
		/* padding: 30rpx; */
		display: flex;
		flex-direction:column;
	}
	
	.add-box{
		height:80rpx;
		width: 100%;	
		display: flex;
		flex-direction: row;
		align-items: center;
		border-bottom: 1rpx solid #C0C0C0;
		.text-title{
		margin-left: 20rpx;
		align-items: center;
		font-size: 30rpx;
		color: #999999;
		}
	}
	
	.scroll-Y{
		padding:5rpx; 
		flex:1;
		background:#ffffff;
		margin-top:2rpx;
		border-radius: 20rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
		
	.bottom-box{
			height: 200rpx;
			width: 100%;
			//line-height: 200rpx;//line-height与height一样高时文字垂直居中
			/* border-radius: 25rpx; */
			background: #fa0000;
			color: #DDDDDD ;
		}
		
	
	
	
	
	.img-add{
		width: 60rpx;
		height: 60rpx;
		margin-left: 650rpx;
	}
	.product-box{
		width:  100%;
		height: 180rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		// justify-content: center;
		background: #ffffff;
		border-bottom: 1rpx solid #C0C0C0;
		font-size: 30rpx;
		color: #626262;
	}
	.img-box{
		margin-left: 20rpx;
		width:110rpx;
		height:110rpx;
		border: 1rpx solid #c9dce6;
		border-radius: 15rpx;
	}
	.info-box {
		margin-left: 20rpx;
		height:140rpx;  
		width: 65%;
	}
	.productName{
		font-size: 30rpx;
		color: #333333;
		height: 35%;
	}
	.info-other{
		display: flex;
		flex-direction: row;
		font-size: 25rpx;
		color: #bfbfbf;
		height: 65%;
		width: 100%;
		//background: #666666;
	}
	.info-left{
		// margin-left: 10rpx;
		width: 230rpx;
		font-size: 25rpx;
		color: #bfbfbf;
	}
	.info-right{
		width: 100rpx;
		margin-left: 30rpx;
		font-size: 25rpx;
		color: #bfbfbf;
	}
	.img-edit{
		width:60rpx;
		height:60rpx;
		margin-left: 15rpx
	}
	.img-add{
		margin-right: 20rpx;
	}
	
	.empty-box{
		width: 100%;
		height: 100rpx;
		background: #ffffff;		
	}
	
	.bottom-box{
		width: 100%;
		height: 100rpx;
		background: #ffffff;
		display: flex;
		flex-direction: row;
		border-top: 1rpx solid #4CD964;
	}
	
	.car-box{
		height: 100rpx;
		line-height: 100rpx;
		width: 85%;
		text-align: center;
		display: flex;
		flex-direction: row;
		align-items: center;
		
	}
	
	.num-box{
		height: 40rpx;
		width: 40rpx;
	
		margin-left: -20rpx; 
		border-radius: 40rpx;
		background: #DD524D;
		display: flex;
		justify-content: center; 
		align-items: center;
		margin-top: -3rpx;
		font-size:5rpx;
	}
	
	.sum{
		 margin-left:210ropx;
		 color: #DD524D;
		
	}
	.ok-box{
		height: 100rpx;
		line-height: 100rpx;
		width: 50%;
		text-align: center;
		background: red;
	}
	
	
</style>
