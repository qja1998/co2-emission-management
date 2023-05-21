<template>
    <div> 
        <div class="title-border">감축 목표 대비 현재 총 탄소 배출량</div>
        <div class="frame"  style="height:77vh; width:25vw">
            <div class="dash-text-middle" style="font-size:2.5rem">〈 {{year}}년 〉</div>
            <div id="progress-dash1-graph">
                <progressDonutGraph style="height:inherit"></progressDonutGraph>
            </div>
            <div style="margin-left:3vw">
                <div class="dash-text-middle progress-dash1-text">현재 총 탄소 배출량
                    <div class="dash-text progress-dash1-emission-text">{{carbonEmissions}} <span>CO2eq</span></div>
                </div>
                <div class="dash-text-middle progress-dash1-text" style="margin-top:5vh;">감축 목표 탄소 배출량
                    <div  class="dash-text progress-dash1-emission-text" id ="goal-text">{{carbonEmissionsGoal}} <span>CO2eq</span></div>
                </div>
            </div>
            
        </div>
    </div>
        

</template>

<script>
import progressDonutGraph from './progressDonutGraph';
import {ref} from 'vue'
    export default {
        name :"progress_dash1",
        components:{
            progressDonutGraph
        },
        setup(){
            var carbonEmissions =ref(5000)
            var carbonEmissionsGoal = ref(51200)
            var now = new Date();	// 현재 날짜 및 시간
            var year = ref(now.getFullYear())	// 년도
            return{
                carbonEmissions,
                carbonEmissionsGoal,
                year
            }
        }
    }
</script>

<style>
.dash-text-small{
    margin:4vh 3vw;
    color:#5A5A5A;
    font-size:2vh;
    font-weight: bold;
}
.progress-dash1-emission-text{
    height:3vh; 
    line-height: 3vh; 
    margin:2vh 0;
    font-size:3.7vh;
    color:#163945
}
.progress-dash1-text{
    text-align:left; 
    margin-top:0vh; 
    font-size:1.1rem
}
#goal-text{
    color:#3DC984
}
#progress-dash1-graph{
    width:17vw; 
    height:35vh;
    padding:2vh 4vw 4vh;
    margin-top:1vh;
}
</style>