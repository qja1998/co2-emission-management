<template>
  <div class="measure-main">
      <navigation class="navigation"/>
      <div class="contents">
          <predict_header/>
          <div class="background">
            <div style="height:140vh;">
                <select class="select_group" v-model="selected_company" @change="change_company(selected_company)">
                  <option v-for="item in group_list" :key="item">{{ item }}</option>
                </select>
                <span class="header-page" style="margin:0">탄소 배출량 예측 전체보기<br>
                    <span class="subHeader-page">Predicted Carbon emission Overview</span>
                </span>
                <div v-if="server!=3">
                    <div class="progress-bar">
                        <LoadingBar></LoadingBar>
                        <div class="loding-title">탄소 배출량을 예측 중입니다</div>
                    </div>
                </div>
                <div v-else-if="server==3">
                    <div id="wrap1">
                        <div style="height:15vh"><predict_dash1 class="dash"/></div>
                        <predict_dash2 :key="rerender_signal" class="dash" id="dash2"/>
                    </div>
                    
                    <div id="wrap2" style="margin-top:2vh">
                        <predict_dash3 :key="rerender_signal" class="dash"/>
                        <predict_dash4  :key="rerender_signal" class="dash" id="dash4"/>
                        
                    </div>
                    <predict_dash5 :key="rerender_signal" class="dash"  id="dash5"/>
                </div>
                
              </div>
            </div>
        </div>
    </div>
</template>


<style>
.background{
    background:#F7F9FB;
    min-height:86vh;
    height: inherit;
    padding:3vh 2.5vw;
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
#wrap1 > * {
    float: left;
}

#wrap1::after {
    content: "";
    display: block;
    clear: both;
}
#wrap2 > * {
    margin-top:3vh;
    float: left;
}

#dash2{
    margin-left:2vw;
}

#dash4{
    margin-left:2vw
}
#dash5{
    float:right; 
    margin-right:2vw;
    margin-top:3vh
}
.progress-bar{
    margin: auto;
    margin-top: 30vh;
}
</style>

<script>
import navigation from "@/components/Navigation.vue"
import predict_header from "@/components/predict/Header.vue"
import predict_dash1 from "@/components/predict/dash1/dash1.vue"
import predict_dash2 from "@/components/predict/dash2/dash2.vue"
import predict_dash3 from "@/components/predict/dash3/dash3.vue"
import predict_dash4 from "@/components/predict/dash4/dash4.vue"
import predict_dash5 from "@/components/predict/dash5/dash5.vue"
import {useStore} from 'vuex'
import {ref, computed} from 'vue'
import axios from 'axios'
import LoadingBar from '@/components/Loading.vue'
  export default {
      name :"predict",
      components:{
          navigation,
          predict_header,
          predict_dash1,
          predict_dash2,
          predict_dash3,
          predict_dash4,
          predict_dash5,
          LoadingBar
      },
      setup() {
        var store = useStore()
        var group_list = computed(() => store.state.group_list).value
        var selected_company = ref(group_list[0])
        store.commit("insight_select_company",selected_company.value)
        
        var now = new Date();	// 현재 날짜 및 시간
        var year = ref(now.getFullYear())	// 년도
        var lastmonth= new Date(now)
        lastmonth.setMonth(lastmonth.getMonth() - 5)

        var rerender_signal = ref(0)

        var server  = ref(0)

        const config = {
            headers:{
                Authorization:"Bearer"+" "+store.state.accessToken,
            }
        }

        //카테고리별 다음달 예측
        async function get_predict_category_next_month(){
            server.value = 0

            store.commit("insight_select_company",selected_company.value)

            var url = "/CarbonPrediction/CategoryPrediction/"+selected_company.value
            await axios.get(url,config).then(res=>{
                store.commit('getNextMonthcategory',res.data)
            })
            .catch(error => {
                console.log(error)
            })
            .finally(()=>{
                server.value = server.value + 1
                console.log(server.value)
            })


            //현재 총 데이터 url 하드코딩 해놓음
            var url = "/CarbonEmission/PartEmission/"+selected_company.value+"/"+year.value+"-"+"01"+"-01/"+year.value+"-"+"06"+"-28/0"
            await axios.get(url,config).then(res=>{
                console.log(res.data)
                store.commit('getTotalLastDataList',res.data)
            })
            .catch(error => {
                console.log(error)
            })
            .finally(()=>{
                server.value =server.value + 1
                console.log(server.value)
            })
            
            //총 데이터 예측 url 하드코딩 해놓음
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

        console.log('1', selected_company.value)
        get_predict_category_next_month()

        function change_company(){
            store.commit("insight_select_company",selected_company.value)
            console.log('1', selected_company.value)
            get_predict_category_next_month()  
        }
        return{
            group_list,
            selected_company,
            change_company,
            rerender_signal,
            server,
        }
      },
      created(){
      },  
      mounted(){
        this.rerender_signal +=1
      }
  }
</script>