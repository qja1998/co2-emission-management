<template>
    <div> 
        <div class="title-border-scenario">진행상황 및 기대효과</div>
        <router-link to="/nature/progress" style="text-decoration: none;"><div class="scenario-title">총 탄소량 대비 감축된 탄소량</div></router-link>
        <div class="scenario-frame">
            <div class="dash-text-middle" style="font-size:1.8em">〈 {{year}}년 〉</div>
            <div style="padding-top: 3vh">
                <progressDonutGraph style="margin: auto; display: block; height: 35vh; width: 20vw;"></progressDonutGraph>
            </div>
            <div style="margin: 5vh 0 3vh 3vw">
                <div style="font-size: 1vw; font-weight: bold; color: #5A5A5A;">현재 총 탄소 배출량
                    <div style="font-size: 1.5vw; color: #163945;">{{carbonEmissions}} <span>CO2eq</span></div>
                </div>
                <div style="margin-top:3vh; font-size: 1vw; font-weight: bold; color: #5A5A5A;">감축 목표 탄소 배출량
                    <div style="font-size: 1.5vw; color: #3DC984;">{{ carbonLastEmissions - carbonEmissionsGoal}} <span>CO2eq</span></div>
                </div>
            </div>
        </div>
    </div>
        

</template>

<style>

</style>


<script>
import progressDonutGraph from '@/components/nature/progress/dash1/progressDonutGraph.ts';
import {ref, computed} from 'vue'
import {useStore} from 'vuex'
    export default {
        name :"progressChart",
        components:{
            progressDonutGraph
        },
        setup() {
            var store = useStore()
            //서버
            var carbonLastEmissions = computed(()=>store.state.getTotalLastData) 
            var carbonEmissions = computed(()=> store.state.getTotalNowData)
            var carbonEmissionsGoal = computed(()=> store.state.getTargetData)
            var now = new Date();	// 현재 날짜 및 시간
            var year = ref(now.getFullYear())	// 년도

            return{
                carbonEmissions,
                carbonEmissionsGoal,
                carbonLastEmissions,
                year
            }
        }
        
    }
</script>