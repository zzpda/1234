<template>
	<view class="container">
		<image class="bg-set" src="../../static/images/login/bg.jpg"></image>
		<view class="content">	
			<view class="log-box">
				<image class="bg" src="../../static/images/login/12306.jpeg" mode=""></image>
			</view>

			<p class="P1">欢迎登录</p>
			<view class="type-box">
				<p class="P2">帐号登录</p>
					<view class="border-box">
						<image src="../../static/images/login/border.png" ></image>
					</view>
				<p class="P2">指纹登录</p>
			</view>
			<view class="input">
				<view class="inputBox">
					<label>用户</label>
					<view class="border-box">
						<image src="../../static/images/login/border.png" ></image>
					</view>
					<input class="name" type="text" placeholder="请输入你的用户名" />
				</view>
				<view class="inputBox">
					<label>密码</label>
					<view class="border-box">
						<image src="../../static/images/login/border.png" ></image>
					</view>
					<input type="text" placeholder="请输入你的用户名" />
				</view>
			</view>
			<p class="forgetPwd">忘记密码?</p>
			<button class="btnLogin">登录</button>
			<button class="btnReg">注册</button>
			<view class="Infor">
				<p class="text-server">《服务条款》</p>
				<p class="text-steady">《隐私权政策》</p>
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss" scoped>
	 @import './login.scss';
</style>
