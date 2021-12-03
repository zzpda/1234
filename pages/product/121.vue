<template>
	<view class="page-box">
        <view class="head-box">
    	</view>
        <view class="content-box">
    	</view>
        <view class="footer-box">
    	</view>
    </view>
</template>

<style lang="scss">
    page {
		background-color: #FFF;
	}
    .page-box {
		display: flex;
		flex-direction: column;
		height: 100%;
	}
   	.head-box {
		//flex-shrink: 0;//保持内容不缩放，适用于内容不确定大小时候
         height:100rpx; //设置高度为100，如果内容确定为这么高的话
		background: #007AFF;
	}
    .content-box {
		flex: 1;//充满屏幕
		//height: 2000rpx; //如果中间不充满屏幕的话，自适应，底部会跟随在中间布局后面
		//overflow: auto;
		background: #4CD964;
	}
    .footer-box {
		//flex-shrink: 0;//保持内容不缩放，适用于内容不确定大小时候
        height:100rpx; //设置高度为100，如果内容确定为这么高的话
		background: #DD524D;
	}
</style>
