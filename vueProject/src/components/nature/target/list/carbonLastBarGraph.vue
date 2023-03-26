<template>
    <div> 
        <div class="frame" id="last-bargraph-content">
            <div class="dash-text" id="last-bargraph-title" >2022년 대비 2023년 감축목표</div>
            <div>
                <div id="last-bargraph-x">
                    <div> 2022년</div>
                    <div style="margin-top:3.5vh"> 2023년</div>
                </div>
                <lastBarGraph id ="last-bargraph" style=" "></lastBarGraph>
            </div>
            
        </div>
    </div>
        

</template>

<script>
import lastBarGraph from './lastBarGraph';
    export default {
        name :"target_dash1",
        components:{
            lastBarGraph
        }
    }
</script>

<style>
#last-bargraph-title{
    width:inherit; 
    height: 8vh; 
    line-height: 8vh; 
    text-align: center;
}
#last-bargraph-content{
    height:30vh;
    width:76vw;
}
#last-bargraph-x{
    float: left; 
    margin: 5vh 3vw; 
    color:#777777; 
    font-weight: bold;
}
#last-bargraph{
    display:inline-block; 
    float:left; 
    width:60vw; 
    height:13vh; 
    margin-top:3vh; 
    float: left;
}
</style>
