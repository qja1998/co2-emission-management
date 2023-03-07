<template>
  <div style="float:left; width:41vw; margin-left: 1vw;">
    <div class="dash_title" style="text-align: start; margin-top:2.1vh">에너지 사용량</div>
    <div class="dashboard" id="dashboard5_top"> 
      <span style="margin-left:10vw;">{{ year }}년 {{ month }}월 </span>
      <span style="font-weight:lighter">(단위 GJ)</span>
    </div>
    <div class="dashboard" id="dashboard5_left1"> 
      <p style="margin-top:8vh">직접<br>에너지원별<br>소비량</p>
    </div>
    <div class="dashboard" id="dashboard5_right1"> 
      <div>
          <div v-for="item in DirectEnargyList" :key="item.label" class="emission-list-item" style="height:3.3vh; margin-top:1vh">
              <span class="emission-list-item-lable" style="font-size:1.8vh; height: 0vh; margin-left:1vw; padding: 0; color:#615B5B">{{item.label}}</span>
              <span class="emission-list-item-wight" style="font-size:1.8vh; height: 0vh; margin-right:10vw; color:#000000; padding: 0; ">{{item.weight}} GJ</span>
          </div>
      </div>
    </div>
    <div class="dashboard" id="dashboard5_left2"> 
      <p style="margin-top:1.5vh">간접<br>에너지원별<br>소비량</p>
    </div>
    <div class="dashboard" id="dashboard5_right2"> 
      <div>
          <div v-for="item in IndirectEnargyList" :key="item.label" class="emission-list-item" style="height:3.3vh; margin-top:1vh">
              <span class="emission-list-item-lable" style="font-size:1.8vh; height: 0vh; margin-left:1vw; padding: 0; color:#615B5B">{{item.label}}</span>
              <span class="emission-list-item-wight" style="font-size:1.8vh; height: 0vh; margin-right:10vw; color:#000000; padding: 0; ">{{item.weight}} GJ</span>
          </div>
      </div>
    </div>
    <div class="dashboard" id="dashboard5_bottom"> 
      <span style="float:left; margin-left:6vw; color:#615B5B; font-weight: bolder;" >총 에너지 소비량 </span>
      <span style="color:#376B7C; margin-left:-1.5vw; font-weight: bolder;">{{ total }}GJ</span>
    </div>
  </div>
    
</template>

<style>
  #dashboard5_top{
    float: left;
    width: 39vw;
    height: 3vh;
    color:#376B7C;
    padding:2%;
    font-weight: bolder;
    font-size:2.3vh;
  }
  #dashboard5_left1{
    width: 4.8vw;
    height:25vh;
    padding: 2vh;
    font-size:1.8vh;
    font-weight: bolder;
    text-align: start;
    float:left;
    margin-top:-1.8vh;
    margin-right:0.2vh;

  }
  #dashboard5_right1{
    width: 31.3vw;
    height:25vh;
    padding: 2vh;
    margin-top:-1.8vh;
    float:left;
  }
  #dashboard5_left2{
    width: 4.8vw;
    height:10vh;
    padding: 2vh;
    font-size:1.8vh;
    font-weight: bolder;
    text-align: start;
    float:left;
    margin-top:-1.8vh;
    margin-right:0.2vh;
  }
  #dashboard5_right2{
    width: 31.3vw;
    height:10vh;
    padding: 2vh;
    margin-top:-1.8vh;
    float:left;
  }
  #dashboard5_bottom{
    width: 38.5vw;
    height:2vh;
    padding: 2vh;
    margin-top:-1.8vh;
    float:left;
    margin-bottom:5vh;
  }

</style>

<script>
import { useStore } from "vuex";
import { computed } from "vue";
  export default {
      name :"dashboard_5",
      components:{
      },
      setup() {
        const store = useStore();
        var month = computed(() => store.state.insight_month+1);
        var year = computed(() => store.state.insight_year);
        var total='0'
        var DirectEnargyList=[
              {label:"휘발유",weight:0},
              {label:"경유",weight:0},
              {label:"등유",weight:0},
              {label:"LPG",weight:0},
              {label:"도시가스(LNG)",weight:0},
            ]
          var IndirectEnargyList=[
              {label:"전력",weight:0},
              {label:"열(스팀)",weight:0},

            ]
        return{month,year,total,DirectEnargyList,IndirectEnargyList}
      }
  }
</script>