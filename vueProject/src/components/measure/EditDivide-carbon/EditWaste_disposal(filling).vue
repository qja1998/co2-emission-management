<!-- 폐기물 처리 시설(매립)  -->
<template>
    <div>
        <div class="edit_top ">
            <span class="edit_category">폐기물 처리시설(매립) 정보 추가하기</span>
            <button class="del_edit_btn" @click="click_del_editPopup()">x</button>
        </div>
        <div style="background:#ffffff; padding:3vh; width:25vw; height:70vh; font-size:1.8vh">
            <div>
                <div style="color:#000000;">
                탄소 배출 내용<br>   
                <textarea class="addInfo_input" id="carbon_emissions_content_filling" rows="8" style="height:12vh; width:25vw"></textarea>
                </div> 
                <div class="add_info_divide" id="building_name_text" style="margin-top:4vh; ">시설명/위치
                <input type="text" class="addInfo_input" style="margin-left:94px; width:11.5vw; height:3.5vh" id ="building_name_input" placeholder="경상대 본관">
            </div>
            <div style="margin-top:30px; font-size:1.4vh">매립 시작 날짜
                <input class = "date_btn" id = "start_data" type="month" data-placeholder="시작 날짜" required aria-required="true">
            </div>

            <div class="add_info_divide">폐기물 분류
                <select v-model="kindOfwaste" class="addInfo_input" id="operating_entity_input" style="width:11.5vw;, height:3.5vh">
                    <option :value="0">생활 폐기물</option>
                    <option :value="1">사업장 폐기물</option>
                </select>
            </div>
            <div class="add_info_divide">폐기물 세부 구분
                <select class="addInfo_input" id="supplier_drop" v-if="kindOfwaste == '0'" style="margin-left:61px; width:11.5vw">
                    <option v-for = "waste in waste_life_list" >{{waste}}</option>
                </select>
                <select class="addInfo_input" id="supplier_drop" v-else-if="kindOfwaste == '1'" style="margin-left:61px; width:11.5vw">
                    <option v-for = "waste in waste_corpor_list" >{{waste}}</option>
                </select>
            </div>
            <div class="add_info_divide">매립 시설 유형
                <select class="addInfo_input" id="supplier_drop_steam" style="margin-left:73px; width:11.5vw">
                    <option value="0">관리형 매립지 - 혐기성</option>
                    <option value="1">관리형 매립지 - 준호기성</option>
                    <option value="2">비관리형 매립지 - 매립고 5cm 이상</option>
                    <option value="3">비관리형 매립지 - 매립고 5cm 미만</option>
                    <option value="4">기타</option>
                </select>
            </div>
            <div class="add_info_divide" >매립 양
                <input class="addInfo_input" id="steam_usage_input" placeholder="12,456" style="margin-left:120px; height:3.5vh; width:8.5vw">
                <select class="addInfo_input" id="steam_usage_drop" style="height:3.5vh; width:2.2vw">
                    <option value="0">ton</option>
                </select>
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
import axios from "axios";
    export default {
        name :"waste_disposal_filling",
        setup(){
            const store = useStore()
            var kindOfwaste =  ref(0)
            var selected = computed(()=>store.state.selected_row);
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
            async function click_edit_btn(){
                var  info_list = {content:"",data:"",emissions:"",StartDate:"",EndDate:"",scope:"1",category:"14"}
                var usage_input = document.getElementById('steam_usage_input').value

                info_list.content = document.getElementById('carbon_emissions_content_filling').value
                info_list.data =  usage_input+"/"+"ton"
                info_list.emissions = usage_input+4
                info_list.StartDate = document.getElementById('start_data').value+'-01'
                //info_list.EndDate = document.getElementById('end_data').value
                
                var plz = {
                        "CarbonData": {
                            "StartDate":document.getElementById('start_data').value+'-01',
                            "EndDate":document.getElementById('start_data').value+'-01',
                            "Location": "",
                            "Scope":  Number(info_list.scope),
                            "CarbonActivity": document.getElementById('carbon_emissions_content_filling').value,
                            "CarbonUnit": unit_s,
                            "usage": usage_input+"/"+unit_s,
                            "Chief": null
                        },
                        "DetailType":"폐기물 처리시설 매립",
                        //"RootCom":"samsung",
                        //"BelongCom":"",
                }
                var table = computed(() => store.state.table_kind)
                console.log("테이블 종류",table)
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
                location.reload();
            }
            
            function click_del_editPopup(){
                console.log('수정창 닫기')
                store.commit("SetEditDelet");
            }
            return {
                kindOfwaste,
                waste_life_list,
                waste_corpor_list,
                click_edit_btn,
                click_del_editPopup
            }
        }
    }
</script>