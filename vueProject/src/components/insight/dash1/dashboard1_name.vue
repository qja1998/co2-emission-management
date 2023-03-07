<template>
    <div style="float:left; ">
        <div class="dash_title" >조직명</div>
        <div class="dashboard" id="dashboard1">
            <div style ="float: left; ">
                <!-- 회사명(ex:경상대학교) -->
                <div style ="color:#5A5A5A; font-weight:bold; font-size: 3.7vh; margin-top:1vh">{{group_name}}</div>
                <!-- 기관종류(ex: 교육기관) -->
                <div style=" float:left; margin-top: 2vh; font-size: 2vh; color:black;">
                    <img style="vertical-align: middle; width:2.2vh;" src="@/assets/share.png" alt="">
                    {{기관명}}
                </div>
                <!-- 위치(ex:경남 진주시) -->
                <div style="float: left; margin-top: 2vh; font-size: 2vh; margin-left:2vw; color:black;">
                    <img style=" vertical-align: middle; width:2.2vh;" src="@/assets/map.png" alt="">
                    {{위치}}
                </div>
            </div>
        </div>
    </div>
    
</template>

<style>
    .dash_title{
        margin-top: 3.5vh;
        color: #163945;
        font-weight: 600;
        font-size: 2vh;
    }
    #dashboard1{
        height: 12vh;
        width: 22vw;
        padding: 6.4%;
    }
    .scope_block{
        float:left;
        font-size:2.1vh;
        margin-right:10vw;
        margin-top: 2.5vh;
    }
    .scope_bar{
        width:0.4vh; 
        height:3.2vh; 
        background: #FA5B45; 
        display: inline-block; 
        margin-right: 1.2vw; 
        vertical-align: middle;

    }
    .scope_text{
        font-size:3.8vh;
        font-weight: bold;
        margin-top: 2.5vh;
        font-weight: 600;
        
    }


</style>

<script>
import { useStore } from "vuex";
import { computed,ref } from "vue";
  export default {
      name :"dashboard1",
      components:{
      },
      setup() {
          const store = useStore();
          var group_name = computed(() => store.state.insight_selected_company).value
          var 기관명 = '기업'
        var  위치 =  '경남 진주시'
         var  scope1 = 123.4
         return{group_name,기관명,위치,scope1}
        }
  }
</script>
  