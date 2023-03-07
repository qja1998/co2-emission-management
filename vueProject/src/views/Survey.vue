<template>
<div class="setting-main">
    <navigation class="navigation"></navigation>
    <div class="contents">
        <surveyHeader></surveyHeader>
        <div class = body_servey>
            <div>
                <button class="input1_back_btn"> ◀ </button>
            </div>
            <surveyBoardVue></surveyBoardVue>
        </div>
        

    </div>
</div>
</template>
<style>
    .body_servey{
        padding:2%;
        position:relative;
        background: #F8F8F8;;
        width: inherit;
        height: 100%;
    }
</style>
<script>
import navigation from "@/components/Navigation.vue"
import surveyHeader from "@/components/survey/Header.vue"
import surveyBoardVue from "@/components/survey/survey-board.vue";

export default{ 
    name:'',
    components:{
        navigation,
        surveyHeader,
        surveyBoardVue
    },
    setup(){
    },
    created(){
        
    },
    mounted(){ 
    },
    unmounted(){},
    methods:{}
}
</script>

