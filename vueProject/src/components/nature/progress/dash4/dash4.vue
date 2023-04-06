<template>
    <div> 
        <div class="title-border">감축 목표 대비 현재 카테고리별 탄소 배출량</div>
        
        <div class="frame" style="width:77vw; height:37vh;">
            <div class="dash-text-middle" style="font-size:2.5rem; margin:0">2023년</div>
            <cateBarGraph style="height:30vh;"></cateBarGraph>
        </div>
    </div>
        

</template>

<script>
import cateBarGraph from './cateBarGraph';
    export default {
        name :"progress_dash4",
        components:{
            cateBarGraph
        }
    }
</script>

<style>
</style>


