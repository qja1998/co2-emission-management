<template>
    <div> 
        <div class="title-border">기준량 대비 탄소배출권 기대효과</div>
        <div class="frame" style="width:45vw; height:32.8vh;">
            <div id="profit-left">
                <img id= "money_icon" src="@/assets/money.png">
                <div class="dash-text" id="profit-total-text">{{profitMoney}}<span>원 이득</span></div>
            </div>
            <div id= "profit-right">
                <div class="dash-text-middle" style="text-align: left; ">현재 탄소 배출권 시세
                    <img src="@/assets/re.png" id="re-amount-btn"  @click="getAmount()">
                    <div class="dash-text-middle dash-text-navy">{{carbonMoney}}원/1co2eq</div>
                </div>
                <div class="dash-text-middle" style="text-align: left; margin-top:6vh">탄소 배출권 계산
                    <div class="dash-text-middle dash-text-navy">{{carbonMoney}}원*{{increaseEmissionOfBase}}co2eq</div>
                </div>
            </div>   
        </div>
    </div>
</template>

<script>
import {ref, computed} from 'vue'
import { useStore } from 'vuex'
import axios from "axios";
    export default {
        name :"progress_dash2",
        components:{
        },
        setup(){

            var store =useStore()
            //날짜 그룹명
            var user_group = computed(()=> store.state.user_group)
            var selected_company = computed(()=> store.state.insight_selected_company)

            var now = new Date();	// 현재 날짜 및 시간
            var year = now.getFullYear()	// 년도
            var month = now.getMonth()

            //서버
            var server_targetTotal_data = 570
            var server_EmissionInfo = {
                groupName:'경상국립대학교',
                BaseYear:2019,
                BaseEmissions:2650
            }
            const config = {
                headers:{
                Authorization:"Bearer"+" "+store.state.accessToken,
                "Content-Type": "text/html; charset=utf-8",
                }
            }
            async function getcarbonEmissionRights(){
                console.log("dawdaw")
                await axios.get("https://api.odcloud.kr/api/15102705/v1/uddi:64ea07ee-be47-40c9-bc23-ff901cfbdfe6&_returnType=json" ,config).then(res => {
                    var a = res.data.data.filter('연도' == year)
                    console.log(res.data.data.filter('연도' == year))
                })
                .catch(error => {
                    alert("로그인 시간이 만료되었습니다.")
                    console.log(error)
                    router.push('/');
                })
                .finally(() => {})
            }
            getcarbonEmissionRights()

            var carbonMoney = ref(1500)
            var increaseEmissionOfBase = server_EmissionInfo.BaseEmissions - server_targetTotal_data
            var profitMoney = ref(carbonMoney.value*increaseEmissionOfBase)

            function getAmount(){
                console.log('새로 고침')
            }
            return{
                carbonMoney,
                increaseEmissionOfBase,
                profitMoney,
                getAmount
            }
        }
        
    }
</script>

<style>
#re-amount-btn{
    margin-left:1vw; 
    height:2.5vh
}
#re-amount-btn:hover{
    cursor: pointer;
}
.dash-text-navy{
    text-align: left; 
    margin-top:2vh; 
    color:#163945; 
    font-size:3vh
}
#profit-left{
    width:20vw; 
    height: inherit; 
    float:left; 
    margin-right:3vw;
}
#profit-right{
    float:left; 
    margin-top:2vh
}
#money_icon{
    height:16vh; 
    margin:4vh 5vw 2vh 5vw;
}
#profit-total-text{
    height:3vh; 
    width:inherit; 
    text-align: center; 
    line-height:3vh;
}
#profit-total-text span{
    font-size:3vh
}
</style>


