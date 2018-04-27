<template>
<div id="app">
		<mt-header fixed title="固定在顶部"></mt-header>
		<div class="martop15"></div>
		<divider>其他</divider>
    <group>
			<cell title="me" value="" is-link link="../me/list.html"></cell>
		</group>
		<group>
			<cell title="router" value="" is-link link="../router/router.html"></cell>
		</group>
    <div class="lessTest">
      <span class="listbox">hello stylus</span>
    </div>
    <div class="block">
      <span class="demonstration">区间</span>
      <el-date-picker
        v-model="value"
        type="daterange"
        align="left"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="pickerOptions2">
      </el-date-picker>
    </div>
    
  <div class="block">
    <span class="demonstration">默认</span>
    <el-date-picker
      v-model="value1"
      type="datetime"
      placeholder="选择日期时间">
    </el-date-picker>
  </div>
  <div class="block">
    <span class="demonstration">带快捷选项</span>
    <el-date-picker
      v-model="value2"
      type="datetime"
      placeholder="选择日期时间"
      align="right"
      :picker-options="pickerOptions1">
    </el-date-picker>
  </div>
  <div class="block">
    <span class="demonstration">设置默认时间</span>
    <el-date-picker
      v-model="value3"
      type="datetime"
      placeholder="选择日期时间"
      default-time="12:00:00">
    </el-date-picker>
  </div>
  <div class="block">
     <span class="demonstration">日期选择</span>
     <el-date-picker
      v-model="value4"
      type="date"
      placeholder="选择日期">
    </el-date-picker>
  </div>
  <div class="block">
    <span class="demonstration">周</span>
    <el-date-picker
      v-model="value3"
      type="week"
      format="yyyy 第 WW 周"
      placeholder="选择周">
    </el-date-picker>
  </div>
  <div class="block">
    <span class="demonstration">月</span>
    <el-date-picker
      v-model="value4"
      type="month"
      placeholder="选择月">
    </el-date-picker>
  </div>
  <div class="block">
    <span class="demonstration">年</span>
    <el-date-picker
      v-model="value5"
      align="right"
      type="year"
      placeholder="选择年">
    </el-date-picker>
  </div>
</div>
</template>

<script>
import Lib from "assets/js/Lib";

import { Cell, Group, Divider } from "vux";
import axios from "axios";
export default {
  data() {
    return {
      webname: 5464,
      list: [
        {
          id: 0,
          name: "alert弹窗",
          url: "../vuxDemo/alert.html"
        },
        {
          id: 1,
          name: "Calendar时间选择",
          url: "../vuxDemo/calendar.html"
        },
        {
          id: 2,
          name: "button按钮",
          url: "../vuxDemo/button.html"
        }
      ],
      pickerOptions1: {
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      },
      value1: "",
      value2: "",
      value3: "",
      value4: "",
      value5: "",
      pickerOptions2: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      value: ""
    };
  },
  components: {
    Cell,
    Group,
    Divider
  },
  //实例初始化最之前，无法获取到data里的数据
  beforeCreate() {},
  //在挂载开始之前被调用
  beforeMount() {},
  //已成功挂载，相当ready()
  mounted() {
    this.$http.get("/api/posts/1").then(res => {
      console.log(res);
    });
  },
  //相关操作事件
  methods: {
    pick(date) {
      if(navigator.userAgent.indexOf('UCBrowser') > -1) {
        layer.msg("由于浏览器兼容问题，不推荐使用UC浏览器");
      } else if(OsObject.indexOf("Firefox") != -1) {
        layer.msg("由于浏览器兼容问题，不推荐使用火狐浏览器")
      }
      console.log(date);
    }
  }
};
</script>

<style lang="stylus">
.note {
  color: #666;
  padding: 10px;
  font-size: 12px;
}

.block {
  margin-bottom: 30px;
}

.note p {
  line-height: 25px;
}

.weui-cells {
  font-size: 14px !important;
}

/*
 * less 展示
 */
.lessTest {
  .listbox {
    border-radius: 10px;
    font-size: 14px;
    color: #666;
  }

  .boxcontent {
    padding: 15px;
  }
}
</style>


