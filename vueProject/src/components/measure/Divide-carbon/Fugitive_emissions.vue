<!--탄소 배출 내용 입력의 탈루 사용 부분 -->
<template>
    <div>
        <div style="color:black;">입력방식
            <label><input class="radio_btn" type="radio" name="methodRegist" value="직접 입력하기" checked>직접 입력하기</label>
            <label><input class="radio_btn" type="radio" name="methodRegist" value="엑셀 등록하기">엑셀 등록하기</label>
        </div>
        <div style="margin-top:50px; ">
            탄소 배출 내용<br>
            <input type="text" class="addInfo_input" id="carbon_emissions_content_fugi">
        </div> 
        <div style="margin-top:30px">기간 설정
            <input class = "date_btn" id = "start_data" type="month" data-placeholder="시작 날짜" required aria-required="true">
            <input class = "date_btn" id = "end_data" type="month">
        </div>
        <div style="margin-top:4vh">구분</div>
        <div class="add_info_divide" style="margin-top:4vh">기기분류
            <select v-model="device" class="addInfo_input" id="operating_entity_input">
                <option value="냉장고">냉장고</option>
                <option value="에어컨">에어컨</option>
            </select>
            
        </div>
        <div class="add_info_divide"> 냉매종류
            <select v-model="refriModel" class="addInfo_input" id="refrigerant_type" v-if="device=='냉장고'">
                <option value="HFC-134a">HFC-134a</option>
            </select>
            <select v-model="iceModel" class="addInfo_input" id="refrigerant_type" v-else-if="device=='에어컨'">
                <option value="R-407c">R-407c</option>
                <option value="R-410a">R-410a</option>
            </select>
        </div>
        
        <div class="add_info_divide" >냉매량
            <input class="addInfo_input" id="amount_refrigerant" placeholder="12,456" style="margin-left:110px">
            <select class="addInfo_input" id="power_usage_drop">
                <option value="0">g</option>
            </select>
        </div>
        <div class="add_info_divide" style="margin-top:0px">용량
            <input class="addInfo_input" id="amount_refrigerant" placeholder="12,456" style="margin-left:122px">
            <select class="addInfo_input" id="power_usage_drop" v-if="device=='냉장고'">
                <option value="0">L</option>
            </select>
            <select class="addInfo_input" id="power_usage_drop" v-else-if="device=='에어컨'">
                <option value="0">m^3</option>
            </select>
        </div>
        <div class="add_info_divide" style="margin-top:0px">설치대수
            <input class="addInfo_input" id="nun_installations" placeholder="12,456">
            <select class="addInfo_input" id="power_usage_drop">
                <option value="0">대</option>
            </select>
        </div>
    </div>
    <button class ="input2_regi_btn" id="add_info_regi_btn" @click="click_regi_btn()">상단 정보 등록</button>
    
</template>

<style>
    #refrigerant_type{
        width: 20%;
        margin-left: 95px;
        color: #727374
    }

    #amount_refrigerant{
        margin-top:20px;
        margin-left:110px;
        width:14%;
        background: #ffffff;
        border: 1px solid #DDE2E5;
    }

    #nun_installations{
        margin-left:95px;
        width:14%;
        background: #ffffff;
        border: 1px solid #DDE2E5;
    }
    

</style>

<script>
import {useStore} from "vuex"
import {ref,computed} from "vue"
    export default {
        name :"power_usage",
        setup(){
            const store = useStore()
            var device =ref('냉장고')
            var refriModel = ref('HFC-134a')
            var iceModel = ref('R-407c')
            function click_regi_btn(){
                var info_list={
                    Type:"2",
                    DetailType:"",
                    StartDate:"",
                    EndDate:"",
                    Location:"",
                    scope:1,
                    data:"",
                    nums:0,
                    emissions:"",
                    Carbonunit:"g",
                    CarbonActivity:"",
                    kind:"",
                    Division:{건물명:"",설비명:""},
                }
                var usage_input = document.getElementById('amount_refrigerant').value
                info_list.CarbonActivity = document.getElementById('carbon_emissions_content_fugi').value
                info_list.data =  usage_input+"/g"
                info_list.nums = document.getElementById('nun_installations').value
                info_list.emissions = usage_input+4
                info_list.StartDate = document.getElementById('start_data').value+'-01'
                info_list.EndDate = document.getElementById('end_data').value+'-01'
                if (device.value == '냉장고'){
                    info_list.kind = refriModel.value
                }
                else if(device.value=='에어컨'){
                    info_list.kind = iceModel.value
                }
                info_list.DetailType =  device.value

                store.commit("SetTableContent",info_list)
            }

            return{device,click_regi_btn,refriModel,iceModel}
        }
    }
</script>