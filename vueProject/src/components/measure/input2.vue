<template>
    <div>
        <div class ="body_1">  
            <div>
                <button class="input1_back_btn" onclick="location.href='/measure/input1';" @click="click_cancle_table()"> ◀ </button>
            </div>
            <div class="regi_category">
                <div>
                    <div style="margin-bottom: 20px; font-size: 19px; color:black;">카테고리</div>
                    <!-- 카테고리 보드판 -->
                    <button :class ="{category_select: SearchCategory ,'nonClick_category':SelectCategory}"  @click="clickSearch" id="search" >카테고리별 검색</button>
                    <button :class ="{category_select: SelectCategory, 'nonClick_category':SearchCategory }"  @click="clickSelect" id="select">카테고리명 선택</button><br>
                    <input :class ="{input_category: SearchCategory}" placeholder="카테고리를 검색하세요." v-if="SearchCategory==true"/> 
                    <select :class ="{input_category: SelectCategory}"  v-model="selected_category" mutiple placeholder="카테고리명을 선택하세요." v-if="SelectCategory==true" id="option" @change="clickCategory()">
                        <option v-for="category_name in category_option_list" :value="category_name.index">{{category_name.name}}</option>
                    </select>
                    <div :class="{info_text_category:SearchCategory}"  v-if="SearchCategory==true">카테고리를 선택해주세요.</div>
                    <div :class="{info_text_category:SelectCategory}"  v-if="SelectCategory==true">{{info_text}}</div>
                </div>
            </div>
            <div>
                
                <div class = "info_board">
                    <!-- 추가 정보 입력하기 상단 -->
                    <div style="font-size: 20px; color:black;">추가정보 입력하기
                        <button class="input1_back_btn" id="drop_btn" @click="clickInfoDrop()" v-if ="info_board_defalt==true">▼</button>
                        <button class="input1_back_btn" id="drop_btn" @click="clickInfoDrop()"  v-if ="info_board_defalt==false">▲</button>
                    </div>
                </div>
                <!-- 추가 정보 입력하기 내용  -->
                <div v-if="SelectCategory==true">
                    <div :class="{add_regi_page: info_board_defalt}" v-if="info_board_defalt==false && selected_category!=''" >
                        <div class="info_board" id="add_info"><br>
                            <!-- '구분'에서 카테고리별 상세 내용 -->
                            <power_usageVue class="power_usage_page" v-if = "selected_category==1"></power_usageVue>
                            <steam_usageVue class="steam_usage_page" v-else-if = "selected_category==2"></steam_usageVue>
                            <Water_useageVue class="water_usage_page" v-else-if = "selected_category==3"></Water_useageVue>
                            <Waste_usageVue class="wast_usage_page" v-else-if = "selected_category==4"></Waste_usageVue>
                            <Stationary_combustionVue class="stationary_combustion_page" v-else-if = "selected_category==5"></Stationary_combustionVue>
                            <Mobile_combustionVue class="mobile_combustion_page" v-else-if = "selected_category==6"></Mobile_combustionVue>
                            <Fugitive_emissionsVue class="fugitive_emissions_page" v-else-if = "selected_category==7"></Fugitive_emissionsVue>
                            <Fertilizer_useVue class="fertilizer_use_page" v-else-if = "selected_category==8"></Fertilizer_useVue>
                            <Animal_possessionVue class="animal_possession_page" v-else-if = "selected_category==9"></Animal_possessionVue>
                            <Forest_absorptionVue class="forest_absorptionVue_page" v-else-if = "selected_category==10"></Forest_absorptionVue>
                            <Waste_disposalFillingVue class="forest_absorptionVue_page" v-else-if = "selected_category==11"></Waste_disposalFillingVue>
                            <Waste_disposalIncinerationVue class="forest_absorptionVue_page" v-else-if = "selected_category==12"></Waste_disposalIncinerationVue>
                            <Waste_disposalSewage_treatmentVue class="forest_absorptionVue_page" v-else-if = "selected_category==13"></Waste_disposalSewage_treatmentVue>
                            <Waste_disposalBiologicalVue class="forest_absorptionVue_page" v-else-if = "selected_category==14"></Waste_disposalBiologicalVue>
                            <Waste_disposalWastewaterVue class="forest_absorptionVue_page" v-else-if = "selected_category==15"></Waste_disposalWastewaterVue>
                        </div> 
                    </div>
                </div>
                
                <!-- 탄소 배출 내용 테이블 -->
                <div class="info_board" id="info_board_bottom">
                        <measuretable class="m_table" ></measuretable>
                </div>
            </div>
            <!-- 등록/ 취소 버튼쓰 -->
            <div style="margin-left: 36%;">
                <button class="input2_regi_btn" id="input2-register-btn"  @click="click_register_table()">등록하기</button>
                <button class="input2_regi_btn" id="input2-cancle-btn" onclick="location.href='/measure/input1';" @click="click_cancle_table()">취소하기</button>
            </div>
        </div>
    </div>
</template>

