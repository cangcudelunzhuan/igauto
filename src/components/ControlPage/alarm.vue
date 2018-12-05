<template>
    <div>
        <div class="top-text">
            <span>实时报警</span>
            <a href="#" class="more">更多</a>
        </div>
        <div class="detail">
            <div class="detail-box" v-for="(arr,index) in array" :key="index">
                <div class="img-box">
                    <div class="img-number">{{arr.number}}</div>
                </div>
                <span>{{arr.test}}</span>
            </div>
        </div>
    </div>
</template>

<script>
    var testArray = [{test:'警告1',number:'11'},{test:'警告2',number:'22'},{test:'警告3',number:'33'},{test:'警告4',number:'44'},{test:'警告5',number:'55'}];
    export default {
        name: "alarm",
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
        position: relative;
    }
    .img-number{
        font-size: 12px;
        position: absolute;
        right: -8px;
        top:-8px;
    }

</style>