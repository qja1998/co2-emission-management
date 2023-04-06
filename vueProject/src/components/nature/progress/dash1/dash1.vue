<template>
    <div> 
        <div class="title-border">감축 목표 대비 현재 총 탄소 배출량</div>
        <div class="frame" style="height:77vh; width:25vw">
            <div class="dash-text-middle" style="font-size:2.5rem">〈 2023년 〉</div>
            <progressDonutGraph style="width:16vw; margin:auto; margin-top:1vh;"></progressDonutGraph>
            <div style="margin-left:3vw">
                <div class="dash-text-middle" style="text-align:left; margin-top:0vh; font-size:1.1rem">현재 총 탄소 배출량
                    <div class="dash-text" id ="progress-dash1-text" style="color:#163945">{{carbonEmissions}} <span>CO2eq</span></div>
                </div>
                <div class="dash-text-middle" style="text-align:left; margin-top:5vh; font-size:1.1rem">감축 목표 탄소 배출량
                    <div  class="dash-text" id ="progress-dash1-text" style="color:#3DC984">{{carbonEmissionsGoal}} <span>CO2eq</span></div>
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
            return{
                carbonEmissions,
                carbonEmissionsGoal
            }
        }
    }
</script>

<style>
.dash-text-small{
    margin:4vh 3vw;
    color:#5A5A5A;
    font-size:1.3rem;
    font-weight: bold;
}
#progress-dash1-text{
    height:3vh; 
    line-height: 3vh; 
    margin:2vh 0;
    font-size:2.2rem;
    
}
</style>


