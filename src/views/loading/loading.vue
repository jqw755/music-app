<template>
    <div class="loading" v-if="params.isLoading">
        <div class="mask"></div>
        <div class="load_content">
            <div class="text">{{params.content}}</div>
            <div class="action" @click="closeLoading">确定</div>
        </div>
    </div>
</template>

<script>
    export default {
        props:{
            params:{
                isLoading:'',
                content:''
            }
        },
        data() {
            return {}
        },
        methods:{
            closeLoading(){
                this.params.isLoading = false;
            },
        },
    }
</script>

<style scoped="scoped" lang="stylus">
.loading
  width 100%
  height 100%
  position fixed
  left 0
  top 0
  z-index 1000
  .mask
    width 100%
    height 100%
    background rgba(0,0,0,0.7)
  .load_content
    width 80%
    max-width 82%
    min-height 130px
    background #fff
    border-radius 7px
    position absolute
    left 50%
    transform translate(-50%,0)
    -webkit-transform translate(-50%,0)
    top 30%
    .text
      padding-top 2rem
      text-align center
      font-size 1.8rem
    .action
      width 100%
      height 3rem
      line-height 3rem
      position absolute
      bottom 0
      text-align center
      color #1380fe
      border-top 1px solid #e9e9e9

</style>