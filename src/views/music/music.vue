<template>
  <div class="">
    <div class="content">
      <p class="bg" v-bind:style="{backgroundImage: 'url(' + song.picUrl + ')'}"></p>
      <p class="name">{{song.name}}</p>
      <p class="arit">{{aritle.name}}</p>
      <div class="song_pic_wrapper">
        <p class="song_pic" v-if=song.picUrl>
          <img :src="song.picUrl" :class={img_play:isPlaying}>
        </p>
      </div>
      <p>
        <audio :src=m controls id="_audio"></audio>
        <!--  在当前播放位置改变时执行 JavaScript:ontimeupdate()   -->
      </p>
      <div class="audio">
        <p id="play" @click="playAudio">
          <b v-if="isPlaying"> | | </b>
          <b v-else="isPlaying"> ▶ </b>
        </p>
      </div>
    </div>
    <div class="lyric">
      <!--<p v-for="(ly,idx) in this.lyric">{{ly}}</p>-->
      <p>{{lyric[this.m_time]}}</p>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        song: {},
        aritle:'',
        lyric: '',
        m: '',
        m_time: 0,
        isPlaying: false,
      }
    },
    methods: {
//      getQuery() {
//        let u = window.location.href,
//          m = u.split('id=');
//        return m[1];
//      },
      playAudio(){
        const t_audio = document.getElementById('_audio');
        if (this.isPlaying === false) {
          t_audio.play();
          this.isPlaying = true;
        } else {
          t_audio.pause();
          this.isPlaying = false
        }
      },
      getLyric(lyricVal){
        const l = lyricVal;
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
//        console.log(this.lyric)
//        console.log(this.time_flag)
      },
      getCurrentTime(){
        const a = document.getElementById("_audio");
        a.addEventListener("timeupdate", function () {
          this.m_time = this.currentTime.toFixed(0); //播放时间
//          console.log(this.currentTime.toFixed(0))
        });
      }
    },
    mounted: function () {
      const song_id = this.$route.params.id;
      this.id = song_id;
      this.$http.get('https://api.imjad.cn/cloudmusic/?type=detail&id=' + song_id)  //detail
        .then(function (data) {
//          console.log(data);
          this.song = data.body.songs[0].al;
          this.aritle = data.body.songs[0].ar[0];
        }, function (data) {
          console.log(data);
        });

      this.$http.get('https://api.imjad.cn/cloudmusic/?type=lyric&id=' + song_id)  //lyric
        .then(function (data) {
          if (data.status === 200) {
//            console.log(data)
            if (data.body.lrc.lyric) {
              this.getLyric(data.body.lrc.lyric)
            }else{
              this.lyric = '暂无歌词';
            }
          }

        }, function (data) {
          console.log(data);
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
        isPlaying:function(){
            if(this.isPlaying === true){
              this.getCurrentTime();
            }
        }
    },

  }
</script>

<style scoped="scoped" lang="stylus">
  .lyric
    width 80%
    height 30px
    overflow hidden
    text-align center
    margin-left 10%
    margin-top 10%
    color #fff
  .arit
    text-align center
    color #fff
    margin 0
    margin-bottom 5%
  .content
    width 100%
    margin-top 3rem
    overflow hidden
    .bg
      margin 0
      position absolute
      width: 100%
      height 100%
      top 0
      left 0
      filter blur(12px)
      -webkit-filter blur(12px)
      z-index -1
      background-size 100% 100%
    .name
      text-align center
      font-size 20px
      color: #fff
      overflow hidden
      white-space nowrap
      text-overflow ellipsis
      margin-bottom 0
    .song_pic_wrapper
      width 100%
      height 25rem
      .song_pic
        width 16rem
        height 16rem
        border-radius 50%
        border 22px solid #000
        -webkit-box-shadow 0px 0px 20px red
        box-shadow 0px 0px 35px red
        margin 0 auto
        overflow hidden
        z-index:2;
        img
          display inline-block
          width 100%
          vertical-align middle
    .img_play
      animation: Rotate 7s linear 0s infinite
      -webkit-animation: Rotate 7s linear 0s infinite
    #_audio
      display: none
    .audio
      width 80%
      height 50px
      line-height 50px
      text-align center
      position absolute
      left 10%
      bottom 10%
      #play
        display inline-block
        width 50px
        height 50px
        line-height 50px
        border 1px solid #fff
        border-radius 50%
        margin 0
        text-align center
        color #fff
        font-size 18px
        font-weight 500

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
