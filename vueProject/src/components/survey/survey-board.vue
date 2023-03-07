<template>
    <div>
        <div>
            <div class = "info_board" id= survey_board >
                <!-- 서베이 설정하기 -->
                <div style="font-size: 24px; color:black; font-weight: bolder;">새로운 서베이</div>
            </div>
            <!-- 탄소 배출 내용 테이블 -->
            <div>
                <div class="info_board" id="survey_board_bottom"> 
                    <div style="color:black; font-size:20px; font-weight: bolder;">서베이 설정하기</div>
                    <p style = "margin-top: 0px; color:#767676;">Scope3 측정을 위한 새로운 서베이를 설정 하세요</p>

                    <div class="add_info_divide" id = "survey_content" style="margin-top:20px;">서베이 종류
                        <select class="addInfo_input" id="operating_entity_input" >
                            <option value="0">출장을 위한 서베이</option>
                        </select>
                    </div>
                    <div class="add_info_divide" id = "survey_content">서베이 주기
                        <select class="addInfo_input" id="operating_entity_input">
                            <option value="0">1회성</option>
                        </select>
                    </div>
                    <div class="add_info_divide" id = "survey_content">서베이 응답 기간
                        <select class="addInfo_input" id="operating_entity_input" style="margin-left:4%">
                            <option value="0">한국전력공사</option>
                            <option value="1">직접 입력</option>
                        </select>
                    </div>
                    <div class="add_info_divide" id = "survey_content">수령인
                        <select class="addInfo_input" id="operating_entity_input" style="margin-left:9%">
                            <option value="0">경영학과 이정민 외 3명</option>
                        </select>
                    </div>
                    <div style="margin-left: 36%;">
                        <button class="input2_regi_btn" id="input2-register-btn" style="margin-top:10%">등록하기</button>
                        <button class="input2_regi_btn" id="input2-cancle-btn">취소하기</button>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<style>
    #survey_board{
        box-shadow: 0px 0px 0px #d5d5d5, 0px 0px 0px #d5d5d5;
        border: 0px;
    }
    #survey_board_bottom{
        margin-top: 2px;
        box-shadow: 0px 0px 0px #d5d5d5, 0px 0px 0px #d5d5d5;
        border: 0px;
    }
    #survey_content{
        font-size: 16px;
        margin-top:5%;
    }

</style>


<script>
    export default {
        name :"survey_board",
        components:{
            

        }
    }
</script>