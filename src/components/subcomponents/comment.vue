<template>
    <div class="cmt-container">
        <h3>发表评论</h3>
        <hr>
        <textarea placeholder="最多输入120个字" v-model="msg" maxlength="120"></textarea>

        <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>
        <div class="cmt-list">
            <div class="cmt-item " v-for="(item, i) in comments" :key="item.add_time">
                <div class="cmt-title"> 第{{ i}}楼 &nbsp;&nbsp;用户：{{item.user_name}}&nbsp;&nbsp;发表时间：{{item.add_time | dateFormat}} </div>
                <div class="cmt-body">
                    {{ item.content === 'undefined' ? '此用户什么都没有写': item.content }}
                </div>
            </div>
        </div>

        <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>
    </div>
</template>

<script>
    import {Toast} from 'mint-ui'
    export default {
        data(){
            return{
                pageIndex: 1, //默认展示第一页数据
                comments: [], //保存所有的评论数据
                msg:''
            }
        },
        props:[
            'id'
        ],
        created(){
            this.getComments();
        },
        methods:{
            getComments(){
                this.$http.get("http://www.liulongbin.top:3005/api/getcomments/" + 16 +"?pageindex=" + this.pageIndex).then(result =>{
                    if (result.body.status === 0) {
                        console.log(result.body.message);
                        // this.comments = result.body.message;
                        // 获取新数据后 将数据拼接到老数据中
                        this.comments = this.comments.concat(result.body.message)
                    }else{
                        Toast('获取评论失败！')
                    }
                })
            },
            getMore(){
                this.pageIndex++;
                this.getComments();
            },
            postComment(){
                //发表评论前需要校验评论是否为空
                if (this.msg.trim().length === 0) {
                     return Toast("评论内容不能为空！");
                }
                // Post参数1： 请求的URL地址
                // Post参数2： 提交给服务器的数据对象（content： this.msg ）
                // 参数3： 定义表单中的数据格式（可以全局配置）
                this.$http.post("upload", { content: this.msg.trim() })
                    //指定成功回调
                    .then(function (result) {
                        if (result.body.status === 0) {
                        //    1. 拼接出一个评论对象
                            var cmt = {
                                user_name: '匿名用户',
                                add_time: Date.now(),
                                content: this.msg.trim()
                            };
                            this.comments.unshift(cmt);
                            this.msg = '';
                        }
                    })
            }
        }

    }
</script>

<style scoped>
    .cmt-container{

    }
    .cmt-container h3{
        font-size: 18px;
    }
    .cmt-container textarea{
        font-size: 14px;
        height: 85px;
        margin: 0;
    }
    .cmt-list{
        margin: 5px 0;
        font-size: 13px;
    }
    .cmt-list .cmt-title{
        line-height: 30px;
        background-color: #ccc;
    }
    .cmt-list .cmt-body{
        line-height: 36px;
        text-indent: 2em;
    }

</style>