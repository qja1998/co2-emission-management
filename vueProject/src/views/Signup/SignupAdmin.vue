<template>
    <div style="padding:10vh 40vh; background:#ffffff; height:80vh">
        <div>
            <h1 class="login" id="title_signup">탄소 중립 지원 플랫폼</h1>
        </div>
        <div style="margin-top:11vh;" >
            <img class = "icon_direct" src = "@/assets/direct.png">
            <span class = "title_info_signup">
                가입회사 정보
            </span>
            <div style="padding:1vw 2vw">
                <div class="input_content_signgup">
                    <span class="input_content_signgup_text">회사명</span>
                    <input  class="input_content_signgup_input" style="margin-left:5.8vw"/>
                    <span class="input_content_signgup_text" style="margin-left:3.9vw" >대표자</span>
                    <input class="input_content_signgup_input" style="margin-left:3.9vw"/>
                </div>
                <div class="input_content_signgup">
                    <span class="input_content_signgup_text" >사업자 등록번호</span>
                    <input  class="input_content_signgup_input" id="input_content_signgup_inputnum" style="margin-left:1.8vw"/>
                    <span class = "bar">-</span>
                    <input  class="input_content_signgup_input" id="input_content_signgup_inputnum"/>
                    <span class = "bar">-</span>
                    <input  class="input_content_signgup_input" id="input_content_signgup_inputnum"/>

                    <span class="input_content_signgup_text" style="margin-left:4vw">업태 / 종목</span>
                    <input  class="input_content_signgup_input" id="input_content_signgup_inputKind"/>
                    <span style="font-size:2.5vh">/</span>
                    <input  class="input_content_signgup_input" id="input_content_signgup_inputKind" style="margin-left:0.3vw"/>
                </div>
                <div class="input_content_signgup">
                    <span class="input_content_signgup_text">설립일자</span>
                    <input  class="input_content_signgup_input" style="margin-left:4.9vw; width: 43.3vw"/>
                </div>
                <div class="input_content_signgup">
                    <span class="input_content_signgup_text">주소</span>
                    <input  class="input_content_signgup_input" style="margin-left:6.75vw; width: 43.3vw"/>
                </div>
            </div>
            
        </div>
        <div style="margin-top:3vh;">
            <img class = "icon_direct" src = "@/assets/direct.png">
            <span class = "title_info_signup">
                세금계산서 수령 정보
            </span><br>
            <div style="padding:2vw 2vw">
                <span class="input_content_signgup_text">세금계산서 수령 정보</span>
                <label><input class="radio_btn" type="radio" name="methodRegist" value="0" checked v-model="input_regi">회사정보와 동일</label>
                <label><input class="radio_btn" type="radio" name="methodRegist" value="1" v-model="input_regi">직접 입력</label>
                <label><input class="radio_btn" type="radio" name="methodRegist" value="2" v-model="input_regi">수령하지 않음(사업장등록증 없는 경우)</label>
            </div>
        </div>
        <div style="margin-top:3vh;">
            <img class = "icon_direct" src = "@/assets/direct.png">
            <span class = "title_info_signup">
                업종
            </span>
            <select class="drop_kind">
                <option v-for="kind in category" :value="kind">{{kind}}</option>
            </select>
        </div>

        <button style="width:60px; height:60px; border-radius:10vh; border:none; float:right" src = "@/assets/direct.png" onclick="location.href='/signup/idinfo';">></button>
    </div>
</template>

