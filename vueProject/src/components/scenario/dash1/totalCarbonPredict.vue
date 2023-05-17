<template>
    <div> 
        <div class="scenario-title">탄소 배출량 예측 그래프</div>
        <div class="scenario-frame" style="padding-bottom: 3vh">
            <predict_chart style="height: 40vh;" />
        </div>
    </div>
        

</template>

<style>

</style>


<script>
import predict_chart from '@/components/predict/dash3/predictChart3.ts'
    export default {
        name :"totaCarbonPredict",
        components:{
            predict_chart
        }
    }
</script>