<template>
    <div> 
        <router-link to="/nature/progress" style="text-decoration: none;"><div class="scenario-title">탄소 배출권 기대효과</div></router-link>
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
import {ref, computed} from 'vue'
import { useStore } from 'vuex'
    export default {
        name :"benefit",
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