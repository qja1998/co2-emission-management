<template>
    <div> 
        <div class="frame" id="last-bargraph-content">
            <div class="dash-text" style="width:inherit; height: 8vh; line-height: 8vh; text-align: center;">2022년 대비 2023년 감축목표</div>
            <div>
                <div style="float: left; margin: 5vh 3vw; color:#777777; font-weight: bold;">
                    <div> 2022년</div>
                    <div style="margin-top:3.5vh"> 2023년</div>
                </div>
                
                <lastBarGraph style=" display:inline-block; float:left; width:inherit; height:13vh; margin-top:3vh; float: left;"></lastBarGraph>
            </div>
            
        </div>
    </div>
        

</template>

<style>
#last-bargraph-content{
    height:30vh;
    width:76vw;
}
</style>


<script>
import lastBarGraph from './lastBarGraph';
    export default {
        name :"target_dash1",
        components:{
            lastBarGraph
        }
    }
</script>