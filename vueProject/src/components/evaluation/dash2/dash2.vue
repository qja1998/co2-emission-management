<template>
        <div style="float:left; ">
        <div class="dash_title">기준량</div>
        <div class="dashboard" id="evaluation-dash2">
            <div style="margin: 1.8vh 0 0 1.5vw;">
                <!-- 회사명(ex:경상대학교) -->
                <br>
                <span style ="color:#5A5A5A; font-weight:bold; display:inline-block; width:22vw; height:5vh; font-size: 1.5vw;">{{group_name}}</span>
                <span style="margin-left: 2vw;">
                    <button class="input-button" id="base-btn" @click="open_popup()" type="button" v-if="baseYear==0">기준 입력하기</button>
                </span>
                <div style="float: left; margin-top: 3vh;">
                    <span style="margin-top: 2vh;  font-weight: bold; font-size: 1vw; color:#5A5A5A;">기준연도 : {{baseYear}}년</span>
                    <span style="margin: 2vh 0 0 2vw; font-weight: bold; font-size: 1vw; color:#5A5A5A;">탄소 배출 기준량 : {{baseEmissions}}kg</span>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
#evaluation-dash2{
    width: 35vw;
    height: 20vh;
}
.input-button {
    line-height: 5vh; 
    background-color: white; 
    font-size: 1vw; 
    color: #404040; 
    border: 1px solid #D0D0D0; 
    border-radius: 10px;
    cursor: pointer;
}

.input-button:hover{
    color: white;
    background-color: #3DC984;
}
#base-btn{
    height:4vh;
    line-height:4vh;
}
</style>

<script>
import { useStore } from "vuex";
import { computed,ref } from "vue";
import popup_inputStandardVue from './popup_inputStandard.vue';

  export default {
      name :"dashboard2_evaluation",
      data() {
        return {
            input: false, // 모달창 현재 상태(false: 닫힘)
        }
      },
      methods: {
      },
      components:{
        popup_inputStandardVue
      },
      setup() {
        const store = useStore();
        var group_name = computed(()=> store.state.group_name)
        //서버

        var baseYear = computed(()=> store.state.baseYear)
        var baseEmissions = computed(()=> store.state.baseData)
        var 기관명 = '기업'
        var  위치 =  '경남 진주시'
        var  scope1 = 123.4
        function open_popup(){
            console.log('popup')
            store.commit('OnGroupInfo')
        }

        return{
            group_name,기관명,위치,scope1, open_popup,baseYear,baseEmissions
        }
    }
  }
</script>
  