<template>
    <div style="float:left; width:38vw; ">
        <div class="dash_title" id="dash_title3">카테고리별 전체 배출량</div>
        <div class="dashboard" id="dashboard3_top">
            <span style="margin-left:4vw; color:#5A5A5A; font-weight: bolder; font-size:2.3vh;">{{year}}년 {{ month }}월</span>
        </div>
        <div class="dashboard" id="dashboard3_left">
            <p class="dashboard3_left_scope" style="margin-top:3.4vh">scope1</p>
            <p class="dashboard3_left_scope" style="margin-top:40vh">scope2</p>
            <p class="dashboard3_left_scope" style="margin-top:23vh">scope3</p>
        </div>
        <div class="dashboard" id="dashboard3_right">
            <div style="padding:1vh">
                <div v-for="item in EmissionList" :key="item.label" class="emission-list-item" style="height:4.3vh;">
                    <img class="emission-list-item-icon" :src="item.iconSrc" style="width:3vh; height:3vh; ">{{item.icon}}
                    <span class="emission-list-item-lable" style="font-size:1.8vh; height: 0vh; margin-left:1vw; padding: 0;">{{item.label}}</span>
                    <span class="emission-list-item-wight" style="font-size:1.8vh; height: 0vh; margin-right:10vw; color:#000000; padding: 0; ">{{item.weight}} kg</span>
                </div>
            </div>
        </div>
        <div class="dashboard" id="dashboard3_bottom">
            <span style="float:left; margin-left:8vw; color:#615B5B; font-weight: bolder;" >전체 </span>
            <span style="color:#376B7C; margin-left:2vw; font-weight: bolder;">{{ scope1+scope3+scope2 }}kg</span>
        </div>
    </div>
    
</template>

<style>
    #dashboard3_top{
        height:3vh;
        width:36vw;
        padding: 2%;
        text-align:center;
    }
    #dashboard3_left{
        margin-top:-1.8vh;
        height:87.6vh;
        width:6vw;
        float:left;
        text-align:center;
    }
    #dashboard3_right{
        margin-top:-1.8vh;
        height:87.6vh;
        width:31.2vw;
        margin-left:0.2vh;
        float:left;
        text-align:center;
    }
    .dashboard3_left_scope{
        margin-top:10vh;
    }
    #dashboard3_bottom{
        padding:2vh;
        margin-bottom:5vh;
        height: 2vh;
        width:35.4vw;
        float:left;
        margin-top: -1.8vh;
    }
    #dash_title3{
        text-align: start;
    }

    .dashboard_title{
        font-size: 2.3vh;
        color:#5A5A5A;
        margin-top:0px;
        display: inline-block;
    }

    .전체보기_btn{
        float: right;
        background: none;
        border: 0px;
        color:#000000;
        font-size: 1.4vh;
    }

    .전체보기_btn:hover{
        color: #5A5A5A;
        cursor: pointer;
    }

    .type_group_btn{
        height: 4vh;
        width: inherit;
        background: #F0F2F5;
        border-radius: 0.8vh;
        color:#A3A9A6;
        font-weight: 600;
    }
    .non_click_type_group{
        float: left;
        margin-top: 0.2vh;
        margin-bottom: 0.2vh;
        height: 3.3vh;
        width:6.6vw;
        background: #F0F2F5;
        color:#A3A9A6;
        border: none;
        font-weight: 600;
    }

    .type_btn{
        margin-top: 0.2vh;
        margin-bottom: 0.2vh;
        margin-left: 0.2vw;
        float: left;
        height: 3.3vh;
        width:6.6vw;
        border: none;
        border-radius: 0.8vh;
        background:#3DC984;
        color:#FFFFFF;
        font-weight: 600;
    }

    .group_btn{
        margin-top: 0.2vh;
        margin-bottom: 0.2vh;
        margin-right: 0.2vh;
        float: left;
        height: 3.3vh;
        width: 6.6vw;
        border: none;
        background:#3DC984;
        color:#FFFFFF;
        font-weight: 600;
    }
    .type_contents{
        overflow: scroll;
        margin-top:1vh;
        height: 37vh;
    }

</style>

<script>
import { useStore } from "vuex";
import { computed } from "vue";

  export default {
      name :"dashboard_2",
      components:{

      },
      setup(){
        const store = useStore();
        var month = computed(() => store.state.insight_month+1);
        var year = computed(() => store.state.insight_year);
        
        var datail_emission_arr = computed(() => store.state.detail_emission);
        var total=10
        console.log(Object.values(datail_emission_arr.value[4]))
        var EmissionList =[
                {iconSrc:require('@/assets/previewDetail/1.png'), label:"고정연소",weight:datail_emission_arr.value[0].고정연소},
                {iconSrc:require('@/assets/previewDetail/2.png'), label:"이동연소",weight:datail_emission_arr.value[1].이동연소},
                {iconSrc:require('@/assets/previewDetail/3.png'), label:"탈루배출",weight:datail_emission_arr.value[2].탈루배출},
                {iconSrc:require('@/assets/previewDetail/4.png'), label:"폐기물 처리시설",weight:datail_emission_arr.value[3].폐기물처리시설},
                {iconSrc:require('@/assets/previewDetail/5.png'), label:"비료사용",weight:datail_emission_arr.value[4].비료사용},
                {iconSrc:require('@/assets/previewDetail/6.png'), label:"대학소유동물",weight:datail_emission_arr.value[5].대학소유동물},
                {iconSrc:require('@/assets/previewDetail/7.png'), label:"산림에 의한 흡수",weight:datail_emission_arr.value[6].산림에의한흡수},
                {iconSrc:require('@/assets/previewDetail/8.png'), label:"전력",weight:datail_emission_arr.value[7].전력},
                {iconSrc:require('@/assets/previewDetail/9.png'), label:"스팀(열)",weight:datail_emission_arr.value[8].열},
                {iconSrc:require('@/assets/previewDetail/10.png'), label:"수도",weight:datail_emission_arr.value[9].수도},
                {iconSrc:require('@/assets/previewDetail/11.png'), label:"폐기물",weight:datail_emission_arr.value[10].폐기물},
                {iconSrc:require('@/assets/previewDetail/12.png'), label:"통근/통학",weight:datail_emission_arr.value[11].통근_통학},
                {iconSrc:require('@/assets/previewDetail/13.png'), label:"출장",weight:datail_emission_arr.value[12].출장},
                {iconSrc:require('@/assets/previewDetail/14.png'), label:"위탁운영 차량",weight:datail_emission_arr.value[13].위탁운영차량}
            ]
        var typeClick=true
        var groupclick=false
        
        return{month,year,total,EmissionList,typeClick,groupclick}
      },
      props:{
        scope1:Number,
        scope2:Number,
        scope3:Number
      },
      
  }
</script>