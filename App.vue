<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		globalData:{
			atotla:'',//实收总金额
			initCustomList:'',//初始化客户列表的样式，默认是列表
			selCustomName:'',//被选中客户姓名
			selCustomId:'',//被选中客户autoid
			isProdcutList:true,//是否是产品列表模式
			initAddCustom:'',//初始化客户操作的样式，增加或修改
			saleDate:'',//开单日期
			carts:[],//全局购物车
			amount:0,//实收总金额
			totalnum:0 //总数量
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
