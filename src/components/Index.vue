<template>
  <div class="container">
    <p>本次为您搜索到<span>{{data.songCount}}</span>条歌曲</p>
    <div class="list">
      <ul class="song_list clear_fix">
        <li class="song_item" v-for="item in data.songs">
          <router-link :to="`/Music?id=${item.id}`">
            <span class="pic">
              <img :src="item.album.picUrl" alt="">
            </span>
            <span class="song_info">
              <span class="singer">{{item.artists[0].name}}</span>
              <span class="album">{{item.album.name}}</span>
            </span>
          </router-link>
        </li>
      </ul>
    </div>
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
          max-width 75%
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
