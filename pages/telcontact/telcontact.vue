<template>
	<view class="container">
		<view class="add-box">
			<view class="text-title"></view>
			<image class="img-add" src="../../static/images/product/add.png"></image>
		</view>
		<scroll-view scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scrolltoupper="upper" @scrolltolower="lower" @scroll="scroll">			 
			<view class="item-box" v-for="(item, index) in list" :key="index">
				<view class="nameTxt">
					{{item.displayName}}
				</view>
				<view class="phoneTxt" v-for="(phone,index) in item.phoneNumbers" :key="index">
					{{phone.value}}
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>

export default {
	data() {
		return {
			list: []
			}
	},
	onReady() {this.getContact();
	},
	onLoad() {
		},
	onPullDownRefresh() {},
	methods: {
	// {"id":6,"rawId":null,"target":0,"displayName":"二妈","name":null,"nickname":null,"phoneNumbers":
	// [{"id":"3767","pref":false,"value":"17633762713","type":"work"}],"emails":null,"addresses":null,"ims":null,"organizations":null,"birthday":null,"note":null,"photos":null,"categories":null,"urls":null},

		getContact() {
			var that = this;
			//plus.contacts.getAddressBook( type, succesCB, errorCB );
			plus.contacts.getAddressBook(
				plus.contacts.ADDRESSBOOK_SIM,
				function(addressbook) {
					// 可通过addressbook进行通讯录操作
					// uni.showToast({
					// 	title: '获取通讯录对象成功',
					// 	duration: 1000
					// });
					// console.log(addressbook);
					// console.log('Get address book success!' + JSON.stringify(addressbook));
					addressbook.find(
						['displayName', 'phoneNumbers'],
						function(contacts) {
							// uni.showToast({
							// 	title: '获取联系人成功',
							// 	duration: 2000
							// });
							console.log('获取联系人成功');
							console.log(JSON.stringify(contacts));
							that.list = contacts;
						},
						function() {
							uni.showToast({
								title: '获取联系人失败',
								duration: 2000
							});
						},
						//查找联系人参数
						{ multiple: true }
						//[{logic:"or",field:"displayNam",value:"王*"},{logic:"or",field:"nickname",value:"*王*"}]
					);
				},
				function(e) {
					console.log('Get address book failed: ' + e);
				}
			);
		}
		
	}
};
</script>
	
<style>
@import './telcontact.scss'; 
</style>

