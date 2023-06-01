<!--수도 사용 내용 입력의 사용 부분 -->
<template>
    <div style="color:black;">입력방식
            <label><input class="radio_btn" type="radio" name="methodRegist" value="0" checked v-model="input_regi">직접 입력하기</label>
            <label><input class="radio_btn" type="radio" name="methodRegist" value="1" v-model="input_regi">엑셀 등록하기</label>
            <label><input class="radio_btn" type="radio" name="methodRegist" value="자동 연동하기">자동 연동하기</label>
    </div>
    <div v-if="input_regi == 0">
        <div style="margin-top:50px; ">
            탄소 배출 내용<br>
            <input type="text" class="addInfo_input" id="carbon_emissions_content_water">
        </div> 
        <div style="margin-top:30px">기간 설정
            <input class = "date_btn" id = "start_data" type="month" data-placeholder="시작 날짜" required aria-required="true" style="margin-left:80px">
        </div>
        <div style="margin-top:4vh">구분</div>
        <div class="add_info_divide" id="building_name_text" style="margin-top:2vh">건물명 / 배출 시설명
            <input type="text" class="addInfo_input" id ="building_name_input" placeholder="본관">
        </div>
        <div class="add_info_divide">배출주체
            <select v-model="main_agent" class="addInfo_input" id="operating_entity_input">
                <option value="기업">기업 소유 및 운영</option>
                <option value="민간">민간 임차</option>
            </select>
            
        </div>
        <div class="add_info_divide">공급처
            <select v-model="공급처" class="addInfo_input" id="supplier_drop">
                <option value="한국수자원공사">한국수자원공사</option>
                <option value="직접 입력">직접 입력</option>
            </select>
        </div>
        <div class="add_info_divide" >수도 사용량
            <input class="addInfo_input" id="water_usage_input" placeholder="12,456" style="margin-left:4.2vw">
            <select v-model="unit_s" class="addInfo_input" id="steam_usage_drop">
                <option value="m3">m3</option>
            </select>
        </div>
    </div>
    <div v-else-if="input_regi == 1">
        <Water_usage_excel></Water_usage_excel>
    </div>

    <button class ="input2_regi_btn" id="add_info_regi_btn" @click="click_regi_btn()">상단 정보 등록</button>
</template>

<style>
   #water_usage_input{
    margin-left:5.5vw;
    width:11vw;
    background-color : white;
    border: 1px solid #DDE2E5;
   }
</style>

<script>
import Water_usage_excel from './excel/Water_usage_excel.vue'
import {useStore} from 'vuex'
import {ref} from 'vue'

    export default {
        name :"water_usage",
        components: {
            Water_usage_excel
        },
        setup(){
            var unit_s = ref('m3')
            var main_agent = ref('기업')
            var input_regi = ref(0)
            var 공급처 = ref('한국수자원공사')
            const store = useStore()
            function click_regi_btn(){
                var info_list={
                    Type:"9",
                    DetailType:"수도",
                    StartDate:"",
                    EndDate:"",
                    Location:"",
                    scope:1,
                    data:"",
                    emissions:"",
                    Carbonunit:"m3",
                    CarbonActivity:"",
                    kind:"",
                    Division:{건물명:"",운영주체:"",공급처:"",연료종류:""}
                }
                var usage_input = document.getElementById('water_usage_input').value
                info_list.CarbonActivity = document.getElementById('carbon_emissions_content_water').value
                info_list.data =  usage_input+"/"+"m3"
                info_list.emissions = usage_input + 4 + "kg" //탄소 배출량 계산식
                info_list.StartDate = document.getElementById('start_data').value+'-01'
                info_list.EndDate = document.getElementById('start_data').value+'-28'
                info_list.Division.운영주체 = main_agent.value
                info_list.Division.건물명 = document.getElementById('building_name_text').value
                info_list.Division.공급처 = 공급처.value

                if(main_agent.value == '기업'){
                    info_list.scope = 1
                }
                else if(main_agent.value == "민간"){
                    info_list.scope = 2
                }

                store.commit("SetTableContent",info_list)
            }
            return {
                click_regi_btn,
                unit_s,
                input_regi,
                main_agent,
                공급처
            }
        }
    }
</script>