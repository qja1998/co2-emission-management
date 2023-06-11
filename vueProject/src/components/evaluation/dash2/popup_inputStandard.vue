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
                    <button class="input-button" @click="saveBaseEmission()" type="button" style="margin-top: 5vh; float: right;">저장하기</button>
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
import { computed , ref} from "vue";
import axios from "axios"

    export default {
      name :"popup_inputStandard",
      methods: {
      },
      components:{
      },
      setup() {
        const store = useStore()
        var group_name = computed(()=> store.state.group_name)
        var picked= ref('')
        var standardYear= ref(0)
        var standardEmission= ref(0)
        var standardEmission1= ref(0)
        var standardEmission2= ref(0)
        var standardEmission3=ref(0)

        var server_EmissionInfo=ref({
            groupName: '',
            BaseYear: 0,
            BaseEmissions:0
        })


        function close(){
            store.commit('OffGroupInfo')
        }

        var config = {
            headers:{
            "Authorization":"Bearer"+" "+store.state.accessToken
            }
        }

        async function set_base_info(list){
            var url = "/CarbonNature/EvaluationInfo"      
            axios.post(url,list,config).then(res=>{
            })
            .catch(error => {
            console.log(error)
            })
            .finally(()=>{
            })
        }
        function saveBaseEmission(){
            server_EmissionInfo.value.groupName = group_name.value
            server_EmissionInfo.value.BaseYear = standardYear.value
            server_EmissionInfo.value.BaseEmissions = parseInt((standardEmission1.value+standardEmission2.value+standardEmission3.value)/3) + standardEmission.value
            set_base_info(server_EmissionInfo.value)
            store.commit('setReload')
            close()
        }
        return{
            group_name,saveBaseEmission,close,picked,standardYear,standardEmission1,standardEmission2,standardEmission3,standardEmission
        }
    }
  }





</script>