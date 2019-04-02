<template>
    <div>
        <ul class="mui-table-view">
            <li class="mui-table-view-cell mui-media" v-for="item in newslist" :key="item.id">
                <!--在字符串中加入绑定的数据，字符串需要用单引号包裹起来，不然会被解析为数据-->
                <router-link :to="'/home/newsinfo/'+ item.id">
                    <img class="mui-media-object mui-pull-left" :src="item.img_url">
                    <div class="mui-media-body">
                        <h1>{{ item.title }}</h1>
                        <p class='mui-ellipsis'>
                            <span>发表时间：{{ item.add_time }}</span>
                            <span>点击：{{ item.click }} 次</span>
                        </p>
                    </div>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
    import { Toast } from 'mint-ui';
    export default {
        data(){
            return {
                newslist:[  //保存新闻数据

                ]
            }
        },
        created(){
            this.getNewsList();
        },
        methods:{
            getNewsList(){
                // 在本地访问，需要用Node写一个后台接口
                // this.$http.get('http://localhost:8001/newslist').then(result => {
                //     if (result.body.data.status === 0) {
                //         //获取到数据后，将数据保存到data身上
                //         this.newslist = result.body.data.message;
                //     }else {
                //         Toast('获取新闻列表失败！')
                //     }
                // })
                this.$http.get('getnewslist').then(result => {
                    if (result.body.data.status === 0) {
                        //获取到数据后，将数据保存到data身上
                        this.newslist = result.body.data.message;
                    }else {
                        Toast('获取新闻列表失败！')
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .mui-table-view h1{
        font-size: 16px;
    }
    .mui-table-view .mui-ellipsis{
        font-size: 14px;
        color: #226aff;
        display: flex;
        justify-content: space-between;
    }
</style>