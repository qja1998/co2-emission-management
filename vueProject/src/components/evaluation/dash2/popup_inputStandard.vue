<template>
    <div class="active" style="float: right;">
        <div style="padding: 10% 25% 10% 25%;">
            <div>
                <div style="float: left; background: #ffffff; padding:2vh; width:30vw; font-size:1.8vh; border: 1px solid #E4E5E6; border-radius: 10px 10px 10px 10px;">
                    <button class="del_edit_btn" style="cursor: pointer;" type="button" @click="close()">x</button>
                    <div style="padding-left: 0.5vw">
                        <div style="font-size: 2vh">
                            <div style="padding-top: 3vh; font-weight: bold; font-size: 2vh; color:#5A5A5A;">기관명 : 
                                <span style="margin-left: 1vw; font-weight: bold; font-size: 3vh; color: #5A5A5A;">{{ group_name }}</span>
                            </div>
                            <div class="standard">기준연도
                                <br>
                                <input class="input_standard" v-model="standardYear" type="number" pattern="[0-9]{4}" title="형식 YYYY" required>
                            </div>
                            <div class="standard">탄소 배출 기준량
                                <div style="font-size: 1.5vh; margin-left: 0.5vw; padding: 2vh 0 1vh 0;">
                                    <input type="radio" v-model="picked" value="self">
                                    <label for="self">직접 입력</label>
                                    <input style="margin-left: 2vw;" type="radio" v-model="picked" value="non-self">
                                    <label for="non-self">모름</label>
                                </div>
                                <span id="inputStandard" v-if="picked=='self'">
                                    <input class="input_standard" v-model="standardEmission" type="number" required ><span style="margin-left: 1vw">CO2eq</span>
                                </span>
                                <span v-else-if="picked=='non-self'">
                                    <span style="font-size: 1.5vh; margin-top: 2vh; margin-left: 0.5vw;">기준년도 직전 3개년 탄소 배출량</span>
                                    <br>
                                    <input class="input_standard" v-model="standardEmission1" type="number" required><span style="margin-left: 1vw">CO2eq</span>
                                    <input class="input_standard" v-model="standardEmission2" type="number"><span style="margin-left: 1vw">CO2eq</span>
                                    <input class="input_standard" v-model="standardEmission3" type="number"><span style="margin-left: 1vw">CO2eq</span>
                                </span>
                            </div>
                        </div>
                    </div>
                    <button class="input-button" @click="close()" type="button" style="margin-top: 5vh; float: right;">저장하기</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.standard{
    font-weight: bold; 
    font-size: 2vh; 
    color:#5A5A5A; 
    padding-top: 2.5vh;
}
.input_standard {
    width:17vw; 
    height:3vh; 
    font-size: 1.5vh; 
    margin-left: 0.5vw;
    margin-top: 1vh;

    border: 1px solid #D0D0D0;
    border-radius: 10px;
}
</style>

<script>
import {useStore} from 'vuex'
import { computed } from "vue";

    export default {
      name :"popup_inputStandard",
      data(){
        return{
            picked: '',
            standardYear: 0,
            standardEmission: 0,
            standardEmission1: 0,
            standardEmission2: 0,
            standardEmission3: 0
        }
      },    
      methods: {
      },
      components:{
      },
      setup() {
        const store = useStore()

        var server_EmissionInfo={
            groupName: '경상국립대학교',
            BaseYear:standardYear,
            BaseEmissions:(standardEmission1+standardEmission2+standardEmission3)/3
        }

        var group_name = '경상국립대학교'//computed(() => store.state.insight_selected_company).value

         function close(){
            store.commit('OffGroupInfo')
        }
        return{
            group_name, close,
        }
    }
  }





</script>