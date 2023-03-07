<template>
    <div style="">
        <div class="title-border">총 탄소 배출량 예측 그래프</div>
        <div class="frame" id="frame-dash3">
            <div class="dash-text">2023년 8월 시점</div>
            <predict_chart3 style="height:62vh;"/>
        </div>
        
    </div>

</template>

<style>
    #frame-dash3{
        width:50vw;
        height:85vh;
    }
    #frame-dash3 > div{
        width:inherit;
        text-align: center;
    }
</style>


<script>
import predict_chart3 from './predictChart3.ts'

    export default {
        name :"predict_dash3",
        components:{
            predict_chart3 
        }
    }
</script>