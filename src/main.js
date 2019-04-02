// 入口文件
import Vue from 'vue'


//导入Vue路由包
import VueRouter from 'vue-router'
//配置路由模块
Vue.use(VueRouter);
//其中路由的模块由router.js来配置，配置完之后只需导入并挂载到Vue上即可
import router from './router'

//定义全局的过滤器，使用moment插件进行格式化
import moment from 'moment'
Vue.filter('dateFormat', function (dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
    return moment(dataStr).format(pattern)
});

//导入并配置 vue-resource
import VueResource from 'vue-resource'
Vue.use(VueResource);
//配置请求地址的根路径
Vue.http.options.root = 'https://www.easy-mock.com/mock/5ca2c60ea8c93522d8561dc4/example/api';

//导入MUI的样式
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'


//按需导入mint-ui中的组件,并注册
import { Header,Swipe, SwipeItem, Button} from 'mint-ui'
Vue.component(Header.name, Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Button.name, Button);
//导入app组件
import app from './App.vue'



const vm = new Vue({
    el: '#app',
    render: c => c(app),
    router
});