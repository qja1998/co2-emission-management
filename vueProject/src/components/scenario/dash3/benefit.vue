<template>
    <div> 
        <div class="scenario-title">탄소 배출권 기대효과</div>
        <div class="scenario-frame" >
            <div>
                <img style="padding-top: 3vh; height: 16vh; margin: auto; display: block;" src="@/assets/money.png">
                <div style="font-size: 3vh; font-weight: bold; text-align: center; color: #163945; padding-bottom: 3vh;">{{profitMoney}}<span>원 이득</span></div>
            </div>
        </div>
    </div>
        

</template>

<style>

</style>


<script>
import {ref} from 'vue'
    export default {
        name :"benefit",
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