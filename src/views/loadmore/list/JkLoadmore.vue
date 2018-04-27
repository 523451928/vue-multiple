<template>
    <div class="loadmore-wrapper">
        <mt-header title="vue loadmore">
            <router-link to="/nativeloadmore" slot="left">
            <mt-button icon="back">返回</mt-button>
            </router-link>
            <mt-button icon="more" slot="right"></mt-button>
        </mt-header>
        <div class="loadmore">
            <div class="loadmore-box">
                <v-loadmore :top-method="loadTop" :bottom-method="loadBottom" :all-bottom-loaded="allLoaded"
                            @change-translate="changeTranslate"
                            @top-status-change="handleTopChange" @bottom-status-change="handleBottomChange" ref="loadmore">
                    <ul>
                    <li v-for="item in list">{{ item }}</li>
                    </ul>
                    <!--<div slot="top" class="mint-loadmore-top">-->
                    <!--<span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">↓</span>-->
                    <!--<span v-show="topStatus === 'loading'">Loading...</span>-->
                    <!--</div>-->
                </v-loadmore>
            </div>
        </div>
    </div>
</template>

<script>
  import VLoadmore from 'components/Loadmore.vue'
  export default {
    name: 'Loadmore',
    data () {
      return {
        list:[1,2,3,4,5,6,7],
        allLoaded:false,
        topStatus:""
      }
    },
    methods:{
      loadTop(){
        setTimeout(()=>{
          this.$refs.loadmore.onTopLoaded();
        },2000)
      },
      loadBottom(){
        setTimeout(() => {
          let last = this.list[this.list.length - 1];
          for (let i = 1; i <= 10; i++) {
            this.list.push(last + i);
          }
          this.$refs.loadmore.onBottomLoaded();
          if(last>=30){
            this.allLoaded=true
          }
        }, 1500);
      },
      handleTopChange(status) {
        this.topStatus = status;
      },
      handleBottomChange(status){
        console.log(status)
      },
      changeTranslate(translate){
        console.log(translate)
      }
    },
    components:{
      VLoadmore
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.loadmore-wrapper{
    height: 100%;
    padding: 0;
}
.mint-header{
    position: fixed !important;
    top: 0;
    z-index: 100;
    width: 100%;
}
.loadmore-box{
    padding-top: 50px;
}
</style>
