<!--폐기물 처리 시설(하수 처리)  -->
<template>
    <div>
        <div class="edit_top ">
            <span class="edit_category">폐기물 처리시설(하수처리) 정보 추가하기</span>
            <button class="del_edit_btn" @click="click_del_editPopup()">x</button>
        </div>
        <div style="background:#ffffff; padding:3vh; width:25vw; height:70vh; font-size:1.8vh; overflow:auto">
            <div>
                <div style="color:#000000; ">
                탄소 배출 내용<br>   
                <textarea class="addInfo_input" id="carbon_emissions_content_sewage" rows="8" style="height:12vh; width:25vw"></textarea>
                </div> 
                <div class="add_info_divide" id="building_name_text" style="margin-top:4vh; font-size:1.8vh">시설명/위치
                    <input type="text" class="addInfo_input" id ="building_name_input" placeholder="성남시" style="margin-left:3vw; width:11.5vw; height:3.5vh">
                </div>
                <div style="margin-top:30px; width:25vw; font-size:1.8vh">처리 날짜<br>
                    <input class = "date_btn" id = "start_data" type="month" data-placeholder="시작 날짜" required aria-required="true" style="margin-top:2vh; margin-left:0px; height:3.5vh">
                    <input class = "date_btn" id = "end_data" type="month" style="margin-left:3vw; height:3.5vh">
                </div>
                <div class="add_info_divide" style="font-size:1.8vh">하수 처리량
                    <input class="addInfo_input" id="steam_usage_input" placeholder="12,456" style="margin-left:3vw; width:8.5vw; height:3.5vh">
                    <select class="addInfo_input" id="steam_usage_drop" style="width:3vw">
                        <option value="0">m^3/1일</option>
                    </select>
                </div>
                <div class="add_info_divide"  style="font-size:1.8vh; margin-top:0vh;">메탄회수량
                    <input class="addInfo_input" id="steam_usage_input" placeholder="12,456" style="margin-left:3vw; width:8.5vw; height:3.5vh">
                    <select class="addInfo_input" id="steam_usage_drop" style="width:3vw; margin-left:0.4vw">
                        <option value="0">ton</option>
                    </select>
                </div>
                <div class="add_info_divide"  style="font-size:1.5vh; float:left; margin-right:2vw; margin-top:2vh">
                    <span>유입 산소 요구량 농도(BOD)</span><br>
                    <input class="addInfo_input" id="steam_usage_input" placeholder="12,456" style="width:6vw; height:3.5vh; margin-left:0px">
                    <select class="addInfo_input" id="steam_usage_drop" style="width:3vw; height:3.5vh; ">
                        <option value="0">mg/L</option>
                    </select>
                </div>
                <div class="add_info_divide" style="font-size:1.5vh;" >
                    <span>유출 산소 요구량 농도(BOD)</span>
                    <input class="addInfo_input" id="steam_usage_input" placeholder="12,456" style="width:6vw; height:3.5vh; margin-left:0px">
                    <select class="addInfo_input" id="steam_usage_drop" style="width:3vw">
                        <option value="0">mg/L</option>
                    </select>
                </div>
                <div class="add_info_divide" style="font-size:1.5vh; float:left; margin-right:2vw">유입 질소 요구량 농도(BOD)<br>
                    <input class="addInfo_input" id="steam_usage_input" placeholder="12,456" style="width:6vw; height:3.5vh; margin-left:0px">
                    <select class="addInfo_input" id="steam_usage_drop" style="width:3vw">
                        <option value="0">mg/L</option>
                    </select>
                </div>
                <div class="add_info_divide"  >유출 질소 요구량 농도(BOD)
                    <input class="addInfo_input" id="steam_usage_input" placeholder="12,456" style="width:6vw; height:3.5vh; margin-left:0px">
                    <select class="addInfo_input" id="steam_usage_drop" style="width:3vw">
                        <option value="0">mg/L</option>
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
        width:50px;
        margin-left: 1%;
        color: #727374;
        margin-bottom: 20px;
    }

   
</style>

<script>
import {useStore} from 'vuex'
import {ref,computed} from 'vue'
import axios from "axios";
    export default {
        name :"waste_disposal_sewage",
        setup(){
            var selected = computed(()=>store.state.selected_row);
            const store = useStore()
            async function click_edit_btn(){
                var info_list = {content:"",data:"",emissions:"",StartDate:"",EndDate:"",scope:"1",category:"16"}
                var usage_input = document.getElementById('steam_usage_input').value
                info_list.content = document.getElementById('carbon_emissions_content_sewage').value
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
                            "CarbonActivity": document.getElementById('carbon_emissions_content_sewage').value,
                            "CarbonUnit": unit_s,
                            "usage": usage_input+"/"+unit_s,
                            "Chief": null
                        },
                        "DetailType":"열",
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
            return{
                click_edit_btn,
                click_del_editPopup
            }
        }
    }
</script>