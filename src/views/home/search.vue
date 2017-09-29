<template>
  <section class="search">
    <article class="ipt_wrap sprites">
      <input type="text" v-model="searchVal" placeholder="搜索歌曲 歌手 专辑" class="serIpt" @input="searchData">
    </article>
    <article class="serResWrap" v-if="data.songs!=''">
      <ul class="serRes">
          <li class="serResList" v-for="item in data.songs">
            <router-link :to="`/music/`+item.id">
              <img :src="item.al.picUrl" class="item_img">
              <p>歌曲: {{item.name}}</p>
              <p>专辑: {{item.al.name}}</p>
              <p>歌手: {{item.ar[0].name}}</p>
            </router-link>
          </li>
      </ul>
    </article>
    <article class="hotSer" v-else>
      <p>热门搜索</p>
      <br>
      <span class="hot_item" v-for="item in serHistory">
        <span>{{item}}</span>
        <span class="reHistory" @click="reHistory(item)">x</span>
      </span>
    </article>
  </section>
</template>

<script>

  export default {
    name:'searchRes',
    props:{
        tabVal:''
    },
    data () {
      return {
        searchVal: '',
        data: {
            songs:[]
        },
        serHistory:[]
      }
    },
    methods: {
      searchData(){
        if (this.searchVal !== '') {
          this.$http.get('/api/?type=search&limit=10&s=' + this.searchVal)
            .then(function (res) {
              if(res.status === 200){
                  this.data = res.data.result;
                  this.data.songs = res.data.result.songs;
                  this.serHistory.push(this.searchVal);
                  localStorage.setItem('serHistory',JSON.stringify(this.serHistory));
              }

            }, function (data) {
              console.log(data.error)
            });
        }else{
            this.data.songs = '';
        }
      },
      getSerHistory () {
        let songsHistory = localStorage.getItem('serHistory');
        if(songsHistory){
            this.serHistory = songsHistory;
        }
      },
      removeWithoutCopy(arr, item) {
        for(var i=arr.length-1;i>=0;i--) {
            if(arr[i]==item) {
                arr.splice(i,1);
            }
        }
        return arr;
      },
        reHistory(name){
            this.removeWithoutCopy(this.serHistory,name);
            if(this.serHistory.length === 0){
                localStorage.removeItem('serHistory');
            }
            localStorage.setItem('serHistory',JSON.stringify(this.serHistory));
        },
    },
    mounted: function () {
      this.getSerHistory();
    },
  }
</script>

<style lang="stylus" scoped>
.search
  .ipt_wrap
    padding 1.5rem 0
    text-align center
    position relative
    &:before
      background-position 0 0
      left 8%
    input.serIpt
      width 90%
      height 2.3rem
      border-top-left-radius 1.2rem
      border-bottom-left-radius 1.2rem
      border-top-right-radius 1.2rem
      border-bottom-right-radius 1.2rem
      background #ebecec
      text-indent 3rem
      font-size 1.4rem
      color #333
  .serResWrap
    .serRes
      .serResList
        margin 1.5rem 0
        font-size 1.4rem
        .item_img
          width 5rem
          height 5rem
          vertical top
          float left
          margin-right 0.8rem
  .hotSer
    .hot_item
      padding 0.4rem 01rem
      border 1px solid #3e3e3e
      border-radius 1rem
      margin 1rem 1rem
      .reHistory
        margin-left 1.4rem


</style>
