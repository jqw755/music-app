<template>
  <div class="container">
    <mu-appbar>
      <mu-text-field icon="search" class="appbar-search-field" slot="left" hintText="请输入搜索内容"/>
    </mu-appbar>
    <mobile-tear-sheet>
      <mu-list>
        <mu-sub-header>本次为您搜索到<span>{{data.songCount}}</span>条歌曲</mu-sub-header>
        <div v-for="item in data.songs">
          <mu-list-item :title="item.name">
            <mu-avatar :src="item.album.picUrl" slot="leftAvatar"/>
            <span slot="describe">
              <span style="color: rgba(0, 0, 0, .87)">{{item.artists[0].name}}</span>
              <br/>
              <span>{{item.album.name}}</span>
          </span>
            <mu-icon-menu slot="right" icon="more_vert" tooltip="操作">
              <mu-menu-item title="详情" :to="`/Music?id=${item.id}`"/>
              <mu-menu-item title="喜欢"/>
            </mu-icon-menu>
          </mu-list-item>
          <mu-divider inset/>
        </div>
      </mu-list>
    </mobile-tear-sheet>
    <!--https://api.imjad.cn/cloudmusic/?type=search&s=zhoujielun-->
  </div>


</template>

<script>
  export default {
    data () {
      return {
        data: {}
      }
    },
    mounted: function () {
      this.$http.jsonp('http://s.music.163.com/search/get/?type=1&limit=20&s=%E5%91%8A%E7%99%BD%E6%B0%94%E7%90%83')
        .then(function (data) {
          console.log(data)
          this.data = data.body.result;
        }, function (data) {
          console.log(data)
        })
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
  a
    color #3e3e3e
    display inline-block
    width 100%

  .list
    width 100%
    padding 0 16px 0 16px
    ul
      padding 0
      margin 0
      li
        width 100%
        list-style none
        float left
        margin-top 10px
        &:first-child
          margin-top 0

    .song_list
      .song_item
        .pic
          display inline-block
          width 5.5em
          height 5.5em
          border-radius 50%
          overflow hidden
          img
            display inline-block
            width 100%
            vertical-align middle
        .song_info
          display inline-block
          max-width 70%
          max-height 4em
          overflow hidden
          white-space nowrap
          text-overflow ellipsis
          vertical-align top
          padding 10px 0 0 10px
          .singer, album
            display block
            width 100%

</style>
