<template>
	<view class="container">
		<!-- 搜索栏 -->
		<view class="search-box">
			<view class="search">
				<input type="text" v-model="queryStr" />
				<image class="img-search" src="../../static/images/custom/y-line.png"></image>
				<image class="img-search" src='../../static/images/search.png' @click="queryCust"></image>
			</view>
			<view>
				<image class="img-box" @click="showAddCustom" src="../../static/images/custom/add.png" mode=""></image>
			</view>
		</view>
		<!-- 字母栏 -->
		<view class="word-box" v-for="(word,index) in words">
			<view class="text-title">
				<text>{{word}}</text>
			</view>
		</view>
		<!-- 客户信息栏 -->
		<unicloud-db v-slot:default="{data, loading, error, options}" collection="bus_customers">
			<view v-if="error">{{error.message}}</view>
			<view v-else>
				<view class="custom-box" v-for="(item,index) in data" :key="index" :data-index="index">
					<!-- 选择框 -->
					<!-- <checkbox-group v-show="false">
					<label>
				      <checkbox value="cb" />
					</label>
				</checkbox-group>
				<view v-if="style=='select'" v-show="false">
					<image class="img-edit" src="../../static/images/custom/选择框.png"></image>
				</view
				<!-- 图片栏 -->
					<view class="fistT-box" @click="selectCustom(item)">
						{{item.firstZ}}
					</view>
					<!-- 文字栏 -->
					<view class="info-box">
						<view class="customName">
							{{item.c_name}}
						</view>
						<view class="info-other">
							<view class="info-left">
								<view class="c_phone1">
									电话:{{item.c_phone1}}
								</view>
								<view class="customComp">
									单位:{{item.c_company}}
								</view>
							</view>
							<view class="info-right" v-show="false">
								<view class="productPice">
									价格:
								</view>
							</view>

						</view>

					</view>
					<view>
						<image class="img-edit" src="../../static/images/custom/edit.png" @click="handleEdit(item)">
						</image>
					</view>
					<view>
						<image class="img-delete" src="../../static/images/custom/del.png" @click="handleDelete(item)">
						</image>
					</view>
				</view>

			</view>
		</unicloud-db>
	</view>
</template>

<script>
	//var that=this;
	var style = '';
	export default {
		data() {
			return {
				check: '',
				id: '', //被选中客户的id(autoid)
				customs: [], //全部客户
				filterCustom: [], //筛选后的客户数组
				custom: {},
				selCustom: {}, //被选中的客户
				words: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
					'U', 'V', 'W', 'X', 'Y', 'Z'
				],
				queryStr: '', //搜索字符串
			}
		},
		onReady() {},
		onLoad() {},
		onPullDownRefresh() {},
		methods: {
			//获取全部客户信息
			getCustoms() {
				uni.request({
					url: "http://119.3.66.245:8006/api/Spirit/getCustomer",
					success: (res) => {
						console.log(res);
						var data = res.data.data;
						this.customs = data;
						console.log("custom:" + JSON.stringify(this.customs));
					}
				})
			},
			filterCustoms(arr, str) {
				// for(let i = 0; i < nameArr.length; i++) {
				//         filterCustom.push(aim.find(item => item.name = nameArr[i]))
				//     }
				return arr.filter(item => item.firstZ == str)

			},
			//跳转至增加客户页面
			showAddCustom() {
				getApp().globalData.initAddCustom = 'add';
				uni.navigateTo({
					url: './addCustom'
				})
			},
			filterByFirstE(custom, E) {
				return custom.filter(item => item.firstE == E)
			},
			//选中客户,跳转到购物
			selectCustom(item) {
				console.log(item.autoid);
				 getApp().globalData.selCustomId=item.autoid;
				 getApp().globalData.selCustomName=item.c_name;
				 uni.redirectTo({
				 	url: '../sale/sale2'
				 });
				},
			//删除操作
			deleteCust() {
				const db = uniCloud.database();
				const collection = db.collection('bus_customers');
				let res = collection.where({
						autoid: this.id,
					})
					.update({
						isuse: false
					})
					.then(res => {
						console.log(res)
					});
			},
			//点击删除
			handleDelete(item) {
				console.log("item:" + JSON.stringify(item));
				this.id = item.autoid;
				uni.showModal({
					title: '提示',
					content: '确定删除当前用户吗？',
					success: (res) => {
						if (res.confirm) {
							console.log('用户点击确定');
							console.log("id=" + this.id);
							this.deleteCust();
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			//查询
			queryCust() {
				uni.request({
					url: "http://119.3.66.245:8006/api/Spirit/queryCustom",
					header: {
						'Content-Type': 'application/json',
						//'Content-Type': 'application/x-www-form-urlencoded'
					},
					data: {
						str: this.queryStr,
					},
					success: (res) => {
						console.log(res);
						var data = res.data.data;
						this.customs = data;
					}
				})
			},
			//编辑
			handleEdit(item) {
				console.log(item);
				uni.navigateTo({
					url: './updateCustom?item=' + JSON.stringify(item),
				})
			}
		},
	}
</script>

<style>
	@import './custom.scss';
</style>

//https://www.jianshu.com/p/1dac53aed886
//uni-app做A-Z排序通讯录、索引列表
