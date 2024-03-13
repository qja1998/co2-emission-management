<template>
    <div class="measure-main">
        <navigation class="navigation"/>
        <div class="contents">
            <scenario_header/>
            <div class="background">
              <div style="height:140vh;">
                <select class="select_group" v-model="selected_company" @change="change_company()">
                  <option v-for="item in group_list" :key="item">{{ item }}</option>
                </select>
                <p class="header-page" style="margin:0">탄소 중립 시나리오 한눈에 보기<br>
                  <span class="subHeader-page">Carbon Neutral Scenarios Overview</span>
                </p>
                <div id="wrap1">
                    <div :key="rerender_signal">
                        <div><dash1_footprint   v-if="server==7" style="padding-top: 3vh;" /></div>
                        <div style="padding-top: 2vh;"><dash1_scopeChart  v-if="server==7" /></div>
                        <div style="padding-top: 2vh;"><dash1_predictChart  v-if="server==7" /></div>
                    </div>
                    <dash2_reduceList :key="rerender_signal" style="padding: 3vh 0 0 1.5vw;"  v-if="server==7" />
                    <div>
                        <dash3_progress :key="rerender_signal" style="padding: 3vh 0 0 1.5vw;"  v-if="server==7" />
                        <dash3_benefit :key="rerender_signal" style="padding: 3vh 0 0 1.5vw;"  v-if="server==7" />
                    </div>
                </div>
              </div>
            </div>
          </div>
      </div>
  </template>
  
  
  <style>

  </style>
  
  <script>
  import navigation from "@/components/Navigation.vue"
  import scenario_header from "@/components/scenario/Header.vue"
  import dash1_footprint from "@/components/scenario/dash1/totalCarbonFootprint.vue"
  import dash1_scopeChart from "@/components/scenario/dash1/scopeRatio.vue"
  import dash1_predictChart from "@/components/scenario/dash1/totalCarbonPredict.vue"
  import dash2_reduceList from "@/components/scenario/dash2/reduceList.vue"
  import dash3_progress from "@/components/scenario/dash3/progressChart.vue"
  import dash3_benefit from "@/components/scenario/dash3/benefit.vue"
  import axios from "axios"
  import { useStore } from "vuex"
  import {computed, ref} from "vue"
  
    export default {
        name :"scenario",
        components:{
            navigation,
            scenario_header,
            dash1_footprint,
            dash1_scopeChart,
            dash1_predictChart,
            dash2_reduceList,
            dash3_progress,
            dash3_benefit
        },
        setup() {
            var store = useStore()
            var group_list = computed(() => store.state.group_list).value
            var selected_company = ref(group_list[0])
            var rerender_signal = ref(0)

            var now = new Date();	// 현재 날짜 및 시간
            var year = ref(now.getFullYear())
            var lastyear = ref(now.getFullYear()-1)
            var month = ref(now.getMonth()+1)

            var scope1 = ref(0)
            var scope2 = ref(0)
            var scope3 = ref(0)
            store.commit("insight_select_company",selected_company.value)

            var total_emission = ref(0)
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

                var url = "/CarbonNature/TargetList/"+selected_company.value+"/"+year.value
                await axios.get(url,config).then(res=>{
                        store.commit("getTargetList", res.data)
                    })
                    .catch(error => {
                        console.log(error)
                    })
                    .finally(()=>{
                        server.value = server.value + 1
                        console.log(server.value)
                    })

                await axios.get("Company/Preview/"+selected_company.value+"/"+year.value+"-01-01/"+year.value+"-12-28",config).then(res => {
                    scope1.value = res.data.Scopes[0]
                    scope2.value = res.data.Scopes[1]
                    scope3.value = res.data.Scopes[2]
                    total_emission  = res.data.Scopes.reduce((a, b) => a + b, 0)
                    store.commit("set_scopes",res.data.Scopes);
                    store.commit("SetDetailEmission",res.data.EmissionList);
                })
                .catch(error => {
                    console.log(error)
                })
                .finally(() => {
                    server.value = server.value + 1
                    console.log(server.value)   
                })

                var url = "/CarbonEmission/PartEmission/"+selected_company.value+"/"+year.value+"-01-01/"+year.value+"-"+month.value+"-28/0"
       
                await axios.get(url,config).then(res=>{
                        console.log(res.data)
                        store.commit('getTotalNowData',sumfun(res.data))
                        store.commit('getTotalLastDataList',res.data)
                    })
                    .catch(error => {
                        store.commit('getTotalNowData',sumfun(0))
                        console.log(error)
                    })
                    .finally(()=>{
                        server.value = server.value + 1
                        console.log(server.value)
                })

                var url = "/CarbonEmission/PartEmission/"+selected_company.value+"/"+lastyear.value+"-01-01/"+lastyear.value+"-12-28/0"
    
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

                var url = "/CarbonPrediction/PartPrediction/"+selected_company.value+"/0"
                    await axios.get(url,config).then(res=>{
                        store.commit('getPredictTotal',res.data)
                    })
                    .catch(error => {
                        console.log(error)
                        store.commit('getPredictTotal',[])
                    })
                    .finally(()=>{
                        rerender_signal.value +=1
                        server.value =server.value + 1
                        console.log(server.value)
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
                store.commit("insight_select_company", selected_company.value)
                get_Base_Info()
                server.value = 0
                rerender_signal.value +=1
    
            }
            return{
                group_list,
                selected_company,
                change_company,
                rerender_signal,
                server
            }
        }
    }
  </script>