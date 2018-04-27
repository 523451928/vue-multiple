<template>
	<div class="calendar-box" @click.stop>
        <div class="valuebox" :class="{'lightbox':showSelect}" @click.stop="toggleShow">
            <span v-if="contentShow">
                {{dateObj.year}}-{{dateObj.month}}-{{dateObj.day}}&nbsp;&nbsp;{{dateObj.hour || '00'}}:{{dateObj.minute || '00'}}
            </span>
        </div>
        <div class="chosebox" v-show="showSelect">
            <div class="titlebox">
                <i class="icon-juke" @click="yearChange('-')">&#xe658;</i>
                <i class="icon-juke" @click="monthchange('-')">&#xe657;</i>
                <div class="date-text"><b>{{dateObj.year}}</b>&nbsp;年&nbsp;<b>{{dateObj.month}}</b>&nbsp;月</div>
                <i class="icon-juke" @click="monthchange('+')">&#xe648;</i>
                <i class="icon-juke" @click="yearChange('+')">&#xe659;</i>
            </div>
            <table :id="selfid" class="daybox">
                <tr class="weektd">
                    <th>日</th>
                    <th>一</th>
                    <th>二</th>
                    <th>三</th>
                    <th>四</th>
                    <th>五</th>
                    <th>六</th>
                </tr>
                <tr v-for="wi in 6" class="daytd">
                    <td v-for="di in 7" :class="{'selectd':choseindex==(wi*7+di)}" @click="getThisDate($event, wi, di)"></td>
                </tr>
            </table>
            <div class="bottombox">
                <div class="timebox hour" :class="{'timeSelected':selectime=='hour','graycolor':!dateObj.hour}" @click="choseTime('hour')">
                    {{dateObj.hour || '时'}}
                    <ul v-if="selectime=='hour'">
                        <li v-for="i in 24" @click="choseHour(i)">{{i<10?'0'+i:i}}</li>
                    </ul>
                </div>
                <span class="colon">:</span>
                <div class="timebox minute" :class="{'timeSelected':selectime=='minute','graycolor':!dateObj.minute}" @click="choseTime('minute')">
                    {{dateObj.minute || '分'}}
                    <ul v-if="selectime=='minute'">
                        <li v-for="i in 60" @click="choseMinute(i)">{{i<10?'0'+i:i}}</li>
                    </ul>
                </div>
                <a href="javascript:void(0);" @click="clearBtn()">清空</a>
                <a href="javascript:void(0);" @click="confimBtn()">确定</a>
            </div>
        </div>
	</div>
</template>