<style>
    .regi_category{
        margin-top: 30px;
        padding: 25px;
        background-color: #ffffff;
        border-radius: 5px;
        height: auto;
        box-shadow: 0px 3px 10px #d5d5d5, 0px 2px 2px #d5d5d5;
    }
    .info_text_category{
        font-size: 12px;
        font-weight: 600;
        margin-top: 10px;
        color: #3DC984
    }
    #option{
        height: 34px;
        width: 80.3%;
    }
    .info_board{
        margin-top: 30px;
        padding: 30px;
        background-color: #ffffff;
        border-radius: 5px;
        box-shadow: 0px 3px 10px #d5d5d5, 0px 2px 2px #d5d5d5;
        border: 1px solid #d5d5d5;
        height: inherit;
        color:black;
    }
    #info_board_bottom{
        padding-left: 40px;
        padding-right: 40px;
        padding-bottom: 60px;
        margin-top: 0px;
        border: 0px;
    }
    #btn_del_input2{
        margin-top:0px;
        margin-left:0px
    }
    #btn_edit_input2{
        margin-top:0px
    }
    #drop_btn{
        float: right;
        width: 4.1vh;
        height: 4.1vh;
        vertical-align: middle;
    }
    .input2_regi_btn{
        margin-top:4vh;
        background:#ffffff;
        border: 0.3vh solid #d5d5d5;
        border-radius: 1vh;
        height: 45px;
        width: 8vw;
        margin-left: 2.5vw;
        font-size: 14px;
    }
    .table_not{
        text-align: center; 
        width:inherit; 
        border: 1px solid rgba(206, 206, 206, 0.5); 
        border-radius: 7px; 
        margin-top: 15px; 
        height: 350px;
    }
    .input2_regi_btn:hover{
        background:  #f0f0f0;
    }
    #input2-register-btn{
        background:#3DC984;
        border: none;
        color: #ffffff;
    }
    #input2-register-btn:hover{
        background:#2cb570;
    }
    .add_regi_page{
        padding-left: 50px;
        padding-right: 40px;
        padding-bottom: 60px;
        margin-top: 0px;
        border: 0px;
    }
    #add_info_regi_btn{
        margin-top:2vh;
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
<style : scoped>
    .category_select{
        border-radius: 5px;
        border: none;
        height: 32px;
        width: 110px;
        background-color:#3DC984; 
        font-size: 12px;
        color: #ffffff;
    }
    .nonClick_category{
        border-radius: 5px;
        border: 1px solid #d5d5d5;
        height: 32px;
        width: 110px;
        background-color: #ffffff; 
        font-size: 12px;
    }
    #select{
        margin-left: 10px;
    }
    .input_category{
        background-color: #ffffff; 
        border-radius: 5px;
        border: 1px solid #E9E9E9;
        width: 80%;
        height: 30px;
        margin-top:10px
    }
    .input_category:focus{
        outline: none;
    }
 

    
