<!-- 열 사용-->
<template>
    <div style="color:black;">입력방식
            <label><input class="radio_btn" type="radio" name="methodRegist" value="직접 입력하기" checked>직접 입력하기</label>
            <label><input class="radio_btn" type="radio" name="methodRegist" value="엑셀 등록하기">엑셀 등록하기</label>
    </div>
    <div style="margin-top:50px; ">
        탄소 배출 내용<br>
        <input type="text" class="addInfo_input" id="carbon_emissions_content_steam2">
    </div> 
    <div style="margin-top:30px">기간 설정
        <input class = "date_btn" id = "start_data" type="month" data-placeholder="시작 날짜" required aria-required="true">
        <input class = "date_btn" id = "end_data" type="month">
    </div>
    
    <div style="margin-top:4vh">구분</div>
    <div class="add_info_divide" id="building_name_text" style="margin-top:2vh">건물명 / 배출 시설명
        <input type="text" class="addInfo_input" id ="building_name_input" placeholder="경상대 본관">
    </div>
    <div class="add_info_divide">운영주체
        <select v-model="main_agent" class="addInfo_input" id="operating_entity_input">
            <option value="기업">기업 소유 및 운영</option>
            <option value="민간">민간 임차</option>
        </select>
        
    </div>
    <div class="add_info_divide">공급처
        <select class="addInfo_input" id="supplier_drop">
            <option value="한국지역난방공사">한국지역난방공사</option>
            <option value="직접 입력">직접 입력</option>
        </select>
    </div>
    <div class="add_info_divide">연료 종류
        <select v-model="연료종류" class="addInfo_input" id="supplier_drop_steam">
            <option value="스팀(열전용)">스팀(열전용)</option>
            <option value="스팀(열병합)">스팀(열병합)</option>
            <option value="스팀(일반)">스팀(일반)</option>
        </select>
    </div>
    <div class="add_info_divide" >열 사용량
        <input class="addInfo_input" id="steam_usage_input" placeholder="12,456">
        <select v-model="unit_s" class="addInfo_input" id="steam_usage_drop">
            <option value="GJ">GJ</option>
            <option value="MJ">MJ</option>
        </select>
    </div>
    <button class ="input2_regi_btn" id="add_info_regi_btn" @click="click_regi_btn(unit_s)">상단 정보 등록</button>
</template>

<style>

    #supplier_drop_steam{
        width: 20%;
        margin-left: 90px;
        color: #727374
    }

    #steam_usage_input{
        margin-left:90px;
        width:14%;
        background: #ffffff;
        border: 1px solid #DDE2E5;
    }

    #steam_usage_drop{
        width: 4.6%;
        margin-left: 1%;
        color: #727374;
        margin-bottom: 20px;
    }

   
</style>

<script>
import { useStore } from 'vuex'
import { ref } from 'vue'
    export default {
        name :"steam_usage",
        setup(){
            const store = useStore()
            var unit_s = ref("GJ")
            var main_agent = ref('기업')
            var 연료종류 = ref('스팀(열전용)')
            var 공급처 = ref('한국지역난방공사')
            function click_regi_btn(unit_s){
                var info_list={
                    Type:"8",
                    DetailType:"열",
                    StartDate:"",
                    EndDate:"",
                    Location:"",
                    scope:2,
                    data:"",
                    emissions:"",
                    Carbonunit:unit_s,
                    CarbonActivity:"",
                    kind:"",
                    Division:{건물명:"",운영주체:"",공급처:"",연료종류:""}
                }
                var usage_input = document.getElementById('steam_usage_input').value
                info_list.CarbonActivity = document.getElementById('carbon_emissions_content_steam2').value
                info_list.data =  usage_input+"/"+unit_s
                info_list.emissions = usage_input + 4 + "kg" //계산식
                info_list.StartDate = document.getElementById('start_data').value+'-01'
                info_list.EndDate = document.getElementById('end_data').value+'-01'
                info_list.Division.건물명 = document.getElementById('building_name_text').value
                info_list.Division.운영주체 = main_agent.value
                info_list.Division.공급처 = 공급처.value
                info_list.Division.연료종류 = 연료종류.value
    
                if(main_agent.value == '기업'){
                    info_list.scope = 1
                }
                else if(main_agent.value == "민간"){
                    info_list.scope = 2
                }
                store.commit("SetTableContent",info_list)
            }
            return{
                unit_s,
                main_agent,
                click_regi_btn,
                연료종류,
                공급처
            }
        }
    }
</script>