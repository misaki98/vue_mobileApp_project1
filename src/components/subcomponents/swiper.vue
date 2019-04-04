<template>
    <div>
        <mt-swipe :auto="4000" class="swipe" >
            <!--在组件中使用循环时v-for，一定要在使用key-->
            <!--谁使用此组件，swipeList就由父组件传值来设置-->
            <mt-swipe-item v-for="item in swipeList" :key="item.img">
                <!--当属性后面需要跟上数据的时候，需要使用v-bind，不然会被解析成字符串-->
                <img :src="item.img || item.src " alt="" :class="{ 'full': isfull }"/>
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>

<script>
    export default {
        props:[
            "swipeList",
            // 接收由父组件传来的属性，决定是否使用自适应
            "isfull"
        ]
    }
</script>

<style scoped>
    .swipe {
        height: 200px;
    }
    .mint-swipe-item{
        text-align: center;
    }
    .mint-swipe-item img {
        height: 100%;
    }

    .mint-swipe-item .full{
        width: 100%;
    }
</style>