<template>
  <ul @click="onPagerClick" class="juke-pager">
    <li @click.stop="prevPage" :class="{'disabled':currentPage==1}">
      «
    </li>
    <li
      :class="{ active: currentPage === 1 }"
      v-if="pageCount > 0"
      class="number" title="第1页">1</li>
    <li
      class="juke-icon more btn-quickprev"
      :class="[quickprevIconClass]"
      v-if="showPrevMore"
      title="上5页"
      @mouseenter="quickprevIconClass = 'juke-icon-d-arrow-left'"
      @mouseleave="quickprevIconClass = 'juke-icon-more'">
    </li>
    <li
      v-for="pager in pagers"
      :class="{ active: currentPage === pager }"
      class="number" :title="`第${pager}页`">{{ pager }}</li>
    <li
      class="juke-icon more btn-quicknext"
      :class="[quicknextIconClass]"
      v-if="showNextMore"
      title="下5页"
      @mouseenter="quicknextIconClass = 'juke-icon-d-arrow-right'"
      @mouseleave="quicknextIconClass = 'juke-icon-more'">
    </li>
    <li
      :class="{ active: currentPage === pageCount }"
      class="number"
      v-if="pageCount > 1" :title="`第${pageCount}页`">{{ pageCount }}</li>
    <li @click.stop="nextPage" :class="{'disabled':currentPage==pageCount}">
      »
    </li>
    <span v-if="hasToPage" class="to-page" @click.stop>
      共有{{pageCount}}页 到 <input type="number" min="1" class="page-input serch-input juke-text-xs line-h" v-model="pageNum" @keyup.enter="$emit('change', pageNum)" > 页, <span class="confirm-btn" @click.stop="$emit('change', pageNum)">确定</span>
    </span>
  </ul>
</template>

<script>
  /* eslint-disable */
  export default {
    props: {
      currentPage: Number,
      pageCount: Number,
      hasToPage: {
        type: Boolean,
        default: false
      }
    },
    watch: {
      showPrevMore(val) {
        if (!val) {
          this.quickprevIconClass = 'juke-icon-more'
        }
      },
      pageNum(newVal) {
				if (newVal < 1) {
					this.pageNum  = 1
				}
				if (newVal > this.pageCount) {
					this.pageNum  = this.pageCount
				}
			},
      showNextMore(val) {
        if (!val) {
          this.quicknextIconClass = 'juke-icon-more'
        }
      }
    },
    methods: {
      change() {
        this.$emit('change', pageNum)
      },
      prevPage() {
        let currentPage = this.currentPage
        if(currentPage > 1) {
          currentPage--
          this.$emit('change', currentPage)
        }
      },
      nextPage() {
        let currentPage = this.currentPage
        if(currentPage < this.pageCount) {
          currentPage++
          this.$emit('change', currentPage)
        }
      },
      onPagerClick(event) {
        const target = event.target
        if (target.tagName === 'UL') {
          return
        }
        let newPage = Number(event.target.textContent)
        const pageCount = this.pageCount
        let currentPage = this.currentPage
        if (target.className.indexOf('more') !== -1) {
          if (target.className.indexOf('quickprev') !== -1) {
            newPage = currentPage - 5
          } else if (target.className.indexOf('quicknext') !== -1) {
            newPage = currentPage + 5
          }
        }
        /* istanbul ignore if */
        if (!isNaN(newPage)) {
          if (newPage < 1) {
            newPage = 1
          }
          if (newPage > pageCount) {
            newPage = pageCount
          }
        }
        if (newPage !== currentPage) {
          this.$emit('change', newPage)
        }
      }
    },
    computed: {
      pagers() {
        const pagerCount = 7
        const currentPage = Number(this.currentPage)
        const pageCount = Number(this.pageCount)
        let showPrevMore = false
        let showNextMore = false
        if (pageCount > pagerCount) {
          if (currentPage > pagerCount - 3) {
            showPrevMore = true
          }
          if (currentPage < pageCount - 3) {
            showNextMore = true
          }
        }
        const array = []
        if (showPrevMore && !showNextMore) {
          const startPage = pageCount - (pagerCount - 2)
          for (let i = startPage; i < pageCount; i++) {
            array.push(i)
          }
        } else if (!showPrevMore && showNextMore) {
          for (let i = 2; i < pagerCount; i++) {
            array.push(i)
          }
        } else if (showPrevMore && showNextMore) {
          const offset = Math.floor(pagerCount / 2) - 1
          for (let i = currentPage - offset;  i <= currentPage + offset; i++) {
            array.push(i)
          }
        } else {
          for (let i = 2; i < pageCount; i++) {
            array.push(i)
          }
        }
        this.showPrevMore = showPrevMore
        this.showNextMore = showNextMore
        return array
      }
    },
    data() {
      return {
        current: null,
        showPrevMore: false,
        showNextMore: false,
        quicknextIconClass: 'juke-icon-more',
        quickprevIconClass: 'juke-icon-more',
        pageNum: 1
      }
    }
  }
</script>

<style>
  .juke-pager{
    /* position: relative;
    top: -40px; */
    text-align: center;
    font-size: 0;
  }
  .juke-pager .disabled{
    cursor: not-allowed;
  }
  .juke-icon-more:after{
    content: "...";
    position: relative;
    top: -3px;
  }
  .juke-icon-d-arrow-right:after{
    content: "»»";
    color: #00bf8f;
  }
  .juke-icon-d-arrow-left:after{
    content: "««";
    color: #00bf8f;
  }
  .juke-pager li {
    vertical-align: top;
    font-size: 13px;
    min-width: 34px;
    height: 34px;
    line-height: 34px;
    box-sizing: border-box;
    text-align: center;
    border: 1px solid #ddd;
    border-radius: 2px;
    margin:0 4px;
    display: inline-block;
    cursor: pointer;
  }
  .juke-pager li.active{
    cursor: default;
    background: #00bf8f;
    border-color: #00bf8f;
    color: #fff;
  }
  .juke-pager li.juke-icon-d-arrow-right,.juke-pager li.juke-icon-d-arrow-left{
    line-height: 36px;
  }
  .to-page{
    font-size: 14px;
    margin-left: 10px;
    color: #999999;
  }
  .to-page .page-input{
    width: 50px !important;
    padding: 0 !important;
    text-align: center;
  }
  .confirm-btn{
		width: 50px;
		line-height: 28px;
		border: 1px solid #e7e7e7;
		border-radius: 2px;
		text-align: center;
		color: #999999;
		display: inline-block;
		cursor: pointer;
	}
</style>