<template>
  <div class="measure-main">
      <navigation class="navigation"/>
      <div class="contents">
          <predict_header/>
          <div class=background>
            <div style="height:140vh">
                <p class="header-page">탄소 배출량 예측 전체보기<br>
                    <span class="subHeader-page">Predicted Carbon emission Overview</span>
                </p>
                <div id="wrap1">
                    <div style="height:15vh"><predict_dash1 class="dash"/></div>
                    <predict_dash2 class="dash" id="dash2"/>
                </div>
                
                <div id="wrap2" style="margin-top:2vh">
                    <predict_dash3 class="dash"/>
                    <predict_dash4 class="dash" id="dash4"/>
                    
                </div>
                <predict_dash5 class="dash"  id="dash5"/></div>
            </div>
        </div>
    </div>
</template>


<style>
.background{
    background:#F7F9FB;
    min-height:86vh;
    padding:1vh 2.5vw;
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
</style>

<script>
import navigation from "@/components/Navigation.vue"
import predict_header from "@/components/predict/Header.vue"
import predict_dash1 from "@/components/predict/dash1/dash1.vue"
import predict_dash2 from "@/components/predict/dash2/dash2.vue"
import predict_dash3 from "@/components/predict/dash3/dash3.vue"
import predict_dash4 from "@/components/predict/dash4/dash4.vue"
import predict_dash5 from "@/components/predict/dash5/dash5.vue"

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
      },
      setup() {
      }
  }
</script>