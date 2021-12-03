<template>
	<view class="container">
		<!-- 基本信息 -->
		<view class="title-box">
			<view class="text-title">
				<text>基本信息</text>
			</view> 
		</view>
		<view class="box">
			<view class="text-box">
				<text>用户名</text>
			</view>		
			<text>:</text>
			<view class="input-box">
			<input class="name" type="text" placeholder="字母,数字或_,6-30位" />
			</view>
		</view>
		<view class="box">
			<view class="text-box">
				<text>密码</text>
			</view>
			<text>:</text>
			<view class="input-box">
				<input class="pwd" type="text" placeholder="不秒于于6" />
			</view>
		</view>
		<view class="box">
			<view class="text-box">
				<text>确认密码</text>
			</view> 
			 <text>:</text>
			<view class="input-box">	 
				<input class="name" type="text" placeholder="请再次输入密码" />
			</view>
		</view> 
		
		 <!-- 详细信息 -->
		<view class="title">
			<view class="title-box">
				<view class="text-title">
					<text>详细信息(用于身份核验，请务必正确填写)</text>
				</view> 
			</view>
		
		</view>
		<view class="box">
			<view class="text-box">
				<text>证件类型</text>
			</view>		
			<text>:</text>
			<view class="input-box">
				<input class="name" type="text" placeholder="中国居民身份证" />
				 <!-- <uni-combox label="" :candidates="" placeholder="" v-model=""></uni-combox> -->
			<!-- 	<uni-combox label="所在城市" :candidates="candidates" placeholder="请选择所在城市" v-model="city"></uni-combox> -->
			</view>
			
			<image class="img-right" src="../../static/images/login/right.png" mode=""></image>
				
		</view>
		<view class="box">
			<view class="text-box">
				<text>姓名</text>
			</view>
			<text>:</text>
			<view class="input-box">
				<input class="pwd" type="text" placeholder="请输入真实姓名以便购票" />
			</view>
		</view>
		<view class="box">
			<view class="text-box">
				<text>确认密码</text>
			</view> 
			 <text>:</text>
			<view class="input-box">	 
				<input class="name" type="text" placeholder="请再次输入密码" />
			</view>
		</view> 
		
		<!-- 联系方式 -->
		<view class="title">
			<view class="title-box">
				<view class="text-title">
					<text>联系方式</text>
				</view> 
			</view>
		 </view>
		<view class="box">
			<view class="text-box">
				<text>手机号码</text>
			</view>		
			<text>:</text>
			<view class="input-box">
			<input class="name" type="text" placeholder="请准确填写您的手机号" />
			</view>
		</view>
		<view class="box">
			<view class="text-box">
				<text>电子邮箱</text>
			</view>
			<text>:</text>
			<view class="input-box">
				<input class="pwd" type="text" placeholder="请准确填写邮箱地址" />
			</view>
		</view>
		
		<!-- 附加信息 -->
		<view class="title">
			<view class="title-box">
				<view class="text-title">
					<text>附加信息</text>
				</view> 
			</view>
			 
		</view>
		<view class="box">
			<view class="text-box">
				<text>旅客类型</text>
			</view>		
			<text>:</text>
			<view class="input-box">
			<input class="name" type="text" placeholder="成人" />
			</view>
		</view>
	
		<!-- 同意，服务条款等 -->
		<view class="bottom-box">
			<view class="bottom">
				<label>
				<checkbox/><text>同意</text>
				</label>
				<view class="Infor">
				<p class="text-server">《服务条款》</p>
				<p class="text-steady">《隐私权政策》</p>
			</view>
			</view>
		</view>
		<button class="btnLogin">下一步</button>
			
			
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
	@import './register.scss';
</style>
