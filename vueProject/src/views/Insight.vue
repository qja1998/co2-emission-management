<template>
  <div class="measure-main">
      <navigation class="navigation"/>
      <div class="contents">
          <insight_header/>
          <div class="body" style="height:110vh" :key="selected_company">
            <div style="float:right; margin-right:5vw; margin-top:0px;">
              <button :class="{date_btn_insight: category_dashboard_month,'non_date_insight': !category_dashboard_month }" @click="click_month()">월</button>
              <button :class="{date_btn_insight: category_dashboard_year,'non_date_insight': !category_dashboard_year}" @click="click_year()">년</button>
              <button :class="{date_btn_insight: history,'non_date_insight': !history}" style="font-size:1.2vh;" @click="click_3year()">최근 3년</button>
            </div>
            <select class="select_group" v-model="selected_company" @change="change_company()">
              <option v-for="item in group_list" :key="item">{{item}}</option>
            </select>
            <span style="font-size:24px; font-weight: bolder; color:#5A5A5A;">{{ selected_company }} - 탄소배출량</span><br>
            <span style ="font-size: 15px; color: #8D8D8D; margin-bottom:10px;">Carbon Emission Overview</span>
            
            
            <!-- 조직명, 전체 배출량, 총 탄소 배출량 대비 Scope 비율 -->
            <div>
              <dashboard1_nameVue :key="rerender_signal" ></dashboard1_nameVue>
              <dashboard1_totalEmissionVue :key="rerender_signal"  :scope1="scope1" :scope2="scope2" :scope3="scope3"></dashboard1_totalEmissionVue>
              <dashboard1_scopeVue :key="rerender_signal" :scope1="scope1" :scope2="scope2" :scope3="scope3"></dashboard1_scopeVue>
              
            </div>
            <!-- 최근 3개년 히스토리 -->
            <div v-if="history==true" > 
              <div style="margin-top:30vh; width:76vw; text-align: center;">
                <span class="date_info_btn" @click="click_back_year()"> ＜ </span>
                <span class="date_info">최근 3개년 히스토리</span>
                <span class="date_info_btn" @click="click_plus_year()"> ＞ </span><br>
              </div>
              <dashboard2Vue :key="rerender_signal"></dashboard2Vue>
            </div>
            
            <!-- 월 그래프 -->
            <div v-if="category_dashboard_month==true" style="margin-top:30vh; width:80vw; text-align: center;">
              <span class="date_info_btn" @click="click_back_month()"> ＜ </span>
              <span class="date_info">{{ year }}년 {{ month }}월</span>
              <span class="date_info_btn" @click="click_plus_month()"> ＞ </span><br>
              <dashboard3Vue :scope1="scope1" :scope2="scope2" :scope3="scope3" :key="rerender_signal"></dashboard3Vue>
              <dashboard4Vue :key="rerender_signal"></dashboard4Vue>
              <Dashboard5 :key="rerender_signal"></Dashboard5>
   
            </div>
            <!-- 년 그래프 -->
            <div v-if="category_dashboard_year==true" style="margin-top:30vh; width:80vw; text-align: center;">
              <span class="date_info_btn" @click="click_back_year()"> ＜ </span>
              <span class="date_info">{{ year }}년</span>
              <span class="date_info_btn" @click="click_plus_year()"> ＞ </span><br>
              <dashboard3Vue :scope1="scope1" :scope2="scope2" :scope3="scope3" :key="rerender_signal"></dashboard3Vue>
              <dashboard4Vue :key="rerender_signal"></dashboard4Vue>
              <Dashboard5 :key="rerender_signal"></Dashboard5>
            </div>
          </div>
      </div>
    </div>
</template>


<style>
  .select_group{
    margin-right:2vw;
    text-align: center;
    width:8vw;
    height:2.2vw;
    font-weight: bolder;
    float: right;
    background: #FFFFFF;
    border: 1px solid #CFCFCF;
    border-radius: 1.1vh;

  }
  .date_btn_insight{
    margin-right:0.5vw;
    width:4vw;
    height: 2.2vw;
    background: #3DC984;
    border: none;
    border-radius: 1.1vh;
    color:#FFFFFF;
    font-weight: bolder;
  }
  .non_date_insight{
    margin-right:0.5vw;
    width:4vw;
    height: 2.2vw;
    background: #FFFFFF;
    border: 1px solid #CFCFCF;
    border-radius: 1.1vh;
    font-weight: bolder;
  }
  .date_info{
    font-size:4vh;
    color:#5A5A5A;
    font-weight: bolder;
  }
  .date_info_btn{
    height: 5vh;
    width: 5vh;
    font-size: 4.5vh;
    font-weight: bolder;
  }
  .dashboard{
    background-color: white;
    margin-top: 1vh;
    border: 2px solid #F2F2F2;
    border-radius: 5px;
  }
