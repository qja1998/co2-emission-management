<template>
    <div class="measure-main">
        <navigation class="navigation"/>
        <div class="contents">
            <predict_header/>
            <div class=background>
              <div style="height:140vh">
                  <p class="header-page">탄소중립 시스템 전체 보기<br>
                      <span class="subHeader-page">Nature Carbon System Overview</span>
                  </p>
              </div>
            </div>
        </div>
    </div>
  </template>
  
  
  <style>

  </style>
  
  <script>
  import navigation from "@/components/Navigation.vue"
  
    export default {
        name :"predict",
        components:{
            navigation,
        },
        setup() {
        }
    }
  </script>