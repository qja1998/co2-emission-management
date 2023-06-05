<template>
    <div> 
        <div class="title-border">기준량 대비 탄소배출권 기대효과</div>
        <div class="frame" style="width:45vw; height:32.8vh;">
            <div id="profit-left">
                <img id= "money_icon" src="@/assets/money.png">
                <div class="dash-text" id="profit-total-text">{{profitMoney/1000}}<span>만원 이득</span></div>
            </div>
            <div id= "profit-right">
                <div class="dash-text-middle" style="text-align: left; ">현재 탄소 배출권 시세
                    <img src="@/assets/re.png" id="re-amount-btn"  @click="getAmount()">
                    <div class="dash-text-middle dash-text-navy">{{carbonMoney}}원/1kgco2eq</div>
                </div>
                <div class="dash-text-middle" style="text-align: left; margin-top:6vh">탄소 배출권 계산
                    <div class="dash-text-middle dash-text-navy">{{carbonMoney}}원*{{increaseEmissionOfBase}}Mgco2eq</div>
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
            
            const config = {
                headers:{
                    Authorization:"Bearer"+" "+store.state.accessToken,
                }
            }
            
            var getTotalLastData =  computed(()=> store.state.getTotalLastData)
            var server_targetTotal_data =  computed(()=> store.state.getTargetData)
            var BaseEmissions = computed(()=> store.state.baseData)

            var carbonMoney = ref(250)
            get_eimmision_now()
            var increaseEmissionOfBase = BaseEmissions.value - (getTotalLastData.value-server_targetTotal_data.value)
            var profitMoney = ref(carbonMoney.value*increaseEmissionOfBase)

            increaseEmissionOfBase = (increaseEmissionOfBase/1000).toFixed(0)

            async function get_eimmision_now(){
              var url = "/CarbonNature/TradePrice"
       
              await axios.get(url,config).then(res=>{
                    carbonMoney.value = res.data
                  })
                  .catch(error => {

                  })
                  .finally(()=>{

              })
            }

            function getAmount(){
                console.log('새로 고침')
                get_eimmision_now()
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


