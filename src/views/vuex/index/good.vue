<template>
    <div>
        <ul>
          <li v-for="(item, index) in goodsArr" :key="index">{{item}}</li>
        </ul>
    </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    computed: {
      ...mapState([
        'goodsArr'
      ])
    }
}
</script>

<style lang="less" scoped>
  li{
    line-height: 50px;
  }
</style>

