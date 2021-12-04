<template>
	<view class="container">
		<!-- 基本信息 -->
		<view class="basic-box">
			<view class="text-box">
				基本信息
				<view v-if="isShow==true">
					<image class="img-box" src="../../static/images/sale/up.png" @click="Show"></image>
				</view>
				<view v-if="isShow==false">
					<image class="img-box" src="../../static/images/sale/down1.png" @click="Show"></image>
				</view>
			</view><!-- 日期 -->
			<view v-show="isShow" class="data-custom-box">
				<image class="img-box" src="../../static/images/sale/data.png"></image>
				<text class="t1">日期:</text>
				<text class="t2">{{ getDate.fulldate }}</text>
				<image class="img-right-box" src="../../static/images/login/right1.png" @click="openCalendar($event)">
				</image>

				<uni-calendar ref="calendar" class="uni-calendar--hook" :insert="false" :clear-date="true"
					@confirm="confirm" @close="close" />
			</view>
			<!-- 客户 -->
			<view v-show="isShow" class="data-custom-box">
				<image class="img-box" src="../../static/images/sale/choose.png"></image>
				<text class="t1">客户:</text>
				<text class="t2">{{ custom.c_name }}</text>
				<image class="img-right-box" src="../../static/images/login/right1.png" @click="showCustom"></image>
			</view>
		</view>
		<!-- 选择商品 -->
		<view class="checked-box">
			<view class="text-box">
				选择商品
				<view v-if="isShow==true">
					<image class="img-box" src="../../static/images/sale/up.png" @click="Show"></image>
				</view>
				<view v-if="isShow==false">
					<image class="img-box" src="../../static/images/sale/down1.png" @click="Show"></image>
				</view>
			</view>
			<view class="check-box">
				<image class="img-add" src="../../static/images/sale/add.png" @click="showProduct"></image>
			</view>
		</view>
		<!-- 隐藏按钮 -->
		<!-- <view style="display: flex;justify-content: center;"> -->
		<!-- <view><image src="../../static/images/sale/hide.png" style="width: 30rpx;height: 30rpx;"></image></view> -->
		<!-- 已经选择的商品列表 -->
		<!-- 可滚动区 -->
	<!-- 	<scroll-view scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scrolltoupper="upper"
		@scrolltolower="lower" @scroll="scroll"> -->
		<view class="list-cont">
			<scroll-view scroll-top="scrollTop" scroll-y="true" class="scroll-Y" enable-flex="true">	
			
				<unicloud-db v-slot:default="{data, loading, error, options}" collection="bus_cart">
					<!-- <view v-if="error">{{error.message}}</view> -->
					<view v-if="error">{{shopCars}}</view>
					<view v-else>
						<!-- {{shopCars}} -->
						<view class="cartItem" v-for="(item, index) in shopCars" :key="index" :data-index="index">
							<view v-show="checkShow">
								<checkbox class="item-Checkbox" />
							</view>
							<!-- <view class="imgBox"> -->
							<image src="../../static/images/cart-empty.png" mode="" class="cartImg"></image>
							<!-- </view> -->
							<view class="itemContent">
								<view class="tipTop">
									<!-- 产品名称等描述 -->
									<view class="pname">{{ item.p_name }}{{ item.spec }}</view>
									<!-- 产品单价 -->
									<view class="p-y">
										<view class="price">
											<view class="shishouTxt">单价:</view>
											<input type="number" v-model="item.price">
										</view>
										<view class="yinshou">
											<view class="shishouTxt">应收:</view>
											<input class="shishou" type="number" v-model="item.subtotal"> 
										</view>
									</view>
								</view>
								<!-- 产品价格及数量 -->
								<view class="tipBottom">
									<view class="money">    
										<view class="shishouTxt">
											实收:
										</view>
										<!-- <input type="number" v-model="item.price"> -->
										<view>
											<input class="shishou" type="text" v-model="item.money_shishou">
										</view>		
									</view>
									<view class="qtyBox">
										<view class="jian" @click="reduce(index)">-</view>
										<view class="qty">{{ item.num }}</view>
										<view class="jia" @click="add(index)">+</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</unicloud-db>
			
		</scroll-view>
	</view>
		<!-- 结算 -->
		<view class="moneytypeBox">
				<view class="data-custom-box">
					<text>结算方式</text>
					<image class="img-right-box" src="../../static/images/login/right.png" @click="open"></image>
				</view>
				<view class="data-custom-box">
					<text>实收合计</text><input class="qty" type='text' v-model="allMomeny">
					<image class="img-right-box" src="../../static/images/login/right.png" @click="openDialog"></image>
				</view>
			</view>
		
 		<!-- 底部操作按钮 -->
		
		<view class="bottom-Box">
			<view class="bt"><text>收银</text></view>
			<view class="bt"><text @click="saveClound">保存</text></view>
		</view>
		<!-- 弹出对话框 -->
		<uni-popup ref="popup" type="dialog">
			<uni-popup-dialog mode="input" message="成功消息" title="实收金额" value="对话框预置提示内容!" placeholder="请输入内容"
				:duration="2000" :before-close="true" @close="close" @confirm="confirm"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		components: {
		},
		data() {
			return {
				isShow: false,
				checkShow: false,
				id: '', //当前客户的autoid
				flag: '',
				getDate: {},
				custom: {
					autoid: '',
					c_name: ''
				},
				shopCars: [],
				cart:[],
				sale: [],
				itemMomeny:0,
				allMomeny:0 //实收合计数
			}
		},
		onReady() {},
		onLoad(item) {
			this.custom.autoid = getApp().globalData.selCustomId;
			this.custom.c_name = getApp().globalData.selCustomName;
			this.getDate.fulldate = getApp().globalData.saleDate;
			this.shopCars = getApp().globalData.carts;
			console.log("item:"+JSON.stringify(item));
			this.allMomeny=item.total;
			this.totalnum=getApp().globalData.totalnum;
			
			
			},
		onPullDownRefresh() {},
		methods: {	
			//上传销售表内容
			setSale(sno) {
				//可以直接将本地二维数组上传，前提是二维数组结构与云数据库表结构一致
				this.sale.push({
					sno: new Date().getTime().toString(),//销售单编号，以时间
					c_id:'',
					moneytotal_yinshou: 0, //总应收金额
					moneytotal_shishou: 0, //总实收金额
					money_type: '现金', //收款方式
					creater: '张三', //创建人,当前登录系统的用户
					create_date: new Date().toLocaleString(), //创建时间
					update_date:'' //修改时间
				});
				const db = uniCloud.database();
				db.collection('bus_sale').add(this.sale).then(res => {
					console.log(res);
				});
			},
			//上传销售详细表内容
			setSaleDetail(sno) {
				//可以直接将本地二维数组上传，前提是二维数组结构与云数据库表结构一致
				for(var item of this.shopCars){
					this.cart.push({
						c_id: this.custom.autoid,
						s_no:sno,
						p_id: item.p_id,
						p_name: item.p_name,
						price: item.price,
						unit: item.unit,
						num: item.num,
						subtotal: item.subtotal,
						money_shishou: Number(item.money_shishou)
					});
				}
				console.log("插入sno后的购物车内数据:"+JSON.stringify(this.cart));
				const db = uniCloud.database();
				db.collection('bus_sale_detail').add(this.cart).then(res => {
					console.log(res);
				});
			},
		 
			Show() {
				if (this.isShow == false) {
					this.isShow = true
				} else {
					this.isShow = false
				};
			},
			 
			//减少
			reduce(index) {
				console.log(index);
				if (this.shopCars[index].num == 1) {
					this.shopCars.splice(index, 1)			
					this.caleAllMomeny();
					return;
				}
				this.shopCars[index].num=this.shopCars[index].num-1;
				console.log("当前数量为："+this.shopCars[index].num)
				//应收
				this.shopCars[index].subtotal=this.shopCars[index].price*this.shopCars[index].num;
				//实收
				this.shopCars[index].money_shishou=this.shopCars[index].price*this.shopCars[index].num;
				//要计算器出应收与实收
				this.caleAllMomeny();
			},
			//增加
			add(index) {
				console.log(index);
				this.shopCars[index].num+=1;
				//要计算器出应收与实收
				this.shopCars[index].subtotal=this.shopCars[index].price*this.shopCars[index].num;
				this.shopCars[index].money_shishou=this.shopCars[index].price*this.shopCars[index].num;
				
				this.caleAllMomeny();
			},
			//计算出应加减而变化的相关总数
			caleAllMomeny(){
				//应收金额合计
				let subtotal=0;
				//实收金额合计
				let amount=0;
				//总数量
				let  totalnum=0;
				for(var item of this.shopCars){
					console.log(item);					
					subtotal=item.subtotal+subtotal;
					amount=item.money_shishou+amount;
					totalnum=item.num+totalnum;
				}
				console.log("subtotal:"+subtotal);
				console.log("amount:"+amount);
				console.log("totalnum:"+totalnum);
				this.allMomeny=amount;
				getApp().globalData.totalnum=this.totalnum;
				getApp().globalData.amount=this.allMomeny;
			},
			open(e) {
				console.log('打开窗体' + this.flag + e);
				if (this.flag == 'calendar') {
					//this.$refs.popup.open();
					this.$refs.calendar.open();
				} else if (this.flag == 'popup') {
					console.log('@@@@@@@');
					this.$refs.popup.open('center');
				}
			},
			openCalendar(event) {
				console.log(event.currentTarget);
				this.flag = 'calendar';
				this.open();
			},
			close() {
				//console.log('弹窗关闭');
				this.flag == 'calendar' ? this.$refs.calendar.close() : this.$refs.popup.close('center');
				// if(this.flag=='calendar')
				// {
				// 	//this.$refs.popup.open();
				// 	this.$refs.calendar.close();
				// }
				// else if(this.flag=='popup')
				// {
				// 	console.log("@@@@@@@");
				// 	this.$refs.popup.close('center');
				// }
			},
			confirm(e) {
				this.getDate = e;
				getApp().globalData.saleDate = this.getDate.fulldate;
				console.log(this.getDate);
			},
			showCustom() {
				uni.navigateTo({
					url: '../custom/custom'
				});
				getApp().globalData.initProdcutList = 'select';
				//console.log(getApp().globalData.initCustomList);
			},
			showProduct() { 
				this.caleAllMomeny();
				uni.navigateTo({
					url: '../index/index1'
				});
				getApp().globalData.isProdcutList = false;
			},
			openPopup() {
				this.flag = 'popup';
				this.open();
			},
			saveClound() {
				//上传到云数据库中的销售表中,在这里不存在修改云数据情况出现
				var sno=new Date().getTime().toString()
				this.setSale(sno);
				this.setSaleDetail(sno);
			}
		}
	};
</script>

<style lang="scss" scoped>
	@import './sale.scss';
</style>
