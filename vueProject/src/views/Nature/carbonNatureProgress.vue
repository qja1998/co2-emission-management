<template>
    <div class="measure-main">
        <navigation class="navigation"/>
        <div class="contents" style="height:145vh">
            <nature_header/>
            <div class="background">
                <select class="select_group" v-model="selected_company" @change="change_company(selected_company)">
                  <option v-for="item in group_list" :key="item">{{ item }}</option>
                </select>
                <div class="header-page">탄소 배출량 감축 진행상황</div>
                <div class ="dash">
                    <progress_dash1 id="progress-dash1"></progress_dash1>
                </div>
                
                <progress_dash2 id="progress-dash2"></progress_dash2>
                <progress_dash3 id="progress-dash3"></progress_dash3>
                <progress_dash4 id="progress-dash4"></progress_dash4>

            </div>
        </div>
    </div>
    
</template>

<script>
import navigation from "@/components/Navigation.vue"
import nature_header from "@/components/nature/Header.vue"
import progress_dash1 from "@/components/nature/progress/dash1/dash1.vue"
import progress_dash2 from "@/components/nature/progress/dash2/dash2.vue"
import progress_dash3 from "@/components/nature/progress/dash3/dash3.vue"
import progress_dash4 from "@/components/nature/progress/dash4/dash4.vue"

import { computed , ref} from 'vue';
import { useStore } from 'vuex'

export default {
    name :"progress",
    components:{
        navigation,
        nature_header,
        progress_dash1,
        progress_dash2,
        progress_dash3,
        progress_dash4,
    },
    setup() {
        var store = useStore()
        var group_list = computed(() => store.state.group_list).value
        var selected_company = ref(group_list[0])
        store.commit("insight_select_company",selected_company.value)
        
        var standardInfo = computed(()=>store.state.infopage)

        function change_company(){
            store.commit("insight_select_company",selected_company.value)
      }
        return{
            group_list,
            change_company,
            selected_company
        }
    }
}
</script>

<style>
#progress-dash1{
    float:left;
}

#progress-dash2{
    float:left;
    margin-left:3.7vw;
}
#progress-dash3{
    float:left;
    margin-left:3.7vw;
    margin-top:6vh
}
 #progress-dash4{
    clear:left;
    float:left;
    margin-top:6vh
}
</style>
