<!--폐기물 처리시설 (폐수 처리)  -->
<template>
    <div style="color:black;">입력방식
            <label><input class="radio_btn" type="radio" name="methodRegist" value="직접 입력하기" checked>직접 입력하기</label>
            <label><input class="radio_btn" type="radio" name="methodRegist" value="엑셀 등록하기">엑셀 등록하기</label>
    </div>
    <div style="margin-top:50px; ">
        탄소 배출 내용<br>
        <input type="text" class="addInfo_input" id="carbon_emissions_conten_wasteWater">
    </div> 
    <div class="add_info_divide" id="building_name_text" style="margin-top: 4vh;">시설명/위치
        <input type="text" class="addInfo_input" id ="building_name_input" placeholder="경상대 본관" style="margin-left:120px;">
    </div>
    <div style="margin-top:30px">하폐수 처리 날짜
        <input class = "date_btn" id = "start_data" type="month" data-placeholder="시작 날짜" required aria-required="true" style="margin-left:70px;">
        <input class = "date_btn" id = "end_data" type="month">
    </div>
    <div class="add_info_divide" style="float:left; width:600px;">폐수 처리량
        <input class="addInfo_input" id="steam_usage_input" placeholder="12,456" style="width:200px;margin-left:120px;">
        <select class="addInfo_input" id="steam_usage_drop" style="width:3.5vw; margin-left:12px;">
            <option value="0">m^3/1일</option>
        </select>
    </div>
    <div class="add_info_divide" style="width:600px;" >메탄 회수량
        <input class="addInfo_input" id="steam_usage_input_R" style="width:200px; margin-left:120px" placeholder="12,456">
        <select class="addInfo_input" id="steam_usage_drop" style="width:3.5vw; margin-left:12px;">
            <option value="0">ton</option>
        </select>
    </div>
    <div class="add_info_divide" style="float:left; width:600px;" >유입 농도(COD)
        <input class="addInfo_input" id="steam_usage_input_CODIN" style="width:200px; margin-left:95px" placeholder="12,456">
        <select class="addInfo_input" id="steam_usage_drop" style="width:3.5vw; margin-left:12px;">
            <option value="0">mg/L</option>
        </select>
    </div>
    <div class="add_info_divide" >유출 농도(COD)
        <input class="addInfo_input" id="steam_usage_input_CODOUT" placeholder="12,456" style="margin-left:50px">
        <select class="addInfo_input" id="steam_usage_drop">
            <option value="0">mg/L</option>
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
    #steam_usage_input_CODIN{
        margin-left:90px;
        width:14%;
        background: #ffffff;
        border: 1px solid #DDE2E5;
    }
    #steam_usage_input_CODOUT{
        margin-left:90px;
        width:14%;
        background: #ffffff;
        border: 1px solid #DDE2E5;
    }

   
</style>

<script>
import {useStore} from 'vuex'
import {ref} from 'vue'
    export default {
        name :"waste_disposal_Wastewater",
        setup(){
            const store = useStore()
            function click_regi_btn(){
                var info_list={
                    Type:"18",
                    DetailType:"폐수",
                    StartDate:"",
                    EndDate:"",
                    Location:"",
                    scope:1,
                    data:"",
                    R:"",
                    CODIN:"",
                    CODOUT:"",
                    emissions:"",
                    Carbonunit:"ton",
                    CarbonActivity:"",
                    kind:"",
                    Division:{건물명:"",운영주체:"",공급처:"",연료종류:""}
                }
                var usage_input = document.getElementById('steam_usage_input').value
                info_list.CarbonActivity = document.getElementById('carbon_emissions_conten_wasteWater').value
                info_list.data =  usage_input+"/"+"ton"
                info_list.emissions = usage_input+4
                info_list.StartDate = document.getElementById('start_data').value+'-01'
                info_list.EndDate = document.getElementById('end_data').value+'-01'
                info_list.R=document.getElementById('steam_usage_input_R').value
                info_list.CODIN=document.getElementById('steam_usage_input_CODIN').value
                info_list.CODOUT=document.getElementById('steam_usage_input_CODOUT').value
                store.commit("SetTableContent",info_list)
            }
            return{
                click_regi_btn
            }
        }
    }
</script>