<script>
	export default {
        props: ['selfid', 'calenObj','editTime','clearDate', 'disabled'],
		data() {
			return {
                showSelect: false,
                selectime: '',
                choseindex: '',
                chosedDate: '',
                dateObj: {
                    year: '',
                    month: '',
                    day: '',
                    hour: '',
                    minute: ''
                },
                contentShow: false
			}
       },
        mounted() {
            let nowtime = new Date()
            if (this.dateObj.year == '') {
                this.dateObj.year = nowtime.getFullYear()
            }
            if (this.dateObj.month == '') {
                this.dateObj.month = nowtime.getMonth() + 1
            }
            document.body.addEventListener('click', () => {
                this.showSelect = false
            })
            this.initCalendar()
        },
		methods: {
            toggleShow() {
                if (this.disabled) {
                    return
                }
                this.showSelect =! this.showSelect
            },
            initCalendar() {
                let _year = this.dateObj.year
                let _month = this.dateObj.month
                let _table = document.getElementById(this.selfid)
                let _tds = _table.getElementsByTagName('td')
                let nowday = new Date()
                let _firstDay = new Date(_year, _month - 1, 1)  // 当前月第一天
                for(var i = 0; i < _tds.length; i++) {
                    let _thisDay = new Date(_year, _month - 1, i + 1 - _firstDay.getDay())
                    _tds[i].innerText = _thisDay.getDate()
                    _tds[i].setAttribute('data', this.getDateStr(_thisDay))
                    if(this.getDateStr(_thisDay) == this.getDateStr(nowday)) {// 当前天
                        _tds[i].innerText = '今天'
                    }
                    if(_thisDay.getMonth() == _firstDay.getMonth()) {// 当前月
                        if (this.getDateStr(_thisDay) == this.chosedDate) { // 初始化时选中之前选中的
                            this.choseindex = ''
                            this.choseindex = i
                        }
                        _tds[i].className = 'currentMonth'
                        if (_thisDay.getTime() - 8*60*60*1000  > new Date(this.calenObj.max) || _thisDay.getTime() + 16*60*60*1000 < new Date(this.calenObj.min)) {
                            _tds[i].className = 'otherMonth'
                        }
                    } else {// 其他月
                        _tds[i].className = 'otherMonth'
                        _tds[i].disabled = true
                    }
                }
            },
            getDateStr(date) {
                var _year = date.getFullYear()
                var _month = date.getMonth() + 1 // 月从0开始计数
                var _d = date.getDate()
                _month = (_month > 9) ? ('' + _month) : ('0' + _month)
                _d = (_d > 9) ? ('' + _d) : ('0' + _d)
                return `${_year}-${_month}-${_d}`
            },
            getThisDate(e, wi, di) {
                let thisDate = new Date(this.dateObj.year, this.dateObj.month - 1)
                let choseDate = new Date(e.target.getAttribute('data'))
                if (choseDate.getTime() - 8*60*60*1000 > new Date(this.calenObj.max) || choseDate.getTime() + 16*60*60*1000 < new Date(this.calenObj.min)) {
                    return
                }
                if (choseDate.getMonth() != thisDate.getMonth()) {
                    this.dateObj.month = choseDate.getMonth() + 1
                } else {
                    this.choseindex = wi * 7 + di
                }
                this.chosedDate = e.target.getAttribute('data')
                this.dateObj.day = choseDate.getDate()
            },
            monthchange(type) {
                if (type === '+') {
                    if (this.dateObj.month >= 12) {
                        this.dateObj.year += 1
                        this.dateObj.month = 1
                    } else {
                        this.dateObj.month += 1
                    }
                } else {
                    if (this.dateObj.month <= 1) {
                        this.dateObj.year -= 1
                        this.dateObj.month = 12
                    } else {
                        this.dateObj.month -= 1
                    }
                }
            },
            yearChange(type) {
                if (type === '+') {
                    this.dateObj.year += 1
                } else {
                    this.dateObj.year -= 1
                }
            },
            choseTime(str) {
                if (this.selectime == str) {
                    this.selectime = ''
                } else {
                    this.selectime = str
                }
            },
            choseHour(i) {
                if (i < 10) {
                    i = '0' + i
                }
                this.dateObj.hour = i
            },
            choseMinute(i) {
                if (i < 10) {
                    i = '0' + i
                }
                this.dateObj.minute = i
            },
            clearBtn() {
            
                this.contentShow = false
                this.$emit('confim-date', {
                    year: '',
                    month: '',
                    day: '',
                    hour: '',
                    minute: ''
                })
                this.showSelect = false
            },
            confimBtn() {
                if (!this.dateObj.day) {
                    return
                }
                this.contentShow = true
                this.$emit('confim-date', this.dateObj)
                this.showSelect = false
            }
		},
        watch: {
        	'clearDate':function() {
        		this.clearBtn()
        	},
        	'editTime':function () {
        		if( this.editTime == 'defaulted') {
        			return 
        		}else {
        			this.dateObj = Object.assign({},this.editTime) 
        			this.contentShow = true
        		}
        	},
            'dateObj.year': function () {
                this.initCalendar()
            },
            'dateObj.month': function () {
                this.initCalendar()
            },
            'calenObj.max': function () {
                this.initCalendar()
            },
            'calenObj.min': function () {
                this.initCalendar()
            }
        }
	}
