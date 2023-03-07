<!--탄소 배출 내용 입력의 전력 사용 부분 -->
<template>
    <div style="color:black;">입력방식
            <label><input class="radio_btn" type="radio" name="methodRegist" value="직접 입력하기" checked>직접 입력하기</label>
            <label><input class="radio_btn" type="radio" name="methodRegist" value="엑셀 등록하기">엑셀 등록하기</label>
    </div>
    <div style="margin-top:50px; ">
        탄소 배출 내용<br>
        <input type="text" class="addInfo_input" id="carbon_emissions_content">
    </div> 
    <div style="margin-top:30px">기간 설정
        <input class = "date_btn" id = "start_data" type="month" data-placeholder="시작 날짜" required aria-required="true">
        <input class = "date_btn" id = "end_data" type="month">
    </div>
    <div style="margin-top:4vh">구분</div>
    <div class="add_info_divide" style="margin-top:0vh">산림 유형
        <select v-model="detail" class="addInfo_input" id="operating_entity_input">
            <option value="혼효림">혼효림</option>
            <option value="활엽수">활엽수</option>
            <option value="침엽수">침엽수</option>
        </select>
        
    </div>
    <div class="add_info_divide">확보자료 유형
        <select v-model="kind" class="addInfo_input" id="supplier_drop" style="margin-left:65px">
            <option value="임야면적">임야면적</option>
            <option value="조림면적">조림면적</option>
        </select>
    </div>
    <div class="add_info_divide" >범위
        <input class="addInfo_input" id="usage_input" style="margin-left:125px" placeholder="12">
        <select class="addInfo_input" id="power_usage_drop">
            <option value="0">ha</option>
        </select>
    </div>
    <button class ="input2_regi_btn" id="add_info_regi_btn" @click="click_regi_btn()">상단 정보 등록</button>
</template>

<style>
     #building_name_text{
        margin-top:20px
    }
    #building_name_input{
        margin-top:0px;
        width:20%;
        background: #ffffff;
        border: 1px solid #DDE2E5;
        margin-left: 20px;
    }

    #operating_entity_input{
        width: 20%;
        margin-left: 95px;
        color: #727374
        
    }

    #supplier_drop{
        width: 20%;
        margin-left: 110px;
        color: #727374
    }
    

   
</style>

<script>
import {useStore} from 'vuex'
import {ref} from 'vue'
    export default {
        name :"power_usage",
        setup(){
            var kind = ref("임야면적")
            var detail = ref("침엽수")
            const store = useStore()
            function click_regi_btn(){
                var info_list={
                    Type:"6",
                    DetailType:"",
                    StartDate:"",
                    EndDate:"",
                    Location:"",
                    scope:1,
                    data:"",
                    emissions:"",
                    Carbonunit:"ton",
                    CarbonActivity:"",
                    kind:"",
                    Division:{건물명:"",설비명:""},
                }
                var usage_input = document.getElementById('usage_input').value
                info_list.CarbonActivity = document.getElementById('carbon_emissions_content').value
                info_list.data =  usage_input+"/ha"
                info_list.emissions = usage_input+4
                info_list.StartDate = document.getElementById('start_data').value+'-01'
                info_list.EndDate = document.getElementById('end_data').value+'-01'
                info_list.DetailType = detail.value
                info_list.kind = kind.value

                store.commit("SetTableContent",info_list)
            }
            return{click_regi_btn,kind,detail}
        },
    }
</script>