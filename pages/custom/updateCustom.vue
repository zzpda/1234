<template>
	<view class="container">
		<!-- 基本信息 -->
		<view class="title-box">
			<view class="text-title"><text>基本信息</text></view>
		</view>
		<view class="box">
			<view class="text-box"><text>姓名</text></view>
			<text>:</text>
			<view class="input-box"><input class="name" type="text" v-model="custom.c_name" /></view>
		</view>
		<view class="box">
			<view class="text-box"><text>性别</text></view>
			<text>:</text>
			<view class="input-box">			
				<radio-group @change="radioChange">	
					<label class="sexradio">
						<text>男</text>
						<radio value="男" :checked="'男'==custom.c_sex"/>
					</label>
					<label class="sexradio">
						<text>女</text>
						<radio value="女" :checked="'女'==custom.c_sex"/>
					</label>	
				</radio-group>
			</view>	 			
		</view>
		<view class="box">
			<view class="text-box"><text>年龄</text></view>
			<text>:</text>
			<view class="input-box"><input class="name" type="text" v-model="custom.c_age" /></view>
		</view>
		<view class="box">
			<view class="text-box"><text>住址</text></view>
			<text>:</text>
			<view class="input-box"><input class="name" type="text" v-model="custom.c_home" /></view>
		</view>
		<view class="box">
			<view class="text-box"><text>手机号码</text></view>
			<text>:</text>
			<view class="input-box"><input class="name" type="text" v-model="custom.c_phone1" /></view>
		</view>
		<!-- 公司信息 -->
		<view class="title-box">
			<view class="text-title"><text>公司信息</text></view>
		</view>
		<view class="box">
			<view class="text-box"><text>公司名称</text></view>
			<text>:</text>
			<view class="input-box"><input class="name" type="text" v-model="custom.c_company" /></view>
		</view>
		<view class="box">
			<view class="text-box"><text>地址</text></view>
			<text>:</text>
			<view class="input-box"><input class="pwd" type="text" v-model="custom.c_addr" /></view>
		</view>
		<view class="box">
			<view class="text-box"><text>联系电话</text></view>
			<text>:</text>
			<view class="input-box"><input class="name" type="text" v-model="custom.c_phone2" /></view>
		</view>
		<button class="btnOk" @click="submit">保存</button>
	</view>
</template>

<script>
// import {uniBadge} from '@dcloudio/uni-ui'
export default {
	data() {
		return {
			 
			initFlag: '', //操作标记，增加或修改
			customs: [],
			custom: {
				_id:'',
				autoid:'',
				c_name: '',
				c_age: '',
				c_sex: '男',
				c_phone1: '', //手机号码
				c_company: '', //公司名称
				c_addr: '', //公司地址
				c_home: '', //家庭住址
				c_phone2: '' //公司电话
			},
			xuanzhong: '男'
		};
	},
	onReady() {},
	//item 为上一页面传过来的参数
	onLoad({item}) {
		 this.custom=JSON.parse(item)
		 console.log(this.custom);
	},
	onPullDownRefresh() {},
	
	methods: {
		async submit(){
			console.log("custom:"+this.custom.c_phone1);
			const db=uniCloud.database();
			const collection= db.collection('bus_customers');
			//新增记录
			// let res=  collection.add({c_name:"王五"});
			// console.log(res);
			//获取数据
			//let res= await collection.get();
			//console.log(res);
			//更新数据
			console.log(this.custom._id);
			//第一种写法 OK
			// let res=collection.where({_id:this.custom._id})
			// 		.update({
			// 			c_phone1:this.custom.c_phone1,
			// 			c_addr:this.custom.c_addr,
			// 			c_age:this.custom.c_age,
			// 			c_cno:this.custom.c_cno,
			// 			c_company:this.custom.c_company,
			// 			c_home:this.custom.c_home,
			// 			c_name:this.custom.c_name,
			// 			c_phone2:this.custom.c_phone2,
			// 			c_sex:this.custom.c_sex,	
			// 			isuse:true
			// 			})
			// 		.then(res=>{
			// 			console.log(res.success);
			// 			if(res.success==true)
			// 			{
			// 				console.log("成功");
			// 			}
			// 			else{
			// 				console.log("失败");					
			// 			}
			// 		});
			//第二种写法
			let res = await db.collection('bus_customers')
					.doc(this.custom._id)
					.update({
						c_phone1:this.custom.c_phone1,
						c_addr:this.custom.c_addr,
						c_age:this.custom.c_age,
						c_cno:this.custom.c_cno,
						c_company:this.custom.c_company,
						c_home:this.custom.c_home,
						c_name:this.custom.c_name,
						c_phone2:this.custom.c_phone2,
						c_sex:this.custom.c_sex,	
						firstZ:this.custom.c_name.charAt(0),
						isuse:true
					})
					.then(res=>{
						console.log(res.success);
						if(res.success==true)
						{
							uni.showToast({
							    title: '操作成功！',
							    duration: 3000
							});
							//setTimeout(this.backToRefresh(),"2000"); 
						 }
						else{
							console.log("失败");					
						}
					});
			 
		
		},
		radioChange(evt) {
			 
			console.log(evt.detail);
			this.custom.c_sex=evt.detail.value;
		},
		//返回上一页并刷新
		backToRefresh(){
			console.log("准备返回上一页！");
			let pages = getCurrentPages(); // 当前页面
			let beforePage = pages[pages.length - 2]; // 上一页
			uni.navigateBack({
			    success: function() {
			        beforePage.onLoad(); // 执行上一页的onLoad方法
			    }
			});
		},
		save() {
			if (this.initFlag == 'add') {
				console.log('增加操作');
				//this.addCustoms();
			} else if (this.initFlag == 'edit') {
				console.log('修改操作');
				//this.editCustoms();
			}
		},
		 
	}
};
</script>

<style lang="scss">
@import './addCustom.scss';
</style>
