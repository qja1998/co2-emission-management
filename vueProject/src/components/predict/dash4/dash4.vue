<template>
    <div style="">
        <div class="title-border">다음달 총 탄소 배출량 예측</div>
        <div class="frame" id="frame-dash4">
            <div class="dash4-text">{{total_emission.predictData}}
                <span>kgCO2eq</span>
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
import {ref} from 'vue'

    export default {
        name :"predict_dash4",
        setup(){
            var server_total_data = [152,120,123,130,128,136,139,150,130]
            var server_predict_total_data = [160,60,40,20,30,40]

            var total_emission = ref({
                data:0,
                predictData:0
            })

            total_emission.value.data = server_total_data[server_total_data.length-1]
            total_emission.value.predictData = server_predict_total_data[0]

            console.log(total_emission.value)

            var percent =Math.round(percentage(total_emission.value))
            function percentage(value){
                return ((value.predictData-value.data)/value.data)*100
            }

            return{total_emission,percent}
        },
        components:{
        
        }
    }
</script>