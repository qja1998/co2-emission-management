<!--탄소 배출 내용 입력의 탈루 사용 부분 -->
<template>
    <div>
        <div class="edit_top ">
            <span class="edit_category">탈루 사용 정보 추가하기</span>
            <button class="del_edit_btn" @click="click_del_editPopup()">x</button>
        </div>
        <div style="background:#ffffff; padding:3vh; width:25vw; height:70vh; font-size:1.8vh; overflow:auto">
            <div>
                <div style="color:#000000; ">
                탄소 배출 내용<br>   
                <textarea class="addInfo_input" id="carbon_emissions_content_fugi" rows="8" style="height:12vh; width:25vw"></textarea>
                </div> 
                <div style="margin-top:30px; width:25vw">기간 설정<br>
                    <input class = "date_btn" id = "start_data" type="month" data-placeholder="시작 날짜" required aria-required="true" style="margin-top:2vh; margin-left:0px; height:3.5vh">
                    <input class = "date_btn" id = "end_data" type="month" style="margin-left:3vw; height:3.5vh">
                </div>
                <div style="margin-top:30px; font-size:1.8vh">구분
                    <div class="add_info_divide" style="margin-top:2vh">기기분류
                        <select v-model="device" class="addInfo_input" id="operating_entity_input" style="width:12vw">
                            <option value="냉장고">냉장고</option>
                            <option value="에어컨">에어컨</option>
                        </select>
                        
                    </div>
                    <div class="add_info_divide"> 냉매종류
                        <select class="addInfo_input" id="refrigerant_type" v-if="device=='냉장고'" style="width:12vw">
                            <option value="0">HFC-134a</option>
                        </select>
                        <select class="addInfo_input" id="refrigerant_type" v-else-if="device=='에어컨'" style="width:12vw">
                            <option value="0">R-407c</option>
                            <option value="1">R-410a</option>
                        </select>
                    </div>
                    
                    <div class="add_info_divide" >냉매량
                        <input class="addInfo_input" id="amount_refrigerant" placeholder="12,456" style="margin-left:110px; width:8.5vw" >
                        <select class="addInfo_input" id="power_usage_drop" style="width:2.5vw"> 
                            <option value="0">g</option>
                        </select>
                    </div>
                    <div class="add_info_divide" style="margin-top:0px">용량
                        <input class="addInfo_input" id="amount_refrigerant" placeholder="12,456" style="margin-left:122px; width:8.5vw">
                        <select class="addInfo_input" id="power_usage_drop" v-if="device=='냉장고'" style="width:2.5vw">
                            <option value="0">L</option>
                        </select>
                        <select class="addInfo_input" id="power_usage_drop" v-else-if="device=='에어컨'" style="width:2.5vw">
                            <option value="0">m^3</option>
                        </select>
                    </div>
                    <div class="add_info_divide" style="margin-top:0px">설치대수
                        <input class="addInfo_input" id="nun_installations" placeholder="12,456" style="margin-left:5vw; width:8.5vw">
                        <select class="addInfo_input" id="power_usage_drop" style="width:2.5vw">
                            <option value="0">대</option>
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
    #refrigerant_type{
        width: 20%;
        margin-left: 95px;
        color: #727374
    }

    #amount_refrigerant{
        margin-top:20px;
        margin-left:110px;
        width:14%;
        background: #ffffff;
        border: 1px solid #DDE2E5;
    }

    #nun_installations{
        margin-left:95px;
        width:14%;
        background: #ffffff;
        border: 1px solid #DDE2E5;
    }
    

</style>

<script>
import {useStore} from "vuex"
import {ref,computed} from "vue"
import axios from "axios";
    export default {
        name :"power_usage",

        setup(){
            const store = useStore()
            var device =ref('냉장고')
            var selected = computed(()=>store.state.selected_row);
            async function click_edit_btn(){
                var info_list={content:"",data:"",emissions:"",StartDate:"",EndDate:"",scope:"Scope1",category:"2"}
                var usage_input = document.getElementById('amount_refrigerant').value
                info_list.content = document.getElementById('carbon_emissions_content_fugi').value
                info_list.data =  usage_input+"/"+"g"
                info_list.emissions = usage_input+4
                info_list.StartDate = document.getElementById('start_data').value+'-01'
                info_list.EndDate = document.getElementById('end_data').value+'-01'
                
                var plz = {
                        "CarbonData": {
                            "StartDate":document.getElementById('start_data').value+'-01',
                            "EndDate":document.getElementById('end_data').value+'-01',
                            "Location": "",
                            "Scope":  Number(info_list.Scope),
                            "CarbonActivity": document.getElementById('carbon_emissions_content_fugi').value,
                            "CarbonUnit": "g",
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
                location.reload();
            }
            
            function click_del_editPopup(){
                console.log('수정창 닫기')
                store.commit("SetEditDelet");
            }

            return{device,
                selected,
                click_edit_btn,
                click_del_editPopup
            }
        }
    }
</script>