<!-- 폐기물 처리 시설(매립)  -->
<template>
    <div style="color:black;">입력방식
            <label><input class="radio_btn" type="radio" name="methodRegist" value="직접 입력하기" checked>직접 입력하기</label>
            <label><input class="radio_btn" type="radio" name="methodRegist" value="엑셀 등록하기">엑셀 등록하기</label>
    </div>
    <div style="margin-top:50px; ">
        탄소 배출 내용<br>
        <input type="text" class="addInfo_input" id="carbon_emissions_content_filling">
    </div> 
    <div class="add_info_divide" id="building_name_text" style="margin-top:4vh;">시설명/위치
        <input type="text" class="addInfo_input" style="margin-left:94px;" id ="building_name_input" placeholder="경상대 본관">
    </div>
    <div style="margin-top:30px">매립 시작년도
        <input class = "date_btn" id = "start_data" placeholder="2021" required aria-required="true"> 년
    </div>
    <div>
        <div class="add_info_divide" style="float:left; width:600px; height:5vh">매입량
            <input class="addInfo_input" id="steam_usage_input" placeholder="12,456" style="margin-left:132px; width:200px; margin-right:10px">
            <select class="addInfo_input" id="steam_usage_drop" style="width:4vw">
                <option value="0">ton</option>
            </select>
        </div>
        <div class="add_info_divide" style=" width:200x;">메탄회수량
            <input class="addInfo_input" id="steam_usage_input_R" placeholder="12,456" style="width:200px; margin-left:30px; margin-right:10px">
            <select class="addInfo_input" id="steam_usage_drop" style="width:3.5vw; margin-left:0.2vw">
                <option value="0">ton</option>
            </select>
        </div>
    </div>

    <div class="add_info_divide">폐기물 분류
        <select v-model="kindOfwaste" class="addInfo_input" id="operating_entity_input">
            <option :value="0">생활 폐기물</option>
            <option :value="1">사업장 폐기물</option>
        </select>
    </div>
    <div class="add_info_divide">폐기물 세부 구분
        <select class="addInfo_input" id="supplier_drop" v-if="kindOfwaste == '0'" style="margin-left:61px;">
            <option v-for = "waste in waste_life_list" >{{waste}}</option>
        </select>
        <select class="addInfo_input" id="supplier_drop" v-else-if="kindOfwaste == '1'" style="margin-left:61px;">
            <option v-for = "waste in waste_corpor_list" >{{waste}}</option>
        </select>
    </div>
    <div class="add_info_divide">매립 시설 유형
        <select class="addInfo_input" id="supplier_drop_steam" style="margin-left:73px">
            <option value="0">관리형 매립지 - 혐기성</option>
            <option value="1">관리형 매립지 - 준호기성</option>
            <option value="2">비관리형 매립지 - 매립고 5cm 이상</option>
            <option value="3">비관리형 매립지 - 매립고 5cm 미만</option>
            <option value="4">기타</option>
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
import {ref, computed} from 'vue'

    export default {
        name :"waste_disposal_filling",
        setup(){
            const store = useStore()
            var startDate = ref("")
            var endDate = ref("")
            var kindOfwaste =  ref(0)
            var waste_life_list = ref([
                    "혼합 폐기물",
                    "종이/편지",
                    "섬유",
                    "음식물",
                    "목재",
                    "정원 및 공원 폐기물",
                    "기져귀",
                    "고무 및 가죽",
                    "플라스틱",
                    "금속",
                    "유리",
                    "기타,비활성(불연성)"
                ])
            var waste_corpor_list = ref([
                "혼합 폐기물",
                "음식, 음료 및 담배",
                "섬유",
                "나무 및 목제품",
                "제지",
                "석유제품, 용매, 플라스틱",
                "고무",
                "건설 및 파쇄 잔대물",
                "기타",
                "하수 슬러지",
                "폐수 슬러지"
            ])
            function click_regi_btn(){
                var info_list={
                    Type:"14",
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
                inf
                info_list.CarbonActivity = document.getElementById('carbon_emissions_content_filling').value
                info_list.data =  usage_input+"/"+"ton"
                info_list.emissions = usage_input+4
                info_list.StartDate = document.getElementById('start_data').value+'-01'+'-01'
                //info_list.EndDate = document.getElementById('end_data').value
                
                store.commit("SetTableContent",info_list)
            }
            return {
                kindOfwaste,
                waste_life_list,
                waste_corpor_list,
                startDate,
                endDate,
                click_regi_btn
            }
        }
    }
</script>