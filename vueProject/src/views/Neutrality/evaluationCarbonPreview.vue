<template>
    <div class="measure-main">
        <navigation class="navigation"/>
        <div class="contents">
          <Popup_inputStandard style="position:fixed" v-if="this.standardInfo==true" @setInput="setInput"></Popup_inputStandard>
            <evaluation_header/>
            <div class="background">
              <div style="height:160vh">
                <select class="select_group" v-model="selected_company" @change="change_company(selected_company)">
                  <option v-for="item in group_list" :key="item">{{ item }}</option>
                </select>
                <span class="header-page">탄소 배출량 평가</span><br>
                <span class="subHeader-page">Carbon Emissions Evaluation</span>
                <div>
                    <span><evaluation_dash1 :key="rerender_signal"/></span>
                    <span>
                      <evaluation_dash2 style="margin-left: 3vw;"></evaluation_dash2>
                    </span>
                    <div>
                      <evaluation_dash3 :key="rerender_signal" style="margin-left: 3vw"></evaluation_dash3>
                    </div>
                </div>
                <div style="display: inline-block;">
                  <evaluation_decreaseList :key="rerender_signal" />
                  <evaluation_progress :key="rerender_signal" style="margin-left: 1.4vw"/>
                  <evaluation_scenario :key="rerender_signal" style="margin-left: 1.4vw"/>
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
      var now = new Date();	// 현재 날짜 및 시간
      var lastyear = ref(now.getFullYear()-1)	// 년도
      var group_list = computed(() => store.state.group_list).value
      var selected_company = ref(group_list[0])

      store.commit("SetName",selected_company.value)
      const config = {
          headers:{
              Authorization:"Bearer"+" "+store.state.accessToken,
              "Content-Type": "text/html; charset=utf-8",
          }
      }
      async function get_Base_Info(){
        var url = "/CarbonNature/Evaluation/"+selected_company.value
        axios.get(url,config).then(res=>{
          store.commit('getBaseYear',res.data.BaseYear)
          store.commit('getBaseData',res.data.BaseEmissions)
        })
        .catch(error => {
          console.log(error)
          store.commit('getBaseYear',0)
          store.commit('getBaseData',0)
        })
        .finally(()=>{
          rerender_signal.value +=1
        })
      }

      get_Base_Info()

      var standardInfo = computed(()=>store.state.infopage)
      var rerender_signal = ref(0)

      
      


      // 해당 조직의 작년 총 탄소 배출량
      async function get_total_data(){
        var url = "/CarbonEmission/PartEmission/"+selected_company.value+"/"+(lastyear.value)+"-01-01/"+(lastyear.value)+"-12-28/0"
        axios.get(url,config).then(res=>{
          store.commit('getTotalLastData',sumfun(res.data))
          store.commit('getTotalLastDataList',res.data)
        })
        .catch(error => {
          console.log(error)
        })
        .finally(()=>{
          rerender_signal.value +=1
        })
      }



      
      //합산 함수
      function sumfun(list){
        var sum =ref(0)
        for(var i=0; i<list.length; i++){
            sum.value = list[i] + sum.value
        }
        return sum.value
      }

      function change_company(){
        get_total_data()
        get_Base_Info()
        store.commit("SetName",selected_company.value)
      }

      return{
        group_list, selected_company, standardInfo,change_company,get_total_data,get_Base_Info
      }
    },
    mounted(){
        this.rerender_signal +=1
        this.get_total_data(),
        this.get_Base_Info()

      }
  }
 </script>