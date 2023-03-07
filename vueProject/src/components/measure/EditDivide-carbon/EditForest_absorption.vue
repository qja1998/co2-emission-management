<!--탄소 배출 내용 입력의 전력 사용 부분 -->
<template>
    <div>
        <div class="edit_top ">
            <span class="edit_category">산림에 의한 흡수 정보 추가하기</span>
            <button class="del_edit_btn" @click="click_del_editPopup()">x</button>
        </div>
        <div style="background:#ffffff; padding:3vh; width:25vw; height:70vh; font-size:1.8vh">
            <div>
                <div style="color:#000000; ">
                탄소 배출 내용<br>   
                <textarea class="addInfo_input" id="carbon_emissions_content_forest" rows="8" style="height:12vh; width:25vw"></textarea>
                </div> 
                <div style="margin-top:30px; width:25vw">기간 설정<br>
                    <input class = "date_btn" id = "start_data" type="month" data-placeholder="시작 날짜" required aria-required="true" style="margin-top:2vh; margin-left:0px; height:3.5vh">
                    <input class = "date_btn" id = "end_data" type="month" style="margin-left:3vw; height:3.5vh">
                </div>
                <div style="margin-top:30px; font-size:1.8vh">구분
                    <div class="add_info_divide" id="building_name_text" style="margin-top:4vh; width:25vw;">건물명 / 배출 시설명
                        <input type="text" class="addInfo_input" id ="building_name_input" style="width:11.5vw; height:3.5vh" placeholder="경상대 본관">
                    </div>
                    <div class="add_info_divide" style="margin-top:2.5vh">산림 유형
                        <select class="addInfo_input" id="operating_entity_input" style="width:11.5vw; height:3.5vh">
                            <option value="0">혼효림</option>
                            <option value="1">활엽수</option>
                            <option value="2">침엽수</option>
                        </select>
                        
                    </div>
                    <div class="add_info_divide">확보자료 유형
                        <select class="addInfo_input" id="supplier_drop" style="width:11.5vw; height:3.5vh; margin-left:4.5vw">
                            <option value="0">임야면적</option>
                            <option value="1">조림면적</option>
                        </select>
                    </div>
                    <div class="add_info_divide" >범위
                        <input class="addInfo_input" id="usage_input" style="margin-left:125px; width:8.5vw; height:3.5vh" placeholder="12">
                        <select class="addInfo_input" id="power_usage_drop" style="width:2.5vw; height:3.5vh">
                            <option value="0">ha</option>
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
import {computed, ref} from 'vue'
    export default {
        name :"power_usage",
        setup(){
            const store = useStore()
            var selected = computed(()=>store.state.selected_row);
            function click_edit_btn(){
                var info_list = {content:"",data:"",emissions:"",StartDate:"",EndDate:"",scope:"1", category:"6"}
                var usage_input = document.getElementById('usage_input').value
                info_list.content = document.getElementById('carbon_emissions_content_forest').value
                info_list.data =  usage_input+"/"+"ha"
                info_list.emissions = usage_input+4
                info_list.StartDate = document.getElementById('start_data').value+'-01'
                info_list.EndDate = document.getElementById('end_data').value+'-01'
                var table = computed(() => store.state.table_kind)
                if(table.value == 'total_table'){
                    //수정 API 연결
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
            return{click_edit_btn, click_del_editPopup}
        },
    }
</script>