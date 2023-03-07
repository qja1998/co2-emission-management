<template>
<div class="group-preview">
    <button class="close-preview" @click="Offpreview">X</button>
    <div class="preview-text-title">preview</div>
    <div class="select-preview">
        <div class="select-preview-item" @click="OnTotalPreview">탄소 배출량</div>
        <div class="select-preview-item" @click="OnDetailPreview">탄소 배출량 상세</div>
        <div class="select-preview-item" @click="OnInfoPreview">정보</div>
    </div>
    <div class="preview-text-groupname">{{GroupName}} 탄소 배출량</div>
    <div class="preview-text-totalEmission">{{scope12CarbonEmission+scope3CarbonEmission}}KG</div>

    <div class="preview-emission-list">
        <div>전체 대비 탄소 배출량 비율</div>
        <progress class="preview-TotalEmission-ratio" value="100" max="100"></progress>
        
        <div style="margin-top:4vh">{{scope12CarbonEmission}}kg</div>
        <progress class="preview-scope-ratio" :value="scope12CarbonEmission" :max="scope12CarbonEmission+scope3CarbonEmission"></progress>
        <div>{{scope3CarbonEmission}}kg</div>
        <progress class="preview-scope-ratio" :value="scope3CarbonEmission" :max="scope12CarbonEmission+scope3CarbonEmission"></progress>
    </div>        

    <div class="preview-move-button">
        <button class="move-PreviewToEditEmission"   onclick="location.href='/measure';">탄소 배출 입력하기</button>
        <button class="move-PreviewToEditEmission" onclick="location.href='/insight';">리포트 이동하기</button>
    </div>
</div>
</template>

<style>
.group-preview{
    height: 100%;
    width: 456px;
    background-color: rgb(255, 255, 255);
    border-color:rgba(228, 228, 228, 0.26) ;
    border-style: groove  ;
}
.close-preview{
    float: right;
    margin: 15px;
}
.preview-text-title{
    font-size:24px;
    font-weight:550;
    margin-left:4vw;
    margin-top:5vh;
}
.preview-text-groupname{
    font-size:22px;
    font-weight:550;
    margin-left:4vw;
    margin-top:10vh;
}
.preview-text-totalEmission{
    font-size:24px;
    font-weight:550;
    margin-left:4vw;
    margin-top:1.5vh;
    color: #3DC984;
}
.preview-emission-list{
    position: absolute;
    left: 53%;
    top: 30%;
    transform: translateX(-50%);
    width: 75%;
    max-height: 67vh;
    font-size: 18px;
}
.select-preview{
    background-color: #F0F2F5;
    display: flex;
    width: 70%;
    height: 4%;
    position: absolute;
    left: 50%;
    top: 10%;
    transform: translateX(-50%);  
    justify-content: center;
    font-weight: 700;
    border-radius:12px ;
}
.select-preview-item{
    margin:3px ;
    padding:6px;
    color:rgba(0, 0, 0, 0.5);
    
}
.select-preview-item:hover{
    padding:6px;
    background-color:white ;
    color:#3DC984;
    border-radius: 10px;
}
.move-PreviewToEditEmission{
    
    margin:2vh;
    width: 167px;
    height: 61px;
    background: #3DC984;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    font-size: 13px;
    color: #FFFFFF;
}
.preview-move-button{
    display: flex;
    flex-direction: row;
    justify-content: center;
    text-align: center;
    position: absolute;
    left: 50%;
    bottom: 7%;
    transform: translateX(-50%);  
}
.preview-TotalEmission-ratio{
    width: 320px;
    height: 16px;
    background: rgba(217, 217, 217, 0.5);
    border-radius: 40px;
}
.preview-scope-ratio{
    width: 320px;
    height: 16px;
    border-radius: 20px;
    background: #D9D9D9;
}
/* 프로그래스바 옵션 */
progress::-webkit-progress-bar {
    border: 0;
    border-radius: 20px;
    background-color: #D9D9D9;
}
progress::-webkit-progress-value {
    border: 0;
    border-radius: 20px;
    background-color: #3DC984;
}
</style>

<script>
import { computed,ref } from "vue";
import { useStore } from "vuex";
import axios from "axios";
export default{ 
    name:'',
    components:{},
    setup(){
        const store = useStore(); //vuex 사용
        const Offpreview = () => store.commit("OffGroupPreview", );
        const OnTotalPreview = () => store.commit("OnGroupPreview", "total");
        const OnDetailPreview = () => store.commit("OnGroupPreview", "detail");
        const OnInfoPreview = () => store.commit("OnGroupPreview", "info");
        var today = new Date();
        var year = today.getFullYear()

        var GroupName =ref("") 
        GroupName= computed(() => store.state.group_tree_selected_company);

        var scope12CarbonEmission = ref(1);
        var scope3CarbonEmission = ref(7);
        var month = computed(() => store.state.insight_month+1);
        var config = {
            headers:{
            "Authorization":"Bearer"+" "+store.state.accessToken
            
            }
        }
        async function get_total_emission(){
            await axios.get("Company/Preview/"+store.state.group_tree_selected_company+"/"+year+"-01-01/"+year+"-12-31",config).then(res => {
                console.log(res.data) 
                scope12CarbonEmission.value = res.data.Scopes[0]+res.data.Scopes[1]
                scope3CarbonEmission.value = res.data.Scopes[2]
            })
            .catch(error => {
                
                console.log(error)
                
            })
            .finally(() => {
            })
        }
        

        var TotalEmission = ref(scope3CarbonEmission.value + scope12CarbonEmission.value)

        return{Offpreview,GroupName,TotalEmission,scope12CarbonEmission,scope3CarbonEmission,
            OnTotalPreview,OnDetailPreview,OnInfoPreview,get_total_emission}
    },
    created(){
        this.get_total_emission()
    },
    mounted(){},
    unmounted(){},
    methods:{}
}
</script>