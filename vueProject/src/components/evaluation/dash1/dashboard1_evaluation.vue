<template>
    <div style="float:left; ">
        <div class="dash_title" >전년도 탄소 배출량 평가</div>

        <div class="dashboard" id="evaluation-dash1">
            <div class = "dashFalse" v-if = "baseEmissions == 0">
                <img class="nonData-img" src="@/assets/evaluationGraph/NonData.png" alt="기준 연도를 입력해주세요.">
            </div>
            <div v-else-if = "standardData !=0">
                <div class="dash-text" style="text-align: center; height:10vh; line-height: 10vh;">{{year-1}}년 탄소 배출량 평가</div>
                <Suspense>
                    <evaluationDonutGraph style="height: 50vh"></evaluationDonutGraph>
                </Suspense>

            </div>
            <div class="measure" >
                
                <span :class="{'measureissue': realData>=0,'activMeasure_red' : realData<0}" >나쁨</span>
                <span :class="{'measureissue': realData<0 || realData >=10,'activMeasure' : 0<=realData && realData<10}" >미흡</span>
                <span :class="{'measureissue': realData<10 || realData >=30,'activMeasure' : 10<=realData && realData <30}" >양호</span>
                <span :class="{'measureissue': realData<10,'activMeasure' : 30<=realData}" >좋음</span>
            </div>
            <div class = "stick">
                <evaluationStickGraph style="height: 8vh"></evaluationStickGraph>
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
    width: inherit;
    height: 84.3vh;
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

.measureissue {
    width: 21.5%;
    height: 100%;

    display: inline-block;
    text-align: left;
    text-indent: 1vw;
    line-height: 5vh;
    margin-left: 0.4vw;
    border: 1px solid #D0D0D0;
    border-radius: 5px;
    background:white;
}
.activMeasure_red{
    width: 21.5%;
    height: 100%;

    display: inline-block;
    text-align: left;
    text-indent: 1vw;
    line-height: 5vh;
    margin-left: 0.4vw;
    border: 1px solid #D0D0D0;
    border-radius: 5px;
    background:#FF7E7E;
}
.activMeasure{
    width: 21.5%;
    height: 100%;
    display: inline-block;
    text-align: left;
    text-indent: 1vw;
    line-height: 5vh;
    margin-left: 0.4vw;
    border: 1px solid #D0D0D0;
    border-radius: 5px;
    background:#3DC984;
}

.notice {
    margin-top:5vh;
    margin-right: 1vw;
    text-align: right; 
    font-size: 0.7vw; 
    color: #5A5A5A;
}
</style>

<script>
import evaluationDonutGraph from './evaluationDonutGraph.ts';
import evaluationStickGraph from './evaluationStickGraph';
import {ref,computed} from 'vue'
import {useStore} from 'vuex'
import {axios} from 'axios'
  export default {
      name :"dashboard1_evaluation",
      components:{
        // eslint-disable-next-line vue/no-unused-components
        evaluationDonutGraph,
        evaluationStickGraph,
    },
      setup() {

        //그룹명, 날짜
        var now = new Date();	// 현재 날짜 및 시간
        var year = ref(now.getFullYear())	// 년도
        var store = useStore()
        const standardData = ref(true) //기준량 여기로 받아오기. (기준량 > 작년 탄소배출량 : evaluationDecreaseGraph, 기준량 < 작년 탄소 배출량 : evaluationIncreaseGraph)
        const realData = ref(0) // 작년 탄소 배출량(%)

        var baseYear = computed(()=> store.state.baseYear)
        var baseEmissions = computed(()=> store.state.baseData)

        //서버

        var sum =computed(()=> store.state.getTotalLastData)
        realData.value = (baseEmissions.value-sum.value)/(baseEmissions.value) *100
         return{
            standardData, realData,year,baseYear,baseEmissions
         }
        }
  }
</script>
  