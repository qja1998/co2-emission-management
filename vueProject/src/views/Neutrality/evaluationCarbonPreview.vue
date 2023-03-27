<template>
    <div class="measure-main">
        <navigation class="navigation"/>
        <div class="contents">
            <evaluation_header/>
            <div class="background">
              <div style="height:140vh">
                  <p class="header-page">탄소 배출량 평가<br>
                      <span class="subHeader-page">Carbon Emissions Evaluation</span>
                  </p>
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

  
    export default {
        name :"evaluation",
        components:{
            navigation,
            evaluation_header,
        },
        setup() {
        }
    }
  </script>