<template>
  <div class="measure-main">
    <navigation class="navigation" />
    <div class="contents">
      <predict_header/>
      <div class="background">
          <div class="header-page">카테고리별 탄소배출량 예측 전체보기
            <span class="radio-group">
              <div class="radio">
                <input type="radio" name="radio" id="clickbtn" checked="checked" value="line" @click="clickLine()"/>
                <label for="clickbtn" style="margin-right: 5px;">선 그래프</label>
                <input type="radio" name="radio" id="clickbtn-non" value="stick" @click="clickBar()"/>
                <label for="clickbtn-non">막대 그래프</label>
              </div>
            </span><br>
            <span class="subHeader-page">Predicted Carbon emission Overview</span>
            <div >  
              <span class="wrap" v-if="kindOfGraph == 'stick'">
                <predict_categoryStickGraph :key="rerender_signal" class="categoryStickGraph"/>
              </span>
              <span class="wrap"  v-else-if="kindOfGraph == 'line'">
                <predict_categoryLineGraph :key="rerender_signal" class="categoryLineGraph"/>
              </span>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.wrap > * {
  margin-top: 5vh;
}
.radio {
  margin: 0 0.25rem;
  float: right;
  display: inline;
}
.radio-group{
  display: inline;
}
.radio label {
    font-size:16px;
    background: #fff;
    border: 1px solid #ddd;
    padding: 0.5rem 1.25rem;
    border-radius: 5px;
    cursor: pointer;
    color: #444;
    transition: box-shadow 400ms ease;
}
.radio label:hover{
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
}
.radio input[type=radio] {
  display: none;
}
.radio input[type=radio]:checked + label {
  background-color: #3DC984;
  color: #fff;
  border-color: #3DC984;
}
</style>

<script>
import navigation from "@/components/Navigation.vue"
import predict_header from "@/components/predict/Header.vue"
import predict_categoryLineGraph from "@/components/predict/categoryLineGraph/categoryLineGraph.vue"
import predict_categoryStickGraph from "@/components/predict/categoryStickGraph/categoryStickGraph.vue"
import {ref, computed } from 'vue';
import {useStore} from 'vuex'
import axios from 'axios'
export default {
  name: "predict",
  components: {
    navigation,
    predict_header,
    predict_categoryLineGraph,
    predict_categoryStickGraph
  },

  setup(){
    var store = useStore()
    var kindOfGraph = ref('line')
   //그룹명
    var user_group = computed(()=> store.state.user_group)
    var selected_company = computed(()=> store.state.insight_selected_company)
    console.log('선 그래프 선택 그룹',selected_company.value)
    //날짜 
    var now = new Date();	// 현재 날짜 및 시간
    var year = now.getFullYear()	// 년도
    var month = now.getMonth()+1 //월
    var rerender_signal = ref(0)
        
    const config = {
      headers:{
          Authorization:"Bearer"+" "+store.state.accessToken,
      }
    }

    //카테고리별 예측 url
    async function get_total_Predict_data_now(){
      var url = "/CarbonPrediction/PartPrediction/"+selected_company.value+"/1"
      axios.get(url,config).then(res=>{
          store.commit('getPredictCategory',res.data)
      })
      .catch(error => {
          console.log(error)
      })
      .finally(()=>{
      })
    }

    //작년 카테고리별 데이터 하드코딩 해놓음
    async function get_last_category_data(){
      var url = "/CarbonEmission/PartEmission/"+selected_company.value+"/"+year+"-01-01/"+year+"-"+month+"-28/1"
      axios.get(url,config).then(res=>{
          store.commit('getTotalLastCategoryDataList',res.data)
          })
          .catch(error => {
          console.log(error)
          })
          .finally(()=>{
      })
    }

    get_total_Predict_data_now()
    get_last_category_data()

    const clickLine = () => {
      get_total_Predict_data_now()
      get_last_category_data()
      kindOfGraph.value='line'
    }
    const clickBar = () => {
      get_total_Predict_data_now()
      get_last_category_data()
      kindOfGraph.value='stick'
      console.log(kindOfGraph)
    }
    return{
      kindOfGraph,clickLine,clickBar,rerender_signal
    }
  },
  mounted(){
    this.rerender_signal =+1
  }
  
}
</script>