<!--탄소 배출 내용 입력의 대학 소유 동물 부분 -->
<template>
    <div>
        <div style="color:black;">입력방식
            <label><input class="radio_btn" type="radio" name="methodRegist" value="직접 입력하기" checked>직접 입력하기</label>
            <label><input class="radio_btn" type="radio" name="methodRegist" value="엑셀 등록하기">엑셀 등록하기</label>
        </div>
        <div style="margin-top:50px; ">
            탄소 배출 내용<br>
            <input type="text" class="addInfo_input" id="carbon_emissions_content_animal">
        </div> 
        <div style="margin-top:30px">기간 설정
            <input class = "date_btn" id = "start_data" type="month" data-placeholder="시작 날짜" required aria-required="true">
            <input class = "date_btn" id = "end_data" type="month">
        </div>
        <div style="margin-top:4vh">구분</div>
        <div class="add_info_divide" id="building_name_text" style="margin-top:2vh">동물 사육 위치
            <input type="text" class="addInfo_input" id ="building_name_input" placeholder="본관 앞 마당" style="margin-left:40px">
        </div>
        <div class="add_info_divide">동물 관리 방법
            <select v-model="care" class="addInfo_input" id="operating_entity_input" style="margin-left:40px" v-if="detail=='산란계'||detail=='육계'||detail=='기타닭'||detail=='오리'||detail=='거위'">
                <option  v-for="animal in animal_care_list_with" :value="animal">{{animal}}</option>
            </select>
            <select v-model="care" class="addInfo_input" id="operating_entity_input" style="margin-left:40px" v-else>
                <option  v-for="animal in animal_care_list" :value="animal">{{animal}}</option>
            </select>    
        </div>
        <div class="add_info_divide">가축 유형
            <select v-model="detail" class="addInfo_input" id="supplier_drop" style="margin-left:70px">
                <option v-for="animal in animal_list" :value="animal">{{animal}}</option>
            </select>
        </div>
        <div class="add_info_divide" >사육두수
            <input class="addInfo_input" id="usage_input" placeholder="12">
            <select class="addInfo_input" id="power_usage_drop">
                <option value="0">마리</option>
            </select>
        </div>
        <button class ="input2_regi_btn" id="add_info_regi_btn" @click="click_regi_btn()">상단 정보 등록</button>  

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

    export default {
        name :"power_usage",
        setup(){
            const store = useStore()
            var detail = ref('육성우')
            var care = ref('혐기성늪')
            var animal_list = [
                    '육성우',
                    '착유우',
                    '송아지',
                    '번식우',
                    '비육우',
                    '돼지',
                    '산란계',
                    '육계',
                    '기타닭',
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
                '혐기성늪',
                '액체/슬러지',
                '고체저장',
                '건조부지',
                '목장/방목',
                '일일살포',
                '소화조',
                '연료로사용',
                '기타'
            ]
            var animal_care_list_with = [
                'WithLitter',
                'WithoutLitter'
            ]
            
            function click_regi_btn(){
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

                var usage_input = document.getElementById('usage_input').value //사육두수
                info_list.CarbonActivity = document.getElementById('carbon_emissions_content_animal').value // 탄소 배출 내용
                info_list.data = document.getElementById('usage_input').value+"/마리" 
                info_list.emissions= usage_input+4 // 계산된 탄소 배출량
                info_list.StartDate = document.getElementById('start_data').value+'-01' // 시작날짜
                info_list.EndDate = document.getElementById('end_data').value+'-01' //종료 날짜
                info_list.kind = care.value //동물 관리 방법
                info_list.Division.동물사육위치 = document.getElementById('building_name_input').value // 동물 사육 위치
                info_list.DetailType = detail.value

                console.log(detail.value)
                
                console.log(info_list)
                store.commit("SetTableContent",info_list)
            }
            return{animal_list,animal_care_list,animal_care_list_with,click_regi_btn,detail,care}
        },
        mounted(){
        }
    }
</script>