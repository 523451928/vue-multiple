<template>
  <div class="member-marketing-wrapper">
    <!-- <div class="block">
      <juke-radio @changeRadio="changeRadio" :radioArr="radioArr" :value='val'></juke-radio>
    </div>
    <div class="block">
      <juke-checktag></juke-checktag>
    </div> -->
     <div class="member-marketing-container">
       <div class="merber-header">
         <ul>
           <li class="filter-member">
             <span>
               <i>1</i> 
             </span>筛选会员
           </li>
           <li class="edit-msg">
             <span><i>2</i></span>短信编辑
           </li>
         </ul>
       </div>
       <div class="member-content">
          <div>
            <juke-checktag :tagsArr="tagsArr" :value="tagVal" @changeCheck="changeSelect">
              <span class="special-text">发送对象选取</span>
            </juke-checktag>
          </div>
          <juke-folding>
              <div class="juke-block">
                  <span class="special-text">所属店铺</span>
                  <select class="juke-select" v-model="shopObj.shopVal">
                      <option v-for="(shop, index) in shopObj.shopOption" :value="shop.value">{{shop.text}}</option>
                  </select>
              </div>
              <juke-radio class="juke-block" :radioArr="amountObj.amountOption" :value="amountObj.amountVal" @changeRadio="changeAmount">
                <span slot="left" class="special-text">交易金额</span>
                <span slot="right">
                    <input class="juke-number-input" v-model="amountObj.min" type="number" :disabled="amountObj.amountVal != 'custom'" placeholder="请填写"
                    @blur="numberVerify(amountObj.min, amountObj.max, '交易金额', '1')"> -
                    <input class="juke-number-input" v-model="amountObj.max" type="number" :disabled="amountObj.amountVal != 'custom'" placeholder="请填写"
                    @blur="numberVerify(amountObj.min, amountObj.max, '交易金额', '2')">
                </span>
              </juke-radio>
              <juke-radio class="juke-block" :radioArr="tradeTimeObj.tradeTimeOption" :value="tradeTimeObj.tradeTimeVal" @changeRadio="changeTradeTime">
                <span slot="left" class="special-text">最近交易时间</span>
                <span slot="right">
                    <juke-calendar selfid="tradeStartTime" :disabled="tradeTimeObj.tradeTimeVal != 'custom'" :class="{'disabled': tradeTimeObj.tradeTimeVal != 'custom'}" :calen-obj="tradeStartObj" @confim-date="tradeStartTime" :edit-time='tradeStart' :clear-date='clearDate'></juke-calendar>
					<span class="vertop">&nbsp;-&nbsp;</span>
					<juke-calendar selfid="tradeEndTime" :disabled="tradeTimeObj.tradeTimeVal != 'custom'" :class="{'disabled': tradeTimeObj.tradeTimeVal != 'custom'}" :calen-obj="tradeEndObj" @confim-date="tradeEndTime" :edit-time='tradeEnd' :clear-date='clearDate'></juke-calendar>
                </span>
              </juke-radio>
              <juke-radio class="juke-block" :radioArr="areaObj.areaOption" :value="areaObj.areaVal" @changeRadio="changeArea">
                <span slot="left" class="special-text">收货地区选择</span>
                <span class="select-area" slot="right" :class="{'disabled': areaObj.areaVal != 'custom'}" @click="selectArea">
                    {{areaObj.customArr.length ? `${areaObj.customArr.length}个地区`: '选择地区'}}
                </span>
              </juke-radio>
          </juke-folding>
          <juke-folding flodTitle="互动信息（高级筛选）">
              <juke-radio class="juke-block" :radioArr="amountObj.amountOption" :value="amountObj.amountVal" @changeRadio="changeAmount">
                <span slot="left" class="special-text special-overflow">是否关注公众号</span>
              </juke-radio>
          </juke-folding>
       </div>
     </div> 
     <juke-select-area ref="selectAreaRef" @customArea="customArea"></juke-select-area>
  </div>
</template>

