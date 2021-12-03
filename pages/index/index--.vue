<template>
	<view class="container">
		<view class="add-box">
			<view class="text-title"><!-- <text>习酒</text> --></view>
			<image class="img-add" src="../../static/images/product/add.png"></image>
		</view>
		<!-- <scroll-view scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scrolltolower="lower" @scroll="scroll"> -->
		<scroll-view scroll-top="scrollTop" scroll-y="true" class="scroll-Y" >	
			<unicloud-db v-slot:default="{data, loading, error, options}" collection="bus_products">
				<view v-if="error">{{error.message}}</view>
				<view v-else>
					
				
				<!-- 产品栏 -->
				<view class="product-box" v-for="(item, index) in data">
					<!-- 图片栏 -->
					<view><image class="img-box" src="../../static/images/product/1998.jpeg" @click="handleImage"></image></view>
					<!-- 文字栏 -->
					<view class="info-box">
						<view class="productName">{{ item.productname }}</view>
						<view class="info-other">
							<view class="info-left">
								<view class="productClass">香型：</view>
								<view class="productSpe">规格:{{ item.spec }}</view>
							</view>
							<view class="info-right">
								<view class="productPice">价格:{{ item.price }}</view>
							</view>
						</view>
					</view>
					<view v-if="!show"><image class="img-edit" src="../../static/images/product/tocar.png" @click="arrayAdd(item)"></image></view>
					<view v-else><image class="img-edit" src="../../static/images/product/edit.png" ></image></view>
				</view>
			</view>
			</unicloud-db>
			<view class="empty-box"></view>
		</scroll-view>

		<!-- 加入一个空格 -->
		

		<!-- 购物车 -->
		<!-- <view class="bottom-box" v-if="style == 'select'"> -->
		<!-- v-show在微信小程序里不被支持，所以为了兼容，采用了下面的写法 -->
		<view class="bottom-box" :style="!show?'':'display:none'" >
			<view class="car-box">
				<image class="img-car" src="../../static/images/product/car.png"></image>
				<view class="num-box">
					<text>{{ allNum }}</text>
				</view>
				<view class="sum">合计:{{allTotal}}</view>
			</view>
			<view class="ok-box" @click="oK">选好了</view>
			
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			c_id:'',//客户编号
			prodcuts: [], //一级分类
			imageList: [],
			id: '', //被选中商品的id(autoid)
			num: 0, //数量
			price: 0, //商品价格
			unit:'',
			addtotal: 0, //新增加金额
			subtotal: 0, //每种商品小计金额
			total: 0, //合计金额***错误
			allNum:0,//所有货品的数量
			allTotal:0,//所有货品的总金额
			p_name:'',//商品名称
			cart:[],
			show:'',
			product:{
				autoid:'',
				cno:'',
				price:'',
				productclass:'',
				productname:'',
				qty_box:'',
				spec:'',
				unit:'',
				_id:''
			}
		};
	},
	onReady() {},
	onLoad() {
		//需要判断当前样式:list或list
		this.show = getApp().globalData.isProdcutList;
		console.log("当前样式："+this.show)
		this.c_id=getApp().globalData.selCustomId;
		this.allTotal=getApp().globalData.amount==isNaN()?0:getApp().globalData.amount;//实收总金额
		this.allNum=getApp().globalData.totalnum;
		console.log("被选中客户ID："+this.c_id);
	},
	onPullDownRefresh() {},

	methods: {
		//向购物车中增加货品 本地arrary操作
		arrayAdd(item) {
			console.log(JSON.stringify(item));
			this.id = item.autoid;
			this.price = item.price;
			this.unit=item.unit;
			this.p_name=item.productname;
			//
			var r =  getApp().globalData.carts.find(obj => obj.p_id == this.id)
			console.log(r)
			if (r == undefined) {
				//新增操作
				 getApp().globalData.carts.push({
					p_id: this.id,
					p_name:this.p_name,
					num: 1,
					unit:this.unit,
					price: this.price,
					subtotal: this.price,
					money_shishou:this.price*1
				});
				this.num = this.num + 1;
				this.total = this.price;
				this.allNum=Number(this.allNum)+1;
				this.allTotal=Number(this.allTotal)+Number(this.total);
				console.log('新增操作后购物车：'+JSON.stringify( getApp().globalData.carts));
			} else {
				for (var i = 0; i <  getApp().globalData.carts.length; i++) {
					console.log('it:' + i + '-----this.id:' + this.id)
					if ( getApp().globalData.carts[i].p_id == this.id) {
						// console.log('进入循环体!');
						// console.log('this.cart[i].id:' + this.cart[i].id);
						// console.log('this.id:' + this.id);
						this.num =  getApp().globalData.carts[i].num + 1;
						//所有货品的总数量
						
						//新增加金额
						this.addtotal = this.price * 1;
						//当前小计金额=当前价格*当前数量
						this.subtotal = this.price * this.num;
						console.log('this.num:' + this.num);
						//console.log('@@@@@@@@@it:'+it);
						 getApp().globalData.carts.splice(i, 1);
						//console.log('删除数组某一数据');
						 getApp().globalData.carts.push({
							p_id: this.id,
							p_name:this.p_name,
							num: this.num,
							unit:this.unit,
							price: this.price,
							subtotal: this.subtotal,
							money_shishou:this.subtotal
						});
						//当前货品的小计金额
						this.allTotal = Number(this.allTotal) + Number(this.addtotal);
						
						this.allNum=Number(this.allNum)+1;
						//console.log("循环体中if内新增！");	
						console.log('修改操作后购物车里内容:' + JSON.stringify( getApp().globalData.carts));
						console.log('合计金额：' + this.allTotal);
						break
					}						 
				}
			}
		},
		
		oK() {
			console.log("this.allTotal:"+this.allTotal);
			 getApp().globalData.allTotal=this.allTotal;
			 getApp().globalData.totalnum=this.allNum;
			uni.redirectTo
			({
				url: '../sale/sale2?total='+this.allTotal,
			});
		}
	}
};
</script>

<style>
	@import './index.scss'; 
</style>

