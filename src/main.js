// 入口文件
import Vue from 'vue'


//导入Vue路由包
import VueRouter from 'vue-router'
//配置路由模块
Vue.use(VueRouter);
//其中路由的模块由router.js来配置，配置完之后只需导入并挂载到Vue上即可
import router from './router'

// 导入并注册 Vuex
import Vuex from 'vuex'
Vue.use(Vuex);
// 获得Store实例，并在VM实例中注册\
var car = JSON.parse(localStorage.getItem('car') || '[]');
// 从本地存储中获取购物车数据
const store = new Vuex.Store({
    state:{
        //this.$store.state 来获取state中数据
    //    类似于VM实例中的data
        car
            // 将购物车中商品数据用数组存取起来
        //    在购物车数组中保存商品的对象
        //    { id:商品ID  , count:购买数量 , price:商品单价 , selected:是否被选中  }
    },
    mutations:{
    //    this.$store.commit('方法的名称'， '可以按需传递唯一的参数')
    //    类似于子组件给父组件传值的方法调用
        addtoCar(state, goodsinfo){
        //    点击加入购物车时，把商品信息保存到store中的car上
            var flag = false;
            //  用来表示是否找到对应的商品
            state.car.some(item=>{
                //  实现当购物车中有该商品的数据时，只需要把更新数量
                if(item.id === goodsinfo.id){
                    item.count += parseInt(goodsinfo.count);
                    console.log(item.count);
                    flag = true;
                    return true; //终止循环
                }
            });
            //  循环完毕得到的flag还是false，则直接push到购物车中
            if (!flag) {
                state.car.push(goodsinfo);
            }
            //    当更新car之后，把car数组存取到localStorage中
            localStorage.setItem('car', JSON.stringify(state.car))
        },
        updateGoodsInfo(state, goodsinfo){
        //    修改购物车中商品的数量值
            state.car.forEach(item=>{
                if (item.id === goodsinfo.id){
                    item.count = parseInt(goodsinfo.count);
                    return true;
                }
            });
            //当修改完商品的数量，把最新的购物车数据存储到本地中
            localStorage.setItem('car', JSON.stringify(state.car))
        },
        removeFromCar(state, id){
        //    根据ID从store中删除数据
            console.log(state.car);
            state.car.some((item,i)=>{
                if (item.id === id) {
                    state.car.splice(i, 1);
                    console.log(state.car);
                    return true;
                }
            });
            //把删除后的最新购物车数据存储到本地中
            localStorage.setItem('car', JSON.stringify(state.car))
        },
        updateGoodsSelected(state, info){
            state.car.some(item=>{
                if (item.id === info.id){
                    item.selected = info.selected;
                }
            });
            //把最新购物车商品状态数据存储到本地中
            localStorage.setItem('car', JSON.stringify(state.car))

        }
    },
    getters:{
    //  this.$store.getters
    //    不负责数据的修改，在输出数据时给予数据一定的修饰，类似于过滤器或computed计算属性
        getALLCount(state){
            var c= 0;
            state.car.forEach(item=>{
                c += item.count;
            });
            return c;
        },
        getGoodsCount(state){
            var o = {};
            state.car.forEach(item=>{
                // 将数量绑定到id上
                o[item.id] = item.count;
            });
            return o;
        },
        getGoodsSelected(state){
            var o ={};
            state.car.forEach(item=>{
                o[item.id] = item.selected
            });
            return o;
        },
        getGoodsCountAndAmount(state){
            var o = {
                count: 0,  //勾选的数量
                amount: 0  // 勾选的总价
            };
            state.car.forEach(item=>{
                if (item.selected) {
                    o.count += item.count;
                    o.amount += item.price * item.count;
                }
            });
            return o;
        }
    }
});


//定义全局的过滤器，使用moment插件进行格式化
import moment from 'moment'
Vue.filter('dateFormat', function (dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
    return moment(dataStr).format(pattern)
});

//导入并配置 vue-resource
import VueResource from 'vue-resource'
Vue.use(VueResource);
//全局配置请求地址的根路径和POST数据格式
Vue.http.options.root = 'https://www.easy-mock.com/mock/5ca2c60ea8c93522d8561dc4/example';
Vue.http.options.emulateJSON = true;

//导入MUI的样式
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'


//按需导入mint-ui中的组件,并注册(使用懒加载需要全部导入)
// import { Header,Swipe, SwipeItem, Button, Lazyload} from 'mint-ui'
// Vue.component(Header.name, Header);
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);
// Vue.component(Button.name, Button);
// Vue.use(Lazyload);
import MintUI from 'mint-ui'
Vue.use(MintUI);
import 'mint-ui/lib/style.css'

//安装图片预览插件
import VuePreview from 'vue2-preview'
Vue.use(VuePreview);

//导入app组件
import app from './App.vue'



const vm = new Vue({
    el: '#app',
    render: c => c(app),
    router,
    store
});