<style>
    #title_signup{
        text-align: center;
        
    }
    .icon_direct{
        width:3vh;
        height:3vh;
        float:left;
        margin-right:1vw;
    }
    .title_info_signup{
        font-size : 2.2vh;
        color:black;
        vertical-align: middle;
        font-weight: 900;
    }
    .input_content_signgup{
        margin-top:1.5vh
    }
    .input_content_signgup_text{
        font-size:1.8vh;
        width:20vw;
        color:black
    }
    .input_content_signgup_input{
        margin-left:2vw;
        height:4vh;
        width: 16vw;
        border: 1px solid #DDE2E5;
        border-radius: 0.8vh;

    }
    .bar{
        font-size:2.5vh;
        margin:0 0.3vw
    }
    .drop_kind{
        margin-left:5.3vw;
        height:4vh;
        width: 16vw;
        border: 1px solid #DDE2E5;
        border-radius: 0.8vh;
        background:rgba(239, 241, 249, 0.6);
    }
    #input_content_signgup_inputKind{
        margin-right:0.3vw;
        width:7.2vw
    }
    #input_content_signgup_inputnum{
        width:4.3vw;
        margin-left:0vw
    }
</style>
<script>
export default {
    setup(){
        var category = [
            "농업",
            "임업",
            "어업",
            "석탄,원유 및 천연가스 광업",
            "금속 광업",
            "비금속광물 광업; 연료용 제외",
            "광업 지원 서비스업",
            "식료품 제조업",
            "음료 제조업",
            "담배 제조업",
            "섬유제품 제조업;의복제외",
            "의복,의복 액세서리 및 모피제품 제조업",
            "가죽, 가방 및 신발 제조업",
            "목재 및 나무제품 제조업; 가구 제외",
            "펄프, 종이 및 종이제품 제조업",
            "인쇄 및 기록매체 복제업",
            "코크스, 연탄 및 석유정제품 제조업",
            "화학 물질 및 화학제품 제조업; 의약품 제외",
            "의료용 물질및 의약품 제조업",
            "의료용 물질 및 의약품 제조업",
            "고무 및 플라스틱제품 제조업",
            "비금속 광물제품 제조업",
            "1차 금속 제조업",
            "금속 가공제품 제조업; 기계 및 가구 제외",
            "전자 부품, 컴퓨터, 영상, 음향 및 통신장비 제조업",
            "의료, 정밀, 광학 기기 및 시계 제조업",
            "전기장비 제조업",
            "기타 기계 및 장비 제조업",
            "자동차 트레일러 제조업",
            "기타 운송장비 제조업",
            "가구 제조업",
            "기타 제품 제조업",
            "산업용 기계 및 장비 수리업",
            "전기, 가스, 증기 및 공기 조절 공급업",
            "수도업",
            "하수, 폐수 및 분뇨 처리업",
            "폐기물 수집 ,운방, 처리 및 원료 재생업",
            "환경 정화 및 복원업",
            "종합 건설업",
            "전문직별 공사업",
            "자동차 및 부품 판매업",
            "도매 및 상품 중개업",
            "소매업; 자동차 제외",
            "육상 운송 및 파이프라인 운송업",
            "수상 운송업",
            "항공 운송업",
            "창고 및 운송관련 서비스업",
            "숙박업",
            "음식점 및 주점업",
            "출판업",
            "영상.오디오 기록물 제작 및 배급업",
            "방송업",
            "우편 및 통신업",
            "컴퓨터 프로그래밍, 시스템 통합 및 관리업",
            "정보 서비스업",
            "금융업",
            "보험 및 연금업",
            "금융 및 보험관련 서비스업",
            "연구개발업",
            "전문 서비스업",
            "건축 기수르 엔지니어린 및 기타 과학기술 서비스업",
            "기타 전문, 과학 및 기술 서비스업",
            "사업 지원 서비스업",
            "임대업; 부동산 제외",
            "공공행정, 국방 및 사회보장 행정",
            "교육 서비스업",
            "보건업",
            "사회복지 서비스업",
            "창작, 예술 및 여가관련 서비스업",
            "스포츠 및 오락관련 서비스업",
            "협회 및 단체",
            "개인 및 소비용품 수리업",
            "기타 개인 서비스업",
            "가구 내 고용활동",
            "국제 및 외국기관",
            "달리 분류되지 않은 자가 소비를 위한 가구의 재화 및 서비스 생산활동"
        ]
        return{
            category
        }
    }
}
</script>