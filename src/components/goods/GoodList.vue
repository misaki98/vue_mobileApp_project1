<template>
    <div class="goods-list">
        <div class="goods-item">
            <img src="http://demo.dtcms.net/upload/201504/18/thumb_201504181258586174.jpg" alt="">
            <h1 class="title">标题</h1>
            <div class="info">
                <p class="price">
                    <span class="now">￥999</span>
                    <span class="old">￥1099 </span>
                </p>
                <p class="sell">
                    <span>热卖中</span><span>剩  件</span>
                </p>
            </div>
        </div>
        <div class="goods-item">
            <img src="http://demo.dtcms.net/upload/201504/18/thumb_201504181258586174.jpg" alt="">
            <h1 class="title">标题</h1>
            <div class="info">
                <p class="price">
                    <span class="now">￥999</span>
                    <span class="old">￥1099 </span>
                </p>
                <p class="sell">
                    <span>热卖中</span><span>剩  件</span>
                </p>
            </div>
        </div>
        <div class="goods-item">
            <img src="http://demo.dtcms.net/upload/201504/18/thumb_201504181258586174.jpg" alt="">
            <h1 class="title">标题</h1>
            <div class="info">
                <p class="price">
                    <span class="now">￥999</span>
                    <span class="old">￥1099 </span>
                </p>
                <p class="sell">
                    <span>热卖中</span><span>剩  件</span>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "GoodList"
    }
</script>

<style scoped>
    .goods-list{
        display: flex;
        flex-wrap: wrap;
        padding: 7px;
        justify-content: space-between;
    }
    .goods-list .goods-item{
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
    .goods-item img{
        width: 100%;
    }
    .goods-item .title{
        font-size: 14px;
    }
    .goods-item .info{
        background-color: #eee;
    }
    .goods-item p{
        margin: 0;
        padding: 5px;
    }
    .goods-item .info .price{

    }
    .price .now{
        color: red;
        font-weight: bold;
        font-size: 16px;
    }
    .price .old{
        text-decoration: line-through;
        font-size: 12px;
        margin-left: 10px;
    }
    .goods-item .sell{
        display: flex;
        justify-content: space-between;
        font-size: 12px;
    }
</style>