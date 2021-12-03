<template>
	<view class="container">
		<!-- 上半部分 -->
		<view class="top-box">
			<image class="img-top" src="../../static/images/mine3/tu.png"></image>
			<text class="name">匆匆那年</text> 
		</view>
		<!-- 中间的浮动栏-->
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
		<!-- 下半部分 -->
		<view class="bottom-box">
			<view class="item-box" v-for="(item,index) in orders" :key="index"><!-- 注意v-for所放置的位置 -->
					<image class="img-item" :src="item.image"></image>
					<view class="itemnameTxt">{{item.title}}</view>
				</view>
		</view>	 
		<view class="btn-box">
			退出登录
		</view>
	</view>
</template>

<script>
	import {orders3 as orders} from '../../api/mine.js';
	export default {
		data() {
			return {
				orders:[//为空，引用外部文件
					// {id:'1',image:'../../static/images/mine3/book.png',title:'帮助手册'},
					// {id:'2',image:'../../static/images/mine3/mail.png',title:'问题反馈'},
					// {id:'3',image:'../../static/images/mine3/contact.png',title:'联系客服'},
					// {id:'4',image:'../../static/images/mine3/pro.png',title:'用户协议'},
					// {id:'5',image:'../../static/images/mine3/lock.png',title:'隐私政策'},
					// {id:'5',image:'../../static/images/mine3/ver.png',title:'当前版本'}
				]
			}
		},
		created(){
		this.orders=orders
			},
		// mounted(){
		// this.orders=orders
		// 	}
	}
	
	
</script>

<style>
@import './mine3.scss';
</style>