</script>

<style lang="scss" scoped>
    .calendar-box {
        position: relative;
        display: inline-block;
        .valuebox {
            display: inline-block;
            width: 180px;
            padding: 0 10px;
            box-sizing: border-box;
            height: 30px;
            line-height: 30px;
            border: 1px solid #e7e7e7;
            background-color: #fff;
            cursor: text;
            vertical-align: top;
        }
        &.disabled{
            .valuebox{
                background: #ebebe4;
            }
        }
        .lightbox {
            border: 1px solid #00bf8f;
        }
        .chosebox {
            position: absolute;
            width: 260px;
            height: 320px;
            box-sizing: border-box;
            border: 1px solid #00bf8f;
            background-color: #fff;
            left: 0px;
            top: 29px;
            z-index: 9;
            .titlebox {
                height: 40px;
                line-height: 40px;
                padding: 0 10px;
                color: #fff;
                background-color: #00bf8f;
                text-align: center;
                cursor: default;
                i {
                    width: 20px;
                    cursor: default;
                    font-style: normal;
                }
                .date-text {
                    display: inline-block;
                    font-size: 12px;
                    width: 135px;
                }
            }
            .daybox {
                height: 230px;
                width: 100%;
                text-align: center;
                cursor: default;
                .weektd {
                    th {
                        width: 14%;
                    }
                }
                .daytd {
                    td {
                        font-size: 12px;
                        &:hover {
                            background-color: #f5f8fb;
                        }
                    }
                    .currentMonth {
                        color: #666;
                    }
                    .otherMonth {
                        color: #b7b7b7;
                    }
                    .selectd {
                        color: #fff;
                        background-color: #00bf8f !important;
                    }
                }
            }
            .bottombox {
                height: 50px;
                line-height: 50px;
                border-top: 1px solid #00bf8f;
                .timebox {
                    position: relative;
                    display: inline-block;
                    width: 60px;
                    height: 30px;
                    padding: 0 10px;
                    line-height: 30px;
                    border: 1px solid #e7e7e7;
                    box-sizing: border-box;
                    margin-top: 10px;
                    margin-left: 10px;
                    ul {
                        position: absolute;
                        top: 28px;
                        left: -1px;
                        width: 60px;
                        height: 150px;
                        box-sizing: border-box;
                        overflow-y: auto;
                        border: 1px solid #00bf8f;
                        background-color: #fff;
                        color: #333;
                        li {
                            height: 30px;
                            line-height: 30px;
                            padding-left: 10px;
                            &:hover {
                                background-color: #f5f8fb;
                            }
                        }
                        &::-webkit-scrollbar{
                            display: none;
                            width: 6px;
                            height: 6px;
                        }
                        &::-webkit-scrollbar-thumb{
                            border-radius: 10px;
                            background-color: #e7e7e7;
                        }
                        &:hover {
                            &::-webkit-scrollbar {
                                display: block;
                            }
                        }
                    }
                    &:after {
                        position: absolute;
                        content: "";
                        right: 5px;
                        top: 45%;
                        width: 0px;
                        height: 0px;
                        border-style: solid;
                        border-width: 4px 4px 0px 4px;
                        border-color: #cccccc transparent transparent transparent;
                    }
                }
                .graycolor {
                    color: #999;
                }
                .timeSelected {
                    border: 1px solid #00bf8f;
                    &:after {
                        transform: scale(1, -1);
                        -webkit-transform: scale(1, -1);
                        -ms-transform: scale(1, -1);
                    }
                }
                .colon {
                    display: inline-block;
                    width: 10px;
                    text-align: right;
                    vertical-align: top;
                }
                >a {
                    margin-left: 15px;
                    vertical-align: top;
                    color: #459ae9;
                    text-decoration: none;
                    font-size: 12px;
                }
            }
        }
    }
</style>