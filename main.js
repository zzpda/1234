import App from './App'

//第一步：引入vuex
import store from './store'
 
// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false

//第二步：设置vuex为全局组件。
Vue.prototype.$store=store

App.mpType = 'app'

const app = new Vue({
//第三步：
	store,
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif