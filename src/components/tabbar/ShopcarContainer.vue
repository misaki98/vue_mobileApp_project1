<template>
    <div class="shopCar-container">
        <div class="goodslist">

            <!-- 商品列表项目区域 -->
            <div class="mui-card" v-for="(item,i) in goodslist" :key="item.id">
                <div class="mui-card-content">
                    <div class="mui-card-content-inner">

                        <mt-switch
                                v-model="$store.getters.getGoodsSelected[item.id]"
                                @change="selectedChanged(item.id, $store.getters.getGoodsSelected[item.id])"></mt-switch>
                        <img :src="item.thumb_path" alt="">
                        <div class="info">
                            <h1>{{ item.title }}</h1>
                            <p>
                                <span class="price">￥ {{ item.sell_price }} </span>
                                <!-- 必须为子组件传递父组件的id和数量-->
                                <numbox :initcount=" $store.getters.getGoodsCount[item.id]" :goodsid="item.id"></numbox>
                                <!-- 索引i用来删除goodslist里面的数据-，id删除store里面的数据,如果要删除store里面的数据，必须将事件写到VUEX中 -->
                                <a href="#" @click.prevent="remove(item.id, i)">删除</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 商品结算区域 -->
            <div class="mui-card">
                <div class="mui-card-content">
                    <div class="mui-card-content-inner shopcar-submit">
                        <div class="left">
                            <p>总计（不含运费）</p>
                            <p>已勾选商品 <span>{{ $store.getters.getGoodsCountAndAmount.count}}</span> 件，总价 ¥ <span>{{ $store.getters.getGoodsCountAndAmount.amount}}</span></p>
                        </div>
                        <mt-button type="danger">去结算</mt-button>
                    </div>
                </div>
            </div>

            <p>{{ $store.getters.getGoodsSelected }}</p>
        </div>
    </div>
</template>

<script>
    import numbox from '../subcomponents/shopcar_numbox.vue'
    export default {
        data(){
            return{
                goodslist:[] //购物车商品数据
            }
        },
        created(){
            this.getGoodsList()
        },
        methods:{
            getGoodsList(){
            //    获取商品购物车列表
            //    获取到Store中的所有商品ID，然后拼接出一个用逗号分隔的字符串
                var idArr = [];
                this.$store.state.car.forEach(item=>{
                    idArr.push(item.id);
                });
                //如果购物车中没有商品，则直接返回，不需要请求数据接口，否则会报错
                if (idArr.length <= 0) {
                    return;
                }
                this.$http.get('http://www.liulongbin.top:3005/api/goods/getshopcarlist/' + idArr.join(","))
                    .then(result=>{
                        if (result.body.status === 0) {
                            this.goodslist = result.body.message;
                        }
                    });

            },
            remove(id, index){
            //    从store和组件中购物车数组中把数据删除
                this.goodslist.splice(index, 1);
                console.log(this.$store.state.car);
                this.$store.commit('removeFromCar', id);
                console.log(this.$store.state.car);
            },
            selectedChanged(id, val){
                // 每当点击开关，把最新的状态同步到store中
                this.$store.commit('updateGoodsSelected', {
                    id: id,
                    selected: val
                })
            }
        },
        components:{
            numbox
        }
    }
</script>

<style scoped>

    .shopCar-container{
        background-color: #eee;
        overflow: hidden;
    }
    .mui-card-content-inner{
        display: flex;
        /*纵向居中*/
        align-items: center;
    }
    .shopCar-container .goodslist img{
        width: 60px;
        height: 60px;
    }
    .shopCar-container .goodslist h1{
        font-size: 13px;
    }
    .shopCar-container .goodslist .price{
        color: red;
        font-weight: bold;
    }
    .shopCar-container .goodslist .info{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .shopcar-submit{
        display: flex;
        justify-content: space-between;
    }
    .left span{
        color: red;
        font-size: 16px;
    }
</style>