</style>

<script>
import navigation from "@/components/Navigation.vue"
import insight_header from "@/components/insight/Header.vue"
import dashboard1_nameVue from "@/components/insight/dash1/dashboard1_name.vue"
import dashboard1_totalEmissionVue from "@/components/insight/dash1/dashboard1_totalEmission.vue"
import dashboard1_scopeVue from "@/components/insight/dash1/dashboard1_scope.vue"
import dashboard3Vue from "@/components/insight/dashboard3.vue"
import dashboard2Vue from "@/components/insight/dash2/dashboard2.vue"
import dashboard4Vue from "@/components/insight/dash4/dashboard4.vue"
import Dashboard6 from "@/components/insight/dash6/dashboard6.vue"
import Dashboard5 from "@/components/insight/dashboard5.vue"
import axios from "axios";
import { useStore } from "vuex";
import { computed,ref } from "vue";

  export default {
      name :"insight",
      components:{
          navigation,
          insight_header,
          dashboard1_nameVue,
          dashboard1_totalEmissionVue,
          dashboard1_scopeVue,
          dashboard2Vue,
          dashboard3Vue,
          dashboard4Vue,
          Dashboard5,
          Dashboard6,
          
      },
      setup() {
          const store = useStore();
          var history = ref(false)
          var category_dashboard_month = ref(true)
          var category_dashboard_year= ref(false)
          var month = computed(() => store.state.insight_month+1);
          var year = computed(() => store.state.insight_year);
          var scope1 = ref(0)
          var scope2 = ref(0)
          var scope3 = ref(0)
          var total_emission = ref(0)
          var rerender_signal = ref(0)
          var datail_emission_arr = ref([])
          var group_list = computed(() => store.state.group_list).value
          console.log("그룸",group_list)
          var selected_company = ref(group_list[0])
          

          function click_month(){
            console.log("월")
            category_dashboard_month.value = true
            category_dashboard_year.value = false
            history.value = false
            console.log(category_dashboard_month,category_dashboard_year)
            get_total_emission_month()
          }
          function click_year(){
            console.log("년")
            category_dashboard_month.value = false
            category_dashboard_year.value = true
            history.value = false
            console.log(category_dashboard_month,category_dashboard_year)
            get_total_emission_year()
          }
          function click_3year(){
            history.value = true
            category_dashboard_month.value = false
            category_dashboard_year.value = false
            // setTimeout(function() {
            //   rerender_signal.value +=1
            // }, 2000);
            
          }
          function click_back_month(){
            store.commit("InsightAddM",-1);
            get_total_emission_month()
            
          }
          function click_plus_month(){
            store.commit("InsightAddM",1);
            get_total_emission_month()
            
          }
          function click_back_year(){
            store.commit("InsightAddY",-1);
            get_total_emission_year()
            
          }
          function click_plus_year(){
            store.commit("InsightAddY",1);
            get_total_emission_year()
            
          }
          function click_back_year(){
            store.commit("InsightAddY",-1);
            get_total_emission_year()
            
          }
          function click_plus_year(){
            store.commit("InsightAddY",1);
            get_total_emission_year()
            
          }
          function change_company(){
            store.commit("insight_select_company",selected_company.value);
            console.log("11111111111111111111111111111111"+ store.state.insight_selected_company)
            get_total_emission_month()
            get_total_emission_year()
          }

          
          var config = {
            headers:{
              "Authorization":"Bearer"+" "+store.state.accessToken,
              "Content-Type": "text/html; charset=utf-8"
            }
          }
          async function get_total_emission_month(){
              await axios.get("Company/Preview/"+selected_company.value+"/"+year.value+"-01-01/"+year.value+"-"+month.value+"-28",config).then(res => {
                console.log("Company/Preview/"+selected_company.value+"/"+year.value+"-01-01/"+year.value+"-"+month.value+"-28")    
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
        return{history,category_dashboard_month,category_dashboard_year,month,year,scope1,scope2,scope3,
          click_month,click_year,click_3year,click_back_year,click_plus_year,get_total_emission_month,get_total_emission_year,
          click_back_month,click_plus_month,datail_emission_arr,rerender_signal,group_list,selected_company,change_company
        
        }

      },
      created(){
        this.get_total_emission_month()
        this.change_company()
      },  
      mounted(){
        this.rerender_signal +=1
      }
  }
</script>