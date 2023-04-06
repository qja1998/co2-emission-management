<template>
    <div> 
        <div class="title-border">기준량 대비 감축 목표량</div>
        <div class="frame" style="width:45vw; height:32.8vh;">
            <div style="margin-left:2vw">
                <div class="legend-style progress-dash3-legend" style="background:#777777"></div><span class="legend-text">기준량</span>
                <div class="legend-style progress-dash3-legend" style="background:#2A565B"></div><span class="legend-text">2022년 탄소 배출량</span>
                <div class="legend-style progress-dash3-legend" style="background:#3DC984"></div><span class="legend-text">감축 목표 달성시 2023년 탄소 배출량</span>
            </div>
            <div>
                <div id="last-bargraph-x" style="margin-top:6.2vh; margin-left:2vw">
                    <div> 기준량</div>
                    <div style="margin-top:3.5vh"> 2022년</div>
                    <div style="margin-top:3.5vh"> 2023년</div>
                </div>
                <goalBarGraph id ="goal-bargraph"></goalBarGraph>
            </div>
            
        </div>
    </div>
        

</template>

<script>
import goalBarGraph from './goalBarGraph';
    export default {
        name :"progress_dash3",
        components:{
            goalBarGraph
        }
    }
</script>

<style>
#goal-bargraph{
    width:30vw;
    height:8.4vw;
    float:left;
    margin-top:5vh;
}

.progress-dash3-legend{
    margin-left:4vw;
    margin-top:5vh;
}
</style>
