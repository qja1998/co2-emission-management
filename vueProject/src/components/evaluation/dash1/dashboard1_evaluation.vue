<template>
    <div style="float:left; ">
        <div class="dash_title" >전년도 탄소 배출량 평가</div>
        <div class="dashboard" id="evaluation-dash1">
            <div class = "dashFalse" v-if = "standardData == false">
                <img class="nonData-img" src="@/assets/evaluationGraph/NonData.png" alt="기준 연도를 입력해주세요.">
            </div>
            <div v-else-if = "standardData == true">
                <div class="dash-text" style="text-align: center;">2022년 탄소 배출량 평가</div>
                <evaluationDecreaseDonutGraph style="height: 50vh"></evaluationDecreaseDonutGraph>
            </div>
        </div>
    </div>
    
</template>

<style>
#evaluation-dash1{
    width: 40vw;
    height: 95vh;
}
.dashFalse{
    width: 40vw;
    height: 95vh;
    overflow: hidden;
    margin: 0 auto;
}
.nonData-img{
    width: 100%;
    height: 100%;
    object-fit: cover;
}
</style>

<script>
import evaluationDecreaseDonutGraph from './evaluationDecreaseDonutGraph.ts';


  export default {
      name :"dashboard1_evaluation",
      components:{
        // eslint-disable-next-line vue/no-unused-components
        evaluationDecreaseDonutGraph
      },
      setup() {
        const standardData = true //기준량 여기로 받아오기. (기준량 > 작년 탄소배출량 : evaluationDecreaseGraph, 기준량 < 작년 탄소 배출량 : evaluationIncreaseGraph)
        var data = 34258 // 작년 탄소 배출량
         return{
            standardData, data
         }
        }
  }
</script>
  