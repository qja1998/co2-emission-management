<template>
    <div> 
        <div class="title-border-scenario">탄소 배출량 확인</div>
        <router-link to="/insight" style="text-decoration: none;"><div class="scenario-title">총 탄소 배출량</div></router-link>
        <div class="scenario-frame">
            <div class="scenario-text">{{ sum }} 
                <span style="color: #5A5A5A; font-size: 1rem;">kgCO2eq</span>   
            </div>
        </div>
    </div>
        

</template>

<style>
.title-border-scenario{
    color:#163945;
    font-size: 2rem;
    font-weight: bold;
    text-align: center;
    min-width:18vw;
}
.scenario-title{
    background-color: #1E4E77;
    border: 0.2vh solid #1E4E77;
    background-size: contain;
    font-weight: bold;
    font-size: 1.3rem;
    text-align: center;
    color: white;
    border-radius: 8px 8px 0px 0px;
    padding: 1vh 1.5vw;
    margin-top: 1vh;
    width: 22vw;
}
.scenario-frame{
    background:#ffffff;
    border: 0.2vh solid #E4E5E6;
    border-radius: 0 0 8px 8px;
    padding: 0vh 1.5vw;
    width:22vw;
}
.scenario-text{
    color:#5A5A5A; 
    font-weight:bold; 
    font-size: 6vh;
    text-align: center; 
    height:14vh; 
    line-height:13vh;
}
</style>


<script>
import {useStore} from 'vuex'
import {ref, computed} from 'vue'
    export default {
        name :"totalCarbonFootprint",
        components:{
        },
        setup(){
            var store = useStore()

            //그룹명
            var selected_company = computed(()=> store.state.insight_selected_company)
            

            //서버
            var sum =computed(()=>store.state.getTotalNowData) //작년 총 탄소 배출량
            return{
                selected_company,sum
            }
        }

    }
</script>