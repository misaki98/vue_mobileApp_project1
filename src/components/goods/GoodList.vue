<template>
    <div class="goods-list">
        <!--商品列表-->
        <!--使用标签导航-->
        <!--<router-link tag="div" :to="'/home/goodsinfo/'+item.id" class="goods-item" v-for="item in goodslist"-->
                     <!--:key="item.id">-->
            <!--<img :src="item.img_url" alt="">-->
            <!--<h1 class="title">{{ item.title }}</h1>-->
            <!--<div class="info">-->
                <!--<p class="price">-->
                    <!--<span class="now">￥{{item.sell_price}}</span>-->
                    <!--<span class="old">￥{{item.market_price}} </span>-->
                <!--</p>-->
                <!--<p class="sell">-->
                    <!--<span>热卖中</span><span>剩 {{item.stock_quantity}} 件</span>-->
                <!--</p>-->
            <!--</div>-->
        <!--</router-link>-->

        <!--使用编程式导航-->
        <div @click="goDetail(item.id)" class="goods-item" v-for="item in goodslist"
                     :key="item.id">
            <img :src="item.img_url" alt="">
            <h1 class="title">{{ item.title }}</h1>
            <div class="info">
                <p class="price">
                    <span class="now">￥{{item.sell_price}}</span>
                    <span class="old">￥{{item.market_price}} </span>
                </p>
                <p class="sell">
                    <span>热卖中</span><span>剩 {{item.stock_quantity}} 件</span>
                </p>
            </div>
        </div>
        <!--加载更多按钮-->
        <mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>
    </div>
</template>

<script>
    export default {
        data() {
            //    挂载一些组件的私有数据
            return {
                pageIndex: 1,
                //    默认加载第一页
                goodslist: []  //存放商品数据的空数组
            }
        },
        created() {
            this.getGoodsList();
        },
        methods: {
            getGoodsList() {
                //    获取商品列表函数
                this.$http.get('http://www.liulongbin.top:3005/api/getgoods?pageindex=' + this.pageIndex)
                    .then(result => {
                        if (result.body.status === 0) {
                            this.goodslist = this.goodslist.concat(result.body.message);
                        }
                    })
            },
            getMore() {
                this.pageIndex++;
                this.getGoodsList();
            },
            goDetail(id){  //使用JS事件来实现路由标签的跳转
                // 1. 最基础的调用方法
                // this.$router.push('/home/goodsinfo/' + id);
            //     2. 传递一个对象来调用
            //     this.$router.push({ path:'/home/goodsinfo/' + id});
            //    3.  传递一个带参数的命名对象来调用
            //    如果提供了path，则params会被忽略
                this.$router.push({
                    // 跳转到指定路由规则的名字
                    name: 'goodsinfo',
                    params:{
                        id
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .goods-list {
        display: flex;
        flex-wrap: wrap;
        padding: 7px;
        justify-content: space-between;
    }

    .goods-list .goods-item {
        width: 49%;
        border: 1px solid #ccc;
        box-shadow: 0 0 8px #ccc;
        margin: 4px 0;
        padding: 2px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        min-height: 193px;
    }

    .goods-item img {
        width: 100%;
    }

    .goods-item .title {
        font-size: 14px;
    }

    .goods-item .info {
        background-color: #eee;
    }

    .goods-item p {
        margin: 0;
        padding: 5px;
    }

    .goods-item .info .price {

    }

    .price .now {
        color: red;
        font-weight: bold;
        font-size: 16px;
    }

    .price .old {
        text-decoration: line-through;
        font-size: 12px;
        margin-left: 10px;
    }

    .goods-item .sell {
        display: flex;
        justify-content: space-between;
        font-size: 12px;
    }
</style>