<template>
    <div> 
        <div class="frame" id="last-bargraph-content">
            <div class="dash-text" style="width:inherit; height: 8vh; line-height: 8vh; text-align: center;">2022년 대비 2023년 감축목표</div>
            <div>
                <lastBarGraph style=" display:inline-block; float:left; width:inherit; height:20vh;"></lastBarGraph>
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