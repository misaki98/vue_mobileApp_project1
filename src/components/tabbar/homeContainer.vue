<template>
    <div>
        <!--轮播图区域-->
        <swiper :swipeList="swipeList" :isfull="true"></swiper>

        <!--九宫格的改造-->
        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/newslist">
                    <img src="../../images/menu1.png" alt="">
                    <div class="mui-media-body">新闻资讯</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/photolist">
                    <img src="../../images/menu2.png" alt="">
                    <div class="mui-media-body">图片分享</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/goodslist">
                    <img src="../../images/menu3.png" alt="">
                    <div class="mui-media-body">商品购买</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../images/menu4.png" alt="">
                <div class="mui-media-body">留言反馈</div>
            </a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../images/menu5.png" alt="">
                <div class="mui-media-body">视频专区</div>
            </a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../images/menu6.png" alt="">
                <div class="mui-media-body">联系我们</div>
            </a></li>
        </ul>
    </div>
</template>

<script>
    import {Toast} from 'mint-ui'
    //导入轮播图组件
    import swiper from '../subcomponents/swiper.vue'

    export default {
        data() {
            return {
                swipeList: [ //轮播图数组，在接收到后端数据后，再将数据渲染到该轮播图上

                ]
            }
        },
        created() {
            this.getSwipe();
        },
        methods: {
            getSwipe() { //获取轮播图数据的方法
                this.$http.get('http://www.liulongbin.top:3005/api/getlunbo').then(result => {
                    if (result.body.status === 0) {
                        // 成功获取到数据后
                        this.swipeList = result.body.message;
                    } else {
                        Toast('加载轮播图失败');
                    }
                })
            }
        },
        components:{
            "swiper":swiper
        }
    }
</script>

<style scoped>


    .mui-grid-view.mui-grid-9 {
        background-color: #fff;
    }

    .mui-table-view-cell.mui-media {
        border: none;
    }

    img {
        width: 60px;
        height: 60px;
    }

    .mui-media-body {
        font-size: 13px;
    }

</style>