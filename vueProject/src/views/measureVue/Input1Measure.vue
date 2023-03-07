<template>
    <div class="measure-main">
        <popUp v-if="this.edit == true" style="position:fixed; z-index:1"></popUp>
        <navigation class="navigation"/>
        <div class="contents">
            <MeasureHeader/>
            <Input1/>
        </div>
    </div>
</template>


<style>
body{
    margin:0;
}
.masure-main{
    display: flex;
}
.navigation{
    z-index: 1;
    position:fixed;

}
.contents{
    padding-left: 15vw;
}
</style>


<script>
import navigation from "@/components/Navigation.vue"
import MeasureHeader from "@/components/measure/Header.vue"
import Input1 from "@/components/measure/input1/input1.vue"
import popUp from "../../components/measure/pop-up.vue"
import { computed, ref } from 'vue'
import { useStore } from "vuex"

    export default {
        name :"measure",
        components:{
            navigation,
            MeasureHeader,
            Input1,   
            popUp
        },
        setup(){
            const store = useStore()
            var edit = computed(() => store.state.EditTable)
            return {edit}
        }
    }
</script>