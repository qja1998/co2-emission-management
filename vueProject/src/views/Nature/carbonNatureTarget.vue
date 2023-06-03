<template>
    <div class="measure-main">
        <navigation class="navigation"/>
        <div class="contents">
            <nature_header/>
            <div class="background">
                <select class="select_group" v-model="selected_company" @change="change_company(selected_company)">
                  <option v-for="item in group_list" :key="item">{{ item }}</option>
                </select>
                <div class="header-page">탄소 배출량 감축 목표 설정</div>
                <div class="dash">
                    <target_dash1 :key="rerender_signal" id = "target_dash1"></target_dash1>
                    <target_dash2 :key="rerender_signal" id = "target_dash2"></target_dash2>
                </div>
                <target_dash3 :key="rerender_signal" id = "target_dash3"></target_dash3>
            </div>
        </div>
        <addTargetPopup v-if="targetPopup==true" class="popup"></addTargetPopup>
    </div>
    
</template>

<script>
import navigation from "@/components/Navigation.vue"
import nature_header from "@/components/nature/Header.vue"
import target_dash1 from "@/components/nature/target/dash1/dash1.vue";
import target_dash2 from "@/components/nature/target/dash2/dash2.vue";
import target_dash3 from "@/components/nature/target/list/dash3.vue";
import addTargetPopup from "@/components/nature/target/list/addTargetPopup.vue";
import { computed , ref} from 'vue';
import { useStore } from 'vuex'
import axios from 'axios'
export default {
    name :"target",
    components:{
        navigation,
        nature_header,
        target_dash1,
        target_dash2,
        target_dash3,
        addTargetPopup
    },
    setup() {
        const store = useStore()

        var group_list = computed(() => store.state.group_list).value
        var selected_company = ref(group_list[0])
        store.commit("insight_select_company",selected_company.value)
        var now = new Date();	// 현재 날짜 및 시간
        var lastyear = ref(now.getFullYear()-1)	// 년도
    
        var targetPopup = computed(() => store.state.CarbonCategories)

        var rerender_signal = ref(0)
        
        const config = {
            headers:{
                Authorization:"Bearer"+" "+store.state.accessToken,
            }
        }

        async function get_total_category_data(){
            var url = "/CarbonEmission/PartEmission/"+selected_company.value+"/"+(lastyear.value)+"-01-01/"+(lastyear.value)+"-12-28/1"
            axios.get(url,config).then(res=>{
                store.commit('getCategoryTotalList',res.data)
                })
                .catch(error => {
                console.log(error)
                })
                .finally(()=>{
                rerender_signal.value +=1
            })
        }


        async function get_total_data(){
            var url = "/CarbonEmission/PartEmission/"+selected_company.value+"/"+(lastyear.value)+"-01-01/"+(lastyear.value)+"-12-28/0"
            axios.get(url,config).then(res=>{
                store.commit('getTotalLastData',sumfun(res.data))
                store.commit('getTotalLastDataList',res.data)
                })
                .catch(error => {
                console.log(error)
                })
                .finally(()=>{
                rerender_signal.value +=1
            })
        }

        async function get_total_target_data(){
            var url = "/CarbonNature/CarbonYear/"+selected_company.value+"/"+lastyear.value+1+"/0"
            axios.get(url,config).then(res=>{
                store.commit('getTargetData',res.data)
                })
                .catch(error => {
                console.log(error)
                })
                .finally(()=>{
                rerender_signal.value +=1
            })
        }
     

        function sumfun(list){
            var sum =ref(0)
            for(var i=0; i<list.length; i++){
                sum.value = list[i] + sum.value
            }
            return sum.value
        }
        get_total_data()
        get_total_category_data()
        get_total_target_data()

        var rerender_signal = ref(0)

        function change_company(){
            get_total_data()
            get_total_category_data()
            get_total_target_data()
            store.commit("insight_select_company", selected_company.value)
        }
        
        return{
            targetPopup,
            selected_company,
            group_list,
            change_company,
            rerender_signal
        }
    },
    mounted(){
        this.rerender_signal +=1
    }
}
</script>

<style>
 .dash{
    margin-top:5vh;
 }
#target_dash1{
    float:left;
    display:inline-block;
}
#target_dash2{
    display:inline-block;
    margin-left:2vw;
}
#target_dash3{
    margin-top:5vh;
}
.popup{
    position:fixed;
    margin-left:14.9vw;
}


</style>
