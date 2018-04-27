<template>
    <div>
        <mt-header title="vue swiper">
            <router-link to="/nativeswiper" slot="left">
            <mt-button icon="back">返回</mt-button>
            </router-link>
            <mt-button icon="more" slot="right"></mt-button>
        </mt-header>
        <swiper :imgArr="imgArr" clientType="mobile"></swiper>
        <!-- <img src="../../../assets/images/bnr-1.jpg"> -->
    </div>
</template>

<script>
import Swiper from 'components/Swiper'
// import Lib from "assets/js/Lib"
export default {
    components: {
        Swiper
    },
    data() {
        return {
            imgArr: [
                require("../../../assets/images/bnr-1.jpg"),
                require("assets/images/bnr-2.jpg"),
                require("assets/images/bnr-3.jpg")
            ]
        }
    },
    mounted() {
        // console.log(this.imgArr)
    }
}
</script>
