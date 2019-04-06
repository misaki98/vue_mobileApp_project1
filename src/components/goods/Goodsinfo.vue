<template>
    <div class="goodsinfo-container">

        <transition
                @before-enter="beforeEnter"
                @enter="enter"
                @after-enter="afterEnter">
            <!--不能使用半场动画，只能使用钩子函数自定义动画-->
            <!--用ref来传递dom元素-->
            <div class="ball" v-show="ballFlag" ref="ball"></div>
        </transition>

        <!--商品轮播图区域-->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <div class="swiper">
                        <swiper :swipeList="lunbotu" :isfull="false"></swiper>
                    </div>
                </div>
            </div>
        </div>

        <!--商品购买区域-->
        <div class="mui-card">
            <div class="mui-card-header">{{ goodsinfo.title }}</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p class="price">
                        市场价：<span class="old">￥{{ goodsinfo.market_price }}</span>&nbsp;&nbsp;销售价：<span class="new">￥{{ goodsinfo.sell_price}}</span>
                    </p>
                    <p>
                        购买数量：
                        <!-- 将父组件的方法作为一个事件属性绑定传递给子组件 -->
                        <!-- 在子组件中可以用this.$emit()来触发此事件 -->
                        <!-- 子组件最大值必须从父组件中得到库存数量，故需要自子组件上绑定数据来传递-->
                        <numbox @getcount="getSelectCount" :max="goodsinfo.stock_quantity"></numbox>
                    </p>
                    <p>
                        <mt-button type="primary" size="small">立即购买</mt-button>
                        <mt-button type="danger" size="small" @click="addtoShopcar">加入购物车</mt-button>
                    </p>
                </div>
            </div>
        </div>

        <!--商品参数区域-->
        <div class="mui-card">
            <div class="mui-card-header">商品参数</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>商品货号：{{goodsinfo.goods_no}}</p>
                    <p>库存情况：{{goodsinfo.stock_quantity}}件</p>
                    <p>上架时间：{{goodsinfo.add_time | dateFormat}}</p>
                </div>
            </div>
            <div class="mui-card-footer">
                <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
                <mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
            </div>
        </div>
    </div>
</template>

<script>
    import swiper from '../subcomponents/swiper.vue'
    import numbox from '../subcomponents/goodsinfo_numbox.vue'

    export default {
        data() {
            return {
                id: this.$route.params.id,
                //    将路由参数中的ID挂载到data上
                lunbotu: [],
                //    保存轮播图数据
                goodsinfo: {
                    //    保存获取到的商品数据
                },
                ballFlag: false, //控制小球隐藏和显示的标识符
                selectedCount: 1 //默认进来时值为1，保存用户选中的商品数量
            }
        },
        created() {
            this.getLunbo();
            this.getGoodsInfo();
        },
        methods: {
            getLunbo() {
                this.$http.get('http://www.liulongbin.top:3005/api/getthumimages/' + this.id)
                    .then(result => {
                        if (result.body.status === 0) {
                            this.lunbotu = result.body.message
                        }
                    })
            },
            getGoodsInfo() {
                //    获取商品信息
                this.$http.get('http://www.liulongbin.top:3005/api/goods/getinfo/' + this.id)
                    .then(result => {
                        if (result.body.status === 0) {
                            this.goodsinfo = result.body.message[0]
                        }
                    })
            },
            goDesc(id) {
                //    使用编程式导航来跳转
                this.$router.push({
                    name: 'goodsdesc',
                    params: {
                        id
                    }
                })
            },
            goComment(id) {
                //    跳转到评论页面
                this.$router.push({
                    name: 'goodscomment',
                    params: {
                        id
                    }
                })
            },
            addtoShopcar() {
                //    添加到购物车
                this.ballFlag = !this.ballFlag;
            //    拼接出一个商品对象，该对象要保存到Vuex中的Store中
            //    而获取这些数据的方法必须写到Vuex中，不能在此处定义
                var goodsinfo = {
                    id: this.id,
                    count: this.selectedCount,
                    price: this.goodsinfo.sell_price,
                    selected: true
                };
                console.log(goodsinfo);
                //  调用 store 中的mutations来讲goodsinfo的数据传递到商品购物车中
                this.$store.commit('addtoCar', goodsinfo);



            },
            // 控制动画的三个钩子函数
            beforeEnter(el){
                el.style.transform = "translate(0, 0)"; // 定义刚开始时，小球处于原点
            },
            enter(el, done){
                el.offsetWidth; // 显示动画语句
                // 获取小球在页面中的位置
                const ballPosition = this.$refs.ball.getBoundingClientRect();
                // 操作DOM元素来获取徽标位置
                const badgePosition = document
                    .getElementById('badge')
                    .getBoundingClientRect();

                const xDist = badgePosition.left - ballPosition.left;
                const yDist = badgePosition.top - ballPosition.top;

                // 使用${}来进行模板字符串的拼接
                el.style.transform = `translate(${xDist}px, ${yDist}px)`;

                // el.style.transform = "translate(93px, 230px)"; // 定义小球的终点位置
                el.style.transition = 'all 0.5s cubic-bezier(0, 0, .25, 1)'; // 定义动画效果
                done();  // 表示动画已完成，立即引用afterEnter钩子函数
            },
            afterEnter(el){
                this.ballFlag = !this.ballFlag;
            },
            getSelectCount(count){
            //    获取子组件的count值
            //    当子组件把选中的数量传给父组件的时候，把选中的值保存到父组件的data身上
                this.selectedCount = count;
            }
        },
        components: {
            "swiper": swiper,
            "numbox": numbox
        }
    }
</script>

<style scoped>
    .goodsinfo-container {
        background-color: #eee;
        overflow: hidden;
    }

    .swiper {
        height: 100%;
    }

    .price .old {
        text-decoration: line-through;
    }

    .price .new {
        color: red;
        font-size: 16px;
        font-weight: bold;
    }

    .mui-card-footer {
        display: block;
    }

    .mui-card-footer button {
        margin: 15px 0;
    }

    .ball {
        width: 15px;
        height: 15px;
        -webkit-border-radius: 50%;
        -moz-border-radius: 50%;
        border-radius: 50%;
        background-color: red;
        position: absolute;
        z-index: 99;
        top: 390px;
        left: 146px;
    }
</style>