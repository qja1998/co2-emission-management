<template>
    <div style="float:left; ">
      <div class="dashboard" id="evaluation-dash3">
        <div class="evaluationDash3-title">2022년</div>
        <div style="margin: 3vh 2vw 0 2vw">
            <evaluationMonthStickGraph style="height: 45vh;" />
            <!-- <graph style="height: 45vh"/> -->
            <div class="notice_standard" >* 월별 기준량 = 탄소 배출 기준량 / 12</div>
        </div>
      </div>
    </div>
</template>

<style>
#evaluation-dash3{
    width: 35vw;
    height: 60.5vh;
}
.evaluationDash3-title{
    padding-top: 4vh;
    text-align: center;
    color: #5A5A5A;
    font-size: 3vh;
    font-weight: bold;
}
.notice_standard {
    margin-top: 1.5vh;
    text-align: right; 
    font-size: 15px; 
    color: #5A5A5A;
}
</style>

<script>
import evaluationMonthStickGraph from "./evaluationMonthStickGraph.ts"
import graph from "./graph.vue"

export default {
    name: "evaluation_month_graph",
    components: {
        evaluationMonthStickGraph,
        graph
    }
}
</script>