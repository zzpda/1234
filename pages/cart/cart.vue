<template>
	<view class="container">
		<view class="cartEmpty" style="display: none">
			<image src="../../static/images/cart-empty.png" mode="" class="cartEmptyImg"></image>
			<view class="tip">
				亲，你还没有登录！
			</view>
			<view class="login">
				登录
			</view>
		</view>
		<view class="cartListBox">
			<view class="cartItem">
					<view class="checkbox">
						<checkbox  /><text></text>
					</view>
										 
					<!-- <view class="imgBox"> -->
						<image src="../../static/images/cart-empty.png" mode="" class="cartImg"></image>
					<!-- </view> -->
					<view class="itemContent">
						<!-- 产品名称等描述 -->
						<view class="tipTop">
						XXXXXXX
						</view>
						<!-- 产品价格及数量 -->
						<view class="tipBottom">
							<view class="money">$220</view>
							<view class="qtyBox">
								<view class="jian">-</view>
								<view class="qty">22</view>
								<view class="jia">+</view>
							</view>
						</view>
					</view>
				</view>
			
		
			<view class="cartItem">
							<view class="checkbox">
								<!-- <checkbox :value=1 /><text></text> -->
							</view>
												 
							<!-- <view class="imgBox"> -->
								<image src="../../static/images/cart-empty.png" mode="" class="cartImg"></image>
							<!-- </view> -->
							<view class="itemContent">
								<!-- 产品名称等描述 -->
								<view class="tipTop">
								XXXXXXX
								</view>
								<!-- 产品价格及数量 -->
								<view class="tipBottom">
									<view class="money">$220</view>
									<view class="qtyBox">
										<view class="jian">-</view>
										<view class="qty">22</view>
										<view class="jia">+</view>
									</view>
								</view>
							</view>
						</view>
					
				</view>	
			
	
	</view>
		<!-- </view>	 -->
</template>

<script>
	export default {

	}
</script>

<style lang="scss" scoped>
	@import '~@/pages/cart/cart.scss';
</style>
