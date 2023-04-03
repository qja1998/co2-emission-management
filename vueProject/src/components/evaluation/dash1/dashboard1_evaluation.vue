<template>
    <div style="float:left; ">
        <div class="dash_title" >전년도 탄소 배출량 평가</div>
        <div class="dashboard" id="evaluation-dash1">
            <div class = "dashFalse" v-if = "standardData == false">
                <img class="nonData-img" src="@/assets/evaluationGraph/NonData.png" alt="기준 연도를 입력해주세요.">
            </div>
            <div v-else-if = "standardData == true">
                <div class="dash-text" style="text-align: center;">2022년 탄소 배출량 평가</div>
                <evaluationDonutGraph style="height: 50vh"></evaluationDonutGraph>
            </div>
            <div class="measure">
                <span style="border: 2px solid grey; border-radius: 5px;">나쁨</span>
                <span style="border: 2px solid grey; border-radius: 5px;">미흡</span>
                <span style="border: 2px solid grey; border-radius: 5px;">양호</span>
                <span style="border: 2px solid grey; border-radius: 5px;">좋음</span>
            </div>
            <div class = "stick">
                <evaluationStickGraph style="height: 7vh"></evaluationStickGraph>
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
.stick{
    margin-left: 3%;
    margin-right: 3%;
}
.measure {
    font-size: 1.5vh;
    width: inherit;
    text-align: center;
}
.measrue > span {
    width: 30vw;
    height: 20vh;
    display: inline-block;
    line-height: 5vh;
    padding-left: 5vw;
}
</style>

<script>
import evaluationDonutGraph from './evaluationDonutGraph.ts';
import evaluationStickGraph from './evaluationStickGraph';


  export default {
      name :"dashboard1_evaluation",
      components:{
    // eslint-disable-next-line vue/no-unused-components
    evaluationDonutGraph,
    evaluationStickGraph
},
      setup() {
        const standardData = true //기준량 여기로 받아오기. (기준량 > 작년 탄소배출량 : evaluationDecreaseGraph, 기준량 < 작년 탄소 배출량 : evaluationIncreaseGraph)
         return{
            standardData
         }
        }
  }
</script>
  