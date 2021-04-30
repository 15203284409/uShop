// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

// 引入stoer 并且挂在vue的实例上
// import store from "./store"
import store from "./store"

// 引入reste.css
import "./assets/css/reset.css";

// 引入axios 数据交互


// 引入vuex 

// 引入过滤器
import './filters'

//引入公共的组件
import "./components"

//引入element-ui  ui库
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI)


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
