<template>
  <div class="juke-radio-wrap">
    <slot name="left"></slot>
    <label v-for="(item, index) in radioArr" @click="changeRadio(item)">
      <span class="juke-radio">
        <span class="juke-radio-inner"  :class="{'checked': item.value == val, 'disabled': item.disabled, 'checked-disabled': item.value == val && item.disabled}"></span>
      </span>
      {{item.text}}
    </label>
    <slot name="right"></slot>
  </div>
</template>

<script>
export default {
  props: {
    radioArr: {
      type: Array,
      default() {
        return []
      }
    },
    value: {
    }
  },
  data() {
    return {
      val: this.value
    }
  },
  watch: {
      value(val) {
          this.val = this.value
      }
  },
  methods: {
    changeRadio(item) {
      if (item.disabled || this.val == item.value) {
        return
      }
      this.val = item.value
      this.$emit('changeRadio', this.val)
    }
  }
}
</script>
<style lang="less">
  .juke-radio-wrap{
    label{
      display: inline-block;
      cursor: pointer;
      margin-right: 10px;
      font-size: 12px;
      .juke-radio{
        margin: 0;
        outline: none;
        line-height: 1;
        vertical-align: text-bottom;
        .juke-radio-inner{
          display: inline-block;
          width: 14px;
          height: 14px;
          border: 1px solid #d8d8d8;
          border-radius: 50%;
          position: relative;
          top: 1px;
          left: 0;
          transition: all .3s;
          &:after{
            content: '';
            position: absolute;
            top: 7px;
            left: 7px;
            display: block;
            width: 0px;
            height: 0px;
            border-radius: 50%;
            background-color: #ffffff;
            transition: all .3s;
          }
          &:hover{
            border-color: #00bf8f;
          }
        }
        .checked{
          border-color: #00bf8f;
          &:after{
            content: '';
            position: absolute;
            top: 3px;
            left: 3px;
            display: block;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background-color: #00bf8f;
            transition: all .3s;
          }
        }
        .disabled{
          cursor: not-allowed;
          background: #e7e7e7;
          &:hover{
            border-color: #d8d8d8;
          }
        }
        .checked-disabled{
          border-color: #d8d8d8;
          &:after{
            content: '';
            position: absolute;
            top: 3px;
            left: 3px;
            display: block;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background-color: #999999;
            transition: all .3s;
          }
        }
      }
    }
  }
</style>
