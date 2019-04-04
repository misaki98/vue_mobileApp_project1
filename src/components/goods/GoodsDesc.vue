<template>
    <div class="goods-content">
        <h3>{{ info.title }}</h3>
        <hr>

        <div class="content" v-html="info.content">

        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                info:{

                },
                id: this.$route.params.id
            }
        },
        created(){
            this.getGoodsDesc()
        },
        methods:{
            getGoodsDesc(){
                this.$http.get('http://www.liulongbin.top:3005/api/goods/getdesc/' + this.id)
                    .then(result=>{
                        if (result.body.status === 0) {
                            this.info = result.body.message[0]
                        }
                    })
            }
        }
    }
</script>

<style>
    .goods-content{
        padding: 4px;
    }
    .goods-content h3{
        font-size: 16px;
        color: #226aff;
        text-align: center;
    }
    .goods-content img{
        width: 100%;
    }
</style>