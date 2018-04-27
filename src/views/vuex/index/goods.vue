<template>
    <div>
        <mt-header title="goods">
            <a href="../swiper/swiper.html" slot="left">
              <mt-button icon="back">返回</mt-button>
            </a>
            <mt-button icon="more" slot="right"></mt-button>
        </mt-header>
        <mt-button @click="change">change</mt-button>
        <ul>
          <li v-for="(item, index) in goodsArr" :key="index">{{item}}</li>
        </ul>
        <good></good>
    </div>
</template>

<script>

import {mapState, mapMutations} from 'vuex'
import good from './good'
export default {
    computed: {
      ...mapState([
        'goodsArr'
      ])
    },
    data() {
      return {
        arr: [5,6,7]
      }
    },
    methods: {
      ...mapMutations(
        ['setGoods']
      ),
      change() {
        this.setGoods(this.arr)
      }
    },
    components: {
      good
    },
    mounted() {
      console.log(this.goodsArr)
    }
}
</script>