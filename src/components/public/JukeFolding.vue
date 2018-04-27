<template>
    <div class="juke-folding">
        <div class="folding-content">
            <span class="folding-title">{{flodTitle}}</span>
            <span class="fold-btn fr" @click="foldShow = !foldShow">{{foldShow ? '收起': '展开'}}</span>
        </div>
        <collapse-transition>
            <div v-show="foldShow">
                <slot></slot>
            </div>
        </collapse-transition>
    </div>
</template>

<script>
export default {
    props: {
        flodTitle: {
            type: String,
            default: "交易信息"
        },
        isOpen: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            foldShow: this.isOpen
        }
    },
    methods: {

    }
}
</script>

<style lang="less">
    .juke-folding{
        margin-bottom: 40px;
    }
    .fr{
        float: right;
    }
    .folding-content{
        margin: 20px 0;
        line-height: 20px;
        position: relative;
        .fold-btn{
            display: inline-block;
            width: 44px;
            text-align: center;
            line-height: 22px;
            color: #fff;
            background: #06ab7a;
            cursor: pointer;
            border-radius: 4px;
            font-size: 12px;
        }
        .folding-title{
            display: inline-block;
            font-size: 18px;
            color: #333333;
            padding-right: 20px;
            background: #fff;
            position: relative;
            z-index: 10;
        }
        &:after{
            content: '';
            position: absolute;
            width: 94%;
            height: 1px;
            background: #e5e5e5;
            top: 9px;
            left: 0;
        }
    }
</style>
