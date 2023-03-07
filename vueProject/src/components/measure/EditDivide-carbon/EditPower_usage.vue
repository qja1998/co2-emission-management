<!--탄소 배출 내용 입력의 전력 사용 부분 -->
<template>
    <div>
        <div class="edit_top ">
            <span class="edit_category">전력 사용 정보 추가하기</span>
            <button class="del_edit_btn" @click="click_del_editPopup()">x</button>
        </div>
        <div style="background:#ffffff; padding:3vh; width:25vw; height:70vh; font-size:1.8vh; overflow:auto">
            <div>
                <div style="color:#000000; ">
                탄소 배출 내용<br>   
                <textarea class="addInfo_input" id="carbon_emissions_content" rows="8" style="height:12vh; width:25vw"></textarea>
                </div> 
                <div style="margin-top:30px; width:25vw">기간 설정<br>
                    <input class = "date_btn" id = "start_data" type="month" data-placeholder="시작 날짜" required aria-required="true" style="margin-top:2vh; margin-left:0px; height:3.5vh">
                    <input class = "date_btn" id = "end_data" type="month" style="margin-left:3vw; height:3.5vh">
                </div>
                <div style="margin-top:30px; font-size:1.8vh">구분
                    <div class="add_info_divide" id="building_name_text" style="margin-top:4vh; width:25vw;">건물명 / 배출 시설명
                        <input type="text" class="addInfo_input" id ="building_name_input" style="width:11.5vw; height:3.5vh" placeholder="경상대 본관">
                    </div>
                    <div class="add_info_divide" style="font-size:1.8vh">운영주체
                        <select  v-model="main_agent" class="addInfo_input" id="operating_entity_input" style="width:12vw; height:4.2vh">
                            <option value="기업">기업 소유 및 운영</option>
                            <option value="민간">민간 임차</option>
                        </select>
                    </div>
                    <div class="add_info_divide" style="font-size:1.8vh">공급처
                        <select class="addInfo_input" id="supplier_drop" style="width:12vw; height:4.2vh">
                            <option value="0">한국전력공사</option>
                            <option value="1">직접 입력</option>
                        </select>
                    </div>
                    <div class="add_info_divide" style="font-size:1.8vh">전력 사용량
                        <input class="addInfo_input" id="usage_input" placeholder="12,456" style="width:9vw; height:4vh">
                        <select v-model="unit_s" class="addInfo_input" id="power_usage_drop" style="width:2.5vw; height:4vh">
                            <option value="kwh">kwh</option>
                            <option value="wh">wh</option>
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
    #add_info{
        margin-top: 0px;
        border: 0px;
    }

    .radio_btn{
        margin-left:60px; 
    }
    .addInfo_input{
        width: 80%;
        height: 40px;
        margin-top: 20px;
        background: #F6F7FB;
        border: 0px;
        border-radius: 7px;
    }
    #carbon_emissions_content{
        height:35px;
    }
    .addInfo_input:focus{
        outline: none;
    }
    .add_info_divide{
        margin-top: 20px;
        font-size: 14px;
    }
    .date_btn{
        width: 150px;
        margin-left: 60px;
        height: 40px;
        background: #F6F7FB;
        border: 0px;
        border-radius: 7px;
        color: #727374;
        padding-inline-start: 1%;
        padding-inline-end: 1%;
        content: attr(data-placeholder);
    }
    .date_btn:focus{
        outline:none;
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
    
    #usage_input{
        margin-left:75px;
        width:14%;
        background: #ffffff;
        border: 1px solid #DDE2E5;
    }

    #power_usage_drop{
        width: 4.6%;
        margin-left: 1%;
        color: #727374;
        margin-bottom: 20px;
    }

    .del_edit_btn{
        float:right;
        background: none;
        border:none;
        font-size: 25px;
        color:#727374;
        padding:0
    }
    .edit_top{
        background:#ffffff; 
        padding:2vh 3vh;
        width:25vw; 
        margin-bottom:2px;
    }
    .edit_bottom{
        background:#ffffff; 
        padding:2vh 3vh;
        width:25vw; 
        margin-bottom:2px;
        float:right;
    }
    .edit_category{
        color:#45464E;
        font-size: 1vw;
        font-weight: 900;
    }
    .edit_regi_btn{
        margin-top:4vh;
        background:#ffffff;
        border: 0.3vh solid #d5d5d5;
        border-radius: 1vh;
        height: 4vh;
        width: 5vw;
        margin-left: 1.8vw;
        font-size: 14px;
    }
    #edit_regi{
        float:right;
        background: #3DC984;
        color:#FFFFFF;
        border: none;
    }
    #edit_cancle{
        float:right;
    }
    

   
</style>

<script>
import {useStore} from 'vuex'
import {ref,computed} from 'vue'
import axios from "axios";
    export default {
        name :"power_usage",
        setup(){
            const store = useStore()
            var unit_s = ref('kwh')
            var main_agent = ref('기업')
            var selected = computed(()=>store.state.selected_row);
            
            async function click_edit_btn(unit_s){
                var info_list={content:"",data:"",emissions:"",StartDate:"",EndDate:"",scope:"2",category:"7"}
                var usage_input = document.getElementById('usage_input').value
                info_list.content = document.getElementById('carbon_emissions_content').value
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
                            "CarbonActivity": document.getElementById('carbon_emissions_content').value,
                            "CarbonUnit":unit_s,
                            "usage": usage_input+"/"+unit_s,
                            "Chief": null
                        },
                        "DetailType":"전력",
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
            return{
                unit_s,
                main_agent,
                selected,
                click_edit_btn,
                click_del_editPopup
            }
        },
    }
    
</script>