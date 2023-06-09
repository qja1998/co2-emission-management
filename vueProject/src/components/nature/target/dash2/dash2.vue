<template>
    <div> 
        <div class="title-border">카테고리별 탄소 감축 방안</div>
        <div class="frame" id="target_dash2_content">
            <div id="method-box">
                <img :src="methodImg">
                <div id= "method-box-title">{{methodCategory}}</div>
                <div id= "method-box-content" v-for="method in methodContent">{{method}}
                </div>
            </div>
            <div id="method-select-box">
                <img  v-for="cate in methodOfCategory" :src="cate.img" @click="clickMethod(cate)">
                
            </div>
        </div>
    </div>
        

</template>

<script>
import {ref} from 'vue'
    export default {
        name :"target_dash2",
        components:{
        
        },
        setup(){
            var methodOfCategory = [
                {
                    name: '고정연소', 
                    content: [
                        '▶ 대체 원료 사용',
                        '▶ 수송 단계에서의 저감',
                        '▶ 연료, 전기 사용량 절감 및 효율화',
                        '▶ 동종 제품군 대비 전력 효율이 높은 제품 제조',
                        '▶ 동종 제품 대비 재사용, 재활용이 용이한 제품 제조',
                        '▶ 동종 제품 대비 사용 수명이 긴 제품 제조',
                        '▶ 클링커 일부를 혼합재로 대체(클링커 생산을 위해 화석연료 연소 필요)',
                        '▶ 바이오 매스를 활용한 바이오 납사 활용',
                        '▶ 납사 대신 탄소와 수소를 직접 결합한 화합 물질을 활용',
                        '▶ 자원 순환을 통한 폐플라스틱의 원료 활용 확대',
                        '▶ 화석연료 사용기기 전력화',
                        '▶ 농축수산 시설에서 사용되는 화석연료를 저탄소 에너지원으로 전환',
                    ],
                    img: require('@/assets/previewDetail/1.png')
                },
                {
                    name: '이동연소', 
                    content: [
                        '▶ 전기, 수소차 등 온실가스를 배출하지 않는 무공해차로 전환하고 차량 수명이 남은 최소한의 내연기관차만 운행',
                        '▶ 전기, 수소차의 비중을 높이되 현재와 같이 여전히 내연기관차도 일부 운행(단, 내연기관차는 e-fuel 등 대체 연료를 사용한다는 전제조건에 기반)',
                        '▶ 대중교통 및 자전거, 킥보드 등 개인 모빌리티의 이용 확대, 화물 운송 수단의 전환(도로 → 철도, 해운), 공유 차량 이용 확대 등으로 승용차 통행량 감소',
                        '▶ 내연기관차를 수소, 전기차 등 무공해차로 전환',
                        '▶ 자동차 탄소 포인트제, 친환경 운전 활성화 등 에너지 절감',
                        '▶ 친환경 선박(LNG/하이브리드 선박) 보급 및 운항 최적화 등 해운 에너지 효율 개선',
                        '▶ 항공기 운영 효율 개선',
                        '▶ 어선에서 사용되는 화석연료를 저탄소 에너지원으로 전환'
                    ],
                    img:require('@/assets/previewDetail/2.png')
                },
                {
                    name: '탈루배출', 
                    content: [
                        '▶ 냉난방 환기, 조명, 급탕 등에 센서 및 계측 장비 설치',
                        '▶ 불소계 온실가스를 대체가스 및 친환경 냉매로 전환',
                    ], 
                    img:require('@/assets/previewDetail/3.png')
                },
                {
                    name: '폐기물 처리시설', 
                    content: [
                        '▶ 일회용품 사용제한, 음식물 쓰레기 감축, 재생원료 사용 의무화 등 폐기물 감량 및 재활용 → 폐기물 소각과 매립량 최소화',
                        '▶ 바이오매스 기반 바이오 플라스틱 소재 개발 및 제도 개선 → 플라스틱 대체',
                        '▶ 매립지 및 생물학적 처리 시설에서 발생하는 메탄을 회수하여 메탄가스 발전 및 메탄가스 연료 대체 사용 등 재생에너지로 활용',
                        '▶ 메탄가스 회수가 어려운 매립지의 경우 침출수 배수 시스템 등으로 매립지를 준호기성 상태로 유지하여 메탄 발생을 최소화',
                        '▶ 저메탄, 저단백질 사료 보급 확대',
                    ], 
                    img:require('@/assets/previewDetail/4.png')
                },
                {
                    name: '비료사용', 
                    content: [
                        '▶ 화학비료 저감',
                        '▶ 친환경 농법 시행 확대 등 영농법 개선',
                    ], 
                    img:require('@/assets/previewDetail/5.png')
                },
                {
                    name: '산림에의한흡수', 
                    content: [
                        '▶ 산림 순환 경영 강화, 신규 조림 확대, 생태 복원 사업, 산불 등의 재해를 예방하고 피해 최소화',
                        '▶ 수확한 목재 이용 확대를 위해 공공 건축물 등에 활용',
                        '▶ 연안습지(염습지, 해초대), 바다숲, 갯벌 등을 신규 조성함으로써 해양의 온실가스 흡수량 확대',
                        '▶ 댐 유역 홍수 조절 기능을 하고 있는 홍수터에 생태 복원 및 생태 마을 조성',
                    ], 
                    img:require('@/assets/previewDetail/7.png')
                },
                {
                    name: '전력', 
                    content: [
                        '▶ 재생에너지 확대(태양광, 풍력 등)',
                        '▶ 조명, 가전 등 고효율기기 보급 및 에너지 효율 기준 강화',
                        '▶ 에너지 소비를 최소화하는 제로에너지 건축',
                        '▶ 노후 건축물의 에너지 효율을 향상시키는 그린 리모델링 확대',
                    ], 
                    img:require('@/assets/previewDetail/8.png')
                },
                {
                    name: '열', 
                    content: [
                        '▶ 석회석 대신 CaO를 함유한 산업 부산물 활용(석회석을 열적으로 분해할 때 탄소 발생)',
                        '▶ 열원을 재생 에너지 전력으로 전환',
                        '▶ 열손실 감소 기술을 적용하여 에너지 효율화',
                    ],  
                    img:require('@/assets/previewDetail/9.png')
                }
            ]

            var methodCategory = ref('고정연소')
            var methodContent = ref(methodOfCategory[0].content)
            var methodImg = ref(require('@/assets/previewDetail/1.png'))

            function clickMethod(cate){
                this.methodCategory = cate.name
                this.methodContent = cate.content
                this.methodImg = cate.img
            }
            return{
                methodOfCategory,
                methodCategory,
                methodContent,
                methodImg,
                clickMethod
            }
        }
    }
</script>

<style>
#target_dash2_content{
    height:50vh;
    width:31vw;
}
#method-box{
    padding:3vh 2.5vw; 
    border: 1px solid #d5d5d5; 
    border-radius: 2vh; 
    margin-top:2vh;
    height: 20vh;
    overflow: auto;
}
#method-box > img {
    height:4vh; 
    float:left; 
    background: #ECECEC; 
    padding:1vh; 
    border-radius: 50%;
}
#method-box-title{
    display:inline-block; 
    font-size:1.3rem; 
    font-weight: bold; 
    margin-left:1vw; 
    height:5vh; 
    line-height: 5vh;
}
#method-box-content{
    padding:1vh; 
    font-size:1.8vh; 
    margin-top:2vh
}
#method-select-box{
    padding:0vh 2vw; 
    margin-top:3vh; 
    height: 16vh;
    overflow: auto;
}
#method-select-box  img {
    height:5vh; 
    margin-bottom: 2vh; 
    margin-left:1.5vw;
    margin-right:1.5vw; 
    background: #ECECEC; 
    padding:1vh; 
    border-radius: 50%;
}
#method-select-box  img:hover{
    cursor: pointer;
}
</style>


