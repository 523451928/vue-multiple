<template>
  <div class="juke-taglist">
    <slot></slot>
    <span class="juke-tag-item" v-for="(item, index) in tagsArr" :class="{'checked': item.value == val}" @click="changeCheck(item)">
      {{item.text}}
    </span>
  </div>  
</template>
<script>
export default {
  props: {
      tagsArr: {
          type: Array,
          default() {
              return [
                  {text: '不限',value: 'unlimited'},
                  {text: '上架',value: 'shelf'}
              ]
          }
      },
      value: {
          type: String,
          default: 'shelf'
      }
  },
  data() {
      return {
          val: this.value
      }
  },
  methods: {
      changeCheck(item) {
          if (item.value == this.val) {
              return
          }
          this.val = item.value
          this.$emit('changeCheck', this.val)
      }
  }
}
</script>
<style lang="less">
  .juke-taglist{
    .juke-tag-item{
      display: inline-block;
      line-height: 28px;
      padding: 0 20px;
      border: 1px solid #d7d7d7;
      color: #666;
      margin-right: 20px;
      position: relative;
      color: #333333;
      font-size: 12px;
      cursor: pointer;
    }
    .checked{
      border-color: #00bf8f;
      color: #00bf8f;
      &:after{
        content: "\E666";
        position: absolute;
        right: -1px;
        bottom: -2px;
        color: #fff;
        font-family: "icon-juke";
        line-height: 18px;
      }
      &:before{
        content: "";
        position: absolute;
        right: 0;
        bottom: 0;
        width: 0;
        height: 0;
        border-top: 9px solid transparent;
        border-right: 9px solid #00bf8f;
        border-bottom: 9px solid #00bf8f;
        border-left: 9px solid transparent;
      }
    }
  }
</style>
