<!--탄소 배출 내용 입력의 비료 사용 부분 -->
<template>
    <div>
        <div class="edit_top ">
            <span class="edit_category">비료 사용 정보 추가하기</span>
            <button class="del_edit_btn" @click="click_del_editPopup()">x</button>
        </div>
        <div style="background:#ffffff; padding:3vh; width:25vw; height:70vh; font-size:1.8vh; overflow:auto">
            <div style="color:#000000; ">
            탄소 배출 내용<br>
            <textarea class="addInfo_input" id="carbon_emissions_content_ferti" rows="8" style="height:12vh; width:25vw"></textarea>
            </div> 
            <div style="margin-top:30px; width:25vw">기간 설정<br>
                <input class = "date_btn" id = "start_data" type="month" data-placeholder="시작 날짜" required aria-required="true" style="margin-top:2vh; margin-left:0px; height:3.5vh">
                <input class = "date_btn" id = "end_data" type="month" style="margin-left:3vw; height:3.5vh">
            </div>
            <div style="margin-top:4vh">구분</div>
            <div class="add_info_divide" id="building_name_text" style="margin-top:4vh">비료 사용 위치
                <input type="text" class="addInfo_input" id ="building_name_input" placeholder="본관 앞 마당" style="margin-left:55px; width:12vw; height:4.2vh">
            </div>
            <div class="add_info_divide">비료 분류
                <select v-model="fertilzer" class="addInfo_input" id="supplier_drop"  style="margin-left:90px; width:12vw; height:4.2vh">
                    <option value="0">석회비료</option>
                    <option value="1">요소비료</option>
                    <option value="2">질소질비료</option>
                </select>
            </div>
            <div class="add_info_divide" style="height:8vh">비료 사용량
                <input class="addInfo_input" id="usage_input" placeholder="12,456" style="width:8.5vw; height:4.2vh">
                <select class="addInfo_input" id="power_usage_drop" style="width:3vw; height:4.2vh">
                    <option value="0">ton</option>
                </select>
            </div>
            <div v-if="fertilzer==2" style="margin:0px">
                <div class="add_info_divide" >유기질 비료 시비량
                    <input class="addInfo_input" id="usage_input" placeholder="12,456" style=" margin-left:1.9vw; width:8.5vw; height:4.2vh">
                    <select class="addInfo_input" id="power_usage_drop" style="width:3vw; height:4.2vh">
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

</style>

<script>
import {useStore} from 'vuex'
import {ref,computed} from 'vue'
import axios from "axios";
    export default {
        name :"power_usage",
        setup(){
            var fertilzer = ref("0")
            const store = useStore()
            var selected = computed(()=>store.state.selected_row);
            async function click_edit_btn(){
                var info_list = {content:"",data:"",emissions:"",StartDate:"",EndDate:"",scope:"1", category:"4"}
                var usage_input = document.getElementById('usage_input').value
                info_list.content = document.getElementById('carbon_emissions_content_ferti').value
                info_list.data =  usage_input+"/"+"ton"
                info_list.emissions = usage_input+4
                info_list.StartDate = document.getElementById('start_data').value+'-01'
                info_list.EndDate = document.getElementById('end_data').value+'-01'
                
                var plz = {
                        "CarbonData": {
                            "StartDate":document.getElementById('start_data').value+'-01',
                            "EndDate":document.getElementById('end_data').value+'-01',
                            "Location": "",
                            "Scope":  Number(info_list.scope),
                            "CarbonActivity": document.getElementById('carbon_emissions_content_ferti').value,
                            "CarbonUnit": "ton",
                            "usage": usage_input+"/"+unit_s,
                            "Chief": null
                        },
                        "DetailType":"비료사용",
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
            }
            
            function click_del_editPopup(){
                console.log('수정창 닫기')
                store.commit("SetEditDelet");
            }
            return{ 
                fertilzer,
                click_edit_btn,
                click_del_editPopup
            }
        },
    }
</script>