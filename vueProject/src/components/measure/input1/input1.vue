<template>
    <div>
        <div class ="body_1">
            <div>
                <button class="input1_back_btn" onclick="location.href='/measure';"> ◀ </button>
            </div>
            <!-- 총 탄소 배출량 -->
            <div class="total_carbon" >
                <img style=" vertical-align: middle; width: 5vw; height: 5vw; margin-top:1vh; float: left;" src="@/assets/co2_background.png" alt="" class="menu-icon"/>
                <div style="margin-left: 2vw; color:#223354; font-size:1.25vw; margin-top: 0; font-weight:600; position: relative; float: left;">총 탄소 배출량
                    <div class="chart">
                        <chart style="width:50vw; postiion;"></chart>
                    </div>
                </div>
                <div>
                    <div class="emissions">
                        <p class ="text_">{{N_emssions}}CO2kg</p>
                        <p class ="text_" id="text_kor">질소 배출량</p>
                    </div>
                    <div class="emissions">
                        <p class ="text_">{{M_emssions}}CO2kg</p>
                        <p class ="text_" id="text_kor">메탄 배출량</p>
                    </div>
                </div>
            </div>
            <!-- 그룹 정보 -->
            <div class="info_group">
                <p style="margin-top:4vh; font-weight: 700; font-size: 1.2vw; color:black">그룹 정보</p>
                <div class="info_group_content">
                    <li class ="info_text" v-for="text in info_Group_Text">
                        <div style="margin-left:1vw;">
                            <img :src= "text.image" style="height: 35px; vertical-align:-30%; margin-right: 1vw; margin-bottom: 2px;" alt=""/>
                            {{text.category_Info}} <div style="margin-left:4vw; font-size: 1.6vh; font-weight: 400; color: #223354;; display:inline-block;">{{text.name}}</div>
                        </div>
                    </li>
                </div>
            </div>
            <!-- 테이블 -->
            <div>
                <div>
                    <!-- <measuretable class="m_table" v-bind:emssion_info_list="emssion_info_list_parent"/> -->
                    <measuretable class="m_table"></measuretable>
                </div>
            </div>
        </div>
    </div>
    
</template>

<style>
.body_1{
    padding:2%;
    position:relative;
    background: #F8F8F8;;
    width: inherit;
    height: 100%;
}
.input1_back_btn{
    border-radius: 7px;
    border: 2px solid #E9E9E9;
    height: 50px;
    width: 50px;
    background-color: #ffffff;
}
.input1_back_btn:hover{
    background: #f0f0f0;
}
.total_carbon{
    margin-top: 3.2vh;
    background-color: #ffffff;
    border-radius: 1vh;
    height: 90px;
    padding: 3.3vh;

}
.emissions{
    float:right; 
    margin-right: 3vw;
}
.text_{
    text-align: center;
    font-size: 1vw;
   
}
#text_kor{
    font-weight: 600;
    color: #223354;
    font-size: 1.1vw;
}
.chart{
    margin-top: 10px;
}

.info_text{
    color:#223354;;
    font-weight: 800;
    font-size:1vw;
    background-color: #ffffff;
    list-style: none;
    margin-top: 5px;
    line-height: 45px;
    height: 45px;
}

.measure_btn{
    height: 35px;
    width: 110px;
    font-size: 14px;
    margin-top: 40px;
    margin-left: 10px;
    background: #ffffff;
    border-radius: 5px;
    border:1px solid #E9E9E9;
}
.measure_btn:hover{
    background: #f0f0f0;
    cursor: pointer;
}
#btn_del{
    margin-left: 0px;
}

#btn_regi{
    background: #3DC984;
    color:#FFFFFF;
    width: 110px;
    margin-left: 15px;
    border:none;
    float: right;
}
#btn_regi:hover{
    background: #2cb570;
    cursor: pointer;
}
#btn_excle{
    margin-left: 15px;
    float: right;
}

#btn_search{
    width: 35px;
    float: right;
}

.m_table{
    width: 100%;
    margin-bottom: 3vh;
}

</style>

<script>
    import measuretable from "@/components/measure/MeasuretableATotal.vue"
    import chart from "@/components/measure/input1/chart.ts"
    import { useStore } from "vuex";
    import { ref, computed} from "vue";
    import popUp from "../pop-up.vue";

    export default {
        name :"input1",
        components:{
           measuretable,
           chart,
           popUp
        },

        setup(){
            const store = useStore()
            var N_emssions = ref(0)
            var M_emssions = ref(0)
            var group_name = computed(() => store.state.group_name) //선택한 조직의 조직명
            

            console.log(group_name)
            var info_Group_Text = ref([
                {image: require("@/assets/group_name.png"), category_Info:"그룹명",name:group_name.value},
                {image: require("@/assets/category.png"), category_Info:"카테고리",name: setCategory(group_name.value)}, 
                {image: require("@/assets/manager.png"), category_Info:"관리자",name:""}
            ])
            var emssion_info_list_parent = ref([
                {checked:false,content:"경영학과 직원 출퇴근",building:"1,423kwh",emissions:"1,352",start:"2022.01.01",end:"2022.01.05",source:"고정연소",scope:"Scope 1", category: "경상대 > 경영대학 > 경영학과"},
                {checked:false,content:"경영학과 직원 출퇴근",building:"1,423kwh",emissions:"1,352",start:"2022.01.01",end:"2022.01.05",source:"고정연소",scope:"Scope 1", category: "경상대 > 경영대학 > 경영학과"},
                {checked:false,content:"경영학과 직원 출퇴근",building:"1,423kwh",emissions:"1,352",start:"2022.01.01",end:"2022.01.05",source:"고정연소",scope:"Scope 1", category: "경상대 > 경영대학 > 경영학과"},
                {checked:false,content:"경영학과 직원 출퇴근",building:"1,423kwh",emissions:"1,352",start:"2022.01.01",end:"2022.01.05",source:"고정연소",scope:"Scope 1", category: "경상대 > 경영대학 > 경영학과"},
                {checked:false,content:"경영학과 직원 출퇴근",building:"1,423kwh",emissions:"1,352",start:"2022.01.01",end:"2022.01.05",source:"고정연소",scope:"Scope 1", category: "경상대 > 경영대학 > 경영학과"},
            ])

            function setCategory(name){
                return name
            }

            function click_total_regi(){
                store.commit('SetTotalTableContent',table.value)
            }

            var config = {
            headers:{
                "Authorization":"Bearer"+" "+store.state.accessToken
            
            }
            }
            async function get_total_emission(){
                var path = "Company/Preview/"+group_name.value+"/2023-0"+month.value+"-01/2023-0"+month.value+"-28"
                console.log("경로,날짜",path)
                await axios.get(path,config).then(res => {
                    //scope12CarbonEmission.value = res.data.Scopes[0]+res.data.Scopes[1]
                    //scope3CarbonEmission.value = res.data.Scopes[2]
                })
                .catch(error => {
                    
                    console.log(error)
                    
                })
                .finally(() => {
                })
           }        
            return{
                N_emssions,
                M_emssions,
                group_name,
                info_Group_Text,
                emssion_info_list_parent,
                setCategory,
                click_total_regi,get_total_emission
               
            }
        },
        created(){
            var store = useStore()
            this.edit = computed(() => store.state.EditTable)
        }

    }
    
</script>