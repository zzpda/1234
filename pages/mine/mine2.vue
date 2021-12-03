<template>
	<view class="container">
		<!-- 是带圆弧的图 -->
		
		<image class="img-top" src="../../static/images/mine2/top-bg.png"></image>
		 
		 <image class="img-user" src="/../static/images/mine2/card.png"></image>
		 
		 
		 
		<!-- 中间的钱包与积分栏-->
		<view class="center-box">
			<view class="centeritem-box">
				<view class="valueTxt">2205</view>
				<view class="infoTxt">我的钱包</view>
			</view>
			<view class="centeritem-box">
				<view class="valueTxt">2205</view>
				<view class="infoTxt">积分</view>
			</view>
		</view>
		<!-- 我的订单栏 -->
		<view class="order-box">
			<view class="titleTxt">我的订单</view>
			<view class="content-box" >
				<view class="contentitem-box" v-for="(item,index) in orders" :key="index"><!-- 注意v-for所放置的位置 -->
					<image class="img-item" :src="item.image"></image>
					<view class="itemnameTxt">{{item.title}}</view>
				</view>
			</view>
		</view>
		
		<!-- 我的卡券 -->
		<view class="order-box">
			<view class="titleTxt">我的卡券</view>
			<view class="content-box">	
				<view class="contentitem-box" v-for="(item,index) in cards" :key="index">
					<image class="img-item" :src="item.image" ></image>
					<view class="itemnameTxt">{{item.title}}</view>
				</view>
			</view>
		</view>
		
		<!-- 我的收藏 -->
		<view class="order-box">
			<view class="item-box" v-for="(item,index) in stores" :key="index">
				<image  class="img-item" :src="item.image"></image>
				<view class="nameTxt">{{item.title}}</view>
				<image class="img-more" src="../../static/images/mine2/more.png" ></image>
			</view>
			<view class="itembottom-box"> </view>
		
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				orders:[
					{id:'1',image:'../../static/images/mine2/take.png',title:'待收货'},
					{id:'2',image:'../../static/images/mine2/send.png',title:'待发货'},
					{id:'3',image:'../../static/images/mine2/change.png',title:'待收款'},
					{id:'4',image:'../../static/images/mine2/finish.png',title:'已完成'},
					{id:'5',image:'../../static/images/mine2/server.png',title:'售后'},
				],
				cards:[
					{id:'6',image:'../../static/images/mine2/card.png',title:'我的卡券'},
					{id:'7',image:'../../static/images/mine2/money.png',title:'优惠券'},
					{id:'8',image:'../../static/images/mine2/takecard.png',title:'领券中心'},
					{id:'9',image:'../../static/images/mine2/change.png',title:'我的兑换'},					
				],
				stores:[
					{id:'10',image:'../../static/images/mine2/mystore.png',title:'我的收藏'},
					{id:'11',image:'../../static/images/mine2/fast.png',title:'秒杀'},
					{id:'12',image:'../../static/images/mine2/addr.png',title:'地址管理'},
					{id:'14',image:'../../static/images/mine2/phone.png',title:'联系我们'},
					{id:'15',image:'../../static/images/mine2/servercenter.png',title:'服务中心'},
					{id:'16',image:'../../static/images/mine2/bind.png',title:'绑定手机'},
					{id:'17',image:'../../static/images/mine2/online.png',title:'在线客服'},
					{id:'17',image:'../../static/images/mine2/about.png',title:'关于我们'},
					{id:'17',image:'../../static/images/mine2/clear.png',title:'清除缓存'},
				]
			}
		}
	}
	
	
</script>

<style>
@import './mine2.scss';
</style>
