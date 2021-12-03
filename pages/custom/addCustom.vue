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
						<radio value="男" :checked="'男'==custom.c_sex" @click="radio('男')"/>
					</label>
					<label class="sexradio">
						<text>女</text>
						<radio value="女" :checked="'女'==custom.c_sex" @click="radio('女')"/>
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
		<button class="btnOk" @click="save">保存</button>
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
	onLoad() {
		this.initFlag = getApp().globalData.initAddCustom;
		if (this.initFlag == 'edit') {
			this.showCustom();
			console.log('c_sex:' + this.custom.c_sex);
		}
		console.log(getApp().globalData.initAddCustom);
	},
	onPullDownRefresh() {},
	methods: {
		radioChange(evt) {
			console.log(evt.detail);
			this.custom.c_sex=evt.detail.value;
		},
		save() {
			if (this.initFlag == 'add') {
				console.log('增加操作');
				//this.addCustoms();
				this.saveClound();
			} else if (this.initFlag == 'edit') {
				console.log('修改操作');
				this.editCustoms();
			}
		},
		addCustoms() {
			uni.request({
				//请求路径
				url: 'http://119.3.66.245:8006/api/Spirit/addCust',
				//请求方法
				method: 'POST',
				header: {
					'Content-Type': 'application/json'
					//'Content-Type': 'application/x-www-form-urlencoded'
				},
				data: {
					custName: this.custom.c_name,
					custSex: this.custom.c_sex,
					custPhone: this.custom.c_phone1,
					custCompany: this.custom.c_company,
					custAddr: this.custom.c_addr
					//custName:'李晓',
					// c_sex:'女',
					// c_phone1:'123456788414',
					// c_company:'王二公司',
					// c_addr:'郑州市二七区',
				},
				// data:JSON.stringify(da),
				success: res => {
					console.log(res);
					if (res.data == 2) {
						uni.showToast({
							title: '客户增加成功!',
							duration: 2000
						});
					}
				}
			});
		},
		editCustoms() {
			uni.request({
				//请求路径
				url: 'http://119.3.66.245:8006/api/Spirit/editCust',
				//请求方法
				method: 'POST',
				header: {
					'Content-Type': 'application/json'
					//'Content-Type': 'application/x-www-form-urlencoded'
				},
				data: {
					custAutoid: getApp().globalData.selCustomId,
					custName: this.custom.c_name,
					custSex: this.custom.c_sex,
					custPhone: this.custom.c_phone1,
					custCompany: this.custom.c_company,
					custAddr: this.custom.c_addr
					//custName:'李晓',
					// c_sex:'女',
					// c_phone1:'123456788414',
					// c_company:'王二公司',
					// c_addr:'郑州市二七区',
				},
				// data:JSON.stringify(da),
				success: res => {
					console.log(res);
					if (res.data == 1) {
						uni.showToast({
							title: '客户修改成功!',
							duration: 2000
						});
						console.log('页面跳转');
						uni.switchTab({
							url: './custom'
						});
					}
				}
			});
		},
		showCustom() {
			uni.request({
				//请求路径
				url: 'http://119.3.66.245:8006/api/Spirit/seleCust',
				//请求方法
				//method: 'POST',
				header: {
					'Content-Type': 'application/json'
					//'Content-Type': 'application/x-www-form-urlencoded'
				},
				data: {
					autoid: getApp().globalData.selCustomId
				},
				success: res => {
					console.log(res);
					var data = res.data.data;
					console.log(data);
					//远端获取的内容为数组
					this.customs = data;
					this.custom = this.customs[0];
					console.log(this.custom);
					console.log('c_sex:' + this.custom.c_sex);
				}
			});
		},
		saveClound(){	
			this.custom.firstZ=this.custom.c_name.charAt(0);
			this.custom.isuse=true;
			console.log(this.custom);
			const db = uniCloud.database();
			db.collection('bus_customers').add(this.custom).then(res => {
				console.log(res.success);
				if(res.success==true){
					uni.showToast({
					    title: '操作成功！',
					    duration: 2000
					});
					//清空对象
					for(var i in this.custom){
						this.custom[i]='';
					}
				}
			});
		}
	}
};
</script>

<style lang="scss">
@import './addCustom.scss';
</style>
