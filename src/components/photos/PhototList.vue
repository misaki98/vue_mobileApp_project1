<template>
    <div>
        <!-- 顶部滑动条区域 -->
        <div id="slider" class="mui-slider">
            <div id="sliderSegmentedControl"
                 class="mui-scroll-wrapper mui-slider-indicatorcode mui-segmented-control mui-segmented-control-inverted">
                <div class="mui-scroll">
                    <a :class="['mui-control-item',item.id === 0 ? 'mui-active' : '']" v-for="item in cates"
                       :key="item.id" @tap="getPhotoListByCateId(item.id)" >
                        {{ item.title }}
                    </a>
                </div>
            </div>
        </div>

        <!--中间图片区域-->
        <ul class="photo-list">
            <router-link v-for="item in list" :key="item.id" :to="'/home/photoinfo/' + item.id" tag="li">
                <img v-lazy="item.img_url">
                <div id="info">
                    <h1 class="info-title"> {{ item.title }}</h1>
                    <div class="info-body">{{ item.zhaiyao }}</div>
                </div>
            </router-link>
        </ul>
    </div>
</template>

<script>
    import mui from '../../lib/mui/js/mui.js'


    export default {
        data() {
            return {
                cates: [], // 保存所有列表数据
                list: []  // 保存图片数据
            }
        },
        created() {
            this.getALLCategory();
            // 默认进入页面的时候就主动请求'全部'分类下的所有数据
            this.getPhotoListByCateId(0);
        },
        mounted() {
            // 页面所有DOM结构都被渲染好后执行
            // 操作元素时最好在DOM元素生成后进行
            // 初始化滑动控件
            mui('.mui-scroll-wrapper').scroll({
                deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
            });
        },
        methods: {
            getALLCategory() {
                // 获取所有图片分类
                this.$http.get('http://www.liulongbin.top:3005/api/getimgcategory')
                    .then((result) => {
                        if (result.body.status === 0) {
                            console.log(result.body.message);
                            // 手动拼接出一个完整的分类
                            result.body.message.unshift({
                                title: '全部',
                                id: 0
                            });
                            this.cates = result.body.message;
                        } else {
                            console.log(result)
                        }
                    })
            },
            getPhotoListByCateId(cateId) {
                //    根据分类的id来获取对应图片数据
                this.$http.get('http://www.liulongbin.top:3005/api/getimages/' + cateId)
                    .then(result => {
                        if (result.body.status === 0) {
                            console.log(result)
                            this.list = result.body.message;
                        } else {
                            console.log(result)
                        }
                    })
            }
        }
    }
</script>

<style scoped>
    * {
        touch-action: pan-y;
    }

    .photo-list {
        margin: 0;
        padding: 0 10px;
        list-style: none;
    }

    .photo-list li {
        background-color: #ccc;
        text-align: center;
        margin-bottom: 5px;
        box-shadow: 0 0 10px #999;
        position: relative;
    }

    img {
        width: 100%;
        vertical-align: middle;
    }

    img[lazy=loading] {
        width: 40px;
        height: 300px;
        margin: auto;
    }
    #info{
        color: white;
        text-align: left;
        position: absolute;
        bottom: 0;
        background-color: rgba(0,0,0,0.4);
        max-height: 84px;
    }
    #info .info-title{
        font-size: 14px;
    }
    #info .info-body{
        font-size: 13px;
    }
</style>