<template>
  <div class="">
    <div class="content">
      <p class="bg" v-bind:style="{backgroundImage: 'url(' + song.picUrl + ')'}"></p>
      <p class="name">{{song.name}}</p>
      <p class="song_pic" v-if=song.picUrl>
        <img :src="song.picUrl" :class={img_play:isPlaying}>
      </p>
      <p>
        <audio :src=m controls id="_audio"></audio>
        <!--  在当前播放位置改变时执行 JavaScript:ontimeupdate()   -->
      </p>
    </div>
    <p v-html="lyric"></p>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        song: {},
        lyric: '',
        m: '',
        m_time: '',
        isPlaying: false
      }
    },
    methods: {
      getQuery() {
        let u = window.location.href,
          m = u.split('id=');
        return m[1];
      }
    },
    mounted: function () {
      const song_id = this.getQuery('id');
      this.id = song_id;
      this.$http.get('https://api.imjad.cn/cloudmusic/?type=detail&id=' + song_id)  //detail
        .then(function (data) {
//          console.log(data);
          this.song = data.body.songs[0].al;
        }, function () {
          console.log(data);
        });

      this.$http.get('https://api.imjad.cn/cloudmusic/?type=lyric&id=' + song_id)  //lyric
        .then(function (data) {
          if (data.status === 200) {
            console.log(data)
            if(data.body.lrc){
              const l = data.body.lrc.lyric;
              const lyrics = l.split("\n");
              const lrcObj = {};
              for (let i = 0; i < lyrics.length; i++) {
                const lyric = decodeURIComponent(lyrics[i]);
                const timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g;
                const timeRegExpArr = lyric.match(timeReg);
                if (!timeRegExpArr)continue;
                const clause = lyric.replace(timeReg, '');
                for (let k = 0, h = timeRegExpArr.length; k < h; k++) {
                  const t = timeRegExpArr[k];
                  const min = Number(String(t.match(/\[\d*/i)).slice(1)),
                    sec = Number(String(t.match(/\:\d*/i)).slice(1));
                  const time = min * 60 + sec;
                  lrcObj[time] = clause;
                }
              }
              this.lyric = lrcObj;

              getCurrentTime()
            }else{
              this.lyric = '没有歌词';
            }

          }


        }, function () {

        });

      this.$http.get('https://api.imjad.cn/cloudmusic/?type=song&id=' + song_id)  //song
        .then(function (data) {
//          console.log(data);
          this.m = data.body.data[0].url;
        }, function () {
          console.log(data);
        })
    },
    watch: {
      getCurrentTime(){
        let _audio = document.getElementById("_audio");
        _audio.currentTime = this.m_time;
        console.log(this.m_time)
      }
    },

  }
</script>

<style lang="stylus">
  .content
    max-height 50%
    overflow hidden
    .bg
      position absolute
      width: 100%
      height 45%
      top 0
      left 0
      filter blur(4px)
      -webkit-filter blur(4px)
      z-index -1
      background-size 100% 100%

    .name
      text-align center
      font-size 20px
      color: #fff
      overflow hidden
      white-space nowrap
      text-overflow ellipsis

    .song_pic
      width 15em
      height 15em
      border-radius 50%
      border 20px solid #000
      overflow hidden
      margin-left 22%
      img
        display inline-block
        width 100%
        vertical-align middle
    .img_play
      animation: Rotate 7s linear 0s infinite
      -webkit-animation: Rotate 7s linear 0s infinite

  @keyframes Rotate {
    from {
      transform: rotate(0deg)
    }
    to {
      transform: rotate(360deg)
    }
  }

  @-webkit-keyframes Rotate {
    from {
      transform: rotate(0deg)
    }
    to {
      transform: rotate(360deg)
    }
  }


</style>
