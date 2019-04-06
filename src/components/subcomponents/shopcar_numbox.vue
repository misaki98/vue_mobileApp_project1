<template>
    <div class="mui-numbox" data-numbox-min='1' style="height: 25px;">
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <!-- 在子组件中还需要自己绑定自己的事件，然后在Vue实例中通过函数来调用 -->
        <input id="test" class="mui-input-numbox" type="number" :value="initcount" ref="numbox"
               @change="countChanged"  readonly/>
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
            "max",
            "initcount",
            "goodsid"
        ],
        methods:{
            countChanged(){
            // 改变数量并更新到下方导航
            //    该方法应该放在vuex中定义，避免局部操作全局
            //    每当数量值改变，立即把最新的数量同步到购物车的store中，同步
                this.$store.commit('updateGoodsInfo', {
                    id: this.goodsid,
                    count: this.$refs.numbox.value
                })
            }
        },
        watch:{

        }
    }
</script>

<style scoped>

