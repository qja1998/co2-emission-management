<!--탄소 배출 내용 입력의 대학 소유 동물 부분 -->
<template>
    <div>
        <div class="edit_top ">
            <span class="edit_category">대학 동물 소유 정보 추가하기</span>
            <button class="del_edit_btn" @click="click_del_editPopup()">x</button>
        </div>
        <div style="background:#ffffff; padding:3vh; width:25vw; height:70vh; font-size:1.8vh; overflow:auto">
            <div>
                <div style="color:#000000; ">
                탄소 배출 내용<br>   
                <textarea class="addInfo_input" id="carbon_emissions_content_animal" rows="8" style="height:12vh; width:25vw"></textarea>
                </div> 
                <div style="margin-top:30px; width:25vw">기간 설정<br>
                    <input class = "date_btn" id = "start_data" type="month" data-placeholder="시작 날짜" required aria-required="true" style="margin-top:2vh; margin-left:0px; height:3.5vh">
                    <input class = "date_btn" id = "end_data" type="month" style="margin-left:3vw; height:3.5vh">
                </div>
                <div style="margin-top:30px; font-size:1.8vh">구분
                    <div class="add_info_divide" id="building_name_text" style="margin-top:4vh; width:25vw;">건물명 / 배출 시설명
                        <input type="text" class="addInfo_input" id ="building_name_input" style="width:11.5vw; height:3.5vh" placeholder="경상대 본관">
                    </div>
                    <div class="add_info_divide" id="building_name_text" style="margin-top:5.5vh; ">동물 사육 위치
                        <input type="text" class="addInfo_input" id ="building_name_input" placeholder="본관 앞 마당" style="margin-left:58px; width:11.5vw; height:3.5vh">
                    </div>
                    <div class="add_info_divide">동물 관리 방법
                        <select class="addInfo_input" id="operating_entity_input" style="margin-left:58px; width:11.5vw; height:3.5vh">
                            <option  v-for="animal in animal_care_list" :aria-busy="animal">{{animal}}</option>
                        </select>
                    </div>
                    <div class="add_info_divide">가축 유형
                        <select v-model="detail" class="addInfo_input" id="supplier_drop" style="margin-left:90px; width:11.5vw; height:3.5vh">
                            <option v-for="animal in animal_list" :value="animal">{{animal}}</option>
                        </select>
                    </div>
                    <div class="add_info_divide" >사육두수
                        <input class="addInfo_input" id="usage_input" placeholder="12" style="margin-left:95px; width:8vw; height:3.5vh">
                        <select class="addInfo_input" id="power_usage_drop" style="width:3.5vw; height:3.5vh">
                            <option value="0">마리</option>
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
    #add_info_regi_btn{
            margin-top:6vh;
            background:#3DC984;
            border: none;
            color: #ffffff;
            margin-left: 35vw;
            margin-bottom: 20px;
    }
    #add_info_regi_btn:hover{
        background:#2cb570;
    }   
</style>

<script>
import { useStore } from "vuex"
import {computed ,ref} from "vue"
import axios from "axios";

    export default {
        name :"power_usage",
        setup(){
            var detail = ref('젖소-육성우')
            const store = useStore()
            var selected = computed(()=>store.state.selected_row);
            
            var animal_list = [
                    '젖소-육성우',
                    '젖소-착유우',
                    '한육우-송아지',
                    '한육우-번식우',
                    '한육우-비육우',
                    '돼지',
                    '닭-산란계',
                    '닭-육계',
                    '닭-기타 닭',
                    '면양',
                    '산양',
                    '말',
                    '칠면조',
                    '오리',
                    '사슴',
                    '토끼',
                    '거위'
                ]
            var animal_care_list = [
                '혐기성 늪',
                '액체/슬러리',
                '고체 저장',
                '건조 부지',
                '목장/방목',
                '일일 살포',
                '소화조',
                '연료로 사용'
            ]
            //
            async function click_edit_btn(){
                var info_list={
                    Type:"5",
                    DetailType:"",
                    StartDate:"",
                    EndDate:"",
                    Location:"",
                    scope:1,
                    data:"",
                    emissions:"",
                    Carbonunit:"마리",
                    CarbonActivity:"",
                    kind:"",
                    Division:{동물사육위치:""},
                }
                var usage_input = document.getElementById('usage_input').value
                info_list.CarbonActivity = document.getElementById('carbon_emissions_content_animal').value
                info_list.data = document.getElementById('usage_input').value+"/"+"마리"
                info_list.emissions= usage_input+4
                info_list.StartDate = document.getElementById('start_data').value+'-01'
                info_list.EndDate = document.getElementById('end_data').value+'-01'

                if ( detail == '젖소-육성우' || '젖소-착유우'){
                    info_list.DetailType = '젖소'
                    if( detail == '젖소-착유우' ) {
                        info_list.kind = '착유우'
                    }
                    info_list.kind = '육성우'
                }
                else if ( detail == '한육우-송아지' || '한육우-번식우' || '한육우-비육우'){
                    info_list.DetailType = '한육우'
                    if( detail == '한육우-송아지' ) {
                        info_list.kind = '송아지'
                    }
                    else if ( detail == '번식우'){
                        info_list.kind = '번식우'
                    }
                    info_list.kind="비육우"
                }
                else if ( detail = "닭-산란계" || "닭-육계" || "닭-기타닭"){
                    if( detail == '닭-산란계' ) {
                        info_list.kind = '산란계'
                    }
                    else if ( detail == '닭-육계'){
                        info_list.kind = '육계'
                    }
                    info_list.kind="기타닭"
                } // 가축 유형
        

                var plz = {
                        "CarbonData": {
                            "StartDate":document.getElementById('start_data').value+'-01',
                            "EndDate":document.getElementById('end_data').value+'-01',
                            "Location": "",
                            "Scope":  Number(info_list.scope),
                            "CarbonActivity": document.getElementById('carbon_emissions_content_animal').value,
                            "CarbonUnit": "마리",
                            "usage": usage_input+"/"+unit_s,
                            "Chief": null
                        },
                        "DetailType":"대학동물",
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
                    
                }
                else if(table.value == 'table'){
                    store.commit("SetTableContent",info_list);
                    store.commit('DelTableContent',selected.value);
                }
                store.commit("SetEditDelet");
                location.reload();//수정 API 연결
            }
            
            
            function click_del_editPopup(){
                console.log('수정창 닫기')
                store.commit("SetEditDelet");
            }
            return{animal_list,animal_care_list,click_edit_btn,click_del_editPopup}
        },
        mounted(){
        }
    }
</script>