</style>
<script>
import measuretable from "@/components/measure/MeasuretableA.vue"
import power_usageVue from './Divide-carbon/Power_usage.vue';
import steam_usageVue from './Divide-carbon/Steam_usage.vue';
import Water_useageVue from './Divide-carbon/Water_useage.vue';
import Waste_usageVue from './Divide-carbon/Waste_usage.vue';
import Stationary_combustionVue from './Divide-carbon/Stationary_combustion.vue';
import Mobile_combustionVue from './Divide-carbon/Mobile_combustion.vue';
import Fugitive_emissionsVue from './Divide-carbon/Fugitive_emissions.vue';
import Fertilizer_useVue from './Divide-carbon/Fertilizer_use.vue';
import Animal_possessionVue from './Divide-carbon/Animal_possession.vue';
import Forest_absorptionVue from './Divide-carbon/Forest_absorption.vue';
import Waste_disposalFillingVue from './Divide-carbon/Waste_disposal(filling).vue';
import Waste_disposalIncinerationVue from './Divide-carbon/Waste_disposal(incineration).vue';
import Waste_disposalSewage_treatmentVue from './Divide-carbon/Waste_disposal(sewage_treatment).vue';
import Waste_disposalBiologicalVue from './Divide-carbon/Waste_disposal(biological).vue';
import Waste_disposalWastewaterVue from './Divide-carbon/Waste_disposal(Wastewater).vue';
import { computed , ref} from 'vue';
import { useStore } from 'vuex'
import axios from "axios";
import { useRouter } from "vue-router";

    export default { 
        name :"input2",
        
        setup(){
            const router = useRouter();
            const store = useStore()
            var SearchCategory = ref(true)
            var SelectCategory = ref(false)
            var selected_category = ref('')
            var showCategory = ref('null')
            var info_board_defalt = ref(true)
            var group_name = computed(() => store.state.group_name)

            var category_option_list = ref([
                    {index:"1", name:"전력 사용"},
                    {index:"2", name:"열(스팀) 사용"},
                    {index:"3", name:"수도 사용"},
                    {index:"4", name:"폐기물"},
                    {index:"5", name:"고정연소"},
                    {index:"6", name:"이동 연소"},
                    {index:"7", name:"탈루 사용"},
                    {index:"8", name:"비료 사용"},
                    {index:"9", name:"대학 소유 동물"},
                    {index:"10", name:"산림에 의한 흡수"},
                    {index:"11",name:"폐기물 처리시설(매립)"},
                    {index:"12", name:"폐기물 처리시설(소각)"},
                    {index:"13", name: "폐기물 처리시설(하수처리)"},
                    {index:"14", name: "폐기물 처리시설(생물학적처리)"},
                    {index:"15", name: "폐기물 처리시설(폐수처리)"},
            ])
            var info_text = ref("고정연소란?고정연소:  보일러, 버너, 터빈, 히터, 소각로, 엔진, flare 등과 같은 고정된 장비들을 사용하여 전력, 스팀, 열 또는 동력을 생산하는데 사용되는 연료의 연소로부터 발생하는 배출")
            function clickSearch(){
                SearchCategory.value = true,
                SelectCategory.value = false,
                info_board_defalt.value = true
            }
            function clickSelect(){
                SearchCategory.value = false,
                SelectCategory.value = true
            }
            function clickCategory(){
                console.log("ddd")
                //info_board_defalt.value = false
            }
            function clickInfoDrop(){
                info_board_defalt.value =!this.info_board_defalt
            }
           
            function click_register_table(){
                console.log("등록되었습니다")
                router.push("/measure/input1")
                var table = computed(()=> store.state.table)
                var config = {
                    headers:{
                    "Authorization":"Bearer"+" "+store.state.accessToken
                    }
                }
                for(var row in table.value){
                    const data = (table.value[row])
                    console.log("row = "+JSON.stringify(data))

                    var input_data = {
                        "CarbonData": {
                            "StartDate":(data.StartDate),
                            "EndDate":(data.EndDate),
                            "Location": (data.Location),
                            "Scope":  (data.scope),
                            "CarbonActivity": (data.CarbonActivity),
                            "CarbonUnit": (data.Carbonunit),
                            "usage": (data.data), //carbon data
                            "nums":0,
                            "Chief": "jeong",
                            "kind" :(data.kind),
                            "Division":{},
                            "R":0,
                            "Fert":0,
                            "BODIN":0,
                            "BODOUT":0,
                            "TNIN":0,
                            "TNOUT":0,
                            "CODIN":0,
                            "CODOUT":0,
                            "ProcessType":"",
                            "ProcessKind":""
                        },
                        "DetailType":data.DetailType,
                        //"RootCom":"samsung",
                        //"BelongCom":"",
                        "Type":store.state.CarbonCategories[Number(data.Type)]
                    }
                    
                    if(Number(data.Type)==4){
                        input_data.CarbonData.Fert = Number(data.Fert)
                    }
                    else if(Number(data.Type)==2){
                        input_data.CarbonData.nums = Number(data.nums)
                    }
                    else if(Number(data.Type)>=15 && Number(data.Type)<=18){
                        input_data.CarbonData.R = Number(data.R)
                        if(Number(data.Type)==16){
                            input_data.CarbonData.BODIN = Number(data.BODIN)
                            input_data.CarbonData.BODOUT = Number(data.BODOUT)
                            input_data.CarbonData.TNIN = Number(data.TNIN)
                            input_data.CarbonData.TNOUT=Number(data.TNOUT)
                        }
                        else if(Number(data.Type)==18){
                            input_data.CarbonData.CODIN = Number(data.CODIN)
                            input_data.CarbonData.CODOUT = Number(data.CODOUT)
                        }
                        else if(Number(data.Type)==17){
                            input_data.CarbonData.ProcessKind = (data.ProcessKind)
                            input_data.CarbonData.ProcessType = (data.ProcessType)
                        }
                    }

                    console.log((input_data))
                    get_total_emission(input_data)
                }
                //{id:"",content:"",data:"",emissions:"",StartDate:"",EndDate:"",scope:""}
                async function get_total_emission(input_data){
                    var path = "/CarbonEmission/"+group_name.value
                    await axios.post(path,input_data,config).then(res => {
                        console.log(JSON.stringify(input_data))
                    })
                    .catch(error => {
                        console.log('send data'+JSON.stringify(input_data))
                        console.log(error)
                        
                    })
                    .finally(() => {
                    })
                }
                store.commit('ResetTable')
                //router.push({ path: 'input1' })
            }
            function click_cancle_table(){
                store.commit('ResetTable')
            }
            return{
                SearchCategory,
                SelectCategory,
                info_board_defalt,
                selected_category,
                showCategory,
                category_option_list,
                info_text,
                clickSearch,
                clickSelect,
                clickCategory,
                clickInfoDrop,
                click_register_table,
                click_cancle_table
            }
        },
        components:{ 
            power_usageVue,
            steam_usageVue,
            Water_useageVue,
            Waste_usageVue,
            Stationary_combustionVue,
            Mobile_combustionVue,
            Fugitive_emissionsVue,
            Fertilizer_useVue,
            Animal_possessionVue,
            Forest_absorptionVue,
            Waste_disposalFillingVue,
            Waste_disposalIncinerationVue,
            Waste_disposalSewage_treatmentVue,
            Waste_disposalBiologicalVue,
            Waste_disposalWastewaterVue,
            measuretable,  
        },

    }
    
</script>