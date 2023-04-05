<template>
        <div style="float:left; ">
        <div class="dash_title" >조직명</div>
        <div class="dashboard" id="dashboard1">
            <div style =" ">
                <!-- 회사명(ex:경상대학교) -->
                <div style ="float: left; color:#5A5A5A; font-weight:bold; font-size: 3.7vh; margin-top:1vh">{{group_name}}</div>
                <div style="float: right;">
                    <button class="input-button" @click="open_popup()" type="button">기준 입력하기</button>
                </div>
                <!-- <div v-else>
                    <div style=" float:left; margin-top: 2vh;  font-weight: bold; font-size: 2vh; color:#5A5A5A;">기준연도 : </div>
                    <div style="float: left; margin-top: 2vh; font-weight: bold; font-size: 2vh; margin-left:2vw; color:#5A5A5A;">탄소 배출 기준량 : </div>
                </div> -->
                
            </div>
        </div>
    </div>
</template>

<style>
.input-button {
    line-height: 50px; 
    background-color: white; 
    font-size: 20px; 
    color: #404040; 
    border: 1px solid #D0D0D0; 
    border-radius: 10px;
    cursor: pointer;
}

.input-button:hover{
    color: white;
    background-color: #3DC984;
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
        var group_name = computed(() => store.state.insight_selected_company).value // 나중에 바꾸기
        var 기관명 = '기업'
        var  위치 =  '경남 진주시'
        var  scope1 = 123.4

        function open_popup(){
            console.log('popup')
            store.commit('OnGroupInfo')
        }

        return{
            group_name,기관명,위치,scope1, open_popup
        }
    }
  }
</script>
  