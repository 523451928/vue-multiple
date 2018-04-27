<template>
    <div>
      <mt-header title="原生js swiper">
        <router-link to="/swiper" slot="left">
          <mt-button icon="back">返回</mt-button>
        </router-link>
        <mt-button icon="more" slot="right"></mt-button>
      </mt-header>
      <div class="wa-swiper-wrap"></div>
    </div>
</template>

<script>
import Lib from 'assets/js/Lib'
import 'assets/css/jk-swiper.scss'
import JkSwiper from 'assets/js/jk-swiper'
export default {
  mounted() {
    let swiper = new JkSwiper({
      el: document.querySelector('.wa-swiper-wrap'),
      imgArr: [
        { imgUrl: require('assets/images/bnr-1.jpg'), href: 'javascript:void(0);', },
        { imgUrl: require('assets/images/bnr-2.jpg'), href: 'javascript:void(0);' },
        {
          imgUrl: require('assets/images/bnr-3.jpg'),
          href: 'javascript:void(0);',
          callback: () => {
            console.log(this)
          }
        }
      ],
      isAutoPlay: false,
      isLoop: true
    })
  }
}
</script>
