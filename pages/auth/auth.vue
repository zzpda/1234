<template>
	<view class="container">
		<view class="banner" style="height: 400rpx;background-color: #4CD964;"></view>
		<view class="box">
			<button class="btn-box b-shadow" style="display: none;"  open-type="getPhoneNumber" @click="getPhoneNumber">授权获取手机</button>
			<button class="btn-box b-shadow" @click="getUserProfile">授权登录</button>
			<button class="btn-box b-shadow" style="display: none"  @click="getLocation">授权获取地理信息</button>
			<view class="title-box">
				我已阅读且同意！
				<text class="text-color" @tap="handlerUserPro1">《用户协议》</text>
				和
				<text class="text-color" @tap="handlerUserPro2">《隐私政策》</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo: {},
				hasUserInfo: false
			};
		},
		methods: {
			handlerAuth() {
				uni.login({
					provider: 'univerify',
					univerifyStyle: {
						fullScreen: true
					}
				});
				// success: function (loginRes) {
				//   console.log(loginRes);

				//
			},
			handlerUserPro2() {
				console.log('2');
			},
			getUserProfile(e) {
				// var that=this;
				// // An highlighted block
				//  wx.showModal({
				//    title: '温馨提示',
				//    content: '正在请求您的个人信息',
				//    success(res) {
				//      if (res.confirm) {
				//        wx.getUserProfile({
				//        //desc: "获取你的昵称、头像、地区及性别",  //不写不弹提示框
				//        success: res => {
				//          console.log(res)
				//          let wxUserInfo = res.userInfo;
				//        },
				//        fail: res => {
				//        	 //拒绝授权
				//          that.showErrorModal('您拒绝了请求');
				//          return;
				//        }
				//      })} else if (res.cancel) {
				//        //拒绝授权 showErrorModal是自定义的提示
				//        that.showErrorModal('您拒绝了请求');
				//        return;
				//      }
				//  });
				//    }
				// return;
				
				
				wx.getUserProfile({
						desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
						success: res => {
							console.log('获取了res:'+res);
							uni.showToast({
								title: this.res,
								icon: 'none'
							});
							console.log(res);
							 uni.login({
							        provider: 'weixin',
							        success: ret=> {
										console.log('ret:'+ret)
							          let code= ret.code
							          //let openid = await this.getOpenid(code)
							          // 接口仅作演示
							          // ajax('getUserInfo', {
							          //   iv: iv,
							          //   encryptedData: encryptedData,
							          //   openid: openid
							          // }, result=> {
							          //   // 获取用户信息成功
							          //   uni.setStorageSync('userInfo', result.data)
							          // })
							        }
							      })
							// this.setData({
							//   userInfo: res.userInfo,
							//   hasUserInfo: true
							// })
						},
						fail: err => {
							if (err.errMsg.includes('fail auth deny')) {
								uni.showModal({
									title: '提示',
									content: '您取消了授权登录，请重新授权',
									showCancel: false
								});
							}
						}
					});
				return;
				//https://www.jianshu.com/p/230299b3d5b3
				
				// 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
				// 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
				wx.getSetting({
					success:(res)=>{
						console.log(res);
						if(res.authSetting['scope.userInfo']==undefined || res.authSetting['scope.userInfo']==true)
						{
							wx.showModal({
									title: '请求授权获取用户信息',
									content: '需要获取您的用户信息，请确认授权',
									success: function(res) {
										if (res.cancel) {
											//取消授权
											wx.showToast({
												title: '拒绝授权',
												icon: 'none',
												duration: 1000
											})
										} else if (res.confirm) {
											//打开微信设置界面
											wx.openSetting({
												success: function(res) {
													if (res.authSetting[
															"scope.userInfo"] ==
														true) {
														wx.showToast({
															title: '授权成功',
															icon: 'success',
															duration: 1000
														})
													} else {
														wx.showToast({
															title: '授权失败',
															icon: 'none',
															duration: 1000
														})
													}
												}
											})
										} else if (res.authSetting['scope.userInfo'] ==
											undefined) {
											wx.getUserProfile({
													desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
													success: res => {
														console.log(res);
														uni.showToast({
															title: this.res,
															icon: 'none'
														});
														// this.setData({
														//   userInfo: res.userInfo,
														//   hasUserInfo: true
														// })
													},
													fail: err => {
														if (err.errMsg.includes('fail auth deny')) {
															uni.showModal({
																title: '提示',
																content: '您取消了授权登录，请重新授权',
																showCancel: false
															});
														}
													}
												});
											
											//进行获取个人信息操作
										} else {
											console.log('授权成功')
							
										}
									},
								});
							
						}
					}
				})
				
				
				
				
				},
			appLoginWx() {
				// #ifdef MP-WEIXIN
				uni.getProvider({
					service: 'oauth',
					success: function(res) {
						if (~res.provider.indexOf('weixin')) {
							uni.login({
								provider: 'weixin',
								success: res2 => {
									uni.getUserInfo({
										provider: 'weixin',
										success: info => {
											//这里请求接口
											console.log(res2);
											console.log(info);
										},
										fail: () => {
											uni.showToast({
												title: '微信登录授权失败',
												icon: 'none'
											});
										}
									});
								},
								fail: () => {
									uni.showToast({
										title: '微信登录授权失败',
										icon: 'none'
									});
								}
							});
						} else {
							uni.showToast({
								title: '请先安装微信或升级版本',
								icon: 'none'
							});
						}
					}
				});
				//#endif
			},
			wxGetUserInfo() {
				uni.getUserInfo({
					provider: 'weixin',
					//授权成功的回调
					success: res => {
						console.log(res);
						uni.showToast({
							title: '授权成功',
							icon: 'none'
						});
						console.info(res.data);
						this.userInfo = res.userInfo;
						//that.login(res.data);//授权成功调用自己的登录方法就可以了
					},
					//第一次进入小程序
					fail: () => {
						uni.showToast({
							title: '请点击授权进行登录',
							icon: 'none'
						});
					}
				});
			},
			wxGetLocation() {


				wx.getLocation({
					type: 'wgs84',
					success(res) {
						console.log(res);
						const latitude = res.latitude;
						const longitude = res.longitude;
						const speed = res.speed;
						const accuracy = res.accuracy;
					}
				});
			},
			getPhoneNumber(e) {
				console.log(e.detail.errMsg);
				console.log(e.detail.iv);
				console.log(e.detail.encryptedData);
			},
			getLocation() {
				//https://www.cnblogs.com/web-aqin/p/15384318.html
				wx.getSetting({
					success: (res) => {
						// res.authSetting['scope.userLocation'] == undefined    表示 初始化进入该页面
						// res.authSetting['scope.userLocation'] == false    表示 非初始化进入该页面,且未授权
						// res.authSetting['scope.userLocation'] == true    表示 地理位置授权
						//小程序登录、用户信息相关接口调整说明
						//https://developers.weixin.qq.com/community/develop/doc/000cacfa20ce88df04cb468bc52801
						console.log(res);
						if (res.authSetting['scope.userLocation'] != undefined || res.authSetting['scope.userLocation'] == false) //未授权
						{
							wx.showModal({
								title: '请求授权当前位置',
								content: '需要获取您的地理位置，请确认授权',
								success: function(res) {
									if (res.cancel) {
										//取消授权
										wx.showToast({
											title: '拒绝授权',
											icon: 'none',
											duration: 1000
										})
									} else if (res.confirm) {
										//打开微信设置界面
										wx.openSetting({
											success: function(res) {
												if (res.authSetting[
														"scope.userLocation"] ==
													true) {
													wx.showToast({
														title: '授权成功',
														icon: 'success',
														duration: 1000
													})
												} else {
													wx.showToast({
														title: '授权失败',
														icon: 'none',
														duration: 1000
													})
												}
											}
										})
									} else if (res.authSetting['scope.userLocation'] ==
										undefined) {

										//进行定位操作
									} else {
										console.log('授权成功')

									}
								},
							});
						}
					}
				})
			}
		}
	};
</script>

<style>
	page {
		background-color: #ffffff;
		width: 100%;
		height: 100%;
	}
	.no-display{
		display: none;
	}

	.box {
		position: relative;
		top: 60rpx;
		background-color: #ffffff;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.btn-box {
		margin: 0 auto;
		width: 85%;
		display: flex;
		background-color: #4cd964;
		border: 1rpx solid #4cd964;
		border-radius: 65rpx;
		justify-content: center;
		align-items: center;
		padding: 5rpx;
		font-size: 30rpx;
		color: #ffffff;
		margin-bottom: 15rpx;
	}

	.title-box {
		/* margin-top: 30rpx; */
		margin: 0 auto;
		font-size: 26rpx;
	}

	.text-color {
		color: #4cd964;
	}
</style>
