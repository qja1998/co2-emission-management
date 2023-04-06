<template>
    <div> 
        <div class="title-border">기준량 대비 탄소배출권 기대효과</div>
        <div class="frame" style="width:45vw; height:32.8vh;">
            <div style=" width:20vw; height: inherit; float:left; margin-right:3vw">
                <img src="@/assets/money.png" style="    height:16vh; margin:4vh 5vw 2vh 5vw;" >
                <div class="dash-text" style="height:3vh; width:inherit; text-align: center; line-height:3vh;">{{profitMoney}}<span style="font-size:2rem">원 이득</span></div>
            </div>
            <div style="float:left; margin-top:2vh">
                <div class="dash-text-middle" style="text-align: left; ">현재 탄소 배출권 시세
                    <img src="@/assets/re.png" id="re-amount-btn"  @click="getAmount()">
                    <div class="dash-text-middle" style="text-align: left; margin-top:2vh; color:#163945; font-size:1.7rem">{{carbonMoney}}원/1co2eq</div>
                </div>
                <div class="dash-text-middle" style="text-align: left; margin-top:6vh">탄소 배출권 계산
                    <div class="dash-text-middle" style="text-align: left; margin-top:2vh; color:#163945; font-size:1.7rem">{{carbonMoney}}원*{{increaseEmissionOfBase}}co2eq</div>
                </div>
            </div>   
        </div>
    </div>
</template>

<script>
import {ref} from 'vue'
    export default {
        name :"progress_dash2",
        components:{
        },
        setup(){
            var carbonMoney = ref(0)
            var increaseEmissionOfBase = ref(0)
            var profitMoney = ref(0)

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
</style>


