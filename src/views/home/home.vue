<template>
    <section class="home">
        <!--导航-->
        <article class="home_nav is_fixed">
            <div class="nav_title">Music L</div>
            <div class="nav_tab">
                <ul>
                    <li v-for="(item,index) in navList" @click="changeTab($event,index)">
                        <span :class="navIndex==index?'active':''">{{item}}</span>
                    </li>
                </ul>
            </div>
        </article>
        <!--主体-->
        <article class="home_content" v-if="navIndex==2">
            <!--<keep-alive include="searchRes">-->
                <search></search>  <!--:tabVal="navList[navIndex]"-->
            <!--</keep-alive>-->
        </article>
        <!--<article class="home_content" v-if="navIndex">-->
            <!--<search :tabVal="navList[navIndex]"></search>-->
        <!--</article>-->
        <!--<article class="home_content" v-if="navIndex">-->
            <!--<search :tabVal="navList[navIndex]"></search>-->
        <!--</article>-->

    </section>
</template>

<script>
    import search from './search.vue'
    export default {
        data() {
            return {
                navIndex: 2,
                navList:['推荐音乐', '热歌榜', '搜索'],
            }
        },
        mounted(){

        },
        methods: {
            //tab切换
            changeTab(e,i) {
                const self = this;  //如果用到将this重新复制,不要用es6箭头函数,它会改变this指向
                self.navIndex = i;
            },
        },
        computed: {

        },
        components: {
            search,
        }
    }
</script>

<style scoped="scoped" lang="stylus">
.home
  .home_nav
    width 100%
    z-index 900
    font-size 2.2rem
    .nav_title
      height 4.8rem
      padding  0 2rem
      background #d43c33
      color #fff
      line-height 4.8rem
    .nav_tab
      width 100%
      font-size 1.4rem
      border-bottom 1px solid #ccc
      background #fff
      ul
        li
          width 32.5%
          display inline-block
          text-align center
          span
            display inline-block
            height 3.2rem
            line-height 3.2rem
            &.active
              color #d43c33
              margin-bottom -1px
              border-bottom 2px solid #d43c33
  .home_content
    width 96%
    margin 8rem 2% 0 2%
</style>
