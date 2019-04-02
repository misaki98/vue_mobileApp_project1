import VueRouter from 'vue-router'

//路由组件创建好之后要导入到路由之中
import HomeContainer from './components/tabbar/homeContainer.vue'
import MenberContainer from './components/tabbar/MemberContainer.vue'
import ShopcarContainer from './components/tabbar/ShopcarContainer.vue'
import SearchContainer from  './components/tabbar/SearchContainer.vue'

//导入首页各栏目的组件
import Newslist from './components/news/newslist.vue'
import NewsInfo from './components/news/NewsInfo.vue'

// 3. 创建路由对象
var router = new VueRouter({
    routes: [  //配置路由规则
        {
            path:'/',
            redirect:'/home'
        },
        {
          path: '/home',
          component: HomeContainer
        },
        {
          path: '/member',
            component: MenberContainer
        },
        {
          path: '/shopcar',
            component: ShopcarContainer
        },
        {
          path:'/search',
            component: SearchContainer
        },
        {
            path: '/home/newslist',
            component: Newslist
        },
        {
            path:'/home/newsinfo/:id',
            component: NewsInfo
        }
    ],
    linkActiveClass: 'mui-active'  //此类会覆盖 默认的路由高亮的类，默认的类为router-link-active
});

// 把路由对象暴露出去
export default router