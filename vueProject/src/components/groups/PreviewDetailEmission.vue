<template>
    <div class="group-preview">
        <button class="close-preview" @click="Offpreview">X</button>
        <div class="preview-text-title">preview</div>
        <div class="select-preview">
            <div class="select-preview-item" @click="OnTotalPreview">탄소 배출량</div>
            <div class="select-preview-item" @click="OnDetailPreview">탄소 배출량 상세</div>
            <div class="select-preview-item" @click="OnInfoPreview">정보</div>
        </div>
        <div class="emission-list">
            <div v-for="item in EmissionList" :key="item.label" class="emission-list-item">
                <img class="emission-list-item-icon" :src="item.iconSrc">{{item.icon}}
                <span class="emission-list-item-lable">{{item.label}}</span>
                <span class="emission-list-item-wight">{{item.weight}} kg</span>
            </div>
        </div>
        <div class="preview-move-button">
            <button class="move-PreviewToEditEmission" onclick="location.href='/measure';">탄소 배출 입력하기</button>
            <button class="move-PreviewToEditEmission"  onclick="location.href='/insight';">리포트 이동하기</button>
        </div>
    </div>
</template>
    
<style>
.emission-list{
    position: absolute;
    left: 50%;
    top: 15%;
    transform: translateX(-50%);
    width: 75%;
    max-height: 67vh;
    overflow: scroll;
}

.emission-list::-webkit-scrollbar{ 
    width: 6px;
}
.emission-list::-webkit-scrollbar-thumb{ 
    background: linear-gradient(#0e7a2eab, #55f74041);
    border-radius: 25px;
}

.emission-list-item{
    margin: 1.8vh;
    height: 50px;
}
.emission-list-item:hover{
    border-radius: 5px;
    background-color:rgba(180, 180, 180, 0.377) ;
}
.emission-list-item-icon{
    float: left;
    width:  44px;
    height: 44px;
}
.emission-list-item-lable{
    float: left;
    color:#615B5B;
    font-weight: 700;
    padding: 14px;
    vertical-align:middle;
}
.emission-list-item-wight{
    float: right;
    font-size: large;
    font-weight: 700;
    padding: 10px;
    vertical-align:middle;
}
</style>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import axios from "axios";
export default{ 
    name:'preview-detail',
    components:{},
    data(){
        return{
            sampleData:''
        };
    },
    setup(){
        const store = useStore(); //vuex 사용
        const Offpreview = () => store.commit("OffGroupPreview", );
        const OnTotalPreview = () => store.commit("OnGroupPreview", "total");
        const OnDetailPreview = () => store.commit("OnGroupPreview", "detail");
        const OnInfoPreview = () => store.commit("OnGroupPreview", "info");
        
        const imgSrc = "~assets/previewDetail/";

        const weigtArr=[1,2,3,4,5,6,7,8,9,10,11,12,13,14];
        var month = computed(() => store.state.insight_month+1);
        async function get_total_emission(){
            await axios.get("Company/Preview/samsung/2023-0"+month.value+"-01/2023-0"+month.value+"-31",config).then(res => {
                store.commit("SetDetailEmission",res.data.EmissionList);
            })
            .catch(error => {
                
                console.log(error)
                
            })
            .finally(() => {
            })
        }

        var datail_emission_arr = computed(() => store.state.detail_emission);
        console.log(Object.values(datail_emission_arr.value[4]))
        var EmissionList =[
                {iconSrc:require('@/assets/previewDetail/1.png'), label:"고정연소",weight:datail_emission_arr.value[0].고정연소},
                {iconSrc:require('@/assets/previewDetail/2.png'), label:"이동연소",weight:datail_emission_arr.value[1].이동연소},
                {iconSrc:require('@/assets/previewDetail/3.png'), label:"탈루배출",weight:datail_emission_arr.value[2].탈루배출},
                {iconSrc:require('@/assets/previewDetail/4.png'), label:"폐기물 처리시설",weight:datail_emission_arr.value[3].폐기물처리시설},
                {iconSrc:require('@/assets/previewDetail/5.png'), label:"비료사용",weight:datail_emission_arr.value[4].비료사용},
                {iconSrc:require('@/assets/previewDetail/6.png'), label:"대학소유동물",weight:datail_emission_arr.value[5].대학소유동물},
                {iconSrc:require('@/assets/previewDetail/7.png'), label:"산림에 의한 흡수",weight:datail_emission_arr.value[6].산림에의한흡수},
                {iconSrc:require('@/assets/previewDetail/8.png'), label:"전력",weight:datail_emission_arr.value[7].전력},
                {iconSrc:require('@/assets/previewDetail/9.png'), label:"스팀(열)",weight:datail_emission_arr.value[8].열},
                {iconSrc:require('@/assets/previewDetail/10.png'), label:"수도",weight:datail_emission_arr.value[9].수도},
                {iconSrc:require('@/assets/previewDetail/11.png'), label:"폐기물",weight:datail_emission_arr.value[10].폐기물},
                {iconSrc:require('@/assets/previewDetail/12.png'), label:"통근/통학",weight:datail_emission_arr.value[11].통근_통학},
                {iconSrc:require('@/assets/previewDetail/13.png'), label:"출장",weight:datail_emission_arr.value[12].출장},
                {iconSrc:require('@/assets/previewDetail/14.png'), label:"위탁운영 차량",weight:datail_emission_arr.value[13].위탁운영차량}
            ]
        return{Offpreview,EmissionList,
            OnTotalPreview,OnDetailPreview,OnInfoPreview,get_total_emission}
    },
    created(){this.get_total_emission()},
    mounted(){},
    unmounted(){},
    methods:{}
}
</script>