<!--탄소 배출 내용 입력의 전력 사용 부분 -->
<template>
    <div>
        <div style="margin-top:50px; ">
            탄소 배출 내용<br>
            <input type="text" class="addInfo_input" id="carbon_emissions_content">
        </div> 
        <div style="margin-top:30px">기간 설정
            <input class = "date_btn" id = "start_data" type="month" data-placeholder="시작 날짜" required aria-required="true">
            <input class = "date_btn" id = "end_data" type="month">
        </div>
        <div class="add_info_divide" id="building_name_text" style="margin-top:4vh">건물명 / 배출 시설명
            <input type="text" class="addInfo_input" id ="building_name_input" placeholder="경상대 본관">
        </div>
        <div class="add_info_divide">운영주체
            <select class="addInfo_input" id="operating_entity_input">
                <option value="0">기업 소유 및 운영</option>
                <option value="1">민간 임차</option>
            </select>
            
        </div>
        <div class="add_info_divide">공급처
            <select class="addInfo_input" id="supplier_drop">
                <option value="0">한국전력공사</option>
                <option value="1">직접 입력</option>
            </select>
        </div>
        <div class="add_info_divide" id="building_name_text">법인 등록 번호
            <input type="text" class="addInfo_input" id ="kor_power_num_input1" placeholder="123456">
        </div>
        <div class="add_info_divide" id="building_name_text">고객 번호
            <input type="text" class="addInfo_input" id ="kor_power_num_input2" placeholder="123456">
        </div>
        <p style="margin-top: 10vh; text-align: center; color:#767676; font-size: 1.7vh;">매월 자동으로 전기 사용량을 등록하시겠습니까?</p>
    </div>
</template>

<style>
    #kor_power_num_input1{
        margin-top:3vh;
        width:20%;
        background: #ffffff;
        border: 1px solid #DDE2E5;
        margin-left: 3.3vw;
    }
    #kor_power_num_input2{
        margin-top:3vh;
        width:20%;
        background: #ffffff;
        border: 1px solid #DDE2E5;
        margin-left: 5.2vw;
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

   
</style>

<script>
    export default {
        name :"power_usage_auto",
        data() {
        },
        components:{ 
        },
        methods:{
        
        }
    }
</script>