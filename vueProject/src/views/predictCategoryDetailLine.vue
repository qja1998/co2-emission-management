<template>
  <div class="measure-main">
    <navigation class="navigation" />
    <div class="contents">
      <predict_header />
      <div class="background">
          <div class="header-page" style="height: 140vh; margin-top: 20px;">카테고리별 탄소배출량 예측 전체보기
            <span class="radio-group">
              <div class="radio">
                <input type="radio" name="radio" id="clickbtn" checked="checked" value="line" @click="clickLine()"/>
                <label for="clickbtn" style="margin-right: 5px;">선 그래프</label>
                <input type="radio" name="radio" id="clickbtn-non" value="stick" @click="clickBar()"/>
                <label for="clickbtn-non">막대 그래프</label>
              </div>
            </span><br>
            <span class="subHeader-page">Predicted Carbon emission Overview</span>
            <div>  
              <span class="wrap" v-if="kindOfGraph == 'stick'">
                <predict_categoryStickGraph class="categoryStickGraph"/>
              </span>
              <span class="wrap"  v-else-if="kindOfGraph == 'line'">
                <predict_categoryLineGraph class="categoryLineGraph"/>
              </span>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.wrap > * {
  float: left;
  margin-top: 3vh;
  height: 100vh;
  width: 100%;
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
import {ref } from 'vue';

export default {
  name: "predict",
  components: {
    navigation,
    predict_header,
    predict_categoryLineGraph,
    predict_categoryStickGraph
  },

  setup(){
    var kindOfGraph = ref('line')
    const clickLine = () => {
      kindOfGraph.value='line'
    }
    const clickBar = () => {
      kindOfGraph.value='stick'
      console.log(kindOfGraph)
    }
    return{
      kindOfGraph,clickLine,clickBar
    }
  },
  
}
</script>