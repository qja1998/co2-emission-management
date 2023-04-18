<template>
    <div class="measure-main">
        <navigation class="navigation"/>
        <div class="contents">
          <Popup_inputStandard style="position:fixed" v-if="this.standardInfo==true" @setInput="setInput"></Popup_inputStandard>
            <evaluation_header/>
            <div class="background">
              <div style="height:160vh">
                <select class="select_group" v-model="selected_company" @change="change_company()">
                  <option v-for="item in group_list" :key="item">{{ item }}</option>
                </select>
                <span class="header-page">탄소 배출량 평가</span><br>
                <span class="subHeader-page">Carbon Emissions Evaluation</span>
                <div>
                    <span><evaluation_dash1/></span>
                    <span>
                      <evaluation_dash2 style="margin-left: 3vw;"></evaluation_dash2>
                    </span>
                    <div>
                      <evaluation_dash3 style="margin-left: 3vw"></evaluation_dash3>
                    </div>
                </div>
                <div>
                  <evaluation_decreaseList/>
                  <evaluation_progress style="margin-left: 1.4vw"/>
                  <evaluation_scenario style="margin-left: 1.4vw"/>
                </div>
              </div>
            </div>
        </div>
    </div>
  </template>
  
  
  <style>
  .measure-main{
    display: flex;
  }
  .background{
      background:#F7F9FB;
      min-height:86vh;
      height: inherit;
      padding:5vh 2.5vw;
  }
  .header-page{
      color:#5A5A5A;
      font-size:1.5rem;
      font-weight :600;
  }
  .subHeader-page{
      color:#5A5A5A;
      font-size:1rem;
      font-weight:200;
  }
  </style>
  
<script>
import navigation from "@/components/Navigation.vue"
import evaluation_header from "@/components/evaluation/Header.vue"
import evaluation_dash1 from "@/components/evaluation/dash1/dashboard1_evaluation.vue"
import evaluation_dash2 from "@/components/evaluation/dash2/dash2.vue"
import evaluation_dash3 from "@/components/evaluation/dash3/dash3.vue"
import evaluation_decreaseList from "@/components/evaluation/dash4/carbonDecreaseList.vue"
import evaluation_progress from "@/components/evaluation/dash4/carbonProgress.vue"
import evaluation_scenario from "@/components/evaluation/dash4/carbonScenario.vue"
import axios from "axios"
import { useStore } from "vuex"
import {computed, ref} from "vue"
import Popup_inputStandard from "@/components/evaluation/dash2/popup_inputStandard.vue"

  
  export default {
    name :"evaluation",
    components:{
      navigation,
      evaluation_header,
      evaluation_dash1,
      evaluation_dash2,
      evaluation_dash3,
      evaluation_decreaseList,
      evaluation_progress,
      evaluation_scenario,
      Popup_inputStandard
    },
    method: {
      setInput(standardInput){
        this.standardInput = standardInput
        console.log('자식 컴포넌드에게 값을 받음 : ', standardInput)
      }
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

      var standardInfo = computed(()=>store.state.infopage)
            
      return{
        group_list, selected_company, change_company, standardInfo
      }
    }
  }
 </script>