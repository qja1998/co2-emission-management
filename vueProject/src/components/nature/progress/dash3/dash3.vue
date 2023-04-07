<template>
    <div> 
        <div class="title-border">기준량 대비 감축 목표량</div>
        <div class="frame" style="width:45vw; height:32.8vh;">
            <span id="progress-legend" v-for="title ,i in legendList">
                <span class = "progress-dash3-legend"><div class="legend-style" :style="{ background:activeColor[i]}"></div></span>
                <span class="legend-text" id="progress-legend-text">{{title}}</span>
            </span>
            <div>
                <div id="last-bargraph-x" class= "progress-bar-x">
                    <div> 기준량</div>
                    <div> {{year-1}}</div>
                    <div> {{year}}</div>
                </div>
                <goalBarGraph id ="goal-bargraph"></goalBarGraph>
            </div>
            
        </div>
    </div>
        

</template>

<script>
import goalBarGraph from './goalBarGraph';
import {ref} from 'vue';

    export default {
        name :"progress_dash3",
        components:{
            goalBarGraph
        },
        setup(){
            var now = new Date();	// 현재 날짜 및 시간
            var year = ref(now.getFullYear())	// 년도
            var activeColor = [
                '#777777',
                '#2A565B',
                '#3DC984'
            ]
            var legendList=[
                '기준량',
                (year.value-1) + '년 탄소 배출량',
                '감축목표 달성시 '+(year.value)+'년 탄소 배출량'
            ]
            return{
                activeColor,
                legendList,
                year
            }
        }
    }
</script>

<style>
#goal-bargraph{
    width:30vw;
    height:15vh;
    float:left;
    margin-top:5vh;
}

.progress-dash3-legend{
    display:inline-block;
    float:left;
}
.progress-bar-x{
    margin-top:6.2vh; 
    margin-left:2vw;
    height:15vh;
    font-size:1.6vh;
}
.progress-bar-x > div{
    height:5vh;
    line-height: 5vh;
}
#progress-legend{
    margin-left:5vw;
    display:inline-block;
    max-width:15vw;
    margin-top:3vh;
}
#progress-legend-text{
    float:left; 
    max-width:12vw;
}
</style>
