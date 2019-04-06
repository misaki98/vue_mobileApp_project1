<template>
    <!-- 父组件传递的max值是一个异步函数得来的值，故在子组件渲染完成时还是undefined -->
    <!-- 可以用-->
    <div class="mui-numbox" data-numbox-min='1'>
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <!-- 在子组件中还需要自己绑定自己的事件，然后在Vue实例中通过函数来调用 -->
        <input id="test" class="mui-input-numbox" type="number" value="1" ref="numbox" @change="countChanged()" />
        <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>
</template>

<script>
    import mui from '../../lib/mui/js/mui.js'
    export default {
        mounted(){
            // 初始化数字选择框组件
            mui('.mui-numbox').numbox();
        },
        props:[
            "max"
        ],
        methods:{
            countChanged(){
            //    每当文本框数据被修改的时候，立即把最新的数据通过事件调用传递给父组件
            //    具体的数值需要通过ref来获取,需要在对应元素上定义ref的名字
                this.$emit('getcount',parseInt(this.$refs.numbox.value));
            }
        },
        watch:{
            'max': function(newVal, oldVal){
                console.log( mui('.mui-numbox').numbox());
                mui('.mui-numbox').numbox().setOption('max', newVal)
            }
        }
    }
</script>

<style scoped>

</style>