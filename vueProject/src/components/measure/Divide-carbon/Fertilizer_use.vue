<!--탄소 배출 내용 입력의 비료 사용 부분 -->
<template>
    <div style="color:black;">입력방식
            <label><input class="radio_btn" type="radio" name="methodRegist" value="직접 입력하기" checked>직접 입력하기</label>
            <label><input class="radio_btn" type="radio" name="methodRegist" value="엑셀 등록하기">엑셀 등록하기</label>
    </div>
    <div style="margin-top:50px; ">
        탄소 배출 내용<br>
        <input type="text" class="addInfo_input" id="carbon_emissions_content_ferti">
    </div> 
    <div style="margin-top:30px">기간 설정
        <input class = "date_btn" id = "start_data" type="month" data-placeholder="시작 날짜" required aria-required="true">
        <input class = "date_btn" id = "end_data" type="month">
    </div>

    <div class="add_info_divide" id="building_name_text" style="margin-top:4vh">비료 사용 위치
        <input type="text" class="addInfo_input" id ="building_name_input" placeholder="본관 앞 마당" style="margin-left:55px">
    </div>
    <div class="add_info_divide">비료 분류
        <select v-model="fertilzer" class="addInfo_input" id="supplier_drop"  style="margin-left:90px">
            <option value="석회질비료">석회질비료</option>
            <option value="요소질비료">요소질비료</option>
            <option value="질소질비료">질소질비료</option>
        </select>
    </div>
    <div class="add_info_divide" v-if="fertilzer == '석회질비료'"> 세부 비료 
        <select v-model="kind" class="addInfo_input" id="supplier_drop"  style="margin-left:90px">
            <option value="석회고토">석회고토</option>
            <option value="석회석">석회석</option>
            <option value="패화석">패화석</option>
        </select>
    </div>
    <div class="add_info_divide" >비료 사용량
        <input class="addInfo_input" id="usage_input" placeholder="12,456">
        <select class="addInfo_input" id="power_usage_drop">
            <option value="0">ton</option>
        </select>
    </div>
    <div v-if="fertilzer=='질소질비료'">
        <div class="add_info_divide" >유기질 비료 시비량
            <input class="addInfo_input" id="usage_input_유기질" placeholder="12,456" style="margin-left:1.6vw;">
            <select class="addInfo_input" id="power_usage_drop">
                <option value="0">ton</option>
            </select>
        </div>
    </div> 
    <button class ="input2_regi_btn" id="add_info_regi_btn" @click="click_regi_btn()">상단 정보 등록</button>
</template>

<style>
#usage_input_유기질{
    margin-left:75px;
    width:14%;
    background: #ffffff;
    border: 1px solid #DDE2E5;
}
</style>

<script>
import {useStore} from 'vuex'
import {ref,computed} from 'vue'
    export default {
        name :"power_usage",
        setup(){
            var fertilzer = ref("석회질비료")
            var kind = ref("석회고토")
            const store = useStore()

            function click_regi_btn(){
                var info_list={
                    Type:"4",
                    DetailType:"",
                    StartDate:"",
                    EndDate:"",
                    Location:"",
                    scope:1,
                    data:"",
                    Fert:0,
                    emissions:"",
                    Carbonunit:"ton",
                    CarbonActivity:"",
                    kind:"",
                    Division:{비료사용위치:""},
                }
                var usage_input = document.getElementById('usage_input').value
                info_list.CarbonActivity = document.getElementById('carbon_emissions_content_ferti').value
                info_list.data =  usage_input+"/ton"
                info_list.emissions = usage_input+4
                info_list.StartDate = document.getElementById('start_data').value+'-01'
                info_list.EndDate = document.getElementById('end_data').value+'-01'
                info_list.DetailType = fertilzer.value
                info_list.kind = kind.value
                info_list.Division.비료사용위치= document.getElementById('building_name_input').value
                if(fertilzer.value=='질소질비료'){
                    info_list.Fert = document.getElementById('usage_input_유기질').value
                }
                
                console.log(info_list)
                store.commit("SetTableContent",info_list)

            }
            return{ 
                fertilzer,
                kind,
                click_regi_btn
            }
        },
    }
</script>