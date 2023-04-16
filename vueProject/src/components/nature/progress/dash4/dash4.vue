<template>
    <div> 
        <div class="title-border">감축 목표 대비 현재 카테고리별 탄소 배출량</div>
        
        <div class="frame" style="width:77vw; height:37vh;">
            <div class="dash-text-middle" style="font-size:2.5rem; margin:0">{{year}}년</div>
            <cateBarGraph id="progress-cate-graph"></cateBarGraph>
        </div>
    </div>
        

</template>

<script>
import cateBarGraph from './cateBarGraph';
import {ref} from 'vue'
    export default {
        name :"progress_dash4",
        components:{
            cateBarGraph
        },
        setup(){
            var now = new Date();	// 현재 날짜 및 시간
            var year = ref(now.getFullYear())	// 년도 

            return{
                year
            }
        }
    }
</script>

<style>
#progress-cate-graph{
    height:30vh;
}
</style>


