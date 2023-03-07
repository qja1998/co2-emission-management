<!--폐기물 내용 입력의 사용 부분 -->
<template>
    <div >
        <div class="edit_top ">
            <span class="edit_category">폐기물 사용 정보 추가하기</span>
            <button class="del_edit_btn" @click="click_del_editPopup()">x</button>
        </div>
        <div style="background:#ffffff; padding:3vh; width:25vw; height:70vh; font-size:1.8vh; overflow: auto;">
            <div>
                <div style="color:#000000; ">
                탄소 배출 내용<br>   
                <textarea class="addInfo_input" id="carbon_emissions_content_waste" rows="8" style="height:12vh; width:25vw"></textarea>
                </div> 
                <div style="margin-top:30px; width:25vw">기간 설정<br>
                    <input class = "date_btn" id = "start_data" type="month" data-placeholder="시작 날짜" required aria-required="true" style="margin-top:2vh; margin-left:0px; height:3.5vh">
                    <input class = "date_btn" id = "end_data" type="month" style="margin-left:3vw; height:3.5vh">
                </div>
                <div style="margin-top:30px; font-size:1.8vh">구분
                    <div class="add_info_divide" id="building_name_text" style="margin-top:4vh; width:25vw;">건물명 / 배출 시설명
                        <input type="text" class="addInfo_input" id ="building_name_input" style="width:11.5vw; height:3.5vh; margin-left:2.3vw" placeholder="경상대 본관">
                    </div>
                    <div class="add_info_divide" style="font-size:1.8vh">배출 주체
                        <select  v-model="main_agent" class="addInfo_input" id="operating_entity_input" style="width:12vw; height:4.2vh">
                            <option value="기업">기업 소유 및 운영</option>
                            <option value="민간">민간 임차</option>
                        </select>
                    </div>
                    <div class="add_info_divide" style="font-size:1.8vh">폐기물 처리 형태
                        <select v-model="waste_treatment" class="addInfo_input" id="supplier_drop" style="width:12vw; height:4.2vh; margin-left:2vw">
                            <option value="매립">매립</option>
                            <option value="소각">소각</option>
                            <option value="하폐수">하폐수</option>
                        </select>
                    </div>
                    <div class="add_info_divide">폐기물 종류
                        <select class="addInfo_input" id="waste_type" v-if ="waste_treatment=='매립'" style="width:12vw; height:4.2vh; margin-left:5.3vw">
                            <option value="0">생활</option>
                            <option value="1">건설</option>
                        </select>

                        <select class="addInfo_input" id="waste_type" v-else-if ="waste_treatment=='소각'" style="width:12vw; height:4.2vh; margin-left:5.3vw">
                            <option value="0">건설</option>
                            <option value="1">지정</option>
                        </select>

                        <select v-model="unit_value" class="addInfo_input" id="waste_type"  v-else-if ="waste_treatment=='하폐수'" style="width:12vw; height:4.2vh; margin-left:5.3vw">
                            <option value="하수">하수</option>
                            <option value="폐수">폐수</option>
                            <option value="분뇨">분뇨</option>
                        </select>
                    </div>
                    <div class="add_info_divide">배출 주체
                        <select class="addInfo_input" id="subject_emission" style="width:12vw; height:4.2vh; margin-left:6vw">
                            <option value="0">대학 소유 및 운영</option>
                            <option value="1">직접 입력</option>
                        </select>
                    </div>
                    <div class="add_info_divide" >폐기물 배출량
                        <input class="addInfo_input" id="emissions" placeholder="12,456" style="width:9vw; margin-left:4.5vw">
                        <select class="addInfo_input" id="power_usage_drop" v-if ="waste_treatment=='매립' || waste_treatment=='소각'" style="width:2.5vw;">
                            <option value="0">ton</option>
                        </select>

                        <select class="addInfo_input" id="power_usage_drop" v-else-if ="unit_value=='하수' || unit_value=='폐수'" style="width:2.5vw;">
                            <option value="1">m3</option>
                        </select>

                        <select class="addInfo_input" id="power_usage_drop"  v-else-if ="unit_value=='분뇨'">
                            <option value="2">명</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
        <div class="edit_bottom" style="font-size:1.5vh">
            <button class="edit_regi_btn" id="edit_regi" @click="click_edit_btn()">수정하기</button>
            <button class="edit_regi_btn" id="edit_cancle" @click="click_del_editPopup()">취소</button>
        </div>
    </div>

</template>

<style>

#Waste_treatment_type{
    width: 20%;
    margin-left: 45px;
    color: #727374
}
#waste_type{
    width: 20%;
    margin-left: 77px;
    color: #727374
}
#subject_emission{
    width: 20%;
    margin-left: 90px;
    color: #727374
}
#emissions{
    width: 1%;
    margin-left: 60px;
    color: #727374;
    background: #ffffff;
    border: 1px solid #DDE2E5;
}

   
</style>

<script>
import {useStore} from 'vuex'
import {ref, computed} from 'vue'
import axios from "axios";
    export default {
        name :"waste_usage",
        setup(){
            const store = useStore()
            var waste_treatment = ref('매립')
            var unit_value = ref('하수')
            var main_agent = ref('기업')     
            var selected = computed(()=>store.state.selected_row);

            async function click_edit_btn(){
                var info_list = {content:"",data:"",emissions:"",StartDate:"",EndDate:"",scope:"1",category:"10"}
                var usage_input = document.getElementById('emissions').value
                info_list.content = document.getElementById('carbon_emissions_content_waste').value
                info_list.data =  usage_input+"/"+"ton"
                info_list.emissions = usage_input+4
                info_list.StartDate = document.getElementById('start_data').value+'-01'
                info_list.EndDate = document.getElementById('end_data').value+'-01'
                if(main_agent.value == '기업'){
                    info_list.scope = '1'
                }
                else if(main_agent.value == "민간"){
                    info_list.scope = '2'
                }
                var plz = {
                        "CarbonData": {
                            "StartDate":document.getElementById('start_data').value+'-01',
                            "EndDate":document.getElementById('end_data').value+'-01',
                            "Location": "",
                            "Scope":  Number(info_list.scope),
                            "CarbonActivity": document.getElementById('carbon_emissions_content_waste').value,
                            "CarbonUnit": unit_s,
                            "usage": usage_input+"/"+unit_s,
                            "Chief": null
                        },
                        "DetailType":"열",
                        //"RootCom":"samsung",
                        //"BelongCom":"",
                }
                var table = computed(() => store.state.table_kind)
                console.log("테이블 종류",table.value)
                if(table.value == 'total_table'){
                    //수정 API 연결
                    var config = {
                        headers:{
                            "Authorization":"Bearer"+" "+store.state.accessToken
                        }
                    }
                   //console.log(selected.value[0])
                   console.log(plz)
                    await axios.put("/CarbonEmission/"+selected.value[0].id,plz,config).then(res => {
                        console.log(plz)
                        
                    })
                    .catch(error => {
                        alert("다시 시도해주세요.")
                        console.log(error)
                        //router.push('/');
                    })
                    .finally(() => {
                        console.log("lender1")
                    })
                }
                else if(table.value == 'table'){
                    store.commit("SetTableContent",info_list);
                    store.commit('DelTableContent',selected.value);
                }
                store.commit("SetEditDelet");
            }
            
            function click_del_editPopup(){
                console.log('수정창 닫기')
                store.commit("SetEditDelet");
            }
            return {
                waste_treatment,
                main_agent,
                unit_value,
                click_edit_btn,
                click_del_editPopup
            }
        }
    }
</script>