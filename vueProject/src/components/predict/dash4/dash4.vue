<template>
    <div style="">
        <div class="title-border">다음달 총 탄소 배출량 예측</div>
        <div class="frame" id="frame-dash4">
            <div class="dash4-text" v-if="mg == false">{{total_emission.predictData}}
                <span>KgCO2eq</span>
                <div>
                    <span v-if="percent<0" style="color:#3DC984">↘{{-percent}}%</span>
                    <span v-if="percent>0" style="color:#FF0000">↗{{percent}}%</span>
                    <span>　vs last month</span>
                </div>
            </div>

            <div class="dash4-text"  v-else-if="mg == true">{{total_emission.predictData}}
                <span>MgCO2eq</span>
                <div>
                    <span v-if="percent<0" style="color:#3DC984">↘{{-percent}}%</span>
                    <span v-if="percent>0" style="color:#FF0000">↗{{percent}}%</span>
                    <span>　vs last month</span>
                </div>
            </div>
        </div>
    </div>

</template>

<style>
    #frame-dash4{
        width:20vw;
    }
    .dash4-text{
        margin:6vh 1.3vw;
        color:#163945;
        height:15vh;
        line-height:6vh;
        display: inline-block;
        font-size:6.5vh;
        font-weight: 900;
    }
    .dash4-text > span {
        font-size:3vh;
        margin-left:1vw;
        display: inline-block;
    }
    .dash4-text > div {
        color:#A8A8A8;
        font-size:2vh;
    }
</style>


<script>
<<<<<<< HEAD
import {ref} from 'vue'
=======
import {ref,computed} from 'vue'
import {useStore} from 'vuex'
>>>>>>> origin/main

    export default {
        name :"predict_dash4",
        setup(){
<<<<<<< HEAD
            var server_total_data = [152,120,123,130,128,136,139,150,130]
            var server_predict_total_data = [160,60,40,20,30,40]
=======
            var store = useStore()
            //그룹명, 날짜
            var selected_company = computed(()=> store.state.insight_selected_company)
            var user_group = computed(()=> store.state.user_group)
            var now = new Date();	// 현재 날짜 및 시간
            var year = now.getFullYear()	// 년도
            var month = now.getMonth() //월

            //서버
            var server_total_data = computed(()=> store.state.getTotalLastDataList)
            var server_predict_total_data = computed(()=> store.state.getPredictTotal)
>>>>>>> origin/main

            var total_emission = ref({
                data:0,
                predictData:0
            })

<<<<<<< HEAD
            total_emission.value.data = server_total_data[server_total_data.length-1]
            total_emission.value.predictData = server_predict_total_data[0]

            console.log(total_emission.value)
=======
            total_emission.value.data = server_total_data.value[month]
            total_emission.value.predictData = server_predict_total_data.value[0]
>>>>>>> origin/main

            var percent =Math.round(percentage(total_emission.value))
            function percentage(value){
                return ((value.predictData-value.data)/value.data)*100
            }
            
            var mg = ref(false)
            
            if(total_emission.value.predictData>1000){
                mg.value = true
                total_emission.value.predictData = (total_emission.value.predictData/1000).toFixed(1)
            }
            return{total_emission,percent,mg}
        },
        components:{
        
        }
    }
</script>