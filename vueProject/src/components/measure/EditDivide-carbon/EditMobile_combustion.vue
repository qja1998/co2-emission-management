<!--탄소 배출 내용 입력의 이동연소 부분 -->
<template>
    <div>
        <div class="edit_top ">
            <span class="edit_category">이동연소 정보 추가하기</span>
            <button class="del_edit_btn" @click="click_del_editPopup()">x</button>
        </div>
        <div style="background:#ffffff; padding:3vh; width:25vw; height:70vh; font-size:1.8vh; overflow:auto">
            <div>
                <div style="color:#000000; ">
                탄소 배출 내용<br>   
                <textarea class="addInfo_input" id="carbon_emissions_content_mobile" rows="8" style="height:12vh; width:25vw"></textarea>
                </div> 
                <div style="margin-top:30px; width:25vw">기간 설정<br>
                    <input class = "date_btn" id = "start_data" type="month" data-placeholder="시작 날짜" required aria-required="true" style="margin-top:2vh; margin-left:0px; height:3.5vh">
                    <input class = "date_btn" id = "end_data" type="month" style="margin-left:3vw; height:3.5vh">
                </div>
                <div style="margin-top:30px; font-size:1.8vh">구분
                    <div class="add_info_divide" id="building_name_text" style="margin-top:4vh; width:25vw;">건물명 / 배출 시설명
                        <input type="text" class="addInfo_input" id ="building_name_input" style="width:11.5vw; height:3.5vh" placeholder="경상대 본관">
                    </div>
                    <div class="add_info_divide" style="margin-top:2vh">차량분류
                        <select class="addInfo_input" id="operating_entity_input" style="width:12vw">
                            <option value="0">승용차</option>
                            <option value="1">승합차</option>
                            <option value="2">화물차</option>
                            <option value="3">이륜차</option>
                            <option value="4">비도로 및 기타</option>
                        </select>
                        
                    </div>
                    <div class="add_info_divide">설비명
                        <select v-model="main_agent" class="addInfo_input" id="facility_name_input" style="width:12vw">
                            <option value="기업">기업 소유 및 운영</option>
                            <option value="민간">민간 임차</option>
                        </select>
                    </div>
                    <div class="add_info_divide">연료정보
                        <select v-model="unit_s" class="addInfo_input" id="fuel_info" style="width:12vw">
                            <option v-for = "fule in fule_info_list" :value="fule.unit">{{fule.name}}</option>
                        </select>
                    </div>
                    <div class="add_info_divide" >연료량
                        <input class="addInfo_input" id="amount_fuel" placeholder="12,456" style="width:8.8vw">
                        <select class="addInfo_input" id="power_usage_drop" v-if="unit_s=='L'" style="width:2.5vw">
                            <option value="L">L</option>
                        </select>
                        <select class="addInfo_input" id="power_usage_drop" v-else-if="unit_s=='Nm^3'" style="width:2.5vw">
                            <option value="Nm^3">Nm^3</option>
                        </select>  
                    </div>
                </div>
            </div>
        </div>
        <div class="edit_bottom" style="font-size:1.5vh">
            <button class="edit_regi_btn" id="edit_regi" @click="click_edit_btn(unit_s)">수정하기</button>
            <button class="edit_regi_btn" id="edit_cancle" @click="click_del_editPopup()">취소</button>
        </div>
    </div>

</template>

<style>
   
</style>

<script>
import {useStore} from "vuex"
import {ref,computed} from "vue"
import axios from "axios";
    export default {
        name :"power_usage",
        setup(){
            const store = useStore()
            var unit_s = ref('L')
            var main_agent = ref('기업')
            var selected = computed(()=>store.state.selected_row);
            var fule_info_list = [
                {name: '희발유', unit:'L'},
                {name: '경유', unit:'L'},
                {name: 'LPG', unit:'L'},
                {name: '등유', unit:'L'},
                {name: '윤활유', unit:'L'},
                {name: 'CNG', unit:'Nm^3'},
                {name: 'LNG', unit:'Nm^3'},
            ]
            async function click_edit_btn(unit_s){
                var info_list={content:"",data:"",emissions:"",StartDate:"",EndDate:"",scope:"1",category:"1"}
                var usage_input = document.getElementById('amount_fuel').value
                info_list.content = document.getElementById('carbon_emissions_content_mobile').value
                info_list.data =  usage_input+"/"+unit_s
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
                            "CarbonActivity": document.getElementById('carbon_emissions_content_mobile').value,
                            "CarbonUnit": unit_s,
                            "usage": usage_input+"/"+unit_s,
                            "Chief": null
                        },
                        "DetailType":"이동연소",
                        //"RootCom":"samsung",
                        //"BelongCom":"",
                }
                var table = computed(() => store.state.table_kind)
                console.log("테이블 종류",table.value)
                if(table.value == 'total_table'){
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
                    //수정 API 연결
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
                unit_s,
                main_agent,
                fule_info_list,
                click_edit_btn,
                click_del_editPopup
            }
        },
    }
</script>