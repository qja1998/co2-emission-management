<!--폐기물 처리 시설 (생물학적 처리) -->
<template>
    <div style="color:black;">입력방식
            <label><input class="radio_btn" type="radio" name="methodRegist" value="직접 입력하기" checked>직접 입력하기</label>
            <label><input class="radio_btn" type="radio" name="methodRegist" value="엑셀 등록하기">엑셀 등록하기</label>
    </div>
    <div style="margin-top:50px; ">
        탄소 배출 내용<br>
        <input type="text" class="addInfo_input" id="carbon_emissions_content_bio">
    </div> 

    <div class="add_info_divide" id="building_name_text" style="margin-top:4vh">시설명/위치
        <input type="text" class="addInfo_input" id ="building_name_input" placeholder="성남시" style="margin-left:72px;">
    </div>
    <div style="margin-top:30px">처리날짜
        <input class = "date_btn" id = "start_data" type="month" data-placeholder="시작 날짜" required aria-required="true" style="margin-left:82px;">
        <input class = "date_btn" id = "end_data" type="month">
    </div>
    <div class="add_info_divide" style="float:left; width:600px;">처리 용량
        <input class="addInfo_input" id="waste_usage_input" placeholder="12,456">
        <select class="addInfo_input" id="steam_usage_drop" style="width:3.5vw">
            <option value="0">m^3</option>
        </select>
    </div>
    <div class="add_info_divide" style=" width:200x;">메탄회수량
        <input class="addInfo_input" id="steam_usage_input_R" placeholder="12,456" style="width:200px; margin-left:140px; margin-right:10px">
        <select class="addInfo_input" id="steam_usage_drop" style="width:3.5vw; margin-left:0.2vw">
            <option value="0">ton</option>
        </select>
    </div>
    <div class="add_info_divide">처리방식
        <select v-model="processKind" class="addInfo_input" id="supplier_drop_steam">
            <option value="사료화 퇴비화">사료화퇴비화</option>
            <option value="혐기성소화">혐기성소화</option>
        </select>
    </div>
    <div class="add_info_divide">처리유형
        <select v-model="processType" class="addInfo_input" id="supplier_drop_steam">
            <option value="건량">건량</option>
            <option value="습량">습량</option>
            <option value="모름">모름</option>
        </select>
    </div>
    <button class ="input2_regi_btn" id="add_info_regi_btn" @click="click_regi_btn()">상단 정보 등록</button>
</template>

<style>

    #supplier_drop_steam{
        width: 20%;
        margin-left: 90px;
        color: #727374
    }

    #waste_usage_input{
        margin-left:85px;
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
import {useStore} from 'vuex'
import {ref, computed} from 'vue'

    export default {
        name :"waste_disposal_biological",
        setup(){
            var processKind=ref("혐기성소화")
            var processType=ref("건량")
            const store = useStore()
            function click_regi_btn(){
                var info_list={
                    Type:"17",
                    DetailType:"생물학적",
                    StartDate:"",
                    EndDate:"",
                    Location:"",
                    scope:1,
                    data:"",
                    R:"",
                    ProcessType:"",
                    ProcessKind:"",
                    emissions:"",
                    Carbonunit:"ton",
                    CarbonActivity:"",
                    kind:"",
                    Division:{건물명:"",운영주체:"",공급처:"",연료종류:""}
                }
                var usage_input = document.getElementById('waste_usage_input').value
                info_list.CarbonActivity = document.getElementById('carbon_emissions_content_bio').value
                info_list.data =  usage_input+"/"+"ton"
                info_list.emissions = usage_input+4
                info_list.StartDate = document.getElementById('start_data').value+'-01'
                info_list.EndDate = document.getElementById('end_data').value+'-01'
                info_list.ProcessType = processType.value
                info_list.ProcessKind = processKind.value
                
                store.commit("SetTableContent",info_list)
            }
            return {
                processKind,
                processType,
                click_regi_btn,
            }
        }
    }
</script>