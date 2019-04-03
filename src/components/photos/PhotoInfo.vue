<template>
    <div class="photoinfo-container">
        <h3>{{ photoinfo.title }}</h3>
        <p class="subtitle">
            <span>发表时间： {{ photoinfo.add_time | dateFormat }} </span>
            <span>点击： {{ photoinfo.click }} 次</span>
        </p>

        <hr>

        <!--缩略图区域-->
        <!--<img class="preview-img" v-for="(item, index) in list" :src="item.src" height="100" @click="$preview.open(index, list)" :key="item.src">-->
        <vue-preview :slides="list" class="thumbs"></vue-preview>

        <!--图片内容区域-->
        <div class="content" v-html="photoinfo.content">


        </div>
        <!-- 评论子组件 -->
        <cmt-box :id="id"></cmt-box>
    </div>
</template>

<script>
    // 导入评论子组件
    import comment from '../subcomponents/comment.vue'

    export default {
        data(){
            return{
                id: this.$route.params.id,
                photoinfo:{},
                list:[] //缩写图数据
            }
        },
        created(){
            this.getPhotoInfo();
            this.getThumbs();
        },
        methods:{
            getPhotoInfo(){
            // 获取图片详情
                this.$http.get('http://www.liulongbin.top:3005/api/getimageinfo/' + this.id)
                    .then(result=>{
                        if (result.body.status === 0) {
                            this.photoinfo = result.body.message[0]
                        }
                    })
            },
            getThumbs(){
            //    获取缩略图数据
                this.$http.get('http://www.liulongbin.top:3005/api/getthumimages/' + this.id)
                    .then(result =>{
                        // 循环所有图片数据，补全图片的宽和高
                        if (result.body.status === 0) {
                            result.body.message.forEach(item=>{
                                item.w = 600;
                                item.h = 400;
                                item.msrc = item.src;
                            });
                            this.list = result.body.message
                        }
                    })
            }
        },
        components:{
            // 注册子组件
            'cmt-box': comment
        }
    }
</script>

<style scoped>
    .photoinfo-container{
        padding: 3px;
    }
    .photoinfo-container h3{
        color: #26a2ff;
        font-size: 15px;
        text-align: center;
        margin: 15px 0;
    }
    .photoinfo-container .subtitle{
        display: flex;
        justify-content: space-between;
        font-size: 13px;
    }
    .content{
        font-size: 13px;
        line-height: 30px;
    }
    .thumbImg{
        box-shadow: 0 0 8px #999;
    }
</style>