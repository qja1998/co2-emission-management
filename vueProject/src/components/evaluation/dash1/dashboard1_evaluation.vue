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
            <div class="measure" >
                <span id="measure-issue" style="background-color: #3DC984; color: white;" v-if="realData < 0">나쁨</span>
                <span id="measure-issue" style="background-color: white;" v-else>나쁨</span>
                <span id="measure-issue" style="background-color: #3DC984; color: white;" v-if="realData < 10">미흡</span>
                <span id="measure-issue" style="background-color: white;" v-else>미흡</span>
                <span id="measure-issue" style="background-color: #3DC984; color: white;" v-if="realData < 30">양호</span>
                <span id="measure-issue" style="background-color: white;" v-else>양호</span>
                <span id="measure-issue" style="background-color: #3DC984; color: white;" v-if="realData >= 30">좋음</span>
                <span id="measure-issue" style="background-color: white;" v-else>좋음</span>

            </div>
            <div class = "stick">
                <evaluationStickGraph style="height: 7vh"></evaluationStickGraph>
            </div>
            <div class="notice">* 0% 이하 감소 : 나쁨 | 0~9% 감소 : 미흡 | 10~29% 감소 : 양호 | 30% 이상 감소 : 좋음</div>
        </div>
    </div>
    
</template>

<style>
#evaluation-dash1{
    width: 40vw;
    height: 84vh;
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
    margin: 1.5vh 3% 0 3%;
}
.measure {
    font-size: 0.8vw;
    width: inherit;
    height: 5vh;
    margin-left: 4%;
}

#measure-issue {
    width: 21.5%;
    height: 100%;

    display: inline-block;
    text-align: left;
    text-indent: 1vw;
    line-height: 5vh;
    margin-left: 0.4vw;
    border: 1px solid #D0D0D0;
    border-radius: 5px;
}

.notice {
    margin-top: 1.5vh;
    margin-right: 1vw;
    text-align: right; 
    font-size: 0.7vw; 
    color: #5A5A5A;
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
        const realData = 20 // 작년 탄소 배출량(%)
         return{
            standardData, realData
         }
        }
  }
</script>
  