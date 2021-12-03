
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/main/main","pages/custom/updateCustom","pages/telcontact/telcontact","pages/cart/cart","pages/custom/custom","pages/sale/sale2","pages/index/index","pages/pwd/pwd","pages/custom/addCustom","pages/register/register","pages/login/login","pages/mine/mine2"],"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"uni-app","navigationBarBackgroundColor":"#F8F8F8","backgroundColor":"#F8F8F8"},"tabBar":{"color":"#919293","selectedColor":"#c0de17","backgroundColor":"#eafcff","borderStyle":"black","list":[{"pagePath":"pages/main/main","text":"首页","iconPath":"static/images/tabBar/main.png","selectedIconPath":"static/images/tabBar/main_selected.png"},{"pagePath":"pages/cart/cart","text":"购物车","iconPath":"static/images/tabBar/cart.png","selectedIconPath":"static/images/tabBar/cart_selected.png"},{"pagePath":"pages/mine/mine2","text":"我的","iconPath":"static/images/tabBar/mine.png","selectedIconPath":"static/images/tabBar/mine_selected.png"}]},"nvueCompiler":"uni-app","nvueStyleCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"12306","compilerVersion":"3.2.12","entryPagePath":"pages/main/main","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/main/main","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"主页"}},{"path":"/pages/custom/updateCustom","meta":{},"window":{"navigationBarTitleText":"修改客户信息"}},{"path":"/pages/telcontact/telcontact","meta":{},"window":{"navigationBarTitleText":"通信录"}},{"path":"/pages/cart/cart","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"购物车"}},{"path":"/pages/custom/custom","meta":{},"window":{"navigationBarTitleText":"客户列表"}},{"path":"/pages/sale/sale2","meta":{},"window":{"navigationBarTitleText":"开单"}},{"path":"/pages/index/index","meta":{},"window":{"navigationBarTitleText":"产品列表"}},{"path":"/pages/pwd/pwd","meta":{},"window":{"navigationBarTitleText":"密码"}},{"path":"/pages/custom/addCustom","meta":{},"window":{"navigationBarTitleText":"客户编辑"}},{"path":"/pages/register/register","meta":{},"window":{"navigationBarTitleText":""}},{"path":"/pages/login/login","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/mine/mine2","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"我的"}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