<script>
import JukeRadio from 'components/public/JukeRadio'
import JukeChecktag from 'components/public/JukeChecktag'
import JukeFolding from 'components/public/JukeFolding'
import JukeSelectArea from 'components/public/JukeSelectArea'
import JukeCalendar from 'components/public/JukeCalendar'
import 'assets/css/font.scss'
export default {
  data() {
    return {
        clearDate: false,
        tradeStartObj: {
            max: ''
        },
        tradeStart: '',
        tradeEnd: '',
        tradeEndObj: {
            min: ''
        },
        tradeTimeObj: {
            tradeTimeOption: [
                {value: 'nolimittime', text: '不限时间'},
                {value: '最近30天', text: '最近30天'},
                {value: '最近90天', text: '最近90天'},
                {value: '90天以上', text: '90天以上'},
                {value: 'custom', text: '自定义'}
            ],
            tradeTimeVal: 'nolimittime'
        },
        shopObj: {
            shopOption: [
                {value: '全部店铺', text: '全部店铺'},
                {value: '个人店铺', text: '个人店铺'}
            ],
            shopVal: '全部店铺'
        },
        amountObj: {
             amountOption: [
                {value: 'nolimit', text: '不限金额'},
                {value: '1-50', text: '1-50元'},
                {value: '50-100', text: '50-100元'},
                {value: '100-200', text: '100-200元'},
                {value: 'custom', text: '自定义'}
            ],
            amountVal: 'nolimit',
            min: '',
            max: ''
        },
        areaObj: {
            areaOption: [
                {value: 'nolimit', text: '不限地区'},
                {value: '江浙沪', text: '江浙沪'},
                {value: 'custom', text: '自定义'}
            ],
            areaVal: 'nolimit',
            areaArr: [],
            customArr: []
        },
        tagsArr: [
            {
                text: '自定义条件选取发送对象',
                value: 'custom'
            },
            {
                text: '按群组选取',
                value: 'group'
            },
            {
                text: '按标签选取',
                value: 'tag'
            }
       ],
       tagVal: 'custom'
    }
  },
  methods: {
    tradeEndTime(obj) {
        console.log(obj)
    },
    tradeStartTime(obj) {
        console.log(obj)
    },
    changeTradeTime(val) {
        this.tradeTimeObj.tradeTimeVal = val
    },  
    customArea(arr) {
        this.areaObj.customArr = arr
        this.areaObj.areaArr = arr
    },
    selectArea() {
        if (this.areaObj.areaVal == 'custom') {
            this.$refs.selectAreaRef.show()
        }
    },
    changeArea(val) {
        this.areaObj.areaVal = val
        switch (val) {
            case 'nolimit' :
                console.log('不限地区')
                break;
            case '江浙沪' :
                this.areaObj.areaArr = ['江苏', '浙江', '上海']
                break;
            case 'custom' :
                console.log(this.areaObj.customArr.length)                
                break;
        }
    },  
    changeAmount(val) {
        this.amountObj.amountVal = val
        console.log(val)
    },
    changeSelect(val) {
        console.log(val)
    },
    numberVerify(num1, num2, tips, around) {
        let regNum = /^\d+\.\d+$/;
        if(num1 === '' || num2 === '') {
            return
        } else {
            if(num1 && num1 < 0 || num2 && num2 < 0) {
                // layer.msg(`${tips}不能小于0`)
                console.log(`${tips}不能小于0`)
            } else {
                if(regNum.test(num1) || regNum.test(num2)) {
                    // layer.msg('有小数点')
                    console.log('有小数点')
                } else {
                    if(Number(num1) > Number(num2)) {
                        // layer.msg(`${tips}区间填写有误`)
                        console.log(`${tips}区间填写有误`)
                    }
                }
            }
        }
    }
  },
  components: {
    JukeRadio,
    JukeChecktag,
    JukeFolding,
    JukeSelectArea,
    JukeCalendar
  } 
}
</script>
<style lang="less">
  *{
    margin: 0;
    padding: 0;
  }
  .select-area{
      display: inline-block;
      font-size: 12px;
      border: 1px solid #dcdcdc;
      width: 72px;
      text-align: center;
      line-height: 22px;
      border-radius: 4px;
      background: linear-gradient(#f8f8f8, #edecec);
      cursor: pointer;
      &.disabled{
          background: #ccc;
          cursor: not-allowed;
          color: #fff;
      }
  }
  .juke-block{
      margin-bottom: 15px;
  }
  .juke-select{
    width: 260px;
    height: 30px;
    line-height: 30px;
    border: 1px solid #e7e7e7;
    &:focus{
        border: 1px solid #e7e7e7;
        outline: none;
    }
  }
  .juke-number-input{
      width: 130px;
      line-height: 30px;
      text-indent: 10px;
      border: 1px solid #e7e7e7;
      &:focus{
          border: 1px solid #69c2a2;
          outline: none;
      }
  }
  .block{
    margin-bottom: 15px;
  }
  body{
    background: #f5f5f5;
  }
  .member-marketing-wrapper{
    padding: 35px;
    background: #fff;
    width: 1024px;
    margin: 0 auto;
    .member-marketing-container{
      .member-content{
        padding: 24px;
        .special-text{
            font-size: 12px;
            color: #333333;
            font-weight: bold;
            display: inline-block;
            width: 74px;
            text-align: right;
            margin-right: 10px;
        }
        .special-overflow{
            vertical-align: middle;
            text-align: left;
        }
      }
      min-height: 200px;
      border: 1px solid #e5e5e5;
      .merber-header{
        width: 100%;
        ul{
          display: flex;
          li{
            flex: 1;
            line-height: 40px;
            text-align: center;
            list-style: none;
            span{
              display: inline-block;
              width: 24px;
              height: 24px;
              border-radius: 50%;
              background: #fff;
              position: relative;
              top: 7px;
              margin-right: 6px;
              font-size: 14px;
              i{
                font-style: normal;
                position: absolute;
                top: -7px;
                left: 8px;
              }
            }
          }
          .filter-member{
            position: relative;
            background: #69c2a2;
            color: #fff;
            span{
              color: #69c2a2;
            }
            &:after{
              content: '';
              display: block;
              position: absolute;
              width: 28px;
              height: 28px;
              background: #69c2a2;
              right: -14px;
              top: 6px;
              transform: rotate(45deg);
            }
          }
          .edit-msg{
            background: #f5f5f5;
            color: #999999;
          }
        }
      }
    }
  }
</style>

