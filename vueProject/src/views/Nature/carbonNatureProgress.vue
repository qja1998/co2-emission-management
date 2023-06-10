<template>
    <div class="measure-main">
        <navigation class="navigation"/>
        <div class="contents" style="height:145vh">
            <nature_header/>
            <div class="background">
                <select class="select_group" v-model="selected_company" @change="change_company(selected_company)">
                  <option v-for="item in group_list" :key="item">{{ item }}</option>
                </select>
                <div class="header-page">탄소 배출량 감축 진행상황</div>
                <div v-if="server == 7">
                    <div class ="dash">
                        <progress_dash1 :key="rerender_signal" id="progress-dash1"></progress_dash1>
                    </div>
                    
                    <progress_dash2 :key="rerender_signal" id="progress-dash2"></progress_dash2>
                    <progress_dash3 :key="rerender_signal" id="progress-dash3"></progress_dash3>
                    <progress_dash4 :key="rerender_signal" id="progress-dash4"></progress_dash4>
                </div>

                <div v-else-if="server!=7">
                    <div class="progress-bar">
                        <LoadingBar></LoadingBar>
                        <div class="loding-title">감축 진행사항을 분석 중입니다</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
</template>

<script>
import navigation from "@/components/Navigation.vue"
import nature_header from "@/components/nature/Header.vue"
import progress_dash1 from "@/components/nature/progress/dash1/dash1.vue"
import progress_dash2 from "@/components/nature/progress/dash2/dash2.vue"
import progress_dash3 from "@/components/nature/progress/dash3/dash3.vue"
import progress_dash4 from "@/components/nature/progress/dash4/dash4.vue"
import LoadingBar from "@/components/Loading.vue"

import { computed , ref} from 'vue';
import { useStore } from 'vuex'
import axios from 'axios'
export default {
    name :"progress",
    components:{
        navigation,
        nature_header,
        progress_dash1,
        progress_dash2,
        progress_dash3,
        progress_dash4,
        LoadingBar
    },
    setup() {
        var store = useStore()
        var group_list = computed(() => store.state.group_list).value
        var selected_company = ref(group_list[0])
        store.commit("insight_select_company",selected_company.value)
        var rerender_signal = ref(0)

        var now = new Date();	// 현재 날짜 및 시간
        var year = ref(now.getFullYear())	// 년도
        var lastyear = year.value - 1
        var month = ref(now.getMonth()) //월

        var server = ref(0)

        const config = {
            headers:{
                Authorization:"Bearer"+" "+store.state.accessToken,
            }
        }

        //기준량 데이터
        async function get_Base_Info(){
            var url = "/CarbonNature/Evaluation/"+selected_company.value
            await axios.get(url,config).then(res=>{
                store.commit('getBaseYear',res.data.BaseYear)
              store.commit('getBaseData',res.data.BaseEmissions)
            })
            .catch(error => {
            console.log(error)
             store.commit('getBaseYear',0)
             store.commit('getBaseData',0)
            })
            .finally(()=>{
                server.value = server.value + 1
                console.log(server.value)
            })

            //감축 목표 총 데이터
            var url = "/CarbonNature/CarbonYear/"+selected_company.value+"/"+year.value+"/0"
            await axios.get(url,config).then(res=>{
                store.commit('getTargetData',res.data)
                })
                .catch(error => {
                console.log(error)
                })
                .finally(()=>{
                    server.value = server.value + 1
                    console.log(server.value)
            })

            //카테고리별 감축 목표 총 데이터
            var url = "/CarbonNature/CarbonYear/"+selected_company.value+"/"+year.value+"/1"
            await axios.get(url,config).then(res=>{
                store.commit('getTargetList',res.data)
                })
                .catch(error => {
                console.log(error)
                })
                .finally(()=>{
                    server.value = server.value + 1
                    console.log(server.value)
            })

            //현재 총 데이터
            var url = "/CarbonEmission/PartEmission/"+selected_company.value+"/"+year.value+"-01-01/"+year.value+"-"+month.value+"-28/0"
            await axios.get(url,config).then(res=>{
                store.commit('getTotalNowData',sumfun(res.data))
                })
                .catch(error => {
                console.log(error)
                })
                .finally(()=>{
                    server.value = server.value + 1
                    console.log(server.value)
            })

            //작년 총 데이터
            var url = "/CarbonEmission/PartEmission/"+selected_company.value+"/"+lastyear+"-01-01/"+lastyear+"-12-28/0"
            await axios.get(url,config).then(res=>{
                store.commit('getTotalLastData',sumfun(res.data))
                })
                .catch(error => {
                console.log(error)
                })
                .finally(()=>{
                    server.value = server.value + 1
                    console.log(server.value)
            })

            //작년 카테고리별 데이터
            var url = "/CarbonEmission/PartEmission/"+selected_company.value+"/"+lastyear+"-01-01/"+lastyear+"-12-28/1"
            await axios.get(url,config).then(res=>{
                store.commit('getTotalLastCategoryDataList',res.data)
                })
                .catch(error => {
                console.log(error)
                })
                .finally(()=>{
                    server.value = server.value + 1
                    console.log(server.value)
            })

            var url = "/CarbonEmission/PartEmission/"+selected_company.value+"/"+year.value+"-01-01/"+year.value+"-"+month.value+"-28/1"
            console.log('카테고리별 현재 데이터', url)
            await axios.get(url,config).then(res=>{
                store.commit('getCategoryTotalList',res.data)
                })
                .catch(error => {
                console.log(error)
                })
                .finally(()=>{
                    server.value = server.value + 1
                    console.log(server.value)
                    rerender_signal =+1
            })
        }

        function sumfun(list){
            var sum =ref(0)
            for(var i=0; i<list.length; i++){
                sum.value = list[i] + sum.value
            }
            return sum.value
        }

        get_Base_Info()


        
        function change_company(){
            store.commit("insight_select_company",selected_company.value)
            server.value = 0
            get_Base_Info()
        }
        return{
            group_list,
            change_company,
            selected_company,
            rerender_signal,
            server
        }
    }
}
</script>

<style>
#progress-dash1{
    float:left;
}

#progress-dash2{
    float:left;
    margin-left:3.7vw;
}
#progress-dash3{
    float:left;
    margin-left:3.7vw;
    margin-top:6vh
}
 #progress-dash4{
    clear:left;
    float:left;
    margin-top:6vh
}
</style>
