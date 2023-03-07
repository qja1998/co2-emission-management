<!--탄소 배출 내용 입력의 고정연소 부분 -->
<template>
    <div>
        <div class="edit_top ">
            <span class="edit_category">고정연소 정보 추가하기</span>
            <button class="del_edit_btn" @click="click_del_editPopup()">x</button>
        </div>
        <div style="background:#ffffff; padding:3vh; width:25vw; height:70vh; font-size:1.8vh">
            <div>
                <div style="color:#000000; ">
                탄소 배출 내용<br>   
                <textarea class="addInfo_input" id="carbon_emissions_content_station" rows="8" style="height:12vh; width:25vw"></textarea>
                </div> 
                <div style="margin-top:30px; width:25vw">기간 설정<br>
                    <input class = "date_btn" id = "start_data" type="month" data-placeholder="시작 날짜" required aria-required="true" style="margin-top:2vh; margin-left:0px; height:3.5vh">
                    <input class = "date_btn" id = "end_data" type="month" style="margin-left:3vw; height:3.5vh">
                </div>
                <div style="margin-top:30px; font-size:1.8vh">구분
                    <div class="add_info_divide" id="building_name_text" style="margin-top:4vh; width:25vw;">건물명 / 배출 시설명
                        <input type="text" class="addInfo_input" id ="building_name_input" style="width:11.5vw; height:3.5vh" placeholder="경상대 본관">
                    </div>
                    <div class="add_info_divide" style="font-size:1.8vh">설비명
                        <select  v-model="main_agent" class="addInfo_input" id="operating_entity_input" style="width:12vw; height:4.2vh">
                            <option value="기업">기업 소유 및 운영</option>
                            <option value="민간">민간 임차</option>
                        </select>
                    </div>
                    <div class="add_info_divide">연료정보
                        <select v-model="unit_s" class="addInfo_input" id="fuel_info" style="width:11.7vw">
                            <option v-for = "fule in fule_info_list" :value="fule.unit">{{fule.name}}</option>
                        </select>
                    </div>
                    <div class="add_info_divide" >연료량
                        <input class="addInfo_input" id="amount_fuel" placeholder="12,456" style="width:8.5vw">
                        <select class="addInfo_input" id="power_usage_drop" v-if="unit_s=='kg'" style="width:2.5vw">
                            <option value="0">kg</option>
                        </select>
                        <select class="addInfo_input" id="power_usage_drop" v-else-if="unit_s=='L'" style="width:2.5vw">
                            <option value="1">L</option>
                        </select>
                        <select class="addInfo_input" id="power_usage_drop" v-else-if="unit_s=='Nm^3'" style="width:2.5vw">
                            <option value="2">Nm^3</option>
                        </select>
                        <select class="addInfo_input" id="power_usage_drop" v-else-if="unit_s=='kWh'" style="width:2.5vw">
                            <option value="3">kWh</option>
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
import {useStore} from 'vuex'
import {ref, computed} from 'vue'
import axios from "axios";
    export default {
        name :"stationary_combustion",
        setup(){
            const store = useStore()
            var unit_s = ref('kg')
            var main_agent = ref('기업')
            var selected = computed(()=>store.state.selected_row);
            var fule_info_list = ref([
                    {index:1, name: '원유', unit:'kg'},
                    {index:2, name: '휘발유' ,unit:'L'},
                    {index:3, name: '실내 등유' ,unit:'L'},
                    {index:4, name: '보일러 등유' ,unit:'L'},
                    {index:5, name: '경유' ,unit:'L'},
                    {index:6, name: 'B-A유' ,unit:'L'},
                    {index:7, name: 'B-B유' ,unit:'L'},
                    {index:8, name: 'B-C유' ,unit:'L'},
                    {index:9, name: '프로판', unit:'kg'},
                    {index:10, name: '부탄', unit:'kg'},
                    {index:11, name: '나프타',unit:'L'},
                    {index:12, name: '용제',unit:'L'},
                    {index:13, name: '항공유',unit:'L'},
                    {index:14, name: '아스팔트',unit:'kg'},
                    {index:15, name: '윤활유',unit:'L'},
                    {index:16, name: '석유코크',unit:'kg'},
                    {index:17, name: '부생연료 1호',unit:'L'},
                    {index:18, name: '부생연료 2호',unit:'L'},
                    {index:19, name: '천연가스(LNG)',unit:'kg'},
                    {index:20, name: '도시가스(LNG)',unit:'Nm^3'},
                    {index:21, name: '도시가스(LPG)',unit:'Nm^3'},
                    {index:22, name: '국내무연탄',unit:'kg'},
                    {index:23, name: '수입무연탄(연료용)',unit:'kg'},
                    {index:24, name: '수입무연탄(원료용)',unit:'kg'},
                    {index:25, name: '유연탄(연료용)',unit:'kg'},
                    {index:26, name: '아역청탄',unit:'kg'},
                    {index:27, name: '코크스',unit:'kg'},
                    {index:28, name: '전기(발전기준)',unit:'kWh'},
                    {index:29, name: '전기(소비기준)',unit:'kWh'},
                    {index:30, name: '신탄',unit:'kWh'},
                ])
                async function click_edit_btn(unit_s){
                    var info_list = ref({content:"",data:"",emissions:"",StartDate:"",EndDate:"",scope:"Scope1", category:"0"})
                    var usage_input = document.getElementById('amount_fuel').value
                    info_list.content = document.getElementById('carbon_emissions_content_station').value
                    info_list.data =  usage_input+"/"+unit_s
                    info_list.emissions = usage_input+4
                    info_list.StartDate = document.getElementById('start_data').value+'-01'
                    info_list.EndDate = document.getElementById('end_data').value+'-01'
                    
                    var plz = {
                        "CarbonData": {
                            "StartDate":document.getElementById('start_data').value+'-01',
                            "EndDate":document.getElementById('end_data').value+'-01',
                            "Location": "",
                            "Scope":  Number(info_list.Scope),
                            "CarbonActivity": document.getElementById('carbon_emissions_content_station').value,
                            "CarbonUnit":unit_s,
                            "usage": usage_input+"/"+unit_s,
                            "Chief": null
                        },
                        "DetailType":"열",
                        //"RootCom":"samsung",
                        //"BelongCom":"",
                    }

                    if(main_agent.value == '기업'){
                    info_list.scope = 'Scope1'
                    }
                    else if(main_agent.value == "민간"){
                        info_list.scope = 'Scope2'
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