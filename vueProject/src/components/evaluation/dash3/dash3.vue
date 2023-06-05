<template>
    <div style="float:left; ">
      <div class="dashboard" id="evaluation-dash3">
        <div class="evaluationDash3-title">2022년</div>
        <div style="margin: 3vh 2vw 0 2vw" >
            <evaluationMonthStickGraphDefault v-if ="baseEmissions ==0" style="height: 45vh; width:30vw;"></evaluationMonthStickGraphDefault>
            <div  v-else-if ="baseEmissions !=0">
                <evaluationMonthStickGraph  style="height: 45vh; width:30vw; position:absolute" />
                <evaluationBaseLine style="height: 45vh; width:25.45vw; margin-left:3.7vw; position:absolute"></evaluationBaseLine>
            </div>
            
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
    font-size: 0.7vw; 
    color: #5A5A5A;
}
</style>

<script>
import evaluationMonthStickGraph from "./evaluationMonthStickGraph.ts"
import evaluationMonthStickGraphDefault from "./evaluationMonthStickGraphDefault";
import evaluationBaseLine from "./evaluationBaseLine";
import graph from "./graph.vue"
import { computed } from "vue";
import { useStore } from "vuex";
export default {
    name: "evaluation_month_graph",
    components: {
        evaluationMonthStickGraph,
        evaluationBaseLine,
        evaluationMonthStickGraphDefault,
        graph
    },
    setup(){
        var store = useStore()
        var baseEmissions = computed(()=> store.state.baseData)
        return{
            baseEmissions
        }
    }
}
</script>