<template>
  <div id="app">
    <loading :params="params"></loading>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
  import loading from './views/loading/loading.vue'
export default {
  name: 'app',
  data(){
      return {
          params:{
              isLoading: false,
              content: 'message'
          },
      }
  },
  components:{
      loading
  }

}
</script>

<style lang="stylus">
body,html
  width 100%
  height 100%
  max-width 750px
  margin 0
  padding 0
  margin 0 auto
  color #333
  font-family Arial, Helvetica, sans-serif

html
  font-size 10px

a
  text-decoration none
  color #333

p
  margin 0
  padding 0

ul
  margin 0
  padding 0

ul li
  list-style none

input,img
  border 0
  outline none

.clear_fix
  content ''
  display inline-block
  clear both

.is_fixed
  position fixed !important
  top 0
  left 0

.sprites:before
  content ''
  display inline-block
  width 20px
  height 20px
  background url('./assets/icons.png') no-repeat
  background-size 100px 100px
  position absolute
  left 0
  top 50%
  margin-top -10px

</style>
