<template>
    <transition name="scale">
        <div class="mask" v-show="areaShow">
            <div class="juke-select-area" @click.stop>
                <div class="juke-area-header">
                    选择所在省份
                </div>
                <div class="juke-radio-content">
                    <juke-radio :radioArr="choiceObj.choiceOption" :value="choiceObj.choiceVal" @changeRadio="changeChoice"></juke-radio>
                </div>
                <div class="juke-area-wrapper">
                    <div class="juke-area-content">
                        <ul>
                            <!-- <li>
                                <label for="check">
                                    <input id="check" type="checkbox">华东
                                </label>
                            </li> -->
                            <li v-for="(area, index) in areaArr" :key="area.parentName">
                                <label :for="area.parentName" class="parent-label" @click.stop.prevent="toggleChecked(area)">
                                    <input :id="area.parentName" type="checkbox" :checked="area.checked">{{area.parentName}}
                                </label>
                                <label :for="child.value" v-for="(child, index) in area.childArea" :key="child.value" @click.stop.prevent="toggleSingleChecked(area, child)">
                                    <input :id="child.value" type="checkbox"  :checked="child.checked">{{child.name}}
                                </label>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="juke-area-footer">
                    <span class="confirm-btn" @click="confirmFn">确认</span>
                    <span @click="hide">取消</span>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
import JukeRadio from 'components/public/JukeRadio'
import {areaArr, remoteArea} from './area.js'
export default {
    props: {
        hasBackfill: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            areaShow: false,
            areaArr,
            cacheAreaArr: [],
            choiceObj: {
                choiceOption: [
                    {
                        text: '全选',
                        value: 'allCheck'
                    },
                    {
                        text: '全不选',
                        value: 'noCheck'
                    },
                    {
                        text: '排除偏远地区',
                        value: 'exclude'
                    }
                ],
                choiceVal: 'allCheck'
            }
        }
    },
    methods: {
        backfill() {
            if (this.cacheAreaArr.length) {
                this.areaArr = JSON.parse(JSON.stringify(this.cacheAreaArr))
                this.inspectChecked()
            }
        },
        toggleSingleChecked(area, child) {
            child.checked = !child.checked
            let parentChecked = true
            area.childArea.forEach((item) => {
                if (!item.checked) {
                    parentChecked = false
                }
            })
            area.checked = parentChecked
            this.inspectChecked()
        },
        toggleChecked(area) {
            area.checked = !area.checked
            if (area.checked) {
                area.childArea.forEach((item) => {
                    item.checked = true
                })
            } else {
                area.childArea.forEach((item) => {
                    item.checked = false
                })
            }
            this.inspectChecked()
        },
        inspectChecked() {
            let allChecked = true
            let noCheck = true
            let checkedArr = []
            this.areaArr.forEach((area) => {
                if (!area.checked) {
                    allChecked = false
                }
                area.childArea.forEach((item) => {
                    if (item.checked) {
                        noCheck = false
                    } else {
                        checkedArr.push(item.name)
                    }
                })
            })
            let checkedStr = JSON.stringify(checkedArr.sort((a, b) => {
                return a > b
            }))
            let remoteStr = JSON.stringify(remoteArea.sort((a, b) => {
                return a > b
            }))
            if (noCheck) {
                this.choiceObj.choiceVal = 'noCheck'
            } else if (allChecked) {
                this.choiceObj.choiceVal = 'allCheck'
            } else if (checkedStr == remoteStr) {
                this.choiceObj.choiceVal = 'exclude'
            } else {
                this.choiceObj.choiceVal = ''
            }
        },
        confirmFn() {
            if (!this.selectArr.length) {
                return
            }
            this.cacheAreaArr = JSON.parse(JSON.stringify(this.areaArr))
            this.$emit('customArea', this.selectArr)
            this.hide()
        },
        changeChoice(val) {
            this.choiceObj.choiceVal = val
            if (val == 'allCheck') {
                this.areaArr.forEach((area) => {
                    area.checked = true
                    area.childArea.forEach((item) => {
                        item.checked = true
                    })
                })
            }
            if (val == 'noCheck') {
                this.areaArr.forEach((area) => {
                    area.checked = false
                    area.childArea.forEach((item) => {
                        item.checked = false
                    })
                })
            }
            if (val == 'exclude') {
                this.areaArr.forEach((area) => {
                    area.checked = true
                    area.childArea.forEach((item) => {
                        if (item.name == remoteArea[0] || item.name == remoteArea[1] || item.name == remoteArea[2] || item.name == remoteArea[3] ) {
                            area.checked = false
                            item.checked = false
                        } else {
                            item.checked = true
                        }
                    })
                })
            }
            this.inspectChecked()
        },
        show() {
            this.areaShow = true
            if (this.hasBackfill) {
                this.backfill()
            }
        },
        hide() {
            this.areaShow = false
        }
    },
    mounted() {
    },
    computed: {
        selectArr() {
            let arr = []
            this.areaArr.forEach((area) => {
                return area.childArea.filter((item) => {
                    if (item.checked) {
                        arr.push(item.value)
                    }
                })
            })
            return arr
        }
    },
    watch: {
        'choiceObj.choiceVal'(newVal) {
            // console.log(newVal)
        }
    },
    components: {
        JukeRadio
    }
}
</script>
<style lang="scss">
    .juke-select-area{
        .juke-area-wrapper{
            min-height: 200px;
            border-bottom: 1px solid #e5e5e5;
            .juke-area-content{
                padding: 0 24px;
                ul{
                    li{
                        list-style: none;
                        font-size: 12px;
                        line-height: 50px;
                        border-bottom: 1px dashed #e5e5e5;
                        color: #5d5d5d;
                        label{
                            margin-right: 44px;
                            user-select: none;
                        }
                        .parent-label{
                            margin-right: 0;
                            width: 72px;
                            display: inline-block;
                            color: #333333;
                            font-weight: bold;
                        }
                        input{
                            position: relative;
                            top: 2px;
                            margin-right: 2px;
                        }
                    }
                    :last-child{
                        border: none;
                    }
                }
            }
        }
        .juke-area-footer{
            text-align: center;
            span{
                display: inline-block;
                width: 100px;
                margin-top: 12px;
                line-height: 35px;
                border: 1px solid #eeeeee;
                border-radius: 2px;
                box-sizing: border-box;
                color: #333333;
                font-size: 12px;
                cursor: pointer;
            }
            .confirm-btn{
                border-color: #00bf8f;
                background: #00bf8f;
                color: #fff;
                margin-right: 12px;
            }
        }
        .juke-area-header{
            line-height: 45px;
            color: #a0a0a0;
            text-indent: 24px;
            border-bottom: 1px solid #e5e5e5;
        }
        .juke-radio-content{
            line-height: 38px;
            padding-left: 24px;
            background: #f5f8fb;
            .juke-radio-wrap {
                label{
                    margin-right: 30px;
                }
            }
        }
    }
    .scale-enter ,.scale-leave-to{
        opacity: 0;
        .juke-select-area {
            transform: scale(0.5);
        }
    }
    .scale-enter-active,.scale-leave-active {
        transition: all .3s;
    }
    .mask{
        position: fixed;
        z-index: 100;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        background: rgba(0, 0, 0, .8);
        .juke-select-area{
            transition: all .3s;
            position: absolute;
            width: 700px;
            height: 610px;
            background: #ffffff;
            border-radius: 4px;
            left: 50%;
            top: 50%;
            margin-left: -350px;
            margin-top: -305px; 
        }
    }
</style>
