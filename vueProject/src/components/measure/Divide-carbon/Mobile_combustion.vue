<!--탄소 배출 내용 입력의 이동연소 부분 -->
<template>
    <div style="color:black;">입력방식
            <label><input class="radio_btn" type="radio" name="methodRegist" value="직접 입력하기" checked>직접 입력하기</label>
            <label><input class="radio_btn" type="radio" name="methodRegist" value="엑셀 등록하기">엑셀 등록하기</label>
    </div>
    <div style="margin-top:50px; ">
        탄소 배출 내용<br>
        <input type="text" class="addInfo_input" id="carbon_emissions_content_mobile">
    </div> 
    <div style="margin-top:30px">기간 설정
        <input class = "date_btn" id = "start_data" type="month" data-placeholder="시작 날짜" required aria-required="true">
        <input class = "date_btn" id = "end_data" type="month">
    </div>
    <div style="margin-top:4vh">구분</div>
    <div class="add_info_divide" style="margin-top:0vh">차량분류
        <select class="addInfo_input" id="operating_entity_input">
            <option value="0">승용차</option>
            <option value="1">승합차</option>
            <option value="2">화물차</option>
            <option value="3">이륜차</option>
            <option value="4">비도로 및 기타</option>
        </select>
        
    </div>
    <div class="add_info_divide">설비명
        <select v-model="main_agent" class="addInfo_input" id="facility_name_input">
            <option value="기업">기업 소유 및 운영</option>
            <option value="민간">민간 임차</option>
        </select>
    </div>
    <div class="add_info_divide">연료정보
        <select v-model="index" class="addInfo_input" id="fuel_info">
            <option v-for = "fule in fule_info_list" :value="fule.index">{{fule.name}}</option>
        </select>
    </div>
    <div class="add_info_divide" >연료량
        <input class="addInfo_input" id="amount_fuel" placeholder="12,456">
        <select class="addInfo_input" id="power_usage_drop" v-if="unit_s=='L'">
            <option value="L">L</option>
        </select>
        <select class="addInfo_input" id="power_usage_drop" v-else-if="unit_s=='Nm^3'">
            <option value="Nm^3">Nm^3</option>
        </select>  
    </div>
    <button class ="input2_regi_btn" id="add_info_regi_btn" @click="click_regi_btn(unit_s)">상단 정보 등록</button>
</template>


<style>
   
</style>

<script>
import {useStore} from "vuex"
import {ref,computed} from "vue"

    export default {
        name :"power_usage",
        setup(){
            const store = useStore()
            var main_agent = ref('기업')
            var fule_info_list = [
                {index:0, name: '휘발유', unit:'L'},
                {index:1, name: '경유', unit:'L'},
                {index:2,name: '도시가스', unit:'L'},
                {index:2,name: '천연가스', unit:'L'},
                {index:3,name: '등유', unit:'L'},
                {index:4,name: '윤활유', unit:'L'},
                {index:5,name: 'CNG', unit:'Nm^3'},
                {index:6,name: 'LNG', unit:'Nm^3'},
            ]
            var index = ref(0)
            var unit_s = fule_info_list[index.value].unit
            function click_regi_btn(unit_s){
                var info_list={
                    Type:"1",
                    DetailType:"",
                    StartDate:"",
                    EndDate:"",
                    Location:"",
                    scope:1,
                    data:"",
                    emissions:"",
                    Carbonunit:unit_s,
                    CarbonActivity:"",
                    kind:"",
                    Division:{건물명:"",설비명:""},
                }
                var usage_input = document.getElementById('amount_fuel').value
                info_list.CarbonActivity = document.getElementById('carbon_emissions_content_mobile').value
                info_list.data =  usage_input+"/"+unit_s
                info_list.emissions = usage_input+4
                info_list.StartDate = document.getElementById('start_data').value+'-01'
                info_list.EndDate = document.getElementById('end_data').value+'-01'
                info_list.DetailType = fule_info_list[index.value].name
                info_list.Division.설비명 = document.getElementById('facility_name_input').value
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
                index,
                main_agent,
                fule_info_list,
                click_regi_btn
            }
        },
    }
</script>