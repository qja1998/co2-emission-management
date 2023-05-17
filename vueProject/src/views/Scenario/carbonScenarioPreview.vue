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
                    <div>
                        <div><dash1_footprint style="padding-top: 3vh;"/></div>
                        <div style="padding-top: 2vh;"><dash1_scopeChart/></div>
                        <div style="padding-top: 2vh;"><dash1_predictChart/></div>
                    </div>
                    <dash2_reduceList style="padding: 3vh 0 0 1.5vw;"/>
                    <div>
                        <dash3_progress style="padding: 3vh 0 0 1.5vw;"/>
                        <dash3_benefit style="padding: 3vh 0 0 1.5vw;"/>
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
            const store = useStore();
            var month = computed(() => store.state.insight_month+1);
            var year = computed(() => store.state.insight_year);
            var scope1 = ref(0)
            var scope2 = ref(0)
            var scope3 = ref(0)
            var total_emission = ref(0)
            var rerender_signal = ref(0)
            var group_list = computed(() => store.state.group_list).value
            var selected_company = ref(group_list[0])

            function change_company(){
                store.commit("insight_select_company",selected_company.value);
                console.log("11111111111111111111111111111111"+ store.state.insight_selected_company)
                get_total_emission_month()
                get_total_emission_year()
            }

            async function get_total_emission_month(){
                await axios.get("Company/Preview/"+selected_company.value+"/"+year.value+"-"+month.value+"-01/"+year.value+"-"+month.value+"-28",config).then(res => {
                    console.log(res.data)
                    console.log("연월"+year.value+month.value)
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
                    rerender_signal.value +=1
                })
            }
            async function get_total_emission_year(){
                await axios.get("Company/Preview/"+selected_company.value+"/"+year.value+"-01-01/"+year.value+"-12-28",config).then(res => {
                    console.log(res.data)
                    console.log("연월"+year.value)
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
                rerender_signal.value +=1
                })
            }

            return{
                group_list, selected_company, change_company
            }
        }
    }
  </script>