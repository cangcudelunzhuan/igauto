<template>
    <div>
        <div class="top-text">
            <span>关注车辆</span>
            <a href="#" class="more">更多</a>
        </div>
        <div class="detail">
            <div class="detail-box" v-for="arr in array">
                <div class="img-box">
                </div>
                <span>{{arr.test}}</span>
            </div>
        </div>
    </div>
</template>

<script>
    var testArray = [{test:'浙A111',},{test:'浙A111'},{test:'浙A111'},{test:'添加车辆'}];
    export default {
        name: "watch-car",
        data(){
            return{
                array:testArray
            }
        }
    }
</script>

<style scoped>
    .more{
        float: right;
    }
    .top-text{
        padding: 10px 0;
        border:1px solid #d1d1d1;
    }
    .detail{
        padding-top: 25px;
        padding-bottom: 15px;
    }
    .detail:after{
        content:'';
        display: block;
        clear: both;
    }
    .detail-box{
        box-sizing: border-box;
        text-align: center;
        float:left;
        width: 20%;
    }
    .img-box{
        /*display: inline-block;*/
        margin: 0 auto;
        width: 80px;
        height:80px;
        margin-bottom: 10px;
        border:1px solid #ddd;
        /*position: relative;*/
    }
    .img-number{
        font-size: 12px;
        position: absolute;
        right: -8px;
        top:-8px;
    }

</style>