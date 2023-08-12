<!-- 폐기물 처리 시설(소각)  -->
<template>
    <div style="color:black;">입력방식
            <label><input class="radio_btn" type="radio" name="methodRegist" value="직접 입력하기" checked>직접 입력하기</label>
            <label><input class="radio_btn" type="radio" name="methodRegist" value="엑셀 등록하기">엑셀 등록하기</label>
    </div>
    <div style="margin-top:50px; ">
        탄소 배출 내용<br>
        <input type="text" class="addInfo_input" id="carbon_emissions_content_incineration">
    </div> 
    <div class="add_info_divide" id="building_name_text" style="margin-top:4vh">시설명/위치
        <input type="text" class="addInfo_input" id ="building_name_input" placeholder="성남시" style="margin-left:95px;">
    </div>
    <div style="margin-top:30px">소각 날짜
        <input class = "date_btn" id = "start_data" type="month" data-placeholder="시작 날짜" required aria-required="true" style="margin-left:100px">
    </div>

    <div class="add_info_divide">폐기물 분류
        <select v-model="kindOfwaste" class="addInfo_input" id="operating_entity_input">
            <option :value="0">생활 폐기물</option>
            <option :value="1">사업장 폐기물</option>
        </select>
    </div>
    <div class="add_info_divide">폐기물 세부 구분
        <select v-model="waste" class="addInfo_input" id="supplier_drop" v-if="kindOfwaste == '0'" style="margin-left:62px">
            <option v-for = "waste_ in waste_life_list" :value = waste_ >{{waste_}}</option>
        </select>
        <select v-model="waste" class="addInfo_input" id="supplier_drop" v-else-if="kindOfwaste == '1'" style="margin-left:62px">
            <option v-for = "waste_ in waste_corpor_list" :value = waste_>{{waste_}}</option>
        </select>
    </div>
    <div class="add_info_divide">소각 기술
        <select v-model="tech" class="addInfo_input" id="supplier_drop_steam" style="margin-left:108px">
            <option value="연속식 - 고정상">연속식 - 고정상</option>
            <option value="연속식 - 유동상">연속식 - 유동상</option>
            <option value="준연속식 - 고정상">준연속식 - 고정상</option>
            <option value="준연속식 - 유동상">준연속식 - 유동상</option>
            <option value="화분식 - 고정상">화분식 - 고정상</option>
            <option value="화분식 - 유동상">화분식 - 유동상</option>
            <option value="기타">기타</option>
        </select>
    </div>
    <div class="add_info_divide" >소각 양
        <input class="addInfo_input" id="steam_usage_input" placeholder="12,456" style="margin-left:122px">
        <select class="addInfo_input" id="steam_usage_drop">
            <option value="0">ton</option>
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

   
</style>

<script>
import {useStore} from 'vuex'
import {ref,computed} from 'vue'
    export default {
        name :"waste_disposal_filling",
        setup(){
            var waste=ref("종이/판지")
            var kindOfwaste= ref("0")
            var tech = ref("연속식 - 고정상")
            var waste_life_list = ref([
                    "종이/판지",
                    "섬유",
                    "음식물",
                    "목재",
                    "정원및공원폐기물",
                    "기저귀",
                    "고무및가죽",
                    "플라스틱",
                    "금속",
                    "유리",
                    "기타,비활성(불연성)"
                ])
            var waste_corpor_list = ref([
                    "음식,음료및담배",
                    "섬유",
                    "나무및목제품",
                    "제지",
                    "석유제품",
                    "용매",
                    "플라스틱",
                    "고무",
                    "건설및파쇄잔재물",
                    "기타",
                    "하수슬러지",
                    "폐수슬러지",
                    "병원성폐기물",
                    "액상폐기물"
            ])
            const store = useStore()
            function click_regi_btn(){
                var info_list={
                    Type:"15",
                    DetailType:"",
                    StartDate:"",
                    EndDate:"",
                    Location:"",
                    scope:1,
                    data:"",
                    R:"",
                    emissions:"",
                    Carbonunit:"ton",
                    CarbonActivity:"",
                    kind:"",
                    Division:{건물명:"",운영주체:"",공급처:"",연료종류:""}
                }
                var usage_input = document.getElementById('steam_usage_input').value
                info_list.CarbonActivity = document.getElementById('carbon_emissions_content_incineration').value
                info_list.data =  usage_input+"/"+"ton"
                info_list.emissions = usage_input+4
                info_list.StartDate = document.getElementById('start_data').value+'-01'
                info_list.EndDate = document.getElementById('start_data').value+'-28'
                info_list.DetailType = waste.value
                info_list.kind = tech.value
                store.commit("SetTableContent",info_list)
            }
            return {
                kindOfwaste,
                waste,
                tech,
                waste_life_list,
                waste_corpor_list,
                click_regi_btn
            }
        }
    }
</script>